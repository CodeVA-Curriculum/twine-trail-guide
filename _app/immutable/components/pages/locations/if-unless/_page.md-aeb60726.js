import{S as al,i as sl,s as ol,I as ao,v as I,w as P,x as H,J as ll,K as Zo,f as M,t as O,y as C,L as el,k as n,q as o,a as d,l as i,m as f,r as l,h as a,c as v,b as p,G as t,n as V,A as me}from"../../../../chunks/index-28147552.js";import{S as rl}from"../../../../chunks/Standalone-e39bc1fe.js";import{A as nl}from"../../../../chunks/Aside-c5d6848f.js";import{p as he,c as il,a as so,i as fl}from"../../../../chunks/Standalone.svelte_svelte_type_style_lang-17c44177.js";function cl(_){let s;return{c(){s=o("Variable Basics")},l(h){s=l(h,"Variable Basics")},m(h,c){p(h,s,c)},d(h){h&&a(s)}}}function pl(_){let s,h,c,u,m,g;return u=new so({props:{href:"/locations/variable-basics",$$slots:{default:[cl]},$$scope:{ctx:_}}}),{c(){s=n("p"),h=o("If you aren\u2019t sure what a \u201Cvariable\u201D is and the syntax in the passage examples above is confusing, you might want to check out the "),c=n("em"),I(u.$$.fragment),m=o(" tutorial, which explains how to create and modify variables.")},l($){s=i($,"P",{});var w=f(s);h=l(w,"If you aren\u2019t sure what a \u201Cvariable\u201D is and the syntax in the passage examples above is confusing, you might want to check out the "),c=i(w,"EM",{});var b=f(c);P(u.$$.fragment,b),b.forEach(a),m=l(w," tutorial, which explains how to create and modify variables."),w.forEach(a)},m($,w){p($,s,w),t(s,h),t(s,c),H(u,c,null),t(s,m),g=!0},p($,w){const b={};w&2&&(b.$$scope={dirty:w,ctx:$}),u.$set(b)},i($){g||(M(u.$$.fragment,$),g=!0)},o($){O(u.$$.fragment,$),g=!1},d($){$&&a(s),C(u)}}}function ul(_){let s,h=`<code class="language-undefined">exampleVar: false
--

Here&#39;s a passage...

[if exampleVar]
...and here&#39;s a hidden message</code>`;return{c(){s=n("pre"),this.h()},l(c){s=i(c,"PRE",{class:!0});var u=f(s);u.forEach(a),this.h()},h(){V(s,"class","language-undefined")},m(c,u){p(c,s,u),s.innerHTML=h},p:me,d(c){c&&a(s)}}}function hl(_){let s,h=`<code class="language-undefined">exampleVar: true
--

Here&#39;s a passage...

[if exampleVar]
...and here&#39;s a hidden message</code>`;return{c(){s=n("pre"),this.h()},l(c){s=i(c,"PRE",{class:!0});var u=f(s);u.forEach(a),this.h()},h(){V(s,"class","language-undefined")},m(c,u){p(c,s,u),s.innerHTML=h},p:me,d(c){c&&a(s)}}}function ml(_){let s,h=`<code class="language-undefined">v: false
--

Here&#39;s another passage...

[unless v]
...and here&#39;s the secret message.</code>`;return{c(){s=n("pre"),this.h()},l(c){s=i(c,"PRE",{class:!0});var u=f(s);u.forEach(a),this.h()},h(){V(s,"class","language-undefined")},m(c,u){p(c,s,u),s.innerHTML=h},p:me,d(c){c&&a(s)}}}function dl(_){let s,h=`<code class="language-undefined">var: true
--

Here&#39;s another passage...

[unless var]
...and here&#39;s the secret message.</code>`;return{c(){s=n("pre"),this.h()},l(c){s=i(c,"PRE",{class:!0});var u=f(s);u.forEach(a),this.h()},h(){V(s,"class","language-undefined")},m(c,u){p(c,s,u),s.innerHTML=h},p:me,d(c){c&&a(s)}}}function vl(_){let s,h;return s=new he({props:{title:"Unless Example",src:"/simple-if-example.png",$$slots:{default:[dl]},$$scope:{ctx:_}}}),{c(){I(s.$$.fragment)},l(c){P(s.$$.fragment,c)},m(c,u){H(s,c,u),h=!0},p(c,u){const m={};u&2&&(m.$$scope={dirty:u,ctx:c}),s.$set(m)},i(c){h||(M(s.$$.fragment,c),h=!0)},o(c){O(s.$$.fragment,c),h=!1},d(c){C(s,c)}}}function _l(_){let s;return{c(){s=o("clicking here")},l(h){s=l(h,"clicking here")},m(h,c){p(h,s,c)},d(h){h&&a(s)}}}function $l(_){let s,h=`<code class="language-intro">key: false
--

# The Locked Door

A story demonstrating &quot;if&quot; blocks

&gt; [[Continue-&gt;door]]</code>`,c,u=`<code class="language-door">You see a large, wooden door on heavy hinges with a big, iron padlock holding it shut.

&gt; [[Search the foyer-&gt;search]]
[if key]
&gt; [[Try the key in the padlock-&gt;unlock]]</code>`,m,g=`<code class="language-search">key: true
--

You comb the room, and as you step across the thick, dusty carpet you feel something hard under your shoe. You pull back the carpet, and see a heavy wrought-iron key sitting on wood floor below.

&gt; [[Go check the door-&gt;door]]</code>`,$,w='<code class="language-unlock">The door swings slowly open, creaking on its rusty hinges...</code>';return{c(){s=n("pre"),c=n("pre"),m=n("pre"),$=n("pre"),this.h()},l(b){s=i(b,"PRE",{class:!0});var q=f(s);q.forEach(a),c=i(b,"PRE",{class:!0});var Me=f(c);Me.forEach(a),m=i(b,"PRE",{class:!0});var de=f(m);de.forEach(a),$=i(b,"PRE",{class:!0});var U=f($);U.forEach(a),this.h()},h(){V(s,"class","language-intro"),V(c,"class","language-door"),V(m,"class","language-search"),V($,"class","language-unlock")},m(b,q){p(b,s,q),s.innerHTML=h,p(b,c,q),c.innerHTML=u,p(b,m,q),m.innerHTML=g,p(b,$,q),$.innerHTML=w},p:me,d(b){b&&a(s),b&&a(c),b&&a(m),b&&a($)}}}function bl(_){let s,h=`<code class="language-undefined">key: false
--

You see a large, wooden door on heavy hinges with a big, iron padlock holding it shut.

[if key]
The key seems to fit into the padlock...

&gt; [[Try the key in the padlock-&gt;unlock]]
[continue]
&gt; [[Search the foyer-&gt;search]]</code>`;return{c(){s=n("pre"),this.h()},l(c){s=i(c,"PRE",{class:!0});var u=f(s);u.forEach(a),this.h()},h(){V(s,"class","language-undefined")},m(c,u){p(c,s,u),s.innerHTML=h},p:me,d(c){c&&a(s)}}}function gl(_){let s;return{c(){s=o("embedded passage")},l(h){s=l(h,"embedded passage")},m(h,c){p(h,s,c)},d(h){h&&a(s)}}}function El(_){let s,h=`<code class="language-main">toReveal: false
--
A passage.

[if toReveal]
&#123;embed passage: &#39;embedded&#39;&#125;

[continue]
There&#39;s a hidden message... change the variable to &#96;true&#96;!</code>`,c,u=`<code class="language-embedded">This is hidden...

I can even include links:

&gt; [[A link]]
&gt; [[Another link]]</code>`;return{c(){s=n("pre"),c=n("pre"),this.h()},l(m){s=i(m,"PRE",{class:!0});var g=f(s);g.forEach(a),c=i(m,"PRE",{class:!0});var $=f(c);$.forEach(a),this.h()},h(){V(s,"class","language-main"),V(c,"class","language-embedded")},m(m,g){p(m,s,g),s.innerHTML=h,p(m,c,g),c.innerHTML=u},p:me,d(m){m&&a(s),m&&a(c)}}}function kl(_){let s,h,c,u,m,g,$,w,b,q,Me,de,U,xt,N,Tt,z,la,Oe,ra,na,It,L,J,ia,Ce,fa,ca,Le,pa,ua,ve,ha,De,ma,da,y,va,Re,_a,$a,Se,ba,ga,Ae,Ea,ka,Be,wa,ya,Ve,xa,Ta,Ia,qe,Pa,Pt,D,Ha,Ue,Ma,Oa,Ye,Ca,La,Ge,Da,Ra,Ht,Q,Mt,R,Sa,We,Aa,Ba,je,Va,qa,Fe,Ua,Ya,Ot,Ct,Lt,_e,Ga,Dt,x,Wa,Ke,ja,Fa,Ne,Ka,Na,ze,za,Ja,Je,Qa,Xa,Rt,X,j,Za,Qe,es,ts,Xe,as,ss,os,F,ls,Ze,rs,ns,et,is,fs,St,$e,cs,At,Z,Bt,be,ee,tt,ps,us,at,hs,ms,Vt,te,qt,Ut,Yt,ge,ds,Gt,Ee,vs,Wt,ke,st,_s,jt,E,$s,ot,bs,gs,lt,Es,ks,rt,ws,ys,nt,xs,Ts,it,Is,Ps,ft,Hs,Ms,ct,Os,Cs,ae,Ls,Ft,we,pe,Kt,se,Nt,zt,Jt,ye,Ds,Qt,S,Rs,pt,Ss,As,ut,Bs,Vs,ht,qs,Us,Xt,oe,Zt,Y,Ys,mt,Gs,Ws,dt,js,Fs,ea,xe,Ks,ta,T,Ns,vt,zs,Js,_t,Qs,Xs,$t,Zs,eo,le,to,aa,re,sa;return U=new nl({props:{$$slots:{default:[pl]},$$scope:{ctx:_}}}),N=new he({props:{title:"If Example",src:"/simple-if-example.png",$$slots:{default:[ul]},$$scope:{ctx:_}}}),Q=new he({props:{title:"If Example",src:"/simple-if-true.png",$$slots:{default:[hl]},$$scope:{ctx:_}}}),Z=new he({props:{title:"Unless Example",src:"/simple-if-true.png",$$slots:{default:[ml]},$$scope:{ctx:_}}}),te=new il({props:{title:"Reveal Solution",$$slots:{default:[vl]},$$scope:{ctx:_}}}),ae=new so({props:{href:"/examples/the-locked-door",$$slots:{default:[_l]},$$scope:{ctx:_}}}),pe=new fl({props:{src:"/the-locked-door-demo.gif",alt:"A GIF of the Twine story below, which displays a Twine story where the reader must find a key that unlocks a door"}}),se=new he({props:{title:"The Locked Door",src:"/the-locked-door.png",tabs:!0,$$slots:{default:[$l]},$$scope:{ctx:_}}}),oe=new he({props:{title:"Continue Block Example",src:"/continue-block-example.png",$$slots:{default:[bl]},$$scope:{ctx:_}}}),le=new so({props:{href:"/locations/embedding-passages",$$slots:{default:[gl]},$$scope:{ctx:_}}}),re=new he({props:{title:"If Block w/ Embedded Passage",tabs:!0,$$slots:{default:[El]},$$scope:{ctx:_}}}),{c(){s=n("h2"),h=o("Simple \u201CIf\u201D Blocks"),c=d(),u=n("p"),m=o("An \u201Cif\u201D block directs the computer to "),g=n("em"),$=o("hide"),w=o(" or "),b=n("em"),q=o("reveal"),Me=o(" a given line of text based on the value of a variable. To create an \u201Cif\u201D block, copy the example below into a new passage:"),de=d(),I(U.$$.fragment),xt=d(),I(N.$$.fragment),Tt=d(),z=n("p"),la=o("Test it out! Your results should match the image above\u2014"),Oe=n("strong"),ra=o("the last two lines don\u2019t appear in the passage!"),na=o(" Here\u2019s how the computer interprets the passage above, step by step:"),It=d(),L=n("ol"),J=n("li"),ia=o("Set the variable "),Ce=n("code"),fa=o("exampleVar"),ca=o(" to a value of "),Le=n("code"),pa=o("false"),ua=d(),ve=n("li"),ha=o("Display the text "),De=n("code"),ma=o("Here's a passage..."),da=d(),y=n("li"),va=o("An \u201Cif\u201D block! First, check the value of the variable "),Re=n("code"),_a=o("exampleVar"),$a=o(`. Then\u2026
a. If it has a value of `),Se=n("code"),ba=o("true"),ga=o(", "),Ae=n("em"),Ea=o("display"),ka=o(` the next line
b. If it has a value of `),Be=n("code"),wa=o("false"),ya=o(", "),Ve=n("em"),xa=o("skip"),Ta=o(" the next line"),Ia=d(),qe=n("li"),Pa=o("End of the passage\u2014nothing else to do!"),Pt=d(),D=n("p"),Ha=o("In the example above, the variable called "),Ue=n("code"),Ma=o("exampleVar"),Oa=o(" has a value of "),Ye=n("code"),Ca=o("false"),La=o(", causing the computer to "),Ge=n("em"),Da=o("skip"),Ra=o(" the line after the \u201Cif\u201D block. However, if you go back into the passage and modify it like so:"),Ht=d(),I(Q.$$.fragment),Mt=d(),R=n("p"),Sa=o("\u2026now the hidden message is revealed! The only difference between the first example and the new example is the value of the "),We=n("code"),Aa=o("exampleVar"),Ba=o(" variable\u2014I\u2019ve set it to "),je=n("code"),Va=o("true"),qa=o(" this time instead of "),Fe=n("code"),Ua=o("false"),Ya=o(". That\u2019s an \u201Cif\u201D block!"),Ot=d(),Ct=n("hr"),Lt=d(),_e=n("h2"),Ga=o("\u201CUnless\u201D Blocks"),Dt=d(),x=n("p"),Wa=o("An \u201Cunless\u201D block is sort of like the opposite of an \u201Cif\u201D block\u2014instead of directing the computer to "),Ke=n("em"),ja=o("skip"),Fa=o(" the subsequent line when the variable is "),Ne=n("code"),Ka=o("false"),Na=o(" and "),ze=n("em"),za=o("display"),Ja=o(" the line when the variable is "),Je=n("code"),Qa=o("true"),Xa=o(", it does the reverse:"),Rt=d(),X=n("ul"),j=n("li"),Za=o("If the variable is "),Qe=n("code"),es=o("false"),ts=o(", "),Xe=n("em"),as=o("display"),ss=o(" the following line"),os=d(),F=n("li"),ls=o("If the variable is "),Ze=n("code"),rs=o("true"),ns=o(", "),et=n("em"),is=o("skip"),fs=o(" the following line"),St=d(),$e=n("p"),cs=o("Here\u2019s an example:"),At=d(),I(Z.$$.fragment),Bt=d(),be=n("blockquote"),ee=n("p"),tt=n("strong"),ps=o("Practice:"),us=o(" What would you change about the example above to make the computer "),at=n("em"),hs=o("skip"),ms=o(" the line after the \u201Cunless\u201D block instead of displaying it? Once you\u2019ve made your guess, click the \u201CReveal Solution\u201D button below to see a working example:"),Vt=d(),I(te.$$.fragment),qt=d(),Ut=n("hr"),Yt=d(),ge=n("h2"),ds=o("What\u2019s The Point?"),Gt=d(),Ee=n("p"),vs=o("You might be asking yourself:"),Wt=d(),ke=n("blockquote"),st=n("p"),_s=o("\u201CWhy would I use \u201Cif\u201D or \u201Cunless\u201D blocks? It seems needlessly fussy; if I want to omit text from a passage, I just won\u2019t type it!\u201D"),jt=d(),E=n("p"),$s=o("This is absolutely the case, but remember\u2014you can have the computer "),ot=n("em"),bs=o("modify the value of variables"),gs=o(" as the reader visits passages in your story. The real power of conditional blocks like "),lt=n("code"),Es=o("[if ]"),ks=o(" and "),rt=n("code"),ws=o("[unless ]"),ys=o(" becomes more clear when your story "),nt=n("em"),xs=o("modifies"),Ts=o(" the variables, and directs the reader to revisit the passage. Here\u2019s an example with three passages\u2014one that "),it=n("em"),Is=o("sets"),Ps=o(" the initial value of a variable, one that "),ft=n("em"),Hs=o("uses"),Ms=o(" the variable in an \u201Cif\u201D block, and one that "),ct=n("em"),Os=o("modifies"),Cs=o(" the variable, unlocking a new option in the second passage! You can play the story by "),I(ae.$$.fragment),Ls=o(" if you\u2019d like."),Ft=d(),we=n("p"),I(pe.$$.fragment),Kt=d(),I(se.$$.fragment),Nt=d(),zt=n("hr"),Jt=d(),ye=n("h2"),Ds=o("\u201CContinue\u201D Blocks"),Qt=d(),S=n("p"),Rs=o("If you want to use an "),pt=n("code"),Ss=o("[if ]"),As=o(" block "),ut=n("em"),Bs=o("before"),Vs=o(" a line that should appear in every passage, you can use the "),ht=n("code"),qs=o("[continue]"),Us=o(" block:"),Xt=d(),I(oe.$$.fragment),Zt=d(),Y=n("p"),Ys=o("Using "),mt=n("code"),Gs=o("[continue]"),Ws=o(" blocks allows you to sort of \u201Cinsert\u201D hidden sections of text "),dt=n("em"),js=o("between"),Fs=o(" the sections of code that the computer will always display."),ea=d(),xe=n("h2"),Ks=o("Longer \u201CIf\u201D & \u201CUnless\u201D Blocks"),ta=d(),T=n("p"),Ns=o("\u201CIf\u201D and \u201Cunless\u201D blocks are really powerful, but they can sometimes make your passages difficult to read. Part of using "),vt=n("strong"),zs=o("conditional control structures"),Js=o(" like \u201Cif\u201D, \u201Cunless\u201D, and \u201Ccontinue\u201D blocks is being able to "),_t=n("em"),Qs=o("trace"),Xs=o(" the passage and "),$t=n("em"),Zs=o("predict"),eo=o(" what the passage will cause the computer to show to the reader given the variables the conditional control structure relies on. If you want to hide or reveal a larger amount of text, it can be easier to read the passage if you use an "),I(le.$$.fragment),to=o(":"),aa=d(),I(re.$$.fragment)},l(e){s=i(e,"H2",{});var r=f(s);h=l(r,"Simple \u201CIf\u201D Blocks"),r.forEach(a),c=v(e),u=i(e,"P",{});var K=f(u);m=l(K,"An \u201Cif\u201D block directs the computer to "),g=i(K,"EM",{});var bt=f(g);$=l(bt,"hide"),bt.forEach(a),w=l(K," or "),b=i(K,"EM",{});var gt=f(b);q=l(gt,"reveal"),gt.forEach(a),Me=l(K," a given line of text based on the value of a variable. To create an \u201Cif\u201D block, copy the example below into a new passage:"),K.forEach(a),de=v(e),P(U.$$.fragment,e),xt=v(e),P(N.$$.fragment,e),Tt=v(e),z=i(e,"P",{});var ue=f(z);la=l(ue,"Test it out! Your results should match the image above\u2014"),Oe=i(ue,"STRONG",{});var Et=f(Oe);ra=l(Et,"the last two lines don\u2019t appear in the passage!"),Et.forEach(a),na=l(ue," Here\u2019s how the computer interprets the passage above, step by step:"),ue.forEach(a),It=v(e),L=i(e,"OL",{});var B=f(L);J=i(B,"LI",{});var ne=f(J);ia=l(ne,"Set the variable "),Ce=i(ne,"CODE",{});var kt=f(Ce);fa=l(kt,"exampleVar"),kt.forEach(a),ca=l(ne," to a value of "),Le=i(ne,"CODE",{});var wt=f(Le);pa=l(wt,"false"),wt.forEach(a),ne.forEach(a),ua=v(B),ve=i(B,"LI",{});var Te=f(ve);ha=l(Te,"Display the text "),De=i(Te,"CODE",{});var oo=f(De);ma=l(oo,"Here's a passage..."),oo.forEach(a),Te.forEach(a),da=v(B),y=i(B,"LI",{});var A=f(y);va=l(A,"An \u201Cif\u201D block! First, check the value of the variable "),Re=i(A,"CODE",{});var lo=f(Re);_a=l(lo,"exampleVar"),lo.forEach(a),$a=l(A,`. Then\u2026
a. If it has a value of `),Se=i(A,"CODE",{});var ro=f(Se);ba=l(ro,"true"),ro.forEach(a),ga=l(A,", "),Ae=i(A,"EM",{});var no=f(Ae);Ea=l(no,"display"),no.forEach(a),ka=l(A,` the next line
b. If it has a value of `),Be=i(A,"CODE",{});var io=f(Be);wa=l(io,"false"),io.forEach(a),ya=l(A,", "),Ve=i(A,"EM",{});var fo=f(Ve);xa=l(fo,"skip"),fo.forEach(a),Ta=l(A," the next line"),A.forEach(a),Ia=v(B),qe=i(B,"LI",{});var co=f(qe);Pa=l(co,"End of the passage\u2014nothing else to do!"),co.forEach(a),B.forEach(a),Pt=v(e),D=i(e,"P",{});var ie=f(D);Ha=l(ie,"In the example above, the variable called "),Ue=i(ie,"CODE",{});var po=f(Ue);Ma=l(po,"exampleVar"),po.forEach(a),Oa=l(ie," has a value of "),Ye=i(ie,"CODE",{});var uo=f(Ye);Ca=l(uo,"false"),uo.forEach(a),La=l(ie,", causing the computer to "),Ge=i(ie,"EM",{});var ho=f(Ge);Da=l(ho,"skip"),ho.forEach(a),Ra=l(ie," the line after the \u201Cif\u201D block. However, if you go back into the passage and modify it like so:"),ie.forEach(a),Ht=v(e),P(Q.$$.fragment,e),Mt=v(e),R=i(e,"P",{});var fe=f(R);Sa=l(fe,"\u2026now the hidden message is revealed! The only difference between the first example and the new example is the value of the "),We=i(fe,"CODE",{});var mo=f(We);Aa=l(mo,"exampleVar"),mo.forEach(a),Ba=l(fe," variable\u2014I\u2019ve set it to "),je=i(fe,"CODE",{});var vo=f(je);Va=l(vo,"true"),vo.forEach(a),qa=l(fe," this time instead of "),Fe=i(fe,"CODE",{});var _o=f(Fe);Ua=l(_o,"false"),_o.forEach(a),Ya=l(fe,". That\u2019s an \u201Cif\u201D block!"),fe.forEach(a),Ot=v(e),Ct=i(e,"HR",{}),Lt=v(e),_e=i(e,"H2",{});var $o=f(_e);Ga=l($o,"\u201CUnless\u201D Blocks"),$o.forEach(a),Dt=v(e),x=i(e,"P",{});var G=f(x);Wa=l(G,"An \u201Cunless\u201D block is sort of like the opposite of an \u201Cif\u201D block\u2014instead of directing the computer to "),Ke=i(G,"EM",{});var bo=f(Ke);ja=l(bo,"skip"),bo.forEach(a),Fa=l(G," the subsequent line when the variable is "),Ne=i(G,"CODE",{});var go=f(Ne);Ka=l(go,"false"),go.forEach(a),Na=l(G," and "),ze=i(G,"EM",{});var Eo=f(ze);za=l(Eo,"display"),Eo.forEach(a),Ja=l(G," the line when the variable is "),Je=i(G,"CODE",{});var ko=f(Je);Qa=l(ko,"true"),ko.forEach(a),Xa=l(G,", it does the reverse:"),G.forEach(a),Rt=v(e),X=i(e,"UL",{});var oa=f(X);j=i(oa,"LI",{});var Ie=f(j);Za=l(Ie,"If the variable is "),Qe=i(Ie,"CODE",{});var wo=f(Qe);es=l(wo,"false"),wo.forEach(a),ts=l(Ie,", "),Xe=i(Ie,"EM",{});var yo=f(Xe);as=l(yo,"display"),yo.forEach(a),ss=l(Ie," the following line"),Ie.forEach(a),os=v(oa),F=i(oa,"LI",{});var Pe=f(F);ls=l(Pe,"If the variable is "),Ze=i(Pe,"CODE",{});var xo=f(Ze);rs=l(xo,"true"),xo.forEach(a),ns=l(Pe,", "),et=i(Pe,"EM",{});var To=f(et);is=l(To,"skip"),To.forEach(a),fs=l(Pe," the following line"),Pe.forEach(a),oa.forEach(a),St=v(e),$e=i(e,"P",{});var Io=f($e);cs=l(Io,"Here\u2019s an example:"),Io.forEach(a),At=v(e),P(Z.$$.fragment,e),Bt=v(e),be=i(e,"BLOCKQUOTE",{});var Po=f(be);ee=i(Po,"P",{});var yt=f(ee);tt=i(yt,"STRONG",{});var Ho=f(tt);ps=l(Ho,"Practice:"),Ho.forEach(a),us=l(yt," What would you change about the example above to make the computer "),at=i(yt,"EM",{});var Mo=f(at);hs=l(Mo,"skip"),Mo.forEach(a),ms=l(yt," the line after the \u201Cunless\u201D block instead of displaying it? Once you\u2019ve made your guess, click the \u201CReveal Solution\u201D button below to see a working example:"),yt.forEach(a),Po.forEach(a),Vt=v(e),P(te.$$.fragment,e),qt=v(e),Ut=i(e,"HR",{}),Yt=v(e),ge=i(e,"H2",{});var Oo=f(ge);ds=l(Oo,"What\u2019s The Point?"),Oo.forEach(a),Gt=v(e),Ee=i(e,"P",{});var Co=f(Ee);vs=l(Co,"You might be asking yourself:"),Co.forEach(a),Wt=v(e),ke=i(e,"BLOCKQUOTE",{});var Lo=f(ke);st=i(Lo,"P",{});var Do=f(st);_s=l(Do,"\u201CWhy would I use \u201Cif\u201D or \u201Cunless\u201D blocks? It seems needlessly fussy; if I want to omit text from a passage, I just won\u2019t type it!\u201D"),Do.forEach(a),Lo.forEach(a),jt=v(e),E=i(e,"P",{});var k=f(E);$s=l(k,"This is absolutely the case, but remember\u2014you can have the computer "),ot=i(k,"EM",{});var Ro=f(ot);bs=l(Ro,"modify the value of variables"),Ro.forEach(a),gs=l(k," as the reader visits passages in your story. The real power of conditional blocks like "),lt=i(k,"CODE",{});var So=f(lt);Es=l(So,"[if ]"),So.forEach(a),ks=l(k," and "),rt=i(k,"CODE",{});var Ao=f(rt);ws=l(Ao,"[unless ]"),Ao.forEach(a),ys=l(k," becomes more clear when your story "),nt=i(k,"EM",{});var Bo=f(nt);xs=l(Bo,"modifies"),Bo.forEach(a),Ts=l(k," the variables, and directs the reader to revisit the passage. Here\u2019s an example with three passages\u2014one that "),it=i(k,"EM",{});var Vo=f(it);Is=l(Vo,"sets"),Vo.forEach(a),Ps=l(k," the initial value of a variable, one that "),ft=i(k,"EM",{});var qo=f(ft);Hs=l(qo,"uses"),qo.forEach(a),Ms=l(k," the variable in an \u201Cif\u201D block, and one that "),ct=i(k,"EM",{});var Uo=f(ct);Os=l(Uo,"modifies"),Uo.forEach(a),Cs=l(k," the variable, unlocking a new option in the second passage! You can play the story by "),P(ae.$$.fragment,k),Ls=l(k," if you\u2019d like."),k.forEach(a),Ft=v(e),we=i(e,"P",{});var Yo=f(we);P(pe.$$.fragment,Yo),Yo.forEach(a),Kt=v(e),P(se.$$.fragment,e),Nt=v(e),zt=i(e,"HR",{}),Jt=v(e),ye=i(e,"H2",{});var Go=f(ye);Ds=l(Go,"\u201CContinue\u201D Blocks"),Go.forEach(a),Qt=v(e),S=i(e,"P",{});var ce=f(S);Rs=l(ce,"If you want to use an "),pt=i(ce,"CODE",{});var Wo=f(pt);Ss=l(Wo,"[if ]"),Wo.forEach(a),As=l(ce," block "),ut=i(ce,"EM",{});var jo=f(ut);Bs=l(jo,"before"),jo.forEach(a),Vs=l(ce," a line that should appear in every passage, you can use the "),ht=i(ce,"CODE",{});var Fo=f(ht);qs=l(Fo,"[continue]"),Fo.forEach(a),Us=l(ce," block:"),ce.forEach(a),Xt=v(e),P(oe.$$.fragment,e),Zt=v(e),Y=i(e,"P",{});var He=f(Y);Ys=l(He,"Using "),mt=i(He,"CODE",{});var Ko=f(mt);Gs=l(Ko,"[continue]"),Ko.forEach(a),Ws=l(He," blocks allows you to sort of \u201Cinsert\u201D hidden sections of text "),dt=i(He,"EM",{});var No=f(dt);js=l(No,"between"),No.forEach(a),Fs=l(He," the sections of code that the computer will always display."),He.forEach(a),ea=v(e),xe=i(e,"H2",{});var zo=f(xe);Ks=l(zo,"Longer \u201CIf\u201D & \u201CUnless\u201D Blocks"),zo.forEach(a),ta=v(e),T=i(e,"P",{});var W=f(T);Ns=l(W,"\u201CIf\u201D and \u201Cunless\u201D blocks are really powerful, but they can sometimes make your passages difficult to read. Part of using "),vt=i(W,"STRONG",{});var Jo=f(vt);zs=l(Jo,"conditional control structures"),Jo.forEach(a),Js=l(W," like \u201Cif\u201D, \u201Cunless\u201D, and \u201Ccontinue\u201D blocks is being able to "),_t=i(W,"EM",{});var Qo=f(_t);Qs=l(Qo,"trace"),Qo.forEach(a),Xs=l(W," the passage and "),$t=i(W,"EM",{});var Xo=f($t);Zs=l(Xo,"predict"),Xo.forEach(a),eo=l(W," what the passage will cause the computer to show to the reader given the variables the conditional control structure relies on. If you want to hide or reveal a larger amount of text, it can be easier to read the passage if you use an "),P(le.$$.fragment,W),to=l(W,":"),W.forEach(a),aa=v(e),P(re.$$.fragment,e)},m(e,r){p(e,s,r),t(s,h),p(e,c,r),p(e,u,r),t(u,m),t(u,g),t(g,$),t(u,w),t(u,b),t(b,q),t(u,Me),p(e,de,r),H(U,e,r),p(e,xt,r),H(N,e,r),p(e,Tt,r),p(e,z,r),t(z,la),t(z,Oe),t(Oe,ra),t(z,na),p(e,It,r),p(e,L,r),t(L,J),t(J,ia),t(J,Ce),t(Ce,fa),t(J,ca),t(J,Le),t(Le,pa),t(L,ua),t(L,ve),t(ve,ha),t(ve,De),t(De,ma),t(L,da),t(L,y),t(y,va),t(y,Re),t(Re,_a),t(y,$a),t(y,Se),t(Se,ba),t(y,ga),t(y,Ae),t(Ae,Ea),t(y,ka),t(y,Be),t(Be,wa),t(y,ya),t(y,Ve),t(Ve,xa),t(y,Ta),t(L,Ia),t(L,qe),t(qe,Pa),p(e,Pt,r),p(e,D,r),t(D,Ha),t(D,Ue),t(Ue,Ma),t(D,Oa),t(D,Ye),t(Ye,Ca),t(D,La),t(D,Ge),t(Ge,Da),t(D,Ra),p(e,Ht,r),H(Q,e,r),p(e,Mt,r),p(e,R,r),t(R,Sa),t(R,We),t(We,Aa),t(R,Ba),t(R,je),t(je,Va),t(R,qa),t(R,Fe),t(Fe,Ua),t(R,Ya),p(e,Ot,r),p(e,Ct,r),p(e,Lt,r),p(e,_e,r),t(_e,Ga),p(e,Dt,r),p(e,x,r),t(x,Wa),t(x,Ke),t(Ke,ja),t(x,Fa),t(x,Ne),t(Ne,Ka),t(x,Na),t(x,ze),t(ze,za),t(x,Ja),t(x,Je),t(Je,Qa),t(x,Xa),p(e,Rt,r),p(e,X,r),t(X,j),t(j,Za),t(j,Qe),t(Qe,es),t(j,ts),t(j,Xe),t(Xe,as),t(j,ss),t(X,os),t(X,F),t(F,ls),t(F,Ze),t(Ze,rs),t(F,ns),t(F,et),t(et,is),t(F,fs),p(e,St,r),p(e,$e,r),t($e,cs),p(e,At,r),H(Z,e,r),p(e,Bt,r),p(e,be,r),t(be,ee),t(ee,tt),t(tt,ps),t(ee,us),t(ee,at),t(at,hs),t(ee,ms),p(e,Vt,r),H(te,e,r),p(e,qt,r),p(e,Ut,r),p(e,Yt,r),p(e,ge,r),t(ge,ds),p(e,Gt,r),p(e,Ee,r),t(Ee,vs),p(e,Wt,r),p(e,ke,r),t(ke,st),t(st,_s),p(e,jt,r),p(e,E,r),t(E,$s),t(E,ot),t(ot,bs),t(E,gs),t(E,lt),t(lt,Es),t(E,ks),t(E,rt),t(rt,ws),t(E,ys),t(E,nt),t(nt,xs),t(E,Ts),t(E,it),t(it,Is),t(E,Ps),t(E,ft),t(ft,Hs),t(E,Ms),t(E,ct),t(ct,Os),t(E,Cs),H(ae,E,null),t(E,Ls),p(e,Ft,r),p(e,we,r),H(pe,we,null),p(e,Kt,r),H(se,e,r),p(e,Nt,r),p(e,zt,r),p(e,Jt,r),p(e,ye,r),t(ye,Ds),p(e,Qt,r),p(e,S,r),t(S,Rs),t(S,pt),t(pt,Ss),t(S,As),t(S,ut),t(ut,Bs),t(S,Vs),t(S,ht),t(ht,qs),t(S,Us),p(e,Xt,r),H(oe,e,r),p(e,Zt,r),p(e,Y,r),t(Y,Ys),t(Y,mt),t(mt,Gs),t(Y,Ws),t(Y,dt),t(dt,js),t(Y,Fs),p(e,ea,r),p(e,xe,r),t(xe,Ks),p(e,ta,r),p(e,T,r),t(T,Ns),t(T,vt),t(vt,zs),t(T,Js),t(T,_t),t(_t,Qs),t(T,Xs),t(T,$t),t($t,Zs),t(T,eo),H(le,T,null),t(T,to),p(e,aa,r),H(re,e,r),sa=!0},p(e,r){const K={};r&2&&(K.$$scope={dirty:r,ctx:e}),U.$set(K);const bt={};r&2&&(bt.$$scope={dirty:r,ctx:e}),N.$set(bt);const gt={};r&2&&(gt.$$scope={dirty:r,ctx:e}),Q.$set(gt);const ue={};r&2&&(ue.$$scope={dirty:r,ctx:e}),Z.$set(ue);const Et={};r&2&&(Et.$$scope={dirty:r,ctx:e}),te.$set(Et);const B={};r&2&&(B.$$scope={dirty:r,ctx:e}),ae.$set(B);const ne={};r&2&&(ne.$$scope={dirty:r,ctx:e}),se.$set(ne);const kt={};r&2&&(kt.$$scope={dirty:r,ctx:e}),oe.$set(kt);const wt={};r&2&&(wt.$$scope={dirty:r,ctx:e}),le.$set(wt);const Te={};r&2&&(Te.$$scope={dirty:r,ctx:e}),re.$set(Te)},i(e){sa||(M(U.$$.fragment,e),M(N.$$.fragment,e),M(Q.$$.fragment,e),M(Z.$$.fragment,e),M(te.$$.fragment,e),M(ae.$$.fragment,e),M(pe.$$.fragment,e),M(se.$$.fragment,e),M(oe.$$.fragment,e),M(le.$$.fragment,e),M(re.$$.fragment,e),sa=!0)},o(e){O(U.$$.fragment,e),O(N.$$.fragment,e),O(Q.$$.fragment,e),O(Z.$$.fragment,e),O(te.$$.fragment,e),O(ae.$$.fragment,e),O(pe.$$.fragment,e),O(se.$$.fragment,e),O(oe.$$.fragment,e),O(le.$$.fragment,e),O(re.$$.fragment,e),sa=!1},d(e){e&&a(s),e&&a(c),e&&a(u),e&&a(de),C(U,e),e&&a(xt),C(N,e),e&&a(Tt),e&&a(z),e&&a(It),e&&a(L),e&&a(Pt),e&&a(D),e&&a(Ht),C(Q,e),e&&a(Mt),e&&a(R),e&&a(Ot),e&&a(Ct),e&&a(Lt),e&&a(_e),e&&a(Dt),e&&a(x),e&&a(Rt),e&&a(X),e&&a(St),e&&a($e),e&&a(At),C(Z,e),e&&a(Bt),e&&a(be),e&&a(Vt),C(te,e),e&&a(qt),e&&a(Ut),e&&a(Yt),e&&a(ge),e&&a(Gt),e&&a(Ee),e&&a(Wt),e&&a(ke),e&&a(jt),e&&a(E),C(ae),e&&a(Ft),e&&a(we),C(pe),e&&a(Kt),C(se,e),e&&a(Nt),e&&a(zt),e&&a(Jt),e&&a(ye),e&&a(Qt),e&&a(S),e&&a(Xt),C(oe,e),e&&a(Zt),e&&a(Y),e&&a(ea),e&&a(xe),e&&a(ta),e&&a(T),C(le),e&&a(aa),C(re,e)}}}function wl(_){let s,h;const c=[_[0],tl];let u={$$slots:{default:[kl]},$$scope:{ctx:_}};for(let m=0;m<c.length;m+=1)u=ao(u,c[m]);return s=new rl({props:u}),{c(){I(s.$$.fragment)},l(m){P(s.$$.fragment,m)},m(m,g){H(s,m,g),h=!0},p(m,[g]){const $=g&1?ll(c,[g&1&&Zo(m[0]),g&0&&Zo(tl)]):{};g&2&&($.$$scope={dirty:g,ctx:m}),s.$set($)},i(m){h||(M(s.$$.fragment,m),h=!0)},o(m){O(s.$$.fragment,m),h=!1},d(m){C(s,m)}}}const tl={title:"If & Unless Blocks",author:"Jon Stapleton",short:'Learn the basics of "if" and "unless" blocks in the Chapbook format of Twine.',description:'The Chapbook format of Twine includes special commands you can use in your passages called "if" and "unless" blocks. These blocks allow you to "hide" or "reveal" lines of text based on the value of a variable. This powerful "selection" feature (where the computer, as it interprets your passage, "selects" lines of code to skip or include in the passage) is useful for creating all sorts of things in your Twine stories--puzzles, secrets, alternative paths and endings, and a lot more!',video:"https://www.youtube.com/embed/TZXFTwgYjuA",type:"tutorial",layout:"location"};function yl(_,s,h){return _.$$set=c=>{h(0,s=ao(ao({},s),el(c)))},s=el(s),[s]}class Hl extends al{constructor(s){super(),sl(this,s,yl,wl,ol,{})}}export{Hl as default,tl as metadata};