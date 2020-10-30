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
	//--------------------------------------列表接口--------------------------------------
	releasePolicy:{
		Url:Url + '/api/policy/releasePolicy',
		name:'发布政策列表接口',
		method:'POST',
	},
	//--------------------------------------列表接口--------------------------------------
	getPolicy:{
		Url:Url + '/api/policy/getPolicy',
		name:'政策发布列表接口',
		method:'POST',
	},
	
	//--------------------------------------个人列表接口--------------------------------------
	getPolicyById:{
		Url:Url + '/api/policy/getPolicyById',
		name:'政策发布列表接口(个人)',
		method:'POST',
	},
	
	//--------------------------------------详情接口--------------------------------------
	getPolicyDetailByID:{
		Url:Url + '/api/policy/getPolicyDetailByID',
		name:'政策发布详情',
		method:'POST',
	},
	
	//--------------------------------------上传图片接口--------------------------------------
	upload:{
		Url:'http://120.24.144.6:8080/api/file/upload',
		name:'上传图片',
		method:'POST',
		pages: [],
	},
	
	//--------------------------------------上下架接口--------------------------------------
	upAndDownArchives:{
		Url:Url + '/api/policy/upAndDownArchives',
		name:'上下架接口',
		method:'POST',
	},
	
	//--------------------------------------删除接口--------------------------------------
	deleteArchives:{
		Url:Url + '/api/policy/deleteArchives',
		name:'删除接口',
		method:'POST',
	},
	
	//--------------------------------------编辑接口--------------------------------------
	updatePolicy:{
		Url:Url + '/api/policy/updatePolicy',
		name:'编辑政策接口',
		method:'POST',
	},
}

// 接口声明区
export default {
	KyInterface,
}