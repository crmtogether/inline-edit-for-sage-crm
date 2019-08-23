<!-- #include file ="crmwizard.js" -->
<%
//this file is used to get the fields that we will apply the javascript code to for inline editing
function _getScreen(act)
{
  var res="";
  switch(act) {
	  case "200":
	  case "201":
	  case "140":
		res = "'companyboxlong'";
		break;
	  case "220":
	  case "222":
	  case "141":
		res = "'personboxlong'";
		break;
	  case "281":
	  case "284":
	  case "1192":
		res = "'CaseDetailBox'";
		break;		
	  case "260":
	  case "263":
	  case "1190":
		res = "'OpportunityDetailBox'";
		break;		
	  case "192":
	  case "193":
	  case "1191":
		res = "'LeadCustomScreen','LeadDetailScreen','LeadCompanyScreen','LeadPersonScreen'";
		break;
	  default:
		res = "noscreenfound";
	}
  return res;
}
//get our field Name
var act=new String(Request.QueryString("Act"));
act=act+""; //required to fix strange error when used later

if (act=="520")
{
	//recent list
	var RecentValue=new String(Request.QueryString("RecentValue"));
	var RecentValue_arr=RecentValue.split("X");
	act=RecentValue_arr[0];
}

//get the entity that this fieldName belongs to
var sql1="select SeaP_ColName, SeaP_SearchBoxName "+
			"from custom_screens "+
			"where SeaP_SearchBoxName in ("+_getScreen(act)+") "+
			"and Seap_DeviceID is null";

var q1=CRM.CreateQueryObj(sql1);
q1.SelectSQL();
var fieldCount=0;
var resp='[';
while (!q1.eof)
{
  if (resp!='[')
  {
    resp+=',';
  }
  var colname=new String(q1('SeaP_ColName'));
  var screenname=new String(q1('SeaP_SearchBoxName'));
  resp+='{"fieldname":"'+colname.toLowerCase()+'", "screenname":"'+screenname.toLowerCase()+'"}';
  fieldCount++;
  q1.NextRecord();
}
resp+=']';

Response.Write(resp);
%>