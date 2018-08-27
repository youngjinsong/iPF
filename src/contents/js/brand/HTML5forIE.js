( function() {
	if(!/*@cc_on!@*/0) return;
	var e = "article,aside,audio,canvas,datagrid,datalist,details,dialog,"+"eventsource,figure,figcaption,footer,header,hgroup,mark,"+"meter,nav,output,progress,section,time,video";
	var elem = e.split(',');
	for(var i=0; i<elem.length; i++){
		document.createElement(elem[i]);
	}
})()
