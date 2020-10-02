<template>
	<view class="contentView">
		<view class="top u-f-jsb" style="background-color: #FC4646; width: 100%; height: 180rpx;">
			<view style="color: #FFFFFF; font-size: 35rpx; margin-left: 20rpx;">{{getCtkyOrderStatus(orderInfo.state)}}</view>
			<view style="color: #FFFFFF; font-size: 30rpx; margin-right: 20rpx;">￥{{orderInfo.totalPrice}}</view>
		</view>
		<!-- 头部视图 -->
		<view class="head">
			<!-- 起始站/价格 -->
			<view class="u-f-jsb" style="font-size: 34upx;">
				<view>{{orderInfo.carType}} : {{orderInfo.lineName}}</view>
			</view>
			<!-- 发车时间 -->
			<view class="headText"> 订单号：<text class="detailInfo2">{{orderInfo.orderNumber}}</text></view>
			<view class="headText"> 发车时间：<text class="detailInfo2">{{orderInfo.setOutTime}}</text></view>
			<view class="headText"> 班次：<text class="detailInfo2">{{getScheduleNum(orderInfo.planScheduleCode)}}</text></view>
			<view class="headText"> 上车点：<text class="detailInfo2">{{orderInfo.startSiteName}}</text></view>
			<view class="headText"> 下车点：<text class="detailInfo2">{{orderInfo.endSiteName}}</text></view>
		</view>
		<!-- 接送信息 -->
		<view class="infoCotent" style="text-align: center;" v-if="orderInfo.IsPickUp == true">
			<view class="passageInfo u-f-ac">
				<!-- 标题 -->
				<view class="title">
					<view style="display: flex;">接送上车点：<text class="detailInfo2">{{ispickupData.PickUpAddress}}</text></view>
					<view style="display: flex;">接送状态：<text class="detailInfo2">{{getState(ispickupData.State)}}</text></view>
					<view style="display: flex;">车辆状态：<text class="detailInfo2">{{getIsSend(ispickupData.IsSend)}}</text></view>
					<view style="display: flex;">司机姓名：<text class="detailInfo2">{{getNamePhone(ispickupData.DriverName)}}</text></view>
					<view style="display: flex;">司机手机号：<text class="detailInfo2">{{getNamePhone(ispickupData.DriverPhone)}}</text></view>
				</view>
			</view>
		</view>
		<!-- 乘客信息 -->
		<view class="infoCotent" style="text-align: center;">
			<view class="passageInfo u-f-ac" v-for="(item,index) in passageInfo" :key="index">
				<!-- 标题 -->
				<view class="title">
					<view style="display: flex;">出行人：<text class="detailInfo2">{{item.userName}}</text></view>
					<view style="display: flex;">身份证：<text class="detailInfo2">{{userCodeNumChange(item.userCodeNum)}}</text></view>
					<view style="display: flex;">座位号：<text class="detailInfo2">{{seat}}</text></view>
				</view>
			</view>
			<view class="passageInfo u-f-ac">
				<view class="title">
					<view style="display: flex;">退改规则：<text class="detailInfo2">{{role}}</text></view>
					<view style="display: flex;">附加保险：<text class="detailInfo2">{{isInsured(orderInfo.insured)}}</text></view>
				</view>
			</view>
			<!-- 二维码 -->
			<view style=" padding-left: 200upx;"><canvas canvas-id="qrcode" style="width: 160px; height: 160px;" /></view>
			<view v-if="orderInfo.carType != '定制巴士'" style="color: #2C2D2D;font-size: 32rpx;font-weight: 300; padding-bottom: 10rpx;">取票号
				{{orderInfo.ticketNumber}}</view>
			<view style="color: #999999;font-size: 28rpx;font-weight: 300; padding-bottom: 32rpx; ">出示二维码，检票上车</view>
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/pages_ZXGP/components/ZXGP/uni-uqrcode/uqrcode.js'
	import tkiQrcode from '@/pages_ZXGP/components/ZXGP/tki-qrcode/tki-qrcode.vue'
	export default {
		components: {
			tkiQrcode
		},

		data() {
			return {
				orderID: '',
				role: '过发车时间将无法退票',
				orderInfo: [], //订单数据
				passageInfo: [],
				ticketNum: 0,
				seat: '无', //座位号
				ticketNumber: '',
				ticktIndex: '', //车票下标
				specialCodeArray: [],
				// isShowQrcode:'',
				orderState: '', //订单状态
				isShowQrcode: true,
				background: '#b4e9e2', // 背景色
				qrcode: '', //二维码
				ispickupData: '', //接客数据

			}
		},
		onLoad() {
			var that = this;
			that.orderInfo = uni.getStorageSync('keYunDetailinfo');
			console.log(that.orderInfo);
			if (that.orderInfo.IsPickUp == true) {
				that.ispickupData = that.orderInfo.SendCarOrders[0];
			}
			that.orderState = that.orderInfo.state;
			this.specialCodeArray = that.orderInfo.CheckInfoList;
			that.getTicketNum(that.orderInfo); //计算车票数量
			that.stringTurnArray(that.orderInfo.iDNameType);
			if (that.orderInfo.ticketNumber != '') {
				that.make(); //生成二维码
			}
		},
		methods: {
			//---------------------生成二维码----------------------
			make: function() {
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.orderInfo.ticketNumber,
					size: 160,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					correctLevel: uQRCode.defaults.correctLevel,
				})
			},
			//-------------------------------身份证-------------------------------
			userCodeNumChange: function(userCodeNum) {
				return (userCodeNum.substr(0, 6)) + '******' + (userCodeNum.substr(16, 18))
			},
			//-------------------------------判断是否有保险-------------------------------
			isInsured: function(param) {
				if (this.orderInfo.carType == '定制巴士') {
					return '无保险'
				} else if (param == 'False') {
					return '无保险'
				} else {
					return '乘车险 x1'
				}
			},
			//-------------------------------报班信息-------------------------------
			getDetailInfo(param) {
				if (!param) {
					return '该车未报班，无法获取详细信息'
				} else {
					return param
				}
			},
			//-------------------------------获取班次信息-------------------------------
			getScheduleNum: function(param) {
				if (param) {
					return param;
				} else {
					return '无';
				}
			},
			//-------------------------------获取乘车人信息-------------------------------
			stringTurnArray(param) {
				var that = this;

				let a = param.indexOf('|')
				var singleArray = [];
				if (a == -1) { //不存在'|' 只有一张车票
					var array = param.split(',');
					var passenger = {
						userName: array[1],
						userCodeNum: array[0],
					}
					that.passageInfo.push(passenger);
					console.log('只有一张票')
					// this.ticketNumber = that.orderInfo.ticketNumber;
					// that.make(this.orderInfo.ticketNumber,0);
				} else { //多人订票
					//存在'|'
					var array = param.split('|');
					for (let i = 0; i < array.length; i++) {
						singleArray = array[i].split(',');
						var passenger = {
							userName: singleArray[1],
							userCodeNum: singleArray[0],
						}
						that.passageInfo.push(passenger);
						// this.ticketNumber = that.orderInfo.ticketNumber;
						// that.make(that.getOneTicketNum(this.orderInfo.ticketNumber,i),i);
					}
					console.log(that.passageInfo)
				}
			},
			//-------------------------------获取取票号-------------------------------
			getOneTicketNum(ticketNum) {
				var that = this;
				if (!(/(^[1-9]\d*$)/.test(that.orderState))) { //如果不是数字
					if (that.orderState == '尚未支付') {
						return '尚未支付'
					} else if (that.orderState == '作废') {
						return '尚未支付'
					} else if (that.orderState == '已退票') {
						return '尚未支付'
					} else if (that.orderState == '支付正常') {
						// 	if(ticketNum) {
						// 		let a = ticketNum.indexOf(',')
						// 		if(a == -1) {
						// 			var array = ticketNum.split('-');
						// 			let ticketHeader = array[0];
						// 			this.seat = array[1];
						// 			return ticketHeader;
						// 		}else {
						// 			var array = ticketNum.split('-');
						// 			let ticketHeader = array[0];
						// 			var array2 = array[1];
						// 			var array3 = array2.split(',');
						// 			return ticketHeader;
						// // return ticketHeader + '-' + array3[index];
						// 		}
						// 	}
					} else if (that.orderState == '已完成') {
						if (ticketNum) {
							let a = ticketNum.indexOf(',')
							if (a == -1) {
								var array = ticketNum.split('-');
								let ticketHeader = array[0];
								this.seat = array[1];
								return ticketHeader;
							} else {
								var array = ticketNum.split('-');
								let ticketHeader = array[0];
								var array2 = array[1];
								var array3 = array2.split(',');
								// return ticketHeader + '-' + array3[index];
								return ticketHeader;
							}
						}
					}
				} else if (that.orderState == 4) {
					if (ticketNum) {
						let a = ticketNum.indexOf(',')
						if (a == -1) {
							var array = ticketNum.split('-');
							let ticketHeader = array[0];
							this.seat = array[1];
							return ticketHeader;
						} else {
							var array = ticketNum.split('-');
							let ticketHeader = array[0];
							var array2 = array[1];
							var array3 = array2.split(',');
							// return ticketHeader + '-' + array3[index];
							return ticketHeader;
						}
					}
				} else if (that.orderState == 5) {
					if (ticketNum) {
						let a = ticketNum.indexOf(',')
						if (a == -1) {
							var array = ticketNum.split('-');
							let ticketHeader = array[0];
							this.seat = array[1];
							return ticketHeader;
						} else {
							var array = ticketNum.split('-');
							let ticketHeader = array[0];
							var array2 = array[1];
							var array3 = array2.split(',');
							// return ticketHeader + '-' + array3[index];
							return ticketHeader;
						}
					}
				} else if (that.orderState == 6) {
					return '已退票'
				} else if (that.orderState == 7) {
					return '未支付'
				} else if (that.orderState == 9) {
					return '已撤销'
				} else if (that.orderState == 22) {
					return '已改签'
				}
			},
			//-------------------------------获取定制巴士取票号-------------------------------
			getSpecialOneTicketNum(res, index) {
				if (this.orderInfo.carType == '定制巴士') {
					return res[index].CheckCode
				}
			},
			//-------------------------------计算车票数量-------------------------------
			getTicketNum(param) {
				return Number(param.fullTicket) + Number(param.halfTicket) + Number(param.carryChild)
			},
			//-------------------------判断订单状态-------------------------
			getCtkyOrderStatus(param) {
				var that = this;
				if (!(/(^[1-9]\d*$)/.test(param))) { //如果不是数字
					if (param == '尚未支付') {
						that.isShowQrcode = false;
					} else if (param == '作废') {
						that.isShowQrcode = false;
					} else if (param == '已退票') {
						that.isShowQrcode = false;
					} else {
						that.isShowQrcode = true;
					}
					return param
				} else if (param == 4) {
					that.isShowQrcode = true;
					return '进行中'
				} else if (param == 5) {
					that.isShowQrcode = true;
					return '已完成'
				} else if (param == 6) {
					that.isShowQrcode = false;
					return '已退票'
				} else if (param == 7) {
					that.isShowQrcode = false;
					return '未支付'
				} else if (param == 9) {
					that.isShowQrcode = false;
					return '已撤销'
				} else if (param == 22) {
					that.isShowQrcode = true;
					return '已改签'
				}
			},

			//--------------------时间转换-----------------
			gettime: function(param) {
				console.log(param)
				let array = param.split(":");
				var a = array[0] + ":" + array[1];
				return a;
			},

			//接客状态转换
			getIsSend: function(e) {
				console.log(e)
				if (e == false) {
					return '未派车'
				} else {
					return '已派车'
				}

			},

			getState: function(e) {
				console.log(e)
				if (e == 0 || e == 1) {
					return '未上车'
				} else {
					return '已上车'
				}
			},

			getNamePhone: function(e) {
				if (e == null) {
					return '暂未指派接送司机'
				} else {
					return e
				}
			}
		}
	}
</script>

<style>
	/* flex布局 */
	.u-f,
	.u-f-ac,
	.u-f-jsb,
	.u-f-ajc {
		display: flex;
	}

	.u-f-ac,
	.u-f-jsb,
	.u-f-ajc {
		align-items: center;
	}

	.u-f-ajc {
		justify-content: center;
	}

	.u-f-jsb {
		justify-content: space-between;
	}

	.paddingTLR {
		padding-top: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}

	/* 内容 */
	page,
	.contentView {
		background: #F5F9FC;
		display: block;
	}

	/* 头部视图 */
	.head {
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx;
		margin-top: -40rpx;
		padding: 20rpx 0;
	}

	/* 起始站/价格 */
	.head>view:first-child {
		padding: 12rpx 20rpx;
		font-size: 30rpx;
		color: #2C2D2D;
		font-weight: bold;
	}

	/* 发车时间 */
	.headText {
		display: flex;
		padding: 10rpx 20rpx;
		font-size: 28rpx;
		color: #666666;
		font-weight: 300;
	}



	.infoCotent {
		border-radius: 20rpx;
		background: #FFFFFF;
		margin: 20rpx;
		padding: 20rpx 0;
	}

	/* 乘客信息 */
	.passageInfo {
		margin-top: 20upx;
	}

	/* 标题 */
	.title {
		float: left;
		color: #666666;
		font-size: 28rpx;
		font-weight: 300;
	}

	.title view {
		margin-bottom: 20rpx;
		margin-left: 20rpx;
	}

	.detailInfo {
		text-align: left;
		color: #2C2D2D;
		display: block;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		font-size: 28rpx;
		font-weight: 500;
	}

	.detailInfo2 {
		margin-left: 12upx;
		color: #2C2D2D;
		font-size: 28rpx;
		font-weight: 500;
	}

	.detailInfo view {
		margin-bottom: 20rpx;
		margin-left: 60rpx;
	}

	.QRImage {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
		width: 300rpx;
		height: 300rpx;
	}
</style>
