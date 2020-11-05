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
}

export default {
	KyInterface
}