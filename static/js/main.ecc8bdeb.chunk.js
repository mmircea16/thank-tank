(this.webpackJsonpthanktank=this.webpackJsonpthanktank||[]).push([[0],{11:function(e,t,n){e.exports=n(17)},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(9),s=n.n(i),r=n(2),c=n(3),l=n(5),u=n(4),h=n(1),d=n(6),p={apiKey:"AIzaSyC4UvL_Yjq8Tef22E7Rj-HDafrxzRY4Iis",clientId:"302154217901-42dk7gumote0945geu0bq6vpotaa4qqu.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/spreadsheets",spreadsheetId:"17lpXtlODcFYHK5kdDSpuO0sXimVwUrzQMbEnMVj8h0c",speedLowerBound:25,speedUpperBound:35,gridSize:12,timePerWord:.1,ranges:["A2:F","Form Responses 1!A2:F"],mapping:{name:3,from:2,message:4,secret:5}};function f(e){return new Promise((function(e){window.gapi.load("client:auth2",(function(){console.log("config",p),window.gapi.client.init({apiKey:p.apiKey,clientId:p.clientId,scope:p.scope,discoveryDocs:["https://sheets.googleapis.com/$discovery/rest?version=v4"]}).then((function(){console.log("resolve"),e()}))}))}))}function m(){return new Promise((function(e,t){window.gapi.client.load("sheets","v4",(function(){window.gapi.client.sheets.spreadsheets.values.batchGet({spreadsheetId:p.spreadsheetId,ranges:p.ranges}).then((function(t){var n=t.result.valueRanges.flatMap((function(e){return e.values}));e(g(n))}),(function(e){t(!1,e.result.error)}))}))}))}var g=function(e){return e?e.filter((function(e){return e[p.mapping.name]&&""!==e[p.mapping.name]})):[]},v=n(7),b=n(10),k=n.n(b),S=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state=Object(v.a)({},e),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement(k.a,{targetPosition:9e3,easeType:"linear",speed:1,updateInterval:60,scrollTargetRef:this.refs.scrollSection,isEnabled:this.props.autoScrollEnabled},o.a.createElement("section",{ref:"scrollSection",className:"thankText"},this.props.message))}}]),t}(a.Component),w=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state=Object(v.a)({},e,{autoScroll:!1}),n.shouldAutoScroll=n.shouldAutoScroll.bind(Object(h.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"shouldAutoScroll",value:function(){var e="flipped"===this.props.flipped&&this.props.className.includes("back")||"flipped"!==this.props.flipped&&this.props.className.includes("front");e!==this.state.autoScroll&&this.setState({autoScroll:e})}},{key:"componentDidUpdate",value:function(){this.state.autoScroll?this.shouldAutoScroll():setTimeout(this.shouldAutoScroll,4e3)}},{key:"componentDidMount",value:function(){this.shouldAutoScroll()}},{key:"render",value:function(){var e=this.props.row,t="Keep it a secret"===e.secret?"Anonymous":e.from;return o.a.createElement("article",{className:"thankCard "+this.props.className},o.a.createElement("header",null,o.a.createElement("strong",null,"Thank you ",o.a.createElement("span",{className:"name"},e.name,"!"))),o.a.createElement(S,{message:e.message,autoScrollEnabled:this.state.autoScroll}),o.a.createElement("footer",null,"from ",t))}}]),t}(a.Component);function j(){var e=["blueCard","greenCard","pinkCard","redCard","orangeCard","purpleCard"];return e[Math.floor(Math.random()*e.length)]}var E,O=p.mapping,y=!1,C=-1,N=0,A=[];function I(){if(!y){y=!0;var e=new Promise((function(e){f().then((function(t){m().then(e).then(T.bind(null,p.minRefreshRate))}))}));e.then((function(){E=e})),E||(E=e),T(2*p.minRefreshRate)}}function T(e){var t=setTimeout((function(){y=!1,A.forEach((function(e){return clearTimeout(e)})),A=[]}),1e3*e);A.push(t)}var R=function(){function e(){Object(r.a)(this,e),I()}return Object(c.a)(e,[{key:"getNext",value:function(){return N-1<=C&&I(),new Promise((function(e,t){E.then((function(t){N=t.length;var n=function(e){var t=C+1;return t<e?t:Math.floor(Math.random()*e)}(t.length),a=t[n][O.from]||"Anonymous";e({name:t[n][O.name]||"",message:t[n][O.message]||"",from:a,secret:t[n][O.secret]}),C=n>C?n:C}))}))}}]),e}();var M=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).store=new R,n.state={flipped:!1,back:{name:"",message:"",from:""},front:{name:"",message:"",from:""},frontColour:j(),backColour:j()},n.flip=n.flip.bind(Object(h.a)(n)),n.getRandomWaitTime=n.getRandomWaitTime.bind(Object(h.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"getRandomWaitTime",value:function(){var e=this.state.back.message;"flipped"===this.state.flipped&&(e=this.state.front.message);var t=e.split(" ").length;return 1e3*(Math.floor(Math.random()*(p.speedUpperBound-p.speedLowerBound+1))+p.speedLowerBound+t*p.timePerWord)}},{key:"componentDidMount",value:function(){var e=this;this.store.getNext().then((function(t){e.setState({front:t})})),setTimeout(this.flip,this.getRandomWaitTime())}},{key:"flip",value:function(){var e=this;this.state.flipped?this.store.getNext().then((function(t){e.setState({flipped:"",frontColour:j(),front:t})})):this.store.getNext().then((function(t){return e.setState({flipped:"flipped",backColour:j(),back:t})})),setTimeout(this.flip,this.getRandomWaitTime())}},{key:"render",value:function(){return o.a.createElement("section",{className:"container"},o.a.createElement("div",{className:"card "+this.state.flipped},o.a.createElement(w,{className:"front "+this.state.frontColour,row:this.state.front,flipped:this.state.flipped}),o.a.createElement(w,{className:"back "+this.state.backColour,row:this.state.back,flipped:this.state.flipped})))}}]),t}(a.Component),D=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={loading:!0,error:null,hasContent:!1,authenticated:!1},n.onLoad=n.onLoad.bind(Object(h.a)(n)),n.onError=n.onError.bind(Object(h.a)(n)),n.updateSigninStatus=n.updateSigninStatus.bind(Object(h.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){f().then(this.handleAuth.bind(this))}},{key:"handleAuth",value:function(){window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);var e=window.gapi.auth2.getAuthInstance().isSignedIn.get();console.log("handleAuth",e),this.updateSigninStatus(e)}},{key:"updateSigninStatus",value:function(e){e?(this.setState({authenticated:!0}),m().then(this.onLoad,this.onError)):this.setState({authenticated:!1,loading:!1})}},{key:"onLoad",value:function(e,t){this.setState({rows:e,hasContent:!0,loading:!1})}},{key:"onError",value:function(e){this.setState({error:e,hasContent:!1,loading:!1})}},{key:"render",value:function(){return o.a.createElement("div",{className:"app"},o.a.createElement("div",{className:"banner"},o.a.createElement("div",{className:"left"}),o.a.createElement("div",{className:"right"})),this.renderContent())}},{key:"renderContent",value:function(){if(this.state.loading)return o.a.createElement("div",{className:"loader"});if(!this.state.authenticated)return o.a.createElement("button",{onClick:this.authenticate.bind(this),className:"btn"},"Connect with Google");if(this.state.hasContent){var e=new Array(p.gridSize).fill(1).map((function(e,t){return o.a.createElement(M,{key:"flip-"+t})}));return o.a.createElement("div",{className:"cards"},e)}return this.state.error?o.a.createElement("h1",null," ",this.state.error," "):void 0}},{key:"authenticate",value:function(e){e.preventDefault(),console.log("authenticate"),window.gapi.auth2.getAuthInstance().signIn()}}]),t}(a.Component);n(16);s.a.render(o.a.createElement(D,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.ecc8bdeb.chunk.js.map