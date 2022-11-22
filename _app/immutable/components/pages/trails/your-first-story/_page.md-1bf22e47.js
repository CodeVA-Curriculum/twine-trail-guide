import{S as A,i as B,s as D,I as H,v as u,w as p,x as c,J as E,K,f as _,t as h,y as w,L as P,a as d,k as G,c as g,l as N,b as f,h as $,q as j,r as C}from"../../../../chunks/index-7d48f659.js";import{T as O,a as Q,M as x}from"../../../../chunks/Trail-209741cd.js";import{b as R,a as U}from"../../../../chunks/Standalone.svelte_svelte_type_style_lang-a0abaa99.js";function V(m){let t;return{c(){t=j("This trail is intended to introduce beginners to Twine, and help them create a simple interactive story. Follow this trail to learn the basics! You\u2019ll learn about how to use the Twine interface, how to write and test the different parts of your story, how to link scenes together, and how to create a simple choose-your-own-adventure-style story that offers choices for the reader that affect the outcome.")},l(o){t=C(o,"This trail is intended to introduce beginners to Twine, and help them create a simple interactive story. Follow this trail to learn the basics! You\u2019ll learn about how to use the Twine interface, how to write and test the different parts of your story, how to link scenes together, and how to create a simple choose-your-own-adventure-style story that offers choices for the reader that affect the outcome.")},m(o,n){f(o,t,n)},d(o){o&&$(t)}}}function W(m){let t;return{c(){t=j("trails")},l(o){t=C(o,"trails")},m(o,n){f(o,t,n)},d(o){o&&$(t)}}}function X(m){let t,o,n,i;return o=new U({props:{href:"/trails",$$slots:{default:[W]},$$scope:{ctx:m}}}),{c(){t=j("You don\u2019t need any prerequisite knowledge to get started with this trail. Many of the other "),u(o.$$.fragment),n=j(" in this guide will build on the skills you develop here.")},l(s){t=C(s,"You don\u2019t need any prerequisite knowledge to get started with this trail. Many of the other "),p(o.$$.fragment,s),n=C(s," in this guide will build on the skills you develop here.")},m(s,a){f(s,t,a),c(o,s,a),f(s,n,a),i=!0},p(s,a){const l={};a&2&&(l.$$scope={dirty:a,ctx:s}),o.$set(l)},i(s){i||(_(o.$$.fragment,s),i=!0)},o(s){h(o.$$.fragment,s),i=!1},d(s){s&&$(t),w(o,s),s&&$(n)}}}function Z(m){let t,o,n,i,s,a,l,Y,y,q,b,F,v,M,T,S,k,L;return t=new R({props:{$$slots:{default:[V]},$$scope:{ctx:m}}}),n=new R({props:{$$slots:{default:[X]},$$scope:{ctx:m}}}),l=new Q({}),y=new x({props:{path:"start-a-story"}}),b=new x({props:{path:"create-passage"}}),v=new x({props:{path:"link-passages"}}),T=new x({props:{path:"branching-paths"}}),k=new x({props:{path:"story-with-multiple-endings"}}),{c(){u(t.$$.fragment),o=d(),u(n.$$.fragment),i=d(),s=G("hr"),a=d(),u(l.$$.fragment),Y=d(),u(y.$$.fragment),q=d(),u(b.$$.fragment),F=d(),u(v.$$.fragment),M=d(),u(T.$$.fragment),S=d(),u(k.$$.fragment)},l(e){p(t.$$.fragment,e),o=g(e),p(n.$$.fragment,e),i=g(e),s=N(e,"HR",{}),a=g(e),p(l.$$.fragment,e),Y=g(e),p(y.$$.fragment,e),q=g(e),p(b.$$.fragment,e),F=g(e),p(v.$$.fragment,e),M=g(e),p(T.$$.fragment,e),S=g(e),p(k.$$.fragment,e)},m(e,r){c(t,e,r),f(e,o,r),c(n,e,r),f(e,i,r),f(e,s,r),f(e,a,r),c(l,e,r),f(e,Y,r),c(y,e,r),f(e,q,r),c(b,e,r),f(e,F,r),c(v,e,r),f(e,M,r),c(T,e,r),f(e,S,r),c(k,e,r),L=!0},p(e,r){const I={};r&2&&(I.$$scope={dirty:r,ctx:e}),t.$set(I);const J={};r&2&&(J.$$scope={dirty:r,ctx:e}),n.$set(J)},i(e){L||(_(t.$$.fragment,e),_(n.$$.fragment,e),_(l.$$.fragment,e),_(y.$$.fragment,e),_(b.$$.fragment,e),_(v.$$.fragment,e),_(T.$$.fragment,e),_(k.$$.fragment,e),L=!0)},o(e){h(t.$$.fragment,e),h(n.$$.fragment,e),h(l.$$.fragment,e),h(y.$$.fragment,e),h(b.$$.fragment,e),h(v.$$.fragment,e),h(T.$$.fragment,e),h(k.$$.fragment,e),L=!1},d(e){w(t,e),e&&$(o),w(n,e),e&&$(i),e&&$(s),e&&$(a),w(l,e),e&&$(Y),w(y,e),e&&$(q),w(b,e),e&&$(F),w(v,e),e&&$(M),w(T,e),e&&$(S),w(k,e)}}}function ee(m){let t,o;const n=[m[0],z];let i={$$slots:{default:[Z]},$$scope:{ctx:m}};for(let s=0;s<n.length;s+=1)i=H(i,n[s]);return t=new O({props:i}),{c(){u(t.$$.fragment)},l(s){p(t.$$.fragment,s)},m(s,a){c(t,s,a),o=!0},p(s,[a]){const l=a&1?E(n,[a&1&&K(s[0]),a&0&&K(z)]):{};a&2&&(l.$$scope={dirty:a,ctx:s}),t.$set(l)},i(s){o||(_(t.$$.fragment,s),o=!0)},o(s){h(t.$$.fragment,s),o=!1},d(s){w(t,s)}}}const z={title:"Your First Story",difficulty:0,description:"This trail is intended to introduce beginners to Twine, and help them create a simple interactive story. Follow this trail to learn the basics! You'll learn about how to use the Twine interface, how to write and test the different parts of your story, how to link scenes together, and how to create a simple choose-your-own-adventure-style story that offers choices for the reader than affect the outcome.",layout:"trail"};function te(m,t,o){return m.$$set=n=>{o(0,t=H(H({},t),P(n)))},t=P(t),[t]}class re extends A{constructor(t){super(),B(this,t,te,ee,D,{})}}export{re as default,z as metadata};
