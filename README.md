# Project Setup

### Deploying Project to an Authorized Salesforce Org

1. **Open the command line interface**
   
   Launch your preferred command line interface (CLI) tool.
   

2. **Navigate to the project directory**

   Using the CLI, navigate to the directory where Salesforce project is located.
   

3. **Authenticate with Salesforce CLI**
   
   ```
   sfdx force:auth:web:login
   ```

   This command will open a browser window for you to log in and authorize the CLI with your Salesforce org.
   

4. **Deploy the project**
   
   ```
   sfdx force:source:deploy
   ```


5. **Monitor the deployment process**
   
   Monitor the CLI's progress and review any errors or warnings encountered during deployment.
   

6. **Verify the changes**
   
   Verify the changes in your Salesforce org to ensure that the new code has been successfully deployed.
   

### Post Deployment Steps

Make sure that your profile has custom tab settings marked as "Default On".

Go to Setup -> Users -> Select User Profile -> Custom Tab Settings -> Accounts Dashboard = Default On



# Project Structure

## Components

### Create Account Component
A Lightning Web Component used for creating new Account records. It includes a text field where the user can enter the Account Name and a Save button. Clicking the Save button triggers the creation of a new Account in Salesforce.

### Search Account Component
A Lightning Web Component used for searching Account records. It includes a text field where the user can enter the exact name of the Account they want to search for, and a Search button. Clicking the Search button triggers a search for Accounts with the exact provided name. The search results are displayed in a table with columns for Account Id, Account Name, and Billing Country. This component should be nested inside another LWC component.

### Account Table Component
A Lightning Web Component used for displaying Account records in a table format. It includes an additional button that allows the user to switch between "View Mode" and "Edit Mode." In "View Mode," the records are displayed without editing capabilities. In "Edit Mode," the user can modify the records. The component provides a Save button to save the modified records and a Cancel button to discard any changes. The component also has the ability to lock the text field in the Search Account component when in "Edit Mode."

### Refresh Data Component
A Lightning Web Component used for refreshing the data on the page. It includes a "Refresh" button that, when clicked, clears all fields in the other components mentioned above. This component allows the user to start with a clean slate and retrieve fresh data.

## Trigger

### Account Trigger
An Apex trigger that is invoked whenever an Account record is modified. The trigger calls an external service (https://random-data-api.com/api/v2/credit_cards) to generate a random credit card number. It then saves the newly generated credit card number in the "Credit Card" field of the Account object. The purpose of this trigger is to automatically update the Credit Card field with a random number each time an Account record is modified.
