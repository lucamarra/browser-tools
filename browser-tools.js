// ==UserScript==
// @name         Toolbox
// @version      0.1
// @description  try to take over the world!
// @author       Kay Stenschke, various
// @grant        none
// @include      *
// ==/UserScript==

(function() {
    'use strict';

    var toolbox = {
        // DOM element references
        menuReference: null,
        renderGroup  : null,
        groupIds: [],

        init: function() {
            var tbox = toolbox.addToolbox();

            toolbox
                .addCss()
                .addToggleButton()
                .addMenu(tbox);
        },

        addToolbox: function() {
            var tbox = document.createElement('div');
            tbox.id = 'tbox';
            document.body.appendChild(tbox);

            tbox.style.display = toolbox.isCollapsed() ? 'none' : 'block';

            return tbox;
        },

        isCollapsed: function() {
            return toolbox.getCookie('toolboxCollapsed') === '1' || true;
        },

        addToggleButton: function() {
            var btn = document.createElement('button'),
                tbox = document.getElementById('tbox');
            btn.id = 'toggleTbox';
            btn.innerHTML = 'ッ';
            btn.onmouseover = function(){
                if (tbox) {
                    if (tbox.style.display === 'block') {
                        tbox.style.display = 'none';
                        toolbox.setCookie('toolboxCollapsed', '1', 2);
                    } else {
                        tbox.style.display = 'block';
                        toolbox.setCookie('toolboxCollapsed', '0', 2);
                    }
                }
            };
            document.body.appendChild(btn);

            return this;
        },

        addCss: function() {
            var css =
                    '#toggleTbox { font-size: 16px !important; padding: 4px; font-weight: bold; z-index: 99999999; border: none; background: #333!important;; color: #fff!important; position: fixed; bottom: 20px; right: 14px; cursor: pointer; font-weight: 500;}' +
                    '#tbox { font-size:12px; min-width:260px; letter-spacing: 0.3px; line-height:16px; z-index: 99999998; max-width: 300px; max-height: 408px; overflow-y: scroll; corner-radius: 1px; border: 1px solid #aaa; background: #282829; padding: 2px; position: fixed; right: 14px; bottom: 20px; }' +
                    '#tbox ul { margin: 0 0 18px 2px; padding: 0; list-style: none; }' +
                    '#tbox li { margin: 0 2px 0 8px }' +
                    '#tbox li a { text-decoration: none; display: block; width:100%; font-weight: 100; color: #eee!important; padding: 0 4px; outline: 0; text-align: left; cursor: pointer!important; }' +
                    '#tbox li.group { cursor: pointer; border:0; padding-left: 2px; margin: 2px 6px 0 0; }' +
                    '#tbox li.group ul li { padding-left: 6px; }' +
                    '#tbox li a:hover, #tbox li.group a:hover { background-color: #2f65ca; }' +
                    '#tbox li a, #tbox li.group {color: #fff!important; font-family: sans-serif!important; background: transparent; }';

            var style = document.createElement('style');
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            document.getElementsByTagName('head')[0].appendChild(style);

            return this;
        },

        addGroup: function(label, groupId, addToMenuRoot) {
            if (addToMenuRoot) toolbox.renderGroup = toolbox.menuReference;
            toolbox.groupIds.push(groupId);

            var li1 = document.createElement('li'),
                a1  = document.createElement('a'),
                ul1 = document.createElement('ul');

            a1.innerHTML = label;
            li1.className = 'group';

            ul1.id = groupId;
            ul1.style.display = 'none';

            li1.appendChild(a1);
            a1.onclick = function(){toolbox.expandGroup(groupId)};
            toolbox.renderGroup.appendChild(li1);

            li1.appendChild(ul1);

            return ul1;
        },

        expandGroup: function(groupId) {
            for (var i=0; i <toolbox.groupIds.length; i++)
                document.getElementById(toolbox.groupIds[i]).style.display = 'none';

            document.getElementById(groupId).style.display = 'block';
        },

        addOption: function(label, aHref) {
            var li1 = document.createElement('li'),
                anchor = document.createElement('a');
            anchor.innerHTML = label;
            anchor.href = aHref;

            li1.appendChild(anchor);
            toolbox.renderGroup.appendChild(li1);
        },

        addMenu(tbox) {
            toolbox.menuReference = document.createElement('ul');
            tbox.appendChild(toolbox.menuReference);
            toolbox.renderGroup = toolbox.menuReference;

            // ----------- Navigate
            toolbox.renderGroup = toolbox.addGroup('Navigate', 'tb-nav', true);
            toolbox.addOption('1 Level Up', 'javascript:if (location.pathname == "/"); else if (location.pathname.charAt(location.pathname.length-1) == "/") location = ".."; else location = "."; void 0');
            toolbox.addOption('Top', 'javascript:location.pathname = ""; void 0');
            toolbox.addOption('Duplicate Tab', 'javascript:(function(){var i, nd; function copyChildren(a,b){var i, nn; for(i=0;i<a.childNodes.length;++i) { nn = a.childNodes[i].cloneNode(true); if(nd.importNode) nn = nd.importNode(nn, true); b.appendChild(nn); } } nd=window.open().document; nd.open(); nd.close(); /*140681*/ copyChildren(document.getElementsByTagName("head")[0], nd.getElementsByTagName("head")[0]); copyChildren(document.body, nd.body);})();');
            toolbox.addOption('Increment URL', 'javascript:(function(){ var e,s; IB=1; function isDigit(c) { return ("0" <= c && c <= "9") } L = location.href; LL = L.length; for (e=LL-1; e>=0; --e) if (isDigit(L.charAt(e))) { for(s=e-1; s>=0; --s) if (!isDigit(L.charAt(s))) break; break; } ++s; if (e<0) return; oldNum = L.substring(s,e+1); newNum = "" + (parseInt(oldNum,10) + IB); while (newNum.length < oldNum.length) newNum = "0" + newNum; location.href = L.substring(0,s) + newNum + L.slice(e+1); })();');
            toolbox.addOption('Decrement URL', 'javascript:(function(){ var e,s; IB=-1; function isDigit(c) { return ("0" <= c && c <= "9") } L = location.href; LL = L.length; for (e=LL-1; e>=0; --e) if (isDigit(L.charAt(e))) { for(s=e-1; s>=0; --s) if (!isDigit(L.charAt(s))) break; break; } ++s; if (e<0) return; oldNum = L.substring(s,e+1); newNum = "" + (parseInt(oldNum,10) + IB); while (newNum.length < oldNum.length) newNum = "0" + newNum; location.href = L.substring(0,s) + newNum + L.slice(e+1); })();');
            toolbox.addOption('List all Links', 'javascript:(function(){ var a = \'\'; for (var ln = 0; ln < document.links.length; ln++) { var lk = document.links[ln]; a += ln + \': <a href=\\\'\' + lk + \'\\\' title=\\\'\' + lk.text + \'\\\'>\' + lk + \'</a><br>\\n\'; }; w = window.open(\'\', \'Links\', \'scrollbars,resizable,width=400,height=600\'); w.document.write(a); })();');
            toolbox.addOption('Linkify URLs', 'javascript:(function(){var D=document; D.body.normalize(); F(D.body); function F(n){var u,A,M,R,c,x; if(n.nodeType==3){ u=n.data.search(/https?\\:\\/\\/[^\\s]*[^.,">\\s\\)\\]]/); if(u>=0) { M=n.splitText(u); R=M.splitText(RegExp.lastMatch.length); A=document.createElement("A"); A.href=M.data; A.appendChild(M); R.parentNode.insertBefore(A,R); } }else if(n.tagName!="STYLE" && n.tagName!="SCRIPT" && n.tagName!="A")for(c=0;x=n.childNodes[c];++c)F(x); } })();');
            toolbox.addOption('Un-redirect Links', 'javascript:(function(){var k,x,t,i,j,p; for(k=0;x=document.links[k];k++){t=x.href.replace(/[%]3A/ig,\':\').replace(/[%]2f/ig,\'/\');i=t.lastIndexOf(\'http\');if(i>0){ t=t.substring(i); j=t.indexOf(\'&\'); if(j>0)t=t.substring(0,j); p=/https?\\:\\/\\/[^\\s]*[^.,;\'">\\s\\)\\]]/.exec(unescape(t)); if(p) x.href=p[0]; } else if (x.onmouseover&&x.onmouseout){x.onmouseover(); if (window.status && window.status.indexOf(\'://\')!=-1)x.href=window.status; x.onmouseout(); } x.onmouseover=null; x.onmouseout=null; }})();');
            toolbox.addOption('Open all Links', 'javascript:<(function(){ for (var ln = 0; ln < document.links.length; ln++) { window.open(document.links[ln], \'_blank\'); }})();');
            toolbox.addOption('Show Anchor URLs', 'javascript:(function(){var i,c,x,h; for(i=0;x=document.links[i];++i) { h=x.getAttribute("href"); x.title+=" " + x.innerHTML; while(c=x.firstChild)x.removeChild(c); x.appendChild(document.createTextNode(h)); } })()');

            // ------------ Find / Overview
            toolbox.renderGroup = toolbox.addGroup('Find / Overview', 'tb-find', true);
            toolbox.addOption('Tech Stack', "javascript: (function() {var d = document,e = d.getElementById('wappalyzer-container');if (e !== null) {d.body.removeChild(e);}var u = 'https://www.wappalyzer.com/',t = new Date().getTime(),c = d.createElement('div'),p = d.createElement('div'),l = d.createElement('link'),s = d.createElement('script');c.setAttribute('id', 'wappalyzer-container');l.setAttribute('rel', 'stylesheet');l.setAttribute('href', u + 'css/bookmarklet.css');d.head.appendChild(l);p.setAttribute('id', 'wappalyzer-pending');p.setAttribute('style', 'background-image: url(' + u + 'images/spinner.gif) !important');c.appendChild(p);s.setAttribute('src', u + 'bookmarklet/wappalyzer.js');s.onload = function() {window.wappalyzer = new Wappalyzer();s = d.createElement('script');s.setAttribute('src', u + 'bookmarklet/apps.js');s.onload = function() {s = d.createElement('script');s.setAttribute('src', u + 'bookmarklet/driver.js');c.appendChild(s);};c.appendChild(s);};c.appendChild(s);d.body.appendChild(c);})();");
            toolbox.addOption('Google within site', 'javascript: q = "" + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text);if (!q) q = prompt("You didn\'t select any text. Enter a search phrase:", "");if (q!= null) location = ("http://www.google.com/search?num=100&q=site:" + escape(location.hostname) + " \"" + escape(q.replace(/\"/g, "")) + "\"").replace(/ /g,"+");void 0');
            toolbox.addOption('Open Links in Frames', 'javascript:(function(){var dims,dimarray,wid,hei,dimstring,x,i,z,url;function linkIsSafe(u){if(u.substr(0,7)===\'mailto:\') return false; if (u.substr(0,11)===\'javascript:\') return false; return true; } function htmlEscape(s){s=s.replace(/&/g,\'&amp;\');s=s.replace(/>/g,\'&gt;\');s=s.replace(/</g,\'&lt;\');return s;} dims = prompt(\'width, height for each frame\', \'640, 480\'); if (dims!=null) { dimarray = dims.split(\',\'); wid = parseInt(dimarray[0]); hei = parseInt(dimarray[1]); dimstring=\'width=\'+wid+\' height=\'+hei; x = document.links; z = window.open().document; for (i = 0; i < x.length; ++i) { url = x[i].href; if(linkIsSafe(url)) { z.writeln(\'<p>\' + x[i].innerHTML + \' (\' + htmlEscape(url) + \')<br><iframe \' + dimstring + \' src="\' + url.replace(/"/g, \'&quot;\') + \'">[broken iframe]</iframe></p>\'); } } z.close(); } })();');
            toolbox.addOption('Wayback-Machine', 'javascript:(function(){window.location=\'http://web.archive.org/web/*/\' + document.URL})()');
            toolbox.addOption('Google-Cache', 'javascript:void((function(){var a=location.href.replace(/^http%5C:%5C/%5C/(.*)$/,"$1");location.href="http://www.google.com/search?q=cache:"+escape(a);})())');
            toolbox.addOption('Google-Translate URL', 'javascript:location=\'http://translate.google.com/translate?u=\' + encodeURIComponent(location);');

            // ----------- SEO
            toolbox.renderGroup = toolbox.addGroup('SEO', 'tb-seo', true);
            toolbox.addOption('Google Site Index', 'javascript:(function(){%20window.open(\'http://www.google.com/search?q=site%3A\'+location.host)})();');
            toolbox.addOption('Google Page Speed Insights', 'javascript:(function(){%20window.open(\'http://developers.google.com/speed/pagespeed/insights/?url=\'+encodeURIComponent(location.href))})();');
            toolbox.addOption('Show robots.txt', 'javascript:void(location.href=\'http://\' + location.host + \'/robots.txt\')');
            //toolbox.addOption('Traverse-down: .gitignore', 'javascript:(function(){var url = document.location.href,filename = \'.gitignore\';ht=\'\';while (url.length > 8 && url.indexOf(\'/\') > -1) {var traverseUrl = url.substr(0, url.lastIndexOf(\'/\'))+\'/\'+filename;if ((traverseUrl.match(/\\//g) || \'\').length > 3) {ht += traverseUrl + \'<br/><iframe src="\' +  traverseUrl + \'"></iframe><br/><br/>\';}url = url.substr(0, url.lastIndexOf(\'/\'));}var w=window.open(\'\', \'\', \'_blank\');w.document.body.innerHTML=ht;})()');

            // ----------- Restore
            toolbox.renderGroup = toolbox.addGroup('Restore', 'tb-restore', true);
            toolbox.addOption('Restore Right-Click', 'javascript:void(document.onmousedown=\'return true\');void(document.onmouseup=\'return true\');void(document.oncontextmenu=\'return true\')');
            toolbox.addOption('Restore console.log', 'javascript:(function(){var i = document.createElement(\'iframe\');i.style.display = \'none\';document.body.appendChild(i);window.console = i.contentWindow.console;})();');
            toolbox.addOption('Restore Select Text', 'javascript:(function() {function R(a) {ona = "on" + a;if (window.addEventListener) window.addEventListener(a, function(e) {for (var n = e.originalTarget; n; n = n.parentNode) n[ona] = null;}, true);window[ona] = null;document[ona] = null;if (document.body) document.body[ona] = null;} R("click"); R("mousedown"); R("mouseup"); R("selectstart");})();');
            toolbox.addOption('Restore Link Underlines', 'javascript:(function(){var a=document.createElement(\'style\'),b;document.head.appendChild(a);b=a.sheet;b.insertRule(\'a[href]{text-decoration:underline !important}\',0);})()');

            // ----------- JavaScript
            toolbox.renderGroup = toolbox.addGroup('JavaScript', 'tb-js', true);
            toolbox.addOption('View Scripts', 'javascript:s=document.getElementsByTagName(\'SCRIPT\'); d=window.open().document; d.open();d.close(); b=d.body; function trim(s){return s.replace(/^\s*\n/, \'\').replace(/\s*$/, \'\'); }; function add(h){b.appendChild(h);} function makeTag(t){return d.createElement(t);} function makeText(tag,text){t=makeTag(tag);t.appendChild(d.createTextNode(text)); return t;} add(makeText(\'style\', \'iframe{width:100%;height:18em;border:1px solid;\')); add(makeText(\'h3\', d.title=\'Scripts in \' + location.href)); for(i=0; i<s.length; ++i) { if (s[i].src) { add(makeText(\'h4\',\'script src="\' + s[i].src + \'"\')); iframe=makeTag(\'iframe\'); iframe.src=s[i].src; add(iframe); } else { add(makeText(\'h4\',\'Inline script\')); add(makeText(\'pre\', trim(s[i].innerHTML))); } } void 0');
            toolbox.addOption('View Variables', 'javascript:(function(){var x,d,i,v,st; x=open(); d=x.document; d.open(); function hE(s){s=s.replace(/&/g,"&amp;");s=s.replace(/>/g,"&gt;");s=s.replace(/</g,"&lt;");return s;} d.write("<style>td{vertical-align:top; white-space:pre; } table,td,th { border-collapse: collapse; border: 1px solid #ccc;%20}%20div.er%20{%20color:red%20}</style><table><thead><tr><th>Variable</th><th>Type</th><th>Value%20as%20string</th></tr></thead>");%20for%20(i%20in%20window)%20{%20if%20(!(i%20in%20x)%20)%20{%20v=window[i];%20d.write("<tr><td>"%20+%20hE(i)%20+%20"</td><td>"%20+%20hE(typeof(window[i]))%20+%20"</td><td>");%20if%20(v===null)%20d.write("null");%20else%20if%20(v===undefined)%20d.write("undefined");%20else%20try{st=v.toString();%20if%20(st.length)d.write(hE(v.toString()));%20else%20d.write("%C2%A0")}catch(er){d.write("<div%20class=er>"+hE(er.toString())+"</div>")};%20d.write("</pre></td></tr>");%20}%20}%20d.write("</table>");%20d.close();%20})();');
            toolbox.addOption('console.log Method-Calls', 'javascript:(function(){function augment(withFn) { var name, fn; for (name in window) { fn = window[name]; if (typeof fn === \'function\') { window[name] = (function(name, fn) { var args = arguments; return function() { withFn.apply(this, args); return fn.apply(this, arguments); } })(name, fn); } } } augment(function(name, fn) { console.log("calling " + name); });})();');
            toolbox.addOption('Inject jQuery', 'javascript:(function(){document.body.appendChild(document.createElement(\'script\')).src=\'http://code.jquery.com/jquery-1.7.2.min.js)();');
            toolbox.addOption('onerror: alert', 'javascript:window.onerror = function(m,u,n) { alert("JS error: " + m + (/^javascript:/(u) ? "\n\n(bookmarklet)" : "\n\nLine " + n + " of \n" + u)); return true;/*suppress default error message*/ }; void 0');
            toolbox.addOption('onerror: display in statusbar', 'javascript:(function() { var i=0; window.onerror = function(m,u,n) { window.status = "JS Error #"%20+%20++i%20+%20":%20\'"%20+%20m%20+%20"\'%20"%20+%20(/^javascript:/(u)%20?%20"(bookmarklet)"%20:%20"(line%20"%20+%20n%20+%20"%20of%20"%20+%20u%20+%20")");%20return%20true;/*suppress%20default%20error%20message*/%20}})();');

            // ----------- DOM
            toolbox.renderGroup = toolbox.addGroup('DOM', 'tb-dom', true);
            toolbox.addOption('Unhide all', 'javascript:(function(){function isHidden(el) { var style = window.getComputedStyle(el); return ((style.display === \'none\') || (style.visibility === \'hidden\')) } var els = document.body.getElementsByTagName("*"); for (var i = 0, max = els.length; i < max; i++) { if (isHidden(els[i])) els[i].style.display = \'block\'; }})();');
            toolbox.addOption('Show Comments', 'javascript:(function(){function f(a,fn){var i,l;for(i=0,l=a.length;i<l;i++)fn(a[i]);}var ca = [];function fc(p){f(p.childNodes,function(n){if(n.nodeType===8){ca.push(n);}else{fc(n);}});}function esc(t){return t.replace(/&/g,\'&amp;\').replace(/</g,\'&lt;\').replace(/>/g,\'&gt;\').replace(/\'/g,\'&apos;\')};var D=document;fc(D);function mk(p,t,s, i){var e=D.createElement(t); e.style.cssText=s; p.appendChild(e); if(i)e.innerHTML=esc(i); return e};var x=mk(D.body,\'div\',\'position: fixed; top:0; left:0; height:100%;width:100%; background-color: #cccccc;%20z-index:%209999;%20opacity:%200.8;%20filter:alpha(opacity=80);\');var%20y=mk(D.body,%20\'div\',%20\'position:%20fixed;%20top:3em;%20left:%2050%;%20margin-left:%20-20em;%20width:%2040em;%20z-index:%209999;%20font-size:%2010pt;%20border:%201px%20solid%20black;%20padding:%2010px;%20font-family:%20sans-serif;%20background-color:%20white;%20opacity:%201.00;%20filter:alpha(opacity=99);\');mk(y,\'h1\',\'color:%20black;%20font-size:%2012pt;%20font-weight:%20bold;%20margin-left:%20auto;%20margin-right:%20auto;%20font-decoration:%20underline;%20margin:%200;%20padding:%200;\',%20\'HTML%20Comments\');mk(y,\'p\',\'color:%20black;%20font-size:%2010pt;\',ca.length%20+%20\'%20comment\'%20+%20(ca.length===1?\'\':\'s\')%20+%20\'%20found%20on%20this%20page\');var%20w=mk(y,%20\'div\',%20\'overflow:%20auto;%20height:%20200px\');f(ca,function(n){mk(w,\'p\',\'padding:%200;%20margin:0;%20margin-bottom:%203px;%20margin-top:%203px;%20color:%20black;\',%20n.nodeValue);});var%20z=mk(y,\'button\',%20\'display:%20block;%20color:%20black;%20width:%203em;%20border:%201px%20solid%20black;%20padding:%205px;%20margin-top:%2010px;%20margin-left:%20auto;%20margin-right:%20auto;%20cursor:%20pointer;\',%20\'OK\');z.onclick=function(){D.body.removeChild(x);D.body.removeChild(y);};})()');
            toolbox.addOption('Remove sticky Elements', 'javascript:(function () {var i, elements = document.querySelectorAll(\'body *\');for (i = 0; i < elements.length; i++) {if (["sticky", "fixed"].includes(getComputedStyle(elements[i]).position)) {elements[i].parentNode.removeChild(elements[i]);}}})();');
            toolbox.addOption('Remove Elements', 'javascript:(function(){var isIe=false;/*@cc_on isIe=true; @*/function fe(a,fn){var i,l=a.length;for(i=0;i<l;i++){fn(a[i]);}};function ae(el,n,fn,ix){function wfn(ev){var el=(isIe?window.event.srcElement:ev.target);if(ix || !el.xmt) fn(el);}if (isIe){n=\'on\' + n;el.attachEvent(n, wfn);} else {el.addEventListener(n, wfn, false);}if(!el.es)el.es=[];el.es.push(function(){if(isIe){el.detachEvent(n,wfn);} else {el.removeEventListener(n, wfn, false);}});el.re=function(){fe(el.es,function(f){f()});};}function sce(el){var oldclick=el.onclick,oldmu=el.onmouseup,oldmd=el.onmousedown;el.onclick=function(){return false;};el.onmouseup=function(){return false;};el.onmousedown=function(){return false;};el.rce=function(){el.onclick=oldclick;el.onmouseup=oldmu;el.onmousedown=oldmd;};}if (!window.r_)window.r_=[];var r=window.r_;var D=document;ae(D.body,\'mouseover\', function(el){el.style.backgroundColor=\'#ffff99\';%20sce(el)});ae(D.body,\'mouseout\',%20%20function(el){el.style.backgroundColor=\'\';if(el.rce)el.rce();});ae(D.body,\'click\',%20%20%20%20%20function(el){el.style.display=\'none\';%20r.push(el);});function%20ac(p,tn,ih){var%20e=D.createElement(tn);if(ih)e.innerHTML=ih;p.appendChild(e);return%20e;}var%20p=0;var%20bx=ac(D.body,\'div\');bx.style.cssText=\'position:\'+(isIe?\'absolute\':\'fixed\')+\';padding:2px;background-color:#99FF99;border:1px%20solid%20green;z-index:9999;font-family:sans-serif;font-size:10px\';function%20sp(){bx.style.top=(p&2)?\'\':\'10px\';bx.style.bottom=(p&2)?\'10px\':\'\';bx.style.left=(p&1)?\'\':\'10px\';bx.style.right=(p&1)?\'10px\':\'\';}sp();var%20ul=ac(bx,\'a\',\'%20Undo%20|\');ae(ul,\'click\',function(){var%20e=r.pop();%20if(e)e.style.display=\'\';},%20true);var%20ual=ac(bx,\'a\',\'%20Undo%20All%20|\');ae(ual,\'click\',function(){var%20e;while(e=r.pop())e.style.display=\'\';},%20true);var%20ml=ac(bx,\'a\',\'%20Move%20|\');ae(ml,\'click\',function(){p++;sp();},%20true);var%20xl=ac(bx,\'a\',\'%20Exit%20\');ae(xl,\'click\',function(){D.body.re();bx.parentNode.removeChild(bx);},%20true);fe([bx,ul,ml,xl,ual],function(e){e.style.cursor=\'pointer\';e.xmt=1;});})()');
            toolbox.addOption('Remove Bloat', 'javascript:(function(){function R(w){try{var d=w.document,j,i,t,T,N,b,r=1,C;for(j=0;t=["object","embed","applet","iframe"][j];++j){T=d.getElementsByTagName(t);for(i=T.length-1;(i+1)&&(N=T[i]);--i)if(j!=3||!R((C=N.contentWindow)?C:N.contentDocument.defaultView)){b=d.createElement("div");b.style.width=N.width; b.style.height=N.height;b.innerHTML="<del>"+(j==3?"third-party "+t:t)+"</del>";N.parentNode.replaceChild(b,N);}}}catch(E){r=0}return r}R(self);var i,x;for(i=0;x=frames[i];++i)R(x)})()');
            toolbox.addOption('Make editable', 'javascript:document.body.contentEditable = \'true\'; document.designMode=\'on\'; void 0');
            toolbox.addOption('&lt;ul&gt;s to &lt;ol&gt;s', 'javascript:uls=document.getElementsByTagName("ul"); for (i=uls.length-1; i>=0; --i) { oldul = uls[i]; newol = document.createElement("ol"); for(j=0;j<oldul.childNodes.length;++j) newol.appendChild(oldul.childNodes[j].cloneNode(true)); oldul.parentNode.replaceChild(newol, oldul); } void 0');

            // ----------- Forms
            toolbox.renderGroup = toolbox.addGroup('Forms', 'tb-forms', true);
            toolbox.addOption('Show Password', 'javascript:(function(){var s,F,j,f,i; s = ""; F = document.forms; for(j=0; j<F.length; ++j) { f = F[j]; for (i=0; i<f.length; ++i) { if (f[i].type.toLowerCase() == "password") s += f[i].value + "\\n"; } } if (s) alert("Passwords in forms on this page:\\n\\n" + s); else alert("There are no passwords in forms on this page.");})();');
            toolbox.addOption('Unrestrict Form', 'javascript:(function(){function process(tag){var i,l,els=document.getElementsByTagName(tag);for(i=0,l=els.length;i<l;i++){els[i].readOnly = null;els[i].disabled = null;}}process(\'input\');process(\'select\');process(\'textarea\');process(\'button\');})()');
            toolbox.addOption('Show hidden Fields', 'javascript:(function(){ var is=document.getElementsByTagName("input"); for(i=0;i<is.length;i++){ if(typeof(is[i].attributes["type"])!="undefined" && is[i].attributes["type"].value.toLowerCase()=="hidden"){ is[i].setAttribute("type","text"); is[i].setAttribute("style","background-color:#FFFFE0;border:2px dashed #99CCFF;color:#000000;border-radius:0;font-size:12px;line-height:1;padding:4px 10px;height:auto"); is[i].insertAdjacentHTML("beforeBegin", is[i].getAttribute["name"]); } } })();');
            toolbox.addOption('Fill all Fields w/ asdf', ' javascript:for (var i = 0; i < document.forms.length; i++) for (var j = 0; j < document.forms[i].length; j++) if (!document.forms[i][j].value) void(document.forms[i][j].value = \'asdf\')');
            toolbox.addOption('Generic Site Password', 'javascript:var%20b64pad=%27%27;var%20chrsz=8;function%20b64_sha1(s){return%20binb2b64(core_sha1(str2binb(s),s.length*chrsz));}function%20core_sha1(x,len){x[len>>5]|=0x80<<(24-len);x[((len+64>>9)<<4)+15]=len;var%20w=Array(80);var%20a=1732584193;var%20b=-271733879;var%20c=-1732584194;var%20d=271733878;var%20e=-1009589776;for(var%20i=0;i<x.length;i+=16){var%20olda=a;var%20oldb=b;var%20oldc=c;var%20oldd=d;var%20olde=e;for(var%20j=0;j<80;j++){if(j<16)w[j]=x[i+j];else%20w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);var%20t=safe_add(safe_add(rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t;}a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);e=safe_add(e,olde);}return%20Array(a,b,c,d,e);}function%20sha1_ft(t,b,c,d){if(t<20)return%20(b&c)|((~b)&d);if(t<40)return%20b^c^d;if(t<60)return%20(b&c)|(b&d)|(c&d);return%20b^c^d;}function%20sha1_kt(t){return%20(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;}function%20safe_add(x,y){var%20lsw=(x&0xFFFF)+(y&0xFFFF);var%20msw=(x>>16)+(y>>16)+(lsw>>16);return%20(msw<<16)|(lsw&0xFFFF);}function%20rol(num,cnt){return%20(num<<cnt)|(num>>>(32-cnt));}function%20str2binb(str){var%20bin=Array();var%20mask=(1<<chrsz)-1;for(var%20i=0;i<str.length*chrsz;i+=chrsz)bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(24-i);return%20bin;}function%20binb2b64(binarray){var%20tab=%27ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/%27;var%20str=%27%27;for(var%20i=0;i<binarray.length*4;i+=3){var%20triplet=(((binarray[i>>2]>>8*(3-i%254))&0xFF)<<16)|(((binarray[i+1>>2]>>8*(3-(i+1)%254))&0xFF)<<8)|((binarray[i+2>>2]>>8*(3-(i+2)%254))&0xFF);for(var%20j=0;j<4;j++){if(i*8+j*6>binarray.length*32)str+=b64pad;else%20str+=tab.charAt((triplet>>6*(3-j))&0x3F);}}return%20str;}function%20doIt(){var%20master=window.prompt(%27Enter%20your%20master%20password%27);if(master!=%27%27&&master!=null){host=document.location.href.match(/http(s*):\\/\\/([^/]+)/)[2];if(sld=host.match(/([^.]+\\.([a-z][a-z][a-z]+|a[^abhjkpvy]|b[^cdklnpqux]|c[^bejkpqsty]|d[ejkmoz]|e[cegsu]|f[imor]|g[^cjkouvxz]|h[kmnrtu]|i[demnoqrst]|j[eop]|k[gimnpryz]|l[abcikrstuvy]|m[^bfijmz]|n[acefgloru]|om|p[aefhklmnrstwy]|qa|r[eosuw]|s[^fpqsw]|t[^abeiqrsuxy]|u[agsyz]|v[aceginu]|w[fs]|yt))$/i)){domain=sld[0];}else{domain=host.match(/([^.]+\\.[^.]+\\.[a-z][a-z])$/i)[0];}var%20i=0,j=0,p=b64_sha1(master+%27:%27+domain).substr(0,13)+%27@1a%27,E=document.getElementsByTagName(%27input%27),g=false;;for(j=0;j<E.length;j++){D=E[j];if(D.type==%27password%27){D.value=p;D.focus();g=true;}if(D.type==%27text%27){if(D.name.toUpperCase().indexOf(%27PASSWORD%27)!=-1||D.name.toUpperCase().indexOf(%27PASSWD%27)!=-1){D.value=p;D.focus();g=true;}}}if(!g){window.prompt(%27Your%20password%20for%20%27+domain+%27%20is%27,p)}}}doIt();void(null);');

            // ----------- Cookies
            toolbox.renderGroup = toolbox.addGroup('Cookies', 'tb-cookie', true);
            toolbox.addOption('Show Cookies', 'javascript:document.cookie=\'\';function hjK(S4p){D3p=/; /g;return S4p.replace(D3p, \'<br><br>\');}if(document.cookie.length<1){alert(\'No cookie from this site!\')}else{with((na=open(\'\',\'\',\'\')).document){write(hjK(\'Cookie for \'+document.title.link(window.location.href)+\', dd. \'+new Date()+\'<hr>\'+document.cookie));close()}}//4umi.com');
            toolbox.addOption('Expire Cookies', 'javascript:void((function(){var%20a,b,c,e,f;f=0;a=document.cookie.split(";%20");for(e=0;e<a.length&&a[e];e++){f++;for(b="."+location.host;b;b=b.replace(/^(?:%5C.|[^%5C.]+)/,"")){for(c=location.pathname;c;c=c.replace(/.$/,"")){document.cookie=(a[e]+";%20domain="+b+";%20path="+c+";%20expires="+new%20Date((new%20Date()).getTime()-1e11).toGMTString());}}}alert("Expired%20"+f+"%20cookies");})())');

            // ----------- CSS
            toolbox.renderGroup = toolbox.addGroup('CSS', 'tb-css', true);
            toolbox.addOption('Debug Styles', 'javascript:(function(d,i,l){l=d.getElementById(i);if(l){l.parentNode.removeChild(l);return;}l=d.createElement(\'link\');l.id=i;l.rel=\'stylesheet\';l.type=\'text/css\';l.href=\'//imbrianj.github.io/debugCSS/debugCSS.css\';d.getElementsByTagName(\'head\')[0].appendChild(l);}(document,\'debugCSS\'))');
            toolbox.addOption('Reload Styles every 2 Seconds', 'javascript:void(setInterval(function()%7Bvar%20qs=\'?\'+new%20Date().getTime(),l,i=0;while(l=document.getElementsByTagName(\'link\')%5Bi++%5D)%7Bif(l.rel&&\'stylesheet\'==l.rel.toLowerCase())%7Bif(!l._h)l._h=l.href;l.href=l._h+qs%7D%7D%7D,2000));');
            toolbox.addOption('Find Body-Overflows', 'javascript:(function(d){var w=d.documentElement.offsetWidth,t=d.createTreeWalker(d.body,NodeFilter.SHOW_ELEMENT),b;while(t.nextNode()){b=t.currentNode.getBoundingClientRect();if(b.right>w||b.left<0){t.currentNode.style.setProperty(\'outline\',\'1px dotted red\',\'important\');console.log(t.currentNode);}};}(document));');
            toolbox.addOption('Zap Styles', 'javascript:(function(){var i,x;for(i=0;x=document.styleSheets[i];++i)x.disabled=true;})();');
            toolbox.addOption('Show WebColors', 'javascript:t=\'\';c=new Array(\'00\',\'33\',\'66\',\'99\',\'CC\',\'FF\');for(i=0;i<6;i++){t+=\'<table width=100%>\';for(j=0;j<6;j++){t+=\'<tr>\';for(k=0;k<6;k++){L=c[i]+c[j]+c[k];t+=\'<td bgcolor=\'+L+\'>\'+L}t+=\'</tr>\'}t+=\'</table>\'}; W=open(\'\',\'\',\'width=500,height=700,left=0,top=0,resizable,scrollbars\');void(W.document.writeln(t));');
            toolbox.addOption('Test Google Fonts', 'javascript:(function(){var%20t=window.WFP=window.WFP||{},e=%22https:%22===window.location.protocol%3F%22https:%22:%22http:%22;t.bookmarklet=3,t.Picker%26%26t.Picker.show(),t.attached||t.Picker||(function(t){var%20e=document.createElement(%22link%22);e.rel=%22stylesheet%22,e.type=%22text/css%22,e.href=t,document.head.appendChild(e)}(e+%22//gavrilov.co.uk/wfp/WFP.css%22),function(t){var%20e=document.createElement(%22script%22);e.type=%22text/javascript%22,e.src=t,document.head.appendChild(e)}(e+%22//gavrilov.co.uk/wfp/WFP.full.min.js%22),t.attached=!0)})();');

            // ----------- Media / Export
            toolbox.renderGroup = toolbox.addGroup('Media / Export', 'tb-media', true);
            toolbox.addOption('Site to PDF', 'javascript: void(window.open(\'https://www.web2pdfconvert.com#\' + location.href))');
            toolbox.addOption('View Images', 'javascript:(function(){ var str=\'<font size=2 face=arial><h2>Images from page: \'+window.location.href +\'</h2>\'; var already_got_img = {}; if (document.images.length==0) { alert(\'no images in this page\'); } else { str += \'<h3>\'+document.images.length+\' images found</h3><hr>\\n\'; for(i=0;i<document.images.length;i++) { var img_src = document.images[i].src; if (!already_got_img[img_src]) { str += \'<img src=\\\'\'+document.images[i].src+\'\\\'><br>\\n\'+ \'<a href="\'+document.images[i].src + \'">\'+document.images[i].src+\'</a><br>\' + document.images[i].width + \'x\' + document.images[i].height + \'<br><br>\' + \'<hr noshade size=1>\\n\' ; already_got_img[img_src] = 1; } } var o=window.open(\'\',\'_blank\'); var newdoc=o.document; newdoc.write(str); newdoc.close(); } })();');
            toolbox.addOption('Extract SVGs', 'javascript:javascript: (function () { var e = document.createElement(\'script\'); e.setAttribute(\'src\', \'https://nytimes.github.io/svg-crowbar/svg-crowbar-2.js\'); e.setAttribute(\'class\', \'svg-crowbar\'); document.body.appendChild(e); })();');
        },

        setCookie: function(name, value, days) {
            var expires = '';
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + (value || '') + expires + '; path=/';
        },

        getCookie: function(name) {
            var nameEQ = name + '=',
                ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)===' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }
    };
    toolbox.init();
})();
