import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import RefreshChannel from '@salesforce/messageChannel/refreshChannel__c';

export default class RefreshData extends LightningElement {
    @wire(MessageContext)
    messageContext;

    // Handles the refresh button click
    handleRefresh() {
        // Creates a message with a refresh request
        let message = { refreshRequest: true };
        // Publishes the message on the refresh channel
        publish(this.messageContext, RefreshChannel, message);
    }
}
