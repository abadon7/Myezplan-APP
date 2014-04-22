// JavaScript Document
/* functions */
selectTabIn_mostrartab=function(tabdiv,delay){
	var _delay = typeof(delay) == "number"?delay:750;
	$("#vardiv").ready(function() {
		window.setTimeout(function(){mostrar_tab('tabinfo-deal-content','tabinfo-deal-tab',tabdiv,'nocambiar');},_delay);
	});
}
function mostrar_tab(cual,obja,objp, nombre){
	if (nombre != 'nocambiar'){
	document.getElementById('placename').innerHTML= (nombre);}
	try{ document.getElementById("tabinfo-description-content").style.display = 'none'; } catch(err){ }
	//try{ document.getElementById("tabinfo-description-content_texttour").style.display = 'none'; } catch(err){ }
	try{ document.getElementById("tabinfo-details-content").style.display = 'none';} catch(err){ }
	try{ document.getElementById("tabinfo-picvideo-content").style.display = 'none'; } catch(err){ }
	try{ document.getElementById("tab-3").style.display = 'none'; } catch(err){ }
	try{ document.getElementById("tabinfo-deal-content").style.display = 'none'; } catch(err){ }
	//try{ document.getElementById("tabinfo-deal-content_textdeal").style.display = 'none'; } catch(err){ }
	try{ document.getElementById("tabinfo-review-content").style.display = 'none';} catch(err){ }
	try{ document.getElementById("tab-7").style.display = 'none';} catch(err){ }
	try{ document.getElementById("tab-8").style.display = 'none';} catch(err){ }
	
	try{document.getElementById('tabinfo-description-tab').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tabinfo-details-tab').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tabinfo-picvideo-tab').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tab3a').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tabinfo-deal-tab').style.background = '#C00000'; } catch(err){ }
	try{document.getElementById('tabinfo-review-tab').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tab7a').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tab8a').style.background = '#AAAAAA'; } catch(err){ }
	var _cual = $("#"+objp).find("#"+cual)[0];
	var _obja =  $("#"+objp).find("#"+obja)[0];
	try{
		_cual.style.display = 'block';
	}catch (e){
		document.getElementById('tabinfo-description-content').style.display = 'block';
	}
	try{
		_obja.style.background = '#000000';
	}catch (e){
		document.getElementById('tabinfo-description-tab').style.background = '#000000';
	}
}
function mostrar_tab2(cual,obja,objp, nombre){
	if (nombre != 'nocambiar'){
	document.getElementById("placename").innerHTML= (nombre);}
	try{ document.getElementById("tabinfo-description-content2").style.display = 'none'; } catch(err){ }
	try{ document.getElementById("tabinfo-description-content_texttour").style.display = 'none'; } catch(err){ }
	try{ document.getElementById("tabinfo-details-content2").style.display = 'none';} catch(err){ }
	try{ document.getElementById("tabinfo-picvideo-content2").style.display = 'none'; } catch(err){ }
	try{ document.getElementById("tab-3").style.display = 'none'; } catch(err){ }
	try{ document.getElementById("tabinfo-deal-content2").style.display = 'none'; } catch(err){ }
	try{ document.getElementById("tabinfo-deal-content_textdeal").style.display = 'none'; } catch(err){ }
	try{ document.getElementById("tabinfo-review-content2").style.display = 'none';} catch(err){ }
	try{ document.getElementById("tab-7").style.display = 'none';} catch(err){ }
	try{ document.getElementById("tab-8").style.display = 'none';} catch(err){ }
	
	try{document.getElementById('tabinfo-description-tab2').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tabinfo-details-tab2').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tabinfo-picvideo-tab2').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tab3a').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tabinfo-deal-tab2').style.background = '#C00000'; } catch(err){ }
	try{document.getElementById('tabinfo-review-tab2').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tab7a').style.background = '#AAAAAA'; } catch(err){ }
	try{document.getElementById('tab8a').style.background = '#AAAAAA'; } catch(err){ }
	var _cual = $("#"+objp).find("#"+cual)[0];
	var _obja =  $("#"+objp).find("#"+obja)[0];
	try{
		_cual.style.display = 'block';
	}catch (e){
		document.getElementById('tabinfo-description-content2').style.display = 'block';
	}
	try{
		_obja.style.background = '#000000';
	}catch (e){
		document.getElementById('tabinfo-description-tab2').style.background = '#000000';
	}
}
//function setCheckedValueFromLeftCheckExternal(pname){
//	var chkpoint = $("#roadmapplace-box #box-body #tabsx_in_checkbox");
//	var checksLeft = $("#left_check :checkbox:checked");
//	for(var i=0; i<checksLeft.size();i++){
//		var chk = checksLeft[i];
//		if($(chk).val() == pname){
//			$(chkpoint).attr("checked",true);
//		}
//	}
//}
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
		pedir_sesion(1,"comprarAjax("+unico+","+mapa+")");
		return;
	}
	$.ajax({
			type: "POST",
			url: "data_ajax/cart_ajax_events.cfm",
			async:false, 
			cache:false,
			data: "mapa="+mapa+"&rnu="+rnu+"&unico="+unico+"&action=addcartitem",
			success: function(datos){
				alert(datos);
				if(typeof(comprarAjaxLocal_Result) == "function"){
					comprarAjaxLocal_Result();
				}
			}	
	});
}
function rellamar(obj,pointname,verif){
	var posvv=-1;
	var _checkvalue=obj.value;
	var _checkname=pointname;
	var combopartida = document.getElementById("partida_");
	var combollegada = document.getElementById("llegada_");
	if(typeof(prohibidos_v) == "undefined"){return false;}
	if(obj.checked==false){
		var checkboxes = document.getElementsByTagName('INPUT');
		for (i=0; i<checkboxes.length;i++ ){
			if(checkboxes[i].type=="checkbox"){
				if(checkboxes[i].value==_checkvalue && checkboxes[i].id!="tabsx_checkboxmix"){
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
		if(combopartida.options.length>10){
			alert("You have reached the maximum number of places(10) per plan.");
			obj.checked=false;
			return;
		}
		var checkboxes = document.getElementsByTagName('INPUT');
		for (i=0; i<checkboxes.length;i++ ){
			if(checkboxes[i].type=="checkbox"){
				if(checkboxes[i].value==_checkvalue && checkboxes[i].id!="tabsx_checkboxmix"){
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

