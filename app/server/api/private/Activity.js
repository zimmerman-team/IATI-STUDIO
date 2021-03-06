"use strict"

import fs from 'fs'
import path from 'path'
import url from 'url'

import { getActivity, postActivity, updateActivity, getCodeListItems} from '../../oipa/activity'
import * as oipaMethods from '../../oipa/activity'

import config from '../../config/config'
import sendmail from '../../auth/util/sendmail'

const handleActivityExport = function(user, publisherId, jobId) {

    function getResult() {
        return oipaMethods.getActivityXMLByPublisherResult(user, publisherId, jobId)
            .then(response => {
                if (response.status === 'failed') {
                    return false
                }
                else if (response.status !== 'completed') {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            return resolve(getResult())
                        }, 3000)
                    })
                }
                else {
                    return response.result
                }
            })
    }

    return getResult()
}

const createActivityApi = (app) => {
    /*
     * Here app is the express app object
    */

    return  {
        getValidationStatus: function() {
            // TODO: how will this be determined? - 2016-12-23
        },

        publish: function(user, publisherId, datasetId, res) {

            // 1. get an XML export from OIPA
            console.log('called publish...', publisherId);
            oipaMethods.getActivityXMLByPublisher(user, publisherId)
                .then((job) => {
                    if (job.status === 'failed') {
                        return res({ message: job.message})
                    }

                    handleActivityExport(user, publisherId, job.job)
                        .then(xml => {

                            if (!xml) {
                                return res("Error when exporting")
                            }

                            // 2. Serve this xml export in IATI Studio
                            const fileName = `${publisherId}-activities.xml`

                            fs.writeFile(path.join(config.publishDirectory, fileName), xml, (error) => {
                                if (error) {
                                    console.error(error)
                                    return res("Can't save XML")
                                }

                                const sourceUrl = url.resolve(config.fullUrl, path.join(config.exportPath, fileName))

                                // 4. Send an email to the user
                                sendmail(app, {
                                    from: config.smtp.from.name +' <'+ config.smtp.from.address +'>',
                                    to: user.email,
                                    subject: 'Your activity export is complete',
                                    textPath: 'email/activityExportComplete-text',
                                    htmlPath: 'email/activityExportComplete-html',
                                    locals: {
                                        username: user.username,
                                        email: user.email,
                                        loginURL: config.fullUrl +'/login/',
                                        datasetUrl: config.fullUrl + '/app/publisher/datasets',
                                        sourceUrl: sourceUrl,
                                        projectName: config.projectName
                                    },
                                    success: function(message) {
                                        console.log('succesfully sent email');
                                    },
                                    error: function(err) {
                                        console.log('Error Sending Welcome Email: '+ err);
                                    }
                                });

                                // 3. POST to OIPA to sync with the IATI registry

                                // push nothing to IATI registry, just update activity states
                                if (datasetId) {
                                    return oipaMethods.publishActivitiesUpdate(user, publisherId, sourceUrl, datasetId)
                                        .then(result => res(null, result))
                                        .catch(error => res(error));
                                } 
                                // push to IATI registry
                                else {
                                    return oipaMethods.publishActivities(user, publisherId, sourceUrl)
                                        .then(result => res(null, result))
                                        .catch(error => res(error));
                                }
                            })
                        }) 
                })
        },

        getCodeListItems: function(user, codeListType, res) {
            // TODO: update validation status here - 2016-12-16
            return getCodeListItems(codeListType)
                .then(languages => res(null, languages))
                .catch((error) => res(error));
        },

        markReadyToPublish: function(user, publisherId, activityId, res) {
            return oipaMethods.markReadyToPublish(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getModified: function(user, publisherId, res) {
            return oipaMethods.getActivities(user, publisherId, {
                modified_ready_to_publish: true,
            })
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getReadyToPublish: function(user, publisherId, res) {
            return oipaMethods.getActivities(user, publisherId, {
                ready_to_publish: true,
            })
                .then(result => res(null, result))
                .catch(error => res(error));
        },


        getAll: function(user, publisherId, filters={}, page=1, res) {
            return oipaMethods.getActivities(user, publisherId, {
                page: page,
                ...filters
            })
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        get: function(user, publisherId, id, res) {
            return getActivity(user, publisherId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        create: function(user, publisherId, form, res) {
            // TODO: update validation status here - 2016-12-16
            return postActivity(user, publisherId, form)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        update: function(user, publisherId, form, res) {
            // TODO: update validation status here - 2016-12-16
            return updateActivity(user, publisherId, form)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        delete: function(user, publisherId, id, res) {
            return oipaMethods.deleteActivity(user, publisherId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getDescriptions: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getDescriptions(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createDescription: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.postDescription(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateDescription: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateDescription(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteDescription: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteDescription(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createDate: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here
            // on succesful creation,
            return oipaMethods.postDate(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateDate: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here
            return oipaMethods.updateDate(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteDate: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteDate(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getContact: function(user, publisherId, activityId, res) {
            // TODO: update validation status here
            return oipaMethods.getContact(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createContact: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here
            // on succesful creation,
            return oipaMethods.postContact(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateContact: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here
            return oipaMethods.updateContact(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteContact: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here
            return oipaMethods.deleteContact(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getDocumentLinks: function(user, publisherId, activityId, res) {
            // TODO: update validation status here
            return oipaMethods.getDocumentLinks(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createDocumentLink: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here
            // on successful creation,
            return oipaMethods.postDocumentLink(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateDocumentLink: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here
            return oipaMethods.updateDocumentLink(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteDocumentLink: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here
            return oipaMethods.deleteDocumentLink(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getPolicy: function(user, publisherId, activityId, res) {
            // TODO: update validation status here
            return oipaMethods.getPolicy(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createPolicy: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here
            // on successful creation,
            return oipaMethods.postPolicy(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updatePolicy: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here
            return oipaMethods.updatePolicy(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deletePolicy: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here
            return oipaMethods.deletePolicy(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getHumanitarianScope: function(user, publisherId, activityId, res) {
            // TODO: update validation status here
            return oipaMethods.getHumanitarianScope(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createHumanitarianScope: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here
            // on successful creation,
            return oipaMethods.postHumanitarianScope(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateHumanitarianScope: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here
            return oipaMethods.updateHumanitarianScope(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteHumanitarianScope: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here
            return oipaMethods.deleteHumanitarianScope(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createCountryBudgetItem: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here
            // on successful creation,
            return oipaMethods.postCountryBudgetItem(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateCountryBudgetItem: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here
            return oipaMethods.updateCountryBudgetItem(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteCountryBudgetItem: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here
            return oipaMethods.deleteCountryBudgetItem(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createBudget: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here
            // on successful creation,
            return oipaMethods.postBudget(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateBudget: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here
            return oipaMethods.updateBudget(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteBudget: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here
            return oipaMethods.deleteBudget(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getParticipatingOrganisations: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getParticipatingOrganisations(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createParticipatingOrganisation: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation, 
            return oipaMethods.postParticipatingOrganisation(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateParticipatingOrganisation: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateParticipatingOrganisation(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteParticipatingOrganisation: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteParticipatingOrganisation(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createRecipientCountry: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.postRecipientCountry(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateRecipientCountry: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateRecipientCountry(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteRecipientCountry: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteRecipientCountry(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getRecipientCountries: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getRecipientCountries(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getSectors: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getSectors(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createSector: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation, 
            return oipaMethods.postSector(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateSector: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateSector(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteSector: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteSector(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getRegions: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getRegions(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createRegion: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.postRegion(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateRegion: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateRegion(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteRegion: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteRegion(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getLocations: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getLocations(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getRelation: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getRelation(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createLocation: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.postLocation(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createRelation: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.postRelation(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateLocation: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateLocation(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateRelation: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateRelation(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteLocation: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteLocation(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteRelation: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteRelation(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getTransactions: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getTransactions(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createTransaction: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.postTransaction(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateTransaction: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateTransaction(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteTransaction: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteTransaction(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getLegacyData: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getLegacyData(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createLegacyData: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.postLegacyData(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateLegacyData: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateLegacyData(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteLegacyData: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteLegacyData(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createPlannedDisbursement: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.postPlannedDisbursement(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updatePlannedDisbursement: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updatePlannedDisbursement(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deletePlannedDisbursement: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deletePlannedDisbursement(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createPerformanceCondition: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.createPerformanceCondition(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updatePerformanceCondition: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updatePerformanceCondition(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getPerformanceConditions: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getPerformanceConditions(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createPerformanceConditions: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.createPerformanceConditions(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updatePerformanceConditions: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updatePerformanceConditions(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deletePerformanceConditions: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deletePerformanceConditions(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getPerformanceResult: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getPerformanceResult(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createPerformanceResult: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.createPerformanceResult(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updatePerformanceResult: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updatePerformanceResult(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deletePerformanceResult: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deletePerformanceResult(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },


        getPerformanceResult: function(user, publisherId, activityId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getPerformanceResult(user, publisherId, activityId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createPerformanceResult: function(user, publisherId, activityId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.createPerformanceResult(user, publisherId, activityId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updatePerformanceResult: function(user, publisherId, activityId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updatePerformanceResult(user, publisherId, activityId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deletePerformanceResult: function(user, publisherId, activityId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deletePerformanceResult(user, publisherId, activityId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        getResultIndicator: function(user, publisherId, activityId, resultId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getResultIndicator(user, publisherId, activityId, resultId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createResultIndicator: function(user, publisherId, activityId, resultId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.createResultIndicator(user, publisherId, activityId, resultId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateResultIndicator: function(user, publisherId, activityId, resultId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateResultIndicator(user, publisherId, activityId, resultId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteResultIndicator: function(user, publisherId, activityId, resultId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteResultIndicator(user, publisherId, activityId, resultId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },


        getIndicatorPeriod: function(user, publisherId, activityId, resultId, indicatorId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getIndicatorPeriod(user, publisherId, activityId, resultId, indicatorId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createIndicatorPeriod: function(user, publisherId, activityId, resultId, indicatorId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.createIndicatorPeriod(user, publisherId, activityId, resultId, indicatorId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateIndicatorPeriod: function(user, publisherId, activityId, resultId, indicatorId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateIndicatorPeriod(user, publisherId, activityId, resultId, indicatorId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteIndicatorPeriod: function(user, publisherId, activityId, resultId, indicatorId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteIndicatorPeriod(user, publisherId, activityId, resultId, indicatorId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },


        getIndicatorReference: function(user, publisherId, activityId, resultId, indicatorId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getIndicatorReference(user, publisherId, activityId, resultId, indicatorId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createIndicatorReference: function(user, publisherId, activityId, resultId, indicatorId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.createIndicatorReference(user, publisherId, activityId, resultId, indicatorId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateIndicatorReference: function(user, publisherId, activityId, resultId, indicatorId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateIndicatorReference(user, publisherId, activityId, resultId, indicatorId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteIndicatorReference: function(user, publisherId, activityId, resultId, indicatorId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteIndicatorReference(user, publisherId, activityId, resultId, indicatorId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },


        getIndicatorTargetLocation: function(user, publisherId, activityId, resultId, indicatorId, periodId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getIndicatorTargetLocation(user, publisherId, activityId, resultId, indicatorId, periodId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createIndicatorTargetLocation: function(user, publisherId, activityId, resultId, indicatorId, periodId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.createIndicatorTargetLocation(user, publisherId, activityId, resultId, indicatorId, periodId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateIndicatorTargetLocation: function(user, publisherId, activityId, resultId, indicatorId, periodId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateIndicatorTargetLocation(user, publisherId, activityId, resultId, indicatorId, periodId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteIndicatorTargetLocation: function(user, publisherId, activityId, resultId, indicatorId, periodId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteIndicatorTargetLocation(user, publisherId, activityId, resultId, indicatorId, periodId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },


        getIndicatorActualLocation: function(user, publisherId, activityId, resultId, indicatorId, periodId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getIndicatorActualLocation(user, publisherId, activityId, resultId, indicatorId, periodId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createIndicatorActualLocation: function(user, publisherId, activityId, resultId, indicatorId, periodId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.createIndicatorActualLocation(user, publisherId, activityId, resultId, indicatorId, periodId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateIndicatorActualLocation: function(user, publisherId, activityId, resultId, indicatorId, periodId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateIndicatorActualLocation(user, publisherId, activityId, resultId, indicatorId, periodId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteIndicatorActualLocation: function(user, publisherId, activityId, resultId, indicatorId, periodId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteIndicatorActualLocation(user, publisherId, activityId, resultId, indicatorId, periodId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },


        getIndicatorTargetDimension: function(user, publisherId, activityId, resultId, indicatorId, periodId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getIndicatorTargetDimension(user, publisherId, activityId, resultId, indicatorId, periodId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createIndicatorTargetDimension: function(user, publisherId, activityId, resultId, indicatorId, periodId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.createIndicatorTargetDimension(user, publisherId, activityId, resultId, indicatorId, periodId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateIndicatorTargetDimension: function(user, publisherId, activityId, resultId, indicatorId, periodId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateIndicatorTargetDimension(user, publisherId, activityId, resultId, indicatorId, periodId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteIndicatorTargetDimension: function(user, publisherId, activityId, resultId, indicatorId, periodId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteIndicatorTargetDimension(user, publisherId, activityId, resultId, indicatorId, periodId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },


        getIndicatorActualDimension: function(user, publisherId, activityId, resultId, indicatorId, periodId, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.getIndicatorActualDimension(user, publisherId, activityId, resultId, indicatorId, periodId)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        createIndicatorActualDimension: function(user, publisherId, activityId, resultId, indicatorId, periodId, data, res) {
            // TODO: update validation status here - 2016-12-16
            // on succesful creation,
            return oipaMethods.createIndicatorActualDimension(user, publisherId, activityId, resultId, indicatorId, periodId, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        updateIndicatorActualDimension: function(user, publisherId, activityId, resultId, indicatorId, periodId, id, data, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.updateIndicatorActualDimension(user, publisherId, activityId, resultId, indicatorId, periodId, id, data)
                .then(result => res(null, result))
                .catch(error => res(error));
        },

        deleteIndicatorActualDimension: function(user, publisherId, activityId, resultId, indicatorId, periodId, id, res) {
            // TODO: update validation status here - 2016-12-16
            return oipaMethods.deleteIndicatorActualDimension(user, publisherId, activityId, resultId, indicatorId, periodId, id)
                .then(result => res(null, result))
                .catch(error => res(error));
        },
    };
}

module.exports = createActivityApi;
