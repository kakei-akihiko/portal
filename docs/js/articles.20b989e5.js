"use strict";(self["webpackChunkportal"]=self["webpackChunkportal"]||[]).push([[525],{7016:function(e,a,t){t.r(a),t.d(a,{default:function(){return k}});t(825);var l=t(690),n=t(9977),s=t(1736),u=t(9330),r=t(1791),i=t(2974),o=t(4334),c=t(9401),v=t(9568);const d={class:"h-100"},p={class:"form-group"},g={class:"row h-100 pb-3"},w={cols:"6",class:"col-6 h-100"},_={cols:"6",class:"col-6 overflow-auto h-100"},b=["innerHTML"],m={class:"form-group"},y={class:"d-flex h-interval"},f=["disabled"];var h={__name:"ArticleCreatePage",setup(e){const a=new o.Z,t=new i.Z(a),h=new v.Z(a),x=new c.Z(t,h),Z=(0,n.yj)(),k=(0,l.iH)(null),H=(0,l.iH)(null),I=(0,l.iH)({title:"",text:"",preview:"",tagsString:""}),L=(0,l.Fl)((()=>!0!==k.value)),S=(0,l.Fl)({get(){return I.value.text},set(e){I.value.text=e,I.value.preview=null==e?"":s.T.parse(e)}}),T=async()=>{console.log("categoryId.value",H.value);const e=await h.get(H.value);k.value=null!=e};(0,l.bv)((()=>{H.value=parseInt(Z.params.categoryId),k.value=null,T()})),(0,l.YP)((()=>Z.params.categoryId),(async e=>{H.value=parseInt(e),k.value=null,T()}));const A=async()=>{const{title:e,text:a,tagsString:t}=I.value,l=Array.from(new Set(t.split(" ").filter((e=>e.length>0))).values());await x.set({categoryId:H.value,title:e,text:a,tags:l}),u.Z.push({name:"ArticlesListPage"})},P=()=>{u.Z.push({name:"ArticlesListPage"})};return(e,a)=>{const t=(0,l.up)("FullHeight"),n=(0,l.up)("TheMainLayout");return(0,l.wg)(),(0,l.j4)(n,{"no-sidebar":""},{"panel-main":(0,l.w5)((()=>[(0,l._)("div",d,[(0,l.Wm)(t,null,{header:(0,l.w5)((()=>[k.value?(0,l.kq)("",!0):((0,l.wg)(),(0,l.j4)(r.Z,{key:0})),(0,l._)("fieldset",p,[(0,l.wy)((0,l._)("input",{class:"form-control",type:"text",name:"title",placeholder:"タイトル","onUpdate:modelValue":a[0]||(a[0]=e=>I.value.title=e)},null,512),[[l.nr,I.value.title]])])])),footer:(0,l.w5)((()=>[(0,l._)("fieldset",m,[(0,l._)("div",y,[(0,l.wy)((0,l._)("input",{name:"tags",class:"form-control",placeholder:"タグ1 タグ2 ...","onUpdate:modelValue":a[2]||(a[2]=e=>I.value.tagsString=e)},null,512),[[l.nr,I.value.tagsString]]),(0,l._)("button",{class:"btn btn-primary button-save",type:"button",disabled:(0,l.SU)(L),onClick:A}," 保存 ",8,f),(0,l._)("button",{class:"btn btn-secondary button-cancel",onClick:P}," キャンセル ")])])])),default:(0,l.w5)((()=>[(0,l._)("div",g,[(0,l._)("div",w,[(0,l.wy)((0,l._)("textarea",{name:"text",placeholder:"本文",class:"form-control h-100 text-body","onUpdate:modelValue":a[1]||(a[1]=e=>(0,l.dq)(S)?S.value=e:null),wrap:"soft",rows:"2"},null,512),[[l.nr,(0,l.SU)(S)]])]),(0,l._)("div",_,[(0,l._)("div",{innerHTML:I.value.preview},null,8,b)])])]),void 0,!0),_:1})])])),_:1})}}},x=t(673);const Z=(0,x.Z)(h,[["__scopeId","data-v-7618128b"]]);var k=Z},1856:function(e,a,t){t.r(a),t.d(a,{default:function(){return L}});t(825);var l=t(690),n=t(9977),s=t(1736),u=t(9330),r=t(1791),i=t(2974),o=t(4334),c=t(9401),v=t(9568);const d=e=>((0,l.dD)("data-v-b63bdb7e"),e=e(),(0,l.Cn)(),e),p={class:"h-100"},g={key:0,class:"spinner-border text-primary",role:"status"},w=d((()=>(0,l._)("span",{class:"sr-only"},"Loading...",-1))),_=[w],b={class:"form-group"},m={class:"row h-100 pb-3"},y={cols:"6",class:"col-6 h-100"},f={cols:"6",class:"col-6 overflow-auto h-100"},h=["innerHTML"],x={class:"form-group"},Z={class:"d-flex h-interval"};var k={__name:"ArticleEditPage",setup(e){const a=new o.Z,t=new i.Z(a),d=new v.Z(a),w=new c.Z(t,d),k=(0,n.yj)(),H=(0,l.iH)(null),I=(0,l.iH)(null),L=(0,l.iH)(null),S=(0,l.iH)({title:"",text:"",preview:"",tagsString:""}),T=(0,l.Fl)({get(){return S.value.text},set(e){S.value.text=e,S.value.preview=null==e?"":s.T.parse(e)}}),A=async()=>{L.value=!0,H.value=null;const e=await w.get({articleId:I.value});e.length>0&&(H.value=e[0],S.value.title=H.value.title,T.value=H.value.text,S.value.tagsString=H.value.tags?.join(" ")??""),L.value=!1},P=async function(){const{id:e,categoryId:a}=H.value,{title:t,text:l,tagsString:n}=S.value,s=Array.from(new Set(n.split(" ").filter((e=>e.length>0))).values());await w.set({id:e,categoryId:a,title:t,text:l,tags:s}),u.Z.push({name:"ArticleReadPage",parems:{id:e}})},j=()=>{u.Z.push({name:"ArticlesListPage"})};return(0,l.bv)((()=>{I.value=parseInt(k.params.id),A()})),(0,l.YP)((()=>k.params.categoryId),(async e=>{I.value=parseInt(e),A()})),(e,a)=>{const t=(0,l.up)("FullHeight"),n=(0,l.up)("TheMainLayout");return(0,l.wg)(),(0,l.j4)(n,{"no-sidebar":""},{"panel-main":(0,l.w5)((()=>[(0,l._)("div",p,[L.value?((0,l.wg)(),(0,l.iD)("div",g,_)):null==H.value?((0,l.wg)(),(0,l.j4)(r.Z,{key:1})):((0,l.wg)(),(0,l.j4)(t,{key:2},{header:(0,l.w5)((()=>[(0,l._)("fieldset",b,[(0,l.wy)((0,l._)("input",{class:"form-control",type:"text",name:"title",placeholder:"タイトル","onUpdate:modelValue":a[0]||(a[0]=e=>S.value.title=e)},null,512),[[l.nr,S.value.title]])])])),footer:(0,l.w5)((()=>[(0,l._)("fieldset",x,[(0,l._)("div",Z,[(0,l.wy)((0,l._)("input",{name:"tags",class:"form-control",placeholder:"タグ1 タグ2 ...","onUpdate:modelValue":a[2]||(a[2]=e=>S.value.tagsString=e)},null,512),[[l.nr,S.value.tagsString]]),(0,l._)("button",{class:"btn btn-primary button-save",onClick:P}," 保存 "),(0,l._)("button",{class:"btn btn-secondary button-cancel",onClick:j}," キャンセル ")])])])),default:(0,l.w5)((()=>[(0,l._)("div",m,[(0,l._)("div",y,[(0,l.wy)((0,l._)("textarea",{name:"text",placeholder:"本文",class:"form-control h-100 text-body","onUpdate:modelValue":a[1]||(a[1]=e=>(0,l.dq)(T)?T.value=e:null),wrap:"soft",rows:"2"},null,512),[[l.nr,(0,l.SU)(T)]])]),(0,l._)("div",f,[(0,l._)("div",{innerHTML:S.value.preview,class:"article-body-view"},null,8,h)])])]),void 0,!0),_:1}))])])),_:1})}}},H=t(673);const I=(0,H.Z)(k,[["__scopeId","data-v-b63bdb7e"]]);var L=I},9378:function(e,a,t){t.r(a),t.d(a,{default:function(){return L}});t(825);var l=t(690),n=t(9977),s=t(1736),u=t(9330),r=t(2974),i=t(4334),o=t(9401),c=t(9568);const v=e=>((0,l.dD)("data-v-7c3d9e59"),e=e(),(0,l.Cn)(),e),d={class:"h-100"},p={key:0,class:"spinner-border text-primary",role:"status"},g=v((()=>(0,l._)("span",{class:"sr-only"},"Loading...",-1))),w=[g],_={key:2,class:"h-100 main"},b={class:"title-div"},m=v((()=>(0,l._)("i",{class:"fas fa-edit"},null,-1))),y=[m],f=v((()=>(0,l._)("i",{class:"fas fa-times"},null,-1))),h=[f],x=["innerHTML"],Z={class:"h-interval"};var k={__name:"ArticleReadPage",setup(e){const a=new i.Z,t=new r.Z(a),v=new c.Z(a),g=new o.Z(t,v),m=(0,l.iH)(null),f=(0,l.iH)(null),k=(0,n.yj)(),H=(0,l.iH)(!0),I=(0,l.iH)({title:"",text:"",preview:"",tags:[]}),L=(0,l.Fl)({get(){return I.value.text},set(e){I.value.text=e,I.value.preview=null==e?"":s.T.parse(e)}}),S=async()=>{H.value=!0,m.value=null;const e=await g.get({articleId:f.value});e.length>0&&(m.value=e[0],I.value.title=m.value.title,I.value.tags=m.value.tags,L.value=m.value.text),H.value=!1},T=()=>{const e=f.value;u.Z.push({name:"ArticleEditPage",params:{id:e}})},A=()=>{u.Z.push({name:"ArticlesListPage"})};return(0,l.bv)((()=>{f.value=parseInt(k.params.id),S()})),(0,l.YP)((()=>k.params.id),(async e=>{f.value=parseInt(e),S()})),(e,a)=>{const t=(0,l.up)("TheSidebar"),n=(0,l.up)("NotFoundAlert"),s=(0,l.up)("TheMainLayout");return(0,l.wg)(),(0,l.j4)(s,null,{sidebar:(0,l.w5)((()=>[(0,l.Wm)(t)])),"panel-main":(0,l.w5)((()=>[(0,l._)("div",d,[H.value?((0,l.wg)(),(0,l.iD)("div",p,w)):null==m.value?((0,l.wg)(),(0,l.j4)(n,{key:1})):((0,l.wg)(),(0,l.iD)("section",_,[(0,l._)("div",b,[(0,l._)("h2",null,(0,l.zw)(I.value.title),1),(0,l._)("div",null,[(0,l._)("button",{class:"btn btn-link",onClick:T},y),(0,l._)("button",{class:"btn btn-link button-cancel",onClick:A},h)])]),(0,l._)("div",{innerHTML:I.value.preview,class:"preview article-body-view"},null,8,x),(0,l._)("div",Z,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(I.value.tags,(e=>((0,l.wg)(),(0,l.iD)("span",{class:"badge badge-info",key:e},(0,l.zw)(e),1)))),128))])]))])])),_:1})}}},H=t(673);const I=(0,H.Z)(k,[["__scopeId","data-v-7c3d9e59"]]);var L=I}}]);
//# sourceMappingURL=articles.20b989e5.js.map