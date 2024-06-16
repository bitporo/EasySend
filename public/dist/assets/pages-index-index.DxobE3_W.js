import{i as t,_ as e,o as a,c as i,w as s,a as o,n,b as l,t as r,r as d,d as c,e as h,f as p,I as u,g as m,h as f,v as g,j as y,k,l as b,m as x,p as w,q as v,s as C,B as T,u as $,x as S,y as D,z as P,A as _,C as E,D as I,E as z,F as V,G as R,H as A,J as B}from"./index-Cwhd9A9i.js";const L={data:()=>({}),created(){this.popup=this.getParent()},methods:{getParent(t="uniPopup"){let e=this.$parent,a=e.$options.name;for(;a!==t;){if(e=e.$parent,!e)return!1;a=e.$options.name}return e}}},F={en:{"uni-popup.cancel":"cancel","uni-popup.ok":"ok","uni-popup.placeholder":"pleace enter","uni-popup.title":"Hint","uni-popup.shareTitle":"Share to"},"zh-Hans":{"uni-popup.cancel":"取消","uni-popup.ok":"确定","uni-popup.placeholder":"请输入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"},"zh-Hant":{"uni-popup.cancel":"取消","uni-popup.ok":"確定","uni-popup.placeholder":"請輸入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"}},{t:M}=t(F);const H=e({name:"uniPopupDialog",mixins:[L],emits:["confirm","close","update:modelValue","input"],props:{inputType:{type:String,default:"text"},showClose:{type:Boolean,default:!0},modelValue:{type:[Number,String],default:""},placeholder:{type:[String,Number],default:""},type:{type:String,default:"error"},mode:{type:String,default:"base"},title:{type:String,default:""},content:{type:String,default:""},beforeClose:{type:Boolean,default:!1},cancelText:{type:String,default:""},confirmText:{type:String,default:""},maxlength:{type:Number,default:-1},focus:{type:Boolean,default:!0}},data:()=>({dialogType:"error",val:""}),computed:{okText(){return this.confirmText||M("uni-popup.ok")},closeText(){return this.cancelText||M("uni-popup.cancel")},placeholderText(){return this.placeholder||M("uni-popup.placeholder")},titleText(){return this.title||M("uni-popup.title")}},watch:{type(t){this.dialogType=t},mode(t){"input"===t&&(this.dialogType="info")},value(t){-1!=this.maxlength&&"input"===this.mode?this.val=t.slice(0,this.maxlength):this.val=t},val(t){this.$emit("update:modelValue",t)}},created(){this.popup.disableMask(),"input"===this.mode?(this.dialogType="info",this.val=this.value,this.val=this.modelValue):this.dialogType=this.type},methods:{onOk(){"input"===this.mode?this.$emit("confirm",this.val):this.$emit("confirm"),this.beforeClose||this.popup.close()},closeDialog(){this.$emit("close"),this.beforeClose||this.popup.close()},close(){this.popup.close()}}},[["render",function(t,e,m,f,g,y){const k=h,b=p,x=u;return a(),i(b,{class:"uni-popup-dialog"},{default:s((()=>[o(b,{class:"uni-dialog-title"},{default:s((()=>[o(k,{class:n(["uni-dialog-title-text",["uni-popup__"+g.dialogType]])},{default:s((()=>[l(r(y.titleText),1)])),_:1},8,["class"])])),_:1}),"base"===m.mode?(a(),i(b,{key:0,class:"uni-dialog-content"},{default:s((()=>[d(t.$slots,"default",{},(()=>[o(k,{class:"uni-dialog-content-text"},{default:s((()=>[l(r(m.content),1)])),_:1})]),!0)])),_:3})):(a(),i(b,{key:1,class:"uni-dialog-content"},{default:s((()=>[d(t.$slots,"default",{},(()=>[o(x,{class:"uni-dialog-input",maxlength:m.maxlength,modelValue:g.val,"onUpdate:modelValue":e[0]||(e[0]=t=>g.val=t),type:m.inputType,placeholder:y.placeholderText,focus:m.focus},null,8,["maxlength","modelValue","type","placeholder","focus"])]),!0)])),_:3})),o(b,{class:"uni-dialog-button-group"},{default:s((()=>[m.showClose?(a(),i(b,{key:0,class:"uni-dialog-button",onClick:y.closeDialog},{default:s((()=>[o(k,{class:"uni-dialog-button-text"},{default:s((()=>[l(r(y.closeText),1)])),_:1})])),_:1},8,["onClick"])):c("",!0),o(b,{class:n(["uni-dialog-button",m.showClose?"uni-border-left":""]),onClick:y.onOk},{default:s((()=>[o(k,{class:"uni-dialog-button-text uni-button-color"},{default:s((()=>[l(r(y.okText),1)])),_:1})])),_:1},8,["class","onClick"])])),_:1})])),_:3})}],["__scopeId","data-v-5cd5f2dd"]]);class O{constructor(t,e){this.options=t,this.animation=m({...t}),this.currentStepAnimates={},this.next=0,this.$=e}_nvuePushAnimates(t,e){let a=this.currentStepAnimates[this.next],i={};if(i=a||{styles:{},config:{}},U.includes(t)){i.styles.transform||(i.styles.transform="");let a="";"rotate"===t&&(a="deg"),i.styles.transform+=`${t}(${e+a}) `}else i.styles[t]=`${e}`;this.currentStepAnimates[this.next]=i}_animateRun(t={},e={}){let a=this.$.$refs.ani.ref;if(a)return new Promise(((i,s)=>{nvueAnimation.transition(a,{styles:t,...e},(t=>{i()}))}))}_nvueNextAnimate(t,e=0,a){let i=t[e];if(i){let{styles:s,config:o}=i;this._animateRun(s,o).then((()=>{e+=1,this._nvueNextAnimate(t,e,a)}))}else this.currentStepAnimates={},"function"==typeof a&&a(),this.isEnd=!0}step(t={}){return this.animation.step(t),this}run(t){this.$.animationData=this.animation.export(),this.$.timer=setTimeout((()=>{"function"==typeof t&&t()}),this.$.durationTime)}}const U=["matrix","matrix3d","rotate","rotate3d","rotateX","rotateY","rotateZ","scale","scale3d","scaleX","scaleY","scaleZ","skew","skewX","skewY","translate","translate3d","translateX","translateY","translateZ"];function N(t,e){if(e)return clearTimeout(e.timer),new O(t,e)}U.concat(["opacity","backgroundColor"],["width","height","left","right","top","bottom"]).forEach((t=>{O.prototype[t]=function(...e){return this.animation[t](...e),this}}));const Y=e({name:"uniTransition",emits:["click","change"],props:{show:{type:Boolean,default:!1},modeClass:{type:[Array,String],default:()=>"fade"},duration:{type:Number,default:300},styles:{type:Object,default:()=>({})},customClass:{type:String,default:""},onceRender:{type:Boolean,default:!1}},data:()=>({isShow:!1,transform:"",opacity:1,animationData:{},durationTime:300,config:{}}),watch:{show:{handler(t){t?this.open():this.isShow&&this.close()},immediate:!0}},computed:{stylesObject(){let t={...this.styles,"transition-duration":this.duration/1e3+"s"},e="";for(let a in t){e+=this.toLine(a)+":"+t[a]+";"}return e},transformStyles(){return"transform:"+this.transform+";opacity:"+this.opacity+";"+this.stylesObject}},created(){this.config={duration:this.duration,timingFunction:"ease",transformOrigin:"50% 50%",delay:0},this.durationTime=this.duration},methods:{init(t={}){t.duration&&(this.durationTime=t.duration),this.animation=N(Object.assign(this.config,t),this)},onClick(){this.$emit("click",{detail:this.isShow})},step(t,e={}){if(this.animation){for(let e in t)try{"object"==typeof t[e]?this.animation[e](...t[e]):this.animation[e](t[e])}catch(a){console.error(`方法 ${e} 不存在`)}return this.animation.step(e),this}},run(t){this.animation&&this.animation.run(t)},open(){clearTimeout(this.timer),this.transform="",this.isShow=!0;let{opacity:t,transform:e}=this.styleInit(!1);void 0!==t&&(this.opacity=t),this.transform=e,this.$nextTick((()=>{this.timer=setTimeout((()=>{this.animation=N(this.config,this),this.tranfromInit(!1).step(),this.animation.run(),this.$emit("change",{detail:this.isShow})}),20)}))},close(t){this.animation&&this.tranfromInit(!0).step().run((()=>{this.isShow=!1,this.animationData=null,this.animation=null;let{opacity:t,transform:e}=this.styleInit(!1);this.opacity=t||1,this.transform=e,this.$emit("change",{detail:this.isShow})}))},styleInit(t){let e={transform:""},a=(t,a)=>{"fade"===a?e.opacity=this.animationType(t)[a]:e.transform+=this.animationType(t)[a]+" "};return"string"==typeof this.modeClass?a(t,this.modeClass):this.modeClass.forEach((e=>{a(t,e)})),e},tranfromInit(t){let e=(t,e)=>{let a=null;"fade"===e?a=t?0:1:(a=t?"-100%":"0","zoom-in"===e&&(a=t?.8:1),"zoom-out"===e&&(a=t?1.2:1),"slide-right"===e&&(a=t?"100%":"0"),"slide-bottom"===e&&(a=t?"100%":"0")),this.animation[this.animationMode()[e]](a)};return"string"==typeof this.modeClass?e(t,this.modeClass):this.modeClass.forEach((a=>{e(t,a)})),this.animation},animationType:t=>({fade:t?0:1,"slide-top":`translateY(${t?"0":"-100%"})`,"slide-right":`translateX(${t?"0":"100%"})`,"slide-bottom":`translateY(${t?"0":"100%"})`,"slide-left":`translateX(${t?"0":"-100%"})`,"zoom-in":`scaleX(${t?1:.8}) scaleY(${t?1:.8})`,"zoom-out":`scaleX(${t?1:1.2}) scaleY(${t?1:1.2})`}),animationMode:()=>({fade:"opacity","slide-top":"translateY","slide-right":"translateX","slide-bottom":"translateY","slide-left":"translateX","zoom-in":"scale","zoom-out":"scale"}),toLine:t=>t.replace(/([A-Z])/g,"-$1").toLowerCase()}},[["render",function(t,e,o,l,r,c){const h=p;return f((a(),i(h,{ref:"ani",animation:r.animationData,class:n(o.customClass),style:y(c.transformStyles),onClick:c.onClick},{default:s((()=>[d(t.$slots,"default")])),_:3},8,["animation","class","style","onClick"])),[[g,r.isShow]])}]]);const j=e({name:"uniPopup",components:{keypress:{name:"Keypress",props:{disable:{type:Boolean,default:!1}},mounted(){const t={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]};document.addEventListener("keyup",(e=>{if(this.disable)return;const a=Object.keys(t).find((a=>{const i=e.key,s=t[a];return s===i||Array.isArray(s)&&s.includes(i)}));a&&setTimeout((()=>{this.$emit(a,{})}),0)}))},render:()=>{}}},emits:["change","maskClick"],props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},isMaskClick:{type:Boolean,default:null},maskClick:{type:Boolean,default:null},backgroundColor:{type:String,default:"none"},safeArea:{type:Boolean,default:!0},maskBackgroundColor:{type:String,default:"rgba(0, 0, 0, 0.4)"},borderRadius:{type:String}},watch:{type:{handler:function(t){this.config[t]&&this[this.config[t]](!0)},immediate:!0},isDesktop:{handler:function(t){this.config[t]&&this[this.config[this.type]](!0)},immediate:!0},maskClick:{handler:function(t){this.mkclick=t},immediate:!0},isMaskClick:{handler:function(t){this.mkclick=t},immediate:!0},showPopup(t){document.getElementsByTagName("body")[0].style.overflow=t?"hidden":"visible"}},data(){return{duration:300,ani:[],showPopup:!1,showTrans:!1,popupWidth:0,popupHeight:0,config:{top:"top",bottom:"bottom",center:"center",left:"left",right:"right",message:"top",dialog:"center",share:"bottom"},maskClass:{position:"fixed",bottom:0,top:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.4)"},transClass:{backgroundColor:"transparent",borderRadius:this.borderRadius||"0",position:"fixed",left:0,right:0},maskShow:!0,mkclick:!0,popupstyle:"top"}},computed:{getStyles(){let t={backgroundColor:this.bg};return this.borderRadius,t=Object.assign(t,{borderRadius:this.borderRadius}),t},isDesktop(){return this.popupWidth>=500&&this.popupHeight>=500},bg(){return""===this.backgroundColor||"none"===this.backgroundColor?"transparent":this.backgroundColor}},mounted(){(()=>{const{windowWidth:t,windowHeight:e,windowTop:a,safeArea:i,screenHeight:s,safeAreaInsets:o}=w();this.popupWidth=t,this.popupHeight=e+(a||0),i&&this.safeArea?this.safeAreaInsets=o.bottom:this.safeAreaInsets=0})()},unmounted(){this.setH5Visible()},activated(){this.setH5Visible(!this.showPopup)},deactivated(){this.setH5Visible(!0)},created(){null===this.isMaskClick&&null===this.maskClick?this.mkclick=!0:this.mkclick=null!==this.isMaskClick?this.isMaskClick:this.maskClick,this.animation?this.duration=300:this.duration=0,this.messageChild=null,this.clearPropagation=!1,this.maskClass.backgroundColor=this.maskBackgroundColor},methods:{setH5Visible(t=!0){document.getElementsByTagName("body")[0].style.overflow=t?"visible":"hidden"},closeMask(){this.maskShow=!1},disableMask(){this.mkclick=!1},clear(t){t.stopPropagation(),this.clearPropagation=!0},open(t){if(this.showPopup)return;t&&-1!==["top","center","bottom","left","right","message","dialog","share"].indexOf(t)||(t=this.type),this.config[t]?(this[this.config[t]](),this.$emit("change",{show:!0,type:t})):console.error("缺少类型：",t)},close(t){this.showTrans=!1,this.$emit("change",{show:!1,type:this.type}),clearTimeout(this.timer),this.timer=setTimeout((()=>{this.showPopup=!1}),300)},touchstart(){this.clearPropagation=!1},onTap(){this.clearPropagation?this.clearPropagation=!1:(this.$emit("maskClick"),this.mkclick&&this.close())},top(t){this.popupstyle=this.isDesktop?"fixforpc-top":"top",this.ani=["slide-top"],this.transClass={position:"fixed",left:0,right:0,backgroundColor:this.bg,borderRadius:this.borderRadius||"0"},t||(this.showPopup=!0,this.showTrans=!0,this.$nextTick((()=>{this.messageChild&&"message"===this.type&&this.messageChild.timerClose()})))},bottom(t){this.popupstyle="bottom",this.ani=["slide-bottom"],this.transClass={position:"fixed",left:0,right:0,bottom:0,paddingBottom:this.safeAreaInsets+"px",backgroundColor:this.bg,borderRadius:this.borderRadius||"0"},t||(this.showPopup=!0,this.showTrans=!0)},center(t){this.popupstyle="center",this.ani=["zoom-out","fade"],this.transClass={position:"fixed",display:"flex",flexDirection:"column",bottom:0,left:0,right:0,top:0,justifyContent:"center",alignItems:"center",borderRadius:this.borderRadius||"0"},t||(this.showPopup=!0,this.showTrans=!0)},left(t){this.popupstyle="left",this.ani=["slide-left"],this.transClass={position:"fixed",left:0,bottom:0,top:0,backgroundColor:this.bg,borderRadius:this.borderRadius||"0",display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)},right(t){this.popupstyle="right",this.ani=["slide-right"],this.transClass={position:"fixed",bottom:0,right:0,top:0,backgroundColor:this.bg,borderRadius:this.borderRadius||"0",display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)}}},[["render",function(t,e,l,r,h,u){const m=k(b("uni-transition"),Y),f=p,g=x("keypress");return h.showPopup?(a(),i(f,{key:0,class:n(["uni-popup",[h.popupstyle,u.isDesktop?"fixforpc-z-index":""]])},{default:s((()=>[o(f,{onTouchstart:u.touchstart},{default:s((()=>[h.maskShow?(a(),i(m,{key:"1",name:"mask","mode-class":"fade",styles:h.maskClass,duration:h.duration,show:h.showTrans,onClick:u.onTap},null,8,["styles","duration","show","onClick"])):c("",!0),o(m,{key:"2","mode-class":h.ani,name:"content",styles:h.transClass,duration:h.duration,show:h.showTrans,onClick:u.onTap},{default:s((()=>[o(f,{class:n(["uni-popup__wrapper",[h.popupstyle]]),style:y(u.getStyles),onClick:u.clear},{default:s((()=>[d(t.$slots,"default",{},void 0,!0)])),_:3},8,["style","class","onClick"])])),_:3},8,["mode-class","styles","duration","show","onClick"])])),_:3},8,["onTouchstart"]),h.maskShow?(a(),i(g,{key:0,onEsc:u.onTap},null,8,["onEsc"])):c("",!0)])),_:3},8,["class"])):c("",!0)}],["__scopeId","data-v-f0b957f8"]]);const X=e({},[["render",function(t,e){return a(),v("svg",{xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",width:"24",height:"24",viewBox:"0 0 48 48"},[C("path",{fill:"#90CAF9",d:"M40 45L8 45 8 3 30 3 40 13z"}),C("path",{fill:"#E1F5FE",d:"M38.5 14L29 14 29 4.5z"})])}]]);var W=T.extend({name:"textarea",theme:function(t){var e=t.dt;return"\n.p-textarea {\n    font-family: inherit;\n    font-feature-settings: inherit;\n    font-size: 1rem;\n    color: ".concat(e("textarea.color"),";\n    background: ").concat(e("textarea.background"),";\n    padding: ").concat(e("textarea.padding.y")," ").concat(e("textarea.padding.x"),";\n    border: 1px solid ").concat(e("textarea.border.color"),";\n    transition: background ").concat(e("textarea.transition.duration"),", color ").concat(e("textarea.transition.duration"),", border-color ").concat(e("textarea.transition.duration"),", outline-color ").concat(e("textarea.transition.duration"),", box-shadow ").concat(e("textarea.transition.duration"),";\n    appearance: none;\n    border-radius: ").concat(e("textarea.border.radius"),";\n    outline-color: transparent;\n    box-shadow: ").concat(e("textarea.shadow"),";\n}\n\n.p-textarea:enabled:hover {\n    border-color: ").concat(e("textarea.hover.border.color"),";\n}\n\n.p-textarea:enabled:focus {\n    border-color: ").concat(e("textarea.focus.border.color"),";\n    box-shadow: ").concat(e("textarea.focus.ring.shadow"),";\n    outline: ").concat(e("textarea.focus.ring.width")," ").concat(e("textarea.focus.ring.style")," ").concat(e("textarea.focus.ring.color"),";\n    outline-offset: ").concat(e("textarea.focus.ring.offset"),";\n}\n\n.p-textarea.p-invalid {\n    border-color: ").concat(e("textarea.invalid.border.color"),";\n}\n\n.p-textarea.p-variant-filled {\n    background: ").concat(e("textarea.filled.background"),";\n}\n\n.p-textarea.p-variant-filled:enabled:focus {\n    background: ").concat(e("textarea.filled.focus.background"),";\n}\n\n.p-textarea:disabled {\n    opacity: 1;\n    background: ").concat(e("textarea.disabled.background"),";\n    color: ").concat(e("textarea.disabled.color"),";\n}\n\n.p-textarea::placeholder {\n    color: ").concat(e("textarea.placeholder.color"),";\n}\n\n.p-fluid .p-textarea {\n    width: 100%;\n}\n\n.p-textarea-resizable {\n    overflow: hidden;\n    resize: none;\n}\n")},classes:{root:function(t){var e=t.instance,a=t.props;return["p-textarea p-component",{"p-filled":e.filled,"p-textarea-resizable ":a.autoResize,"p-invalid":a.invalid,"p-variant-filled":a.variant?"filled"===a.variant:"filled"===e.$primevue.config.inputStyle||"filled"===e.$primevue.config.inputVariant}]}}}),J={name:"Textarea",extends:{name:"BaseTextarea",extends:$,props:{modelValue:null,autoResize:Boolean,invalid:{type:Boolean,default:!1},variant:{type:String,default:null}},style:W,provide:function(){return{$pcTextarea:this,$parentInstance:this}}},inheritAttrs:!1,emits:["update:modelValue"],mounted:function(){this.$el.offsetParent&&this.autoResize&&this.resize()},updated:function(){this.$el.offsetParent&&this.autoResize&&this.resize()},methods:{resize:function(){this.$el.style.height="auto",this.$el.style.height=this.$el.scrollHeight+"px",parseFloat(this.$el.style.height)>=parseFloat(this.$el.style.maxHeight)?(this.$el.style.overflowY="scroll",this.$el.style.height=this.$el.style.maxHeight):this.$el.style.overflow="hidden"},onInput:function(t){this.autoResize&&this.resize(),this.$emit("update:modelValue",t.target.value)}},computed:{filled:function(){return null!=this.modelValue&&this.modelValue.toString().length>0},ptmParams:function(){return{context:{disabled:this.$attrs.disabled||""===this.$attrs.disabled}}}}},Z=["value","aria-invalid"];J.render=function(t,e,i,s,o,n){return a(),v("textarea",S({class:t.cx("root"),value:t.modelValue,"aria-invalid":t.invalid||void 0,onInput:e[0]||(e[0]=function(){return n.onInput&&n.onInput.apply(n,arguments)})},t.ptmi("root",n.ptmParams)),null,16,Z)};const G=e({components:{IconFile:X,Textarea:J,Button:D},data:()=>({textMode:!0,contentValue:"",loading:!1,messageList:[],scrollElement:null,downLoadProcess:0,uploadProcess:0,onItemId:"",baseUrl:`http://${window.location.hostname}:7071/api`,uploadTask:null,hasEnter:!1}),onLoad(){},mounted(){this.scrollElement=this.$refs.scrollView,this.getMessageList(),this.initSSE()},methods:{initSSE(){const t=new EventSource(`http://${window.location.hostname}:7080/sse`);t.onmessage=t=>{"Can refresh"==JSON.parse(t.data).content&&this.getMessageList()},t.onerror=t=>{console.error("Error occurred:",t)}},handleDragEnter(t){this.hasEnter||(t.preventDefault(),this.hasEnter=!0)},handleDragOver(t){t.preventDefault()},handleDragLeave(t){this.hasEnter=!1},handleDrop(t){this.hasEnter=!1,this.$refs.popup.open(),t.preventDefault();const e=Array.from(t.dataTransfer.files);this.uploadTask=P({url:this.baseUrl+"/message/uploadFile",file:e[0],success:t=>{const e=JSON.parse(t.data);this.handleSend(e.data),this.$refs.popup.close()}}),this.uploadTask.onProgressUpdate((t=>{this.uploadProcess=t.progress}))},handleSend(t){if(!this.contentValue&&!t)return void _({icon:"error",title:"内容不能为空！"});this.loading=!0;const e={type:t?"file":"text",dateTime:(new Date).toLocaleString(),content:this.contentValue,fileData:t};E({url:this.baseUrl+"/message/addMessageData",method:"POST",data:{data:e}}).then((t=>{this.loading=!1,this.contentValue=""}))},handleFileChoose(){I().then((t=>{const e=this;this.$refs.popup.open(),this.uploadTask=P({url:this.baseUrl+"/message/uploadFile",filePath:t.tempFilePaths[0],name:"file",success:t=>{const a=JSON.parse(t.data);e.handleSend(a.data),this.$refs.popup.close()}}),this.uploadTask.onProgressUpdate((t=>{this.uploadProcess=t.progress}))}))},cancelUpload(){this.uploadTask.abort()},getMessageList(){E({url:this.baseUrl+"/message/getMessageList",method:"GET"}).then((t=>{this.messageList=t.data,z((()=>{this.scrollElement.scrollTop=this.scrollElement.scrollHeight}))}))},computeSize:t=>t>=1024?t>=1048576?(t/1024/1024).toFixed(2)+"M":(t/1024).toFixed(2)+"KB":t+"B",handleDownLoadFile(t){const e=this.baseUrl+`/message/downLoadFile?path=${encodeURIComponent(t.fileData.filepath)}&name=${encodeURIComponent(t.fileData.originalFilename)}`;this.onItemId=t.id;V({url:e,success:e=>{this.onItemId="";const a=document.createElement("a");a.href=e.tempFilePath,a.download=t.fileData.originalFilename,a.click()}}).onProgressUpdate((e=>{this.downLoadProcess=e.totalBytesWritten/t.fileData.size*100}))}}},[["render",function(t,e,n,d,u,m){const f=h,g=p,y=B,w=x("Button"),T=x("Textarea"),$=k(b("uni-popup-dialog"),H),S=k(b("uni-popup"),j);return a(),v("div",{class:"content",onDragenter:e[5]||(e[5]=(...t)=>m.handleDragEnter&&m.handleDragEnter(...t))},[C("div",{ref:"scrollView",class:"scroll-view"},[(a(!0),v(R,null,A(u.messageList,(t=>(a(),v("div",{class:"item-container",key:t.id},[C("div",{class:"time"},r(t.dateTime),1),C("div",{class:"item-content"},["text"==t.type?(a(),i(g,{key:0},{default:s((()=>[o(f,{class:"content-text"},{default:s((()=>[l(r(t.content),1)])),_:2},1024)])),_:2},1024)):"file"==t.type?(a(),v("div",{key:1,class:"file-container"},[C("div",{class:"file-block"},[C("div",{class:"file-name"},[C("i",{class:"pi pi-file"}),o(f,{class:"content-text"},{default:s((()=>[l(r(t.fileData.originalFilename),1)])),_:2},1024)]),C("div",null,[u.onItemId==t.id?(a(),i(y,{key:0,percent:u.downLoadProcess,"stroke-width":"3"},null,8,["percent"])):c("",!0)])]),o(f,{style:{color:"var(--p-primary-contrast-color)"}},{default:s((()=>[l(r(m.computeSize(t.fileData.size)),1)])),_:2},1024),C("div",null,[o(w,{icon:"pi pi-download","aria-label":"下载",severity:"secondary",onClick:e=>m.handleDownLoadFile(t)},null,8,["onClick"])])])):c("",!0)])])))),128))],512),C("div",{class:"input-module"},[o(T,{modelValue:u.contentValue,"onUpdate:modelValue":e[0]||(e[0]=t=>u.contentValue=t),placeholder:"请输入内容",rows:"4",style:{flex:"1"}},null,8,["modelValue"]),C("div",{style:{display:"flex","flex-direction":"column",gap:"10px"}},[o(w,{icon:"pi pi-file-arrow-up","aria-label":"传文件",severity:"secondary",onClick:m.handleFileChoose},null,8,["onClick"]),o(w,{icon:"pi pi-send","aria-label":"传文本",loading:u.loading,onClick:e[1]||(e[1]=t=>m.handleSend())},null,8,["loading"])])]),o(S,{ref:"popup",type:"dialog"},{default:s((()=>[o($,{mode:"base",type:"warning",title:"上传进度",showClose:!1,"confirm-text":"取消",onConfirm:m.cancelUpload},{default:s((()=>[o(y,{style:{width:"100%"},percent:u.uploadProcess,activeColor:"var(--p-primary-color)","stroke-width":"3"},null,8,["percent"])])),_:1},8,["onConfirm"])])),_:1},512),u.hasEnter?(a(),v("div",{key:0,class:"dragMask",onDragleave:e[2]||(e[2]=(...t)=>m.handleDragLeave&&m.handleDragLeave(...t)),onDragover:e[3]||(e[3]=(...t)=>m.handleDragOver&&m.handleDragOver(...t)),onDrop:e[4]||(e[4]=(...t)=>m.handleDrop&&m.handleDrop(...t))}," 放开拖拽将上传文件，若不想上传请移出，若多文件只会上传第一个 ",32)):c("",!0)],32)}],["__scopeId","data-v-68778f31"]]);export{G as default};
