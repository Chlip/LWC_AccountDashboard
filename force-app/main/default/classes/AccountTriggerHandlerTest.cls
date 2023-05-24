@IsTest
public with sharing class AccountTriggerHandlerTest {
    @IsTest
    static void testGenerateCreditCardNumbers() {
        // Creating test data
        Account account = new Account(Name = 'Test Account');
        insert account;
        Set<Id> accountIds = new Set<Id>{ account.Id };

        // Mocking the HTTP response
        String mockResponse = '{"credit_card_number":"1234567890"}';
        Integer mockStatusCode = 200;
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator(mockResponse, mockStatusCode));

        // Calling the method under test
        Test.startTest();
        AccountTriggerHandler.generateCreditCardNumbers(accountIds);
        Test.stopTest();

        // Retrieving the updated account
        Account updatedAccount = [SELECT Id, Credit_Card__c FROM Account WHERE Id = :account.Id];

        // Checking if the credit card number is set
        System.assertNotEquals(null, updatedAccount.Credit_Card__c, 'Credit Card number should not be null');
        System.assertEquals('1234567890', updatedAccount.Credit_Card__c, 'Incorrect Credit Card number');
    }
    
}
