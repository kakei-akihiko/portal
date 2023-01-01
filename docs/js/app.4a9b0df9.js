(function(){"use strict";var t={2925:function(t,e,a){a.d(e,{Z:function(){return o}});var i=a(7484),r=a.n(i),n=a(178),s=a.n(n);r().extend(s());class o{constructor(t){this.database=t.instance}async addTagsToArticle(t,e){const a=e.map((e=>({articleId:t,tagText:e})));await this.database.articleTags.bulkPut(a)}async deleteTagsFromArticle(t){await this.database.articleTags.bulkDelete(t)}export(t){const e=JSON.stringify({articles:t},null,2),a=new Blob([e],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(a),i.target="_blank",i.download="Articles.json",document.body.appendChild(i),i.click(),document.body.removeChild(i)}async getArticles({categoryId:t,articleId:e}){return await this.database.articles.filter((a=>(null==t||a.categoryId===t)&&(null==e||a.id===e))).toArray()}async getArticleTags(t){return await this.database.articleTags.filter((e=>t.includes(e.articleId))).toArray()}async getTagTexts(t){return await this.database.articleTags.filter((e=>e.articleId===t)).toArray()}async setArticle({id:t,categoryId:e,expanded:a,title:i,text:n}){const s=r().utc().format();return await this.database.articles.put({id:t,categoryId:e,expanded:a,title:i,text:n,updatedOn:s})}}},5183:function(t,e,a){a.d(e,{Z:function(){return r}});var i=a(9520);class r{constructor(){this.instance=new i.ZP("articlesDatabase"),this.instance.version(2).stores({articles:"++id, categoryId, title, text, createdOn, updatedOn",articleTags:"++id, articleId, tagText",categories:"++id, title",settings:"name"}),this.instance.version(1).stores({articles:"++id, categoryId, title, text, createdOn, updatedOn",articleTags:"++id, articleId, tagText",categories:"++id, title"})}delete(){i.ZP["delete"]("articlesDatabase")}}},9935:function(t,e,a){a.d(e,{Z:function(){return i}});class i{constructor(t){this.database=t.instance}async get(t){return await this.database.categories.get(t)}async getAll(){return this.database.categories.toArray()}async put({categoryId:t,title:e,icon:a,articlesViewMode:i,tagPosition:r,tagSelectionMode:n}){try{const s=await this.database.categories.put({id:t,title:e,icon:a,articlesViewMode:i,tagPosition:r,tagSelectionMode:n});return console.log("Inserted. categoryId:",s),s}catch(s){console.error(s.stack||s)}}}},6183:function(t,e,a){var i=a(144),r=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},n=[],s=a(1001),o={},l=(0,s.Z)(o,r,n,!1,null,null,null),c=l.exports,d=a(8345),u=function(){var t=this,e=t._self._c;return e("TheMainLayout",{attrs:{"main-panel-scroll":""}},[e("TheSidebar",{attrs:{slot:"sidebar"},slot:"sidebar"},[e("NavCategories",{staticClass:"mt-3"}),e("FormGroupTagButtons",{staticClass:"mt-3"})],1),e("div",{staticClass:"h-100",attrs:{slot:"panel-main"},slot:"panel-main"},[null!=t.selectedCategory?e("ArticleListPageMainPanel",{attrs:{category:t.selectedCategory}}):t._e()],1)],1)},g=[],p=a(629),m=function(){var t=this,e=t._self._c;return e("div",{staticClass:"h-100"},[e("div",{staticClass:"d-flex"},[e("h2",[t._v(t._s(t.category.title))]),e("div",{staticClass:"ml-auto"},[e("b-form-group",[e("ButtonCategorySettingPage",{attrs:{"category-id":t.category.id}}),e("ButtonArticleCreatePage",{attrs:{"category-id":t.category.id}})],1)],1)]),e("div",{staticClass:"command-bar d-flex justify-content-end"},[e("NavArticleViewMode",{attrs:{mode:t.mode},on:{change:t.navViewModeChange}})],1),e("div",{staticClass:"alerts pt-3"},[e("b-alert",{attrs:{show:t.alertCompactOnlyVisible,variant:"warning"}},[t._v(" 詳細モードで可能な記事がありません。コンパクトモードであれば表示できます。 ")]),e("b-alert",{attrs:{show:t.alertDetailOnlyVisible,variant:"warning"}},[t._v(" コンパクトモードで可能な記事がありません。詳細モードであれば表示できます。 ")]),e("b-alert",{attrs:{show:t.alertNoArticle,variant:"warning"}},[t._v(" 検索条件に合致する記事がありません。 ")])],1),t.modeDetailActive?e("div",{staticClass:"pt-3"},t._l(t.articles,(function(a){return e("ArticlePanel",{key:a.id,attrs:{article:a,tagPosition:t.category.tagPosition},on:{expand:function(e){return t.articleExpand(a,e)}}})})),1):t._e(),t.modeCompactActive?e("CampactLinksPanel",{staticClass:"pt-3",attrs:{table:t.table}}):t._e()],1)},f=[],h=function(){var t=this,e=t._self._c;return e("b-card",{attrs:{"body-class":"py-2"}},[e("div",{staticClass:"d-flex align-items-center"},[e("div",{staticClass:"mr-auto d-flex flex-column"},[e("div",{staticClass:"title"},[null==t.article.url?e("span",[t._v(t._s(t.article.title))]):e("a",{attrs:{href:t.article.url,target:"_blank"}},[t._v(t._s(t.article.title))])]),t.bottomTagsVisible?e("div",{staticClass:"tags"},[null!=t.article.tags?e("div",{staticClass:"tags pr-2 h-interval"},t._l(t.article.tags,(function(a){return e("b-badge",{key:a,attrs:{variant:"info"}},[t._v(" "+t._s(a)+" ")])})),1):t._e()]):t._e()]),e("div",{staticClass:"right-side"},[t.bottomTagsVisible||null==t.article.tags?t._e():e("div",{staticClass:"pr-2 d-inline-block h-interval"},t._l(t.article.tags,(function(a){return e("b-badge",{key:a,attrs:{variant:"info"}},[t._v(" "+t._s(a)+" ")])})),1),t.expanded&&t.expandButtonVisible?e("b-button",{staticClass:"p-0",attrs:{variant:"link"},on:{click:t.expandButtonClick}},[e("i",{staticClass:"fas fa-arrow-circle-down"})]):t._e(),!t.expanded&&t.expandButtonVisible?e("b-button",{staticClass:"p-0",attrs:{variant:"link"},on:{click:t.expandButtonClick}},[e("i",{staticClass:"fas fa-arrow-circle-up"})]):t._e(),e("b-button",{attrs:{variant:"link",to:{name:"ArticleEditPage",params:{id:t.article.id}}}},[e("i",{staticClass:"fas fa-edit"})])],1)]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.expanded,expression:"expanded"}],domProps:{innerHTML:t._s(t.bodyHtml)}})])},y=[],v=a(7441),b={name:"ArticlePanel",props:{article:{type:Object,required:!0},tagPosition:{default:"right",type:String}},computed:{bodyHtml(){return(0,v["default"])(this.article.text)},expandButtonVisible(){return null!=this.article.text&&this.article.text.length>0},expanded(){return!0===this.article.expanded},bottomTagsVisible(){return"bottom"===this.tagPosition}},methods:{expandButtonClick(){this.$emit("expand",!this.expanded)}}},C=b,x=(0,s.Z)(C,h,y,!1,null,null,null),w=x.exports,A=function(){var t=this,e=t._self._c;return e("b-button",{attrs:{variant:"link",to:{name:"ArticleCreatePage",params:{categoryId:t.categoryId}}}},[e("i",{staticClass:"fas fa-plus"})])},_=[],T={name:"ButtonArticleCreatePage",props:{categoryId:Number}},I=T,S=(0,s.Z)(I,A,_,!1,null,null,null),P=S.exports,k=function(){var t=this,e=t._self._c;return e("b-button",{attrs:{variant:"link",to:{name:"CategorySettingPage",params:{categoryId:t.categoryId}}}},[e("i",{staticClass:"fas fa-cog"})])},M=[],E={name:"ButtonCategorySettingPage",props:{categoryId:Number}},V=E,Z=(0,s.Z)(V,k,M,!1,null,null,null),O=Z.exports,B=function(){var t=this,e=t._self._c;return e("div",t._l(t.table,(function(a){return e("div",{key:a.text,staticClass:"h-interval"},[e("h3",[t._v(t._s(a.text))]),t._l(a.articles,(function(a){return e("a",{key:a.id,attrs:{href:a.url,target:"_blank"}},[t._v(" "+t._s(a.title)+" ")])}))],2)})),0)},N=[],R={name:"CampactLinksPanel",props:{table:Array}},L=R,$=(0,s.Z)(L,B,N,!1,null,null,null),D=$.exports,j=function(){var t=this,e=t._self._c;return e("b-nav",{attrs:{pills:"",small:""}},[e("b-nav-item",{attrs:{active:t.modeCompactActive},on:{click:t.modeCompactNavClick}},[t._v(" コンパクト ")]),e("b-nav-item",{attrs:{active:t.modeDetailActive},on:{click:t.modeDetailNavClick}},[t._v(" 詳細 ")])],1)},F=[],q={name:"NavArticleViewMode",props:{mode:String},computed:{modeCompactActive(){return"compact"===this.mode},modeDetailActive(){return"detail"===this.mode}},methods:{modeCompactNavClick(){this.$emit("change","compact")},modeDetailNavClick(){this.$emit("change","detail")}}},H=q,G=(0,s.Z)(H,j,F,!1,null,null,null),U=G.exports;a(7658);class z{create(t,e){const a=this.getArticles(t,e),i=this.getTags(a);return this.getTable(a,i)}getArticles(t,e){return t.filter((t=>null!=t.url)).filter((t=>this.isTargetArticle(t,e)))}isTargetArticle(t,e){return null==e||e.length<=0||null!=t.tags&&e.every((e=>t.tags.includes(e)))}getTags(t){const e=t.some((t=>null==t.tags||t.tags.length<=0)),a=e?[{text:"（タグなし）",value:null}]:[],i=t.map((t=>t.tags)).reduce(((t,e)=>(e.forEach((e=>{!1===t.includes(e)&&t.push(e)})),t)),[]).map((t=>({text:t,value:t})));return[...a,...i]}getTable(t,e){return e.map((e=>{const a=t.filter((t=>null==e.value?null==t.tags||t.tags.length<=0:null!=t.tags&&t.tags.includes(e.value)));return{...e,articles:a}}))}}const J=new z;var K={name:"ArticleListPageMainPanel",components:{ArticlePanel:w,ButtonArticleCreatePage:P,ButtonCategorySettingPage:O,CampactLinksPanel:D,NavArticleViewMode:U},props:{category:{type:Object,required:!0}},computed:{alertCompactOnlyVisible(){return this.modeDetailActive&&this.articles.length<=0&&this.table.length>0},alertDetailOnlyVisible(){return this.modeCompactActive&&this.articles.length>0&&this.table.length<=0},alertNoArticle(){return this.articles.length<=0&&this.table.length<=0},articles(){const{articles:t,selectedTagTexts:e}=this.$store.state;return t.filter((t=>J.isTargetArticle(t,e)))},mode(){return"detail"===this.category.articlesViewMode?"detail":"compact"},modeCompactActive(){return"compact"===this.mode},modeDetailActive(){return"detail"===this.mode},table(){const{articles:t,selectedTagTexts:e}=this.$store.state;return J.create(t,e)}},methods:{articleExpand(t,e){const{id:a}=t;this.$store.dispatch("setArticleExpanded",{id:a,expanded:e})},navViewModeChange(t){const e=this.category.id;this.$store.dispatch("setArticlesViewModeToCategory",{categoryId:e,articlesViewMode:t})}}},Q=K,W=(0,s.Z)(Q,m,f,!1,null,null,null),X=W.exports,Y=function(){var t=this,e=t._self._c;return e("b-nav",{staticClass:"nav-category",attrs:{vertical:""}},t._l(t.categories,(function(a){return e("b-nav-item",{key:a.id,attrs:{active:a.active},on:{click:function(e){return t.categorySelect(a)}}},[t._v(" "+t._s(a.title)+" ")])})),1)},tt=[],et={name:"NavCategories",computed:{categories(){return this.$store.state.categories.map((t=>{const{id:e,title:a}=t,i=e===this.$store.state.categoryId;return{active:i,id:e,title:a}}))}},methods:{async categorySelect(t){null!=t&&(this.$store.commit("setCategoryId",t.id),await this.$store.dispatch("loadArticles",t.id))}}},at=et,it=(0,s.Z)(at,Y,tt,!1,null,null,null),rt=it.exports,nt=function(){var t=this,e=t._self._c;return e("b-form-group",t._l(t.tagButtons,(function(a){return e("b-button",{key:a.text,attrs:{variant:a.variant,size:"sm"},on:{click:function(e){return t.tagButtonClick(a)}}},[t._v(" "+t._s(a.text)+" ")])})),1)},st=[],ot={name:"FormGroupTagButtons",computed:{tagButtons(){return this.allTags.map((t=>{const{selected:e,text:a}=t,i=e?"info":"outline-info";return{selected:e,text:a,variant:i}}))},...(0,p.Se)(["allTags"])},methods:{tagButtonClick(t){const{text:e,selected:a}=t;this.$store.commit("selectTagText",{text:e,selected:!a})}}},lt=ot,ct=(0,s.Z)(lt,nt,st,!1,null,null,null),dt=ct.exports,ut={name:"ArticlesListPage",components:{ArticleListPageMainPanel:X,FormGroupTagButtons:dt,NavCategories:rt},computed:{...(0,p.rn)(["categories","categoryId"]),selectedCategory(){return this.categories.filter((t=>t.id===this.categoryId))[0]}},async mounted(){this.$store.dispatch("loadCategories")}},gt=ut,pt=(0,s.Z)(gt,u,g,!1,null,null,null),mt=pt.exports;i["default"].use(d.ZP);const ft=[{path:"/",name:"ArticlesListPage",component:mt},{path:"/categories/:categoryId/articles/create",name:"ArticleCreatePage",component:()=>a.e(525).then(a.bind(a,2642))},{path:"/articles/:id/edit",name:"ArticleEditPage",component:()=>a.e(525).then(a.bind(a,9969))},{path:"/categories",name:"CategoryPage",component:()=>a.e(267).then(a.bind(a,5746))},{path:"/categories/:id/import",name:"CategoryImportPage",component:()=>a.e(267).then(a.bind(a,4965))},{path:"/categories/:categoryId/setting",name:"CategorySettingPage",component:()=>a.e(267).then(a.bind(a,5981))},{path:"/settings",name:"SettingPage",component:()=>a.e(571).then(a.bind(a,7821))}],ht=new d.ZP({routes:ft});var yt=ht;class vt{fromArticles(t){return t.map((t=>{const e=null==t.text?null:t.text.match("^https?://[^ \r\n\t]+"),a=null==e?null:e[0];return{expanded:!1,url:a,...t}}))}}var bt=a(2925),Ct=a(5183),xt=a(2593),wt=a(9935);class At{constructor(t){this.categoryRepository=t}async setSettings(t,{articlesViewMode:e,tagPosition:a,tagSelectionMode:i}){const r=await this.categoryRepository.get(t);if(null==r)throw console.error("Specified categoryId not found. categoryId:",t),new Error("Specified categoryId not found. categoryId: "+t);const n={...r,categoryId:t,articlesViewMode:e??r.articlesViewMode,tagPosition:a??r.tagPosition,tagSelectionMode:i??r.tagSelectionMode};try{await this.categoryRepository.put(n),console.log("保存しました(service):",n)}catch(s){console.error("カテゴリーを保存できませんでした。",s.stack||s)}}}var _t={namespaced:!0,state:()=>({article:null,articleId:null}),mutations:{setArticle(t,e){const a=null==e||null==e.text?null:(0,v["default"])(e.text);t.article={html:a,...e}},setArticleId(t,e){t.articleId=e}},actions:{async loadSetting({commit:t,rootGetters:e}){const{articleService:a,settingService:i}=e.getDependances(),{articleId:r}=await i.getSidebarSetting();if(null==r)return t("setArticleId",null),void t("setArticle",null);const n=await a.get({articleId:r}),s=n[0];t("setArticleId",r),t("setArticle",s)},async setArticleId({commit:t,rootGetters:e},a){const{settingService:i}=e.getDependances();await i.setSidebarArticleId(a),t("setArticleId",a)}}};const Tt=new vt,It=new Ct.Z,St=new bt.Z(It),Pt=new wt.Z(It),kt=new At(Pt),Mt=new xt.Z(St,Pt),Et={articlesDatabase:It,articleRepository:St,articleService:Mt,settingService:null};i["default"].use(p.ZP);var Vt=new p.ZP.Store({state:{articles:[],categoryId:null,categories:[],selectedTagTexts:[]},getters:{allTags(t){const e=t.articles.map((t=>t.tags??[])).reduce(((t,e)=>(e.filter((e=>!1===t.includes(e))).forEach((e=>t.push(e))),t)),[]);return e.map((e=>{const a=t.selectedTagTexts.includes(e);return{selected:a,text:e,value:e}}))},getDependances(){return()=>({...Et})}},mutations:{selectTagText(t,{text:e,selected:a}){const i=t.categories.filter((e=>e.id===t.categoryId)),r=i[0]?.tagSelectionMode??"single",n=t.selectedTagTexts.includes(e);"single"!==r?n?!1===a&&(t.selectedTagTexts=t.selectedTagTexts.filter((t=>t!==e))):a&&t.selectedTagTexts.push(e):t.selectedTagTexts=n?[]:[e]},setArticleExpand(t,{id:e,expanded:a}){t.articles.filter((t=>t.id===e)).forEach((t=>{t.expanded=a}))},setArticles(t,e){t.articles=e},setCategories(t,{autoSelect:e,categories:a}){t.categories=a,a.length>0&&null==t.categoryId&&(t.categoryId=a[0].id)},setCategoryId(t,e){t.categoryId=e,t.selectedTagTexts=[]},setCategorySettings(t,{categoryId:e,articlesViewMode:a,tagPosition:i,tagSelectionMode:r}){t.categories.filter((t=>t.id===e)).forEach((t=>{t.articlesViewMode=a??t.articlesViewMode,t.tagPosition=i??t.tagPosition,t.tagSelectionMode=r??t.tagSelectionMode}))}},actions:{async exportArticles(t,{categoryId:e}){const a=await Mt.get({categoryId:e});St.export(a)},async loadArticles(t,e){const a=await Mt.get({categoryId:e}),i=Tt.fromArticles(a);t.commit("setArticles",i),t.commit("setCategoryId",e)},async loadCategories({commit:t,dispatch:e,state:a}){const i=await Pt.getAll();t("setCategories",{autoSelect:!0,categories:i}),null!=a.categoryId&&await e("loadArticles",a.categoryId)},setArticleExpanded(t,{id:e,expanded:a}){t.commit("setArticleExpand",{id:e,expanded:a}),Mt.setExpanding(e,a)},async setArticlesViewModeToCategory(t,{categoryId:e,articlesViewMode:a}){console.log("store...",{categoryId:e,articlesViewMode:a}),t.commit("setCategorySettings",{categoryId:e,articlesViewMode:a}),await kt.setSettings(e,{articlesViewMode:a})},async setCategorySettings(t,{categoryId:e,tagPosition:a,tagSelectionMode:i}){t.commit("setCategorySettings",{categoryId:e,tagPosition:a,tagSelectionMode:i}),await kt.setSettings(e,{tagPosition:a,tagSelectionMode:i})}},modules:{sidebar:_t}}),Zt=a(2970),Ot=(a(7024),function(){var t=this,e=t._self._c;return e("b-alert",{attrs:{variant:"warning",show:""}},[t._v(" データがありません。 ")])}),Bt=[],Nt={name:"NotFoundAlert"},Rt=Nt,Lt=(0,s.Z)(Rt,Ot,Bt,!1,null,null,null),$t=Lt.exports,Dt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"d-flex flex-column h-100"},[t._t("header"),e("div",{staticClass:"flex-grow-1 h-0"},[e("div",{staticClass:"h-100"},[t._t("default")],2)]),t._t("footer")],2)},jt=[],Ft={},qt=Ft,Ht=(0,s.Z)(qt,Dt,jt,!1,null,"bc4d3014",null),Gt=Ht.exports,Ut=function(){var t=this,e=t._self._c;return e("b-container",{staticClass:"h-100 container-main",attrs:{fluid:""}},[e("b-row",{staticClass:"h-100"},[t.noSidebar?t._e():e("b-col",{staticClass:"h-100-sm sidebar pr-0",attrs:{cols:"12",sm:"4",md:"3"}},[e("div",{staticClass:"h-100 pr-3"},[t._t("sidebar")],2)]),e("b-col",{class:t.mainPanelClass,attrs:{cols:"12",sm:t.mainPanelSmCols,md:t.mainPanelMdCols}},[t._t("panel-main")],2)],1)],1)},zt=[],Jt={props:{noSidebar:Boolean,mainPanelScroll:Boolean},computed:{mainPanelClass(){return{"h-100-sm":!0,"panel-main":!0,"overflow-auto":this.mainPanelScroll}},mainPanelSmCols(){return this.noSidebar?12:8},mainPanelMdCols(){return this.noSidebar?12:9}}},Kt=Jt,Qt=(0,s.Z)(Kt,Ut,zt,!1,null,null,null),Wt=Qt.exports,Xt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"d-flex flex-column h-100"},[t._m(0),t._t("default"),e("div",{staticClass:"mt-auto"}),null!=t.sidebarArticle?e("div",[e("div",{domProps:{innerHTML:t._s(t.sidebarArticle.html)}})]):t._e(),"ArticlesListPage"!=t.$route.name?e("b-form-group",[e("b-button",{attrs:{variant:"link",to:{name:"ArticlesListPage"}}},[e("i",{staticClass:"far fa-newspaper"}),e("span",{staticClass:"ml-2"},[t._v("記事")])])],1):t._e(),"CategoryPage"!=t.$route.name?e("b-form-group",[e("b-button",{attrs:{variant:"link",to:{name:"CategoryPage"}}},[e("i",{staticClass:"far fa-folder-open"}),e("span",{staticClass:"ml-2"},[t._v("カテゴリー")])])],1):t._e(),"SettingPage"!=t.$route.name?e("b-form-group",[e("b-button",{attrs:{variant:"link",to:{name:"SettingPage"}}},[e("i",{staticClass:"fas fa-cog"}),e("span",{staticClass:"ml-2"},[t._v("設定")])])],1):t._e()],2)},Yt=[function(){var t=this,e=t._self._c;return e("h1",{staticClass:"h2"},[e("span",[t._v("🏠")]),e("span",{staticClass:"site-title-animals"},[t._v("🐕🦘🐬🐓🕊🦢")])])}],te={name:"TheSidebar",computed:{sidebarArticle(){return this.$store.state.sidebar.article}},async mounted(){null==this.$store.state.sidebar.articleId&&await this.$store.dispatch("sidebar/loadSetting")}},ee=te,ae=(0,s.Z)(ee,Xt,Yt,!1,null,"2bd5a978",null),ie=ae.exports;class re{constructor(t){this.database=t.instance}async get(t){return await this.database.settings.get(t)}async put(t){try{return await this.database.settings.put(t)}catch(e){console.error(e.stack??e)}}}class ne{constructor(t){this.settingRepository=t}async getSidebarSetting(){const{articleId:t}=await this.settingRepository.get("sidebar")??{};return{name:"sidebar",articleId:t}}async setSidebarArticleId(t){const e=await this.getSidebarSetting();e.articleId=t,console.log("service sidebar:",e),await this.settingRepository.put(e)}}i["default"].component("NotFoundAlert",$t),i["default"].component("FullHeight",Gt),i["default"].component("TheMainLayout",Wt),i["default"].component("TheSidebar",ie),i["default"].config.productionTip=!1,i["default"].use(Zt.ZPm);const se=new re(Et.articlesDatabase),oe=new ne(se);Et.settingService=oe,new i["default"]({router:yt,store:Vt,render:t=>t(c)}).$mount("#app")},2593:function(t,e,a){a.d(e,{Z:function(){return i}});class i{constructor(t,e){this.articleRepository=t,this.categoryRepository=e}async get({categoryId:t,articleId:e}){try{const a=await this.articleRepository.getArticles({categoryId:t,articleId:e}),i=a.map((t=>t.id)),r=await this.articleRepository.getArticleTags(i);return a.map((t=>this.getResult(t,r)))}catch(a){console.error("記事読み込めませんでした。",a)}}async set({id:t,categoryId:e,expanded:a,title:i,text:r,tags:n}){const s=await this.categoryRepository.get(e);if(null==s)throw console.error("Specified categoryId not found. categoryId:",e),new Error("Specified categoryId not found. categoryId: "+e);try{const s=await this.articleRepository.setArticle({id:t,categoryId:e,expanded:a,title:i,text:r});console.log("Inserted. articleId:",s);const o=await this.articleRepository.getArticleTags([s]);if(!this.areEqualTagsToArticleTags(n,o)){const t=o.map((t=>t.id));await this.articleRepository.deleteTagsFromArticle(t),await this.articleRepository.addTagsToArticle(s,n)}return s}catch(o){console.error("記事を保存できませんでした。",o.stack||o)}}async setExpanding(t,e){try{const a=await this.articleRepository.getArticles({articleId:t});if(a.length<=0)throw new Error("Specified articleId not found. articleId: "+t);a[0].expanded=e,this.articleRepository.setArticle(a[0])}catch(a){console.error("記事を保存できませんでした。",a.stack||a)}}getResult(t,e){const a=e.filter((e=>e.articleId===t.id)).map((t=>t.tagText)),i=Array.from(new Set(a).values());return{...t,tags:i}}areEqualTagsToArticleTags(t,e){if(t.length!==e.length)return!1;for(let a=0;a<t.length;a++)if(t[a]!==e[a].tagText)return!1;return!0}}}},e={};function a(i){var r=e[i];if(void 0!==r)return r.exports;var n=e[i]={exports:{}};return t[i].call(n.exports,n,n.exports,a),n.exports}a.m=t,function(){var t=[];a.O=function(e,i,r,n){if(!i){var s=1/0;for(d=0;d<t.length;d++){i=t[d][0],r=t[d][1],n=t[d][2];for(var o=!0,l=0;l<i.length;l++)(!1&n||s>=n)&&Object.keys(a.O).every((function(t){return a.O[t](i[l])}))?i.splice(l--,1):(o=!1,n<s&&(s=n));if(o){t.splice(d--,1);var c=r();void 0!==c&&(e=c)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[i,r,n]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var i in e)a.o(e,i)&&!a.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){a.f={},a.e=function(t){return Promise.all(Object.keys(a.f).reduce((function(e,i){return a.f[i](t,e),e}),[]))}}(),function(){a.u=function(t){return"js/"+{267:"categories",525:"articles",571:"settings"}[t]+"."+{267:"31031b9c",525:"f3f0755c",571:"c02aad44"}[t]+".js"}}(),function(){a.miniCssF=function(t){return"css/articles.4cc96ceb.css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="portal:";a.l=function(i,r,n,s){if(t[i])t[i].push(r);else{var o,l;if(void 0!==n)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==i||u.getAttribute("data-webpack")==e+n){o=u;break}}o||(l=!0,o=document.createElement("script"),o.charset="utf-8",o.timeout=120,a.nc&&o.setAttribute("nonce",a.nc),o.setAttribute("data-webpack",e+n),o.src=i),t[i]=[r];var g=function(e,a){o.onerror=o.onload=null,clearTimeout(p);var r=t[i];if(delete t[i],o.parentNode&&o.parentNode.removeChild(o),r&&r.forEach((function(t){return t(a)})),e)return e(a)},p=setTimeout(g.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=g.bind(null,o.onerror),o.onload=g.bind(null,o.onload),l&&document.head.appendChild(o)}}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){a.p=""}(),function(){if("undefined"!==typeof document){var t=function(t,e,a,i,r){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css";var s=function(a){if(n.onerror=n.onload=null,"load"===a.type)i();else{var s=a&&("load"===a.type?"missing":a.type),o=a&&a.target&&a.target.href||e,l=new Error("Loading CSS chunk "+t+" failed.\n("+o+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=o,n.parentNode.removeChild(n),r(l)}};return n.onerror=n.onload=s,n.href=e,a?a.parentNode.insertBefore(n,a.nextSibling):document.head.appendChild(n),n},e=function(t,e){for(var a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var r=a[i],n=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(n===t||n===e))return r}var s=document.getElementsByTagName("style");for(i=0;i<s.length;i++){r=s[i],n=r.getAttribute("data-href");if(n===t||n===e)return r}},i=function(i){return new Promise((function(r,n){var s=a.miniCssF(i),o=a.p+s;if(e(s,o))return r();t(i,o,null,r,n)}))},r={143:0};a.f.miniCss=function(t,e){var a={525:1};r[t]?e.push(r[t]):0!==r[t]&&a[t]&&e.push(r[t]=i(t).then((function(){r[t]=0}),(function(e){throw delete r[t],e})))}}}(),function(){var t={143:0};a.f.j=function(e,i){var r=a.o(t,e)?t[e]:void 0;if(0!==r)if(r)i.push(r[2]);else{var n=new Promise((function(a,i){r=t[e]=[a,i]}));i.push(r[2]=n);var s=a.p+a.u(e),o=new Error,l=function(i){if(a.o(t,e)&&(r=t[e],0!==r&&(t[e]=void 0),r)){var n=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.src;o.message="Loading chunk "+e+" failed.\n("+n+": "+s+")",o.name="ChunkLoadError",o.type=n,o.request=s,r[1](o)}};a.l(s,l,"chunk-"+e,e)}},a.O.j=function(e){return 0===t[e]};var e=function(e,i){var r,n,s=i[0],o=i[1],l=i[2],c=0;if(s.some((function(e){return 0!==t[e]}))){for(r in o)a.o(o,r)&&(a.m[r]=o[r]);if(l)var d=l(a)}for(e&&e(i);c<s.length;c++)n=s[c],a.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return a.O(d)},i=self["webpackChunkportal"]=self["webpackChunkportal"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=a.O(void 0,[998],(function(){return a(6183)}));i=a.O(i)})();
//# sourceMappingURL=app.4a9b0df9.js.map