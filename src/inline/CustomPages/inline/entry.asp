<!-- #include file ="crmwizard.js" -->
<%
//get our field Name
var fieldName=new String(Request.QueryString("field"));
fieldName=fieldName+""; //required to fix strange error when used later
//screen name
var screenName=new String(Request.QueryString("screen"));
screenName=screenName+""; //required to fix strange error when used later

//check if the request is a POST...if so it is a save request
if (Request.Form(fieldName)+""!="undefined")
{
  CRM.Mode=Save;
}
if (CRM.Mode==View)
{
  CRM.Mode=Edit;
}

//get the entity that this fieldName belongs to
var sql1="select ColP_Entity, ColP_EntryType from Custom_Edits where ColP_ColName='"+fieldName+"'";
var q1=CRM.CreateQueryObj(sql1);
q1.SelectSQL();
var entity=q1("ColP_Entity");

//get the id field of this entity
var sql2="select Bord_IdField from Custom_Tables where Bord_Name='"+entity+"'";
var q2=CRM.CreateQueryObj(sql2);
q2.SelectSQL();
var idfield=q2("Bord_IdField");

//get the id
var id=CRM.GetContextInfo(entity,idfield);

if (id=="")
{
	//from a recent list for example
	var RecentValue=new String(Request.QueryString("RecentValue"));
	var RecentValue_arr=RecentValue.split("X");
	id=RecentValue_arr[2];
}

//get our screen holder
EntryGroup=CRM.GetBlock("entrygroup");

//get our record
var record=CRM.FindRecord(entity,idfield+"="+id);

EntryGroup.DisplayButton(1)=false;
EntryGroup.DisplayForm=false;

var ent=EntryGroup.AddEntry(fieldName);

//set up the entry so its the same as on the screen
var sql_screenentry="select  ColP_Entity, ColP_EntryType, SeaP_CreateScript, SeaP_ValidateScript, SeaP_OnChangeScript, SeaP_SearchBoxName "+
         "from Custom_Edits  "+
         "left join Custom_Screens on SeaP_SearchBoxName='"+screenName+"' "+
         "where ColP_ColName='"+fieldName+"' and Seap_DeviceID is null and SeaP_ColName='"+fieldName+"' "+
         "and ColP_Entity='"+entity+"'";
		 
var qsql_screenentry=CRM.CreateQueryObj(sql_screenentry);
qsql_screenentry.SelectSQL();
if (!qsql_screenentry.eof)
{
	ent.CreateScript = qsql_screenentry("SeaP_CreateScript");
	ent.ValidateScript = qsql_screenentry("SeaP_ValidateScript");
	ent.OnChangeScript = qsql_screenentry("SeaP_OnChangeScript");
}
Response.Write(EntryGroup.Execute(record));

%>