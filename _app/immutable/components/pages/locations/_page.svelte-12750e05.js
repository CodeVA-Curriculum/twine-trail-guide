import{S as Fe,i as Ne,s as He,k as c,a as F,q as C,l as u,m as p,c as N,r as O,h as f,n as s,b as oe,G as l,H as le,u as Pe,f as q,g as Re,t as Z,d as qe,F as je,v as ze,w as Be,x as Ue,A as Ke,y as Ge,M as Ae,N as Qe,O as We,o as Xe,P as Ce}from"../../../chunks/index-28147552.js";import{g as Ze}from"../../../chunks/navigation-03af5729.js";import{b as se}from"../../../chunks/paths-6cd3a76e.js";import{F as xe,f as $e}from"../../../chunks/index.es-30099b97.js";function Oe(o){let a,t,e,i;return{c(){a=c("div"),t=c("div"),e=c("iframe"),this.h()},l(r){a=u(r,"DIV",{class:!0});var h=p(a);t=u(h,"DIV",{class:!0});var m=p(t);e=u(m,"IFRAME",{src:!0,title:!0,frameborder:!0,allow:!0,class:!0}),p(e).forEach(f),m.forEach(f),h.forEach(f),this.h()},h(){je(e.src,i=o[4])||s(e,"src",i),s(e,"title","YouTube video player"),s(e,"frameborder","0"),s(e,"allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"),e.allowFullscreen=!0,s(e,"class","svelte-1t6n5x5"),s(t,"class","video svelte-1t6n5x5"),s(a,"class","column is-4")},m(r,h){oe(r,a,h),l(a,t),l(t,e)},p(r,h){h&16&&!je(e.src,i=r[4])&&s(e,"src",i)},d(r){r&&f(a)}}}function Me(o){let a,t,e;return t=new xe({props:{icon:$e,size:"0.75x"}}),{c(){a=c("span"),ze(t.$$.fragment),this.h()},l(i){a=u(i,"SPAN",{class:!0});var r=p(a);Be(t.$$.fragment,r),r.forEach(f),this.h()},h(){s(a,"class","icon svelte-1t6n5x5")},m(i,r){oe(i,a,r),Ue(t,a,null),e=!0},p:Ke,i(i){e||(q(t.$$.fragment,i),e=!0)},o(i){Z(t.$$.fragment,i),e=!1},d(i){i&&f(a),Ge(t)}}}function et(o){let a,t,e,i,r,h,m,L,E,M,A,I,P,y,Y,v=o[4]&&Oe(o),n=o[2]=="project"&&Me();return{c(){a=c("article"),t=c("div"),e=c("div"),v&&v.c(),i=F(),r=c("div"),h=c("h2"),m=c("a"),L=C(o[0]),n&&n.c(),M=F(),A=c("p"),I=C(o[1]),this.h()},l(g){a=u(g,"ARTICLE",{class:!0});var w=p(a);t=u(w,"DIV",{class:!0});var H=p(t);e=u(H,"DIV",{class:!0});var S=p(e);v&&v.l(S),i=N(S),r=u(S,"DIV",{class:!0});var T=p(r);h=u(T,"H2",{class:!0});var z=p(h);m=u(z,"A",{href:!0,class:!0});var R=p(m);L=O(R,o[0]),R.forEach(f),n&&n.l(z),z.forEach(f),M=N(T),A=u(T,"P",{class:!0});var j=p(A);I=O(j,o[1]),j.forEach(f),T.forEach(f),S.forEach(f),H.forEach(f),w.forEach(f),this.h()},h(){s(m,"href",E=se+"/locations"+o[3]),s(m,"class","svelte-1t6n5x5"),s(h,"class","title is-size-4 mb-3 svelte-1t6n5x5"),s(A,"class","block"),s(r,"class","column"),s(e,"class","columns is-mobile"),s(t,"class","card-content"),s(a,"class","card my-5 location svelte-1t6n5x5")},m(g,w){oe(g,a,w),l(a,t),l(t,e),v&&v.m(e,null),l(e,i),l(e,r),l(r,h),l(h,m),l(m,L),n&&n.m(h,null),l(r,M),l(r,A),l(A,I),P=!0,y||(Y=le(a,"click",o[5]),y=!0)},p(g,[w]){g[4]?v?v.p(g,w):(v=Oe(g),v.c(),v.m(e,i)):v&&(v.d(1),v=null),(!P||w&1)&&Pe(L,g[0]),(!P||w&8&&E!==(E=se+"/locations"+g[3]))&&s(m,"href",E),g[2]=="project"?n?(n.p(g,w),w&4&&q(n,1)):(n=Me(),n.c(),q(n,1),n.m(h,null)):n&&(Re(),Z(n,1,1,()=>{n=null}),qe()),(!P||w&2)&&Pe(I,g[1])},i(g){P||(q(n),P=!0)},o(g){Z(n),P=!1},d(g){g&&f(a),v&&v.d(),n&&n.d(),y=!1,Y()}}}function tt(o,a,t){let{name:e,desc:i,type:r}=a,{path:h=""}=a,{video:m}=a;function L(){Ze(`${se}/locations${h}`,{replaceState:!1,noScroll:!1})}return o.$$set=E=>{"name"in E&&t(0,e=E.name),"desc"in E&&t(1,i=E.desc),"type"in E&&t(2,r=E.type),"path"in E&&t(3,h=E.path),"video"in E&&t(4,m=E.video)},[e,i,r,h,m,L]}class at extends Fe{constructor(a){super(),Ne(this,a,tt,et,He,{name:0,desc:1,type:2,path:3,video:4})}}function Se(o,a,t){const e=o.slice();return e[11]=a[t],e}function Ye(o){let a,t;return a=new at({props:{name:o[11].title,desc:o[11].description,path:o[11].slug,video:o[11].video,type:o[11].type}}),{c(){ze(a.$$.fragment)},l(e){Be(a.$$.fragment,e)},m(e,i){Ue(a,e,i),t=!0},p(e,i){const r={};i&4&&(r.name=e[11].title),i&4&&(r.desc=e[11].description),i&4&&(r.path=e[11].slug),i&4&&(r.video=e[11].video),i&4&&(r.type=e[11].type),a.$set(r)},i(e){t||(q(a.$$.fragment,e),t=!0)},o(e){Z(a.$$.fragment,e),t=!1},d(e){Ge(a,e)}}}function lt(o){let a,t,e,i,r,h,m,L,E,M,A,I,P,y,Y,v,n,g,w,H,S,T,z,R,j,K,ie,re,Q,B,D,ne,ce,W,U,V,ue,fe,he,de,G,$,pe,ge,J=o[2],b=[];for(let _=0;_<J.length;_+=1)b[_]=Ye(Se(o,J,_));const Je=_=>Z(b[_],1,1,()=>{b[_]=null});return{c(){a=c("section"),t=c("div"),e=c("h1"),i=C("Locations on the Map"),r=F(),h=c("p"),m=C("This is a big list of all the locations in this guide. You can use this page to search for videos or tutorials that you think might be useful, or just browse around to find something interesting. You can also browse the Locations in this guide by exploring the "),L=c("a"),E=C("Region Map"),M=C("."),A=F(),I=c("p"),P=C("Each location includes a short video and a text explanation of a particular concept, storytelling strategy, or feature of Twine. You can also explore Locations by following "),y=c("a"),Y=C("Trails"),v=C(", which are collections of Locations organized around particular features or projects you can create with Twine. Check them out!"),n=F(),g=c("div"),w=c("div"),H=c("div"),S=c("div"),T=c("input"),z=F(),R=c("div"),j=c("div"),K=c("label"),ie=C("Type:"),re=F(),Q=c("div"),B=c("label"),D=c("input"),ne=C(`
                            Tutorial`),ce=F(),W=c("div"),U=c("label"),V=c("input"),ue=C(`
                            Project`),fe=F(),he=c("hr"),de=F(),G=c("div");for(let _=0;_<b.length;_+=1)b[_].c();this.h()},l(_){a=u(_,"SECTION",{class:!0});var k=p(a);t=u(k,"DIV",{class:!0});var d=p(t);e=u(d,"H1",{class:!0});var x=p(e);i=O(x,"Locations on the Map"),x.forEach(f),r=N(d),h=u(d,"P",{class:!0});var ee=p(h);m=O(ee,"This is a big list of all the locations in this guide. You can use this page to search for videos or tutorials that you think might be useful, or just browse around to find something interesting. You can also browse the Locations in this guide by exploring the "),L=u(ee,"A",{href:!0});var be=p(L);E=O(be,"Region Map"),be.forEach(f),M=O(ee,"."),ee.forEach(f),A=N(d),I=u(d,"P",{class:!0});var te=p(I);P=O(te,"Each location includes a short video and a text explanation of a particular concept, storytelling strategy, or feature of Twine. You can also explore Locations by following "),y=u(te,"A",{href:!0});var Ee=p(y);Y=O(Ee,"Trails"),Ee.forEach(f),v=O(te,", which are collections of Locations organized around particular features or projects you can create with Twine. Check them out!"),te.forEach(f),n=N(d),g=u(d,"DIV",{class:!0});var ae=p(g);w=u(ae,"DIV",{class:!0});var ye=p(w);H=u(ye,"DIV",{class:!0});var ke=p(H);S=u(ke,"DIV",{class:!0});var we=p(S);T=u(we,"INPUT",{class:!0,type:!0,placeholder:!0}),we.forEach(f),ke.forEach(f),ye.forEach(f),z=N(ae),R=u(ae,"DIV",{class:!0});var Le=p(R);j=u(Le,"DIV",{class:!0});var X=p(j);K=u(X,"LABEL",{class:!0});var Ie=p(K);ie=O(Ie,"Type:"),Ie.forEach(f),re=N(X),Q=u(X,"DIV",{class:!0});var Te=p(Q);B=u(Te,"LABEL",{class:!0});var ve=p(B);D=u(ve,"INPUT",{type:!0,name:!0}),ne=O(ve,`
                            Tutorial`),ve.forEach(f),Te.forEach(f),ce=N(X),W=u(X,"DIV",{class:!0});var De=p(W);U=u(De,"LABEL",{class:!0});var _e=p(U);V=u(_e,"INPUT",{type:!0,name:!0}),ue=O(_e,`
                            Project`),_e.forEach(f),De.forEach(f),X.forEach(f),Le.forEach(f),ae.forEach(f),fe=N(d),he=u(d,"HR",{}),d.forEach(f),de=N(k),G=u(k,"DIV",{class:!0});var Ve=p(G);for(let me=0;me<b.length;me+=1)b[me].l(Ve);Ve.forEach(f),k.forEach(f),this.h()},h(){s(e,"class","title"),s(L,"href","https://padlet.com/jonstapleton/wvs5vb5ct1s5kqts"),s(h,"class","block"),s(y,"href",se+"/trails"),s(I,"class","block"),s(T,"class","input"),s(T,"type","text"),s(T,"placeholder","Search in Location titles..."),s(S,"class","control is-expanded"),s(H,"class","field is-grouped"),s(w,"class","column"),s(K,"class","label mr-3"),s(D,"type","checkbox"),s(D,"name","types"),D.__value="tutorial",D.value=D.__value,o[6][0].push(D),s(B,"class","checkbox"),s(Q,"class","control"),s(V,"type","checkbox"),s(V,"name","types"),V.__value="project",V.value=V.__value,o[6][0].push(V),s(U,"class","checkbox"),s(W,"class","control"),s(j,"class","field is-grouped mt-1"),s(R,"class","column is-narrow"),s(g,"class","columns"),s(t,"class","container"),s(G,"class","container"),s(a,"class","section")},m(_,k){oe(_,a,k),l(a,t),l(t,e),l(e,i),l(t,r),l(t,h),l(h,m),l(h,L),l(L,E),l(h,M),l(t,A),l(t,I),l(I,P),l(I,y),l(y,Y),l(I,v),l(t,n),l(t,g),l(g,w),l(w,H),l(H,S),l(S,T),Ae(T,o[0]),l(g,z),l(g,R),l(R,j),l(j,K),l(K,ie),l(j,re),l(j,Q),l(Q,B),l(B,D),D.checked=~o[1].indexOf(D.__value),l(B,ne),l(j,ce),l(j,W),l(W,U),l(U,V),V.checked=~o[1].indexOf(V.__value),l(U,ue),l(t,fe),l(t,he),l(a,de),l(a,G);for(let d=0;d<b.length;d+=1)b[d].m(G,null);$=!0,pe||(ge=[le(T,"input",o[4]),le(D,"change",o[5]),le(V,"change",o[7])],pe=!0)},p(_,[k]){if(k&1&&T.value!==_[0]&&Ae(T,_[0]),k&2&&(D.checked=~_[1].indexOf(D.__value)),k&2&&(V.checked=~_[1].indexOf(V.__value)),k&4){J=_[2];let d;for(d=0;d<J.length;d+=1){const x=Se(_,J,d);b[d]?(b[d].p(x,k),q(b[d],1)):(b[d]=Ye(x),b[d].c(),q(b[d],1),b[d].m(G,null))}for(Re(),d=J.length;d<b.length;d+=1)Je(d);qe()}},i(_){if(!$){for(let k=0;k<J.length;k+=1)q(b[k]);$=!0}},o(_){b=b.filter(Boolean);for(let k=0;k<b.length;k+=1)Z(b[k]);$=!1},d(_){_&&f(a),o[6][0].splice(o[6][0].indexOf(D),1),o[6][0].splice(o[6][0].indexOf(V),1),Qe(b,_),pe=!1,We(ge)}}}function st(o,a,t){let{data:e}=a,i=[],r=[],h="",m=["tutorial","project"];Xe(()=>{i=e.locations,i&&t(2,r=i)});let L=(y,Y)=>{let v=[];for(let n=0;n<i.length;n++)(i[n].title.toLowerCase().includes(y.toLowerCase())||y.length<=0)&&v.push(i[n]);return v=E(v,Y),v},E=(y,Y)=>{let v=[];for(let n=0;n<y.length;n++)Y.includes(y[n].type)&&v.push(y[n]);return v};const M=[[]];function A(){h=this.value,t(0,h)}function I(){m=Ce(M[0],this.__value,this.checked),t(1,m)}function P(){m=Ce(M[0],this.__value,this.checked),t(1,m)}return o.$$set=y=>{"data"in y&&t(3,e=y.data)},o.$$.update=()=>{o.$$.dirty&3&&t(2,r=L(h,m))},[h,m,r,e,A,I,M,P]}class ct extends Fe{constructor(a){super(),Ne(this,a,st,lt,He,{data:3})}}export{ct as default};
