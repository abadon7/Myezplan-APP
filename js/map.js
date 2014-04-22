// JavaScript Document
currentuserplan = "";
countuserplan = 0;
global_addtocurrentplan=false;
global_mapselectionchanged=false;

//plantoItineraryValida= function(){
//		var _url="data_ajax/myitinerary_content_ajax.cfm";
//		var _urlconfig={action:"saveuseritinerary",saveaction:"validalimiteplansI"};
//				$.ajax({type:"POST",url:_url,async:false,cache:false,data:_urlconfig})
//				.success(function(datos){
//					return datos;
//					});
//		}
//
//planValida= function(){
//		var _url="data_ajax/myitinerary_content_ajax.cfm";
//		var _urlconfig={action:"saveuseritinerary",saveaction:"validalimiteplans"};
//				$.ajax({type:"POST",url:_url,async:false,cache:false,data:_urlconfig})
//				.success(function(datos){
//					return datos;
//					});
//		}

OpenmyItineraryToMap= function(arg_uiid){
		var popup = $("#shareitplans-box");
		$(popup).fadeOut(300);
		var popup = $("#mapplanscity-box2");
		$(popup).fadeIn(300);
		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		$(popup).css({ 
			/*'margin-top' : -popMargTop+$(document).scrollTop(),*/
			/*'margin-left' : -popMargLeft*/
		});
//		$('body').append('<div id="mask" class="mask"></div>');
//		$('#mask').fadeIn(300);
		/* ------------------------ */
		var _urliframepopup = "myitineraryplansmappopup.cfm?uiid="+arg_uiid;
		$('#iframe_mapplanscity2').attr("src",_urliframepopup);
		$('#iframe_mapplanscity2').fadeIn(300);
		return false;
		}
$(window).load(function(e) { 
	duid = 0;
	if(typeof(cf_sid)=="undefined"){cf_sid="";}
/* ----------------------------------------- */
	/* Click citymap */
	$('a#citymap-a').click(function() {
		cargar_citypic(ciudad);
		var popup = $("#citymap-box");
		$(popup).fadeIn(300);

		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 

		$(popup).css({ 
			//'margin-top' : -popMargTop,
			//'margin-left' : -popMargLeft
		});
		
		$('body').append('<div id="mask-citymap" class="mask"></div>');
		$('#mask-citymap').fadeIn(300);
		
		return false;
	});
/* ----------------------------------------- */

/* ----------------------------------------- */
	/* Click boton send Share */
	$('a.share-img').click(function() {
		return false;
	});

/* ----------------------------------------- */
	/* Click button saveplan-box */
	$('#button_steps #button_steps-save').click(function() { openPopupUserPlan (); });
	/* Click Close button saveplan-box*/
	$('#saveplan-box a.close').click( function() { 
		closePopup();
		return false;
	});
	/* Click Submit form [saveplan] */
	$('#saveplan-box #saveplan_submit').click( function(e) {
		e.preventDefault();
		var _mapstart = getUrlParamValue("partida_");
		var _mapId = getUrlParamValue("mapa");
		if(_mapId==""){
			alert("there is no map id.");
			return;
		}
		var _message = $("#messageerror-saveplan");
		var _saveplan_name = $("#saveplan_name");
		var _saveplan_nameValue = $.trim($(_saveplan_name).val());
		
		emptyMessageError(_message);
		/* verify all inputs */
		if(_saveplan_nameValue==""){
			showMessageError(_message,"Name is required. Please try again",300);
			hideMessageError(_message,false,300,false);
			$(_saveplan_name).select();
			$(_saveplan_name).focus();
			return false;
		}
		
		var _data = {action:"checkuserplanbyid",upname:_saveplan_nameValue};
		$.ajax({
			type: "POST",
			url: "data_ajax/map_usersplans_ajax.cfm",
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(response){
				if(response>0){
					currentuserplan = response;
					var _confirm = confirm('You already have a plan under the same name. Do you want to replace it ?');
					if (!_confirm){
						$(_saveplan_name).focus();
						return false;
					}else{
						//update plan	without showing popup
						saveUserPlan("u", currentuserplan);
						return false;
					}
				}
				//create plan	
				saveUserPlan("i",_saveplan_nameValue)
				return false;
			}
		});
	});
	/* function to open popup userplan */
	openPopupUserPlan = function(addtocurrentplan) {
		var _mapstart = getUrlParamValue("partida_");
		var _upid = currentuserplan==""?getUrlParamValue("upid"):currentuserplan;
		if(_mapstart=="" ){
			alert("Please complete all the steps before Saving.");
			return;
		}
		if(global_mapselectionchanged){
			alert("We have noticed that you have made additional changes to your plan. Please complete all the steps before Saving.");
			return;
		}
		if(cf_sid==""){
			pedir_sesion(1,"openPopupUserPlan()");
			return;
		}
		/*alert(_upid);*/
		if(_upid!=""){
			if(global_addtocurrentplan){
				saveUserPlan("u",currentuserplan);
				return true;
			}else{
				var _confirm = window.confirm("Do you want to replace your current Plan?");
				if(_confirm){
					saveUserPlan("u",currentuserplan);
					return true;
				}
			}
		}
		closePopup(0);
		var popup = $("#saveplan-box");
		$(popup).fadeIn(300);
		$("#saveplan_name").focus();

		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 50; 

		$(popup).css({ 
			//'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		return false;
	}
	printPlanMap=function(){ 
		var _mapstart = getUrlParamValue("partida_");
		if(_mapstart==""){
			alert("Please complete all the steps before Printing.");
			return;
		}
		if(global_mapselectionchanged){
			alert("We have noticed that you have made ​​additional changes to your plan. Please complete all the steps before Printing.");
			return;
		}
		var geturl = document.URL;
		var arraturl = geturl.split('?');
		/*
		var mostr_dirv = document.getElementById('mostr_dir').value; 
		var strmd = (mostr_dirv!="")?"&mostr_dirv="+mostr_dirv:"";
		window.open ("mapprint.cfm?"+arraturl[1]+""+strmd,"tourprint");
		*/
		window.open ("mapprint.cfm?"+arraturl[1],"mapprint");
	}
	/* function to save userplan */
	saveUserPlan = function(saveaction, upname){
		var _message = $("#messageerror-saveplan");
		var _decodedurlquery=decodeURIComponent(global_urlpagequery);
		global_urlpagequery=encodeURIComponent(_decodedurlquery);
		var results=getUrlStringParam(_decodedurlquery,"upid");
		if(results.length>0){
			_decodedurlquery=_decodedurlquery.replace(results,"");
			global_urlpagequery=encodeURIComponent(_decodedurlquery);
		}
		var _saveplan_share = $("#saveplan_shareit");
		var _saveplan_shareValue = true;
		if(saveaction=="i"){ 
			_saveplan_shareValue = $(_saveplan_share).is(":checked");
		}
		var _saveplan_share = $("#saveplan_addtoitinerary");
		var _addto=_saveplan_share.is(":checked");
		global_addtocurrentplan=_addto;
		var _data = "action=saveuserplan&saveaction="+saveaction+"&upname="+upname+"&upurl="+global_urlpagequery+"&upplanid="+tour+"&upid="+currentuserplan+"&upshareit="+_saveplan_shareValue;
		global_urlpagequery = encodeURIComponent(_decodedurlquery);
		$.ajax({
			type: "POST",
			url: "data_ajax/map_usersplans_ajax.cfm",
			async:true, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(response){
				var _arrResponse = response.split("|");
				var _currupid=getUrlParamValue("upid");
				var _updatelocation=(_currupid!=_arrResponse[1]);
				currentuserplan = _arrResponse[1];
				$("#upid").val(_arrResponse[1]);
				var _urlupid = "&upid="+currentuserplan;
				var _decodedurlquery = decodeURIComponent(global_urlpagequery);
				global_urlpagequery += _urlupid;
				var _locationreplace=global_urlpagename+"?"+decodeURIComponent(global_urlpagequery);
				var _time=100;
				if(_addto){
					_time=1000;
					myPlanAddToCurrentItinerary("stepitinerary-box",currentuserplan);
				}
				if(_updatelocation){
					window.setTimeout("window.location.replace",_time,_locationreplace);
				}
				showMessageError(_message,_arrResponse[0],300);
				hideMessageError(_message,true,300);
			}
		});
	}
	/* ----------------------------------------- */
	/* Click button_steps-itinerary */
	$('span#button_steps-itinerary').click(function(e) {
		e.preventDefault();
		myAccountStepItinerary();
	});
	/* myAccountStepItinerary */
	myAccountStepItinerary=function(){
		var _popup = $("#stepitinerary-box");
		_popup.fadeIn(300);

		var popMargTop = (_popup.height() + 24) / 2; 
		var popMargLeft = (_popup.width() + 24) / 2; 

		_popup.css({ 
			//'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
	}
	/* Click Close button button_steps-itinerary */
	$('#stepitinerary-box a.close').click( function() { 
		closePopup();
		return false;
	});

	$('a#stepitinerary-box-seeit').click( function() { 
		goToItinerary();
		return false;
	});
	$('a#stepitinerary-box-addthisplan').click( function() { 
		addCurrentMapToItinerary();
		return false;
	});
	$('#quitar_ .formitemchanged').change( function() { 
		global_mapselectionchanged=true;
		return false;
	});
/* End document ready*/
	

	/* Click Open button sharedeal-box */
	myDealShareByEmail=function(){
		var _popup = $("#sharedeal-box");
		_popup.fadeIn(300);

		var popMargTop = (_popup.height() + 24) / 2; 
		var popMargLeft = (_popup.width() + 24) / 2; 

		_popup.css({ 
			//'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
	}
	/* Click Close button sharedeal-box */
	$('#sharedeal-box a.close').click( function() { 
		closePopup();
		return false;
	});
	/* Click check agree [sharedeal-form]  */
	$('#sharedeal-form #sharedeal_checkagree').click(function(e) {
		$("#sharedeal_submit").addClass("submit-buttondisabled");
		if(this.checked){
			$("#sharedeal_submit").removeClass("submit-buttondisabled");
		}
		return;
	});
	/* Click Submit form [sharedeal-form] */
	$('input#sharedeal_submit').click( function(e) {
		e.preventDefault();
		var _ca = $('#sharedeal_checkagree');
		var _message = $("#messageerror-sharedeal");
		var _sharedeal_emailfrom = $.trim($("#sharedeal_emailfrom").val());
		var _sharedeal_emailto = $.trim($("#sharedeal_emailto").val());
		var _sharedeal_message = $.trim($("#sharedeal_emailmessage").val());
		//var _uiid = at_uiid==""?getUrlParamValue("uiid"):at_uiid;
		//var _uiusid = cf_sid;
		emptyMessageError(_message);
		/* verify checkAgree */
		if( !( $(_ca).is(':checked') ) ){
			return;
		}
		/* verify all inputs */
		if(_sharedeal_emailfrom=="" || _sharedeal_emailto=="" || _sharedeal_message==""){
			showMessageError(_message,"All information must be complete.<br />Please try again",300);
			hideMessageError(_message,false,300);
			return false;
		}
		/* validate Email To */
		if(!validateEmail(_sharedeal_emailto))
		{
			showMessageError(_message,"Email not valid. Please try again",300);
			hideMessageError(_message,false,300);
			return false;
		}
		//return false;
		var _data="sharefrom="+_sharedeal_emailfrom+"&shareemailto="+_sharedeal_emailto+"&sharemessage="+_sharedeal_message+"&duid="+duid+"&om=sendmail";
		$.ajax({
			type: "POST",
			url: "voucherpdf.cfm",
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
	
	$('#mapplanscity-box2 a.closesmall').click( function(e) {
	e.stopPropagation();e.preventDefault();
	$("#iframe_mapplanscity2").empty().attr("src","");
	$('#mapplanscity-box2').fadeOut();
	var popup = $("#shareitplans-box");
	$(popup).fadeIn(300);
	});
	$(document).on("mouseover","#places_list .placetooltip",function(e) {
		var $this=$(this);
		//myezplan.showGloboTip($this.data("tip"),e.target);
		myezplan.showGloboTooltip(e.target,{tipimage:$this.data("tipimage"),tipicon:$this.data("tipicon"),tipname:$this.data("tipname"),tiptype:$this.data("tiptype")});
	});
	$('.page-index #map-top-button-shareitplan').click( function(e) {
		var _city=$.trim($("#ciudad_sel").val());
		if(_city=='' ){
			alert('Before continuing, you must select the City.');
			return;
		}
		showPopupShareitPlans(_city,$("#tour_sel").val());
	});
	$('.page-map #map-top-button-shareitplan').click( function(e) {
		showPopupShareitPlans(getUrlParamValue("ciudad"),getUrlParamValue("mapa"));
	});
});
showPopupShareitPlans=function(arg_ciid, arg_plid){
	var $popup=$("#shareitplans-box");
	$popup.fadeIn(300);
	var popMargTop=($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	/*$popup.css({'margin-left':-popMargLeft});*/
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	showPopupShareitPlansAjax(arg_ciid, arg_plid);
}
showPopupShareitPlansAjax=function(arg_ciid, arg_plid){
	if($.trim(arg_ciid)=="" && $.trim(arg_plid)==""){
		return;
	}
	var $popupbody=$("#shareitplans-box #box-body");
	$popupbody.empty();
	var url="http://myezplan.com/data_ajax/shareit_ajax_content.cfm?rnu="+randomNumberUrl()+"";
	//var urlconfig = {action: "getsuggestedplans",ciid:getUrlParamValue("ciudad"),plid:getUrlParamValue("mapa")};
	var urlconfig = {action: "getsuggesteditinerarys",ciid:arg_ciid,plid:arg_plid};
	$popupbody.load(url,urlconfig,function(response, status, xhr){}).error(myezplan.utils.ajaxError);
}
/* ----------------------------------------- */
/* Auxiliar functions */
setCheckedValueFromLeftCheckInternal=function(chkdiv,pname){
	var chkpointstr = "#"+chkdiv+" :checkbox";
	var checksDiv = $(chkpointstr);
	var checksLeft = $("#left_check :checkbox:checked");
	for(var i=0; i<checksLeft.size();i++){
		var chk = checksLeft[i];
		if($(chk).val() == pname){
			for(var a=0; a<checksDiv.size();a++){
				var chk2 = checksDiv[a];
				$(chk2).attr("checked",true);
			}
			return;
		}
	}
}
myDealShare=function(evt,_duid){
		evt.preventDefault();
		duid=_duid;
		myDealShareByEmail();
}
myDealHide=function(event,parentobj,duid){
	event.preventDefault();
	var _parentobj = $("#"+parentobj);
	var _message = _parentobj.find("#messageerror-myuserdeal");
	var _rowObj = _parentobj.find("#row_"+duid);
	var _data = "action=savedealuser&saveaction=h&duid="+duid;
	var _confirm = window.confirm("You are going to hide this 'Hot Deal'. Are you sure?");
	if(!_confirm){
		return;
	}
	$.ajax({
		type: "POST",
		url: "data_ajax/map_usersdeals_ajax.cfm",
		async:false, 
		cache:false,
		data: _data,
		error: function(xhr, ajaxOptions, thrownError){
			showMessageError(_message,thrownError,300);
			hideMessageError(_message,false,300);
		},
		success: function(response){
			var _arrResponse = response.split("|");
			$(_rowObj).css("background-color","#990000").hide(1500);;
			showMessageError(_message,_arrResponse[0],300);
			hideMessageError(_message,false,300);
		}
	});
}
myDealPrint=function(event,method,duid){
	event.preventDefault();
	var _data = "om="+method+"&duid="+duid+"";
	var _url = "voucherpdf.cfm?"+_data+"";
	if(method=="inline"){
		window.open(_url,"voucherpdf","");
		return false;
	}
	window.location.replace(_url);
	return false;
}
myDealAddToCurrentItinerary=function(event,parentobj,ud_id){
	event.preventDefault();
	var _parentobj = $("#"+parentobj);
	var _message = _parentobj.find("#messageerror-myuserdeal");
	var _rowObj = _parentobj.find("#row_"+ud_id);
	var _data = "action=adddealtocurrentitinerary&ud_id="+ud_id;
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
			$(_rowObj).css("background-color","#4F6228").animate({opacity: 0.5}, 1000,function(){
				$(_rowObj).css("background-color","transparent").animate({opacity: 1.0});
			});;
			showMessageError(_message,response,300);
			hideMessageError(_message,false,300);
		}
	});
}
goToItinerary=function(){
	$.ajax({
		type: "POST",
		url: "http://myezplan.com/mobile/appdata/data_ajax/myitinerary_content_ajax.cfm",
		async:false,
		cache:false,
		data: "action=countuseritinerary",
		error: function(xhr, ajaxOptions, thrownError){
			alert(thrownError);
		},
		success: function(datos){
			if( !(parseInt(datos) > 0) ){
				alert("Your current Itinerary is empty.");
				return false;
			}
			window.open("myitinerary.html","_self");
			closePopup(0);
		}
	});
}
addCurrentMapToItinerary=function(){
	global_addtocurrentplan=true;
	var _ret = openPopupUserPlan();
	if(_ret){
		//closePopup();
	}
}
comprarAjaxLocal_Result=function(){
	verifyPendingRefresh();
}
subcatselected=function(obj){
	var valor = obj.value;
	if(valor==-1){
		var layerscat = document.getElementsByTagName("div");
		for(var i=0; i<layerscat.length;i++){
			if(layerscat[i].id.indexOf("cont_xxcat_")!=-1){
				layerscat[i].style.display = 'none';
			}
			if(layerscat[i].id.indexOf("xxcat_")!=-1){
				layerscat[i].style.display = 'none';
			}
		}
	}else{
		var layerscat = document.getElementsByTagName("div");
		for(var i=0; i<layerscat.length;i++){
			if(layerscat[i].id.indexOf("cont_xxcat_")!=-1){
				layerscat[i].style.display = 'none';
			}
			if(layerscat[i].id.indexOf("xxcat_")!=-1){
				layerscat[i].style.display = 'none';
			}
		}
		document.getElementById('cont_xxcat_'+valor).style.display='block'; 
		document.getElementById('xxcat_'+valor).style.display='block'; 
	}
}
recalcular=function(){
	var partidaar = document.getElementById("partida_").value;
	var llegadaar = document.getElementById("llegada_").value;
	var _form = document.getElementById("quitar_");
	var _formupid = document.getElementById("upid").value;
	if (_formupid == "" && currentuserplan != ""){
		document.getElementById("upid").value = currentuserplan;
	}
	if(partidaar=='' || llegadaar==''){
		alert("Please, complete all the steps.");
		return;
	}
	_form.submit();
}
loadin=function(){
	document.getElementById('loadi').style.display='none';
}	
