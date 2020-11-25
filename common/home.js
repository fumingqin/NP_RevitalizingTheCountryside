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
	
	//--------------------------------------公告资讯--------------------------------------
	getNotice:{
		Url: Url + '/api/manage/getNotice',
		name:'公告资讯',
		method:'POST',
	}, 
	
	//--------------------------------------获取地图乡村数据--------------------------------------
	getDataByVillageName:{
		Url: Url + '/api/map/getDataByVillageName',
		name:'获取地图乡村数据',
		method:'POST',
	}, 
	
	//----------------------------------------------------------------------------
	getVillageByKey:{
		Url: Url + '/api/map/getVillageByKey',
		name:'搜索关键字',
		method:'POST',
	}, 
}

export default {
	KyInterface,
}