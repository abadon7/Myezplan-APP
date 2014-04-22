var geocoder=new google.maps.Geocoder();
var directionsService=new google.maps.DirectionsService();
var browserSupportFlag= new Boolean(), gtml_time1=0, gtml_time2=0,myLocation={},myLocationMarker=null,myAddressMarker=null,myLocationMarkerFlag=false;
/* -------------------------------------------------- */
/* -------------------------------------------------- */
function cleanRouteDirections(){	
	$("#directionsPanel").empty();
}
function cleanAllMarkers_(){
	if(myLocationMarkerFlag){
		myLocationMarkerFlag=false;
		directionsDisplay.setMap(null);
	}
	
	if(myAddressMarker!=null){
		directionsDisplay.setMap(null);
		if(myLocationMarker!=null){
			myLocationMarker.setMap(null);
			myLocationMarker=null;
		}
	}
}
function myMapsCleanAllRoutes(){
	$("#AddressExchange").hide();
	cleanRouteDirections();
	if(typeof(myAddressMarkersClean)=="function"){
		myAddressMarkersClean(true);
	}
	myLocationMarkersClean(true,true);
}
function USGSOverlay(bounds, image, map) {
	this.bounds_ = bounds;
	this.image_ = image;
	this.map_ = map;
	this.div_ = null;
	this.setMap(map);
}
USGSOverlay.prototype = new google.maps.OverlayView();
USGSOverlay.prototype.onAdd = function() {
	var div = document.createElement('DIV');
	div.style.border = "none";
	div.style.borderWidth = "0px";
	div.style.position = "absolute";
	var img = document.createElement("img");
	img.src = this.image_;
	img.style.width = "100%";
	img.style.height = "100%";
	div.appendChild(img);
	this.div_ = div;
	var panes = this.getPanes();
	panes.overlayLayer.appendChild(div);
}
USGSOverlay.prototype.draw = function() {
	var _pxbase=140;
	var overlayProjection = this.getProjection();
	var sw = overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(parseFloat(coor1imagenv[0]),parseFloat(coor1imagenv[1])));
	var ne = overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(parseFloat(coor2imagenv[0]),parseFloat(coor2imagenv[1])));
	var div = this.div_;
	div.style.left = (Math.floor(sw.x)-_pxbase*0.50) + 'px';
	div.style.top = (Math.floor(ne.y)-_pxbase*0.50) + 'px';
	div.style.width = (Math.ceil((ne.x - sw.x))+_pxbase) + 'px';
	div.style.height = (Math.ceil((sw.y - ne.y))+_pxbase) + 'px';
/*
	div.style.left = sw.x + 'px';
	div.style.top = ne.y + 'px';
	div.style.width = (ne.x - sw.x) + 'px';
	div.style.height = (sw.y - ne.y) + 'px';
*/
}
