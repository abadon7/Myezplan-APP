// JavaScript Document
var goToMyLocation=myLocationSearch;

function myLocationSearch(e){
	$("#AddressExchange").hide();
	clearTimeout(gtml_time1);
	clearTimeout(gtml_time2);
	cleanRouteDirections();
	myAddressMarkersClean(true);
	myLocation.endpoint=_maincoors;
	if(navigator.geolocation) {
		/*
		if(_LocationCleanAll==true){
			myLocationControlChange("disable");
			clearTimeout(gtml_time1);
			clearTimeout(gtml_time2);
			myMapsCleanAllRoutes();
			_LocationCleanAll=false;
			myLocationMarkerFlag=true
			//return;
		}
		*/
		if(myLocationMarker!=null  || myLocationMarkerFlag==true){
			map.setCenter(initialLocation);
			if(typeof(e) == "undefined"){
				gtml_time2=window.setTimeout(goToMyLocation,10000);
				_LocationCleanAll=false;
			}else{
				myLocationControlChange("disable");
				clearTimeout(gtml_time1);
				clearTimeout(gtml_time2);
			}
			myLocationMarkerFlag==true;
			myLocationMarkersClean(true);
			//myMapsCleanAllRoutes();
			return;
		}
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
			myLocation.startpoint = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			map.setCenter(myLocation.startpoint);

			myLocationMarker = new google.maps.Marker({
				map: map
				,position: myLocation.startpoint
				,title:"You are here!"
				,icon: myLocationMarkerIcon
				/*
				,zIndex:google.maps.Marker.MAX_ZINDEX+1
				*/
			});
			myLocationMarkerFlag==false;
			myLocationControlChange("enable");
			clearTimeout(gtml_time2);
			gtml_time1=window.setTimeout(goToMyLocation,600000);
			myLocationCalcRoute();
			
		}, function() {
			handleNoGeolocation(browserSupportFlag);
		});
	} else {
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}
}

function myLocationCalcRoute(args_directionsDisplay){
	/*
	console.log("startpoint:"+myLocation.startpoint);
	console.log("endpoint:"+myLocation.endpoint);
	*/
	if(myLocation.startpoint==null || myLocation.endpoint==null){
		return;
	}
	var request = {
		origin: myLocation.startpoint, 
		destination: myLocation.endpoint,
		travelMode: "DRIVING",
		optimizeWaypoints: true
	};
	//cleanRouteDirections();
	myLocationdirectionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			myLocationdirectionsDisplay.setDirections(response);
			myLocationdirectionsDisplay.setPanel(document.getElementById("directionsPanel"));
			//showSteps(response);
		}
	});
}
function myLocationExchange() {
	myLocationMarkersClean(false);
	cleanRouteDirections();
	var _tmpstartpoint=myLocation.endpoint;
	var _tmpendpoint=myLocation.startpoint;
//	console.log("tmpstartpoint:"+_tmpstartpoint);
//	console.log("tmpendpoint:"+_tmpendpoint);
	myLocation.startpoint=_tmpstartpoint;
	myLocation.endpoint=_tmpendpoint;
//	console.log("startpoint:"+myLocation.startpoint);
//	console.log("endpoint:"+myLocation.endpoint);
	//codeAddress(calcRoute);
	myLocationCalcRoute();
}
function myLocationMarkersClean(args_all,args_eraseloop){	
	_all=(typeof(args_all)=="boolean")?args_all:false;
	_eraseloop=(typeof(args_eraseloop)=="boolean")?args_eraseloop:false;
	if(myLocationMarker!=null){
		myLocationdirectionsDisplay.setMap(null);
		if(_all){
			myLocationMarker.setMap(null);
			myLocationMarker=null;
			//_LocationCleanAll=true;
			if(_eraseloop){
				myMapsCleanAllRoutes();
				myLocationControlChange("disable");
				clearTimeout(gtml_time1);
				clearTimeout(gtml_time2);
			}
		}
	}
}

/* -------------------------------------------------- */
/* -------------------------------------------------- */
