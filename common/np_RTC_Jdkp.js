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
		Url: Url + '/api/evaluation/getEvaluationByUserId',
		name: '获取考评任务列表',
		method: 'POST',
	},
	//--------------------------------------发布考评--------------------------------------
	releaseEvaluation: {
		Url: Url + '/api/evaluation/releaseEvaluation',
		name: '发布考评',
		method: 'POST',
	},
	//--------------------------------------获取考评人员--------------------------------------
	getExaminer: {
		Url: Url + '/api/evaluation/getExaminer',
		name: '获取考评人员',
		method: 'POST',
	},
	//--------------------------------------获取所有的县--------------------------------------
	getCountyList: {
		Url: Url + '/api/evaluation/getCountyList',
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
		Url: Url + '/api/evaluation/deleteEvaluation',
		name: '取消任务',
		method: 'POST',
	},
	//--------------------------------------获取考评列表（村）--------------------------------------
	getListByRuralId: {
		Url: Url + '/api/evaluation/getListByRuralId',
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
	addScore: {
		Url: Url + '/api/evaluation/addScore',
		name: '给考评任务评分',
		method: 'POST',
	},
}



export default {
	KyInterface
}