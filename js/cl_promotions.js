function cheprice(id){
if(id==1){alert('This price is required');document.getElementById('Che_'+id).checked=true;return false;}
var che=document.getElementById('Che_'+id).checked;
var included=document.getElementById('tckincluded').value
if(che){
	document.getElementById('detail_regularprice'+id).disabled= false;
	document.getElementById('detail_specialprice'+id).disabled= false;
	var included=included+','+id;
	document.getElementById('tckincluded').value=included;
	}
	else{
	document.getElementById('detail_regularprice'+id).disabled= true;
	document.getElementById('detail_specialprice'+id).disabled= true;
	var included_= included.split(',');
	var included_n='';
	for(x=0;x<=(included_.length-1);x++){
		if(included_n==''){var div ='';}else{var div=',';}
		if(included_[x]!=id){var included_n=included_n+div+included_[x];}
		}
	document.getElementById('tckincluded').value=included_n;	
	}
}
function idunico(lolo){
aleat = Math.random() * 9999999999999999;
aleat2 = Math.random() * 9999999999999999;
aleatf = Math.round(aleat+aleat2);
return aleatf;
}
function SavePromo(){
document.getElementById('idunico').value=idunico(1);
var name=$('#Placename').val();
var expiration=$('#Expires').val();
var type=$('#detail_type').val();
var desc=$('#detail_desc').val();
var rest=$('#detail_rest').val();
var hours=$('#detail_hoursoperation').val();
var phone=$('#detail_phone').val();
var url=$('#detail_website').val();
var address=$('#detail_address').val();
var rprice=$('#detail_regularprice1').val();
var sprice=$('#detail_specialprice1').val();
var tips= $('#detail_tips').val();
var duration=$('#detail_duration').val();
if(name=='' || expiration=='' || type=='' || desc=='' || phone=='' || address=='' || rprice=='' || sprice==''){alert('All Required Data Must Be Complete');$('Placename').focus();return false;}
$("#new_promo").submit();
}
function acc_pri(){
var che= document.getElementById('check_reg').checked;
if(che){
	$('#button_save').html('<input type="button" class="button-round-2 button-round-blue2" onclick="SavePromo();" value="Save"/>');
	}
else{
	$('#button_save').html('<input type="button" class="button-round-2 button-round-gray2" value="Save"/>');
	}
}
function add_promotions(userid){
	var url = "data_ajax/cl_add_promotions.cfm?rnu=1354684656";
	var urlconfig = {action:"AddUserPromotions"};
			$('#promotions_data').load(url,urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#promotions_data').empty();break;
		}
	});
}
function traerciudadpromotions(estado){
var sel='<select id="select_city" name="select_city" onchange="crearmapa(this.value);"><option value="">Choose one...</option>';
for(x=0;x<=(countries.length-1);x++){
var city=countries[x].split(',');
var id=city[0];
var eid=city[1];
var name=city[2];
if(eid==estado){
var sel=sel+'<option value="'+id+'">'+name+'</option>';
}
if(x==(countries.length-1)){var sel=sel+'</select>';$('#div_select_city').html(sel);}
}
}
function crearmapa(city){
	var url = "data_ajax/cl_add_promotions.cfm?rnu=1354684656";
	var urlconfig = {action:"CreateMap",cityid:city};
			$('#mapa_cl').load(url,urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#mapa_cl').empty();break;
		}
	});
}