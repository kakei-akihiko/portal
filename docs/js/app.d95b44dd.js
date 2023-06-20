(function(){"use strict";var e={2974:function(e,t,a){a.d(t,{Z:function(){return o}});var n=a(9199),r=a.n(n),i=a(9821),l=a.n(i);r().extend(l());class o{constructor(e){this.database=e.instance}async addTagsToArticle(e,t){const a=t.map((t=>({articleId:e,tagText:t})));await this.database.articleTags.bulkPut(a)}async deleteTagsFromArticle(e){await this.database.articleTags.bulkDelete(e)}export(e){const t=JSON.stringify({articles:e},null,2),a=new Blob([t],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(a),n.target="_blank",n.download="Articles.json",document.body.appendChild(n),n.click(),document.body.removeChild(n)}async getArticles({categoryId:e,articleId:t}){return await this.database.articles.filter((a=>(null==e||a.categoryId===e)&&(null==t||a.id===t))).toArray()}async getArticleTags(e){return await this.database.articleTags.filter((t=>e.includes(t.articleId))).toArray()}async getTagTexts(e){return await this.database.articleTags.filter((t=>t.articleId===e)).toArray()}async setArticle({id:e,categoryId:t,expanded:a,title:n,text:i}){const l=r().utc().format();return await this.database.articles.put({id:e,categoryId:t,expanded:a,title:n,text:i,updatedOn:l})}}},4334:function(e,t,a){a.d(t,{Z:function(){return r}});var n=a(2031);class r{constructor(){this.instance=new n.ZP("articlesDatabase"),this.instance.version(2).stores({articles:"++id, categoryId, title, text, createdOn, updatedOn",articleTags:"++id, articleId, tagText",categories:"++id, title",settings:"name"}),this.instance.version(1).stores({articles:"++id, categoryId, title, text, createdOn, updatedOn",articleTags:"++id, articleId, tagText",categories:"++id, title"})}delete(){n.ZP["delete"]("articlesDatabase")}}},9568:function(e,t,a){a.d(t,{Z:function(){return n}});class n{constructor(e){this.database=e.instance}async get(e){return await this.database.categories.get(e)}async getAll(){return this.database.categories.toArray()}async put({categoryId:e,title:t,icon:a,articlesViewMode:n,tagPosition:r,tagSelectionMode:i}){try{const l=await this.database.categories.put({id:e,title:t,icon:a,articlesViewMode:n,tagPosition:r,tagSelectionMode:i});return console.log("Inserted. categoryId:",l),l}catch(l){console.error(l.stack||l)}}}},1736:function(e,t,a){a.d(t,{T:function(){return n.TU}});var n=a(1926);const r=new n.TU.Renderer,i=r.link;r.link=(e,t,a)=>{const n=e.startsWith(`${location.protocol}//${location.hostname}`),l=i.call(r,e,t,a);return n?l:l.replace(/^<a /,'<a target="_blank" rel="noreferrer noopener nofollow" ')},n.TU.setOptions({renderer:r})},6041:function(e,t,a){var n=a(690);const r={id:"app"};function i(e,t){const a=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)("div",r,[(0,n.Wm)(a)])}var l=a(673);const o={},s=(0,l.Z)(o,[["render",i]]);var c=s,u=a(9330),d=a(1791);const g={class:"d-flex flex-column h-100"},p={class:"flex-grow-1 h-0"},f={class:"h-100"};function v(e,t){return(0,n.wg)(),(0,n.iD)("div",g,[(0,n.WI)(e.$slots,"header",{},void 0,!0),(0,n._)("div",p,[(0,n._)("div",f,[(0,n.WI)(e.$slots,"default",{},void 0,!0)])]),(0,n.WI)(e.$slots,"footer",{},void 0,!0)])}const y={},m=(0,l.Z)(y,[["render",v],["__scopeId","data-v-184826a2"]]);var h=m;const w={class:"container-fluid h-100 container-main"},b={class:"row h-100"},k={key:0,class:"col-sm-4 col-md-3 col-12 h-100-sm sidebar pr-0"},_={class:"h-100 pr-3"};var S={__name:"TheMainLayout",props:{noSidebar:Boolean,mainPanelScroll:Boolean},setup(e){const t=e,a=(0,n.Fl)((()=>({"col-sm-8":!t.noSidebar,"col-sm-12":t.noSidebar,"col-md-9":!t.noSidebar,"col-md-12":t.noSidebar,"h-100-sm":!0,"panel-main":!0,"overflow-auto":t.mainPanelScroll})));return(t,r)=>((0,n.wg)(),(0,n.iD)("div",w,[(0,n._)("div",b,[e.noSidebar?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("div",k,[(0,n._)("div",_,[(0,n.WI)(t.$slots,"sidebar")])])),(0,n._)("div",{cols:"12",class:(0,n.C_)((0,n.SU)(a))},[(0,n.WI)(t.$slots,"panel-main")],2)])]))}};const x=S;var I=x,P=(a(825),a(7540));const A=e=>((0,n.dD)("data-v-047826a2"),e=e(),(0,n.Cn)(),e),T={class:"d-flex flex-column h-100"},D=A((()=>(0,n._)("h1",{class:"h2"},[(0,n._)("span",null,"🏠"),(0,n._)("span",{class:"site-title-animals"},"🐕🦘🐬🐓🕊🦢")],-1))),C=A((()=>(0,n._)("div",{class:"mt-auto"},null,-1))),M={key:0},F=["innerHTML"],U={key:1,class:"form-group"},E=A((()=>(0,n._)("i",{class:"far fa-newspaper"},null,-1))),j=A((()=>(0,n._)("span",{class:"ml-2"},"記事",-1))),Z=[E,j],O={key:2,class:"form-group"},R=A((()=>(0,n._)("i",{class:"far fa-folder-open"},null,-1))),q=A((()=>(0,n._)("span",{class:"ml-2"},"カテゴリー",-1))),L=[R,q],B={key:3,class:"form-group"},H=A((()=>(0,n._)("i",{class:"fas fa-cog"},null,-1))),N=A((()=>(0,n._)("span",{class:"ml-2"},"設定",-1))),V=[H,N];var W={__name:"TheSidebar",setup(e){(0,n.bv)((async()=>{null==P.DF.value&&await(0,P.Y1)()}));const t=()=>{u.Z.push({name:"ArticlesListPage"})},a=()=>{u.Z.push({name:"CategoryPage"})},r=()=>{u.Z.push({name:"SettingPage"})};return(e,i)=>((0,n.wg)(),(0,n.iD)("div",T,[D,(0,n.WI)(e.$slots,"default"),C,null!=(0,n.SU)(P.DF)?((0,n.wg)(),(0,n.iD)("div",M,[(0,n._)("div",{innerHTML:(0,n.SU)(P.DF).html},null,8,F)])):(0,n.kq)("",!0),"ArticlesListPage"!=e.$route.name?((0,n.wg)(),(0,n.iD)("fieldset",U,[(0,n._)("button",{class:"btn btn-link",onClick:t},Z)])):(0,n.kq)("",!0),"CategoryPage"!=e.$route.name?((0,n.wg)(),(0,n.iD)("fieldset",O,[(0,n._)("button",{class:"btn btn-link",onClick:a},L)])):(0,n.kq)("",!0),"SettingPage"!=e.$route.name?((0,n.wg)(),(0,n.iD)("fieldset",B,[(0,n._)("button",{class:"btn btn-link",onClick:r},V)])):(0,n.kq)("",!0)]))}};const z=(0,l.Z)(W,[["__scopeId","data-v-047826a2"]]);var $=z;n.ZP.component("NotFoundAlert",d.Z),n.ZP.component("FullHeight",h),n.ZP.component("TheMainLayout",I),n.ZP.component("TheSidebar",$),n.ZP.config.productionTip=!1,n.ZP.createApp({render:e=>e(c)}).use(u.Z).mount("#app")},9330:function(e,t,a){a.d(t,{Z:function(){return De}});var n=a(9977),r=a(690),i=a(3556),l=(a(825),a(1736));const o={key:0,class:"fas fa-arrow-circle-down"},s={key:1,class:"fas fa-arrow-circle-up"};var c={__name:"ButtonExpand",props:{expanded:Boolean},emits:["click"],setup(e,{emit:t}){const a=e,n=()=>{t("click")};return(e,t)=>((0,r.wg)(),(0,r.iD)("button",{class:"btn btn-link p-0",onClick:n},[a.expanded?((0,r.wg)(),(0,r.iD)("i",o)):((0,r.wg)(),(0,r.iD)("i",s))]))}};const u=c;var d=u;const g={class:"card","body-class":"py-2"},p={class:"card-body py-2"},f={class:"d-flex align-items-center"},v={class:"mr-auto d-flex flex-column"},y={class:"title"},m={key:0},h=["href"],w={key:0,class:"tags"},b={key:0,class:"tags pr-2 h-interval"},k={class:"right-side"},_={key:0,class:"pr-2 d-inline-block h-interval"},S=(0,r._)("i",{class:"far fa-newspaper"},null,-1),x=[S],I=(0,r._)("i",{class:"fas fa-edit"},null,-1),P=[I],A=["innerHTML"];var T={__name:"ArticlePanel",props:{article:{type:Object,required:!0},tagPosition:{default:"right",type:String}},emits:["expand"],setup(e,{emit:t}){const a=e,n=(0,r.Fl)((()=>l.T.parse(a.article.text))),i=(0,r.Fl)((()=>null!=a.article.text&&a.article.text.length>0)),o=(0,r.Fl)((()=>!0===a.article.expanded)),s=(0,r.Fl)((()=>"bottom"===a.tagPosition)),c=()=>{De.push({name:"ArticleEditPage",params:{id:a.article.id}})},u=()=>{De.push({name:"ArticleReadPage",params:{id:a.article.id}})},S=()=>{t("expand",!o.value)};return(t,a)=>((0,r.wg)(),(0,r.iD)("div",g,[(0,r._)("div",p,[(0,r._)("div",f,[(0,r._)("div",v,[(0,r._)("div",y,[null==e.article.url?((0,r.wg)(),(0,r.iD)("span",m,(0,r.zw)(e.article.title),1)):((0,r.wg)(),(0,r.iD)("a",{key:1,href:e.article.url,target:"_blank"},(0,r.zw)(e.article.title),9,h))]),(0,r.SU)(s)?((0,r.wg)(),(0,r.iD)("div",w,[null!=e.article.tags?((0,r.wg)(),(0,r.iD)("div",b,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.article.tags,(e=>((0,r.wg)(),(0,r.iD)("span",{key:e,class:"badge badge-info"},(0,r.zw)(e),1)))),128))])):(0,r.kq)("",!0)])):(0,r.kq)("",!0)]),(0,r._)("div",k,[(0,r.SU)(s)||null==e.article.tags?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",_,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.article.tags,(e=>((0,r.wg)(),(0,r.iD)("span",{key:e,class:"badge badge-info"},(0,r.zw)(e),1)))),128))])),(0,r.SU)(i)?((0,r.wg)(),(0,r.j4)(d,{key:1,expanded:(0,r.SU)(o),onClick:S},null,8,["expanded"])):(0,r.kq)("",!0),(0,r._)("button",{class:"btn btn-link",onClick:u},x),(0,r._)("button",{class:"btn btn-link",onClick:c},P)])]),(0,r.wy)((0,r._)("div",{innerHTML:(0,r.SU)(n),class:"article-body-view"},null,8,A),[[r.F8,(0,r.SU)(o)]])])]))}};const D=T;var C=D;const M=(0,r._)("i",{class:"fas fa-plus"},null,-1),F=[M];var U={__name:"ButtonArticleCreatePage",props:{categoryId:Number},setup(e){const t=e,a=()=>{const{categoryId:e}=t;De.push({name:"ArticleCreatePage",params:{categoryId:e}})};return(e,t)=>((0,r.wg)(),(0,r.iD)("button",{class:"btn btn-link",onClick:a},F))}};const E=U;var j=E;const Z=(0,r._)("i",{class:"fas fa-cog"},null,-1),O=[Z];var R={__name:"ButtonCategorySettingPage",props:{categoryId:Number},setup(e){const t=e,a=()=>{const{categoryId:e}=t;De.push({name:"CategorySettingPage",params:{categoryId:e}})};return(e,t)=>((0,r.wg)(),(0,r.iD)("button",{class:"btn btn-link",onClick:a},O))}};const q=R;var L=q;const B=["href"];var H={__name:"CampactLinksPanel",props:{table:Array},setup(e){const t=e;return(e,a)=>((0,r.wg)(),(0,r.iD)("div",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.table,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.text,class:"h-interval"},[(0,r._)("h3",null,(0,r.zw)(e.text),1),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.articles,(e=>((0,r.wg)(),(0,r.iD)("a",{key:e.id,href:e.url,target:"_blank"},(0,r.zw)(e.title),9,B)))),128))])))),128))]))}};const N=H;var V=N;const W={class:"nav nav-pills small"},z={class:"nav-item"},$={class:"nav-item"};var Y={__name:"NavArticleViewMode",props:{mode:String},emits:["change"],setup(e,{emit:t}){const a=e,n=(0,r.Fl)((()=>({active:"compact"===a.mode,"nav-link":!0}))),i=(0,r.Fl)((()=>({active:"detail"===a.mode,"nav-link":!0}))),l=()=>{t("change","compact")},o=()=>{t("change","detail")};return(e,t)=>((0,r.wg)(),(0,r.iD)("ul",W,[(0,r._)("li",z,[(0,r._)("a",{class:(0,r.C_)((0,r.SU)(n)),href:"#",target:"_self",onClick:l}," コンパクト ",2)]),(0,r._)("li",$,[(0,r._)("a",{class:(0,r.C_)((0,r.SU)(i)),href:"#",target:"_self",onClick:o}," 詳細 ",2)])]))}};const K=Y;var X=K;class Q{create(e,t){const a=this.getArticles(e,t),n=this.getTags(a);return this.getTable(a,n)}getArticles(e,t){return e.filter((e=>null!=e.url)).filter((e=>this.isTargetArticle(e,t)))}isTargetArticle(e,t){return null==t||t.length<=0||null!=e.tags&&t.every((t=>e.tags.includes(t)))}getTags(e){const t=e.some((e=>null==e.tags||e.tags.length<=0)),a=t?[{text:"（タグなし）",value:null}]:[],n=e.map((e=>e.tags)).reduce(((e,t)=>(t.forEach((t=>{!1===e.includes(t)&&e.push(t)})),e)),[]).map((e=>({text:e,value:e})));return[...a,...n]}getTable(e,t){return t.map((t=>{const a=e.filter((e=>null==t.value?null==e.tags||e.tags.length<=0:null!=e.tags&&e.tags.includes(t.value)));return{...t,articles:a}}))}}const G={class:"h-100"},J={class:"d-flex"},ee={class:"ml-auto"},te={class:"form-group"},ae={class:"command-bar d-flex justify-content-end"},ne={class:"alerts pt-3"},re={key:0,class:"alert alert-warning"},ie={key:1,class:"alert alert-warning"},le={key:2,class:"alert alert-warning"},oe={key:0,class:"pt-3"};var se={__name:"ArticleListPageMainPanel",props:{category:{type:Object,required:!0}},setup(e){const t=e,a=new Q,n=(0,r.Fl)((()=>"detail"===t.category.articlesViewMode?"detail":"compact")),l=(0,r.Fl)((()=>"compact"===n.value)),o=(0,r.Fl)((()=>"detail"===n.value)),s=(0,r.Fl)((()=>i.BX.value.filter((e=>a.isTargetArticle(e,i.o1.value))))),c=(0,r.Fl)((()=>{const e=i.BX.value;return a.create(e,i.o1.value)})),u=(0,r.Fl)((()=>o.value&&s.value.length<=0&&c.value.length>0)),d=(0,r.Fl)((()=>l.value&&s.value.length>0&&c.value.length<=0)),g=(0,r.Fl)((()=>s.value.length<=0&&c.value.length<=0)),p=(e,t)=>{const{id:a}=e;(0,i.z0)({id:a,expanded:t})},f=e=>{const a=t.category.id;(0,i.jB)({categoryId:a,articlesViewMode:e})};return(t,a)=>((0,r.wg)(),(0,r.iD)("div",G,[(0,r._)("div",J,[(0,r._)("h2",null,(0,r.zw)(e.category.title),1),(0,r._)("div",ee,[(0,r._)("fieldset",te,[(0,r.Wm)(L,{"category-id":e.category.id},null,8,["category-id"]),(0,r.Wm)(j,{"category-id":e.category.id},null,8,["category-id"])])])]),(0,r._)("div",ae,[(0,r.Wm)(X,{mode:(0,r.SU)(n),onChange:f},null,8,["mode"])]),(0,r._)("div",ne,[(0,r.SU)(u)?((0,r.wg)(),(0,r.iD)("div",re," 詳細モードで可能な記事がありません。コンパクトモードであれば表示できます。 ")):(0,r.kq)("",!0),(0,r.SU)(d)?((0,r.wg)(),(0,r.iD)("div",ie," コンパクトモードで可能な記事がありません。詳細モードであれば表示できます。 ")):(0,r.kq)("",!0),(0,r.SU)(g)?((0,r.wg)(),(0,r.iD)("div",le," 検索条件に合致する記事がありません。 ")):(0,r.kq)("",!0)]),(0,r.SU)(o)?((0,r.wg)(),(0,r.iD)("div",oe,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)((0,r.SU)(s),(t=>((0,r.wg)(),(0,r.j4)(C,{key:t.id,article:t,tagPosition:e.category.tagPosition,onExpand:e=>p(t,e)},null,8,["article","tagPosition","onExpand"])))),128))])):(0,r.kq)("",!0),(0,r.SU)(l)?((0,r.wg)(),(0,r.j4)(V,{key:1,table:(0,r.SU)(c),class:"pt-3"},null,8,["table"])):(0,r.kq)("",!0)]))}};const ce=se;var ue=ce;const de={class:"nav flex-column nav-category mt-3"},ge=["onClick"];var pe={__name:"NavCategories",setup(e){const t=(0,r.Fl)((()=>i.ns.value.map((e=>{const{id:t,title:a}=e,n=t===i.PE.value,r={active:n,"nav-link":!0};return{anchorClass:r,id:t,title:a}})))),a=async e=>{null!=e&&((0,i.uA)(e.id),await(0,i.nw)(e.id))};return(e,n)=>((0,r.wg)(),(0,r.iD)("ul",de,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)((0,r.SU)(t),(e=>((0,r.wg)(),(0,r.iD)("li",{class:"nav-item",key:e.id,onClick:t=>a(e)},[(0,r._)("a",{class:(0,r.C_)(e.anchorClass),href:"#",target:"_self"},(0,r.zw)(e.title),3)],8,ge)))),128))]))}};const fe=pe;var ve=fe,ye=a(7540);const me={class:"form-group"},he=["onClick"];var we={__name:"FormGroupTagButtons",setup(e){const t=(0,r.Fl)((()=>ye.c3.value.map((e=>{const{selected:t,text:a}=e,n=t?"btn btn-sm btn-info":"btn btn-sm btn-outline-info";return{selected:t,text:a,className:n}})))),a=e=>{const{text:t,selected:a}=e;(0,i.aV)({text:t,selected:!a})};return(e,n)=>((0,r.wg)(),(0,r.iD)("fieldset",me,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)((0,r.SU)(t),(e=>((0,r.wg)(),(0,r.iD)("button",{key:e.text,class:(0,r.C_)(e.className),onClick:t=>a(e)},(0,r.zw)(e.text),11,he)))),128))]))}};const be=we;var ke=be;const _e={class:"h-100"},Se={key:0,class:"alert alert-warning"};var xe={__name:"ArticlesListPage",setup(e){const t=(0,r.Fl)((()=>i.ns.value.filter((e=>e.id===i.PE.value))[0])),a=(0,r.Fl)((()=>null==i.ns.value||i.ns.value.length<=0?{visible:!0,message:"カテゴリーがありません。サイドバー下部の「カテゴリー」をクリックして作成しましょう。"}:null==i.PE.value?{visible:!0,message:"カテゴリーを選択してください。"}:{visible:!1}));return(0,r.bv)((()=>{(0,i.Uy)()})),(e,n)=>{const i=(0,r.up)("TheSidebar"),l=(0,r.up)("TheMainLayout");return(0,r.wg)(),(0,r.j4)(l,{"main-panel-scroll":""},{sidebar:(0,r.w5)((()=>[(0,r.Wm)(i,null,{default:(0,r.w5)((()=>[(0,r.Wm)(ve,{class:"mt-3"}),(0,r.Wm)(ke,{class:"mt-3"})]),void 0,!0),_:1})])),"panel-main":(0,r.w5)((()=>[(0,r._)("div",_e,[(0,r.SU)(a).visible?((0,r.wg)(),(0,r.iD)("div",Se,(0,r.zw)((0,r.SU)(a).message),1)):(0,r.kq)("",!0),null!=(0,r.SU)(t)?((0,r.wg)(),(0,r.j4)(ue,{key:1,category:(0,r.SU)(t)},null,8,["category"])):(0,r.kq)("",!0)])])),_:1})}}};const Ie=xe;var Pe=Ie;const Ae=[{path:"/",name:"ArticlesListPage",component:Pe},{path:"/categories/:categoryId/articles/create",name:"ArticleCreatePage",component:()=>a.e(525).then(a.bind(a,7016))},{path:"/articles/:id/edit",name:"ArticleEditPage",component:()=>a.e(525).then(a.bind(a,1856))},{path:"/articles/:id/read",name:"ArticleReadPage",component:()=>a.e(525).then(a.bind(a,9378))},{path:"/categories",name:"CategoryPage",component:()=>a.e(267).then(a.bind(a,1691))},{path:"/categories/:id/import",name:"CategoryImportPage",component:()=>a.e(267).then(a.bind(a,9730))},{path:"/categories/:categoryId/setting",name:"CategorySettingPage",component:()=>a.e(267).then(a.bind(a,39))},{path:"/settings",name:"SettingPage",component:()=>a.e(571).then(a.bind(a,2879))}],Te=(0,n.p7)({history:(0,n.r5)(),routes:Ae});var De=Te},3556:function(e,t,a){a.d(t,{jA:function(){return y},_b:function(){return m},BX:function(){return b},ns:function(){return S},PE:function(){return k},nw:function(){return T},Uy:function(){return D},aV:function(){return U},o1:function(){return _},z0:function(){return C},jB:function(){return M},uA:function(){return x},ag:function(){return F},Q2:function(){return w}});a(825);var n=a(690);class r{fromArticles(e){return e.map((e=>{const t=null==e.text?null:e.text.match("^https?://[^ \r\n\t]+"),a=null==t?null:t[0];return{expanded:!1,url:a,...e}}))}}var i=a(2974),l=a(4334),o=a(9401),s=a(9568);class c{constructor(e){this.categoryRepository=e}async setSettings(e,{articlesViewMode:t,tagPosition:a,tagSelectionMode:n}){const r=await this.categoryRepository.get(e);if(null==r)throw console.error("Specified categoryId not found. categoryId:",e),new Error("Specified categoryId not found. categoryId: "+e);const i={...r,categoryId:e,articlesViewMode:t??r.articlesViewMode,tagPosition:a??r.tagPosition,tagSelectionMode:n??r.tagSelectionMode};try{await this.categoryRepository.put(i),console.log("保存しました(service):",i)}catch(l){console.error("カテゴリーを保存できませんでした。",l.stack||l)}}}class u{constructor(e){this.database=e.instance}async get(e){return await this.database.settings.get(e)}async put(e){try{return await this.database.settings.put(e)}catch(t){console.error(t.stack??t)}}}class d{constructor(e){this.settingRepository=e}async getSidebarSetting(){const{articleId:e}=await this.settingRepository.get("sidebar")??{};return{name:"sidebar",articleId:e}}async setSidebarArticleId(e){const t=await this.getSidebarSetting();t.articleId=e,console.log("service sidebar:",t),await this.settingRepository.put(t)}}const g=new r,p=new l.Z,f=new s.Z(p),v=new c(f),y=new i.Z(p),m=new o.Z(y,f),h=new u(p),w=new d(h),b=(0,n.iH)([]),k=(0,n.iH)(null),_=(0,n.iH)([]),S=(0,n.iH)([]),x=e=>{k.value=e,_.value=[]},I=({id:e,expanded:t})=>{b.value.filter((t=>t.id===e)).forEach((e=>{e.expanded=t}))},P=e=>{S.value=e,e.length>0&&null==k.value&&(k.value=e[0].id)},A=({categoryId:e,articlesViewMode:t,tagPosition:a,tagSelectionMode:n})=>{S.value.filter((t=>t.id===e)).forEach((e=>{e.articlesViewMode=t??e.articlesViewMode,e.tagPosition=a??e.tagPosition,e.tagSelectionMode=n??e.tagSelectionMode}))},T=async e=>{const t=await m.get({categoryId:e});b.value=g.fromArticles(t),x(e)},D=async()=>{const e=await f.getAll();P(e),null!=k.value&&await T(k.value)},C=({id:e,expanded:t})=>{I({id:e,expanded:t}),m.setExpanding(e,t)},M=async({categoryId:e,articlesViewMode:t})=>{A({categoryId:e,articlesViewMode:t}),await v.setSettings(e,{articlesViewMode:t})},F=async({categoryId:e,tagPosition:t,tagSelectionMode:a})=>{A({categoryId:e,tagPosition:t,tagSelectionMode:a}),await v.setSettings(e,{tagPosition:t,tagSelectionMode:a})},U=({text:e,selected:t})=>{const a=S.value.filter((e=>e.id===k.value)),n=a[0]?.tagSelectionMode??"single",r=_.value.includes(e);"single"!==n?r?!1===t&&(_.value=_.value.filter((t=>t!==e)),console.log("1")):t&&_.value.push(e):_.value=r?[]:[e]}},7540:function(e,t,a){a.d(t,{$1:function(){return o},DF:function(){return s},Pn:function(){return u},Y1:function(){return c},c3:function(){return l}});a(825);var n=a(690),r=a(3556),i=a(1736);const l=(0,n.Fl)((()=>{const e=r.BX.value.map((e=>e.tags??[])).reduce(((e,t)=>(t.filter((t=>!1===e.includes(t))).forEach((t=>e.push(t))),e)),[]);return e.map((e=>{const t=r.o1.value.includes(e);return{selected:t,text:e,value:e}}))})),o=async e=>{const t=await r._b.get({categoryId:e});r.jA["export"](t)},s=(0,n.iH)(null),c=async()=>{const{articleId:e}=await r.Q2.getSidebarSetting();if(null==e)return void(s.value=null);const t=await r._b.get({articleId:e}),a=t[0],n=null==a?.text?null:i.T.parse(a.text);s.value={html:n,...a}},u=async e=>{await r.Q2.setSidebarArticleId(e),await c()}},9401:function(e,t,a){a.d(t,{Z:function(){return n}});class n{constructor(e,t){this.articleRepository=e,this.categoryRepository=t}async get({categoryId:e,articleId:t}){try{const a=await this.articleRepository.getArticles({categoryId:e,articleId:t}),n=a.map((e=>e.id)),r=await this.articleRepository.getArticleTags(n);return a.map((e=>this.getResult(e,r)))}catch(a){console.error("記事読み込めませんでした。",a)}}async set({id:e,categoryId:t,expanded:a,title:n,text:r,tags:i}){const l=await this.categoryRepository.get(t);if(null==l)throw console.error("Specified categoryId not found. categoryId:",t),new Error("Specified categoryId not found. categoryId: "+t);try{const l=await this.articleRepository.setArticle({id:e,categoryId:t,expanded:a,title:n,text:r});console.log("Inserted. articleId:",l);const o=await this.articleRepository.getArticleTags([l]);if(!this.areEqualTagsToArticleTags(i,o)){const e=o.map((e=>e.id));await this.articleRepository.deleteTagsFromArticle(e),await this.articleRepository.addTagsToArticle(l,i)}return l}catch(o){console.error("記事を保存できませんでした。",o.stack||o)}}async setExpanding(e,t){try{const a=await this.articleRepository.getArticles({articleId:e});if(a.length<=0)throw new Error("Specified articleId not found. articleId: "+e);a[0].expanded=t,this.articleRepository.setArticle(a[0])}catch(a){console.error("記事を保存できませんでした。",a.stack||a)}}getResult(e,t){const a=t.filter((t=>t.articleId===e.id)).map((e=>e.tagText)),n=Array.from(new Set(a).values());return{...e,tags:n}}areEqualTagsToArticleTags(e,t){if(e.length!==t.length)return!1;for(let a=0;a<e.length;a++)if(e[a]!==t[a].tagText)return!1;return!0}}},1791:function(e,t,a){a.d(t,{Z:function(){return c}});var n=a(690);const r={class:"alert alert-warning"};function i(e,t){return(0,n.wg)(),(0,n.iD)("div",r," データがありません。 ")}var l=a(673);const o={},s=(0,l.Z)(o,[["render",i]]);var c=s}},t={};function a(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,a),i.exports}a.m=e,function(){var e=[];a.O=function(t,n,r,i){if(!n){var l=1/0;for(u=0;u<e.length;u++){n=e[u][0],r=e[u][1],i=e[u][2];for(var o=!0,s=0;s<n.length;s++)(!1&i||l>=i)&&Object.keys(a.O).every((function(e){return a.O[e](n[s])}))?n.splice(s--,1):(o=!1,i<l&&(l=i));if(o){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,r,i]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,n){return a.f[n](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+{267:"categories",525:"articles",571:"settings"}[e]+"."+{267:"e7e0a5d6",525:"20b989e5",571:"2fc53132"}[e]+".js"}}(),function(){a.miniCssF=function(e){return"css/articles.f76335a6.css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="portal:";a.l=function(n,r,i,l){if(e[n])e[n].push(r);else{var o,s;if(void 0!==i)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+i){o=d;break}}o||(s=!0,o=document.createElement("script"),o.charset="utf-8",o.timeout=120,a.nc&&o.setAttribute("nonce",a.nc),o.setAttribute("data-webpack",t+i),o.src=n),e[n]=[r];var g=function(t,a){o.onerror=o.onload=null,clearTimeout(p);var r=e[n];if(delete e[n],o.parentNode&&o.parentNode.removeChild(o),r&&r.forEach((function(e){return e(a)})),t)return t(a)},p=setTimeout(g.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=g.bind(null,o.onerror),o.onload=g.bind(null,o.onload),s&&document.head.appendChild(o)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p=""}(),function(){if("undefined"!==typeof document){var e=function(e,t,a,n,r){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var l=function(a){if(i.onerror=i.onload=null,"load"===a.type)n();else{var l=a&&("load"===a.type?"missing":a.type),o=a&&a.target&&a.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=l,s.request=o,i.parentNode.removeChild(i),r(s)}};return i.onerror=i.onload=l,i.href=t,a?a.parentNode.insertBefore(i,a.nextSibling):document.head.appendChild(i),i},t=function(e,t){for(var a=document.getElementsByTagName("link"),n=0;n<a.length;n++){var r=a[n],i=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===e||i===t))return r}var l=document.getElementsByTagName("style");for(n=0;n<l.length;n++){r=l[n],i=r.getAttribute("data-href");if(i===e||i===t)return r}},n=function(n){return new Promise((function(r,i){var l=a.miniCssF(n),o=a.p+l;if(t(l,o))return r();e(n,o,null,r,i)}))},r={143:0};a.f.miniCss=function(e,t){var a={525:1};r[e]?t.push(r[e]):0!==r[e]&&a[e]&&t.push(r[e]=n(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}}(),function(){var e={143:0};a.f.j=function(t,n){var r=a.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var i=new Promise((function(a,n){r=e[t]=[a,n]}));n.push(r[2]=i);var l=a.p+a.u(t),o=new Error,s=function(n){if(a.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=n&&("load"===n.type?"missing":n.type),l=n&&n.target&&n.target.src;o.message="Loading chunk "+t+" failed.\n("+i+": "+l+")",o.name="ChunkLoadError",o.type=i,o.request=l,r[1](o)}};a.l(l,s,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,i,l=n[0],o=n[1],s=n[2],c=0;if(l.some((function(t){return 0!==e[t]}))){for(r in o)a.o(o,r)&&(a.m[r]=o[r]);if(s)var u=s(a)}for(t&&t(n);c<l.length;c++)i=l[c],a.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return a.O(u)},n=self["webpackChunkportal"]=self["webpackChunkportal"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(6041)}));n=a.O(n)})();
//# sourceMappingURL=app.d95b44dd.js.map