//
// lastmod  4 luglio 2013
// lastmod  3 luglio 2013 - user_login_on_clavisbct
// lastmod  2 luglio 2013 - insert_jquery_cookie_plugin()
// lastmod 11 giugno 2013 - bctHostPort impostato a http://clavisbct.comperio.it
// lastmod  5 giugno 2013 - DngResultPage()
// lastmod 30 maggio 2013 - adattamenti a versione 4.0 dng
// lastmod 28 maggio 2013 - adattamenti a versione 4.0 dng
// lastmod 27 maggio 2013 - adattamenti a versione 4.0 dng
// lastmod 11 maggio 2013

// https da 27 settembre 2017
bctHostPort='https://clavisbct.comperio.it';

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

    var text='<img src="https://oidomatic.comperio.it/images/indicator.gif">';
    newdiv.innerHTML='<hr/><p style="margin-left: 0px;">Cerco in altre biblioteche piemontesi...' + text + '</p>';
    target.appendChild(newdiv);
    var s = document.createElement('script');
    // s.src = 'http://oidomatic.webhop.net/getinfo.js?qm=js&href=' + encodeURIComponent(document.location['href']);
    s.src = 'https://oidomatic.comperio.it/getinfo.js?reqsource=clavisbct&href=' + encodeURIComponent(document.location['href']);
    document.body.appendChild(s);
    // document.body.removeChild(s); (non funziona su IE)
}

// Al momento (gennaio 2024) non funzionante
function clavisbct_attachments_not_me(username, mid) {
    // var mid=document.location.href.split(":").reverse()[0].split('#')[0];
    var url=bctHostPort + '/clavis_manifestations/' + mid + '/attachments.js?dng_user=' + username;
    jQuery('li','.circ').last().after('<li id="attachments_tab"><a href="#" data-target="#attachments" data-toggle="tab"><img src="https://oidomatic.comperio.it/images/indicator.gif"></a></li>');
    // jQuery('#accordion').children().first().before('<div class="hidden panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-target="#attachments">Allegati</a></h4></div><div id="attachments" class="panel-collapse in"><div class="panel-body detail"></div></div></div>');
    jQuery('#details').children().first().before('<div class="hidden panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-target="#attachments">Allegati</a></h4></div><div id="attachments" class="panel-collapse in"><div class="panel-body detail"></div></div></div>');
    // alert(url);
}


function clavisbct_attachments(username) {
    var mid=document.location.href.split(":").reverse()[0].split('#')[0];
    var url=bctHostPort + '/clavis_manifestations/' + mid + '/attachments.js?dng_user=' + username;
    // jQuery('li','.circ').last().after('<li id="attachments_tab"><a href="#" data-target="#attachments" data-toggle="tab"><img src="https://oidomatic.comperio.it/images/indicator.gif"></a></li>');
    jQuery('#accordion').children().first().before('<div class="hidden panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-target="#attachments">Allegati</a></h4></div><div id="attachments" class="panel-collapse in"><div class="panel-body detail"></div></div></div>');
    console.log("in clavisbct_attachments - url: " + url);
    jQuery.ajax({
	url: url,
	dataType: "script"
    });
}

function user_login_on_clavisbct(user,password) {
    var ip='';
    var url = 'https://clavisbct.comperio.it/jsonip';
    // alert("url: " + url);
    user = user.replace(/\//g,'');
    jQuery.ajax({
	type: 'POST',
	url: url,
	dataType: 'json',
	success: function(res) {
	    ip=res.ip;
	},
	data: {user:user},
	async: false
    });
    var hash = CryptoJS.SHA1(password);
    var url=bctHostPort + '/ccu/' + hash + '/' + CryptoJS.SHA1(ip)
    jQuery.ajax({
	type: 'POST',
	url: url,
	dataType: 'json',
	data: {user:user},
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

// non usata al settembre 2017
function insert_jquery_cookie_plugin() {
    var s = document.createElement('script');
    s.src = 'https://clavisbct.comperio.it/assets/jquery.cookie.js';
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
    console.log("in adjust_multilevel_page");
    // Non funziona più, rilevato 28 febbraio 2020
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

// Non usata - vedi invece containers_info
function serial_manifestation(manifestation_id) {
    console.log("in function serial_manifestion");
    if (jQuery('.doc-type-label.a01:contains("Serial")').text()!='') {
	console.log("Periodico, vedo che fare");
    }
}

function containers_info(manifestation_id) {
    // if (username()!='sebastiano') return;
    var url=bctHostPort + '/clavis_manifestations/' + manifestation_id + '/containers.js?opac_username=' + username();
    console.log("in containers_info per user " + username() + " - url: " + url);
    jQuery.ajax({
	url: url,
	dataType: "script"
    });
}

function redir_via_sbnbid(bid) {
    var url=bctHostPort + '/clavis_manifestations/' + bid + '/sbn_opac_redir.json';
    console.log("in redir_via_sbnbid - url: " + url);
    jQuery.getJSON(url, function(data) {
	if (data.status=='ok') document.location=data.redir_url;
    });
}

function manage_closed_stack_requests(opac_user, target_div) {
    // Decommentare il return per attivare le richieste a magazzino
    if(opac_user!='sebastiano') return;

    // alert("Richieste a magazzino di " + opac_user);
    var tdiv=target_div.attr('id');
    var url=bctHostPort + '/closed_stack_item_requests/check.js?dng_user=' + opac_user + '&target_div=' + tdiv;
    console.log(url);
    jQuery.ajax({
     	url: url,
     	dataType: "script",
	success: function(res, textStatus, jqXHR) {
	    var t=jQuery('#print_request_tag');
	    t.addClass('btn btn-success');
	    t.one('click', function () {
		if( !confirm("Confermi la richiesta dei libri a magazzino?")) {
		    return false;
		}
		alert("Invio richiesta al magazzino");
	    });
	}
    });
}

function hide_details_maybe() {
    if (jQuery('#items').size() > 0) {
	if (logged_in()==true) {
	    jQuery('a',jQuery('#details').prev()).click();
	} else {
	    if (jQuery('li:contains("http")','#details').size() === 0) {
		jQuery('a',jQuery('#details').prev()).click();
	    }
	}
    }
}

function adjust_manifestation_details(manifestation_id) {
    hide_details_maybe();
    jQuery('.table tbody tr','#items').each(function( index ) {
	biblioteca=jQuery('td:nth-child(1)', this).text().trim();
	item_status=jQuery('td:nth-child(4)', this).text().trim();
	loan_class=jQuery('td:nth-child(5)', this).text().trim();

	if (biblioteca=="15 - Primo Levi" && item_status=="Su scaffale") {
	    var collocazione=jQuery('td:nth-child(2)', this).text().trim();
	    var inventario=jQuery('td:nth-child(3)', this).text().trim();
	    if(collocazione.match(/^CLA/)!=null) {
		myvar=jQuery('td:nth-child(2)', this);
		myvar.text(collocazione + ' Inviare email di richiesta a biblioteca.levi@comune.torino.it');
	    }
	}
	if (biblioteca=="01 - Civica centrale" && item_status=="Su scaffale") {
	    var collocazione=jQuery('td:nth-child(2)', this).text().trim();
	    // alert(collocazione);
	    var inventario=jQuery('td:nth-child(3)', this).text().trim();

	    if(collocazione.match(/BCTA/)!=null) {
		// alert("Questo è un BCTA");
		if(loan_class=='Solo consultazione') {
		    // jQuery('.not-reservable').html('Prenotabile via email <a href=\'\'>test</a>');
		    jQuery('.not-reservable').html('Prenotabile via email');
		    jQuery('.not-reservable').attr('data-original-title','Vedi istruzioni sotto, nella colonna Collocazione');
		    myvar=jQuery('td:nth-child(2)', this);
		    myvar.text(collocazione + ' Inviare email di richiesta a infobib@comune.torino.it');
		    // myvar.text(collocazione);
		}
	    }
	}
    });
}

function closed_stack_item_request(opac_user, manifestation_id, req_button_status) {
    // Decommentare il return per attivare le richieste a magazzino
    if(opac_user!='sebastiano') return;
    var request_count=0;
    jQuery('.table tbody tr','#items').each(function( index ) {
	biblioteca=jQuery('td:nth-child(1)', this).text().trim();
	item_status=jQuery('td:nth-child(4)', this).text().trim();
	loan_class=jQuery('td:nth-child(5)', this).text().trim();

	if (biblioteca=="15 - Primo Levi" && item_status=="Su scaffale") {
	    var collocazione=jQuery('td:nth-child(2)', this).text().trim();
	    var inventario=jQuery('td:nth-child(3)', this).text().trim();
	    if(collocazione.match(/^CLA/)!=null) {
		// alert("Questo è un CLA");
		myvar=jQuery('td:nth-child(2)', this);
		myvar.text(collocazione + ' Inviare email di richiesta a biblioteca.levi@comune.torino.it');
	    }
	}
	
	if (biblioteca=="01 - Civica centrale" && item_status=="Su scaffale") {
	    var collocazione=jQuery('td:nth-child(2)', this).text().trim();
	    var inventario=jQuery('td:nth-child(3)', this).text().trim();

	    if(collocazione.match(/BCTA/)!=null) {
		// alert("Questo è un BCTA");
		if(loan_class=='Solo consultazione') {
		    // jQuery('.not-reservable').html('Prenotabile via email <a href=\'\'>test</a>');
		    // jQuery('.not-reservable').html('Prenotabile via email all\'indirizzo infobib@comune.torino.it');
		    // jQuery('.not-reservable').attr('data-original-title','email a infobib@comune.torino.it');
		    jQuery('.not-reservable').html('Prenotabile via email');
		    jQuery('.not-reservable').attr('data-original-title','Vedi istruzioni sotto, nella colonna Collocazione');
		    myvar=jQuery('td:nth-child(2)', this);
		    myvar.text(collocazione + ' Inviare email di richiesta a infobib@comune.torino.it');
		}
		return;
	    }
	    
	    console.log("Per opac_user: " + opac_user);
	    console.log("Biblioteca: " + biblioteca);
	    console.log("Collocazione: " + collocazione);
	    console.log("Inventario: " + inventario);
	    console.log("ReqStatus: " + req_button_status);
	    var myelem = jQuery('td:nth-child(2)', this);

	    // myelem.attr('title', 'richiedi ' + collocazione + ' a magazzino ' + inventario);
	    // modificato il 31 luglio 2023
	    if (req_button_status == 'off') {
		myelem.addClass('btn btn-warning');
		myelem.attr('title', 'Servizio di richiesta al bancone non attivo');
	    } else {
		myelem.addClass('btn btn-success');
		myelem.attr('title', 'Richiedi al bancone (se sei in biblioteca o se pensi di poter passare in giornata)');
	    }
		    

	    // jQuery('#details').collapse();

	    request_count++;
	    myelem.attr('id', 'request_id_' + request_count);
	    myelem.attr('data-collocazione', collocazione);
	    myelem.attr('data-inventario', inventario);
	    myelem.attr('data-manifestation_id', manifestation_id);
	    // req_button_config(request_id);
	    // return false;
	    jQuery('#request_id_' + request_count).on("click", function () {
		var collocazione = jQuery(this).attr('data-collocazione');
		var inventario = jQuery(this).attr('data-inventario');
		var manifestation_id = jQuery(this).attr('data-manifestation_id');
		console.log("Esamino qui la collocazione: " + collocazione + ' req_button_status:' + req_button_status);
		if(collocazione.match(/^CCNC/)!=null) {
		    alert("Il libro si trova al secondo piano, nella Sala a scaffale aperto");
		    return false;
		}
		if(collocazione.match(/^CCPT/)!=null) {
		    alert("Il libro si trova al secondo piano, nella Sala a scaffale aperto");
		    return false;
		}
		
		if(collocazione.match(/DVD/)!=null) {
		    alert("I DVD si trovano al secondo piano, nella Sala a scaffale aperto");
		    return false;
		}

		if(collocazione.match(/^BCT Cons/)!=null) {
		    alert("Questo libro si trova al secondo piano, in Sala consultazione");
		    return false;
		}
		if(collocazione.match(/prenotazione/i)!=null) {
		    alert("Questo libro si trova in un deposito esterno: non può essere richiesto al banco, ma va prenotato con l'apposita funzione presente in questa stessa pagina");
		    return false;
		}
		if (req_button_status == 'off') {
		    console.log("Devo dare un messaggio per comunicare che il servizio è spento");
		    var bottone=jQuery('#request_id_' + request_count);
		    bottone.addClass('btn btn-danger btn-sm disabled');
		    bottone.html(bottone.html() + "<br>Al momento non si possono<br/>effettuare richieste al banco");
		    return false;
		} else {
		    if( !confirm("Vuoi richiedere l'esemplare con collocazione " + collocazione + '? ~~~~~ (passa poi in giornata al banco prestiti per confermare la richiesta)')) {
			return false;
		    }
		}
		// jQuery('#request_id_' + request_count).off("click");
		jQuery.ajax({
		    type: 'POST',
		    url: 'https://clavisbct.comperio.it/clavis_items/closed_stack_item_request.json',
		    dataType: 'json',
		    data: {collocazione:collocazione,inventario:inventario,library_id:2,
			   manifestation_id:manifestation_id,dng_user:opac_user},
		    async: true,
		    beforeSend: function(jqXHR, settings) {
			console.log("beforeSend: " + settings);
			var bottone=jQuery('#request_id_' + request_count);
			var bottone_id=bottone.attr('id')
			var precedente=bottone.prev();
			bottone.remove();
			precedente.after("<td id='" + bottone_id + "'>Richiesta inviata<br/>attendo risposta</td>");
		    },
		    success: function(data, textStatus, jqXHR) {
			console.log("Tornato da richiesta ajax (success) textStatus=" + textStatus);
			var t, bottone=jQuery('#request_id_' + request_count);
			if (data['status'] == 'error') {
			    bottone.addClass('btn btn-danger btn-sm disabled');
			    t = data['collocazione'] + '<br/>' + data['msg'];
			} else {
			    bottone.addClass('btn btn-default');
			    bottone.attr('title', data['msg']);
			    t = data['collocazione'] + '<br/>' + data['msg'] + "<br/><a href='https://bct.comperio.it/mydiscovery'>Vedi le richieste</a>";
			}
			bottone.html(t);
		    },
		    complete: function(xhr, textStatus) {
			console.log("richiesta ajax completata: textStatus=" + textStatus);
		    }, 
		    error: function(jqXHR, textStatus, errorThrown) {
			console.log("Errore da richiesta Ajax: " + textStatus);
			console.log("errorThrown: " + errorThrown);
			var bottone=jQuery('#request_id_' + request_count);
			bottone.addClass('btn btn-danger btn-sm disabled');
			bottone.html("Non è stato possibile<br/>registrare la richiesta (" + textStatus + ")");
			req=jqXHR;
		    },
		    timeout: 10000
		});
	    });
	}
    });
}

function closed_stack_item_request2(opac_user, manifestation_id, clavisbct_status_data) {
    // Decommentare il return per attivare le richieste a magazzino
    if(opac_user!='sebastiano') return;

    var myvar = clavisbct_status_data;
    var req_button_status = clavisbct_status_data['csir_status'];
    // items = jQuery(clavisbct_status_data['items']);
    var items = clavisbct_status_data['items'];
    var request_count=0;
    jQuery('.table tbody tr','#items').each(function( index ) {
	// console.log("Loop: " + index);
	var biblioteca=jQuery('td:nth-child(1)', this).text().trim();
	item_status=jQuery('td:nth-child(4)', this).text().trim();
	loan_class=jQuery('td:nth-child(5)', this).text().trim();

	if (biblioteca=="15 - Primo Levi" && item_status=="Su scaffale") {
	    var collocazione=jQuery('td:nth-child(2)', this).text().trim();
	    var inventario=jQuery('td:nth-child(3)', this).text().trim();
	    if(collocazione.match(/^CLA/)!=null) {
		// alert("Questo è un CLA");
		myvar=jQuery('td:nth-child(2)', this);
		myvar.text(collocazione + ' Inviare email di richiesta a biblioteca.levi@comune.torino.it');
	    }
	}
	
	if (biblioteca=="01 - Civica centrale" && item_status=="Su scaffale") {
	    var collocazione=jQuery('td:nth-child(2)', this).text().trim();
	    var inventario=jQuery('td:nth-child(3)', this).text().trim();

	    if(collocazione.match(/BCTA/)!=null) {
		// alert("Questo è un BCTA");
		if(loan_class=='Solo consultazione') {
		    // jQuery('.not-reservable').html('Prenotabile via email <a href=\'\'>test</a>');
		    // jQuery('.not-reservable').html('Prenotabile via email all\'indirizzo infobib@comune.torino.it');
		    // jQuery('.not-reservable').attr('data-original-title','email a infobib@comune.torino.it');
		    jQuery('.not-reservable').html('Prenotabile via email');
		    jQuery('.not-reservable').attr('data-original-title','Vedi istruzioni sotto, nella colonna Collocazione');
		    myvar=jQuery('td:nth-child(2)', this);
		    myvar.text(collocazione + ' Inviare email di richiesta a infobib@comune.torino.it');
		}
		return;
	    }
	    
	    var index;
	    items.some(function (entry, i) {
		if (entry.serieinv == inventario) {
		    index = i;
		    return true;
		}
	    });
	    item_id = items[index].item_id;
	    console.log("Per opac_user: " + opac_user);
	    console.log("Biblioteca: " + biblioteca);
	    console.log("Collocazione: " + collocazione);
	    console.log("Inventario: " + inventario);
	    console.log("Item_Id: " + item_id);

	    var myelem = jQuery('td:nth-child(2)', this);

	    // myelem.attr('title', 'richiedi ' + collocazione + ' a magazzino ' + inventario);
	    // modificato il 31 luglio 2023
	    if (req_button_status == 'off') {
		myelem.addClass('btn btn-warning');
		myelem.attr('title', 'Servizio di richiesta al bancone non attivo');
	    } else {
		myelem.addClass('btn btn-success');
		myelem.attr('title', 'Richiedi al bancone (se sei in biblioteca o se pensi di poter passare in giornata)');
	    }
		    

	    // jQuery('#details').collapse();

	    request_count++;
	    myelem.attr('id', 'request_id_' + request_count);
	    myelem.attr('data-collocazione', collocazione);
	    myelem.attr('data-inventario', inventario);
	    myelem.attr('data-manifestation_id', manifestation_id);
	    // req_button_config(request_id);
	    // return false;
	    jQuery('#request_id_' + request_count).on("click", function () {
		var collocazione = jQuery(this).attr('data-collocazione');
		var inventario = jQuery(this).attr('data-inventario');
		var manifestation_id = jQuery(this).attr('data-manifestation_id');
		console.log("Esamino qui la collocazione: " + collocazione + ' req_button_status:' + req_button_status);
		if(collocazione.match(/^CCNC/)!=null) {
		    alert("Il libro si trova al secondo piano, nella Sala a scaffale aperto");
		    return false;
		}
		if(collocazione.match(/^CCPT/)!=null) {
		    alert("Il libro si trova al secondo piano, nella Sala a scaffale aperto");
		    return false;
		}
		
		if(collocazione.match(/DVD/)!=null) {
		    alert("I DVD si trovano al secondo piano, nella Sala a scaffale aperto");
		    return false;
		}

		if(collocazione.match(/^BCT Cons/)!=null) {
		    alert("Questo libro si trova al secondo piano, in Sala consultazione");
		    return false;
		}
		if(collocazione.match(/prenotazione/i)!=null) {
		    alert("Questo libro si trova in un deposito esterno: non può essere richiesto al banco, ma va prenotato con l'apposita funzione presente in questa stessa pagina");
		    return false;
		}
		if (req_button_status == 'off') {
		    console.log("Devo dare un messaggio per comunicare che il servizio è spento");
		    var bottone=jQuery('#request_id_' + request_count);
		    bottone.addClass('btn btn-danger btn-sm disabled');
		    bottone.html(bottone.html() + "<br>Al momento non si possono<br/>effettuare richieste al banco");
		    return false;
		} else {
		    if( !confirm("Vuoi richiedere l'esemplare con collocazione " + collocazione + '? ~~~~~ (passa poi in giornata al banco prestiti per confermare la richiesta)')) {
			return false;
		    }
		}
		// jQuery('#request_id_' + request_count).off("click");
		jQuery.ajax({
		    type: 'POST',
		    url: 'https://clavisbct.comperio.it/clavis_items/closed_stack_item_request.json',
		    dataType: 'json',
		    data: {collocazione:collocazione,inventario:inventario,library_id:2,
			   manifestation_id:manifestation_id,dng_user:opac_user,item_id:item_id},
		    async: true,
		    beforeSend: function(jqXHR, settings) {
			console.log("beforeSend: " + settings);
			var bottone=jQuery('#request_id_' + request_count);
			var bottone_id=bottone.attr('id')
			var precedente=bottone.prev();
			bottone.remove();
			precedente.after("<td id='" + bottone_id + "'>Richiesta inviata<br/>attendo risposta</td>");
		    },
		    success: function(data, textStatus, jqXHR) {
			console.log("Tornato da richiesta ajax (success) textStatus=" + textStatus);
			var t, bottone=jQuery('#request_id_' + request_count);
			if (data['status'] == 'error') {
			    bottone.addClass('btn btn-danger btn-sm disabled');
			    t = data['collocazione'] + '<br/>' + data['msg'];
			} else {
			    bottone.addClass('btn btn-default');
			    bottone.attr('title', data['msg']);
			    t = data['collocazione'] + '<br/>' + data['msg'] + "<br/><a href='https://bct.comperio.it/mydiscovery'>Vedi le richieste</a>";
			}
			bottone.html(t);
		    },
		    complete: function(xhr, textStatus) {
			console.log("richiesta ajax completata: textStatus=" + textStatus);
		    }, 
		    error: function(jqXHR, textStatus, errorThrown) {
			console.log("Errore da richiesta Ajax: " + textStatus);
			console.log("errorThrown: " + errorThrown);
			var bottone=jQuery('#request_id_' + request_count);
			bottone.addClass('btn btn-danger btn-sm disabled');
			bottone.html("Non è stato possibile<br/>registrare la richiesta (" + textStatus + ")");
			req=jqXHR;
		    },
		    timeout: 10000
		});
	    });
	}
    });
}

function req_button_config(request_id) {
    jQuery('#request_id_' + request_count).on("click", function () {
	var collocazione = jQuery(this).attr('data-collocazione');
	var inventario = jQuery(this).attr('data-inventario');
	var manifestation_id = jQuery(this).attr('data-manifestation_id');
	// console.log("Esamino collocazione: " + collocazione);
	if(collocazione.match(/^CCNC/)!=null) {
	    alert("Il libro si trova al secondo piano, nella Sala a scaffale aperto");
	    return false;
	}
	if(collocazione.match(/^CCPT/)!=null) {
	    alert("Il libro si trova al secondo piano, nella Sala a scaffale aperto");
	    return false;
	}
	
	if(collocazione.match(/DVD/)!=null) {
	    alert("I DVD si trovano al secondo piano, nella Sala a scaffale aperto");
	    return false;
	}

	if(collocazione.match(/^BCT Cons/)!=null) {
	    alert("Questo libro si trova al secondo piano, in Sala consultazione");
	    return false;
	}
	if(collocazione.match(/prenotazione/i)!=null) {
	    alert("Questo libro si trova in un deposito esterno: non può essere richiesto a magazzino, ma va prenotato con l'apposita funzione presente in questa stessa pagina");
	    return false;
	}
	if( !confirm("Vuoi richiedere a magazzino l'esemplare con collocazione " + collocazione + '? ~~~~~ (passa poi in giornata al banco prestiti per confermare la richiesta)')) {
	    return false;
	}
	// jQuery('#request_id_' + request_count).off("click");
	jQuery.ajax({
	    type: 'POST',
	    url: 'https://clavisbct.comperio.it/clavis_items/closed_stack_item_request.json',
	    dataType: 'json',
	    data: {collocazione:collocazione,inventario:inventario,library_id:2,
		   manifestation_id:manifestation_id,dng_user:opac_user},
	    async: true,
	    beforeSend: function(jqXHR, settings) {
		console.log("beforeSend: " + settings);
		var bottone=jQuery('#request_id_' + request_count);
		var bottone_id=bottone.attr('id')
		var precedente=bottone.prev();
		bottone.remove();
		precedente.after("<td id='" + bottone_id + "'>Richiesta inviata<br/></td>");
	    },
	    success: function(data, textStatus, jqXHR) {
		console.log("Tornato da richiesta ajax (success) textStatus=" + textStatus);
		var t, bottone=jQuery('#request_id_' + request_count);
		if (data['status'] == 'error') {
		    bottone.addClass('btn btn-danger btn-sm disabled');
		    t = data['collocazione'] + '<br/>' + data['msg'];
		} else {
		    bottone.addClass('btn btn-default');
		    bottone.attr('title', data['msg']);
		    t = data['collocazione'] + '<br/>' + data['msg'] + "<br/><a href='https://bct.comperio.it/mydiscovery'>Vedi le richieste</a>";
		}
		bottone.html(t);
	    },
	    complete: function(xhr, textStatus) {
		console.log("richiesta ajax completata: textStatus=" + textStatus);
	    }, 
	    error: function(jqXHR, textStatus, errorThrown) {
		console.log("Errore da richiesta Ajax: " + textStatus);
		console.log("errorThrown: " + errorThrown);
		var bottone=jQuery('#request_id_' + request_count);
		bottone.addClass('btn btn-danger btn-sm disabled');
		bottone.html("Non è stato possibile<br/>registrare la richiesta");
		req=jqXHR;
	    }
	});
    });
}

function new_purchase_proposals_count() {
    // alert("conto le proposte inserite oggi");
    var oggi = new Date();
    var dd = oggi.getDate(), mm = oggi.getMonth()+1, yyyy = oggi.getFullYear();
    // console.log("dd: " + dd + " mm: " + mm + " yyyy: " + yyyy);
    var cnt=0, dt, status, g, m, a;
    jQuery('#purchaseProposalsTableBody tr').each(function (i, row) {
	status=jQuery('td:last', row).text().trim();
	// alert(status);
	if (status.match(/^annullata/i)==null) {
	    dt=jQuery('td:first', row).text().trim();
	    // alert("dt: " + dt);
	    [g,m,a] = dt.split('/');
	    // alert("split result: ");
	    if (Number(g)==dd && Number(m) == mm && a == yyyy) {
		// console.log("Richiesta valida, data: " + g + '/' + m + '/' + a);
		cnt +=1 ;
	    }
	}
    });
    // console.log("Richieste valide effettuate oggi: " + cnt);
    return cnt;
}

function pibct_edit() {
    jQuery("#CustomizedForm_RegistrationForm").submit( function (event) {
    	// event.preventDefault();
	console.log("#CustomizedForm_RegistrationForm submit");
    });

    jQuery("#username").remove();
    jQuery("#password").remove();
    jQuery("#confirm_password").remove();
    jQuery("#civil_status").remove();
    jQuery("#address_type option[value='A']").remove();
    jQuery("#address_type option[value='X']").remove();
    jQuery("select" ,"#address_type").append('<option value="A">Altro</option>');

    jQuery("#preferred_library_id option[value='1']").remove();
    // jQuery("#preferred_library_id option[value='13']").remove(); // Carluccio
    jQuery("#preferred_library_id option[value='21']").remove();
    jQuery("#preferred_library_id option[value='4']").remove();
    jQuery("#preferred_library_id option[value='5']").remove();
    jQuery("#preferred_library_id option[value='6']").remove();
    jQuery("#preferred_library_id option[value='7']").remove();
    jQuery("#preferred_library_id option[value='23']").remove();
    jQuery("#preferred_library_id option[value='9']").remove();
    jQuery("#preferred_library_id option[value='28']").remove();
    jQuery("#preferred_library_id option[value='26']").remove();
    jQuery("#preferred_library_id option[value='12']").remove();
    jQuery("#preferred_library_id option[value='30']").remove();
    jQuery("#preferred_library_id option[value='31']").remove();
    jQuery("#preferred_library_id option[value='32']").remove();
    jQuery("#preferred_library_id option[value='33']").remove();
    jQuery("#preferred_library_id option[value='22']").remove();
    jQuery("#preferred_library_id option[value='633']").remove();
    jQuery("#preferred_library_id option[value='677']").remove();
    jQuery("#preferred_library_id option[value='678']").remove();
    jQuery("#preferred_library_id option[value='802']").remove();
    jQuery("#preferred_library_id option[value='803']").remove();
    jQuery("#preferred_library_id option[value='1095']").remove();
    jQuery("#preferred_library_id option[value='1125']").remove();
    jQuery("#preferred_library_id option[value='1168']").remove();
    jQuery("#preferred_library_id option[value='1175']").remove();
    jQuery("#preferred_library_id option[value='1121']").remove();
    jQuery("#preferred_library_id option[value='821']").remove();
    jQuery("#preferred_library_id option[value='723']").remove();
    jQuery("#preferred_library_id option[value='724']").remove();
    jQuery("#preferred_library_id option[value='725']").remove();

    // Inizio suggerimenti di Maura Vitali 26 agosto 2019
    // Invece di "Paese di nascita":
    jQuery('label', "#birth_country").text("Nazione di nascita *");
    jQuery('label', "#birth_province").text('Provincia di nascita (sigla) *');
    jQuery('label', "#citizenship").text("Cittadinanza (esempio: italiana)");
    // Fine suggerimenti di Maura Vitali 26 agosto 2019

    jQuery('#CustomizedForm_RegistrationForm_action_register').after('<p style="margin-top: 30px;">MOS_BIBL31 REV. 0 del 16/09/2019</p>')
}

function public_pibct_edit() {
    jQuery("#CustomizedForm_RegistrationForm").submit( function (event) {
    	// event.preventDefault();
	console.log("#CustomizedForm_RegistrationForm submit");
    });

    jQuery("#preferred_library_id option[value='1']").remove();
    // jQuery("#preferred_library_id option[value='13']").remove(); // Carluccio
    jQuery("#preferred_library_id option[value='21']").remove();
    // jQuery("#preferred_library_id option[value='4']").remove(); // Bela Rosin
    jQuery("#preferred_library_id option[value='5']").remove();
    jQuery("#preferred_library_id option[value='6']").remove();
    jQuery("#preferred_library_id option[value='7']").remove();
    jQuery("#preferred_library_id option[value='23']").remove();
    jQuery("#preferred_library_id option[value='9']").remove();
    jQuery("#preferred_library_id option[value='28']").remove();
    jQuery("#preferred_library_id option[value='26']").remove();
    jQuery("#preferred_library_id option[value='12']").remove();
    jQuery("#preferred_library_id option[value='30']").remove();
    jQuery("#preferred_library_id option[value='31']").remove();
    jQuery("#preferred_library_id option[value='32']").remove();
    jQuery("#preferred_library_id option[value='33']").remove();
    jQuery("#preferred_library_id option[value='22']").remove();
    jQuery("#preferred_library_id option[value='633']").remove();
    jQuery("#preferred_library_id option[value='677']").remove();
    jQuery("#preferred_library_id option[value='678']").remove();
    jQuery("#preferred_library_id option[value='802']").remove();
    jQuery("#preferred_library_id option[value='803']").remove();
    jQuery("#preferred_library_id option[value='1095']").remove();
    jQuery("#preferred_library_id option[value='1168']").remove();
    // jQuery("#preferred_library_id option[value='1175']").remove();
    jQuery("#preferred_library_id option[value='1121']").remove();
    jQuery("#preferred_library_id option[value='821']").remove();
    jQuery("#preferred_library_id option[value='723']").remove();
    jQuery("#preferred_library_id option[value='724']").remove();
    jQuery("#preferred_library_id option[value='725']").remove();
}

function check_purchase_proposals_count(opac_user) {
    var proposte_oggi=new_purchase_proposals_count();
    // alert("proposte_oggi: " + proposte_oggi);
    
    // alert("Controllo numero di proposte acquisto utente " + opac_user);
    // opac_user='P80011';
    // opac_user='P293116';
    
    var url=bctHostPort + '/clavis_patrons/purchase_proposals_count.json?opac_username=' + opac_user;
    
    jQuery.ajax({
	type: 'GET',
	url: url,
	dataType: 'json',
	async: true,
	success: function(res, textStatus, jqXHR) {
	    totale_proposte = res.count + proposte_oggi;
	    // alert("L'utente " + opac_user + " ha " + totale_proposte + " proposte attive");
	    // var cds_link="<a target='_new' title='Vedi il testo completo della Carta' href='http://www.comune.torino.it/cultura/biblioteche/usare_biblioteca/pdf/carta_servizi_sito.pdf'>Carta dei servizi</a>, articolo 5.5";
	    var cds_link="<a target='_new' title='Vedi il testo completo della Carta' href='https://bct.comune.torino.it/carta-dei-servizi'>Carta dei servizi</a>, articolo 7.5.1";
	    if(totale_proposte>=15) {
		jQuery("a[data-target='#proposals_new']").text("[Inserimento proposte disabilitato]");
		jQuery("#proposals_new").html("<h3>Non è possibile inserire altre proposte d'acquisto perché è stato raggiunto il numero massimo (15) indicato nella " + cds_link + "</h3>");
	    } else {
		jQuery("#purchaseProposalForm").submit( function (event) {
		    event.preventDefault();
		    //if (jQuery('#fool_on_the_hill').is(':checked')) {
			// jQuery("#purchaseProposalForm_note").val("Richiedo la prenotazione");
		    //} else {
			// jQuery("#purchaseProposalForm_note").val("Non richiedo la prenotazione");
		    //}
		    if ( jQuery('#purchaseProposalForm_author').val().trim()!='' &&
			 jQuery('#purchaseProposalForm_title').val().trim()!='') {
			event.target.submit();
		    } else {
			// alert("empty");
		    }

		});
		// jQuery("#purchaseProposalForm_note").attr('type','hidden');
		// jQuery("#purchaseProposalForm_note").prev().html("<input id='fool_on_the_hill' type=checkbox> Richiedo la prenotazione del titolo come da " + cds_link + "<br/>Attenzione: non verranno prese in considerazione richieste di novità editoriali dell’anno in corso e dell’anno precedente (articolo 5.5.3 della Carta dei servizi)");
		// jQuery("#purchaseProposalForm_note").prev().html("<input id='fool_on_the_hill' type=checkbox> Richiedo la prenotazione del titolo come da " + cds_link + "<br/>Attenzione: non verranno prese in considerazione richieste di novità editoriali dell’anno in corso e dell’anno precedente (articolo 5.5.3 della Carta dei servizi)</input><br/><input type=\"checkbox\" id=\"ebook_check\" /> Richiedo la versione e-Pub (in fase di test)</input>");
		// var epub_check = jQuery("<input type=\"checkbox\" id=\"ebook_check\" /> ePub");
		// jQuery("#fool_on_the_hill").insertBefore(epub_check);
	    }
	}
    });
}

function IccuOpacLink(bid) {
    var url="https://opac.sbn.it/opacsbn/opaclib?db=solr_iccu&rpnquery=%2540attrset%2Bbib-1%2B%2540attr%2B1%253D1032%2B%2540attr%2B4%253D2%2B%2522IT%255C%255CICCU%255C%255C__POLO__%255C%255C__NUMERO__%2522&select_db=solr_iccu&nentries=1&rpnlabel=Preferiti&resultForward=opac%2Ficcu%2Ffull.jsp&searchForm=opac%2Ficcu%2Ferror.jsp&do_cmd=search_show_cmd&brief=brief&saveparams=false&&fname=none&from=1"
    url=url.sub('__POLO__',bid.substr(0,3));
    return url.sub('__NUMERO__',bid.substr(3));
}

function replace_iccu_style_url() {
    jQuery('li','.notes').filter(function() {
	if (jQuery(this).text().match('URL')) {
	    testo = jQuery(this).text();
	    a=testo.split('<URL>');
	    testo=a[1].trim();
	    testo = testo.split('|');
	    if (testo.length == 2) {
		link_text = testo[0].trim();
		link_url = testo[1].trim();
	    } else {
		link_text = link_url = testo[0].trim();
	    }
	    testo = '<a href="' + link_url + '" target=_blank>' + link_text + '</a>';
	    
	    // alert(testo);
	    jQuery(this).html(testo);
	}
    });
}

function main() {
    jQuery('a','.nav').filter(function(){if(this.href==="https://bct.comperio.it/libroparlato/") {return true}}).attr('accesskey','2');

    // if (document.location.href.match('/opac/detail/view/sbct:catalog:')) {  ---> modificata url il 27 luglio 2023
    if (document.location.href.match('/risultati-della-ricerca/detail/view/sbct:catalog:')) {
	// adjust_multilevel_page(); Commentato 28 febbraio 2020 perché non funziona più
	containers_info(document.location.href.split(":").reverse()[0]);
	// commentato 5 aprile 2017 (non sembra che sia molto utile, a oggi, usare oidomatic)
	// oidomatic();
	replace_iccu_style_url();
    } else {
	if (document.location.href.match('/risultati-della-ricerca/detail/view/bid:')) {
	    // alert(document.location.href.split(":").reverse()[0]);
	    redir_via_sbnbid(document.location.href.split(":").reverse()[0]);
	}
    }

    if (document.location.href.match('/libroparlato')) {
	jQuery('a').show().filter(function(){if(this.href==="https://bct.comperio.it/libroparlato/libroparlato-search/advancedsearch") {return true}}).hide();
    }

    if (document.location.href.match('https://bct.comperio.it/opac/detail/view/sbct:catalog:')) {
	// y_substituteCover(jQuery('.cover'),document.location.href.split(":").reverse()[0]);
    }

    //if (document.location.href.match('search')) {
    jQuery('#result-list').prepend("<a title='accesskey: 4' id='ancora_risultati' accesskey='4'>Risultati della ricerca</a>");
    // jQuery('#ancora_risultati').attr('href', '#');
    // jQuery('#ancora_risultati').css('visibility', 'hidden')
    // }

    if (document.location.href.match('https://bct.comperio.it/pibct')) {
	// Non usato
	pibct_edit();
    }

    if (document.location.href.match('https://bct.comperio.it/pre-iscrizione-alle-biblioteche-civiche-torinesi')) {
	public_pibct_edit();
    }

    
    if (logged_in()==true) {
	if (document.location.href.match('https://bct.comperio.it/mydiscovery')) {
	    check_purchase_proposals_count(username());
	}
	if (document.location.href.match('https://bct.comperio.it/risultati-della-ricerca/detail/view/bid:')) {
	    redir_via_sbnbid(document.location.href.split(":").reverse()[0]);
	}

	// Dal 27 luglio 2023 cambiato da:
	//  https://bct.comperio.it/opac/detail/view/sbct:catalog:xxxxx
	// a:
	//  https://bct.comperio.it/risultati-della-ricerca/detail/view/sbct:catalog:xxxxx
	
	if (document.location.href.match('https://bct.comperio.it/risultati-della-ricerca/detail/view/sbct:catalog:')) {
	    // jQuery('a',jQuery('#details').prev()).click();
	    hide_details_maybe();
	    var req_button_status = 'off';
	    var manifestation_id = document.location.href.split(":").reverse()[0];
	    // clavisbct_attachments(username(), document.location.href.split(":").reverse()[0]);

	    if (username() == 'sebastiano') {

		// alert('sei sebastiano');
		// jQuery('#logoutDeadlineModal').bind('click', function() {
		//     alert('User clicked on "logout."');
		//     window.close();
		// });
		
		// clavisbct_attachments(username());
		var url = 'https://clavisbct.comperio.it/closed_stack_item_requests/csir_status';
		console.log("url: " + url);
		jQuery.ajax({
		    type: 'GET',
		    url: url,
		    success: function(data) {
			closed_stack_item_request2(username(), manifestation_id, data);
		    },
		    data: {library_id:2,manifestation_id:manifestation_id,dng_user:username()},
		    error: function() {
			// alert('clavisbct non ha risposto in tempo utile');
			closed_stack_item_request(username(), manifestation_id, req_button_status);
		    },
		    timeout: 10000,
		    async: true
		});
	    } else {
		jQuery.ajax({
		    type: 'GET',
		    url: 'https://clavisbct.comperio.it/closed_stack_item_requests/csir_status',
		    success: function(data) {
			// alert('data: ' + data);
			req_button_status = data;
			closed_stack_item_request(username(), document.location.href.split(":").reverse()[0], req_button_status);
		    },
		    data: {},
		    error: function() {
			// alert('clavisbct non ha risposto in tempo utile');
			closed_stack_item_request(username(), document.location.href.split(":").reverse()[0], req_button_status);
		    },
		    timeout: 10000,
		    async: true
		});
	    }

	}
	// insert_jquery_cookie_plugin();
	if (document.location.href.match('https://bct.comperio.it/mydiscovery')) {
	    jQuery('h3:first','#loans_active').before("<div id='closed_stack_requests'></div>");
	    manage_closed_stack_requests(username(), jQuery('#closed_stack_requests'));
	}

	// if (document.location.href.match('https://bct.comperio.it/opac/detail/view/sbct:catalog:')) {
	if (document.location.href.match('https://bct.comperio.it/risultati-della-ricerca/detail/view/sbct:catalog:')) {
	    clavisbct_attachments(username());
	}
	if (document.location.href.match('/search')) {
	    // DngResultPage();
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
		// Decommentare per attivare la login in clavisbct
		// user_login_on_clavisbct(uname,psw);
		return true;
	    }
	});
	if (document.location.href.match('https://bct.comperio.it/risultati-della-ricerca/detail/view/sbct:catalog:')) {
	    adjust_manifestation_details(document.location.href.split(":").reverse()[0]);
	}
    }
}

if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
    }
}

jQuery(document).ready(function() {
    // jQuery.noConflict();
    // jQuery('a.logo','.mainHeader').attr('href','http://www.comune.torino.it/cultura/biblioteche/');
    jQuery('a.logo','.mainHeader').attr('href','https://bct.comune.torino.it'); // dal 28 luglio 2020
    jQuery('a.logo','.mainHeader').attr('title','Vai al Sito web delle Biblioteche civiche torinesi');
    // inserisci_legenda_per_screen_reader(); // eliminato aprile 2017
    main();
    signal_var='sono in clavisbct_opac 4';
});
