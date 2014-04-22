// JavaScript Document
currentuseritinerary = "";
countuseritinerary = 0;
OpenmyPlanToMap=function(url,pais,ciudad){
var url_full ='http://www.myezplan.com/'+url;
window.open(url_full,'_blank');
;}
purchased_mark = function(obj_ch,id_ruta,upid){
	var nombrecheck='purchased'+id_ruta;
	var check = document.getElementById(nombrecheck).checked;
	if (check){var check_ =1;}else{var check_ = 0;}
	var url_ = 'data_ajax/myitinerary_purchasemark.cfm?check='+check_+'&ruta='+id_ruta+'&upid='+upid+'&action=purchasemark';
	$.post(url_);
	return false;
	//alert(url_);
	}
delplanpoint= function(id,upid){
	if (confirm('Do you want to delete this place from plan')){
	var url_ = 'data_ajax/myitinerary_purchasemark.cfm?rutaid='+id+'&upid='+upid+'&action=delpointplan';
	//alert(url_);
	$.post(url_);
	window.setTimeout(location.reload(),5000);
	return false;
	}
	return false;
	}
viewplanlink_f=function(upid,upplid){
	alert(upid+' '+upplid);
	}
/* jquery functions */
$(document).ready(function() {

	openMapItineraryPopup=function(arg_uiid) {
		var popup = $("#mapplanscity-box");
		$(popup).fadeIn(300);
		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		$(popup).css({ 
		/*	'margin-top' : -popMargTop+$(document).scrollTop(),
			'margin-left' : -popMargLeft*/
		});
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		/* ------------------------ */
		var _urliframepopup = "myitineraryplansmappopup.cfm?uiid="+arg_uiid;
		$('#iframe_mapplanscity').attr("src",_urliframepopup);
		$('#iframe_mapplanscity').fadeIn(300);
		return false;
		
		
		
	}
	openMapPlanPopup=function(arg_upid,arg_upplid) {
		//alert(arg_upid);
		var popup = $("#mapplanscity-box");
		$(popup).fadeIn(300);
		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		$(popup).css({ 
			/*'margin-top' : -popMargTop+$(document).scrollTop(),
			'margin-left' : -popMargLeft*/
		});
		var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
		/*var	L = $(window).width() / 2 - popup.width() / 2;*/
		popup.css({
			top: T,
				
		})
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		/* ------------------------ */
		var _urliframepopup="mapupcityroutepopup.cfm?upid="+arg_upid+"&shml=false";
		/*if(arg_upplid==0){
			_urliframepopup="mapupcityroutepopup.cfm?upid="+arg_upid;
		}*/
		$('#iframe_mapplanscity').attr("src",_urliframepopup);
		$('#iframe_mapplanscity').fadeIn(300);
		return false;
	}
	openDetPlanPopup=function(arg_upid,arg_upplid,arg_city,arg_country,arg_day,arg_orign) {
		var popup = $("#plansplaces-box");
		$(popup).fadeIn(300);
		var popMargTop = 25 ; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		$(popup).css({ 
			/*'margin-top' : popMargTop,
			'margin-left' : -popMargLeft*/
		});
		var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
		/*var	L = $(window).width() / 2 - popup.width() / 2;*/
		popup.css({
			top: T,
				
		})
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		/* ------------------------ */
		var _urliframepopup='plandetpopup.cfm?upid='+arg_upid+'&upplid='+arg_upplid+'&countryn='+arg_country+'&cityn='+arg_city+'&day='+arg_day+'&orign='+arg_orign;
		$('#iframe_plansplaces').attr("src",_urliframepopup);
		$('#iframe_plansplaces').fadeIn(300);
		return false;
	}
	countMyUserItinerary=function(){
		var _data = "action=countuseritinerary&";
		$.ajax({
			type: "POST",
			url: "data_ajax/myitinerary_content_ajax.cfm",
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				countuseritinerary = 0;
			},
			success: function(response){
				countuseritinerary = response;
			}
		});
	};
	myItineraryRename=function(ui_idObj,ui_nameObj,ui_curnameObj,messageObj){
		var _message = messageObj;
		var _ui_idStr = $.trim(ui_idObj.val());
		var _ui_namecurStr = $.trim(ui_curnameObj.val());
		var _ui_namenewStr = $.trim(ui_nameObj.val());
		
		if(_ui_namenewStr == _ui_namecurStr){
			ui_nameObj.focus();
			showMessageError(_message,"Name doesn´t have changed. Please try again.",300);
			hideMessageError(_message,false,300);
			return;
		}
		if(_ui_namenewStr == ""){
			ui_nameObj.focus();
			showMessageError(_message,"Name is required. Please try again.",300);
			hideMessageError(_message,false,300);
			return;
		}
		var _data = "action=saveuseritinerary&saveaction=renameitinerary&ui_name="+_ui_namenewStr+"&ui_id="+_ui_idStr;
		$.ajax({
			type: "POST",
			url: "data_ajax/myitinerary_content_ajax.cfm",
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(response){
				$(ui_curnameObj).val(_ui_namenewStr);
				showMessageError(_message,response,300);
				hideMessageError(_message,false,300);
			}
		});
	}
	myItineraryPrint=function(e,printurl){
		var win = window.open(printurl,"mywindow");
		win.focus();
		e.preventDefault();
	}
	myItineraryHide=function(e,duid){
		e.preventDefault();
		var _message = $("#messageerror-useritinerarieshidden");
		var _rowObj =  $(e.target).closest("tr");
		var _data = "action=saveuseritinerary&saveaction=hideitinerary&ui_id="+duid;
		var _confirm = window.confirm("You are going to permanently delete this Itinerary. Are you sure?");
		if(!_confirm){
			return;
		}
		$.ajax({
			type: "POST",
			url: "data_ajax/myitinerary_content_ajax.cfm",
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(response){
				$(_rowObj).css("background-color","#990000").hide(1500);;
				showMessageError(_message,response,300);
				hideMessageError(_message,false,300);
			}
		});
	}
	getHtmlUserItinerary=function(scrolltoObj,empty){
		var _uiid = at_uiid==""?getUrlParamValue("uiid"):at_uiid;
		var _uiac = at_uiac==""?getUrlParamValue("uiac"):at_uiac;
		if(cf_sid==""){
			return;
		}
		$(".myitin").showLoading("loading Itinerary ...",empty);
		this._scrolltoObj = scrolltoObj;
		var _self = this;
		var url = "data_ajax/myitinerary_content.cfm?rnu="+randomNumberUrl()+"";
		var urlconfig = {action: "gethtmluseritinerariesbyid",uiid:_uiid,uiac:1,uiusid:cf_sid};
		$(".myitin").load(url,urlconfig,getHtmlUserItinerary_Result);
	}
	getHtmlUserItinerary_Result=function(response, status, xhr){
		switch (status){
			case "error":
				$(".myitin").html(xhr.statusText);
				break;
			case "success":
				getHtmlUserItinerary_success();
				break;
			default:
				break;
		}
	}
	getHtmlUserItinerary_success=function(){
		/*
		if(typeof(self._scrolltoObj)=="undefined" || self._scrolltoObj == null || self._scrolltoObj.length ==0){
			$(".myitin").scrollToMe();
		}else{
			$("#"+self._scrolltoObj).scrollToMe();
		}
		*/
		$(".daybox-content #uid_usernote").each(function(index, element) {
			$(element).blur();
		});
		$(".daybox-content .daydate-input").each(function(index, element) {
			$(element).datepicker({
				dateFormat: 'mm/dd/yy'
				/*
				changeMonth: true
				,changeYear: true
				,dateFormat: 'dd/mm/yy'
				,firstDay: 1
				,showOn: 'button'
				,buttonText: "Choose"
				,buttonImageOnly: false
				,showButtonPanel: true
				*/
				,onSelect: function(dateText, inst) {
					var _objevt = $(this)
					var _divdayboxcontent = _objevt.closest(".daybox-content");
					var _uid_idObj = _divdayboxcontent.find("#uid_id");
					var _uid_id = _uid_idObj.val();
					myItinerarychangeitemdate(_uid_idObj,dateText,_divdayboxcontent.attr("id"));
				}
			});
		});
		$( ".myitin .accordion" ).accordion({collapsible: true, heightStyle: "content",active: false,animated: 'bounceslide'});
		$( ".myitin .daybox" ).sortable({cursor: "move", handle: "h2", axis: "y", opacity: 0.35, tolerance: "pointer"
			,update : function (e, ui) { 
					var dayOrder = $(this).sortable('toArray').toString();
					var _data = {action:"saveuseritinerary",saveaction:"changeitinerarydayorder",uid_dayorder:dayOrder};
					$.post("data_ajax/myitinerary_content_ajax.cfm",_data,function(){});
			} 
		});
		$( ".myitin .daybox-content" ).disableSelection();
		}
	myItinerarychangeitemdate=function(uid_idObj,uid_daydate,objevt){
		var _uid_idStr = $.trim(uid_idObj.val());
		if(uid_daydate == ""){
			alert("no date selected");
			return;
		}
		var _data = "action=saveuseritinerary&saveaction=changeitemitinerarydate&uid_daydate="+uid_daydate+"&uid_id="+_uid_idStr;
		$.ajax({
			type: "POST",
			url: "data_ajax/myitinerary_content_ajax.cfm",
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				alert(thrownError);
			},
			success: function(response){
				//alert(response);
				getHtmlUserItinerary(objevt);
			}
		});
	}
	myItineraryTipUpdate=function(ui_id,ui_description,messageObj){
		var _message=messageObj;
		var _data={action:"saveuseritinerary",saveaction:"updatetip",ui_description:ui_description,ui_id:ui_id};
		$.ajax({
			type:"POST",
			url:"data_ajax/myitinerary_content_ajax.cfm",
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(response){
				showMessageError(_message,response,300);
				hideMessageError(_message,false,300);
			}
		});
	}

	/* Click Open button shareitinerary-box */
	myItineraryShareByEmail=function(){
		var _popup = $("#shareitinerary-box");
		_popup.fadeIn(300);

		var popMargTop = (_popup.height() + 24) / 2; 
		var popMargLeft = (_popup.width() + 24) / 2; 

		_popup.css({ 
			//'margin-top' : -popMargTop,
			/*'margin-left' : -popMargLeft*/
		});
		var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
		/*var	L = $(window).width() / 2 - popup.width() / 2;*/
		_popup.css({
			top: T,
				
		})
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
	}

	/* ----------------------------------------- */
	showPopupDealsAddToItinerary=function(){
		var $popup=$("#userdealsitinerary-box");
		$popup.fadeIn(300);
		var popMargTop=($popup.height() + 24) / 2; 
		var popMargLeft=($popup.width() + 24) / 2; 
		$popup.css({'margin-left':-popMargLeft});
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		showPopupDealsAddToItineraryAjax();
	}
	showPopupDealsAddToItineraryAjax=function(){
		var $popupbody=$("#userdealsitinerary-box .box-body");
		$popupbody.empty();
		var url="data_ajax/myitinerary_content_ajax.cfm?rnu="+randomNumberUrl()+"";
		var urlconfig = {action:"getdealsnotredeemed"};
		$popupbody.load(url,urlconfig,function(response, status, xhr){}).error(myezplan.utils.ajaxError);
	}
	window.setTimeout(showPopupDealsAddToItineraryAjax,1000);
	/* ----------------------------------------- */
});


/* jquery events */
$(document).ready(function() {
	$('#map-top-button-newmap').click( function(e) {
	var _url = "data_ajax/map_city_ajax.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {action:"clean"};
	$.post(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
		var $popup=$('#new_plan');
	$('#lololo').showLoading("Please Wait,<br/>Loading...<br/>",false);
	var _url = "data_ajax/mapcity_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'New_Plan',parametro:'new'};
	$('#new_plan').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#new_plan').empty();
		break;
		}
	});
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		$popup.fadeIn(300);
			//window.location = "mapcitypopup.cfm?ctid=5&plid=5";//window.location.reload();
		})
	;
	});
	/* function count UserItinerary */
/* ----------------------------------------- */
	//$(document).on("click", ".accordion .daybox-title", function(e){alert('funcion');});
	$(document).on("click", "#buttonAddUserPersonalPlan", function(e){
		e.preventDefault();
		myItineraryAddPersonalPlan();
		return false;
	});
	$(document).on("click", "#buttonSaveAndFile", function(e){
		e.preventDefault();
		var _objevt = $(this)
		//var _divdayboxcontent = _objevt.closest("div");
		var _divdayboxcontent=$("#divuseritineray");
		var _ui_idObj = _divdayboxcontent.find("#ui_id");
		var _ui_id = _ui_idObj.val();
		myItineraryValida(_ui_id);
		//myItinerarySaveAndFile(_ui_id);
		return false;
	});
	$(document).on("click","#buttonPrintDocument",function(e){
		e.preventDefault();
		var _ui_id = $("#divuseritineray #ui_id").val();
		window.open("myitineraryprint.cfm?uiid="+_ui_id,"myitineraryprint")
	});  
	$(document).on("click","#buttonPrintPDF",function(e){
		e.preventDefault();
		var _uiid = at_uiid==""?getUrlParamValue("uiid"):at_uiid;
		var _uiusid = cf_sid;
		var _url = "myitinerarypdf.cfm?uiid="+_uiid+"&uiusid="+_uiusid+"";
		window.location.replace(_url);
	});  
	$(document).on("click","#buttonShareItinerary",function(e){
		e.preventDefault();
		myItineraryShareByEmail();
	});  
	$(document).on("click",".myitinerary #buttonTipItinerary",function(e){
		e.preventDefault();
		myItineraryTip();
	});  
	$(document).on("click",".myitinerary #buttonMapItinerary",function(e){
		e.preventDefault();
		openMapItineraryPopup(at_uiid);
	});  
	/* Click Close button detplan-box */
	$('#plansplaces-box a.close').click( function() { 
		$("#plansplaces-box iframe")
		.empty()
		.attr("src","")
		;
		closePopup();
		return false;
	});
	/* Click Close button tipitinerary-box */
	$('#mapplanscity-box a.close').click( function() { 
		$("#mapplanscity-box .box-body iframe")
		.empty()
		.attr("src","")
		;
		closePopup();
		return false;
	});
	/* Click Close button tipitinerary-box */
	$(document).on("click", "#tipitinerary-box a.close", function() { 
		closePopup();
		return false;
	});
	$(document).on("click", "#upp_id-pick", function(e){
		e.preventDefault();
		var _objevt = $(this)
		var _divdayboxcontent = _objevt.closest(".daybox-content");
		var _upp_idObj = _divdayboxcontent.find("#upp_id");
		var _upp_id = _upp_idObj.val();
		myItineraryAddPersonalPlan(_upp_id);
		return false;
	});
	$(document).on("change", ".namebox #ui_shareit", function(e){
		e.preventDefault();
		var _ui_nameObj = $(this);
		var _parentdiv = _ui_nameObj.closest("div");
		var _ui_idObj = _parentdiv.find("#ui_id");
		var _ui_shareit = _parentdiv.find("#ui_shareit").is(":checked");
		var _messageObj = _parentdiv.find("#message");/*_ui_usernoteObj.siblings("div").children("span");*/
		var _url = "data_ajax/myitinerary_content_ajax.cfm";
		var _data = {action:"saveuseritinerary",saveaction:"checkshareit",ui_shareit:_ui_shareit,ui_id:_ui_idObj.val()};
		$.post(_url,_data);
	});
	$(document).on("change", "#tipitinerary-box #ui_shareit", function(e){
		e.preventDefault();
		var _ui_nameObj = $(this);
		var _parentdiv = $("#divuseritineray");
		var _parentdiv2 = $("#tipitinerary-box");
		var _ui_idObj = _parentdiv.find("#ui_id");
		var _ui_shareit = _parentdiv2.find("#ui_shareit").is(":checked");
		var _messageObj = _parentdiv.find("#message");/*_ui_usernoteObj.siblings("div").children("span");*/
		var _url = "data_ajax/myitinerary_content_ajax.cfm";
		var _data = {action:"saveuseritinerary",saveaction:"checkshareit",ui_shareit:_ui_shareit,ui_id:_ui_idObj.val()};
		$.post(_url,_data);
//		alert('click');
	});
	$(document).on("change", "#ui_name", function(e){
		e.preventDefault();
		var _ui_nameObj = $(this);
		var _parentdiv = _ui_nameObj.closest("div");
		var _ui_idObj = _parentdiv.find("#ui_id");
		var _ui_curnameObj = _parentdiv.find("#ui_namecur");
		var _messageObj = _parentdiv.find("#message");/*_ui_usernoteObj.siblings("div").children("span");*/
		myItineraryRename(_ui_idObj,_ui_nameObj,_ui_curnameObj,_messageObj)
	});
	$(document).on("click", ".daybox-content a.close", function(e){
		e.preventDefault();
		var _countdayboxcontent = 1;
		var _objevt = $(this)
		var _divdaybox = _objevt.closest(".daybox");
		var _divdayboxcontent = _objevt.closest(".daybox-content");
		var _uid_idObj = _divdayboxcontent.find("#uid_id");
		var _uid_id = _uid_idObj.val();
		var _divdayboxhead = _divdaybox.prev('h3');
		var _data = "action=deletefromcurrentitinerary&uid_id="+_uid_id;
		$.ajax({
			type: "POST",
			url: "data_ajax/myitinerary_content_ajax.cfm",
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				alert(thrownError);
			},
			success: function(response){
				_divdayboxcontent.animate({opacity: 0.05}, "slow").delay(350).slideToggle("fast",function(){
					_divdayboxcontent.remove();
					_countdayboxcontent = _divdaybox.find(".daybox-content").length;
					if(_countdayboxcontent == 0){
						_divdaybox.animate({opacity: 0.05}, "fast").slideToggle("fast",function(){
							_divdaybox.remove(); 
							_divdayboxhead.fadeOut('slow',function(){
								$(this).remove();
								getHtmlUserItinerary("divuseritineray");
							});
						});
					}
				});
			}
		});
	});
	$(document).on("change", ".daybox-content #uid_usernote", function(e){
		var _uid_usernoteObj = $(this)
		var _uid_idObj = _uid_usernoteObj.closest("div").find("#uid_id");
		_uid_usernote = _uid_usernoteObj.val();
		_uid_id = _uid_idObj.val();
		var _message = _uid_usernoteObj.siblings("div").children("span");
		var _data = "action=saveuseritinerary&saveaction=addusernote&uid_usernote="+_uid_usernote+"&uid_id="+_uid_id;
		$.ajax({
			type: "POST",
			url: "data_ajax/myitinerary_content_ajax.cfm",
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(response){
				showMessageError(_message,response,300);
				hideMessageError(_message,false,300);
			}
		});
	});
	var watermark_usernote = 'Add a note';
	$(document).on("blur", "#uid_usernote", function(e){
	if ($(this).val().length == 0)
		$(this).val(watermark_usernote).addClass('watermark');
	}).on("focus", "#uid_usernote", function(e){
	if ($(this).val() == watermark_usernote)
		$(this).val('').removeClass('watermark');
	}).val(watermark_usernote).addClass('watermark');

	$(document).on("click", ".daydate-pick", function(e){
		e.preventDefault();
		$(this).siblings('.daydate-input').datepicker('show');
	});
	$(document).on("click", ".daybox-content .viewplanlink,.caja_total_bs .viewplanlink", function(e){
		//alert($(this).data("id"));
		openMapPlanPopup($(this).data("upid"),$(this).data("upplid"));
	});
	$(document).on("click", ".daybox-content .viewplandetails,.caja_total_bs .viewplandetails", function(e){
		//alert($(this).data("upid"));
		//alert($(this).data("orign"));
		openDetPlanPopup($(this).data("upid"),$(this).data("upplid"),$(this).data("ciudadn"),$(this).data("coutryn"),$(this).data("dayn"),$(this).data("orign"));
	});
	/* Click Close button buttonAddUserPersonalPlan */
	$('#planpersonal-box a.close').click(function(e) { 
		$('#mask, #planpersonal-box').fadeOut(300 , function() {
			$('#mask').remove(); 
			getHtmlUserItinerary(); 
		}); 
		return false;
	});

	/* ----------------------------------------- */
	$(document).on("click", "a#buttonAddDealItinerary", function(e){
		showPopupDealsAddToItinerary();
	});
	/* Click Close button  */
	$('#userdealsitinerary-box a.close').click(function(e) { 
		$('#mask, #userdealsitinerary-box').fadeOut(300 , function() {
			$('#mask').remove();  
		}); 
		return false;
	});
	/* Click Close button myuserplan-box */
	$('.myitinerary #myuserplan-box a.close, .myitinerary #userdealsitinerary-box a.close').click( function() { 
		console.log("update panel");
		getHtmlUserItinerary();
		return false;
	});

	/* ----------------------------------------- */

	myItineraryAddPersonalPlan=function(upp_id){
		$(".load_img").css("display","block");
		//alert("New personal plan");
		var _upp_id = (typeof(upp_id)=="undefined" || upp_id == null)?0:upp_id;
		var popup = $("#planpersonal-box");
		$(popup).fadeIn(300);

		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 

		$(popup).css({ 
			//'margin-top' : -popMargTop,
			/*'margin-left' : -popMargLeft*/
		});
		
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		var _url="data_ajax/myitinerary_content_ajax.cfm";
		var _urlconfig={action:"getusersplanspersonalbyid",upp_id:_upp_id};
		$("#planpersonal-box .box-body").load(_url,_urlconfig,function(){
			$("#upp_datestart").datepicker();
			$("#upp_dateend").datepicker();
		});
		$(".load_img").fadeOut(800);
	}
	myItineraryValida= function(ui_id){
		var _url="data_ajax/myitinerary_content_ajax.cfm";
		var _urlconfig={action:"saveuseritinerary",saveaction:"validalimite",ui_id:ui_id};
				$.ajax({type:"POST",url:_url,async:false,cache:false,data:_urlconfig})
				.success(function(datos){
					if (datos==5){
						alert('You have reached the maximum limit of Itineraries (5), if you want to create a new one you have to delete one of your old Itineraries');return false;
						}else{myItinerarySaveAndFile(ui_id);
							}
					});
		}
	myItinerarySaveAndFile=function(ui_id){
		var _url="data_ajax/myitinerary_content_ajax.cfm";
		var _urlconfig={action:"saveuseritinerary",saveaction:"disableitinerary",ui_id:ui_id};
		$.ajax({type:"POST",url:_url,async:false,cache:false,data:_urlconfig})
			.error(function(xhr, ajaxOptions, thrownError){
				showMessageError(_messageplanpersonal,thrownError,300);
				hideMessageError(_messageplanpersonal,false,300);
			})
			.success(function(datos){
				at_uiid="0",at_uiac="0";
				showUserPlanTable();
				window.setTimeout(getHtmlUserItinerary,200);
				/*
				alert("Your current itinerary has been saved.");
				showMessageError(_messageplanpersonal,datos,300);
				hideMessageError(_messageplanpersonal,true,300);
				*/
			})
		;
	}
	var _messageplanpersonal = $("#messageerror-planpersonal");
	validateRequiredForm = function(e){
		var _objfield = $(this);
		var _thisform = _objfield.closest('form');
		_objfield.removeClass("required-bg1");
		if($.trim(_objfield.val()) == ""){
			_objfield.addClass("required-bg1");
			_thisform.data("errormessage","Field is required. Please try again");
			return false;
		}
		_thisform.data("errormessage","");
		return true;
	}
	$('#planpersonal-box #user_submit').click(function(e) { 
		e.preventDefault();
		var _thisform = $(this).closest('form');
		_thisform.find("#upp_name").blur();
		var _thisformerrors = _thisform.data("errormessage");
		emptyMessageError(_messageplanpersonal);
		if(_thisformerrors.length>0){ 
			showMessageError(_messageplanpersonal,_thisformerrors,300);
			hideMessageError(_messageplanpersonal,false,300);
			return false;
		}
		var _formdata = _thisform.serialize();
		/*
		alert(_formdata);
		*/
		var _url = "data_ajax/myitinerary_content_ajax.cfm";
		if( _thisform.find("#upp_id").val() == "0"){
			var _urlconfig =  "action=saveuseritinerary&saveaction=adduserplanpersonal&"+_formdata;
		}else{
			var _urlconfig =  "action=saveuseritinerary&saveaction=edituserplanpersonal&"+_formdata;
		}
		/*
		alert(_urlconfig);
		return;
		*/
		$.ajax({
			type: "POST",
			url: _url,
			async:false,
			cache:false,
			data:_urlconfig,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_messageplanpersonal,thrownError,300);
				hideMessageError(_messageplanpersonal,false,300);
			},
			success: function(datos){
				getHtmlUserItinerary();
				showMessageError(_messageplanpersonal,datos,300);
				hideMessageError(_messageplanpersonal,true,300);
			}
		});
	});
	$(document).on("blur", "#upp_name",validateRequiredForm);
/* ----------------------------------------- */
	$(document).on("click", "#buttonGetUserItinerariesHidden", function(e){
		e.preventDefault();
		myItineraryGetUserItinerariesHidden();
		return false;
	});
	myItineraryGetUserItinerariesHidden=function(){
		var _upp_id = (typeof(upp_id)=="undefined" || upp_id == null)?0:upp_id;
		var popup = $("#useritinerarieshidden-box");
		$(popup).fadeIn(300);

		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 

		$(popup).css({ 
			//'margin-top' : -popMargTop,
			/*'margin-left' : -popMargLeft*/
		});
		
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		var _url = "data_ajax/myitinerary_content_ajax.cfm";
		var _urlconfig = {action:"getuseritinerarieshidden"};
		$("#useritinerarieshidden-box .box-body").load(_url,_urlconfig,function(response, status, xhr){
			switch (status){
				case "error":
					$(this).html(xhr.statusText);
					break;
				case "success":
			}
			$(".load_img").css("display","none");
		});
	}
	/* Click Close button buttonAddUserPersonalPlan */
	$('#useritinerarieshidden-box a.close').click(function(e) { 
		$('#mask, #useritinerarieshidden-box').fadeOut(300 , function() {
			$('#mask').remove();  
		}); 
		return false;
	});

	/* Click Open button shareitinerary-box */
	myItineraryTip=function(){
		var _popup = $("#tipitinerary-box");
		_popup.fadeIn(300);
		var popMargTop = (_popup.height() + 24) / 2; 
		var popMargLeft = (_popup.width() + 24) / 2; 
		_popup.css({ 
			//'margin-top' : -popMargTop,
			/*'margin-left' : -popMargLeft*/
		});
		_popup.find("#tipitinerary_description").focus();
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
	}
	$('#tipitinerary-box #tipitinerary_submit').click(function(e) { 
		e.preventDefault();
		var _ui_descriptiont = $("#tipitinerary_description").val();
		var _ui_id = at_uiid;
		var _messageObj = $("#message-tipitinerary");/*_ui_usernoteObj.siblings("div").children("span");*/
		myItineraryTipUpdate(_ui_id,_ui_descriptiont,_messageObj)
	});
	/* Click Close button shareitinerary-box */
	$(document).on("click", "#shareitinerary-box a.close", function() { 
		closePopup();
		return false;
	});
	/* Click check agree [shareitinerary-form]  */
	$(document).on("click",'#shareitinerary-form #shareitinerary_checkagree',function(e) {
		$("#shareitinerary_submit").addClass("submit-buttondisabled");
		if(this.checked){
			$("#shareitinerary_submit").removeClass("submit-buttondisabled");
		}
		return;
	});
	/* Click Submit form [shareitinerary-form] */
	$(document).on("click",'.myitinerary form#shareitinerary-form #shareitinerary_submit',function(e) {
		e.preventDefault();e.stopPropagation();
		var $form=$(this).closest('form');
		var _ca = $form.find('#shareitinerary_checkagree');
		var _message = $form.find("#messageerror-shareitinerary");
		var _sharelink=$.trim($("#sharelink").val());
		var _shareitinerary_emailfrom = $.trim($("#shareitinerary_emailfrom").val());
		var _shareitinerary_emailto = $.trim($("#shareitinerary_emailto").val());
		var _shareitinerary_message = $.trim($("#shareitinerary_emailmessage").val());
		var _uiid = at_uiid==""?getUrlParamValue("uiid"):at_uiid;
		var _uiusid = cf_sid;
		emptyMessageError(_message);
		/* verify checkAgree */
		if( !( $(_ca).is(':checked') ) ){
			return;
		}
		/* verify all inputs */
		if(_shareitinerary_emailfrom=="" || _shareitinerary_emailto=="" || _shareitinerary_message==""){
			showMessageError(_message,"All information must be complete.<br />Please try again",300);
			hideMessageError(_message,false,300);
			return false;
		}
		/* validate Email To */
		if(!validateEmail(_shareitinerary_emailto))
		{
			showMessageError(_message,"Email not valid. Please try again",300);
			hideMessageError(_message,false,300);
			return false;
		}
		//return false;
		var _data="sharelink="+_sharelink+"&sharefrom="+_shareitinerary_emailfrom+"&shareemailto="+_shareitinerary_emailto+"&sharemessage="+_shareitinerary_message+"&uiid="+_uiid+"&uiusid="+_uiusid+"&om=sendmail";
		$.ajax({
			type: "POST",
			url: "myitinerarypdf.cfm",
			data:_data,
			async:false,
			cache:false,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(datos){
				showMessageError(_message,datos,300);
				hideMessageError(_message,true,300);
			}
		});
	});
	/* Click check agree [shareitinerary-form-2]  */
	$(document).on("click",'#shareitinerary-form-2 #shareitinerary_checkagree_2',function(e) {
		$("#shareitinerary_submit_2").addClass("submit-buttondisabled");
		if(this.checked){
			$("#shareitinerary_submit_2").removeClass("submit-buttondisabled");
		}
		return;
	});
	/* Click Submit form [shareitinerary-form] */
	$(document).on("click",'form#shareitinerary-form-2 #shareitinerary_submit_2',function(e) {
		e.preventDefault();e.stopPropagation();
		var $form=$(this).closest('form');
		var _ca = $form.find('#shareitinerary_checkagree_2');
		var _message = $form.find("#messageerror-shareitinerary");
		/* verify checkAgree */
		if( !( $(_ca).is(':checked') ) ){
			return;
		}
		var _share_sendsmsprovider = $("#share_sendsmsprovider");
		var _share_sendsmsnumber = $("#share_sendsmsnumber");
		var _share_sendsmssender = $("#share_sendsmssender");
		emptyMessageError(_message);
		/* verify input radio [name=share_send] */
		var _share_sendsmsnumber_val=formatPhoneNumber($.trim(_share_sendsmsnumber.val()));
		_share_sendsmsnumber.val(_share_sendsmsnumber_val);
		if(_share_sendsmsprovider.val()==""){
			$(_share_sendsmsprovider).focus();
			showMessageError(_message,"Please select a mobile provider",300);
		}else if( _share_sendsmsnumber_val == "" ){
			$(_share_sendsmsnumber).focus();
			showMessageError(_message,"Please write one mobile phone number",300);
		}else if(_share_sendsmsnumber_val.length != 10){
			$(_share_sendsmsnumber).focus();
			showMessageError(_message,"mobile phone number must have 10 digits",300);
		}else if(_share_sendsmssender.val()==""){
			$(_share_sendsmssender).focus();
			showMessageError(_message,"Please write a name from sender",300);
		}
		hideMessageError(_message,false,300);
		if( $.trim( _message.text() ) != "" ){
			return false;
		}
		var urlconfig = $form.serializeToObject();
		$.ajax({
			type: "POST",
			url: "data_ajax/share_itinerarysendsms.cfm",
			async:false,
			cache:false,
			data: urlconfig,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(datos){
				showMessageError(_message,datos,300);
				hideMessageError(_message,true,300);
			}
		});
	});

/* ----------------------------------------- */
	//window.setTimeout(getHtmlUserItinerary,500);
	window.setTimeout(getHtmlUserItinerary_success,500);
/* ----------------------------------------- */
});
/* End document ready*/

