/*

Screen Objects that have been added or updated

*/

ObjectName='CRMTogetherOS';
ObjectType='TabGroup';
EntityName='system';
var CObjId10869 = AddScreenObject();

/*

Add in admin menu

*/

var TabsId11081 = AddCustom_Tabs(0,0,11,'Admin','CRM Together OS','customfile','CRMTogetherOS/admin.asp','','waves.gif',0,'',false,0);

var TabsId11082 = AddCustom_Tabs(0,0,1,'CRMTogetherOS','Home','customfile','CRMTogetherOS/admin.asp','','',0,'',false,0);

var TabsId11083 = AddCustom_Tabs(0,0,2,'CRMTogetherOS','Inline','customfile','inline/admin.asp','','',0,'',false,0);

//copy files
var CRMTogetherOS="CRMTogetherOS";
CreateNewDir(GetDLLDir() + '\\CustomPages\\' + CRMTogetherOS);
CopyASPTo(CRMTogetherOS+'\\admin.asp','\\CustomPages\\'+CRMTogetherOS+'\\admin.asp');
CopyASPTo(CRMTogetherOS+'\\sagecrm.js','\\CustomPages\\'+CRMTogetherOS+'\\sagecrm.js');
CopyASPTo(CRMTogetherOS+'\\sagecrmnolang.js','\\CustomPages\\'+CRMTogetherOS+'\\sagecrmnolang.js');

var _folder="inline";

CopyASPTo(_folder+'\\crmconst.js','\\CustomPages\\'+_folder+'\\crmconst.js');
CopyASPTo(_folder+'\\crmwizard.js','\\CustomPages\\'+_folder+'\\crmwizard.js');
CopyASPTo(_folder+'\\crmwizardnolang.js','\\CustomPages\\'+_folder+'\\crmwizardnolang.js');
CopyASPTo(_folder+'\\entry.asp','\\CustomPages\\'+_folder+'\\entry.asp');

CopyASPTo('\\js\\inline.js','\\js\\custom\\inline.js');
