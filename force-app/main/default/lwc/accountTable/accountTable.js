import { LightningElement, api, track, wire } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { subscribe, MessageContext } from 'lightning/messageService';
import RefreshChannel from '@salesforce/messageChannel/refreshChannel__c';

export default class AccountTable extends LightningElement {
    @api accounts = [];
    @track columns = [
        { label: 'Account Id', fieldName: 'Id'},
        { label: 'Account Name', fieldName: 'Name', editable: this.editModeActive },
        { label: 'Billing Country', fieldName: 'BillingCountry', editable: this.editModeActive }
    ];
    @wire(MessageContext)
    messageContext;
    subscription = null;
    editModeActive = false;

    connectedCallback() {
        this.handleSubscribe();
    }

    // Subscribes to the RefreshChannel
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

    // Refreshes the component data
    refreshComponentData() {
        this.columns = [...this.columns.map(col => {
            if (col.fieldName !== 'Id') {
                col.editable = false;
            }
            return col;
        })];
        this.editModeActive = false;
        this.accounts = [];
    }

    // Switches to view mode
    switchToViewMode() {
        this.editModeActive = false;
        this.columns = [...this.columns.map(col => {
            if (col.fieldName !== 'Id') {
                col.editable = false;
            }
            return col;
        })];
        this.handleModeChange();
    }

    // Switches to edit mode
    switchToEditMode() {
        this.editModeActive = true;
        this.columns = [...this.columns.map(col => {
            if (col.fieldName !== 'Id') {
                col.editable = true;
            }
            return col;
        })];
        this.handleModeChange();
    }

    // Dispatches a mode change event
    handleModeChange() {
        const modeEvent = new CustomEvent('modechange', {
            detail: this.editModeActive
        });
        this.dispatchEvent(modeEvent);
    }

    // Handles the save action
    async handleSave(event) {
        // Convert datatable draft values into record objects
        const records = event.detail.draftValues.slice().map((draftValue) => {
            const fields = Object.assign({}, draftValue);
            return { fields };
        });
        // Clear all datatable draft values
        this.draftValues = [];
        try {
            // Update all records in parallel
            const recordUpdatePromises = records.map((record) =>
                updateRecord(record)
            );
            await Promise.all(recordUpdatePromises);

            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Accounts updated',
                    variant: 'success'
                })
            );
            // Dispatch event to refresh apex in parent component
            this.dispatchEvent(new CustomEvent('refreshdata'));

        } catch (error) {
            // Report error with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating accounts',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
}
