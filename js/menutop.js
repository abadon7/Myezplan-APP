// JavaScript Document
/* load global function */
//getCountryFromMapCity_ajax=function(){
//	var _url = "data_ajax/map_city_ajax.cfm?rnu="+randomNumberUrl()+"";
//	var _urlconfig = {action:"getcountry" };
//	$.post(_url,_urlconfig)
//		.error(getCountryFromMapCity_ajax_error)
//		.success(getCountryFromMapCity_ajax_success)
//	;
//}
//getCountryFromMapCity_ajax_error=function(xhr, ajaxOptions, thrownError){
//	console.log(thrownError);
//}
//getCountryFromMapCity_ajax_success=function(response, status, xhr){
//	var _response=$.parseJSON(response);
//	global_countrymapcity=_response.MESSAGE;
//}
	goToItinerary=function(){
		if(!cf_sid){pedir_sesion("1","mapcity.goToItinerary(1)");return;}
		window.location.href="myitinerary.cfm";
	}
OpenmyPlanToMap=function(url,pais,ciudad){
var url_ = url.replace('mapcity.cfm?','?');
var _cookie_pl=decodeURIComponent(getUrlStringParamValue(url,"pl"));
$('#myuserplan-box').hide();
var _countryid = pais;
var _cityid = ciudad;
setCountryToMapCity_ajax(_countryid,_cityid,true);
mapcity.countryid=_countryid;
mapcity.cityid=_cityid;
$.cookie("EZMAPCITYQUERY",url_);
$.cookie("EZMAPCITYSAVELOAD", 'SAVED');
//		mapcity.places.pl=_cookie_pl.split(",");
//		$.each(mapcity.places.pl,function(index,value){if($.isNumeric(value)){mapcity.places.pl[index]=parseInt(value);}});
//		$(mapcity.selectors.pl).val(mapcity.places.pl.join(","));
		mapcity.places.pl=_cookie_pl.split(",");
		$.each(mapcity.places.pl,function(index,value){if($.isNumeric(value)){
		var _url = "data_ajax/map_city_ajax.cfm?rnu="+randomNumberUrl()+"";
		var _urlconfig = {pid:value,action:"add"};
		$.post(_url,_urlconfig)
		}});
$('#mask').remove();
window.setTimeout("mapcity.initPage();",10);
$(mapcity.selectors.city)=_cityid;
mapcity.getPlansByCity();
mapcity.updateMapCityConfig();
mapcity.getCookieQuery();
mapcity.getPlaces();
mapcity.routeMap();
}
mapcity.setCookieQuery=function(){
	var loginafter=$.cookie("EZMAPCITYLOGINAFTER");
	var loginafter2=$.cookie("EZMAPCITYSAVELOGIN");
	var loads = $.cookie(mapcity.selectors.cookieload);
	if (loads != 'SAVED' && loginafter != 'LOGIN' && loginafter2 !='LOGIN'){$.cookie(mapcity.selectors.cookiequery, mapcity.pageurl.getUrlQuery());}
	var _cookie=$.cookie(mapcity.selectors.cookiequery);
	//alert(_cookie);
	return mapcity.getCookieQuery();
}
mapcity.getCookieQuery=function(arg_renewcookie){
	var _renewcookie=(typeof(arg_renewcookie)=="boolean")?arg_renewcookie:false;
	if(_renewcookie){mapcity.setCookieQuery();}
	var _cookie=$.cookie(mapcity.selectors.cookiequery);
	//alert('aqui es el fish'+_cookie);
	//console.log(_cookie);
	var _cookie_plse=decodeURIComponent(getUrlStringParamValue(_cookie,"plse"));
	if(!($.isEmptyObject(_cookie_plse))){
		mapcity.places.plse=_cookie_plse.split(",");
		$.each(mapcity.places.plse,function(index,value){if($.isNumeric(value)){mapcity.places.plse[index]=parseInt(value);}});
	}
	var _cookie_plom=decodeURIComponent(getUrlStringParamValue(_cookie,"plom"));
	if(!($.isEmptyObject(_cookie_plom))){
		mapcity.places.plom=_cookie_plom.split(",");
		$.each(mapcity.places.plom,function(index,value){
			if($.isNumeric(value)){
				mapcity.places.plom[index]=parseInt(value);
			}
		});
	}
	var loads = $.cookie(mapcity.selectors.cookieload);
	if (loads == 'SAVED'){mapcity.places.userselection.changed=true;}
	var loginafter=$.cookie("EZMAPCITYLOGINAFTER");
	if (loginafter == 'LOGIN'){mapcity.places.userselection.changed=true;}
	var loginafter2=$.cookie("EZMAPCITYSAVELOGIN");
	if (loginafter2 == 'LOGIN'){mapcity.places.userselection.changed=true;}
	mapcity.places.sp=getUrlStringParamValue(_cookie,"sp");
	mapcity.places.ep=getUrlStringParamValue(_cookie,"ep");
	mapcity.places.gotm=getUrlStringParamValue(_cookie,"gotm") || mapcity.mapconfig.maptravelmode;
	mapcity.places.upid=getUrlStringParamValue(_cookie,"upid");
	return _cookie;
}
mapcity.setUPID=function(arg_upid){
	mapcity.places.upid=arg_upid;
	$(mapcity.selectors.upid).val(arg_upid);
	mapcity.setCookieQuery();
}
mapcity.isFormValidToProcess=function(){
	if(
		 mapcity.places.sp==""
	|| mapcity.places.ep==""
	|| mapcity.places.plse==""
	|| mapcity.places.gotm==""
	){
		return false;
	}
	return true;
}
mapcity.changePageVariables=function(){
	mapcity.pageurl.cityname=mapcity.cityname;
	$(document).attr("title","Things to do in " + mapcity.cityname);
	$("#pageheadercityname").html(mapcity.cityname);
	$("#mapplanscity-box #city-name").html(mapcity.cityname);
}
mapcity.getCitiesByCountry=function(){
	var _select=$(mapcity.selectors.city);
	myezplan.forms.select.removeOptionsByJqueySelector($(_select.selector+" option[value!='']"));
	//myezplan.forms.select.removeAllOptions(_select);
	mapcity.getCitiesByCountry_Ajax();
}
mapcity.getCitiesByCountry_Ajax=function(){
	var _url = "cfc/applocation.cfc";
	var _urlconfig = {method:"getCitiesByCountry_json",countryid:mapcity.countryid};
	var _select=$(mapcity.selectors.city);
	$.getJSON(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			var _map=$.map( response.data, function( item ) {return {name:item.name,id:item.id}});
			myezplan.forms.select.addOptionsMapNameId(_select,_map);
			var _option=myezplan.forms.select.selectByValue(_select,mapcity.cityid,true);
			if(_option.length>0){_select.change();}
		});
	;
}
mapcity.getPlansByCity=function(){
	var _select=$(mapcity.selectors.city);
	mapcity.cityid=_select.val();
	if(mapcity.cityid!="0"){
		mapcity.cityname=$(_select.selector+" option:selected").text();
		mapcity.changePageVariables();
		mapcity.getPlansByCity_Ajax(mapcity.cityid);
	}
}
mapcity.getPlansByCity_Ajax=function(arg_cityid){
	$(mapcity.selectors.plan).ddslick('destroy');
	var _url = "cfc/mapcity.cfc";
	var _urlconfig = {method:"getPlansByCity_json",cityid:arg_cityid};
	$.getJSON(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			$(mapcity.selectors.plan).ddslick({
				data:response.data,
				width:"100%",
				selectText:"Select an Area",
				truncateDescription:true,
				onSelected: function (data) {
					mapcity.showPopupMapCityPopup(arg_cityid,data.selectedData.value);
				}
			});
			if(mapcity.places.pl.length==0 && mapcity.cityname!=""){
				$(mapcity.selectors.plan).ddslick('open');
				$("div.loadi").show(0);
			}
		});
	;
};
mapcity.getUserPlanName=function(){
	if(!mapcity.places.upid){return;}
	var _url="cfc/mapcity.cfc";
	var _urlconfig={method:"getUserPlanNameById_json",upid:mapcity.places.upid};
	$.getJSON(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			if(response.count>0){
				var _data=response.data[0];
				mapcity.places.upname=_data.up_name;
				$("#map-top-planname").text("-"+mapcity.places.upname);
			}
		});
	;
};

mapcity.updateMapCityConfig=function(){
	var $select=$(mapcity.selectors.city);
	mapcity.cityid=$select.val();
	if(mapcity.cityid!="0"){
		mapcity.updateMapCityConfig_ajax(mapcity.cityid);
	}
}
mapcity.updateMapCityConfig_ajax=function(){
	var _url = "cfc/applocation.cfc";
	var _urlconfig = {method:"getCityById_json",cityid:mapcity.cityid};
	var $select=$(mapcity.selectors.city);
	$.getJSON(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			//console.log(response);
			if(response.count>0){
				var _data=response.data[0];
				$("#mapcityloadingimgage").prop("src",mapcity.mapcityloadingimgagepath);$("#big_box_header").css("background-image","");$("#large_box_footer").css("background-image","");$("#footer_box").css("background-image","");
				if(_data.city_loadingbanner){
				var ldng=_data.city_loadingbanner;
				var n=ldng.search("http");
					if(n==0){
						$("#mapcityloadingimgage").prop("src", _data.city_loadingbanner);
						}
					else{	
					$("#mapcityloadingimgage").prop("src",myezplan.pathmapscity + _data.city_loadingbanner);
					};}
				if(_data.city_upperbanner){
					var upb=_data.city_upperbanner;
					var n1=upb.search("http");
					 if(n1==0){
					$("#big_box_header").css("background-image",'url(' + _data.city_upperbanner + ')')	 
						 }
					 else{
					 $("#big_box_header").css("background-image",'url(' + myezplan.pathmapscity + _data.city_upperbanner + ')') 
					 };}
				if(_data.city_lowerbanner){
					var lwr=_data.city_lowerbanner
					var n2=lwr.search("http");
					 if(n2==0){
					$("#large_box_footer").css("background-image",'url(' + _data.city_lowerbanner + ')')	 
						 }
					 else{
					 $("#large_box_footer").css("background-image",'url(' + myezplan.pathmapscity + _data.city_lowerbanner + ')') 
					 };}
				if(_data.city_lowerleftbanner){
					var lwrl=_data.city_lowerleftbanner
					var n3=lwrl.search("http");
					 if(n3==0){
					$("#footer_box").css("background-image",'url(' + _data.city_lowerleftbanner + ')')	 
						 }
					 else{
					 $("#footer_box").css("background-image",'url(' + myezplan.pathmapscity + _data.city_lowerleftbanner + ')') 
					 };}			}
		});
	;
};

mapcity.showPopupMapCityPopup=function(centro_lat,centro_long) {
var _url = "cfc/mapcity.cfc";
	var _urlconfig = {method:"getPlacesByIdGroupedByCity",pids:mapcity.places.pl.join(",")};
	//var _urlconfig = {method:"getPlacesByIdGroupedByCity",pids:"435,444,472,540,573,579"};
	var $canvas=$("#places_list");
	$.getJSON(_url,_urlconfig)
	
	
	
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			var _data = response.data[0];
			var _tablecity="";
			if(_data){
				mapcity.loading=true;
				mapcity.mapconfig.mapchanged=true;
				mapcity.getCookieQuery();
				/* clean map to redraw */
				//$(mapcity.selectors.pl).val("");
				$(mapcity.selectors.plse).val("");
				$(mapcity.selectors.plom).val("");
				$.each(mapcity.mapconfig.markers,function(index,value){
					value.setMap(null);
				});
				
				mapcity.mapconfig.markers=[];
				mapcity.mapconfig.mapcenter=null;
				if(mapcity.mapconfig.google.directionsdisplay){
					mapcity.mapconfig.google.directionsdisplay.setMap(null);
					mapcity.mapconfig.google.directionsdisplay=null;
				}
				
				var _countericon=0;
				/*var centro_lat = value2.lat;
				var centro_long = value2.lon;*/
			
				$.each(_data,function(index1,value1){
					_tablecity+='<table id="menu_place_table" class="table" cellspacing="0"><caption class="tc bold">' + index1 + '</caption>'; 
					
					$.each(value1,function(index2,value2){
						_countericon++;_icon=mapcity.pathtoicon+"basic/"+_countericon+".png";
					
						myezplan.maps.createMyezplanMarker(value2.ruta_id, new google.maps.LatLng(value2.lat,value2.lon),value2.ruta_name,_icon,null,mapcity.mapconfig.markers);
						myezplan.maps.config.mapcenter=new google.maps.LatLng(centro_lat,centro_long);
						
						_tablecity+='<tr>';
						_tablecity+='<td class="t1"><input id="plsecheck" type="checkbox" value="'+value2.ruta_id+'" class="plsecheck cursor formitemchanged checkplaceadd" title="Click Here to add/remove this place from route" data-id="'+value2.ruta_id+'" data-name="'+value2.ruta_name+'" /></td>';
						/*_tablecity+='<td>'+value2.lat+'</td>';
						_tablecity+='<td>'+value2.lon+'</td>';
						_tablecity+='<td><input class="button-round-2 button-round-blue2" type="button" name="Boton1" value="'+index1+'" OnClick="mapcity.nextPlaces('+value2.lat+','+value2.lon+');"></td>';*/
						
						var largonombre = value2.ruta_name.length;
						if (largonombre>38){var nombrefull = value2.ruta_name.substr(0,35)+'...';}
						else{var nombrefull = value2.ruta_name}
						_tablecity+='<td class="placetooltip" data-tipicon="'+_icon+'" data-tipprov="'+value2.serviceprovider_id+'" data-tipname="'+value2.ruta_name+'" data-tipname="'+value2.ruta_name+'" data-tipimage="'+value2.info_imageurl+'" data-tiptype="'+value2.detail_type+'" data-id="'+value2.ruta_id+'" data-idunico="'+value2.ruta_idunico+'" ><table class="table"><tr><td class="t2"><img aligin="middle" src="'+ _icon + '" class="cursor img-checkbox-point" /></td><td class="t3">' + nombrefull + '</td></tr></table></td>';
						_tablecity+='<th class="t4 cursor textredmyezplan imgplaceremove" /*title="Remove from plan"*/ data-id="'+value2.ruta_id+'" data-name="'+value2.ruta_name+'" >&times;</th>';
						_tablecity+='</tr>';
					});
					_tablecity+='</table>'; 
				});
				myezplan.forms.select.removeAllOptions($(mapcity.selectors.sp));
				myezplan.forms.select.removeAllOptions($(mapcity.selectors.ep));
				if(mapcity.mapconfig.google.map){
					//myLocationControlAdd(mapcity.mapconfig.google.map);
					//mapcity.mapconfig.mapzoom=mapcity.mapconfig.google.map.getZoom();
					//mapcity.mapconfig.mapcenter=mapcity.mapconfig.google.map.getCenter();
				}
				$canvas.html(_tablecity);
				//$("#places_list .checkplaceadd").prop("checked",true);
				//$("#places_list .checkplaceadd").click();
				//console.log(mapcity.places);
				$("#places_list .checkplaceadd").each(function(index, element) {
					mapcity.addToMapCity(element,"load");
				});
				//mapcity.setCookieQuery();
				//mapcity.sortSelectsWhereTo();
				if(
					mapcity.places.sp=="" 
					|| mapcity.places.ep=="" 
					|| !(mapcity.places.userselection.changed) 
					|| ($.trim(mapcity.places.sp)===$.trim(mapcity.places.ep))&&!(mapcity.places.userselection.changed)
				){
					//alert('entra aqui');
					console.log("Sort By Lat");
					mapcity.sortSelectsWhereTo();
					$(mapcity.selectors.gotm).val("WALKING");
				}
			}
			mapcity.loading=true;
			/*
			$.each(mapcity.places.plse,function(index,value){
				$("#places_list .checkplaceadd[value='"+value+"']").click();
			});
			*/
				/*
			$.each(mapcity.places.plom,function(index,value){
				$("#places_list .checkplaceadd[value='"+value+"']").each(function(index1, element) {
					$("#places_list .checkplaceadd[value='"+value+"']").prop("checked",true);
					mapcity.addToMapCity(element,"load");
				});
				$("#places_list .checkplaceadd[value='"+value+"']").click();
			});
				*/
			///*
			$(mapcity.selectors.sp).val(mapcity.places.sp);
			$(mapcity.selectors.ep).val(mapcity.places.ep);
			//*/
			if(mapcity.places.userselection.changed){
				$(mapcity.selectors.gotm).val(mapcity.places.gotm);}
			$(mapcity.selectors.upid).val(mapcity.places.upid);
			mapcity.setCookieQuery();
			mapcity.getUserPlanName();
			
			
			if(mapcity.places.pl.length==0 && mapcity.cityid=="0"){
				//$('a#menu-home').click();
				$("#mapcitycity-box").slideDown("slow");
				$('body').append('<div id="mask" class="mask"></div>');
				$('#mask').fadeIn(300);
			}else{
				$("div.loadi").hide(0);
				mapcity.initMap();
			}
			mapcity.loading=false;
		});
	;


}
mapcity.getPlaces=function(){
	var $canvas=$("#places_list");
	$canvas.empty()
	mapcity.getCookiePlaces();
	mapcity.getPlaces_Ajax(mapcity.cityid);
}

mapcity.nextPlaces=function(){
	var $canvas=$("#places_list");
	$canvas.empty()
	mapcity.getCookiePlaces();
	mapcity.getPlaces_Ajax(mapcity.cityid);
}
mapcity.getPlaces_Ajax=function(arg_cityid){
	var _url = "cfc/mapcity.cfc";
	var _urlconfig = {method:"getPlacesByIdGroupedByCity",pids:mapcity.places.pl.join(",")};
	//var _urlconfig = {method:"getPlacesByIdGroupedByCity",pids:"435,444,472,540,573,579"};
	var $canvas=$("#places_list");
	$.getJSON(_url,_urlconfig)
	
	
	
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			var _data = response.data[0];
			var _tablecity="";
			if(_data){
				mapcity.loading=true;
				mapcity.mapconfig.mapchanged=true;
				mapcity.getCookieQuery();
				/* clean map to redraw */
				//$(mapcity.selectors.pl).val("");
				$(mapcity.selectors.plse).val("");
				$(mapcity.selectors.plom).val("");
				$.each(mapcity.mapconfig.markers,function(index,value){
					value.setMap(null);
				});
				
				mapcity.mapconfig.markers=[];
				mapcity.mapconfig.mapcenter=null;
				if(mapcity.mapconfig.google.directionsdisplay){
					mapcity.mapconfig.google.directionsdisplay.setMap(null);
					mapcity.mapconfig.google.directionsdisplay=null;
				}
				
				var _countericon=0;
				var centro_lat = 42.118599;
				var centro_long = -5.109501;
			
				$.each(_data,function(index1,value1){
					_tablecity+='<table id="menu_place_table" class="table" cellspacing="0"><caption class="tc bold">' + index1 + '</caption>'; 
					
					$.each(value1,function(index2,value2){
						_countericon++;_icon=mapcity.pathtoicon+"basic/"+_countericon+".png";
						if(index2==0 && mapcity.mapconfig.mapcenter==null){
							mapcity.mapconfig.mapcenter=new google.maps.LatLng(value2.centro_mapa1,value2.centro_mapa2);
						}
						myezplan.maps.showInfoplaceMyezplanMarker(myezplan.maps.createMyezplanMarker(value2.ruta_id, new google.maps.LatLng(value2.lat,value2.lon),value2.ruta_name,_icon,null,mapcity.mapconfig.markers),value2.ruta_idunico,value2.ruta_id, 'mapcity');
						_tablecity+='<tr>';
						_tablecity+='<td class="t1"><input id="'+value2.ruta_idunico+'" type="checkbox" value="'+value2.ruta_id+'" class="plsecheck cursor formitemchanged checkplaceadd squaredTwo squaredTwoMediano" title="Click Here to add/remove this place from route" data-id="'+value2.ruta_id+'" data-name="'+value2.ruta_name+'" /><label for="'+value2.ruta_idunico+'"></label></td>';
						/*_tablecity+='<td>'+value2.lat+'</td>';
						_tablecity+='<td>'+value2.lon+'</td>';
						_tablecity+='<td><input class="button-round-2 button-round-blue2" type="button" name="Boton1" value="'+index1+'" OnClick="mapcity.showPopupMapCityPopup('+value2.lat+','+value2.lon+');"></td>';
						_tablecity+='<td>'+value2.ruta_id+'</td> ';
						_tablecity+='<td>---</td> ';
						
						_tablecity+='<td>'+value2.coordenadas+'</td> ';*/
						
						var largonombre = value2.ruta_name.length;
						if (largonombre>38){var nombrefull = value2.ruta_name.substr(0,35)+'...';}
						else{var nombrefull = value2.ruta_name}
						_tablecity+='<td class="placetooltip" data-tipicon="'+_icon+'" data-tipprov="'+value2.serviceprovider_id+'" data-tipname="'+value2.ruta_name+'" data-tipname="'+value2.ruta_name+'" data-tipimage="'+value2.info_imageurl+'" data-tiptype="'+value2.detail_type+'" data-id="'+value2.ruta_id+'" data-idunico="'+value2.ruta_idunico+'" ><table class="table"><tr><td class="t2"><img aligin="middle" src="'+ _icon + '" class="cursor img-checkbox-point" /></td><td class="t3">' + nombrefull + '<br> <h4>Type: '+value2.detail_type+'</h4></label></div></td><td id="table_img"> <img  src='+value2.info_imageurl+'></td></tr></table></td>';
						_tablecity+='<th class="t4 cursor textredmyezplan imgplaceremove" /*title="Remove from plan" */data-id="'+value2.ruta_id+'" data-name="'+value2.ruta_name+'" >&times;</th>';
						_tablecity+='</tr>';
					});
					
					
					_tablecity+='</table>'; 
				});
				myezplan.forms.select.removeAllOptions($(mapcity.selectors.sp));
				myezplan.forms.select.removeAllOptions($(mapcity.selectors.ep));
				if(mapcity.mapconfig.google.map){
					//myLocationControlAdd(mapcity.mapconfig.google.map);
					//mapcity.mapconfig.mapzoom=mapcity.mapconfig.google.map.getZoom();
					//mapcity.mapconfig.mapcenter=mapcity.mapconfig.google.map.getCenter();
				}
				$canvas.html(_tablecity);
				//$("#places_list .checkplaceadd").prop("checked",true);
				//$("#places_list .checkplaceadd").click();
				//console.log(mapcity.places);
				$("#places_list .checkplaceadd").each(function(index, element) {
					mapcity.addToMapCity(element,"load");
				});
				//mapcity.setCookieQuery();
				//mapcity.sortSelectsWhereTo();
				if(
					mapcity.places.sp=="" 
					|| mapcity.places.ep=="" 
					|| !(mapcity.places.userselection.changed) 
					|| ($.trim(mapcity.places.sp)===$.trim(mapcity.places.ep))&&!(mapcity.places.userselection.changed)
				){
					//alert('entra aqui');
					console.log("Sort By Lat");
					mapcity.sortSelectsWhereTo();
					$(mapcity.selectors.gotm).val("WALKING");
				}
			}
			mapcity.loading=true;
			/*
			$.each(mapcity.places.plse,function(index,value){
				$("#places_list .checkplaceadd[value='"+value+"']").click();
			});
			*/
				/*
			$.each(mapcity.places.plom,function(index,value){
				$("#places_list .checkplaceadd[value='"+value+"']").each(function(index1, element) {
					$("#places_list .checkplaceadd[value='"+value+"']").prop("checked",true);
					mapcity.addToMapCity(element,"load");
				});
				$("#places_list .checkplaceadd[value='"+value+"']").click();
			});
				*/
			///*
			$(mapcity.selectors.sp).val(mapcity.places.sp);
			$(mapcity.selectors.ep).val(mapcity.places.ep);
			//*/
			if(mapcity.places.userselection.changed){
				$(mapcity.selectors.gotm).val(mapcity.places.gotm);}
			$(mapcity.selectors.upid).val(mapcity.places.upid);
			mapcity.setCookieQuery();
			mapcity.getUserPlanName();
			
			
			if(mapcity.places.pl.length==0 && mapcity.cityid=="0"){
				//$('a#menu-home').click();
				$("#mapcitycity-box").slideDown("slow");
				$('body').append('<div id="mask" class="mask"></div>');
				$('#mask').fadeIn(300);
			}else{
				$("div.loadi").hide(0);
				mapcity.initMap();
			}
			mapcity.loading=false;
		});
	;
}


mapcity.initMap=function(){
	if(mapcity.mapconfig.google.map==null || mapcity.mapconfig.mapchanged){
		myezplan.maps.initializeGoogleMap(mapcity.mapconfig,function(arg_mapconfig,status,result){
			if(status=="ERROR"){
				console.log(status + ":" + result.errormessage);
				return false;
			}
			$("#mapcitycity-box").hide("fast");
			if(mapcity.mapconfig.google.map){
				myLocationControlAdd(mapcity.mapconfig.google.map);
			}
			mapcity.routeMap();
		});
	}else{
		//mapcity.mapconfig.setCenterByBounds();
		console.log("no changes to draw");
	}
}
mapcity.routeMap=function(){
	//alert('routemap');
	mapcity.setCookieQuery();
	var loads = $.cookie(mapcity.selectors.cookieload);
	if (loads != 'NEW'){$.cookie("EZMAPCITYSAVELOAD", 'NEW');}
	var loginafter=$.cookie("EZMAPCITYLOGINAFTER");
	if (loginafter != 'LOGINP'){$.cookie("EZMAPCITYLOGINAFTER", 'LOGINP');}
	var loginafter2=$.cookie("EZMAPCITYSAVELOGIN");
	if (loginafter2 != 'LOGINP'){$.cookie("EZMAPCITYSAVELOGIN", 'LOGINP');}
	var $1=mapcity.loading==false;
	var $2=(mapcity.places.sp=='' || mapcity.places.ep=='');
	/*if($1 && $2){alert("Please select at least one place.");return false;}*/
	if($2){return false;}
	mapcity.mapconfig.maptravelmode=mapcity.places.gotm;
	mapcity.mapconfig.waypoints=[];
	/*
	$.each(mapcity.places.pl,function(index,value){
		if(mapcity.places.plse.indexOf(value)>=0 && value!=mapcity.places.sp && value!=mapcity.places.ep){
			mapcity.mapconfig.waypoints.push({location:mapcity.mapconfig.getMarkerPosition(value) ,stopover:true});
		}
	});
	*/
	var _limit=(mapcity.constplse-1);if(parseInt(mapcity.places.sp)==parseInt(mapcity.places.ep)){_limit-=1;}
	$.each(mapcity.mapconfig.markers,function(index,value){
		var _value=parseInt(value.mk_id);
		if(mapcity.places.plse.indexOf(_value)>=0 && _value!=parseInt(mapcity.places.sp) && _value!=parseInt(mapcity.places.ep)){
			if(mapcity.mapconfig.waypoints.length>=_limit){
				return;
			}
			mapcity.mapconfig.waypoints.push({location:value.position,stopover:true});
		}
	});
	myezplan.maps.calculateGoogleRoute(mapcity.mapconfig,function(status,result){
		//console.log(status + ":" + result.errormessage);
		//mapcity.mapconfig.mapchanged=mapcity.loadingmap;
		//mapcity.mapconfig.mapchanged=false;
		return true;
	});
}
mapcity.addToMapCity=function(arg_obj,arg_method){
	var $this=$(arg_obj);
	if(!$this){
		e.stopPropagation();e.preventDefault();
		return;
	}
	arg_method=(arg_method)?arg_method:"click";
	//console.log(arg_method);
	mapcity.mapconfig.vacio=false;
	var _checkvalue=parseInt(arg_obj.value);
	var _checkname=$this.data("name");
	var _form=$(mapcity.selectors.form);
	var _form_sp=$(mapcity.selectors.sp);
	var _form_ep=$(mapcity.selectors.ep);
	var _form_plse=$(mapcity.selectors.plse);
	var _array_plse=[];
	var _val_plse=$.trim(_form_plse.val());
	if(_val_plse!=""){
		_array_plse=_val_plse.split(",");
		$.each(_array_plse,function(index,value){if($.isNumeric(value)){_array_plse[index]=parseInt(value);}});
	}
	var _form_plom=$(mapcity.selectors.plom);
	var _array_plom=[];
	var _val_plom=$.trim(_form_plom.val());
	if(_val_plom!=""){
		_array_plom=_val_plom.split(",");
		$.each(_array_plom,function(index,value){if($.isNumeric(value)){_array_plom[index]=parseInt(value);}});
	}
	/*
	if(_array_plse.length>=10){
		arg_obj.checked=false;
	}
	*/
	if(arg_method==="load"){
		//console.log(_checkvalue);console.log(mapcity.places.plse);
		arg_obj.checked=true;
		if($.inArray(_checkvalue,mapcity.places.plse)>=0){
			if(_array_plse.length>=mapcity.constplse){
				arg_obj.checked=false;
			}
		}else if($.inArray(_checkvalue,mapcity.places.plom)>=0){
			arg_obj.checked=false;
		}else{
			if(_array_plse.length>=mapcity.constplse){
				arg_obj.checked=false;
			}
		}
		if(arg_obj.checked==true && _array_plse.length>=mapcity.constplse){
			//arg_obj.checked=false;
		}
	}else if(arg_method==="click"){
		if(_array_plse.length>=mapcity.constplse && arg_obj.checked){
			alert("You have reached the maximum number of places ("+mapcity.constplse+") per map.");
			arg_obj.checked=false;
			return;
		}
	}
	if(arg_obj.checked){
		_array_plse.push(_checkvalue);
		if(_array_plom.indexOf(_checkvalue)>=0){
			_array_plom.splice(_array_plom.indexOf(_checkvalue),1);
		}
		//if(arg_method==="click"){mapcity.sortSelectsWhereTo();}
		myezplan.forms.select.addOption(_form_sp, _checkvalue, _checkname);/*_form_sp.change();*/
		myezplan.forms.select.addOption(_form_ep, _checkvalue, _checkname);/*_form_ep.change();*/
	}else{
		if(_array_plse.indexOf(_checkvalue)>=0){
			_array_plse.splice(_array_plse.indexOf(_checkvalue),1);
		}
		_array_plom.push(_checkvalue);
		var _current_sp=parseInt($(mapcity.selectors.sp).val()), _current_ep=parseInt($(mapcity.selectors.ep).val());
		if(_current_sp===_checkvalue){
			mapcity.places.sp=mapcity.getNextPlaceByLatOrder(_checkvalue,_current_ep).id;
			$(mapcity.selectors.sp).val(mapcity.places.sp);
			mapcity.setCookieQuery();
		}
		if(_current_ep===_checkvalue){
			mapcity.places.ep=mapcity.getPreviousPlaceByLatOrder(_checkvalue,_current_sp).id;
			$(mapcity.selectors.ep).val(mapcity.places.ep);
			mapcity.setCookieQuery();
		}
		//if(arg_method==="click"){mapcity.sortSelectsWhereTo();}
		myezplan.forms.select.removeOptionByValue(_form_sp, _checkvalue);/*_form_sp.change();*/
		myezplan.forms.select.removeOptionByValue(_form_ep, _checkvalue);/*_form_ep.change();*/
	}
	
	_array_plse.sort(function(a,b){return a-b});
	_form_plse.val(_array_plse.join());
	_array_plom.sort(function(a,b){return a-b});
	_form_plom.val(_array_plom.join());
	//mapcity.places.plse=_array_plse;
}
pllat_SortByLatAsc=function(a, b){var sortA=a.lat,sortB=b.lat;if(sortA<sortB)return -1;if(sortA>sortB) return 1; return 0;};
pllat_SortByLonAsc=function(a, b){var sortA=a.lon,sortB=b.lon;if(sortA<sortB)return -1;if(sortA>sortB) return 1; return 0;};
function dynamicSort(property){
	var sortOrder = 1;if(property[0] === "-") {sortOrder = -1;property = property.substr(1, property.length - 1);}
	return function (a,b){var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;return result * sortOrder;}
}
mapcity.sortSelectsWhereTo=function(){
	mapcity.setCookieQuery();
	mapcity.places.pllat=[];
	$.each(mapcity.places.plse,function(index2,value2){
		$.each(mapcity.mapconfig.markers,function(index1,value1){
			if(value1.mk_id==value2){
				mapcity.places.pllat.push({id:value2,lat:value1.position.jb,lon:value1.position.kb});
			}
		});
	});
	if(mapcity.places.pllat.length>=1){
		mapcity.places.pllat.sort(dynamicSort("-lat"));
		/*
		$(mapcity.selectors.sp).find("option[value='"+mapcity.places.pllat[0].id+"']").attr("selected",true).change();
		$(mapcity.selectors.ep).find("option[value='"+mapcity.places.pllat[mapcity.places.pllat.length-1].id+"']").attr("selected",true).change();
		*/
		/*
		$(mapcity.selectors.sp).val(mapcity.places.pllat[0].id);
		$(mapcity.selectors.ep).val(mapcity.places.pllat[mapcity.places.pllat.length-1].id);
		*/
		mapcity.places.sp=mapcity.places.pllat[0].id;
		mapcity.places.ep=mapcity.places.pllat[mapcity.places.pllat.length-1].id;
	}
}
mapcity.getNextPlaceByLatOrder=function(arg_placeid,arg_placeidommit){
	var _newselected=false;
	var _return={id:null,index:-1,};
	if(!(arg_placeid)){return _return;}
	$.each(mapcity.places.pllat,function(index){
		//console.log(value)
		if(_newselected){return;}
		if(this.id==arg_placeid){
			//console.log(mapcity.places.pllat[index]);
			//console.log(mapcity.places.pllat[index+1]);
			if(mapcity.places.pllat[index+1]){
				var _next=mapcity.places.pllat[index+1];
				if(_next.id!=arg_placeidommit){
					_newselected=true;
					_return={id:_next.id,index:index+1,}
					return;
				}
			}
		}
	});
	return _return;
}
mapcity.getPreviousPlaceByLatOrder=function(arg_placeid,arg_placeidommit){
	var _newselected=false;
	var _return={id:null,index:-1,};
	if(!(arg_placeid)){return _return;}
	$.each(mapcity.places.pllat,function(index){
		//console.log(value)
		if(_newselected){return;}
		if(this.id==arg_placeid){
			//console.log(mapcity.places.pllat[index]);
			//console.log(mapcity.places.pllat[index-1]);
			if(mapcity.places.pllat[index-1]){
				var _previous=mapcity.places.pllat[index-1];
				if(_previous.id!=arg_placeidommit){
					_newselected=true;
					_return={id:_previous.id,index:index-1,}
					return;
				}
			}
		}
	});
	return _return;
}
mapcity.removeFromMapCity=function(arg_this){
	var $this=$(arg_this);
	var $thisrow=$this.parent();
	var $table=$thisrow.closest("table");
	var $checkbox=$thisrow.find(".checkplaceadd");
	var $name=$this.data("name");
	var $id=$this.data("id");
	//if($checkbox.is(":checked")){$checkbox.click();}
	deleteFromMapCityPopup($id,"mapcity",function(arg_pid,response){
		mapcity.getCookiePlaces();
		$thisrow.css("background-color","#990000").animate({opacity: 0.1}, "slow",function(){
			$thisrow.hide("slow").remove();
			if($table.find(">tbody>tr").length==0){
				$table.animate({opacity: 0.05}, "fast").slideToggle("fast",function(){
				$table.hide("slow").remove(); 
				});
			}
			var $markerpos=mapcity.mapconfig.getMarkerByPlaceId($id);
			mapcity.mapconfig.markers[$markerpos.index].setMap(null);
			mapcity.mapconfig.markers.splice($markerpos.index,1);
			if(!(mapcity.mapconfig.vacio)){
			if(mapcity.mapconfig.google.directionsdisplay){
				mapcity.mapconfig.google.directionsdisplay.setMap(null);
				mapcity.mapconfig.google.directionsdisplay=null;
				mapcity.getPlaces();
			}
			}
		});
	});
}
mapcity.cleanCurrentMapCity_menutop=function(){
$.cookie("EZPERSONAL",false, {
				path: '/',
				expires: -1
			});
var cookiecats=$.cookie("EZCATS");
if(cookiecats && cookiecats!=''){
	var cookie_c=cookiecats.split('*');
	for(x=0;x<cookie_c.length;x++){
		$.cookie(cookie_c[x],false, {
				path: '/',
				expires: -1
			});
		}
$.cookie("EZCATS",'');
	}
var cookieareas=$.cookie("EZAREAS");
if(cookieareas && cookieareas!=''){
	var cookie_a=cookieareas.split('*');
	for(x=0;x<cookie_a.length;x++){
		$.cookie(cookie_a[x],false, {
				path: '/',
				expires: -1
			});
		}
$.cookie("EZAREAS",'');
	}
$.cookie("EZMAPCITYPLACES", '');	
$.cookie("EZMAPCITYQUERY",'');
if(typeof(mapcity.places)=='undefined'){mapcity.places='';}
if(typeof(mapcity.mapconfig)=='undefined'){mapcity.mapconfig='';}
if(typeof(mapcity.mapconfig.maptravelmode)=='undefined'){mapcity.mapconfig.maptravelmode='';}

if(mapcity.places=='' && mapcity.mapconfig=='' && mapcity.mapconfig.maptravelmode=='' || faqpage=='index'){
	//mapcity.setUPID(0);
	var _url = "data_ajax/map_city_ajax.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {action:"clean2"};
//alert(_url);
	$.post(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
		var $popup=$('#new_plan');
	$('#new_plan').showLoading("Please Wait,<br/>Loading...<br/>",false);
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
}else{
	mapcity.setUPID(0);
	var _url = "data_ajax/map_city_ajax.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {action:"clean"};
//alert(_url);
	$.post(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
		var $popup=$('#new_plan');
	$('#new_plan').showLoading("Please Wait,<br/>Loading...<br/>",false);
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
	}
}
/* save userplan */
mapcity.mapSaveInit=function(){
	if(this.pageurl.mapValidToProcess){if(!this.pageurl.mapValidToProcess()){alert("Please, complete all the steps before saving.");return false;}}
	//if(this.mapconfig.mapchanged){alert("We have noticed that you have made additional changes to your plan. Please complete all the steps before saving.");return false;}
	var _upid=mapcity.places.upid;
	var _upname=encodeURIComponent($.trim(mapcity.save.$fname.val()));
	if(cf_sid==""){
		$.cookie("EZMAPCITYSAVELOGIN", 'LOGIN');
		//alert('login');
		pedir_sesion(1,"mapcity.mapSaveInit()");
		return false;
	}
	//update userplan	without showing popup when userplan exists
	if(_upid!=""){
		var _confirm=window.confirm("Do you want to replace your current Plan?");
		if(_confirm){mapcity.mapSaveAjax("u");return true;}
	}
	closePopup(0);
	//alert(cf_sid);
	mapcity.save.$popup.fadeIn(300);
	var popMargTop = (mapcity.save.$popup.height() + 24) / 2; 
	var popMargLeft = (mapcity.save.$popup.width() + 24) / 2; 
	mapcity.save.$popup.css({'margin-left' : -popMargLeft});
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	$("#Datepicker_").datepicker();
		$.ajax({
			type: "POST",
			url: "data_ajax/saveplans_itineraryajaxsearch.cfm",
			async:true, 
			cache:false,
			data: "action=searchitineraries&uid="+cf_sid,
			success: function(datos){
				$("#search_itinerary").html(datos);
			}
		});	
	mapcity.save.$fname.focus();
	return true;
}

plantoItineraryValida= function(A,B,C,D){
		var _url="data_ajax/myitinerary_content_ajax.cfm";
		var _urlconfig={action:"saveuseritinerary",saveaction:"validalimiteplansI",aditi:D};
				$.ajax({type:"POST",url:_url,async:false,cache:false,data:_urlconfig})
				.success(function(datos){
					if (datos==30){
						alert('Your Plan has been saved, but your current itinerary have reached the maximum limit of Plans (30), if you want to add it to a itinerary go to My Itinerary');return false;
						}else{myPlanAddToItinerary(A,B,C,D);}
					});
		}

planValida= function(param){
		var _url="data_ajax/myitinerary_content_ajax.cfm";
		var _urlconfig={action:"saveuseritinerary",saveaction:"validalimiteplans"};
				$.ajax({type:"POST",url:_url,async:false,cache:false,data:_urlconfig})
				.success(function(datos){
					if (datos==60){
						alert('You have reached the maximum limit of Plans (60), if you want to create a new one you have to delete one of your old Plans');return false;
						}else{mapcity.mapSaveAjax("i")}
						});
		}



/* load global variables */
$(document).ready(function(e) {
	/* Google Map */
	if(faqpage!='index'){
	mapcity.mapconfig=new myezplan.maps.config;
	mapcity.mapconfig.canvasmap=$('#right_map_box #map_canvas').get([0]);
	mapcity.mapconfig.google.mapoptions.navigationControl=false;
	mapcity.mapconfig.mapchanged=false;
	mapcity.places=mapcity.mapconfig.places;
	}
	mapcity.loading=true;
	mapcity.constplse=10;
	mapcity.loadingmap=true;
	mapcity.pathtoicon="ezmapas/maps_pics/";
	mapcity.selectors={};
	mapcity.selectors.form="form#drawform";
	mapcity.selectors.city=mapcity.selectors.form+" #city";
	mapcity.selectors.plan=mapcity.selectors.form+" #plan";
	mapcity.selectors.pl=mapcity.selectors.form+" #pl";
	mapcity.selectors.plse=mapcity.selectors.form+" #plse";
	mapcity.selectors.plom=mapcity.selectors.form+" #plom";
	mapcity.selectors.sp=mapcity.selectors.form+" #sp";
	mapcity.selectors.ep=mapcity.selectors.form+" #ep";
	mapcity.selectors.gotm=mapcity.selectors.form+" #gotm";
	mapcity.selectors.upid=mapcity.selectors.form+" #upid";
	mapcity.selectors.itemchanged=mapcity.selectors.form+" .formitemchanged";
	mapcity.selectors.cookieplaces="EZMAPCITYPLACES";
	mapcity.selectors.cookiequery="EZMAPCITYQUERY";
	mapcity.selectors.cookieload="EZMAPCITYSAVELOAD";
	mapcity.pageurl=new myezplan.pageurl();
	mapcity.pageurl.searchmethod="form";
	mapcity.pageurl.printpage="mapcityprint.cfm";
	mapcity.pageurl.searchform=mapcity.selectors.form;
	mapcity.pageurl.mapValidToProcess=mapcity.isFormValidToProcess;
	
	//alert(mapcity.selectors.pl+' '+mapcity.selectors.plse+' '+mapcity.selectors.sp+' '+mapcity.selectors.ep);
	mapcity.save={};
	mapcity.save.$message=$("#messageerror-saveplan");
	mapcity.save.$popup=$("#saveplan-box");
	mapcity.save.$form=mapcity.save.$popup.find("form");
	mapcity.save.$fname=mapcity.save.$form.find("#saveplan_name");
	mapcity.save.$share=mapcity.save.$form.find("#saveplan_shareit");
	mapcity.save.$itin=mapcity.save.$form.find("#sel-itinerary");
	mapcity.save.$date_=mapcity.save.$form.find("#Datepicker_");
	mapcity.save.$addtoitinerary=mapcity.save.$form.find("#saveplan_addtoitinerary");
		
	/* */

	
	mapcity.save.$form.submit(function(e) {
		e.stopPropagation();e.preventDefault();
		mapcity.mapSaveForm();
	});
	$(mapcity.selectors.city).change(function(e) {
		mapcity.getPlansByCity();
		mapcity.updateMapCityConfig();
	});
	$(document).on("mouseover","#places_list .placetooltip",function(e) {
		var $this=$(this);
		myezplan.showGloboTooltip(e.target,{tipimage:$this.data("tipimage"),tipicon:$this.data("tipicon"),tipname:$this.data("tipname"),tiptype:$this.data("tiptype"),tipprov:$this.data("tipprov")});
	});


	$('#map-top-button-newmap').click( function(e) {
		e.stopPropagation();e.preventDefault();
		if(window.confirm("You are going to create a new plan. Your current plan will be lost if not saved. Do you want to continue?")){
			//mapcity.places.gotm == "WALKING";
			//mapcity.mapconfig.maptravelmode == "WALKING";
			$.cookie("page", 1);
			mapcity.cleanCurrentMapCity_menutop();
		}
		return true;
	});

});

