function N(){}const at=t=>t;function ft(t,e){for(const n in e)t[n]=e[n];return t}function V(t){return t()}function I(){return Object.create(null)}function b(t){t.forEach(V)}function X(t){return typeof t=="function"}function zt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let k;function Ft(t,e){return k||(k=document.createElement("a")),k.href=e,t===k.href}function _t(t){return Object.keys(t).length===0}function dt(t,...e){if(t==null)return N;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Gt(t,e,n){t.$$.on_destroy.push(dt(e,n))}function It(t,e,n,i){if(t){const r=Y(t,e,n,i);return t[0](r)}}function Y(t,e,n,i){return t[1]&&i?ft(n.ctx.slice(),t[1](i(e))):n.ctx}function Wt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const c=[],s=Math.max(e.dirty.length,r.length);for(let o=0;o<s;o+=1)c[o]=e.dirty[o]|r[o];return c}return e.dirty|r}return e.dirty}function Jt(t,e,n,i,r,c){if(r){const s=Y(e,n,i,c);t.p(s,r)}}function Kt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Qt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Ut(t){return t==null?"":t}const Z=typeof window<"u";let ht=Z?()=>window.performance.now():()=>Date.now(),B=Z?t=>requestAnimationFrame(t):N;const x=new Set;function tt(t){x.forEach(e=>{e.c(t)||(x.delete(e),e.f())}),x.size!==0&&B(tt)}function mt(t){let e;return x.size===0&&B(tt),{promise:new Promise(n=>{x.add(e={c:t,f:n})}),abort(){x.delete(e)}}}let D=!1;function pt(){D=!0}function yt(){D=!1}function gt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function xt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&l.push(_)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,_=(r>0&&e[n[r]].claim_order<=u?r+1:gt(1,r,a=>e[n[a]].claim_order,u))-1;i[l]=n[_]+1;const f=_+1;n[f]=l,r=Math.max(f,r)}const c=[],s=[];let o=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(c.push(e[l-1]);o>=l;o--)s.push(e[o]);o--}for(;o>=0;o--)s.push(e[o]);c.reverse(),s.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<s.length;l++){for(;u<c.length&&s[l].claim_order>=c[u].claim_order;)u++;const _=u<c.length?c[u]:null;t.insertBefore(s[l],_)}}function bt(t,e){t.appendChild(e)}function et(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function $t(t){const e=z("style");return wt(et(t),e),e.sheet}function wt(t,e){bt(t.head||t,e)}function vt(t,e){if(D){for(xt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Et(t,e,n){t.insertBefore(e,n||null)}function Nt(t,e,n){D&&!n?vt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function C(t){t.parentNode.removeChild(t)}function Vt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function z(t){return document.createElement(t)}function nt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function F(t){return document.createTextNode(t)}function Xt(){return F(" ")}function Yt(){return F("")}function Zt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function te(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ee(t,e,n){const i=new Set;for(let r=0;r<t.length;r+=1)t[r].checked&&i.add(t[r].__value);return n||i.delete(e),Array.from(i)}function At(t){return Array.from(t.childNodes)}function it(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function rt(t,e,n,i,r=!1){it(t);const c=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const o=t[s];if(e(o)){const l=n(o);return l===void 0?t.splice(s,1):t[s]=l,r||(t.claim_info.last_index=s),o}}for(let s=t.claim_info.last_index-1;s>=0;s--){const o=t[s];if(e(o)){const l=n(o);return l===void 0?t.splice(s,1):t[s]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,o}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function st(t,e,n,i){return rt(t,r=>r.nodeName===e,r=>{const c=[];for(let s=0;s<r.attributes.length;s++){const o=r.attributes[s];n[o.name]||c.push(o.name)}c.forEach(s=>r.removeAttribute(s))},()=>i(e))}function ne(t,e,n){return st(t,e,n,z)}function ie(t,e,n){return st(t,e,n,nt)}function kt(t,e){return rt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>F(e),!0)}function re(t){return kt(t," ")}function W(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return t.length}function se(t,e){const n=W(t,"HTML_TAG_START",0),i=W(t,"HTML_TAG_END",n);if(n===i)return new J(void 0,e);it(t);const r=t.splice(n,i-n+1);C(r[0]),C(r[r.length-1]);const c=r.slice(1,r.length-1);for(const s of c)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new J(c,e)}function le(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function oe(t,e){t.value=e==null?"":e}function ce(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Tt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}class St{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=nt(n.nodeName):this.e=z(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Et(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(C)}}class J extends St{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)Nt(this.t,this.n[n],e)}}const M=new Map;let H=0;function jt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Ct(t,e){const n={stylesheet:$t(e),rules:{}};return M.set(t,n),n}function K(t,e,n,i,r,c,s,o=0){const l=16.666/i;let u=`{
`;for(let p=0;p<=1;p+=l){const g=e+(n-e)*c(p);u+=p*100+`%{${s(g,1-g)}}
`}const _=u+`100% {${s(n,1-n)}}
}`,f=`__svelte_${jt(_)}_${o}`,a=et(t),{stylesheet:d,rules:h}=M.get(a)||Ct(a,t);h[f]||(h[f]=!0,d.insertRule(`@keyframes ${f} ${_}`,d.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${f} ${i}ms linear ${r}ms 1 both`,H+=1,f}function Mt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),H-=r,H||Ht())}function Ht(){B(()=>{H||(M.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),M.clear())})}let E;function v(t){E=t}function G(){if(!E)throw new Error("Function called outside component initialization");return E}function ue(t){G().$$.on_mount.push(t)}function ae(t){G().$$.after_update.push(t)}function fe(t){G().$$.on_destroy.push(t)}const w=[],Q=[],S=[],U=[],lt=Promise.resolve();let q=!1;function ot(){q||(q=!0,lt.then(ct))}function _e(){return ot(),lt}function R(t){S.push(t)}const O=new Set;let T=0;function ct(){const t=E;do{for(;T<w.length;){const e=w[T];T++,v(e),Rt(e.$$)}for(v(null),w.length=0,T=0;Q.length;)Q.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];O.has(n)||(O.add(n),n())}S.length=0}while(w.length);for(;U.length;)U.pop()();q=!1,O.clear(),v(t)}function Rt(t){if(t.fragment!==null){t.update(),b(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(R)}}let $;function Dt(){return $||($=Promise.resolve(),$.then(()=>{$=null})),$}function P(t,e,n){t.dispatchEvent(Tt(`${e?"intro":"outro"}${n}`))}const j=new Set;let m;function de(){m={r:0,c:[],p:m}}function he(){m.r||b(m.c),m=m.p}function Lt(t,e){t&&t.i&&(j.delete(t),t.i(e))}function me(t,e,n,i){if(t&&t.o){if(j.has(t))return;j.add(t),m.c.push(()=>{j.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Ot={duration:0};function pe(t,e,n,i){let r=e(t,n),c=i?0:1,s=null,o=null,l=null;function u(){l&&Mt(t,l)}function _(a,d){const h=a.b-c;return d*=Math.abs(h),{a:c,b:a.b,d:h,duration:d,start:a.start,end:a.start+d,group:a.group}}function f(a){const{delay:d=0,duration:h=300,easing:y=at,tick:p=N,css:g}=r||Ot,L={start:ht()+d,b:a};a||(L.group=m,m.r+=1),s||o?o=L:(g&&(u(),l=K(t,c,a,h,d,y,g)),a&&p(0,1),s=_(L,h),R(()=>P(t,a,"start")),mt(A=>{if(o&&A>o.start&&(s=_(o,h),o=null,P(t,s.b,"start"),g&&(u(),l=K(t,c,s.b,s.duration,0,y,r.css))),s){if(A>=s.end)p(c=s.b,1-c),P(t,s.b,"end"),o||(s.b?u():--s.group.r||b(s.group.c)),s=null;else if(A>=s.start){const ut=A-s.start;c=s.a+s.d*y(ut/s.duration),p(c,1-c)}}return!!(s||o)}))}return{run(a){X(r)?Dt().then(()=>{r=r(),f(a)}):f(a)},end(){u(),s=o=null}}}function ye(t,e){const n={},i={},r={$$scope:1};let c=t.length;for(;c--;){const s=t[c],o=e[c];if(o){for(const l in s)l in o||(i[l]=1);for(const l in o)r[l]||(n[l]=o[l],r[l]=1);t[c]=o}else for(const l in s)r[l]=1}for(const s in i)s in n||(n[s]=void 0);return n}function ge(t){return typeof t=="object"&&t!==null?t:{}}function xe(t){t&&t.c()}function be(t,e){t&&t.l(e)}function Pt(t,e,n,i){const{fragment:r,on_mount:c,on_destroy:s,after_update:o}=t.$$;r&&r.m(e,n),i||R(()=>{const l=c.map(V).filter(X);s?s.push(...l):b(l),t.$$.on_mount=[]}),o.forEach(R)}function qt(t,e){const n=t.$$;n.fragment!==null&&(b(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Bt(t,e){t.$$.dirty[0]===-1&&(w.push(t),ot(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function $e(t,e,n,i,r,c,s,o=[-1]){const l=E;v(t);const u=t.$$={fragment:null,ctx:null,props:c,update:N,not_equal:r,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:I(),dirty:o,skip_bound:!1,root:e.target||l.$$.root};s&&s(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(f,a,...d)=>{const h=d.length?d[0]:a;return u.ctx&&r(u.ctx[f],u.ctx[f]=h)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](h),_&&Bt(t,f)),a}):[],u.update(),_=!0,b(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){pt();const f=At(e.target);u.fragment&&u.fragment.l(f),f.forEach(C)}else u.fragment&&u.fragment.c();e.intro&&Lt(t.$$.fragment),Pt(t,e.target,e.anchor,e.customElement),yt(),ct()}v(l)}class we{$destroy(){qt(this,1),this.$destroy=N}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!_t(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{pe as $,N as A,It as B,Jt as C,Kt as D,Wt as E,Ft as F,vt as G,Zt as H,ft as I,ye as J,ge as K,Qt as L,oe as M,Vt as N,b as O,ee as P,nt as Q,ie as R,we as S,Ut as T,Gt as U,Q as V,J as W,se as X,at as Y,fe as Z,R as _,Xt as a,Nt as b,re as c,he as d,Yt as e,Lt as f,de as g,C as h,$e as i,ae as j,z as k,ne as l,At as m,te as n,ue as o,ce as p,F as q,kt as r,zt as s,me as t,le as u,xe as v,be as w,Pt as x,qt as y,_e as z};