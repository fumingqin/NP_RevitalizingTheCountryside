<template>
	<view>
		<view class="zh_top">
			<image class="top_image" :src="background[0].ImageURL" mode="aspectFill"></image>
			<!-- 顶部滑动 -->
			<view style="position: absolute;z-index: 999;margin-top: 5upx;">

				<!-- 暂时用不到 v-if="type2==0" -->
				<view style="margin-top: 90upx;">
					<!-- 选择出发地 -->
					<view style="display: flex;margin-top: 26upx;">
						<view class="top_chooseTheRoute" hover-class="ve_hover" @tap="setOutStationTap">
							<view class="top_text">起点</view>
							<view style="display: flex;">
								<text class="setOut">{{departure}}</text>
								<text class="jdticon icon-xia"></text>
							</view>
						</view>
						<!-- 目的地 -->
						<view class="top_destination">
							<view class="top_text2">终点（不可选）</view>
							<view class="destination">{{destination}}</view>
						</view>
					</view>
				</view>

				<!-- 选择时间 -->
				<view class="top_chooseTime" hover-class="ve_hover" @click="onShowDatePicker('date')">
					<text class="dateClass">{{datestring}}&nbsp;&nbsp;&nbsp;&nbsp;{{Week}}</text>
				</view>
				<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
				 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />

				<!-- 按钮 -->
				<view class="tjButton" hover-class="ve_hover2" @click="queryClick">查询</view>

				<view class="zl_recommend" v-if="mainArray.length!==0">
					<view>
						<view class="zl_reContent">
							<text class="zl_reTitle">快捷选项</text>
						</view>
						<view class="zl_cilckView" v-for="(item,index) in mainArray" :key="index" v-if="index<4" @click="quick(item)">
							<view class="zl_textView" hover-class="ve_hover3">{{item.LineName}}</view>
						</view>
					</view>
				</view>

				<view class="hp_view">
					<view class="hp_Line"></view>
					<view class="hp_text">购票须知</view>
					<view class="hp_Line2"></view>
				</view>

				<view class="ct_noticeText ct_noticeText3">
					<rich-text :nodes="way"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/pages_ZXGP/components/ZXGP/uni-popup/uni-popup.vue";
	import $KyInterface from "@/common/Ctky.js"
	import MxDatePicker from "@/pages_ZXGP/components/ZXGP/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
			uniPopup,
			MxDatePicker,
		}, //注册为子组件
		data() {
			return {
				type2: '武夷新区专线',
				datestring: '',
				Week: '',
				type: 'rangetime',
				value: '',
				showPicker: false,
				date: '',
				departure: '请选择起点',
				destination: '请选择终点',
				departure2: '请选择起点',
				destination2: '请选择终点',
				background: [{
					ImageURL: '',
				}], //背景图
				applyName: '',
				way: '',
				way2: '',
				mainArray: '',
			}
		},

		onLoad: function() {
			// #ifdef APP-PLUS
			const value = uni.getStorageSync('launchFlag');
			console.log(value)
			if (value !== true) {
				uni.setStorage({
					key: 'launchFlag',
					data: true,
					success: function() {
						uni.redirectTo({
							url: 'guidePage'
						})
					}
				})
			}
			// #endif
			//加载应用名称
			this.applyName = this.$oSit.Interface.system.applyName;
			
			var that = this;
			that.loadData();
			this.getBusStationList();
		},

		onShow() {
			var that = this;
			//获取当前日期
			that.getTodayDate();

		},

		methods: {
			//----------------------接口数据-------------------------------
			loadData: function() {
				//请求图片
				uni.request({
					url: this.$home.KyInterface.GetRotationChart.Url,
					method:this.$home.KyInterface.GetRotationChart.method,
					success:(res)=>{
						console.log('轮播区',res)
						this.background = res.data.data.filter(item => {
							return item.Title == '武夷新区背景图';
						})
						console.log(this.background)
					},
					fail:function(){
						uni.showToast({
							title:'首页轮播图网络加载异常',
							icon:'none'
						})
					}
				})
				
				uni.request({
					url: this.$ky_cpdg.KyInterface.Cs_getByTitle.Url,
					method: this.$ky_cpdg.KyInterface.Cs_getByTitle.method,
					success: (res) => {
						console.log('购票须知', res)
						var data = res.data.data.filter(item => {
							return item.Type == '购票须知';
						})
						this.way = data[0].Body;
						console.log('购票须知2', this.way)
					}
				})
				uni.stopPullDownRefresh();
			},

			//---------------------------------点击出发专线---------------------------------
			setOutStationTap() {
				var that = this;
				//监听事件,监听下个页面返回的值
				uni.$on('startstaionChange', function(data) {
					// data即为传过来的值，给上车点赋值
					that.departure = data.data;
					that.destination = data.data2;
					//清除监听，不清除会消耗资源
					uni.$off('startstaionChange');
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是上车点
					url: '../../TraditionSpecial/stationPicker/homeSattionPick?&station=' + 'qidian' + '&type=' + this.type2,
				})

			},

			//---------------------------------获取当前日期---------------------------------
			getTodayDate() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var timer = year + '-' + month + '-' + day;
				this.queryWeek(date.toString().substring(0, 3));
				this.datestring = timer;
			},
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];

			},

			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					// this[this.type] = e.value;
					this[this.type] = e.value.split('/')[0] + "-" + e.value.split('/')[1] + "-" + e.value.split('/')[2];
					this.datestring = this[this.type];
					this.queryWeek(e.date.toString().substring(0, 3));
					// console.log(this[this.type]);
					// console.log(e.date.toString().substring(0,3));
					// console.log(this.Week);
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
					this.date = e.value;
				}
			},
			queryWeek(e) {
				console.log(e);
				switch (e) {
					case "Mon":
						this.Week = '周一';
						break;
					case "Tue":
						this.Week = "周二";
						break;
					case "Wed":
						this.Week = "周三";
						break;
					case "Thu":
						this.Week = "周四";
						break;
					case "Fri":
						this.Week = "周五";
						break;
					case "Sat":
						this.Week = "周六";
						break;
					case "Sun":
						this.Week = "周日";
						break;
					default:
						break;
				}
			},

			//---------------------------------点击查询---------------------------------
			queryClick: function() {
				var that = this;
				if (that.departure == '请选择起点') {
					uni.showToast({
						title: '请选择起点',
						icon: 'none'
					})
				} else {
					//页面传参通过地址后面添加参数 this.isNormal=0是普通购票1是定制班车
					var params = '../../TraditionSpecial/Order/selectTickets?&startStation=' + this.departure + '&endStation=' + this
						.destination + '&date=' + this.datestring + '&isNormal=' + this.type2 + '&Week=' + this.Week;
					uni.navigateTo({
						url: params,
					})
				}
			},

			//-------------------------获取车站列表数据-------------------------
			getBusStationList: function() {
				uni.request({
					url: $KyInterface.KyInterface.GetLineName.Url,
					method: $KyInterface.KyInterface.GetLineName.method,
					data: {
						AppSystemName: this.type2
					},
					success: (res) => {
						uni.hideLoading();
						console.log('type2路线', res)
						if (res.data.data.length != 0) {
							this.mainArray = res.data.data;
							console.log(this.mainArray)
						}
					},
					fail(res) {
						uni.hideLoading();
					}
				})

			},
			quick: function(item) {
				var params = '../../TraditionSpecial/Order/selectTickets?&startStation=' + item.StartSite + '&endStation=' + item.EndSite +
					'&date=' + this.datestring + '&isNormal=' + this.type2;
				uni.navigateTo({
					url: params,
				})
			}
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #ff971e;
	}

	.top_image {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		margin: 0 auto;
		z-index: 1;
	}

	//兴业银行
	//顶部筛选样式
	.screen {
		height: 106upx;
		// position: sticky;
		top: 0;
		z-index: 2;

		.screenView {
			left: 0;
			display: flex;
			width: 100%;
			height: 87upx;
			z-index: 10;
			position: sticky;
			top: 0;
			// background-color: #F5F5F5;
			margin-top: 20upx;

			.screenText {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 34upx;
				color: #FFFFFF;
				position: relative;



				&.current {
					color: #FFFFFF;
					font-size: 34upx;
					font-weight: bold;
					// background-color: #FFFFFF;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 70upx;
						height: 3upx;
						border-bottom: 4upx solid #FFFFFF;
					}
				}
			}
		}
	}

	//顶部
	.zh_top {
		// position: absolute;
		width: 100%;
		// height: 100%;
		z-index: 2;

		//选择路线
		.top_chooseTheRoute {
			// display: flex;
			width: 52%;
			// overflow: hidden;
			left: 6%;
			padding: 20upx 28upx;
			border-radius: 22upx;
			background-color: #FFFFFF;
			z-index: 2;
			margin-left: 46upx;

			.top_text {
				// display: block;
				font-size: 20upx;
				color: #999999;
				// padding-bottom: 6upx;
			}

			//出发点
			.setOut {
				font-size: 32upx;
				font-weight: 400;
				color: #333333;
				width: 310upx;
				text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
				white-space: nowrap;
				overflow: hidden;
				left: 0;
				text-align: left;
			}

			.jdticon {
				right: 0;
				padding-top: 8upx;
			}
		}

		.top_destination {
			// display: flex;
			width: 34%;
			// overflow: hidden;
			// left: 61%;
			padding: 20upx 28upx;
			margin-left: 12upx;
			border-radius: 22upx;
			background-color: #FFFFFF;
			z-index: 2;

			.top_text2 {
				// display: block;
				font-size: 20upx;
				color: #999999;
				// padding-bottom: 6upx;
			}

			.destination {
				font-size: 32upx;
				font-weight: 400;
				color: #333333;
				// width: 234upx;
				text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
				white-space: nowrap;
				overflow: hidden;
				left: 0;
				text-align: left;
			}
		}

		//选择到达起点
		.top_startingPoint {
			// display: flex;
			width: 192upx;
			height: 70upx;
			// overflow: hidden;
			left: 6%;
			padding: 20upx 28upx;
			border-radius: 22upx;
			background-color: #FFFFFF;
			z-index: 2;
			margin-left: 46upx;

			.top_text3 {
				// display: block;
				font-size: 20upx;
				color: #999999;
				// padding-bottom: 6upx;
			}

			.startingPoint {
				font-size: 32upx;
				font-weight: 400;
				color: #333333;
				// width: 234upx;
				text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
				white-space: nowrap;
				overflow: hidden;
				left: 0;
				text-align: left;
			}
		}

		//选择到达终点
		.top_chooseEnd {
			// display: flex;
			width: 342upx;
			height: 70upx;
			// overflow: hidden;
			left: 41%;
			padding: 20upx 28upx;
			border-radius: 22upx;
			background-color: #FFFFFF;
			z-index: 2;
			margin-left: 12upx;

			.top_text4 {
				// display: block;
				font-size: 20upx;
				color: #999999;
				// padding-bottom: 6upx;
			}

			//出发点
			.setEnd {
				font-size: 32upx;
				font-weight: 400;
				color: #333333;
				width: 310upx;
				text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
				white-space: nowrap;
				overflow: hidden;
				left: 0;
				text-align: left;
			}

			.jdticon {
				right: 0;
				padding-top: 8upx;
			}
		}
	}

	//选择时间
	.top_chooseTime {
		// position: absolute;
		display: flex;
		width: 87.5%;
		// height:100%;
		overflow: hidden;
		left: 6%;
		padding: 28upx;
		border-radius: 22upx;
		background-color: #FFFFFF;
		z-index: 2;
		// top: 386upx;
		margin-left: 46upx;
		margin-top: 42upx;

		//出发点
		.dateClass {
			display: flex;
			font-size: 32upx;
			font-weight: 400;
			color: #333333;
			// width: 234upx;
			left: 0;
			text-align: left;
		}
	}

	//点击态
	.ve_hover {
		transition: all .3s; //过度
		border-top-left-radius: 22rpx;
		border-bottom-left-radius: 22rpx;
		opacity: 0.9;
		background: #E4E7ED;
	}

	//查询点击态
	.ve_hover2 {
		transition: all .3s; //过度
		border-radius: 64upx;
		opacity: 0.9;
		background: #F0AD4E;
	}

	//点击态
	.ve_hover3 {
		transition: all .3s; //过度
		border-radius: 44upx;
		opacity: 0.9;
		background: #aaa;
	}

	//底部按钮
	.tjButton {
		// position: absolute;
		border-radius: 64upx;
		left: 6%;
		padding: 28upx 50upx;
		// top: 530upx;
		width: 87.5%;
		background-color: #D17000;
		text-align: center;
		color: #FFFFFF;
		font-size: 34upx;
		font-weight: 400;
		box-shadow: 0px 20px 81px 0px rgba(184, 99, 0, 0.6);
		z-index: 2;
		margin-top: 42upx;
		margin-left: 46upx;
	}

	.hp_view {
		display: flex;
		padding-left: 20%;

		.hp_Line {
			width: 136upx;
			border-bottom: 1px solid #FFFFFF;
			margin-bottom: 12upx;
		}

		.hp_text {
			width: 170upx;
			font-size: 28upx;
			color: #FFFFFF;
			text-align: center;
			margin-top: 64upx;
		}

		.hp_Line2 {
			width: 136upx;
			border-bottom: 1px solid #FFFFFF;
			margin-bottom: 12upx;
		}
	}

	.ct_noticeText {
		color: #FFFFFF;
		text-align: justify;
		line-height: 54upx;
		// margin: 32upx 60upx;
		font-size: 26upx;
		z-index: 2;
	}



	// 旅游推荐
	.zl_recommend {
		// background: #fff;
		margin-top: 16upx;

		.zl_reContent {
			position: relative;
			padding-top: 40upx;
			margin-left: 28upx;

			.zl_reTitle {
				font-size: 30upx;
				color: #FFFFFF;
				font-weight: bold;
				margin-left: 22upx;
			}

			.zl_reMore {
				position: absolute;
				padding-right: 31upx;
				padding: 4upx 0;
				right: 0;
				font-size: 24upx;
				color: #5E5E60;
			}
		}

		.zl_cilckView {
			float: left;
			margin-left: 52rpx;
			margin-top: 32rpx;

			.zl_textView {
				color: #333333;
				font-size: 30upx;
				padding: 20upx 50upx;
				background: #FFFFFF;
				border-radius: 44rpx;
				width: 300rpx;
				text-align: center;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}

	}

	.ct_noticeText2 {
		margin: 32upx 60upx 0 60upx;
	}

	.ct_noticeText3 {
		margin: 32upx 60upx;
	}
</style>
