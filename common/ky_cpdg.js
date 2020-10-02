// 接口声明区
import $oSit from '@/common/overallSituation.js'; //引入公共js文件

//接口域名
// #ifdef H5
const Url = $oSit.Interface.address.Url;
// #endif
// #ifndef H5
const Url = $oSit.Interface.address.Url;
// #endif

//接口对象
const KyInterface = {
	system: {
		systemName: '南平综合出行',

		// 用于南平综合出行 - 车票订购小程序使用
		// systemNameApp:'南平综合出行APP',
		// systemNameH5:'南平综合出行H5',
		// systemNameWeiXin:'南平综合出行小程序',

		// 用于兴业银行 - 专线购票小程序使用
		// systemNameApp:'专线购票APP',
		// systemNameH5:'专线购票H5',
		// systemNameWeiXin:'专线购票小程序',

		// 用于邵泰专线 - 专线购票小程序使用
		systemNameApp: '交通在线APP',
		systemNameH5: '交通在线H5',
		systemNameWeiXin: '交通在线小程序',
	},
	//--------------------------------------查询班次--------------------------------------
	getListSchedulesInfo: {
		Url: Url + '/api/KY/getListSchedulesInfo',
		name: '查询班次信息',
		method: 'GET',
	},
	//--------------------------------------购票须知--------------------------------------
	Cs_getByTitle: {
		Url: Url + '/api/ShowContent/GetAggrement',
		name: '购票须知',
		method: 'POST',
	},
	//--------------------------------------请求否有上门服务--------------------------------------
	GetIsPickUp: {
		Url: Url + '/api/KY/GetIsPickUp',
		name: '是否有上门服务',
		method: 'GET',
	},

	//--------------------------------------客运下单--------------------------------------
	Ky_PaymentUrl: {
		Url: Url + '/api/ky/SellTicket_NoBill_Booking',
		name: '客运-下单',
		method: 'GET',
		header: {
			'content-type': 'application/json'
		},
	},

	Ky_getTicketPaymentInfo: {
		Url: Url + '/api/ky/SellTicket_Flow',
		name: '客运-获取支付参数',
		method: 'GET',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},

	Ky_CancelTicket: {
		Url: Url + '/api/ky/CancelTicket_Flow',
		name: '客运-取消',
		method: 'GET',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},

}

//经纬度计算距离单位米
const EARTH_RADIUS = 6378137;

function mathLonLatToDistance(lat1, lng1, lat2, lng2) {
	var radLat1 = Rad(lat1);
	var radLat2 = Rad(lat2);

	var a = radLat1 - radLat2;
	var b = Rad(lng1) - Rad(lng2);

	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(
		b / 2), 2)));
	s = s * EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000.0;

	return s;
}

function Rad(lonLat){
	return lonLat * Math.PI / 180
}

export default {
	KyInterface,
	mathLonLatToDistance,
}
