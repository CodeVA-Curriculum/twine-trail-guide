import{S as xt,i as Rt,s as Pt,I as tt,v as Z,w as ee,x as te,J as Ht,K as wt,f as ae,t as se,y as oe,L as _t,k as f,q as l,a as d,l as u,m as p,r,h as t,c as m,n as ne,b as n,G as o,A as yt}from"../../../../chunks/index-28147552.js";import{S as Lt}from"../../../../chunks/Standalone-e39bc1fe.js";import{p as kt,a as St,i as It}from"../../../../chunks/Standalone.svelte_svelte_type_style_lang-17c44177.js";function At(_){let s,h='<code class="language-undefined">Ranier was walking home one night when they saw &#123;reveal link: &#39;something strange&#39;, text: &#39;an abandoned truck in the middle of the road, sitting alone under a streetlamp&#39;&#125;.</code>';return{c(){s=f("pre"),this.h()},l(c){s=u(c,"PRE",{class:!0});var v=p(s);v.forEach(t),this.h()},h(){ne(s,"class","language-undefined")},m(c,v){n(c,s,v),s.innerHTML=h},p:yt,d(c){c&&t(s)}}}function Dt(_){let s;return{c(){s=l("Stone Harbor")},l(h){s=r(h,"Stone Harbor")},m(h,c){n(h,s,c)},d(h){h&&t(s)}}}function Mt(_){let s,h='<code class="language-intro">Ranier was walking home one night when they saw &#123;reveal link: &#39;something strange&#39;, passage: &#39;abandoned-truck&#39;&#125;.</code>',c,v=`<code class="language-abandoned-truck">an abandoned truck in the middle of the road, sitting alone under a streetlamp.

The truck was red and rusty. Ranier approached slowly, scanning the surroundings trying to see if the owner of the truck was in trouble or needed help.</code>`;return{c(){s=f("pre"),c=f("pre"),this.h()},l(i){s=u(i,"PRE",{class:!0});var w=p(s);w.forEach(t),c=u(i,"PRE",{class:!0});var $=p(c);$.forEach(t),this.h()},h(){ne(s,"class","language-intro"),ne(c,"class","language-abandoned-truck")},m(i,w){n(i,s,w),s.innerHTML=h,n(i,c,w),c.innerHTML=v},p:yt,d(i){i&&t(s),i&&t(c)}}}function Ct(_){let s,h,c,v,i,w,$,le,E,re,I,Re,ie,A,Pe,fe,D,He,ue,b,Le,z,T,Se,pe,M,Ie,ce,x,Ae,F,De,Me,he,g,Ce,G,Oe,Ye,J,je,Ne,de,H,$t=`<code class="language-undefined">an abandoned truck in the middle of the road, sitting alone under a streetlamp.

The truck was red and rusty. Ranier approached slowly, scanning the surroundings trying to see if the owner of the truck was in trouble or needed help.</code>`,me,C,qe,ve,L,Et='<code class="language-undefined">Ranier was walking home one night when they saw &#123;reveal link: &#39;something strange&#39;, passage: &#39;abandoned-truck&#39;&#125;.</code>',we,O,ze,_e,Y,S,ke,k,Fe,U,Ge,Je,W,Ue,We,K,Ke,Be,ge,R,ye,y,Qe,B,Ve,Xe,Q,Ze,et,$e,Ee,be;return E=new kt({props:{title:"Reveal Text Example",src:"/twine-reveal-link.gif",$$slots:{default:[At]},$$scope:{ctx:_}}}),T=new St({props:{href:"https://stoneharborgame.com/",rel:"nofollow",$$slots:{default:[Dt]},$$scope:{ctx:_}}}),S=new It({props:{src:"/two-passages-reveal.png",alt:"The Twine story editor showing two disconnected passages, one called Introduction and one called Abandoned Truck"}}),R=new kt({props:{title:"Reveal Passage Example",src:"/twine-reveal-passage.gif",tabs:!0,$$slots:{default:[Mt]},$$scope:{ctx:_}}}),{c(){s=f("h2"),h=l("Simple Reveal Links"),c=d(),v=f("p"),i=f("strong"),w=l("Reveal links"),$=l(" are special kinds of links that you can use to show additional text in your story rather than moving to a whole new passage when the reader clicks the link. Try it out! Add the following line to a Twine passage:"),le=d(),Z(E.$$.fragment),re=d(),I=f("p"),Re=l("Test out the passage\u2014what do you notice about how the link works?"),ie=d(),A=f("h2"),Pe=l("Why Use a Reveal Link?"),fe=d(),D=f("p"),He=l("\u201CReveal\u201D links have the effect of making the reader feel like they are investigating something new. It also allows you to keep information on the screen for the reader to reference while still moving the story forward."),ue=d(),b=f("p"),Le=l("You can see \u201Creveal\u201D links in action in "),z=f("em"),Z(T.$$.fragment),Se=l(" by Liza Daly."),pe=d(),M=f("h2"),Ie=l("Reveal a Passage"),ce=d(),x=f("p"),Ae=l("The simple \u201Creveal\u201D link above is good for small sections of text, but not as good for longer reveals. If you want to reveal a larger section of text, you might want to use the \u201Creveal\u201D link to show a "),F=f("em"),De=l("passage"),Me=l(" instead of just some text."),he=d(),g=f("p"),Ce=l("First, create a new passage. I\u2019ve called mine "),G=f("code"),Oe=l("abandoned-truck"),Ye=l(", but you can name yours whatever you like. Here\u2019s what my "),J=f("code"),je=l("abandoned-truck"),Ne=l(" passage says:"),de=d(),H=f("pre"),me=d(),C=f("p"),qe=l("Now, return to your first passage and change the link \u201Creveal\u201D link so it looks like this:"),ve=d(),L=f("pre"),we=d(),O=f("p"),ze=l("At this point you\u2019ll have two passages that aren\u2019t connected, like this:"),_e=d(),Y=f("p"),Z(S.$$.fragment),ke=d(),k=f("p"),Fe=l("You\u2019ll notice that I\u2019ve changed "),U=f("code"),Ge=l("text"),Je=l(" to say "),W=f("code"),Ue=l("passage"),We=l(" instead, and replaced the sentence describing the truck with the name of the new passage ("),K=f("code"),Ke=l("Abandoned Truck"),Be=l("). Test out your story!"),ge=d(),Z(R.$$.fragment),ye=d(),y=f("p"),Qe=l("The \u201Creveal\u201D link, once clicked, inserts the text from the "),B=f("code"),Ve=l("abandoned-truck"),Xe=l(" passage into the first passage. This is a little different than a normal link, because the text from the two passages appear "),Q=f("em"),Ze=l("together"),et=l(" rather than separately."),$e=d(),Ee=f("hr"),this.h()},l(e){s=u(e,"H2",{});var a=p(s);h=r(a,"Simple Reveal Links"),a.forEach(t),c=m(e),v=u(e,"P",{});var j=p(v);i=u(j,"STRONG",{});var V=p(i);w=r(V,"Reveal links"),V.forEach(t),$=r(j," are special kinds of links that you can use to show additional text in your story rather than moving to a whole new passage when the reader clicks the link. Try it out! Add the following line to a Twine passage:"),j.forEach(t),le=m(e),ee(E.$$.fragment,e),re=m(e),I=u(e,"P",{});var X=p(I);Re=r(X,"Test out the passage\u2014what do you notice about how the link works?"),X.forEach(t),ie=m(e),A=u(e,"H2",{});var at=p(A);Pe=r(at,"Why Use a Reveal Link?"),at.forEach(t),fe=m(e),D=u(e,"P",{});var st=p(D);He=r(st,"\u201CReveal\u201D links have the effect of making the reader feel like they are investigating something new. It also allows you to keep information on the screen for the reader to reference while still moving the story forward."),st.forEach(t),ue=m(e),b=u(e,"P",{});var Te=p(b);Le=r(Te,"You can see \u201Creveal\u201D links in action in "),z=u(Te,"EM",{});var ot=p(z);ee(T.$$.fragment,ot),ot.forEach(t),Se=r(Te," by Liza Daly."),Te.forEach(t),pe=m(e),M=u(e,"H2",{});var nt=p(M);Ie=r(nt,"Reveal a Passage"),nt.forEach(t),ce=m(e),x=u(e,"P",{});var xe=p(x);Ae=r(xe,"The simple \u201Creveal\u201D link above is good for small sections of text, but not as good for longer reveals. If you want to reveal a larger section of text, you might want to use the \u201Creveal\u201D link to show a "),F=u(xe,"EM",{});var lt=p(F);De=r(lt,"passage"),lt.forEach(t),Me=r(xe," instead of just some text."),xe.forEach(t),he=m(e),g=u(e,"P",{});var N=p(g);Ce=r(N,"First, create a new passage. I\u2019ve called mine "),G=u(N,"CODE",{});var rt=p(G);Oe=r(rt,"abandoned-truck"),rt.forEach(t),Ye=r(N,", but you can name yours whatever you like. Here\u2019s what my "),J=u(N,"CODE",{});var it=p(J);je=r(it,"abandoned-truck"),it.forEach(t),Ne=r(N," passage says:"),N.forEach(t),de=m(e),H=u(e,"PRE",{class:!0});var bt=p(H);bt.forEach(t),me=m(e),C=u(e,"P",{});var ft=p(C);qe=r(ft,"Now, return to your first passage and change the link \u201Creveal\u201D link so it looks like this:"),ft.forEach(t),ve=m(e),L=u(e,"PRE",{class:!0});var Tt=p(L);Tt.forEach(t),we=m(e),O=u(e,"P",{});var ut=p(O);ze=r(ut,"At this point you\u2019ll have two passages that aren\u2019t connected, like this:"),ut.forEach(t),_e=m(e),Y=u(e,"P",{});var pt=p(Y);ee(S.$$.fragment,pt),pt.forEach(t),ke=m(e),k=u(e,"P",{});var P=p(k);Fe=r(P,"You\u2019ll notice that I\u2019ve changed "),U=u(P,"CODE",{});var ct=p(U);Ge=r(ct,"text"),ct.forEach(t),Je=r(P," to say "),W=u(P,"CODE",{});var ht=p(W);Ue=r(ht,"passage"),ht.forEach(t),We=r(P," instead, and replaced the sentence describing the truck with the name of the new passage ("),K=u(P,"CODE",{});var dt=p(K);Ke=r(dt,"Abandoned Truck"),dt.forEach(t),Be=r(P,"). Test out your story!"),P.forEach(t),ge=m(e),ee(R.$$.fragment,e),ye=m(e),y=u(e,"P",{});var q=p(y);Qe=r(q,"The \u201Creveal\u201D link, once clicked, inserts the text from the "),B=u(q,"CODE",{});var mt=p(B);Ve=r(mt,"abandoned-truck"),mt.forEach(t),Xe=r(q," passage into the first passage. This is a little different than a normal link, because the text from the two passages appear "),Q=u(q,"EM",{});var vt=p(Q);Ze=r(vt,"together"),vt.forEach(t),et=r(q," rather than separately."),q.forEach(t),$e=m(e),Ee=u(e,"HR",{}),this.h()},h(){ne(H,"class","language-undefined"),ne(L,"class","language-undefined")},m(e,a){n(e,s,a),o(s,h),n(e,c,a),n(e,v,a),o(v,i),o(i,w),o(v,$),n(e,le,a),te(E,e,a),n(e,re,a),n(e,I,a),o(I,Re),n(e,ie,a),n(e,A,a),o(A,Pe),n(e,fe,a),n(e,D,a),o(D,He),n(e,ue,a),n(e,b,a),o(b,Le),o(b,z),te(T,z,null),o(b,Se),n(e,pe,a),n(e,M,a),o(M,Ie),n(e,ce,a),n(e,x,a),o(x,Ae),o(x,F),o(F,De),o(x,Me),n(e,he,a),n(e,g,a),o(g,Ce),o(g,G),o(G,Oe),o(g,Ye),o(g,J),o(J,je),o(g,Ne),n(e,de,a),n(e,H,a),H.innerHTML=$t,n(e,me,a),n(e,C,a),o(C,qe),n(e,ve,a),n(e,L,a),L.innerHTML=Et,n(e,we,a),n(e,O,a),o(O,ze),n(e,_e,a),n(e,Y,a),te(S,Y,null),n(e,ke,a),n(e,k,a),o(k,Fe),o(k,U),o(U,Ge),o(k,Je),o(k,W),o(W,Ue),o(k,We),o(k,K),o(K,Ke),o(k,Be),n(e,ge,a),te(R,e,a),n(e,ye,a),n(e,y,a),o(y,Qe),o(y,B),o(B,Ve),o(y,Xe),o(y,Q),o(Q,Ze),o(y,et),n(e,$e,a),n(e,Ee,a),be=!0},p(e,a){const j={};a&2&&(j.$$scope={dirty:a,ctx:e}),E.$set(j);const V={};a&2&&(V.$$scope={dirty:a,ctx:e}),T.$set(V);const X={};a&2&&(X.$$scope={dirty:a,ctx:e}),R.$set(X)},i(e){be||(ae(E.$$.fragment,e),ae(T.$$.fragment,e),ae(S.$$.fragment,e),ae(R.$$.fragment,e),be=!0)},o(e){se(E.$$.fragment,e),se(T.$$.fragment,e),se(S.$$.fragment,e),se(R.$$.fragment,e),be=!1},d(e){e&&t(s),e&&t(c),e&&t(v),e&&t(le),oe(E,e),e&&t(re),e&&t(I),e&&t(ie),e&&t(A),e&&t(fe),e&&t(D),e&&t(ue),e&&t(b),oe(T),e&&t(pe),e&&t(M),e&&t(ce),e&&t(x),e&&t(he),e&&t(g),e&&t(de),e&&t(H),e&&t(me),e&&t(C),e&&t(ve),e&&t(L),e&&t(we),e&&t(O),e&&t(_e),e&&t(Y),oe(S),e&&t(ke),e&&t(k),e&&t(ge),oe(R,e),e&&t(ye),e&&t(y),e&&t($e),e&&t(Ee)}}}function Ot(_){let s,h;const c=[_[0],gt];let v={$$slots:{default:[Ct]},$$scope:{ctx:_}};for(let i=0;i<c.length;i+=1)v=tt(v,c[i]);return s=new Lt({props:v}),{c(){Z(s.$$.fragment)},l(i){ee(s.$$.fragment,i)},m(i,w){te(s,i,w),h=!0},p(i,[w]){const $=w&1?Ht(c,[w&1&&wt(i[0]),w&0&&wt(gt)]):{};w&2&&($.$$scope={dirty:w,ctx:i}),s.$set($)},i(i){h||(ae(s.$$.fragment,i),h=!0)},o(i){se(s.$$.fragment,i),h=!1},d(i){oe(s,i)}}}const gt={title:"Reveal Text",author:"Jon Stapleton",short:"Learn how to create links that reveal new sections of text in your Twine passages.",description:'Sometimes, you might want to use a link to reveal a new section of a passage instead of transitioning to a new part of your story. "Reveal" links do exactly that--they allow you to use a link to reveal more information to the reader in the current passage. This tutorial covers how to create "reveal" links and section in your Twine story.',type:"tutorial",layout:"location"};function Yt(_,s,h){return _.$$set=c=>{h(0,s=tt(tt({},s),_t(c)))},s=_t(s),[s]}class zt extends xt{constructor(s){super(),Rt(this,s,Yt,Ot,Pt,{})}}export{zt as default,gt as metadata};