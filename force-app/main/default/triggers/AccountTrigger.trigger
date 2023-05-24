trigger AccountTrigger on Account (before update) {
    if (Trigger.isBefore) {
        if(!System.isFuture() && !System.isBatch()){
            AccountTriggerHandler.generateCreditCardNumbers(Trigger.newMap.keySet());
        }
        
    }
}
