"use strict";(self["webpackChunkportal"]=self["webpackChunkportal"]||[]).push([[525],{3822:function(e,a,l){l.r(a),l.d(a,{default:function(){return k}});l(825);var t=l(690),n=l(9977),s=l(1736),u=l(1963),r=l(1791),i=l(2974),o=l(4334),c=l(9401),v=l(9568);const d={class:"h-100"},p={class:"form-group"},g={class:"row h-100 pb-3"},w={cols:"6",class:"col-6 h-100"},_={cols:"6",class:"col-6 overflow-auto h-100"},m=["innerHTML"],y={class:"form-group"},b={class:"d-flex h-interval"},f=["disabled"];var h={__name:"ArticleCreatePage",setup(e){const a=new o.Z,l=new i.Z(a),h=new v.Z(a),x=new c.Z(l,h),Z=(0,n.yj)(),k=(0,t.iH)(null),H=(0,t.iH)(null),I=(0,t.iH)({title:"",text:"",preview:"",tagsString:""}),L=(0,t.Fl)((()=>!0!==k.value)),S=(0,t.Fl)({get(){return I.value.text},set(e){I.value.text=e,I.value.preview=null==e?"":s.T.parse(e)}}),T=async()=>{console.log("categoryId.value",H.value);const e=await h.get(H.value);k.value=null!=e};(0,t.bv)((()=>{H.value=parseInt(Z.params.categoryId),k.value=null,T()})),(0,t.YP)((()=>Z.params.categoryId),(async e=>{H.value=parseInt(e),k.value=null,T()}));const A=async()=>{const{title:e,text:a,tagsString:l}=I.value,t=Array.from(new Set(l.split(" ").filter((e=>e.length>0))).values());await x.set({categoryId:H.value,title:e,text:a,tags:t}),u.Z.push({name:"ArticlesListPage"})},P=()=>{u.Z.push({name:"ArticlesListPage"})};return(e,a)=>{const l=(0,t.up)("FullHeight"),n=(0,t.up)("TheMainLayout");return(0,t.wg)(),(0,t.j4)(n,{"no-sidebar":""},{"panel-main":(0,t.w5)((()=>[(0,t._)("div",d,[(0,t.Wm)(l,null,{header:(0,t.w5)((()=>[k.value?(0,t.kq)("",!0):((0,t.wg)(),(0,t.j4)(r.Z,{key:0})),(0,t._)("fieldset",p,[(0,t.wy)((0,t._)("input",{class:"form-control",type:"text",name:"title",placeholder:"タイトル","onUpdate:modelValue":a[0]||(a[0]=e=>I.value.title=e)},null,512),[[t.nr,I.value.title]])])])),footer:(0,t.w5)((()=>[(0,t._)("fieldset",y,[(0,t._)("div",b,[(0,t.wy)((0,t._)("input",{name:"tags",class:"form-control",placeholder:"タグ1 タグ2 ...","onUpdate:modelValue":a[2]||(a[2]=e=>I.value.tagsString=e)},null,512),[[t.nr,I.value.tagsString]]),(0,t._)("button",{class:"btn btn-primary button-save",type:"button",disabled:(0,t.SU)(L),onClick:A}," 保存 ",8,f),(0,t._)("button",{class:"btn btn-secondary button-cancel",onClick:P}," キャンセル ")])])])),default:(0,t.w5)((()=>[(0,t._)("div",g,[(0,t._)("div",w,[(0,t.wy)((0,t._)("textarea",{name:"text",placeholder:"本文",class:"form-control h-100 text-body","onUpdate:modelValue":a[1]||(a[1]=e=>(0,t.dq)(S)?S.value=e:null),wrap:"soft",rows:"2"},null,512),[[t.nr,(0,t.SU)(S)]])]),(0,t._)("div",_,[(0,t._)("div",{innerHTML:I.value.preview},null,8,m)])])]),void 0,!0),_:1})])])),_:1})}}},x=l(673);const Z=(0,x.Z)(h,[["__scopeId","data-v-88c827c6"]]);var k=Z},1267:function(e,a,l){l.r(a),l.d(a,{default:function(){return L}});l(825);var t=l(690),n=l(9977),s=l(1736),u=l(1963),r=l(1791),i=l(2974),o=l(4334),c=l(9401),v=l(9568);const d=e=>((0,t.dD)("data-v-b0d7f71e"),e=e(),(0,t.Cn)(),e),p={class:"h-100"},g={key:0,class:"spinner-border text-primary",role:"status"},w=d((()=>(0,t._)("span",{class:"sr-only"},"Loading...",-1))),_=[w],m={class:"form-group"},y={class:"row h-100 pb-3"},b={cols:"6",class:"col-6 h-100"},f={cols:"6",class:"col-6 overflow-auto h-100"},h=["innerHTML"],x={class:"form-group"},Z={class:"d-flex h-interval"};var k={__name:"ArticleEditPage",setup(e){const a=new o.Z,l=new i.Z(a),d=new v.Z(a),w=new c.Z(l,d),k=(0,n.yj)(),H=(0,t.iH)(null),I=(0,t.iH)(null),L=(0,t.iH)(null),S=(0,t.iH)({title:"",text:"",preview:"",tagsString:""}),T=(0,t.Fl)({get(){return S.value.text},set(e){S.value.text=e,S.value.preview=null==e?"":s.T.parse(e)}}),A=((0,t.Fl)((()=>null==H.value)),async()=>{L.value=!0,H.value=null;const e=await w.get({articleId:I.value});e.length>0&&(H.value=e[0],S.value.title=H.value.title,T.value=H.value.text,S.value.tagsString=H.value.tags?.join(" ")??""),L.value=!1}),P=async function(){const{id:e,categoryId:a}=H.value,{title:l,text:t,tagsString:n}=S.value,s=Array.from(new Set(n.split(" ").filter((e=>e.length>0))).values());await w.set({id:e,categoryId:a,title:l,text:t,tags:s}),u.Z.push({name:"ArticleReadPage",parems:{id:e}})},j=()=>{u.Z.push({name:"ArticlesListPage"})};return(0,t.bv)((()=>{I.value=parseInt(k.params.id),A()})),(0,t.YP)((()=>k.params.categoryId),(async e=>{I.value=parseInt(e),A()})),(e,a)=>{const l=(0,t.up)("FullHeight"),n=(0,t.up)("TheMainLayout");return(0,t.wg)(),(0,t.j4)(n,{"no-sidebar":""},{"panel-main":(0,t.w5)((()=>[(0,t._)("div",p,[L.value?((0,t.wg)(),(0,t.iD)("div",g,_)):null==H.value?((0,t.wg)(),(0,t.j4)(r.Z,{key:1})):((0,t.wg)(),(0,t.j4)(l,{key:2},{header:(0,t.w5)((()=>[(0,t._)("fieldset",m,[(0,t.wy)((0,t._)("input",{class:"form-control",type:"text",name:"title",placeholder:"タイトル","onUpdate:modelValue":a[0]||(a[0]=e=>S.value.title=e)},null,512),[[t.nr,S.value.title]])])])),footer:(0,t.w5)((()=>[(0,t._)("fieldset",x,[(0,t._)("div",Z,[(0,t.wy)((0,t._)("input",{name:"tags",class:"form-control",placeholder:"タグ1 タグ2 ...","onUpdate:modelValue":a[2]||(a[2]=e=>S.value.tagsString=e)},null,512),[[t.nr,S.value.tagsString]]),(0,t._)("button",{class:"btn btn-primary button-save",onClick:P}," 保存 "),(0,t._)("button",{class:"btn btn-secondary button-cancel",onClick:j}," キャンセル ")])])])),default:(0,t.w5)((()=>[(0,t._)("div",y,[(0,t._)("div",b,[(0,t.wy)((0,t._)("textarea",{name:"text",placeholder:"本文",class:"form-control h-100 text-body","onUpdate:modelValue":a[1]||(a[1]=e=>(0,t.dq)(T)?T.value=e:null),wrap:"soft",rows:"2"},null,512),[[t.nr,(0,t.SU)(T)]])]),(0,t._)("div",f,[(0,t._)("div",{innerHTML:S.value.preview,class:"article-body-view"},null,8,h)])])]),void 0,!0),_:1}))])])),_:1})}}},H=l(673);const I=(0,H.Z)(k,[["__scopeId","data-v-b0d7f71e"]]);var L=I},2425:function(e,a,l){l.r(a),l.d(a,{default:function(){return L}});l(825);var t=l(690),n=l(9977),s=l(1736),u=l(1963),r=l(2974),i=l(4334),o=l(9401),c=l(9568);const v=e=>((0,t.dD)("data-v-940cdd6a"),e=e(),(0,t.Cn)(),e),d={class:"h-100"},p={key:0,class:"spinner-border text-primary",role:"status"},g=v((()=>(0,t._)("span",{class:"sr-only"},"Loading...",-1))),w=[g],_={key:2,class:"h-100 main"},m={class:"title-div"},y=v((()=>(0,t._)("i",{class:"fas fa-edit"},null,-1))),b=[y],f=v((()=>(0,t._)("i",{class:"fas fa-times"},null,-1))),h=[f],x=["innerHTML"],Z={class:"h-interval"};var k={__name:"ArticleReadPage",setup(e){const a=new i.Z,l=new r.Z(a),v=new c.Z(a),g=new o.Z(l,v),y=(0,t.iH)(null),f=(0,t.iH)(null),k=(0,n.yj)(),H=(0,t.iH)(!0),I=(0,t.iH)({title:"",text:"",preview:"",tags:[]}),L=(0,t.Fl)({get(){return I.value.text},set(e){I.value.text=e,I.value.preview=null==e?"":s.T.parse(e)}}),S=async()=>{H.value=!0,y.value=null;const e=await g.get({articleId:f.value});e.length>0&&(y.value=e[0],I.value.title=y.value.title,I.value.tags=y.value.tags,L.value=y.value.text),H.value=!1},T=()=>{const e=f.value;u.Z.push({name:"ArticleEditPage",params:{id:e}})},A=()=>{u.Z.push({name:"ArticlesListPage"})};return(0,t.bv)((()=>{f.value=parseInt(k.params.id),S()})),(0,t.YP)((()=>k.params.id),(async e=>{f.value=parseInt(e),S()})),(e,a)=>{const l=(0,t.up)("TheSidebar"),n=(0,t.up)("NotFoundAlert"),s=(0,t.up)("TheMainLayout");return(0,t.wg)(),(0,t.j4)(s,null,{sidebar:(0,t.w5)((()=>[(0,t.Wm)(l)])),"panel-main":(0,t.w5)((()=>[(0,t._)("div",d,[H.value?((0,t.wg)(),(0,t.iD)("div",p,w)):null==y.value?((0,t.wg)(),(0,t.j4)(n,{key:1})):((0,t.wg)(),(0,t.iD)("section",_,[(0,t._)("div",m,[(0,t._)("h2",null,(0,t.zw)(I.value.title),1),(0,t._)("div",null,[(0,t._)("button",{class:"btn btn-link",onClick:T},b),(0,t._)("button",{class:"btn btn-link button-cancel",onClick:A},h)])]),(0,t._)("div",{innerHTML:I.value.preview,class:"preview article-body-view"},null,8,x),(0,t._)("div",Z,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(I.value.tags,(e=>((0,t.wg)(),(0,t.iD)("span",{class:"badge badge-info",key:e},(0,t.zw)(e),1)))),128))])]))])])),_:1})}}},H=l(673);const I=(0,H.Z)(k,[["__scopeId","data-v-940cdd6a"]]);var L=I}}]);
//# sourceMappingURL=articles.ad5ed437.js.map