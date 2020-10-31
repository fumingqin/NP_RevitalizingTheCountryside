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
	//--------------------------------------乡村列表，关键字搜索--------------------------------------
	getVillageListByName: {
		Url: Url + '/api/commissioner/getVillageListByName',
		name: '乡村列表，关键字搜索',
		method: 'POST',
	},
	//--------------------------------------乡村列表--------------------------------------
	getVillageList: {
		Url: Url + '/api/commissioner/getVillageList',
		name: '乡村列表',
		method: 'POST',
	},
	//--------------------------------------乡村列表--------------------------------------
	releaseCommissioner: {
		Url: Url + '/api/commissioner/releaseCommissioner',
		name: '提交数据',
		method: 'POST',
	},
	//--------------------------------------取消申请--------------------------------------
	cancelCommissionery: {
		Url: Url + '/api/commissioner/cancelCommissionery',
		name: '取消申请',
		method: 'POST',
	},
	//--------------------------------------获取申请列表--------------------------------------
	getCommissioneryById: {
		Url: Url + '/api/commissioner/getCommissioneryById',
		name: '获取申请列表',
		method: 'POST',
	},
	//--------------------------------------获取任务详情--------------------------------------
	getDetailById: {
		Url: Url + '/api/commissioner/getDetailById',
		name: '获取申请详情',
		method: 'POST',
	},
	//--------------------------------------获取审批任务列表--------------------------------------
	getCommissionery: {
		Url: Url + '/api/commissioner/getCommissionery',
		name: '获取审批任务列表',
		method: 'POST',
	},
	//--------------------------------------特派任务 - 审批接口--------------------------------------
	auditCommissionery: {
		Url: Url + '/api/commissioner/auditCommissionery',
		name: '特派任务-审批接口',
		method: 'POST',
	},
	//--------------------------------------请求特派员列表--------------------------------------
	getCommissionerList: {
		Url: Url + '/api/commissioner/getCommissionerList',
		name: '请求特派员列表',
		method: 'POST',
	},
}

export default {
	KyInterface
}