/* 接口参数区 */
// 示例
import $oSit from '@/common/overallSituation.js';


//接口域名
const Url=$oSit.Interface.address.xczx_Url;

//APP下载地址
const downloadAPP = "http://27.148.155.9:9248/LoadAppWebsite/泉运出行综合平台.apk"; 

const systemConfig={
	appName:$oSit.Interface.system.appName,	
	applyName:$oSit.Interface.system.applyName,		//应用名称
	openidtype:$oSit.Interface.system.openidtype,	//应用类型：app，小程序，公众号
}

const newApplyName = '定制客运';

const appConfig={
	local:{
		url:$oSit.appConfig.local.url,
		name:'公众号请求地址',
	},
}

const Interface={
	upload:{
		value:'http://120.24.144.6:8080/api/file/upload',
		name:'上传图片',
		method:'POST',
		pages: [],
	},
	
	login:{
		value:Url+'/api/user/login',
		name:'用户登录',
		method:'POST',
		pages: [],
	},
	getLoginCode:{
		value:'https://appdl.xmjdt.cn:18443/api/person/getLoginCode',
		name:'获取手机验证码',
		method:'POST',
		pages: [],
	},
	changeDuty:{
		value:Url+'/api/user/changeDuty',
		name:'修改职责',
		method:'POST',
		pages: [],
	},
	getFeedbackList:{
		value:Url+'/api/user/getFeedbackList',
		name:'获取反馈列表',
		method:'POST',
		pages: [],
	},
	addFeedback:{
		value:Url+'/api/user/addFeedback',
		name:'添加反馈',
		method:'POST',
		pages: [],
	},
}

const MainPackage='/pages/GRZX';   //主包
const SubPackage='/pages_GRZX/pages/GRZX'; //分包
const Route={
	home:{
		url:'/pages/Home/zy_zhcx',
		name:'首页',
	},
	//主包里页面的路径
	addPassenger:{
		url:MainPackage+'/addPassenger',
		name:'添加乘车人页面',
	},
	notice:{
		url:MainPackage+'/notice',
		name:'通知页面',
	},
	passengerInfo:{
		url:MainPackage+'/passengerInfo',
		name:'乘车人列表页面',
	},
	user:{
		url:MainPackage+'/user',
		name:'个人主页页面',
	},
	userLogin:{
		url:MainPackage+'/userLogin',
		name:'登录页面',
	},
	wxLogin:{
		url:MainPackage+'/wxLogin',
		name:'绑定手机号页面',
	},
	//分包里页面的路径
	aboutApp:{
		url:SubPackage+'/aboutApp',
		name:'关于app页面',
	},
	addAddress:{
		url:SubPackage+'/addAddress',
		name:'添加地址页面',
	},
	address:{
		url:SubPackage+'/aboutApp',
		name:'地址列表页面',
	},
	collection:{
		url:SubPackage+'/collection',
		name:'我的收藏页面',
	},
	complaint:{
		url:SubPackage+'/complaintList',
		name:'我的投诉页面',
	},
	coupon:{
		url:SubPackage+'/coupon',
		name:'优惠券页面',
	},
	detailTweet:{
		url:SubPackage+'/detailTweet',
		name:'推文详情页面',
	},
	feedback:{
		url:SubPackage+'/FeedbackView',
		name:'意见反馈列表',
	},
	history:{
		url:SubPackage+'/history',
		name:'我的历史页面',
	},
	infoList:{
		url:SubPackage+'/infoList',
		name:'信息管理页面',
	},
	myNews:{
		url:SubPackage+'/myNews',
		name:'我的消息页面',
	},
	personal:{
		url:SubPackage+'/personal',
		name:'个人信息页面',
	},
	set:{
		url:SubPackage+'/set',
		name:'设置页面',
	},
	realName:{
		url:SubPackage+'/realName',
		name:'实名认证',
	},
	uploadPhoto:{
		url:SubPackage+'/uploadPhoto',
		name:'上传照片',
	},
	replacePhoneNum:{
		url:SubPackage+'/replacePhoneNum',
		name:'更换手机号',
	},
	verificateName:{
		url:SubPackage+'/verificateName',
		name:'实名验证',
	},
	newPhone:{
		url:SubPackage+'/newPhone',
		name:'更换成新手机号',
	},
	privacyService:{
		url:SubPackage+'/privacyService',
		name:'服务协议和隐私政策',
	},
}

const GetImage={
	url:Url+'/api/zhcx/GetImage',
	name:'获取图片',
	method:'POST',
	pages: [],
}

//返回主页
function navToHome(){
	// if($oSit.Interface.system.appName=="专线购票小程序"){
	// 	uni.switchTab({
	// 		url:'/pages/Home/zxgpHomePage',//兴业银行小程序的主页（专线购票）
	// 	})
	// }else if($oSit.Interface.system.appName=="南平综合出行"){
	// 	uni.switchTab({
	// 		url:'/pages/home/h_np_home',//南平综合出行
	// 	})
	// }
	uni.switchTab({
		url:'/pages/home/h_jtzx_home',
	})
}

//跳转订单列表
function navToOrderList(){
	// if($oSit.Interface.system.appName=="专线购票小程序"){
	// 	// uni.switchTab({
	// 	// 	url: '/pages/order/newOrderList',
	// 	// })
	// }else if($oSit.Interface.system.appName=="南平综合出行"){
		
	// }
	uni.switchTab({
		url: '/pages/order/newOrderList',
	})
}

// 接口声明区
export default {
	Interface,
	Route,
	GetImage,
	appConfig,
	systemConfig,
	navToHome,
	navToOrderList,
	newApplyName,
	downloadAPP
}