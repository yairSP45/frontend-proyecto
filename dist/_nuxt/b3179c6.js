(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{510:function(t,e,n){var content=n(518);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("1377ef10",content,!0,{sourceMap:!1})},518:function(t,e,n){var r=n(21)((function(i){return i[1]}));r.push([t.i,".v-autocomplete.v-input>.v-input__control>.v-input__slot{cursor:text}.v-autocomplete input{align-self:center}.v-autocomplete.v-select.v-input--is-focused input{min-width:64px}.v-autocomplete:not(.v-input--is-focused).v-select--chips input{max-height:0;padding:0}.v-autocomplete--is-selecting-index input{opacity:0}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__slot>input{margin-top:24px}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined).v-input--dense .v-select__slot>input{margin-top:20px}.v-autocomplete__content.v-menu__content,.v-autocomplete__content.v-menu__content .v-card{border-radius:0}",""]),r.locals={},t.exports=r},540:function(t,e,n){"use strict";n(10),n(16),n(17),n(8),n(9);var r=n(2),o=(n(11),n(178),n(223),n(59),n(75),n(5),n(68),n(76),n(510),n(533)),l=n(531),c=n(77),h=n(0);function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var m=f(f({},o.b),{},{offsetY:!0,offsetOverflow:!0,transition:!1});e.a=o.a.extend({name:"v-autocomplete",props:{autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,n){return n.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:o.a.options.props.menuProps.type,default:function(){return m}},noFilter:Boolean,searchInput:{type:String}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return f(f({},o.a.options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){var n=Object(h.n)(e,t.itemText),text=null!=n?String(n):"";return t.filter(e,String(t.internalSearch),text)}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch!==t&&(this.lazySearch=t,this.$emit("update:search-input",t))}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=o.a.options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),f(f({},m),t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(i){return t.valueComparator(t.getValue(i),t.getValue(t.internalValue))}))},listData:function(){var data=o.a.options.computed.listData.call(this);return data.props=f(f({},data.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),data}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.blur(),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=null)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(t,e){var n=this;if(t!==e){if(!this.autoSelectFirst){var r=e[this.$refs.menu.listIndex];r?this.setMenuIndex(t.findIndex((function(i){return i===r}))):this.setMenuIndex(-1),this.$emit("update:list-index",this.$refs.menu.listIndex)}this.$nextTick((function(){n.internalSearch&&(1===t.length||n.autoSelectFirst)&&(n.$refs.menu.getTiles(),n.autoSelectFirst&&t.length&&(n.setMenuIndex(0),n.$emit("update:list-index",n.$refs.menu.listIndex)))}))}},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){this.searchIsDirty||(this.multiple&&t===h.s.left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===h.s.right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==h.s.backspace&&t!==h.s.delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var t=this.selectedIndex,e=this.selectedItems[t];if(this.isInteractive&&!this.getDisabled(e)){var n=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===n){var r=t!==this.selectedItems.length-1?t:t-1;this.selectedItems[r]?this.selectItem(e):this.setValue(this.multiple?[]:null),this.selectedIndex=r}else this.selectedIndex=n}},clearableCallback:function(){this.internalSearch=null,o.a.options.methods.clearableCallback.call(this)},genInput:function(){var input=l.a.options.methods.genInput.call(this);return input.data=Object(c.a)(input.data,{attrs:{"aria-activedescendant":Object(h.m)(this.$refs.menu,"activeTile.id"),autocomplete:Object(h.m)(input.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),input},genInputSlot:function(){var slot=o.a.options.methods.genInputSlot.call(this);return slot.data.attrs.role="combobox",slot},genSelections:function(){return this.hasSlot||this.multiple?o.a.options.methods.genSelections.call(this):[]},onClick:function(t){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,n=e.value;e.value&&this.activateMenu(),this.multiple||""!==n||this.deleteCurrentItem(),this.internalSearch=n,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;!t.ctrlKey&&[h.s.home,h.s.end].includes(e)||o.a.options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){o.a.options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(t){t.preventDefault(),this.activateMenu()},selectItem:function(t){o.a.options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){o.a.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.multiple||this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){var e,n;if(-1!==this.selectedIndex){var r=this.selectedItems[this.selectedIndex],o=this.getText(r);null===(e=t.clipboardData)||void 0===e||e.setData("text/plain",o),null===(n=t.clipboardData)||void 0===n||n.setData("text/vnd.vuetify.autocomplete.item+plain",o),t.preventDefault()}}}})},559:function(t,e,n){var content=n(592);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("3afb3406",content,!0,{sourceMap:!1})},591:function(t,e,n){"use strict";n(559)},592:function(t,e,n){var r=n(21)((function(i){return i[1]}));r.push([t.i,".login-container[data-v-6fd633da]{align-items:center;display:flex;justify-content:center;min-height:100vh}.title[data-v-6fd633da]{font-size:1.2rem}.error[data-v-6fd633da],.title[data-v-6fd633da]{font-weight:700}.error[data-v-6fd633da]{color:#fff;font-size:16px;margin-top:10px;text-align:center}.rounded-field .v-input__control[data-v-6fd633da]{border-radius:50px}.black-text-field .v-input__control[data-v-6fd633da]{background-color:#f0f0f0!important}.black-text-field input[data-v-6fd633da]{color:#000!important}",""]),r.locals={},t.exports=r},625:function(t,e,n){"use strict";n.r(e);var r=n(238),o=n(517),l=n(490),c=n(569),h=n(15),d=n(2),f=(n(10),n(11),n(178),n(223),n(59),n(50),n(179),n(36),n(5),n(16),n(17),n(8),n(40),n(227),n(9),n(68),n(510),n(533)),m=n(540),v=n(0);function x(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function I(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?x(Object(n),!0).forEach((function(e){Object(d.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var S=m.a.extend({name:"v-combobox",props:{delimiters:{type:Array,default:function(){return[]}},returnObject:{type:Boolean,default:!0}},data:function(){return{editingIndex:-1}},computed:{computedCounterValue:function(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot:function(){return f.a.options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed:function(){return!0},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)},searchIsDirty:function(){return null!=this.internalSearch}},methods:{onInternalSearchChanged:function(t){if(t&&this.multiple&&this.delimiters.length){var e=this.delimiters.find((function(e){return t.endsWith(e)}));null!=e&&(this.internalSearch=t.slice(0,t.length-e.length),this.updateTags())}this.updateMenuDimensions()},genInput:function(){var input=m.a.options.methods.genInput.call(this);return delete input.data.attrs.name,input.data.on.paste=this.onPaste,input},genChipSelection:function(t,e){var n=this,r=f.a.options.methods.genChipSelection.call(this,t,e);return this.multiple&&(r.componentOptions.listeners=I(I({},r.componentOptions.listeners),{},{dblclick:function(){n.editingIndex=e,n.internalSearch=n.getText(t),n.selectedIndex=-1}})),r},onChipInput:function(t){f.a.options.methods.onChipInput.call(this,t),this.editingIndex=-1},onEnterDown:function(t){t.preventDefault(),this.getMenuIndex()>-1||this.$nextTick(this.updateSelf)},onKeyDown:function(t){var e=t.keyCode;!t.ctrlKey&&[v.s.home,v.s.end].includes(e)||f.a.options.methods.onKeyDown.call(this,t),this.multiple&&e===v.s.left&&0===this.$refs.input.selectionStart?this.updateSelf():e===v.s.enter&&this.onEnterDown(t),this.changeSelectedIndex(e)},onTabDown:function(t){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return t.preventDefault(),t.stopPropagation(),this.updateTags();m.a.options.methods.onTabDown.call(this,t)},selectItem:function(t){this.editingIndex>-1?this.updateEditing():(m.a.options.methods.selectItem.call(this,t),this.internalSearch&&this.multiple&&this.getText(t).toLocaleLowerCase().includes(this.internalSearch.toLocaleLowerCase())&&(this.internalSearch=null))},setSelectedItems:function(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue:function(t){f.a.options.methods.setValue.call(this,void 0===t?this.internalSearch:t)},updateEditing:function(){var t=this,e=this.internalValue.slice(),n=this.selectedItems.findIndex((function(e){return t.getText(e)===t.internalSearch}));if(n>-1){var r="object"===Object(h.a)(e[n])?Object.assign({},e[n]):e[n];e.splice(n,1),e.push(r)}else e[this.editingIndex]=this.internalSearch;this.setValue(e),this.editingIndex=-1,this.internalSearch=null},updateCombobox:function(){this.searchIsDirty&&(this.internalSearch!==this.getText(this.internalValue)&&this.setValue(),(Boolean(this.$scopedSlots.selection)||this.hasChips)&&(this.internalSearch=null))},updateSelf:function(){this.multiple?this.updateTags():this.updateCombobox()},updateTags:function(){var t=this,e=this.getMenuIndex();if(!(e<0&&!this.searchIsDirty||!this.internalSearch)){if(this.editingIndex>-1)return this.updateEditing();var n=this.selectedItems.findIndex((function(e){return t.internalSearch===t.getText(e)})),r=n>-1&&"object"===Object(h.a)(this.selectedItems[n])?Object.assign({},this.selectedItems[n]):this.internalSearch;if(n>-1){var o=this.internalValue.slice();o.splice(n,1),this.setValue(o)}if(e>-1)return this.internalSearch=null;this.selectItem(r),this.internalSearch=null}},onPaste:function(t){var e;if(this.$emit("paste",t),this.multiple&&!this.searchIsDirty){var n=null===(e=t.clipboardData)||void 0===e?void 0:e.getData("text/vnd.vuetify.autocomplete.item+plain");n&&-1===this.findExistingIndex(n)&&(t.preventDefault(),f.a.options.methods.selectItem.call(this,n))}},clearableCallback:function(){this.editingIndex=-1,m.a.options.methods.clearableCallback.call(this)}}}),y=n(489),w=n(486),D=n(531),C=n(30),O=(n(119),{data:function(){return{usuario:{},confirmPassword:""}},methods:{login:function(){var t=this;return Object(C.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$auth.loginWith("local",{data:t.form});case 3:(n=e.sent)&&n.data&&n.data.token&&t.$router.push("/dashboard"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t.errorMessage="Credenciales incorrectas. Inténtalo de nuevo.";case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},gotoLogin:function(){this.$router.push("/")},registrarUsuario:function(){var t=this;return Object(C.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.usuario.usuario&&t.usuario.password&&t.confirmPassword&&t.usuario.apodo&&t.usuario.rol){e.next=3;break}return t.errorMessage="Todos los campos son obligatorios.",e.abrupt("return");case 3:if(t.usuario.password===t.confirmPassword){e.next=6;break}return t.errorMessage="Las contraseñas no coinciden.",e.abrupt("return");case 6:return console.log("Datos enviados al backend:",t.usuario),e.prev=7,e.next=10,t.$axios.post("/empleados/create",t.usuario);case 10:e.sent.data.success?t.$router.push("/"):t.errorMessage="Error al registrar el usuario.",e.next=18;break;case 14:e.prev=14,e.t0=e.catch(7),t.errorMessage="Ocurrió un error al registrar el usuario.",console.error(e.t0);case 18:case"end":return e.stop()}}),e,null,[[7,14]])})))()}}}),k=(n(591),n(67)),component=Object(k.a)(O,(function(){var t=this,e=t._self._c;return e(y.a,{staticClass:"login-container",attrs:{"fill-height":"",fluid:""}},[e(o.a,{staticClass:"mx-auto mt-10",attrs:{flat:"",elevation:"0",width:"1216",color:"#FFFFFF"}},[e(l.c,[e("p",{staticClass:"title",staticStyle:{width:"100%",color:"#000000","justify-content":"left"}},[t._v("\n        Registrate\n      ")])]),t._v(" "),e(l.b,{staticStyle:{color:"#000000","justify-content":"center"}},[e(w.a,{attrs:{justify:"center",align:"center"}},[e(c.a,{attrs:{cols:"12",md:"8",lg:"6"}},[e("form",{on:{submit:function(e){return e.preventDefault(),t.login.apply(null,arguments)}}},[e(D.a,{staticClass:"rounded-field black-text-field",staticStyle:{"border-radius":"20px","-webkit-text-fill-color":"#000000","background-color":"#F0F0F0",width:"868px",height:"40px","margin-top":"20px"},attrs:{label:"Usuario",outlined:"",dense:"",color:"blue"},model:{value:t.usuario.usuario,callback:function(e){t.$set(t.usuario,"usuario",e)},expression:"usuario.usuario"}}),t._v(" "),e(D.a,{staticClass:"rounded-field black-text-field",staticStyle:{"border-radius":"20px","-webkit-text-fill-color":"#000000","background-color":"#F0F0F0",width:"868px",height:"40px","margin-top":"20px"},attrs:{label:"Password",type:"password",outlined:"",dense:"",color:"blue"},model:{value:t.usuario.password,callback:function(e){t.$set(t.usuario,"password",e)},expression:"usuario.password"}}),t._v(" "),e(D.a,{staticClass:"rounded-field black-text-field",staticStyle:{"border-radius":"20px","-webkit-text-fill-color":"#000000","background-color":"#F0F0F0",width:"868px",height:"40px","margin-top":"20px"},attrs:{label:"Confirmar Password",type:"password",outlined:"",dense:"",color:"blue"},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}}),t._v(" "),e(D.a,{staticClass:"rounded-field black-text-field",staticStyle:{"border-radius":"20px","-webkit-text-fill-color":"#000000","background-color":"#F0F0F0",width:"868px",height:"40px","margin-top":"20px"},attrs:{label:"Apodo",type:"text",outlined:"",dense:"",color:"blue"},model:{value:t.usuario.apodo,callback:function(e){t.$set(t.usuario,"apodo",e)},expression:"usuario.apodo"}}),t._v(" "),e(S,{staticClass:"rounded-field black-text-field",staticStyle:{"border-radius":"20px","-webkit-text-fill-color":"#000000","background-color":"#F0F0F0",width:"868px",height:"40px","margin-top":"20px"},attrs:{items:["Admin","Compras"],label:"Rol",outlined:"",dense:"",color:"blue"},model:{value:t.usuario.rol,callback:function(e){t.$set(t.usuario,"rol",e)},expression:"usuario.rol"}})],1)])],1),t._v(" "),t.errorMessage?e(w.a,{staticClass:"error mt-3 text-center"},[t._v("\n        "+t._s(t.errorMessage)+"\n      ")]):t._e()],1),t._v(" "),e(l.a,{staticClass:"d-flex flex-column align-center"},[e(r.a,{staticClass:"mb-3",staticStyle:{"border-radius":"15px",width:"369px"},attrs:{color:"#1B262C",width:"100%"},on:{click:t.registrarUsuario}},[e("span",{staticStyle:{"text-transform":"none",color:"#FFFFFF"}},[t._v("\n          Registrate\n        ")])]),t._v(" "),e("p",{staticClass:"text-center mt-4"},[e("a",{staticStyle:{color:"#3C2F3D","text-decoration":"underline"},on:{click:t.gotoLogin}},[t._v("\n          ¿Tienes cuenta? Inicia sesión\n        ")])])],1)],1)],1)}),[],!1,null,"6fd633da",null);e.default=component.exports}}]);