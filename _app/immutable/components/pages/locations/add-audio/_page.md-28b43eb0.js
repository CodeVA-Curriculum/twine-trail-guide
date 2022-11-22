import{S as ra,i as ua,s as fa,I as uo,v as Qo,w as Uo,x as Vo,J as ca,K as No,f as Xo,t as Zo,y as ea,L as zo,k as s,q as a,a as f,l,m as i,r as n,h as o,c,n as Ne,b as r,G as t,A as ma}from"../../../../chunks/index-7d48f659.js";import{S as ha}from"../../../../chunks/Standalone-fc81574c.js";import{i as pa}from"../../../../chunks/Standalone.svelte_svelte_type_style_lang-a0abaa99.js";function va(L){let u,k,g,p,m,_,Y,ze,N,Be,Qe,z,Ue,Ve,we,x,B,Xe,Ze,Q,et,tt,U,ot,at,Te,xe,ke,j,nt,ge,O,st,V,lt,it,Ce,P,ta=`<code class="language-undefined">sound.ambient.rainfall.url: &#39;rainfall.mp3&#39;
sound.ambient.rainfall.description: &#39;the sound of falling rain&#39;
--

Here&#39;s some normal story text. Ambient sound is playing in the background.</code>`,Ae,y,dt,X,rt,ut,Z,ft,ct,ee,mt,ht,Oe,C,pt,te,vt,bt,oe,Et,_t,De,q,$,He,v,yt,ae,wt,Tt,ne,xt,kt,se,gt,Ct,le,At,Ot,ie,Dt,Ht,Pe,F,Pt,$e,I,oa=`<code class="language-undefined">sound.ambient.rainfall.url: &#39;rainfall.mp3&#39;
sound.ambient.rainfall.description: &#39;the sound of falling rain&#39;
--
&#123;ambient sound: &#39;rainfall&#39;&#125;

Here&#39;s some normal story text. Ambient sound is playing in the background.</code>`,Ie,b,$t,de,It,Mt,re,St,Rt,ue,Lt,Yt,fe,jt,qt,ce,Ft,Gt,Me,M,aa=`<code class="language-undefined">sound.ambient.storm.url: &#39;storm-file.mp3&#39;
sound.ambient.storm.description: &#39;The sound of a storm&#39;
--

&#123;ambient sound: &#39;storm&#39;&#125;

You hear wind and rain rushing toward you.</code>`,Se,h,Jt,me,Wt,Kt,he,Nt,zt,pe,Bt,Qt,ve,Ut,Vt,be,Xt,Zt,Ee,eo,to,Re,Le,Ye,G,oo,je,J,ao,qe,S,na=`<code class="language-undefined">sound.effect.boom.url: &#39;boom-audio.mp3&#39;
sound.effect.boom.description: &#39;a loud boom&#39;
--

You hear something in the distance...

&#123;sound effect: &#39;boom&#39;&#125;</code>`,Fe,A,no,_e,so,lo,ye,io,ro,Ge,Je,We;return $=new pa({props:{src:"/twine-audio-load.png",alt:"A Twine story showing text that reads Here is some normal story text. Ambient sound is playing in the background"}}),{c(){u=s("h2"),k=a("Embedding Audio"),g=f(),p=s("p"),m=a("While the process of creating and hosting recordings can be challenging, adding them to your Twine story isn\u2019t actually all that hard. The important thing to know is that the "),_=s("strong"),Y=a("Chapbook"),ze=a(" Twine format supports two kinds of audio: "),N=s("em"),Be=a("ambient"),Qe=a(" sounds and "),z=s("em"),Ue=a("sound effects"),Ve=a("."),we=f(),x=s("p"),B=s("em"),Xe=a("Ambient"),Ze=a(" sounds are long audio clips that fade in and provide background ambiance to a passage. "),Q=s("em"),et=a("Sound effects"),tt=a(" are short sounds that play once. You can experiment with both options and see which one works best; if you choose "),U=s("em"),ot=a("ambient"),at=a(", you might want to add a couple of seconds of lead-in to any audio clips that include important information (like someone\u2019s voice)."),Te=f(),xe=s("hr"),ke=f(),j=s("h2"),nt=a("Adding Ambient Sounds"),ge=f(),O=s("p"),st=a("To add an ambient sound to your passage, you\u2019ll need to add some information about the sound\u2014it\u2019s name and url\u2014and then a line to activate the sound. Here\u2019s an example of a Twine passage that sets up an audio file called "),V=s("code"),lt=a("rainfall.mp3"),it=a(":"),Ce=f(),P=s("pre"),Ae=f(),y=s("p"),dt=a("I\u2019ve written the passage above in two sections: the section "),X=s("em"),rt=a("above"),ut=a(" the "),Z=s("code"),ft=a("--"),ct=a(", and the section "),ee=s("em"),mt=a("below"),ht=a(" it. This separation is incredibly important."),Oe=f(),C=s("p"),pt=a("The text "),te=s("em"),vt=a("above"),bt=a(" the "),oe=s("code"),Et=a("--"),_t=a(" will not appear in the passage\u2014when I test out the passage I\u2019ve created above, it looks like this:"),De=f(),q=s("p"),Qo($.$$.fragment),He=f(),v=s("p"),yt=a("The text "),ae=s("em"),wt=a("below"),Tt=a(" the "),ne=s("code"),xt=a("--"),kt=a(" appears as normal. The rules for writing above the "),se=s("code"),gt=a("--"),Ct=a(" are different than the rules for below; it\u2019s very, very important to be precise in your spelling, your use of "),le=s("code"),At=a("'"),Ot=a(", and the "),ie=s("code"),Dt=a(":"),Ht=a(" on each line. Follow the example closely, or Twine will not know how to interpret your code."),Pe=f(),F=s("p"),Pt=a("Right now, the example passage I\u2019ve created doesn\u2019t make any sounds. It just loads the sound. To play it, I need to add another line:"),$e=f(),I=s("pre"),Ie=f(),b=s("p"),$t=a("The line that activates the sound is related to the code above the "),de=s("code"),It=a("--"),Mt=a(": the "),re=s("em"),St=a("name"),Rt=a(" of the sound after the "),ue=s("code"),Lt=a(":"),Yt=a(" in the activation line should match the word that comes after "),fe=s("code"),jt=a("sound.ambient"),qt=a(" in the code section. So if I wanted to activate a sound called "),ce=s("code"),Ft=a("'storm'"),Gt=a(", my code would look like this:"),Me=f(),M=s("pre"),Se=f(),h=s("p"),Jt=a("Your "),me=s("code"),Wt=a("url"),Kt=a(" should match the link or filename for your sound, and the "),he=s("code"),Nt=a("name"),zt=a(" in your activation line "),pe=s("code"),Bt=a("{ambient sound: 'name'}"),Qt=a(" should match the code above the "),ve=s("code"),Ut=a("--"),Vt=a(": "),be=s("code"),Xt=a("sound.ambient.name.url"),Zt=a(" and "),Ee=s("code"),eo=a("sound.ambient.name.description"),to=a("."),Re=f(),Le=s("hr"),Ye=f(),G=s("h2"),oo=a("Adding Sound Effects"),je=f(),J=s("p"),ao=a("Adding sound effects is exactly the same as adding ambient sounds, except sound effects play only once and do not fade in and out. Here\u2019s an example:"),qe=f(),S=s("pre"),Fe=f(),A=s("p"),no=a("Everything is basically the same as it is with ambient sounds, except you use "),_e=s("code"),so=a("sound.effect"),lo=a(" in your code instead of "),ye=s("code"),io=a("sound.ambient"),ro=a("."),Ge=f(),Je=s("hr"),this.h()},l(e){u=l(e,"H2",{});var d=i(u);k=n(d,"Embedding Audio"),d.forEach(o),g=c(e),p=l(e,"P",{});var D=i(p);m=n(D,"While the process of creating and hosting recordings can be challenging, adding them to your Twine story isn\u2019t actually all that hard. The important thing to know is that the "),_=l(D,"STRONG",{});var fo=i(_);Y=n(fo,"Chapbook"),fo.forEach(o),ze=n(D," Twine format supports two kinds of audio: "),N=l(D,"EM",{});var co=i(N);Be=n(co,"ambient"),co.forEach(o),Qe=n(D," sounds and "),z=l(D,"EM",{});var mo=i(z);Ue=n(mo,"sound effects"),mo.forEach(o),Ve=n(D,"."),D.forEach(o),we=c(e),x=l(e,"P",{});var R=i(x);B=l(R,"EM",{});var ho=i(B);Xe=n(ho,"Ambient"),ho.forEach(o),Ze=n(R," sounds are long audio clips that fade in and provide background ambiance to a passage. "),Q=l(R,"EM",{});var po=i(Q);et=n(po,"Sound effects"),po.forEach(o),tt=n(R," are short sounds that play once. You can experiment with both options and see which one works best; if you choose "),U=l(R,"EM",{});var vo=i(U);ot=n(vo,"ambient"),vo.forEach(o),at=n(R,", you might want to add a couple of seconds of lead-in to any audio clips that include important information (like someone\u2019s voice)."),R.forEach(o),Te=c(e),xe=l(e,"HR",{}),ke=c(e),j=l(e,"H2",{});var bo=i(j);nt=n(bo,"Adding Ambient Sounds"),bo.forEach(o),ge=c(e),O=l(e,"P",{});var Ke=i(O);st=n(Ke,"To add an ambient sound to your passage, you\u2019ll need to add some information about the sound\u2014it\u2019s name and url\u2014and then a line to activate the sound. Here\u2019s an example of a Twine passage that sets up an audio file called "),V=l(Ke,"CODE",{});var Eo=i(V);lt=n(Eo,"rainfall.mp3"),Eo.forEach(o),it=n(Ke,":"),Ke.forEach(o),Ce=c(e),P=l(e,"PRE",{class:!0});var sa=i(P);sa.forEach(o),Ae=c(e),y=l(e,"P",{});var H=i(y);dt=n(H,"I\u2019ve written the passage above in two sections: the section "),X=l(H,"EM",{});var _o=i(X);rt=n(_o,"above"),_o.forEach(o),ut=n(H," the "),Z=l(H,"CODE",{});var yo=i(Z);ft=n(yo,"--"),yo.forEach(o),ct=n(H,", and the section "),ee=l(H,"EM",{});var wo=i(ee);mt=n(wo,"below"),wo.forEach(o),ht=n(H," it. This separation is incredibly important."),H.forEach(o),Oe=c(e),C=l(e,"P",{});var W=i(C);pt=n(W,"The text "),te=l(W,"EM",{});var To=i(te);vt=n(To,"above"),To.forEach(o),bt=n(W," the "),oe=l(W,"CODE",{});var xo=i(oe);Et=n(xo,"--"),xo.forEach(o),_t=n(W," will not appear in the passage\u2014when I test out the passage I\u2019ve created above, it looks like this:"),W.forEach(o),De=c(e),q=l(e,"P",{});var ko=i(q);Uo($.$$.fragment,ko),ko.forEach(o),He=c(e),v=l(e,"P",{});var w=i(v);yt=n(w,"The text "),ae=l(w,"EM",{});var go=i(ae);wt=n(go,"below"),go.forEach(o),Tt=n(w," the "),ne=l(w,"CODE",{});var Co=i(ne);xt=n(Co,"--"),Co.forEach(o),kt=n(w," appears as normal. The rules for writing above the "),se=l(w,"CODE",{});var Ao=i(se);gt=n(Ao,"--"),Ao.forEach(o),Ct=n(w," are different than the rules for below; it\u2019s very, very important to be precise in your spelling, your use of "),le=l(w,"CODE",{});var Oo=i(le);At=n(Oo,"'"),Oo.forEach(o),Ot=n(w,", and the "),ie=l(w,"CODE",{});var Do=i(ie);Dt=n(Do,":"),Do.forEach(o),Ht=n(w," on each line. Follow the example closely, or Twine will not know how to interpret your code."),w.forEach(o),Pe=c(e),F=l(e,"P",{});var Ho=i(F);Pt=n(Ho,"Right now, the example passage I\u2019ve created doesn\u2019t make any sounds. It just loads the sound. To play it, I need to add another line:"),Ho.forEach(o),$e=c(e),I=l(e,"PRE",{class:!0});var la=i(I);la.forEach(o),Ie=c(e),b=l(e,"P",{});var T=i(b);$t=n(T,"The line that activates the sound is related to the code above the "),de=l(T,"CODE",{});var Po=i(de);It=n(Po,"--"),Po.forEach(o),Mt=n(T,": the "),re=l(T,"EM",{});var $o=i(re);St=n($o,"name"),$o.forEach(o),Rt=n(T," of the sound after the "),ue=l(T,"CODE",{});var Io=i(ue);Lt=n(Io,":"),Io.forEach(o),Yt=n(T," in the activation line should match the word that comes after "),fe=l(T,"CODE",{});var Mo=i(fe);jt=n(Mo,"sound.ambient"),Mo.forEach(o),qt=n(T," in the code section. So if I wanted to activate a sound called "),ce=l(T,"CODE",{});var So=i(ce);Ft=n(So,"'storm'"),So.forEach(o),Gt=n(T,", my code would look like this:"),T.forEach(o),Me=c(e),M=l(e,"PRE",{class:!0});var ia=i(M);ia.forEach(o),Se=c(e),h=l(e,"P",{});var E=i(h);Jt=n(E,"Your "),me=l(E,"CODE",{});var Ro=i(me);Wt=n(Ro,"url"),Ro.forEach(o),Kt=n(E," should match the link or filename for your sound, and the "),he=l(E,"CODE",{});var Lo=i(he);Nt=n(Lo,"name"),Lo.forEach(o),zt=n(E," in your activation line "),pe=l(E,"CODE",{});var Yo=i(pe);Bt=n(Yo,"{ambient sound: 'name'}"),Yo.forEach(o),Qt=n(E," should match the code above the "),ve=l(E,"CODE",{});var jo=i(ve);Ut=n(jo,"--"),jo.forEach(o),Vt=n(E,": "),be=l(E,"CODE",{});var qo=i(be);Xt=n(qo,"sound.ambient.name.url"),qo.forEach(o),Zt=n(E," and "),Ee=l(E,"CODE",{});var Fo=i(Ee);eo=n(Fo,"sound.ambient.name.description"),Fo.forEach(o),to=n(E,"."),E.forEach(o),Re=c(e),Le=l(e,"HR",{}),Ye=c(e),G=l(e,"H2",{});var Go=i(G);oo=n(Go,"Adding Sound Effects"),Go.forEach(o),je=c(e),J=l(e,"P",{});var Jo=i(J);ao=n(Jo,"Adding sound effects is exactly the same as adding ambient sounds, except sound effects play only once and do not fade in and out. Here\u2019s an example:"),Jo.forEach(o),qe=c(e),S=l(e,"PRE",{class:!0});var da=i(S);da.forEach(o),Fe=c(e),A=l(e,"P",{});var K=i(A);no=n(K,"Everything is basically the same as it is with ambient sounds, except you use "),_e=l(K,"CODE",{});var Wo=i(_e);so=n(Wo,"sound.effect"),Wo.forEach(o),lo=n(K," in your code instead of "),ye=l(K,"CODE",{});var Ko=i(ye);io=n(Ko,"sound.ambient"),Ko.forEach(o),ro=n(K,"."),K.forEach(o),Ge=c(e),Je=l(e,"HR",{}),this.h()},h(){Ne(P,"class","language-undefined"),Ne(I,"class","language-undefined"),Ne(M,"class","language-undefined"),Ne(S,"class","language-undefined")},m(e,d){r(e,u,d),t(u,k),r(e,g,d),r(e,p,d),t(p,m),t(p,_),t(_,Y),t(p,ze),t(p,N),t(N,Be),t(p,Qe),t(p,z),t(z,Ue),t(p,Ve),r(e,we,d),r(e,x,d),t(x,B),t(B,Xe),t(x,Ze),t(x,Q),t(Q,et),t(x,tt),t(x,U),t(U,ot),t(x,at),r(e,Te,d),r(e,xe,d),r(e,ke,d),r(e,j,d),t(j,nt),r(e,ge,d),r(e,O,d),t(O,st),t(O,V),t(V,lt),t(O,it),r(e,Ce,d),r(e,P,d),P.innerHTML=ta,r(e,Ae,d),r(e,y,d),t(y,dt),t(y,X),t(X,rt),t(y,ut),t(y,Z),t(Z,ft),t(y,ct),t(y,ee),t(ee,mt),t(y,ht),r(e,Oe,d),r(e,C,d),t(C,pt),t(C,te),t(te,vt),t(C,bt),t(C,oe),t(oe,Et),t(C,_t),r(e,De,d),r(e,q,d),Vo($,q,null),r(e,He,d),r(e,v,d),t(v,yt),t(v,ae),t(ae,wt),t(v,Tt),t(v,ne),t(ne,xt),t(v,kt),t(v,se),t(se,gt),t(v,Ct),t(v,le),t(le,At),t(v,Ot),t(v,ie),t(ie,Dt),t(v,Ht),r(e,Pe,d),r(e,F,d),t(F,Pt),r(e,$e,d),r(e,I,d),I.innerHTML=oa,r(e,Ie,d),r(e,b,d),t(b,$t),t(b,de),t(de,It),t(b,Mt),t(b,re),t(re,St),t(b,Rt),t(b,ue),t(ue,Lt),t(b,Yt),t(b,fe),t(fe,jt),t(b,qt),t(b,ce),t(ce,Ft),t(b,Gt),r(e,Me,d),r(e,M,d),M.innerHTML=aa,r(e,Se,d),r(e,h,d),t(h,Jt),t(h,me),t(me,Wt),t(h,Kt),t(h,he),t(he,Nt),t(h,zt),t(h,pe),t(pe,Bt),t(h,Qt),t(h,ve),t(ve,Ut),t(h,Vt),t(h,be),t(be,Xt),t(h,Zt),t(h,Ee),t(Ee,eo),t(h,to),r(e,Re,d),r(e,Le,d),r(e,Ye,d),r(e,G,d),t(G,oo),r(e,je,d),r(e,J,d),t(J,ao),r(e,qe,d),r(e,S,d),S.innerHTML=na,r(e,Fe,d),r(e,A,d),t(A,no),t(A,_e),t(_e,so),t(A,lo),t(A,ye),t(ye,io),t(A,ro),r(e,Ge,d),r(e,Je,d),We=!0},p:ma,i(e){We||(Xo($.$$.fragment,e),We=!0)},o(e){Zo($.$$.fragment,e),We=!1},d(e){e&&o(u),e&&o(g),e&&o(p),e&&o(we),e&&o(x),e&&o(Te),e&&o(xe),e&&o(ke),e&&o(j),e&&o(ge),e&&o(O),e&&o(Ce),e&&o(P),e&&o(Ae),e&&o(y),e&&o(Oe),e&&o(C),e&&o(De),e&&o(q),ea($),e&&o(He),e&&o(v),e&&o(Pe),e&&o(F),e&&o($e),e&&o(I),e&&o(Ie),e&&o(b),e&&o(Me),e&&o(M),e&&o(Se),e&&o(h),e&&o(Re),e&&o(Le),e&&o(Ye),e&&o(G),e&&o(je),e&&o(J),e&&o(qe),e&&o(S),e&&o(Fe),e&&o(A),e&&o(Ge),e&&o(Je)}}}function ba(L){let u,k;const g=[L[0],Bo];let p={$$slots:{default:[va]},$$scope:{ctx:L}};for(let m=0;m<g.length;m+=1)p=uo(p,g[m]);return u=new ha({props:p}),{c(){Qo(u.$$.fragment)},l(m){Uo(u.$$.fragment,m)},m(m,_){Vo(u,m,_),k=!0},p(m,[_]){const Y=_&1?ca(g,[_&1&&No(m[0]),_&0&&No(Bo)]):{};_&2&&(Y.$$scope={dirty:_,ctx:m}),u.$set(Y)},i(m){k||(Xo(u.$$.fragment,m),k=!0)},o(m){Zo(u.$$.fragment,m),k=!1},d(m){ea(u,m)}}}const Bo={title:"Add Audio",author:"Jon Stapleton",short:"Learn how to add sound to your Twine passages.",description:"Adding sound is a great way of creating an immersive atmosphere in your story. Recording and figuring out how to host these recordings can be a hassle, but once you get to the point where you are ready to embed them in your story it isn't so bad. This tutorial shows you how to add audio to a Twine passage, and explains the difference between 'ambient' sounds and 'sound effects' in the Chapbook Twine format.",type:"tutorial",layout:"location"};function Ea(L,u,k){return L.$$set=g=>{k(0,u=uo(uo({},u),zo(g)))},u=zo(u),[u]}class Ta extends ra{constructor(u){super(),ua(this,u,Ea,ba,fa,{})}}export{Ta as default,Bo as metadata};
