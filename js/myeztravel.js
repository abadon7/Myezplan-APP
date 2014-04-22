showhowitworks=function(){
window.open('http://www.myezplan.com/howitworks.cfm',"_blank");
}
showsubtopics_steps_=function(ST_id,ST_order,donde){
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Faq_subtopics_steps_',stid:ST_id,storder:ST_order,donde:donde};
	$('#Faq_subtopics_steps').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Faq_subtopics_steps').empty();
		break;
		}
	});
}
showsubtopics_steps=function(ST_id){
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Faq_subtopics_steps',stid:ST_id};
	$('#Faq_subtopics_steps').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Faq_subtopics_steps').empty();
		break;
		}
	});
}
showsubtopics=function(T_id){
	$('#Faq_subtopics_steps').empty();
	var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Faq_subtopics',tid:T_id};
	$('#Faq_subtopics').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Faq_subtopics').empty();
		break;
		}
	});
}
closefaq=function(){
		//alert('HELP');
		$('#mask-faq').fadeOut(300);
		$('#myeztravel-faq').fadeOut(300);
		$('#mask-faq').remove(this);
}
myeztravel.saveeditcity=function(num){
		var Air = document.getElementById('Air-Consulta3').value;
		var Hotel = document.getElementById('Hotels-Consulta3').value;
		var Atractions = document.getElementById('Atractions-Consulta3').value;
		if (Air == 0 && Hotel == 0 && Atractions == 0){alert('Please Select at least one Category (Air,Hotels or Attractions)'); return false;}
		var Date_1=$("#Datepicker5" ).val();
		if (Date_1 ==''){alert('Please Select a Valid Departure Date'); $("#Datepicker5" ).focus();  return false;}
		var Date_2=$("#Datepicker6" ).val();
		if (Date_2 ==''){alert('Please Select a Valid End Date'); $("#Datepicker6" ).focus();  return false;}
		var date1_ = new fecha(Date_1)     
	   	var date2_ = new fecha(Date_2) 
	    var miFechaI = new Date(date1_.anio, date1_.mes, date1_.dia );
	    var miFechaF = new Date(date2_.anio, date2_.mes, date2_.dia );
	    var diferencia =  miFechaF.getTime()- miFechaI.getTime();
		var dias_t = Math.floor(diferencia / (1000 * 60 * 60 * 24));
		if(dias_t<0){alert('Please Select a Valid End Date'); $("#Datepicker6" ).focus(); return false;} 
		if(dias_t<1 && Hotel==1){alert('To view hotels you have to include at least one night in your dates, Please Select a Valid End Date or deactivate the Hotels button'); $("#Datepicker6" ).focus(); return false;}
		var Ciudad_1_=$('#Ciudad_sel5').val();
		if (Ciudad_1_ =='' && Air ==1){alert('Please Enter a Valid Departure City');$("#Ciudad_sel5" ).focus();  return false;}
		var Ciudad_ = Ciudad_1_.split(',');
		var Ciudad_1=Ciudad_[0];
		var Ciudad_1=Ciudad_1.replace(/ /g,'%20');
		var Ciudad_2_=$('#Ciudad_sel6').val();
		if (Ciudad_2_ ==''){alert('Please Enter a Valid Destination City'); $("#Ciudad_sel6" ).focus();  return false;}
		var Ciudad__ = Ciudad_2_.split(',');
		var Ciudad_2_=Ciudad__[0];
		var Ciudad_2=Ciudad_2_.replace(/ /g,'%20');
		var ciudad=document.getElementById('contador_Ciudades').value;
		myeztravel.updatecity(num,Air,Hotel,Atractions,Date_1,Date_2,Ciudad_1,Ciudad_2);
		//myeztravel.Addcity(Air,Hotel,Atractions,Date_1,Date_2,Ciudad_1,Ciudad_2);
		myeztravel.Createcity(num,Ciudad_2_,Date_1);
		if(Hotel ==1){
		myeztravel.LoadHotels('',Date_1,Date_2,Ciudad_2,'','000000',ciudad);}
		if(Air==1){}
		if(Atractions==1){
		myeztravel.LoadAtrac(Date_1,Date_2,Ciudad_2,ciudad);}
		//myeztravel.Loadresults(Air,Hotel,Atractions,Ciudad_1,Ciudad_2,Date_1,Date_2);
		$('#mask').fadeOut(300);
		$('#myeztravel-box3').fadeOut(300);	
}
myeztravel.updatecity=function(num,Air,Hotel,Atractions,Date_1,Date_2,Ciudad_1,Ciudad_2){
	var nombre = '#div_City_'+num;
	$(nombre).remove();
	var fecha1_ = document.getElementById('Date1').value;
	var fecha1=fecha1_.split(',');
	var fecha2_ = document.getElementById('Date2').value;
	var fecha2=fecha2_.split(',');
	var air_ = document.getElementById('air').value;
	var _air=air_.split(',');
	var hotel_ = document.getElementById('hotel').value;
	var _hotel=hotel_.split(',');
	var atrac_ = document.getElementById('atrac').value;
	var _atrac=atrac_.split(',');
	var city1_ = document.getElementById('Ciudad1').value;
	var city1=city1_.split(',');
	var city2_ = document.getElementById('Ciudad2').value;
	var city2=city2_.split(',');
	var dt_='';
	for(a=0;a<=((fecha1.length)-1);a++){
		if(a==0){coma='';}else{coma=',';}
		if(a==num){dt_=dt_+coma+Date_1;}else{dt_=dt_+coma+fecha1[a];}
		document.getElementById('Date1').value=dt_;}
	var dt_='';
	for(a=0;a<=((fecha2.length)-1);a++){
		if(a==0){coma='';}else{coma=',';}
		if(a==num){dt_=dt_+coma+Date_2;}else{dt_=dt_+coma+fecha2[a];}
		document.getElementById('Date2').value=dt_;}
	var dt_='';
	for(a=0;a<=((_air.length)-1);a++){
		if(a==0){coma='';}else{coma=',';}
		if(a==num){dt_=dt_+coma+Air;}else{dt_=dt_+coma+_air[a];}
		document.getElementById('air').value=dt_;}
	var dt_='';
	for(a=0;a<=((_atrac.length)-1);a++){
		if(a==0){coma='';}else{coma=',';}
		if(a==num){dt_=dt_+coma+Atractions;}else{dt_=dt_+coma+_atrac[a];}
		document.getElementById('atrac').value=dt_;}
	var dt_='';
	for(a=0;a<=((_hotel.length)-1);a++){
		if(a==0){coma='';}else{coma=',';}
		if(a==num){dt_=dt_+coma+Hotel;}else{dt_=dt_+coma+_hotel[a];}
		document.getElementById('hotel').value=dt_;}
	var dt_='';
	for(a=0;a<=((city1.length)-1);a++){
		if(a==0){coma='';}else{coma=',';}
		if(a==num){dt_=dt_+coma+Ciudad_1;}else{dt_=dt_+coma+city1[a];}
		document.getElementById('Ciudad1').value=dt_;}
	var dt_='';
	for(a=0;a<=((city2.length)-1);a++){
		if(a==0){coma='';}else{coma=',';}
		if(a==num){dt_=dt_+coma+Ciudad_2;}else{dt_=dt_+coma+city2[a];}
		document.getElementById('Ciudad2').value=dt_;}
	myeztravel.CalcDates();	
//if(fecha1.length != 1){
//var fecha1_ = document.getElementById('Date1').value;
//var fecha1=fecha1_.split(',');
//var date1 = '12/31/3000';
//for (f=0;f<=(fecha1.length-1);f++){
//if(fecha1[f]<date1){date1 = fecha1[f]}
//}
//var fecha2_ = document.getElementById('Date2').value;
//var fecha2=fecha2_.split(',');
//var date2 = '01/01/1900';
//for (f=0;f<=(fecha2.length-1);f++){
//if(fecha2[f]>date2){date2 = fecha2[f]}
//}
//	var date1_ = new fecha(date1)     
//   	var date2_ = new fecha(date2) 
//    var miFechaI = new Date(date1_.anio, date1_.mes, date1_.dia );
//    var miFechaF = new Date(date2_.anio, date2_.mes, date2_.dia );
//    var diferencia =  miFechaF.getTime()- miFechaI.getTime()   
//    var dias_t = Math.floor(diferencia / (1000 * 60 * 60 * 24))
//	var dias_t = dias_t +1;
//	alert(dias_t);
//	for (f=0;f<=((fecha1.length)-1);f++){
//	if(f!=num){
//		fecha1_p = fecha1[f];
//		fecha2_p = fecha2[f];
//	    if(fecha1_p!='12/31/3000'){
//			var fechap1 = new fecha(fecha1_p)     
//	    	var fechap2 = new fecha(fecha2_p) 
//			var miFechap1 = new Date( fechap1.anio, fechap1.mes, fechap1.dia )  
//	    	var miFechap2 = new Date( fechap2.anio, fechap2.mes, fechap2.dia )
//	    	var diferencia =  miFechap2.getTime()- miFechap1.getTime();
//	    	var dias_p = Math.floor(diferencia / (1000 * 60 * 60 * 24));
//			var dias_p = dias_p +1;
//			var dist_i = miFechap1.getTime()- miFechap1.getTime(); 
//	    	var dias_i = Math.floor(dist_i / (1000 * 60 * 60 * 24));
//			var dias_i = dias_i +1;
//		}
//		var numero=0;
//		for(x=1;x<=dias_p;x++){
//			var dia=dias_i+numero;
//			//alert(dia+' '+dias_t);
//			var nombre='span_'+f+'_'+x;
//			//alert(nombre);
//			var texto='Day '+dia+' of <span id="span2_'+f+'_'+x+'">'+dias_t+'</span>';
//			document.getElementById(nombre).innerHTML= texto;
//			var numero=numero+1;
//			}
//	}
//		}
//}
}
myeztravel.ac_air=function(){
var Air = document.getElementById('Air-Consulta3').value;
	if(Air==1){
		document.getElementById('Air-Consulta3').value = 0;
		document.getElementById('div_air3').innerHTML='<a id="myeztravel-button-Air" class="button-round-2 button-round-grey2" href="#" style="text-decoration:none; font-size:12px;">Air</a>';
		}
	else{document.getElementById('Air-Consulta3').value = 1;
	document.getElementById('div_air3').innerHTML= '<a id="myeztravel-button-Air" class="button-round-2 button-round-red2" href="#" style="text-decoration:none; font-size:12px;">Air</a>';
	}
}
myeztravel.ac_atrac=function(){
var Air = document.getElementById('Atractions-Consulta3').value;
	if(Air==1){
		document.getElementById('Atractions-Consulta3').value = 0;
		document.getElementById('div_atraction3').innerHTML='<a id="myeztravel-button-Atractions" class="button-round-2 button-round-grey2" href="#" style="text-decoration:none; font-size:12px;">Atractions</a>';
		}
	else{document.getElementById('Atractions-Consulta3').value = 1;
	document.getElementById('div_atraction3').innerHTML= '<a id="myeztravel-button-Atractions" class="button-round-2 button-round-red2" href="#" style="text-decoration:none; font-size:12px;">Atractions</a>';
	}
}
myeztravel.ac_hotel=function(){
var Air = document.getElementById('Hotels-Consulta3').value;
	if(Air==1){
		document.getElementById('Hotels-Consulta3').value = 0;
		document.getElementById('div_hotel3').innerHTML='<a id="myeztravel-button-Hotels" class="button-round-2 button-round-grey2" href="#" style="text-decoration:none; font-size:12px;">Hotels</a>';
		}
	else{document.getElementById('Hotels-Consulta3').value = 1;
	document.getElementById('div_hotel3').innerHTML= '<a id="myeztravel-button-Hotels" class="button-round-2 button-round-red2" href="#" style="text-decoration:none; font-size:12px;">Hotels</a>';
	}
}
myeztravel.edit_city=function(num){
//alert(num);
var fecha_I_ = document.getElementById('Date1').value;
var fecha_I = fecha_I_.split(',');
var fechaI=fecha_I[num];
var fecha_F_ = document.getElementById('Date2').value;
var fecha_F = fecha_F_.split(',');
var fechaF=fecha_F[num];
var ciudad_1=document.getElementById('Ciudad1').value;
var ciudad_1_=ciudad_1.split(',');
var ciudad1=ciudad_1_[num];
var ciudad_2=document.getElementById('Ciudad2').value;
var ciudad_2_=ciudad_2.split(',');
var ciudad2=ciudad_2_[num];
var air_ = document.getElementById('air').value;
var _air = air_.split(',');
var air=_air[num];
var hotel_ = document.getElementById('hotel').value;
var _hotel = hotel_.split(',');
var hotel=_hotel[num];
var atrac_ = document.getElementById('atrac').value;
var _atrac = atrac_.split(',');
var atrac=_atrac[num];
		var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'EditCity2',num:num,ciudad1:ciudad1,ciudad2:ciudad2,fechaI:fechaI,fechaF:fechaF,air:air,hotel:hotel,atrac:atrac};
	$('#body_myeztravel-box3').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#body_myeztravel-box3').empty();
		break;
		}
	});
	$popup = $('#myeztravel-box3');
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
//alert(ciudad1+' '+ciudad2+' '+fechaI+' '+fechaF+' '+air+hotel+atrac);
}
myeztravel.savemapplan=function(city,dia){
    var ids =document.getElementById('ids_s').value;
	var idsu=document.getElementById('ids_u').value;
	var sp =document.getElementById('SP_s').value;
	var ep =document.getElementById('EP_s').value;
	var rt = document.getElementById('ruta_s').value;
	if(ids==''){
	var conf = confirm('You are saving a plan without any place, this plan will be eliminated, Are You Sure?');
	if(conf){
	$('#Myeztravel_MapPlanBox').fadeOut(300);
	$('#Myeztravel_MapPlanBox2').empty();
	$('#mask').fadeOut(300);
	$('#mask').remove();	
	delatracday(city,dia);
	}
	return false;
	}
	document.getElementById(city+'ids_'+dia).value=ids;
	document.getElementById(city+'ids_u'+dia).value=idsu;
	document.getElementById(city+'ruta_'+dia).value=rt;
	document.getElementById(city+'SP_'+dia).value=sp;
	document.getElementById(city+'EP_'+dia).value=ep;	
$('#Myeztravel_PlanBox2').showLoading("Please Wait, Searching for Route...",false);
	var hotel_ = document.getElementById('hotel').value;
	var hotel=hotel_.split(',');
	var tienehtl=hotel[city];
	//alert(tienehtl);
	var ids = document.getElementById(city+'ids_'+dia).value;
	var r_modificada = document.getElementById(city+'ruta_'+dia).value;
	if(tienehtl==1){
	var htl_id=document.getElementById(city+'id_selected').value;
	var htlnum = document.getElementById(city+'counter_selected').value;
	var htlname= document.getElementById(city+'hotl_n'+htlnum).value;
	var htlcoordenadas= document.getElementById(city+'hotl_c'+htlnum).value;
	var htlimage= document.getElementById(city+'hotl_i'+htlnum).value;
	var htlrating= document.getElementById(city+'hotl_r'+htlnum).value;      
	var htlcoordenadas_ = htlcoordenadas.replace('(','').replace(')','').split('/');
	var htllat = htlcoordenadas_[0];
	var htllng = htlcoordenadas_[1];	
	var SP=document.getElementById(city+'SP_'+dia).value;
	var EP=document.getElementById(city+'EP_'+dia).value;
	}
	else{
	varhtlnum=0;
	var htl_id='';
	var htlname= '';
	var htlimage= '';
	var htlrating= '';      
	var htllat = '';
	var htllng = '';	
	if(r_modificada==0){
	var ids_=ids.split(',');
	for(x=0;x<=(ids_.length-1);x++){
	if(x==0){var SP=ids_[x];}
	var EP=ids_[x];
	}
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
	var _url = "data_ajax/myeztravel_content2.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'planbox',ids_:ids,name_:htlname,htllat:htllat,htllng:htllng,ruta:r_modificada,city:city,dia:dia,sp_:SP,ep_:EP,cityname:cname,diast:dias_t,himage:htlimage,hrating:htlrating,htl_id:htl_id,htlnum:htlnum};
	$('#Myeztravel_PlanBox2').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_PlanBox2').empty();
		break;
		}
	});
	$('#Myeztravel_MapPlanBox').fadeOut(300);
	$('#Myeztravel_MapPlanBox2').empty();
	var $popup=$("#Myeztravel_PlanBox");
	$popup.fadeIn(300)
}
myeztravel.addpoint2=function(num){
var nombre ='p_checkbox_'+num;
var che = document.getElementById(nombre).checked;
var nombre ='idpuntos_'+num;
var id = document.getElementById(nombre).value;
var ids = document.getElementById('ids_s').value;
var idsu = document.getElementById('ids_u').value;
//alert(che+' '+id+' '+ids+' '+idsu);
if(che){
var ids=ids+','+id;
document.getElementById('ids_s').value=ids;
//alert(idsu);
var ids_ = idsu.split(',');
var ids_n=''
for (i=0;i<=(ids_.length-1);i++){
	if(ids_n == ''){coma='';}else{coma=',';}
	if(ids_[i]!=id){var ids_n=ids_n+coma+ids_[i]}
	}
//alert(ids_n);
document.getElementById('ids_u').value=ids_n;
showsel = false;
Showsel(0,0);
}
else{
//alert(ids);
if(idsu==''){coma = ''}else{coma=','}
var ids_=idsu+coma+id;
document.getElementById('ids_u').value=ids_;
var ids_ = ids.split(',');
var ids_n=''
for (i=0;i<=(ids_.length-1);i++){
	if(ids_n == ''){coma='';}else{coma=',';}
	if(ids_[i]!=id){var ids_n=ids_n+coma+ids_[i]}
	}
document.getElementById('ids_s').value=ids_n;
showsel = false;
Showsel(0,0);
}
}
myeztravel.delpointrouteplan=function(num){
document.getElementById('div_'+num).remove();
modificarrutaplan();
}
myeztravel.delpoint=function(num){
//document.getElementById('ruta_s').value=1;
var nombre ='idpuntos_'+num;
var id = document.getElementById(nombre).value;
var ids = document.getElementById('ids_s').value;
var ids_ = ids.split(',');
var ids_n=''
for (i=0;i<=(ids_.length-1);i++){
	if(ids_n == ''){coma='';}else{coma=',';}
	if(ids_[i]!=id){var ids_n=ids_n+coma+ids_[i]}
	}
//alert(ids_n);
document.getElementById('ids_s').value=ids_n;
var idsu = document.getElementById('ids_u').value;
var ids_ = idsu.split(',');
var ids_n=''
for (i=0;i<=(ids_.length-1);i++){
	if(ids_n == ''){coma='';}else{coma=',';}
	if(ids_[i]!=id){var ids_n=ids_n+coma+ids_[i]}
	}
//alert(ids_n);
document.getElementById('ids_u').value=ids_n;
showsel = false;
Showsel(0,0);
}
myeztravel.addpoint=function(num){
//document.getElementById('ruta_s').value= 0;
var nombre ='p_checkbox_'+num;
var che = document.getElementById(nombre).checked;
var nombre ='idpuntos_'+num;
var id = document.getElementById(nombre).value;
var ids = document.getElementById('ids_s').value;
var sp_= document.getElementById("SP_s").value;
var ep_= document.getElementById("EP_s").value;
//alert(che+' '+id+' '+ids);
if(che){
if(ids!=''){
	coma=',';
	if(ids==sp_){document.getElementById("EP_s").value=id;};
}else{
	coma='';
	document.getElementById('ruta_s').value=0;
	if(sp_==''){document.getElementById("SP_s").value=id;};
	if(ep_==''){document.getElementById("EP_s").value=id;};
	}
var ids=ids+coma+id;
document.getElementById('ids_s').value=ids;
}
else{
var ids_ = ids.split(',');
var ids_n=''
for (i=0;i<=(ids_.length-1);i++){
	if(ids_n == ''){coma='';}else{coma=',';}
	if(ids_[i]!=id){var ids_n=ids_n+coma+ids_[i]}
	}
//alert(ids_n);
document.getElementById('ids_s').value=ids_n;
}
}
myeztravel.vieweditatrmap=function(city,dia){
$('#Myeztravel_MapPlanBox2').showLoading("Please Wait, Loading Plan Data...",false);
	var hotel_ = document.getElementById('hotel').value;
	var hotel=hotel_.split(',');
	var tienehtl=hotel[city];
	if(tienehtl==1){
	var htl_id=document.getElementById(city+'id_selected').value;
	var htlnum = document.getElementById(city+'counter_selected').value;
	var htlname= document.getElementById(city+'hotl_n'+htlnum).value;
	var htlcoordenadas= document.getElementById(city+'hotl_c'+htlnum).value;
	var htlimage= document.getElementById(city+'hotl_i'+htlnum).value;
	var htlrating= document.getElementById(city+'hotl_r'+htlnum).value;      
	var htlcoordenadas_ = htlcoordenadas.replace('(','').replace(')','').split('/');
	var htllat = htlcoordenadas_[0];
	var htllng = htlcoordenadas_[1];	
	var SP=document.getElementById(city+'SP_'+dia).value;
	var EP=document.getElementById(city+'EP_'+dia).value;
	}
	else{
	varhtlnum=0;
	var htl_id='';
	var htlname= '';
	var htlimage= '';
	var htlrating= '';      
	var htllat = '';
	var htllng = '';	
	}

	var ids = document.getElementById('new_order').value;
	var idsu = document.getElementById(city+'ids_u'+dia).value;
	var r_modificada = 1
	var SP=document.getElementById('new_SP').value;
	var EP=document.getElementById('new_EP').value;

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
	var _url = "data_ajax/myeztravel_content2.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'editplanbox',ids_:ids,name_:htlname,htllat:htllat,htllng:htllng,ruta:r_modificada,city:city,dia:dia,sp_:SP,ep_:EP,cityname:cname,diast:dias_t,himage:htlimage,hrating:htlrating,ids_u:idsu};
	$('#Myeztravel_MapPlanBox2').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_MapPlanBox2').empty();
		break;
		}
	});
	var $popup=$("#Myeztravel_PlanBox");
	$popup.fadeOut(300);
	var $popup=$("#Myeztravel_MapPlanBox");
	var popMargTop=($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	$popup.fadeIn(300);
	var nombre='Myeztravel_MapPlanBox';
	document.getElementById(nombre).scrollIntoView();		
}
myeztravel.saveplanruta=function(city,dia){
var cadena=document.getElementById('new_order').value;
var SP = document.getElementById('new_SP').value;
var EP = document.getElementById('new_EP').value;
var ruta=document.getElementById('new_ruta').value;
if(cadena==''){
	var conf = confirm('You are saving a plan without any place, this plan will be eliminated, Are You Sure?');
	if(conf){
	$('#Myeztravel_PlanBox').fadeOut(300);
	$('#Myeztravel_PlanBox2').empty();
	$('#mask').fadeOut(300);
	$('#mask').remove();	
	delatracday(city,dia);
	}
	return false;}
getatrac(city,dia,cadena,0)
document.getElementById(city+'ids_'+dia).value=cadena;
document.getElementById(city+'ruta_'+dia).value=ruta;
document.getElementById(city+'SP_'+dia).value=SP;
document.getElementById(city+'EP_'+dia).value=EP;
		$('#mask').fadeOut(300);
		$('#Myeztravel_PlanBox').fadeOut(300);
		$('#mask').remove();
		$('#Myeztravel_PlanBox2').empty();
}

myeztravel.viewatrsubmap=function(sublat,sublng,subname,subplace,page,placeid){
var ids = document.getElementById("new_order").value;
var SP=document.getElementById("new_SP").value;
var EP= document.getElementById("new_EP").value;
var ruta=document.getElementById('new_ruta').value;
if(ids == ''){
	document.getElementById('view_map_sub_but').innerHTML='View Map';
	document.getElementById('subplanrutamap').style.display='none';
	document.getElementById('view_map_sub_but').className='button-round-2 button-round-lgray3';
	if(showmap){alert('This Plan is Empty, Please Edit Plan');}
	showmap=true;
	return false;
	}
if(!showmap){
	showmap=true;
	document.getElementById('view_map_sub_but').innerHTML='View Map';
	document.getElementById('subplanrutamap').style.display='none';
	document.getElementById('view_map_sub_but').className='button-round-2 button-round-lgray3';
	}
else{
	showmap=false;
$('#subplanrutamap').showLoading("Please Wait, Updating map...",false);
	document.getElementById('view_map_sub_but').innerHTML='Hide Map';
	document.getElementById('subplanrutamap').style.display='block';
	document.getElementById('view_map_sub_but').className='button-round-2 button-round-blue3';
	}
	var _url = "data_ajax/myeztravel_content2.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'subplanmap',sublat:sublat,sublng:sublng,subname:subname,subplace:subplace,ids:ids,SP:SP,EP:EP,ruta:ruta,page:page,placeid:placeid};
	$('#subplanrutamap').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#subplanrutamap').empty();
		break;
		}
	});
}
myeztravel.viewatrsubplan_p=function(city,dia,cityname,diast,placeid,subplaces,paginas,numpag){
$('#Myeztravel_PlanBox2').showLoading("Please Wait, Searching for Route...",false);
	var _url = "data_ajax/myeztravel_content2.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'subplanbox',city:city,dia:dia,cityname:cityname,diast:diast,placeid:placeid,subplaces:subplaces,paginas:paginas,page:numpag};
	$('#Myeztravel_PlanBox2').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_PlanBox2').empty();
		break;
		}
	});
}
myeztravel.viewatrsubplan=function(city,dia,placeid,subplaces){
$('#Myeztravel_PlanBox2').showLoading("Please Wait, Searching for Route...",false);
	if(vienedeplan){vienedeplan_C=city;vienedeplan_D=dia;}
var subplace_=subplaces.split('!');
var subplaces_='';
var paginas=0;
for(s=0;s<=(subplace_.length-1);s++){
if(subplaces_==''){var divi='';}else{var divi='!';}
//alert(subplace_[s]);
var paginas=paginas+1;
var ids =$('#'+nombre3+' input[name="'+city+'ids_'+dia+'_'+placeid+'_'+subplace_[s]+'"]').val() || 0;
var ruta =$('#'+nombre3+' input[name="'+city+'ids_'+dia+'_'+placeid+'_'+subplace_[s]+'_R"]').val() || 0;
var subplaces_=subplaces_+divi+subplace_[s]+'/'+ids+'/'+ruta;
}
//alert(subplaces_);
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
	var _url = "data_ajax/myeztravel_content2.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'subplanbox',city:city,dia:dia,cityname:cname,diast:dias_t,placeid:placeid,subplaces:subplaces_,paginas:paginas,page:1};
	$('#Myeztravel_PlanBox2').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_PlanBox2').empty();
		break;
		}
	});
	var $popup=$("#Myeztravel_PlanBox");
	var popMargTop=($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	var nombre='Myeztravel_PlanBox';
	document.getElementById(nombre).scrollIntoView();	
}
myeztravel.viewatrplan=function(city,dia){
$('#Myeztravel_PlanBox2').showLoading("Please Wait, Searching for Route...",false);
	var hotel_ = document.getElementById('hotel').value;
	var hotel=hotel_.split(',');
	var tienehtl=hotel[city];
	//alert(tienehtl);
	var ids = document.getElementById(city+'ids_'+dia).value;
	var r_modificada = document.getElementById(city+'ruta_'+dia).value;
	if(tienehtl==1){
	var htl_id=document.getElementById(city+'id_selected').value;
	var htlnum = document.getElementById(city+'counter_selected').value;
	var htlname= document.getElementById(city+'hotl_n'+htlnum).value;
	var htlcoordenadas= document.getElementById(city+'hotl_c'+htlnum).value;
	var htlimage= document.getElementById(city+'hotl_i'+htlnum).value;
	var htlrating= document.getElementById(city+'hotl_r'+htlnum).value;      
	var htlcoordenadas_ = htlcoordenadas.replace('(','').replace(')','').split('/');
	var htllat = htlcoordenadas_[0];
	var htllng = htlcoordenadas_[1];	
	var SP=document.getElementById(city+'SP_'+dia).value;
	var EP=document.getElementById(city+'EP_'+dia).value;
	}
	else{
	varhtlnum=0;
	var htl_id='';
	var htlname= '';
	var htlimage= '';
	var htlrating= '';      
	var htllat = '';
	var htllng = '';	
	if(r_modificada==0){
	var ids_=ids.split(',');
	for(x=0;x<=(ids_.length-1);x++){
	if(x==0){var SP=ids_[x];}
	var EP=ids_[x];
	}
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
	var _url = "data_ajax/myeztravel_content2.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'planbox',ids_:ids,name_:htlname,htllat:htllat,htllng:htllng,ruta:r_modificada,city:city,dia:dia,sp_:SP,ep_:EP,cityname:cname,diast:dias_t,himage:htlimage,hrating:htlrating,htl_id:htl_id,htlnum:htlnum};
	$('#Myeztravel_PlanBox2').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_PlanBox2').empty();
		break;
		}
	});
	var $popup=$("#Myeztravel_PlanBox");
	var popMargTop=($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	var nombre='Myeztravel_PlanBox';
	document.getElementById(nombre).scrollIntoView();	
}
myeztravel.viewatrmap=function(city,dia){
	var hotel_ = document.getElementById('hotel').value;
	var hotel=hotel_.split(',');
	var tienehtl=hotel[city];
	if(tienehtl==1){
	var htl_id=document.getElementById(city+'id_selected').value;
	var htlnum = document.getElementById(city+'counter_selected').value;
	var htlname= document.getElementById(city+'hotl_n'+htlnum).value;
	var htlcoordenadas= document.getElementById(city+'hotl_c'+htlnum).value;
	var htlimage= document.getElementById(city+'hotl_i'+htlnum).value;
	var htlrating= document.getElementById(city+'hotl_r'+htlnum).value;      
	var htlcoordenadas_ = htlcoordenadas.replace('(','').replace(')','').split('/');
	var htllat = htlcoordenadas_[0];
	var htllng = htlcoordenadas_[1];	
	}
	else{
	var htlnum=0;
	var htl_id='';
	var htlname= '';
	var htlimage= '';
	var htlrating= '';      
	var htllat = '';
	var htllng = '';	
	}
	var ids = document.getElementById('new_order').value;
	var SP=document.getElementById('new_SP').value;
	var EP=document.getElementById('new_EP').value;	
	var r_modificada=document.getElementById('new_ruta').value;
	if(ids==''){
	document.getElementById('view_map_but').innerHTML='View Map';
	document.getElementById('view_map_but').className='button-round-2 button-round-lgray3';
	document.getElementById('planrutamap').style.display='none'
		alert('This plan is empty, please Edit Plan');
		return false;
		}
if(planrutamap){
	planrutamap=false;
	document.getElementById('view_map_but').innerHTML='Show Map';
	document.getElementById('view_map_but').className='button-round-2 button-round-lgray3';
	document.getElementById('planrutamap').style.display='none'}
else{
	planrutamap=true;
$('#planrutamap').showLoading("Please Wait, Updating map...",false);
	document.getElementById('view_map_but').innerHTML='Hide Map';
	document.getElementById('view_map_but').className='button-round-2 button-round-blue3';
	document.getElementById('planrutamap').style.display='block'}
	var _url = "data_ajax/myeztravel_content2.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'planmap',ids_:ids,htlnum:htlnum,name_:htlname,htllat:htllat,htllng:htllng,ruta:r_modificada,city:city,dia:dia,sp_:SP,ep_:EP,htl_id:htl_id};
	$('#planrutamap').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_PlanMap2').empty();
		break;
		}
	});
//	var $popup=$("#Myeztravel_PlanBox");
//	$popup.fadeOut(300);
//	var $popup=$("#Myeztravel_PlanMap");
//	var popMargTop=($popup.height() + 24) / 2; 
//	var popMargLeft=($popup.width() + 24) / 2; 
//	$popup.fadeIn(300);
////	$('body').append('<div id="mask" class="mask"></div>');
////	$('#mask').fadeIn(300);
//	var nombre='Myeztravel_PlanMap';
//	document.getElementById(nombre).scrollIntoView();
}
atracday=function(num,num2){
var nombre = '#div_showagain_'+num+'day_'+num2;
$(nombre).remove();
var nombre ='#div_'+num+'_atrac_sel_day_'+num2;
$(nombre).show();
}
delatracday=function(num,num2){
var conf= confirm('You are going to delete this day atractions and all it´s components, are you sure?');
if(conf){
var nombre2='<div id="div_showagain_'+num+'day_'+num2+'" align="center"><span class="button-round-2 button-round-blue2" title="Charge this day´s atracctions" onclick="atracday('+num+','+num2+');">Reload Atractions</span></div>';
var nombre ='#div_'+num+'_atrac_sel_day_'+num2;
$( nombre2 ).insertBefore( nombre );
$(nombre).hide();}
//document.getElementById(nombre).style.display='none';
else{return false;}
}
myeztravel.Cartclose= function(){
	$popup = $('#Myeztravel_Cart');
	$popup.fadeOut(300);
	if(planbox){
		$('#Myeztravel_PlanBox').fadeIn(300);}
	else{
	$('#mask').fadeOut(300);
	$('#mask').remove();
	}
}
Showcart2=function(){
	planbox=true;	
		$('#mask').fadeOut(300);
		$('#Myeztravel_PlanBox').fadeOut(300);
		$('#mask').remove();
		//$('#Myeztravel_PlanBox2').empty();
	var ciudades_ = document.getElementById('Ciudad2').value;
	var fechas1_ = document.getElementById('Date1').value;
	var fechas2_ = document.getElementById('Date2').value;
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'ShowCart',ciudades:ciudades_,fechas1:fechas1_,fechas2:fechas2_};
	$('#Myeztravel_Cart').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_Cart').empty();
		break;
		}
	});
	$popup = $('#Myeztravel_Cart');
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
}
Showcart=function(){
	planbox=false;
	var ciudades_ = document.getElementById('Ciudad2').value;
	var fechas1_ = document.getElementById('Date1').value;
	var fechas2_ = document.getElementById('Date2').value;
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'ShowCart',ciudades:ciudades_,fechas1:fechas1_,fechas2:fechas2_};
	$('#Myeztravel_Cart').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#Myeztravel_Cart').empty();
		break;
		}
	});
	$popup = $('#Myeztravel_Cart');
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
}
valor_fecha2=function(num,valor){
var num2=num+1;
var nombre='Datepicker'+num2;
document.getElementById(nombre).value=valor;
//alert(nombre+' '+valor);
}
myeztravel.delcity=function(num){
var conf= confirm('You are going to delete this city and all it´s components, are you sure?');
if(conf){
	var fecha1_ = document.getElementById('Date1').value;
	var fecha1=fecha1_.split(',');
	var fecha2_ = document.getElementById('Date2').value;
	var fecha2=fecha2_.split(',');
	if(fecha1.length==1){myeztravel.newagain(1);}
	var dt_='';
	for(a=0;a<=((fecha1.length)-1);a++){
		if(a==0){coma='';}else{coma=',';}
		if(a==num){dt_=dt_+coma+'12/31/3000';}else{dt_=dt_+coma+fecha1[a];}
		document.getElementById('Date1').value=dt_;}
	var dt_='';
	for(a=0;a<=((fecha2.length)-1);a++){
		if(a==0){coma='';}else{coma=',';}
		if(a==num){dt_=dt_+coma+'01/01/1900';}else{dt_=dt_+coma+fecha2[a];}
		document.getElementById('Date2').value=dt_;}
	var nombre = '#div_City_'+num;
	$(nombre).remove();
	myeztravel.CalcDates();	
var fecha1_ = document.getElementById('Date1').value;
var fecha1=fecha1_.split(',');
var date1 = '12/31/3000';
for (f=0;f<=(fecha1.length-1);f++){
if(fecha1[f]<date1){date1 = fecha1[f]}
}
var fecha2_ = document.getElementById('Date2').value;
var fecha2=fecha2_.split(',');
var date2 = '01/01/1900';
for (f=0;f<=(fecha2.length-1);f++){
if(fecha2[f]>date2){date2 = fecha2[f]}
}
	var date1_ = new fecha(date1)     
   	var date2_ = new fecha(date2) 
    var miFechaI = new Date(date1_.anio, date1_.mes, date1_.dia );
    var miFechaF = new Date(date2_.anio, date2_.mes, date2_.dia );
    var diferencia =  miFechaF.getTime()- miFechaI.getTime()   
    var dias_t = Math.floor(diferencia / (1000 * 60 * 60 * 24))
	var dias_t = dias_t +1;
	for (f=0;f<=((fecha1.length)-1);f++){
		fecha1_p = fecha1[f];
		fecha2_p = fecha2[f];
	    if(fecha1_p!='12/31/3000'){
			var fechap1 = new fecha(fecha1_p)     
	    	var fechap2 = new fecha(fecha2_p) 
			var miFechap1 = new Date( fechap1.anio, fechap1.mes, fechap1.dia )  
	    	var miFechap2 = new Date( fechap2.anio, fechap2.mes, fechap2.dia )
	    	var diferencia =  miFechap2.getTime()- miFechap1.getTime();
	    	var dias_p = Math.floor(diferencia / (1000 * 60 * 60 * 24));
			var dias_p = dias_p +1;
			var dist_i = miFechap1.getTime()- miFechap1.getTime(); 
	    	var dias_i = Math.floor(dist_i / (1000 * 60 * 60 * 24));
			var dias_i = dias_i +1;
		}
		var numero=0;
		for(x=1;x<=dias_p;x++){
			var dia=dias_i+numero;
			//alert(dia+' '+dias_t);
			var nombre='span_'+f+'_'+x;
			//alert(nombre);
			var texto='Day '+dia+' of <span id="span2_'+f+'_'+x+'">'+dias_t+'</span>';
			document.getElementById(nombre).innerHTML= texto;
			var numero=numero+1;
			}
		}
}else{return false;}
}
myeztravel.showhide_ahat=function(cual,num){
var air_ = document.getElementById('air').value;
var air = air_.split(',');
var valor_a=air[num];
var hotel_ = document.getElementById('hotel').value;
var hotel = hotel_.split(',');
var valor_h=hotel[num];
var atrac_ = document.getElementById('atrac').value;
var atrac =  atrac_.split(',');
var valor_at=atrac[num];
if(cual==1){
var dt_ = ''
var nombre='but_a_'+num;
if(valor_a==1){
	if(valor_h==0 && valor_at==0){myeztravel.delcity(num);}else{
	var valor_a = 0;document.getElementById(nombre).className='button-round-2 button-round-grey2';}
}else{
	var valor_a = 1;document.getElementById(nombre).className='button-round-2 button-round-red2';}
for(a=0;a<=((air.length)-1);a++){
if(a==0){coma='';}else{coma=',';}
if(a==num){dt_=dt_+coma+valor_a;}else{dt_=dt_+coma+air[a];}
document.getElementById('air').value=dt_;}
}
if(cual==2){
var dt_ = ''
var nombre='but_h_'+num;
var nombre2='#div_'+num+'_hotels_sel';
if(valor_h==1){
	if(valor_a==0 && valor_at==0){myeztravel.delcity(num);}else{
	var conf = confirm('You are going to delete the hotels in this city, later you can add it again but you´ll lose all the selections you´ve made, are you sure?');
	if(conf){
	var valor_h = 0;
	document.getElementById(nombre).className='button-round-2 button-round-grey2';
	$(nombre2).remove();}}
}else{
	var valor_h= 1;
	var cd_=document.getElementById('Ciudad2').value;
	var cd=cd_.split(',');
	cdid=cd[num];
	var fecha1_ = document.getElementById('Date1').value;
	var fecha1=fecha1_.split(',');
	var dt1=fecha1[num]
	var fecha2_ = document.getElementById('Date2').value;
	var fecha2=fecha2_.split(',');
	var dt2=fecha2[num]
	document.getElementById(nombre).className='button-round-2 button-round-red2';
	myeztravel.LoadHotels(0,dt1,dt2,cdid,'','000000',num);
	}
for(a=0;a<=((hotel.length)-1);a++){
if(a==0){coma='';}else{coma=',';}
if(a==num){dt_=dt_+coma+valor_h;}else{dt_=dt_+coma+hotel[a];}
document.getElementById('hotel').value=dt_;}
}
if(cual==3){
var dt_ = ''
var nombre='but_at_'+num;
if(valor_at==1){
	if(valor_h==0 && valor_a==0){myeztravel.delcity(num);}else{
		var conf = confirm('You are going to delete the atractions in this city, later you can add it again but you´ll lose all the selections you´ve made, are you sure?');
	if(!conf){return false;}	
	document.getElementById(nombre).className='button-round-2 button-round-grey2';
	var nombre= 'div_'+num+'_atrac_sel';
	$(nombre).remove();
	var valor_at = 0;
	var fecha1_ = document.getElementById('Date1').value;
	var fecha2_ = document.getElementById('Date2').value;
	var fecha1=fecha1_.split(',');
	var fecha2=fecha2_.split(',');
	var fecha_1=fecha1[num];
	var fecha_2=fecha2[num];
	var fechap1 = new fecha(fecha_1)     
	var fechap2 = new fecha(fecha_2) 
	var miFechap1 = new Date( fechap1.anio, fechap1.mes, fechap1.dia )  
	var miFechap2 = new Date( fechap2.anio, fechap2.mes, fechap2.dia )
	var diferencia =  miFechap2.getTime()- miFechap1.getTime();
	var dias_d = Math.floor(diferencia / (1000 * 60 * 60 * 24)); 
	var dias_d=dias_d+1;
	for(x=1;x<=dias_d;x++){
		var nombre ='#div_'+num+'_atrac_sel_day_'+x;
		$(nombre).remove();
		}
	}
}else{
	var valor_at = 1;
	document.getElementById(nombre).className='button-round-2 button-round-red2';
	var fecha1_ = document.getElementById('Date1').value;
	var fecha2_ = document.getElementById('Date2').value;
	var ciudad_ = document.getElementById('Ciudad2').value;
	var fecha1=fecha1_.split(',');
	var fecha2=fecha2_.split(',');
	var ciudad=ciudad_.split(',');
	var fecha_1=fecha1[num];
	var fecha_2=fecha2[num];
	var city=ciudad[num];
	myeztravel.LoadAtrac(fecha_1,fecha_2,city,num);}
for(a=0;a<=((atrac.length)-1);a++){
if(a==0){coma='';}else{coma=',';}
if(a==num){dt_=dt_+coma+valor_at;}else{dt_=dt_+coma+atrac[a];}
document.getElementById('atrac').value=dt_;}
}
if(cual==22){
var nombre='but_h_'+num;
var nombre2='#div_'+num+'_hotels_sel';
	document.getElementById(nombre).className='button-round-2 button-round-grey2';
	$(nombre2).remove();
var dt_ = ''
for(a=0;a<=((hotel.length)-1);a++){
if(a==0){coma='';}else{coma=',';}
if(a==num){dt_=dt_+coma+'0';}else{dt_=dt_+coma+hotel[a];}
document.getElementById('hotel').value=dt_;}
}
}
myeztravel.CalcDates=function(){
var fecha1_ = document.getElementById('Date1').value;
var fecha1=fecha1_.split(',');
var date1 = '12/31/3000';
var date1_ = new fecha(date1)     
var miFecha = new Date(date1_.anio, date1_.mes, date1_.dia );
var dif_d=0;
for (f=0;f<=(fecha1.length-1);f++){
var date2_ = new fecha(fecha1[f])
var miFechaF = new Date(date2_.anio, date2_.mes, date2_.dia );
var diferencia =  miFecha.getTime()- miFechaF.getTime();
var dias_dif = Math.floor(diferencia / (1000 * 60 * 60 * 24));
if(dias_dif>dif_d){var dif_d = dias_dif;date_1=fecha1[f]}
//alert(fecha1[f]+' '+dias_dif);
}
var fecha2_ = document.getElementById('Date2').value;
var fecha2=fecha2_.split(',');
var date1 = '01/01/1900';
var date1_ = new fecha(date1)     
var miFecha = new Date(date1_.anio, date1_.mes, date1_.dia );
var dif_d=0;
for (f=0;f<=(fecha2.length-1);f++){
var date2_ = new fecha(fecha2[f])
var miFechaF = new Date(date2_.anio, date2_.mes, date2_.dia );
var diferencia =  miFechaF.getTime()- miFecha.getTime();
var dias_dif = Math.floor(diferencia / (1000 * 60 * 60 * 24));
if(dias_dif>dif_d){var dif_d = dias_dif;date_2=fecha2[f]}
//if(fecha2[f]>date2){date2 = fecha2[f]}
//alert(fecha2[f]);
}
//alert(date_1+' '+date_2)
	var _url = "data_ajax/myeztravel_content_ajax.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'calcdates',dt1_:date_1,dt2_:date_2};
	$('#itinerary_main').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#itinerary_main').empty();
		break;
		}
	});
}
myeztravel.Addcity=function(Air,Hotel,Atractions,Date_1,Date_2,Ciudad_1,Ciudad_2){
var ciudad_ = document.getElementById('Ciudad1').value;
var ciudad_=ciudad_+','+Ciudad_1;
document.getElementById('Ciudad1').value=ciudad_;
var ciudad_ = document.getElementById('Ciudad2').value;
var ciudad_=ciudad_+','+Ciudad_2;
document.getElementById('Ciudad2').value=ciudad_;
var fecha_ = document.getElementById('Date1').value;
var fecha_=fecha_+','+Date_1;
document.getElementById('Date1').value=fecha_;
var fecha_ = document.getElementById('Date2').value;
var fecha_=fecha_+','+Date_2;
document.getElementById('Date2').value=fecha_;
var air_ = document.getElementById('air').value;
var air_=air_+','+Air;
document.getElementById('air').value=air_;
var hotel_ = document.getElementById('hotel').value;
var hotel_=hotel_+','+Hotel;
document.getElementById('hotel').value=hotel_;
var atrac_ = document.getElementById('atrac').value;
var atrac_=atrac_+','+Atractions;
document.getElementById('atrac').value=atrac_;
myeztravel.CalcDates();
}
myeztravel.newcity=function(){
	var ciudad_ = document.getElementById('Ciudad2').value;
	var date_ = document.getElementById('Date2').value;
	var ciudad =ciudad_.split(',');
	var date =date_.split(',');
	var largo =  ciudad.length;
	if(largo>9){alert('You have reached the limit of cities(10)');return false;}
	var city = ciudad[(largo-1)];
	var fecha = date[(largo-1)];
	if(fecha=='01/01/1900'){
		for(l=0;l<=(largo-1);l++){
			if(date[l]!='01/01/1900'){
				var city = ciudad[l];
				var fecha = date[l];
				}}}
	var city = city.replace(/%20/g,' ')+',Selected';
	document.getElementById('Ciudad_sel3').value=city;
	document.getElementById('Ciudad_sel4').value='';
	document.getElementById('Datepicker3').value=fecha;
	document.getElementById('Datepicker4').value=fecha;
	document.getElementById('contador_Ciudades').value=largo;
	//alert(largo);
	$popup = $('#myeztravel-box2');
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);

}
myeztravel.delHotel=function(num,id,num2){
		var id_=','+id;
		var added = document.getElementById(num2+'id_added').value;
		var added_=added.replace(id_,'');
		document.getElementById(num2+'id_added').value=added_;
		var nombre = num2+'tr_A_'+num;
		document.getElementById(nombre).style.display='none';
}
myeztravel.showhide_h=function(num){
var check = document.getElementById(num+'showhide_recomend_h').checked;
//alert(check);
if(check){
	for (r=1;r<=3;r++){
		nombre = num+'tr_R_'+r;
		var trexist= document.getElementById(nombre);
		if(trexist){document.getElementById(nombre).style.display='block';}
		}
	}
if(!check){
	for (r=1;r<=3;r++){
		nombre = num+'tr_R_'+r;
		var trexist= document.getElementById(nombre);
		if(trexist){document.getElementById(nombre).style.display='none';}
		}
	}
}
myeztravel.addhotels_map=function(city,num){
	var added = document.getElementById(num+'id_added').value;
	var id_selected= document.getElementById(num+'id_selected').value;
	var datefrom = document.getElementById(num+'date_from').value;
	var dateto= document.getElementById(num+'date_to').value;
	var numrooms=document.getElementById(num+'numrooms1').value;
	var xmlrooms=''
	var countadults=0;
	var countchilds=0;
	for (r=1;r<=numrooms;r++){
	var nombre1=num+'room'+r+'_numadults1';
	var nombre2=num+'room'+r+'_numchilds1';
	var nombre3=num+'room'+r+'_childages1';
	var childsnum = document.getElementById(nombre2).value;
	var adultsnum = document.getElementById(nombre1).value;	
	var childages = document.getElementById(nombre3).value;		
	var childages_='';
	var countadults=countadults+parseFloat(adultsnum);
	var countchilds=countchilds+parseFloat(childsnum);
	if(childsnum > 0){var childages_=','+childages}
	var xmlrooms=xmlrooms+'&room'+r+'='+adultsnum+childages_;
		}	
	var $popup=$("#Hotelsmappopup-box");
	$popup.fadeOut(300);
	$('#mask').fadeOut(300);
	$('#mask').remove();
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'updatehotelsettings',id_:id_selected,datef:datefrom,datet:dateto,cityid:city,xmlrooms:xmlrooms,added_id:added,ciudad:num};
	$('#div_'+num+'_hotels_sel').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#div_'+num+'_hotels_sel').empty();
		break;
		}
	});
	numero = num;
setTimeout("myeztravel.showhotelspopup(numero)",4000);
}
myeztravel.addhotel=function(name,id,num){
	var check= document.getElementById('check_'+id).checked;
	var added = window.top.document.getElementById(num+'id_added').value;
	if(check){
		window.top.document.getElementById(num+'id_added').value=added+','+id;
		var added = window.top.document.getElementById(num+'id_added').value;
		//alert('checked :'+added);
		}
	if(!check){
		var ultimo='000000,'+id;
		if(added==ultimo){
			var conf=confirm('you have no more Hotels added, do you want to eliminate hotels from this city?');
			if(conf){
				window.top.eliminate_hotels(num);
				}
				else{return false;}
			}
		var id_=','+id;
		var added_=added.replace(id_,'');
		window.top.document.getElementById(num+'id_added').value=added_;
		var added = window.top.document.getElementById(num+'id_added').value;
		//alert('unchecked :'+added);
		}
}
eliminate_hotels=function(num){
				var $popup=$('#Hotelsmappopup-box');
				$popup.fadeOut(300);
				$('#mask').fadeOut(300);
				$('#mask').remove();
				$("#iframe_mapHotelscity").empty().attr("src","");
				myeztravel.showhide_ahat(22,num);
}
myeztravel.changesettings_map=function(city,num){
var conf_H = confirm("Do you want to apply these settings to complete itinerary, if you don't changes only be aplied to Hotels");
	var numrooms=document.getElementById('numrooms0').value;
	var xmlrooms=''
	var countadults=0;
	var countchilds=0;
	for (r=1;r<=numrooms;r++){
	var nombre1='room'+r+'_numadults0';
	var nombre2='room'+r+'_numchilds0';
	var nombre3='room'+r+'_childages0';
	var childsnum = document.getElementById(nombre2).value;
	var adultsnum = document.getElementById(nombre1).value;	
	var childages = document.getElementById(nombre3).value;		
	var childages_='';
	var countadults=countadults+parseFloat(adultsnum);
	var countchilds=countchilds+parseFloat(childsnum);
	if(childsnum > 0){var childages_=','+childages}
	var xmlrooms=xmlrooms+'&room'+r+'='+adultsnum+childages_;
		}
	var nombre = 'date_from_';
	var datefrom= document.getElementById(nombre).value;
	var nombre = 'date_to_';
	var dateto= document.getElementById(nombre).value;
	var id_selected= window.top.document.getElementById(num+'id_selected').value;
	var cd1 = window.top.document.getElementById('Ciudad1').value;
	var air= window.top.document.getElementById('air').value;
	var hotel= window.top.document.getElementById('hotel').value;
	var atrac= window.top.document.getElementById('atrac').value;
	//alert(xmlrooms+' '+countchilds+' '+countadults);
	//alert(id_selected);
	window.top.myeztravel.changemapsettings_top(conf_H,id_selected,air,hotel,atrac,cd1,city,datefrom,dateto,xmlrooms,num);
}
myeztravel.changemapsettings_top=function(conf_H,id_selected,air,hotel,atrac,cd1,city,datefrom,dateto,xmlrooms,num){
	var added = document.getElementById(num+'id_added').value;
	var $popup=$("#Hotelsmappopup-box");
	$popup.fadeOut(300);
	$('#mask').fadeOut(300);
	$('#mask').remove();
	if(conf_H){
var fecha_ = document.getElementById('Date1').value;
var fecha=fecha_.split(',');
var dt_='';
for (f=0;f<=(fecha.length-1);f++){
if(f==0){coma='';}else{coma=',';}
if(f==num){dt_=dt_+coma+date1;}else{dt_=dt_+coma+fecha[f];}
}
document.getElementById('Date1').value=dt_;
var fecha_ = document.getElementById('Date2').value;
var fecha=fecha_.split(',');
var dt_='';
for (f=0;f<=(fecha.length-1);f++){
if(f==0){coma='';}else{coma=',';}
if(f==num){dt_=dt_+coma+date2;}else{dt_=dt_+coma+fecha[f];}
}
document.getElementById('Date2').value=dt_;
myeztravel.CalcDates();
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'updatehotelsettings',id_:id_selected,datef:datefrom,datet:dateto,cityid:city,xmlrooms:xmlrooms,added_id:added,ciudad:num};
	$('#div_'+num+'_hotels_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+num+'_hotels_sel').empty();
		break;
		}
	});
	}
	if(!conf_H){//alert('solohoteles');
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'updatehotelsettings',id_:id_selected,datef:datefrom,datet:dateto,cityid:city,xmlrooms:xmlrooms,added_id:added,ciudad:num};
	$('#div_'+num+'_hotels_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+num+'_hotels_sel').empty();
		break;
		}
	});
	}
	var $popup=$('#Hotelsmappopup-box');
	var popMargTop=50;//($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	$popup.css({'margin-top':popMargTop,/*'margin-left':-popMargLeft*/});
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	var _urliframepopup = "Hotelmappopup.cfm?cd2_="+city+'&dt1_='+datefrom+'&dt2_='+dateto+'&xmlrooms='+xmlrooms+'&added='+added+'&numcity='+num;
	$('#iframe_mapHotelscity').attr("src",_urliframepopup);
	$('#iframe_mapHotelscity').fadeIn();
}
myeztravel.showchangerooms=function(){
	var $popup=$('#change_rooms');
	$popup.fadeIn();
	$popup.css({'margin-top':115,'margin-left':-300});
}
myeztravel.hidechangerooms=function(){
	var $popup=$('#change_rooms');
	$popup.fadeOut();
}
myeztravel.ShowHotelmappopup=function(num,id){
//	alert(num+' '+id);
	var rat = document.getElementById('rat'+num).value;
	var name = document.getElementById('name'+num).value;
	var img = document.getElementById('img'+num).value;
	var room = document.getElementById('room'+num).value;
	var nights = document.getElementById('nights'+num).value;
	var total= document.getElementById('total'+num).value;
	var total_f= document.getElementById('total_f'+num).value;
	var surcharge=document.getElementById('surcharge'+num).value;
	var roomlist=document.getElementById('roomlist'+num).value;
	var numrooms= document.getElementById('numrooms'+num).value;
	var numadults=document.getElementById('numadults'+num).value;
	var numchilds=document.getElementById('numchilds'+num).value;
	var childages=document.getElementById('childages'+num).value;
	var numcity=document.getElementById('numcity_').value;
	var from=document.getElementById('date_from_').value;
	var to=document.getElementById('date_to_').value;	
//	alert(rat+' '+name+' '+img+' '+room+' '+nights);
	window.top.myeztravel.ShowHotelmappopup_top(num,id,rat,name,img,room,nights,total,total_f,surcharge,roomlist,numrooms,numadults,numchilds,childages,from,to,numcity);
}
myeztravel.ShowHotelmappopup_top=function(num,id,rat,name,img,room,nights,total,total_f,surcharge,roomlist,numrooms,numadults,numchilds,childages,from,to,numcity){
	var ciudades= document.getElementById('Ciudad2').value;
	var ciudades_=ciudades.split(',');
	var city=ciudades_[numcity];
	var nombre = '#Hotel_pop_map';
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'gethoteldata_m',id_:id,name_:name,rat_:rat,img_:img,room_:room,nights_:nights,total_:total,total_f_:total_f,surcharge_:surcharge,roomlist_:roomlist,numrooms:numrooms,numadults:numadults,numchilds:numchilds,childages:childages,from:from,to:to,id_:id,numcity:numcity,city:city};
	$(nombre).load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$(nombre).empty();break;}
	});	
	var $popup=$('#Hotelsmappopup-box');
	$popup.fadeOut();
	var $popup=$('#Hotel_pop_map');
	$popup.fadeIn();
	var popMargTop=50;//($popup.height() + 24) / 2; 
	//$popup.css({'margin-top':popMargTop});
//	var nombre2 = '#hotel_div_info_m';
//	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
//	var _urlconfig = {action:'gethoteldata',id_:id};
//	$(nombre2).load(_url,_urlconfig,function (response, status, xhr){
//		switch (status){case "error":$(nombre2).empty();break;}
//	});	
}
myeztravel.Hotelcartpopupclose=function(num){
	var nombrepu='#Hotel_pop_map';
	var $popup=$(nombrepu);
	$popup.fadeOut();
	var $popup=$('#Myeztravel_Cart');
	$popup.fadeIn();
//	var nombre3 = '#hotel_div_info_m'+num;
	$(nombrepu).empty();		
}
myeztravel.Hotelmappopupclose=function(num){
	var nombrepu='#Hotel_pop_map';
	var $popup=$(nombrepu);
	$popup.fadeOut();
	var $popup=$('#Hotelsmappopup-box');
	$popup.fadeIn();
//	var nombre3 = '#hotel_div_info_m'+num;
	$(nombrepu).empty();		
}
shownp=function(num,lat,lng){
var check=document.getElementById('show_np').checked;
if(check){
	var AreaBounds = new google.maps.LatLngBounds();
	for (p=0;p<=((_places.length)-1);p++){
	_places[p].setVisible(true);
	AreaBounds.extend(_places[p].getPosition());
	}
map.fitBounds(AreaBounds);
}
if(!check){
	//alert('no');
	for (p=0;p<=((_places.length)-1);p++){
	_places[p].setVisible(false);
	}
	var center =new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
	//alert(center)
	map.setCenter(center);
	map.setZoom(16);
}
}
myeztravel.changeimage=function(img,esta,num){
var nombre = 'td_foto_'+esta;
var mi_imagen = new Image();
mi_imagen.src=img;
if((mi_imagen.height*2) < mi_imagen.width){
	document.getElementById('foto_h').innerHTML =('<img src="'+mi_imagen.src+'" width="100%"/>')
	}
else{
	document.getElementById('foto_h').innerHTML =('<img src="'+mi_imagen.src+'" width="100%" height="240"/>')
}
//document.getElementById('foto_h').innerHTML = '<img src="'+img+'" height="240px"/>'
}
myeztravel.addrooms=function(num,num2){
var nombre = num2+'numrooms'+num;
var roomsnum = document.getElementById(nombre).value;
var nombre1 = num2+'tr_room2_'+num;
document.getElementById(nombre1).style.display='none';
var nombre2 = num2+'tr_room3_'+num;
document.getElementById(nombre2).style.display='none';
if(roomsnum >1){
document.getElementById(nombre1).style.display='block';
	}
if(roomsnum >2){
document.getElementById(nombre2).style.display='block';
}
}
myeztravel.selects = function(room,x,cant,nombre,num){
	var funcion='';
	if(nombre=='numchilds'){var funcion='onclick="myeztravel.addchilds('+room+','+x+','+num+')"'}
	var select_ ='<select id="'+num+'room'+room+'_'+nombre+x+'" '+funcion+'>'
	if (cant==0){select_ = select_+'<option value="0" selected="selected">0</option>'}else{select_ = select_+'<option value="0">0</option>'}
	if (cant==1){select_ = select_+'<option value="1" selected="selected">1</option>'}else{select_ = select_+'<option value="1">1</option>'}
	if (cant==2){select_ = select_+'<option value="2" selected="selected">2</option>'}else{select_ = select_+'<option value="2">2</option>'}
	if (cant==3){select_ = select_+'<option value="3" selected="selected">3</option>'}else{select_ = select_+'<option value="3">3</option>'}
	if (cant==4){select_ = select_+'<option value="4" selected="selected">4</option>'}else{select_ = select_+'<option value="4">4</option>'}
	select_=select_+'</select>'
	return select_;
	}
myeztravel.armalist=function(numrooms,numadults,numchilds,x,num){
	var roomlist = ''
if(numrooms ==1){
	var roomlist='Room 1 Adults: '+numadults+' Childs: '+numchilds+'</br>';
}
if (numrooms >1){
	var numadults_=numadults.split('/');
	var numchilds_=numchilds.split('/');
	for (r=0;r<=(numrooms-1);r++){
		var roomlist=roomlist+'Room '+(r+1)+' Adults: '+numadults_[r]+' Childs: '+numchilds_[r]+'</br>';
		}
}
	return roomlist;
}
myeztravel.armarooms=function(numrooms,numadults,numchilds,childages,x,num){
//alert(numrooms);
//alert(numadults);
//alert(numchilds);
//alert(childages);
if(numrooms==1){
	if(numchilds==0){childages=''}
	if(numchilds==1){childages = childages}
	if(numchilds>1){childages = childages.replace(/-/g,',');}
	var seladults=myeztravel.selects(1,x,numadults,'numadults',num);
	var selchilds=myeztravel.selects(1,x,numchilds,'numchilds',num);
	var visible2='none';
	if (numchilds > 0){
	var visible2='block';}
var roomscant ='<tr id="'+num+'tr_room1_'+x+'" style="display:block;"><td>Room 1</td><td>&nbsp;</td><td>Adults :'+seladults+'</td><td>&nbsp;</td><td>Childs: '+selchilds+'</td><td>&nbsp;</td><td><div id="'+num+'div_room1_childages'+x+'" style="display:'+visible2+';">Child ages:<input type="text" id="'+num+'room1_childages'+x+'" title=" separated by commas; Example: 5,12,15" value="'+childages+'"></div></td></tr>'
	var seladults=myeztravel.selects(2,x,0,'numadults',num);
	var selchilds=myeztravel.selects(2,x,0,'numchilds',num);
var roomscant=roomscant+'<tr id="'+num+'tr_room2_'+x+'" style="display:none;"><td>Room 2</td><td>&nbsp;</td><td>Adults :'+seladults+'</td><td>&nbsp;</td><td>Childs: '+selchilds+'</td><td>&nbsp;</td><td><div id="'+num+'div_room2_childages'+x+'" style="display:none;">Child ages:<input type="text" id="'+num+'room2_childages'+x+'" title=" separated by commas; Example: 5,12,15" value=""></div></td></tr>'
	var seladults=myeztravel.selects(3,x,0,'numadults',num);
	var selchilds=myeztravel.selects(3,x,0,'numchilds',num);
var roomscant=roomscant+'<tr id="'+num+'tr_room3_'+x+'" style="display:none;"><td>Room 3</td><td>&nbsp;</td><td>Adults :'+seladults+'</td><td>&nbsp;</td><td>Childs: '+selchilds+'</td><td>&nbsp;</td><td><div id="'+num+'div_room3_childages'+x+'" style="display:none;">Child ages:<input type="text" id="'+num+'room3_childages'+x+'" title=" separated by commas; Example: 5,12,15" value=""></div></td></tr>'
return roomscant;
}
if(numrooms>1){
	var numadults_=numadults.split('/');
	var numchilds_=numchilds.split('/');
	var childages_=childages.split('/');
	var roomscant = '';
	for (r=0;r<=(numrooms-1);r++){
//alert(childages);
//alert(numchilds_[r]);
			if(numchilds_[r]==0){childages__=''}
			if(numchilds_[r]==1){childages__ = childages_[r]}
			if(numchilds_[r]>1){childages__ =childages_[r].replace(/-/g,',');}
//alert(childages__);
			var seladults=myeztravel.selects((r+1),x,numadults_[r],'numadults',num);
			var selchilds=myeztravel.selects((r+1),x,numchilds_[r],'numchilds',num);
			var visible2='none';
			if (numchilds_[r] > 0){
			var visible2='block';}
			var roomscant =roomscant+'<tr id="'+num+'tr_room'+(r+1)+'_'+x+'" style="display:block;"><td>Room '+(r+1)+'</td><td>&nbsp;</td><td>Adults :'+seladults+'</td><td>&nbsp;</td><td>Childs: '+selchilds+'</td><td>&nbsp;</td><td><div id="'+num+'div_room'+(r+1)+'_childages'+x+'" style="display:'+visible2+';">Child ages:<input type="text" id="'+num+'room'+(r+1)+'_childages'+x+'" title=" separated by commas; Example: 5,12,15" value="'+childages__+'"></div></td></tr>'
		}
if(numrooms<3){
	var seladults=myeztravel.selects(3,x,0,'numadults',num);
	var selchilds=myeztravel.selects(3,x,0,'numchilds',num);
var roomscant=roomscant+'<tr id="'+num+'tr_room3_'+x+'" style="display:none;"><td>Room 3</td><td>&nbsp;</td><td>Adults :'+seladults+'</td><td>&nbsp;</td><td>Childs: '+selchilds+'</td><td>&nbsp;</td><td><div id="'+num+'div_room3_childages'+x+'" style="display:none;">Child ages:<input type="text" id="'+num+'room3_childages'+x+'" title=" separated by commas; Example: 5,12,15" value=""></div></td></tr>'
}
		return roomscant;
	}
}
myeztravel.showtooltip=function(num){
//alert('show');
var nombre = '#tooltip_'+num;
var $popup=$(nombre);
$popup.fadeIn();
}
myeztravel.hidetooltip=function(num){
var nombre = '#tooltip_'+num;
var $popup=$(nombre);
$popup.fadeOut();
}
myeztravel.showhotelsmappopup=function(xmlrooms,num){
	var ciudad2_ = document.getElementById('Ciudad2').value;
	var ciudad2 = ciudad2_.split(',');
	var cd2 = ciudad2[num];
	var dt1 = document.getElementById(num+'date_from').value;
	var dt2 = document.getElementById(num+'date_to').value;
	var added= document.getElementById(num+'id_added').value;
	document.getElementById('numcity_').value = num;
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
	var _urliframepopup = "Hotelmappopup.cfm?cd2_="+cd2+'&dt1_='+dt1+'&dt2_='+dt2+'&xmlrooms='+xmlrooms+'&added='+added+'&numcity='+num;
//	alert(xmlrooms);
	$('#iframe_mapHotelscity').attr("src",_urliframepopup);
	$('#iframe_mapHotelscity').fadeIn(300);
//	$('#iframe_mapHotelscity #datefrom').datepicker();
//	$('#dateto').window.top.datepicker();
	return false;
}
myeztravel.updatesettings=function(num,date1,date2,ciudad,xml2,numadults_,numchilds_,num2,roomarray){
//alert(xml2);
if(roomsarray.length!=0){
var roomarray_=roomarray.split('/');
var id=roomarray_[0];
//alert(id);
for(i=0;i<=(roomsarray.length-1);i++){
var comproom=roomsarray[i].split('/');
var id_=comproom[0];
if(id==id_){roomsarray.splice(i,1);}
}
roomsarray.push(roomarray);
}
else{roomsarray.push(roomarray);}
//for(i=0;i<=(roomsarray.length-1);i++){
//alert(roomsarray[i]);
//}
var conf_H = confirm("Do you want to apply these settings to complete itinerary, if you don't, changes only be aplied to Hotels only");
var added = document.getElementById(num2+'id_added').value;
var cd1 = document.getElementById('Ciudad1').value;
var air= document.getElementById('air').value;
var hotel= document.getElementById('hotel').value;
var atrac= document.getElementById('atrac').value;
var id_selected= document.getElementById(num2+'id_selected').value;
//var nombre = 'childages'+num;
//var childages = document.getElementById(nombre).value;
	var nombre=num2+'price_div_s'+num;
	document.getElementById(nombre).innerHTML='';
	var nombrepu = '#'+num2+'Hotel-popup'+num;
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
if(f==num2){dt_=dt_+coma+date1;}else{dt_=dt_+coma+fecha[f];}
}
document.getElementById('Date1').value=dt_;
var fecha_ = document.getElementById('Date2').value;
var fecha=fecha_.split(',');
var dt_='';
for (f=0;f<=(fecha.length-1);f++){
if(f==0){coma='';}else{coma=',';}
if(f==num2){dt_=dt_+coma+date2;}else{dt_=dt_+coma+fecha[f];}
}
document.getElementById('Date2').value=dt_;
myeztravel.CalcDates();
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'updatehotelsettings',id_:id_selected,datef:date1,datet:date2,cityid:ciudad,xmlrooms:xml2,added_id:added,ciudad:num2};
	$('#div_'+num2+'_hotels_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+num2+'_hotels_sel').empty();
		break;
		}
	});
}else{
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'updatehotelsettings',id_:id_selected,datef:date1,datet:date2,cityid:ciudad,xmlrooms:xml2,added_id:added,ciudad:num2};
	$('#div_'+num2+'_hotels_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+num2+'_hotels_sel').empty();
		break;
		}
	});
}
}
myeztravel.changesettings=function(num,id,num2){
	var nombre=num2+'numrooms'+num;
	var numrooms=document.getElementById(nombre).value;
	var xmlrooms=''
	for (r=1;r<=numrooms;r++){
	var nombre1=num2+'room'+r+'_numadults'+num;
	var nombre2=num2+'room'+r+'_numchilds'+num;
	var nombre3=num2+'room'+r+'_childages'+num;
	var childsnum = document.getElementById(nombre2).value;
	var adultsnum = document.getElementById(nombre1).value;	
	var childages = document.getElementById(nombre3).value;		
	var childages_='';
	if(childsnum > 0){var childages_=','+childages}
	var xmlrooms=xmlrooms+'&room'+r+'='+adultsnum+childages_;
		}
//alert(xmlrooms);
	var nombre = num2+'datefrom'+num;
	var datefrom= document.getElementById(nombre).value;
	var nombre = num2+'dateto'+num;
	var dateto= document.getElementById(nombre).value;
	var cityid =  document.getElementById(num2+'city_id').value;
	muestratab(1,num,num2);
	myeztravel.changesettings_ajax(num,id,datefrom,dateto,xmlrooms,cityid,num2);
	};
myeztravel.changesettings_ajax=function(num,id,datefrom,dateto,xmlrooms,cityid,num2){
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'getcomparehotel',num_:num,id_:id,date_f:datefrom,date_t:dateto,xmlrooms_:xmlrooms,cdid:cityid,numcity:num2};
	var nombre='#'+num2+'price_div_s'+num;
	$(nombre).load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$(nombre).empty();
		break;
		}
	});
}
myeztravel.addchilds=function(room,num,num2){
var nombre1 = num2+'room'+room+'_numchilds'+num;
var childsnum = document.getElementById(nombre1).value;
//alert(childsnum);
var nombre = num2+'div_room'+room+'_childages'+num;
document.getElementById(nombre).style.display='none';
if(childsnum != '0'){
document.getElementById(nombre).style.display='block';
}
}
myeztravel.setdefault_h=function(num,id_,num2){
var x = document.getElementById(num2+'counter_selected').value;
//alert(x);
var nombre= num2+'div_Hotel'+x;
document.getElementById(nombre).style.display = 'none';
var nombre= num2+'div_Hotel'+num;
document.getElementById(nombre).style.display = 'block';
document.getElementById(num2+'counter_selected').value = num;
document.getElementById(num2+'id_selected').value=id_
	var $popup=$('#'+num2+'Hotels-popup');
	$popup.fadeOut(300);
	$('#mask').fadeOut(300);
	$('#mask').remove();
myeztravel.Hotelpopup(num,id_,num2,0);
}
myeztravel.Hotelpopup2=function(num,id,num2){
	var $popup=$('#'+num2+'Hotels-popup');
	$popup.fadeOut(300);
	var nombrepu = '#'+num2+'Hotel2-popup'+num;
	var $popup=$(nombrepu);
	var popMargTop=25;//($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	//$popup.css({'margin-top':popMargTop});
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	var nombre3 = '#'+num2+'hotel_div_info_2_'+num;
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'gethoteldata',id_:id};
	$(nombre3).load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$(nombre3).empty();break;}
	});	
	}
myeztravel.showhotelspopup=function(num){
	var $popup=$('#'+num+'Hotels-popup');
	var popMargTop=($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	//$popup.css({'margin-top':popMargTop});
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
}
myeztravel.Hotelspopupclose=function(num){
	var $popup=$('#'+num+'Hotels-popup');
	$popup.fadeOut(300);
	$('#mask').fadeOut(300);
	$('#mask').remove();
	}
muestratab=function(num,num2,num3){
	if(num==1){
		document.getElementById(num3+'PD'+num2).style.backgroundColor= '#333';
		document.getElementById(num3+'HD'+num2).style.backgroundColor= '#999';
		//document.getElementById('CS'+num2).style.backgroundColor= '#999';
		document.getElementById(num3+'hotel_div_info'+num2).style.display='none';
		document.getElementById(num3+'price_div_info'+num2).style.display='block';
		//document.getElementById('settings_div_info'+num2).style.display='none';
		}
	if(num==2){
		document.getElementById(num3+'PD'+num2).style.backgroundColor= '#999';
		document.getElementById(num3+'HD'+num2).style.backgroundColor= '#333';
		//document.getElementById('CS'+num2).style.backgroundColor= '#999';
		document.getElementById(num3+'hotel_div_info'+num2).style.display='block';
		document.getElementById(num3+'price_div_info'+num2).style.display='none';
		google.maps.event.trigger(map, 'resize');
		shownp(11,0.0000,0.0000);
		//document.getElementById('settings_div_info'+num2).style.display='none';
		}
	if(num==3){
		document.getElementById(num3+'PD'+num2).style.backgroundColor= '#999';
		document.getElementById(num3+'HD'+num2).style.backgroundColor= '#999';
		document.getElementById(num3+'CS'+num2).style.backgroundColor= '#333';
		document.getElementById(num3+'hotel_div_info'+num2).style.display='none';
		document.getElementById(num3+'price_div_info'+num2).style.display='none';
		document.getElementById(num3+'settings_div_info'+num2).style.display='block';
		}
	}
muestratab2=function(num,num2,num3){
	if(num==1){
		document.getElementById(num3+'PD_2_'+num2).style.backgroundColor= '#333';
		document.getElementById(num3+'HD_2_'+num2).style.backgroundColor= '#999';
		document.getElementById(num3+'hotel_div_info_2_'+num2).style.display='none';
		document.getElementById(num3+'price_div_info_2_'+num2).style.display='block';
		}
	if(num==2){
		document.getElementById(num3+'PD_2_'+num2).style.backgroundColor= '#999';
		document.getElementById(num3+'HD_2_'+num2).style.backgroundColor= '#333';
		document.getElementById(num3+'hotel_div_info_2_'+num2).style.display='block';
		document.getElementById(num3+'price_div_info_2_'+num2).style.display='none';
		google.maps.event.trigger(map, 'resize');
		shownp(11,0.0000,0.0000);
		}
	}
muestratab3=function(num){
	if(num==1){
		document.getElementById('PD_m').style.backgroundColor= '#333';
		document.getElementById('HD_m').style.backgroundColor= '#999';
		document.getElementById('hotel_div_info_m').style.display='none';
		document.getElementById('price_div_info_m').style.display='block';
		}
	if(num==2){
		document.getElementById('PD_m').style.backgroundColor= '#999';
		document.getElementById('HD_m').style.backgroundColor= '#333';
		document.getElementById('hotel_div_info_m').style.display='block';
		document.getElementById('price_div_info_m').style.display='none';
		google.maps.event.trigger(map, 'resize');
		shownp(11,0.0000,0.0000);
		}
	}
myeztravel.Loadresults=function(air,hotel,atr,cd1,cd2,dt1,dt2,saved){
	//alert(air);
	var _url = "data_ajax/myeztravel_content_ajax.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action: "getmyeztravelResults",air_:air,hotel_:hotel,atr_:atr,cd1_:cd1,cd2_:cd2,dt1_:dt1,dt2_:dt2,saved:saved};
	$("#myeztravel_results").load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$("#myeztravel_results").empty();
		break;
		}
	});
}
fecha = function(cadena){  
   var separador = "/"  
   if (cadena.indexOf(separador)!= -1) {  
        var posi1 = 0  
        var posi2 = cadena.indexOf( separador, posi1 + 1 )  
        var posi3 = cadena.indexOf( separador, posi2 + 1 )  
        this.mes = cadena.substring( posi1, posi2 )  
        this.dia = cadena.substring( posi2 + 1, posi3 )  
        this.anio = cadena.substring( posi3 + 1, cadena.length )  
   } else {  
        this.dia = 0  
        this.mes = 0  
        this.anio = 0     
   }  
}  
showhideaccordions=function(num,d,dias){
//if(comprobar){setTimeout("closemask()",300);}
for(a=1;a<=dias;a++){
//alert(comprobar+' '+comprobar2);
if(a!=d){
	comprobar=false;
		$('#div_'+num+'Day'+a).accordion({collapsible: true, heightStyle: "content",active: false,animated: 'bounceslide'});
	}
if(a==d && comprobar && comprobar2 == num){
	comprobar=false;
		//$('#div_'+num+'Day'+a).accordion({collapsible: true, heightStyle: "content",active: false,animated: 'bounceslide'});
	}
}
	var fecha_1_ = document.getElementById('Date1').value;
	var fecha_1 = fecha_1_.split(',');
	var cuantas = fecha_1.length;
	var fecha_2_ = document.getElementById('Date2').value;
	var fecha_2 = fecha_2_.split(',');
	for(x=0;x<=(cuantas-1);x++){
	if(x!=num){
    var fecha1 = new fecha(fecha_1[x])     
    var fecha2 = new fecha(fecha_2[x]) 
	var miFecha1 = new Date( fecha1.anio, fecha1.mes, fecha1.dia )  
    var miFecha2 = new Date( fecha2.anio, fecha2.mes, fecha2.dia )
    var diferencia =  miFecha2.getTime()- miFecha1.getTime()   
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
	var dias = dias+1;
	for(y=1;y<=dias;y++){
		$('#div_'+x+'Day'+y).accordion({collapsible: true, heightStyle: "content",active: false,animated: 'bounceslide'});
		}
//	alert(dias);		
	}}
}
		
closemask=function(){
//alert('cerrando');
$('#mask').fadeOut(30);
$('#mask').remove();
}
myeztravel.Createcity=function(num,ciudad,date_){
	var air_ = document.getElementById('air').value;
	var air = air_.split(',');
	var air1=air[num];
	var hotel_ = document.getElementById('hotel').value;
	var hotel = hotel_.split(',');
	var hotel1=hotel[num];
	var atrac_ = document.getElementById('atrac').value;
	var atrac = atrac_.split(',');
	var atrac1= atrac[num];
	var fecha_I_ = document.getElementById('Date1').value;
	var fecha_I = fecha_I_.split(',');
	var fechaI_=fecha_I[num];
	var fecha_F_ = document.getElementById('Date2').value;
	var fecha_F = fecha_F_.split(',');
	var fechaF_=fecha_F[num];
	var fecha1 = new fecha(fechaI_)     
 	var miFechaI = new Date( fecha1.anio, fecha1.mes, fecha1.dia )
	var comp=-1000;
	for(o=0;o<=((fecha_I.length)-1);o++){
	var _fecha_=fecha_I[o];
	var fecha_ = new fecha(_fecha_)     
 	var miFecha = new Date( fecha_.anio, fecha_.mes, fecha_.dia )
	var diferencia =  miFechaI.getTime()- miFecha.getTime()   
    var dias_d = Math.floor(diferencia / (1000 * 60 * 60 * 24))
	if(dias_d<0 && dias_d>comp && o!=num){var num2 = o;var comp=dias_d;}//else{num2=-1;}
		}
	var f_1=fechaI_.trim();
	var  edit_='<input id="but_e_'+num+'" type="button" value="Edit" class="button-round-2 button-round-blue2" onclick="myeztravel.edit_city('+num+');"/>';
	if(air1==1){air1_='';}//<input id="but_a_'+num+'" type="button" value="Air" class="button-round-2 button-round-red2" onclick="myeztravel.showhide_ahat(1,'+num+');"/>
	else{air1_='';}//<input id="but_a_'+num+'" type="button" value="Air" class="button-round-2 button-round-grey2" onclick="myeztravel.showhide_ahat(1,'+num+');"/>
	if(hotel1==1){hotel1_='<input id="but_h_'+num+'" type="button" value="Hotels" class="button-round-2 button-round-red2" onclick="myeztravel.showhide_ahat(2,'+num+');"/>';}
	else{hotel1_='<input id="but_h_'+num+'" type="button" value="Hotels" class="button-round-2 button-round-grey2" onclick="myeztravel.showhide_ahat(2,'+num+');"/>';}
	if(atrac1==1){atrac1_='<input id="but_at_'+num+'" type="button" value="Atractions" class="button-round-2 button-round-red2" onclick="myeztravel.showhide_ahat(3,'+num+');"/>';}
	else{atrac1_='<input id="but_at_'+num+'" type="button" value="Atractions" class="button-round-2 button-round-grey2" onclick="myeztravel.showhide_ahat(3,'+num+');"/>';}
	var nombre ='<div class="hide_travelheaderinfo" id="Div_space_'+num+'" style="height:5px;"></div><div id="div_City_'+num+'" class="body-rounded-10" align="left"><div><table id="actions_tab" width="920px"><tr><td width="10%">'+edit_+'</td><td id="td_cityname" width="80%"><h3>'+ciudad+' <span style="cursor:pointer;" id="more_editopt" onclick="more_editopt_hide.hide()">[+]</span></h3></td><td width="10%"><span class="capitalize_red" title="Eliminate City" onclick="myeztravel.delcity('+num+')"><span style="color:#999999;">X</span></span></td></tr><tr class="hide_editopt"><td colspan="3" style=" text-align:center">'+air1_+'&nbsp;'+hotel1_+'&nbsp;'+atrac1_+'&nbsp;</td></tr></div></div>';
	if(comp==-1000){
	$("#div_results").append(nombre);
	}
	else{
	var nomdiv = '#Div_space_'+num2
	//alert(nomdiv);
	$( nombre ).insertBefore( nomdiv );}
	if(num == 0){
	var fecha_1_ = document.getElementById('Date1').value;
	var fecha_1 = fecha_1_.split(',');
	var fecha1_ = fecha_1[num];
	var fecha_2_ = document.getElementById('Date2').value;
	var fecha_2 = fecha_2_.split(',');
	var fecha2_ = fecha_2[num];
    var fecha1 = new fecha(fecha1_)     
    var fecha2 = new fecha(fecha2_) 
	var miFecha1 = new Date( fecha1.anio, fecha1.mes, fecha1.dia )  
    var miFecha2 = new Date( fecha2.anio, fecha2.mes, fecha2.dia )
    var diferencia =  miFecha2.getTime()- miFecha1.getTime()   
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
	var dias = dias+1;
	var fecha_ = miFecha1;
 	for(d=1;d<=dias;d++){
	if(d==1){var sum=0}else{var sum=1}
	var sumarDias=parseInt(sum);
	fecha_.setDate(fecha_.getDate() + sumarDias);
	var anio=fecha_.getFullYear(); //Año de 4 digitos
	var mes= fecha_.getMonth();  // Mes
	var dia= fecha_.getDate();     //Día del mes
	if(mes == 0){mes='Dec';anio=anio-1;}
	if(mes == 1){mes='Jan';}
	if(mes == 2){mes='Feb';}
	if(mes == 3){mes='Mar';} 
	if(mes == 4){mes='Apr';} 
	if(mes == 5){mes='May';} 
	if(mes == 6){mes='Jun';} 
	if(mes == 7){mes='Jul';}
	if(mes == 8){mes='Aug';} 
	if(mes == 9){mes='Sept';} 
	if(mes == 10){mes='Oct';} 
	if(mes == 11){mes='Nov';} 
	if(mes == 12){mes='Dec';}    
	if(dia.toString().length < 2){dia='0'+dia;}
	var datext=mes+' '+dia+', '+anio;
	//alert(mes+'/'+dia+'/'+anio);
	var nombre ='<div id="div_'+num+'Day'+d+'" onclick="showhideaccordions('+num+','+d+','+dias+');"><h3 class="daybox-title"><span id="span_'+num+'_'+d+'" class="capitalize_red">Day '+d+' of <span id="span2_'+num+'_'+d+'">'+dias+'</span></span> - <span style="font-size:14px;">'+datext+'</span><div id="accordion_expand_text" style="float:right;"><span class="capitalize_red" style="font-size:12px;">Click to expand</span></div></h3></div>';
	$('#div_City_'+num).append(nombre);
	var nombre = '<div id="div_'+num+'Day'+d+'results"></div>';
	$('#div_'+num+'Day'+d).append(nombre);
	if(d==1){
		comprobar=true;
		comprobar2=num;
		$('#div_'+num+'Day'+d).accordion({heightStyle: "content"});		
		}else{
		$('#div_'+num+'Day'+d).accordion({collapsible: true, heightStyle: "content",active: false,animated: 'bounceslide'});
		}
	}	
	}
	else{
	var fecha_1_ = document.getElementById('Date1').value;
	var fecha_1 = fecha_1_.split(',');
	var fecha1_ = fecha_1[num];
	var cuantas = fecha_1.length;
	var date__1 = '12/31/3000';
	var date1__ = new fecha(date__1)     
	var miFecha = new Date(date1__.anio, date1__.mes, date1__.dia );
	var dif_d=0;
	for (f=0;f<=(fecha_1.length-1);f++){
	var date2__ = new fecha(fecha_1[f])
	var miFechaF = new Date(date2__.anio, date2__.mes, date2__.dia );
	var diferencia =  miFecha.getTime()- miFechaF.getTime();
	var dias_dif = Math.floor(diferencia / (1000 * 60 * 60 * 24));
	if(dias_dif>dif_d){var dif_d = dias_dif;var date1=fecha_1[f]}
			}
	var fecha_2_ = document.getElementById('Date2').value;
	var fecha_2 = fecha_2_.split(',');
	var fecha2_ = fecha_2[num];
	var date__2 = '01/01/1900';
	var date2__ = new fecha(date__2)     
	var miFecha = new Date(date2__.anio, date2__.mes, date2__.dia );
	var dif_d=0;
	for (f=0;f<=(fecha_2.length-1);f++){
	var date2__ = new fecha(fecha_2[f])
	var miFechaF = new Date(date2__.anio, date2__.mes, date2__.dia );
	var diferencia =  miFechaF.getTime()- miFecha.getTime();
	var dias_dif = Math.floor(diferencia / (1000 * 60 * 60 * 24));
	if(dias_dif>dif_d){var dif_d = dias_dif;var date2=fecha_2[f]}
			}
    var fecha1 = new fecha(fecha1_)     
    var fecha2 = new fecha(fecha2_) 
	var miFecha1 = new Date( fecha1.anio, fecha1.mes, fecha1.dia )  
    var miFecha2 = new Date( fecha2.anio, fecha2.mes, fecha2.dia )
    var fecha3 = new fecha(date1)     
    var fecha4 = new fecha(date2) 
	var miFecha3 = new Date( fecha3.anio, fecha3.mes, fecha3.dia )  
    var miFecha4 = new Date( fecha4.anio, fecha4.mes, fecha4.dia )
    var diferencia =  miFecha4.getTime()- miFecha3.getTime()   
    var dias_t = Math.floor(diferencia / (1000 * 60 * 60 * 24))
	var dias_t = dias_t +1;
    var diferencia =  miFecha2.getTime()- miFecha1.getTime()   
    var dias_ = Math.floor(diferencia / (1000 * 60 * 60 * 24))
	var dias_ = dias_ +1;
    var diferencia =  miFecha1.getTime()- miFecha3.getTime()   
    var dias_e = Math.floor(diferencia / (1000 * 60 * 60 * 24))
	var dias_e = dias_e +1;
//	alert(date1+' '+date2+' dias '+dias_t+' dias este'+dias_+' e'+dias_e);
	for (f=0;f<=(num-1);f++){
		fecha1_p = fecha_1[f];
		fecha2_p = fecha_2[f];
	    var fechap1 = new fecha(fecha1_p)     
	    var fechap2 = new fecha(fecha2_p) 
		var miFechap1 = new Date( fechap1.anio, fechap1.mes, fechap1.dia )  
	    var miFechap2 = new Date( fechap2.anio, fechap2.mes, fechap2.dia )
	    var diferencia =  miFechap2.getTime()- miFechap1.getTime(); 
	    var dias_p = Math.floor(diferencia / (1000 * 60 * 60 * 24));
		var dias_p = dias_p +1;
		var distancia = miFechap1.getTime()-miFecha3.getTime();
	    var dias_d = Math.floor(distancia / (1000 * 60 * 60 * 24));
		for(x=1;x<=dias_p;x++){
			var dias_d =dias_d+1;
			var texto='Day '+dias_d+' of <span id="span2_'+f+'_'+x+'">'+dias_t+'</span>';
			var nombre ='span_'+f+'_'+x;
			document.getElementById(nombre).innerHTML=texto;}
		}
	var d2=dias_e-1;
	for(d=1;d<=dias_;d++){
	var d2 = d2+1;
	var fecha_=miFecha1;
	//alert(fecha_)
	if(d==1){sum=0}else{sum=1}
	var sumarDias=parseInt(sum);
	fecha_.setDate(fecha_.getDate() + sumarDias);
	var anio=fecha_.getFullYear(); //Año de 4 digitos
	var mes= fecha_.getMonth();  // Mes
	var dia= fecha_.getDate();     //Día del mes
	if(mes == 0){mes='Dec';anio=anio-1;}
	if(mes == 1){mes='Jan';}
	if(mes == 2){mes='Feb';}
	if(mes == 3){mes='Mar';} 
	if(mes == 4){mes='Apr';} 
	if(mes == 5){mes='May';} 
	if(mes == 6){mes='Jun';} 
	if(mes == 7){mes='Jul';} 
	if(mes == 8){mes='Aug';} 
	if(mes == 9){mes='Sept';} 
	if(mes == 10){mes='Oct';} 
	if(mes == 11){mes='Nov';} 
	if(mes == 12){mes='Dec';}    
	if(dia.toString().length < 2){dia='0'+dia;}
	var datext=mes+' '+dia+', '+anio;
	var nombre = '<div id="div_'+num+'Day'+d+'" onclick="showhideaccordions('+num+','+d+','+dias_+');"><h3 class="daybox-title"><span id="span_'+num+'_'+d+'" class="capitalize_red">Day '+d2+' of <span id="span2_'+num+'_'+d+'">'+dias_t+'</span></span> - <span style="font-size:14px;">'+datext+'</span><div id="accordion_expand_text" style="float:right;"><span class="capitalize_red" style="font-size:12px;">Click to expand</span></div></h3></div>';
	$('#div_City_'+num).append(nombre);
	var nombre = '<div id="div_'+num+'Day'+d+'results"></div>';
	$('#div_'+num+'Day'+d).append(nombre);
	if(d==1){
		showhideaccordions(num,1,0);
		$('#div_'+num+'Day'+d).accordion({heightStyle: "content"});
		comprobar=true;
		comprobar2=num;		
		}else{
		$('#div_'+num+'Day'+d).accordion({collapsible: true, heightStyle: "content",active: false,animated: 'bounceslide'});
		}
//	$('#div_'+num+'Day'+d2).accordion({collapsible: true, heightStyle: "content",active: false,animated: 'bounceslide'});
	}
	}
document.getElementById('div_City_'+num).scrollIntoView();
}
myeztravel.LoadAtrac=function(dt1_,dt2_,cd2_,num){
	var nombre ='<div id="div_'+num+'_atrac_sel" style="display:none;"></div>';
	$('#div_results').append(nombre);
	var fechap1 = new fecha(dt1_)     
	var fechap2 = new fecha(dt2_) 
	var miFechap1 = new Date( fechap1.anio, fechap1.mes, fechap1.dia )  
	var miFechap2 = new Date( fechap2.anio, fechap2.mes, fechap2.dia )
	var diferencia =  miFechap2.getTime()- miFechap1.getTime();
	var dias_d = Math.floor(diferencia / (1000 * 60 * 60 * 24)); 
	var dias_d=dias_d+1;
	//alert(dias_d);
//	var texto='';
//	for(x=1;x<=dias_d;x++){
//	var texto=texto+'<input type="hidden" id="'+num+'ids_'+x+'" value=""><input type="hidden" id="'+num+'ruta_'+x+'" value="0"><input type="hidden" id="'+num+'SP_'+x+'" value="0000"><input type="hidden" id="'+num+'EP_'+x+'" value="0001"><input type="hidden" id="'+num+'ids_u'+x+'" value="">';
//	}
//	$('#div_'+num+'_atrac_sel').append(texto);
	for(x=1;x<=dias_d;x++){
	if(x==1){visible='style="display:block; padding-top:5px;"'}else{visible='style="display:block; padding-top:5px;"'}
	var nombre ='<div id="div_'+num+'_atrac_sel_day_'+x+'"'+visible+'></div>';
	$('#div_'+num+'Day'+x+'results').append(nombre);
	$('#div_'+num+'_atrac_sel_day_'+x).showLoading("Please Wait, Searching for atraccions...",false);
	}
	var _url = "data_ajax/myeztravel_content2.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Get_atractions',cd2_:cd2_,city:num,days:dias_d};
	$('#div_'+num+'_atrac_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+num+'_atrac_sel').empty();
		break;
		}
	});
//	numero = num 
//	dias = dias_d
	//setTimeout("getatrac(numero,dias)",10000)
}
getatrac=function(num,dia,ids,show){
	//for(x=1;x<=dias;x++){
	//var nombre1 = num+'ids_'+x;
	//var ids = document.getElementById(nombre1).value;
	var _url = "data_ajax/myeztravel_content2.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'Get_armaplan',city:num,ids_:ids,dia:dia,show:show};
	$('#div_'+num+'_atrac_sel_day_'+dia).load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+num+'_atrac_sel_day_'+dia).empty();
		break;
		}
	});
	//}
}
myeztravel.LoadHotels=function(id_h,dt1,dt2,cdid,childages_,added_id,num){
	//alert(num);
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'updatehotelsettings',id_:id_h,datef:dt1,datet:dt2,cityid:cdid,xmlrooms:childages_,rooms_:1,added_id:added_id,ciudad:num};
//	var nombre ='<div style="display:block; height:5px;"></div>';
//	$('#div_'+num+'Day1').append(nombre);
	var nombre ='<div id="div_'+num+'_hotels_sel"></div>';
	$('#div_'+num+'Day1results').append(nombre);
	$('#div_'+num+'_hotels_sel').showLoading("Please Wait, Searching for Hotels...",false);
	$('#div_'+num+'_hotels_sel').load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$('#div_'+num+'_hotels_sel').empty();
		break;
		}
	});
}
myeztravel.Hotelpopup=function(num,id,num2,deonde){
	//alert(deonde);
	hotelpopup_v=deonde;
	if (deonde==1){
	$('#Myeztravel_PlanBox').fadeOut(300);
	$('#mask').fadeOut(300);
	$('#mask').remove();
	}
	var nombrepu = '#'+num2+'Hotel-popup'+num;
	var $popup=$(nombrepu);
	var popMargTop=25;//($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	//$popup.css({'margin-top':popMargTop});
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	var nombre1= '#'+num2+'datefrom'+num;
	var nombre2= '#'+num2+'dateto'+num;
	$(nombre1).datepicker();
	$(nombre2).datepicker();
	var nombre3 = '#'+num2+'hotel_div_info'+num;
	$(nombre).showLoading("Please Wait, Loading Info...",false);
	var _url = "data_ajax/myeztravel_content.cfm?"+randomNumberUrl()+"";
	var _urlconfig = {action:'gethoteldata',id_:id};
	$(nombre3).load(_url,_urlconfig,function (response, status, xhr){
		switch (status){case "error":$(nombre3).empty();
		break;
		}
	});
	myeztravel.changesettings(num,id,num2);
}
myeztravel.Hotelpopupclose=function(num,num2){
	var nombre=num2+'price_div_s'+num;
	document.getElementById(nombre).innerHTML='';
	var nombrepu = '#'+num2+'Hotel-popup'+num;
	var $popup=$(nombrepu);
	$popup.fadeOut(300);
	$('#mask').fadeOut(300);
	$('#mask').remove();
	var nombre3 = '#'+num2+'hotel_div_info'+num;
	$(nombre3).empty();
	if(hotelpopup_v==1){
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	$('#Myeztravel_PlanBox').fadeIn(300);
		}	
}
myeztravel.Hotel2popupclose=function(num,num2){
	var nombrepu = '#'+num2+'Hotel2-popup'+num;
	var $popup=$(nombrepu);
	$popup.fadeOut(300);
	var $popup=$('#'+num2+'Hotels-popup');
	$popup.fadeIn(300);
	var nombre3 = '#h'+num2+'otel_div_info_2_'+num;
	$(nombre3).empty();
}
var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));
myeztravel.initPage=function(){
if(!otraventana){
	var url = qs["itineraryId"];;
	if(typeof(url) == 'undefined'){
	var $popup=$("#myeztravel-box");
	var popMargTop=($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
	}else{
		myeztravel.opendata(url);
		//alert('trae itinerary');
		}
}
}
myeztravel.newagain=function(id){
	if(id == 0){var conf = confirm('This will delete all and begin again from cero, are you sure?')}else var conf =true;
	if(!conf){return false;}
	var $popup=$("#myeztravel-box");
	var popMargTop=($popup.height() + 24) / 2; 
	var popMargLeft=($popup.width() + 24) / 2; 
	$popup.fadeIn(300);
	$('body').append('<div id="mask" class="mask"></div>');
	$('#mask').fadeIn(300);
}
/* load global variables */
$(document).ready(function(e) {
	vienedeplan=false;
	$('#mezt-top-button-faq').click(function(e){
		$('body').append('<div id="mask-faq" class="mask-faq"></div>');
		var _url = "data_ajax/myeztravel_content3.cfm?"+randomNumberUrl()+"";
		var _urlconfig = {action:'Faq_index'};
	$('#myeztravel-faq').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){
		case "error":
		$('#myeztravel-faq').empty();
		break;
		case "success":
		$('#mask-faq').fadeIn(300);
		$('#myeztravel-faq').fadeIn(300);
		}
	});
	})
	$("#myeztravel-buynow").click( function(e) {
		e.stopPropagation();e.preventDefault();
		Showcart();
		})
	$("#Datepicker" ).datepicker();
	$("#Datepicker2" ).datepicker();
	$("#Datepicker3" ).datepicker();
	$("#Datepicker4" ).datepicker();	
        $('#Ciudad_sel').autocomplete({
            source: function(query, response) {
                $.ajax({
                    url: "/cfc/mapcity.cfc?method=queryNames&returnformat=json",
                    dataType: "json",
                    data: {
                        searchPhrase: query.term
                    },
                    success: function(result) {
                        response(result);
                    }
                });
            }
        });
        $('#Ciudad_sel2').autocomplete({
            source: function(query, response) {
                $.ajax({
                    url: "/cfc/mapcity.cfc?method=queryNames&returnformat=json",
                    dataType: "json",
                    data: {
                        searchPhrase: query.term
                    },
                    success: function(result) {
                        response(result);
                    }
                });
            }
        });
        $('#Ciudad_sel3').autocomplete({
            source: function(query, response) {
                $.ajax({
                    url: "/cfc/mapcity.cfc?method=queryNames&returnformat=json",
                    dataType: "json",
                    data: {
                        searchPhrase: query.term
                    },
                    success: function(result) {
                        response(result);
                    }
                });
            }
        });
        $('#Ciudad_sel4').autocomplete({
            source: function(query, response) {
                $.ajax({
                    url: "/cfc/mapcity.cfc?method=queryNames&returnformat=json",
                    dataType: "json",
                    data: {
                        searchPhrase: query.term
                    },
                    success: function(result) {
                        response(result);
                    }
                });
            }
        });
	$('#roadmapplace-boxmedia2 a.closesmall, #roadmapplace-boxmedia a.closesmall, #roadmapplace-boxmedia3 a.closesmall').click( function() {
		$("#roadmapplace-boxmedia2 .box-body iframe, #roadmapplace-boxmedia .box-body iframe, #roadmapplace-boxmedia3 .box-body iframe")
		.empty()
		.attr("src","")
		;
	if(showinfoplace_source == 'myeztravel'){var popup = $("#Myeztravel_PlaceBox");}
	if(showinfoplace_source == 'planbox'){var popup = $("#Myeztravel_PlanBox");}
	if(showinfoplace_source == 'myeztravelhotdeal'){var popup = $("#Myeztravel_PlaceBox3");}
	if(showinfoplace_source == 'myeztravelviewplan'){ var popup =$('#Myeztravel_PlaceBox5');}
		//var popup = $("#Myeztravel_PlaceBox");
		$(popup).fadeIn(0);
		$('#roadmapplace-boxmedia3').fadeOut(300);
		$('#roadmapplace-boxmedia2').fadeOut(300);
		$('#roadmapplace-boxmedia').fadeOut(300);
		return false;
	});
$('#Hotdeals-Box a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		//mapcity.getPlaces();
		//$("#iframe_myeztravelcity").empty().attr("src","");
		$('#mask').fadeOut(300);
		$('#Hotdeals-Box').fadeOut(300);
		$('#Myeztravel_PlaceBox').fadeOut(300);
		$('#mask').remove();
	});
$('#Myeztravel_MapPlanBox a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		//mapcity.getPlaces();
		//$("#iframe_myeztravelcity").empty().attr("src","");
		//$('#mask').fadeOut(300);
		$('#Myeztravel_MapPlanBox').fadeOut(300);
		//$('#mask').remove();
		$('#Myeztravel_MapPlanBox2').empty();
		var $popup=$("#Myeztravel_PlanBox");
		$popup.fadeIn(300)
	});
$('#Myeztravel_PlaceBox7 a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		$('#Myeztravel_PlaceBox7').fadeOut(300);
		$('#Myeztravel_PlaceBox8').empty();
		var $popup=$("#routes_box");
		$popup.fadeIn(300)
		google.maps.event.trigger(map2, 'resize');
	});
$('#Myeztravel_PlaceBox5 a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		$('#Myeztravel_PlanBox').fadeIn(300);
		$('#Myeztravel_PlaceBox5').fadeOut(300);
		$('#Myeztravel_PlaceBox6').empty();
//		var ids = document.getElementById('ids_new_h').value;
//		alert(ids);
	});
$('#Myeztravel_PlaceBox3 a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		$('#Hotdeals-Box').fadeIn(300);
		$('#Myeztravel_PlaceBox3').fadeOut(300);
		$('#Myeztravel_PlaceBox4').empty();
//		var ids = document.getElementById('ids_new_h').value;
//		alert(ids);
	});
$('#Myeztravel_PlaceBox a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		$('#Myeztravel_PlaceBox').fadeOut(300);
		//$('#mask').remove();
		$('#Myeztravel_PlaceBox2').empty();
		var $popup=$("#Myeztravel_MapPlanBox");
		$popup.fadeIn(300)
		google.maps.event.trigger(map, 'resize');
	});
$('#Myeztravel_PlanMap a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		//mapcity.getPlaces();
		//$("#iframe_myeztravelcity").empty().attr("src","");
		//$('#mask').fadeOut(300);
		$('#Myeztravel_PlanMap').fadeOut(300);
		//$('#mask').remove();
		$('#Myeztravel_PlanMap2').empty();
		var $popup=$("#Myeztravel_PlanBox");
		$popup.fadeIn(300)
	});
$('#Myeztravel_PlanBox a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		//mapcity.getPlaces();
		//$("#iframe_myeztravelcity").empty().attr("src","");
		$('#mask').fadeOut(300);
		$('#Myeztravel_PlanBox').fadeOut(300);
		$('#mask').remove();
		$('#Myeztravel_PlanBox2').empty();
		if(vienedeplan){vienedeplan=false;myeztravel.viewatrplan(vienedeplan_C,vienedeplan_D);}
	});
$('#myeztravel-box a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		//mapcity.getPlaces();
		//$("#iframe_myeztravelcity").empty().attr("src","");
		$('#mask').fadeOut(300);
		$('#myeztravel-box').fadeOut(300);
		$('#mask').remove();
	});
$('#myeztravel-box2 a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		//mapcity.getPlaces();
		//$("#iframe_myeztravelcity").empty().attr("src","");
		$('#mask').fadeOut(300);
		$('#myeztravel-box2').fadeOut(300);
		$('#mask').remove();
	});
$('#myeztravel-box3 a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		//mapcity.getPlaces();
		//$("#iframe_myeztravelcity").empty().attr("src","");
		$('#mask').fadeOut(300);
		$('#myeztravel-box3').fadeOut(300);
		$('#mask').remove();
	});
$('#Hotelsmappopup-box a.closesmall').click( function(e) {
		e.stopPropagation();e.preventDefault();
		//mapcity.getPlaces();
		var num = document.getElementById('numcity_').value;
		var added= document.getElementById(num+'id_added2').value;
		document.getElementById(num+'id_added').value=added;
		$("#iframe_mapHotelscity").empty().attr("src","");
		$('#mask').fadeOut(300);
		$('#Hotelsmappopup-box').fadeOut(300);
		$('#mask').remove();
	});
$('#myeztravel-box #myeztravel-create').click( function(e) {
		e.stopPropagation();e.preventDefault();
		var Air = document.getElementById('Air-Consulta').value;
		var Hotel = document.getElementById('Hotels-Consulta').value;
		var Atractions = document.getElementById('Atractions-Consulta').value;
		if (Air == 0 && Hotel == 0 && Atractions == 0){alert('Please Select at least one Category (Air,Hotels or Attractions)'); return false;}
		var Date_1=$("#Datepicker" ).val();
		if (Date_1 ==''){alert('Please Select a Valid Departure Date'); $("#Datepicker" ).focus(); return false;}
		var Date_2=$("#Datepicker2" ).val();
		if (Date_2 ==''){alert('Please Select a Valid End Date'); $("#Datepicker2" ).focus(); return false;}
		var date1_ = new fecha(Date_1)     
	   	var date2_ = new fecha(Date_2) 
	    var miFechaI = new Date(date1_.anio, date1_.mes, date1_.dia );
	    var miFechaF = new Date(date2_.anio, date2_.mes, date2_.dia );
	    var diferencia =  miFechaF.getTime()- miFechaI.getTime();
		var dias_t = Math.floor(diferencia / (1000 * 60 * 60 * 24));
		if(dias_t<0){alert('Please Select a Valid End Date'); $("#Datepicker2" ).focus(); return false;}
		if(dias_t<1 && Hotel==1){alert('To view hotels you have to include at least one night in your dates, Please Select a Valid End Date or deactivate the Hotels button'); $("#Datepicker2" ).focus(); return false;}
		var Ciudad_1_=$('#Ciudad_sel').val();
		if (Ciudad_1_ =='' && Air ==1){alert('Please Enter a Valid Departure City');$("#Ciudad_sel" ).focus(); return false;}
		var Ciudad_ = Ciudad_1_.split(',');
		var Ciudad_1=Ciudad_[0];
		var Ciudad_1=Ciudad_1.replace(/ /g,'%20');
		var Ciudad_2_=$('#Ciudad_sel2').val();
		if (Ciudad_2_ ==''){alert('Please Enter a Valid Departure City'); $("#Ciudad_sel2" ).focus(); return false;}
		var Ciudad__ = Ciudad_2_.split(',');
		var Ciudad_2=Ciudad__[0];
		var Ciudad_2=Ciudad_2.replace(/ /g,'%20');
		myeztravel.Loadresults(Air,Hotel,Atractions,Ciudad_1,Ciudad_2,Date_1,Date_2,0);
		$('#mask').fadeOut(300);
		$('#myeztravel-box').fadeOut(300);
		//alert(Air+''+Hotel+''+Atractions+''+Date_1+' '+Ciudad_1);
	});
$('#myeztravel-box2 #myeztravel-addcity').click( function(e) {
		e.stopPropagation();e.preventDefault();
		var Air = document.getElementById('Air-Consulta2').value;
		var Hotel = document.getElementById('Hotels-Consulta2').value;
		var Atractions = document.getElementById('Atractions-Consulta2').value;
		if (Air == 0 && Hotel == 0 && Atractions == 0){alert('Please Select at least one Category (Air,Hotels or Attractions)'); return false;}
		var Date_1=$("#Datepicker3" ).val();
		if (Date_1 ==''){alert('Please Select a Valid Departure Date'); $("#Datepicker3" ).focus();  return false;}
		var Date_2=$("#Datepicker4" ).val();
		if (Date_2 ==''){alert('Please Select a Valid End Date'); $("#Datepicker4" ).focus();  return false;}
		var date1_ = new fecha(Date_1)     
	   	var date2_ = new fecha(Date_2) 
	    var miFechaI = new Date(date1_.anio, date1_.mes, date1_.dia );
	    var miFechaF = new Date(date2_.anio, date2_.mes, date2_.dia );
	    var diferencia =  miFechaF.getTime()- miFechaI.getTime();
		var dias_t = Math.floor(diferencia / (1000 * 60 * 60 * 24));
		if(dias_t<0){alert('Please Select a Valid End Date'); $("#Datepicker4" ).focus(); return false;} 
		if(dias_t<1 && Hotel==1){alert('To view hotels you have to include at least one night in your dates, Please Select a Valid End Date or deactivate the Hotels button'); $("#Datepicker2" ).focus(); return false;}
		var Ciudad_1_=$('#Ciudad_sel').val();
		var Ciudad_1_=$('#Ciudad_sel3').val();
		if (Ciudad_1_ =='' && Air ==1){alert('Please Enter a Valid Departure City');$("#Ciudad_sel3" ).focus();  return false;}
		var Ciudad_ = Ciudad_1_.split(',');
		var Ciudad_1=Ciudad_[0];
		var Ciudad_1=Ciudad_1.replace(/ /g,'%20');
		var Ciudad_2_=$('#Ciudad_sel4').val();
		if (Ciudad_2_ ==''){alert('Please Enter a Valid Departure City'); $("#Ciudad_sel4" ).focus();  return false;}
		var Ciudad__ = Ciudad_2_.split(',');
		var Ciudad_2_=Ciudad__[0];
		var Ciudad_2=Ciudad_2_.replace(/ /g,'%20');
		var ciudad=document.getElementById('contador_Ciudades').value;
		myeztravel.Addcity(Air,Hotel,Atractions,Date_1,Date_2,Ciudad_1,Ciudad_2);
		myeztravel.Createcity(ciudad,Ciudad_2_,Date_1);
		if(Hotel ==1){
		myeztravel.LoadHotels('',Date_1,Date_2,Ciudad_2,'','000000',ciudad);}
		if(Air==1){}
		if(Atractions==1){
		myeztravel.LoadAtrac(Date_1,Date_2,Ciudad_2,ciudad);}
		//myeztravel.Loadresults(Air,Hotel,Atractions,Ciudad_1,Ciudad_2,Date_1,Date_2);
		$('#mask').fadeOut(300);
		$('#myeztravel-box2').fadeOut(300);
		//alert(Air+' '+Hotel+' '+Atractions+' '+Date_1+' '+Ciudad_1);
	});
$('#myeztravel-box #div_air').click( function(e) {
	e.stopPropagation();e.preventDefault();
	var Air = document.getElementById('Air-Consulta').value;
	//alert(Air);	
	if(Air==1){
		document.getElementById('Air-Consulta').value = 0;
		document.getElementById('div_air').innerHTML='<a id="myeztravel-button-Air" class="button-round-2 button-round-grey2" href="#" style="text-decoration:none; font-size:12px;">Air</a>';
		}
	else{document.getElementById('Air-Consulta').value = 1;
	document.getElementById('div_air').innerHTML= '<a id="myeztravel-button-Air" class="button-round-2 button-round-red2" href="#" style="text-decoration:none; font-size:12px;">Air</a>';
	}
	});
$('#myeztravel-box #div_hotel').click( function(e) {
	e.stopPropagation();e.preventDefault();
	var Hotel = document.getElementById('Hotels-Consulta').value;
	//alert(HotelAir);	
	if(Hotel==1){
		document.getElementById('Hotels-Consulta').value = 0;
		document.getElementById('div_hotel').innerHTML='<a id="myeztravel-button-Air" class="button-round-2 button-round-grey2" href="#" style="text-decoration:none; font-size:12px;">Hotels</a>';
		}
	else{document.getElementById('Hotels-Consulta').value = 1;
	document.getElementById('div_hotel').innerHTML= '<a id="myeztravel-button-Air" class="button-round-2 button-round-red2" href="#" style="text-decoration:none; font-size:12px;">Hotels</a>';
	}
	});
$('#myeztravel-box #div_atraction').click( function(e) {
	e.stopPropagation();e.preventDefault();
	var Atractions = document.getElementById('Atractions-Consulta').value;
	//alert(HotelAir);	
	if(Atractions==1){
		document.getElementById('Atractions-Consulta').value = 0;
		document.getElementById('div_atraction').innerHTML='<a id="myeztravel-button-Air" class="button-round-2 button-round-grey2" href="#" style="text-decoration:none; font-size:12px;">Atractions</a>';
		}
	else{document.getElementById('Atractions-Consulta').value = 1;
	document.getElementById('div_atraction').innerHTML= '<a id="myeztravel-button-Air" class="button-round-2 button-round-red2" href="#" style="text-decoration:none; font-size:12px;">Atractions</a>';
	}
	});
$('#myeztravel-box2 #div_air2').click( function(e) {
	e.stopPropagation();e.preventDefault();
	var Air = document.getElementById('Air-Consulta2').value;
	//alert(Air);	
	if(Air==1){
		document.getElementById('Air-Consulta2').value = 0;
		document.getElementById('div_air2').innerHTML='<a id="myeztravel-button-Air" class="button-round-2 button-round-grey2" href="#" style="text-decoration:none; font-size:12px;">Air</a>';
		}
	else{document.getElementById('Air-Consulta2').value = 1;
	document.getElementById('div_air2').innerHTML= '<a id="myeztravel-button-Air" class="button-round-2 button-round-red2" href="#" style="text-decoration:none; font-size:12px;">Air</a>';
	}
	});
$('#myeztravel-box2 #div_hotel2').click( function(e) {
	e.stopPropagation();e.preventDefault();
	var Hotel = document.getElementById('Hotels-Consulta2').value;
	//alert(HotelAir);	
	if(Hotel==1){
		document.getElementById('Hotels-Consulta2').value = 0;
		document.getElementById('div_hotel2').innerHTML='<a id="myeztravel-button-Air" class="button-round-2 button-round-grey2" href="#" style="text-decoration:none; font-size:12px;">Hotels</a>';
		}
	else{document.getElementById('Hotels-Consulta2').value = 1;
	document.getElementById('div_hotel2').innerHTML= '<a id="myeztravel-button-Air" class="button-round-2 button-round-red2" href="#" style="text-decoration:none; font-size:12px;">Hotels</a>';
	}
	});
$('#mask').click(function(e){$('#mask').fadeOut(300);})
$('#myeztravel-box2 #div_atraction2').click( function(e) {
	e.stopPropagation();e.preventDefault();
	var Atractions = document.getElementById('Atractions-Consulta2').value;
	//alert(HotelAir);	
	if(Atractions==1){
		document.getElementById('Atractions-Consulta2').value = 0;
		document.getElementById('div_atraction2').innerHTML='<a id="myeztravel-button-Air" class="button-round-2 button-round-grey2" href="#" style="text-decoration:none; font-size:12px;">Atractions</a>';
		}
	else{document.getElementById('Atractions-Consulta2').value = 1;
	document.getElementById('div_atraction2').innerHTML= '<a id="myeztravel-button-Air" class="button-round-2 button-round-red2" href="#" style="text-decoration:none; font-size:12px;">Atractions</a>';
	}
	});
	myeztravel.initPage();
});
jQuery.fn.extend({
	showLoading: function (testmessage,empty) {
		var _testmessage = (typeof(testmessage)=="string")?"<br />"+testmessage:"";
		var _empty = (typeof(empty) == "boolean")?empty:false;
		var x = $(this);
		if(_empty){x.empty();}
		x.prepend('<div id="maskload" align="center" class="mask-loading"><div class="mask-loading-image"><img src="../images/icons/32/loader1.gif" />'+_testmessage+'</div></div>');
		var y = x.find('.mask-loading');
		var z = y.find('.mask-loading-image');
		var i = z.find('img');
		y.fadeIn("fast");
		y.height(x.height());
		y.width(x.width());
		z.css({ 
			'margin-top' : -(z.height()/2),
			'margin-left' : -(z.width()/2)
		});
	}
});
jQuery.fn.extend({
	showLoading2: function (testmessage,empty) {
		var _testmessage = (typeof(testmessage)=="string")?"<br />"+testmessage:"";
		var _empty = (typeof(empty) == "boolean")?empty:false;
		var x = $(this);
		//if(_empty){x.empty();}
		x.prepend('<div class="mask-loading"><div class="mask-loading-image"><img src="../images/icons/32/loader1.gif" />'+_testmessage+'</div></div>');
		var y = x.find('.mask-loading');
		var z = y.find('.mask-loading-image');
		var i = z.find('img');
		y.fadeIn("fast");
		y.height(x.height());
		y.width(x.width());
		z.css({ 
			'margin-top' : -(z.height()/2),
			'margin-left' : -(z.width()/2)
		});
	}
});