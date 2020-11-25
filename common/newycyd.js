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
	getArchives:{
		Url:Url + '/api/archives/getArchives',
		name:'一村一档列表接口',
		method:'POST',
	},
	
	//--------------------------------------接口--------------------------------------
	getArchivesByUserID:{
		Url:Url + '/api/village/getArchivesByUserID',
		name:'一村一档列表接口(个人)',
		method:'POST',
	},
	
	//--------------------------------------接口--------------------------------------
	getArchivesByRuralId:{
		Url:Url + '/api/archives/getArchivesByRuralId',
		name:'一村一档详情',
		method:'POST',
	},
	
	//--------------------------------------接口--------------------------------------
	upload:{
		Url:'http://120.24.144.6:8080/api/file/upload',
		name:'上传图片',
		method:'POST',
		pages: [],
	},
	
	//--------------------------------------接口--------------------------------------
	addLeader:{
		Url:Url + '/api/archives/addLeader',
		name:'添加村长信息',
		method:'POST',
	},
	
	//--------------------------------------接口--------------------------------------
	addVillageInfo:{
		Url:Url + '/api/archives/addVillageInfo',
		name:'添加街道信息',
		method:'POST',
	},
	
	//--------------------------------------接口--------------------------------------
	addVillagePeople:{
		Url:Url + '/api/archives/addVillagePeople',
		name:'添加职责人员信息',
		method:'POST',
	},
	
	//--------------------------------------接口--------------------------------------
	addViews:{
		Url:Url + '/api/village/addViews',
		name:'增加浏览量接口',
		method:'POST',
	},
	
	//--------------------------------------接口--------------------------------------
	deleteVillageInfo:{
		Url:Url + '/api/archives/deleteVillageInfo',
		name:'删除街道接口',
		method:'POST',
	},
	//--------------------------------------接口--------------------------------------
	deleteVillagePeople:{
		Url:Url + '/api/archives/deleteVillagePeople',
		name:'删除职责人员接口',
		method:'POST',
	},
	//--------------------------------------接口--------------------------------------
	updateLeader:{
		Url:Url + '/api/archives/updateLeader',
		name:'修改村长信息接口',
		method:'POST',
	},
	//--------------------------------------接口--------------------------------------
	updateVillagePeople:{
		Url:Url + '/api/archives/updateVillagePeople',
		name:'修改职责人员信息接口',
		method:'POST',
	},
	//--------------------------------------接口--------------------------------------
	updateVillageInfo:{
		Url:Url + '/api/archives/updateVillageInfo',
		name:'修改街道信息接口',
		method:'POST',
	},
	//--------------------------------------接口--------------------------------------
	getArchivesByKey:{
		Url:Url + '/api/archives/getArchivesByKey',
		name:'搜索村档案接口',
		method:'POST',
	},
}

// 接口声明区
export default {
	KyInterface,
}