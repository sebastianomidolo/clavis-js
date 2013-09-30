// lastmod 16 luglio 2013
// lastmod 19 giugno 2013 - rimozione temporanea clavisbctfc in attesa di decisioni in merito
// lastmod 15 giugno 2013 - inserimento sperimentale modulo clavisbctfc
// lastmod 27 maggio 2013 - adattamento a versione 4.0 dng
// lastmod  4 marzo 2013
// lastmod 14 febbraio 2013
// lastmod  7 febbraio 2013 - (scorporato da clavis gestionale)

bctHostPort='http://clavisbct.selfip.info';

function metaSearch(q) {
    function doMetaSearch(opac_target,query,dryrun) {
	if (query=='') {
	    return;
	}
	var qu=encodeURIComponent(query);
	var url=bctHostPort + '/metasearch.json?sys=' + opac_target + '&q=' + qu;
	var redir_url=bctHostPort + '/redir?sys=' + opac_target + '&q=' + qu;
	if (dryrun) {
	    url += '&dryrun=1';
	} else {
	    url += '&dryrun=0';
	}
	url=url.replace(/ /g,"%20");
	// alert("meta search " + url);

	jQuery.getJSON(url, function(data) {
	    var target=jQuery('#metasearch_results');
	    if (target.size()==0) {
		target=jQuery('<ul/>', {
		    id:    "metasearch_results"
		});
		target.css('margin-top','30px');
		target.css('margin-left','20px');
		target.css('list-style-type','circle');
		target.css('padding', '1em');
		target.css('background-color', '#eee');
		target.css('border', '2px inset #0ee');
		target.css('font-size', '110%');
	    }
	    if(dryrun) {
		var a=jQuery('<a/>', {
		    href: redir_url,
		    text: 'Cerca "' + data['q'] + '" in ' + data['descr'],
		    target: '_blank',
		    id: 'xx1'
		});
	    } else {
		var a=jQuery('<a/>', {
		    href: redir_url,
		    text: data['descr'] + ': trovati ' + data['num_items'],
		    target: '_blank'
		});
	    }

	    if (jQuery('#result-list').size()==1) {
		jQuery('#result-list').append(target);
	    } else {
		jQuery('p').filter(function() {
		    if (jQuery(this).text().match("Nessun risultato trovato")) {
			jQuery(this).append(target);
		    }
		}); 
		
	    }
	    target.append(jQuery('<li/>').append(a));
	});
    }

    var dryrun=true;
    // i=jQuery('.numFound').text();
    if (jQuery('span','.pagination').size()==1) {
	var i = jQuery('span','.pagination').text().split(' ').reverse()[0];
	i=parseInt(i);
	if (i<20) { dryrun=false; }
    } else {
	jQuery('p').filter(function() {
	    if (jQuery(this).text().match("Nessun risultato trovato")) {
		// alert(jQuery(this).text());
		dryrun=false;
	    }
	}); 
    }

    // Dal 15 giugno 2013 - solo per la Musicale, attivo metasearch sui fuori catalogo
    // (a titolo sperimentale, sospeso dal 19 giugno 2013)
    // var tendina=jQuery(".lqFacetMultiselect");
    // if (tendina.size()==0) {
    // 	doMetaSearch('clavisbctfc', q, false);
    // } else {
    // 	if (jQuery(".lqFacetMultiselect").val().match('home-lib')!=null) {
    // 	    var library_id=jQuery(".lqFacetMultiselect").val().split('=').pop();
    // 	    if (library_id=="3") {
    // 		doMetaSearch('clavisbctfc', q, false);
    // 	    }
    // 	} else {
    // 	    if (dryrun==false) {
    // 		doMetaSearch('clavisbctfc', q, false);
    // 	    }
    // 	}
    // }
    doMetaSearch('librinlinea', q, dryrun);
    doMetaSearch('goethe_torino', q, dryrun);
    doMetaSearch('unito', q, dryrun);
    doMetaSearch('polito', q, dryrun);
}

// thanks to http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
	return "";
    else
	return decodeURIComponent(results[1].replace(/\+/g, " "));
}
function main() {
    if (document.location.href.match('/opac/search/')) {
    	return metaSearch(getParameterByName('q'));
    }
}
main();
