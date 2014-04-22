// JavaScript Document
	function mostrar_tab(cual,obja,objp){
		try{ document.getElementById("tab-1").style.display = 'none'; } catch(err){ }
		try{ document.getElementById("tab-2").style.display = 'none'; } catch(err){ }
		try{ document.getElementById("tab-3").style.display = 'none'; } catch(err){ }
		try{ document.getElementById("tab-4").style.display = 'none'; } catch(err){ }
		try{ document.getElementById("tab-5").style.display = 'none';} catch(err){ }
		try{ document.getElementById("tab-6").style.display = 'none';} catch(err){ }
		try{ document.getElementById("tab-7").style.display = 'none';} catch(err){ }
		try{ document.getElementById("tab-8").style.display = 'none';} catch(err){ }
		
		try{document.getElementById('tab1a').style.background = '#AAAAAA'; } catch(err){ }
		try{document.getElementById('tab2a').style.background = '#AAAAAA'; } catch(err){ }
		try{document.getElementById('tab3a').style.background = '#AAAAAA'; } catch(err){ }
		try{document.getElementById('tab4a').style.background = '#C00000'; } catch(err){ }
		try{document.getElementById('tab5a').style.background = '#AAAAAA'; } catch(err){ }
		try{document.getElementById('tab6a').style.background = '#AAAAAA'; } catch(err){ }
		try{document.getElementById('tab7a').style.background = '#AAAAAA'; } catch(err){ }
		try{document.getElementById('tab8a').style.background = '#AAAAAA'; } catch(err){ }
		var _cual = $("#"+objp).find("#"+cual)[0];
		var _obja =  $("#"+objp).find("#"+obja)[0];
		try{
			_cual.style.display = 'block';
		}catch (e){
			document.getElementById('tab-1').style.display = 'block';
		}
		try{
			_obja.style.background = '#000000';
		}catch (e){
			document.getElementById('tab1a').style.background = '#000000';
		}
	}
	/*
	function send_save(){
		<cfif isdefined("url.partida_") >
			aleat = Math.random() * 9999999999999999;
			var nombrep = $("#m_nombre").val();
			$.ajax({
			type: "POST",
			url: "data_ajax/ajax_check_nombre.cfm",
			async:false, 
			data: "mapa=<cfoutput>#url.mapa#</cfoutput>&aleat="+aleat+"&nombre="+nombrep,
			success: function(datos){
					
				 if(datos!=0){
					alert('You already have a plan under the same name.');
				}else{
					dssend_save();
				}
	
			}
		});
		
		<cfelse>
			alert("You must draw myezplan (step 4) to save.");
		</cfif>
	}
	function dssend_save(){
		aleat = Math.random() * 9999999999999999;
		var nombrep = $("#saveplan_name").val();
		var iniciop = $("#partida_").val();
		var llegadap = $("#llegada_").val();
		var prohibidosp = $("#prohibidos").val();
		var travelmode = $("#travelmode").val();
		if(iniciop=='ninguno' || llegadap=='ninguno'){
			alert('There is no route to save.');
		}else{
	
			$.ajax({
				type: "POST",
				url: "data_ajax/save_ajax.cfm",
				async:false, 
				data: "mapa=<cfoutput>#url.mapa#</cfoutput>&aleat="+aleat+"&iniciop="+iniciop+"&llegadap="+llegadap+"&prohibidosp="+prohibidosp+"&travelmode="+travelmode+"&nombre="+nombrep,
				success: function(datos){
						
					if(datos.indexOf('xnox')!=-1){
						pedir_sesion(1);
					}else{ 
						location.href=datos;
						//cerrar_login();
						//location.href = location.href;
					}
		
				}
			});
		}
	}	
	*/
	function votar(unico,mapa,pregunta,voto,divtemp,isvoto){
		var rnu=randomNumberUrl();
		if(isvoto == 1){alert("You already voted on this review.");return false;}
		var confirmation = window.confirm("Once you leave feedback, you can't edit it or take it back.");
		if(!confirmation){return false;}
		$.ajax({
				type: "POST",
				url: "data_ajax/votar_ajax.cfm",
				async:false, 
				cache:false,
				data: "mapa="+mapa+"&rnu="+rnu+"&unico="+unico+"&pregunta="+pregunta+"&voto="+voto,
				error: function(xhr, ajaxOptions, thrownError){
					alert(thrownError);
				},
				success: function(datos){
					if(datos.indexOf('xnox')!=-1){
						pedir_sesion(2);
					} else{ 
					//alert(datos); 
						renovar_votar(unico,mapa,pregunta,voto,divtemp);
					}
				}	
		});
	}
	function renovar_temp(divin){
		 var aa = document.getElementById(divin).innerHTML;
		 document.getElementById(divin+"_").innerHTML = aa;
	}
	function renovar_votar(unico,mapa,pregunta,voto,divtemp){
		var rnu=randomNumberUrl();
		$.ajax({
				type: "POST",
				url: "data_ajax/renovar_votar_ajax.cfm",
				async:false, 
				data: "mapa="+mapa+"&rnu="+rnu+"&unico="+unico+"&pregunta="+pregunta+"&voto="+voto,
				success: function(datos){
					if(datos=='no'){
						alert(datos);
					}else{ 
						document.getElementById('preg_'+pregunta).innerHTML=datos; 
						renovar_temp(divtemp);
					}
				}
		});
	}
	function externalBuy(chkbase,unico,mapa,name){
		var chkbasejqstr = "#"+chkbase;
		var chk = $(chkbasejqstr);
		if( !($(chk).is(':checked')) ){
			$(chk).attr("checked",true);
			$(chk).click();
		}
		$(chk).attr("checked",true);
		comprarAjax(unico,mapa);
		//return;
	}
	function comprar(objbase,unico,mapa,name){
		var el = document.getElementById(objbase);
		var inputs = el.getElementsByTagName('INPUT');
		for ( var i=0; i<inputs.length;i++ ){
			if(inputs[i].type=="checkbox"){
				if(inputs[i].value==name){
					if(!(inputs[i].checked)){
						var chk = $(inputs[i]);
						$(chk).attr("checked",true);
						$(chk).click();
					}
				}
			}
		}
		comprarAjax(unico,mapa);
		//return;
	}
	function comprarAjax(unico,mapa){
		var rnu=randomNumberUrl();
		if(cf_sid==""){
			pedir_sesion(2);
			return;
		}
		$.ajax({
				type: "POST",
				url: "data_ajax/cart_ajax_events.cfm",
				async:false, 
				cache:false,
				data: "mapa="+mapa+"&rnu="+rnu+"&unico="+unico+"&action=addcartitem",
				success: function(datos){
					/*
					if(datos.indexOf('xnox')!=-1){
						pedir_sesion(2);
					} else{
						alert(datos);
					}*/
					alert(datos);
				}	
		});
	}
	function cargar_ultimoi(obj){
			tour_val = obj.value;
			location.href="map.cfm?mapa="+tour_val+"&ciudad="+ciudad;
	}
	function pre_calcRoute(posit,titulo_marcador){
		pos_en_vecObj=0;
		pos_en_vect=0;
		
		if(puntos_existentes_nombre[0]==titulo_marcador){
			start=posit.toString().replace("(","").replace(")","");
			puntos_existentes_coor[0]=posit+'*';
		}
		else if(puntos_existentes_nombre[1]==titulo_marcador){
			end=posit.toString().replace("(","").replace(")","");
			puntos_existentes_coor[1]=posit+'*';
		}
		else{
			for(var i=0; i<puntos_existentes_nombre.length;i++){
				if(puntos_existentes_nombre[i]==titulo_marcador){
					pos_en_vecObj=i-2;
					pos_en_vect = i;
				}
			}
			puntos_existentes_coor[pos_en_vect]=posit+'*';
			var positMk =  posit.toString().replace("(","").replace(")","");
			waypts[pos_en_vecObj].location=positMk;
		}
		calcRoute(start,end);
	}

	function subcatselected(obj){
		var valor = obj.value;
		if(valor==-1){
		var layerscat = document.getElementsByTagName("div");
		for(var i=0; i<layerscat.length;i++){
		if(layerscat[i].id.indexOf("cont_xxcat_")!=-1){
		layerscat[i].style.display = 'none';
		}
		if(layerscat[i].id.indexOf("xxcat_")!=-1){
		layerscat[i].style.display = 'none';
		
		}
		}
		
		}else{
		var layerscat = document.getElementsByTagName("div");
		for(var i=0; i<layerscat.length;i++){
		if(layerscat[i].id.indexOf("cont_xxcat_")!=-1){
		layerscat[i].style.display = 'none';
		
		}
		if(layerscat[i].id.indexOf("xxcat_")!=-1){
		layerscat[i].style.display = 'none';
		
		}
		}
		
		document.getElementById('cont_xxcat_'+valor).style.display='block'; 
		document.getElementById('xxcat_'+valor).style.display='block'; 
		}
	}
	function cargar_subcategoria(num){
		document.getElementById('subcat_combo_').style.display='block'; 
		if(num==0){
		document.getElementById('subcat_combo_').style.display='none'; 
	}
	
	if(num!='a'){
		var rnu=randomNumberUrl();
		var param = "if(result_ajax==''){  document.getElementById('subcat_combo_').innerHTML='Sin resultados'; } else { document.getElementById('subcat_combo_').innerHTML=result_ajax;}";
		var url ='cargar_subcat_ajax.cfm?supercat='+num+'&rnu='+rnu;
		var ajax = new class_ajax(url, param);
		ajax.main_ajax();
		
		var layerscat = document.getElementsByTagName("div");
		for(var i=0; i<layerscat.length;i++){
		if(layerscat[i].id.indexOf("cont_xxcat_")!=-1){
		layerscat[i].style.display = 'block';
		}
		}
		
		var valor = num;
		var layerscat = document.getElementsByTagName("div");
		for(var i=0; i<layerscat.length;i++){
		if(layerscat[i].id.indexOf("supercat_")!=-1){
		layerscat[i].style.display = 'none';
		}
		}
		document.getElementById('supercat_'+valor).style.display='block'; 
	}else{
		var layerscat = document.getElementsByTagName("div");
		for(var i=0; i<layerscat.length;i++){
		if(layerscat[i].id.indexOf("cont_xxcat_")!=-1){
		layerscat[i].style.display = 'block';
		}
		}
		
		var valor = num;
		var layerscat = document.getElementsByTagName("div");
		for(var i=0; i<layerscat.length;i++){
		if(layerscat[i].id.indexOf("supercat_")!=-1){
		layerscat[i].style.display = 'block';
		}
		}
		}
	}
	
	
	function tooltip_(msg){
		if(msg!=''){
		document.getElementById('globo').innerHTML=msg;
		document.getElementById('globo').style.display='block';
	}
	
	}
	
	function toolout_(){
		document.getElementById('globo').innerHTML='';
		document.getElementById('globo').style.display='none';
	}
	
	function tooltip(e,msg){
		var xc = (!window.event)? e.pageX : event.x+document.documentElement.scrollLeft;
		var yc = (!window.event)? e.pageY : event.y+document.documentElement.scrollTop;
		var iebody=(document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body
		var dsoctop=document.all? iebody.scrollTop : pageYOffset
		xc = xc - 120;
		if(!window.event){
			yc = yc - 180
		}else{
			yc = yc - 180 - dsoctop;
		}
		if(navigator.userAgent.indexOf("Chrome")!=-1){
			yc = yc - 10 + (dsoctop*2);
		}
		document.getElementById('_tip').style.left=xc+'px';
		document.getElementById('_tip').style.top=yc+'px';
		document.getElementById('_tip').style.display = 'block'
		document.getElementById('_tip').innerHTML = msg; 
	
	}
	
	function toolout(){
		document.getElementById('_tip').style.display = 'none'
		document.getElementById('_tip').innerHTML = ''; 
	}
	
	function mostrardireccions(val){
		var objtrg = document.getElementById('directionsPanel');
		if(val==2){
		objtrg.style.display='none';
		}else{
		objtrg.style.display='none';
		}
	}
	
	function rellamar(obj,pointname,verif){
		var posvv=-1;
		var _checkvalue=obj.value;
		var _checkname=pointname;
		if(obj.checked==false){
			var checkboxes = document.getElementsByTagName('INPUT');
			for (i=0; i<checkboxes.length;i++ ){
				if(checkboxes[i].type=="checkbox"){
					if(checkboxes[i].value==_checkvalue){
						checkboxes[i].checked=false;
					}
				}
			}
			prohibidos_v.push(_checkvalue);
			for(var i=0; i<=combos_mixtos.length;i++ ){
				if(combos_mixtos[i]==_checkvalue)
					posvv = i;	
			}
			if(verif!='s'){
			combos_mixtos.splice(posvv, 1);
			}
			
			var combopartida = document.getElementById("partida_");
			var combollegada = document.getElementById("llegada_");
			for(var i=0;i<combopartida.children.length;i++){
				if(combopartida.children[i].value==_checkvalue){
					combopartida.options[i] = null;
				}
			}
			for(var i=0;i<combollegada.children.length;i++){
				if(combollegada.children[i].value==_checkvalue){
					combollegada.options[i] = null;
				}
			}
		}else{
			var checkboxes = document.getElementsByTagName('INPUT');
			for (i=0; i<checkboxes.length;i++ ){
				if(checkboxes[i].type=="checkbox"){
					if(checkboxes[i].value==_checkvalue){
						checkboxes[i].checked=true;
					}
				}
			}
			for(var i=0; i<=prohibidos_v.length;i++ ){
				if(prohibidos_v[i]==_checkvalue)
					posvv = i;	
			}
			prohibidos_v.splice(posvv, 1);
			if(verif!='s'){
				combos_mixtos.push(_checkvalue);
				/*Lo adiciono a los combos*/
				var combopartida = document.getElementById("partida_");
				var combollegada = document.getElementById("llegada_");
				
				theOption=document.createElement("OPTION");
				theText=document.createTextNode(_checkname);
				theOption.value=_checkvalue;
				theOption.appendChild(theText);
				combopartida.appendChild(theOption);
				
				theOption2=document.createElement("OPTION");
				theText2=document.createTextNode(_checkname);
				theOption2.value=_checkvalue;
				theOption2.appendChild(theText2);
				combollegada.appendChild(theOption2);
			}
			
		}
		document.getElementById("prohibidos").value=prohibidos_v;
		document.getElementById("combos_mixtos_i").value=combos_mixtos;
		var todosch = document.getElementsByTagName("INPUT");
		for(var i = 0; i<todosch.length; i++){
			if(todosch[i].type=="checkbox"){
				if(todosch[i].checked == true){
					//todosch[i].setAttribute('checked', 'checked');
					$(todosch[i]).attr("checked",true);
				}else{
					//todosch[i].removeAttribute('checked');
					$(todosch[i]).attr("checked",false);
				}
			}
		}
	}
	function recalcular(){
		var partidaar = document.getElementById("partida_").value;
		var llegadaar = document.getElementById("llegada_").value;
		var _form = document.getElementById("quitar_");
		var _formupid = document.getElementById("upid").value;
		if (_formupid == "" && currentuserplan != ""){
			document.getElementById("upid").value = currentuserplan;
		}
		if(partidaar=='ninguno' || llegadaar=='ninguno'){
			alert("Please, complete all the steps.");
			return;
		}
		_form.submit();
	}
/*
	var layerscat = document.getElementsByTagName("div");
	for(var i=0; i<layerscat.length;i++){
		if(layerscat[i].id.indexOf("cont_xxcat_")!=-1){
			layerscat[i].style.display = 'none';
		}
		if(layerscat[i].id.indexOf("xxcat_")!=-1){
			layerscat[i].style.display = 'none';
		}
	}
*/
	function loadin(){
		document.getElementById('loadi').style.display='none';
	}	
	function USGSOverlay(bounds, image, map) {
		this.bounds_ = bounds;
		this.image_ = image;
		this.map_ = map;
		this.div_ = null;
		this.setMap(map);
	}
	USGSOverlay.prototype = new google.maps.OverlayView();
	USGSOverlay.prototype.onAdd = function() {
		var div = document.createElement('DIV');
		div.style.border = "none";
		div.style.borderWidth = "0px";
		div.style.position = "absolute";
		var img = document.createElement("img");
		img.src = this.image_;
		img.style.width = "100%";
		img.style.height = "100%";
		div.appendChild(img);
		this.div_ = div;
		var panes = this.getPanes();
		panes.overlayLayer.appendChild(div);
	}
	USGSOverlay.prototype.draw = function() {
		var overlayProjection = this.getProjection();
		var sw = overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(parseFloat(coor1imagenv[0]),parseFloat(coor1imagenv[1])));
		var ne = overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(parseFloat(coor2imagenv[0]),parseFloat(coor2imagenv[1])));
		var div = this.div_;
		div.style.left = sw.x + 'px';
		div.style.top = ne.y + 'px';
		div.style.width = (ne.x - sw.x) + 'px';
		div.style.height = (sw.y - ne.y) + 'px';
	}
