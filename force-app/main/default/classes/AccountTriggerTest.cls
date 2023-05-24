@IsTest
private class AccountTriggerTest {

    @IsTest
    static void testAccountTrigger() {
        // Create test data
        Account account = new Account(Name = 'Test Account');
        insert account;

        // Modify the account and invoke the trigger
        Test.startTest();
        account.Name = 'Updated Account';
        update account;
        Test.stopTest();

        // Retrieve the updated account
        Account updatedAccount = [SELECT Id, Credit_Card__c FROM Account WHERE Id = :account.Id];

        // Check if the credit card number has been set
        System.assertNotEquals(null, updatedAccount.Credit_Card__c, 'Credit Card number should not be null');
    }

}
