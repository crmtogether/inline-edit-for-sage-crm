<!-- #include file ="sagecrm.js" -->
<%

var CurrentUser=CRM.GetContextInfo("user", "User_logon");
CurrentUser=CurrentUser.toLowerCase();
var CurrentUserName=CRM.GetContextInfo("user", "User_firstname");
var CurrentUserEmail=CRM.GetContextInfo("user", "User_emailaddress");

Container=CRM.GetBlock("container");
Container.DisplayButton(Button_Default) =false;
Container.DisplayForm = false;

var newline="<br>";

content=eWare.GetBlock('content');
content.contents = newline+"Hi "+CurrentUserName;
content.contents +=newline+"Welcome to the CRM Together Open Source page.";
content.contents +=newline+"The content and code here is FREE to use at your own risk and discretion.";
content.contents +=newline+"CRM Together accept no liability over what this code might do to your system.";
content.contents +=newline+"It's up to you to decide to use it or not.";
content.contents +=newline+"We do try to take care that nothing will happen but trust you will make and take responsibility for using this FREE software.";
content.contents +=newline+"Regards";
content.contents +=newline+"The CRM Together Open Source Team";

Container.AddBlock(content);

btnSend = eWare.Button("Email CRM Together", "", "mailto:sagecrm@crmtogether.com?subject=CRM Together Open Source");
Container.AddButton(btnSend);
	  
CRM.AddContent(Container.Execute());

Response.Write(CRM.GetPage('CRMTogetherOS'));

%>