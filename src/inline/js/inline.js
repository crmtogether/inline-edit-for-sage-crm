
var G_fields_url=new String(crm.url('../custompages/inline/entrygroup.asp'));
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
	console.log("inline.js: __mouseEnter");
	var activeElementName=$(this).find("> span").attr("id");
	console.log("inline.js: __mouseLeave activeElementName:"+activeElementName);
	activeElementName=activeElementName.substr(5);
	$( '#_Capt'+activeElementName ).append( $( "<img onclick=\"_editmode('"+activeElementName+"');\" src=\"../Themes/img/ergonomic/buttons/edit.gif\" style=\"float: none;\" width=\"16px\" height=\"16px\" hspace=\"0\" border=\"0\" align=\"TOP\" title=\"\">" ) );
}

function __mouseLeave() {
	console.log("inline.js: __mouseLeave");
	var activeElementName=$(this).find("> span").attr("id");
	console.log("inline.js: __mouseLeave activeElementName:"+activeElementName);
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
	
	var _screenName = $('#_Capt'+activeElementName).parent().attr("ct_screenname"); 
	_url=_url+"&field="+activeElementName+"&screen="+_screenName;
	var saveurl=new String(_url);
	console.log("new value:"+$("#"+activeElementName).val());
	saveurl=saveurl.replace("Mode=3","Mode=2");
	saveurl=saveurl.replace("Mode=1","Mode=2");
	saveurl+=GetKeys();
	var td=$('#_Capt'+activeElementName).parent();
	var _postdata=activeElementName+"="+encodeURIComponent($("#"+activeElementName).val());
	
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
			var _html= new String(_parseData(data));
			$(td).html("");
			//make sure we cope with required fields
			if (_html.indexOf("Required.gif")>0)
			{
				_html+="<img onclick=\"__updateData('"+activeElementName+"');\" src=\"../Themes/img/ergonomic/buttons/save.gif\" style=\"float: right;\" width=\"24px\" height=\"24px\" hspace=\"0\" border=\"0\" align=\"TOP\" title=\"\">"
				$(td).html(_html);
			} else {
				$(td).html(_html);
				$(td).css("border","none");
				$(td).css("outline","");
				$(td).hover(__mouseEnter,__mouseLeave);
				$(td).dblclick(__fieldDoubleClick);
				displayShortInfoMsg(crm.getTrans("GenCaptions","Updated")+": "+crm.getTrans('ColNames',activeElementName));
			}
	});		
}
function displayShortInfoMsg(msg)
{
	crm.infoMessage(msg);
	setTimeout("crm.infoMessage('')",1000);
}

function __fieldDoubleClick() {
	console.log("inline.js: __fieldDoubleClick");
	G_iscurrencyfield=false;//reset this
	var _url=G_inline_url;
	var activeElement=null;
	var activeElementName="";
	activeElement=this;
	activeElementName=$(this).find("> span").attr("id");
	console.log("inline.js: __fieldDoubleClick activeElementName:"+activeElementName);
	activeElementName=activeElementName.substr(5);
	console.log("activeElement: "+activeElementName);
	var _screenName = $('#_Capt'+activeElementName).parent().attr("ct_screenname"); 
	_url=_url+"&field="+activeElementName+"&screen="+_screenName;
	_url+=GetKeys();
	//send info to page
	var td=$(this);
	$.get( _url)
	  .done(function( data ) {
		var _edithtml= _parseData(data);  
		_edithtml+="<img onclick=\"__updateData('"+activeElementName+"');\" src=\"../Themes/img/ergonomic/buttons/save.gif\" style=\"float: none;\" width=\"24px\" height=\"24px\" hspace=\"0\" border=\"0\" align=\"TOP\" title=\"\">"
		$(td).html(_edithtml);
		$(td).css("border","none");
		$(td).css("outline","solid 1px #EBEDEF");
		$(td).unbind('mouseenter mouseleave dblclick');
	});
}
function _isEditMode()
{
	var editScreenacts=["Act=201","Act=222", "Act=284", "Act=263", "Act=193"]
	var _url=new String(window.location);
	if (_url.indexOf("Mode=3")>0)
		{
			return false;
		} 
	for (var x=0;x<editScreenacts.length;x++)
	{
		if (_url.indexOf(editScreenacts[x])>0)
		{
			return true;
		}
	}
	return false;
}
	
$(document).ready(function () {
	console.log("inline.js loading...");
	console.log("inline.js G_fields_url: "+G_fields_url);
	console.log("inline.js location:"+window.location);
	if (!_isEditMode())
	{
		$.get( G_fields_url)
		  .done(function( data ) {
				console.log("inline.js screen fields:");
				var json_fields=JSON.parse(data);
				for(var x=0;x<json_fields.length;x++)
				{
					$('span[id="_Capt'+json_fields[x].fieldname+'"]').parent().hover(__mouseEnter,__mouseLeave);
					$('span[id="_Capt'+json_fields[x].fieldname+'"]').parent().dblclick(__fieldDoubleClick);
					$('span[id="_Capt'+json_fields[x].fieldname+'"]').parent().attr("ct_screenname",json_fields[x].screenname);
				}
				
		});			
	}
	
});