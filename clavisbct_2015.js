bctHostPort='http://clavisbct.comperio.it'; // prod

function DefaultSerieInv(id_biblioteca) {
    var v = {
        "2":  "01",
        "3":  "M",
	"22": "TP",
	"27": "TV",
        "29": "TZ",
    };
    return v[id_biblioteca];
}

function AllineaSezioni() {
    tr=jQuery("#ctl0_Main_InputGrid tbody tr")
    jQuery(tr).each(function(index,row) {
	jQuery("td:nth-child(4) input:first", this).each(function(index, elem) {
	    RiscriviSezione(elem,row);
	});
    });
}

function RiscriviSezione(elem,row) { 
    var sections=[];
    jQuery("td:nth-child(4) option",row).each(function(i) {sections.push(this.value)});

    var v=jQuery(elem).val();
    var a=v.trim().split(/\.| /);
    var sezione=a.shift().toUpperCase();
    if (sections.include(sezione)==true) {
	var collocazione=a.join('.').trim();
	jQuery(":first", jQuery(elem).parent()).val(sezione);
	jQuery(elem).val(collocazione);
    }
}

function ImpostaSerieInventarialeDefault(tr) {
    var id_biblioteca=jQuery("td:nth-child(1) input",tr).val();
    var serie=DefaultSerieInv(id_biblioteca);
    if (typeof serie !== "undefined") {
	jQuery("td:nth-child(3) select", tr).val(serie);
    }
}

// http://sbct.comperio.it/index.php?page=Catalog.ItemInsertBulkPage&manId=563390
function ItemInsertBulkPage() {
    init_clavisbct();

    jQuery("#ctl0_Main_InputGrid tr:nth-child(even)").css('background', 'gold');
    tr=jQuery("#ctl0_Main_InputGrid tbody tr")
    jQuery(tr).each(function(index,row) {
	jQuery("td:nth-child(4) input:first", this).change(function() {
	    RiscriviSezione(this,row);
	});
	// jQuery("td:nth-child(4) input:first", this).val('CAMBIO COLL')
	ImpostaSerieInventarialeDefault(row);
    });

    // Bottone con spunta verde "applica per tutte le biblioteche"
    jQuery("#ctl0_Main_InputGrid tr:first th:nth-child(4) input.formImageButton").click(function(tr) {
        AllineaSezioni();
    });

    // 8 gennaio 2013
    if (esemplari_da_inizializzare()==true) {
	jQuery("#ctl0_Main_InputGrid_ctl0_ItemStatusMaster").val('B');
	applyDropDownMaster('itemStatusClass',document.getElementById("ctl0_Main_InputGrid_ctl0_ItemStatusMaster"));
	jQuery("#ctl0_Main_InputGrid_ctl0_LoanClassMaster").val('A');
	applyDropDownMaster('loanClassClass',document.getElementById("ctl0_Main_InputGrid_ctl0_LoanClassMaster"));
    }

}

function esemplari_da_inizializzare() {
    test=getCookie('clavisbct_imposta_nuovo_esemplare');
    if (test=='false') {return false;}
    if (catalogatori_di_libri_nuovi().include(getOperatorId())==true) {
	return true;
    } else {
	return false;
    }
}

function catalogatori_di_libri_nuovi() {
    return [3,4,8,9,111,184,238,317,369,376,380,408,409,410,435,448,455,456];
}

// FC http://sbct.comperio.it/index.php?page=Catalog.ItemViewPage&id=1940535
// http://sbct.comperio.it/index.php?page=Catalog.ItemViewPage&id=54350
function ItemViewPage () {
    init_clavisbct();

    if (utente_catalogatore()==false) {
	// Nascondo "Scegli notizia" per i fuori catalogo
	jQuery("#ctl0_Main_RecordChooser_ChooserButtonViewPanel").hide();
	// Disabilito alcuni pulsanti:
	jQuery("#buttonpanel input:visible").filter(function(index) {
	    if (this.value.match(/sposta|sostituisci|elimina/)) {
		return true;
	    }
	}).prop("disabled", true);
    }
}

function getLibraryId() {
    return parseInt(jQuery("#ctl0_Footer_LibrarianLibraries").val());
}

function getLibraryName() {
    return jQuery("#ctl0_Footer_LibrarianLibraries option:selected").text();
}


function ItemInsertPage () {
    init_clavisbct();

    if (document.location.href.match(/issueId/)) {
	var library_id = parseInt(jQuery("#ctl0_Footer_LibrarianLibraries").val()),
	    issue_id=document.location.href.split("=").reverse()[0];
	// jQuery("#leftmessage0").text('bibl ' + library_id);

	url=bctHostPort + '/clavis_items/0.json?issue_id='+issue_id+'&owner_library_id='+library_id;

	jQuery('<b/>', {
	    style: "color: red",
	    text: 'ATTENZIONE: verificare i dati prima di salvare! '
	}).appendTo('#ctl0_Main_ManifestationView_ManifestationViewPanel');

	jQuery('<a/>', {
	    href: url,
	    title: 'Controllo fonte dati...',
	    target: '_blank',
	    text: '(click qui per verificare i dati alla fonte)'
	}).appendTo('#ctl0_Main_ManifestationView_ManifestationViewPanel');


	// alert(url);
	var x;
	jQuery.getJSON(url, function(d) {
	    x=d.loan_class;
	    if (x!=undefined) jQuery("#ctl0_Main_LoanClass").val(x.strip());
	    
	    x=d.section;
	    if (x!=undefined) jQuery("#ctl0_Main_Section").val(x.strip());

	    x=d.collocation;
	    if (x!=undefined) jQuery("#ctl0_Main_Collocation").val(x.strip());

	    x=d.inventory_serie_id;
	    if (x!=undefined) jQuery("#ctl0_Main_InventorySerieId").val(x.strip());
	    
	    x=d.item_media;
	    if (x!=undefined) jQuery("#ctl0_Main_ItemMedia").val(x.strip());

	    jQuery("#ctl0_Main_OpacVisible").prop('checked',true)

	});
    }

    if (utente_catalogatore()==false) {
	jQuery("#ctl0_Main_btnGetInventoryCounter").prop("disabled", true);
    }

    if (esemplari_da_inizializzare()==true) {
	if (document.location.href.match('manifestationId=')) {
	    // alert("nuovo esemplare");
	    jQuery("#ctl0_Main_LoanClass").val('A');  // Non disponibile
	    jQuery("#ctl0_Main_ItemStatus").val('B'); // In catalogazione
	} else {
	    // alert("modifica esemplare");	
	}
    }

    var x=getParameterByName('collocation');
    if (x!='') {
	jQuery("#ctl0_Main_btnGetInventoryCounter").prop("disabled", true);
	jQuery("#ctl0_Main_Collocation").val(x.strip());
	x=getParameterByName('section');
	if (x!=undefined) jQuery("#ctl0_Main_Section").val(x.strip());
	x=getParameterByName('item_title');
	if (x!=undefined) jQuery("#ctl0_Main_ItemTitle").val(x.strip());
	jQuery("#ctl0_Main_InventoryDate").val('');
	jQuery("#ctl0_Main_InventorySerieId").val(getParameterByName('ser'));
	jQuery("#ctl0_Main_InventoryNumber").val(getParameterByName('inv'));
    }
    
}

function getOperatorId() {
    s=jQuery("#ctl0_LastSeen_UsernameLabel").attr('href');
    return s.match(/id=([^&]+)/)[1];
}

// Non usata, usare invece utente_catalogatore()
function utenti_che_possono_modificare_il_catalogo() {
    return [1,2];
}
function utente_catalogatore() {
    jQuery.noConflict();
    s=jQuery("#ctl0_LastSeen_UsernameLabel").text();
    if (s.match(/catalogatore|amministratore|responsabile|tecnico/i)) {
	return true;
    } else {
	return false;
    }
}

function NascondiLinks() {
    jQuery("td [href='index.php?page=Catalog.ItemInsertBulkPage']").hide();
}

function setOpacLink(manifestation_id) {
    // alert("setOpacLink: " + manifestation_id);
    if (!manifestation_id==parseInt(manifestation_id)+0) return;
    jQuery('#ctl0_TabBar_OpacHyperLink').prop('href', 'http://bct.comperio.it/opac/detail/view/sbct:catalog:' + manifestation_id).css("color", "green");
}

function setIccuOpacLink() {
    var bid=jQuery('#ctl0_Main_ctl6_SBNBid').text();
    if (bid=='nessuno') return;
    var url;

    if (jQuery('span','.formlegend').text().trim() == 'Collezioni') {
	url="http://www.sbn.it/opacsbn/opaclib?db=solr_iccu&resultForward=opac/iccu/brief.jsp&from=1&nentries=10&searchForm=opac/iccu/error.jsp&do_cmd=search_show_cmd&item:8005:Collezione::@and@=IT%5CICCU%5C__POLO__%5C__NUMERO__"
	linktext= ' OPAC SBN nazionale (collezione)';
    } else {
	url="http://www.sbn.it/opacsbn/opaclib?db=solr_iccu&rpnquery=%2540attrset%2Bbib-1%2B%2540attr%2B1%253D1032%2B%2540attr%2B4%253D2%2B%2522IT%255C%255CICCU%255C%255C__POLO__%255C%255C__NUMERO__%2522&select_db=solr_iccu&nentries=1&rpnlabel=Preferiti&resultForward=opac%2Ficcu%2Ffull.jsp&searchForm=opac%2Ficcu%2Ferror.jsp&do_cmd=search_show_cmd&brief=brief&saveparams=false&&fname=none&from=1";
	linktext= ' OPAC SBN nazionale';
    }
    url=url.sub('__POLO__',bid.substr(0,3));
    url=url.sub('__NUMERO__',bid.substr(3));
    jQuery('<a/>', {
	href: url,
	title: 'Scheda su OPAC SBN nazionale...',
	target: '_blank',
	text: linktext
    }).appendTo('#ctl0_Main_ctl6_SBNBid');
}

function CatalogRecord() {
    init_clavisbct();

    function getManifestationId() {
	var r=document.location.href.split('=').last();
	return parseInt(r);
    }

    setOpacLink(getManifestationId());
    setIccuOpacLink();

    function GetIssueData() {
	if (jQuery('#Popup').data('issuedata') != 'ok') {
	    jQuery('#Popup').data('issuedata','ok');
	} else {
	    return;
	}
	var mid=document.location.href.split("=").reverse()[0],
	    num=jQuery('#Popup').data('SingleStartNumber')-1;
	var url=bctHostPort + '/clavis_issues/0.json?manifestation_id=' + mid + '&start_number=' + num;
	// alert(url);
	jQuery.getJSON(url, function(data) {
	    jQuery('#Popup').data('SingleIssueVolume', data.issue_volume);
	});
    }

    function UltimoFascicolo(mode) {
	// estrazione issue_id ultimo fascicolo inserito:
	// ctl0_Main_IssueList_IssueGrid
	// jQuery("a.formLinkButton:contains('vedi'):first", '#ctl0_Main_IssueList_IssueGrid').prop('href')
	var year='#ctl0_Main_IssueWizard_IssueCreationWizard_SingleIssueYear';
	if (mode=='w') {
	    jQuery('#Popup').data('SingleIssueYear', jQuery('#ctl0_Main_IssueList_IssueGrid tbody tr:nth-child(1) td:nth-child(1)').text());
	    // colonna descrizione - inutile: jQuery('#Popup').data('descr', jQuery('#ctl0_Main_IssueList_IssueGrid tbody tr:nth-child(1) td:nth-child(2)').text());

	    var x = jQuery('#ctl0_Main_IssueList_IssueGrid tbody tr:nth-child(1) td:nth-child(4)').text().trim();
	    var i = parseInt(x) + 1;
	    jQuery('#Popup').data('SingleStartNumber', i);

	    var x=jQuery('#ctl0_Main_IssueList_IssueGrid tbody tr:nth-child(1) td:nth-child(3)').text().trim().gsub('/','-');
	    jQuery('#Popup').data('SingleIssueDate', x);
	    jQuery('#Popup').data('SingleEndNumber', jQuery('#Popup').data('SingleStartNumber'));
	    jQuery('#Popup').data('SingleNumModel', 'yn');
	} else {
	    jQuery("#Popup").contents().find('#ctl0_Main_IssueWizard_IssueCreationWizard_SingleIssueType').val('N')
	    var m;
	    // Dal 28 maggio 2013, su segnalazione mancato funzionamento da uff per) questa:
	    // jQuery("#Popup").contents().find("form select :last").val('yn')
	    // sostituita da questa:
	    jQuery("#Popup").contents().find('#ctl0_Main_IssueWizard_IssueCreationWizard_SingleNumModel').val('yn')
	    jQuery("#Popup").contents().find("form input:visible").filter(function(index) {
		if ((m=this.id.match(/SingleIssueDate|SingleIssueYear|SingleStartNumber|SingleEndNumber|SingleIssueVolume/))) {
		    // alert(this.id);
		    this.value=jQuery('#Popup').data(m[0]);
		}
	    });
	}
    }

    if (utente_catalogatore()==false) {
	jQuery("#buttonpanel input:visible").filter(function(index) {
	    if (this.value.match(/scegli per schiacciare|duplica notizia|aggiungi esemplare|Creazione esemplari|modifica/)) {
		return true;
	    }
	}).prop("disabled", true);
    }

    // questo solo per i periodici (da spostare poi in funzione separata):
    if (jQuery("legend:contains('Oggetto bibliografico')").text().match("Periodici")) {
	jQuery("a.formLinkButton:contains('esemplare')", '#ctl0_Main_IssueList_IssueGrid').click(function() {
            var issue_id=jQuery("a:contains('vedi')", this.parentNode).prop('href').split('=').last(),
		mid=document.location.href.split("=").reverse()[0];
	    var url = bctHostPort + '/clavis_issues/check.json?manifestation_id=' + mid + '&issue_id=' + issue_id;
	    // alert(url);
	    jQuery.ajax(url);
	});

	var mid=getParameterByName('manifestationId');
	var url = bctHostPort + '/clavis_manifestations/' + mid + '/check_adabas_kardex.json';
	jQuery.getJSON(url, function(data) {
	    if (data['issues_in_adabas']!=undefined) {
		var url=data['url'];
		jQuery('<a/>', {
		    href: url,
		    title: 'vedi fascicoli da kardex adabas 2011...',
		    target: '_blank',
		    text: data['issues_in_adabas'] + ' fascicoli in kardex adabas 2011'
		}).appendTo('#ctl0_Main_ISBD');
	    }
	});


	var legami=jQuery("legend:contains('Oggetto bibliografico')").next().next();
	legami.hide();
	// jQuery("<b>Visualizza legami</b>").insertBefore(legami);

	jQuery('<b/>', {
	    text: 'Visualizza legami...',
	    id: 'toggle_visualizza_legami'
	}).insertBefore(legami).click(function() {
	    if (jQuery(legami).is(':visible')) {
		jQuery("#toggle_visualizza_legami").text("Visualizza legami...")
		legami.toggle(0);
	    } else {
		jQuery("#toggle_visualizza_legami").text("Nascondi legami")
		legami.toggle(1000);
	    }
	});
	jQuery("#toggle_visualizza_legami").css('cursor','pointer')

	UltimoFascicolo('w');

	jQuery("#Popup").load(function(){
	    // alert('Popup caricato');
	    jQuery("#Popup").contents().find('select').val('issue');
	    var myval=jQuery("#Popup").contents().find('select').val();
	    if (myval!='issue') {
		// alert('Popup caricato: ' + myval);
		UltimoFascicolo('r');
	    }
	    GetIssueData();
	});
    }

    // jQuery("#ctl0_Main_AvailableItemsPanel").prev().hide();
}


function AuthorityEditPage() {
    init_clavisbct();


    var authtype=jQuery('#ctl0_Main_AuthEdit_AuthorityTypeList').val();
    if(authtype=='P' || authtype=='E') {
	var auth=encodeURI(jQuery('#ctl0_Main_AuthEdit_ISBD').text().replace('*','','g'));
	var target=jQuery('#ctl0_Main_AuthEdit_ISBD');
	var url="http://opac.sbn.it/opacsbn/opaclib?saveparams=true&db=solr_iccu&select_db=solr_iccu&from=1&searchForm=opac%2Ficcu%2Fbase.jsp&resultForward=opac%2Ficcu%2Fbrief.jsp&do_cmd=search_show_cmd&ricerca=base&change_cmd=AE&item_nocheck%3A1003%3AAutore=__AUTHORNAME__";
	// var url="http://opac.sbn.it/opacsbn/opaclib?saveparams=true&db=solr_iccu&select_db=solr_iccu&from=1&searchForm=opac%2Ficcu%2Fbase.jsp&resultForward=opac%2Ficcu%2Fbrief.jsp&do_cmd=search_show_cmd&ricerca=antico&change_cmd=AE&item_nocheck%3A1003%3AAutore=__AUTHORNAME__";

	var linktext = 'OPAC SBN nazionale';
	target.append(' ');
	url=url.sub('__AUTHORNAME__',auth);

	// jQuery('<a/>', {
	//     href: url,
	//     title: 'Vedi lista autori in opac.sbn.it...',
	//     target: '_blank',
	//     text: linktext
	// }).appendTo(target);

	jQuery('<a/>', {
	    href: '#',
	    onclick: "jQuery('#Iccu').toggle()",
	    title: '[mostra/nascondi lista autori da opac.sbn.it]',
	    text: linktext
	}).appendTo(target);


	target=jQuery('#ctl0_Main_AuthEdit_SpecDefault');
	jQuery('<iframe/>', {
	    src: url,
	    id: 'Iccu',
	    width: target.width()-24 + 'px',
	    height: '1200px'
	}).appendTo(target);
    }

    if(getParameterByName('id')!='') return;
    if(jQuery('#ctl0_Main_AuthEdit_AuthorityTypeList').val()=='C') {
	jQuery('#ctl0_Main_AuthEdit_ClassCode').val(getParameterByName('Title'));
	jQuery('#ctl0_Main_AuthEdit_ClassItemCode').val(getParameterByName('Title'));
	jQuery('#ctl0_Main_AuthEdit_ClassEdition').val('22');
    }
}

function AuthorityList() {
    init_clavisbct();

    var a = jQuery("#ctl0_Main_AuthorityList_AuthIntSta").parent();
    jQuery('<td><span class=\"formlabel\">Auth Id</span> (premere tab per cercare)<br/><input id="cerca_per_authority_id" type="text" size="6" class="formfield" /></td>').insertAfter(a);
    var i=jQuery('#cerca_per_authority_id');

    i.focusout(function() {
	if (this.value.length < 1) return;
	document.location.href='http://sbct.comperio.it/index.php?page=Catalog.AuthorityViewPage&id=' + this.value;
    });
}


function EditRecord() {
    init_clavisbct();

    var myTimerId = 0;

    jQuery('#ctl0_Main_NewAuthLink').before('<div id="bct_author_preview">Inserire la parte iniziale del termine oppure l\'id dell\'authority</div>');
    jQuery('#bct_author_preview').css('font-size','16px');
    jQuery('#bct_author_preview').css('min-height','48px');


    function showAuthInfo() {
	var id=jQuery("#ctl0_Main_AuthorityID").prop('value');
	// alert("Mostro autore con id " + id);

	url=bctHostPort + '/clavis_authorities/info.json?id=' + id;

	jQuery.getJSON(url, function(d) {

	    // http://sbct.comperio.it/index.php?page=Catalog.AuthorityEditPage

	    var id=jQuery("#ctl0_Main_AuthorityID").prop('value');
	    var n = d['heading'];
	    // var n = data['heading'] + ' (';
	    n = n.replace(/</g,'&lt;');
	    n = n.replace(/>/g,'&gt;');
	    n += ' <span style="color:black; background-color:orange">' + d['authtype'] + '</span>';
	    n += '<b>[' + d['rectype'] + ']</b>';
	    n += ' id: ';

	    jQuery('#bct_author_preview').html(n);

	    jQuery('<a/>', {
		href: '/index.php?page=Catalog.AuthorityViewPage&id=' + id,
		title: 'Vedi authority',
		target: '_blank',
		text: id
	    }).appendTo('#bct_author_preview');

// 	    jQuery('<a/>', {
// 		href: '/index.php?page=Catalog.AuthorityEditPage&authType=S',
// 		title: 'Creazione nuovo soggetto',
// 		target: '_blank',
// 		text: 'Creazione nuovo soggetto'
// 	    }).appendTo('#bct_author_preview');

	    n=''
	    if (d['term_resource']!=undefined) {
		n = '<br/>' + d['term_resource'];
	    }
	    if (d['note']!=undefined) {
		var x=d['note'];
		x = x.replace(/</g,'&lt;');
		x = x.replace(/>/g,'&gt;');
		n = '<br/><em>' + x + '<em/>';
	    }
	    jQuery('#bct_author_preview').append(n);
	});
    }

    function impostaAuthorityId() {
	jQuery('#bct_author_preview').html('----');
	var id=jQuery("#ctl0_Main_NewAuthLink").val();
	if (id==parseInt(id)+0) {
	    jQuery("#ctl0_Main_AuthorityID").prop('value', id);
	} else {
	    // alert("nome autore");
	}
    }

    // jQuery('#ctl0_Main_TabAuthority_0').hide();

    // jQuery('#ctl0_Main_NewAuthLink').after("<b id='xxx'>Cerca per authority_id</b>")

    jQuery('#ctl0_Main_NewAuthLink').keyup(function() {
	impostaAuthorityId();
    });

    jQuery("#ctl0_Main_AuthorityID").bind('DOMSubtreeModified', function() {
	clearTimeout(myTimerId);
	myTimerId = setTimeout(showAuthInfo,1000);
    });


//    jQuery('#ctl0_Main_TabAuthority_0').click(function() {
//	alert('x');
//    }

}

function AuthorityViewPage() {
    init_clavisbct();

    var bid=jQuery('#ctl0_Main_AuthViewer_ctl1_SBNBid').text();
    if(bid[3]=='V') {
	var url="http://opac.sbn.it/opacsbn/opaclib?db=solr_iccu&resultForward=opac/iccu/brief.jsp&from=1&nentries=10&searchForm=opac/iccu/error.jsp&do_cmd=search_show_cmd&item:5032:BID=IT%5CICCU%5C__POLO__%5C__NUMERO__"
	var target=jQuery("#ctl0_Main_AuthViewer_ctl1_SBNBid");
	linktext = 'OPAC SBN nazionale';
	target.append(' ');
	url=url.sub('__POLO__',bid.substr(0,3));
	url=url.sub('__NUMERO__',bid.substr(3));
	jQuery('<a/>', {
	    href: url,
	    title: 'Cerca su OPAC SBN nazionale...',
	    target: '_blank',
	    text: linktext
	}).appendTo(target);
	return;
    }
    if((jQuery('em','#ctl0_Main_AuthViewer_AuthViewer').first().text().substr(0,8)=='Soggetto') || (jQuery('em','#ctl0_Main_AuthViewer_AuthViewer').first().text().substr(0,8)=='Argoment')) {
	var authority_id=document.location.href.split("=").reverse()[0];
	var target=jQuery('#ctl0_Main_AuthViewer_AuthViewer');
	var url='http://clavisbct.comperio.it/subjects/0?embedded=true&amp;clavis_authority_id=' + authority_id;
	jQuery('<iframe/>', {
	    src: url,
	    width: target.width()-24 + 'px',
	    height: '1200px'
	}).appendTo(target);
    }
}

function RecordList() {
    init_clavisbct();

    var code=jQuery("#ctl0_Main_ManifestationList_SearchFilter_ctl0_Field");
    code.insertAfter('#ctl0_Main_ManifestationList_AdvancedSearchPanel');

    var xcode=jQuery("#ctl0_Main_ManifestationList_SearchFilter_ctl0_Filter");
    xcode.insertAfter(code);
}

function BctOpacDetail(manifestation_id) {
    jQuery('#navigation li:last').after('<li><a href="http://sbct.comperio.it/index.php?page=Catalog.Record&manifestationId=' + manifestation_id + '">Vedi in Clavis</a></li>');
    return;
    // alert('Cerco abstract in ToBi per manifestation_id ' + manifestation_id);
    s = document.createElement('script');
    // s.src = 'http://tobi.selfip.info/titles/clavis_mid/' + manifestation_id;
    s.src = 'http://tobi.selfip.info/titles/get_abstract/' + manifestation_id + '.js';
    document.body.appendChild(s);
    // document.body.removeChild(s);
}

function BctOpacResultPage(mode) {

    if (mode==0) {
	if (jQuery(".lqFacetMultiselect").size()==0) return;
	if (jQuery(".lqFacetMultiselect").val().match('home-lib')==null) {
	    return;
	}
	library_id=jQuery(".lqFacetMultiselect").val().split('=').pop();
    } else {
	library_id=0;
    }
    var ids='';
    jQuery("a.manifestation_link").each(function() {
	// alert(this.href);
	ids += this.href.split(':').pop() + '+';
    });
    var url=bctHostPort + '/clavis_items/collocazioni.json?library_id=' + library_id + '&mids=' + ids ;
    // alert(url);
    jQuery.getJSON(url, function(data) {
	jQuery("a.manifestation_link").each(function() {
	    var id = this.href.split(':').pop(),
	    x = " <b>" + data[id] + "</b>";
	    jQuery(this).after(x);
	});
    });
}

function NewLoan() {
    init_clavisbct();
    // socket.connect('10.132.94.207',8080); // Luca
    // socket.connect('10.132.146.10',8080); // Rossetto banco padiglione
    // socket.connect('10.132.94.64',8080);  // Cibin
    // socket.connect('10.132.94.208',8080);  // Patrizia (Centrale)
    // socket.connect('10.132.94.225',8080);  // Banco prestito vicino alla parete

    var myTimerId = 0,
	checkTimerId = 0,
	lastPatronId=undefined;

    function getPatronId() {
	var x=jQuery('#ctl0_Main_UserData table a').prop('href')
	if (typeof(x)=="undefined") {return 0;}
	return parseInt(x.split('=').last());
    }

    function impostaDisplay() {
	jQuery('ul:first li', '#ctl0_Main_CirculationData').css("font-size", "16px");
	var reg=RegExp(getLibraryName().substring(0,6));
	jQuery("#ctl0_Main_CirculationData ul:first li").filter(function(index) {
	    if (jQuery(this).text().match(reg)) {
		return true;
	    }
	}).css("background-color", "rgb(255, 174, 71)");
    }

    var patron_id=getPatronId();

    function ModificaAspetto() {
	var x=jQuery("#ctl0_Main_CirculationData").text().length;
	if (x==0) return;
	patronId=getPatronId();
	if (patronId==undefined) {return;}
	if (patronId!=lastPatronId) {
	    clearTimeout(myTimerId);
	    myTimerId = setTimeout(impostaDisplay,1000);
	}
	lastPatronId = patronId;
    }
    ModificaAspetto();

    jQuery("#ctl0_Main_CirculationData").bind('DOMSubtreeModified', function() {
    	ModificaAspetto();
    });

    // https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
    var observer = new MutationObserver(function(mutations, observer) {
    	controllaPrestabiliConRiserva();
    });
    var target=document.querySelector('#ctl0_Main_AvailablePanel'),
	config = { attributes: true, childList: true, characterData: true };

    function controllaPrestabiliConRiserva() {
	// alert("controllo prestito");
	observer.disconnect();
	var x=jQuery("b:contains('con riserva')","#ctl0_Main_AvailablePanel");
	if (x.size()>0) {
	    jQuery("#ctl0_Main_AvailableLoanButton").prop("disabled", true);
	    jQuery('<h2/>', {
		id:    "messaggio_clavisbct",
		style: "color: red",
		text: 'ATTENZIONE: prestito con riserva (il pulsante attiva prestito verra\' riattivato fra 5 secondi)'
	    }).appendTo('#ctl0_Main_AvailableFound_FoundPanel');
	    clearTimeout(checkTimerId);
	    checkTimerId = setTimeout(function() {
		jQuery("#ctl0_Main_AvailableLoanButton").prop("disabled", false);
		jQuery("#messaggio_clavisbct").html('ok');
		alert("observer qui: " + observer);
		observer.observe(target, config);
	    },5000);
	}
    }
    // Per ora disattivato:
    // observer.observe(target, config);
}

function init_clavisbct() {
    jQuery.noConflict();
    jQuery('#mainclavislogo').css('background-image', 'url(http://456.selfip.net/clavis/clavisbctlogosmall.png)');
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
    jQuery.noConflict();

    if (typeof jQuery != "function") {
	console.log('Manca jQuery: ' + typeof jQuery);
	// s = document.createElement('script');
	// s.src = 'http://code.jquery.com/jquery.min.js';
	// document.body.appendChild(s);
    } else {
	// console.log('jQuery ok: ' + typeof jQuery);
    }

    if (document.location.href.match('ItemInsertBulkPage')) {
	return ItemInsertBulkPage();
    }

    if (utente_catalogatore()==true) {
	// alert("Utente catalogatore da non limitare");
	// return;
    } else {
	NascondiLinks();
    }

//    if (utenti_che_possono_modificare_il_catalogo().include(getOperatorId())==true) {
//	alert("operatore " + getOperatorId() + " non filtrato, non faccio nulla");
//	return;
//    }

    if (document.location.href.match('page=Catalog.Record&manifestationId')) {
	return CatalogRecord();
    }
    if (document.location.href.match('Catalog.ItemViewPage')) {
	return ItemViewPage();
    }

    if (document.location.href.match('Catalog.ItemInsertPage')) {
	return ItemInsertPage();
    }

    // 14 dicembre 2012
    if (document.location.href.match('Catalog.AuthorityList')) {
	return AuthorityList();
    }

    // 17 dicembre 2012
    if (document.location.href.match('Circulation.NewLoan')) {
	// return NewLoan();  // disabilitato 18 agosto 2014
	return;
    }

    // 18 dicembre 2012
    if (document.location.href.match('Catalog.RecordList')) {
	return RecordList();
    }

    // 19 dicembre 2012
    if (document.location.href.match('Catalog.EditRecord')) {
	return EditRecord();
    }

    // 18 gennaio 2013
    if (document.location.href.match('Catalog.AuthorityViewPage')) {
	return AuthorityViewPage();
    }

    // 5 maggio 2014
    if (document.location.href.match('Catalog.AuthorityEditPage')) {
	return AuthorityEditPage();
    }

    // per opac
    if (document.location.href.match('/opac/detail/view/sbct:catalog:')) {
	var manifestation_id=document.location.href.split(":").reverse()[0];
	// return InsertTobiAbstract(manifestation_id);
	return BctOpacDetail(manifestation_id);
    }

    // 23 gennaio 2013
    if (document.location.href.match('/libroparlato/search')) {
	return BctOpacResultPage(1);
    }
    if (document.location.href.match('/opac/search')) {
	return BctOpacResultPage(0);
    }

    // alert("non trattato! " + document.location.href);
}

function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
	x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	x=x.replace(/^\s+|\s+$/g,"");
	if (x==c_name)
	{
	    return unescape(y);
	}
    }
}

main();
