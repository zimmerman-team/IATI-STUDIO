import visualizations from './api/public/visualizations'
import auth from './api/auth'
import { ensureAuthenticated, ensureAccount } from './middleware/authentication'
const Visualization = require('./api/private/Visualizations')
const OipaMeta = require('./api/private/OipaMeta')
const IatiRegistryMeta = require('./api/private/IatiRegistryMeta')
const Publisher = require('./api/private/Publisher')
const createActivityApi = require('./api/private/Activity')
const Organisation = require('./api/private/Organisation')

const User = require('./api/private/User')
// import Visualization from "./api/private/Visualizations"
// import OipaMeta from "./api/private/OipaMeta"
// import User from "./api/private/User"

module.exports = function(app) {

    const ActivityApi = createActivityApi(app)

    app.io.on('connection', function(socket) {
        // bind API events here

        socket.emit('connected', 'connected');
        const user = socket.request.user;

        console.log('binding socket events for user: ' + user.username);

        socket.on('User.updateUI', User.updateUI.bind(null, user));
        socket.on('User.updateProfile', User.updateProfile.bind(null, user));

        socket.on('Visualization.get', Visualization.get.bind(null, user));
        socket.on('Visualization.getAll', Visualization.getAll.bind(null, user));

        socket.on('Visualization.emptyTrash', Visualization.emptyTrash.bind(null, user));

        socket.on('Visualization.create', Visualization.create.bind(null, user));
        socket.on('Visualization.update', Visualization.update.bind(null, user));
        socket.on('Visualization.delete', Visualization.delete.bind(null, user));
        socket.on('Visualization.updateAndRefresh', Visualization.updateAndRefresh.bind(null, user));
        socket.on('Visualization.fork', Visualization.fork.bind(null, user));


        socket.on('Visualization.addItem', Visualization.addItem.bind(null, user));
        socket.on('Visualization.removeItem', Visualization.removeItem.bind(null, user));
        socket.on('Visualization.replaceItem', Visualization.replaceItem.bind(null, user));
        // socket.on('Visualization.changeItem', Visualization.changeItem.bind(null, user));

        socket.on('Visualization.addContext', Visualization.addContext.bind(null, user));
        socket.on('Visualization.replaceContext', Visualization.replaceContext.bind(null, user));
        socket.on('Visualization.removeContext', Visualization.removeContext.bind(null, user));

        socket.on('Visualization.adminToggleHide', Visualization.adminToggleHide.bind(null, user));

        socket.on('OipaMeta.getItemFilters', OipaMeta.getItemFilters.bind(null, user));
        socket.on('OipaMeta.getFilteredItemFilters', OipaMeta.getFilteredItemFilters.bind(null, user));
        socket.on('OipaMeta.getContextFilters', OipaMeta.getContextFilters.bind(null, user));
        socket.on('OipaMeta.getFilteredContextFilters', OipaMeta.getFilteredContextFilters.bind(null, user));

        socket.on('Publisher.get', Publisher.get.bind(null, user));
        socket.on('Publisher.delete', Publisher.delete.bind(null, user));
        //
        // Checkbox for autoPublish option update
        socket.on('Publisher.update', Publisher.update.bind(null, user));

        socket.on('Publisher.generateXmlFile', Publisher.generateXmlFile.bind(null, user));

        socket.on('IatiRegistryMeta.getApiKeyValidation', IatiRegistryMeta.getApiKeyValidation.bind(null, user));
        socket.on('IatiRegistryMeta.getApiKeyUnlink', IatiRegistryMeta.getApiKeyUnlink.bind(null, user));
        // Create Publish Dataset
        socket.on('IatiRegistryMeta.publishDataset', IatiRegistryMeta.publishDataset.bind(null, user));
        socket.on('IatiRegistryMeta.deleteDataset', IatiRegistryMeta.deleteDataset.bind(null, user));
        socket.on('IatiRegistryMeta.updateDataset', IatiRegistryMeta.updateDataset.bind(null, user));

        // TODO: different url - 2017-01-13
        socket.on('Activity.publish', ActivityApi.publish.bind(null, user));
        socket.on('Activity.markReadyToPublish', ActivityApi.markReadyToPublish.bind(null, user));
        socket.on('Activity.getModified', ActivityApi.getModified.bind(null, user));
        socket.on('Activity.getReadyToPublish', ActivityApi.getReadyToPublish.bind(null, user));

        socket.on('Activity.getAll', ActivityApi.getAll.bind(null, user));
        socket.on('Activity.get', ActivityApi.get.bind(null, user));
        socket.on('Activity.create', ActivityApi.create.bind(null, user));
        socket.on('Activity.update', ActivityApi.update.bind(null, user));
        socket.on('Activity.delete', ActivityApi.delete.bind(null, user));

        socket.on('Activity.getCodeListItems', ActivityApi.getCodeListItems.bind(null, user));

        socket.on('Activity.getDescriptions', ActivityApi.getDescriptions.bind(null, user));
        socket.on('Activity.createDescription', ActivityApi.createDescription.bind(null, user));
        socket.on('Activity.updateDescription', ActivityApi.updateDescription.bind(null, user));
        socket.on('Activity.deleteDescription', ActivityApi.deleteDescription.bind(null, user));

        socket.on('Activity.getParticipatingOrganisations', ActivityApi.getParticipatingOrganisations.bind(null, user));
        socket.on('Activity.createParticipatingOrganisation', ActivityApi.createParticipatingOrganisation.bind(null, user));
        socket.on('Activity.updateParticipatingOrganisation', ActivityApi.updateParticipatingOrganisation.bind(null, user));
        socket.on('Activity.deleteParticipatingOrganisation', ActivityApi.deleteParticipatingOrganisation.bind(null, user));

        socket.on('Activity.getRecipientCountries', ActivityApi.getRecipientCountries.bind(null, user));
        socket.on('Activity.createRecipientCountry', ActivityApi.createRecipientCountry.bind(null, user));
        socket.on('Activity.updateRecipientCountry', ActivityApi.updateRecipientCountry.bind(null, user));
        socket.on('Activity.deleteRecipientCountry', ActivityApi.deleteRecipientCountry.bind(null, user));

        socket.on('Activity.getRegions', ActivityApi.getRegions.bind(null, user));
        socket.on('Activity.createRegion', ActivityApi.createRegion.bind(null, user));
        socket.on('Activity.updateRegion', ActivityApi.updateRegion.bind(null, user));
        socket.on('Activity.deleteRegion', ActivityApi.deleteRegion.bind(null, user));

        socket.on('Activity.getLocations', ActivityApi.getLocations.bind(null, user));
        socket.on('Activity.createLocation', ActivityApi.createLocation.bind(null, user));
        socket.on('Activity.updateLocation', ActivityApi.updateLocation.bind(null, user));
        socket.on('Activity.deleteLocation', ActivityApi.deleteLocation.bind(null, user));

        socket.on('Activity.getSectors', ActivityApi.getSectors.bind(null, user));
        socket.on('Activity.createSector', ActivityApi.createSector.bind(null, user));
        socket.on('Activity.updateSector', ActivityApi.updateSector.bind(null, user));
        socket.on('Activity.deleteSector', ActivityApi.deleteSector.bind(null, user));

        socket.on('Activity.getPolicy', ActivityApi.getPolicy.bind(null, user));
        socket.on('Activity.createPolicy', ActivityApi.createPolicy.bind(null, user));
        socket.on('Activity.updatePolicy', ActivityApi.updatePolicy.bind(null, user));
        socket.on('Activity.deletePolicy', ActivityApi.deletePolicy.bind(null, user));

        socket.on('Activity.getHumanitarianScope', ActivityApi.getHumanitarianScope.bind(null, user));
        socket.on('Activity.createHumanitarianScope', ActivityApi.createHumanitarianScope.bind(null, user));
        socket.on('Activity.updateHumanitarianScope', ActivityApi.updateHumanitarianScope.bind(null, user));
        socket.on('Activity.deleteHumanitarianScope', ActivityApi.deleteHumanitarianScope.bind(null, user));

        socket.on('Activity.createCountryBudgetItem', ActivityApi.createCountryBudgetItem.bind(null, user));
        socket.on('Activity.updateCountryBudgetItem', ActivityApi.updateCountryBudgetItem.bind(null, user));
        socket.on('Activity.deleteCountryBudgetItem', ActivityApi.deleteCountryBudgetItem.bind(null, user));

        socket.on('Activity.createBudget', ActivityApi.createBudget.bind(null, user));
        socket.on('Activity.updateBudget', ActivityApi.updateBudget.bind(null, user));
        socket.on('Activity.deleteBudget', ActivityApi.deleteBudget.bind(null, user));

        socket.on('Activity.getTransaction', ActivityApi.getTransactions.bind(null, user));
        socket.on('Activity.createTransaction', ActivityApi.createTransaction.bind(null, user));
        socket.on('Activity.updateTransaction', ActivityApi.updateTransaction.bind(null, user));
        socket.on('Activity.deleteTransaction', ActivityApi.deleteTransaction.bind(null, user));

        socket.on('Activity.getLegacyData', ActivityApi.getLegacyData.bind(null, user));
        socket.on('Activity.createLegacyData', ActivityApi.createLegacyData.bind(null, user));
        socket.on('Activity.updateLegacyData', ActivityApi.updateLegacyData.bind(null, user));
        socket.on('Activity.deleteLegacyData', ActivityApi.deleteLegacyData.bind(null, user));

        socket.on('Activity.createPlannedDisbursement', ActivityApi.createPlannedDisbursement.bind(null, user));
        socket.on('Activity.updatePlannedDisbursement', ActivityApi.updatePlannedDisbursement.bind(null, user));
        socket.on('Activity.deletePlannedDisbursement', ActivityApi.deletePlannedDisbursement.bind(null, user));

        // BasicInformation Date CRUD
        //socket.on('Activity.getDates', ActivityApi.getDates.bind(null, user));   //Date endpoint not working using activity data
        socket.on('Activity.createDate', ActivityApi.createDate.bind(null, user));
        socket.on('Activity.updateDate', ActivityApi.updateDate.bind(null, user));
        socket.on('Activity.deleteDate', ActivityApi.deleteDate.bind(null, user));

        // BasicInformation Contact CRUD
        socket.on('Activity.createContact', ActivityApi.createContact.bind(null, user));
        socket.on('Activity.updateContact', ActivityApi.updateContact.bind(null, user));
        socket.on('Activity.deleteContact', ActivityApi.deleteContact.bind(null, user));

        // DocumentLink Form CRUD
        socket.on('Activity.getDocumentLinks', ActivityApi.getDocumentLinks.bind(null, user));
        socket.on('Activity.createDocumentLink', ActivityApi.createDocumentLink.bind(null, user));
        socket.on('Activity.updateDocumentLink', ActivityApi.updateDocumentLink.bind(null, user));
        socket.on('Activity.deleteDocumentLink', ActivityApi.deleteDocumentLink.bind(null, user));

        // Relations Form CRUD
        socket.on('Activity.getRelation', ActivityApi.getRelation.bind(null, user));
        socket.on('Activity.createRelation', ActivityApi.createRelation.bind(null, user));
        socket.on('Activity.updateRelation', ActivityApi.updateRelation.bind(null, user));
        socket.on('Activity.deleteRelation', ActivityApi.deleteRelation.bind(null, user));

        // Performance parent condition Form CRUD
        socket.on('Activity.createPerformanceCondition', ActivityApi.createPerformanceCondition.bind(null, user));
        socket.on('Activity.updatePerformanceCondition', ActivityApi.updatePerformanceCondition.bind(null, user));

        // Performance child conditions Form CRUD
        socket.on('Activity.getPerformanceConditions', ActivityApi.getPerformanceConditions.bind(null, user));
        socket.on('Activity.createPerformanceConditions', ActivityApi.createPerformanceConditions.bind(null, user));
        socket.on('Activity.updatePerformanceConditions', ActivityApi.updatePerformanceConditions.bind(null, user));
        socket.on('Activity.deletePerformanceConditions', ActivityApi.deletePerformanceConditions.bind(null, user));

        // Performance result Form CRUD
        socket.on('Activity.getPerformanceResult', ActivityApi.getPerformanceResult.bind(null, user));
        socket.on('Activity.createPerformanceResult', ActivityApi.createPerformanceResult.bind(null, user));
        socket.on('Activity.updatePerformanceResult', ActivityApi.updatePerformanceResult.bind(null, user));
        socket.on('Activity.deletePerformanceResult', ActivityApi.deletePerformanceResult.bind(null, user));

        socket.on('Activity.getResultIndicator', ActivityApi.getResultIndicator.bind(null, user));
        socket.on('Activity.createResultIndicator', ActivityApi.createResultIndicator.bind(null, user));
        socket.on('Activity.updateResultIndicator', ActivityApi.updateResultIndicator.bind(null, user));
        socket.on('Activity.deleteResultIndicator', ActivityApi.deleteResultIndicator.bind(null, user));

        socket.on('Activity.getIndicatorPeriod', ActivityApi.getIndicatorPeriod.bind(null, user));
        socket.on('Activity.createIndicatorPeriod', ActivityApi.createIndicatorPeriod.bind(null, user));
        socket.on('Activity.updateIndicatorPeriod', ActivityApi.updateIndicatorPeriod.bind(null, user));
        socket.on('Activity.deleteIndicatorPeriod', ActivityApi.deleteIndicatorPeriod.bind(null, user));

        socket.on('Activity.getIndicatorReference', ActivityApi.getIndicatorReference.bind(null, user));
        socket.on('Activity.createIndicatorReference', ActivityApi.createIndicatorReference.bind(null, user));
        socket.on('Activity.updateIndicatorReference', ActivityApi.updateIndicatorReference.bind(null, user));
        socket.on('Activity.deleteIndicatorReference', ActivityApi.deleteIndicatorReference.bind(null, user));

        socket.on('Activity.getIndicatorTargetLocation', ActivityApi.getIndicatorTargetLocation.bind(null, user));
        socket.on('Activity.createIndicatorTargetLocation', ActivityApi.createIndicatorTargetLocation.bind(null, user));
        socket.on('Activity.updateIndicatorTargetLocation', ActivityApi.updateIndicatorTargetLocation.bind(null, user));
        socket.on('Activity.deleteIndicatorTargetLocation', ActivityApi.deleteIndicatorTargetLocation.bind(null, user));

        socket.on('Activity.getIndicatorActualLocation', ActivityApi.getIndicatorActualLocation.bind(null, user));
        socket.on('Activity.createIndicatorActualLocation', ActivityApi.createIndicatorActualLocation.bind(null, user));
        socket.on('Activity.updateIndicatorActualLocation', ActivityApi.updateIndicatorActualLocation.bind(null, user));
        socket.on('Activity.deleteIndicatorActualLocation', ActivityApi.deleteIndicatorActualLocation.bind(null, user));

        socket.on('Activity.getIndicatorTargetDimension', ActivityApi.getIndicatorTargetDimension.bind(null, user));
        socket.on('Activity.createIndicatorTargetDimension', ActivityApi.createIndicatorTargetDimension.bind(null, user));
        socket.on('Activity.updateIndicatorTargetDimension', ActivityApi.updateIndicatorTargetDimension.bind(null, user));
        socket.on('Activity.deleteIndicatorTargetDimension', ActivityApi.deleteIndicatorTargetDimension.bind(null, user));

        socket.on('Activity.getIndicatorActualDimension', ActivityApi.getIndicatorActualDimension.bind(null, user));
        socket.on('Activity.createIndicatorActualDimension', ActivityApi.createIndicatorActualDimension.bind(null, user));
        socket.on('Activity.updateIndicatorActualDimension', ActivityApi.updateIndicatorActualDimension.bind(null, user));
        socket.on('Activity.deleteIndicatorActualDimension', ActivityApi.deleteIndicatorActualDimension.bind(null, user));

        socket.on('Organisation.publish', Organisation.publish.bind(null, user));
        socket.on('Organisation.markReadyToPublish', Organisation.markReadyToPublish.bind(null, user));

        socket.on('Organisation.get', Organisation.get.bind(null, user));
        socket.on('Organisation.create', Organisation.create.bind(null, user));
        socket.on('Organisation.update', Organisation.update.bind(null, user));
        socket.on('Organisation.delete', Organisation.delete.bind(null, user));
    })
};
