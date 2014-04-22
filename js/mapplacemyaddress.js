// JavaScript Document
function myAddressSearch() {
	myMapsCleanAllRoutes();
	myAddressSearch_Google();
}	
function myAddressSearch_Google() {
	var address = $.trim(document.getElementById("addressmap").value);
	if(address==""){
		alert("Please enter a valid address");
		return;
	}
	myLocation.endpoint=_maincoors;
	$("#AddressExchange").show();
	if (geocoder) {
		geocoder.geocode( { 'address': address}, function(results, status) {
			var _result=results[0];
			if (status == google.maps.GeocoderStatus.OK) {
				//directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
				myLocation.startpoint = _result.geometry.location;
				//map.setCenter(myLocation.endpoint);

				myAddressMarker = new google.maps.Marker({
					map: map
					,position: myLocation.startpoint
					,title: "My Address"
					/*
					,icon:"http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png"
					,zIndex:google.maps.Marker.MAX_ZINDEX+1
					*/
				});
				/*
				var infowindow = new google.maps.InfoWindow({ 
					content: "<br /><p>" + _result.formatted_address + "</p>",
					size: new google.maps.Size(50,50)
				});
				google.maps.event.addListener(myAddressMarker, 'click', function() {
					infowindow.open(map,myAddressMarker);
				})
				*/
				/*
				if(typeof(args_functioncresult)=="function"){
					window.setTimeout(args_functioncresult,10);
				}
				*/
				myAddressCalcRoute();
			} else {
				//alert("Geocode was not successful for the following reason: " + status);
				alert("Please enter a valid address");
			}
		});
	}
}
function myAddressCalcRoute(args_directionsDisplay){
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
	myAddressdirectionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			myAddressdirectionsDisplay.setDirections(response);
			myAddressdirectionsDisplay.setPanel(document.getElementById("directionsPanel"));
			//showSteps(response);
		}
	});
}
function myAddressExchange() {
	myAddressMarkersClean(false);
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
	myAddressCalcRoute();
}
function myAddressMarkersClean(args_all){
	_all=(typeof(args_all)=="boolean")?args_all:false;
	if(myAddressMarker!=null){
		if(_all){
			myAddressMarker.setMap(null);
			myAddressMarker=null;
			/*
			*/
			myLocation.endpoint=_maincoors;
			myLocation.startpoint=null;
			map.setCenter(_maincoors);
		}
		myAddressdirectionsDisplay.setMap(null);
	}
}
