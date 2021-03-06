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
		Url:Url + '/api/village/getArchives',
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
	getArchiveDetailByID:{
		Url:Url + '/api/village/getArchiveDetailByID',
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
	releaseArchives:{
		Url:Url + '/api/village/releaseArchives',
		name:'发布一村一档',
		method:'POST',
	},
	
	//--------------------------------------接口--------------------------------------
	addViews:{
		Url:Url + '/api/village/addViews',
		name:'增加浏览量接口',
		method:'POST',
	},
	
	//--------------------------------------接口--------------------------------------
	upAndDownArchives:{
		Url:Url + '/api/village/upAndDownArchives',
		name:'上下架接口',
		method:'POST',
	},
	
	//--------------------------------------接口--------------------------------------
	deleteArchives:{
		Url:Url + '/api/village/deleteArchives',
		name:'删除接口',
		method:'POST',
	},
	
	//--------------------------------------接口--------------------------------------
	updateArchives:{
		Url:Url + '/api/village/updateArchives',
		name:'编辑文章接口',
		method:'POST',
	},
}

// 接口声明区
export default {
	KyInterface,
}