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
	getProductByUserID:{
		Url:Url + '/api/farmProducts/getProductByUserID',
		name:'发布农产品列表接口（个人）',
		method:'POST',
	},
	
	upAndDownProduct:{
		Url:Url + '/api/farmProducts/upAndDownProduct',
		name:'列表上下架接口',
		method:'POST',
	},
	
	deleteProduct:{
		Url:Url + '/api/farmProducts/deleteProduct',
		name:'列表文章删除接口',
		method:'POST',
	},
	
	releaseProduct:{
		Url:Url + '/api/farmProducts/releaseProduct',
		name:'发布文章接口',
		method:'POST',
	},
	
	auditProduct:{
		Url:Url + '/api/farmProducts/auditProduct',
		name:'审核农产品',
		method:'POST',
	},
	
	getProductByID:{
		Url:Url + '/api/farmProducts/getProductByID',
		name:'农产品详情接口',
		method:'POST',
	},
	
	updateProduct:{
		Url:Url + '/api/farmProducts/updateProduct',
		name:'修改农产品接口',
		method:'POST',
	},
	
	addViews:{
		Url:Url + '/api/farmProducts/addViews',
		name:'增加浏览量接口',
		method:'POST',
	},
	
	getProduct:{
		Url:Url + '/api/farmProducts/getProduct',
		name:'获得全部已上架列表接口',
		method:'POST',
	},
}

// 接口声明区
export default {
	KyInterface,
}