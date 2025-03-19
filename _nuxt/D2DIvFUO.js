import{r as h,e as A,o as d,c as p,a as t,u as i,F as R,f as U,g as I,d as D,t as x,n as J,h as B,v as K,i as z,_ as Q,m as q,j as W,k as X,l as Y}from"./qQ-seNsd.js";const c=h({retries:3,retryDelay:1e3,timeout:5e3,cacheDuration:6e4,async:!1,override:!1,skipCache:!1,logging:!0});function H(){const m=h(new Map),n=h(new Map);function o(a,l,...f){if(c.value.logging){const $=new Date().toISOString();console[a](`[${$}] ${a.toUpperCase()}: ${l}`,...f)}}function e(a){const l=new AbortController,f=setTimeout(()=>{l.abort(),o("warn",`Request timed out after ${a}ms`)},a);return{controller:l,clearTimeout:()=>clearTimeout(f)}}function s(a,l){const f=new URLSearchParams(l).toString();return f?`${a}?${f}`:a}function u(a,l){return Date.now()-a<l}async function g({apiRequest:a,retries:l,retryDelay:f,cancellationToken:$,timeout:k,cacheDuration:_,skipCache:S},C){const{method:w,endpoint:b,headers:E={},queryParams:L={},body:O}=a,V=s(b,L);if(!S&&_&&_>0){const r=n.value.get(V);if(r&&u(r.timestamp,_))return o("info",`Returning cached response for: ${V}`),r.data}let y=$||new AbortController,M;if(k){const r=e(k);y=r.controller,M=r.clearTimeout}const v=y.signal;return(async()=>{o("info","Attempting network call",{endpoint:b,method:w,attempt:C});try{const r={method:w,headers:{"Content-Type":"application/json",...E},signal:v};["POST","PUT","PATCH"].includes(w)&&O&&(r.body=JSON.stringify(O));const P=await fetch(b,r);if(!P.ok)throw new Error(`Failed to fetch: ${P.statusText}`);const N=await P.json();return o("info","Network call successful",{endpoint:b,method:w,attempt:C,result:N}),_&&_>0&&(n.value.set(V,{data:N,timestamp:Date.now()}),o("info",`Response cached for: ${V}`,{cacheDuration:_})),N}catch(r){if(r.name==="AbortError")o("warn","Request aborted:",{endpoint:b});else return o("error","Request failed:",{error:r,endpoint:b}),r;if(l&&C<l)return o("warn",`Retrying... Attempt ${C+1}`,{endpoint:b,method:w,retryDelay:f}),await new Promise(P=>setTimeout(P,f)),g({apiRequest:a,retries:l,retryDelay:f,cancellationToken:$,timeout:k,cacheDuration:_,skipCache:S},C+1);throw r}finally{M&&M()}})()}async function T({apiRequest:a,async:l,override:f,retries:$,retryDelay:k,cancellationToken:_,timeout:S,cacheDuration:C,skipCache:w}){const{method:b,endpoint:E,headers:L={},queryParams:O={},body:V}=a,y={async:l!==void 0?l:c.value.async,override:f!==void 0?f:c.value.override,retries:$!==void 0?$:c.value.retries,retryDelay:k!==void 0?k:c.value.retryDelay,timeout:S!==void 0?S:c.value.timeout,cacheDuration:C!==void 0?C:c.value.cacheDuration,skipCache:w!==void 0?w:c.value.skipCache},M=new URLSearchParams(O).toString(),v=M?`${E}?${M}`:E;o("info","Starting API call",{url:v,method:b,mergedOptions:y}),m.value.has(v)&&(y.override?(m.value.get(v).controller.abort(),m.value.delete(v),o("info",`Aborted ongoing request for: ${v}`)):y.async||(o("info",`Waiting for ongoing request to complete for: ${v}`),await m.value.get(v).promise));const G=g({apiRequest:a,retries:y.retries,retryDelay:y.retryDelay,cancellationToken:_,timeout:y.timeout,cacheDuration:y.cacheDuration,skipCache:y.skipCache},0);m.value.set(v,{controller:_||new AbortController,promise:G});try{const r=await G;return o("info",`API call completed for: ${v}`,{result:r}),r}catch(r){throw o("error",`API call failed for: ${v}`,{error:r}),r}finally{m.value.delete(v)}}function F(a){c.value={...c.value,...a},o("info","Global config updated",{newConfig:a})}return{executeCall:T,updateGlobalConfig:F}}const Z={class:"method-container"},ee={class:"method-menu"},te={key:0},oe=["onClick"],ne={class:"my-4"},se={class:"box"},le=A({__name:"APIMethod",setup(m){const n=j();return(o,e)=>(d(),p("div",Z,[e[2]||(e[2]=t("p",{class:"text-2xl bold my-2"},"Method Type",-1)),t("div",ee,[i(n).httpMethods.length>0?(d(),p("ul",te,[(d(!0),p(R,null,U(i(n).httpMethods,(s,u)=>(d(),p("li",{key:u,class:J({"active-method":i(n).httpMethods[u]===i(n).currentHttpsMethod}),onClick:g=>i(n).handleMethodTabClick(u)},x(s),11,oe))),128))])):I("",!0)]),t("p",ne,[e[0]||(e[0]=D(" Testing ")),t("code",se,x(i(n).currentHttpsMethod),1),e[1]||(e[1]=D(" method "))])]))}}),re={class:"method-container"},ie={class:"flex justify-around"},ae={class:"box"},ue={class:"flex justify-between"},de=["onUpdate:modelValue"],ce=["onUpdate:modelValue"],pe={key:2},fe={class:"box"},me=A({__name:"GlobalConfig",setup(m){const{updateGlobalConfig:n}=H();return n(c.value),(o,e)=>(d(),p("div",re,[e[2]||(e[2]=t("p",{class:"text-2xl bold my-2"},"Configure Defaults",-1)),t("div",ie,[t("div",ae,[e[0]||(e[0]=t("p",{class:"text-xl font-bold"},"Edit Default Values",-1)),(d(!0),p(R,null,U(i(c),(s,u,g)=>(d(),p("div",{key:g,class:"my-3"},[t("div",ue,[t("label",null,x(u)+": ",1),typeof s=="string"||typeof s=="number"?B((d(),p("input",{key:0,type:"text","onUpdate:modelValue":T=>i(c)[u]=T},null,8,de)),[[K,i(c)[u],void 0,{number:!0}]]):typeof s=="boolean"?B((d(),p("input",{key:1,type:"checkbox","onUpdate:modelValue":T=>i(c)[u]=T},null,8,ce)),[[z,i(c)[u]]]):(d(),p("span",pe,"Unsupported type"))])]))),128))]),t("div",fe,[e[1]||(e[1]=t("p",{class:"text-xl font-bold"},"Live Preview of Default Values",-1)),t("pre",null,"                    "+x(i(c))+`
                `,1)])])]))}}),ve=Q(me,[["__scopeId","data-v-a101d3e6"]]),he={class:"method-container"},ye={class:"w-100 flex flex-row justify-end"},ge=A({__name:"Response",setup(m){const n=j(),o=h("Copy"),e=async()=>{try{if(n.response.length<0)throw o.value="Response Empty!","Empty Response";await navigator.clipboard.writeText(JSON.stringify(n.response)),o.value="Copied!",setTimeout(()=>{o.value="Copy"},2e3)}catch(s){console.error("Failed to copy text:",s)}};return(s,u)=>(d(),p("div",he,[u[0]||(u[0]=t("p",{class:"text-2xl bold my-2"},"Response",-1)),t("div",ye,[t("button",{onClick:e},x(i(o)),1)]),t("pre",null,"            "+x(i(n).response)+`
        `,1)]))}}),_e={class:"method-container"},be={class:"method-menu"},Ce=A({__name:"APIEndpointSetup",setup(m){const n=j();return(o,e)=>(d(),p("div",_e,[e[2]||(e[2]=t("p",{class:"text-2xl bold my-2"},"Endpoint Setup",-1)),e[3]||(e[3]=t("p",null,'Enter a custom endpoint with "https://" included.',-1)),e[4]||(e[4]=t("p",null,"Current default endpoint is 'https://dummyjson.com/products'",-1)),t("div",be,[B(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=s=>i(n).endpoint=s)},null,512),[[K,i(n).endpoint]]),t("button",{onClick:e[1]||(e[1]=s=>i(n).handleTestButton()),class:"m-2"}," Test Opt Store ")])]))}}),we=[{title:"Configure Globals",isVisible:!1,component:q(ve)},{title:"Configure Method Type",isVisible:!0,component:q(le)},{title:"Configure Endpoint",isVisible:!0,component:q(Ce)},{title:"Response",isVisible:!1,component:q(ge)}],j=W("playground",()=>{const{executeCall:m,updateGlobalConfig:n}=H(),o=h([...we]),e=h(["GET","POST","DELETE","PUT","PATCH"]),s=h("GET"),u=h("https://dummyjson.com/products/1"),g=h({});return h({status:"idle",message:"Response State",data:{}}),{playgroundMainMenu:o,httpMethods:e,currentHttpsMethod:s,endpoint:u,response:g,toggleOptionView:l=>{o.value[l].isVisible=!o.value[l].isVisible},handleMethodTabClick:l=>{s.value!==e.value[l]&&(s.value=e.value[l])},handleTestButton:async()=>{g.value=await m({apiRequest:{endpoint:u.value,method:s.value},skipCache:!1}),g.value&&(o.value[3].isVisible||(o.value[3].isVisible=!0))}}}),xe={class:"method-container"},$e={class:"menu flex flex-row justify-between items-center"},Te={class:"main-menu"},ke={class:"flex flex-row"},Me=["onClick"],Se={class:"my-4"},Ve={class:"box"},Re=A({__name:"playground",setup(m){H();const n=j();return n.httpMethods,h(0),h(),n.endpoint,(o,e)=>(d(),p(R,null,[t("div",xe,[t("div",$e,[t("div",Te,[t("div",ke,[(d(!0),p(R,null,U(i(n).playgroundMainMenu,(s,u)=>(d(),p("div",null,[t("div",{class:J(`box m-1 button ${s.isVisible?"text-teal-400 bg-slate-700":""}`),onClick:g=>i(n).toggleOptionView(u)},[t("span",null,x(s.title),1)],10,Me)]))),256))])]),t("div",null,[t("p",Se,[e[0]||(e[0]=D(" Testing ")),t("code",Ve,x(i(n).currentHttpsMethod),1),e[1]||(e[1]=D(" method "))])])])]),(d(!0),p(R,null,U(i(n).playgroundMainMenu,s=>(d(),p("div",null,[s.isVisible?(d(),X(Y(s.component),{key:0,markRaw:""})):I("",!0)]))),256))],64))}});export{Re as _};
