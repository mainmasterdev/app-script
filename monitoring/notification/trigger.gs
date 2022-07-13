function CreateTriggers() {
  let triggers = ScriptApp.getProjectTriggers();
  if (triggers.length === 0) {
    ScriptApp.newTrigger('app').timeBased().everyHours(6).create();
    console.log('triggers created')
  }
  
}
