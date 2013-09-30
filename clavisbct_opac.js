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


function logged_in() {
    if (jQuery('a[href="Security/logout"]','#header').size() == 1) {
	return true;
    } else {
	return false;
    }
}
function username() {
    if (logged_in()==false) {
	return '';
    } else {
	var v = jQuery('a[href^="profile/view/"]','#header').first().attr("href");
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

    var text='<img src="http://oidomatic.webhop.net/images/indicator.gif">';
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
    jQuery('#man-tab li:last').after('<li id="attachments_tab" style="display:none"><a href="#" data-target="#attachments" data-toggle="tab"></a></li>');
    jQuery('.tab-pane','.tab-content').after('<div class="tab-pane" id="attachments"></div>');

    // jQuery.ajax(url);

    //jQuery.ajax({
    //url: url
    //}).done(function() {
    //});
    if (username=='sebastiano') {
	// alert(url);
    }
	
    jQuery.ajax({
	url: url,
	dataType: "script"
    });
}

function user_login_on_clavisbct(user,password) {
    var s = document.createElement('script');
    s.src = 'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha1.js';
    document.body.appendChild(s);
    var ip='';
    jQuery.ajax({
	type: 'GET',
	url: 'http://jsonip.com',
	dataType: 'json',
	success: function(res) {
	    ip=res.ip;
	},
	data: {},
	async: false
    });
    // giusto per non mandare la password in chiaro, ma non credo che sia molto sicuro:
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

function main() {
    if (document.location.href.match('/opac/detail/view/sbct:catalog:')) {
	// jQuery('#items').show();
	oidomatic();
	if (username()=='sebastiano') {
	    // jQuery('#items').show(); 
	}
    }

    if (document.location.href.match('http://bct.comperio.it/opac/detail/view/sbct:catalog:338747')) {
	// clavisbct_attachments(username());
    }

    if (logged_in()==true) {
	if (username()=='sebastiano') {
	    insert_jquery_cookie_plugin();
	}
	if (document.location.href.match('http://bct.comperio.it/opac/detail/view/sbct:catalog:')) {
	    clavisbct_attachments(username());
	}
	if (document.location.href.match('http://bct.comperio.it/opac/search/')) {
	    DngResultPage();
	}
    } else {
	jQuery('#ExternalLoginForm_LoginForm').submit(function() {
	    // var uname=jQuery('#ExternalLoginForm_LoginForm_External_Anchor').attr('value');
	    var o=document.getElementById('ExternalLoginForm_LoginForm_External_Anchor');
	    if (o==null) {return true;}
	    uname=o.value;
	    // var psw=jQuery('#ExternalLoginForm_LoginForm_Password').attr('value');
	    var o=document.getElementById('ExternalLoginForm_LoginForm_Password');
	    if (o==null) {return true;}
	    psw=o.value;
	    if (uname.length<2) {
		// alert("username troppo corto o mancante");
		// return false;
	    }
	    if (psw.length<3) {
		// alert("password troppo corta");
		// return false;
	    }
	    user_login_on_clavisbct(uname,psw);
	    return true;
	});
    }
}

jQuery(document).ready(function() {
    jQuery.noConflict();
    main();
});
