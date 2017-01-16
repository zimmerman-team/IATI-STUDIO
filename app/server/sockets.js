import visualizations from './api/public/visualizations'
import auth from './api/auth'
import { ensureAuthenticated, ensureAccount } from './middleware/authentication'
const Visualization = require('./api/private/Visualizations')
const OipaMeta = require('./api/private/OipaMeta')
const IatiRegistryMeta = require('./api/private/IatiRegistryMeta')
const Publisher = require('./api/private/Publisher')
const Activity = require('./api/private/Activity')

const User = require('./api/private/User')
// import Visualization from "./api/private/Visualizations"
// import OipaMeta from "./api/private/OipaMeta"
// import User from "./api/private/User"

module.exports = function(app) {

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
        socket.on('Activity.publish', Activity.publish.bind(null, user));

        socket.on('Activity.getAll', Activity.getAll.bind(null, user));
        socket.on('Activity.get', Activity.get.bind(null, user));
        socket.on('Activity.create', Activity.create.bind(null, user));
        socket.on('Activity.update', Activity.update.bind(null, user));
        socket.on('Activity.delete', Activity.delete.bind(null, user));

        socket.on('Activity.getCodeListItems', Activity.getCodeListItems.bind(null, user));

        socket.on('Activity.getDescriptions', Activity.getDescriptions.bind(null, user));

        socket.on('Activity.createDescription', Activity.createDescription.bind(null, user));
        socket.on('Activity.updateDescription', Activity.updateDescription.bind(null, user));
        socket.on('Activity.deleteDescription', Activity.deleteDescription.bind(null, user));

        socket.on('Activity.getParticipatingOrganisations', Activity.getParticipatingOrganisations.bind(null, user));
        socket.on('Activity.createParticipatingOrganisation', Activity.createParticipatingOrganisation.bind(null, user));
        socket.on('Activity.updateParticipatingOrganisation', Activity.updateParticipatingOrganisation.bind(null, user));
        socket.on('Activity.deleteParticipatingOrganisation', Activity.deleteParticipatingOrganisation.bind(null, user));

        socket.on('Activity.getRecipientCountries', Activity.getRecipientCountries.bind(null, user));
        socket.on('Activity.createRecipientCountry', Activity.createRecipientCountry.bind(null, user));
        socket.on('Activity.updateRecipientCountry', Activity.updateRecipientCountry.bind(null, user));
        socket.on('Activity.deleteRecipientCountry', Activity.deleteRecipientCountry.bind(null, user));

        socket.on('Activity.getRegions', Activity.getRegions.bind(null, user));
        socket.on('Activity.createRegion', Activity.createRegion.bind(null, user));
        socket.on('Activity.updateRegion', Activity.updateRegion.bind(null, user));
        socket.on('Activity.deleteRegion', Activity.deleteRegion.bind(null, user));

        socket.on('Activity.getLocations', Activity.getLocations.bind(null, user));
        socket.on('Activity.createLocation', Activity.createLocation.bind(null, user));
        socket.on('Activity.updateLocation', Activity.updateLocation.bind(null, user));
        socket.on('Activity.deleteLocation', Activity.deleteLocation.bind(null, user));

        socket.on('Activity.getSectors', Activity.getSectors.bind(null, user));
        socket.on('Activity.createSector', Activity.createSector.bind(null, user));
        socket.on('Activity.updateSector', Activity.updateSector.bind(null, user));
        socket.on('Activity.deleteSector', Activity.deleteSector.bind(null, user));

        socket.on('Activity.getPolicy', Activity.getPolicy.bind(null, user));
        socket.on('Activity.createPolicy', Activity.createPolicy.bind(null, user));
        socket.on('Activity.updatePolicy', Activity.updatePolicy.bind(null, user));
        socket.on('Activity.deletePolicy', Activity.deletePolicy.bind(null, user));

        socket.on('Activity.getHumanitarianScope', Activity.getHumanitarianScope.bind(null, user));
        socket.on('Activity.createHumanitarianScope', Activity.createHumanitarianScope.bind(null, user));
        socket.on('Activity.updateHumanitarianScope', Activity.updateHumanitarianScope.bind(null, user));
        socket.on('Activity.deleteHumanitarianScope', Activity.deleteHumanitarianScope.bind(null, user));

        socket.on('Activity.getHumanitarianScope', Activity.getHumanitarianScope.bind(null, user));
        socket.on('Activity.createHumanitarianScope', Activity.createHumanitarianScope.bind(null, user));
        socket.on('Activity.updateHumanitarianScope', Activity.updateHumanitarianScope.bind(null, user));
        socket.on('Activity.deleteHumanitarianScope', Activity.deleteHumanitarianScope.bind(null, user));

        socket.on('Activity.createBudget', Activity.createBudget.bind(null, user));
        socket.on('Activity.updateBudget', Activity.updateBudget.bind(null, user));
        socket.on('Activity.deleteBudget', Activity.deleteBudget.bind(null, user));

        socket.on('Activity.getTransaction', Activity.getTransactions.bind(null, user));
        socket.on('Activity.createTransaction', Activity.createTransaction.bind(null, user));
        socket.on('Activity.updateTransaction', Activity.updateTransaction.bind(null, user));
        socket.on('Activity.deleteTransaction', Activity.deleteTransaction.bind(null, user));

        socket.on('Activity.createPlannedDisbursement', Activity.createPlannedDisbursement.bind(null, user));
        socket.on('Activity.updatePlannedDisbursement', Activity.updatePlannedDisbursement.bind(null, user));
        socket.on('Activity.deletePlannedDisbursement', Activity.deletePlannedDisbursement.bind(null, user));

        // BasicInformation Date CRUD
        //socket.on('Activity.getDates', Activity.getDates.bind(null, user));   //Date endpoint not working using activity data
        socket.on('Activity.createDate', Activity.createDate.bind(null, user));
        socket.on('Activity.updateDate', Activity.updateDate.bind(null, user));
        socket.on('Activity.deleteDate', Activity.deleteDate.bind(null, user));

        // BasicInformation Status CRUD
        socket.on('Activity.getStatus', Activity.getStatus.bind(null, user));
        socket.on('Activity.createStatus', Activity.createStatus.bind(null, user));
        socket.on('Activity.updateStatus', Activity.updateStatus.bind(null, user));
        socket.on('Activity.deleteStatus', Activity.deleteStatus.bind(null, user));

        // BasicInformation Contact CRUD
        socket.on('Activity.createContact', Activity.createContact.bind(null, user));
        socket.on('Activity.updateContact', Activity.updateContact.bind(null, user));
        socket.on('Activity.deleteContact', Activity.deleteContact.bind(null, user));

        // DocumentLink Form CRUD
        socket.on('Activity.getDocumentLinks', Activity.getDocumentLinks.bind(null, user));
        socket.on('Activity.createDocumentLink', Activity.createDocumentLink.bind(null, user));
        socket.on('Activity.updateDocumentLink', Activity.updateDocumentLink.bind(null, user));
        socket.on('Activity.deleteDocumentLink', Activity.deleteDocumentLink.bind(null, user));

        // Policy Form CRUD
        socket.on('Activity.getPolicy', Activity.getPolicy.bind(null, user));
        socket.on('Activity.createPolicy', Activity.createPolicy.bind(null, user));
        socket.on('Activity.updatePolicy', Activity.updatePolicy.bind(null, user));
        socket.on('Activity.deletePolicy', Activity.deletePolicy.bind(null, user));

        // Relations Form CRUD
        socket.on('Activity.getRelation', Activity.getRelation.bind(null, user));
        socket.on('Activity.createRelation', Activity.createRelation.bind(null, user));
        socket.on('Activity.updateRelation', Activity.updateRelation.bind(null, user));
        socket.on('Activity.deleteRelation', Activity.deleteRelation.bind(null, user));

        // Performance condition Form CRUD
        socket.on('Activity.getPerformanceCondition', Activity.getPerformanceCondition.bind(null, user));
        socket.on('Activity.createPerformanceCondition', Activity.createPerformanceCondition.bind(null, user));
        socket.on('Activity.updatePerformanceCondition', Activity.updatePerformanceCondition.bind(null, user));
        socket.on('Activity.deletePerformanceCondition', Activity.deletePerformanceCondition.bind(null, user));

        // Performance result Form CRUD
        socket.on('Activity.getPerformanceResult', Activity.getPerformanceResult.bind(null, user));
        socket.on('Activity.createPerformanceResult', Activity.createPerformanceResult.bind(null, user));
        socket.on('Activity.updatePerformanceResult', Activity.updatePerformanceResult.bind(null, user));
        socket.on('Activity.deletePerformanceResult', Activity.deletePerformanceResult.bind(null, user));

        // Performance comment Form CRUD
        socket.on('Activity.getPerformanceComment', Activity.getPerformanceComment.bind(null, user));
        socket.on('Activity.createPerformanceComment', Activity.createPerformanceComment.bind(null, user));
        socket.on('Activity.updatePerformanceComment', Activity.updatePerformanceComment.bind(null, user));
        socket.on('Activity.deletePerformanceComment', Activity.deletePerformanceComment.bind(null, user));

        // Capital comment Form CRUD
        socket.on('Activity.getCapital', Activity.getCapital.bind(null, user));
        socket.on('Activity.createCapital', Activity.createCapital.bind(null, user));
        socket.on('Activity.updateCapital', Activity.updateCapital.bind(null, user));
        socket.on('Activity.deleteCapital', Activity.deleteCapital.bind(null, user));
    })
};
