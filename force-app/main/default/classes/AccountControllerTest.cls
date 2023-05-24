@isTest
private class AccountControllerTest {
    
    @isTest
    static void testSearchAccountsByName() {
        //Create Test Data
        List<Account> testAccounts = new List<Account>();
        testAccounts.add(new Account(Name = 'Test Account 1', BillingCountry = 'Poland'));
        testAccounts.add(new Account(Name = 'Test Account 2', BillingCountry = 'Poland'));
        insert testAccounts;
        
        //Start Test
        Test.startTest();
            List<Account> result = AccountController.searchAccountsByName('Test Account 1');
        Test.stopTest();
        
        //Assert Test
        System.assertEquals(1, result.size(), 'Unexpected number of accounts returned');
        System.assertEquals('Test Account 1', result[0].Name, 'Incorrect account name');
        
    }
    
    @isTest
    static void testSearchAccountsByName_NoResults() {
        //Start Test
        Test.startTest();
        List<Account> result = AccountController.searchAccountsByName('Nonexistent');
        Test.stopTest();
        
        //Assert Test
        System.assertEquals(0, result.size(), 'Expected no accounts to be returned');
    }
}
