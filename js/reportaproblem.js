// JavaScript Document
$(document).ready(function(e) {
	sendform_ajax=function(formbase){
/*		var _url = 'data_ajax/reportaproblem_ajax_event.cfm?rnu='+randomNumberUrl();
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
	
});
$(document).ready(function(e) {
	$("#form").submit(function(e) {
		e.stopPropagation();e.preventDefault();
		var photo_name = $("#detail_photo").val();
		$("#file_n").val(photo_name);
		var _emptyform=true;
		var _inputs=$(this).find("input:text,input:checkbox,textarea");
		_inputs.each(function(index, element) {
			var _input=$(element);
			//console.log(_input);
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
