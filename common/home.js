// 接口声明区
import $oSit from '@/common/overallSituation.js'; //引入公共js文件

//接口域名
// #ifdef H5
	const Url=$oSit.Interface.address.xczx_Url;
// #endif
// #ifndef H5
	const Url=$oSit.Interface.address.xczx_Url;
// #endif

//接口对象
const KyInterface = {
	//--------------------------------------轮播区--------------------------------------
	getImage:{
		Url: Url + '/api/manage/getImage',
		name:'轮播',
		method:'POST',
	}, 
	
	//--------------------------------------跑马灯区--------------------------------------
	getMarquee:{
		Url: Url + '/api/manage/getMarquee',
		name:'跑马灯',
		method:'POST',
	}, 
	
	//--------------------------------------水美经济--------------------------------------
	getEconomy:{
		Url: Url + '/api/economy/getEconomy',
		name:'水美经济',
		method:'POST',
	}, 
	
	//--------------------------------------项目监督--------------------------------------
	getProject:{
		Url: Url + '/api/project/getProject',
		name:'项目监督',
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