(window.webpackJsonp=window.webpackJsonp||[]).push([[22,16],{494:function(t,e,n){var content=n(495);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("52d9b218",content,!0,{sourceMap:!1})},495:function(t,e,n){var o=n(21)((function(i){return i[1]}));o.push([t.i,".v-dialog{border-radius:4px;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);margin:24px;outline:none;overflow-y:auto;pointer-events:auto;transition:.3s cubic-bezier(.25,.8,.25,1);width:100%;z-index:inherit}.v-dialog:not(.v-dialog--fullscreen){max-height:90%}.v-dialog>*{width:100%}.v-dialog>.v-card>.v-card__title{font-size:1.25rem;font-weight:500;letter-spacing:.0125em;padding:16px 24px 10px}.v-dialog>.v-card>.v-card__subtitle,.v-dialog>.v-card>.v-card__text{padding:0 24px 20px}.v-dialog>.v-card>.v-card__actions{padding:8px 16px}.v-dialog__content{align-items:center;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:.2s cubic-bezier(.25,.8,.25,1),z-index 1ms;width:100%;z-index:6}.v-dialog__container{display:none}.v-dialog__container--attached{display:inline}.v-dialog--animated{animation-duration:.15s;animation-name:animate-dialog;animation-timing-function:cubic-bezier(.25,.8,.25,1)}.v-dialog--fullscreen{border-radius:0;height:100%;left:0;margin:0;overflow-y:auto;position:fixed;top:0}.v-dialog--fullscreen>.v-card{margin:0!important;min-height:100%;min-width:100%;padding:0!important}.v-dialog--scrollable,.v-dialog--scrollable>form{display:flex}.v-dialog--scrollable>.v-card,.v-dialog--scrollable>form>.v-card{display:flex;flex:1 1 100%;flex-direction:column;max-height:100%;max-width:100%}.v-dialog--scrollable>.v-card>.v-card__actions,.v-dialog--scrollable>.v-card>.v-card__title,.v-dialog--scrollable>form>.v-card>.v-card__actions,.v-dialog--scrollable>form>.v-card>.v-card__title{flex:0 0 auto}.v-dialog--scrollable>.v-card>.v-card__text,.v-dialog--scrollable>form>.v-card>.v-card__text{backface-visibility:hidden;flex:1 1 auto;overflow-y:auto}@keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}",""]),o.locals={},t.exports=o},501:function(t,e,n){var content=n(523);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("45481e6e",content,!0,{sourceMap:!1})},510:function(t,e,n){var content=n(518);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("1377ef10",content,!0,{sourceMap:!1})},512:function(t,e,n){"use strict";n.r(e);var o=n(238),r=n(517),c=n(490),l=n(569),d=n(489),f=n(541),h=n(486),v=(n(28),n(313),n(10),n(11),n(16),n(17),n(8),n(5),n(9),n(2)),m=n(547);function x(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}var y={props:{facturaLista:{type:Object,default:null}},data:function(){return{factura:{}}},watch:{facturaLista:{immediate:!0,handler:function(t){t&&this.update&&(this.factura=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?x(Object(n),!0).forEach((function(e){Object(v.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},t))}},update:{immediate:!0,handler:function(t){t||this.limpiarFormulario()}}},created:function(){console.log("Factura Recibida:",this.facturaLista)},methods:{cancelar:function(){this.$emit("click-cancel")},imprimir:function(){var t=new m.a({unit:"mm",format:"a4"}),element=document.getElementById("contenido-factura");t.html(element,{callback:function(t){t.save("factura.pdf")},margin:[10,10],x:10,y:10,width:180,windowWidth:1e3})},limpiarFormulario:function(){console.log("Limpiar formulario")}}},_=y,C=(n(522),n(67)),component=Object(C.a)(_,(function(){var t=this,e=t._self._c;return e("div",[e("div",{attrs:{id:"contenido-factura"}},[e(r.a,{staticClass:"mt-4"},[e(c.c,{staticClass:"headline"},[t._v("\n        Detalle de Factura\n      ")]),t._v(" "),e(c.b,[e(d.a,[e(h.a,[e(l.a,{staticClass:"bg-grey-lighten-3 p-2",attrs:{cols:"2"}},[e("p",[e("strong",[t._v("CLIENTE")])]),t._v(" "),e("p",[e("strong",[t._v("CREACIÓN")])]),t._v(" "),e("p",[e("strong",[t._v("TÉRMINOS Y CONDICIONES")])]),t._v(" "),e("p",[e("strong",[t._v("RESOLUCIÓN")])]),t._v(" "),e("p",[e("strong",[t._v("NÚMERO CAJA")])])]),t._v(" "),e(l.a,{staticClass:"bg-white p-2",attrs:{cols:"10"}},[e("p",[t._v(t._s(t.facturaLista.cliente))]),t._v(" "),e("p",[t._v(t._s(t.facturaLista.creacion))]),t._v(" "),e("p",[t._v("\n                Esta factura se asimila en todos sus efectos a una letra de cambio de\n                conformidad con el Art. 774 del Código de Comercio...\n              ")]),t._v(" "),e("p",[t._v("#12345")]),t._v(" "),e("p",[t._v("001")])])],1)],1),t._v(" "),e(f.a,{staticClass:"my-4"}),t._v(" "),e("table",{staticClass:"factura-table"},[e("thead",[e("tr",[e("th",[t._v("ITEM")]),t._v(" "),e("th",[t._v("REFERENCIA")]),t._v(" "),e("th",[t._v("PRECIO")]),t._v(" "),e("th",[t._v("IVA")]),t._v(" "),e("th",[t._v("DESCUENTO")]),t._v(" "),e("th",[t._v("CANTIDAD")]),t._v(" "),e("th",[t._v("TOTAL")])])]),t._v(" "),e("tbody",t._l(t.facturaLista.items,(function(n,o){return e("tr",{key:o},[e("td",[t._v(t._s(n.item))]),t._v(" "),e("td",[t._v(t._s(n.ref))]),t._v(" "),e("td",[t._v("$"+t._s(Number(n.precio).toFixed(2)))]),t._v(" "),e("td",[t._v("16%")]),t._v(" "),e("td",[t._v("$"+t._s(Number(n.descuento||0).toFixed(2)))]),t._v(" "),e("td",[t._v(t._s(n.cantidad))]),t._v(" "),e("td",[t._v("\n                $"+t._s((Number(n.precio)*n.cantidad*1.16).toFixed(2))+"\n              ")])])})),0)]),t._v(" "),e(f.a,{staticClass:"my-4"}),t._v(" "),e(d.a,[e(h.a,[e(l.a,{attrs:{cols:"6"}}),t._v(" "),e(l.a,{staticClass:"d-flex justify-end",attrs:{cols:"6"}},[e("table",{staticClass:"factura-table"},[e("tbody",[e("tr",[e("td",[e("strong",[t._v("SUB TOTAL:")])]),t._v(" "),e("td",[t._v("$"+t._s(Number(t.facturaLista.subtotal).toFixed(2)))])]),t._v(" "),e("tr",[e("td",[e("strong",[t._v("IVA (16%):")])]),t._v(" "),e("td",[t._v("$"+t._s(Number(t.facturaLista.iva).toFixed(2)))])]),t._v(" "),e("tr",[e("td",[e("strong",[t._v("TOTAL:")])]),t._v(" "),e("td",[e("strong",[t._v("$"+t._s(Number(t.facturaLista.total).toFixed(2)))])])])])])])],1)],1)],1)],1)],1),t._v(" "),e("div",{staticStyle:{"background-color":"#ffffff",padding:"5px",height:"50px",overflow:"hidden"}},[e(h.a,{staticClass:"d-flex justify-center align-center"},[e(l.a,{staticClass:"d-flex justify-center",attrs:{cols:"auto"}},[e(o.a,{attrs:{color:"#C4C4C4",dark:""},on:{click:t.cancelar}},[t._v("\n          Cancelar\n        ")])],1),t._v(" "),e(l.a,{staticClass:"d-flex justify-center",attrs:{cols:"auto"}},[e(o.a,{attrs:{color:"#3282B8",dark:""},on:{click:t.imprimir}},[t._v("\n          Imprimir\n        ")])],1)],1)],1)])}),[],!1,null,"92c6946c",null);e.default=component.exports},518:function(t,e,n){var o=n(21)((function(i){return i[1]}));o.push([t.i,".v-autocomplete.v-input>.v-input__control>.v-input__slot{cursor:text}.v-autocomplete input{align-self:center}.v-autocomplete.v-select.v-input--is-focused input{min-width:64px}.v-autocomplete:not(.v-input--is-focused).v-select--chips input{max-height:0;padding:0}.v-autocomplete--is-selecting-index input{opacity:0}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__slot>input{margin-top:24px}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined).v-input--dense .v-select__slot>input{margin-top:20px}.v-autocomplete__content.v-menu__content,.v-autocomplete__content.v-menu__content .v-card{border-radius:0}",""]),o.locals={},t.exports=o},520:function(t,e,n){"use strict";var o=n(147),r=n(2),c=(n(10),n(11),n(178),n(59),n(28),n(16),n(17),n(8),n(5),n(68),n(76),n(9),n(69),n(494),n(628)),l=n(492),d=n(221),f=n(506),h=n(226),v=n(504),m=n(505),x=n(222),y=n(13),_=n(12),C=n(0);function w(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function O(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?w(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var S=Object(y.a)(d.a,f.a,h.a,v.a,m.a,l.a);e.a=S.extend({name:"v-dialog",directives:{ClickOutside:x.a},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes:function(){return Object(r.a)(Object(r.a)(Object(r.a)(Object(r.a)(Object(r.a)(Object(r.a)({},"v-dialog ".concat(this.contentClass).trim(),!0),"v-dialog--active",this.isActive),"v-dialog--persistent",this.persistent),"v-dialog--fullscreen",this.fullscreen),"v-dialog--scrollable",this.scrollable),"v-dialog--animated",this.animate)},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(_.e)("full-width",this)},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},beforeDestroy:function(){"undefined"!=typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){var e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):h.a.options.methods.hideScroll.call(this)},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$nextTick((function(){var e,n;(null===(e=t.$refs.dialog)||void 0===e?void 0:e.contains(document.activeElement))||(t.previousActiveElement=document.activeElement,null===(n=t.$refs.dialog)||void 0===n||n.focus()),t.bind()}))}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(t){if(t.keyCode===C.s.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus()}))}this.$emit("keydown",t)},onFocusin:function(t){if(t&&this.retainFocus){var e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(e)}))){var n=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),r=Object(o.a)(n).find((function(t){return!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')}));r&&r.focus()}}},genContent:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement(c.a,{props:{root:!0,light:t.light,dark:t.dark}},[t.$createElement("div",{class:t.contentClasses,attrs:O({role:"dialog","aria-modal":t.hideOverlay?void 0:"true"},t.getScopeIdAttrs()),on:{keydown:t.onKeydown},style:{zIndex:t.activeZIndex},ref:"content"},[t.genTransition()])])]}))},genTransition:function(){var content=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[content]):content},genInnerContent:function(){var data={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(data.style=O(O({},data.style),{},{maxWidth:Object(C.g)(this.maxWidth),width:Object(C.g)(this.width)})),this.$createElement("div",data,this.getContentSlot())}},render:function(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},522:function(t,e,n){"use strict";n(501)},523:function(t,e,n){var o=n(21)((function(i){return i[1]}));o.push([t.i,".factura-header[data-v-92c6946c]{background-color:#f4f4f4;border-radius:8px;margin-bottom:16px;padding:16px}.factura-info p[data-v-92c6946c]{font-size:14px;margin:8px 0;text-align:center}.factura-table td[data-v-92c6946c],.factura-table th[data-v-92c6946c]{border:1px solid #ddd;padding:8px;text-align:left}.totales p[data-v-92c6946c]{margin:8px 0}.bg-grey-lighten-3[data-v-92c6946c]{background-color:#f0f0f0}.bg-white[data-v-92c6946c]{background-color:#fff}.v-col[data-v-92c6946c]{display:flex;flex-direction:column;justify-content:center}.v-col p[data-v-92c6946c]{font-size:14px;line-height:1.5;margin:8px 0}.factura-table td[data-v-92c6946c],.factura-table th[data-v-92c6946c]{border:1px solid #ddd}.factura-table th[data-v-92c6946c]{text-align:center}.factura-table[data-v-92c6946c]{border-collapse:collapse;margin-top:16px;width:100%}.factura-table td[data-v-92c6946c],.factura-table th[data-v-92c6946c]{border:none;border-bottom:1px solid #ddd;padding:8px;text-align:left}.factura-table th[data-v-92c6946c]{background-color:#f0f0f0;font-weight:700}.factura-table td[data-v-92c6946c]{text-align:right}.factura-table tbody tr td[data-v-92c6946c]:first-child{text-align:left}",""]),o.locals={},t.exports=o},524:function(t,e,n){var content=n(549);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("69c53e8e",content,!0,{sourceMap:!1})},540:function(t,e,n){"use strict";n(10),n(16),n(17),n(8),n(9);var o=n(2),r=(n(11),n(178),n(223),n(59),n(75),n(5),n(68),n(76),n(510),n(533)),c=n(531),l=n(77),d=n(0);function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){Object(o.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var v=h(h({},r.b),{},{offsetY:!0,offsetOverflow:!0,transition:!1});e.a=r.a.extend({name:"v-autocomplete",props:{autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,n){return n.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:r.a.options.props.menuProps.type,default:function(){return v}},noFilter:Boolean,searchInput:{type:String}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return h(h({},r.a.options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){var n=Object(d.n)(e,t.itemText),text=null!=n?String(n):"";return t.filter(e,String(t.internalSearch),text)}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch!==t&&(this.lazySearch=t,this.$emit("update:search-input",t))}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=r.a.options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),h(h({},v),t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(i){return t.valueComparator(t.getValue(i),t.getValue(t.internalValue))}))},listData:function(){var data=r.a.options.computed.listData.call(this);return data.props=h(h({},data.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),data}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.blur(),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=null)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(t,e){var n=this;if(t!==e){if(!this.autoSelectFirst){var o=e[this.$refs.menu.listIndex];o?this.setMenuIndex(t.findIndex((function(i){return i===o}))):this.setMenuIndex(-1),this.$emit("update:list-index",this.$refs.menu.listIndex)}this.$nextTick((function(){n.internalSearch&&(1===t.length||n.autoSelectFirst)&&(n.$refs.menu.getTiles(),n.autoSelectFirst&&t.length&&(n.setMenuIndex(0),n.$emit("update:list-index",n.$refs.menu.listIndex)))}))}},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){this.searchIsDirty||(this.multiple&&t===d.s.left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===d.s.right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==d.s.backspace&&t!==d.s.delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var t=this.selectedIndex,e=this.selectedItems[t];if(this.isInteractive&&!this.getDisabled(e)){var n=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===n){var o=t!==this.selectedItems.length-1?t:t-1;this.selectedItems[o]?this.selectItem(e):this.setValue(this.multiple?[]:null),this.selectedIndex=o}else this.selectedIndex=n}},clearableCallback:function(){this.internalSearch=null,r.a.options.methods.clearableCallback.call(this)},genInput:function(){var input=c.a.options.methods.genInput.call(this);return input.data=Object(l.a)(input.data,{attrs:{"aria-activedescendant":Object(d.m)(this.$refs.menu,"activeTile.id"),autocomplete:Object(d.m)(input.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),input},genInputSlot:function(){var slot=r.a.options.methods.genInputSlot.call(this);return slot.data.attrs.role="combobox",slot},genSelections:function(){return this.hasSlot||this.multiple?r.a.options.methods.genSelections.call(this):[]},onClick:function(t){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,n=e.value;e.value&&this.activateMenu(),this.multiple||""!==n||this.deleteCurrentItem(),this.internalSearch=n,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;!t.ctrlKey&&[d.s.home,d.s.end].includes(e)||r.a.options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){r.a.options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(t){t.preventDefault(),this.activateMenu()},selectItem:function(t){r.a.options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){r.a.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.multiple||this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){var e,n;if(-1!==this.selectedIndex){var o=this.selectedItems[this.selectedIndex],r=this.getText(o);null===(e=t.clipboardData)||void 0===e||e.setData("text/plain",r),null===(n=t.clipboardData)||void 0===n||n.setData("text/vnd.vuetify.autocomplete.item+plain",r),t.preventDefault()}}}})},548:function(t,e,n){"use strict";n(524)},549:function(t,e,n){var o=n(21)((function(i){return i[1]}));o.push([t.i,".container-header[data-v-297e74df]{align-items:center;background-color:#0f4c75;border-radius:8px;box-sizing:border-box;color:#fff;display:flex;margin:0 auto;padding:15px 20px;width:96%}.header-title[data-v-297e74df]{font-size:28px;font-weight:800;line-height:30px}.facturador-layout[data-v-297e74df]{background-color:#fff;display:flex;flex-direction:column;gap:1rem;padding:1rem}.panel[data-v-297e74df]{display:flex;justify-content:space-between;overflow-x:hidden}.panel-productos[data-v-297e74df]{width:44%}.toolbar[data-v-297e74df]{align-items:center;display:flex;justify-content:space-between}.input-busqueda[data-v-297e74df]{border:2px solid #0f4c75;border-radius:4px;flex-grow:1;padding:.5rem}.agregar-button[data-v-297e74df]{border:none;color:#0f4c75;height:15px;width:15px}.icon-button[data-v-297e74df]{background:none;border:none;color:#fff;cursor:pointer;font-size:1.2rem}.lista-productos[data-v-297e74df]{list-style:none;margin-top:35px;padding:0}.producto-item[data-v-297e74df]{border:1px solid #ddd;border-radius:8px;margin-bottom:.5rem;padding:.5rem 1rem}.footer[data-v-297e74df],.producto-item[data-v-297e74df]{align-items:center;display:flex;justify-content:space-between}.cancelar-button[data-v-297e74df]{background-color:#bbe1fa;color:#0f4c75}.cancelar-button[data-v-297e74df],.vendido-button[data-v-297e74df]{border:none;border-radius:4px;font-size:.9rem;height:68px;padding:.5rem 1rem;width:569px}.vendido-button[data-v-297e74df]{background-color:#0f4c75;color:#fff}body[data-v-297e74df],html[data-v-297e74df]{overflow-x:hidden;width:100%}.panel-ventas[data-v-297e74df]{display:flex;flex-direction:column;gap:1rem;max-height:625px;overflow:hidden;width:44%}.lista-ventas[data-v-297e74df]{height:680px;list-style:none;margin:0;max-height:800px;overflow-y:auto;padding:0}.venta-item[data-v-297e74df]{align-items:center;background-color:#fff;border:1px solid #ddd;border-radius:8px;display:flex;height:50px;justify-content:space-between;margin-bottom:10px;padding:10px}.venta-item-info[data-v-297e74df]{display:flex;flex-direction:column;gap:5px}.producto-nombre[data-v-297e74df]{font-size:16px;font-weight:700}.producto-precio[data-v-297e74df]{color:#555;font-size:14px}.producto-codigo[data-v-297e74df]{color:#888;font-size:12px}.cantidad-control[data-v-297e74df]{align-items:center;display:flex;gap:5px}.cantidad-btn[data-v-297e74df]{background-color:#fff;border:1px;border-radius:4px;color:#3282b8;cursor:pointer;font-size:18px;padding:5px 10px}.cantidad[data-v-297e74df]{font-size:16px}.total-producto[data-v-297e74df]{font-size:16px;font-weight:700}.eliminar-btn[data-v-297e74df]{background:none;border:none;color:#e74c3c;cursor:pointer;font-size:20px}",""]),o.locals={},t.exports=o},562:function(t,e,n){"use strict";n.r(e);var o=n(540),r=n(520),c=n(484),l=n(237),d=n(2),f=n(30);n(119),n(29),n(10),n(11),n(178),n(59),n(75),n(28),n(16),n(17),n(8),n(9),n(5),n(40),n(68),n(76);function h(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function v(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){Object(d.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var m={components:{facturaArchivo:n(512).default},data:function(){return{products:[],cart:[],clientes:[],selectedClient:null,selectedProduct:null,dialogCreateFactura:!1,facturaEnviar:{},searchQuery:""}},computed:{total:function(){return this.cart.reduce((function(t,e){return t+Number(e.precio)*e.quantity}),0).toLocaleString("es-MX")}},mounted:function(){this.getClientes(),this.getInventarios()},methods:{cancelSale:function(){this.cart=[]},selectProduct:function(t){this.selectedProduct=t.id},selectClient:function(t){this.selectedClient=t.id,console.log("Cliente seleccionado:",this.selectedClient.nombre)},getInventarios:function(){var t=this;return Object(f.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/inventarios");case 2:(n=e.sent)&&n.data&&n.data.success&&(t.products=n.data.inventarios);case 4:case"end":return e.stop()}}),e)})))()},updateQuantity:function(t,e){t.quantity+e>0&&(t.quantity+=e)},removeFromCart:function(t){this.cart=this.cart.filter((function(e){return e.id!==t.id}))},addToCart:function(t){var e=this.cart.find((function(e){return e.id===t.id}));e?e.quantity++:this.cart.push(v(v({},t),{},{quantity:1}))},getClientes:function(){var t=this;return Object(f.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/clientes");case 2:(n=e.sent)&&n.data&&n.data.success&&(t.clientes=n.data.clientes.map((function(t){return v(v({},t),{},{fullName:"".concat(t.nombre," ").concat(t.apaterno," ").concat(t.amaterno).trim()})})),console.log("Clientes cargados:",t.clientes));case 4:case"end":return e.stop()}}),e)})))()},validarVenta:function(){var t=this;if(this.selectedClient)if(0!==this.cart.length){var e=this.clientes.find((function(e){return e.id===t.selectedClient}));if(e){var n=e.fullName||"Cliente no definido";this.subtotal=this.cart.reduce((function(t,e){return t+Number(e.precio)*e.quantity}),0),this.iva=.16*this.subtotal,this.total=this.subtotal+this.iva,this.facturaEnviar={cliente:n,creacion:(new Date).toLocaleString(),items:this.cart.map((function(t){return{item:t.item,referencia:t.referencia,precio:t.precio,descuento:t.descuento||0,cantidad:t.quantity,total:Number(t.precio)*t.quantity}})),subtotal:this.subtotal,iva:this.iva,total:this.subtotal+this.iva},console.log("Factura Enviar:",this.facturaEnviar),this.dialogCreateFactura=!0}else alert("Cliente no encontrado.")}else alert("Por favor agrega al menos un producto al carrito.");else alert("Por favor selecciona un cliente.")},filteredProducts:function(){var t=this.searchQuery.toLowerCase().trim();return t?this.products.filter((function(e){var n=e.ref?e.ref.toString().toLowerCase():"",o=e.item?e.item.toString().toLowerCase():"";return n.includes(t)||o.includes(t)})):this.products},onSearch:function(){return this.searchQuery.trim()?this.filteredProducts():this.products}}},x=(n(548),n(67)),component=Object(x.a)(m,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"container-header"},[e(l.a,{staticClass:"header-title"},[t._v("\n      Facturador\n    ")]),t._v(" "),e(c.a)],1),t._v(" "),e("div",{staticClass:"facturador-layout"},[e("div",{staticStyle:{margin:"20px"}},[e("div",{staticClass:"panel"},[e("div",{staticClass:"panel-productos"},[e("div",{staticClass:"toolbar"},[t._m(0),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchQuery,expression:"searchQuery"}],staticClass:"input-busqueda",staticStyle:{height:"47px"},attrs:{type:"text",placeholder:"PRODUCTOS"},domProps:{value:t.searchQuery},on:{input:function(e){e.target.composing||(t.searchQuery=e.target.value)}}})]),t._v(" "),e("ul",{staticClass:"lista-productos"},[0===t.filteredProducts().length?e("li",{staticClass:"producto-item"},[t._v("\n              No se encontraron productos que coincidan con tu búsqueda.\n            ")]):t._e(),t._v(" "),t._l(t.filteredProducts(),(function(n){return e("li",{key:n.id,staticClass:"producto-item",style:{marginBottom:"15px",padding:"10px",borderBottom:"1px solid #ddd",color:"black",borderRadius:"15px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.2)",backgroundColor:t.selectedProduct===n.id?"#BBE1FA":"transparent"},on:{click:function(e){return t.selectProduct(n)}}},[e("div",{staticClass:"producto-info"},[e("span",{staticClass:"producto-codigo"},[t._v(t._s(n.ref))])]),t._v(" "),e("div",[e("span",{staticClass:"producto-nombre"},[t._v(t._s(n.item))])]),t._v(" "),e("div",{staticClass:"producto-precio"},[t._v("\n                $"+t._s(n.precio.toLocaleString("es-MX"))+"\n              ")]),t._v(" "),e("button",{staticClass:"icon-button",staticStyle:{color:"#C4C4C4"},on:{click:function(e){return t.addToCart(n)}}},[e("i",{staticClass:"mdi mdi-star-outline"})])])}))],2)]),t._v(" "),e("div",{staticClass:"panel-ventas"},[e("div",{staticClass:"container",staticStyle:{width:"569px",height:"68px","background-color":"#3282B8",color:"white",display:"flex","justify-content":"center","align-items":"center","text-align":"center"}},[t._v("\n            Ventas\n          ")]),t._v(" "),e("div",{staticClass:"container",staticStyle:{width:"569px",height:"68px","background-color":"white",color:"white",display:"flex","justify-content":"center","align-items":"center","text-align":"center"}},[e("div",{staticClass:"toolbar",staticStyle:{width:"100%",display:"flex","align-items":"center"}},[e("div",[e(o.a,{staticStyle:{width:"500px",height:"50px","margin-left":"30px"},attrs:{items:t.clientes,"item-text":"fullName","item-value":"id",label:"Selecciona un cliente",placeholder:"Clientes",outlined:""},model:{value:t.selectedClient,callback:function(e){t.selectedClient=e},expression:"selectedClient"}})],1)])]),t._v(" "),e("div",{staticStyle:{width:"100%",height:"3px","background-color":"#C4C4C4","margin-top":"10px"}}),t._v(" "),e("ul",{staticClass:"lista-ventas"},t._l(t.cart,(function(n){return e("li",{key:n.id,staticClass:"venta-item"},[e("div",{staticClass:"venta-item-info"},[e("span",{staticClass:"producto-nombre"},[t._v(t._s(n.item))]),t._v(" "),e("div",{staticClass:"producto-info"},[e("span",{staticClass:"producto-precio",staticStyle:{"margin-right":"50px"}},[t._v("$"+t._s(n.precio.toLocaleString("es-MX")))]),t._v(" "),e("span",{staticClass:"producto-codigo"},[t._v(t._s(n.ref))])])]),t._v(" "),e("div",{staticClass:"cantidad-control"},[e("button",{staticClass:"cantidad-btn",on:{click:function(e){return t.updateQuantity(n,-1)}}},[e("span",{staticClass:"mdi mdi-minus-thick"})]),t._v(" "),e("span",{staticClass:"cantidad"},[t._v(t._s(n.quantity))]),t._v(" "),e("button",{staticClass:"cantidad-btn",on:{click:function(e){return t.updateQuantity(n,1)}}},[e("span",{staticClass:"mdi mdi-hospital"})])]),t._v(" "),e("span",{staticClass:"total-producto"},[t._v("$"+t._s((n.precio*n.quantity).toLocaleString()))]),t._v(" "),e("button",{staticClass:"eliminar-btn",on:{click:function(e){return t.removeFromCart(n)}}},[e("i",{staticClass:"mdi mdi-delete"})])])})),0),t._v(" "),e("div",{staticClass:"container",staticStyle:{height:"300px"}}),t._v(" "),e("div",{staticStyle:{width:"569px"}},[e("button",{staticClass:"vendido-button",staticStyle:{display:"flex","justify-content":"space-between","align-items":"center",padding:"0 15px"},on:{click:t.validarVenta}},[e("span",[t._v("Vendido")]),t._v(" "),e("span",[t._v("$"+t._s(t.total.toLocaleString()))])])]),t._v(" "),e("div",{staticStyle:{width:"569px"}},[e("button",{staticClass:"cancelar-button",staticStyle:{display:"flex","justify-content":"flex-end","align-items":"center",gap:"8px"},on:{click:t.cancelSale}},[e("div",{staticStyle:{"margin-right":"8px"}},[t._v("\n                CANCELAR ACTUAL\n              ")]),t._v(" "),e("i",{staticClass:"mdi mdi-delete",staticStyle:{"font-size":"18px"}})])])])])])]),t._v(" "),e(r.a,{attrs:{width:"1000",persistent:""},model:{value:t.dialogCreateFactura,callback:function(e){t.dialogCreateFactura=e},expression:"dialogCreateFactura"}},[e("factura-archivo",{attrs:{inside:!0,"factura-lista":t.facturaEnviar},on:{"click-cancel":function(e){t.dialogCreateFactura=!1}}})],1)],1)}),[function(){var t=this._self._c;return t("div",{staticClass:"icon-container",staticStyle:{"background-color":"#3282B8",width:"74px",height:"47px",display:"flex","justify-content":"center","align-items":"center","border-radius":"4px","pointer-events":"none"}},[t("button",[t("i",{staticClass:"mdi mdi-magnify",staticStyle:{"font-size":"18.71px",width:"18.71px","pointer-events":"none"}})])])}],!1,null,"297e74df",null);e.default=component.exports;installComponents(component,{FacturaArchivo:n(512).default})},636:function(t,e,n){"use strict";n.r(e);var o={components:{facturador:n(562).default},layout:"dashboard",middleware:"auth"},r=n(67),component=Object(r.a)(o,(function(){return(0,this._self._c)("facturador")}),[],!1,null,"b0bef28e",null);e.default=component.exports}}]);