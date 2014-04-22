// JavaScript Document
create_rys=function(){
	var _url = "data_ajax/suggestions_ajax_content.cfm";
	var _urlconfig = {action:'Createmapa_r'};
	$('#div_data_r').load(_url,_urlconfig);
	var _urlconfig = {action:'Createmapa_s'};
	$('#div_data_s').load(_url,_urlconfig);	
}

		 control_place=function(){
				 $('#control_place').css("background-color", "#17375E");
				 $('#control_route').css("background-color", "lightgray");
				 $('#control_stops').css("background-color", "lightgray");
				 $("#mapasugg").show();
				 $('#divformcontent').show();
				$("#mapasugg_r").hide();
				$('#div_data_r').hide();
				$("#mapasugg_s").hide();
				$('#div_data_s').hide();
				google.maps.event.trigger(map, 'resize');
        }
		 control_route=function(){
				 $('#control_place').css("background-color", "lightgray");
				 $('#control_route').css("background-color", "#17375E");
				 $('#control_stops').css("background-color", "lightgray");
				$("#mapasugg").hide();
				$('#divformcontent').hide();
				$("#mapasugg_r").show();
				$('#div_data_r').show();
				$('#div_data_s').hide();				
				$("#mapasugg_s").hide();
				google.maps.event.trigger(map2, 'resize');
        }
		 control_stops=function(){
				 $('#control_place').css("background-color", "lightgray");
				 $('#control_route').css("background-color", "lightgray");
				 $('#control_stops').css("background-color", "#17375E");
				 $("#mapasugg").hide();
				 $('#divformcontent').hide();
				$("#mapasugg_r").hide();
				$('#div_data_r').hide();
				$('#div_data_s').show();				
				$("#mapasugg_s").show();
				google.maps.event.trigger(map3, 'resize');
        }
changepointname=function(){
var newname=document.getElementById('detail_name').value;
usermarker.setTitle(newname.toString());
			userinfowindow = new google.maps.InfoWindow(
			{ content: newname.toString(),
				size: new google.maps.Size(150,150)
			});
var isr=document.getElementById('isroute').value;
if (isr==1){
usermarker2.setTitle(newname.toString());
usermarker3.setTitle(newname.toString());
}
}
Createmap_ya=function(plname,plcoors,city){
	var _url = "data_ajax/suggestions_ajax_content.cfm";
	var _urlconfig = {action:'Createmapa_ya',plname:plname,plcoors:plcoors,city:city};
	$('#createmapa').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#createmapa').empty();alert('Error Creating Map, Please try again');
		break;
		}
	});
}
Createmap=function(){
	var city=document.getElementById('selcity').value;
	if(city==''){alert('Please select a city');return false;}
	var _url = "data_ajax/suggestions_ajax_content.cfm";
	var _urlconfig = {action:'Createmapa',city:city};
	$('#createmapa').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#createmapa').empty();alert('Error Creating Map, Please try again');
		break;
		}
	});
}
$(document).ready(function(e) {
	sendform_ajax=function(formbase){
		/*var _url = 'data_ajax/suggestions_ajax_event.cfm?rnu='+randomNumberUrl();
		var _urlconfig = formbase.serialize()+"&action=sendreport";
		console.log(_urlconfig);
		$.post(_url,_urlconfig)
			.error(sendform_ajax_error)
			.success(sendform_ajax_success)
		;
	}
	sendform_ajax_error=function(xhr, ajaxOptions, thrownError){
		alert(thrownError);
	}
	sendform_ajax_success=function(response, status, xhr){
		var _response=$.parseJSON(response);
		if(_response.MESSAGE){
		}
		alert(_response.MESSAGE);*/
		document.getElementById('form').submit();
	}
	alert_message=function(){
		alert("Your message has been sent. Thanks for your support");
	}
});
$(document).ready(function(e) {
	$("#form").submit(function(e) {
		e.stopPropagation();e.preventDefault();
		var photo_name = $("#detail_photo").val();
		$("#file_n").val(photo_name);
		var _emptyform=true;
		var _inputs=$(this).find("input:text,input:file,input:checkbox,textarea,#detail_photo");
		_inputs.each(function(index, element) {
			var _input=$(element);
			console.log(_input);
			if(element.type=="checkbox"){
				if(_input.is(":checked")){
					_emptyform=false;
					return false;
				}
			}else{
				if(_input.val()!=""){
					_emptyform=false;
					return false;
				}
			}
		});
		if(_emptyform){
			alert("At least one field must be completed. Please try again");
			return false;
		}
		var _buttonsel=false;
		var _inputs=$(this).find("input:checkbox[name='detail_commentbutton']");
		var _commentempty=$("#detail_comment").val()=="";
		_inputs.each(function(index, element) {
			if($(element).is(":checked")){
				_buttonsel=true;
				return false;
			}
		});
		if(_buttonsel && _commentempty){
			alert("At least one field must be completed. Please try again");
			return false;
		}
		//console.log(_emptyform);
		sendform_ajax($(this));
		return false;
	});
	$("#detail_servicesbutton").buttonset();
	$("#detail_transportationbutton").buttonset();
	$("#detail_commentsbutton").buttonset();
	if(cf_sid==""){pedir_sesion("");}
	return false;
});
