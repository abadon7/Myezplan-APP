// JavaScript Document
$(document).ready(function(e) {
	$("#form-validatevoucher-submit").click(function(e) {
		e.preventDefault();
		validateVoucher();
	});
	validateVoucher=function(){
		var _message = $("#messageerror-validatevoucher");
		_message.hide();
		var _objcid = $("#cid");
		var _objvid = $("#vid");
		var _objvn = $("#vn");
		var _cid = _objcid.val();
		var _vid = _objvid.val();
		var _vn = _objvn.val();
		if(_vn == ""){
			return;
		}
		var _vnurl = getUrlParamValue("vn");
		if(_vnurl!=_vn){_vid="";}
		$("#body-content").empty();
		var _data = {action:"validatevoucher",cid:_cid,vid:_vid,vn:_vn};
		$.ajax({
			type: "POST",
			url:"data_ajax/cl_redeemvoucher_ajax.cfm?"+randomNumberUrl(),
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
			},
			success: function(response){
				var _arrresponse = response.split("|");
				var _result = _arrresponse[0];
				var _resultstr = _arrresponse[1];
				if(_result==0){
					showMessageError(_message,_resultstr,300);
					return;
				}
				getVoucherInfo();
			}
		});
	}
	getVoucherInfo=function(){
		var _message = $("#messageerror-validatevoucher");
		_message.hide();
		var _objcid = $("#cid");
		var _objvid = $("#vid");
		var _objvn = $("#vn");
		var _cid = _objcid.val();
		var _vid = _objvid.val();
		var _vn = _objvn.val();
		if(_vn == ""){
			return;
		}

		var popup = $("#body-content");
		$(popup).fadeIn(300);
		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		$(popup).css({ 
			'margin-left' : popMargLeft
		});

		$("#body-content").show();
		$("#body-content").showLoading("Loading Voucher ...",true);
		var _vnurl = getUrlParamValue("vn");
		if(_vnurl!=_vn){_vid="";}
		var _url="data_ajax/cl_redeemvoucher_ajax.cfm?"+randomNumberUrl();
		var _data = {action:"getvoucherinfo",cid:_cid,vid:_vid,vn:_vn};
		$("#body-content").load(_url,_data,function(response, status, xhr){});
	}
	$(document).on("click","#redeemyes",function(e){
		var _message = $("#messageerror-redeemvoucher");
		var _objvid = $("#vid");
		var _objvn = $("#vn");
		var _vid = _objvid.val();
		var _vn = _objvn.val();
		if(_vn == ""){
			return;
		}
		var _data = {action:"redeemvoucher",vid:_vid,vn:_vn};
		$.ajax({
			type: "POST",
			url:"data_ajax/cl_redeemvoucher_ajax.cfm?"+randomNumberUrl(),
			async:false, 
			cache:false,
			data: _data,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
			},
			success: function(response){
				showMessageError(_message,response,300);
				hideMessageError(_message,true,200);
			}
		});
	})
	$(document).on("click","#redeemno",function(e){
		var _message = $("#messageerror-redeemvoucher");
		showMessageError(_message,"The Voucher has not been redeemed",300);
		hideMessageError(_message,true,200);
	})
	closePopup=function(){
		if( getUrlParamValue("vn")!="" || getUrlParamValue("ce")!="" || getUrlParamValue("ce")!="" ){
			var t=window.setTimeout(function(){window.location.replace(_documenturlbase);},600)
		}else{
			$("#body-content").toggle();
			$("#body-content").empty();
			$("#vn").val("");
			$("#vn").focus();
		}
	}
	$("#vn").focus();
	window.setTimeout(validateVoucher,100);
});
