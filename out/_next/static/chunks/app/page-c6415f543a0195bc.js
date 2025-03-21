(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{2824:function(e,t,a){Promise.resolve().then(a.bind(a,2786))},2786:function(e,t,a){"use strict";let i,r;a.r(t),a.d(t,{default:function(){return eh}});var o,s=a(7437),n=a(2265),l=a(9448),c=a(4530);function d(e){let{steps:t,currentStep:a}=e;return(0,s.jsx)("div",{className:"py-8",children:(0,s.jsx)("nav",{"aria-label":"Progress",children:(0,s.jsx)("ol",{role:"list",className:"flex items-center justify-between",children:t.map((e,t)=>(0,s.jsx)("li",{className:"relative flex flex-col items-center",children:(0,s.jsxs)(l.E.div,{className:"relative flex flex-col items-center group",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1*t},children:[(0,s.jsx)(l.E.div,{className:"h-20 flex items-center",initial:{scale:.8},animate:{scale:1},transition:{duration:.3,delay:.1*t},children:(0,s.jsx)(l.E.div,{className:"relative z-10 w-20 h-20 flex items-center justify-center rounded-full ".concat(e.id<a?"bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-purple-500/30":e.id===a?"bg-white/10 backdrop-blur-lg border-2 border-purple-400 shadow-lg shadow-purple-500/20":"bg-white/5 backdrop-blur-lg"," transition-all duration-500"),whileHover:{scale:1.1},whileTap:{scale:.95},children:e.id<a?(0,s.jsx)(l.E.div,{initial:{scale:0},animate:{scale:1},transition:{type:"spring",stiffness:200,damping:10},children:(0,s.jsx)(c.Z,{className:"w-10 h-10 text-white"})}):(0,s.jsx)("span",{className:"text-3xl font-bold ".concat(e.id===a?"text-purple-400":"text-white/40"),children:e.id})})}),(0,s.jsxs)(l.E.div,{className:"mt-6 text-center",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:.1*t+.2},children:[(0,s.jsx)(l.E.span,{className:"text-xl font-bold ".concat(e.id<=a?"bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text":"text-white/40"),whileHover:{scale:1.05},children:e.name}),(0,s.jsx)("span",{className:"mt-1 block text-sm ".concat(e.id<=a?"text-white/70":"text-white/30"),children:e.description})]})]})},e.id))})})})}var p=a(9036),m=a(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let u=(0,m.Z)("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]),h=(0,m.Z)("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]),x=(0,m.Z)("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);var b=a(3715);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let f=(0,m.Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);function g(e){let{formData:t,setFormData:a,onNext:i}=e,[r,o]=(0,n.useState)(!1),[c,d]=(0,n.useState)(null),m=async()=>{try{o(!0);let e=await fetch("".concat("https://apiabdm.docbot.in","/api/access-token"),{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error("Network response was not ok");let r=await e.json();sessionStorage.setItem("token",r.access_token),a({...t,accessToken:r.access_token}),i()}catch(e){console.error("Error getting access token:",e),alert("Error initializing. Please try again.")}finally{o(!1)}},g=[{icon:p.Z,title:"Military-Grade Security",description:"Your health data is protected with AES-256 encryption and blockchain technology",gradient:"from-cyan-500 to-blue-500",iconBg:"from-cyan-400 to-blue-600"},{icon:u,title:"Instant Verification",description:"Advanced biometric and OTP verification for maximum security and convenience",gradient:"from-purple-500 to-pink-500",iconBg:"from-purple-400 to-pink-600"},{icon:h,title:"Universal Health ID",description:"Access your complete medical history with a single digital identity across India",gradient:"from-green-500 to-emerald-500",iconBg:"from-green-400 to-emerald-600"}];return(0,s.jsxs)("div",{className:"max-w-5xl mx-auto",children:[(0,s.jsxs)(l.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},className:"text-center mb-16",children:[(0,s.jsxs)("div",{className:"inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-6",children:[(0,s.jsx)(x,{className:"w-5 h-5 mr-2 text-yellow-400"}),(0,s.jsx)("span",{className:"text-white/90",children:"Welcome to the Future of Healthcare"})]}),(0,s.jsx)("h2",{className:"text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient",children:"ABHA Card Creation Portal"}),(0,s.jsx)("p",{className:"text-xl text-white/80 max-w-3xl mx-auto leading-relaxed",children:"Experience the next generation of digital healthcare management. Create your Ayushman Bharat Health Account with enhanced security and seamless integration."})]}),(0,s.jsx)(l.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.2},className:"grid md:grid-cols-3 gap-8 mb-16",children:g.map((e,t)=>(0,s.jsxs)(l.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.2+.1*t},className:"group relative",onMouseEnter:()=>d(t),onMouseLeave:()=>d(null),children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"}),(0,s.jsxs)("div",{className:"relative h-full bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 transform transition-all duration-500 ".concat(c===t?"scale-105":""),children:[(0,s.jsx)("div",{className:"bg-gradient-to-br ".concat(e.iconBg," w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 transform transition-transform group-hover:scale-110 group-hover:rotate-3"),children:(0,s.jsx)(e.icon,{className:"text-white w-8 h-8"})}),(0,s.jsx)("h3",{className:"text-2xl font-bold mb-4 text-center bg-gradient-to-r ".concat(e.gradient," text-transparent bg-clip-text"),children:e.title}),(0,s.jsx)("p",{className:"text-white/70 text-center leading-relaxed",children:e.description})]})]},t))}),(0,s.jsxs)(l.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.5},className:"text-center relative",children:[(0,s.jsx)("div",{className:"absolute inset-x-0 -top-40 h-40 bg-gradient-to-t from-transparent to-transparent"}),(0,s.jsxs)("button",{onClick:m,disabled:r,className:"group relative inline-flex items-center px-12 py-5 text-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100",children:[(0,s.jsx)("div",{className:"absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"}),(0,s.jsx)("span",{className:"relative flex items-center",children:r?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(b.Z,{className:"animate-spin mr-3 w-6 h-6"}),"Initializing..."]}):(0,s.jsxs)(s.Fragment,{children:["Begin Your Journey",(0,s.jsx)(f,{className:"ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform"})]})})]}),(0,s.jsx)("p",{className:"mt-6 text-white/60",children:"Join millions of Indians in the digital healthcare revolution"})]})]})}/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let y=(0,m.Z)("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]),v=(0,m.Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]),w={data:""},j=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||w,N=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,k=/\/\*[^]*?\*\/|  +/g,E=/\n+/g,A=(e,t)=>{let a="",i="",r="";for(let o in e){let s=e[o];"@"==o[0]?"i"==o[1]?a=o+" "+s+";":i+="f"==o[1]?A(s,o):o+"{"+A(s,"k"==o[1]?"":t)+"}":"object"==typeof s?i+=A(s,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=s&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=A.p?A.p(o,s):o+":"+s+";")}return a+(t&&r?t+"{"+r+"}":r)+i},S={},C=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+C(e[a]);return t}return e},T=(e,t,a,i,r)=>{var o;let s=C(e),n=S[s]||(S[s]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(s));if(!S[n]){let t=s!==e?e:(e=>{let t,a,i=[{}];for(;t=N.exec(e.replace(k,""));)t[4]?i.shift():t[3]?(a=t[3].replace(E," ").trim(),i.unshift(i[0][a]=i[0][a]||{})):i[0][t[1]]=t[2].replace(E," ").trim();return i[0]})(e);S[n]=A(r?{["@keyframes "+n]:t}:t,a?"":"."+n)}let l=a&&S.g?S.g:null;return a&&(S.g=S[n]),o=S[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=i?o+t.data:t.data+o),n},P=(e,t,a)=>e.reduce((e,i,r)=>{let o=t[r];if(o&&o.call){let e=o(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":A(e,""):!1===e?"":e}return e+i+(null==o?"":o)},"");function M(e){let t=this||{},a=e.call?e(t.p):e;return T(a.unshift?a.raw?P(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,j(t.target),t.g,t.o,t.k)}M.bind({g:1});let I,O,F,H=M.bind({k:1});function D(e,t){let a=this||{};return function(){let i=arguments;function r(o,s){let n=Object.assign({},o),l=n.className||r.className;a.p=Object.assign({theme:O&&O()},n),a.o=/ *go\d+/.test(l),n.className=M.apply(a,i)+(l?" "+l:""),t&&(n.ref=s);let c=e;return e[0]&&(c=n.as||e,delete n.as),F&&c[0]&&F(n),I(c,n)}return t?t(r):r}}var z=e=>"function"==typeof e,B=(e,t)=>z(e)?e(t):e,Z=(i=0,()=>(++i).toString()),$=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},L=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return L(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},_=[],q={toasts:[],pausedAt:void 0},V=e=>{q=L(q,e),_.forEach(e=>{e(q)})},Y=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||Z()}),J=e=>(t,a)=>{let i=Y(t,e,a);return V({type:2,toast:i}),i.id},G=(e,t)=>J("blank")(e,t);G.error=J("error"),G.success=J("success"),G.loading=J("loading"),G.custom=J("custom"),G.dismiss=e=>{V({type:3,toastId:e})},G.remove=e=>V({type:4,toastId:e}),G.promise=(e,t,a)=>{let i=G.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?B(t.success,e):void 0;return r?G.success(r,{id:i,...a,...null==a?void 0:a.success}):G.dismiss(i),e}).catch(e=>{let r=t.error?B(t.error,e):void 0;r?G.error(r,{id:i,...a,...null==a?void 0:a.error}):G.dismiss(i)}),e};var R=D("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${H`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${H`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=D("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${H`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`} 1s linear infinite;
`,X=D("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${H`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,W=D("div")`
  position: absolute;
`,K=D("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Q=D("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${H`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:a,iconTheme:i}=e;return void 0!==t?"string"==typeof t?n.createElement(Q,null,t):t:"blank"===a?null:n.createElement(K,null,n.createElement(U,{...i}),"loading"!==a&&n.createElement(W,null,"error"===a?n.createElement(R,{...i}):n.createElement(X,{...i})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=D("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,er=D("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let a=e.includes("top")?1:-1,[i,r]=$()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(a),ea(a)];return{animation:t?`${H(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${H(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};function es(e){let{formData:t,setFormData:a,onNext:i,onBack:r}=e,[o,c]=(0,n.useState)(!1),[d,p]=(0,n.useState)(!1),m=async e=>{e.preventDefault();try{c(!0);let e=sessionStorage.getItem("token");if(!e)throw Error("Access token not found. Please try again.");let r=await fetch("".concat("https://apiabdm.docbot.in","/api/send-otp"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({aadhar:t.aadharNumber,accessToken:e})});if(!r.ok)throw Error("Failed to send OTP. Please try again.");let o=await r.json();o.txnId&&sessionStorage.setItem("txnId",o.txnId),G.success(o.message||"OTP sent successfully!",{duration:4e3,position:"top-center",icon:"\uD83D\uDCF1"}),a({...t,...o}),i()}catch(t){let e=t instanceof Error?t.message:"Failed to send OTP. Please try again.";G.error(e,{duration:4e3,position:"top-center"}),console.error("Error sending OTP:",t)}finally{c(!1)}};return(0,s.jsxs)("div",{className:"max-w-4xl mx-auto px-4",children:[(0,s.jsxs)(l.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},className:"text-center mb-12",children:[(0,s.jsx)("div",{className:"relative inline-block",children:(0,s.jsx)("div",{className:"bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110 hover:rotate-3",children:(0,s.jsx)(y,{className:"text-white w-12 h-12"})})}),(0,s.jsx)("h2",{className:"text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text",children:"Enter Your Aadhar Details"}),(0,s.jsx)("p",{className:"text-xl text-white/80 max-w-2xl mx-auto",children:"Please provide your 12-digit Aadhar number for secure verification"})]}),(0,s.jsxs)(l.E.form,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.2},onSubmit:m,className:"space-y-8",children:[(0,s.jsxs)("div",{className:"relative",onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1),children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl transition-opacity duration-300 blur-xl ".concat(d?"opacity-100":"opacity-0")}),(0,s.jsxs)("div",{className:"relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20",children:[(0,s.jsx)("label",{htmlFor:"aadhar",className:"block text-white/90 text-lg font-medium mb-4",children:"Aadhar Number"}),(0,s.jsx)("input",{type:"text",id:"aadhar",name:"aadhar",value:t.aadharNumber||"",onChange:e=>a({...t,aadharNumber:e.target.value}),placeholder:"Enter 12-digit Aadhar number",className:"w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300",pattern:"\\d{12}",maxLength:12,required:!0,disabled:o}),(0,s.jsx)("p",{className:"mt-3 text-white/60",children:"Your Aadhar number is required for verification"})]})]}),(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)(l.E.button,{whileHover:{scale:1.02},whileTap:{scale:.98},type:"button",onClick:r,className:"group flex items-center px-6 py-3 rounded-xl bg-white/10 text-white/90 hover:bg-white/20 transition-all duration-300 disabled:opacity-50",disabled:o,children:[(0,s.jsx)(v,{className:"w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"}),"Back"]}),(0,s.jsxs)(l.E.button,{whileHover:{scale:1.02},whileTap:{scale:.98},type:"submit",disabled:o,className:"relative group px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white disabled:opacity-50 transition-all duration-300",children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"}),(0,s.jsx)("span",{className:"relative flex items-center",children:o?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(b.Z,{className:"animate-spin mr-2 h-5 w-5"}),"Sending OTP..."]}):"Continue"})]})]})]})]})}n.memo(({toast:e,position:t,style:a,children:i})=>{let r=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},o=n.createElement(ee,{toast:e}),s=n.createElement(er,{...e.ariaProps},B(e.message,e));return n.createElement(ei,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof i?i({icon:o,message:s}):n.createElement(n.Fragment,null,o,s))}),o=n.createElement,A.p=void 0,I=o,O=void 0,F=void 0,M`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let en=(0,m.Z)("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]),el=(0,m.Z)("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);function ec(e){let{formData:t,setFormData:a,onNext:i,onBack:r}=e,[o,c]=(0,n.useState)(!1),[d,m]=(0,n.useState)(null),[u,h]=(0,n.useState)(!1),[x,f]=(0,n.useState)(null),g=async e=>{e.preventDefault(),c(!0),m(null);try{let e=sessionStorage.getItem("txnId"),a=sessionStorage.getItem("token");if(!e||!a)throw Error("Missing required session data");let r=await fetch("".concat("https://apiabdm.docbot.in","/api/verify-otp"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({txnId:e,accessToken:a,mobile:t.mobile,otp:t.otp})}),o=await r.json();if(!r.ok)throw Error(o.message||"Verification failed");o.tokens&&sessionStorage.setItem("X_Token",o.tokens.token),o.ABHAProfile&&sessionStorage.setItem("ABHAProfile",JSON.stringify(o.ABHAProfile)),h(!0),G.success("Verification successful!",{duration:4e3,position:"top-center",icon:"✨"}),setTimeout(()=>{i()},1500)}catch(e){m(e instanceof Error?e.message:"Something went wrong"),G.error(d||"Verification failed",{duration:4e3,position:"top-center"})}finally{c(!1)}};return(0,s.jsxs)("div",{className:"max-w-4xl mx-auto px-4",children:[(0,s.jsxs)(l.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},className:"text-center mb-12",children:[(0,s.jsxs)("div",{className:"relative inline-block",children:[(0,s.jsx)("div",{className:"bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110 hover:rotate-3",children:(0,s.jsx)(p.Z,{className:"text-white w-12 h-12"})}),u&&(0,s.jsx)(l.E.div,{initial:{scale:0},animate:{scale:1},className:"absolute -right-2 -top-2 bg-green-500 rounded-full p-2",children:(0,s.jsx)(en,{className:"w-6 h-6 text-white"})})]}),(0,s.jsx)("h2",{className:"text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text",children:"Verify Your Identity"}),(0,s.jsx)("p",{className:"text-xl text-white/80 max-w-2xl mx-auto",children:"Complete the verification process to continue"})]}),(0,s.jsx)(l.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.2},className:"mb-8 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-white/10 backdrop-blur-lg",children:(0,s.jsxs)("div",{className:"flex items-center justify-center text-white/80",children:[(0,s.jsx)(en,{className:"w-5 h-5 mr-2 text-green-400"}),(0,s.jsx)("p",{children:"OTP sent to your registered mobile number"})]})}),(0,s.jsxs)(l.E.form,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.3},onSubmit:g,className:"space-y-8",children:[(0,s.jsxs)("div",{className:"space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20",children:[(0,s.jsxs)("div",{className:"relative",onMouseEnter:()=>f("mobile"),onMouseLeave:()=>f(null),children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl transition-opacity duration-300 blur-xl ".concat("mobile"===x?"opacity-100":"opacity-0")}),(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("label",{className:"block text-white/90 text-sm font-medium mb-2",children:"Mobile Number for ABHA Updates"}),(0,s.jsx)("input",{type:"tel",value:t.mobile,onChange:e=>{m(null),a({...t,mobile:e.target.value})},placeholder:"Enter your 10-digit mobile number",className:"w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300",pattern:"\\d{10}",maxLength:10,required:!0,disabled:o||u})]})]}),(0,s.jsxs)("div",{className:"relative",onMouseEnter:()=>f("otp"),onMouseLeave:()=>f(null),children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl transition-opacity duration-300 blur-xl ".concat("otp"===x?"opacity-100":"opacity-0")}),(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("label",{className:"block text-white/90 text-sm font-medium mb-2",children:"Enter OTP"}),(0,s.jsx)("input",{type:"text",value:t.otp,onChange:e=>{m(null),a({...t,otp:e.target.value})},placeholder:"Enter 6-digit OTP",className:"w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300",pattern:"\\d{6}",maxLength:6,required:!0,disabled:o||u})]})]}),d&&(0,s.jsxs)(l.E.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},className:"flex items-center text-red-400 bg-red-500/10 p-3 rounded-lg",children:[(0,s.jsx)(el,{className:"w-5 h-5 mr-2"}),d]})]}),(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)(l.E.button,{whileHover:{scale:1.02},whileTap:{scale:.98},type:"button",onClick:r,className:"group flex items-center px-6 py-3 rounded-xl bg-white/10 text-white/90 hover:bg-white/20 transition-all duration-300 disabled:opacity-50",disabled:o||u,children:[(0,s.jsx)(v,{className:"w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"}),"Back"]}),(0,s.jsxs)(l.E.button,{whileHover:{scale:1.02},whileTap:{scale:.98},type:"submit",disabled:o||u,className:"relative group px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white disabled:opacity-50 transition-all duration-300",children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"}),(0,s.jsx)("span",{className:"relative flex items-center",children:o?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(b.Z,{className:"animate-spin mr-2 h-5 w-5"}),"Verifying..."]}):u?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(en,{className:"mr-2 h-5 w-5"}),"Verified!"]}):"Verify & Continue"})]})]})]})]})}/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let ed=(0,m.Z)("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);var ep=a(7972);function em(e){let{onBack:t}=e,[a,i]=(0,n.useState)(!1),[r,o]=(0,n.useState)(null),[c,d]=(0,n.useState)(null);(0,n.useEffect)(()=>{p()},[]);let p=async()=>{i(!0);try{let e=sessionStorage.getItem("token"),t=sessionStorage.getItem("X_Token");if(!e||!t)throw Error("Authentication tokens not found");let a=await fetch("".concat("https://apiabdm.docbot.in","/api/profile"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({accessToken:e,X_Token:t})});if(!a.ok)throw Error("Failed to fetch profile");let i=await a.json();i.image&&d("data:image/png;base64,".concat(i.image)),o(i)}catch(t){let e=t instanceof Error?t.message:"Failed to fetch profile";G.error(e,{duration:4e3,position:"top-center"}),console.error("Error fetching profile:",t)}finally{i(!1)}};return a?(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)(b.Z,{className:"w-12 h-12 animate-spin text-purple-500 mx-auto mb-4"}),(0,s.jsx)("p",{className:"text-white/80 text-lg",children:"Loading image..."})]})}):(0,s.jsx)("div",{className:"flex items-center justify-center min-h-[400px]",children:(0,s.jsx)(l.E.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},transition:{duration:.6},className:"relative group",children:c?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"rounded-3xl overflow-hidden shadow-xl transform transition-transform group-hover:scale-105",children:(0,s.jsx)("img",{src:c,alt:"Profile",className:"max-w-full h-auto"})}),(0,s.jsx)("button",{onClick:()=>{if(null==r?void 0:r.image)try{let e=document.createElement("a");e.href="data:image/png;base64,".concat(r.image),e.download="profile-photo.png",document.body.appendChild(e),e.click(),document.body.removeChild(e),G.success("Photo downloaded successfully!",{duration:3e3,position:"top-center"})}catch(e){console.error("Error downloading image:",e),G.error("Failed to download photo",{duration:3e3,position:"top-center"})}},className:"absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg p-3 rounded-full hover:bg-white/20 transition-colors duration-200 group-hover:opacity-100 opacity-0 shadow-lg",title:"Download photo",children:(0,s.jsx)(ed,{className:"w-5 h-5 text-black"})})]}):(0,s.jsx)("div",{className:"bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 w-32 h-32 rounded-3xl flex items-center justify-center transform transition-transform hover:scale-105",children:(0,s.jsx)(ep.Z,{className:"text-white w-16 h-16"})})})})}let eu=[{id:1,name:"Welcome",description:"Get Started"},{id:2,name:"Aadhar Registration",description:"Enter your Aadhar details"},{id:3,name:"Verification",description:"Verify your Aadhar"},{id:4,name:"Profile",description:"Complete your profile"}];function eh(){let[e,t]=(0,n.useState)(1),[a,i]=(0,n.useState)({accessToken:"",aadharNumber:"",otp:"",mobile:"",profile:{name:"",dob:"",gender:"",mobile:"",email:""}}),r=()=>{t(e=>Math.min(e+1,eu.length))},o=()=>{t(e=>Math.max(e-1,1))};return(0,s.jsxs)("div",{className:"min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden",children:[(0,s.jsxs)("div",{className:"absolute inset-0 overflow-hidden",children:[(0,s.jsx)("div",{className:"absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -top-48 -left-24 animate-pulse"}),(0,s.jsx)("div",{className:"absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl top-96 right-12 animate-pulse delay-700"}),(0,s.jsx)("div",{className:"absolute w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl -bottom-32 left-1/2 animate-pulse delay-1000"})]}),(0,s.jsxs)("div",{className:"max-w-7xl mx-auto px-4 py-12 relative z-10",children:[(0,s.jsxs)(l.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},className:"text-center mb-12",children:[(0,s.jsx)("div",{className:"inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-6",children:(0,s.jsx)("span",{className:"text-white/90",children:"ABHA Card Registration Portal"})}),(0,s.jsx)("h1",{className:"text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient mb-4",children:"Create Your ABHA Card"}),(0,s.jsx)("p",{className:"text-lg text-white/80 max-w-2xl mx-auto",children:"Your gateway to unified digital health records"})]}),(0,s.jsx)(l.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.2},children:(0,s.jsx)(d,{steps:eu,currentStep:e})}),(0,s.jsx)(l.E.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},transition:{duration:.6,delay:.4},className:"mt-8",children:(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"}),(0,s.jsx)("div",{className:"relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8",children:(()=>{switch(e){case 1:return(0,s.jsx)(g,{formData:a,setFormData:i,onNext:r});case 2:return(0,s.jsx)(es,{formData:a,setFormData:i,onNext:r,onBack:o});case 3:return(0,s.jsx)(ec,{formData:a,setFormData:i,onNext:r,onBack:o});case 4:return(0,s.jsx)(em,{onBack:o});default:return null}})()})]})})]})]})}}},function(e){e.O(0,[895,971,864,744],function(){return e(e.s=2824)}),_N_E=e.O()}]);