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
	getProjectByUserID:{
		Url:Url + '/api/project/getProjectByUserID',
		name:'发布项目列表接口（个人）',
		method:'POST',
	},
	
	releaseProject:{
		Url:Url + '/api/project/releaseProject',
		name:'发布项目接口',
		method:'POST',
	},
	
	deleteProject:{
		Url:Url + '/api/project/deleteProject',
		name:'删除发布项目接口',
		method:'POST',
	},
	
	upAndDownProject:{
		Url:Url + '/api/project/upAndDownProject',
		name:'上下架发布项目接口',
		method:'POST',
	},
	
	updateProject:{
		Url:Url + '/api/project/updateProject',
		name:'编辑项目接口',
		method:'POST',
	},
	
	getProjectDetailByID:{
		Url:Url + '/api/project/getProjectDetailByID',
		name:'项目详情接口',
		method:'POST',
	},
	
	getPersonId:{
		Url:Url + '/api/project/getPersonId',
		name:'获取负责人',
		method:'POST',
	},
}

// 接口声明区
export default {
	KyInterface,
}