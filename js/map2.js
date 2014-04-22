// JavaScript Document
function OpenmyPlanToMap(url,pais,ciudad){
var url_full ='http://www.myezplan.com/'+url;
window.open(url_full,'_parent');
;}
/* jquery events */
$(document).ready(function(e) {
/* ----------------------------------------- */
/* ----------------------------------------- */
});
/* jquery events */

goToMyLocation=function(e,arg_map){
	//alert('gotomylocation');
	if(typeof(initialLocation)=="undefined"){initialLocation=arg_map.getCenter();}
	clearTimeout(gtml_time1);
	clearTimeout(gtml_time2);
	if(navigator.geolocation) {
		if(myLocationMarker!=null){
			myLocationMarker.setMap(null);
			myLocationMarker=null;
			arg_map.setCenter(initialLocation);
			if(typeof(e) == "undefined" || e==null){
				gtml_time2=window.setTimeout(goToMyLocation,10000,e,arg_map);
			}else{
				myLocationControlChange("disable");
				clearTimeout(gtml_time1);
				clearTimeout(gtml_time2);
			}
			return;
		}
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			var current_center = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			arg_map.setCenter(current_center);
			myLocationMarker = new google.maps.Marker({
				position: current_center,
				map: arg_map,
				title:"You are here!",
				icon: myLocationMarkerIcon,
				zIndex:google.maps.Marker.MAX_ZINDEX+1
			});
			myLocationControlChange("enable");
			clearTimeout(gtml_time2);
			gtml_time1=window.setTimeout(goToMyLocation,10000,null,arg_map);
		}, function() {
			handleNoGeolocation(browserSupportFlag);
		});
	// Try Google Gears Geolocation
	} else if (google.gears) {
		browserSupportFlag = true;
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(function(position) {
			initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
			arg_map.setCenter(initialLocation);
		}, function() {
			handleNoGeoLocation(browserSupportFlag);
		});
	// Browser doesn't support Geolocation
	} else {
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}
}
function handleNoGeolocation(errorFlag) {
	if (errorFlag == true) {
		alert("Geolocation service failed.");
	} else {
		alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
	}
}
function myLocationControlChange(arg_active) {
	$("#controluimylocation").css("background-color","transparent");
	if(arg_active=="disable"){
		$("#controluimylocation").css("background-color","white");
		$("#controluimylocation").css("color","black");
	}else if(arg_active=="enable"){
		$("#controluimylocation").css("background-color","#C00000");
		$("#controluimylocation").css("color","white");
	}
}
function myLocationControlAdd(arg_map) {
	var _myLocationControlDiv = document.createElement('div');
	var _myLocationControl = new myLocationControl(_myLocationControlDiv, arg_map);
	_myLocationControlDiv.index = 1;
	arg_map.controls[google.maps.ControlPosition.TOP_RIGHT].push(_myLocationControlDiv);
}
function myLocationControl(controlDiv, arg_map) {
	controlDiv.style.padding = '3px';
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'white';
	controlUI.style.color = 'black';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '1px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.style.padding = '3px';
	//controlUI.title = 'Click to see My Location';
	controlUI.id = 'controluimylocation';
	controlDiv.appendChild(controlUI);
	var controlText = document.createElement('div');
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '12px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = '<strong>My Location</strong>';
	controlUI.appendChild(controlText);

	google.maps.event.addDomListener(controlUI, 'click', function(e) {
		goToMyLocation(e,arg_map);
	});
}
function goToMapPlace(origin){
	var _url="mapplace.cfm?plid=";
	var _plid="";
	switch(origin){
		case "start":
			_plid=$.trim($("#partida_").val()) || $.trim($("form #sp").val());
			if(_plid==""){
				return false;
			}
			if(_plid<6){
				var _url='mapplace_per.cfm?';
				var plpcoo=$.cookie("EZPERSONAL");
				var plp_=plpcoo.split('!');
				var este=plp_[_plid-1];
				var este_=este.split('*');
				var nombre='plname='+este_[0];
				var coors=este_[1].replace('(','').replace(')','').split(',');
				var lat='&pllat='+coors[0];
				var lng='&pllng='+coors[1];
				var _url=_url+nombre+lat+lng;
				break;}
			else{
			_url+=_plid;			
			break;}
		case "end":
			_plid=$.trim($("#llegada_").val()) || $.trim($("form #ep").val());
			if(_plid==""){
				return false;
			}
			if(_plid<6){
				var _url='mapplace_per.cfm?';
				var plpcoo=$.cookie("EZPERSONAL");
				var plp_=plpcoo.split('!');
				var este=plp_[_plid-1];
				var este_=este.split('*');
				var nombre='plname='+este_[0];
				var coors=este_[1].replace('(','').replace(')','').split(',');
				var lat='&pllat='+coors[0];
				var lng='&pllng='+coors[1];
				var _url=_url+nombre+lat+lng;
				break;}
			else{
			_url+=_plid;			
			break;}
	}
	window.open(_url,"mapplace");//alert(_url);
}
function tooltip_(msg){
	if(msg!=''){
		document.getElementById('globo').innerHTML=msg;
		document.getElementById('globo').style.display='block';
	}
}
function toolout_(){
	document.getElementById('globo').innerHTML='';
	document.getElementById('globo').style.display='none';
}

/*
getPageUrl=function(arg_origin){
	//arg_origin = ['form','url']
	var _origin=($.trim(arg_origin)!="")?arg_origin:"url";
	switch(_origin.toLowerCase()){
		case "form":
			var _form = $("#drawform");
			//global_urlpagequery="?"+_form.serialize();
			global_urlpagequery="?"+_form.find(":input[value][value!='']").serialize();
			break;
		case "url":
			var _re=new RegExp('[\\?]').exec(global_urlpagequery);
			global_urlpagequery="?"+global_urlpagequery.replace(_re,"");
			break;
	}
	return $.trim(global_urlpagename)+""+$.trim(global_urlpagequery);
}
getShortenPageUrl_ajax=function(arg_origin){
	var _url = "cfc/mapcity.cfc";
	var _urlconfig = {method:"googleURLShorten_json",url:getPageUrl(arg_origin)};
	$.getJSON(_url,_urlconfig,getShortenPageUrl_ajax_result);
}
getShortenPageUrl_ajax_result=function(response, status, xhr){
	global_urlShortenFullpage=response.URL;
	var _popup = $("#share-box");
	_popup.find("#share-box-twitter-e").attr("href",getTweeterUrl());
	_popup.find("#share-box-blogger-e").attr("href",getBloggerUrl());
	_popup.find("#share-box-2 #sharelink").val(getMailUrl());
	_popup.find("#share-box-2 #sharelinkgpx").val(getGpxUrl());
}
getShortenPageUrl=function(){
	return global_urlShortenFullpage;
}
myPlanCityShare=function(event,parentobj,arg_origin){
	getShortenPageUrl_ajax(arg_origin);
	var _popup = $("#share-box");
	_popup.fadeIn(300);
	_popup.find('#title-box-2').click();
	var popMargTop = (_popup.height() + 24) / 2; 
	var popMargLeft = (_popup.width() + 24) / 2; 
	_popup.css({ 
		//'margin-top' : -popMargTop,
		'margin-left' : -popMargLeft
	});
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	_popup.find("#share-box-facebook-e").click(function(e) {
		window.open(getFacebookUrl(),'sharer','toolbar=0,status=0,width=626,height=436'); return false;
	});
}
showPrint=function(arg_showhide,arg_object){
	$("#"+arg_object+"").toggle(arg_showhide);
}
*/