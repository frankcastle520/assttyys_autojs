import Vue from 'vue';
import VueRouter from "vue-router";
import 'vant/lib/index.css';
import './assets/icon/iconfont.css';
import App from './App.vue';
import '../mock/promptMock';

let autoWebMode = 'prompt';
if (localStorage && localStorage.debug) {
	autoWebMode = 'promptMock';
}
AutoWeb.setMode(autoWebMode);

AutoWeb.autoPromise = function (eventname, params) {
	return new Promise(function (resolve, reject) {
		const EVENT_ID = eventname + Date.now().toString();
		AutoWeb.devicelly(EVENT_ID, function (p) {
			resolve(p);
		}, this, true);
		return window[autoWebMode](eventname, JSON.stringify({
			params,
			PROMPT_CALLBACK: EVENT_ID
		}));
	});
}


Vue.use(VueRouter);

var router = new VueRouter({
	routes: [{
		path:"/",
		name: 'index',
		meta: {
			index: 0
		},
		component: () => import('./pages/SchemeList.vue')
	}, {
		path:"/schemeList",
		name: 'schemeList',
		meta: {
			index: 0
		},
		component: () => import('./pages/SchemeList.vue')
	}, {
		path:"/me",
		name: 'me',
		meta: {
			index: 0
		},
		component: () => import('./pages/Me.vue')
	}, {
		path:"/funcList",
		name: 'funcList',
		meta: {
			index: 1
		},
		component: () => import('./pages/FuncList.vue')
	}]
});
// 事件总线
Vue.prototype.$EventBus = new Vue();
var myApp = new Vue({
	el: '#app',
	router,
	render: h => h(App),
});
window.routeBack = function () {
	if (/^index|schemeList$/.test(myApp.$route.name)) {
		if (window.routeBackFlag) {
			AutoWeb.auto('exit');
		} else {
			window.routeBackFlag = true;
			AutoWeb.auto('toast', '再按一次退出程序');
			setTimeout(() => {
				window.routeBackFlag = false;
			}, 1000)
		}
	} else {
		myApp.$router.back();
	}
}