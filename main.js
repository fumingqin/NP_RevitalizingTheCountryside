import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import GrzxInter from 'common/Grzx.js' //个人中心
import Src from 'common/checkSrc.js' //校验上传文件的格式
import Sort from 'common/sortData.js'//一村一档列表排序
import ChangeImage from 'common/changeImage.js' //更换图片
import oSit from 'common/overallSituation.js' //引入全局js文件
import Ctky from 'common/Ctky.js' //传统客运
import ky_cpdg from 'common/ky_cpdg.js' //传统客运
import home from 'common/home.js' //传统客运
import Bus from 'common/Bus.js'   //公交
import share from 'common/share.js'//引入分享
import ycyd from 'common/ycyd.js'//引入分享
import pyfw from 'common/np_RTC_Pyfw.js'//引入派员服务
import jdkp from 'common/np_RTC_Jdkp.js'//引入季度考评
import xcdt from 'common/xcdt.js'//引入乡村动态
import zcfb from 'common/zcfb.js'//引入政策发布
import styh from 'common/styh.js'//引入生态银行
import smjj from 'common/smjj.js'//引入水美经济
import mqfk from 'common/mqfk.js'//引入民情反馈
import fbrcp from 'common/FBRCP.js'//引入民情反馈
import wssc from 'common/wssc.js'//引入网上商城
import Lyfwcwd from 'common/LYFW/LyfwCwd.js' //旅游服务-蔡伟达
import Sceniclist from 'common/scenicSpotDistribution.js' //旅游服务-景区目录
import fbxm from 'common/fbxm.js'//引入网上商城
import newycyd from 'common/newycyd.js'//引入一村一档


Vue.use(uView)
Vue.mixin(share)
Vue.config.productionTip = false
Vue.prototype.$oSit=oSit;  //全局加载js文件
Vue.prototype.$GrzxInter=GrzxInter;  //个人中心
Vue.prototype.$Src=Src;  //校验上传文件的格式
Vue.prototype.$Sort=Sort;  //一村一档列表排序
Vue.prototype.$ChangeImage=ChangeImage; //更换图片
Vue.prototype.$ky_cpdg=ky_cpdg; //客运-车票订购
Vue.prototype.$home=home; //首页
Vue.prototype.$Bus=Bus;
Vue.prototype.$ycyd=ycyd;//一村一档
Vue.prototype.$pyfw=pyfw;//派员服务
Vue.prototype.$jdkp=jdkp;//季度考评
Vue.prototype.$xcdt=xcdt;//乡村动态
Vue.prototype.$zcfb=zcfb;//乡村动态
Vue.prototype.$styh=styh;//乡村动态
Vue.prototype.$smjj=smjj;//乡村动态
Vue.prototype.$mqfk=mqfk;//乡村动态
Vue.prototype.$fbrcp=fbrcp;//发布农产品
Vue.prototype.$wssc=wssc;//网上商城
Vue.prototype.$fbxm=fbxm;//网上商城
Vue.prototype.$newycyd=newycyd;//一村一档
App.mpType = 'app'

const app = new Vue({
    ...App
})

//模拟异步请求数据 - 传统客运
const ctky = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Ctky[type]);
		}, 500)
	})
}
//模拟异步请求数据 - 旅游服务
const lyfwcwd = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Lyfwcwd[type]);
		}, 500)
	})
}
//模拟异步请求数据 - 旅游服务
const sceniclist = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Sceniclist[type]);
		}, 500)
	})
}

Vue.prototype.$api = {ctky,lyfwcwd,sceniclist};
app.$mount()
