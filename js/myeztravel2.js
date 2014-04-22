myeztravel.AudioTour=function(arg_url){
showinfoplace_source = 'planbox';
	var popup = $("#Myeztravel_PlanBox");
	$(popup).fadeOut(0);
	var _popup = $("#roadmapplace-boxmedia3");
	_popup.fadeIn(300);
	_popup.find("#box-body").html('<iframe id="iframe_audiobox" width="560" height="315" frameborder="0" allowfullscreen></iframe>');
$('#iframe_audiobox').showLoading("Please Wait,<br/>Searching For<br/>Audio Tour...",false);
$('#iframe_audiobox').attr("src",arg_url);
//$('#maskload').fadeOut(300);
	return false;
}
updateplanview=function(ciudad,dia){
var ids=document.getElementById(ciudad+'ids_'+dia).value;
getatrac(ciudad,dia,ids,0);
}
auto_order_up=function(){
var ids_old = document.getElementById("ids_s").value;
var sp_old= document.getElementById('SP_s').value;
var ep_old= document.getElementById('EP_s').value;
var ruta_old=document.getElementById('ruta_s').value;
var ids_new =document.getElementById("ids_old").value;
var sp_new=document.getElementById("sp_old").value;
var ep_new= document.getElementById("ep_old").value;
var ruta_new=document.getElementById("ruta_old").value;
undorder_=true;
undorder_ids=ids_old;
undorder_sp=sp_old;
undorder_ep=ep_old;
undorder_r=ruta_old;
document.getElementById("ids_s").value=ids_new;
document.getElementById('SP_s').value=sp_new;
document.getElementById('EP_s').value=ep_new;
document.getElementById('ruta_s').value=ruta_new;
				showsel=false;
				Showsel(0,0);
}
auto_order_u=function(id,cont){
var ids_new=document.getElementById('ids_old').value;
var ruta_new=document.getElementById('ruta_old').value;
var ids_old = document.getElementById("place_ids_"+id).value;
var ruta_new=document.getElementById('ruta'+id).value;
undoorder=true;
undoorder1=id;
undoorder2=ids_old;
undoorder3=ruta_old;
document.getElementById("place_ids_"+id).value=ids_new;
document.getElementById('ruta'+id).value=ruta_new;
show_chageplace_selectionsid=0;
route_chageplace_selections_out(id,cont);
}
auto_order_p=function(){
undorder_=true;
undoredo='undo'
var ids = document.getElementById("ids_s").value;
var sp= document.getElementById('SP_s').value;
var ep= document.getElementById('EP_s').value;
var ruta=document.getElementById('ruta_s').value;
undorder_ids=ids;
undorder_sp=sp;
undorder_ep=ep;
undorder_r=ruta;
//alert(ids);
var ids_ = ids.split(',')
var count=0;
for(x=0;x<=(ids_.length-1);x++){
if(ids_[x]=='0000' || ids_[x]=='0001'){var count=count+1;}
}
if(count==0){
var ids_new=ids;
		$.ajax({
			type: "GET",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: "action=orderbylat&pids="+ids_new+"&cuantos=0",
			error:(function(){alert('Myeztravel coul not order the route please try again');return false;}),
			success: function(datos){
				var ids_new = datos;
				ids_new_=ids_new.split(',');
				sp=ids_new_[0];
				ep=ids_new_[ids_new_.length-1];
//				alert(ids_new);
				document.getElementById("ids_s").value=ids_new;
				document.getElementById('SP_s').value=sp;
				document.getElementById('EP_s').value=ep;
				document.getElementById('ruta_s').value=0;
directionsDisplay.setMap(null);
				showsel=false;
				Showsel(0,0);
//				show_chageplace_selectionsid=0;
//				route_chageplace_selections_out(id,cont);
			}
		});	
	}
if(count==1){
var ids_new='';
for(x=0;x<=(ids_.length-1);x++){
if (ids_new==''){var div=''}else{var div=','}
if(ids_[x]!='0000' && ids_[x]!='0001'){var ids_new=ids_new+div+ids_[x];}
}
		$.ajax({
			type: "GET",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: "action=orderbylat&pids="+ids_new+"&cuantos=3"+"&htlat="+htllat+"&htlng="+htllng,
			error:(function(){alert('Myeztravel coul not order the route please try again');return false;}),
			success: function(datos){
				var ids_new = '0001,'+datos;
				ids_new_=ids_new.split(',');
				ep=ids_new_[ids_new_.length-1];
				//alert(ids_new);
				document.getElementById("ids_s").value=ids_new;
				document.getElementById('SP_s').value='0001';
				document.getElementById('EP_s').value=ep;
				document.getElementById('ruta_s').value=0;
directionsDisplay.setMap(null);
				showsel=false;
				Showsel(0,0);
//				show_chageplace_selectionsid=0;
//				route_chageplace_selections_out(id,cont);
			}
		});	
		}
if(count==2){
var ids_new='';
for(x=0;x<=(ids_.length-1);x++){
if (ids_new==''){var div=''}else{var div=','}
if(ids_[x]!='0000' && ids_[x]!='0001'){var ids_new=ids_new+div+ids_[x];}
}
var ids_new='0000,'+ids_new+',0001'
//alert(ids_new);
document.getElementById("ids_s").value=ids_new;
document.getElementById('SP_s').value='0001';
document.getElementById('EP_s').value='0000';
document.getElementById('ruta_s').value=0;
directionsDisplay.setMap(null);
				showsel=false;
				Showsel(0,0);
	}
}
auto_order=function(id,cont){
undoorder=true;
undoredo='undo';
undoorder1=id;
var ids = document.getElementById("place_ids_"+id).value;
undoorder2=ids;
undoorder3=document.getElementById('ruta'+id).value;
var ids_ = ids.split(',')
var count=0;
for(x=0;x<=(ids_.length-1);x++){
if(ids_[x]== id || ids_[x]=='0000' || ids_[x]=='0001'){var count=count+1;}
}
//alert(ids+' '+count+' '+cont);
if(count==0){
var ids_new=ids;
		$.ajax({
			type: "GET",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: "action=orderbylat&pids="+ids_new+"&cuantos=0",
			error:(function(){alert('Myeztravel coul not order the route please try again');return false;}),
			success: function(datos){
				var ids_new = datos;
				//alert(ids_new);
				document.getElementById("place_ids_"+id).value=ids_new;
				document.getElementById('ruta'+id).value=0;
				show_chageplace_selectionsid=0;
				route_chageplace_selections_out(id,cont);
			}
		});
	}
if(count==1){
var ids_new='';
for(x=0;x<=(ids_.length-1);x++){
if (ids_new==''){var div=''}else{var div=','}
if(ids_[x]!= id && ids_[x]!='0000' && ids_[x]!='0001'){var ids_new=ids_new+div+ids_[x];}
}	
		$.ajax({
			type: "GET",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: "action=orderbylat&pids="+ids_new+"&cuantos=1"+"&idpl="+id,
			error:(function(){alert('Myeztravel coul not order the route please try again');return false;}),
			success: function(datos){
				var ids_new = id+','+datos;
				alert(ids_new);
//				document.getElementById("place_ids_"+id).value=ids_new;
//				document.getElementById('ruta'+id).value=0;
//				show_chageplace_selectionsid=0;
//				route_chageplace_selections_out(id,cont);
			}
		});
	}
if(count==2){
var ids_new='';
for(x=0;x<=(ids_.length-1);x++){
if (ids_new==''){var div=''}else{var div=','}
if(ids_[x]!= id && ids_[x]!='0000' && ids_[x]!='0001'){var ids_new=ids_new+div+ids_[x];}
}	
var ids_new = id+','+ids_new+','+id;
//alert(ids_new);
document.getElementById("place_ids_"+id).value=ids_new;
document.getElementById('ruta'+id).value=0;
show_chageplace_selectionsid=0;
route_chageplace_selections_out(id,cont);
	}
}
myeztravel.savesubplanruta2=function(city,dia,subplace,placeid){
var ids = document.getElementById("new_order").value;
var ruta=document.getElementById('new_ruta').value;
var nombre=city+'ids_'+dia+'_'+placeid+'_'+subplace;
var nombre3 = 'div_'+city+'_atrac_sel';
	if(ids != ''){
	$('#'+nombre3+' input[name="'+nombre+'"]').val(ids);
	$('#'+nombre3+' input[name="'+nombre+'_R"]').val(ruta);
	}else{
	$('#'+nombre3+' input[name="'+nombre+'"]').remove();
	$('#'+nombre3+' input[name="'+nombre+'_R"]').remove();}
updateplanview(city,dia);
$('#Myeztravel_PlanBox').fadeOut(300);
$('#Myeztravel_PlanBox2').empty();
$('#mask').fadeOut(300);
$('#mask').remove();
if(vienedeplan){vienedeplan=false;myeztravel.viewatrplan(vienedeplan_C,vienedeplan_D);}
}
myeztravel.savesubplanruta_2=function(puntosids,id,ciudad,dia){
var puntos_=puntosids.split('!');
var idp='';
for(p=0;p<=(puntos_.length-1);p++){
	//alert(puntos_[p]);
	var nombre=ciudad+'ids_'+dia+'_'+id+'_'+puntos_[p];
	var ids_ = document.getElementById('place_ids_'+puntos_[p]).value;
	var ruta=document.getElementById('ruta'+puntos_[p]).value;
	var nombre3 = 'div_'+ciudad+'_atrac_sel';
    var existe =$('#'+nombre3+' input[name="'+nombre+'"]').val() || 0;
//	alert(existe);
//	alert(ruta);
	if(existe ==0){
	if(ids_ != ''){
	if(idp==''){coma='';}else{coma='!';}
	var idp=idp+coma+puntos_[p];
	var nombre_r='<input type="hidden" name="'+nombre+'_R" id='+nombre+'_R" value="'+ruta+'">';
	var nombre2='<input type="hidden" name="'+nombre+'" id='+nombre+'" value="'+ids_+'">';
	var nombre3 = 'div_'+ciudad+'_atrac_sel';
	$('#'+nombre3).append(nombre2);$('#'+nombre3).append(nombre_r);}
	}else{
	if(ids_ != ''){
	if(idp==''){coma='';}else{coma='!';}
	var idp=idp+coma+puntos_[p];
	$('#'+nombre3+' input[name="'+nombre+'"]').val(ids_);
	$('#'+nombre3+' input[name="'+nombre+'_R"]').val(ruta);
	}else{
	$('#'+nombre3+' input[name="'+nombre+'"]').remove();
	$('#'+nombre3+' input[name="'+nombre+'_R"]').remove();}
	}
}
//alert(idp);
$('#routes_box').fadeOut(300);
if(idp!=''){myeztravel.viewatrsubplan(ciudad,dia,id,idp);}
else{$('#mask').fadeOut(300);$('#mask').remove();
if(vienedeplan){vienedeplan=false;myeztravel.viewatrplan(vienedeplan_C,vienedeplan_D);};
}
updateplanview(ciudad,dia);
}
myeztravel.savesubplanruta=function(puntosids,id,ciudad,dia){
var puntos_=puntosids.split('!');
var idp='';
for(p=0;p<=(puntos_.length-1);p++){
	//alert(puntos_[p]);
	var nombre=ciudad+'ids_'+dia+'_'+id+'_'+puntos_[p];
	var ids_ = document.getElementById('place_ids_'+puntos_[p]).value;
	var ruta=document.getElementById('ruta'+puntos_[p]).value;
	var nombre3 = 'div_'+ciudad+'_atrac_sel';
    var existe =$('#'+nombre3+' input[name="'+nombre+'"]').val() || 0;
//	alert(existe);
//	alert(ruta);
	if(existe ==0){
	if(ids_ != ''){
	if(idp==''){coma='';}else{coma=',';}
	var idp=idp+coma+puntos_[p];
	var nombre_r='<input type="hidden" name="'+nombre+'_R" id='+nombre+'_R" value="'+ruta+'">';
	var nombre2='<input type="hidden" name="'+nombre+'" id='+nombre+'" value="'+ids_+'">';
	var nombre3 = 'div_'+ciudad+'_atrac_sel';
	$('#'+nombre3).append(nombre2);$('#'+nombre3).append(nombre_r);}
	}else{
	if(ids_ != ''){
	if(idp==''){coma='';}else{coma=',';}
	var idp=idp+coma+puntos_[p];
	$('#'+nombre3+' input[name="'+nombre+'"]').val(ids_);
	$('#'+nombre3+' input[name="'+nombre+'_R"]').val(ruta);
	}else{
	$('#'+nombre3+' input[name="'+nombre+'"]').remove();
	$('#'+nombre3+' input[name="'+nombre+'_R"]').remove();}
	}
}
updateplanview(ciudad,dia);
$('#routes_box').fadeOut(300);
$('#mask').fadeOut(300);$('#mask').remove();
myeztravel.viewatrplan(ciudad,dia);
//if(idp!=''){myeztravel.viewatrsubplan(ciudad,dia,id,idp);}
//else{$('#mask').fadeOut(300);$('#mask').remove();}
}
route_chageplace_selections=function(id,count){
if(show_chageplace_selectionsid != id){
show_chageplace_selections=false;
}
if(!show_chageplace_selections){
var _place=$("input:checkbox[name='Places']").each(function(index, element) {
var  temp=parseInt($(element).val());
document.getElementById('div_selec_'+temp).innerHTML='<a id="area_'+temp+'" href="javascript:;" onclick="route_chageplace_selections_out('+temp+','+count+');" class="button-round-2 button-round-lgray3"><span style="font-size:12px;"  onmouseover="Show'+temp+'();" onmouseout="Hide'+temp+'();">Picks</span></a>';
});
show_chageplace_selections=true;
show_chageplace_selectionsid = id;
var coord=document.getElementById('place_coord_'+id).value;
var nombre=document.getElementById('place_name_'+id).value;
var ids=document.getElementById('place_ids_'+id).value;
var ruta =document.getElementById('ruta'+id).value;
if(ids==''){
	alert('You havent selected any place for this plan');
	//directionsDisplay.setMap(null);
	show_chageplace_selections=false;
	show_chageplace_selectionsid = 0;
	route_chageplace(0,0);
	return false;
	}
document.getElementById('div_selec_'+id).innerHTML='<a id="area_'+id+'" href="javascript:;" onclick="route_chageplace_selections_out('+id+','+count+');" class="button-round-2 button-round-blue3"><span style="font-size:12px;"  onmouseover="Show'+id+'();" onmouseout="Hide'+id+'();">Hide</span></a>';
$('#route_plan').showLoading("Please Wait,<br/>Searching For<br/>Plan Route...",false);
	//directionsDisplay.setMap(null);
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Get_atractions_Routes_place_selections',id:id,coord:coord,nombre:nombre,ids:ids,ico:count,ruta:ruta};
	$('#route_plan').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#route_plan').empty();
		break;
		}
	});
}
else{
	document.getElementById('div_selec_'+id).innerHTML='<a id="area_'+id+'" href="javascript:;" onclick="route_chageplace_selections_out('+id+','+count+');" class="button-round-2 button-round-lgray3"><span style="font-size:12px;"  onmouseover="Show'+id+'();" onmouseout="Hide'+id+'();">Picks</span></a>';
	show_chageplace_selections=false;
	show_chageplace_selectionsid = 0;
	route_chageplace(0,0);
	}
}
function route_chageplace(num,si){
show_chageplace_selections=false;
	count=0;
	var _place=$("input:checkbox[name='Places']").each(function(index, element) {
	var este = parseInt($(element).val());
	//alert(count);
	count = count+1;
document.getElementById('div_selec_'+este).innerHTML='<a id="area_'+este+'" href="javascript:;" onclick="route_chageplace_selections_out('+este+','+count+');" class="button-round-2 button-round-lgray3"><span style="font-size:12px;"  onmouseover="Show'+este+'();" onmouseout="Hide'+este+'();">Picks</span></a>';	
	});
$('#route_plan').showLoading("Please Wait,<br/>Searching Atractions<br/>For You...",false);
	if(si==1){
	var nombre = 'che'+num;
	var che=document.getElementById(nombre).checked;
	if(che){document.getElementById(nombre).checked=false;}
	else{document.getElementById(nombre).checked=true;}
	}
	var _places=[];
	var _place=$("input:checkbox[name='Places']:checked").each(function(index, element) {
	_places.push(parseInt($(element).val()));
	});
	if(_places.length == 0){
//		document.getElementById('che'+num).checked=true;
//		_places.push(parseInt(num));
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Get_atractions_Routes_place_empty',id:num};
	$('#route_plan').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#route_plan').empty();
		break;
		}
	});
		}
else{
var id='';var coord='';var nombre='';var ids='';var nums='';
for(p=0;p<=(_places.length-1);p++){
if(p==0){var divi='';}else{var divi='/';}
var id=id+divi+_places[p];
var coord=coord+divi+document.getElementById('place_coord_'+_places[p]).value;
var nombre=nombre+divi+document.getElementById('place_name_'+_places[p]).value;
var ids=ids+divi+document.getElementById('place_ids_'+_places[p]).value;
var nums=nums+divi+document.getElementById('place_num_'+_places[p]).value;
	}
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Get_atractions_Routes_place',id:id,coord:coord,nombre:nombre,ids:ids,nums:nums,count:count};
	$('#route_plan').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#route_plan').empty();
		break;
		}
	});
}
}
closeplaceroute=function(){
$('#routes_box').fadeOut(300);
$('#Myeztravel_PlanBox').fadeIn(300);
}
showplaceroute2=function(id,ciudad,dia,subplace){
var ids=document.getElementById("new_order").value;
$('#Myeztravel_PlanBox').fadeOut(300);
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Get_atractions_Routes',id:id,ciudad:ciudad,dia:dia,subplace:subplace,ids_sub:ids,ruta_sub:1};
	$('#routes_box').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#routes_box').empty();closeplaceroute();
		break;
		}
	});
$('#routes_box').fadeIn(300);
}     
showplaceroute=function(id,ciudad,dia,stops){
var places='';
var stops_=stops.split('!');
for(x=0;x<=(stops_.length-1);x++){
var nombre3 = 'div_'+ciudad+'_atrac_sel';
var nombre=ciudad+'ids_'+dia+'_'+id+'_'+stops_[x];
var existe =$('#'+nombre3+' input[name="'+nombre+'"]').val() || 0;
if(existe!=0){if(places!=''){var masuno='!';}else{var masuno='';};var places=places+masuno+stops_[x]}
}
if(places !=''){
vienedeplan=true;
//alert(places);
myeztravel.viewatrsubplan(ciudad,dia,id,places);
return false;
}
$('#Myeztravel_PlanBox').fadeOut(300);
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Get_atractions_Routes',id:id,ciudad:ciudad,dia:dia,subplace:'',ids_sub:'',ruta_sub:0};
	$('#routes_box').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#routes_box').empty();closeplaceroute();
		break;
		}
	});
$('#routes_box').fadeIn(300);
}
myeztravel_print_itinerary2=function(itid){
var hotel_= document.getElementById("hotel").value;
var hotel=hotel_.split(',');
var hotels='';
//alert(hotel.length);
for(c=0;c<=(hotel.length-1);c++){
	//alert(c);
	if(c==0){var divisor=''}else{var divisor='!'}
	if(hotel[c]==1){
		var id_selected= document.getElementById(c+'id_selected').value;
		var counter=document.getElementById(c+'counter_selected').value;
		var htl_name= document.getElementById(c+'hotl_n'+counter).value;
		var htl_rat= document.getElementById(c+'hotl_r'+counter).value;
		var htl_img= document.getElementById(c+'hotl_i'+counter).value;
		var htlfull=htl_name+'()'+htl_rat+'()'+htl_img;
		var htlfull=htlfull.replace(/ /g,"%20");
		var hotels=hotels+divisor+htlfull;
		}
	else{
	var hotels=hotels+divisor;
		}
	}
//alert(hotels);	
var url='https://www.myezplan.com/myitineraryprint_met.cfm?itid='+itid+'&htldata='+hotels
window.open(url,'_blank');
}
myeztravel_share_itinerary2=function(itid){
var ciudad2=document.getElementById("Ciudad2").value;
var ciudad=ciudad2.split(',');
var city_n = ciudad[0];
			$.ajax({
			type: "POST",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: 'action=get_share_links_i&itid='+itid+'&cityName='+city_n,
			success: function(datos){
				var links=datos.split('!');
				var _str_mail_s=links[0];
				var _str_facebook_s = links[1];
				var _str_twitter_s = links[3];
				var _str_blogger_s = links[4];
				var _share_gpx_s = links[2];
	var _popup = $("#share-box");
	_popup.find("#share_submit_1").attr("data-url",_str_mail_s);
	_popup.find("#share-box-mail-e").attr("href",_str_mail_s);
	_popup.find("#share-box-2 #sharelink").val(_str_mail_s);
	_popup.find("#share-box-2 #sharelinkgpx").val(_share_gpx_s);
	_popup.find("#share_option").val('itinerary');
	//console.log(_str_facebook_s);
	_popup.find("#share-box-facebook-e").click(function(e) {
		//_str_facebook_s
		window.open(_str_facebook_s,'sharer','toolbar=0,status=0,width=626,height=436'); return false;
	});
	//_popup.find("#share-box-facebook-e").attr("href",_str_facebook_s);
	//console.log(_popup.find("#share-box-facebook-e").html());
	_popup.find("#share-box-twitter-e").attr("href",_str_twitter_s);
	_popup.find("#share-box-blogger-e").attr("href",_str_blogger_s);
	//console.log(_str_mail_s);
	//console.log(_popup.find("#share-box-mail-e").attr("href"));

	_popup.fadeIn(300);
	_popup.find('#title-box-2').click();

	var popMargTop = (_popup.height() + 24) / 2; 
	var popMargLeft = (_popup.width() + 24) / 2; 

	_popup.css({ 
		//'margin-top' : -popMargTop,
	/*	'margin-left' : -popMargLeft*/
	});
	var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
			/*var	L = $(window).width() / 2 - popup.width() / 2;*/
			_popup.css({
				top: T,
				
			})
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);

				}
			})
//alert(city+' '+dia+' '+itid+' '+city_n);
}
myeztravel_share_plan2=function(city,dia,itid){
var ciudad2=document.getElementById("Ciudad2").value;
var ciudad=ciudad2.split(',');
var city_n = ciudad[city];
			$.ajax({
			type: "POST",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: 'action=get_share_links&itid='+itid+'&cityName='+city_n+'&type=A'+'&city='+city+'&dia='+dia,
			success: function(datos){
				var links=datos.split('!');
				var _str_mail_s=links[0];
				var _str_facebook_s = links[1];
				var _str_twitter_s = links[3];
				var _str_blogger_s = links[4];
				var _share_gpx_s = links[2];
	var _popup = $("#share-box");
	_popup.find("#share_submit_1").attr("data-url",_str_mail_s);
	_popup.find("#share-box-mail-e").attr("href",_str_mail_s);
	_popup.find("#share-box-2 #sharelink").val(_str_mail_s);
	_popup.find("#share-box-2 #sharelinkgpx").val(_share_gpx_s);
	_popup.find("#share_option").val('place');
	//console.log(_str_facebook_s);
	_popup.find("#share-box-facebook-e").click(function(e) {
		//_str_facebook_s
		window.open(_str_facebook_s,'sharer','toolbar=0,status=0,width=626,height=436'); return false;
	});
	//_popup.find("#share-box-facebook-e").attr("href",_str_facebook_s);
	//console.log(_popup.find("#share-box-facebook-e").html());
	_popup.find("#share-box-twitter-e").attr("href",_str_twitter_s);
	_popup.find("#share-box-blogger-e").attr("href",_str_blogger_s);
	//console.log(_str_mail_s);
	//console.log(_popup.find("#share-box-mail-e").attr("href"));

	_popup.fadeIn(300);
	_popup.find('#title-box-2').click();

	var popMargTop = (_popup.height() + 24) / 2; 
	var popMargLeft = (_popup.width() + 24) / 2; 

	_popup.css({ 
		//'margin-top' : -popMargTop,
		/*'margin-left' : -popMargLeft*/
	});
	var T = $(window).height() / 5 - 100 / 1 + $(window).scrollTop();
			_popup.css({
				top: T,
			})
	
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);

				}
			})
//alert(city+' '+dia+' '+itid+' '+city_n);
}
myeztravel.LoadAtracSaved=function(dt1_,dt2_,itid,num){
	//alert(num+' '+itid);
	var nombre ='<div id="div_'+num+'_atrac_sel" style="display:none;"></div>';
	$('#div_results').append(nombre);
	var fechap1 = new fecha(dt1_)     
	var fechap2 = new fecha(dt2_) 
	var miFechap1 = new Date( fechap1.anio, fechap1.mes, fechap1.dia )  
	var miFechap2 = new Date( fechap2.anio, fechap2.mes, fechap2.dia )
	var diferencia =  miFechap2.getTime()- miFechap1.getTime();
	var dias_d = Math.floor(diferencia / (1000 * 60 * 60 * 24)); 
	var dias_d=dias_d+1;
	for(d=1;d<=dias_d;d++){
	if(d==1){visible='style="display:block; padding-top:5px;"'}else{visible='style="display:block; padding-top:5px;"'}
	var nombre ='<div id="div_'+num+'_atrac_sel_day_'+d+'"'+visible+'></div>';
	$('#div_'+num+'Day'+d+'results').append(nombre);
	$('#div_'+num+'_atrac_sel_day_'+d).showLoading("Please Wait, Searching for atraccions...",false);
	}
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Get_atractions_Saved',id:itid,ciudad:num};
	$('#div_'+num+'_atrac_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+num+'_atrac_sel').empty();
		break;
		}
	});
}
myeztravel.LoadHotelsSaved=function(I_id,num,_ciudad){
							$.ajax({
							type: "POST",
							url: "data_ajax/myeztravel_content3.cfm",
							async:true, 
							cache:false,
							data: 'action=openitineraryatrsave_h&id='+I_id+'&ciudad='+num,
							success: function(datos){
								//alert(datos);
								var htl=datos.split('!');
								var htl_id = htl[0];
								var htl_room=htl[1];
								if(htl_room!=''){roomsarray.push(htl_room);}
								var htl_date1=htl[2];
								var htl_date2=htl[3];
								var htl_xmlrooms=htl[4];
								var added_id=''
								//alert(num);
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'updatehotelsettings',id_:htl_id,datef: htl_date1,datet:htl_date2,cityid:_ciudad,xmlrooms:htl_xmlrooms,rooms_:1,added_id:added_id,ciudad:num};
	var nombre ='<div id="div_'+num+'_hotels_sel"></div>';
	//alert(nombre);
	//document.getElementById('div_'+num+'Day1results').appendChild(nombre)
	$('#div_'+num+'Day1results').append(nombre);
	$('#div_'+num+'_hotels_sel').showLoading("Please Wait, Searching for Hotels...",false);
	$('#div_'+num+'_hotels_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+num+'_hotels_sel').empty();
		break;
		}
	});
							}
							});
}
myeztravel.opendata2=function(I_id){
//alert('itinerary '+url);
			$.ajax({
			type: "POST",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: 'action=openitineraryatrsave&id='+I_id,
			success: function(datos){
				//alert(datos);
				var itinerary=datos.split('!');
				var air_ = itinerary[0];
				var air=air_.split(',');
				var hotel_ = itinerary[1];
				var hotel=hotel_.split(',');
				var atrac_ = itinerary[2];
				var atrac=atrac_.split(',');
				var ciudad1_ = itinerary[3];
				var ciudad1=ciudad1_.split(',');
				var ciudad2_ = itinerary[4];
				var ciudad2=ciudad2_.split(',');
				var date1_ = itinerary[5];
				var date1=date1_.split(',');
				var date2_ = itinerary[6];
				var date2=date2_.split(',');
				for (xy=0;xy<=(air.length-1);xy++){
				var _air=air[xy];
				var _hotel=hotel[xy];
				var _atrac=atrac[xy];
				var _ciudad1=ciudad1[xy];
				var _ciudad2=ciudad2[xy];
				var _date1=date1[xy];
				var _date2=date2[xy];				
				//alert(_ciudad1+' '+_date1);
				var ciudad2_t=_ciudad2.replace(/%20/g," ");
				//alert('afuera '+xy);
				if(xy!=0){
					//alert('adentro '+xy);
					myeztravel.Addcity(_air,_hotel,_atrac,_date1,_date2,_ciudad1,_ciudad2);
					myeztravel.Createcity(xy,ciudad2_t,_date1);
					if(_hotel ==1){
					//alert('hotel '+xy);
					myeztravel.LoadHotelsSaved(I_id,xy,_ciudad2);}
					//myeztravel.LoadHotels('',Date_1,Date_2,Ciudad_2,'','000000',ciudad);
					if(_atrac==1){
					//alert('atrac '+xy);
					myeztravel.LoadAtracSaved(_date1,_date2,I_id,xy);}
//					myeztravel.LoadAtrac(Date_1,Date_2,Ciudad_2,ciudad);}				
					}
				}
			}
			});
}
myeztravel.opendata=function(I_id){
//alert('itinerary '+url);
			$.ajax({
			type: "POST",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: 'action=openitineraryatrsave&id='+I_id,
			success: function(datos){
				//alert(datos);
				var itinerary=datos.split('!');
				var air_ = itinerary[0];
				var air=air_.split(',');
				var hotel_ = itinerary[1];
				var hotel=hotel_.split(',');
				var atrac_ = itinerary[2];
				var atrac=atrac_.split(',');
				var ciudad1_ = itinerary[3];
				var ciudad1=ciudad1_.split(',');
				var ciudad2_ = itinerary[4];
				var ciudad2=ciudad2_.split(',');
				var date1_ = itinerary[5];
				var date1=date1_.split(',');
				var date2_ = itinerary[6];
				var date2=date2_.split(',');
				for (x=0;x<=(air.length-1);x++){
				var _air=air[x];
				var _hotel=hotel[x];
				var _atrac=atrac[x];
				var _ciudad1=ciudad1[x];
				var _ciudad2=ciudad2[x];
				var _date1=date1[x];
				var _date2=date2[x];				
				if(x==0){myeztravel.Loadresults(_air,_hotel,_atrac,_ciudad1,_ciudad2,_date1,_date2,I_id);}
				}
				itiname=itinerary[7];
				itiid=I_id;
				setTimeout("changename(itiname,itiid)",4000);
			}
			});
}
changename=function(itiname,itiid){
document.getElementById('ItineraryName').value=itiname;
document.getElementById('ItineraryId').value=itiid;
}
myeztravel.checksaved_A=function(){
var itineraryId=document.getElementById('ItineraryId').value;
			$.ajax({
			type: "POST",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: 'action=delitineraryatrsave&id='+itineraryId,
			success: function(datos){
				//$('#ItineraryId').val(datos);
				//myeztravel.checksaved_H();
			}
			});
	var atrac_= document.getElementById("atrac").value;
	var date1_=document.getElementById("Date1").value;
	var date2_=document.getElementById("Date2").value;
	var date1=date1_.split(',');
	var date2=date2_.split(',');
	var atrac=atrac_.split(',');	
	for(x=0;x<=(atrac.length-1);x++){
		if(atrac[x]==1){
			var fechap1 = new fecha(date1[x]) ;    
			var fechap2 = new fecha(date2[x]); 
			var miFechap1 = new Date( fechap1.anio, fechap1.mes, fechap1.dia )  
			var miFechap2 = new Date( fechap2.anio, fechap2.mes, fechap2.dia )
			var diferencia =  miFechap2.getTime()- miFechap1.getTime();
			var dias_d = Math.floor(diferencia / (1000 * 60 * 60 * 24)); 
			var dias_d=dias_d+1;
			for(d=1;d<=dias_d;d++){
				var ids =  document.getElementById(x+'ids_'+d).value;
				var ruta =  document.getElementById(x+'ruta_'+d).value;
				var SP =  document.getElementById(x+'SP_'+d).value;
				var EP =  document.getElementById(x+'EP_'+d).value;
				var ids_u =  document.getElementById(x+'ids_u'+d).value;
			$.ajax({
			type: "POST",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: 'action=itineraryatracsave&ids='+ids+'&datefrom='+date1[x]+'&dateto='+date2[x]+'&ciudad='+x+'&dia='+d+'&ruta='+ruta+'&SP='+SP+'&EP='+EP+'&ids_u='+ids_u+'&id='+itineraryId,
			success: function(datos){
				//alert(datos);
				if(datos!=''){
				var separa=datos.split('!');
				for(v=0;v<=(separa.length-1);v++){
				var separa2=separa[v].split(',');
				var ciudad=separa2[0];
				var dia=separa2[1];
				var itid=separa2[2];
				var placeid=separa2[3];
				var subplaceid=separa2[4];
	var nombre=ciudad+'ids_'+dia+'_'+placeid+'_'+subplaceid;
	var nombre3 = 'div_'+ciudad+'_atrac_sel';
    var valor =$('#'+nombre3+' input[name="'+nombre+'"]').val() || 0;
	var ruta =$('#'+nombre3+' input[name="'+nombre+'_R"]').val() || 0;
	if(valor !=0){
			$.ajax({
			type: "POST",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: 'action=itineraryatracsubsave&ids='+valor+'&ciudad='+ciudad+'&dia='+dia+'&ruta='+ruta+'&id='+itid+'&placeid='+placeid+'&subplaceid='+subplaceid,
			success: function(datos){}
			});}
				}
				}
				//$('#ItineraryId').val(datos);
				//myeztravel.checksaved_H();
			}
			});
				}
			}
		}
}
myeztravel.checksaved_H=function(){
var itineraryId=document.getElementById('ItineraryId').value;
			$.ajax({
			type: "POST",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: 'action=delitineraryhotelsave&id='+itineraryId,
			success: function(datos){
				//$('#ItineraryId').val(datos);
				//myeztravel.checksaved_H();
			}
			});
var hotel_= document.getElementById("hotel").value;
var hotel = hotel_.split(',');
for(x=0;x<=(hotel.length-1);x++){
	if(hotel[x]==1){
		var added = document.getElementById(x+'id_added').value;
		var id_selected= document.getElementById(x+'id_selected').value;
		var roomsel='';
		if(roomsarray.length!=0){
		for(i=0;i<=(roomsarray.length-1);i++){
		var comproom=roomsarray[i].split('/');
		var id_=comproom[0];
		if(id_selected==id_){var roomsel=roomsarray[i];}
		}
		}
		var counter=document.getElementById(x+'counter_selected').value;
		var datefrom = document.getElementById(x+'date_from').value;
		var dateto= document.getElementById(x+'date_to').value;
		var numrooms=document.getElementById(x+'numrooms'+counter).value;
		var xmlrooms=''
		var countadults=0;
		var countchilds=0;
		var num = x;
		for (r=1;r<=numrooms;r++){
		var nombre1=num+'room'+r+'_numadults'+counter;
		var nombre2=num+'room'+r+'_numchilds'+counter;
		var nombre3=num+'room'+r+'_childages'+counter;
		var childsnum = document.getElementById(nombre2).value;
		var adultsnum = document.getElementById(nombre1).value;	
		var childages = document.getElementById(nombre3).value;		
		var childages_='';
		var countadults=countadults+parseFloat(adultsnum);
		var countchilds=countchilds+parseFloat(childsnum);
		if(childsnum > 0){var childages_=','+childages}
		var xmlrooms=xmlrooms+'-room'+r+'='+adultsnum+childages_;
		//alert(xmlrooms);
			}		
			$.ajax({
			type: "POST",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: 'action=itineraryhotelsave&htlid='+id_selected+'&datefrom='+datefrom+'&dateto='+dateto+'&ciudad='+x+'&xmlrooms='+xmlrooms+'&id='+itineraryId+'&roomsel='+roomsel,
			success: function(datos){
				//$('#ItineraryId').val(datos);
				//myeztravel.checksaved_H();
			}
			});
		}
	}
}
myeztravel.checksaved_I=function(city,dia,donde){
	var itiname=document.getElementById('ItineraryName').value;
	var air=document.getElementById("air").value;
	var hotel= document.getElementById("hotel").value;
	var atrac= document.getElementById("atrac").value;
	var ciudad1=document.getElementById("Ciudad1").value;
	var ciudad2=document.getElementById("Ciudad2").value;
	var date1=document.getElementById("Date1").value;
	var date2=document.getElementById("Date2").value;
	var itineraryId=document.getElementById('ItineraryId').value;
	aleat = Math.random() * 9999999999999999;
	aleat2 = Math.random() * 9999999999999999;
	aleatf = Math.round(aleat+aleat2);
	if(itineraryId == 0){
	var param = 'Save';
	//alert('no saved');
	}
	else{
	var param = 'Update';	
	//alert('saved');
	}
		$.ajax({
			type: "POST",
			url: "data_ajax/myeztravel_content3.cfm",
			async:true, 
			cache:false,
			data: 'action=itinerarysave&ToDo='+param+'&aleatf='+aleatf+'&itiname='+itiname+'&air='+air+'&hotel='+hotel+'&atrac='+atrac+'&ciudad1='+ciudad1+'&ciudad2='+ciudad2+'&date1='+date1+'&date2='+date2+'&id='+itineraryId,
			success: function(datos){
				$('#ItineraryId').val(datos);
				//alert(donde);
				if(donde=='print_plan'){myeztravel_print_plan2(city,dia);}
				if(donde=='share_plan'){myeztravel_share_plan2(city,dia,datos);}
				if(donde=='print_itinerary'){myeztravel_print_itinerary2(datos);}
				if(donde=='share_itinerary'){myeztravel_share_itinerary2(datos);}
				myeztravel.checksaved_H();
				myeztravel.checksaved_A();
			}
		});
}
myeztravel_print_plan2=function(city,dia){
	var hotel_ = document.getElementById('hotel').value;
	var hotel=hotel_.split(',');
	var tienehtl=hotel[city];
	//alert(tienehtl);
	var ids = document.getElementById(city+'ids_'+dia).value;
	var ids_u = document.getElementById(city+'ids_u'+dia).value;
	var r_modificada = document.getElementById(city+'ruta_'+dia).value;
	if(tienehtl==1){
	var x = document.getElementById(city+'counter_selected').value;
	var htlname= document.getElementById(city+'hotl_n'+x).value;
	var htladdress= document.getElementById(city+'hotl_ad'+x).value;
	var htlcoordenadas= document.getElementById(city+'hotl_c'+x).value;
	var htlimage= document.getElementById(city+'hotl_i'+x).value;
	var htlrating= document.getElementById(city+'hotl_r'+x).value;      
	var htlcoordenadas_ = htlcoordenadas.replace('(','').replace(')','').split('/');
	var htllat = htlcoordenadas_[0];
	var htllng = htlcoordenadas_[1];	
	var SP=document.getElementById(city+'SP_'+dia).value;
	var EP=document.getElementById(city+'EP_'+dia).value;
	}
	else{
	var htlname= '';
	var htladdress= '';
	var htlimage= '';
	var htlrating= '';      
	var htllat = '';
	var htllng = '';	
	if(r_modificada==0){
	var ids_=ids.split(',');
	var SP=ids_[0];var EP=ids_[0]
//	for(x=0;x<=(ids_.length-1);x++){
//	if(x==0){var SP=ids_[x];}
//	var EP=ids_[x];
//	}
	document.getElementById(city+'SP_'+dia).value=SP;
	document.getElementById(city+'EP_'+dia).value=EP;
	}
	else{
	var SP=document.getElementById(city+'SP_'+dia).value;
	var EP=document.getElementById(city+'EP_'+dia).value;
	}
	}
	var cityname_ = document.getElementById('Ciudad2').value;
	var cityname = cityname_.split(',');
	var cname=cityname[city];
	var fecha1_ = document.getElementById('Date1').value;
	var fecha1=fecha1_.split(',');
	var date1= fecha1[city];
	var fecha2_ = document.getElementById('Date2').value;
	var fecha2=fecha2_.split(',');
	var date2= fecha2[city];
	var date1_ = new fecha(date1)     
   	var date2_ = new fecha(date2) 
    var miFechaI = new Date(date1_.anio, date1_.mes, date1_.dia );
    var miFechaF = new Date(date2_.anio, date2_.mes, date2_.dia );
    var diferencia =  miFechaF.getTime()- miFechaI.getTime()   
    var dias_t = Math.floor(diferencia / (1000 * 60 * 60 * 24))
	var dias_t = dias_t+1;	
	var pl='&pl='+ids+ids_u;
	var itineraryId=document.getElementById('ItineraryId').value;
	var urldata='&name='+htlname+'&htllat='+htllat+'&htllng='+htllng+'&ruta='+r_modificada+'&himage='+htlimage+'&hrating='+htlrating+'&htladdress='+htladdress+'&itineraryId='+itineraryId;
	var url='https://www.myezplan.com/mapcityprint_met.cfm?sp='+SP+'&ep='+EP+'&gotm=WALKING'+pl+'&plse='+ids+'&plom=&mostr_dirv=2'+urldata;
	window.open(url,'_blank');
}
myeztravel.print_plan=function(city,dia){
	var donde='print_plan';
	myeztravel.checksaved_I(city,dia,donde);
}
myeztravel.print_itinerary=function(){
	var donde='print_itinerary';
	//alert(donde);
	myeztravel.checksaved_I(0,0,donde);
}
myeztravel.share_itinerary=function(){
	var donde='share_itinerary';
	//alert(donde);
	myeztravel.checksaved_I(0,0,donde);
}
myeztravel.share_plan=function(city,dia){
	var donde='share_plan';
	myeztravel.checksaved_I(city,dia,donde);
}
showlessplan=function(city,dia){
var nombre='mas_f_span_'+city+'_'+dia;
document.getElementById(nombre).innerHTML='<span onclick="showmoreplan('+city+','+dia+');" style="color:#FFFFFF;">(+)</span></span>';
var nombre='span_mas_f'+city+'_'+dia;
document.getElementById(nombre).style.display='none'
}
showmoreplan=function(city,dia){
var nombre='mas_f_span_'+city+'_'+dia;
document.getElementById(nombre).innerHTML='<span onclick="showlessplan('+city+','+dia+');" style="color:#FFFFFF;">(-)</span></span>';
var nombre='span_mas_f'+city+'_'+dia;
document.getElementById(nombre).style.display='inline-block'
}
Showbought=function(){
if(!shb){var disp='block';shb=true;}else{var disp='none';shb=false;}
for(i=0;i<=(htlbooking.length-1);i++){
var comproom=htlbooking[i].split('/');
var id_=comproom[0];
	document.getElementById('Hotel_city'+id_+'_response').style.display=disp;
}
}
function showbookingdetails(num){
$('#'+num+'booking_details').fadeIn(300);
$('#Myeztravel_Cart').append('<div id="mask2" class="mask"></div>');
$('#mask2').fadeIn(300);}
function closebookingdetails(num){
$('#'+num+'booking_details').fadeOut(300);
$('#mask2').fadeOut(300);
$('#mask2').remove();}
function showcanc(numcity){
if(!showcancel){
	showcancel = true;
	document.getElementById(numcity+'cancelations').style.display='block';
	}
	else{
	showcancel = false;
	document.getElementById(numcity+'cancelations').style.display='none';
	}
}
hotel_buyed=function(numcity){
for(i=0;i<=(htlbooking.length-1);i++){
var comproom=htlbooking[i].split('/');
var id_=comproom[0];
if(numcity==id_){
	var htlname = comproom[2];
	var email= comproom[1];
	var date1 =comproom[3];
	var date2 = comproom[4];
	var numrooms= comproom[5];
	var totalp= comproom[6];
	var itineraryid = comproom[7];
	var status= comproom[8];
	var confnum= comproom[9];
	var canc=comproom[10];
	var roomslist=comproom[11];
	//alert(htlbooking[i]);
		var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Hotel_Booking2',email:email,numcity:numcity,htlname:htlname,date1:date1,date2:date2,numrooms:numrooms,totalp:totalp,itineraryid:itineraryid,status:status,confnum:confnum,canc:canc,roomslist:roomslist};
	$('#'+numcity+'_booking_results').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#'+numcity+'_booking_results').empty();
		break;
		}
	});
	}
}
}
cancroom=function(confnum,itineraryid,email,num,numcity){
	$('#'+num+'cancresponse'+numcity).showLoading("Cancelling Room...",true);
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Cancel_room',confnum:confnum,itineraryid:itineraryid,email:email,num:num,numcity:numcity};
	$('#'+num+'cancresponse'+numcity).load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#'+num+'cancresponse'+numcity).empty();
		break;
		}
	});
}
cancallroom=function(confnum,itineraryid,email,numcity){
	var confnum_= confnum.split('/')
	for(r=0;r<=(confnum_.length-1);r++){
		var num = r+1;
		var confnum_n=confnum_[r];
		//alert(confnum_n);
	$('#'+num+'cancresponse'+numcity).showLoading("Cancelling Room...",true);
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Cancel_room',confnum:confnum_n,itineraryid:itineraryid,email:email,num:num,numcity:numcity};
	$('#'+num+'cancresponse'+numcity).load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#'+num+'cancresponse'+numcity).empty();
		break;
		}
	});
	}
}
agreeterms=function(){
var che=document.getElementById('agreeterms').checked;
if(!che){
var conf = confirm('If you are not agree with the terms and conditions, you will not be able to book in any hotel');
if(!conf){document.getElementById('agreeterms').checked=true;}
}
}
Get_sates=function(Country){
if(Country=='US' || Country=='CA' || Country =='AU'){
//alert(Country);
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Get_states',country:Country};
	$('#state_sel').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#state_sel').empty();
		break;
		}
	});
}
else{
	document.getElementById('state_sel').innerHTML='<select id="C_CC_state" disabled="disabled"><option value="NO">Choose one..</option></select>';
	}
}
room_names_save = function(numcity,saved){
var nombre=numcity+'counter_selected';
var counter = document.getElementById(nombre).value;
var nombre=numcity+'numrooms'+counter;
var numrooms=document.getElementById(nombre).value;
fnames = '';
lnames = '';
for (r=1;r<=numrooms;r++){
	var fname= document.getElementById(r+'room_fname').value;
	var lname = document.getElementById(r+'room_lname').value;
	if(fname==''){alert('Please type a valid first name for room '+r);return false;document.getElementById(r+'room_fname').focus;}
	if(lname==''){alert('Please type a valid first name for room '+r);return false;document.getElementById(r+'room_lname').value;}
	if(r==1){var divisor='';}else{var divisor='/';}
	fnames=fnames+divisor+fname;
	lnames=lnames+divisor+lname;
	//alert(fnames+' ' +lnames);
	}
buy_hotel(numcity,saved);
closeroomnames();
}
room_names = function(numcity,saved){
var nombre=numcity+'counter_selected';
var counter = document.getElementById(nombre).value;
var nombre=numcity+'numrooms'+counter;
var numrooms=document.getElementById(nombre).value;
//alert(numrooms);
if(numrooms == 1){buy_hotel(numcity,saved);}else{
	var roomlist='';
	for (r=1;r<=numrooms;r++){
	var nombre1=numcity+'room'+r+'_numadults'+counter;
	var nombre2=numcity+'room'+r+'_numchilds'+counter;
	var nombre3=numcity+'room'+r+'_childages'+counter;
	var childsnum = document.getElementById(nombre2).value;
	var adultsnum = document.getElementById(nombre1).value;	
	var childages = document.getElementById(nombre3).value;		
	//var childages_='';
	if(r==1){divisor ='';}else{divisor='/';}
	if(childages==''){ages='';}else{ages='('+childages+')';}
	var roomlist=roomlist+divisor+'Room '+r+' Adults: '+adultsnum+' Childs: '+childsnum+ages;
		}
	//alert(roomlist);
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Get_roomnames',numcity:numcity,saved:saved,roomlist:roomlist};
	$('#rooms_names').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#rooms_names').empty();break;
	case "success":$('#rooms_names').fadeIn(300);
	$('#Myeztravel_Cart').append('<div id="mask2" class="mask"></div>');
	$('#mask2').fadeIn(300);	
		}
	});		
	}
}
closeroomnames=function(){
	$('#rooms_names').fadeOut(300);
	$('#rooms_names').empty();
	$('#mask2').fadeOut(300);
	$('#mask2').remove();
}
buy_hotel=function(numcity,saved){
//*[@id="0"]
$('#Hotel_city'+numcity+'_response').showLoading("Please Wait, Your booking is in procces...",false);
var nombre = numcity+'id_selected';
var id_ = document.getElementById(nombre).value;
var nombre = numcity+'date_from';
var Dfrom = document.getElementById(nombre).value;
var nombre=numcity+'date_to';
var Dto = document.getElementById(nombre).value;
var nombre=numcity+'counter_selected';
var counter = document.getElementById(nombre).value;
var nombre=numcity+'numrooms'+counter;
var numrooms=document.getElementById(nombre).value;
if(saved==0){
	var infotempsave_=infotempsave.split('/');
	var C_Fname= infotempsave_[0];
	var C_Lname= infotempsave_[1];
	var C_email= infotempsave_[2];
	var C_Hphone= infotempsave_[3];
	var C_Wphone= infotempsave_[4];
	var C_Wphone_e= infotempsave_[5];
	var C_Fphone= infotempsave_[6];
	var C_Cname= infotempsave_[7];
	var C_email_i= infotempsave_[8];
	var C_CCtype= infotempsave_[9];
	var C_CCnumber= infotempsave_[10];
	var C_CCid= infotempsave_[11];
	var C_CC_em= infotempsave_[12];
	var C_CC_ey= infotempsave_[13];
	var C_CC_country= infotempsave_[14];
	var C_CC_state= infotempsave_[15];
	var C_CCcity= infotempsave_[16];
	var C_CCaddress1= infotempsave_[17];
	var C_CCaddress2= infotempsave_[18];
	var C_CCaddress3= infotempsave_[19];
	var C_CCpostalcode= infotempsave_[20];	
	}
if(saved==1){
	var payarray_=payarray[0].split('/');
	var C_Fname= payarray_[0];
	var C_Lname= payarray_[1];
	var C_email= payarray_[2];
	var C_Hphone= payarray_[3];
	var C_Wphone= payarray_[4];
	var C_Wphone_e= payarray_[5];
	var C_Fphone= payarray_[6];
	var C_Cname= payarray_[7];
	var C_email_i= payarray_[8];
	var C_CCtype= payarray_[9];
	var C_CCnumber= payarray_[10];
	var C_CCid= payarray_[11];
	var C_CC_em= payarray_[12];
	var C_CC_ey= payarray_[13];
	var C_CC_country= payarray_[15];
	var C_CC_state= payarray_[16];
	var C_CCcity= payarray_[17];
	var C_CCaddress1= payarray_[18];
	var C_CCaddress2= payarray_[19];
	var C_CCaddress3= payarray_[20];
	var C_CCpostalcode= payarray_[21];		
		}	
//room_array="#id_#/#rereplace(roomtype,'/',' ','ALL')#/#ratekey#/#roomratecode#/#roomtypecode#/#numberformat(subtot,'$___,___.__')#/#numberformat(charges,'$___,___.__')#/#numberformat(tot,'$___,___.__')#/#suppliertype#/#Bedtypeid#/#Smoking#"
for(i=0;i<=(roomsarray.length-1);i++){
var roomsarray_=roomsarray[i].split('/');
//alert(roomsarray_);
var id=roomsarray_[0];
if(id==id_){
	var roomtype = roomsarray_[1];
	var ratekey = roomsarray_[2];
	var ratecode = roomsarray_[3];
	var roomtypecode = roomsarray_[4];
	var subtot = roomsarray_[5];
	var charges = roomsarray_[6];
	var tot = roomsarray_[7].replace('$','').replace(/^\s+|\s+$/g,'');
	var suppliertype = roomsarray_[8];
	var Bedtypeid = roomsarray_[9];
	var Smoking = roomsarray_[10];	
	}
}
	var xmlrooms='';
	if(numrooms!=1){var fnames_=fnames.split('/');var lnames_=lnames.split('/')}
	for (r=1;r<=numrooms;r++){
	var nombre1=numcity+'room'+r+'_numadults'+counter;
	var nombre2=numcity+'room'+r+'_numchilds'+counter;
	var nombre3=numcity+'room'+r+'_childages'+counter;
	var childsnum = document.getElementById(nombre2).value;
	var adultsnum = document.getElementById(nombre1).value;	
	var childages = document.getElementById(nombre3).value;		
	var childages_='';
	var countadults=countadults+parseFloat(adultsnum);
	var countchilds=countchilds+parseFloat(childsnum);
	if(numrooms==1){
	var name='&room'+r+'FirstName='+C_Fname;
	var name2='&room'+r+'LastName='+C_Lname;
	}else{
	name='&room'+r+'FirstName='+fnames_[(r-1)];
	name2='&room'+r+'LastName='+lnames_[(r-1)];
	}
	var bed='&room'+r+'BedTypeId='+Bedtypeid;
	var smoking_p='&room'+r+'SmokingPreference='+Smoking;
	if(childsnum > 0){var childages_=','+childages}else{childages_=''}
	var xmlrooms=xmlrooms+'&room'+r+'='+adultsnum+childages_+name+name2+bed+smoking_p;
		}
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Hotel_Booking',numcity:numcity,id:id_,date1:Dfrom,date2:Dto,spt:suppliertype,ratekey:ratekey,ratecode:ratecode,roomtypecode:roomtypecode,total:tot,xmlrooms:xmlrooms,email:C_email,fname:C_Fname,lname:C_Lname,hphone:C_Hphone,wphone:C_Wphone,cctype:C_CCtype,ccnum:C_CCnumber,ccid:C_CCid,ccem:C_CC_em,ccey:C_CC_ey,country:C_CC_country,state:C_CC_state,city:C_CCcity,address1:C_CCaddress1,address2:C_CCaddress2,address3:C_CCaddress3,postcode:C_CCpostalcode};
	$('#'+numcity+'_booking_results').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#'+numcity+'_booking_results').empty();
		break;
		}
	});
}
logout=function(){
document.getElementById('loginbutton').style.display= 'block';
document.getElementById('logoutbutton').style.display= 'none';
document.getElementById('user_li').value='';
document.getElementById('pass_li').value='';
document.getElementById('result_login').innerHTML='';
delete sessionuid;
}
sendlogin=function(){
var usr=document.getElementById('user_li').value;
var pass= document.getElementById('pass_li').value;
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'login_user',user:usr,password:pass};
	$('#result_login').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#result_login').empty();
		break;
		}
	});
}
closelogin=function(){
document.getElementById('login_cart').style.display='none';
}
showlogin=function(){
if(!showlogin_){document.getElementById('login_cart').style.display='block';showlogin_=true;}
else{document.getElementById('login_cart').style.display='none';showlogin_=false;}
}
buyitem=function(numcity,quees){
var email=document.getElementById('C_email').value;
var C_CCnumber= document.getElementById('C_CCnumber').value;
if(email !='' && C_CCnumber !=''){var llenos =1;}else{var llenos=0;}
if( typeof payarray == "undefined" ){var undef = 0;}else{var undef =1}
if(undef==0 && llenos ==0){showpayinfo();return false;}//alert('Before you can buy you have to insert your payment information, please click on the button "Add Payment Info"');
if(undef==1){
	var saved=1;
	var pwd2=prompt("Please enter your password:","your password here");
	for(i=0;i<=(payarray.length-1);i++){
		var comppay=payarray[i].split('/');
		var pwd=comppay[14];
		}
	if(pwd2!=pwd){alert('incorrect password, please try again');return false;}	
	}
if(llenos==1 && undef==0){
var saved=0;
var C_Fname= document.getElementById('C_Fname').value;
var C_Lname= document.getElementById('C_Lname').value;
var C_email= document.getElementById('C_email').value;
var C_Hphone= document.getElementById('C_Hphone').value;
var C_Wphone= document.getElementById('C_Wphone').value;
var C_Wphone_e= document.getElementById('C_Wphone_e').value;
var C_Fphone= document.getElementById('C_Fphone').value;
var C_Cname= document.getElementById('C_Cname').value;
var C_email_i= document.getElementById('C_email_i').value;
var C_CCtype_= document.getElementById('C_CCtype').value;
var C_CCtype = cardtype(C_CCtype_);
var C_CCnumber= document.getElementById('C_CCnumber').value;
var validnumber =ccnumber_valid(C_CCnumber);
if(validnumber==0){alert('Please Verfy your Credit Card Number');return false;}
var C_CCid= document.getElementById('C_CCid').value;
var C_CC_em= document.getElementById('C_CC_em').value;
var C_CC_ey= document.getElementById('C_CC_ey').value;
var C_CC_country= document.getElementById('C_CC_country').value;
var C_CC_state= document.getElementById('C_CC_state').value;
var C_CCcity= document.getElementById('C_CCcity').value;
var C_CCaddress1= document.getElementById('C_CCaddress1').value;
var C_CCaddress2= document.getElementById('C_CCaddress2').value;
var C_CCaddress3= document.getElementById('C_CCaddress3').value;
var C_CCpostalcode= document.getElementById('C_CCpostalcode').value;
infotempsave= C_Fname+'/'+C_Lname+'/'+C_email+'/'+C_Hphone+'/'+C_Wphone+'/'+C_Wphone_e+'/'+C_Fphone+'/'+C_Cname+'/'+C_email_i+'/'+C_CCtype+'/'+C_CCnumber+'/'+C_CCid+'/'+C_CC_em+'/'+C_CC_ey+'/'+C_CC_country+'/'+C_CC_state+'/'+C_CCcity+'/'+C_CCaddress1+'/'+C_CCaddress2+'/'+C_CCaddress3+'/'+C_CCpostalcode;
}
if(quees==1){room_names(numcity,saved);}else{return false;}
//alert('proceed with purchase');
}
function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
signupcheck=function(){
var signup=document.getElementById('Sign_up').checked;
if(signup){
document.getElementById('Signup1').style.display = 'block';
document.getElementById('Signup2').style.display = 'block';
document.getElementById('Signup3').style.display = 'block';
document.getElementById('Signup4').style.display = 'block';
document.getElementById('Signup5').style.display = 'block';
//document.getElementById('Signup6').style.display = 'block';
//document.getElementById('Signup7').style.display = 'block';
document.getElementById('News_feed').style.display = 'block';
//document.getElementById('Usr_pwd').style.display = 'block';
//document.getElementById('Usr_pwd2').style.display = 'block';
}
else{
document.getElementById('Signup1').style.display = 'none';
document.getElementById('Signup2').style.display = 'none';
document.getElementById('Signup3').style.display = 'none';
document.getElementById('Signup4').style.display = 'none';
document.getElementById('Signup5').style.display = 'none';
//document.getElementById('Signup6').style.display = 'none';
//document.getElementById('Signup7').style.display = 'none';
document.getElementById('News_feed').style.display = 'none';
//document.getElementById('Usr_pwd').style.display = 'none';
//document.getElementById('Usr_pwd2').style.display = 'none';
}
}
cardtype=function(CCtype_){
//alert(CCtype_);
var ctype=''
if (CCtype_=='Visa'){var ctype='VI';} 
if (CCtype_=='American Express'){var ctype='AX';} 
if (CCtype_=='BC Card'){var ctype='BC';} 
if (CCtype_=='Master Card'){var ctype='MC';} 
if (CCtype_=='MasterCard Alaska'){var ctype='IK';} 
if (CCtype_=='MasterCard Canada'){var ctype='CA';} 
if (CCtype_=='Carte Blanche'){var ctype='CB';} 
if (CCtype_=='China Union Pay'){var ctype='CU';} 
if (CCtype_=='Discover'){var ctype='DS';} 
if (CCtype_=='Diners Club'){var ctype='DC';} 
if (CCtype_=='Carta Si'){var ctype='T';} 
if (CCtype_=='Carte Bleue'){var ctype='R';} 
if (CCtype_=='Dankort'){var ctype='N';} 
if (CCtype_=='Delta'){var ctype='L';} 
if (CCtype_=='Electron'){var ctype='E';} 
if (CCtype_=='Japan Credit Bureau'){var ctype='JC';} 
if (CCtype_=='Maestro'){var ctype='TO';} 
if (CCtype_=='Switch'){var ctype='S';} 
if (CCtype_=='Solo'){var ctype='O';} 
return ctype;
}
ccnumber_valid=function(number){
var largo = number.length;
var count=0;
var valor=0;
for (x=(largo-2);x>=0;x--){
	//alert(number[x]);
	var count=count+1
	if(count==2){
		count=0;
		var digit=number[x];
		}else{
		var digit=(number[x]*2);
		}
	if(digit>9){
		//alert('doble');
		var digit_=1+(parseInt(digit)-10);
		//alert(digit[0]+' '+digit[1]);
		}else{
		//alert('single');
		var digit_=digit;}
	var digit = digit_;	
	//alert(digit);
	var valor=parseInt(valor)+parseInt(digit);}
	//alert(valor);
	var valor2=valor*9;
	//alert(valor2);
	var valor2_=valor2.toString();
	var verdig=valor2_[(valor2_.length-1)];
	//alert(verdig);
	if(parseInt(verdig) == parseInt(number[largo-1])){var valid =1;}else{var valid =0;}
	return valid;
}
savepayinfo=function(){
var che=document.getElementById('agreeterms').checked;
if(!che){alert('you have to agree to the terms to buy');return false;}
var C_Fname= document.getElementById('C_Fname').value;
if(C_Fname==''){alert('Please Type a valid First Name');document.getElementById('C_Fname').focus();return false;}
var C_Lname= document.getElementById('C_Lname').value;
if(C_Lname==''){alert('Please Type a valid Last Name');document.getElementById('C_Lname').focus();return false;}
var C_email= document.getElementById('C_email').value;
if(C_email==''){alert('Please Type a valid email');document.getElementById('C_email').focus();return false;}
var valid_email= validateEmail(C_email);
if(!valid_email){alert('Please Type a valid email');document.getElementById('C_email').focus();return false;}
var C_Hphone= document.getElementById('C_Hphone').value;
if(C_Hphone==''){alert('Please Type a valid Home phone');document.getElementById('C_Hphone').focus();return false;}
if(isNaN(C_Hphone)){alert('Please Type a valid Home phone');document.getElementById('C_Hphone').focus();return false;}
var C_Wphone= document.getElementById('C_Wphone').value;
var C_Wphone_e= document.getElementById('C_Wphone_e').value;
var C_Fphone= document.getElementById('C_Fphone').value;
var C_Cname= document.getElementById('C_Cname').value;
var C_email_i= document.getElementById('C_email_i').value;
var CCtype_= document.getElementById('C_CCtype').value;
if(CCtype_=='Choose one...' || CCtype_=='NO'){alert('Please Select a Credit Card Type');document.getElementById('C_CCtype').focus()}
var C_type = cardtype(CCtype_);
//alert(C_type);
var C_CCnumber= document.getElementById('C_CCnumber').value;
if(C_CCnumber==''){alert('Please Type a valid Credit Card Number');document.getElementById('C_CCnumber').focus();return false;}
if(isNaN(C_CCnumber)){alert('Please Type a valid Credit Card Number');document.getElementById('C_CCnumber').focus();return false;}
var validnumber =ccnumber_valid(C_CCnumber);
if(validnumber==0){alert('Please Verfy your Credit Card Number');document.getElementById('C_CCnumber').focus();return false;}
var C_CCid= document.getElementById('C_CCid').value;
if(C_CCid==''){alert('Please Type a valid Credit Card Identifier');document.getElementById('C_CCid').focus();return false;}
if(isNaN(C_CCid)){alert('Please Type a valid Credit Card Identifier');document.getElementById('C_CCid').focus();return false;}
var C_CC_em= document.getElementById('C_CC_em').value;
var C_CC_ey= document.getElementById('C_CC_ey').value;
var C_CC_country= document.getElementById('C_CC_country').value;
if(C_CC_country=='NO'){alert('Please Select  a Country');document.getElementById('C_CC_country').focus();return false;}
var C_CC_state= document.getElementById('C_CC_state').value;
if(C_CC_state=='NO' && C_CC_country == 'US'){alert('Please Select a State');document.getElementById('C_CC_state').focus();return false;}
if(C_CC_state=='NO' && C_CC_country == 'AU'){alert('Please Select a State');document.getElementById('C_CC_state').focus();return false;}
if(C_CC_state=='NO' && C_CC_country == 'CA'){alert('Please Select a State');document.getElementById('C_CC_state').focus();return false;}
var C_CCcity= document.getElementById('C_CCcity').value;
if(C_CCcity==''){alert('Please type a valid a City name');document.getElementById('C_CCcity').focus();return false;}
var C_CCaddress1= document.getElementById('C_CCaddress1').value;
if(C_CCaddress1==''){alert('Please type Address');document.getElementById('C_CCaddress1').focus();return false;}
var C_CCaddress2= document.getElementById('C_CCaddress2').value;
var C_CCaddress3= document.getElementById('C_CCaddress3').value;
var C_CCpostalcode= document.getElementById('C_CCpostalcode').value;
if(C_CCpostalcode==''){alert('Please type Postal code');document.getElementById('C_CCpostalcode').focus();return false;}
var _age=$("input:radio[name='user_age']:checked").each(function(index, element) {
	user_age=parseInt($(element).val());});
var _gender=$("input:radio[name='user_gender']:checked").each(function(index, element) {
	user_gender=$(element).val();});
var signup=document.getElementById('Sign_up').checked;
var newsfeed_=document.getElementById('News_feed').checked;
if(newsfeed_){var newsfeed=1}else{var newsfeed=0}
var pwd=document.getElementById('Usr_pwd').value;
if(pwd==''){alert('Please type a Password');document.getElementById('Usr_pwd').focus();return false;}
var pwd_c=document.getElementById('Usr_pwd2').value;
if(pwd!=pwd_c){document.getElementById('Usr_pwd').value='';document.getElementById('Usr_pwd2').value='';alert('password error, please type again');document.getElementById('Usr_pwd').focus();return false;}
if(signup){
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Signup_newuser',email_:C_email,pass:pwd,fname:C_Fname,lname:C_Lname,gender:user_gender,agerange:user_age,newsfeed:newsfeed};
	$('#user_results').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#user_results').empty();
		break;
		}
	});
}
payarray=[];
var payarrayins= C_Fname+'/'+C_Lname+'/'+C_email+'/'+C_Hphone+'/'+C_Wphone+'/'+C_Wphone_e+'/'+C_Fphone+'/'+C_Cname+'/'+C_email_i+'/'+C_type+'/'+C_CCnumber+'/'+C_CCid+'/'+C_CC_em+'/'+C_CC_ey+'/'+pwd+'/'+C_CC_country+'/'+C_CC_state+'/'+C_CCcity+'/'+C_CCaddress1+'/'+C_CCaddress2+'/'+C_CCaddress3+'/'+C_CCpostalcode;
payarray.push(payarrayins);
//alert(C_Fname);
//alert(signup);
//alert(user_age+' '+user_gender);
$('#pay_info').fadeOut(3000);
$('#mask2').fadeOut(3000);
$('#mask2').remove();
}
updatesettings_cart=function(from,to,xmlrooms,numcity,roomarray){
var roomarray_=roomarray.split('/');
var id=roomarray_[0];
if(roomsarray.length!=0){
for(i=0;i<=(roomsarray.length-1);i++){
var comproom=roomsarray[i].split('/');
var id_=comproom[0];
if(id==id_){roomsarray.splice(i,1);}
}
roomsarray.push(roomarray);
}
else{roomsarray.push(roomarray);}
var conf_H = confirm("Do you want to apply these settings(dates and quantities) to complete itinerary, if you don't, changes will be aplied to Hotels only");
var added = document.getElementById(numcity+'id_added').value;
var air= document.getElementById('air').value;
var hotel= document.getElementById('hotel').value;
var atrac= document.getElementById('atrac').value;
var id_selected= document.getElementById(numcity+'id_selected').value;
var cd = document.getElementById('Ciudad2').value;
var cd_ = cd.split(',');
var ciudad=cd_[numcity];
	document.getElementById('Resultdatahotel_cart').innerHTML='';
	var nombrepu = '#Hotel_pop_map';
	var $popup=$(nombrepu);
	$popup.fadeOut(300);
	$('#mask').fadeOut(300);
	$('#mask').remove();
if(conf_H){
var fecha_ = document.getElementById('Date1').value;
var fecha=fecha_.split(',');
var dt_='';
for (f=0;f<=(fecha.length-1);f++){
if(f==0){coma='';}else{coma=',';}
if(f==num2){dt_=dt_+coma+from;}else{dt_=dt_+coma+fecha[f];}
}
document.getElementById('Date1').value=dt_;
var fecha_ = document.getElementById('Date2').value;
var fecha=fecha_.split(',');
var dt_='';
for (f=0;f<=(fecha.length-1);f++){
if(f==0){coma='';}else{coma=',';}
if(f==num2){dt_=dt_+coma+to;}else{dt_=dt_+coma+fecha[f];}
}
document.getElementById('Date2').value=dt_;
myeztravel.CalcDates();
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'updatehotelsettings',id_:id_selected,datef:from,datet:to,cityid:ciudad,xmlrooms:xmlrooms,added_id:added,ciudad:numcity};
	$('#div_'+numcity+'_hotels_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+numcity+'_hotels_sel').empty();
		break;
		}
	});
	}
	else{
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'updatehotelsettings',id_:id,datef:from,datet:to,cityid:ciudad,xmlrooms:xmlrooms,added_id:added,ciudad:numcity};
	$('#div_'+numcity+'_hotels_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+numcity+'_hotels_sel').empty();
		break;
		}
	});
		}
Showcart();
}
searchdatahotel_c=function(id,numcity){
var from=document.getElementById('datefromhotel_map').value;
var to=document.getElementById('datetohotel_map').value;
	var numrooms=document.getElementById('numrooms_map').value;
	var xmlrooms=''
	for (r=1;r<=numrooms;r++){
	var nombre1='numadults_map_r'+r;
	var nombre2='numchilds_map_r'+r;
	var nombre3='childages_map_r'+r;
	var childsnum = document.getElementById(nombre2).value;
	var adultsnum = document.getElementById(nombre1).value;	
	var childages = document.getElementById(nombre3).value;		
	var childages_='';
	if(childsnum > 0){var childages_=','+childages}
	var xmlrooms=xmlrooms+'&room'+r+'='+adultsnum+childages_;
		}
//alert(numcity+' '+id+' '+from+' '+to+' '+xmlrooms);
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'checkroomavailability_cart',id_:id,numcity:numcity,from:from,to:to,xmlrooms:xmlrooms};
	$('#Resultdatahotel_cart').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#Resultdatahotel_cart').empty();break;}
	});	
}
selectHotelBuy=function(htl,numcity){
//alert(htl+' '+numcity);
var C_Fname= document.getElementById('C_Fname').value;
var C_Lname= document.getElementById('C_Lname').value;
var C_email= document.getElementById('C_email').value;
var C_Hphone= document.getElementById('C_Hphone').value;
var C_Wphone= document.getElementById('C_Wphone').value;
var C_Wphone_e= document.getElementById('C_Wphone_e').value;
var C_Fphone= document.getElementById('C_Fphone').value;
var C_Cname= document.getElementById('C_Cname').value;
var C_email_i= document.getElementById('C_email_i').value;
var C_CCtype= document.getElementById('C_CCtype').value;
var C_CCnumber= document.getElementById('C_CCnumber').value;
var C_CCid= document.getElementById('C_CCid').value;
var C_CC_em= document.getElementById('C_CC_em').value;
var C_CC_ey= document.getElementById('C_CC_ey').value;
var C_CC_country= document.getElementById('C_CC_country').value;
var C_CC_state= document.getElementById('C_CC_state').value;
var C_CCcity= document.getElementById('C_CCcity').value;
var C_CCaddress1= document.getElementById('C_CCaddress1').value;
var C_CCaddress2= document.getElementById('C_CCaddress2').value;
var C_CCaddress3= document.getElementById('C_CCaddress3').value;
var C_CCpostalcode= document.getElementById('C_CCpostalcode').value;
var _age=$("input:radio[name='user_age']:checked").each(function(index, element) {
	user_age=parseInt($(element).val());});
var _gender=$("input:radio[name='user_gender']:checked").each(function(index, element) {
	user_gender=$(element).val();});
var signup=document.getElementById('Sign_up').checked;
var newsfeed_=document.getElementById('News_feed').checked;
var pwd=document.getElementById('Usr_pwd').value;
var pwd_c=document.getElementById('Usr_pwd2').value;
if(C_Fname!='' && C_email!= ''){
infotempsave= C_Fname+'/'+C_Lname+'/'+C_email+'/'+C_Hphone+'/'+C_Wphone+'/'+C_Wphone_e+'/'+C_Fphone+'/'+C_Cname+'/'+C_email_i+'/'+C_CCtype+'/'+C_CCnumber+'/'+C_CCid+'/'+C_CC_em+'/'+C_CC_ey+'/'+user_age+'/'+user_gender+'/'+signup+'/'+newsfeed_+'/'+pwd+'/'+pwd_c+'/'+C_CC_country+'/'+C_CC_state+'/'+C_CCcity+'/'+C_CCaddress1+'/'+C_CCaddress2+'/'+C_CCaddress3+'/'+C_CCpostalcode;
}
var htl_id =document.getElementById(numcity+'id_selected').value;
var htl_name= document.getElementById(numcity+'hotl_n'+htl).value;
var htl_price= document.getElementById(numcity+'hotl_price'+htl).value;
var htl_pricest= document.getElementById(numcity+'hotl_price_st'+htl).value;
var htl_pricesc= document.getElementById(numcity+'hotl_price_sc'+htl).value;
var htl_rat= document.getElementById(numcity+'hotl_r'+htl).value;
var htl_img= document.getElementById(numcity+'hotl_i'+htl).value;
var numroom= document.getElementById(numcity+'numrooms'+htl).value;
var ciudades=document.getElementById('Ciudad2').value;
var ciudades_=ciudades.split(',');
var city=ciudades_[numcity];
var from = document.getElementById(numcity+'date_from').value;
var to = document.getElementById(numcity+'date_to').value;
var fecha1 = new fecha(from);     
var fecha2 = new fecha(to);
var miFecha1 = new Date( fecha1.anio, fecha1.mes, fecha1.dia )  
var miFecha2 = new Date( fecha2.anio, fecha2.mes, fecha2.dia )
var diferencia =  miFecha2.getTime()- miFecha1.getTime()   
var nights = Math.floor(diferencia / (1000 * 60 * 60 * 24))
var room=document.getElementById(numcity+'hotl_room'+htl).value;
	var xmlrooms='';
	var childsnum_='';
	var adultsnum_='';
	var _childages_='';
	for (r=1;r<=numrooms;r++){
	if(r==1){var coma='';var lolo='';}else{var coma=',';var lolo='/';}
	var nombre1=numcity+'room'+r+'_numadults'+htl;
	var nombre2=numcity+'room'+r+'_numchilds'+htl;
	var nombre3=numcity+'room'+r+'_childages'+htl;
	var childsnum = document.getElementById(nombre2).value;
	var adultsnum = document.getElementById(nombre1).value;	
	var childages = document.getElementById(nombre3).value;
	var childsnum_=childsnum_+lolo+childsnum;
	var adultsnum_=adultsnum_+lolo+adultsnum;
	var _childages_= childages_+lolo+childages;	
	var childages_='';
	if(childsnum > 0){var childages_=','+childages}
	var xmlrooms=xmlrooms+'&room'+r+'='+adultsnum+childages_;
		}
	var roomlist=myeztravel.armalist(numrooms,adultsnum_,childsnum_,0,0);
	//alert(roomlist);
	var nombre = '#Hotel_pop_map';
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'gethoteldata_cart',id_:htl_id,name_:htl_name,rat_:htl_rat,img_:htl_img,room_:room,nights_:nights,total_:htl_pricest,total_f_:htl_price,surcharge_:htl_pricesc,roomlist_:roomlist,numrooms:numroom,numadults:adultsnum_,numchilds:childsnum_,childages:_childages_,from:from,to:to,numcity:numcity,city:city};
	$(nombre).load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$(nombre).empty();break;}
	});	
	var $popup=$('#Myeztravel_Cart');
	$popup.fadeOut();
	var $popup=$('#Hotel_pop_map');
	$popup.fadeIn();
	var popMargTop=50;
}
updatesettings_map=function(from,to,xmlrooms,numcity,roomarray){
var roomarray_=roomarray.split('/');
var id=roomarray_[0];
if(roomsarray.length!=0){
for(i=0;i<=(roomsarray.length-1);i++){
var comproom=roomsarray[i].split('/');
var id_=comproom[0];
if(id==id_){roomsarray.splice(i,1);}
}
roomsarray.push(roomarray);
}
else{roomsarray.push(roomarray);}
var conf_H = confirm("Do you want to apply these settings(dates and quantities) to complete itinerary, if you don't, changes only be aplied to Hotels only");
var added = document.getElementById(numcity+'id_added').value;
var air= document.getElementById('air').value;
var hotel= document.getElementById('hotel').value;
var atrac= document.getElementById('atrac').value;
var id_selected= document.getElementById(numcity+'id_selected').value;
var cd = document.getElementById('Ciudad2').value;
var cd_ = cd.split(',');
var ciudad=cd_[numcity];
var added= added+','+id;
	document.getElementById('Resultdatahotel_map').innerHTML='';
	var nombrepu = '#Hotel_pop_map';
	var $popup=$(nombrepu);
	$popup.fadeOut(300);
	$("#iframe_mapHotelscity").empty().attr("src","");
//	var nombrepu = '#Hotelsmappopup-box';
//	var $popup=$(nombrepu);
//	$popup.fadeOut(300);
	$('#mask').fadeOut(300);
	$('#mask').remove();
if(conf_H){
var fecha_ = document.getElementById('Date1').value;
var fecha=fecha_.split(',');
var dt_='';
for (f=0;f<=(fecha.length-1);f++){
if(f==0){coma='';}else{coma=',';}
if(f==num2){dt_=dt_+coma+from;}else{dt_=dt_+coma+fecha[f];}
}
document.getElementById('Date1').value=dt_;
var fecha_ = document.getElementById('Date2').value;
var fecha=fecha_.split(',');
var dt_='';
for (f=0;f<=(fecha.length-1);f++){
if(f==0){coma='';}else{coma=',';}
if(f==num2){dt_=dt_+coma+to;}else{dt_=dt_+coma+fecha[f];}
}
document.getElementById('Date2').value=dt_;
myeztravel.CalcDates();
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'updatehotelsettings',id_:id,datef:from,datet:to,cityid:ciudad,xmlrooms:xmlrooms,added_id:added,ciudad:numcity};
	$('#div_'+numcity+'_hotels_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+numcity+'_hotels_sel').empty();
		break;
		}
	});
	}
	else{
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'updatehotelsettings',id_:id,datef:from,datet:to,cityid:ciudad,xmlrooms:xmlrooms,added_id:added,ciudad:numcity};
	$('#div_'+numcity+'_hotels_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+numcity+'_hotels_sel').empty();
		break;
		}
	});
		}
	document.getElementById('numcity_').value = numcity;
//	var numadults_ = document.getElementById('numadults1').value;
//	var numchilds_ = document.getElementById('numchilds1').value;
//	var childages_ = document.getElementById('childages1').value;
	var $popup=$('#Hotelsmappopup-box');
	var popMargTop=50;//($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	$popup.css({'margin-top':popMargTop,/*'margin-left':-popMargLeft*/});
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
//	alert(cd2+' '+dt1+' '+dt2+' '+numadults_+' '+numchilds_+' '+childages_);
	var _urliframepopup = "Hotelmappopup.cfm?cd2_="+ciudad+'&dt1_='+from+'&dt2_='+to+'&xmlrooms='+xmlrooms+'&added='+added+'&numcity='+numcity;
//	alert(xmlrooms);
	$('#iframe_mapHotelscity').attr("src",_urliframepopup);
	$('#iframe_mapHotelscity').fadeIn(300);
}
searchdatahotel_m=function(id,numcity){
var from=document.getElementById('datefromhotel_map').value;
var to=document.getElementById('datetohotel_map').value;
	var numrooms=document.getElementById('numrooms_map').value;
	var xmlrooms=''
	for (r=1;r<=numrooms;r++){
	var nombre1='numadults_map_r'+r;
	var nombre2='numchilds_map_r'+r;
	var nombre3='childages_map_r'+r;
	var childsnum = document.getElementById(nombre2).value;
	var adultsnum = document.getElementById(nombre1).value;	
	var childages = document.getElementById(nombre3).value;		
	var childages_='';
	if(childsnum > 0){var childages_=','+childages}
	var xmlrooms=xmlrooms+'&room'+r+'='+adultsnum+childages_;
		}
//alert(numcity+' '+id+' '+from+' '+to+' '+xmlrooms);
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'checkroomavailability_map',id_:id,numcity:numcity,from:from,to:to,xmlrooms:xmlrooms};
	$('#Resultdatahotel_map').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#Resultdatahotel_map').empty();break;}
	});	
}
showchildages=function(num,cuantas){
var nombre = 'td_childages_map_r'+num;
if(cuantas!=0){document.getElementById(nombre).style.display='block';}
else{document.getElementById(nombre).style.display='none';}
}
map_changerooms=function(cuantas){
if(cuantas==1){
	document.getElementById('room1_m').style.display='block';
	document.getElementById('room2_m').style.display='none';
	document.getElementById('room3_m').style.display='none';}
if(cuantas==2){
	document.getElementById('room1_m').style.display='block';
	document.getElementById('room2_m').style.display='block';
	document.getElementById('room3_m').style.display='none';}
if(cuantas==3){
	document.getElementById('room1_m').style.display='block';
	document.getElementById('room2_m').style.display='block';
	document.getElementById('room3_m').style.display='block';}	
}
_addtoplan_hd=function(count,id){
alert(count+' '+id);
var $form=$('#hotdeals_hiddens');
var ids=$form.find('input[id="ids_new_h"]').val();
//var ids =$popup.document.getElementById('ids_new_h').value;
alert(ids);
//var ids = document.getElementById('ids_new_h').value;
var che= document.getElementById('tabsx_checkboxmix').checked;
//if(che){
//	var ids_n = ids+','+id
//	document.getElementById('buton_add'+count).innerHTML='<button onclick="addToPlan('+id+',0,'+count+');" class="button-round-2 button-round-red2">Added</button>';
//	}else{
//	document.getElementById('buton_add'+count).innerHTML='<button onclick="addToPlan('+id+',1,'+count+');" class="button-round-2 button-round-red2">Add to Myezplan</button>';	
//	var ids_n = '';
//	var ids_=ids.split(',');
//	for(x=0;x<=(ids_.length-1);x++){
//		if(ids_n==''){var coma=''}else{var coma=','}
//		if(ids_[x]!=id){ids_n=ids_n+coma+ids_[x];}
//		}
//		}
//document.getElementById('ids_new_h').value=ids_n;
}
_addtoplan=function(count,id){
var ids = document.getElementById('ids_s').value;
var che= document.getElementById('tabsx_checkboxmix').checked;
if(che){
	var ids_n = ids+','+id;
	document.getElementById('p_checkbox_'+count).checked=true;
	}else{
	document.getElementById('p_checkbox_'+count).checked=false;	
	var ids_n = '';
	var ids_=ids.split(',');
	for(x=0;x<=(ids_.length-1);x++){
		if(ids_n==''){var coma=''}else{var coma=','}
		if(ids_[x]!=id){ids_n=ids_n+coma+ids_[x];}
		}
		}
//alert(ids_n);
document.getElementById('ids_s').value=ids_n;
}	
addtosubplan_selec=function(count,id){
//alert(count+' '+id+' '+idch);
var ids = document.getElementById('place_ids_'+count).value;
var che= document.getElementById('check'+id).checked;
if(che){
	if (ids==''){var coma='';}else{var coma=',';}
	var ids_n = ids+coma+id;
	}else{
	var ids_n = '';
	var ids_=ids.split(',');
	for(x=0;x<=(ids_.length-1);x++){
		if(ids_n==''){var coma=''}else{var coma=','}
		if(ids_[x]!=id){ids_n=ids_n+coma+ids_[x];}
		}
		}
//alert(ids_n);
document.getElementById('place_ids_'+count).value=ids_n;
}
addtosubplan=function(count,id){
//alert(count+' '+id+' '+idch);
var ids = document.getElementById('place_ids_'+count).value;
var che= document.getElementById('check'+id).checked;
if(che){
	if (ids==''){var coma='';}else{var coma=',';}
	var ids_n = ids+coma+id;
	}else{
	var ids_n = '';
	var ids_=ids.split(',');
	for(x=0;x<=(ids_.length-1);x++){
		if(ids_n==''){var coma=''}else{var coma=','}
		if(ids_[x]!=id){ids_n=ids_n+coma+ids_[x];}
		}
		}
//alert(ids_n);
document.getElementById('place_ids_'+count).value=ids_n;
}
add_sp_stop=function(count){
var ids = document.getElementById('place_ids_'+count).value;
var che= document.getElementById('checkSP').checked;
if(che){
	if (ids==''){var coma='';}else{var coma=',';}
	var ids_n = count+coma+ids;
	}else{
	var ids_n = '';
	var ids_=ids.split(',');
	var contador=0;
	for(x=0;x<=(ids_.length-1);x++){
		if(ids_n==''){var coma=''}else{var coma=','}
		if(ids_[x]==count && contador==0 || ids_[x]== '0001' && contador==0 || ids_[x]=='0000' && contador==0){var contador=1;}
		else{ids_n=ids_n+coma+ids_[x];}
		}
	}
document.getElementById('place_ids_'+count).value=ids_n;
}
add_ep_stop=function(count){
var ids = document.getElementById('place_ids_'+count).value;
var che= document.getElementById('checkEP').checked;
if(che){
	if (ids==''){var coma='';}else{var coma=',';}
	var contador=2;
	var ids_n = ids+coma+count;
	}else{
	if (ids==count || ids=='0001' || ids=='0000'){document.getElementById('place_ids_'+count).value='';return false;}
	var ids_n = '';
	var ids_=ids.split(',');
	var contador=0;
	for(x=0;x<=(ids_.length-1);x++){
		if(ids_n==''){var coma=''}else{var coma=','}
		if(ids_[x]==count || ids_[x]== '0001' || ids_[x]=='0000'){contador=contador+1}
		if(contador != 2){ids_n=ids_n+coma+ids_[x];}
		}
	}
if(contador==2){document.getElementById('place_ids_'+count).value=ids_n;}
else{
	var ids_n = '';
	var ids_=ids.split(',');
	for(x=0;x<=(ids_.length-1);x++){
	if(ids_n==''){var coma=''}else{var coma=','}
	if(ids_[x]!=count && ids_[x]!= '0001' && ids_[x]!='0000'){ids_n=ids_n+coma+ids_[x];}
	}
document.getElementById('place_ids_'+count).value=ids_n;
	}
}
_addtosubplan_=function(count,id){
//alert(count+' '+id+' '+idch);
var ids = document.getElementById('place_ids_'+count).value;
var che= document.getElementById('tabsx_checkboxmix').checked;
if(che){
	if (ids==''){var coma='';}else{var coma=',';}
	var ids_n = ids+coma+id;
	document.getElementById('check'+id).checked=true;
	}else{
	document.getElementById('check'+id).checked=false;	
	var ids_n = '';
	var ids_=ids.split(',');
	for(x=0;x<=(ids_.length-1);x++){
		if(ids_n==''){var coma=''}else{var coma=','}
		if(ids_[x]!=id){ids_n=ids_n+coma+ids_[x];}
		}
		}
//alert(ids_n);
document.getElementById('place_ids_'+count).value=ids_n;
}
_addtoplan2=function(id){
var ids = document.getElementById('ids_s').value;
var che= document.getElementById('tabsx_checkboxmix2').checked;
if(che){
	var ids_n = ids+','+id
	}else{
	var ids_n = '';
	var ids_=ids.split(',');
	for(x=0;x<=(ids_.length-1);x++){
		if(ids_n==''){var coma=''}else{var coma=','}
		if(ids_[x]!=id){ids_n=ids_n+coma+ids_[x];}
		}
		}
//alert(ids_n);		
document.getElementById('ids_s').value=ids_n;
}
SaveHotDeals=function(){
var ids = document.getElementById('ids_new_h').value;
var city = document.getElementById('city_h').value;
var day = document.getElementById('dia_h').value;
//var ids_o = window.top.document.getElementById(city+'ids_'+day).value;
window.top.document.getElementById(city+'ids_'+day).value=ids;
alert('your plan has been saved');
}
addToPlan=function(id,act,cual){
	var ids = document.getElementById('ids_new_h').value;
	if(act==1){
	document.getElementById('buton_add'+cual).innerHTML='<button onclick="addToPlan('+id+',0,'+cual+');" class="button-round-2 button-round-red2">Added</button>';
	var ids_n=ids+','+id;
	}
	if(act==0){
	document.getElementById('buton_add'+cual).innerHTML='<button onclick="addToPlan('+id+',1,'+cual+');" class="button-round-2 button-round-red2">Add to Myezplan</button>';
var ids_ = ids.split(',');
var ids_n=''
for (i=0;i<=(ids_.length-1);i++){
	if(ids_n == ''){coma='';}else{coma=',';}
	if(ids_[i]!=id){var ids_n=ids_n+coma+ids_[i]}
	}
	}
document.getElementById('ids_new_h').value=ids_n;
}
openexternal_media2=function(arg_url){
	if(showinfoplace_source == 'myeztravel'){$('#Myeztravel_PlaceBox').fadeOut(300);}
	if(showinfoplace_source == 'myeztravelhotdeal'){$('#Myeztravel_PlaceBox3').fadeOut(300);}
	if(showinfoplace_source == 'myeztravelviewplan'){$('#Myeztravel_PlaceBox5').fadeOut(300);}
	var $popup = $("#roadmapplace-boxmedia");
	$popup.fadeIn(300);
	$popup.find("#box-body").html('<iframe width="700" height="550" src="'+arg_url+'" frameborder="0" allowfullscreen></iframe>');
	return false;
}
openexternal_media=function(arg_url){
	//alert(showinfoplace_source);
	if(showinfoplace_source == 'myeztravel'){$('#Myeztravel_PlaceBox').fadeOut(300);}
	if(showinfoplace_source == 'myeztravelhotdeal'){$('#Myeztravel_PlaceBox3').fadeOut(300);}
	if(showinfoplace_source == 'myeztravelviewplan'){$('#Myeztravel_PlaceBox5').fadeOut(300);}
	var $popup = $("#roadmapplace-boxmedia2");
	$popup.fadeIn(300);
	$popup.find("#box-body").html('<iframe width="100%" height="452" src="'+arg_url+'" frameborder="0" allowfullscreen></iframe>');
	return false;
}
function showinfoplace_result1(response, status, xhr){
$('#Myeztravel_PlaceBox2').showLoading("Please Wait, Loading Info...",false);
	var nombre ='p_checkbox_'+showinfoplace_cont;
	var che = document.getElementById(nombre).checked;
	if(che){var chk=1}else{var chk=0}
	switch (status){
		case "error":
			console.log("error getting data: " + xhr.statusText);
			break;
		case "success":
			if(response == 0){
				console.log("no files to show.");
				break;
			}
			var url = "data_ajax/map_place_tabinfo2.cfm?rnu="+randomNumberUrl()+"";
			var urlconfig = {pid: showinfoplace_pid, action:"gettabinfo", source:showinfoplace_source,cont:showinfoplace_cont,che:chk,ids_t:ids_t};
			$("#Myeztravel_PlaceBox2").load(url,urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_PlaceBox2').empty();break;
		}
	});
			$('#Myeztravel_MapPlanBox').fadeOut(300);
			var $popup=$("#Myeztravel_PlaceBox");
			$popup.fadeIn(300);
			//selectTabIn_mostrartab("tabsx_in",0);
	}
}
myeztravel.showInfo=function(pid,cont){
//alert(pid+' '+cont)
	ids_t= document.getElementById('ids_s').value+','+document.getElementById('ids_u').value+','+document.getElementById('SP_s').value+','+document.getElementById('EP_s').value;
	showinfoplace_pid = pid;
	showinfoplace_cont = cont;
	showinfoplace_source = 'myeztravel';
	var _url = "data_ajax/map_place_tabinfo2.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {pid: showinfoplace_pid, action:"counttabs"};
	$.post(_url,_urlconfig,showinfoplace_result1);
}
function showinfoplace_result_2(response, status, xhr){
$('#Myeztravel_PlaceBox4').showLoading("Please Wait, Loading Info...",false);
//	var nombre ='p_checkbox_'+showinfoplace_cont;
//	var che = document.getElementById(nombre).checked;
//	if(che){var chk=1}else{var chk=0}
	var chk=0
	switch (status){
		case "error":
			console.log("error getting data: " + xhr.statusText);
			break;
		case "success":
			if(response == 0){
				console.log("no files to show.");
				break;
			}
			var url = "data_ajax/map_place_tabinfo2.cfm?rnu="+randomNumberUrl()+"";
			var urlconfig = {pid: showinfoplace_pid, action:"gettabinfo", source:showinfoplace_source,cont:showinfoplace_cont,che:chk,ids_t:ids_t};
			$("#Myeztravel_PlaceBox4").load(url,urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_PlaceBox4').empty();break;
		}
	});
			$('#Hotdeals-Box').fadeOut(300);
			var $popup=$("#Myeztravel_PlaceBox3");
			var T = $(window).height() / 3 - 100 / 1 + $(window).scrollTop();
			/*var	L = $(window).width() / 2 - popup.width() / 2;*/
			$popup.css({
				top: T,
			})
			$popup.fadeIn(300);
			//selectTabIn_mostrartab("tabsx_in",0);
	}
}
function showinfoplace_result_3(response, status, xhr){
$('#Myeztravel_PlaceBox6').showLoading("Please Wait, Loading Info...",false);
//	var nombre ='p_checkbox_'+showinfoplace_cont;
//	var che = document.getElementById(nombre).checked;
//	if(che){var chk=1}else{var chk=0}
	var chk=0
	switch (status){
		case "error":
			console.log("error getting data: " + xhr.statusText);
			break;
		case "success":
			if(response == 0){
				console.log("no files to show.");
				break;
			}
			var url = "data_ajax/map_place_tabinfo2.cfm?rnu="+randomNumberUrl()+"";
			var urlconfig = {pid: showinfoplace_pid, action:"gettabinfo", source:showinfoplace_source,cont:showinfoplace_cont,che:chk,ids_t:ids_t};
			$("#Myeztravel_PlaceBox6").load(url,urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_PlaceBox6').empty();break;
		}
	});
			$('#Myeztravel_PlanBox').fadeOut(300);
			var $popup=$("#Myeztravel_PlaceBox5");
			$popup.fadeIn(300);
			//selectTabIn_mostrartab("tabsx_in",0);
	}
}
myeztravel.showInfo2=function(pid,cont,ids){
	//odj_ids = document.getElementById('ids_new_h');
	ids_t= ids;
	showinfoplace_pid = pid;
	showinfoplace_cont = cont;
	showinfoplace_source = 'myeztravelhotdeal';
	var _url = "data_ajax/map_place_tabinfo2.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {pid: showinfoplace_pid, action:"counttabs"};
	$.post(_url,_urlconfig,showinfoplace_result_2);
}
myeztravel.showInfo3=function(pid){
	//odj_ids = document.getElementById('ids_new_h');
	ids_t= '0,0,0';
	showinfoplace_pid = pid;
	showinfoplace_cont = 0;
	showinfoplace_source = 'myeztravelviewplan';
	var _url = "data_ajax/map_place_tabinfo2.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {pid: showinfoplace_pid, action:"counttabs"};
	$.post(_url,_urlconfig,showinfoplace_result_3);
}
myeztravel.showInfo4_bis=function(pid){
//alert(pid);
	ids_t='';
	idch='';
	showinfoplace_pid = pid;
	showinfoplace_cont = '';
	showinfoplace_source = 'myeztravelsubplan_bis';
	var _url = "data_ajax/map_place_tabinfo2.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {pid: showinfoplace_pid, action:"counttabs"};
	$.post(_url,_urlconfig,showinfoplace_result4_bis);
}
function showinfoplace_result4_bis(response, status, xhr){
//alert(status)
$('#Myeztravel_PlaceBox8').showLoading("Please Wait, Loading Info...",false);
	var chk = 0;
	switch (status){
		case "error":
			console.log("error getting data: " + xhr.statusText);
			break;
		case "success":
			if(response == 0){
				console.log("no files to show.");
				break;
			}

			var url = "data_ajax/map_place_tabinfo2.cfm?rnu="+randomNumberUrl()+"";
			var urlconfig = {pid: showinfoplace_pid, action:"gettabinfo", source:showinfoplace_source,cont:showinfoplace_cont,che:chk,ids_t:ids_t};
			$("#Myeztravel_PlaceBox8").load(url,urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_PlaceBox8').empty();break;
		}
	});
			$('#routes_box').fadeOut(300);
			var $popup=$("#Myeztravel_PlaceBox7");
			$popup.fadeIn(300);
			//selectTabIn_mostrartab("tabsx_in",0);
	}
}
myeztravel.showInfo4=function(pid,cont,id){
	ids_t= document.getElementById('place_ids_'+cont).value;
	idch=id
	showinfoplace_pid = pid;
	showinfoplace_cont = cont;
	showinfoplace_source = 'myeztravelsubplan';
	var _url = "data_ajax/map_place_tabinfo2.cfm?rnu="+randomNumberUrl()+"";
	var _urlconfig = {pid: showinfoplace_pid, action:"counttabs"};
	$.post(_url,_urlconfig,showinfoplace_result4);
}
function showinfoplace_result4(response, status, xhr){
$('#Myeztravel_PlaceBox8').showLoading("Please Wait, Loading Info...",false);
	var nombre ='check'+idch;
	var che = document.getElementById(nombre).checked;
	if(che){var chk=1}else{var chk=0}
	switch (status){
		case "error":
			console.log("error getting data: " + xhr.statusText);
			break;
		case "success":
			if(response == 0){
				console.log("no files to show.");
				break;
			}
			var url = "data_ajax/map_place_tabinfo2.cfm?rnu="+randomNumberUrl()+"";
			var urlconfig = {pid: showinfoplace_pid, action:"gettabinfo", source:showinfoplace_source,cont:showinfoplace_cont,che:chk,ids_t:ids_t};
			$("#Myeztravel_PlaceBox8").load(url,urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_PlaceBox8').empty();break;
		}
	});
			$('#routes_box').fadeOut(300);
			var $popup=$("#Myeztravel_PlaceBox7");
			$popup.fadeIn(300);
			//selectTabIn_mostrartab("tabsx_in",0);
	}
}
myeztravel.viewhotdeals= function(city,dia){
	var ids = document.getElementById(city+'ids_'+dia).value;
	var idsu = document.getElementById(city+'ids_u'+dia).value;
	var SP=document.getElementById(city+'SP_'+dia).value;
	var EP=document.getElementById(city+'EP_'+dia).value;
	var cityname_ = document.getElementById('Ciudad2').value;
	var cityname = cityname_.split(',');
	var cname=cityname[city];
	var $popup = $("#Hotdeals-Box");
	var arg_url='myeztravel_hotdeals.cfm?rnu='+randomNumberUrl()+'&ids_='+ids+'&cityname='+cname+'&citynum='+city+'&day='+dia;
	$popup.find("#box-body").html('<iframe width="700" height="550" src="'+arg_url+'" frameborder="0" allowfullscreen></iframe>');
	var T = $(window).height() / 4.5 - 100 / 1 + $(window).scrollTop();
			/*var	L = $(window).width() / 2 - popup.width() / 2;*/
			$popup.css({
				top: T,
				
			})
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	$popup.fadeIn(300);
}
