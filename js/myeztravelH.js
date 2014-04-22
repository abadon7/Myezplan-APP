function change_type(num,num2){
if(num2==1){
	var nombre = 'checkbox'+num;
	var check= document.getElementById(nombre).checked;
	if(check){document.getElementById(nombre).checked = false;}
	else{document.getElementById(nombre).checked = true;}
	}
if(showhide){alert('You are in selections mode, if you wanna see all hotels again please click in "ALL" button');return false;}
MuestraPuntos();
}
function change_type2(num,num2){
if(num2==1){
	var nombre = 'checkbox'+num+'_';
	var check= document.getElementById(nombre).checked;
	if(check){document.getElementById(nombre).checked = false;}
	else{document.getElementById(nombre).checked = true;}
	}
if(showhide){alert('You are in selections mode, if you wanna see all hotels again please click in "ALL" button');return false;}
MuestraPuntos();
}
function MuestraPuntos(){
if(showhide){return false;}
var _ratings=[];
var _rating=$("input:checkbox[name='rating_']:checked").each(function(index, element) {
	_ratings.push(parseInt($(element).val()));
	});
var _prices=[];
var _price=$("input:checkbox[name='prices_']:checked").each(function(index, element) {
	//alert(parseInt($(element).val()));
	_prices.push(parseInt($(element).val()));
	});
	var star5 = 0;var star4=0;var star3=0;var star2=0;var star1=0;
	var cprice5 = 0;var cprice4=0;var cprice3=0;var cprice2=0;var cprice1=0;
for (x=0;x<=((puntos.length-1));x++){
	var coordenadas = puntos[x].position.toString().replace("(","").replace(")","").split(','); 
	var puntolat = parseFloat(coordenadas[0]);
	var puntolng = parseFloat(coordenadas[1]);
	var contador = puntos[x].title;
	var puntorating = document.getElementById('rat'+contador).value;
	var puntoprice = parseInt(document.getElementById('price'+contador).value);
	//alert(puntoprice);
	var sipasa2 = false;
	if(_prices.length == 0){var sipasa2 = true;}
	for (p=0;p<=((_prices.length-1));p++){
		if(_prices[p]==201 && puntoprice > 200){var sipasa2 = true;}
		if (_prices[p]<201){
			if(puntoprice <= _prices[p] && puntoprice > (_prices[p]-50)){
				var sipasa2 = true;
				};
				}
		}
	var sipasa = false;
	if(_ratings.length == 0){var sipasa = true;}
	for (r=0;r<=((_ratings.length-1));r++){
		if(puntorating >= _ratings[r] && puntorating < (_ratings[r]+1)){var sipasa = true;}
		}
	puntos[x].setVisible(false);
	document.getElementById('div_'+contador).style.display = 'none';
	var sipasa3 = false;
	if (puntolat > parseFloat(lat1) && puntolat < parseFloat(lat2) && puntolng > parseFloat(lng1) && puntolng < parseFloat(lng2)){
		var sipasa3 = true;//puntos[x].setVisible(true);
	}
	if(sipasa && sipasa3){
		if(puntoprice >0 && puntoprice <=50){cprice1=cprice1+1;};
		if(puntoprice >50 && puntoprice <=100){cprice2=cprice2+1;};
		if(puntoprice >100 && puntoprice <=150){cprice3=cprice3+1;};
		if(puntoprice >150 && puntoprice <=200){cprice4=cprice4+1;};
		if(puntoprice >200){cprice5=cprice5+1;};
		}
	if(sipasa3 && sipasa2){
		if(puntorating >=0 && puntorating <2){star1=star1+1};
		if(puntorating >=2 && puntorating <3){star2=star2+1};
		if(puntorating >=3 && puntorating <4){star3=star3+1};
		if(puntorating >=4 && puntorating <5){star4=star4+1};
		if(puntorating >=5){star5=star5+1};
		}
	if (sipasa && sipasa2 && sipasa3){
		document.getElementById('div_'+contador).style.display = 'block';
		puntos[x].setVisible(true);
	}
}
document.getElementById('rat_count1').innerHTML = '<span style="font-size:12px;">('+star1+')</span>';
document.getElementById('rat_count2').innerHTML = '<span style="font-size:12px;">('+star2+')</span>';
document.getElementById('rat_count3').innerHTML = '<span style="font-size:12px;">('+star3+')</span>';
document.getElementById('rat_count4').innerHTML = '<span style="font-size:12px;">('+star4+')</span>';
document.getElementById('rat_count5').innerHTML = '<span style="font-size:12px;">('+star5+')</span>';
document.getElementById('price_count1').innerHTML = '<span style="font-size:12px;">('+cprice1+')</span>';
document.getElementById('price_count2').innerHTML = '<span style="font-size:12px;">('+cprice2+')</span>';
document.getElementById('price_count3').innerHTML = '<span style="font-size:12px;">('+cprice3+')</span>';
document.getElementById('price_count4').innerHTML = '<span style="font-size:12px;">('+cprice4+')</span>';
document.getElementById('price_count5').innerHTML = '<span style="font-size:12px;">('+cprice5+')</span>';
	}
function change_area(id,num,cont,cual){
if(cual == 1){
var nombre = 'checkbox_'+num;
var check= document.getElementById(nombre).checked;
if(check){
document.getElementById(nombre).checked = false;
}
else{
document.getElementById(nombre).checked = true;
}
}
paso=0;
var _area=$("input:checkbox[name='Areas']:checked").each(function(index, element) {
	var c=parseInt($(element).val());
	//alert(c);
	var nombre2= 'area_punto1_'+c;
	var punto1=document.getElementById(nombre2).value;
	var nombre2= 'area_punto2_'+c;
	var punto2=document.getElementById(nombre2).value;
	punto1v = punto1.toString().replace("(","").replace(")","").split(',');
	punto2v = punto2.toString().replace("(","").replace(")","").split(',');
	if(paso == 0){
		lat_punto1 = parseFloat(punto1v[0]);
		lng_punto1 = parseFloat(punto1v[1]);
		lat_punto2 = parseFloat(punto2v[0]);
		lng_punto2 = parseFloat(punto2v[1]);
		//alert(lat_punto1+' '+lat_punto2);
		paso = 1;} 
	else{
		if (lat_punto1>parseFloat(punto1v[0]))
			{lat_punto1 =parseFloat(punto1v[0]);}
		if (lng_punto1>parseFloat(punto1v[1]))
			{lng_punto1 =parseFloat(punto1v[1]);}
		if (lat_punto2<parseFloat(punto2v[0]))
			{lat_punto2 =parseFloat(punto2v[0]);}
		if (lng_punto2<parseFloat(punto2v[1]))
			{lng_punto2 =parseFloat(punto2v[1]);}
	}
	});
//alert(lat_punto1);
if (!lat_punto1){ 
//alert('undefined');
var punto1=document.getElementById('area_punto1_1').value;
var punto2=document.getElementById('area_punto2_1').value;
punto1v = punto1.toString().replace("(","").replace(")","").split(',');
punto2v = punto2.toString().replace("(","").replace(")","").split(',');
var lat_punto1 = parseFloat(punto1v[0]);
var lng_punto1 = parseFloat(punto1v[1]);
var lat_punto2 = parseFloat(punto2v[0]);
var lng_punto2 = parseFloat(punto2v[1]);
document.getElementById('checkbox_1').checked = true;
}
	var pnt1 =new google.maps.LatLng(lat_punto1,lng_punto1);	
	var pnt2 =new google.maps.LatLng(lat_punto2,lng_punto2); 
	var AreaBounds = new google.maps.LatLngBounds();
	AreaBounds.extend(pnt1);
	AreaBounds.extend(pnt2);
	var GLOBE_WIDTH = 256; // a constant in Google's map projection
	var west = pnt1.lng();
	var east = pnt2.lng();
	var angle = east - west;
	if (angle < 0) {
		angle += 360;
	}
	var  center=AreaBounds.getCenter();
	var zoom = Math.round(Math.log(600 * 360 / angle / GLOBE_WIDTH) / Math.LN2);
	map.setCenter(center);
	map.setZoom(zoom);
}
function showpuntos_sel(num){
var selected_ = window.top.document.getElementById(num+'id_added').value;
if(!showhide){
if(selected_ == '000000'){alert('No Hotels Selected');return false;}
showhide = true;
document.getElementById('botondeselections').value = 'All';
document.getElementById('botondeselections').className = 'button-round-2 button-round-red2';
document.getElementById('botondeselections2').value = 'All';
document.getElementById('botondeselections2').style.backgroundColor="#C00000";
var cont = 0
var selected = selected_.split(',');
	for (x=0;x<=((puntos.length-1));x++){
		var coordenadas = puntos[x].position.toString().replace("(","").replace(")","").split(','); 
		var puntolat = parseFloat(coordenadas[0]);
		var puntolng = parseFloat(coordenadas[1]);
		var contador = puntos[x].title;
		var puntoid = document.getElementById('id'+contador).value;
		puntos[x].setVisible(false);
		document.getElementById('div_'+contador).style.display = 'none';
		for (s=0;s<=((selected.length)-1);s++){
			if(selected[s]==puntoid){
				var cont = cont+1;
				puntos[x].setVisible(true);
				document.getElementById('div_'+contador).style.display = 'block';
	if(cont == 1){
		lat_punto1 = puntolat;
		lng_punto1 = puntolng;
		lat_punto2 = puntolat;
		lng_punto2 = puntolng;}
	else{
		if (lat_punto1>puntolat)
			{lat_punto1 =puntolat;}
		if (lng_punto1>puntolng)
			{lng_punto1 =puntolng;}
		if (lat_punto2<puntolat)
			{lat_punto2 =puntolat;}
		if (lng_punto2<puntolng)
			{lng_punto2 =puntolng;};}
				}
		}
	}
if (lat_punto1 != lat_punto2){
	var pnt1 =new google.maps.LatLng(lat_punto1,lng_punto1);	
	var pnt2 =new google.maps.LatLng(lat_punto2,lng_punto2); 
	var AreaBounds = new google.maps.LatLngBounds();
	AreaBounds.extend(pnt1);
	AreaBounds.extend(pnt2);
	map.fitBounds(AreaBounds);}
else{var pnt1 =new google.maps.LatLng(lat_punto1,lng_punto1);map.setCenter(pnt1);map.setZoom(16);}
}
else{
	showhide = false;
	document.getElementById('botondeselections').value = 'Selections';
	document.getElementById('botondeselections').className = 'button-round-2 button-round-blue2';
	document.getElementById('botondeselections2').value = 'Selections';
	document.getElementById('botondeselections2').style.backgroundColor="#17375E";
	change_area(0,0,0,0);}
//alert(showhide);
}