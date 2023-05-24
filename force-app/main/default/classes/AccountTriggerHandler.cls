public with sharing class AccountTriggerHandler {

    // Method to generate credit card numbers asynchronously
    @future (callout=true)
    public static void generateCreditCardNumbers(Set<Id> accountIds) {
        // Query the accounts with the provided IDs
        List<Account> accounts = [select Credit_Card__c from Account where id in :accountIds];

        for (Account acc : accounts) {
            // Generate a random credit card number
            String creditCardNumber = getRandomCreditCardNumber();
            // Assign the generated credit card number to the Credit_Card__c field of the account
            acc.Credit_Card__c = creditCardNumber;
            
        }

        // Update the accounts with the new credit card numbers
        update accounts;
    }
    
    // Method to get a random credit card number from an external API
    private static String getRandomCreditCardNumber() {

        String endpointUrl = 'https://random-data-api.com/api/v2/credit_cards';
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpointUrl);
        request.setMethod('GET');
        HttpResponse response = new Http().send(request);
        
        if (response.getStatusCode() == 200) {

            // Deserialize the JSON response
            Map<String, Object> jsonResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());

            // Extract the credit card number from the JSON response
            return (String) jsonResponse.get('credit_card_number');

        }

        // Return null if the response is not successful
        return null;
    }
}
