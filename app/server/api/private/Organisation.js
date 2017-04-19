
"use strict"

import fs from 'fs'
import path from 'path'
import url from 'url'

import { getOrganisation, postOrganisation, updateOrganisation, getCodeListItems} from '../../oipa/organisation'
import * as oipaMethods from '../../oipa/organisation'

import config from '../../config/config'

const handleOrganisationExport = function(user, publisherId, jobId) {

    function getResult() {
        return oipaMethods.getOrganisationXMLByPublisherResult(user, publisherId, jobId)
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

var OrganisationAPI = {

    getValidationStatus: function() {
        // TODO: how will this be determined? - 2016-12-23
    },

    publish: function(user, publisherId, datasetId, res) {

        // 1. get an XML export from OIPA
        console.log('called publish...', publisherId);
        oipaMethods.getOrganisationXMLByPublisher(user, publisherId)
            .then((job) => {
                handleOrganisationExport(user, publisherId, job.job)
                    .then(xml => {

                        if (!xml) {
                            return res("Error when exporting")
                        }

                        // 2. Serve this xml export in IATI Studio
                        const fileName = `${publisherId}-organisations.xml`

                        fs.writeFile(path.join(config.publishDirectory, fileName), xml, (error) => {
                            if (error) {
                                console.error(error)
                                return res("Can't save XML")
                            }

                            const sourceUrl = url.resolve(config.fullUrl, path.join(config.exportPath, fileName))

                            // 3. POST to OIPA to sync with the IATI registry

                            // push nothing to IATI registry, just update organisation states
                            if (datasetId) {
                                return oipaMethods.publishOrganisationsUpdate(user, publisherId, sourceUrl, datasetId)
                                    .then(result => res(null, result))
                                    .catch(error => res(error));
                            }
                            // push to IATI registry
                            else {
                                return oipaMethods.publishOrganisations(user, publisherId, sourceUrl)
                                    .then(result => res(null, result))
                                    .catch(error => res(error));
                            }

                        })
                    }) 
            })
    },

    markReadyToPublish: function(user, publisherId, organisationId, res) {
        return oipaMethods.markReadyToPublish(user, publisherId, organisationId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    get: function(user, publisherId, id, res) {
        return getOrganisation(user, publisherId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    create: function(user, publisherId, form, res) {
        // TODO: update validation status here - 2016-12-16
        return postOrganisation(user, publisherId, form)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    update: function(user, publisherId, id, form, res) {
        // TODO: update validation status here - 2016-12-16
        return updateOrganisation(user, publisherId, id, form)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    delete: function(user, publisherId, id, res) {
        return oipaMethods.deleteOrganisation(user, publisherId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    // getReportingOrganisations: function(user, publisherId, organisationId, res) {
    //     // TODO: update validation status here - 2016-12-16
    //     return oipaMethods.getReportingOrganisations(user, publisherId, organisationId)
    //         .then(result => res(null, result))
    //         .catch(error => res(error));
    // },

    createReportingOrganisation: function(user, publisherId, organisationId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation,
        console.log('called createReportingOrganisation');
        return oipaMethods.postReportingOrganisation(user, publisherId, organisationId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateReportingOrganisation: function(user, publisherId, organisationId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        console.log('called updateReportingOrganisation');
        return oipaMethods.updateReportingOrganisation(user, publisherId, organisationId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteReportingOrganisation: function(user, publisherId, organisationId, id, res) {
        // TODO: delete validation status here - 2016-12-16
        return oipaMethods.deleteReportingOrganisation(user, publisherId, organisationId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getTotalBudgets: function(user, publisherId, organisationId, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getTotalBudgets(user, publisherId, organisationId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createTotalBudget: function(user, publisherId, organisationId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation,
        console.log('called createTotalBudget');
        return oipaMethods.postTotalBudget(user, publisherId, organisationId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },
    updateTotalBudget: function(user, publisherId, organisationId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        console.log('called updateTotalBudget');
        return oipaMethods.updateTotalBudget(user, publisherId, organisationId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },
    deleteTotalBudget: function(user, publisherId, organisationId, id, res) {
        // TODO: delete validation status here - 2016-12-16
        return oipaMethods.deleteTotalBudget(user, publisherId, organisationId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },
};

module.exports = OrganisationAPI;
