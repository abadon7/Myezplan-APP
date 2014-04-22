window.myezplan=window.myezplan||{};
/* myezplan.maps */ 
myezplan.maps=myezplan.maps||{};
myezplan.maps.locationbase=new google.maps.LatLng(40.69847032728747, -73.9514422416687);
myezplan.maps.config=function(){
	this.canvasmap=null;
	this.canvasdirections=$('#wrapperbody_direction #directionsPanel').get([0]);
	this.startpoint=null;
	this.endpoint=null;
	this.markers=[];
	this.waypoints=[];
	this.maptravelmode="WALKING";
	this.mapcenter=null;
	this.mapzoom=8;
	this.mapchanged=true;
	this.places={
		pl:[],
		plse:[],
		plom:[],
		sp:"",
		ep:"",
		gotm:"WALKING",
		upid:"0",
		userselection:{
			changed:false,
			sp:"",
			ep:"",
		},
	}
	this.google={
		map:null
		,mapoptions:{
			zoom:this.mapzoom
			,center:this.mapcenter
			,zoomControl:true
			,navigationControl:true
			,scaleControl:false
			,mapTypeControl:false
			,disableDefaultUI:true
			,mapTypeId:google.maps.MapTypeId.ROADMAP
		}
		,renderoptions:{
			map:null
			,suppressMarkers:false
			,suppressInfoWindows:false
			
		}
		,geocoder:new google.maps.Geocoder()
		,directionsservice:new google.maps.DirectionsService()
		,directionsdisplay:null
		,routerequest:{}
	}
	myezplan.maps.config.prototype.updateMapConfig=function(){
		this.google.mapoptions.zoom=this.mapzoom;
		this.google.mapoptions.center=this.mapcenter;
		if(this.places.sp!=""){
			this.startpoint=this.getMarkerPosition(this.places.sp);
		};
		if(this.places.ep!=""){
			this.endpoint=this.getMarkerPosition(this.places.ep);
		};
	}
	myezplan.maps.config.prototype.addGoogleMap=function(arg_map){
		var myOptions = {
        zoom: 8,
        /*center: new google.maps.LatLng(40.69847032728747, -73.9514422416687),*/
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		map:null
			,suppressMarkers:false
			,suppressInfoWindows:false
    };
		this.google.map=arg_map;
		this.google.renderoptions.map=arg_map;
		$.each(this.markers,function(index,value){value.setMap(arg_map);});
		this.google.directionsdisplay=new google.maps.DirectionsRenderer(this.google.renderoptions);
		drawpoly(arg_map);
		this.setCenterByBounds();
		
	}
	myezplan.maps.config.prototype.setCenterByBounds=function(){
		if(this.markers.length==0){return false;}
		var bounds=new google.maps.LatLngBounds();
		$.each(this.markers,function(index,value){
			if(value.visible){
				bounds.extend(value.getPosition());
			}
		});
		var coopersonal=$.cookie("EZPERSONAL")
		if(coopersonal && coopersonal!=''){
			var coper=coopersonal.split('!');
				for (co=0;co<coper.length;co++){
					var coper_=coper[co].split('*');
					var mpos=coper_[1];
					var mpos_=mpos.replace('(','').replace(')','').split(',')
					var _mpos=new google.maps.LatLng(parseFloat(mpos_[0]),parseFloat(mpos_[1]));
					bounds.extend(_mpos);
				}
		}
		if(bounds.isEmpty()){return false;}
		this.google.map.fitBounds(bounds);
		return true;
	}
	myezplan.maps.config.prototype.updateRouteConfig=function(){
		if($.trim(this.startpoint)=="" && $.trim(this.places.sp)!=""){
			this.startpoint=this.getMarkerPosition(this.places.sp);
		}
		if($.trim(this.endpoint)=="" && $.trim(this.places.ep)!=""){
			this.endpoint=this.getMarkerPosition(this.places.ep);
		}
		this.google.routerequest={
			origin:this.startpoint
			,destination:this.endpoint
			,waypoints:this.waypoints
			,travelMode:this.maptravelmode
			,optimizeWaypoints:true
		};
	}
	myezplan.maps.config.prototype.getMarkerByPlaceId=function(arg_placeid){
		var _markerPosition={index:null,marker:null};
		$.each(this.markers,function(index,value){
			if(value.mk_id==arg_placeid){
				_markerPosition.index=index;
				_markerPosition.marker=value;
				return false;
			}
		});
		return _markerPosition;
	}
	myezplan.maps.config.prototype.getMarkerPosition=function(arg_placeid){
		var _markerPosition=this.getMarkerByPlaceId(arg_placeid);
		if(_markerPosition){return _markerPosition.marker.position;}
		return null;
	}
}
/* myezplan.maps */ 
/* Google Maps Setting */
var stepDisplay=new google.maps.InfoWindow();
var infowindow=new google.maps.InfoWindow({size: new google.maps.Size(150,50)});
//var geocoder=new google.maps.Geocoder();
//var directionsService=new google.maps.DirectionsService();
//var rendererOptions, myAddressdirectionsDisplay=null, myLocationdirectionsDisplay=null;
/* Google Maps Setting */
/* myezplan maps Setting */
//var initialLocation=null,_maincoors=null,myLocationMarker=null,myAddressMarker=null,myLocationMarkerFlag=false,_LocationCleanAll=false,mymarkers=[],mywaypoints=[];
//var browserSupportFlag= new Boolean(), gtml_time1=0, gtml_time2=0,myLocation={},myLocationMarker=null,myAddressMarker=null,myLocationMarkerFlag=false;
/*var locationbase = new google.maps.LatLng(40.69847032728747, -73.9514422416687);*/
if(typeof(geoip_latitude)=="function"){myezplan.maps.locationbase=new google.maps.LatLng(geoip_latitude(),geoip_longitude());}
/* myezplan maps Setting */

myezplan.maps.initializeGoogleMap=function(arg_mapconfig,arg_callbackfunction){
	   var myOptions = {
        zoom: 8,
        /*center: new google.maps.LatLng(40.69847032728747, -73.9514422416687),*/
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	var _result={status:"OK",errormessage:""};
	if(arg_mapconfig.canvasmap==null){_result.status="ERROR";_result.errormessage="there is no canvas selected";}
	if(_result.status=="OK"){
		if(arg_mapconfig.mapcenter==null){arg_mapconfig.mapcenter=myezplan.maps.locationbase;}
		if(arg_mapconfig.markers.length==0){
			arg_mapconfig.mapzoom=14;
			myezplan.maps.createMyezplanMarker(0,arg_mapconfig.mapcenter,'Close By',null,null,arg_mapconfig.markers);
		}
		arg_mapconfig.updateMapConfig();
		arg_mapconfig.addGoogleMap(new google.maps.Map(arg_mapconfig.canvasmap, arg_mapconfig.google.mapoptions));
		
		
		
	}
	if(arg_callbackfunction && typeof(arg_callbackfunction)=="function"){
		arg_callbackfunction(arg_mapconfig,_result.status,_result);
	}
	
}

function array_unique(array){
  return array.filter(function(elm, i, array){
    if(this.indexOf(elm) < 0){
      this.push(elm);
      return true;
    }
    return false;
  }, []);
}	

var puntospan = []	
var waypts = [];
var waypts2 = [];
var waypts3 = [];
var startpunto = [];
var endpunto = [];
var order;
var rutacompleta;
var marc_limite;
myezplan.maps.calculateGoogleRoute=function(arg_mapconfig,arg_callbackfunction){
	var _result={status:"OK",errormessage:""};
	arg_mapconfig.updateMapConfig();
	arg_mapconfig.updateRouteConfig();
	$(arg_mapconfig.canvasdirections).empty();
	if($.trim(arg_mapconfig.startpoint)=="" || $.trim(arg_mapconfig.endpoint)==""){_result.status="ERROR";_result.errormessage="there is no start point or end point";}
	if($.trim(arg_mapconfig.startpoint)==$.trim(arg_mapconfig.endpoint) && arg_mapconfig.waypoints.length==0){_result.status="ERROR";_result.errormessage="start point and end point are the same and no waypoints";}
	if(_result.status=="OK"){
		arg_mapconfig.google.directionsservice.route(arg_mapconfig.google.routerequest, function(response, status) {
			
			// ... creating waypoints for arrows ...
			
			startpunto.push(arg_mapconfig.startpoint);
			endpunto.push(arg_mapconfig.endpoint);
			var path = response.routes[0].overview_path;
			var legs = response.routes[0].legs;
			var route = response.routes[0];
			order = route.waypoint_order ;
			for (i=0;i<legs.length;i++) {
				/*alert(path);*/
				;
				if (i == 0) { 
				/*alert(inicio);*/
				waypts2.push(legs[i].start_location);
				}
				else{
					waypts3.push(legs[i].start_location); 
					}
				puntos = arg_mapconfig.waypoints;
				/*alert(puntos)*
		/*	waypts[i] = new Object();
            waypts[i].latlng = legs[i].start_location;
            waypts[i].address = legs[i].start_address;*/
			/*alert(waypts[i].start_address)*/
			
			/*createMarker(legs[i].start_location);*/
			}
			/*waypts3 = array_unique(waypts3);*/
			for (var i = 0; i < order.length; i++) {
          		var routeSegment = i + 1;
				/*alert(routeSegment);*/
				/*puntospan.push(arg_mapconfig.waypoints[i].location);*/
				puntospan.push(waypts3[i]);
			}
			puntospan = array_unique(puntospan);
			startpunto = array_unique(startpunto);
			endpunto = array_unique(endpunto);
			rutacompleta = startpunto.concat(puntospan, endpunto);
			marc_limite = rutacompleta.length;
			
			// ... End creating waypoints for arrows ....
			
			if (status==google.maps.DirectionsStatus.OK) {
				arg_mapconfig.google.directionsdisplay.setDirections(response);
				arg_mapconfig.google.directionsdisplay.setPanel(arg_mapconfig.canvasdirections);
				//arg_mapconfig.mapchanged=false;
				/*myezplan.maps.showSteps(arg_mapconfig.google.map,response);*/
				
			}else{
				_result.status=status;
			}
			if(arg_callbackfunction && typeof(arg_callbackfunction)=="function"){
				arg_callbackfunction(_result.status,_result);
			}
		});
	}else{
		if(arg_callbackfunction && typeof(arg_callbackfunction)=="function"){
			arg_callbackfunction(_result.status,_result);
		}
	}
}

// --- Actions for nav arrows ---
var marcador = 0;
$(document).ready(function() {		
		
   $(".next_marker").click(function(){
	    mapcity.mapconfig.google.map.setZoom(18);
	   	if (marcador == marc_limite){
   			/*alert("ultimo");*/
		}else{
			marcador++;
			/*alert(marcador-1);*/
			mapcity.mapconfig.google.map.panTo(rutacompleta[marcador-1])
		}
   });
   
   $(".back_marker").click(function(){	
		if (marcador == 1 || marcador ==   0){
			/*alert("inicio");*/
		}else{
			marcador--;
			/*alert(marcador);*/
			mapcity.mapconfig.google.map.panTo(rutacompleta[marcador-1])
		}
   });
   $(".reset_nav").click(function(){
	   mapcity.routeMap();
	   marcador = 0;
	});
});
// --- End for Actions for nav arrows --
  
myezplan.maps.createMyezplanMarker=function(arg_id,arg_latlng,arg_title,arg_icon,arg_category,arg_arraytoadd,arg_visible) {
	
	var _isarraytoadd=$.isArray(arg_arraytoadd);
	var _visible=($.type(arg_visible)=="boolean")?arg_visible:true; 
	var _marker=new google.maps.Marker({position:arg_latlng,title:arg_title,icon:arg_icon});_marker.mk_id="";_marker.mk_category={category:"0"}
	if(arg_id!=""){_marker.mk_id=arg_id;}
	if(arg_category!=null){_marker.mk_category=arg_category;}
	if(_isarraytoadd){arg_arraytoadd.push(_marker);}
	_marker.setVisible(_visible);
	return _marker;
}
myezplan.maps.showInfoplaceMyezplanMarker=function(arg_marker,arg_ruta_idunico,arg_ruta_id,arg_pagename) {
	google.maps.event.addListener(arg_marker, 'click', function() {
		window.top.showinfoplace(arg_ruta_idunico,arg_ruta_id, arg_pagename);
	});
}
myezplan.maps.showInfoWindow=function(arg_marker,arg_content,arg_callbackfunction,arg_callbackobject) {
	var _self=this;_self.infoWindowMap;
	google.maps.event.addListener(arg_marker, 'click', function() {
		if(_self.infoWindowMap){_self.infoWindowMap.close();}
		_self.infoWindowMap=new google.maps.InfoWindow({content:arg_content})
		_self.infoWindowMap.open(arg_marker.map,arg_marker);
		if(arg_callbackfunction && typeof(arg_callbackfunction)=="function"){
			arg_callbackfunction(arg_callbackobject,arg_marker);
		}
	});
}
myezplan.maps.cleanRouteDirections=function(){
	//$("#directionsPanel").empty();
	$(arg_mapconfig.canvasdirections).empty();
}
myezplan.maps.showSteps=function(arg_map, arg_directionResult){
	var myRoute=arg_directionResult.routes[0].legs[0];
	var markerArray=[];
	for (var i=0; i < myRoute.steps.length; i++) {
		var _marker=new google.maps.Marker({
			position:myRoute.steps[i].start_point,
			map:arg_map
		});
		myezplan.maps.attachInstructionText(arg_map, _marker, myRoute.steps[i].instructions);
		markerArray[i]=_marker;
	}
}
myezplan.maps.attachInstructionText=function(arg_map, arg_marker, arg_text) {
	google.maps.event.addListener(arg_marker, 'click', function() {
		stepDisplay.setContent(arg_text);
		stepDisplay.open(arg_map, arg_marker);
	});
}
