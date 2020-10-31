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
	getEcologyByUserID:{
		Url:Url + '/api/ecology/getEcologyByUserID',
		name:'生态银行列表接口（个人）',
		method:'POST',
	},
	
	releaseEcology:{
		Url:Url + '/api/ecology/releaseEcology',
		name:'生态银行添加文章接口',
		method:'POST',
	},
	
	updateEcology:{
		Url:Url + '/api/ecology/updateEcology',
		name:'生态银行编辑修改接口',
		method:'POST',
	},
	
	deleteEcology:{
		Url:Url + '/api/ecology/deleteEcology',
		name:'生态银行删除接口',
		method:'POST',
	},
	
	getEcologyDetailByID:{
		Url:Url + '/api/ecology/getEcologyDetailByID',
		name:'生态银行详情接口',
		method:'POST',
	},
	
	addViews:{
		Url:Url + '/api/ecology/addViews',
		name:'生态银行详情加点击次数接口',
		method:'POST',
	},
	
	upAndDownEcology:{
		Url:Url + '/api/ecology/upAndDownEcology',
		name:'生态银行个人列表上下架',
		method:'POST',
	},
	
	getEcology:{
		Url:Url + '/api/ecology/getEcology',
		name:'生态银行列表',
		method:'POST',
	},
}

// 接口声明区
export default {
	KyInterface,
}