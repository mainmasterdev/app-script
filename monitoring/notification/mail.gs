function getEmailHtml(data) {
  var htmlTemplate = HtmlService.createTemplateFromFile("notification.html");
  htmlTemplate.servers = data.servers;
  var htmlBody = htmlTemplate.evaluate().getContent();
  return htmlBody;
}
function getEmailText(data) {
  var text = "";
  data.servers.forEach(function (data) {
    text = text + data.id + "\n" + data.name + "\n" + data.days + data.due_date + "\n" + "\n-----------------------\n\n";
  });
  return text;
}
function sendServerEmail(data) {
  var body = getEmailText(data);
  var htmlBody = getEmailHtml(data);

  MailApp.sendEmail({
    to: "{{correo}}",
    subject: "Server Updates",
    body: body,
    htmlBody: htmlBody
  });
}
