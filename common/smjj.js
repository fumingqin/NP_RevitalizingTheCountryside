/* 接口参数区 */
// 示例


//传统客运接口配置
import $oSit from '@/common/overallSituation.js'; //引入公共js文件

//接口域名
// #ifdef H5
	const Url = 'http://36.250.234.10:19755';
// #endif
// #ifndef H5
	const Url = 'http://36.250.234.10:19755'; //https请求
// #endif

// const url = $oSit.Interface.address.Url;

//接口对象
const KyInterface = {
	//GET-POST
	//--------------------------------------接口--------------------------------------
	getEconomyByUserID:{
		Url:Url + '/api/economy/getEconomyByUserID',
		name:'水美经济列表接口（个人）',
		method:'POST',
	},
	
	releaseEconomy:{
		Url:Url + '/api/economy/releaseEconomy',
		name:'发布水美经济文章内容',
		method:'POST',
	},
	
	updateEconomy:{
		Url:Url + '/api/economy/updateEconomy',
		name:'编辑修改水美经济文章内容',
		method:'POST',
	},
	
	getEconomyDetailByID:{
		Url:Url + '/api/economy/getEconomyDetailByID',
		name:'水美经济详情接口',
		method:'POST',
	},
	
	upAndDownEconomy:{
		Url:Url + '/api/economy/upAndDownEconomy',
		name:'水美经济上下架接口',
		method:'POST',
	},
	
	deleteEconomy:{
		Url:Url + '/api/economy/deleteEconomy',
		name:'水美经济删除接口',
		method:'POST',
	},
	
	addViews:{
		Url:Url + '/api/economy/addViews',
		name:'水美经济增加浏览量',
		method:'POST',
	},
	
	getEconomy:{
		Url:Url + '/api/economy/getEconomy',
		name:'水美经济列表接口',
		method:'POST',
	},
}

// 接口声明区
export default {
	KyInterface,
}