// lastmod  4 luglio 2013
// lastmod  3 luglio 2013 - user_login_on_clavisbct
// lastmod  2 luglio 2013 - insert_jquery_cookie_plugin()
// lastmod 11 giugno 2013 - bctHostPort impostato a http://clavisbct.comperio.it
// lastmod  5 giugno 2013 - DngResultPage()
// lastmod 30 maggio 2013 - adattamenti a versione 4.0 dng
// lastmod 28 maggio 2013 - adattamenti a versione 4.0 dng
// lastmod 27 maggio 2013 - adattamenti a versione 4.0 dng
// lastmod 11 maggio 2013

bctHostPort='http://clavisbct.comperio.it';

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,
2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},
k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,
f)).finalize(b)}}});var s=p.algo={};return p}(Math);
(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^
k)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();


function logged_in() {
    if (jQuery('a[href="Security/logout"]','.sidebar-bottom').size() == 1) {
	return true;
    } else {
	return false;
    }
}
function username() {
    if (logged_in()==false) {
	return '';
    } else {
	var v = jQuery('a[href^="profile/view/"]','.avatar').first().attr("href");
	if (typeof(v)==="string") {
	    v=v.split('/');
	    return v[v.length-1];
	} else {
	    return '';
	}
    }
}

function oidomatic() {
    var target = document.getElementById('items');
    if (target==null) {
	var target = document.getElementById('details');
    }
    if (target==null) return;

    var newdiv = document.createElement('div');
    newdiv.setAttribute('style','text-align: left; color: black; padding: 2px; font-size: 120%; border: 0px;');
    newdiv.setAttribute('id','oidomaticdiv');

    var text='<img src="http://oidomatic.comperio.it/images/indicator.gif">';
    newdiv.innerHTML='<hr/><p style="margin-left: 0px;">Cerco in altre biblioteche piemontesi...' + text + '</p>';
    target.appendChild(newdiv);
    var s = document.createElement('script');
    // s.src = 'http://oidomatic.webhop.net/getinfo.js?qm=js&href=' + encodeURIComponent(document.location['href']);
    s.src = 'http://oidomatic.comperio.it/getinfo.js?reqsource=clavisbct&href=' + encodeURIComponent(document.location['href']);
    document.body.appendChild(s);
    // document.body.removeChild(s); (non funziona su IE)
}

function clavisbct_attachments(username) {
    var mid=document.location.href.split(":").reverse()[0].split('#')[0];
    var url=bctHostPort + '/clavis_manifestations/' + mid + '/attachments.js?dng_user=' + username;
    jQuery('li','.circ').last().after('<li id="attachments_tab"><a href="#" data-target="#attachments" data-toggle="tab"><img src="http://oidomatic.comperio.it/images/indicator.gif"></a></li>');
    jQuery('#accordion').children().first().before('<div class="hidden panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-target="#attachments">Allegati</a></h4></div><div id="attachments" class="panel-collapse in"><div class="panel-body detail"></div></div></div>');
    jQuery.ajax({
	url: url,
	dataType: "script"
    });
}

function user_login_on_clavisbct(user,password) {
    // var s = document.createElement('script');
    // s.src = 'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha1.js';
    // document.body.appendChild(s);
    var ip='';
    jQuery.ajax({
	type: 'GET',
	url: 'http://clavisbct.comperio.it/jsonip' + '?' + 'user=' + user,
	dataType: 'json',
	success: function(res) {
	    ip=res.ip;
	},
	data: {},
	async: false
    });
    if (typeof CryptoJS === 'undefined') {
	alert("CryptoJS undefined");
	return;
    }
    var hash = CryptoJS.SHA1(password);
    // alert(user + " : " + hash);
    var url=bctHostPort + '/ccu/' + user.replace(/\//g,'') + '/' + hash + '/' + CryptoJS.SHA1(ip);
    // alert(url);
    // jQuery.getJSON(url, function(res) {});
    jQuery.ajax({
	type: 'GET',
	url: url,
	dataType: 'json',
	success: function() { },
	data: {},
	async: false
    });
}

function DngResultPage() {
    var ids='';
    jQuery("a.manifestation_link").each(function() {
	ids += this.href.split(':').pop() + '+';
    });
    var url=bctHostPort + '/clavis_manifestations/attachments_list.json?m=' + ids;
    // alert(url);
    jQuery.getJSON(url, function(data) {
	jQuery("div.lst-item").each(function() {
	    var mydiv=jQuery(this);
	    var id=mydiv.attr('id').substr(4);
	    var x = " <b>" + data[id] + "</b>";
	    if (data[id]!=undefined) {
		jQuery('.doc-type img', mydiv).after(x);
	    }
	});
    });
}

function insert_jquery_cookie_plugin() {
    var s = document.createElement('script');
    s.src = 'http://clavisbct.comperio.it/assets/jquery.cookie.js';
    document.body.appendChild(s);
}

function inserisci_legenda_per_screen_reader() {
    var helptext="<h1>Tasti di scelta rapida - access Key - per la consultazione del catalogo del libro parlato:</h1><ul><li>1:  inserisci username e password utente</li><li>2:  vai al catalogo del libro parlato</li><li>3:  vai all'elenco dei libri parlati disponibili per il download</li><li>4:  vai ai risultati di una ricerca</li><li>5:  vai al download e all'ascolto di  un libro parlato selezionato</li></ul>"

    jQuery('<div/>', {
	id: 'legenda_per_screen_reader',
	style: 'display: none'
    }).insertAfter('h1:first-child').html(helptext);
}

function adjust_multilevel_page() {
    var testo=jQuery('#items').text().match('Spiacenti, al momento');
    if(testo===null) return;
    // alert(testo);
    var titoli=jQuery('.titlesWrapper','#details');
    jQuery('p','#items').html(titoli);
    jQuery('ul','#items').css('display','block');
    jQuery('a','#items').filter(function() {
	if (jQuery(this).text().match('Mostra elenco')) {
	    return true;
	}
    }).css("display", "none");
}

function main() {
    jQuery('a','.nav').filter(function(){if(this.href==="http://bct.comperio.it/libroparlato/") {return true}}).attr('accesskey','2');

    if (document.location.href.match('/opac/detail/view/sbct:catalog:')) {
	adjust_multilevel_page();
	oidomatic();
    }

    if (document.location.href.match('/libroparlato')) {
	jQuery('a').show().filter(function(){if(this.href==="http://bct.comperio.it/libroparlato/libroparlato-search/advancedsearch") {return true}}).hide();
    }

    if (document.location.href.match('http://bct.comperio.it/opac/detail/view/sbct:catalog:338747')) {
	// clavisbct_attachments(username());
    }

    //if (document.location.href.match('search')) {
    jQuery('#result-list').prepend("<a title='accesskey: 4' id='ancora_risultati' accesskey='4'>Risultati della ricerca</a>");
    // jQuery('#ancora_risultati').attr('href', '#');
    // jQuery('#ancora_risultati').css('visibility', 'hidden')
    // }

    if (logged_in()==true) {
	if (username()=='sebastiano') {
	    // insert_jquery_cookie_plugin();
	}
	if (document.location.href.match('http://bct.comperio.it/opac/detail/view/sbct:catalog:')) {
	    clavisbct_attachments(username());
	}
	if (document.location.href.match('/search')) {
	    DngResultPage();
	}
    } else {
	// jQuery('.login').attr('accesskey', '1');
	jQuery('.offcanvas-btn','.container').first().attr('accesskey','1');
	jQuery('#ExternalLoginForm_LoginForm').submit(function() {
	    // var uname=jQuery('#ExternalLoginForm_LoginForm_External_Anchor').attr('value');
	    var o=document.getElementById('ExternalLoginForm_LoginForm_External_Anchor');
	    if (o===null) {return true;}
	    uname=o.value;
	    // var psw=jQuery('#ExternalLoginForm_LoginForm_Password').attr('value');
	    var o=document.getElementById('ExternalLoginForm_LoginForm_Password');
	    if (o===null) {return true;}
	    psw=o.value;
	    if (uname.length<2) {
		// alert("username troppo corto o mancante");
		// return false;
	    }
	    if (psw.length<3) {
		// alert("password troppo corta");
		// return false;
	    }
	    if (uname=='sebastiano') {
		// alert("sebastiano, call user_login_on_clavisbct");
		user_login_on_clavisbct(uname,psw);
		return true;
	    } else {
		// alert("call user_login_on_clavisbct");
		user_login_on_clavisbct(uname,psw);
		return true;
	    }
	});
    }
}

jQuery(document).ready(function() {
    jQuery.noConflict();
    jQuery('a.logo','.mainHeader').attr('href','http://www.comune.torino.it/cultura/biblioteche/');
    jQuery('a.logo','.mainHeader').attr('title','Sito web delle Biblioteche civiche torinesi');
    inserisci_legenda_per_screen_reader();
    main();
});
