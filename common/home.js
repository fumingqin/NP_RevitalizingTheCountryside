// 接口声明区
import $oSit from '@/common/overallSituation.js'; //引入公共js文件

//接口域名
// #ifdef H5
	const Url=$oSit.Interface.address.Url;
// #endif
// #ifndef H5
	const Url=$oSit.Interface.address.Url;
// #endif

//接口对象
const KyInterface = {
	//--------------------------------------轮播区--------------------------------------
	GetRotationChart:{
		Url: Url + '/api/BasicImage/GetRotationChart',
		name:'轮播',
		method:'POST',
	}, 
	//--------------------------------------资讯区--------------------------------------
	GetHomeStyle:{
		Url: Url + '/api/BasicImage/GetHomeStyle',
		name:'资讯',
		method:'POST',
	}, 
	//--------------------------------------资讯通知--------------------------------------
	GetNews:{
		Url: Url + '/api/News/GetNews',
		name:'资讯通知',
		method:'POST',
	}, 
	//--------------------------------------根据AID获取资讯--------------------------------------
	GetNewsByAID:{
		Url: Url + '/api/News/GetNewsByAID',
		name:'AID获取资讯',
		method:'POST',
	}, 
}

export default {
	KyInterface,
}