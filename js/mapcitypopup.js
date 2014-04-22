
$(window).scroll(function() { check_image_load(); });
function check_image_load() {  //alert('lolo');
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
new_country_city= function(){
		var $popup=$('#new_plan');
	$('#new_plan').showLoading("Please Wait,<br/>Loading...<br/>",false);
	var _url = "http://myezplan.com/mobile/appdata/mapcity_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'New_Plan',parametro:'nonew'};
	$('#new_plan').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#new_plan').empty();
		break;
		}
	});
		$('body').append('<div id="mask" class="mask"></div>');
		$('#mask').fadeIn(300);
		$popup.fadeIn(300);
			//window.location = "mapcitypopup.cfm?ctid=5&plid=5";//window.location.reload();
}
function is_in_view(elem) {  
    var docViewTop = $(window).scrollTop();  
    var docViewBottom = docViewTop + $(window).height();  
    var elemTop = $(elem).offset().top;  
    var elemBottom = elemTop + $(elem).height();  
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)); 
}
$(window).load(function(e) {
	mapcitypopup.markers=[];

	mapcitypopup.showCats=function(arg_mapconfig){
		//alert("cats funnc");
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		$.each(arg_mapconfig.markers,function(index,value){
			var _categories=arg_mapconfig.markers[index].mk_category.category;
				if ((parseFloat(_categories[0]))>=0){
					_cat =parseFloat(_categories[0]);
				div_ = 'div_'+_cat;
				//alert(div_);
				document.getElementById(div_).style.display  = 'none';
					}
				if ((parseFloat(_categories[1]))>=0){
					_cat1 =parseFloat(_categories[1]);
				div1_ = 'div_'+_cat1;
				//alert(div1_)
				document.getElementById(div1_).style.display  = 'none';
					}
				if ((parseFloat(_categories[2]))>=0){
				_cat2 =parseFloat(_categories[2]);
				div2_ = 'div_'+_cat2;
				//alert(div2_)
				document.getElementById(div2_).style.display  = 'none';
				}
			});
		}

	mapcitypopup.showSelPlaces=function(arg_mapconfig) {
		//alert('lkolo');
		updateMapCityCookie();
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		mapcitypopup.markers=[];
		$.each(arg_mapconfig.markers,function(index,value){
			var icon_ = arg_mapconfig.markers[index].icon;
			if ((icon_.indexOf('s.png'))>0){
				var _icon_=icon_.replace('s.png','.png');
				arg_mapconfig.markers[index].icon=_icon_;
				}
			arg_mapconfig.markers[index].setVisible(false);
			mapcitypopup.markers.push(arg_mapconfig.markers[index]);
			return true;
		});
		var _divplace=$("#body_col4 #menu_place .table");_divplace.empty();
		var _currentplan="";
		$.each(mapcitypopup.markers,function(index,value){
			var _url = "http://myezplan.com/mobile/appdata/mapcity.cfc";
			var _marker=mapcitypopup.markers[index], _markerhtml="";
			var _markerplanname= 0;
			if(_markerplanname!=_currentplan){
				_divplace.append('<tr><th class="t0" colspan="3">'+_markerplanname+'</th></tr>');
				}
			_divplace.append('<tr><th class="t1"><input type="checkbox" name="place" value="'+_marker.mk_id+'" id="place_'+_marker.mk_id+'" class="check_place"/></th></tr>');										
			//$.each(global_MapCityCookie,function(index,value){alert(value);})
			if($.inArray(_marker.mk_id,global_MapCityCookie)>=0){
				$("#place_"+_marker.mk_id+"").attr("checked",true);
			}
			_currentplan=_markerplanname;
		});
		mapcitypopup.showSelPlaces2();
	}
	var selectAndall2=0;
	mapcitypopup.showSelPlaces2=function(arg_mapconfig) {
		//alert('lolo');
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		mapcitypopup.markers=[];
		restimg_g='0';
		countrestimg_g=0;
		var _places=[];
		var _place=$("input:checkbox[name='place']:checked").each(function(index, element) {_places.push(parseInt($(element).val()));});
		$.each(arg_mapconfig.markers,function(index,value){
			arg_mapconfig.markers[index].setVisible(false);
			var _placesvals=arg_mapconfig.markers[index].mk_id;
			if($.inArray(_placesvals,_places)>=0){
				//alert(index);
				var icon2_ = arg_mapconfig.markers[index].icon;
				var _icon2_=icon2_.replace('.png','s.png');
				arg_mapconfig.markers[index].icon=_icon2_
				arg_mapconfig.markers[index].setVisible(true);
				mapcitypopup.markers.push(arg_mapconfig.markers[index]);
				return true;
			}
		});
		var _divplace=$("#body_col4 #menu_place .table");_divplace.empty();
		var _currentplan="";
		var haypersonalplaces=0;		 
		var coopersonal=$.cookie("EZPERSONAL")
		if(coopersonal && coopersonal!=''){var haypersonalplaces=1;}
		if (mapcitypopup.markers.length==0 && haypersonalplaces==0){
			alert('Please make a selection.');
			$('#button-show').css("background-color", "lightgray");
			mapcitypopup.showPlaces();
			return;
		}else{
		  /*alert("Cambio");*/
		  if (selectAndall2==0){
			 selectAndall2=1;
			 $('#button-show').css("background-color", "#17375E");
			
			  
			 }
			 else {
				 selectAndall2=0;
				 $('#button-show').css("background-color", "lightgray");
			 }
		}
		/*alert(selectAndall);
		alert(selectAndall2);	*/ 	 		
		if (!global_showbutton){global_showbutton = true;}else{global_showbutton = false;mapcitypopup.showPlaces(); return false;}
		$.each(mapcitypopup.markers,function(index,value){
			var _marker=mapcitypopup.markers[index], _markerhtml="";
			var _markerplanname=_marker.mk_category.planname;
			
			var largonombre = _marker.title.length;
			
			
			
										if(_markerplanname!=_currentplan){
				_divplace.append('<tr><th class="t0" colspan="3">'+_markerplanname+'</th></tr>');
				}
										
										
			
			//alert(largonombre);
			if (largonombre > 30){var titulomarkador=_marker.title.substr(0,30)+'...'}else{var titulomarkador=_marker.title}
			_divplace.append('<tr><td class="t4"><input  type="checkbox" name="place" value="'+_marker.mk_id+'" id="place_'+_marker.mk_id+'" class="check_place squaredTwo squaredTwoGrande" /><label for="place_'+_marker.mk_id+'"></label></td><td class="placetooltip"  data-tipid="'+_marker.mk_category.idunico+'" data-tipicon="'+_marker.icon+'"><table onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" class="table"><tr><td class="t2"><img onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" src="'+_marker.icon+'" class="img-checkbox-point cursor"></td><td class="t3"><label onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" class="cursor label_check">'+titulomarkador+'<br><div id="'+_marker.mk_category.idunico+'newtype"></div><td class="table_img"> <div id="'+_marker.mk_category.idunico+'newimg"></div></td></label></td></tr></table></tr>');	
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/mobile/appdata/mapcity_content.cfm",
			async:true, 
			cache:false,
			data: "action=imgytype&pids="+_marker.mk_category.idunico+'&restimg_g='+restimg_g,
			error: function(){
				img='<img src="images/A.png"/>';type_='<h4>Type: Atraction</h4>';
				$('#'+_marker.mk_category.idunico+"newimg").empty();
				$('#'+_marker.mk_category.idunico+"newtype").empty();
				$('#'+_marker.mk_category.idunico+"newimg").append(img);
				$('#'+_marker.mk_category.idunico+"newtype").append(type_);
				},
			success: function(datos){
				var datos_=datos.split(',');
				img='<img data-real-type="image" src="images/A.png" data-real-src="'+datos_[1]+'" />';
				type_='<h4>Type: '+datos_[0]+'</h4>';
				if(datos_[2]!=0){
				restimg_g=restimg_g+','+datos_[2];
				countrestimg_g=countrestimg_g+1;
				//alert(countrestimg_g+' '+restimg_g);
				if(countrestimg_g>19){
					restimg_g='0';
					countrestimg_g=0;
				}
				}
				//alert(img+' '+type_);
				$('#'+_marker.mk_category.idunico+"newimg").empty();
				$('#'+_marker.mk_category.idunico+"newtype").empty();
				$('#'+_marker.mk_category.idunico+"newimg").append(img);
				$('#'+_marker.mk_category.idunico+"newtype").append(type_);
				check_image_load();
			}
		});	
			if($.inArray(_marker.mk_id,global_MapCityCookie)>=0){
				$("#place_"+_marker.mk_id+"").attr("checked",true);
			}
			_currentplan=_markerplanname;
			
		});
		arg_mapconfig.setCenterByBounds();
		//check_image_load();
		var coopersonal=$.cookie("EZPERSONAL")
		if(coopersonal && coopersonal!=''){
			var coper=coopersonal.split('!');
		_divplace.append('<tr><th class="t0" colspan="3">Personal</th></tr>');
				for (co=0;co<coper.length;co++){
					var coper_=coper[co].split('*');
					var titulo=coper_[0];
					var coors=coper_[1];
					//var cityname=document.getElementById('pageheadercityname').
_divplace.append('<tr><td class="t4"></td><td><table class="table"><tr><td class="t2"><img  src="ezmapas/maps_pics/basic/userplace.png"></td><td class="t3"><label class="cursor label_check">'+titulo+'<br><div >Personal</div><td class="table_img"> <div><img src="ezmapas/maps_pics/userplace.png" onclick="sugestplace('+"'"+titulo+"','"+coors+"',"+city_id_var+');"></div></td></label></td></tr></table></tr>');					
				}
		}
	}

	mapcitypopup.showPlaces=function(arg_mapconfig) {
		//alert("places func");
		updateMapCityCookie();
		global_showbutton = false;
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		
		mapcitypopup.markers=[];
		$.each(arg_mapconfig.markers,function(index,value){
			var icon_ = arg_mapconfig.markers[index].icon;
			//alert(icon_);
			if ((icon_.indexOf('s.png'))>0){
				var _icon_=icon_.replace('s.png','.png');
				arg_mapconfig.markers[index].icon=_icon_;
				}
			arg_mapconfig.markers[index].setVisible(false);
			mapcitypopup.markers.push(arg_mapconfig.markers[index]);
			return true;
		});
		var _divplace=$("#body_col4 #menu_place .table");_divplace.empty();
		var _currentplan="";
		$.each(mapcitypopup.markers,function(index,value){
			var _url = "http://myezplan.com/mobile/appdata/mapcity.cfc";
			var _marker=mapcitypopup.markers[index], _markerhtml="";
			var _markerplanname=_marker.mk_category.planname;
			if(_markerplanname!=_currentplan){
				_divplace.append('<tr><th class="t0" colspan="3">'+_markerplanname+'</th></tr>');
				}
			_divplace.append('<tr><th class="t1"><input type="checkbox" name="place" value="'+_marker.mk_id+'" id="place_'+_marker.mk_id+'" class="check_place"/></th></tr>');										
			if($.inArray(_marker.mk_id,global_MapCityCookie)>=0){
				$("#place_"+_marker.mk_id+"").attr("checked",true);
			}
			_currentplan=_markerplanname;
		});
		mapcitypopup.showCats();
		mapcitypopup.showPlaces2();
	}

	mapcitypopup.showPlaces2=function(arg_mapconfig) {
		arg_mapconfig=arg_mapconfig || mapcitypopup.mapconfig;
		mapcitypopup.markers=[];
		restimg_g='0';
		countrestimg_g=0;
		var _plans=[];
		var _plan=$("input:checkbox[name='plan']:checked").each(function(index, element) {_plans.push(parseInt($(element).val()));});
		//alert(_plans);
		var _places=[];
		var _place=$("input:checkbox[name='place']:checked").each(function(index, element) {_places.push(parseInt($(element).val()));});
		//alert(_places);
		var _category=parseInt($("input:radio[name='category']:checked").val());
		$.each(arg_mapconfig.markers,function(index,value){
			
			arg_mapconfig.markers[index].setVisible(false);
			var _placesvals=arg_mapconfig.markers[index].mk_id;
			//alert(_placesvals);
			if($.inArray(_placesvals,_places)>=0){
				var icon2_ = arg_mapconfig.markers[index].icon;
				var _icon2_=icon2_.replace('.png','s.png');
//				alert(_icon2_);
				arg_mapconfig.markers[index].icon=_icon2_
				arg_mapconfig.markers[index].setVisible(true);
//				mapcitypopup.markers.push(arg_mapconfig.markers[index]);
//				return true;
			}
			var _categoryvals=arg_mapconfig.markers[index].mk_category.category;
			var _planval=parseInt(arg_mapconfig.markers[index].mk_category.planid);
			if($.inArray(_planval,_plans)>=0){
				var _cat_=arg_mapconfig.markers[index].mk_category.category;
				if ((parseFloat(_cat_[0]))>=0){
					_cat =parseFloat(_cat_[0]);
				div_ = 'div_'+_cat;
				document.getElementById(div_).style.display  = 'block';
					}
				if ((parseFloat(_cat_[1]))>=0){
					_cat1 =parseFloat(_cat_[1]);
				div1_ = 'div_'+_cat1;
				document.getElementById(div1_).style.display  = 'block';
					}
				if ((parseFloat(_cat_[2]))>=0){
				_cat2 =parseFloat(_cat_[2]);
				div2_ = 'div_'+_cat2;
				document.getElementById(div2_).style.display  = 'block';
				}
				if($.inArray(_category,_categoryvals)>=0){
					arg_mapconfig.markers[index].setVisible(true);
					mapcitypopup.markers.push(arg_mapconfig.markers[index]);
					return true;
				}
			}
		});
		var _divplace=$("#body_col4 #menu_place .table");_divplace.empty();
		var _currentplan="";
		$.each(mapcitypopup.markers,function(index,value){
			var _marker=mapcitypopup.markers[index], _markerhtml="";
			var _markerplanname=_marker.mk_category.planname;
			
			var largonombre = _marker.title.length;
			//alert(largonombre);
			if (largonombre > 38){var titulomarkador=_marker.title.substr(0,35)+'...'}else{var titulomarkador=_marker.title}
			
			if(_markerplanname!=_currentplan){
				_divplace.append('<tr><th class="t0" colspan="3">'+_markerplanname+'</th></tr>');
			}
			_divplace.append('<tr><td class="t4"><input type="checkbox" name="place" value="'+_marker.mk_id+'" id="place_'+_marker.mk_id+'" class="check_place squaredTwo squaredTwoGrande" /><label for="place_'+_marker.mk_id+'"></label></td><td class="placetooltip_old"  data-tipid="'+_marker.mk_category.idunico+'" data-tipicon="'+_marker.icon+'"><div><table onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" class="table show_load"><tr><td class="t2"><img onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" src="'+_marker.icon+'" class="img-checkbox-point cursor"></td><td class="t3"><label onclick="window.top.showinfoplace(\''+_marker.mk_category.idunico+'\',\''+_marker.mk_id+'\', \'mapcitypopup\');" class="cursor label_check">'+titulomarkador+'<br><div id="'+_marker.mk_category.idunico+'newtype" ></div><td class="table_img"> <div id="'+_marker.mk_category.idunico+'newimg"></div></td></tr></table></tr>');
		$.ajax({
			type: "POST",
			url: "http://myezplan.com/mobile/appdata/mapcity_content.cfm",
			async:true, 
			cache:false,
			data: "action=imgytype&pids="+_marker.mk_category.idunico+'&restimg_g='+restimg_g,
			error: function(){
				img='<img src="images/A.png"/>';type_='<h4>Type: Atraction</h4>';
				$('#'+_marker.mk_category.idunico+"newimg").empty();
				$('#'+_marker.mk_category.idunico+"newtype").empty();
				$('#'+_marker.mk_category.idunico+"newimg").append(img);
				$('#'+_marker.mk_category.idunico+"newtype").append(type_);
				},
			success: function(datos){
				var datos_=datos.split(',');
				img='<img data-real-type="image" src="images/A.png" data-real-src="'+datos_[1]+'" />';
				type_='<h4>Type: '+datos_[0]+'</h4>';
				if(datos_[2]!=0){
				restimg_g=restimg_g+','+datos_[2];
				countrestimg_g=countrestimg_g+1;
				//alert(countrestimg_g+' '+restimg_g);
				if(countrestimg_g>19){
					restimg_g='0';
					countrestimg_g=0;
				}
				}
				//alert(img+' '+type_);
				$('#'+_marker.mk_category.idunico+"newimg").empty();
				$('#'+_marker.mk_category.idunico+"newtype").empty();
				$('#'+_marker.mk_category.idunico+"newimg").append(img);
				$('#'+_marker.mk_category.idunico+"newtype").append(type_);
				check_image_load();
			}
		});				 
			if($.inArray(_marker.mk_id,global_MapCityCookie)>=0){
				$("#place_"+_marker.mk_id+"").attr("checked",true);
			}					
			
			_currentplan=_markerplanname;
			
					
		});
//		arg_mapconfig.setCenterByBounds();
		//check_image_load();			
	}

	mapcitypopup.callBackGoogleMapCityPopup=function(arg_mapconfig,status,result){
		updateMapCityCookie();
		mapcitypopup.showPlaces(arg_mapconfig);
	}

});
$(window).load(function(e) {
faqpage='mapcitypopup';
placesadded=[];
placesdeleted=[];
placesadded2=[];
	$(".check_plan").change(function(e) {
		//alert('gatitos');
		mapcitypopup.showCats();
		mapcitypopup.showPlaces();
	});
	$(".check_category").change(function(e) {
		//alert("categs working");
		mapcitypopup.showPlaces();
	});
	
	
	$('.button-show').on('click', function(e){
		mapcitypopup.showSelPlaces();
		});
	$(document).on("change",".check_place",function(e) {
		var _checkmix = $(this);
		if(!_checkmix){
			e.stopPropagation();e.preventDefault();
			return;
		}
//alert('checkplace');
		if(_checkmix.is(":checked")){//alert('checked');alert(_checkmix.val());
//			addToMapCityPopup_ajax(_checkmix.val(),"mapcitypopup",function(arg_pid,arg_result){
//alert(arg_result.status);
//				if(arg_result.status==="ERROR"){
//					_checkmix.prop("checked",false);
//					//alert(arg_result.message);
//				}else{
					//if(arg_result.origin!="mapcitypopup"){alert('Error: '+arg_result.message);}
					var loads = $.cookie("EZMAPCITYPLACES");
					if(!loads || loads==''){loads='';}
					var div = '';
					if(loads!=''){var div=','}
					var loads=loads+div+_checkmix.val();
					$.cookie("EZMAPCITYPLACES",loads);
					updateMapCityCookie();
					placesadded.push(_checkmix.val());
					var newdeleted='';
						for(y=0;y<=(placesdeleted.length-1);y++){
						if(placesdeleted[y]!=_checkmix.val()){
						var div=',';
						if(newdeleted==''){var div='';}
						var newdeleted=newdeleted+div+placesdeleted[y];
						}
						}
					placesdeleted=newdeleted.split(',');
					//alert('del '+newdeleted+' add'+placesadded.join(','));
//				}
//			});
		}else{//alert('nochecked');
//			deleteFromMapCityPopup_ajax(_checkmix.val(),"mapcitypopup",function(arg_pid,arg_result){
////			deleteFromMapCityPopup(_checkmix.val(),"mapcitypopup",function(arg_pid,arg_result){
					var loads = $.cookie("EZMAPCITYPLACES");
					//if(loads==null){loads='';}
					var loads_= loads.split(',')
					var newcookie=''
					for(x=0;x<=(loads_.length-1);x++){
					if(loads_[x]!=_checkmix.val()){
					var div = ',';
					if(newcookie==''){var div=''}
					newcookie=newcookie+div+loads_[x];
					}
					}
					$.cookie("EZMAPCITYPLACES",newcookie);
					placesdeleted.push(_checkmix.val());
					var newdeleted='';
						for(y=0;y<=(placesadded.length-1);y++){
						if(placesadded[y]!=_checkmix.val()){
						var div=',';
						if(newdeleted==''){var div='';}
						var newdeleted=newdeleted+div+placesadded[y];
						}
						}
					placesadded=newdeleted.split(',');				
					//alert('added '+newdeleted+' del'+placesdeleted.join(','));
				updateMapCityCookie();
//			});
		}
	});
	return false;
});

showGloboTooltip2=function(arg_target,arg_options){
	if($.trim(arg_options.tipimage)==""){return false;}
	$("#globo2 .tipicon").prop("src",$.trim(arg_options.tipicon));
	$("#globo2 .tipimage").prop("src",$.trim(arg_options.tipimage));
	var largonombre = arg_options.tipname.length;
	if (largonombre > 38){var nombrefull=arg_options.tipname.substr(0,35)+'...'}else{var nombrefull=arg_options.tipname}
	$("#globo2 .tipname").html($.trim(nombrefull));
	if (arg_options.tipprov == 1){
		$("#globo2 .tipprov").html('Check out Audio Tours, Pictures, Reviews, Video Clips &amp; <strong class="textredmyezplan2">Hot Deals</strong>');
		}
	else{
		$("#globo2 .tipprov").html('<strong>Check this deal out !!</strong></br>Great savings are waiting for you');
		}
	$("#globo2 .tiptype").html($.trim(arg_options.tiptype));
	$('#globo2').show(0);
	$(arg_target).mouseleave(function(e) {
		$('#globo2').hide(0);
	});

}
