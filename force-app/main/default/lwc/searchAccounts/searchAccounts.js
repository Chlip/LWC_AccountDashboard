import { LightningElement, wire } from 'lwc';
import searchAccountsByName from '@salesforce/apex/AccountController.searchAccountsByName';
import { subscribe, MessageContext } from 'lightning/messageService';
import RefreshChannel from '@salesforce/messageChannel/refreshChannel__c';

export default class SearchAccounts extends LightningElement {
    @wire(MessageContext)
    messageContext;
    searchTerm = '';
    foundAccounts = [];
    editModeActive = false;
    subscription = null;
    foundAccountsBool = false;

    connectedCallback() {
        this.handleSubscribe();
    }
 
    // Handles the subscription to the RefreshChannel
    handleSubscribe() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, RefreshChannel, (message) => {
           if (message.refreshRequest) {
                this.refreshComponentData();
           }
        });
    }

    // Clears the component data when a refresh request is received
    refreshComponentData() {
        this.editModeActive = false;
        this.foundAccounts = [];
        this.searchTerm = '';
        this.foundAccountsBool = false;
    }

    // Handles the change in the search term input field
    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
    }

    // Handles the mode change event from child components
    handleModeChange(event) {
        this.editModeActive = event.detail;
    }

    // Executes the account search
    searchAccounts() {
        searchAccountsByName({ searchTerm: this.searchTerm })
            .then((result) => {
                this.foundAccounts = result;
                this.foundAccountsBool = true;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Handles the refresh data event, when record is being edited from child component
    handleRefreshData() {
        this.searchAccounts();
    }
}
