/*! (c) Philipp König under GPL-3.0 */
(e=>{"use strict";e.StylesheetHelper=function(t){let l={},a="",s=!1;this.init=(e=>{e&&e.defaultVal&&!0===e.defaultVal&&(s=!0),l=t.helper.model.getData("a/styles",s),a=t.helper.model.getData("u/customCss")}),this.addStylesheets=((n,d=null)=>{null===d?d=e(document):(t.helper.font.addStylesheet(d,s?"default":"config"),e.cl&&e.cl.page&&!1===t.helper.model.getData("b/animations")&&e.cl.page.noAnimations&&d.find("body").addClass(e.cl.page.noAnimations));let c=null;c=0===d.find("head").length()?d.find("body"):d.find("head"),n.forEach(t=>{e.xhr(chrome.extension.getURL("css/"+t+".css")).then(s=>{if(s.response){let n=s.response;n+=a,Object.keys(l).forEach(e=>{n=n.replace(new RegExp('"?%'+e+'"?',"g"),l[e])}),e.cl&&e.cl.page&&e.cl.page.style&&e.attr&&e.attr.name?(c.find("style."+e.cl.page.style+"["+e.attr.name+"='"+t+"']").remove(),c.append("<style class='"+e.cl.page.style+"' "+e.attr.name+"='"+t+"'>"+n+"</style>")):c.append("<style>"+n+"</style>")}})})})}})(jsu);