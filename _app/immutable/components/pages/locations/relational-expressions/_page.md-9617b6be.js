import{S as hd,i as ud,s as pd,I as vl,v as te,w as oe,x as ae,J as vd,K as rd,f as re,t as se,y as le,L as sd,k as s,q as a,a as i,l,m as n,r,h as t,c as f,n as ne,b as h,G as e,A as na}from"../../../../chunks/index-28147552.js";import{S as md}from"../../../../chunks/Standalone-e39bc1fe.js";import{a as qo,p as ld,i as _d}from"../../../../chunks/Standalone.svelte_svelte_type_style_lang-17c44177.js";function Ed($){let d,p;return{c(){d=s("code"),p=a("if/unless")},l(u){d=l(u,"CODE",{});var v=n(d);p=r(v,"if/unless"),v.forEach(t)},m(u,v){h(u,d,v),e(d,p)},p:na,d(u){u&&t(d)}}}function wd($){let d,p;return{c(){d=s("code"),p=a("if/else")},l(u){d=l(u,"CODE",{});var v=n(d);p=r(v,"if/else"),v.forEach(t)},m(u,v){h(u,d,v),e(d,p)},p:na,d(u){u&&t(d)}}}function $d($){let d;return{c(){d=a("arithmetic expressions")},l(p){d=r(p,"arithmetic expressions")},m(p,u){h(p,d,u)},d(p){p&&t(d)}}}function bd($){let d,p=`<code class="language-undefined">var: 2 &gt; 5
--

The variable value is: &#123;var&#125;</code>`;return{c(){d=s("pre"),this.h()},l(u){d=l(u,"PRE",{class:!0});var v=n(d);v.forEach(t),this.h()},h(){ne(d,"class","language-undefined")},m(u,v){h(u,d,v),d.innerHTML=p},p:na,d(u){u&&t(d)}}}function gd($){let d;return{c(){d=a("arithmetic expressions")},l(p){d=r(p,"arithmetic expressions")},m(p,u){h(p,d,u)},d(p){p&&t(d)}}}function yd($){let d;return{c(){d=a("clicking here")},l(p){d=r(p,"clicking here")},m(p,u){h(p,d,u)},d(p){p&&t(d)}}}function Dd($){let d,p=`<code class="language-title">score: 0
--

# The Great Coin Hunt

*A story demonstrating a relational expression*

&gt; [[Begin-&gt;quest]]</code>`,u,v=`<code class="language-quest">_finished: score &gt; 2
--

You see a hunched figure in a dark cloak. They approach, and say:

[if _finished]
You have found the secret coins. Follow me, traveler...

&gt; [[Follow the hunched figure-&gt;end]]
[else]
&quot;Find the hidden coins three, and I will show you the way forward&quot;

&gt; [[Search the road-&gt;road]]
&gt; [[Search the forest-&gt;forest]]
&gt; [[Search the cabin-&gt;cabin]]</code>`,m,C=`<code class="language-road">score: score + 1
--

You find a shining, gold coin buried in the dirt.

&gt; [[Return-&gt;quest]]</code>`,x,Pe=`<code class="language-forest">score: score + 1
--

A massive, panting wolf approaches you and gently places a glistening gold coin in your hand before loping into the darkness.

&gt; [[Return-&gt;quest]]</code>`,I,Be=`<code class="language-cabin">score: score + 1
--

You see something shine from beneath the floorboards. You pry it up, and find a gold coin.

&gt; [[Return-&gt;quest]]</code>`,A,ge=`<code class="language-end">You follow the figure into the mist, to adventures unknown...

# The End</code>`;return{c(){d=s("pre"),u=s("pre"),m=s("pre"),x=s("pre"),I=s("pre"),A=s("pre"),this.h()},l(_){d=l(_,"PRE",{class:!0});var Y=n(d);Y.forEach(t),u=l(_,"PRE",{class:!0});var ye=n(u);ye.forEach(t),m=l(_,"PRE",{class:!0});var Me=n(m);Me.forEach(t),x=l(_,"PRE",{class:!0});var Ye=n(x);Ye.forEach(t),I=l(_,"PRE",{class:!0});var G=n(I);G.forEach(t),A=l(_,"PRE",{class:!0});var Le=n(A);Le.forEach(t),this.h()},h(){ne(d,"class","language-title"),ne(u,"class","language-quest"),ne(m,"class","language-road"),ne(x,"class","language-forest"),ne(I,"class","language-cabin"),ne(A,"class","language-end")},m(_,Y){h(_,d,Y),d.innerHTML=p,h(_,u,Y),u.innerHTML=v,h(_,m,Y),m.innerHTML=C,h(_,x,Y),x.innerHTML=Pe,h(_,I,Y),I.innerHTML=Be,h(_,A,Y),A.innerHTML=ge},p:na,d(_){_&&t(d),_&&t(u),_&&t(m),_&&t(x),_&&t(I),_&&t(A)}}}function Td($){let d,p,u,v,m,C,x,Pe,I,Be,A,ge,_,Y,ye,Me,Ye,G,Le,de,da,Po,L,ca,Se,ia,fa,We,ha,ua,je,pa,va,Bo,De,dd=`<code class="language-undefined">[if hasKey]
Try to unlock the door!
[else]
You can&#39;t unlock the door.</code>`,Mo,D,ma,Ae,_a,Ea,ze,wa,$a,Ge,ba,ga,Ve,ya,Da,Fe,Ta,Ca,Yo,Lo,So,Oe,Oa,Wo,T,xa,Ne,Ia,ka,Je,Ra,Ha,ce,qa,Ke,Pa,Ba,Ue,Ma,Ya,jo,ie,Ao,E,La,Qe,Sa,Wa,Xe,ja,Aa,Ze,za,Ga,et,Va,Fa,tt,Na,Ja,ot,Ka,Ua,at,Qa,Xa,rt,Za,er,st,tr,or,zo,V,ar,lt,rr,sr,fe,lr,Go,Te,cd=`<code class="language-undefined">_readerWins: score &gt; 5
--

That&#39;s the end!

[if _readerWins]
You won!
[else]
You lost...</code>`,Vo,w,nr,nt,dr,cr,dt,ir,fr,ct,hr,ur,it,pr,vr,ft,mr,_r,ht,Er,wr,ut,$r,br,pt,gr,yr,Fo,he,Dr,ue,Tr,No,xe,Ce,Jo,pe,Ko,ve,Cr,vt,Or,xr,Uo,Qo,Xo,Ie,Ir,Zo,ke,kr,ea,me,mt,k,_t,Rr,Hr,Et,qr,Pr,wt,Br,Mr,$t,Yr,Lr,bt,Sr,Wr,O,R,gt,yt,jr,Ar,Dt,zr,Gr,_e,Vr,Tt,Fr,Nr,Ct,Jr,Kr,Ot,xt,Ur,Qr,It,kt,Xr,Zr,H,Rt,Ht,es,ts,qt,os,as,Z,rs,Pt,ss,ls,Bt,ns,ds,cs,Mt,Yt,is,fs,Lt,St,hs,us,q,Wt,jt,ps,vs,At,ms,_s,ee,Es,zt,ws,$s,Gt,bs,gs,ys,Vt,Ft,Ds,Ts,Nt,Jt,Cs,Os,P,Kt,Ut,xs,Is,Qt,ks,Rs,Ee,Hs,Xt,qs,Ps,Zt,Bs,Ms,eo,to,Ys,Ls,oo,ao,Ss,Ws,B,ro,so,js,As,lo,zs,Gs,we,Vs,no,Fs,Ns,co,Js,Ks,io,fo,Us,Qs,ho,uo,Xs,Zs,M,po,vo,el,tl,mo,ol,al,$e,rl,_o,sl,ll,Eo,nl,dl,wo,$o,cl,il,bo,go,fl,ta,be,hl,yo,ul,pl,oa;return G=new qo({props:{href:"/locations/if-unless",$$slots:{default:[Ed]},$$scope:{ctx:$}}}),de=new qo({props:{href:"/locations/if-else",$$slots:{default:[wd]},$$scope:{ctx:$}}}),ce=new qo({props:{href:"/locations/arithmetic-expressions",$$slots:{default:[$d]},$$scope:{ctx:$}}}),ie=new ld({props:{title:"Relational Expression Example",src:"/simple-relational-expression.png",$$slots:{default:[bd]},$$scope:{ctx:$}}}),fe=new qo({props:{href:"/locations/arithmetic-expressions",$$slots:{default:[gd]},$$scope:{ctx:$}}}),ue=new qo({props:{href:"/examples/great-coin-hunt",$$slots:{default:[yd]},$$scope:{ctx:$}}}),Ce=new _d({props:{src:"/great-coin-hunt.png",alt:"Story editor view of the story written below"}}),pe=new ld({props:{title:"The Great Coin Hunt",src:"/the-coin-hunt-demo.gif",tabs:!0,$$slots:{default:[Dd]},$$scope:{ctx:$}}}),{c(){d=s("h2"),p=a("Shortcomings of Boolean Variables"),u=i(),v=s("p"),m=a("If you\u2019ve written passages with "),C=s("code"),x=a("[if ]"),Pe=a("/"),I=s("code"),Be=a("[continue]"),A=a(" conditional blocks, then you may already know how powerful having the computer choose to "),ge=s("em"),_=a("display"),Y=a(" or "),ye=s("em"),Me=a("hide"),Ye=a(" text based on a variable can be (read about "),te(G.$$.fragment),Le=a(" & "),te(de.$$.fragment),da=a(" if you haven\u2019t). You can create all sorts of little puzzles for readers to engage with as they experience your story. Twine stories that use conditionals can feel more like games than narratives, and they can get really complex!"),Po=i(),L=s("p"),ca=a("But what if you wanted the computer to choose whether or not to display some text based on a non-Boolean variable? If you only use Boolean variables (variables that can only be either "),Se=s("code"),ia=a("true"),fa=a(" or "),We=s("code"),ha=a("false"),ua=a("), you can only write "),je=s("code"),pa=a("[if ]"),va=a(" statements like these\u2026"),Bo=i(),De=s("pre"),Mo=i(),D=s("p"),ma=a("\u2026where the computer looks at the variable\u2019s value and either "),Ae=s("em"),_a=a("displays"),Ea=a(" or "),ze=s("em"),wa=a("skips"),$a=a(" a section of the passage based on whether that variable has a value of "),Ge=s("code"),ba=a("true"),ga=a(" or "),Ve=s("code"),ya=a("false"),Da=a(" when the computer reads it. What if you wanted the computer to display a section based on how high a "),Fe=s("code"),Ta=a("score"),Ca=a(" number variable is, or based on the value of a string-type variable?"),Yo=i(),Lo=s("hr"),So=i(),Oe=s("h2"),Oa=a("Using Relational Expressions with Conditionals"),Wo=i(),T=s("p"),xa=a("The Chapbook format of Twine has a way for you to use number and string variables in your "),Ne=s("code"),Ia=a("[if ]"),ka=a(" statements: "),Je=s("strong"),Ra=a("relational expressions"),Ha=a(". Relational expressions are sort of like "),te(ce.$$.fragment),qa=a(", but instead of producing numbers like a math equation, they "),Ke=s("em"),Pa=a("compare"),Ba=a(" numbers or strings and produce "),Ue=s("em"),Ma=a("Boolean"),Ya=a(" values. Here\u2019s an example of a relational expression:"),jo=i(),te(ie.$$.fragment),Ao=i(),E=s("p"),La=a("Check out the "),Qe=s("code"),Sa=a("var"),Wa=a(" variable\u2014what value is the passage giving that variable? To find out, you need to "),Xe=s("em"),ja=a("evaluate"),Aa=a(" the relational expression "),Ze=s("code"),za=a("2 > 5"),Ga=a(". In this case, the relational expression is "),et=s("code"),Va=a("false"),Fa=a("\u2014the number "),tt=s("code"),Na=a("2"),Ja=a(" is "),ot=s("em"),Ka=a("not"),Ua=a(" greater than the number "),at=s("code"),Qa=a("5"),Xa=a(". The passage above assigns the variable "),rt=s("code"),Za=a("var"),er=a(" a value of "),st=s("code"),tr=a("false"),or=a("!"),zo=i(),V=s("p"),ar=a("In the example above, I could accomplish the same thing by just writing "),lt=s("code"),rr=a("var: false"),sr=a(". But, just like with "),te(fe.$$.fragment),lr=a(", I can use variables in relational expressions. Here\u2019s an example:"),Go=i(),Te=s("pre"),Vo=i(),w=s("p"),nr=a("The value of the Boolean variable "),nt=s("code"),dr=a("readerWins"),cr=i(),dt=s("em"),ir=a("depends"),fr=a(" on the value of the number variable called "),ct=s("code"),hr=a("score"),ur=a("; if "),it=s("code"),pr=a("score"),vr=a(" is greater than 5, then the variable called "),ft=s("code"),mr=a("readerWins"),_r=a(" will be "),ht=s("code"),Er=a("true"),wr=a(". Otherwise, it will get a value of "),ut=s("code"),$r=a("false"),br=a(". Then, when the computer reads the passage, it will display different messages based on the value of the "),pt=s("code"),gr=a("readerWins"),yr=a(" variable!"),Fo=i(),he=s("p"),Dr=a("Here\u2019s a more complete example, which shows a simple \u201Cscavenger hunt\u201D sort of story, where the reader has to find all of the coins before they can reach the end of the tale. You can play the story yourself by "),te(ue.$$.fragment),Tr=a("."),No=i(),xe=s("p"),te(Ce.$$.fragment),Jo=i(),te(pe.$$.fragment),Ko=i(),ve=s("p"),Cr=a("Try editing the story above so you need to find "),vt=s("em"),Or=a("five"),xr=a(" coins instead of three to practice your skills!"),Uo=i(),Qo=s("hr"),Xo=i(),Ie=s("h2"),Ir=a("Relational Expressions"),Zo=i(),ke=s("p"),kr=a("There are several kinds of relational operators available to you in the Chapbook format of Twine. Here is a summary:"),ea=i(),me=s("table"),mt=s("thead"),k=s("tr"),_t=s("th"),Rr=a("Operator"),Hr=i(),Et=s("th"),qr=a("Name"),Pr=i(),wt=s("th"),Br=a("Description"),Mr=i(),$t=s("th"),Yr=a("Example"),Lr=i(),bt=s("th"),Sr=a("Value"),Wr=i(),O=s("tbody"),R=s("tr"),gt=s("td"),yt=s("code"),jr=a("=="),Ar=i(),Dt=s("td"),zr=a("\u201CIs equal to\u201D"),Gr=i(),_e=s("td"),Vr=a("Compares two values. If they are the same, produce "),Tt=s("code"),Fr=a("true"),Nr=a("; otherwise, produce "),Ct=s("code"),Jr=a("false"),Kr=i(),Ot=s("td"),xt=s("code"),Ur=a("5 == 5"),Qr=i(),It=s("td"),kt=s("code"),Xr=a("true"),Zr=i(),H=s("tr"),Rt=s("td"),Ht=s("code"),es=a("<"),ts=i(),qt=s("td"),os=a("\u201CIs less than\u201D"),as=i(),Z=s("td"),rs=a("Compares two values. If the first value is less than the second, produce "),Pt=s("code"),ss=a("true"),ls=a("; otherwise, produce "),Bt=s("code"),ns=a("false"),ds=a("."),cs=i(),Mt=s("td"),Yt=s("code"),is=a("2 < 1"),fs=i(),Lt=s("td"),St=s("code"),hs=a("false"),us=i(),q=s("tr"),Wt=s("td"),jt=s("code"),ps=a(">"),vs=i(),At=s("td"),ms=a("\u201CIs greater than\u201D"),_s=i(),ee=s("td"),Es=a("Compares two values. If the first value is greater than the second, produce "),zt=s("code"),ws=a("true"),$s=a("; otherwise, produce "),Gt=s("code"),bs=a("false"),gs=a("."),ys=i(),Vt=s("td"),Ft=s("code"),Ds=a("4 > 3"),Ts=i(),Nt=s("td"),Jt=s("code"),Cs=a("true"),Os=i(),P=s("tr"),Kt=s("td"),Ut=s("code"),xs=a("!="),Is=i(),Qt=s("td"),ks=a("\u201CIs not equal to\u201D"),Rs=i(),Ee=s("td"),Hs=a("Compares two values. If they are not equal, produce "),Xt=s("code"),qs=a("true"),Ps=a("; otherwise, produce "),Zt=s("code"),Bs=a("false"),Ms=i(),eo=s("td"),to=s("code"),Ys=a("5 != 5"),Ls=i(),oo=s("td"),ao=s("code"),Ss=a("false"),Ws=i(),B=s("tr"),ro=s("td"),so=s("code"),js=a("<="),As=i(),lo=s("td"),zs=a("\u201CIs less than or equal to\u201D"),Gs=i(),we=s("td"),Vs=a("Compares two values. If the first value is less than or equal to the second, produce "),no=s("code"),Fs=a("true"),Ns=a("; otherwise produce "),co=s("code"),Js=a("false"),Ks=i(),io=s("td"),fo=s("code"),Us=a("3 <= 3"),Qs=i(),ho=s("td"),uo=s("code"),Xs=a("true"),Zs=i(),M=s("tr"),po=s("td"),vo=s("code"),el=a(">="),tl=i(),mo=s("td"),ol=a("\u201CIs greater than or equal to\u201D"),al=i(),$e=s("td"),rl=a("Compares two values. If the first value is greater than or equal to the second, produce "),_o=s("code"),sl=a("true"),ll=a("; otherwise produce "),Eo=s("code"),nl=a("false"),dl=i(),wo=s("td"),$o=s("code"),cl=a("2 >= 1"),il=i(),bo=s("td"),go=s("code"),fl=a("true"),ta=i(),be=s("p"),hl=a("Try them out in your variables, and use them in "),yo=s("code"),ul=a("[if ]"),pl=a(" statements to create interactive passages that respond to user\u2019s choices!"),this.h()},l(o){d=l(o,"H2",{});var c=n(d);p=r(c,"Shortcomings of Boolean Variables"),c.forEach(t),u=f(o),v=l(o,"P",{});var y=n(v);m=r(y,"If you\u2019ve written passages with "),C=l(y,"CODE",{});var Do=n(C);x=r(Do,"[if ]"),Do.forEach(t),Pe=r(y,"/"),I=l(y,"CODE",{});var To=n(I);Be=r(To,"[continue]"),To.forEach(t),A=r(y," conditional blocks, then you may already know how powerful having the computer choose to "),ge=l(y,"EM",{});var Co=n(ge);_=r(Co,"display"),Co.forEach(t),Y=r(y," or "),ye=l(y,"EM",{});var Oo=n(ye);Me=r(Oo,"hide"),Oo.forEach(t),Ye=r(y," text based on a variable can be (read about "),oe(G.$$.fragment,y),Le=r(y," & "),oe(de.$$.fragment,y),da=r(y," if you haven\u2019t). You can create all sorts of little puzzles for readers to engage with as they experience your story. Twine stories that use conditionals can feel more like games than narratives, and they can get really complex!"),y.forEach(t),Po=f(o),L=l(o,"P",{});var z=n(L);ca=r(z,"But what if you wanted the computer to choose whether or not to display some text based on a non-Boolean variable? If you only use Boolean variables (variables that can only be either "),Se=l(z,"CODE",{});var xo=n(Se);ia=r(xo,"true"),xo.forEach(t),fa=r(z," or "),We=l(z,"CODE",{});var ml=n(We);ha=r(ml,"false"),ml.forEach(t),ua=r(z,"), you can only write "),je=l(z,"CODE",{});var _l=n(je);pa=r(_l,"[if ]"),_l.forEach(t),va=r(z," statements like these\u2026"),z.forEach(t),Bo=f(o),De=l(o,"PRE",{class:!0});var id=n(De);id.forEach(t),Mo=f(o),D=l(o,"P",{});var S=n(D);ma=r(S,"\u2026where the computer looks at the variable\u2019s value and either "),Ae=l(S,"EM",{});var El=n(Ae);_a=r(El,"displays"),El.forEach(t),Ea=r(S," or "),ze=l(S,"EM",{});var wl=n(ze);wa=r(wl,"skips"),wl.forEach(t),$a=r(S," a section of the passage based on whether that variable has a value of "),Ge=l(S,"CODE",{});var $l=n(Ge);ba=r($l,"true"),$l.forEach(t),ga=r(S," or "),Ve=l(S,"CODE",{});var bl=n(Ve);ya=r(bl,"false"),bl.forEach(t),Da=r(S," when the computer reads it. What if you wanted the computer to display a section based on how high a "),Fe=l(S,"CODE",{});var gl=n(Fe);Ta=r(gl,"score"),gl.forEach(t),Ca=r(S," number variable is, or based on the value of a string-type variable?"),S.forEach(t),Yo=f(o),Lo=l(o,"HR",{}),So=f(o),Oe=l(o,"H2",{});var yl=n(Oe);Oa=r(yl,"Using Relational Expressions with Conditionals"),yl.forEach(t),Wo=f(o),T=l(o,"P",{});var W=n(T);xa=r(W,"The Chapbook format of Twine has a way for you to use number and string variables in your "),Ne=l(W,"CODE",{});var Dl=n(Ne);Ia=r(Dl,"[if ]"),Dl.forEach(t),ka=r(W," statements: "),Je=l(W,"STRONG",{});var Tl=n(Je);Ra=r(Tl,"relational expressions"),Tl.forEach(t),Ha=r(W,". Relational expressions are sort of like "),oe(ce.$$.fragment,W),qa=r(W,", but instead of producing numbers like a math equation, they "),Ke=l(W,"EM",{});var Cl=n(Ke);Pa=r(Cl,"compare"),Cl.forEach(t),Ba=r(W," numbers or strings and produce "),Ue=l(W,"EM",{});var Ol=n(Ue);Ma=r(Ol,"Boolean"),Ol.forEach(t),Ya=r(W," values. Here\u2019s an example of a relational expression:"),W.forEach(t),jo=f(o),oe(ie.$$.fragment,o),Ao=f(o),E=l(o,"P",{});var b=n(E);La=r(b,"Check out the "),Qe=l(b,"CODE",{});var xl=n(Qe);Sa=r(xl,"var"),xl.forEach(t),Wa=r(b," variable\u2014what value is the passage giving that variable? To find out, you need to "),Xe=l(b,"EM",{});var Il=n(Xe);ja=r(Il,"evaluate"),Il.forEach(t),Aa=r(b," the relational expression "),Ze=l(b,"CODE",{});var kl=n(Ze);za=r(kl,"2 > 5"),kl.forEach(t),Ga=r(b,". In this case, the relational expression is "),et=l(b,"CODE",{});var Rl=n(et);Va=r(Rl,"false"),Rl.forEach(t),Fa=r(b,"\u2014the number "),tt=l(b,"CODE",{});var Hl=n(tt);Na=r(Hl,"2"),Hl.forEach(t),Ja=r(b," is "),ot=l(b,"EM",{});var ql=n(ot);Ka=r(ql,"not"),ql.forEach(t),Ua=r(b," greater than the number "),at=l(b,"CODE",{});var Pl=n(at);Qa=r(Pl,"5"),Pl.forEach(t),Xa=r(b,". The passage above assigns the variable "),rt=l(b,"CODE",{});var Bl=n(rt);Za=r(Bl,"var"),Bl.forEach(t),er=r(b," a value of "),st=l(b,"CODE",{});var Ml=n(st);tr=r(Ml,"false"),Ml.forEach(t),or=r(b,"!"),b.forEach(t),zo=f(o),V=l(o,"P",{});var Re=n(V);ar=r(Re,"In the example above, I could accomplish the same thing by just writing "),lt=l(Re,"CODE",{});var Yl=n(lt);rr=r(Yl,"var: false"),Yl.forEach(t),sr=r(Re,". But, just like with "),oe(fe.$$.fragment,Re),lr=r(Re,", I can use variables in relational expressions. Here\u2019s an example:"),Re.forEach(t),Go=f(o),Te=l(o,"PRE",{class:!0});var fd=n(Te);fd.forEach(t),Vo=f(o),w=l(o,"P",{});var g=n(w);nr=r(g,"The value of the Boolean variable "),nt=l(g,"CODE",{});var Ll=n(nt);dr=r(Ll,"readerWins"),Ll.forEach(t),cr=f(g),dt=l(g,"EM",{});var Sl=n(dt);ir=r(Sl,"depends"),Sl.forEach(t),fr=r(g," on the value of the number variable called "),ct=l(g,"CODE",{});var Wl=n(ct);hr=r(Wl,"score"),Wl.forEach(t),ur=r(g,"; if "),it=l(g,"CODE",{});var jl=n(it);pr=r(jl,"score"),jl.forEach(t),vr=r(g," is greater than 5, then the variable called "),ft=l(g,"CODE",{});var Al=n(ft);mr=r(Al,"readerWins"),Al.forEach(t),_r=r(g," will be "),ht=l(g,"CODE",{});var zl=n(ht);Er=r(zl,"true"),zl.forEach(t),wr=r(g,". Otherwise, it will get a value of "),ut=l(g,"CODE",{});var Gl=n(ut);$r=r(Gl,"false"),Gl.forEach(t),br=r(g,". Then, when the computer reads the passage, it will display different messages based on the value of the "),pt=l(g,"CODE",{});var Vl=n(pt);gr=r(Vl,"readerWins"),Vl.forEach(t),yr=r(g," variable!"),g.forEach(t),Fo=f(o),he=l(o,"P",{});var aa=n(he);Dr=r(aa,"Here\u2019s a more complete example, which shows a simple \u201Cscavenger hunt\u201D sort of story, where the reader has to find all of the coins before they can reach the end of the tale. You can play the story yourself by "),oe(ue.$$.fragment,aa),Tr=r(aa,"."),aa.forEach(t),No=f(o),xe=l(o,"P",{});var Fl=n(xe);oe(Ce.$$.fragment,Fl),Fl.forEach(t),Jo=f(o),oe(pe.$$.fragment,o),Ko=f(o),ve=l(o,"P",{});var ra=n(ve);Cr=r(ra,"Try editing the story above so you need to find "),vt=l(ra,"EM",{});var Nl=n(vt);Or=r(Nl,"five"),Nl.forEach(t),xr=r(ra," coins instead of three to practice your skills!"),ra.forEach(t),Uo=f(o),Qo=l(o,"HR",{}),Xo=f(o),Ie=l(o,"H2",{});var Jl=n(Ie);Ir=r(Jl,"Relational Expressions"),Jl.forEach(t),Zo=f(o),ke=l(o,"P",{});var Kl=n(ke);kr=r(Kl,"There are several kinds of relational operators available to you in the Chapbook format of Twine. Here is a summary:"),Kl.forEach(t),ea=f(o),me=l(o,"TABLE",{});var sa=n(me);mt=l(sa,"THEAD",{});var Ul=n(mt);k=l(Ul,"TR",{});var F=n(k);_t=l(F,"TH",{});var Ql=n(_t);Rr=r(Ql,"Operator"),Ql.forEach(t),Hr=f(F),Et=l(F,"TH",{});var Xl=n(Et);qr=r(Xl,"Name"),Xl.forEach(t),Pr=f(F),wt=l(F,"TH",{});var Zl=n(wt);Br=r(Zl,"Description"),Zl.forEach(t),Mr=f(F),$t=l(F,"TH",{});var en=n($t);Yr=r(en,"Example"),en.forEach(t),Lr=f(F),bt=l(F,"TH",{});var tn=n(bt);Sr=r(tn,"Value"),tn.forEach(t),F.forEach(t),Ul.forEach(t),Wr=f(sa),O=l(sa,"TBODY",{});var j=n(O);R=l(j,"TR",{});var N=n(R);gt=l(N,"TD",{});var on=n(gt);yt=l(on,"CODE",{});var an=n(yt);jr=r(an,"=="),an.forEach(t),on.forEach(t),Ar=f(N),Dt=l(N,"TD",{});var rn=n(Dt);zr=r(rn,"\u201CIs equal to\u201D"),rn.forEach(t),Gr=f(N),_e=l(N,"TD",{});var Io=n(_e);Vr=r(Io,"Compares two values. If they are the same, produce "),Tt=l(Io,"CODE",{});var sn=n(Tt);Fr=r(sn,"true"),sn.forEach(t),Nr=r(Io,"; otherwise, produce "),Ct=l(Io,"CODE",{});var ln=n(Ct);Jr=r(ln,"false"),ln.forEach(t),Io.forEach(t),Kr=f(N),Ot=l(N,"TD",{});var nn=n(Ot);xt=l(nn,"CODE",{});var dn=n(xt);Ur=r(dn,"5 == 5"),dn.forEach(t),nn.forEach(t),Qr=f(N),It=l(N,"TD",{});var cn=n(It);kt=l(cn,"CODE",{});var fn=n(kt);Xr=r(fn,"true"),fn.forEach(t),cn.forEach(t),N.forEach(t),Zr=f(j),H=l(j,"TR",{});var J=n(H);Rt=l(J,"TD",{});var hn=n(Rt);Ht=l(hn,"CODE",{});var un=n(Ht);es=r(un,"<"),un.forEach(t),hn.forEach(t),ts=f(J),qt=l(J,"TD",{});var pn=n(qt);os=r(pn,"\u201CIs less than\u201D"),pn.forEach(t),as=f(J),Z=l(J,"TD",{});var He=n(Z);rs=r(He,"Compares two values. If the first value is less than the second, produce "),Pt=l(He,"CODE",{});var vn=n(Pt);ss=r(vn,"true"),vn.forEach(t),ls=r(He,"; otherwise, produce "),Bt=l(He,"CODE",{});var mn=n(Bt);ns=r(mn,"false"),mn.forEach(t),ds=r(He,"."),He.forEach(t),cs=f(J),Mt=l(J,"TD",{});var _n=n(Mt);Yt=l(_n,"CODE",{});var En=n(Yt);is=r(En,"2 < 1"),En.forEach(t),_n.forEach(t),fs=f(J),Lt=l(J,"TD",{});var wn=n(Lt);St=l(wn,"CODE",{});var $n=n(St);hs=r($n,"false"),$n.forEach(t),wn.forEach(t),J.forEach(t),us=f(j),q=l(j,"TR",{});var K=n(q);Wt=l(K,"TD",{});var bn=n(Wt);jt=l(bn,"CODE",{});var gn=n(jt);ps=r(gn,">"),gn.forEach(t),bn.forEach(t),vs=f(K),At=l(K,"TD",{});var yn=n(At);ms=r(yn,"\u201CIs greater than\u201D"),yn.forEach(t),_s=f(K),ee=l(K,"TD",{});var qe=n(ee);Es=r(qe,"Compares two values. If the first value is greater than the second, produce "),zt=l(qe,"CODE",{});var Dn=n(zt);ws=r(Dn,"true"),Dn.forEach(t),$s=r(qe,"; otherwise, produce "),Gt=l(qe,"CODE",{});var Tn=n(Gt);bs=r(Tn,"false"),Tn.forEach(t),gs=r(qe,"."),qe.forEach(t),ys=f(K),Vt=l(K,"TD",{});var Cn=n(Vt);Ft=l(Cn,"CODE",{});var On=n(Ft);Ds=r(On,"4 > 3"),On.forEach(t),Cn.forEach(t),Ts=f(K),Nt=l(K,"TD",{});var xn=n(Nt);Jt=l(xn,"CODE",{});var In=n(Jt);Cs=r(In,"true"),In.forEach(t),xn.forEach(t),K.forEach(t),Os=f(j),P=l(j,"TR",{});var U=n(P);Kt=l(U,"TD",{});var kn=n(Kt);Ut=l(kn,"CODE",{});var Rn=n(Ut);xs=r(Rn,"!="),Rn.forEach(t),kn.forEach(t),Is=f(U),Qt=l(U,"TD",{});var Hn=n(Qt);ks=r(Hn,"\u201CIs not equal to\u201D"),Hn.forEach(t),Rs=f(U),Ee=l(U,"TD",{});var ko=n(Ee);Hs=r(ko,"Compares two values. If they are not equal, produce "),Xt=l(ko,"CODE",{});var qn=n(Xt);qs=r(qn,"true"),qn.forEach(t),Ps=r(ko,"; otherwise, produce "),Zt=l(ko,"CODE",{});var Pn=n(Zt);Bs=r(Pn,"false"),Pn.forEach(t),ko.forEach(t),Ms=f(U),eo=l(U,"TD",{});var Bn=n(eo);to=l(Bn,"CODE",{});var Mn=n(to);Ys=r(Mn,"5 != 5"),Mn.forEach(t),Bn.forEach(t),Ls=f(U),oo=l(U,"TD",{});var Yn=n(oo);ao=l(Yn,"CODE",{});var Ln=n(ao);Ss=r(Ln,"false"),Ln.forEach(t),Yn.forEach(t),U.forEach(t),Ws=f(j),B=l(j,"TR",{});var Q=n(B);ro=l(Q,"TD",{});var Sn=n(ro);so=l(Sn,"CODE",{});var Wn=n(so);js=r(Wn,"<="),Wn.forEach(t),Sn.forEach(t),As=f(Q),lo=l(Q,"TD",{});var jn=n(lo);zs=r(jn,"\u201CIs less than or equal to\u201D"),jn.forEach(t),Gs=f(Q),we=l(Q,"TD",{});var Ro=n(we);Vs=r(Ro,"Compares two values. If the first value is less than or equal to the second, produce "),no=l(Ro,"CODE",{});var An=n(no);Fs=r(An,"true"),An.forEach(t),Ns=r(Ro,"; otherwise produce "),co=l(Ro,"CODE",{});var zn=n(co);Js=r(zn,"false"),zn.forEach(t),Ro.forEach(t),Ks=f(Q),io=l(Q,"TD",{});var Gn=n(io);fo=l(Gn,"CODE",{});var Vn=n(fo);Us=r(Vn,"3 <= 3"),Vn.forEach(t),Gn.forEach(t),Qs=f(Q),ho=l(Q,"TD",{});var Fn=n(ho);uo=l(Fn,"CODE",{});var Nn=n(uo);Xs=r(Nn,"true"),Nn.forEach(t),Fn.forEach(t),Q.forEach(t),Zs=f(j),M=l(j,"TR",{});var X=n(M);po=l(X,"TD",{});var Jn=n(po);vo=l(Jn,"CODE",{});var Kn=n(vo);el=r(Kn,">="),Kn.forEach(t),Jn.forEach(t),tl=f(X),mo=l(X,"TD",{});var Un=n(mo);ol=r(Un,"\u201CIs greater than or equal to\u201D"),Un.forEach(t),al=f(X),$e=l(X,"TD",{});var Ho=n($e);rl=r(Ho,"Compares two values. If the first value is greater than or equal to the second, produce "),_o=l(Ho,"CODE",{});var Qn=n(_o);sl=r(Qn,"true"),Qn.forEach(t),ll=r(Ho,"; otherwise produce "),Eo=l(Ho,"CODE",{});var Xn=n(Eo);nl=r(Xn,"false"),Xn.forEach(t),Ho.forEach(t),dl=f(X),wo=l(X,"TD",{});var Zn=n(wo);$o=l(Zn,"CODE",{});var ed=n($o);cl=r(ed,"2 >= 1"),ed.forEach(t),Zn.forEach(t),il=f(X),bo=l(X,"TD",{});var td=n(bo);go=l(td,"CODE",{});var od=n(go);fl=r(od,"true"),od.forEach(t),td.forEach(t),X.forEach(t),j.forEach(t),sa.forEach(t),ta=f(o),be=l(o,"P",{});var la=n(be);hl=r(la,"Try them out in your variables, and use them in "),yo=l(la,"CODE",{});var ad=n(yo);ul=r(ad,"[if ]"),ad.forEach(t),pl=r(la," statements to create interactive passages that respond to user\u2019s choices!"),la.forEach(t),this.h()},h(){ne(De,"class","language-undefined"),ne(Te,"class","language-undefined")},m(o,c){h(o,d,c),e(d,p),h(o,u,c),h(o,v,c),e(v,m),e(v,C),e(C,x),e(v,Pe),e(v,I),e(I,Be),e(v,A),e(v,ge),e(ge,_),e(v,Y),e(v,ye),e(ye,Me),e(v,Ye),ae(G,v,null),e(v,Le),ae(de,v,null),e(v,da),h(o,Po,c),h(o,L,c),e(L,ca),e(L,Se),e(Se,ia),e(L,fa),e(L,We),e(We,ha),e(L,ua),e(L,je),e(je,pa),e(L,va),h(o,Bo,c),h(o,De,c),De.innerHTML=dd,h(o,Mo,c),h(o,D,c),e(D,ma),e(D,Ae),e(Ae,_a),e(D,Ea),e(D,ze),e(ze,wa),e(D,$a),e(D,Ge),e(Ge,ba),e(D,ga),e(D,Ve),e(Ve,ya),e(D,Da),e(D,Fe),e(Fe,Ta),e(D,Ca),h(o,Yo,c),h(o,Lo,c),h(o,So,c),h(o,Oe,c),e(Oe,Oa),h(o,Wo,c),h(o,T,c),e(T,xa),e(T,Ne),e(Ne,Ia),e(T,ka),e(T,Je),e(Je,Ra),e(T,Ha),ae(ce,T,null),e(T,qa),e(T,Ke),e(Ke,Pa),e(T,Ba),e(T,Ue),e(Ue,Ma),e(T,Ya),h(o,jo,c),ae(ie,o,c),h(o,Ao,c),h(o,E,c),e(E,La),e(E,Qe),e(Qe,Sa),e(E,Wa),e(E,Xe),e(Xe,ja),e(E,Aa),e(E,Ze),e(Ze,za),e(E,Ga),e(E,et),e(et,Va),e(E,Fa),e(E,tt),e(tt,Na),e(E,Ja),e(E,ot),e(ot,Ka),e(E,Ua),e(E,at),e(at,Qa),e(E,Xa),e(E,rt),e(rt,Za),e(E,er),e(E,st),e(st,tr),e(E,or),h(o,zo,c),h(o,V,c),e(V,ar),e(V,lt),e(lt,rr),e(V,sr),ae(fe,V,null),e(V,lr),h(o,Go,c),h(o,Te,c),Te.innerHTML=cd,h(o,Vo,c),h(o,w,c),e(w,nr),e(w,nt),e(nt,dr),e(w,cr),e(w,dt),e(dt,ir),e(w,fr),e(w,ct),e(ct,hr),e(w,ur),e(w,it),e(it,pr),e(w,vr),e(w,ft),e(ft,mr),e(w,_r),e(w,ht),e(ht,Er),e(w,wr),e(w,ut),e(ut,$r),e(w,br),e(w,pt),e(pt,gr),e(w,yr),h(o,Fo,c),h(o,he,c),e(he,Dr),ae(ue,he,null),e(he,Tr),h(o,No,c),h(o,xe,c),ae(Ce,xe,null),h(o,Jo,c),ae(pe,o,c),h(o,Ko,c),h(o,ve,c),e(ve,Cr),e(ve,vt),e(vt,Or),e(ve,xr),h(o,Uo,c),h(o,Qo,c),h(o,Xo,c),h(o,Ie,c),e(Ie,Ir),h(o,Zo,c),h(o,ke,c),e(ke,kr),h(o,ea,c),h(o,me,c),e(me,mt),e(mt,k),e(k,_t),e(_t,Rr),e(k,Hr),e(k,Et),e(Et,qr),e(k,Pr),e(k,wt),e(wt,Br),e(k,Mr),e(k,$t),e($t,Yr),e(k,Lr),e(k,bt),e(bt,Sr),e(me,Wr),e(me,O),e(O,R),e(R,gt),e(gt,yt),e(yt,jr),e(R,Ar),e(R,Dt),e(Dt,zr),e(R,Gr),e(R,_e),e(_e,Vr),e(_e,Tt),e(Tt,Fr),e(_e,Nr),e(_e,Ct),e(Ct,Jr),e(R,Kr),e(R,Ot),e(Ot,xt),e(xt,Ur),e(R,Qr),e(R,It),e(It,kt),e(kt,Xr),e(O,Zr),e(O,H),e(H,Rt),e(Rt,Ht),e(Ht,es),e(H,ts),e(H,qt),e(qt,os),e(H,as),e(H,Z),e(Z,rs),e(Z,Pt),e(Pt,ss),e(Z,ls),e(Z,Bt),e(Bt,ns),e(Z,ds),e(H,cs),e(H,Mt),e(Mt,Yt),e(Yt,is),e(H,fs),e(H,Lt),e(Lt,St),e(St,hs),e(O,us),e(O,q),e(q,Wt),e(Wt,jt),e(jt,ps),e(q,vs),e(q,At),e(At,ms),e(q,_s),e(q,ee),e(ee,Es),e(ee,zt),e(zt,ws),e(ee,$s),e(ee,Gt),e(Gt,bs),e(ee,gs),e(q,ys),e(q,Vt),e(Vt,Ft),e(Ft,Ds),e(q,Ts),e(q,Nt),e(Nt,Jt),e(Jt,Cs),e(O,Os),e(O,P),e(P,Kt),e(Kt,Ut),e(Ut,xs),e(P,Is),e(P,Qt),e(Qt,ks),e(P,Rs),e(P,Ee),e(Ee,Hs),e(Ee,Xt),e(Xt,qs),e(Ee,Ps),e(Ee,Zt),e(Zt,Bs),e(P,Ms),e(P,eo),e(eo,to),e(to,Ys),e(P,Ls),e(P,oo),e(oo,ao),e(ao,Ss),e(O,Ws),e(O,B),e(B,ro),e(ro,so),e(so,js),e(B,As),e(B,lo),e(lo,zs),e(B,Gs),e(B,we),e(we,Vs),e(we,no),e(no,Fs),e(we,Ns),e(we,co),e(co,Js),e(B,Ks),e(B,io),e(io,fo),e(fo,Us),e(B,Qs),e(B,ho),e(ho,uo),e(uo,Xs),e(O,Zs),e(O,M),e(M,po),e(po,vo),e(vo,el),e(M,tl),e(M,mo),e(mo,ol),e(M,al),e(M,$e),e($e,rl),e($e,_o),e(_o,sl),e($e,ll),e($e,Eo),e(Eo,nl),e(M,dl),e(M,wo),e(wo,$o),e($o,cl),e(M,il),e(M,bo),e(bo,go),e(go,fl),h(o,ta,c),h(o,be,c),e(be,hl),e(be,yo),e(yo,ul),e(be,pl),oa=!0},p(o,c){const y={};c&2&&(y.$$scope={dirty:c,ctx:o}),G.$set(y);const Do={};c&2&&(Do.$$scope={dirty:c,ctx:o}),de.$set(Do);const To={};c&2&&(To.$$scope={dirty:c,ctx:o}),ce.$set(To);const Co={};c&2&&(Co.$$scope={dirty:c,ctx:o}),ie.$set(Co);const Oo={};c&2&&(Oo.$$scope={dirty:c,ctx:o}),fe.$set(Oo);const z={};c&2&&(z.$$scope={dirty:c,ctx:o}),ue.$set(z);const xo={};c&2&&(xo.$$scope={dirty:c,ctx:o}),pe.$set(xo)},i(o){oa||(re(G.$$.fragment,o),re(de.$$.fragment,o),re(ce.$$.fragment,o),re(ie.$$.fragment,o),re(fe.$$.fragment,o),re(ue.$$.fragment,o),re(Ce.$$.fragment,o),re(pe.$$.fragment,o),oa=!0)},o(o){se(G.$$.fragment,o),se(de.$$.fragment,o),se(ce.$$.fragment,o),se(ie.$$.fragment,o),se(fe.$$.fragment,o),se(ue.$$.fragment,o),se(Ce.$$.fragment,o),se(pe.$$.fragment,o),oa=!1},d(o){o&&t(d),o&&t(u),o&&t(v),le(G),le(de),o&&t(Po),o&&t(L),o&&t(Bo),o&&t(De),o&&t(Mo),o&&t(D),o&&t(Yo),o&&t(Lo),o&&t(So),o&&t(Oe),o&&t(Wo),o&&t(T),le(ce),o&&t(jo),le(ie,o),o&&t(Ao),o&&t(E),o&&t(zo),o&&t(V),le(fe),o&&t(Go),o&&t(Te),o&&t(Vo),o&&t(w),o&&t(Fo),o&&t(he),le(ue),o&&t(No),o&&t(xe),le(Ce),o&&t(Jo),le(pe,o),o&&t(Ko),o&&t(ve),o&&t(Uo),o&&t(Qo),o&&t(Xo),o&&t(Ie),o&&t(Zo),o&&t(ke),o&&t(ea),o&&t(me),o&&t(ta),o&&t(be)}}}function Cd($){let d,p;const u=[$[0],nd];let v={$$slots:{default:[Td]},$$scope:{ctx:$}};for(let m=0;m<u.length;m+=1)v=vl(v,u[m]);return d=new md({props:v}),{c(){te(d.$$.fragment)},l(m){oe(d.$$.fragment,m)},m(m,C){ae(d,m,C),p=!0},p(m,[C]){const x=C&1?vd(u,[C&1&&rd(m[0]),C&0&&rd(nd)]):{};C&2&&(x.$$scope={dirty:C,ctx:m}),d.$set(x)},i(m){p||(re(d.$$.fragment,m),p=!0)},o(m){se(d.$$.fragment,m),p=!1},d(m){le(d,m)}}}const nd={title:"Relational Expressions",author:"Jon Stapleton",short:"Learn how to write relational expressions",description:`Relational expressions (or "Boolean" expressions) are a way of having the computer compare two or more values and produce a value of "true" or "false" based on the comparison. Because "true" and "false" variable values are such an important part of "if" statements and other conditional control structures, you'll find lots of uses for relational expressions in your stories that use "if" and "unless" blocks.`,video:"https://www.youtube.com/embed/YCEIuIyP1Yg",type:"tutorial",layout:"location"};function Od($,d,p){return $.$$set=u=>{p(0,d=vl(vl({},d),sd(u)))},d=sd(d),[d]}class Rd extends hd{constructor(d){super(),ud(this,d,Od,Cd,pd,{})}}export{Rd as default,nd as metadata};
