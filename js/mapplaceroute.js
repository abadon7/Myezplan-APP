// JavaScript Document
function myAddressSearch() {
	myAddressMarkersClean(true);
	cleanRouteDirections();
	myAddressSearch_Google();
}	
function myAddressSearch_Google() {
	var address = document.getElementById("addressmap").value;
	_mylocation.startpoint=_maincoors;
	_number+=1;
	if (geocoder) {
		geocoder.geocode( { 'address': address}, function(results, status) {
			var _result=results[0];
			if (status == google.maps.GeocoderStatus.OK) {
				//directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
				_mylocation.endpoint = _result.geometry.location;
				//map.setCenter(_mylocation.endpoint);

				myAddressMarker = new google.maps.Marker({
					map: map
					,position: _mylocation.endpoint
					,title: "My Address " + _number
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
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
	}
}
function myAddressCalcRoute(args_directionsDisplay){
	/*
	console.log("startpoint:"+_mylocation.startpoint);
	console.log("endpoint:"+_mylocation.endpoint);
	*/
	if(_mylocation.startpoint==null || _mylocation.endpoint==null){
		return;
	}
	var request = {
		origin: _mylocation.startpoint, 
		destination: _mylocation.endpoint,
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
	var _tmpstartpoint=_mylocation.endpoint;
	var _tmpendpoint=_mylocation.startpoint;
//	console.log("tmpstartpoint:"+_tmpstartpoint);
//	console.log("tmpendpoint:"+_tmpendpoint);
	_mylocation.startpoint=_tmpstartpoint;
	_mylocation.endpoint=_tmpendpoint;
//	console.log("startpoint:"+_mylocation.startpoint);
//	console.log("endpoint:"+_mylocation.endpoint);
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
			_mylocation.startpoint=_maincoors;
			_mylocation.endpoint=null;
			map.setCenter(_maincoors);
		}
		myAddressdirectionsDisplay.setMap(null);
	}
}
function myLocationMarkersClean(args_all){	
	_all=(typeof(args_all)=="boolean")?args_all:false;
	if(myLocationMarker!=null){
		myLocationdirectionsDisplay.setMap(null);
		if(_all){
			myLocationMarker.setMap(null);
			myLocationMarker=null;
		}
	}
}