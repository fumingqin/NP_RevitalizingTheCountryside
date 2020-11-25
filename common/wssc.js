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
	//--------------------------------------发布接口--------------------------------------
	releaseProduct:{
		Url:Url + '/api/shop/releaseProduct',
		name:'发布商品接口',
		method:'POST',
	},
	//--------------------------------------列表接口--------------------------------------
	getProduct:{
		Url:Url + '/api/shop/getProduct',
		name:'网上商城列表接口',
		method:'POST',
	},
	
	//--------------------------------------个人列表接口--------------------------------------
	getProductByUserID:{
		Url:Url + '/api/shop/getProductByUserID',
		name:'发布商品列表接口(个人)',
		method:'POST',
	},
	//--------------------------------------待审核接口--------------------------------------
	getAuditProduct:{
		Url:Url + '/api/shop/getAuditProduct',
		name:'待审核列表接口',
		method:'POST',
	},
	
	//--------------------------------------详情接口--------------------------------------
	getProductByID:{
		Url:Url + '/api/shop/getProductByID',
		name:'政策发布详情',
		method:'POST',
	},
	//--------------------------------------添加浏览量--------------------------------------
	addViews:{
		Url:Url + '/api/shop/addViews',
		name:'添加浏览量',
		method:'POST',
	},
	//--------------------------------------审核商品--------------------------------------
	auditProduct:{
		Url:Url + '/api/shop/auditProduct',
		name:'审核商品',
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
	upAndDownProduct:{
		Url:Url + '/api/shop/upAndDownProduct',
		name:'上下架接口',
		method:'POST',
	},
	
	//--------------------------------------删除接口--------------------------------------
	deleteProduct:{
		Url:Url + '/api/shop/deleteProduct',
		name:'删除接口',
		method:'POST',
	},
	
	//--------------------------------------编辑接口--------------------------------------
	updateProduct:{
		Url:Url + '/api/shop/updateProduct',
		name:'编辑政策接口',
		method:'POST',
	},
	
	//--------------------------------------编辑接口--------------------------------------
	getImage:{
		Url:Url + '/api/manage/getImage',
		name:'获取图片',
		method:'POST',
	},
	
	//--------------------------------------编辑接口--------------------------------------
	getMallHomepage:{
		Url:Url + '/api/shopMall/getMallHomepage',
		name:'获取商城首页的分类',
		method:'POST',
	},
}

// 接口声明区
export default {
	KyInterface,
}