/* jquery events */
function change_cat(cat,area){
	//alert(cat+' '+area);
	var ids = document.getElementById('ids_new_h').value;
	var _url = "data_ajax/myeztravel_hotdeals_ajax.cfm?13546518546"+"";
	var _urlconfig = {action:'change_cat',area_:area,category:cat,ids_:ids};
	$('#List_deals').load(_url,_urlconfig,function (response, status, xhr){
	switch (status){case "error":$('#List_deals').empty();
		break;
		}
	});
	}
function check_image_load() {  
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

function is_in_view(elem) {  
    var docViewTop = $(window).scrollTop();  
    var docViewBottom = docViewTop + $(window).height();  
    var elemTop = $(elem).offset().top;  
    var elemBottom = elemTop + $(elem).height();  
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)); 
}  

// Llamado de la función check_image_load cuando se mueva el scroll y cuando cargue la página normalmente
$(window).scroll(function() { check_image_load(); });