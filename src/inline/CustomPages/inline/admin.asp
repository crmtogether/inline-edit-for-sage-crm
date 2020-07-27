<!-- #include file ="crmwizard.js" -->
<%

var forReading = 1, forWriting = 2, forAppending = 8;
var newline="<br>";
var newlinetext="\n";

var CurrentUser=CRM.GetContextInfo("user", "User_logon");
CurrentUser=CurrentUser.toLowerCase();
var CurrentUserName=CRM.GetContextInfo("user", "User_firstname");
var CurrentUserEmail=CRM.GetContextInfo("user", "User_emailaddress");

Container=CRM.GetBlock("container");
Container.DisplayButton(Button_Default) =false;
Container.DisplayForm = true;

content=eWare.GetBlock('content');
content.contents = newline+"Hi "+CurrentUserName;
content.contents +=newline+"Welcome to the CRM Together Open Source page for the <b>Inline Editing for Sage CRM</b>.";
content.contents +=newline+"This will enable your summary pages be edited inline.";
content.contents +=newline+"Double click on the field to go into edit mode.";
content.contents +=newline+"Click the save icon to  update.";
content.contents +=newline+"Regards";
content.contents +=newline+"The CRM Together Open Source Team"+newline+newline;

Container.AddBlock(content);
	 
btnSend = eWare.Button("Email CRM Together", "", "mailto:sagecrm@crmtogether.com?subject=Inline Editing for Sage CRM");
Container.AddButton(btnSend);

CRM.AddContent(Container.Execute());

Response.Write(CRM.GetPage('CRMTogetherOS'));

%>