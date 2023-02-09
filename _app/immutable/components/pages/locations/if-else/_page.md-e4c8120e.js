import{S as yt,i as Et,s as $t,I as et,v as ne,w as ce,x as ie,J as bt,K as vt,f as ue,t as he,y as fe,L as wt,k as i,q as l,a as P,l as u,m as f,r,h as t,c as L,b as d,G as s,n as C,A as tt}from"../../../../chunks/index-28147552.js";import{S as Tt}from"../../../../chunks/Standalone-e39bc1fe.js";import{p as Ze,a as Ot}from"../../../../chunks/Standalone.svelte_svelte_type_style_lang-17c44177.js";function Ct($){let o,g=`<code class="language-treasure">hasKey: true
--

You see a wooden treasure chest secured by a heavy iron padlock.

[if hasKey]
The key in your pocket seems like it would fit the lock...

&gt; [[Unlock the chest-&gt;unlock]]

[unless hasKey]
You tug on the padlock. It holds fast--you probably need a key.

[continue]
&gt; [[Turn back-&gt;return]]</code>`,h,m='<code class="language-unlock">Nothing here yet!</code>',a,v='<code class="language-return">Nothing here yet!</code>';return{c(){o=i("pre"),h=i("pre"),a=i("pre"),this.h()},l(n){o=u(n,"PRE",{class:!0});var w=f(o);w.forEach(t),h=u(n,"PRE",{class:!0});var k=f(h);k.forEach(t),a=u(n,"PRE",{class:!0});var M=f(a);M.forEach(t),this.h()},h(){C(o,"class","language-treasure"),C(h,"class","language-unlock"),C(a,"class","language-return")},m(n,w){d(n,o,w),o.innerHTML=g,d(n,h,w),h.innerHTML=m,d(n,a,w),a.innerHTML=v},p:tt,d(n){n&&t(o),n&&t(h),n&&t(a)}}}function Ht($){let o,g=`<code class="language-treasure">hasKey: true
--

You see a wooden treasure chest secured by a heavy iron padlock.

[if hasKey]
The key in your pocket seems like it would fit the lock...

&gt; [[Unlock the chest-&gt;unlock]]

[else]
You tug on the padlock. It holds fast--you probably need a key.

[continue]
&gt; [[Turn back-&gt;return]]</code>`,h,m='<code class="language-unlock">Nothing here yet!</code>',a,v='<code class="language-return">Nothing here yet!</code>';return{c(){o=i("pre"),h=i("pre"),a=i("pre"),this.h()},l(n){o=u(n,"PRE",{class:!0});var w=f(o);w.forEach(t),h=u(n,"PRE",{class:!0});var k=f(h);k.forEach(t),a=u(n,"PRE",{class:!0});var M=f(a);M.forEach(t),this.h()},h(){C(o,"class","language-treasure"),C(h,"class","language-unlock"),C(a,"class","language-return")},m(n,w){d(n,o,w),o.innerHTML=g,d(n,h,w),h.innerHTML=m,d(n,a,w),a.innerHTML=v},p:tt,d(n){n&&t(o),n&&t(h),n&&t(a)}}}function Pt($){let o;return{c(){o=l("clicking here")},l(g){o=r(g,"clicking here")},m(g,h){d(g,o,h)},d(g){g&&t(o)}}}function Lt($){let o,g=`<code class="language-intro">hasKey: false
--

# The Locked Chest

&gt; [[Begin-&gt;return]]</code>`,h,m=`<code class="language-return">You find yourself in a dusty office. A large bookshelf against the looms over the room, and a dirty window looks out over an overgrown courtyard. A heavy wooden desk sits near the center of the room, its surface littered with loose papers. An old mariner&#39;s chest stands against the wall opposite the window.

&gt; [[Investigate the chest-&gt;treasure]]
&gt; [[Investigate the bookshelf-&gt;books]]
&gt; [[Look out the window-&gt;window]]
&gt; [[Investigate the desk-&gt;desk]]</code>`,a,v=`<code class="language-treasure">You see a wooden treasure chest secured by a heavy iron padlock.

[if hasKey]
The key in your pocket seems like it would fit the lock...

&gt; [[Unlock the chest-&gt;unlock]]

[else]
You tug on the padlock. It holds fast--you probably need a key.

[continue]
&gt; [[Turn back-&gt;return]]</code>`,n,w=`<code class="language-books">You peruse the spines of the many leather-bound tomes on the bookshelf. A thick layer of dust sits over everything--no one has been here for a long time.

&gt; [[Turn back-&gt;return]]</code>`,k,M=`<code class="language-window">You try to wipe the grime off of the window to get a better look outside, but it&#39;s no good--you&#39;ll have to head downstairs to get a closer look.

&gt; [[Turn back-&gt;return]]</code>`,H,B=`<code class="language-desk">hasKey: true
--

You shuffle through the papers and hear something heavy scrape against the wood. You uncover a heavy, rusty key.

&gt; [[Turn back-&gt;return]]</code>`,y,S=`<code class="language-unlock">The chest swings open, revealing its contents...

# The End</code>`;return{c(){o=i("pre"),h=i("pre"),a=i("pre"),n=i("pre"),k=i("pre"),H=i("pre"),y=i("pre"),this.h()},l(c){o=u(c,"PRE",{class:!0});var T=f(o);T.forEach(t),h=u(c,"PRE",{class:!0});var K=f(h);K.forEach(t),a=u(c,"PRE",{class:!0});var q=f(a);q.forEach(t),n=u(c,"PRE",{class:!0});var J=f(n);J.forEach(t),k=u(c,"PRE",{class:!0});var U=f(k);U.forEach(t),H=u(c,"PRE",{class:!0});var j=f(H);j.forEach(t),y=u(c,"PRE",{class:!0});var G=f(y);G.forEach(t),this.h()},h(){C(o,"class","language-intro"),C(h,"class","language-return"),C(a,"class","language-treasure"),C(n,"class","language-books"),C(k,"class","language-window"),C(H,"class","language-desk"),C(y,"class","language-unlock")},m(c,T){d(c,o,T),o.innerHTML=g,d(c,h,T),h.innerHTML=m,d(c,a,T),a.innerHTML=v,d(c,n,T),n.innerHTML=w,d(c,k,T),k.innerHTML=M,d(c,H,T),H.innerHTML=B,d(c,y,T),y.innerHTML=S},p:tt,d(c){c&&t(o),c&&t(h),c&&t(a),c&&t(n),c&&t(k),c&&t(H),c&&t(y)}}}function Yt($){let o,g,h,m,a,v,n,w,k,M,H,B,y,S,c,T,K,q,J,U,j,G,z,be,Te,F,Oe,Ce,pe,de,ge,A,He,me,N,Pe,_e,D,ve,b,Le,Q,Ye,Me,V,Re,De,W,Ie,xe,X,Ke,Ue,we,_,Be,Z,Se,Ae,ee,Ne,qe,te,Je,je,se,Ge,ze,oe,Fe,Qe,ae,Ve,We,I,Xe,ke,x,ye,Ee,$e;return y=new Ze({props:{title:"If-Unless",src:"/if-unless-starter.png",tabs:!0,$$slots:{default:[Ct]},$$scope:{ctx:$}}}),D=new Ze({props:{title:"If-Else",src:"/if-unless-starter.png",tabs:!0,$$slots:{default:[Ht]},$$scope:{ctx:$}}}),I=new Ot({props:{href:"/examples/the-locked-chest",$$slots:{default:[Pt]},$$scope:{ctx:$}}}),x=new Ze({props:{title:"The Locked Chest",src:"/the-locked-chest.png",tabs:!0,$$slots:{default:[Lt]},$$scope:{ctx:$}}}),{c(){o=i("h2"),g=l("One of Two Options with \u201CUnless\u201D Blocks"),h=P(),m=i("p"),a=l("Consider the following passage, which uses "),v=i("code"),n=l("[if ]"),w=l(" and "),k=i("code"),M=l("[unless ]"),H=l(" to show one of two sections based on a variable:"),B=P(),ne(y.$$.fragment),S=P(),c=i("p"),T=l("The way I\u2019ve written this passage ensures that the computer "),K=i("em"),q=l("either"),J=l(" display the "),U=i("code"),j=l("Unlock the chest"),G=l(" option "),z=i("em"),be=l("or"),Te=l(" the message "),F=i("code"),Oe=l("You tug on the..."),Ce=l("; never both."),pe=P(),de=i("hr"),ge=P(),A=i("h2"),He=l("One of Two Options with \u201CElse\u201D Blocks"),me=P(),N=i("p"),Pe=l("\u201CElse\u201D blocks are another way to accomplish this task in a way that might be easier to read:"),_e=P(),ne(D.$$.fragment),ve=P(),b=i("p"),Le=l("There isn\u2019t a functional difference between using "),Q=i("code"),Ye=l("[if ]"),Me=l(" and "),V=i("code"),Re=l("[unless ]"),De=l(" versus "),W=i("code"),Ie=l("[if ]"),xe=l(" and "),X=i("code"),Ke=l("[else]"),Ue=l("\u2014use whichever one makes the most sense to you."),we=P(),_=i("p"),Be=l("Here\u2019s an example of a story that uses the "),Z=i("code"),Se=l("if"),Ae=l(" and "),ee=i("code"),Ne=l("else"),qe=l(" code above\u2014the first time the reader visits the "),te=i("code"),Je=l("treasure"),je=l(" passage, the variable called "),se=i("code"),Ge=l("hasKey"),ze=l(" is "),oe=i("code"),Fe=l("false"),Qe=l(" which means the option to \u201Cunlock the chest\u201D is hidden from them. They need to visit other passages until they discover the key hidden in the "),ae=i("code"),Ve=l("desk"),We=l(" passage. You can play through the whole story by "),ne(I.$$.fragment),Xe=l("."),ke=P(),ne(x.$$.fragment),ye=P(),Ee=i("hr")},l(e){o=u(e,"H2",{});var p=f(o);g=r(p,"One of Two Options with \u201CUnless\u201D Blocks"),p.forEach(t),h=L(e),m=u(e,"P",{});var R=f(m);a=r(R,"Consider the following passage, which uses "),v=u(R,"CODE",{});var le=f(v);n=r(le,"[if ]"),le.forEach(t),w=r(R," and "),k=u(R,"CODE",{});var re=f(k);M=r(re,"[unless ]"),re.forEach(t),H=r(R," to show one of two sections based on a variable:"),R.forEach(t),B=L(e),ce(y.$$.fragment,e),S=L(e),c=u(e,"P",{});var O=f(c);T=r(O,"The way I\u2019ve written this passage ensures that the computer "),K=u(O,"EM",{});var st=f(K);q=r(st,"either"),st.forEach(t),J=r(O," display the "),U=u(O,"CODE",{});var ot=f(U);j=r(ot,"Unlock the chest"),ot.forEach(t),G=r(O," option "),z=u(O,"EM",{});var at=f(z);be=r(at,"or"),at.forEach(t),Te=r(O," the message "),F=u(O,"CODE",{});var lt=f(F);Oe=r(lt,"You tug on the..."),lt.forEach(t),Ce=r(O,"; never both."),O.forEach(t),pe=L(e),de=u(e,"HR",{}),ge=L(e),A=u(e,"H2",{});var rt=f(A);He=r(rt,"One of Two Options with \u201CElse\u201D Blocks"),rt.forEach(t),me=L(e),N=u(e,"P",{});var nt=f(N);Pe=r(nt,"\u201CElse\u201D blocks are another way to accomplish this task in a way that might be easier to read:"),nt.forEach(t),_e=L(e),ce(D.$$.fragment,e),ve=L(e),b=u(e,"P",{});var Y=f(b);Le=r(Y,"There isn\u2019t a functional difference between using "),Q=u(Y,"CODE",{});var ct=f(Q);Ye=r(ct,"[if ]"),ct.forEach(t),Me=r(Y," and "),V=u(Y,"CODE",{});var it=f(V);Re=r(it,"[unless ]"),it.forEach(t),De=r(Y," versus "),W=u(Y,"CODE",{});var ut=f(W);Ie=r(ut,"[if ]"),ut.forEach(t),xe=r(Y," and "),X=u(Y,"CODE",{});var ht=f(X);Ke=r(ht,"[else]"),ht.forEach(t),Ue=r(Y,"\u2014use whichever one makes the most sense to you."),Y.forEach(t),we=L(e),_=u(e,"P",{});var E=f(_);Be=r(E,"Here\u2019s an example of a story that uses the "),Z=u(E,"CODE",{});var ft=f(Z);Se=r(ft,"if"),ft.forEach(t),Ae=r(E," and "),ee=u(E,"CODE",{});var pt=f(ee);Ne=r(pt,"else"),pt.forEach(t),qe=r(E," code above\u2014the first time the reader visits the "),te=u(E,"CODE",{});var dt=f(te);Je=r(dt,"treasure"),dt.forEach(t),je=r(E," passage, the variable called "),se=u(E,"CODE",{});var gt=f(se);Ge=r(gt,"hasKey"),gt.forEach(t),ze=r(E," is "),oe=u(E,"CODE",{});var mt=f(oe);Fe=r(mt,"false"),mt.forEach(t),Qe=r(E," which means the option to \u201Cunlock the chest\u201D is hidden from them. They need to visit other passages until they discover the key hidden in the "),ae=u(E,"CODE",{});var _t=f(ae);Ve=r(_t,"desk"),_t.forEach(t),We=r(E," passage. You can play through the whole story by "),ce(I.$$.fragment,E),Xe=r(E,"."),E.forEach(t),ke=L(e),ce(x.$$.fragment,e),ye=L(e),Ee=u(e,"HR",{})},m(e,p){d(e,o,p),s(o,g),d(e,h,p),d(e,m,p),s(m,a),s(m,v),s(v,n),s(m,w),s(m,k),s(k,M),s(m,H),d(e,B,p),ie(y,e,p),d(e,S,p),d(e,c,p),s(c,T),s(c,K),s(K,q),s(c,J),s(c,U),s(U,j),s(c,G),s(c,z),s(z,be),s(c,Te),s(c,F),s(F,Oe),s(c,Ce),d(e,pe,p),d(e,de,p),d(e,ge,p),d(e,A,p),s(A,He),d(e,me,p),d(e,N,p),s(N,Pe),d(e,_e,p),ie(D,e,p),d(e,ve,p),d(e,b,p),s(b,Le),s(b,Q),s(Q,Ye),s(b,Me),s(b,V),s(V,Re),s(b,De),s(b,W),s(W,Ie),s(b,xe),s(b,X),s(X,Ke),s(b,Ue),d(e,we,p),d(e,_,p),s(_,Be),s(_,Z),s(Z,Se),s(_,Ae),s(_,ee),s(ee,Ne),s(_,qe),s(_,te),s(te,Je),s(_,je),s(_,se),s(se,Ge),s(_,ze),s(_,oe),s(oe,Fe),s(_,Qe),s(_,ae),s(ae,Ve),s(_,We),ie(I,_,null),s(_,Xe),d(e,ke,p),ie(x,e,p),d(e,ye,p),d(e,Ee,p),$e=!0},p(e,p){const R={};p&2&&(R.$$scope={dirty:p,ctx:e}),y.$set(R);const le={};p&2&&(le.$$scope={dirty:p,ctx:e}),D.$set(le);const re={};p&2&&(re.$$scope={dirty:p,ctx:e}),I.$set(re);const O={};p&2&&(O.$$scope={dirty:p,ctx:e}),x.$set(O)},i(e){$e||(ue(y.$$.fragment,e),ue(D.$$.fragment,e),ue(I.$$.fragment,e),ue(x.$$.fragment,e),$e=!0)},o(e){he(y.$$.fragment,e),he(D.$$.fragment,e),he(I.$$.fragment,e),he(x.$$.fragment,e),$e=!1},d(e){e&&t(o),e&&t(h),e&&t(m),e&&t(B),fe(y,e),e&&t(S),e&&t(c),e&&t(pe),e&&t(de),e&&t(ge),e&&t(A),e&&t(me),e&&t(N),e&&t(_e),fe(D,e),e&&t(ve),e&&t(b),e&&t(we),e&&t(_),fe(I),e&&t(ke),fe(x,e),e&&t(ye),e&&t(Ee)}}}function Mt($){let o,g;const h=[$[0],kt];let m={$$slots:{default:[Yt]},$$scope:{ctx:$}};for(let a=0;a<h.length;a+=1)m=et(m,h[a]);return o=new Tt({props:m}),{c(){ne(o.$$.fragment)},l(a){ce(o.$$.fragment,a)},m(a,v){ie(o,a,v),g=!0},p(a,[v]){const n=v&1?bt(h,[v&1&&vt(a[0]),v&0&&vt(kt)]):{};v&2&&(n.$$scope={dirty:v,ctx:a}),o.$set(n)},i(a){g||(ue(o.$$.fragment,a),g=!0)},o(a){he(o.$$.fragment,a),g=!1},d(a){fe(o,a)}}}const kt={title:"If-Else Blocks",author:"Jon Stapleton",short:'Use "else" blocks to show or hide two lines of text.',description:'If statements allow you write passages where events unfold differently based on the value of variables, which are invisible to the reader. Sometimes you might want the passage to offer one of two mutually exclusive options--a message that says "the key turns in the lock", or a message that says "this is the wrong key...", for example. You can accomplish this with "if" and "unless" blocks, but the Chapbook format of Twine also offers "else" blocks, which accomplish something similar.',type:"tutorial",layout:"location"};function Rt($,o,g){return $.$$set=h=>{g(0,o=et(et({},o),wt(h)))},o=wt(o),[o]}class Kt extends yt{constructor(o){super(),Et(this,o,Rt,Mt,$t,{})}}export{Kt as default,kt as metadata};
