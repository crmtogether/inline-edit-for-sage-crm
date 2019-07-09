
var G_inline_url=new String(crm.url('../custompages/inline/entry.asp'));
var G_iscurrencyfield=false;
		
function _parseData(data)
{
	//return new String(data);
	var html=new String(data);
	console.log(html);
	console.log("==============");
	var prestartstring=new String("<TABLE");
	var res_part0="";
	var prestart=html.indexOf(prestartstring);
	if (prestart>-1)
	{
		res_part0=html.substring(0,prestart);
	}
	var startstring=new String("<TD  VALIGN=TOP >");
	var start=html.indexOf(startstring);
	var res_part1=html.substring(start+startstring.length);
	var endString=new String("</TR>");
	var end=res_part1.indexOf(endString);
	var res_part2=res_part1.substring(0,end);
	console.log(res_part0+res_part2);
	return res_part0+res_part2;
}

function _editmode(field)
{
   $("#_Data"+field).dblclick(); 
}

function __mouseEnter() {
	var activeElementName=$(this).attr("id");
	activeElementName=activeElementName.substr(5);
	$( '#_Capt'+activeElementName ).append( $( "<img onclick=\"_editmode('"+activeElementName+"');\" src=\"../Themes/img/ergonomic/buttons/edit.gif\" style=\"float: none;\" width=\"16px\" height=\"16px\" hspace=\"0\" border=\"0\" align=\"TOP\" title=\"\">" ) );
}

function __mouseLeave() {
	var activeElementName=$(this).attr("id");
	activeElementName=activeElementName.substr(5);
	$( '#_Capt'+activeElementName ).find( "img:last" ).remove();
}
function __getFieldEntryType(activeElementName)
{
   var res=$("#_HIDDEN"+activeElementName).attr("entrytype");
   return res;
}
function __updateData(activeElementName)
{
	console.log("__updateData:"+activeElementName);
	var _url=G_inline_url;
	_url=_url+"&field="+activeElementName;
	var saveurl=new String(_url);
	console.log("new value:"+$("#"+activeElementName).val());
	saveurl=saveurl.replace("Mode=3","Mode=2");
	saveurl=saveurl.replace("Mode=1","Mode=2");
	var td=$('#_Capt'+activeElementName).parent();
	var _postdata=activeElementName+"="+$("#"+activeElementName).val();
	
	//currency field
	if (__getFieldEntryType(activeElementName)=="51") 
	{
		_postdata+="&"+activeElementName+"_CID="+$("#"+activeElementName+"_CID").val()
	}else if (__getFieldEntryType(activeElementName)=="45") 
	{
		if(document.getElementById("_ID"+activeElementName).checked) {
			_postdata=activeElementName+"=Y";
		} else {
			_postdata=activeElementName+"=N";
		}
	}
	
	$.post( saveurl, _postdata)
	  .done(function( data ) {
		    console.log("__updateData done:"+activeElementName);
			var _html= _parseData(data);
			$(td).html("");
			$(td).html(_html);
			$(td).css("border","none");
		    $(td).css("outline","");
			$('#_Capt'+activeElementName).hover(__mouseEnter,__mouseLeave);
			$('#_Data'+activeElementName).hover(__mouseEnter,__mouseLeave);
			$('#_Data'+activeElementName).dblclick(__fieldDoubleClick);
			displayShortInfoMsg(crm.getTrans("GenCaptions","Updated")+": "+crm.getTrans('ColNames',activeElementName));
	});		
}
function displayShortInfoMsg(msg)
{
	crm.infoMessage(msg);
	setTimeout("crm.infoMessage('')",1000);
}

function __fieldDoubleClick() {
	G_iscurrencyfield=false;//reset this
	var _url=G_inline_url;
	var activeElement=null;
	var activeElementName="";
	activeElement=this;
	activeElementName=$(this).attr("id");
	activeElementName=activeElementName.substr(5);
	console.log("activeElement: "+activeElementName);
	_url=_url+"&field="+activeElementName;
	//send info to page
	var td=$(this).parent();
	$.get( _url)
	  .done(function( data ) {
		var _edithtml= _parseData(data);  
		_edithtml+="<img onclick=\"__updateData('"+activeElementName+"');\" src=\"../Themes/img/ergonomic/buttons/save.gif\" style=\"float: right;\" width=\"24px\" height=\"24px\" hspace=\"0\" border=\"0\" align=\"TOP\" title=\"\">"
		$(td).html(_edithtml);
		$(td).css("border","none");
		$(td).css("outline","solid 1px #EBEDEF");
	});
}
	
$(document).ready(function () {
	console.log("inline.js loading...");
	$('span[id*="_Capt"]').hover(__mouseEnter,__mouseLeave);
	$('span[id*="_Data"]').hover(__mouseEnter,__mouseLeave);
	$('span[id*="_Data"]').dblclick(__fieldDoubleClick);
	
});