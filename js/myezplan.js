window.myezplan=window.myezplan||{};
/* */
myezplan.pathmapscity="ezmapas/maps_city/";
myezplan.findUrl2=function(arg_object){
	var _origin=arg_object.searchmethod||"form";
	if(arg_object.urlname==""){
		var _str=window.location.href;
		if(_str.split){_str=_str.split("?")[0];}
		if(_str.split){_str=_str.split("#")[0];}
		arg_object.urlname=_str;
	}
arg_object.urlquery=mapcity.selectors.cookiequery;
//	switch(_origin.toLowerCase()){
//		case "form":
//			if(!arg_object.searchform){throw "searchform has no value"}
//			var _form = $(arg_object.searchform);
//			arg_object.urlquery=$.trim("?"+_form.find(":input[name][value!='']").serialize());
//			break;
//		case 'url':
//			var _search=(window.location.search=="")?"?":window.location.search;
//			arg_object.urlquery=$.trim(_search);
//			break;
//	}
	var plp='';
	var coopersonal=$.cookie("EZPERSONAL");
	if(coopersonal && coopersonal!=''){
	var plp=coopersonal;
		}
	arg_object.fullurl=arg_object.urlname+""+arg_object.urlquery+"&plp="+plp;
	return true;
}
myezplan.findUrl=function(arg_object){
	var _origin=arg_object.searchmethod||"form";
	if(arg_object.urlname==""){
		var _str=window.location.href;
		if(_str.split){_str=_str.split("?")[0];}
		if(_str.split){_str=_str.split("#")[0];}
		arg_object.urlname=_str;
	}
	switch(_origin.toLowerCase()){
		case "form":
			if(!arg_object.searchform){throw "searchform has no value"}
			var _form = $(arg_object.searchform);
			arg_object.urlquery=$.trim("?"+_form.find(":input[name][value!='']").serialize());
			break;
		case 'url':
			var _search=(window.location.search=="")?"?":window.location.search;
			arg_object.urlquery=$.trim(_search);
			break;
	}
	arg_object.fullurl=arg_object.urlname+""+arg_object.urlquery;
	return true;
}
myezplan.findUrlShorten2=function(arg_object){
	arg_object.findUrl2();
	if(arg_object.urlquery=="" || arg_object.urlquery=="?"){return;}
	if (arg_object.cache[arg_object.fullurl]){
		arg_object.fullurlshorten=arg_object.cache[arg_object.fullurl];
	}else{
		var _url="cfc/mapcity.cfc";
		var _urlconfig={method:"googleURLShorten_json",url:arg_object.fullurl};
		$.ajax({url:_url,data:_urlconfig,async:false,dataType:'json'})
			.error(myezplan.utils.ajaxError)
			.success(function(response) {
				arg_object.cache[arg_object.fullurl]=response.URL;
				arg_object.fullurlshorten=response.URL;
			})
		;
	}
	return true;
	/*$.when( function	).done(function(){console.log(mapcity.pageurl.fullurlshorten);});*/
}
myezplan.findUrlShorten=function(arg_object){
	arg_object.findUrl();
	if(arg_object.urlquery=="" || arg_object.urlquery=="?"){return;}
	if (arg_object.cache[arg_object.fullurl]){
		arg_object.fullurlshorten=arg_object.cache[arg_object.fullurl];
	}else{
		var _url="cfc/mapcity.cfc";
		var _urlconfig={method:"googleURLShorten_json",url:arg_object.fullurl};
		$.ajax({url:_url,data:_urlconfig,async:false,dataType:'json'})
			.error(myezplan.utils.ajaxError)
			.success(function(response) {
				arg_object.cache[arg_object.fullurl]=response.URL;
				arg_object.fullurlshorten=response.URL;
			})
		;
	}
	return true;
	/*$.when( function	).done(function(){console.log(mapcity.pageurl.fullurlshorten);});*/
}
myezplan.getUrlQuery=function(arg_object){
	arg_object.findUrl();
	return arg_object.urlquery;
}
myezplan.getFullUrl=function(arg_object){
	arg_object.findUrl();
	return arg_object.fullurl;
}
myezplan.getFullUrlShorten=function(arg_object){
	arg_object.findUrlShorten();
	return arg_object.fullurlshorten;
}
myezplan.getFullUrlShorten2=function(arg_object){
	arg_object.findUrlShorten2();
	return arg_object.fullurlshorten;
}
myezplan.mapSave=function(arg_object){
	if(arg_object.mapValidToProcess){if(!arg_object.mapValidToProcess()){alert("Please, complete all the steps before saving.");return false;}}
	return true;
}
myezplan.mapPrint2=function(arg_object){
	if(!(arg_object.printpage)){console.log("Not implemented.");return false;}
	//alert(mapcity.selectors.cookiequery);
	var plp='';
	var coopersonal=$.cookie("EZPERSONAL");
	if(coopersonal && coopersonal!=''){
	var plp=coopersonal;
		}
	var _printpage=arg_object.printpage+mapcity.selectors.cookiequery+"&plp="+plp;
	return window.open(_printpage,"mapprint");
}
myezplan.mapPrint=function(arg_object){
	if(arg_object.mapValidToProcess){if(!arg_object.mapValidToProcess()){alert("Please, complete all the steps before printing.");return false;}}
	//if(arg_object.mapchanged){alert("We have noticed that you have made additional changes to your plan. Please complete all the steps before printing.");return false;}
	if(!(arg_object.printpage)){console.log("Not implemented.");return false;}
	var _printpage=arg_object.printpage+arg_object.urlquery;
	return window.open(_printpage,"mapprint");
}
myezplan.mapShare2=function(arg_object){
//	if(arg_object.mapValidToProcess){if(!arg_object.mapValidToProcess()){alert("Please, complete all the steps before sharing.");return false;}}
	//if(arg_object.mapchanged){alert("We have noticed that you have made additional changes to your plan. Please complete all the steps before sharing.");return false;}
	arg_object.getFullUrlShorten2();
	//alert(arg_object.urlquery);
	if(arg_object.urlquery=="" || arg_object.urlquery=="?"){alert("Nothing selected");return;}
	var _popup = $("#share-box");
	_popup.fadeIn(300);
	_popup.find('#title-box-2').click();
	var popMargTop = (_popup.height() + 24) / 2; 
	var popMargLeft = (_popup.width() + 24) / 2; 
	_popup.css({ 
		/*'margin-left' : -popMargLeft*/
	});
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	//var _popup = $("#share-box");
	_popup.find("#share-box-facebook-e").click(function(e) {
		window.open(arg_object.getFacebookUrl(),'sharer','toolbar=0,status=0,width=626,height=436'); return false;
	});
	_popup.find("#share-box-twitter-e").attr("href",arg_object.getTweeterUrl_m(arg_object));
	_popup.find("#share-box-blogger-e").attr("href",arg_object.getBloggerUrl_m(arg_object));
	_popup.find("#share-box-2 #sharelink").val(arg_object.getMailUrl(arg_object));
	_popup.find("#share-box-2 #sharelinkgpx").val(arg_object.getGpxUrl(arg_object));
	return true;
}
myezplan.mapShare=function(arg_object){
	if(arg_object.mapValidToProcess){if(!arg_object.mapValidToProcess()){alert("Please, complete all the steps before sharing.");return false;}}
	//if(arg_object.mapchanged){alert("We have noticed that you have made additional changes to your plan. Please complete all the steps before sharing.");return false;}
	arg_object.getFullUrlShorten();
	if(arg_object.urlquery=="" || arg_object.urlquery=="?"){alert("Nothing selected");return;}
	var _popup = $("#share-box");
	_popup.fadeIn(300);
	_popup.find('#title-box-2').click();
	var popMargTop = (_popup.height() + 24) / 2; 
	var popMargLeft = (_popup.width() + 24) / 2; 
	_popup.css({ 
		/*'margin-left' : -popMargLeft*/
	});
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	//var _popup = $("#share-box");
	_popup.find("#share-box-facebook-e").click(function(e) {
		window.open(arg_object.getFacebookUrl(),'sharer','toolbar=0,status=0,width=626,height=436'); return false;
	});
	_popup.find("#share-box-twitter-e").attr("href",arg_object.getTweeterUrl(arg_object));
	_popup.find("#share-box-blogger-e").attr("href",arg_object.getBloggerUrl(arg_object));
	_popup.find("#share-box-2 #sharelink").val(arg_object.getMailUrl(arg_object));
	_popup.find("#share-box-2 #sharelinkgpx").val(arg_object.getGpxUrl(arg_object));
	return true;
}
myezplan.getFacebookUrl=function(arg_object){;return "http://www.facebook.com/sharer.php?u="+encodeURIComponent(arg_object.fullurl)+"&t=Things to do in "+arg_object.cityname+"&id=myezplan";}
myezplan.getTweeterUrl=function(arg_object){
	var titulo= document.getElementById('titulo_aleatorio').value;
	return "http://twitter.com/intent/tweet?via=myezplan1&url="+arg_object.fullurlshorten+"&text="+titulo+" "+arg_object.cityname+"&related=myezplan";}
myezplan.getBloggerUrl=function(arg_object){
var titulo= document.getElementById('titulo_aleatorio').value;	return "http://api.addthis.com/oexchange/0.8/forward/blogger/offer?url="+arg_object.fullurlshorten+"&title="+titulo+" "+arg_object.cityname+"";}
myezplan.getTweeterUrl_m=function(arg_object){
	//alert(mapcity.cityname);
	var titulo= document.getElementById('titulo_aleatorio').value;
	return "http://twitter.com/intent/tweet?via=myezplan1&url="+arg_object.fullurlshorten+"&text="+titulo+" "+mapcity.cityname+"&related=myezplan";}
myezplan.getBloggerUrl_m=function(arg_object){
var titulo= document.getElementById('titulo_aleatorio').value;	return "http://api.addthis.com/oexchange/0.8/forward/blogger/offer?url="+arg_object.fullurlshorten+"&title="+titulo+" "+mapcity.cityname+"";}
myezplan.getMailUrl=function(arg_object){return encodeURIComponent(arg_object.fullurlshorten);}
myezplan.getGpxUrl=function(arg_object){return encodeURIComponent(arg_object.fullurl);}
/* */

/* */
myezplan.pageurl=function(){
	this.searchmethod="form"; //arg_origin = ['form','url']
	this.searchform=null;
	this.urlname="";
	this.urlquery="";
	this.fullurl="";
	this.fullurlshorten="";
	this.cache = {};
	this.cityname="";
}
myezplan.pageurl.prototype.findUrl=function(){myezplan.findUrl(this);};
myezplan.pageurl.prototype.findUrl2=function(){myezplan.findUrl2(this);};
myezplan.pageurl.prototype.findUrlShorten=function(){myezplan.findUrlShorten(this);};
myezplan.pageurl.prototype.findUrlShorten2=function(){myezplan.findUrlShorten2(this);};
myezplan.pageurl.prototype.getUrlQuery=function(){return myezplan.getUrlQuery(this);};
myezplan.pageurl.prototype.getFullUrl=function(){return myezplan.getFullUrl(this);};
myezplan.pageurl.prototype.getFullUrlShorten=function(){return myezplan.getFullUrlShorten(this);};
myezplan.pageurl.prototype.getFullUrlShorten2=function(){return myezplan.getFullUrlShorten2(this);};
myezplan.pageurl.prototype.mapValidToProcess=null;
myezplan.pageurl.prototype.mapSave=function(){return myezplan.mapSave(this);};
myezplan.pageurl.prototype.mapPrint=function(){return myezplan.mapPrint(this);};
myezplan.pageurl.prototype.mapPrint2=function(){return myezplan.mapPrint2(this);};
myezplan.pageurl.prototype.mapShare=function(){return myezplan.mapShare(this);};
myezplan.pageurl.prototype.mapShare2=function(){return myezplan.mapShare2(this);};
myezplan.pageurl.prototype.getFacebookUrl=function(){return myezplan.getFacebookUrl(this);};
myezplan.pageurl.prototype.getTweeterUrl=function(){return myezplan.getTweeterUrl(this);};
myezplan.pageurl.prototype.getBloggerUrl=function(){return myezplan.getBloggerUrl(this);};
myezplan.pageurl.prototype.getTweeterUrl_m=function(){return myezplan.getTweeterUrl_m(this);};
myezplan.pageurl.prototype.getBloggerUrl_m=function(){return myezplan.getBloggerUrl_m(this);};
myezplan.pageurl.prototype.getMailUrl=function(){return myezplan.getMailUrl(this);};
myezplan.pageurl.prototype.getGpxUrl=function(){return myezplan.getGpxUrl(this);};
/* */

/* myezplan.printing */
myezplan.printing=myezplan.printing||{}
myezplan.printing.showPrint=function(arg_showhide,arg_object){
	//$("#"+arg_object+"").toggle(arg_showhide);
	$("#"+arg_object+"").toggle("fast");
}
/* */

/* myezplan.utils */
myezplan.utils=myezplan.utils||{}
myezplan.utils.ajaxError=function(xhr, ajaxOptions, thrownError){alert(thrownError);}
myezplan.showGloboTooltip=function(arg_target,arg_options){
	if($.trim(arg_options.tipimage)==""){return false;}
	//var _this=$(arg_target);
	$("#globo .tipicon").prop("src",$.trim(arg_options.tipicon));
	$("#globo .tipimage").prop("src",$.trim(arg_options.tipimage));
	var largonombre = arg_options.tipname.length;
	if (largonombre > 38){var nombrefull=arg_options.tipname.substr(0,35)+'...'}else{var nombrefull=arg_options.tipname}
	$("#globo .tipname").html($.trim(nombrefull));
	if (arg_options.tipprov == 1){
		$("#globo .tipprov").html('Check out Audio Tours, Pictures, Reviews, Video Clips &amp; <strong class="textredmyezplan2">Hot Deals</strong>');
		}
	else{
		$("#globo .tipprov").html('<strong>Check this deal out !!</strong></br>Great savings are waiting for you');
		}
	$("#globo .tiptype").html($.trim(arg_options.tiptype));
	$(arg_target).mouseout(function(e) {
		$('#globo').hide(0);
	});
	$('#globo').show(0);
}

myezplan.forms=myezplan.forms||{}
myezplan.forms.select={
	addOptionsFromJSON:function(arg_select, arg_json){
		var _data=$.map( arg_json, function( item ) {return {label:item.name,id:item.id}});
		//arg_select.append(new Option(arg_text, arg_value));
		$.each(_data,function(index,value){
			arg_select.append(new Option(value.label, value.id));
			//console.log(index+","+value);
		});
	}
	,addOptionsMapNameId:function(arg_select, arg_map, arg_selectedvalue){
		var self=this;
		$.each(arg_map,function(index,value){
			//arg_select.append(new Option(value.name, value.id));
			arg_select.append(self.createOption(value.id, value.name, ($.trim(arg_selectedvalue)===$.trim(value.id))));
		});
	}
	,addOption:function(arg_select, arg_value, arg_text, arg_selected){
		arg_select.append(this.createOption(arg_value, arg_text, arg_selected));
	}
	,createOption:function(arg_value, arg_text, arg_selected){
		var _option=new Option(arg_text,arg_value);
		if(arg_selected){$(_option).prop("selected",true);}
		return _option;
	}
	,addOptionPlaceHolder:function(arg_select, arg_value, arg_text){
		var _option=new Option(arg_text,arg_value);
		$(_option).data("placeholder",true);
		arg_select.append(_option);
		return _option;
	}
	,removeOptionByValue:function(arg_select, arg_value){
		$(arg_select).find("option[value="+arg_value+"]").remove();
	}
	,removeOptionsByJqueySelector:function(arg_selector){
		$(arg_selector).remove();
	}
	,removeAllOptions:function(arg_select){
		$(arg_select).find("option").remove();
	}
	,selectByValue:function(arg_select, arg_value){
		return $(arg_select).find("option[value="+arg_value+"]").prop("selected",true);
	}
}

/* */
