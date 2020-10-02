/* 接口参数区 */
// 示例


//传统客运接口配置
import $oSit from '@/common/overallSituation.js'; //引入公共js文件

//接口域名
// #ifdef H5
	const Url = 'http://zntc.145u.net';
// #endif
// #ifndef H5
	const Url = 'https://zntc.145u.net:9099'; //https请求
// #endif

// #ifdef H5
const scheduleUrl = 'http://27.148.155.9:9056';//班次列表
// #endif

// #ifndef H5
const scheduleUrl = 'https://zhcx.npzhly.com:9098';//班次列表https请求
// #endif

//以下为南平综合出行的接口
const npUrl = 'http://27.148.155.9:9055';

const Url2 = $oSit.Interface.address.Url;

const systemName = '南平综合出行';
const systemName2 = '八闽出行';
const systemName3 = '邵泰专线';
const systemName4 = '武夷新区专线';

//接口对象
const KyInterface = {
	//GET-POST
	//--------------------------------------通用接口--------------------------------------
	payType:{
		// #ifdef MP-ALIPAY
		payType : 2
		// #endif
		// #ifdef APP-PLUS
		payType : 3
		// #endif
		// #ifdef H5
		payType : 4
		// #endif
		// #ifdef MP-WEIXIN
		payType : 5
		// #endif
	},
	systemName:{
		systemName:'泉运公司综合出行',
		
		systemNameApp:'泉运公司综合出行APP',
		systemNameH5:'泉运公司综合出行H5',
		systemNameWeiXin:'泉运公司综合出行小程序',
		
		// 用于兴业银行 - 专线购票小程序使用
		systemNameXYYHH5:'专线购票H5',
		systemNameXYYHAPP:'专线购票APP',
		systemNameXYYHWeiXin:'专线购票小程序',
		
		// 用于南平综合出行 - 车票订购小程序使用
		systemNameNPH5:'南平综合出行H5',
		systemNameNPAPP:'南平综合出行APP',
		systemNameNPWeiXin:'南平综合出行小程序',
	},
	//--------------------------------------通用接口--------------------------------------
	commonPayment:{
		Url:Url + '/api/Pay/getCommonPayparameter',
		name:'通用支付接口',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	commonCheckPayState:{
		Url:Url + '/api/Pay/CheckPayState',
		name:'通用检测订单支付状态接口',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	commonBouncePay:{
		Url:Url + '/api/Pay/BouncePay',
		name:'通用退款接口',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------南平传统/定制客运--------------------------------------
	Ky_GetStations:{
		Url: npUrl + '/CTKY/getStations',
		name:'客运-获取车站列表数据',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Ky_GetSatartSite:{
		Url: npUrl + '/CTKY/getSatartSite',
		name:'客运-模糊查询',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Ky_getListSchedulesInfo:{
		Url: scheduleUrl + '/CTKY/getListSchedulesInfo',
		name:'客运-班次列表',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Ky_getExecuteScheduleInfoForSellByID:{
		Url: scheduleUrl + '/getExecuteScheduleInfoForSellByID',
		name:'客运-请求价格',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Ky_PaymentUrl:{
		Url: Url + '/api/ky/SellTicket_NoBill_Booking',
		name:'客运-下单',
		method:'GET',
		header:{'content-type': 'application/json'},
	},
	//--------------------------------------传统/定制客运--------------------------------------
	Ky_getHomeSchedulesInfo:{
		Url: scheduleUrl + '/CTKY/getHomeSchedulesInfo',
		name:'客运-首页',
		method:'POST',
		header:{'content-type': 'application/json'},
	},
	Ky_getExecuteScheduleInfoForSellByID:{
		Url: scheduleUrl + '/CTKY/getExecuteScheduleInfoForSellByID',
		name:'客运-请求保险信息',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Ky_AddPicture:{
		Url: Url + '/api/zhcx/getImage',
		name:'客运-添加图片',
		method:'POST',
		header:{'content-type': 'application/json'},
		systemName:systemName,
	},
	
	Ky_getTicketPaymentInfo:{
		Url: Url + '/api/ky/SellTicket_Flow',
		name:'客运-获取支付参数',
		method:'GET',
		pages:["CTKY/TraditionSpecoal/PayMent/orderPayment.vue"],
		header:{'content-type':'application/x-www-form-urlencoded'},
		systemName:systemName,
	},
	Ky_getKeYunOrderInfo:{
		Url: Url + '/api/ky/searchOrder',
		name:'客运-获取订单列表',
		method:'GET',
		pages:["pages/order/OrderList.vue"],
		header:{'content-type': 'application/json'},
		systemName:systemName,
	},
	Ky_RefundTicket:{
		Url: Url + '/api/ky/RefundTicket_Flow',
		name:'客运-退票',
		method:'GET',
		pages:["pages/order/OrderList.vue"],
		header:{'content-type':'application/x-www-form-urlencoded'},
		systemName:systemName,
	},
	Ky_CancelTicket:{
		Url: Url + '/api/ky/CancelTicket_Flow',
		name:'客运-取消',
		method:'GET',
		pages:["pages/order/OrderList.vue"],
		header:{'content-type':'application/x-www-form-urlencoded'},
		systemName:systemName,
	},
	Ky_getOpenid:{
		Url: Url + '/pages_CTKY/pages/CTKY/TraditionSpecial/Order/selectTickets',
		name:'客运-获取openid',
		method:'POST',
		pages:["CTKY/TraditionSpecoal/Order/selectTickets.vue"],
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Ky_addPassengerEvaluate_Passenger:{
		Url:Url + '/api/taxi/addPassengerEvaluate_Passenger',
		name:'客运-添加评价',
		method:'POST',
		page:["CZC/OrderDetail.nvue","CZC/SpecialLineDetail.nvue"]
	},
	Ky_endorse:{
		Url:Url + '/api/ky/ChangeSignClick',
		name:'客运-改签',
		method:'GET',
		header:{'content-type':'application/x-www-form-urlencoded'},
		page:["pages/order/OrderList.vue"],
	},
	Ky_GetBounceChargeByOrderNumber:{
		Url:Url + '/api/ky/GetBounceChargeByOrderNumber',
		name:'客运-请求退票费率',
		method:'GET',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Ky_getLineRouteStationImage:{
		Url:Url + '/api/ky/getLineRouteStationImage',
		name:'客运-获取线路站点和图片',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	
	//--------------------------------------定制巴士--------------------------------------
	Cs_GetAllLine:{
		Url:Url + '/api/CustomizedBus/GetAllLine',
		name:'定制巴士-线路查询',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_GetScheduleList:{
		Url:Url + '/api/CustomizedBus/GetSellableSchedule',
		name:'定制巴士-查询班次-班线id',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_GetSellableScheduleByLineName:{
		Url:Url + '/api/CustomizedBus/GetSellableScheduleByLineName',
		name:'定制巴士-查询班次-班线名称',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_GetPriceByScheduleAID:{
		Url:Url + '/api/CustomizedBus/GetPriceByScheduleAID',
		name:'定制巴士-查询班次票价',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_BookingTicket:{
		Url:Url + '/api/CustomizedBus/BookingTicket',
		name:'定制巴士-下单',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_GetLineByLineName:{
		Url:Url + '/api/CustomizedBus/GetLineByLineName',
		name:'定制巴士-模糊查询',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_GetBookLogInfoByUserId:{
		Url:Url + '/api/CustomizedBus/GetBookLogInfoByUserId',
		name:'定制巴士-订单列表',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_Refund:{
		Url:Url + '/api/CustomizedBus/Refund',
		name:'定制巴士-退票',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_BouncePay:{
		Url:Url + '/api/Pay/BouncePay',
		name:'定制巴士-退款',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_CheckPayState:{
		Url:Url + '/api/Pay/CheckPayState',
		name:'定制巴士-检测订单支付状态',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_Cancel:{
		Url:Url + '/api/CustomizedBus/Cancel',
		name:'定制巴士-取消',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_Confirm:{
		Url:Url + '/api/CustomizedBus/Confirm',
		name:'定制巴士-付款成功确认订单',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Cs_GetInsuranceCheckState:{
		Url:Url + 'Business/GetInsuranceCheckState',
		name:'定制巴士-获取业务参数接口--退票参数',
		method:'POST',
	},
	
	//--------------------------------------专线购票--------------------------------------
	Cs_GetInsuranceCheckState:{
		Url: Url + '/api/person/getallline',
		name:'专线购票选择地址',
		method:'POST',
	},
	
	//--------------------------------------购票须知--------------------------------------
	Cs_getByTitle:{
		Url: Url + '/api/ky/getByTitle',
		name:'购票须知',
		method:'POST',
	},
	
	qg_GetImage:{
		value: Url + '/api/zhcx/getImage',
		name:'全局-请求静态图片',
		method:'POST',
	},
	
	//--------------------------------------线路查询--------------------------------------
	GetLineName:{
		Url: Url2 + '/api/KY/GetLineName',
		name:'线路查询',
		method:'GET',
	},
	
	//--------------------------------------线路查询--------------------------------------
	getStations:{
		Url: Url2 + '/api/KY/getStations',
		name:'线路查询',
		method:'GET',
	},
	
	//--------------------------------------查询班次--------------------------------------
	getListSchedulesInfo:{
		Url: Url2 + '/api/KY/getListSchedulesInfo',
		name:'查询班次',
		method:'GET',
	}, 
	
	//--------------------------------------退票--------------------------------------
	RefundTicket_Flow:{
		Url: Url2 + '/api/KY/RefundTicket_Flow',
		name:'退票',
		method:'GET',
	}, 
	
	//-------------------------------------取消--------------------------------------
	CancelTicket_Flow:{
		Url: Url2 + '/api/KY/CancelTicket_Flow',
		name:'取消',
		method:'GET',
	}, 
	
	//--------------------------------------查询退票费率--------------------------------------
	GetBounceChargeByOrderNumber:{
		Url: Url2 + '/api/KY/GetBounceChargeByOrderNumber',
		name:'查询退票费率',
		method:'GET',
	}, 
	
	//--------------------------------------改签--------------------------------------
	ChangeSignClick:{
		Url: Url2 + '/api/KY/ChangeSignClick',
		name:'改签',
		method:'GET',
	},
	
	//--------------------------------------删除订单--------------------------------------
	DeleteKYOrderByOrderNumber:{
		Url: Url2 + '/api/KY/DeleteKYOrderByOrderNumber',
		name:'删除订单',
		method:'GET',
	},
	//--------------------------------------查询订单状态--------------------------------------
	SellTicket_Flow:{
		Url: Url2 + '/api/KY/SellTicket_Flow',
		name:'查询订单状态',
		method:'GET',
	},
	//--------------------------------------模糊查询--------------------------------------
	GetLineNameByKey:{
		Url: Url2 + '/api/KY/GetLineNameByKey',
		name:'模糊查询',
		method:'GET',
	},
	//--------------------------------------获取专线列表数据--------------------------------------
	searchOrder2:{
		Url: Url2 + '/api/KY/searchOrder',
		name:'获取专线列表数据',
		method:'GET',
		header:{'content-type': 'application/json'},
	},
	
}

const InterfaceAddress = [
	//根据起终点经纬度获取线路规划
	//使用页面 - /CZC/CallAndDrive - 
	'https://zntc.145u.net:9099/api/zhcx/getPlanningLineByLonLat' ,
	//获取所有车辆定位数据
	'https://zntc.145u.net:9099/api/zhcx/getAllVehiclePosition',
	//根据经纬度获取附近一定范围的经纬度
	'https://zntc.145u.net:9099/api/zhcx/getLonLatRangeVehiclePosition',
]

// 接口声明区
export default {
	KyInterface,
	InterfaceAddress
}