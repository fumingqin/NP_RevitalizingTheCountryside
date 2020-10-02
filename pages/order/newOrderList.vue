<template>
	<view>     
		<view class="tab">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#3DABFC"></uni-segmented-control>
		</view>
		
		<!-- 最外层view，用于底部拉大 -->
		<view class="pageView">

			<!-- 全部 -->
			<view v-if="current === 0" style="margin-top: 20rpx;">
				<view v-for="(item,index) in info" :key="index"> 
					<view v-if="item.carType=='普通班车' || item.carType=='定制班车'">
						<view class="pd_view">下单时间：{{item.bookTime}}</view>
						
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/order/keche.png" mode="aspectFill"></image>
								<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
								<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view class="at_contentFrame">扫码上车</view>
								<view class="at_contentFrame" v-if="item.IsPickUp==true">上门接送</view>
								<view class="at_contentFrame">{{item.carType}}</view>
								<text class="at_contentPrice">¥{{item.totalPrice}}</text>
							</view>
						 
							<view class="at_contentView">
								<text class="at_contentText">发车时间：&nbsp;{{gettime(item.setOutTime)}}</text>
								<text class="at_contentText" v-if="item.carType == '定制班车'">上车点：&nbsp;{{item.getOnPoint}}</text>
								<text class="at_contentText">下车点：&nbsp;{{item.getOffPoint}}</text>
								<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
							</view>		
							<view class="at_buttonView">
								<!-- #ifndef MP-WEIXIN -->
								<view class="at_button at_btDelete" v-if="item.state=='4'" @click="busLocation(item)">车辆位置</view>
								<!-- #endif -->
								<view class="at_button at_btDelete" v-if="item.state=='7'||item.state=='等待确认'" @tap="open3(item.orderNumber)">取消</view>
								<view class="at_button at_btDelete" v-if="item.state=='4'||item.state=='尚未取票'" @tap="open2(item.orderNumber)">退票</view>
								<view class="at_button at_btDelete" v-if="item.state=='4'||item.state=='已取票'" @click="KyComplain(item)">投诉</view>
								<view class="at_button at_btToPay" v-if="item.state=='7'" @tap="keYunPay(item,item.carType)">去支付</view>
								<view class="at_button at_btToPay" v-if="item.state=='尚未支付'||item.state=='等待确认'" @tap="keYunPay(item,item.carType)">去支付</view>	
								<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
							</view>
						</view>
					</view>
				</view>
				<empty-data :isShow="info.length==0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
			</view>


			<!-- 已完成 -->
			<!--（已完成）客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
			<view v-if="current === 1 " style="margin-top: 20rpx; ">
				<view v-for="(item,index) in finishArr" :key="index">
					
					<view v-if="item.carType=='普通班车' || item.carType=='定制班车'">
						<view class="pd_view">下单时间：{{item.bookTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/order/keche.png" mode="aspectFill"></image>
								<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
								<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								
								<view class="at_contentFrame">扫码上车</view>
								<view class="at_contentFrame" v-if="item.IsPickUp==true">上门接送</view>
								<view class="at_contentFrame">{{item.carType}}</view>
								<text class="at_contentPrice">¥{{item.totalPrice}}</text>
							</view>
						 
							<view class="at_contentView">							
								<text class="at_contentText">发车时间：&nbsp;{{gettime(item.setOutTime)}}</text>
								<text class="at_contentText" v-if="item.carType == '定制班车'">上车点：&nbsp;{{item.getOnPoint}}</text>
								<text class="at_contentText">下车点：&nbsp;{{item.getOffPoint}}</text>
								<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
							</view>
							<view class="at_buttonView">
								<view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view>
								<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
							</view>
						</view>
					</view>
				</view>
				<empty-data :isShow="finishArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
			</view>
			
			
			
			<!-- 进行中 -->
			<!-- (进行中)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
			<view v-if="current === 2" style="margin-top: 20rpx;">
				<view v-for="(item,index) in goingArr" :key="index">
					
					<view v-if="item.carType=='普通班车' || item.carType=='定制班车'">
						<view class="pd_view">下单时间：{{item.bookTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/order/keche.png" mode="aspectFill"></image>
								<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
								<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
									<view class="at_contentFrame">扫码上车</view>
									<view class="at_contentFrame" v-if="item.IsPickUp==true">上门接送</view>
									<view class="at_contentFrame">{{item.carType}}</view>
								<text class="at_contentPrice">¥{{item.totalPrice}}</text>
							</view>
						 
							<view class="at_contentView">							
								<text class="at_contentText">发车时间：&nbsp;{{gettime(item.setOutTime)}}</text>
								<text class="at_contentText" v-if="item.carType == '定制班车'">上车点：&nbsp;{{item.getOnPoint}}</text>
								<text class="at_contentText">下车点：&nbsp;{{item.getOffPoint}}</text>
								<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
							</view>
							<view class="at_buttonView">
								<!-- #ifndef MP-WEIXIN -->
								<!-- <view class="at_button at_btDelete" v-if="item.state=='4'" @click="busLocation(item)">车辆位置</view> -->
								 <!-- #endif -->
								<view class="at_button at_btDelete" v-if="item.state=='4'||item.state=='尚未取票'" @tap="open2(item.orderNumber,'2')">退票</view>
								 <!-- <view class="at_button at_btDelete" @click="KyComplain(item)">投诉</view> -->
								<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
							</view>
						</view>
					</view>
				</view>
				<empty-data :isShow="goingArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
			</view>


			<!-- 未支付 -->
			<view v-if="current === 3" style="margin-top: 20rpx;">
				<view v-for="(item,index) in unfinishArr" :key="index">
					<!-- (未支付)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
					<view v-if="item.carType=='普通班车' || item.carType=='定制班车'">
						<!-- 预定日期 -->
						<view class="pd_view">下单时间：{{item.bookTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/order/keche.png" mode="aspectFill"></image>
								<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
								<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								
									<view class="at_contentFrame">扫码上车</view>
									<view class="at_contentFrame" v-if="item.IsPickUp==true">上门接送</view>
									<view class="at_contentFrame">{{item.carType}}</view>
								
								<text class="at_contentPrice">¥{{item.totalPrice}}</text>
							</view>
						 
							<view class="at_contentView">							
								<text class="at_contentText">发车时间：&nbsp;{{gettime(item.setOutTime)}}</text>
								<text class="at_contentText" v-if="item.carType == '定制班车'">上车点：&nbsp;{{item.getOnPoint}}</text>
								<text class="at_contentText">下车点：&nbsp;{{item.getOffPoint}}</text>
								<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
							</view>
							<view class="at_buttonView">
								<view class="at_button at_btDelete" v-if="item.carType=='普通班车' || item.carType=='定制班车'" @tap="open3(item.orderNumber)">取消</view>
								<view class="at_button at_btToPay" @tap="keYunPay(item,item.carType)">去支付</view>
								<view class="at_button at_btDetails" @click="keYunDetail(item)">详情</view>
							</view>
						</view>
					</view>
				</view>
				<empty-data :isShow="unfinishArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
			</view>

			<!-- 已取消 -->
			<view v-if="current === 4" style="margin-top: 20rpx;">
				<view v-for="(item,index) in cancelArr" :key="index">
					<!-- (已取消)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
					<view v-if="item.carType=='普通班车' || item.carType=='定制班车'">
						<!-- 预定日期 -->
						<view class="pd_view">下单时间：{{item.bookTime}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/order/keche.png" mode="aspectFill"></image>
								<view class="at_textView"><text class="at_title">{{item.startSiteName}}-{{item.endSiteName}}</text></view>
								<text class="at_status">{{getCtkyOrderStatus(item.state)}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								
									<view class="at_contentFrame">扫码上车</view>
									<view class="at_contentFrame" v-if="item.IsPickUp==true">上门接送</view>
									<view class="at_contentFrame">{{item.carType}}</view>
								<text class="at_contentPrice">¥{{item.totalPrice}}</text>
							</view>
						 
							<view class="at_contentView">							
								<text class="at_contentText">发车时间：&nbsp;{{gettime(item.setOutTime)}}</text>
								<text class="at_contentText" v-if="item.carType == '定制班车'">上车点：&nbsp;{{item.getOnPoint}}</text>
								<text class="at_contentText">下车点：&nbsp;{{item.getOffPoint}}</text>
								<text class="at_contentText">班次：&nbsp;{{getScheduleNum(item)}}</text>
							</view>
							<view class="at_buttonView">
								<view class="at_button at_btDetails" @tap="keYunDetail(item)">详情</view>
							</view>
						</view>
					</view>
				</view>
				<empty-data :isShow="cancelArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
			</view>
		</view>
		<!-- 退票弹框 -->
		<uni-popup2 ref="popup2" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_title">退订规则</text>
					<text class="box_icon jdticon icon-fork " @click="close2"></text>
				</view>
				<view class="box_refundView">
					<!-- <text class="box_refundText">您可以在2019年11月04日18:00前免费取消或变更订单 ；在2019年11月04日18:00之后变更或取消，将收取全 额费用作为罚金。</text> -->
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">您还确定退票吗?</text>
						<text class="box_refundContentText">如若需退票，请点击确认</text>
					</view>
					<view class="box_refundButtonView">
						<text class="box_refundButton" @click="refund">确认</text>
					</view>
				</view>
			</view>
		</uni-popup2>
		<!-- 取消弹框 -->
		<uni-popup2 ref="popup3" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_icon jdticon icon-fork " @click="close3"></text>
				</view>
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">您确认取消订单吗?</text>
						<text class="box_refundContentText">若确认取消，请点击确认</text>
					</view>
					<view class="box_refundButtonView">
						<text class="box_refundButton" @click="cancel">确认</text>
					</view>
				</view>
			</view>
		</uni-popup2>
	</view>
</template>

<script>
	/**
	 * 注意事项：1.请求订单数据要把自己请求的数据加到info数组 2.其他事项看注释
	 * */
	import uniSegmentedControl from "@/components/Order/uni-segmented-control/uni-segmented-control.vue";
	import uniPopup from "@/components/Order/uni-popup/uni-popup.vue";
	import uniIcons from "@/components/Order/uni-icons/uni-icons.vue";
	import uniPopup2 from "@/components/Order/uni-popup/uni-popup2.vue";
	import emptyData from "@/components/Order/emptyData/emptyData.vue"; //无数据时显示内容
	import $KyInterface from "@/common/Ctky.js"
	export default {
		components: {
			uniSegmentedControl,
			uniPopup,
			//加载多方弹框组件
			uniPopup2,
			uniIcons,
			emptyData,
		},
		data() {
			return {
				items: ['全部', '已完成', '进行中', '未支付', '已取消'],
				selector : '全部',
				current: 0,
				index: 1,
				info: [],//请求服务器订单列表
				userInfo: '', //个人信息
				finishArr: [],
				goingArr: [],
				unfinishArr: [],
				cancelArr: [],
				rSelect:[],
				num:'5',
				driverName: '张师傅', //司机姓名
				totalPrice: 32.5,
				ctkyOrderNum: '', //普通班车订单号（退票需要）
				ky_currentType:'',
				ky_orderStatus:'',//判断是否需要检测当前订单状态	
				ctkyOpenID:'',
				csRefundInfo:[],//定制巴士退票
				specialLineInfo: '',
				noDataImage:'',//客运弹框背景图
				textareaValue:"",
				
				SfcInfo: '',
			}
		},
		onLoad: function() {
			var that = this;
			//获取客运弹框图片
			that.getPicture();
			// 读取用户ID
			uni.getStorage({
				key: 'userInfo',
				success: function(data) {
					that.userInfo = data.data;
				},
				fail:function(){
					// // #ifdef H5
					// uni.showToast({
					// 	title: '请允许授权给公众号，即将为您返回主页！',
					// 	icon:'none'
					// })
					// uni.switchTab({
					// 	url:'/pages/Home/zy_zhcx'
					// })
					// // #endif
					// #ifdef MP-WEIXIN
					uni.showToast({
						title: '请允许授权给小程序，即将跳转登录！'
					})
					uni.navigateTo({
						url:'/pages/home/wxAuthorize'
					})
					// #endif
					// // #ifdef APP-PLUS
					// uni.showToast({
					// 	title: '未登录账号，即将跳转登录！'
					// })
					// uni.navigateTo({
					// 	url:'/pages/GRZX/userLogin?urlData=1'
					// })
					// // #endif
				}
			})
			if (this.ctkyOrderNum) {
				this.getTicketPaymentInfo_ticketIssue(this.ctkyOrderNum);
			}
			this.getOpenID();
		},
		onShow: function() {
			//客运刷新状态
			if (this.ctkyOrderNum) {
				this.getTicketPaymentInfo_ticketIssue(this.ctkyOrderNum);
			}
			this.getOpenID();
			this.selectorChange();		
			//接收current
			var that=this;
			uni.getStorage({
				key:'currentNum',
				success:function(res){
					that.current=res.data;
					uni.removeStorageSync('currentNum');
				},
				fail(){
					that.current=0;
				}
			})
		},
		onPullDownRefresh: function() {
			//客运刷新状态
			if (this.ctkyOrderNum) {
				this.getTicketPaymentInfo_ticketIssue(this.ctkyOrderNum);
			}
			this.selectorChange();
		},
		methods: {
			//--------------------------订单模块筛选--------------------------
			selectorChange : function(e){
				var that=this;
				// console.log(e,'订单执行')
				uni.showLoading({
					title:'加载中...'
				})
				//进行订单数组初始化
				that.info = [];
				that.finishArr = [];
				that.goingArr = [];
				that.unfinishArr = [];
				that.cancelArr = [];
					that.getUserInfo();//加载普通班车订单方法
			},
			//--------------------------读取公众号openid--------------------------
			getOpenID() {
				var that = this;
				uni.getStorage({
					key: 'scenicSpotOpenId',
					success: function(response) {
						// alert('获取id成功');
						that.ctkyOpenID = response.data
					},
					fail: function(fail) {
						uni.hideLoading();
					}
				})
			},
			//------------------------------------------------客运开始------------------------------------------------
			//-------------------------客运用户详情-------------------------
			getPicture() {
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.Ky_AddPicture.Url,
					method: $KyInterface.KyInterface.Ky_AddPicture.method,
					header: $KyInterface.KyInterface.Ky_AddPicture.header,
					data: {
					model: 0,
					},
					success(res) {
						console.log(res)
						if (res.data.status == true) {
							that.noDataImage = res.data.data.imageUrl
						} else {
							console.log(res.data.status)
						}
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			getUserInfo() {
				var that = this;
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						that.userInfo = data.data;
						console.log('用户信息', that.userInfo);
						that.getKeYunOrderInfo();
					},
				})
			},

			//-------------------------请求客运订单数据-------------------------
			getKeYunOrderInfo: function() {
				var that = this;
				console.log(that.userInfo.userId)
				uni.request({
					url: $KyInterface.KyInterface.searchOrder2.Url, 
					method: $KyInterface.KyInterface.searchOrder2.method,
					data: {
						clientID: that.userInfo.userId,
						AppSystemName:that.$oSit.Interface.system.appName,
						// AppSystemName:'交通在线小程序',
					},
					success: (res) => {
						uni.stopPullDownRefresh();
						console.log('客运订单数据', res.data);
						that.ctkyOrderNum = res.data.orderNumber;
						if (res.data.status == true) {
							that.info = res.data.data;
							console.log(that.info)
							for (var i = 0; i < res.data.data.length; i++) {
								if (res.data.data[i].state == '已取票') {
									that.finishArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '尚未取票'){
									that.goingArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '等待确认') {
									that.unfinishArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '被撤销' || res.data.data[i].state == '联网退票') {
									that.cancelArr.push(res.data.data[i]);
								}
							}
							uni.hideLoading();
						} else if (res.data.status == false) {
							uni.hideLoading();

						}
					},
					fail(res) {
						uni.hideLoading();
						//请求数据失败，停止刷新
						uni.stopPullDownRefresh();
					}
				})
			},
			//-------------------------------获取班次信息-------------------------------
			getScheduleNum:function(param){
					if(param.planScheduleCode){
						return param.planScheduleCode;
					}else{
						return '无'; 
					}
			},
			//-------------------------------获取时间信息-------------------------------
			gettime:function(param){
					let array=param.split(':');
					var a=array[0]+":"+array[1];
					return a;
			},
			//-------------------------判断订单状态-------------------------
			getCtkyOrderStatus(param) {
				if (!(/(^[1-9]\d*$)/.test(param))){//如果不是数字
					return param
				}else {
					if (param == 4) {
						return '进行中'
					} else if (param == 5) {
						return '已完成'
					} else if (param == 6) {
						return '已退票'
					} else if (param == 7) {
						return '未支付'
					} else if (param == 9) {
						return '已撤销'
					}
					//  else if (param == 22) {
					// 	return '已改签'
					// }
				}
			},
			open3(e) {
				this.ticketOrderNumber = e;
				this.$refs.popup3.open()
			},
			//-------------------------跳转到详情页-------------------------
			keYunDetail: function(res) {
				console.log(res)
			uni.setStorage({
					key:'keYunDetailinfo',
					data:res,
					success: (res) => {
						console.log(res)
						uni.navigateTo({
							url: '/pages_ZXGP/pages/ZXGP/TraditionSpecial/Order/orderDetail'
						});
					},
					fail:function(res){
						console.log(res)
						uni.showToast({
							title:'网络异常',
							icon:'none'
						})
					},
				})
			},
			// -------------------------客运查看车辆位置-------------------------
			busLocation:function(item) {
				var loaction = {
					latitude:item.lat,
					longitude:item.lon
				}
				uni.navigateTo({
					url:'../../pages_CTKY/pages/CTKY/TraditionSpecial/MapMark/checkBusLocation?busInfo=' + JSON.stringify(loaction)
				})
			},
			//--------------------------退票之前获取车票支付参数--------------------------
			refund_getTicketPaymentInfo: function(orderNumber) {
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title: '查询支付状态...'
				});
				timer = setInterval(function() {
					uni.request({
						url:that.$ky_cpdg.KyInterface.Ky_getTicketPaymentInfo.Url,
						method:that.$ky_cpdg.KyInterface.Ky_getTicketPaymentInfo.method,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log(res)
							if (res.data.data == '车票已退票') {
								uni.stopPullDownRefresh();
								uni.hideLoading();
								clearInterval(timer);
								uni.showToast({
									title: '车票已退票',
									icon: 'none',
								})
							}else {
								clearInterval(timer);
								that.GetBounceChargeByOrderNumber(orderNumber);
							}
						},
						fail(res) {
							uni.stopPullDownRefresh();
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			// -------------------------客运退票--查询费率-------------------------
			GetBounceChargeByOrderNumber:function(orderNumber){
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.GetBounceChargeByOrderNumber.Url,
					method: $KyInterface.KyInterface.GetBounceChargeByOrderNumber.method,
					data: {
						orderNumber: orderNumber,
					},
					success(respones) {
						console.log(respones)
						if(respones.data.status == true){
							uni.hideLoading();
							that.$refs.popup2.close()
							let BounceMoney = respones.data.data.BounceMoney;
							uni.showModal({
								title:'温馨提示',
								content:'退票将收取手续费，退款金额为' + BounceMoney + '元',
								// content:'退票将收取手续费，是否继续退票',
								success(res) {
									if(res.confirm) {
										that.keYunRefundTicket(orderNumber)
									}
								}
							})
						}else if(respones.data.status == false){
							uni.hideLoading();
							that.$refs.popup2.close()
							uni.showToast({
								title:respones.data.msg,
								icon:'none',
								complete() {
									setTimeout(function(){
										uni.startPullDownRefresh();
									},1500)
								}
							})
						}
					},
					fail(respones) {
						uni.hideLoading();
						console.log('费率', respones)
					}
				})
			},
			// -------------------------客运退票-------------------------
			keYunRefundTicket: function(orderNumber) {
				uni.showLoading({
					title: '正在退票中...'
				})
				var that = this;
				uni.request({
					url: $KyInterface.KyInterface.RefundTicket_Flow.Url,
					method: $KyInterface.KyInterface.RefundTicket_Flow.method,
					data: {
						orderNumber: orderNumber,
					},
					success: (respones) => {
						uni.hideLoading()
						console.log('退票结果', respones)
						if (respones.data.status == true) {
							if(respones.data.msg == '退票成功'){
								uni.showToast({
									title:"退票成功",
									complete() {
										setTimeout(function(){
											uni.startPullDownRefresh();
										},1500)
									}
								})
								this.selectorChange();
							}else {
								uni.showToast({
									title: respones.data.msg
								})
								uni.startPullDownRefresh();
								this.selectorChange();
							}
						} else if (respones.data.status == false){
							uni.hideLoading()
							if(respones.data.msg) {
								uni.showToast({
									title: respones.data.msg,
									icon: 'none'
								})
							}else {
								uni.showToast({
									title: '退票失败',
									icon: 'none'
								})
								this.selectorChange();
							}
							this.$refs.popup2.close()
							uni.startPullDownRefresh();
						}
						this.selectorChange();
					},
					fail: (respones) => {
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
					}
				})
			},
			//-------------------------打开退票弹框-------------------------
			open2: function(e) {
				var that = this;
					that.ticketOrderNumber = e;
					that.$refs.popup2.open()
			},
			//-------------------------关闭退票弹框-------------------------
			close2() {
				this.$refs.popup2.close()
			},
			//--------------------------客运取消之前获取车票支付参数--------------------------
			cancel_getTicketPaymentInfo: function(orderNumber) {
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title: '查询支付状态...'
				});
				timer = setInterval(function() {
					uni.request({
						url:$KyInterface.KyInterface.SellTicket_Flow.Url,
						method:$KyInterface.KyInterface.SellTicket_Flow.method,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log('取消结果',res);
							if (res.data.data == '订票成功，待支付' || res.data.msg == '订票成功，待支付') {//可以取消
								clearInterval(timer);
								that.keYunCancelTicket(orderNumber);
							}else if (res.data.data == '订票成功' || res.data.msg == '订票成功'){//已付钱，不可取消
								clearInterval(timer);
								uni.hideLoading();
								that.$refs.popup3.close()
								uni.showModal({
									title:'温馨提示',
									content:'您的订单已购票成功，不可取消',
									showCancel:false,
									complete() {
										uni.startPullDownRefresh()
									}
								})
							}else if (res.data.msg == '订票失败' || res.data.data == '订票失败'){//可取消
								clearInterval(timer);
								that.keYunCancelTicket(orderNumber);
							}else {
								clearInterval(timer);
								uni.hideLoading();
								that.$refs.popup3.close()
							}
						},
						fail(res) {
							uni.stopPullDownRefresh();
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			// -------------------------客运取消-------------------------
			keYunCancelTicket: function(orderNumber) {
				var that = this;
				that.ky_currentType = '传统客运';
				uni.request({
					url: $KyInterface.KyInterface.CancelTicket_Flow.Url,
					method: $KyInterface.KyInterface.CancelTicket_Flow.method,
					data: {
						orderNumber: orderNumber,
					},
					success: (respones) => {
						uni.hideLoading()
						that.$refs.popup3.close()
						// console.log('取消结果', respones)
						if (respones.data.status == true) {
							uni.showToast({
								title: '取消成功',
								complete() {
									setTimeout(function(){
										uni.startPullDownRefresh();
									},1500)
								}
							})
							this.selectorChange();
						} else {
							uni.showToast({
								title: '取消失败',
								icon: 'none',
								complete() {
									setTimeout(function(){
										uni.startPullDownRefresh();
									},1500)
								}
							})
						}
					},
					fail: (respones) => {
						// alert(respones.data.msg)
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
						this.$refs.popup3.close()
					}
				})
			},
			
			// -------------------------客运支付-------------------------
			keYunPay: function(item,carType) {
				// var orderInfo = this.info[index];
				var that = this;
				console.log(item.orderNumber,carType,item.totalPrice);
					this.ky_currentType = '';
					this.ky_orderStatus = '客运支付订单检索';
					this.getTicketPaymentInfo(item.orderNumber);
			},
			
			//--------------------------检测订单支付状态--------------------------
			Cs_CheckPayState:function(orderNumber,totalPrice){
				var that = this;
				var payType = $KyInterface.KyInterface.SellTicket_Flow.payType;
				console.log('检测订单支付状态',orderNumber,payType)
				var number = orderNumber.orderNumber;
				uni.request({
					url:$KyInterface.KyInterface.SellTicket_Flow.Url,
					method:$KyInterface.KyInterface.SellTicket_Flow.method,
					data:{
						orderNumber:number,
						payType:payType
					},
					success(res) {
						console.log('支付状态',res)
						console.log('ky_currentType',that.ky_currentType)
						 if(res.data.msg == '支付成功'){
							uni.showToast({
								title:'订单已支付',
								icon:'none'
							})
						}else if(res.data.msg == '支付关闭'){
							uni.showToast({
								title:'支付关闭',
								icon:'none'
							})
						}else if(res.data.msg == '检测到超时'){
							uni.showToast({
								title:'支付超时',
								icon:'none'
							})
						}else if(res.data.msg == '已办理退款'){
							uni.showToast({
								title:'已办理退款',
								icon:'none'
							})
						}
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			//--------------------------获取车票支付参数--------------------------
			getTicketPaymentInfo: function(orderNumber) {
				// console.log('支付参数', orderNumber);
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title:'正在检测订单...'
				})
				timer = setInterval(function() {
					uni.request({
						url:that.$ky_cpdg.KyInterface.Ky_getTicketPaymentInfo.Url,
						method:that.$ky_cpdg.KyInterface.Ky_getTicketPaymentInfo.method,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log('支付参数返回数据', res);
							if (res.data.status == true) {
								uni.hideLoading();
								var info = JSON.parse(res.data.msg);
								if (info.oldState == '结束') {
									clearInterval(timer);
									uni.showToast({
										title: '订单已支付',
										icon: 'none',
										complete() {
											setTimeout(function(){
												uni.startPullDownRefresh()
											},1500)
										}
									})
								} else {
									clearInterval(timer);
									//未支付，客运支付
									that.keYunPaymentData = JSON.parse(res.data.msg);
									that.keYunPayment(orderNumber);
								}
							} else if (res.data.status == false) {
								uni.hideLoading();
								clearInterval(timer);
								var info = JSON.parse(res.data.msg);
								if (info.oldState == '结束') {
									uni.showToast({
										title: '订单已超时',
										icon: 'none'
									})
								} else {
									uni.showModal({
										content: info.oldState,
										showCancel: false
									})
								}
							}
						},
						fail(res) {
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//--------------------------调起支付--------------------------
			keYunPayment: function(e) {
				// console.log('点击了支付');
				var that = this;
				if (that.isPayEnable == 0) {
					uni.showToast({
						title: '正在获取支付,请稍等...',
						icon: 'none'
					})
				} else {
					// #ifdef H5
					WeixinJSBridge.invoke('getBrandWCPayRequest', {
						"appId": that.keYunPaymentData.jsapi.AppId, //公众号名称，由商户传入
						"timeStamp": that.keYunPaymentData.jsapi.TimeStamp, //时间戳
						"nonceStr": that.keYunPaymentData.jsapi.NonceStr, //随机串
						"package": that.keYunPaymentData.jsapi.Package, //扩展包
						"signType": that.keYunPaymentData.jsapi.SignType, //微信签名方式:MD5
						"paySign": that.keYunPaymentData.jsapi.PaySign //微信签名
					}, function(res) {
						console.log(res)
						if (res.errMsg == "get_brand_wcpay_request:ok") {
							//支付成功再进计时器查询状态
							// location.href = "/Order/BaseCallback/" + flowID;
							uni.showToast({
								title: '支付成功',
								icon: 'none',
							})
							uni.startPullDownRefresh();
						} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
							uni.showToast({
								title: '您取消了支付，请重新支付',
								icon: 'none',
							})
						} else if (res.err_msg == "get_brand_wcpay_request:faile") {
							uni.showToast({
								title: '支付失败，请重新支付',
								icon: 'none',
							})
						} else {
							// location.href = "/Coach/GetCoach";
						}
					});
					// #endif


					// #ifdef APP-PLUS
					// console.log('进入app支付', that.paymentData);
					uni.hideLoading()
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: {
							appid: that.keYunPaymentData.jsapi.AppId,
							timestamp: that.keYunPaymentData.jsapi.TimeStamp,
							noncestr: that.keYunPaymentData.jsapi.NonceStr,
							package: 'Sign=WXPay',
							sign: that.keYunPaymentData.jsapi.PaySign,
							partnerid: that.keYunPaymentData.jsapi.PartnerId,
							prepayid: that.keYunPaymentData.jsapi.PrepayId,
						},
						success: function(res) {
							if (res.errMsg == 'requestPayment:ok') { //成功
								uni.showToast({
									title: '支付成功',
									icon: 'none',
									success: function() {
										uni.startPullDownRefresh();
									}
								})
							} else if (res.errMsg == 'requestPayment:fail') { //错误
								uni.showToast({
									title: '支付失败，请重新支付',
									icon: 'none',
								})
							}
						},

						fail: function(ee) {
							console.log(ee)
							if (ee.errMsg == 'requestPayment:fail canceled') { //用户取消
								uni.showToast({
									title: '您取消了支付',
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: ee.errMsg,
									icon: 'none',
									duration: 3000
								})
							}
						}
					});
					// #endif
					// #ifdef MP-WEIXIN
					uni.hideLoading()
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp:that.keYunPaymentData.jsapi.TimeStamp,
						nonceStr:that.keYunPaymentData.jsapi.NonceStr,
						package:that.keYunPaymentData.jsapi.Package,
						signType:that.keYunPaymentData.jsapi.SignType,
						paySign:that.keYunPaymentData.jsapi.PaySign,
						success(res) {
							console.log(res)
							uni.showToast({
								title: '支付成功',
								icon: 'none'
							})
							uni.showLoading({
							    title: '加载中...'
							});
							that.getTicketPaymentInfo_ticketIssue(e);
						},
						fail(res) {
							console.log(res)
							if (res.errMsg == "requestPayment:fail cancel") {
								setTimeout(function() {
									that.showToast("支付失败，请重新支付")
								}, 1000)
							} else {
								that.showToast("支付失败")
							}
						}
					});
					// #endif
				}
			},
			//--------------------------客运成功之后重新获取车票支付参数--------------------------
			getTicketPaymentInfo_ticketIssue: function(orderNumber) {
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title: '加载中...'
				});
				console.log(orderNumber);
				timer = setInterval(function() {
					uni.request({
						url:that.$ky_cpdg.KyInterface.Ky_getTicketPaymentInfo.Url,
						method:that.$ky_cpdg.KyInterface.Ky_getTicketPaymentInfo.method,
						// header:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.header,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log('支付参数返回数据', res);
							uni.stopPullDownRefresh();
							if (res.data.data == '订票成功') {
								uni.hideLoading();
								clearInterval(timer);
								uni.showToast({
									title: '出票成功',
									icon: 'none',
								})
								that.selectorChange();
							}
						},
						fail(res) {
							uni.stopPullDownRefresh();
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//-------------------------客运投诉-------------------------
			KyComplain:function(item){
				console.log(item)
					uni.navigateTo({
						url:'/pages_GRZX/pages/GRZX/complaint?driverID=' +item.driverPhone+'&driverName=' + item.driverName +'&orderID=' +item.orderNumber
					})
			},
			onchange(e){
				this.num = e.value;
			},
			tapInfo(e) {
				if (this.rSelect.indexOf(e) == -1) {
				    this.rSelect.push(e);//选中添加到数组里
				} else {
				    this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				}
			},
			//-------------------------退票-------------------------
			refund: function() {
				uni.showLoading({
					title: '请求退票中...'
				})
				var that = this
					that.refund_getTicketPaymentInfo(that.ticketOrderNumber)
			},
			//-------------------------关闭取消弹框-------------------------
			close3() {
				this.$refs.popup3.close()
			},
			//-------------------------取消-------------------------
			cancel: function() {
					this.cancel_getTicketPaymentInfo(this.ticketOrderNumber);
			},
			//------------------------------------------------客运结束------------------------------------------------
			onClickItem(e) { //tab点击事件
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},

		}
	}
</script>

<style lang="scss">
	/* flex布局 */
	.u-f,
	.u-f-ac,
	.u-f-jsb,
	.u-f-jc {
		display: flex;
		/* 设置当前内容全部水平布局 */
	}
	.u-f-ac,
	.u-f-jsb,
	.u-f-jc {
		align-items: center;
		/* 设置内容中心点对齐 */
	}
	
	.u-f-jc {
		justify-content: center;
	}
	
	.u-f-jsb {
		justify-content: space-between;
		/* 设置左右两边靠边布局 */
	}
	
	page {
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
		padding-bottom: 48upx;
	}
	
	.pageView {
		/* #ifdef H5 */
		padding-bottom: 112upx;
		/* #endif */
	}
	
	.tab {
		position: sticky;
		top: 0upx;
		background: #f5f5f5;
		padding: 16upx 0;
		height: 108upx;
		z-index: 99999;
	
	}
	
	// 购买时间
	.pd_view {
		width: 400upx;
		margin: 40rpx 28rpx;
		margin-bottom: 0upx;
		border-radius: 32rpx;
		background: #06B4FD;
		text-align: center;
		padding: 16upx 0;
		font-size: 25upx;
		color: #FFFFFF;
	}
	
	//门票列表内容
	.at_view {
		margin: 0rpx 28rpx;
		margin: 24upx;
		background: #FFFFFF;
		border-radius: 12rpx;
		padding: 40rpx 32upx;
		padding-bottom: 120upx;
	
		.at_titleView {
			position: relative;
			display: flex;
	
			.at_icon {
				position: relative;
				top: 6upx;
				width: 40upx;
				height: 34upx;
			}
			.at_textView{
				padding-left: 20upx;
				width: 450upx;
				overflow: hidden;
				.at_title {
					
				}
			}
			.at_status {
				position: absolute;
				right: 0;
				font-size: 30upx;
				top: 6upx;
			}
		}
	
		//内容区
		.at_contentView {
			position: relative;
			margin: 24upx 0;
			margin-left: 60upx;
	
			.at_contentFrame {
				padding: 8upx 20upx;
				margin-right: 16upx;
				text-align: center;
				font-size: 20upx;
				color: #3AC596;
				border-radius: 8upx;
				border: 1upx solid #3AC596;
			}
	
			.at_contentPrice {
				position: absolute;
				right: 0;
				font-size: 30upx;
				color: #f85e52;
			}
	
			.at_contentText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #888;
			}
		}
	
		//按钮区
		.at_buttonView {
			display: flex;
			float: right;
	
			// 按钮
			.at_button {
				padding: 18upx 32upx;
				font-size: 30upx;
				border-radius: 40upx;
			}
	
			// 详情 - 实心蓝
			.at_btDetails {
				background: #3EABFC;
				border: 1upx solid #3EABFC;
				color: #FFFFFF;
				
			}
			//删除/退票 - 空心灰
			.at_btDelete {
				border: 1upx solid #888;
				color: #888;
				margin-right: 24upx;
			}
	
			//去支付 - 实心绿
			.at_btToPay {
				background: #02c501;
				border: 1upx solid #02c501;
				color: #FFFFFF;
				margin-right: 24upx;
			}
		}
	}
	//须知弹框
	.box_Vlew {
		padding: 16upx 40upx;
		padding-bottom: 24upx;
		background: #FFFFFF;
	
		.box_titleView {
			margin: 24upx 0;
	
			//弹框标题
			.box_title {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
				margin-bottom: 16upx;
			}
	
			//弹框关闭按钮
			.box_icon {
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}
	
		// 二维码弹框
		.box_qrCodeView {
			margin: 24upx 0upx;
			text-align: center;
	
			.box_qrCodeImage {
				margin-top: 24upx;
				width: 320upx;
				height: 320upx;
			}
	
			.box_qrCodeTextView {
				text-align: center;
	
				.box_qrCodeText {
					margin-top: 16upx;
					display: block;
					font-size: 30upx;
				}
			}
		}
	
		// 退款弹框
		.box_refundView {
			margin: 24upx 0upx;
	
			.box_refundText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #333;
			}
	
			//确认退票
			.box_refundContentView {
				margin-top: 64upx;
				text-align: center;
	
				.box_refundContentTitle {
					font-weight: bold;
				}
	
				.box_refundContentText {
					margin-top: 24upx;
					display: block;
					font-size: 28upx;
					color: #888;
				}
			}
	
			.box_refundButtonView {
				text-align: center;
				margin: 56upx 0;
	
				//确认按钮
				.box_refundButton {
					color: #FFFFFF;
					border-radius: 56upx;
					background: #FF6600;
					padding: 24upx 160upx;
				}
			}
		}
	}

</style>
