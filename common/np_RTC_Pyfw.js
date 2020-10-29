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
}

export default {
	KyInterface
}