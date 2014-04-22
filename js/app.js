/* mobileinit functions */
$(function(){
	Array.prototype.plse_SortByCity=function(a, b){var sortA=a.name.toLowerCase(), sortB=b.name.toLowerCase();if (sortA<sortB)return -1; if (sortA>sortB) return 1; return 0;};
	Array.prototype.plse_ExistsById=function(id){var index=-1,_array=this;$.each(_array,function(i,el){if(el.id.toString()===id.toString()){index=i;return;}});return index;};
	Array.prototype.plse_Exists=function(object){var index=-1,_array=this;$.each(_array,function(i,el){if(el.id===object.id){index=i;return;}});return index;};
	Array.prototype.plse_Add=function(object){var _exists=this.plse_Exists(object);if(_exists===-1){this.push(object);this.sort(this.plse_SortByCity);return true;}return false;};
	Array.prototype.plse_Remove=function(object){var _array=this;$.each(_array,function(i,el){if(this.id===object.id){_array.splice(i,1);return true;}});return true;};
});
$(document).bind("mobileinit",function(e){
	/* app variables and basic functions 
	namespace: app.config 
	*/
	app.config=app.config||{
		urlwebmep:'http://www.myezplan.com/',
		urlwwwcfc:'cfc/',
		wwwcfclocation:"applocation.cfc",
		wwwcfcareaplace:"areaplace.cfc",
		ajaxerrormessage:'There was an error loading the data. Contact the admin.',
		loaded:false,
		$selectors:{
			cookieplaces:"EZMOBILEPLACES",
			inputplse:"#input-plse",
		},
		values:{
			plse:[],
			plsegroupedcity:{},
		},
		init:function(){
			this.urlwwwcfc=this.urlwebmep+this.urlwwwcfc;
			this.wwwcfclocation=this.urlwwwcfc+this.wwwcfclocation;
			this.wwwcfcareaplace=this.urlwwwcfc+this.wwwcfcareaplace;
			this.loaded=true;
		}
	};
	/* 
	namespace:	app.shared
	*/
	app.shared=app.shared||{
		ajaxError:function(xhr,ajaxOptions,thrownError){alert(thrownError);},
		submitSignInPassword:function(arg_form){
			var $form=$(arg_form);
			var $errormessage=$form.find('#error-message');
			var $inputusername=$form.find('[name="usr"]');
			var $inputpassword=$form.find('[name="pwd"]');
			$.ajax({
				url:'cfc/usersign.cfc?method=signin_json',
				type:'post',
				data:$form.serialize(),
				dataType:'json',
				success:function(data){
						if(data.success){
							app.userid=data.userid;app.user=data.user;app.username=data.username;
							$inputusername.val(null);$inputpassword.val(null);
							$("#nav-panel #panellisigin,#nav-panel #panellisigout").toggle(0);
							$('#signin.ui-dialog').dialog('close');
						}
					$errormessage.html(data.message).show(0).delay(2000).hide(0);
				},
				error: function(){
					$errormessage.html(app.config.ajaxerrormessage).delay(2000).hide(0);;
				}
			});
		},
		submitForgotPassword:function(){
			var $form=$('#forgotpassword #forgotpasswordform');
			var $usernamevalue=$form.find('input[name="usr"]').val();
			var $errormessage=$form.find('#error-message').html(null).hide(0);
			$.ajax({
				url:'cfc/usersign.cfc?method=forgotpassword_json',
				type:'post',
				data:{usr:$usernamevalue},
				dataType:'json',
				success:function(data){
					$errormessage.html(data.message).show(0).delay(2000).hide(0,function(){
						if(data.success){window.location ='./';}
					});
				},
				error: function(){
					$errormessage.html(app.config.ajaxerrormessage).show(0).delay(2000).hide(0);
				}
			});
		},
		submitChangePassword:function(){
			var $form=$('#changepassword #changepasswordform');
			var $errormessage=$form.find('#error-message');
			var $inputchangepassword=$form.find('#inputchangepassword');
			var $inputchangepasswordconfirm=$form.find('#inputchangepasswordconfirm');
			$.ajax({
				url:'cfc/usersign.cfc?method=changepassword_json',
				type:'post',
				data:{username:app.user,newpassword:$inputchangepassword.val()},
				dataType:'json',
				success:function(data){
					$errormessage.html(data.message).show(0).delay(2000).hide(0,function(){
						if(data.success){
							$inputchangepassword.val(null);$inputchangepasswordconfirm.val(null);
						}
					});
				},
				error: function(){
					$errormessage.html(app.config.ajaxerrormessage).delay(2000).hide(0);;
				}
			});
		},
		getCookiePlaces:function(){
			var $cookie=$.cookie(app.config.$selectors.cookieplaces);
			if(!($.isEmptyObject($cookie))){
				app.config.values.plse=JSON.parse($cookie);
			}
			app.page.placeselection.serializeplseGroupByCity();
			return app.config.values.plse;
		},
		setCookiePlaces:function(){
			$.cookie(app.config.$selectors.cookieplaces, JSON.stringify(app.config.values.plse));
			return this.getCookiePlaces();
		},
	};
	/* 
	namespace: app.page
	*/
	app.page=app.page||{
		route:{"home":"#home","placeselection":"placeselection.cfm","placeselectionmap":"placeselectionmap.cfm"},
	};
	/* 
	namespace: app.page.home
	*/
	app.page.home={
		$page:null,
		init:function(arg_page){
			this.$page=$(arg_page);
		},
		getCountries:function(arg_select_country,arg_select_city){
			var _urlconfig={method:"getCountries_json"};
			$.ajax(app.config.wwwcfclocation,{dataType:'jsonp',data:_urlconfig})
			.error(app.shared.ajaxError)
			.success(function(response, status, xhr){
				myezplan.forms.select.addOptionsMapNameId(arg_select_country,response.data);
				arg_select_country.selectmenu('enable').selectmenu('refresh').change();
			});
		},
		getCities:function(arg_select_city,arg_countryvalue){
			myezplan.forms.select.removeAllOptions(arg_select_city);
			if($.trim(arg_countryvalue)==""){return false;}
			var _urlconfig={method:"getCitiesByCountry_json",countryid:arg_countryvalue};
			$.ajax(app.config.wwwcfclocation,{dataType:'jsonp',data:_urlconfig,beforeSend:function(){$.mobile.showPageLoadingMsg();}})
			.complete(function(){$.mobile.hidePageLoadingMsg();})
			.error(app.shared.ajaxError)
			.success(function(response, status, xhr){
				myezplan.forms.select.addOptionPlaceHolder(arg_select_city,"","City")
				myezplan.forms.select.addOptionsMapNameId(arg_select_city,response.data);
				arg_select_city.selectmenu('enable').selectmenu('refresh').change();
			});
		},
		nextStep:function(arg_cityvalue){
			var $list=$('#home #list-countrycity');
			var $select_country=$list.find('[name="country"]')
			var $select_city=$list.find('[name="city"]');
			if($.trim($select_country.val())=="" || $.trim($select_city.val())==""){return false;}
			$.mobile.changePage(app.page.route.placeselection,{type:"post",data:{ctid:$select_city.val()}});
		}
	};
	/* 
	namespace: app.page.placeselection
	*/
	app.page.placeselection={
		cityid:0,
		$page:null,
		init:function(arg_page){
			this.$page=$(arg_page);
			this.cityid=this.$page.find('[name="ctid"]').val();
			//this.cityid=app.utils.url.getParamValue("ctid");
			this.getAreasByCity();
			this.getCategoryByCity();
			/*this.getCities();//replaced by direct load (query by webservice) in cfm page*/
			var self=this;
			this.$page.find('[name="select-area"]').change(function(e){self.getPlaces();});
			this.$page.find('[name="select-category"]').change(function(e){self.getPlaces();});
			$(document).on("change","#list-cityplace .ui-listview-checkbox",function(e) {self.checkPlaceListview(this);/*console.log($(this));*/});
			this.$page.find('[name="select-plse"]').change(function(e){self.checkPlaceSelected(this);});
			this.$page.find('[name="select-city"]').change(function(e){self.changeCity(this);});
			this.updateMapSelectionLink();
			//this.$page.find('#buttonviewmapselection').click(function(e){e.preventDefault();e.stopPropagation();$.mobile.changePage(app.page.route.placeselectionmap,{type:"post",data:{ctid:self.cityid},reloadPage:true});});
			this.loadplseSelect();
		},
		loadplseSelect:function(){
			var $select_selectedplace=this.$page.find('[name="select-plse"]');
			//myezplan.forms.select.addOptionPlaceHolder($select_selectedplace,"","Selected Places");
			app.shared.getCookiePlaces();
			this.addplseItems();
		},
		addplseItems:function(){
			var $select_selectedplace=this.$page.find('[name="select-plse"]');
			myezplan.forms.select.removeAllOptions($select_selectedplace);
			//$select_selectedplace.selectmenu('refresh');
			$.each(app.config.values.plsegroupedcity,function(index,places){
				var _optgroup=$('<optgroup>').attr('label',index);
				$.each(places,function(index,value){
					_optgroup.append(myezplan.forms.select.createOption(value.id,value.name,true));
				});
				$select_selectedplace.append(_optgroup);
			});
			$select_selectedplace.selectmenu('refresh');
		},
		getCities:function(){
			var $list_places=this.$page.find('#list-cityplace');
			var _urlconfig={method:"GetCitiesByCity_json",cityid:this.cityid};
			$.ajax(app.config.wwwcfclocation,{dataType:'jsonp',data:_urlconfig,beforeSend:function(){$.mobile.showPageLoadingMsg();}})
			.complete(function(){$.mobile.hidePageLoadingMsg();})
			.error(app.shared.ajaxError)
			.success(function(response, status, xhr){
				/*console.log(response.data);*/
				var _data = response.data;
				var _html='';
				if(_data){
					var _countericon=0;
					$.each(_data,function(index,value){
						_html+='<li><a href="placeselection.cfm?ctid='+value.id+'" data-ajax="false">'+value.name+'</a></li>'
					});
				}
				$list_places.append(_html).trigger('create').listview('refresh');
			});
		},
		changeCity:function(arg_selectcity){
			var _val=$(arg_selectcity).val();
			if(_val){
				$.mobile.changePage(app.page.route.placeselection,{type:"post",data:{ctid:_val}});
			}
		},
		getAreasByCity:function(){
			var $select_area=this.$page.find('[name="select-area"]')
			var _urlconfig={method:"getPlansByCity_json",cityid:this.cityid};
			$.ajax(app.config.wwwcfclocation,{dataType:'jsonp',data:_urlconfig,beforeSend:function(){$.mobile.showPageLoadingMsg();}})
			.complete(function(){$.mobile.hidePageLoadingMsg();})
			.error(app.shared.ajaxError)
			.success(function(response, status, xhr){
				myezplan.forms.select.addOptionPlaceHolder($select_area,"","Areas.");
				myezplan.forms.select.addOptionsMapNameId($select_area,response.data);
				$select_area.selectmenu('enable').selectmenu('refresh');
				//arg_select_city.change();
			})
			;
		},
		getCategoryByCity:function(){
			var $select_category=this.$page.find('[name="select-category"]')
			var _urlconfig={method:"getplaceselectionCategoryByCityId_json",cityid:this.cityid};
			$.ajax(app.config.wwwcfcareaplace,{dataType:'jsonp',data:_urlconfig,beforeSend:function(){$.mobile.showPageLoadingMsg();}})
			.complete(function(){$.mobile.hidePageLoadingMsg();})
			.error(app.shared.ajaxError)
			.success(function(response, status, xhr){
				myezplan.forms.select.addOptionPlaceHolder($select_category,"","Categories.");
				myezplan.forms.select.addOptionsMapNameId($select_category,response.data);
				$select_category.selectmenu('enable').selectmenu('refresh');
				//arg_select_city.change();
			})
			;
		},
		getPlaces:function(){
			var _area="",_category="";
			var $select_area=this.$page.find('[name="select-area"]');
			var $select_category=this.$page.find('[name="select-category"]');
			_area=$select_area.val(),_category=$select_category.val();
			var $list_places=this.$page.find('#list-cityplace');
			$list_places.empty()
			if(!(_area>0 || _category>0)){return false;}
			var _urlconfig={method:"getplaceselectionPlaces_json",cityid:this.cityid,planid:_area,categoryid:_category};
			$.ajax(app.config.wwwcfcareaplace,{dataType:'jsonp',data:_urlconfig,beforeSend:function(){$.mobile.showPageLoadingMsg();}})
			.complete(function(){$.mobile.hidePageLoadingMsg();})
			.error(app.shared.ajaxError)
			.success(function(response, status, xhr){
				var _data = response.data;
				var _html='';
				if(_data){
					var _countericon=0;
					$.each(_data,function(index,value){
						var _checked="";
						if(app.config.values.plse.plse_ExistsById(value.ruta_id)>=0){
							_checked="checked";
						}
						_html+='<li>'
						+'<a href="#"><img src="'+value.info_imageurlmobile+'" alt="'+value.ruta_name+'"><h2>'+value.ruta_name+'</h2></a>'
						+'<label data-corners="false" class="ui-listview-checkbox-label"><input type="checkbox" '+_checked+' name="checkbox-'+value.ruta_id+'" value="'+value.ruta_id+'" data-name="'+value.ruta_name+'" data-city="'+value.cityname+'" class="ui-listview-checkbox" data-iconpos="notext" />Add</label>'
						+'<a href="#purchase">Purchase deal</a></li>'
					});
				}
				_html+="";
				try{
					$list_places.append(_html).trigger('create').listview('refresh');
				}catch(e){console.log("error:"+e.message);}
			});
			this.updateMapSelectionLink();
			return true;
		},
		checkPlaceListview:function(arg_checboxplace){
			var _object={id:$(arg_checboxplace).val(),name:$(arg_checboxplace).data("name"),city:$(arg_checboxplace).data("city")};
			var $select_selectedplace=this.$page.find('[name="select-plse"]');
			if($(arg_checboxplace).is(":checked")){
				if(app.config.values.plse.plse_Add(_object)){
					//myezplan.forms.select.addOption($select_selectedplace,_object.id,_object.name,true);
				}else{
					/*$(arg_checboxplace).attr("checked",false).checkboxradio("refresh");return false;*/
				}
			}else{
				if(app.config.values.plse.plse_Remove(_object)){
					//myezplan.forms.select.removeOptionByValue($select_selectedplace,_object.id);
				}else{
					/*$(arg_checboxplace).attr("checked",false).checkboxradio("refresh");return false;*/
				}
			}
			app.shared.setCookiePlaces();
			this.addplseItems();
			return true;
		},
		checkPlaceSelected:function(arg_select){
			var $list_places=this.$page.find('#list-cityplace');
			var $select_selectedplace=$(arg_select);
			var $option=$(arg_select).find("option:not(:selected)[data-placeholder!='true']");
			var $optionlistview=this.$page.find('#list-cityplace input:checkbox[value="'+$option.val()+'"]');
			var _object={id:$option.val()};
			if(app.config.values.plse.plse_Remove(_object)){
				myezplan.forms.select.removeOptionByValue($select_selectedplace,_object.id);
			}
			$option.remove();
			$optionlistview.attr("checked",false).checkboxradio("refresh");
			/*$list_places.listview('refresh');*/
			app.shared.setCookiePlaces();
			$select_selectedplace.selectmenu('refresh');
			return true;
		},
		serializeplseGroupByCity:function(){
			var _JSON={},_group,_data=app.config.values.plse;
			$.each(_data,function(index,value){
				_group=_data[index]["city"];
				_JSON[_group]=_JSON[_group]||[];
				_JSON[_group].push(_data[index]);
			});
			app.config.values.plsegroupedcity=_JSON;
		},
		updateMapSelectionLink:function(){
			var _url="?ctid="+this.cityid;
			var $areaVal=$.trim(this.$page.find('[name="select-area"]').val());
			var $categoryVal=$.trim(this.$page.find('[name="select-category"]').val());
			if($areaVal){_url+="&areaid="+$areaVal;}
			if($categoryVal){_url+="&catid="+$categoryVal;}
			this.$page.find('#buttonviewmapselection').prop("href",app.page.route.placeselectionmap+_url);
		},
	};
	/* 
	namespace: app.page.placeselectionmap
	*/
	app.page.placeselectionmap={
		cityid:0,
		areaid:"",
		catid:"",
		$page:null,
		markers:[],
		init:function(arg_page){
			this.$page=$(arg_page);
			//this.cityid=this.$page.find('[name="ctid"]').val();
			this.cityid=app.utils.url.getParamValue("ctid");
			this.areaid=app.utils.url.getParamValue("areaid");
			this.catid=app.utils.url.getParamValue("catid");
			//alert(this.cityid);
			this.getAreasByCity();
			this.getCategoryByCity();
			this.loadplseSelect();
			var self=this;
			this.$page.find('[name="select-area"]').change(function(e){self.showPlaces();});
			this.$page.find('[name="select-category"]').change(function(e){self.showPlaces();});
			this.$page.find('#placeselection-back').click(function(e){e.preventDefault();e.stopPropagation();$.mobile.changePage(app.page.route.placeselection,{type:"post",data:{ctid:self.cityid},reloadPage:true});});
			$(document).on('change','#divInfoWindowMap .checkboxmap',function(e) {self.checkPlaceInfoWindowMap(this);});
			//self.initMap();
		},
		loadplseSelect:function(){
			var $select_selectedplace=this.$page.find('[name="select-plse"]');
			//myezplan.forms.select.addOptionPlaceHolder($select_selectedplace,"","Selected Places");
			app.shared.getCookiePlaces();
			this.addplseItems();
		},
		addplseItems:function(){
			var $select_selectedplace=this.$page.find('[name="select-plse"]');
			myezplan.forms.select.removeAllOptions($select_selectedplace);
			//$select_selectedplace.selectmenu('refresh');
			$.each(app.config.values.plsegroupedcity,function(index,places){
				var _optgroup=$('<optgroup>').attr('label',index);
				$.each(places,function(index,value){
					_optgroup.append(myezplan.forms.select.createOption(value.id,value.name,true));
				});
				$select_selectedplace.append(_optgroup);
			});
			$select_selectedplace.selectmenu('refresh');
		},
		getAreasByCity:function(){
			var self=this;
			var $select_area=this.$page.find('[name="select-area"]');
			var _urlconfig={method:"getPlansByCity_json",cityid:self.cityid};
			$.ajax(app.config.wwwcfclocation,{dataType:'jsonp',data:_urlconfig,beforeSend:function(){$.mobile.showPageLoadingMsg();}})
			.complete(function(){$.mobile.hidePageLoadingMsg();})
			.error(app.shared.ajaxError)
			.success(function(response, status, xhr){
				myezplan.forms.select.addOptionPlaceHolder($select_area,"","Areas.");
				myezplan.forms.select.addOptionsMapNameId($select_area,response.data,self.areaid);
				$select_area.selectmenu('enable').selectmenu('refresh');
			})
			;
		},
		getCategoryByCity:function(){
			var self=this;
			var $select_category=this.$page.find('[name="select-category"]')
			var _urlconfig={method:"getplaceselectionCategoryByCityId_json",cityid:this.cityid};
			$.ajax(app.config.wwwcfcareaplace,{dataType:'jsonp',data:_urlconfig,beforeSend:function(){$.mobile.showPageLoadingMsg();}})
			.complete(function(){$.mobile.hidePageLoadingMsg();})
			.error(app.shared.ajaxError)
			.success(function(response, status, xhr){
				myezplan.forms.select.addOptionPlaceHolder($select_category,"","Categories.");
				myezplan.forms.select.addOptionsMapNameId($select_category,response.data,self.catid);
				$select_category.selectmenu('enable').selectmenu('refresh').change();
			})
			;
		},
		showPlaces:function(arg_mapconfig) {
			var self=this;
			arg_mapconfig=arg_mapconfig || this.mapconfig;
			var add=function(arg_index){
				arg_mapconfig.markers[arg_index].setVisible(true);
				self.markers.push(arg_mapconfig.markers[arg_index]);
			}
			this.markers=[];
			var _areasid=[],_areaid=this.$page.find("[name='select-area']").val();
			if(_areaid){_areasid.push(parseInt(_areaid));}
			var _catid=parseInt(this.$page.find("[name='select-category']").val());
			if(!_catid){_catid=0;}
			if( _catid===0 && _areasid.length==0){return;}
			$.each(arg_mapconfig.markers,function(index,value){
				arg_mapconfig.markers[index].setVisible(false);
				var _categoryvals=arg_mapconfig.markers[index].mk_category.category;
				var _planval=parseInt(arg_mapconfig.markers[index].mk_category.planid);
				if(_catid>0 && $.inArray(_catid,_categoryvals)>=0){
					if(_areasid.length>0){
						if($.inArray(_planval,_areasid)>=0){add(index);return true;}
					}else{
						add(index);return true;
					}
				}else if(_catid===0 && _areasid.length>0){
					if($.inArray(_planval,_areasid)>=0){add(index);return true;}
				}
			});
			arg_mapconfig.setCenterByBounds();
		},
		infoWindowClick:function(arg_object,arg_marker){
			var _checked=false;
			if(app.config.values.plse.plse_ExistsById(arg_marker.mk_id)>=0){
				_checked=true;
			}
			$("#divInfoWindowMap .checkboxmap").prop("checked",_checked).checkboxradio();
		},
		checkPlaceInfoWindowMap:function(arg_checboxplace){
			var _object={id:$(arg_checboxplace).val(),name:$(arg_checboxplace).data("name"),city:$(arg_checboxplace).data("city")};
			var $select_selectedplace=this.$page.find('[name="select-plse"]');
			if($(arg_checboxplace).is(":checked")){
				app.config.values.plse.plse_Add(_object);
			}else{
				app.config.values.plse.plse_Remove(_object);
			}
			app.shared.setCookiePlaces();
			this.addplseItems();
			return true;
		},
	};
	/* 
	namespace:	app.utils
	*/
	app.utils=app.utils||{
		url:{
			isHash:function(){
				return (window.location.hash);
			},
			getHash:function(){
				return window.location.hash.replace("#", "");
			},
			getParamValue:function(name){
				var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
				if (results==null){
					return "";
				}else{
					return results[1] || 0;
				}	
			},
			getParamFromString:function(arg_urlstring,arg_name){
				return new RegExp('[\\?&]' + arg_name + '=([^&#]*)').exec(arg_urlstring);
			},
			getStringParam:function(arg_urlstring,arg_name){
				var results = this.getParamFromString(arg_urlstring,arg_name);
				if (results==null){
					return "";
				}else{
					return results[0] || "";
				}	
			},
			getStringParamValue:function(arg_urlstring,arg_name){
				var results = this.getParamFromString(arg_urlstring,arg_name);
				if (results==null){
					return "";
				}else{
					return results[1] || "";
				}	
			}
		},
	};
});
/* mobileinit events */
$(document).bind("mobileinit",function(e){
	if(!app.config.loaded){app.config.init();}
	$(document).bind("pageinit",function(e){});
	$(document).on('pageinit','#signin',function(e){var $this=$(this);$('#signin #signinform').validate({submitHandler:function(form) {app.base.submitSignInPassword(form);}});});
	$(document).on('pageshow','#signin',function(e,ui){var $this=$(this);var $username=$this.find('#signinform input[name="usr"]');var $password=$this.find('#signinform input[name="pwd"]');if($.trim($username.val())==""){$username.focus().select();}else{$password.focus().select();}});
	$(document).on('pageinit','#forgotpassword',function(e){});
	$(document).on('pagebeforeshow','#forgotpassword',function(e){$('#forgotpassword #forgotpasswordform #error-message').html(null).hide(0);});
	$(document).on('pageshow','#forgotpassword',function(e){$('#forgotpassword #forgotpasswordform').validate({submitHandler:function(form) {app.base.submitForgotPassword(form);}});});
	$(document).on('pageinit','#changepassword',function(e){$('#changepassword #changepasswordform').validate({rules:{inputchangepassword:'required',inputchangepasswordconfirm:{equalTo:'#inputchangepassword'}},submitHandler:function(form) {app.base.submitChangePassword(form);}});});
	$(document).on('pageshow','#changepassword',function(e){});
	/* home */
	$(document).on('pageinit','#home',function(e){
		$.mobile.showPageLoadingMsg();
		app.page.home.init(this);
		var $this=$(this);
		var $list=$this.find('#list-countrycity');
		var $select_country=$list.find('[name="country"]')
		var $select_city=$list.find('[name="city"]');
		$select_country.change(function(e){app.page.home.getCities($select_city,$(this).val());});
		$select_city.change(function(e){app.page.home.nextStep();});
		$this.find('#button-countrycitysearch').click(function(e) {app.page.home.nextStep();});
		//app.page.home.getCountries($select_country,$select_city);
	});
	$(document).on('pagebeforeshow','#home',function(e,ui){});
	$(document).on('pageshow','#home',function(e,ui){$.mobile.hidePageLoadingMsg();});
	/* home */
	/* placeselection */
	$(document).on('pageinit','#placeselection',function(e){$.mobile.showPageLoadingMsg();app.page.placeselection.init(this);});
	$(document).on('pagebeforeshow','#placeselection',function(e,ui){});
	$(document).on('pageshow','#placeselection',function(e,ui){$.mobile.hidePageLoadingMsg();});
	/* placeselection */
	/* placeselectionmap */
	$(document).on('pageinit','#placeselectionmap',function(e){$.mobile.showPageLoadingMsg();app.page.placeselectionmap.init(this);});
	$(document).on('pagebeforeshow','#placeselectionmap',function(e,ui){
	});
	$(document).on('pageshow','#placeselectionmap',function(e,ui){$.mobile.hidePageLoadingMsg();});
	/* placeselectionmap */
});
