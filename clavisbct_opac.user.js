// ==UserScript==
// @name           clavisbct_opac
// @namespace      clavisbct_opac_ns
// @description    Integratore BCT per DiscoveryNG
// @include        http://bct.comperio.it/opac/search*
// @creator        Sebastiano Midolo - BCT (Biblioteche civiche torinesi)
// @version        0.13
// ==/UserScript==

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

function load_js() {
    var s = document.createElement('script');
    s.src = 'http://456.selfip.net/clavis/clavisbct_opacext.js';
    document.body.appendChild(s);
    // document.body.removeChild(s);
}
load_js();
