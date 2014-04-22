$(document).on("mobileinit", function () {
	/*
	$.mobile.ajaxEnabled=true;
	$.mobile.hashListeningEnabled=true;
	$.mobile.pushStateEnabled=false;
	$.mobile.linkBindingEnabled=true;
	*/
	$.mobile.defaultDialogTransition="slidedown";
	$.mobile.defaultPageTransition="none";
	// Page Navigation
	/*
	$.mobile.page.prototype.options.backBtnText="Go back";
	$.mobile.page.prototype.options.addBackBtn=true;
	$.mobile.page.prototype.options.backBtnTheme="d";
	$.mobile.page.prototype.options.degradeInputs.date=true;
	$.mobile.page.prototype.options.domCache=false;
	//$.mobile.page.prototype.options.keepNativeDefault=".do-not-enhance";
	*/
	// Page
	$.mobile.page.prototype.options.theme="a";
	$.mobile.page.prototype.options.headerTheme="a";
	$.mobile.page.prototype.options.contentTheme="b";
	$.mobile.page.prototype.options.footerTheme="a";
	// Listviews
	$.mobile.listview.prototype.options.theme= "b";
	$.mobile.listview.prototype.options.headerTheme="e";
	$.mobile.listview.prototype.options.dividerTheme="b";
	$.mobile.listview.prototype.options.splitTheme="b";
	$.mobile.listview.prototype.options.countTheme="b";
	$.mobile.listview.prototype.options.filterTheme="b";
	$.mobile.listview.prototype.options.filterPlaceholder="Filter data (above)...";
});
