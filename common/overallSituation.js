// 引用模板代码
const Interface = {
	
	address:{
		// 公众号
		// #ifdef H5
			Url : 'https://appdl.xmjdt.cn:18443', //南平综合出行
		// #endif
		
		// #ifndef H5
		// 小程序/APP
			Url : 'https://appdl.xmjdt.cn:18443', //南平综合出行
		// #endif
		
	},
	
	system:{
		applyName:'南平综合出行',
		
		// appName:'专线购票小程序', //仅用于微信授权登录
		appName:'交通在线小程序', //仅用于微信授权登录
		// appName:'南平综合出行', //仅用于微信授权登录
		imageApplicationType:'XCX',//全局图片接口应用类型，用于请求全局图片使用
		// #ifdef H5
			openidtype:'公众号',
		// #endif
		// #ifdef MP-WEIXIN
			openidtype:'小程序',
		// #endif
		// #ifdef APP-PLUS
			openidtype:'APP',
		// #endif	
	}
}

const appConfig={  //AppId,AppSecret配置
	local:{
		url:'http://zntc.145u.net/h55/#/',
		name:'公众号请求地址',
	},
}

// 接口声明区
export default {
	Interface,
	appConfig
}
