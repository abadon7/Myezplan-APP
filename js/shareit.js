// JavaScript Document
global_itemcategorytimer=0;
global_showloadinginit=true;
/* Functions */

$(document).ready(function(e) {
	var $tab_p=$("#tabplans");
	var $tab_i=$("#tabitineraries");
	var $tab_ia=$("#tabitineraries-result");
	var $tab_ib=$(".tabitineraries-detail");
	var $tab_fil=$("#plusfilter");
	var $button_fil=$("#button_filter");
	var $arguiid="";
	/* Plans */
	hideAllTabs=function(){
		$tab_p.hide();
		$tab_i.hide();
		$tab_ia.hide();
		$tab_ib.hide();
		//$tab_fil.hide();
	}
	showfilters= function(num){
		if (num==1){
			$tab_fil.show();
			$button_fil.html('<a href="javascript:;" onclick="showfilters(0)" ><img src="images/menos.png"/></a>');}
		if(num==0){
			$tab_fil.hide();
			$button_fil.html('<a href="javascript:;" onclick="showfilters(1)" ><img src="images/mas.png"/></a>');}
		}
	getuserplans=function(){
		hideAllTabs();
		$tab_p.show();
		if(global_showloadinginit){
			$tab_p.showLoading("Loading Plans...",true);
		}
		var _thisform = $("#shareit-form");
		global_showloadinginit=true;
		var _url = "data_ajax/shareit_ajax_content.cfm?"+_thisform.serialize();
		var _urlconfig = {action:"getuserplans",rnu:randomNumberUrl() };
		$tab_p.load(_url,_urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					$tab_p.empty();
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					break;
				default:
					break;
			}
		});
	}
	planLike=function(argupid){
		if(cf_sid==""){
			pedir_sesion(1,"planLike("+argupid+")");
			return;
		}
		var _url = "likemail.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "likeuserplan",upid:argupid};
		$.post(_url,_urlconfig);
		var _url = "data_ajax/shareit_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "likeuserplan",upid:argupid};
		$.post(_url,_urlconfig,function (response, status, xhr){
			var _likeitobj=$("#likeit_"+argupid);
			var _likevalueobj=$("#likevalue_"+argupid);
			if(response.length>0){
				alert(response);
			}else{
				_likevalueobj.html(parseInt(_likevalueobj.html())+1);
			}
			_likeitobj.removeClass("likeup").addClass("likedown").removeAttr("onclick").attr("title","You already voted");
			verifyPendingRefresh();
		})
	}
	copyPlanValida= function(upid){
		var _url="data_ajax/myitinerary_content_ajax.cfm";
		var _urlconfig={action:"saveuseritinerary",saveaction:"validalimiteplans"};
				$.ajax({type:"POST",url:_url,async:false,cache:false,data:_urlconfig})
				.success(function(datos){
					if (datos==60){
						alert('You have reached the maximum limit of Plans (60), if you want to add more plans you have to delete some of your old ones');return false;
						}else{copyPlan(upid);
							}
					});
		}
	copyPlan=function(argupid){
		if(cf_sid==""){
			pedir_sesion(1,"copyPlan("+argupid+")");
			return;
		}
		var _url = "data_ajax/shareit_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "copyplan",upid:argupid};
		$.post(_url,_urlconfig)
		.error(function(xhr, ajaxOptions, thrownError) {
			alert(xhr.statusText);
		})
		.success(function (response, status, xhr){
			alert(response);
			verifyPendingRefresh();
		})
		;	
	}
	/* Plans */
	/* Itineraries */
	getideasitineraries=function(arg_uiid){
		alert(arg_uiid);
		hideAllTabs();
		$tab_i.show();
		$tab_ia.show();
		if(global_showloadinginit){
			$tab_ia.showLoading("Loading Plans...",true);
		}
		var _thisform = $("#shareit-form");
		global_showloadinginit=true;
		var _url = "data_ajax/shareit_ajax_content.cfm?uiid="+arg_uiid;
		var _urlconfig = {action:"getuseritineraries",rnu:randomNumberUrl() };
		$tab_ia.load(_url,_urlconfig,getuseritineraries_result);
	}
	getuseritineraries=function(){
		hideAllTabs();
		$tab_i.show();
		$tab_ia.show();
		if(global_showloadinginit){
			$tab_ia.showLoading("Loading Plans...",true);
		}
		var _thisform = $("#shareit-form");
		global_showloadinginit=true;
		var _url = "data_ajax/shareit_ajax_content.cfm?"+_thisform.serialize();
		var _urlconfig = {action:"getuseritineraries",rnu:randomNumberUrl() };
		$tab_ia.load(_url,_urlconfig,getuseritineraries_result);
	}
	getuseritineraries_result=function (response, status, xhr){
		switch (status){
			case "error":
				$tab_ia.html("error getting data: " + xhr.statusText);
				break;
			case "success":
				break;
			default:
				break;
		}
	}
	itineraryLike=function(arguiid){
		//alert(arguiid);
		$arguiid=arguiid;
		if(cf_sid==""){
			pedir_sesion(1,"itineraryLike("+arguiid+")");
			return;
		}
		var _url = "likemail.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "likeuseritinerary",uiid:arguiid};
		$.post(_url,_urlconfig);
		var _url = "data_ajax/shareit_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "likeuseritinerary",uiid:arguiid};
		$.post(_url,_urlconfig,itineraryLike_result);
	}
	itineraryLike_result=function (response, status, xhr){
		switch (status){
			case "error":
				console.log("error getting data: " + xhr.statusText);
				break;
			case "success":
					var _likeitobj=$("#likeit_"+$arguiid);
					var _likevalueobj=$("#likevalue_"+$arguiid);
					if(response.length>0){
						alert(response);
					}else{
						_likevalueobj.html(parseInt(_likevalueobj.html())+1);
					}
					_likeitobj.removeClass("likeup").addClass("likedown").removeAttr("onclick").attr("title","You already voted");
					verifyPendingRefresh();
				break;
			default:
				break;
		}
	}
	showItineraryDetail=function(arguiid){
		//alert(arguiid);
		$arguiid=arguiid;
		$tab_ib.show();
		if(global_showloadinginit){
			$tab_ib.showLoading("Loading Itinierary details...",true);
		}
		global_showloadinginit=true;
		var _url = "data_ajax/myitinerary_content2.cfm?";
		var _urlconfig = {action:"getuserplantable",rnu:randomNumberUrl(),uiid:arguiid };
		$tab_ib.load(_url,_urlconfig,showItineraryDetail_result);
	}
	showItineraryDetail_result=function (response, status, xhr){
		switch (status){
			case "error":
				$tab_ib.html("error getting data: " + xhr.statusText);
				break;
			case "success":
				$( ".myitin .accordion" ).accordion({collapsible: true, heightStyle: "content",active: false,animated: 'bounceslide'});
				$( ".myitin .daybox-content" ).disableSelection();
				break;
			default:
				break;
		}
	};
	myItineraryValida= function(ui_id){
		var _url="data_ajax/myitinerary_content_ajax.cfm";
		var _urlconfig={action:"saveuseritinerary",saveaction:"validalimite",ui_id:ui_id};
				$.ajax({type:"POST",url:_url,async:false,cache:false,data:_urlconfig})
				.success(function(datos){
					if (datos==5){
						alert('You have reached the maximum limit of Itineraries (5), if you want to copy a new one you have to delete one of your old Itineraries');return false;
						}else{copyItinerary(ui_id);
							}
					});
		}
	copyItinerary=function(arguiid){
		//alert(arguiid);
		if(cf_sid==""){
			pedir_sesion(1,"copyItinerary("+arguiid+")");
			return;
		}
		var _url = "data_ajax/shareit_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "copyitinerary",uiid:arguiid};
		$.post(_url,_urlconfig,copyItinerary_result)
		.error(function(xhr, ajaxOptions, thrownError) {
			alert(xhr.statusText);
		});	
	}
	copyItinerary_result=function (response, status, xhr){
		alert(response);
	}
	/* Itineraries */
});


/* jquery events */
$(document).ready(function(e) {
	//showHideTab('tabplans', 'show');
	//showHideTab('MyMissingHotDeals', 'hide');
	//showHideTab('SearchResults', 'hide');
	if(getUrlHash()){
		var _hash = getUrlHash();
			showHideTab(_hash, 'show');
	}
	$("#button-searchinplans").click(function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		getuserplans();
	});
	$("#button-searchinitineraries").click(function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		getuseritineraries();
	});
	$( "#shareit-filterbyuser" ).autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: "data_ajax/shareit_ajax_content.cfm?"+randomNumberUrl()+"",
				type:"POST",
				dataType: "json",
				data: {action: "getusersinplans", maxRows: 12, starname: request.term},
				success: function( data ) {
					console.log(data);
					response( $.map( data, function( item ) {
						return {
								label: item.label,
								id: item.id
						}
					}));
				}
			});
		},
		select:function(event,ui){
			$('#shareit-filterbyuserhidden').val(ui.item.id);
			/*
			global_showloadinginit=false;
			$("#tabplans").showLoading("Loading Plans...",false);
			getuserplans();
			*/
		},
		minLength: 4,
		delay: 500,
	});
	$( "#shareit-filterbyuser" ).change(function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		var _obj=$(this);
		if(_obj.val()==""){
			$("#shareit-filterbyuserhidden").val("");
		}
	});
	$(document).on("click","#plansplaces-box a.close",function(e){
		$("#plansplaces-box iframe")
		.empty()
		.attr("src","")
		;
		closePopup();
		return false;
		});
	$(document).on("click","#tabitineraries-result .ui_name",function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		var _id=$(this).data("id");
		showItineraryDetail(_id);
	});
	$(document).on("click", "#buttonSaveAndFile", function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		var _$this = $(this)
		var _divdayboxcontent = _$this.closest("div");
		var _ui_idObj = _divdayboxcontent.find("#ui_id");
		var _ui_id = _ui_idObj.val();
		/*myItineraryValida(_ui_id)*/
		copyItinerary(_ui_id);
		return false;
	});
	$(document).on("click",".shareit #buttonTipPlan",function(e){
		e.preventDefault();e.stopPropagation();
		var $this=($(this));
		var _popup=$("#tipplan-box");
		_popup.fadeIn(300);
		var popMargTop=(_popup.height() + 24) / 2; 
		var popMargLeft=(_popup.width() + 24) / 2; 
		_popup.css({'margin-left':-popMargLeft});
		var $popupbody=_popup.find(".box-body");
		$popupbody.empty();
		var url="data_ajax/map_usersplans_ajax.cfm?rnu="+randomNumberUrl()+"";
		var urlconfig={action:"getplantip",up_id:$this.data("id"),up_read:true};
		$popupbody.load(url,urlconfig,function(response, status, xhr){
		}).error(myezplan.utils.ajaxError);
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
	});  
	$(document).on("click", ".shareit #tipplan-box a.close", function(){
		closePopup();
		return false;
	});
	$(document).on("click",".shareit #buttonTipItinerary",function(e){
		e.preventDefault();e.stopPropagation();
		var $this=($(this));
		var _popup=$(".shareit #tipitinerary-box");
		_popup.fadeIn(300);
		var popMargTop=(_popup.height() + 24) / 2; 
		var popMargLeft=(_popup.width() + 24) / 2; 
		/*_popup.css({'margin-left':-popMargLeft});*/
		/*alert("share it 3");*/
		var $popupbody=_popup.find(".box-body");
		$popupbody.empty();
		var url="data_ajax/map_usersplans_ajax.cfm?rnu="+randomNumberUrl()+"";
		var urlconfig={action:"getitinerarytip",ui_id:$this.data("id")};
		$popupbody.load(url,urlconfig,function(response, status, xhr){}).error(myezplan.utils.ajaxError);
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
	});  
	$(document).on("click", ".shareit #tipitinerary-box a.close", function(){ 
		closePopup();
		return false;
	});
	$(document).on("click",".shareit #buttonMapItinerary",function(e){
		e.preventDefault();
		openMapItineraryPopup($(this).data("id"));
	});  
	/* Click Submit form [shareitinerary-form] */
	$(document).on("click",'.shareit form#shareitinerary-form #shareitinerary_submit',function(e) {
		e.preventDefault();e.stopPropagation();
		var $form=$(this).closest('form');
		var _ca = $form.find('#shareitinerary_checkagree');
		var _message = $form.find("#messageerror-shareitinerary");
		var _sharelink=$.trim($("#sharelink").val());
		var _shareitinerary_emailfrom = $.trim($("#shareitinerary_emailfrom").val());
		var _shareitinerary_emailto = $.trim($("#shareitinerary_emailto").val());
		var _shareitinerary_message = $.trim($("#shareitinerary_emailmessage").val());
		var _uiid = $("#divuseritineray #ui_id").val();
		var _uiusid = cf_sid;
		if(_uiusid.length == 0){
			var _uiusid = 0;
		}
		emptyMessageError(_message);
		/* verify checkAgree */
		if( !( $(_ca).is(':checked') ) ){
			return;
		}
		/* verify all inputs */
		if(_shareitinerary_emailfrom=="" || _shareitinerary_emailto=="" || _shareitinerary_message==""){
			showMessageError(_message,"All information must be complete.<br />Please try again",300);
			hideMessageError(_message,false,300);
			return false;
		}
		/* validate Email To */
		if(!validateEmail(_shareitinerary_emailto))
		{
			showMessageError(_message,"Email not valid. Please try again",300);
			hideMessageError(_message,false,300);
			return false;
		}
		//return false;
		var _data="sharelink="+_sharelink+"&sharefrom="+_shareitinerary_emailfrom+"&shareemailto="+_shareitinerary_emailto+"&sharemessage="+_shareitinerary_message+"&uiid="+_uiid+"&uiusid="+_uiusid+"&om=sendmail&wat=false";
		$.ajax({
			type: "POST",
			url: "myitinerarypdf.cfm",
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


	hideAllTabs();
	$("#button-searchinplans").click();
	//$("#button-searchinitineraries").click();
});

/* jquery events 2 */
$(document).ready(function(e) {
	/* when ready shareit-selectcountry load it */
	$('#shareit-selectcountry').ready(function() {
		$("#shareit-selectcountry").empty();
		var aleat = Math.random() * 9999999999999999;
		var url = "data_ajax/map_homemenu_ajax.cfm?aleat="+aleat+"&";
		var urlconfig = {action: "getcountriesshort"};
		$("#shareit-selectcountry").load(url,urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					$("#shareit-selectcountry").attr("disabled",false);
					break;
				default:
					break;
			}
		});
	});
	/* change function shareit-selectcountry */
	$('#shareit-selectcountry').change(function() {
		$("#shareit-selectcity").empty();
		$("#shareit-selectcity").attr("disabled",true);
		$("#shareit-selectplan").empty();
		$("#shareit-selectplan").attr("disabled",true);
		var _countryid = $("#shareit-selectcountry").val();
		if(_countryid == ""){ 
			return; 
		}
		var aleat = Math.random() * 9999999999999999;
		var url = "data_ajax/map_homemenu_ajax.cfm?aleat="+aleat+"&";
		var urlconfig = {action: "getcitiesbycountryshort", countryid: _countryid};
		$("#shareit-selectcity").load(url,urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					$("#shareit-selectcity").attr("disabled",false);
					break;
				default:
					break;
			}
		});
	});
	/* change function shareit-selectcity */
	$('#shareit-selectcity').change(function() {
		$("#shareit-selectplan").empty();
		var _cityid = $("#shareit-selectcity").val();
		if(_cityid == ""){ 
			$("#shareit-selectplan").attr("disabled",true);
			return; 
		}
		var aleat = Math.random() * 9999999999999999;
		var url = "data_ajax/map_homemenu_ajax.cfm?aleat="+aleat+"&";
		var urlconfig = {action: "getplansbycityshort", cityid: _cityid};
		$("#shareit-selectplan").load(url,urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					$("#shareit-selectplan").attr("disabled",false);
					break;
				default:
					break;
			}
		});
	});
});
