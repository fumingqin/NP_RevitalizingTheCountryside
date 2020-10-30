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
	getFeedbackByUserID:{
		Url:Url + '/api/feedback/getFeedbackByUserID',
		name:'民情反馈列表接口（个人）',
		method:'POST',
	},
	
	releasefeedback:{
		Url:Url + '/api/feedback/releasefeedback',
		name:'发布民情反馈接口',
		method:'POST',
	},
}

// 接口声明区
export default {
	KyInterface,
}