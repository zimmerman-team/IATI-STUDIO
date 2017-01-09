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

        socket.on('Activity.getAll', Activity.getAll.bind(null, user));
        socket.on('Activity.get', Activity.get.bind(null, user));
        socket.on('Activity.create', Activity.create.bind(null, user));
        socket.on('Activity.delete', Activity.delete.bind(null, user));

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

        socket.on('Activity.getCodeListItems', Activity.getCodeListItems.bind(null, user));
        socket.on('Activity.addBasicInformation', Activity.addBasicInformation.bind(null, user));
        socket.on('Activity.addDocumentLink', Activity.addDocumentLink.bind(null, user));
        socket.on('Activity.addRelations', Activity.addRelations.bind(null, user));

        // BasicInformation Date CRUD
        socket.on('Activity.getDates', Activity.getDates.bind(null, user));
        socket.on('Activity.createDate', Activity.createDate.bind(null, user));
        socket.on('Activity.updateDate', Activity.updateDate.bind(null, user));
        socket.on('Activity.deleteDate', Activity.deleteDate.bind(null, user));

        // BasicInformation Status CRUD
        socket.on('Activity.getStatus', Activity.getStatus.bind(null, user));
        socket.on('Activity.createStatus', Activity.createStatus.bind(null, user));
        socket.on('Activity.updateStatus', Activity.updateStatus.bind(null, user));
        socket.on('Activity.deleteStatus', Activity.deleteStatus.bind(null, user));

        // BasicInformation Contact CRUD
        socket.on('Activity.getContact', Activity.getContact.bind(null, user));
        socket.on('Activity.createContact', Activity.createContact.bind(null, user));
        socket.on('Activity.updateContact', Activity.updateContact.bind(null, user));
        socket.on('Activity.deleteContact', Activity.deleteContact.bind(null, user));

        // Add activity Basic Info
        socket.on('Activity.addBasicInformationDescription', Activity.addBasicInformationDescription.bind(null, user));
        socket.on('Activity.addBasicInformationStatus', Activity.addBasicInformationStatus.bind(null, user));
        socket.on('Activity.addBasicInformationDate', Activity.addBasicInformationDate.bind(null, user));
        socket.on('Activity.addBasicInformationContact', Activity.addBasicInformationContact.bind(null, user));

        // Add activity Performance
        socket.on('Activity.addPerformanceCondition', Activity.addPerformanceCondition.bind(null, user));
        socket.on('Activity.addPerformanceResult', Activity.addPerformanceResult.bind(null, user));
        socket.on('Activity.addPerformanceComment', Activity.addPerformanceComment.bind(null, user));

        // Add activity Financial
        socket.on('Activity.addFinancialBudgets', Activity.addFinancialBudgets.bind(null, user));
        socket.on('Activity.addFinancialPlannedDisbursements', Activity.addFinancialPlannedDisbursements.bind(null, user));
        socket.on('Activity.addFinancialTransactions', Activity.addFinancialTransactions.bind(null, user));
        socket.on('Activity.addFinancialCapitalSpend', Activity.addFinancialCapitalSpend.bind(null, user));

        // Add activity Contact
        socket.on('Activity.addGeopoliticalCountry', Activity.addGeopoliticalCountry.bind(null, user));
        socket.on('Activity.addGeopoliticalRegion', Activity.addGeopoliticalRegion.bind(null, user));
        socket.on('Activity.addGeopoliticalLocation', Activity.addGeopoliticalLocation.bind(null, user));

      // Add activity Classification
      socket.on('Activity.addClassificationSector', Activity.addClassificationSector.bind(null, user));
      socket.on('Activity.addClassificationPolicy', Activity.addClassificationPolicy.bind(null, user));
      socket.on('Activity.addClassificationSelect', Activity.addClassificationSelect.bind(null, user));
      socket.on('Activity.addClassificationCountryBudget', Activity.addClassificationCountryBudget.bind(null, user));
      socket.on('Activity.addClassificationHumanitarian', Activity.addClassificationHumanitarian.bind(null, user));
    })
}
