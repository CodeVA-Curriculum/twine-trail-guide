import{S as G,i as J,s as K,e as r,t as H,k as N,j as M,c as o,a as c,g as O,d as s,n as y,m as Q,b as m,f as b,H as l,o as R,h as F,x as W,u as X,v as Y}from"../../chunks/vendor-f9fc9992.js";import{b as Z}from"../../chunks/paths-28a87002.js";import{T as tt}from"../../chunks/TrailTimeline-5d71912c.js";function st(u){let e,i,a,f=u[0].name+"",j,A,E,S=u[0].desc+"",I,w,_,p,C,h,d,$,L,P,k,V,T;return p=new tt({props:{locs:u[0].locations}}),{c(){e=r("section"),i=r("div"),a=r("h1"),j=H(f),A=N(),E=r("p"),I=H(S),w=N(),_=r("section"),M(p.$$.fragment),C=N(),h=r("section"),d=r("div"),$=r("h2"),L=H("Standards Alignment"),P=N(),k=r("p"),V=H("Lorum ipsum sit dolor amet"),this.h()},l(t){e=o(t,"SECTION",{class:!0});var n=c(e);i=o(n,"DIV",{class:!0});var v=c(i);a=o(v,"H1",{class:!0});var g=c(a);j=O(g,f),g.forEach(s),A=y(v),E=o(v,"P",{class:!0});var q=c(E);I=O(q,S),q.forEach(s),v.forEach(s),n.forEach(s),w=y(t),_=o(t,"SECTION",{class:!0});var x=c(_);Q(p.$$.fragment,x),x.forEach(s),C=y(t),h=o(t,"SECTION",{class:!0});var z=c(h);d=o(z,"DIV",{class:!0});var D=c(d);$=o(D,"H2",{class:!0});var B=c($);L=O(B,"Standards Alignment"),B.forEach(s),P=y(D),k=o(D,"P",{class:!0});var U=c(k);V=O(U,"Lorum ipsum sit dolor amet"),U.forEach(s),D.forEach(s),z.forEach(s),this.h()},h(){m(a,"class","title block"),m(E,"class","block"),m(i,"class","container"),m(e,"class","section"),m(_,"class","section"),m($,"class","title is-size-4"),m(k,"class","block"),m(d,"class","container"),m(h,"class","section")},m(t,n){b(t,e,n),l(e,i),l(i,a),l(a,j),l(i,A),l(i,E),l(E,I),b(t,w,n),b(t,_,n),R(p,_,null),b(t,C,n),b(t,h,n),l(h,d),l(d,$),l($,L),l(d,P),l(d,k),l(k,V),T=!0},p(t,[n]){(!T||n&1)&&f!==(f=t[0].name+"")&&F(j,f),(!T||n&1)&&S!==(S=t[0].desc+"")&&F(I,S);const v={};n&1&&(v.locs=t[0].locations),p.$set(v)},i(t){T||(W(p.$$.fragment,t),T=!0)},o(t){X(p.$$.fragment,t),T=!1},d(t){t&&s(e),t&&s(w),t&&s(_),Y(p),t&&s(C),t&&s(h)}}}async function lt({fetch:u,page:e}){const{trail:i}=e.params,a=await u(`${Z}/api/trails/${i}`);return a.ok?{props:{trail:await a.json()}}:{status:a.status,error:new Error}}function et(u,e,i){let{trail:a}=e;return u.$$set=f=>{"trail"in f&&i(0,a=f.trail)},[a]}class rt extends G{constructor(e){super();J(this,e,et,st,K,{trail:0})}}export{rt as default,lt as load};