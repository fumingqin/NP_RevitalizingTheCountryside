// 接口声明区
import $oSit from '@/common/overallSituation.js'; //引入公共js文件

//接口域名
// #ifdef H5
const Url = $oSit.Interface.address.xczx_Url;
// #endif
// #ifndef H5
const Url = $oSit.Interface.address.xczx_Url;
// #endif


//接口对象
const KyInterface = {
	//--------------------------------------获取考评榜--------------------------------------
	getEvaluation: {
		Url: Url + '/api/evaluation/getEvaluation',
		name: '获取考评榜',
		method: 'POST',
	},
	//--------------------------------------获取考评任务列表--------------------------------------
	getEvaluationByUserId: {
		Url: Url + '/api/quarterEvaluate/getEvaluationByUserId',
		name: '获取考评任务列表',
		method: 'POST',
	},
	//--------------------------------------发布考评--------------------------------------
	releaseEvaluation: {
		Url: Url + '/api/quarterEvaluate/releaseEvaluation',
		name: '发布考评',
		method: 'POST',
	},
	//--------------------------------------获取考评人员--------------------------------------
	getExaminer: {
		Url: Url + '/api/quarterEvaluate/getExaminer',
		name: '获取考评人员',
		method: 'POST',
	},
	//--------------------------------------获取所有的县--------------------------------------
	getCountyList: {
		Url: Url + '/api/quarterEvaluate/getCountyList',
		name: '获取所有的县',
		method: 'POST',
	},
	//--------------------------------------获取详情--------------------------------------
	getEvaluationById: {
		Url: Url + '/api/quarterEvaluate/getEvaluationById',
		name: '获取详情',
		method: 'POST',
	},
	//--------------------------------------取消任务--------------------------------------
	deleteEvaluation: {
		Url: Url + '/api/quarterEvaluate/deleteEvaluation',
		name: '取消任务',
		method: 'POST',
	},
	//--------------------------------------获取考评列表（村）--------------------------------------
	getListByRuralId: {
		Url: Url + '/api/quarterEvaluate/getListByRuralId',
		name: '获取考评列表（村）',
		method: 'POST',
	},
	//--------------------------------------获取考评人任务--------------------------------------
	getListByPhone: {
		Url: Url + '/api/quarterEvaluate/getListByPhone',
		name: '获取考评人任务',
		method: 'POST',
	},
	//--------------------------------------给考评任务评分--------------------------------------
	evaluationScore: {
		Url: Url + '/api/quarterEvaluate/evaluationScore',
		name: '给考评任务评分',
		method: 'POST',
	},
	//--------------------------------------通过手机号获取考评列表--------------------------------------
	getListByPhone: {
		Url: Url + '/api/quarterEvaluate/getListByPhone',
		name: '通过手机号获取考评列表',
		method: 'POST',
	},
	//--------------------------------------获取所有的县根据关键字--------------------------------------
	getCountyListByKey: {
		Url: Url + '/api/quarterEvaluate/getCountyListByKey',
		name: '获取所有的县根据关键字',
		method: 'POST',
	},
	//--------------------------------------增加浏览量--------------------------------------
	addViews: {
		Url: Url + '/api/quarterEvaluate/addViews',
		name: '增加浏览量',
		method: 'POST',
	},
	
	//--------------------------------------增加浏览量--------------------------------------
	evaluationScore: {
		Url: Url + '/api/quarterEvaluate/evaluationScore',
		name: '增加浏览量',
		method: 'POST',
	},
}



export default {
	KyInterface
}