// JavaScript Document
global_itemcategorytimer=0;
global_showloadinginit=true;
/* Functions */
$(document).ready(function(e) {
	getDataPage=function(){
		getpurchaseddeals();
		//getmissingdeals();
		getsearchingdeals();
	}
	$('#map-top-button-newmap').click( function(e) {
		e.stopPropagation();e.preventDefault();
		if(window.confirm("You are going to create a new plan. Your current plan will be lost if not saved. Do you want to continue?")){
	var _url = "data_ajax/map_city_ajax.cfm?rnu=51635163521321351";
	var _urlconfig = {action:"clean"};
	$.post(_url,_urlconfig)
		//.error(alert('clean error'))
		.success(function(response, status, xhr){
		var $popup=$('#new_plan');
	$('#lololo').showLoading("Please Wait,<br/>Loading...<br/>",false);
	var _url = "data_ajax/mapcity_content.cfm?6516516516501651+";
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
		return true;
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
	getpurchaseddeals=function(){
		if(global_showloadinginit){
			$("#MyPurchasedDeals").showLoading("Loading Purchased Deals...",true);
		}
		/*global_showloadinginit=true;*/
		var _url = "data_ajax/deals_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "getpurchaseddeals"};
		$("#MyPurchasedDeals").load(_url,_urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					$("#MyPurchasedDeals").empty();
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					break;
				default:
					break;
			}
		});
	}
	getmissingdeals=function(){
		if(global_showloadinginit){
			$("#MyMissingHotDeals").showLoading("Loading Missing Deals ...",true);
		}
		/*global_showloadinginit=true;*/
		var _url = "data_ajax/cart_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "cartmissingdeals",source:"hotdeal"};
		$("#MyMissingHotDeals").load(_url,_urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					$("#MyMissingHotDeals").empty();
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					if(response.length > 0){
						$("#MyMissingHotDeals").parent("div").show();
					}else{
						$("#MyMissingHotDeals").parent("div").hide();
					}
					break;
				default:
					break;
			}
		});
	}

	getsearchingdealsnew=function(){
		var _city=5;
		var _tour='';
		showHideTab('SearchResults', 'show');
		$("#SearchResults").showLoading("Loading Deals...",true);
		//alert(_city);
				var _url = "data_ajax/deals_ajax_content.cfm?"+randomNumberUrl()+"";
				var _urlconfig = {action: "getsearchingdeals",city:_city,tour:_tour};
				$("#SearchResults").load(_url,_urlconfig,function (response, status, xhr){switch (status){case "error":$("#SearchResults").empty();alert('error');break;}				});
//				break;
				var _popup = $("#menusearchdeals-box");
				_popup.fadeIn(300);
				var popMargTop = (_popup.height() + 24) / 2; 
				var popMargLeft = (_popup.width() + 24) / 2; 
				_popup.css({ 
			   //'margin-top' : -popMargTop,
			  // margin-left' : -popMargLeft
		});
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
	}

	getsearchingdeals=function(){
		//var _q=getUrlParamValue("q");
		var _q="search";
		if(_q == ""){ return; }
		//if(global_showloadinginit){
			$("#SearchResults").showLoading("Loading Deals...",true);
		//}
		switch(_q){
			case "search":
				/*global_showloadinginit=true;*/
				var _city=getUrlParamValue("city");
				var _tour=getUrlParamValue("tour");
				if (!(_city)){getsearchingdealsnew();return false;}
				//alert(_city);
				var _url = "data_ajax/deals_ajax_content.cfm?"+randomNumberUrl()+"";
				var _urlconfig = {action: "getsearchingdeals",city:_city,tour:_tour};
				$("#SearchResults").load(_url,_urlconfig,function (response, status, xhr){switch (status){case "error":$("#SearchResults").empty();break;}				});
				break;
			case "missitin":
				var _uiid=getUrlParamValue("uiid");
				var _url = "data_ajax/deals_ajax_content.cfm?"+randomNumberUrl()+"";
				var _urlconfig = {action: "getmissingdealsitinerary",uiid:_uiid};
				$("#SearchResults").load(_url,_urlconfig,function (response, status, xhr){switch (status){case "error":$("#SearchResults").empty();break;}				});
				break;
		}
	}
	addToCartLocal=function(unico,mapa){
		comprarAjax(unico,mapa);
	}
		addToMyezplan=function(id){
		var nombreboton = 'add-'+id;
		var myezplan=$.cookie("EZPLAN");
		if (myezplan == 'NO'){
			$.cookie("EZPLAN", id);
			$.cookie("EZPLANsp", id);
			$.cookie("EZPLANep", id);			
		}else{
			$.cookie("EZPLAN",myezplan+','+id);
			$.cookie("EZPLANep", id);
		}
		var myezplan=$.cookie("EZPLAN");		
		//alert(myezplan);
		document.getElementById(nombreboton).innerHTML ='<button class="button-round-2 button-round-red2" //title="Click to remove from myezplan" onclick="removeToMyezplan('+id+');">Added</button>';
	}
		removeToMyezplan=function(id){
		var nombreboton = 'add-'+id;
		var myezplan=$.cookie("EZPLAN");
		document.getElementById(nombreboton).innerHTML ='<button onclick="addToMyezplan('+id+');" class="button-round-2 button-round-red2" title="Click to add to myezplan">Add to myezplan</button>';
		if (myezplan==id){
		$.cookie("EZPLAN", 'NO');
		$.cookie("EZPLANsp", 'NO');
		$.cookie("EZPLANep", 'NO');
		return false;
		}
		nueva='';
		var cookiepl= myezplan.split(',');
		$.each(cookiepl,function(index,value){
				if (nueva==''){if(value !=id){nueva=value;spn=value;epn=value;}}
				else{if(value !=id){nueva=nueva+','+value;epn=value;}}
				
		});
		$.cookie("EZPLAN", nueva);
		$.cookie("EZPLANsp", spn);
		$.cookie("EZPLANep", epn);
		//alert(nueva+' '+spn+' '+epn);
	}
	comprarAjaxLocal_Result=function(){
		verifyPendingRefresh();
		global_showloadinginit=false;
		global_cartitemcategorytimer=setTimeout(getDataPage,200);
	}
});

/* jquery events */
function check_image_load() {  
	$('[data-image]').each(function(e) { 
        if (is_in_view($(this))){
        $(this).append('<img src="'+$(this).attr('data-image')+'" width="'+$(this).attr('data-imagew')+'" height="'+$(this).attr('data-imageh')+'" />').removeAttr('data-image').hide().fadeIn(2000);
        }  

    });  

    $('[data-real-src]').each(function(e) { 
        if (is_in_view($(this))){
       if($(this).attr('data-real-type')=="image"){
           $(this).attr('src',$(this).attr('data-real-src')).removeAttr('data-real-src').hide().fadeIn(2000);
       }
      }  

    });  
}  

function is_in_view(elem) {  
    var docViewTop = $(window).scrollTop();  
    var docViewBottom = docViewTop + $(window).height();  
    var elemTop = $(elem).offset().top;  
    var elemBottom = elemTop + $(elem).height();  
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)); 
}  

// Llamado de la función check_image_load cuando se mueva el scroll y cuando cargue la página normalmente
$(window).scroll(function() { check_image_load(); });
//$(document).ready(function() { check_image_load(); });
$(document).ready(function(e) {
	window.setTimeout(getDataPage,200);
	//check_image_load();
	showHideTab('MyPurchasedDeals', 'hide');
	showHideTab('MyMissingHotDeals', 'hide');
	showHideTab('SearchResults', 'hide');
	var myezplan=$.cookie("EZPLAN");
	if (!myezplan){
		$.cookie("EZPLAN", 'NO');
		$.cookie("EZPLANsp", 'NO');
		$.cookie("EZPLANep", 'NO');
		}
	if(getUrlHash()){
		var _hash = getUrlHash();
			showHideTab(_hash, 'show');
	}
	$("#button-viewmyezplan").click(function(e) {
	var myezplan=$.cookie("EZPLAN");
	var sp=$.cookie("EZPLANsp");
	var ep=$.cookie("EZPLANep");
	if (myezplan == 'NO'){
		if(confirm('Do you want to create a plan from scratch ? if not, then select at least one deal')){
			window.location.href='mapcity.cfm';
			}else{
			return false;}
		}
	//alert(myezplan);
	window.location.href='mapcity.cfm?sp='+sp+'&ep='+ep+'&gotm=WALKING&pl='+myezplan+'&plse='+myezplan+'&upid=';	
	});
	$("#button-clearmyezplan").click(function(e) {
	var myezplan=$.cookie("EZPLAN");
	$.cookie("EZPLANsp","NO");
	$.cookie("EZPLANep", "NO");
	if (myezplan == "NO"){return false;}
	if (!confirm('Clear all deals added to myezplan')){return false;}
	$.cookie("EZPLAN", "NO");
	var cookiepl= myezplan.split(',');
	$.each(cookiepl,function(index,value){
			var nombreboton = 'add-'+value;
			document.getElementById(nombreboton).innerHTML ='<button onclick="addToMyezplan('+value+');" class="button-round-2 button-round-red2" <!--title="Click to add to myezplan"-->>Add to myezplan</button>';
		});
	});
});


function openMapDealPopup(_tour,_city,_cate) {
		var popup = $("#mapplanscity-box");
		$(popup).fadeIn(300);
		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		//$(popup).fadeOut(3000);
		//$(popup).css({ 
//			'margin-top' : -popMargTop+$(document).scrollTop(),
//			'margin-left' : -popMargLeft
//		});
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		/* ------------------------ */
		var _urliframepopup = "hotdealsmappopup.cfm?city="+_city+"&tour="+_tour+"&category="+_cate;
		$('#iframe_mapplanscity').attr("src",_urliframepopup);
		$('#iframe_mapplanscity').fadeIn(300);
		return false;
	}
function Map_Filter(){
	var AR_ = document.getElementById('Sel_area').value;
	var CG_ = document.getElementById('Sel_CatG').value;
	var _city=getUrlParamValue("city");
	if(AR_ == 'NO'){
		var _tour = getUrlParamValue("tour");
		}
	else{
		var _tour=AR_;
		}
	if(CG_ == 'NO'){
		var _cate = '';
		}
	else{
		var _cate = CG_;
		}
//alert(_tour+' '+_city+' '+_cate);
openMapDealPopup(_tour,_city,_cate);
}

function Filter_(){
	var AR_ = document.getElementById('Sel_area').value;
	var CG_ = document.getElementById('Sel_CatG').value;
	var _q=getUrlParamValue("q");
		switch(_q){
			case "search":
				/*global_showloadinginit=true;*/
				var _city=getUrlParamValue("city");
				if(AR_ == 'NO'){
					var _tour = '';
					}
				else{
					var _tour=AR_;
					}
				if(CG_ == 'NO'){
					var _cate = '';
					}
				else{
					var _cate = CG_;
					}
				//alert(_cate);
				var _url = "data_ajax/deals_ajax_content.cfm?"+randomNumberUrl()+"";
				var _urlconfig = {action: "getsearchingdeals",city:_city,tour:_tour,category:_cate};
				$("#SearchResults").load(_url,_urlconfig,function (response, status, xhr){switch (status){case "error":$("#SearchResults").empty();break;}				});
				break;
			case "missitin":
				var _uiid=getUrlParamValue("uiid");
				var _url = "data_ajax/deals_ajax_content.cfm?"+randomNumberUrl()+"";
				var _urlconfig = {action: "getmissingdealsitinerary",uiid:_uiid};
				$("#SearchResults").load(_url,_urlconfig,function (response, status, xhr){switch (status){case "error":$("#SearchResults").empty();break;}				});
				break;
		}
	}