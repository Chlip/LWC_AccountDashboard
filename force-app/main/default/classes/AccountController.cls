public with sharing class AccountController {
    
    @AuraEnabled(cacheable=false)
    public static List<Account> searchAccountsByName(String searchTerm) {

        //Prevent SOQL Injection
        String safeSearchTerm = '%' + String.escapeSingleQuotes(searchTerm) + '%';

        //Query Accounts for LWC
        List<Account> accounts = [SELECT Id, Name, BillingCountry
                                  FROM Account
                                  WHERE Name LIKE :safeSearchTerm];
        
        return accounts;
    }
}