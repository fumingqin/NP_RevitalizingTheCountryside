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
	getDynamicById:{
		Url:Url + '/api/ruralDynamic/getDynamicById',
		name:'乡村动态列表接口（个人）',
		method:'POST',
	},
	
	upAndDown:{
		Url:Url + '/api/ruralDynamic/upAndDown',
		name:'上下架接口',
		method:'POST',
	},
	
	deleteDynamic:{
		Url:Url + '/api/ruralDynamic/deleteDynamic',
		name:'删除接口',
		method:'POST',
	},
	
	releaseDynamic:{
		Url:Url + '/api/ruralDynamic/releaseDynamic',
		name:'发布乡村动态接口',
		method:'POST',
	},
	
	getDynamicDetailByID:{
		Url:Url + '/api/ruralDynamic/getDynamicDetailByID',
		name:'发布乡村动态详情',
		method:'POST',
	},
	
	editDynamic:{
		Url:Url + '/api/ruralDynamic/editDynamic',
		name:'修改乡村动态列表',
		method:'POST',
	},
	
	addViews:{
		Url:Url + '/api/ruralDynamic/addViews',
		name:'增加浏览量',
		method:'POST',
	},
	
	getDynamic:{
		Url:Url + '/api/ruralDynamic/getDynamic',
		name:'获取所有列表数据',
		method:'POST',
	},
}

// 接口声明区
export default {
	KyInterface,
}