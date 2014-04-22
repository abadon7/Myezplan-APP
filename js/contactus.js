// JavaScript Document
$(document).ready(function() {
	/* Click boton send By E-Mail */
	$('a.send-imgbyemail, a.send-abyemail').click(function() {
		var popup = $("#send-box");
		$(popup).fadeIn(300);

		var popMargTop = ($(popup).height() + 24) / 2; 
		var popMargLeft = ($(popup).width() + 24) / 2; 
		var byemail_name = $("#byemail_name");

		$(popup).css({ 
			//'margin-top' : -popMargTop,
			//'margin-left' : -popMargLeft
		});
		
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		$(byemail_name).focus();
		
		return false;
	});
	/* Click Close button */
	$('#send-box a.close').click( function() { 
		closePopup();
		return false;
	});
	/* Click Submit button */
	$('#send-box a#byemail_submit').click( function(event) { 
		//alert("sending information");
		var aleat = Math.random() * 9999999999999999;
		var _message = $("#messageerror");
		var byemail_name = $.trim($("#byemail_name").val());
		var byemail_email = $.trim($("#byemail_email").val());
		var byemail_subject = $.trim($("#byemail_subject").val());
		var byemail_message = $.trim($("#byemail_message").val());
		var byemail_captcha = $.trim($("#byemail_captcha").val());
		var byemail_captchahash = $.trim($("#byemail_captchahash").val());

		event.preventDefault();
		emptyMessageError(_message);

		if(byemail_name=="" || byemail_email=="" || byemail_subject=="" ||  byemail_message=="" ||  byemail_message==""){
			showMessageError(_message,"All information must be complete.<br />Please try again",300);
			hideMessageError(_message,false,300);
			return false;
		}
		if(!validateEmail(byemail_email))
		{
			showMessageError(_message,"Email not valid. Please try again",300);
			hideMessageError(_message,false,300);
			return false;
		}
		
		//return false;
		$.ajax({
			type: "POST",
			url: "data_ajax/contactus_sendbyemail.cfm",
			async:false,
			data: "aleat="+aleat+"&byemailname="+byemail_name+"&byemailemail="+byemail_email
			+"&byemailsubject="+byemail_subject+"&byemailmessage="+byemail_message
			+"&byemailcaptcha="+byemail_captcha+"&byemailcaptchahash="+byemail_captchahash,
			error: function(xhr, ajaxOptions, thrownError){
				showMessageError(_message,thrownError,300);
				hideMessageError(_message,false,300);
			},
			success: function(datos){
				showMessageError(_message,datos,300);
				hideMessageError(_message,true,300);
			}
		});
		return false;
	});
});
