// ==UserScript==
// @name           clavisbct
// @namespace      clavisbct_ns
// @description    Integratore BCT per Clavis
// @grant          GM_getValue
// @grant          GM_setValue
// @include        http://sbct.comperio.it/index.php?page=Catalog.Record&manifestationId*
// @include        http://sbct.comperio.it/index.php?page=Catalog.ItemInsertBulkPage*
// @include        http://sbct.comperio.it/index.php?page=Catalog.ItemViewPage&id*
// @include        http://sbct.comperio.it/index.php?page=Catalog.ItemInsertPage*
// @include        http://sbct.comperio.it/index.php?page=Catalog.AuthorityList*
// @include        http://sbct.comperio.it/index.php?page=Catalog.AuthorityViewPage*
// @include        http://bct.comperio.it/opac/detail/view/sbct:catalog:*
// @include        http://bct.comperio.it/libroparlato/search*
// @include        http://bct.comperio.it/opac/search*
// @include        http://sbct.comperio.it/index.php?page=Circulation.NewLoan*
// @include        http://sbct.comperio.it/index.php?page=Catalog.RecordList*
// @include        http://sbct.comperio.it/index.php?page=Catalog.EditRecord*
// @creator        Sebastiano Midolo - BCT (Biblioteche civiche torinesi)
// @updateURL      http://456.selfip.net/clavis/clavisbct.user.js
// @icon           http://456.selfip.net/clavis/clavisbctlogosmall.png
// @version        0.15
// ==/UserScript==

// lastmod  9 settembre 2013  v. 0.14  setIccuOpacLink
// lastmod  7 febbraio  2013  v. 0.13 (scorporato da clavis gestionale)
// lastmod  1 febbraio  2013  v. 0.12
// lastmod  24 gennaio  2013  v. 0.11
// lastmod  23 gennaio  2013  v. 0.10
// lastmod  18 gennaio  2013  v. 0.9
// lastmod  11 gennaio  2013  v. 0.8
// lastmod   8 gennaio  2013  v. 0.7
// lastmod  28 dicembre 2012  v. 0.6
// lastmod  18 dicembre 2012  v. 0.5
// lastmod  17 dicembre 2012  v. 0.4
// lastmod  17 dicembre 2012  v. 0.3
// lastmod  14 dicembre 2012  v. 0.2a
// lastmod   6 dicembre 2012  v. 0.2
// lastmod   5 dicembre 2012  v. 0.1d
// lastmod   3 dicembre 2012  v. 0.1c
// lastmod   3 dicembre 2012  v. 0.1b
// lastmod  29 novembre 2012  v. 0.1a
// lastmod  27 novembre 2012  v. 0.1

function getCookie(c_name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++) {
	x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	x=x.replace(/^\s+|\s+$/g,"");
	if (x==c_name) { return unescape(y); }
    }
}

function setCookie(c_name,value,expiredays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}

function init_session() {
    var gm=GM_getValue('imposta_nuovo_esemplare'),
	cv=getCookie('clavisbct_imposta_nuovo_esemplare');

    if (typeof gm === "undefined") {
	gm=true;
	GM_setValue('imposta_nuovo_esemplare', gm);
    }
    if (typeof cv === "undefined") {
	cv=String(gm);
	// alert("imposto cookie: " + cv);
	setCookie('clavisbct_imposta_nuovo_esemplare', cv, 1);
    } else {
	if (cv != String(gm)) {
	    cv = String(gm);
	    // alert("re-imposto cookie: " + cv);
	    setCookie('clavisbct_imposta_nuovo_esemplare', cv, 1);
	}
    }
}

function load_js(filepath) {
    var s = document.createElement('script');
    s.src = filepath;
    document.body.appendChild(s);
    // document.body.removeChild(s);
}

if (typeof unsafeWindow.jQuery != "function") {
    load_js('http://456.selfip.net/clavis/clavisbct_with_jquery.js');
    // s = document.createElement('script');
    // s.src = 'http://code.jquery.com/jquery-latest.js';
    // s.src = 'http://code.jquery.com/jquery.min.js';
    // s.src = 'http://456.selfip.net/jquery.min.js';
    // document.body.appendChild(s);

    // console.log('before: ' + typeof unsafeWindow.jQuery);
    // setTimeout(function(){
    //	console.log('after 2000: ' + typeof unsafeWindow.jQuery);
    // },2000);
    // document.body.removeChild(s);
    // alert('Caricato jQuery da script GM');
} else {
    load_js('http://456.selfip.net/clavis/clavisbct.js');
}


init_session();
