/*! (c) Philipp König under GPL-3.0 */
(e=>{"use strict";window.newtab=function(){let t={};this.opts={classes:{building:"building",initLoading:"initLoading",loading:"loading",chromeApps:"chromeApps",suggestions:"suggestions",active:"active",darkMode:"dark"},attr:{type:"data-type"},elm:{body:e("body"),title:e("head > title"),content:e("section#content"),topNav:e("section#content > nav"),search:{field:e("div#search > input[type='text']"),submit:e("div#search > button[type='submit']")},topPages:e("ul.topPages")},manifest:chrome.runtime.getManifest()},this.run=(()=>{chrome.permissions.contains({permissions:["tabs","topSites"]},function(e){e?s():chrome.tabs.update({url:"chrome-search://local-ntp/local-ntp.html"})})});let s=()=>{h(),p();let t=this.helper.template.loading().appendTo(this.opts.elm.body);this.opts.elm.body.addClass(this.opts.classes.initLoading),this.helper.model.init().then(()=>(!0===this.helper.model.getData("a/darkMode")&&this.opts.elm.body.addClass(this.opts.classes.darkMode),this.helper.i18n.init())).then(()=>(this.helper.font.init(),this.helper.stylesheet.init(),this.helper.stylesheet.addStylesheets(["newtab"],e(document)),this.helper.i18n.parseHtml(document),n(),i(),e.delay(500))).then(()=>{t.remove(),this.opts.elm.body.removeClass([this.opts.classes.building,this.opts.classes.initLoading])})},i=()=>{this.opts.elm.topNav.on("click","a."+this.opts.classes.chromeApps,e=>{e.preventDefault(),chrome.tabs.update({url:"chrome://apps"})}),this.opts.elm.search.submit.on("click",e=>{e.preventDefault(),e.stopPropagation();let t=this.opts.elm.search.field[0].value;t&&t.trim().length>0?l(t):chrome.tabs.update({url:"https://www.google.com"})}),this.opts.elm.search.field.on("keyup click",t=>{t.preventDefault(),t.stopPropagation();let s=t.currentTarget.value,i=event.which||event.keyCode;13===i?l(s):40===i?o("next"):38===i?o("prev"):(this.opts.elm.search.field.data("typedVal",s),a(s).then(t=>{if(e("ul."+this.opts.classes.suggestions).remove(),t.length>0){let s=e("<ul />").addClass(this.opts.classes.suggestions).insertAfter(this.opts.elm.search.field);t.some((t,i)=>{if(e("<li />").attr(this.opts.attr.type,t.type).text(t.label).appendTo(s),i>4)return!0}),s.css({top:this.opts.elm.search.field[0].offsetTop+"px",left:this.opts.elm.search.field[0].offsetLeft+"px"})}}))}),e(document).on("mousemove","ul."+this.opts.classes.suggestions+" > li",t=>{e("ul."+this.opts.classes.suggestions+" > li").removeClass(this.opts.classes.active),e(t.currentTarget).addClass(this.opts.classes.active)}).on("click","ul."+this.opts.classes.suggestions+" > li",t=>{t.preventDefault(),t.stopPropagation();let s=e(t.currentTarget).text().trim();this.opts.elm.search.field[0].value=s,l(s)}),e(document).on("click",()=>{e("ul."+this.opts.classes.suggestions).remove(),this.opts.elm.search.field[0].focus()}),e(window).on("resize",()=>{e("ul."+this.opts.classes.suggestions).remove()})},o=t=>{let s=e("ul."+this.opts.classes.suggestions+" > li."+this.opts.classes.active),i="next"===t?0:-1;s.length()>0&&(i=s.prevAll("li").length()+("next"===t?1:-1),s.removeClass(this.opts.classes.active));let o=!1;if(i>=0){let t=e("ul."+this.opts.classes.suggestions+" > li").eq(i);t.length()>0&&(o=!0,t.addClass(this.opts.classes.active),this.opts.elm.search.field[0].value=t.text().trim())}!1===o&&(this.opts.elm.search.field[0].value=this.opts.elm.search.field.data("typedVal"))},l=e=>{e&&e.trim().length>0&&(0===e.search(/https?\:\/\//)||0===e.search(/s?ftps?\:\/\//)||0===e.search(/chrome\:\/\//)?chrome.tabs.update({url:e}):chrome.tabs.update({url:"https://www.google.com/search?q="+encodeURIComponent(e)}))},a=s=>new Promise(i=>{if(s)if(t[s])i(t[s]);else{let o=encodeURIComponent(s),l=(e=[])=>{t[s]=e,i(e)};e.xhr("http://google.com/complete/search?client=chrome&q="+o,{responseType:"json"}).then(e=>{try{if(e.response&&e.response[0]===s){let t=[],s=[];e.response[1].forEach((i,o)=>{"NAVIGATION"===e.response[4]["google:suggesttype"][o]?t.push({type:"url",label:i}):s.push({type:"word",label:i})}),l(t.concat(s))}}catch(e){l()}},()=>{l()})}else i([])}),n=()=>{chrome.topSites.get(t=>{t.some((t,s)=>{let i=e("<li />").html("<a href='"+t.url+"' title='"+t.title+"'>"+t.title+"</a>").appendTo(this.opts.elm.topPages);if(this.helper.model.call("favicon",{url:t.url}).then(e=>{e.img&&i.children("a").prepend("<img src='"+e.img+"' />")}),s>=7)return!0})})},p=()=>{this.helper={model:new window.ModelHelper(this),template:new window.TemplateHelper(this),i18n:new window.I18nHelper(this),font:new window.FontHelper(this),stylesheet:new window.StylesheetHelper(this)}},h=()=>{this.opts.manifest.content_scripts[0].css.forEach(t=>{e("head").append("<link href='"+chrome.extension.getURL(t)+"' type='text/css' rel='stylesheet' />")});let t=(e=0)=>{let s=this.opts.manifest.content_scripts[0].js[e];if(void 0!==s){let i=document.createElement("script");document.head.appendChild(i),i.onload=(()=>t(e+1)),i.src="/"+s}};t()}},(new window.newtab).run()})(jsu);