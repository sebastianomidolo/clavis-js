// ==UserScript==
// @name           clavisbct
// @namespace      clavisbct_ns
// @description    Integratore BCT per Clavis
// @grant          GM_getValue
// @grant          GM_setValue
// @include        https://sbct.comperio.it/index.php?page=Catalog.Record&manifestationId*
// @include        https://sbct.comperio.it/index.php?page=Catalog.ItemInsertBulkPage*
// @include        https://sbct.comperio.it/index.php?page=Catalog.ItemViewPage&id*
// @include        https://sbct.comperio.it/index.php?page=Catalog.ItemInsertPage*
// @include        https://sbct.comperio.it/index.php?page=Catalog.AuthorityList*
// @include        https://sbct.comperio.it/index.php?page=Catalog.AuthorityViewPage*
// @include        https://sbct.comperio.it/index.php?page=Catalog.AuthorityEditPage*
// @include        https://bct.comperio.it/opac/detail/view/sbct:catalog:*
// @include        https://bct.comperio.it/libroparlato/search*
// @include        https://bct.comperio.it/opac/search*
// @include        https://sbct.comperio.it/index.php?page=Catalog.RecordList*
// @include        https://sbct.comperio.it/index.php?page=Catalog.EditRecord*
// @include        https://sbct.comperio.it/index.php?page=Catalog.NewRecord*
// @include        https://sbct.comperio.it/index.php?page=SBN.SBNBrowser*
// @include        https://sbct.comperio.it/index.php?page=Circulation.ManageRequests
// @include        https://sbct.comperio.it/index.php?page=Circulation.ReservationList
// @include        https://sbct.comperio.it/index.php?page=Circulation.PatronViewPage*
// @include        https://sbct.comperio.it/index.php?page=Communication.ShelfViewPage*



// @creator        Sebastiano Midolo - BCT (Biblioteche civiche torinesi)
// @author         Sebastiano Midolo
// @updateURL      http://bctwww.comperio.it/clavis/clavisbct.user.js
// @icon           http://bctwww.comperio.it/clavis/clavisbctlogosmall.png
// @version        0.26
// ==/UserScript==

// lastmod 26 marzo 2018        v. 0.26 Communication.ShelfViewPage*
// lastmod 15 marzo 2018        v. 0.25 Circulation.PatronViewPage*
// lastmod 27 settembre 2017    v. 0.24 ClavisBCT passa a https
// lastmod 23 agosto  2017    v. 0.23 Clavis passa a https
// lastmod 21 luglio  2017    v. 0.22 Circulation.ReservationList
// lastmod 14 luglio  2017    v. 0.21 Circulation.ManageRequests
// lastmod  2 agosto  2016    v. 0.20 http://sbct.comperio.it/index.php?page=Catalog.NewRecord
// lastmod  7 maggio  2015    v. 0.19  cambio da 456.selfip.net a bctwww.comperio.it
// lastmod  3 febbraio  2015  v. 0.18  SBN.SBNBrowser
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
    // load_js('http://456.selfip.net/clavis/clavisbct_with_jquery.js');
    load_js('https://bctwww.comperio.it/clavis/clavisbct_with_jquery.js');
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
    // load_js('http://456.selfip.net/clavis/clavisbct.js');
    load_js('https://bctwww.comperio.it/clavis/clavisbct.js');
}


init_session();
