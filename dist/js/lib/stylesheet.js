/*! (c) Philipp König under GPL-3.0 */
(s=>{"use strict";window.StylesheetHelper=function(e){let t={};this.init=(()=>{t=e.helper.model.getData("a/styles")}),this.addStylesheets=((a,l=null)=>{null===l?l=s(document):(e.helper.font.addStylesheet(l),e.opts.classes&&e.opts.classes.page&&!1===e.helper.model.getData("b/animations")&&e.opts.classes.page.noAnimations&&l.find("body").addClass(e.opts.classes.page.noAnimations));let n=null;n=0===l.find("head").length()?l.find("body"):l.find("head"),a.forEach(a=>{s.xhr(chrome.extension.getURL("css/"+a+".css")).then(s=>{if(s.response){let l=s.response;Object.keys(t).forEach(s=>{l=l.replace(new RegExp('"?%'+s+'"?',"g"),t[s])}),e.opts.classes&&e.opts.classes.page&&e.opts.classes.style&&e.opts.attr&&e.opts.attr.name?(n.find("style."+e.opts.classes.page.style+"["+e.opts.attr.name+"='"+a+"]").remove(),n.append("<style class='"+e.opts.classes.page.style+"' "+e.opts.attr.name+"='"+a+"'>"+l+"</style>")):n.append("<style>"+l+"</style>")}})})})}})(jsu);