// JavaScript Document
global_carttotal = 0;
global_cartchanged=false;
global_cartitemcategorytimer=0;
global_showloadinginit=true;
/* Functions */
$(document).ready(function(e) {
	getDataPage=function(){
		getcartpurchasedetails();
		getcartmissingdeals();
	}
	getcartpurchasedetails=function(){
		if(global_showloadinginit){
			$("#cartpage-fieldset #cartpage").showLoading("Loading Cart Items...",true);
		}
		/*global_showloadinginit=true;*/
		var _url = "data_ajax/cart_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "getcartpurchasedetails"};
		$("#cartpage-fieldset #cartpage").load(_url,_urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					$("#cartpage-fieldset #cartpage").empty();
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					$("#cartpage-fieldset #cartpage .numberinteger").spinner({
						step: 1,
						min: 0,
						numberFormat: "n",
						change: function( e, ui ) {
							$(this).change();
							global_cartchanged=true;
						}
					});
					break;
				default:
					break;
			}
		});
	}
	getcartmissingdeals=function(){
		if(global_showloadinginit){
			$("#cartmissingdeals-fieldset #cartpage").showLoading("Loading Missing Deals ...",true);
		}
		/*global_showloadinginit=true;*/
		var _url = "data_ajax/cart_ajax_content.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action: "cartmissingdeals"};
		$("#cartmissingdeals-fieldset #cartpage").load(_url,_urlconfig,
		function (response, status, xhr){
			switch (status){
				case "error":
					$("#cartmissingdeals-fieldset #cartpage").empty();
					console.log("error getting data: " + xhr.statusText);
					break;
				case "success":
					break;
				default:
					break;
			}
		});
	}
	validatepaypal=function(){
		if(global_cartchanged){
			alert("We have noticed that you have made additional changes to your cart. Please recalculate the cart before Paying.");
			return false;
		}
		var _validcheck = $("#paypalcheck").is(":checked");
		if(!(_validcheck)){
			alert("You must agree to the terms and conditions before continue");
			return false;
		}
		if(global_carttotal == 0){
			alert("Please select at least 1 quantity");
			return false;
		}
		return true;
	}

	openMyCoupons=function(){
		var _popup = $("#mycoupons-box");
		_popup.fadeIn(300);
		var popMargTop = (_popup.height() + 24) / 2; 
		var popMargLeft = (_popup.width() + 24) / 2; 
		_popup.css({ 
			'margin-left' : -popMargLeft
		});
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		openMyCoupons_ajax();
	}
	openMyCoupons_ajax=function(){
		$("#mycoupons-box .box-body").empty();
		var _url = "data_ajax/cart_ajax_content.cfm";
		var _urlconfig = {action:"getmycoupons"};
		$("#mycoupons-box .box-body").load(_url,_urlconfig,openMyCoupons_ajax_result);
	}
	openMyCoupons_ajax_result=function(response, status, xhr){
	}
	assignCoupon=function(arg_coupon){
		var _obj=$("#textapplycoupon");
		_obj.val(arg_coupon);
		_obj.focus();
		validatecoupon(true,true);
	}
	validatecoupon=function(arg_showmessage,arg_applycoupon){
		var _showmessage=(typeof(arg_showmessage)=="boolean"?arg_showmessage:false);
		var _applycoupon=(typeof(arg_applycoupon)=="boolean"?arg_applycoupon:false);

		var _obj=$("#textapplycoupon");
		var _val=$.trim(_obj.val());
		if(_val==""){
			_obj.focus();
			alert("Please enter a valid Coupon");
			return false;
		}
		var _data = {action:"validatecoupon",coupon:_val};
		$.ajax({
			type: "POST",
			dataType:"json",
			url: "data_ajax/cart_ajax_events.cfm",
			async:true, 
			cache:false,
			data: _data,
			beforeSend: function(){
				//$("#cartpage-fieldset #cartpage").showLoading("Updating Cart ...",false);
			},
			error: function(xhr, ajaxOptions, thrownError){
				alert(thrownError);
			},
			success: function(response){
				if($.trim(response.MESSAGE).length>0 && _showmessage){
					alert(response.MESSAGE);
				}
				if(response.OK && _applycoupon){
					applycoupon();
				}
			},
			complete: function(){
			}
		});
		return false;
	}
	applycoupon=function(){
		var _obj=$("#textapplycoupon");
		var _val=$.trim(_obj.val());
		if(_val==""){
			_obj.focus();
			return false;
		}
		var _data = {action:"applycoupon",coupon:_val};
		
		$.ajax({
			type: "POST",
			dataType:"json",
			url: "data_ajax/cart_ajax_events.cfm",
			async:true, 
			cache:false,
			data: _data,
			beforeSend: function(){
				/*$("#cartpage-fieldset #cartpage").showLoading("Updating Cart ...",false);*/
			},
			error: function(xhr, ajaxOptions, thrownError){
				alert(thrownError);
			},
			success: function(response){
				if(response.OK){
					getcartpurchasedetails();
					getcartmissingdeals();
				}else{
					if($.trim(response.MESSAGE).length>0){
						alert(response.MESSAGE);
					}
				}
			},
			complete: function(){
			}
		});
		return true;
	}
	updatecartitemcategory=function(){
	}
	updatecartitems=function(){
		var _form = $("#form-cart");
		$("#dumpform").empty();
		if(!(global_cartchanged)){
			/*alert("no changes");*/
			return false;
		}
		global_cartchanged=false;
		var _formserialized=_form.serialize();
		console.log(_formserialized);
		global_showloadinginit=false;
		var _data = _formserialized+"&action=updatecartitems";
		$.ajax({
			type: "POST",
			url: "data_ajax/cart_ajax_events.cfm",
			async:true, 
			cache:false,
			data: _data,
			beforeSend: function(){
				$("#cartpage-fieldset #cartpage").showLoading("Updating Cart ...",false);
			},
			error: function(xhr, ajaxOptions, thrownError){
				alert(thrownError);
			},
			success: function(response){
				getcartpurchasedetails();
				getcartmissingdeals();
			}
		});
	}
	addToCartLocal=function(unico,mapa){
		comprarAjax(unico,mapa);
	}
	comprarAjaxLocal_Result=function(){
		global_showloadinginit=false;
		global_cartitemcategorytimer=setTimeout(getDataPage,200);
	}
});
/* jquery events */
$(document).ready(function(e) {
	$('#cartmissingdeals-fieldset').hide();
	window.setTimeout(getDataPage,200);
	$(".buttonrefresh").click(function(e) {
		getDataPage();
	});
	$(document).on("change",".cartitemnumber",function(e) {
		var _obj = $(this);
		var _defval = 0;
		if(typeof(this.defaultValue)!="undefined"){
			_defval = parseInt(this.defaultValue);
		}
		if(!$.isNumeric(_obj.val())){
			_obj.val(_defval);
			return;
		}
		clearTimeout(global_cartitemcategorytimer);
		global_cartitemcategorytimer=setTimeout(updatecartitems,4000);
	});
	$(document).on("click","#buttonRecalculatecart",function(e) {
		clearTimeout(global_cartitemcategorytimer);
		updatecartitems();
	});
	$(document).on("click","#buttonapplycoupon",function(e) {
		e.preventDefault();
		validatecoupon(true,true);
	});
	$(document).on("click","#buttonmycoupons",function(e) {
		e.stopPropagation();e.preventDefault();
		openMyCoupons();
		return false;
	});
	/* close click FAQ */
	$('#mycoupons-box a.close').click( function() { 
		closePopup();
		return false;
	});	
	$(document).on("submit","#form-paypal",function(e) {
		return validatepaypal();
		e.preventDefault();
	});
	$(document).on("click",".cart-city-item .close",function(e) {
		e.preventDefault();
		clearTimeout(global_cartitemcategorytimer);
		var _countcartcitycontent = 1;
		var _objevt = $(this)
		var _divcartcity = _objevt.closest(".cart-city");
		var _divcartcitycontent = _objevt.closest(".cart-city-item");
		var _ruta_idunicoObj = _divcartcitycontent.find("#ruta_idunico");
		var _ruta_idunico = _ruta_idunicoObj.val();
		var _divcartcityhead = _divcartcity.prev('h3');
		var _data = "action=deletecartitem&rid="+_ruta_idunico;
		$.ajax({
			type: "POST",
			url: "data_ajax/cart_ajax_events.cfm",
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				alert(thrownError);
			},
			success: function(response){
				_divcartcitycontent.animate({opacity: 0.05}, "slow").delay(350).slideToggle("fast",function(){
					_divcartcitycontent.remove();
					_countcartcitycontent = _divcartcity.find(".cart-city-item").length;
					if(_countcartcitycontent == 0){
						_divcartcity.animate({opacity: 0.05}, "fast").slideToggle("fast",function(){
							_divcartcity.remove(); 
							_divcartcityhead.fadeOut('slow',function(){
								$(this).remove();
							});
						});
					}
					global_showloadinginit=false;
					global_cartitemcategorytimer=setTimeout(getDataPage,200);
					/*
					global_cartitemcategorytimer=setTimeout(getcartpurchasedetails,200);
					global_cartitemcategorytimer=setTimeout(getcartmissingdeals,200);
					*/
				});
			}
		});
	});


});
