(this.webpackJsonpuwScheduler=this.webpackJsonpuwScheduler||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(25)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n,r,c=a(0),s=a.n(c),o=a(9),l=a.n(o),i=(a(15),a(1)),u=(a(16),function(e){return s.a.createElement("div",{className:"uw-scheduler-field"},s.a.createElement("input",Object.assign({className:"uw-scheduler-text-input",type:"text"},e)))}),d=(a(17),a(3)),m=a(5),b=a(6),f=a(4),v=a.n(f),h=a(7),y=/(\d\d):(\d\d)/,p=function(e){var t=y.exec(e);if(t)return Number(t[1])+Math.round(Number(t[2])/60*100)/100;throw Error("Invalid timeByColon ".concat(e))},E=/([A-Z][a-z]?)/g,g=function(e){var t=e.match(E);if(t)return t;throw Error("Invalid weekdaysShort ".concat(e))},O=function(e){if(!e.length)throw Error("Expected ".concat(e," to be an array of size at least 1."));var t=e[0],a=t.subject,n=t.catalog_number,r=t.title,c=t.note,s=[],o=!0,l=!1,i=void 0;try{for(var u,d=e[Symbol.iterator]();!(o=(u=d.next()).done);o=!0){var m=u.value;if(1!==m.classes.length)throw Error("Expected ".concat(m.classes," to be an array of size 1."));var b=m.class_number,f=m.section,v=m.classes[0],h=v.date,y=v.location,E=v.instructors;s.push({classNumber:b,section:f,date:{startTime:p(h.start_time),endTime:p(h.end_time),weekdays:g(h.weekdays)},location:y,instructors:E})}}catch(O){l=!0,i=O}finally{try{o||null==d.return||d.return()}finally{if(l)throw i}}return{subject:a,catalogNumber:n,title:r,note:c,sections:s}},T=/([a-z]+)([\d].+)/i,j=a(2),N=(a(19),a(20),function(e,t,a){var n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],r=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],c=!0;return c=n?c&&t<=e:c&&t<e,c=r?c&&e<=a:c&&e<a}),w=function(e,t){var a=t.section.date,n=a.startTime,r=a.endTime,c=0,s=!0,o=!1,l=void 0;try{for(var i,u=e[Symbol.iterator]();!(s=(i=u.next()).done);s=!0){var d=i.value;(N(n,d.section.date.startTime,d.section.date.endTime)||N(r,d.section.date.startTime,d.section.date.endTime))&&++c}}catch(m){o=!0,l=m}finally{try{s||null==u.return||u.return()}finally{if(o)throw l}}return c},x=function(e){e.day;var t=e.even,a=e.classes,n=e.colors;return s.a.createElement("div",{className:"calendar-day"},s.a.createElement("div",{className:"calendar-day-underlay-container"},S.map((function(e){var a=e.startTime,n=e.endTime,r={background:a%1===0?t?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.0)":"rgba(0,0,0,0.3)"};return s.a.createElement("div",{key:"".concat(a,"-").concat(n),className:"calendar-day-underlay",style:r})}))),s.a.createElement("div",{className:"calendar-day-classes-container"},a.map((function(e,t){var r=e.section,c={top:"".concat(2*(r.date.startTime-k)*25,"px"),left:"".concat(100-function(e,t){var a=t.section.date,n=a.startTime,r=a.endTime;return(e=e.filter((function(e){return N(n,e.section.date.startTime,e.section.date.endTime)||N(r,e.section.date.startTime,e.section.date.endTime)}))).indexOf(t)+1}(a,e)*(100/w(a,e)),"%"),width:"".concat(100/w(a,e),"%"),height:"".concat(2*(r.date.endTime-r.date.startTime)*25,"px"),background:n[t]};return s.a.createElement("div",{className:"calendar-day-class",key:r.classNumber,style:c},"".concat(e.subject).concat(e.catalogNumber),s.a.createElement("br",null),"".concat(r.section))}))))};!function(e){e.Monday="Monday",e.Tuesday="Tuesday",e.Wednesday="Wednesday",e.Thursday="Thursday",e.Friday="Friday"}(n||(n={})),function(e){e.Monday="M",e.Tuesday="T",e.Wednesday="W",e.Thursday="Th",e.Friday="F"}(r||(r={}));for(var k=8.5,S=[],C={startTime:k,endTime:k+.5};C.endTime<=21;)S.push(Object(m.a)({},C)),C.startTime+=.5,C.endTime+=.5;var I=function(e){for(var t,a=e.classesInfo,c=e.classesEnabledFlags,o=e.classesColors,l=(t={},Object(j.a)(t,r.Monday,{classesInfo:[],colors:[]}),Object(j.a)(t,r.Tuesday,{classesInfo:[],colors:[]}),Object(j.a)(t,r.Wednesday,{classesInfo:[],colors:[]}),Object(j.a)(t,r.Thursday,{classesInfo:[],colors:[]}),Object(j.a)(t,r.Friday,{classesInfo:[],colors:[]}),t),i=0;i<a.length;++i){var u=a[i];if(c[i]){var d=!0,m=!1,b=void 0;try{for(var f,v=u.section.date.weekdays[Symbol.iterator]();!(d=(f=v.next()).done);d=!0){var h=f.value;l[h].classesInfo.push(u),l[h].colors.push(o[i])}}catch(y){m=!0,b=y}finally{try{d||null==v.return||v.return()}finally{if(m)throw b}}}}return s.a.createElement("div",{className:"calendar",style:{height:"calc(25px * 25)"}},s.a.createElement("div",{className:"calendar-time-container"},S.map((function(e){var t=e.startTime,a=(e.endTime,Math.floor(t/1)),n=t%1!==0?t%1*60:"00",r=a<=12?"".concat(a,":").concat(n," ").concat(a<12?"AM":"PM"):"".concat(a%12,":").concat(n," PM");return s.a.createElement("div",{key:t,className:"calendar-time"},s.a.createElement("div",{className:"calendar-time-tick"}),s.a.createElement("span",null,r))}))),Object.values(n).map((function(e,t){return s.a.createElement(x,{key:e,day:e,even:t%2===0,classes:l[r[e]].classesInfo,colors:l[r[e]].colors})})))},M=(a(21),a(22),a(23),function(e){var t=e.labelText,a=Object(b.a)(e,["labelText"]);return s.a.createElement("div",{className:"uw-scheduler-field"},s.a.createElement("input",Object.assign({className:"uw-scheduler-checkbox-input",type:"checkbox"},a)),null!==t&&void 0!==t?t:null)}),_=function(e){var t=e.coursesInfo,a=e.classesEnabledFlags,n=e.setClassEnabled,r=e.classesColors,c=0;return s.a.createElement("div",{className:"options"},t.map((function(e){return s.a.createElement("div",{key:"".concat(e.subject).concat(e.catalogNumber),className:"options-course"},s.a.createElement("div",{className:"options-course-title"},"".concat(e.subject).concat(e.catalogNumber)),s.a.createElement("div",{className:"options-course-sections"},e.sections.map((function(e){if(!e.section.includes("TST")){var t=c;++c;return s.a.createElement("div",{key:e.classNumber,style:{color:r[t]}},s.a.createElement(M,{labelText:"".concat(e.section," ").concat(e.instructors),checked:a[t],onChange:function(e){n(t,!a[t])}}))}return null}))))})))},F=["rgb(255, 159, 243)","rgb(254, 202, 87)","rgb(255, 107, 107)","rgb(72, 219, 251)","rgb(29, 209, 161)","rgb(243, 104, 224)","rgb(255, 159, 67)","rgb(238, 82, 83)","rgb(10, 189, 227)","rgb(16, 172, 132)","rgb(0, 210, 211)","rgb(84, 160, 255)","rgb(95, 39, 205)","rgb(200, 214, 229)","rgb(87, 101, 116)","rgb(1, 163, 164)","rgb(46, 134, 222)","rgb(52, 31, 151)","rgb(131, 149, 167)","rgb(34, 47, 62)"],W={all:F,dark:[].concat(Object(d.a)(F.slice(5,10)),Object(d.a)(F.slice(15,20))),light:[].concat(Object(d.a)(F.slice(0,5)),Object(d.a)(F.slice(10,15)))},A=function(e){var t=function(e,t){var a=Object(c.useState)(null),n=Object(i.a)(a,2),r=n[0],s=n[1];return Object(c.useEffect)((function(){var a=function(){var t=Object(h.a)(v.a.mark((function t(a){var n,r,c,s,o,l;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=T.exec(a))){t.next=13;break}return r=n[1],c=n[2],t.next=6,fetch("http://localhost:5000/course?term=".concat(e,"&subject=").concat(r,"&catalogNumber=").concat(c));case 6:return s=t.sent,console.log(Object({NODE_ENV:"production",PUBLIC_URL:"/uwScheduler",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0})),t.next=10,s.json();case 10:return o=t.sent,l=o.data,t.abrupt("return",l);case 13:throw Error("Invalid courseName ".concat(a));case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function n(){return(n=Object(h.a)(v.a.mark((function e(){var n,r,c,o,l,i,u,d;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],r=!0,c=!1,o=void 0,e.prev=4,l=t[Symbol.iterator]();case 6:if(r=(i=l.next()).done){e.next=15;break}return u=i.value,e.next=10,a(u);case 10:d=e.sent,n.push(O(d));case 12:r=!0,e.next=6;break;case 15:e.next=21;break;case 17:e.prev=17,e.t0=e.catch(4),c=!0,o=e.t0;case 21:e.prev=21,e.prev=22,r||null==l.return||l.return();case 24:if(e.prev=24,!c){e.next=27;break}throw o;case 27:return e.finish(24);case 28:return e.finish(21);case 29:s(n);case 30:case"end":return e.stop()}}),e,null,[[4,17,21,29],[22,,24,28]])})))).apply(this,arguments)}!function(){n.apply(this,arguments)}()}),[e,t]),r}(1205,e.coursesList);console.log(t);var a=Object(c.useState)(null),n=Object(i.a)(a,2),r=n[0],o=n[1],l=Object(c.useState)(null),u=Object(i.a)(l,2),f=u[0],y=u[1],p=Object(c.useState)(null),E=Object(i.a)(p,2),g=E[0],j=E[1];Object(c.useEffect)((function(){if(t){var e=[],a=[],n=[],r=!0,c=!1,s=void 0;try{for(var l,u=t.entries()[Symbol.iterator]();!(r=(l=u.next()).done);r=!0){var d=Object(i.a)(l.value,2),f=d[0],v=d[1],h=v.sections,p=Object(b.a)(v,["sections"]),E=!0,g=!1,O=void 0;try{for(var T,N=h[Symbol.iterator]();!(E=(T=N.next()).done);E=!0){var w=T.value;w.section.includes("TST")||(e.push(Object(m.a)({},p,{section:w})),a.push(!0),n.push(W.light[f%W.light.length]))}}catch(x){g=!0,O=x}finally{try{E||null==N.return||N.return()}finally{if(g)throw O}}}}catch(x){c=!0,s=x}finally{try{r||null==u.return||u.return()}finally{if(c)throw s}}o(e),y(a),j(n)}}),[t]);return s.a.createElement("div",{className:"scheduler"},s.a.createElement("div",{className:"calendar-container"},r&&f&&g&&s.a.createElement(I,{classesInfo:r,classesEnabledFlags:f,classesColors:g})),s.a.createElement("div",{className:"options-container"},t&&f&&g&&s.a.createElement(_,{coursesInfo:t,classesEnabledFlags:f,setClassEnabled:function(e,t){if(f){var a=Object(d.a)(f);a[e]=t,y(a)}},classesColors:g})))},P=function(){var e=Object(c.useState)("CS466, CO342, CO351, CO454, PMATH336, KOREA101R"),t=Object(i.a)(e,2),a=t[0],n=t[1],r=Object(c.useState)([]),o=Object(i.a)(r,2),l=o[0],d=o[1],m=Object(c.useCallback)((function(e){n(e.target.value)}),[]),b=Object(c.useCallback)((function(e){"Enter"===e.key&&d(a.replace(/\s/g,"").split(","))}),[a]);return s.a.createElement("div",{className:"home"},s.a.createElement("div",{className:"title"},s.a.createElement("h1",null,"uwScheduler")),s.a.createElement("div",{className:"search-bar"},s.a.createElement(u,{value:a,autoFocus:!0,placeholder:"CS466, CO342, CO351, CO454, PMATH336, KOREA101R",onChange:m,onKeyPress:b})),s.a.createElement("div",{className:"search-results"},l.length&&s.a.createElement(A,{coursesList:l})))},K=(a(24),function(){return s.a.createElement("div",{className:"App"},s.a.createElement(P,null))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(s.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[10,1,2]]]);
//# sourceMappingURL=main.0194d6f6.chunk.js.map