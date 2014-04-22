/* load global function */
mapcity.drawGoogleMap=function(){
	if(mapcity.mapconfig.mapgoogle==null){
		myezplan.maps.initializeGoogleMap(mapcity.mapconfig,function(arg_mapconfig,status,result){
			if(status=="ERROR"){
				console.log(status + ":" + result.errormessage);
				return false;
			}
			$("#mapcitycity-box").hide("fast");
			myezplan.maps.calculateGoogleRoute(mapcity.mapconfig,mapcity.calculateGoogleRouteCallback);
		});
	}else{
		console.log("no changes to draw");
	}
}
/* cleanCurrentMapCity */
mapcity.cleanCurrentMapCity=function(){
	var _url = "data_ajax/map_city_ajax.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {action:"clean"};
	$.post(_url,_urlconfig)
		.error(myezplan.utils.ajaxError)
		.success(function(response, status, xhr){
			window.location.reload();
		})
	;
}
/* cleanCurrentMapCity */

/* load global variables */
$(document).ready(function(e) {
	/* Google Map */
	mapcity.mapconfig=new myezplan.maps.config;
	mapcity.mapconfig.canvasmap=$('#wrapperbody_map #map_canvas').get([0]);
	mapcity.mapconfig.canvasdirections=$('#wrapperbody_direction #directionsPanel').get([0]);
	mapcity.mapconfig.google.mapoptions.navigationControl=false;
	mapcity.mapconfig.google.renderoptions={suppressMarkers:false,suppressInfoWindows:false};
	/* */
	mapcity.pathtoicon="ezmapas/maps_pics/";
	mapcity.selectors={};
	mapcity.selectors.form="form#drawform";
	mapcity.selectors.city=mapcity.selectors.form+" #city";
	mapcity.selectors.plan=mapcity.selectors.form+" #plan";
	mapcity.selectors.pl=mapcity.selectors.form+" #pl";
	mapcity.selectors.plse=mapcity.selectors.form+" #plse";
	mapcity.selectors.sp=mapcity.selectors.form+" #sp";
	mapcity.selectors.ep=mapcity.selectors.form+" #ep";
	mapcity.selectors.gotm=mapcity.selectors.form+" #gotm";
	mapcity.selectors.itemchanged=mapcity.selectors.form+" .formitemchanged";
	mapcity.selectors.cookieplaces="EZMAPCITYPLACES";
	mapcity.selectors.cookiequery="EZMAPCITYQUERY";
	mapcity.pageurl=new myezplan.pageurl();
	mapcity.pageurl.searchmethod="url";
	mapcity.pageurl.searchform=mapcity.selectors.form;
	mapcity.places=mapcity.mapconfig.places;

//	$(document).on("click","#wrapper-print .share-img",function(e) {
//		e.stopPropagation();e.preventDefault();
//		mapcity.pageurl.mapShare();
//		return false;
//	});
	$('.chkprintoptions').change(function(e) {
		var _chk=$(this);
		myezplan.printing.showPrint((_chk.is(":checked"))?"show":"hide",_chk.data("option"));
	});
	$('a.print-a').click(function() {
		window.self.print();
	});
});
