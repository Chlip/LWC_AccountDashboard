import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { subscribe, MessageContext } from 'lightning/messageService';
import RefreshChannel from '@salesforce/messageChannel/refreshChannel__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateAccount extends LightningElement {
    @wire(MessageContext)
    messageContext;
    accountName = '';
    subscription = null;

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
        this.accountName = '';
    }

    // Handles the change in the account name input field
    handleAccountNameChange(event) {
        this.accountName = event.target.value;
    }

    // Creates a new account record
    createAccount() {
        const fields = { Name: this.accountName };
        createRecord({ apiName: ACCOUNT_OBJECT.objectApiName, fields })
            .then(() => {
                this.accountName = '';
                // Report success with a toast
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success'
                    })
                );
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating account',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }    
}
