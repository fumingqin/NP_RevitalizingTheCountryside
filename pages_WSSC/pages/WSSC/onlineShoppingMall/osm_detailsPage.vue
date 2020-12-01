<template>
	<view>
		<view class="returnButton" @click="returnJump">
			<u-icon name="arrow-left" color="#fff" size="42"></u-icon>
		</view>
		
		<!-- 轮播区 -->
		<u-swiper :list="details.image" :height="422" indicator-pos="bottomRight">
			<u-loading slot="loading"></u-loading>
			<view slot="error" style="font-size: 24rpx;">加载失败</view>
		</u-swiper>

		<view class="ovof_dp_background">
			<view style="width: 750upx;"></view>
			<view class="ovof_dp_bg_background">
				<view class="title">
					<text class="ovof_dp_bg_title">{{details.introduce}}</text>
					<text class="ovof_dp_bg_cost" v-if="number==0">¥0</text>
					<text class="ovof_dp_bg_cost" v-if="number!==0">¥{{calculateQuantity(details.unit_price)}}</text>
				</view>
				<view class="ovof_dp_bg_time">
					<text class="browse">销售量:</text>
					<u-count-to font-size="30rpx" color="#888" :start-val="0" :end-val="browse"></u-count-to>
					<!-- <text class="browse" style="padding-left: 30upx;">{{comment}}个评论</text> -->
				</view>

				<view class="label">
					<view style="display: flex;" v-for="(item,index) in label" :key="index">
						<text class="circle"></text>
						<text class="text">{{item}}</text>
					</view>
				</view>

				<view class="c-list">
					<view class="c-row b-b" @click="toggleSpec">
						<text class="tit">购买类型</text>
						<view class="con">
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
							<text class="selected-text">数量:{{number}}</text>
						</view>
						<text class="jdticon icon-you"></text>
					</view>
				</view>
			</view>
			
			<!-- 规格-模态层弹窗 -->
			<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
				<!-- 遮罩层 -->
				<view class="mask"></view>
				<view class="layer attr-content" @click.stop="stopPrevent">
					<view class="a-t">
						<image src="https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"></image>
						<view class="right">
							<text class="price" v-if="number==0">¥0</text>
							<text class="price" v-if="number!==0">¥{{calculateQuantity(details.unit_price)}}</text>
							<view class="selected">
								已选：
								<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
									{{sItem.name}}
								</text>
								<text class="selected-text">数量:{{number}}</text>
							</view>
						</view>
					</view>
					<!-- <view class="attr-list" v-for="(item,index) in specList" :key="index">
						<text>{{item.name}}</text>
						<view class="item-list">
							<text v-for="(childItem, childIndex) in specChildList" :key="childIndex" class="tit" :class="{selected: childItem.selected}"
							v-if="childItem.pid === item.id" @click="selectSpec(childIndex, childItem.pid)">
								{{childItem.name}}
							</text>
						</view>
					</view> -->
					<view class="attr-list">
						<text>规格:{{details.sale_unit}}</text>
					</view>
					
					<view class="attr-list">
						<text>购买数量</text>
					</view>
					<lxc-count @handleCount="handleCountClick" :index="1" :value="number" :delayed="100"></lxc-count>
					<button class="btn" @click="buyNow">立即购买</button>
				</view>
			</view>

			<view class="u-content">

				<!-- 顶部滑动 -->
				<view class="screen">
					<view class="screenView">
						<view class="screenText" :class="{current:type===0}" @click="tabClick(0)">
							内容介绍
						</view>
						<view class="screenText" :class="{current:type===1}" @click="tabClick(1)">
							质检证书
						</view>
					</view>
				</view>

				<view v-if="type==0">
					<view class="d-header">
						<text>图文详情</text>
					</view>
					<u-read-more :toggle="toggle" :show-height="showHeight">
						<u-parse :html="details.content" :tag-style="style" :lazy-load="true" :show-with-animation="true"></u-parse>
					</u-read-more>
				</view>
			</view>
			
			<!-- 提交订单栏 -->
			<!-- <view class="navigation">
				<view class="left">
					<view class="item">
						<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">客服</view>
					</view>
					<view class="item">
						<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">店铺</view>
					</view>
					<view class="item car">
						<u-badge class="car-num" :count="9" type="error" :offset="[-3, -6]"></u-badge>
						<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">购物车</view>
					</view>
				</view>
				<view class="right">
					<view class="cart btn u-line-1">加入购物车</view>
					<view class="buy btn u-line-1" @click="buyNowJump">立即购买</view>
				</view>
			</view> -->
			
			<!-- 提交订单栏 -->
			<view class="navigation">
				<view class="left">
					<view class="item">
						<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">客服</view>
					</view>
				</view>
				<view class="right">
					<view class="button">
						<text class="buy btn u-line-1" @click="buyNowJump">立即购买</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import lxcCount from '@/pages_WSSC/commponents/lxc-count/lxc-count.vue'
	export default {
		components: {
			lxcCount
		},
		data() {
			return {
				title: '一代天骄，成吉思汗',
				image: ["http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg"],
				time: '2020-02-10',
				browse: '122',
				showHeight: 600,
				toggle: false,
				type: 0,
				id: '',
				label: ['诚信商家', '假一赔十', '包邮', ],
				video: false,
				comment: 1723,
				specClass: 'none',
				specSelected: [], //选择类型
				number:1,//购买数量
				specList: [{
						id: 1,
						name: '容量',
					},
					{
						id: 2,
						name: '购买数量',
					},
				],
				specChildList:{
					id: 1,
					pid: 1,
					name: '100克',
					price:100,
				},
				// specChildList: [{
				// 		id: 1,
				// 		pid: 1,
				// 		name: '100克',
				// 	},
				// 	{
				// 		id: 2,
				// 		pid: 1,
				// 		name: '200克',
				// 	},
				// 	{
				// 		id: 3,
				// 		pid: 1,
				// 		name: '300克',
				// 	},
				// 	{
				// 		id: 4,
				// 		pid: 1,
				// 		name: '400克',
				// 	},
				// 	{
				// 		id: 5,
				// 		pid: 1,
				// 		name: '500克',
				// 	},
				// 	{
				// 		id: 6,
				// 		pid: 1,
				// 		name: '600克',
				// 	},
				// ],
				mydata: [{
					name: '111',
					num: 1,
				}],
				// 字符串的形式
				style: {
					p: 'letter-spacing: 4rpx;text-align: justify;line-height: 48rpx;font-size:30rpx;text-justify: inter-ideograph; text-indent: 2em;padding-bottom: 20rpx;padding-top: 20rpx;',
					span: 'font-size: 30rpx'
				},
				
				desc: `
					<div style="width:100%">
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd1.alicdn.com/imgextra/i1/479184430/O1CN01Tnm1rU1iaz4aVKcwP_!!479184430.jpg_400x400.jpg" />
					</div>
				`,
				id:'',
				details:'',//获取详情参数
				quantity:'',//获取价格
			}
		},

		onLoad: function(param) {
			this.id = param.id;
			this.detailsData();
			console.log(this.id)
			//规格 默认选中第一条
			// this.specList.forEach(item => {
			// 	for (let cItem of this.specChildList) {
			// 		if (cItem.pid === item.id) {
			// 			this.$set(cItem, 'selected', true);
			// 			this.specSelected.push(cItem);
			// 			break; //forEach不能使用break
			// 		}
			// 	}
			// })
		},

		onShow() {

		},

		onUnload() {

		},

		methods: {
			tabClick(e) {
				if (e == 0) {
					this.type = 0;
				} else if (e == 1) {
					this.type = 1;
				}
			},
			
			//详情数据
			detailsData:function(){
				uni.request({
					url: this.$wssc.KyInterface.getProductByID.Url,
					method: this.$wssc.KyInterface.getProductByID.method,
					data: {
						id:this.id
					},
					success: (res) => {
						// console.log('轮播区', res)
						if (res.data.status == true) {
							this.details=res.data.data;
							console.log('获取详情数据', this.details)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail: function() {
						uni.showToast({
							title: '首页轮播图网络加载异常',
							icon: 'none'
						})
					}
				})
			},
			
			//返回上一个页面
			returnJump:function(){
				uni.navigateBack({
					delta:1,
				})
			},
			
			//计算数量价格
			calculateQuantity:function(e){
				if(this.number!==0){
					var a = e*this.number;
					this.quantity=a;
					console.log(this.quantity)
					return a;
				}
			},

			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			//选择规格
			selectSpec(index, pid) {
				let list = this.specChildList;
				list.forEach(item => {
					if (item.pid === pid) {
						this.$set(item, 'selected', false);
					}
				})
				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = [];
				list.forEach(item => {
					if (item.selected === true) {
						this.specSelected.push(item);
					}
				})
				console.log('选择', this.specSelected)
			},
			
			stopPrevent() {
				return
			},

			handleCountClick(val, index) {
				console.log(val, index)
				this.number=val;
				console.log('购买数量', this.number)
			},
			
			//-----------------------立即购买跳转路由-------------------------
			buyNowJump:function(){
				this.specClass = 'show';
			},
			
			buyNow:function(){
				if(this.number!==0){
					uni.navigateTo({
						url : 'osm_orderDetails'
					})
				}else{
					uni.showToast({
						title: '请选择购买数量',
						icon: 'none',
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色 
	page {
		background-color: #f6f6f6;
	}
	
	.returnButton{
		position: absolute;
		margin: 50upx 30upx;
		z-index: 999;
	}

	.ovof_dp_background {
		position: absolute;
		z-index: 999;
		top: 376upx;
	}

	.ovof_dp_bg_background {
		padding: 30upx;
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
		width: 100%;
		background: #FFFFFF;
	}

	.title {
		position: relative;
		padding-top: 20rpx;
		display: flex;
		width: 100%;
	}

	.ovof_dp_bg_title {
		width: 540upx;
		color: #333333;
		font-size: 40upx;
		font-weight: bold;
	}

	.ovof_dp_bg_cost {
		right: 0;
		font-size: 40upx;
		color: #EE6F2D;
		position: absolute;
	}

	.ovof_dp_bg_time {
		display: flex;
		margin-top: 20upx;

		.time {
			font-size: 30upx;
			color: #888;
		}

		.browse {
			font-size: 30upx;
			color: #888;
		}
	}

	.u-content {
		margin-top: 20upx;
		background: #FFFFFF;
		padding-left: 15upx;
		padding-right: 15upx;
		width: 100%;
	}

	.grClass {
		position: relative;
		display: flex;
		margin-top: 40upx;

		// padding-right: 40upx;
		.txImage {
			border-radius: 50%;
			width: 88upx;
			height: 88upx;
		}

		.grView {
			margin-left: 25upx;

			.name {
				display: flex;
				font-size: 32upx;
				color: #333333;

				.ladelView {
					border-radius: 5px;
					margin-left: 11upx;
					font-size: 20upx;
					color: #FFFFFF;
					text-align: center;
					width: 80upx;
					height: 35upx;
					line-height: 32upx;
					margin-top: 5upx;
				}
			}

			.number {
				display: block;
				font-size: 28upx;
				color: #aba9aa;
				padding-top: 10upx;
			}
		}

		.address {
			position: absolute;
			font-size: 32upx;
			color: #333333;
			right: 0;
			top: 16upx;
		}
	}


	//筛选样式
	.screen {
		height: 87upx;
		top: 0;
		z-index: 1;
		background: #FFFFFF;

		.screenView {
			left: 0;
			display: flex;
			width: 50%;
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
				font-size: 30upx;
				color: #888;
				position: relative;



				&.current {
					color: #22C704;
					// background-color: #FFFFFF;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 104upx;
						height: 0;
						border-bottom: 4upx solid #22C704;
					}
				}
			}
		}
	}

	.label {
		margin-top: 30upx;
		display: flex;

		.circle {
			width: 8upx;
			height: 8upx;
			background: #22C704;
			border-radius: 50%;
			margin-top: 18upx;
			margin-right: 10upx;
		}

		.text {
			font-size: 28upx;
			color: #333333;
			margin-right: 20upx;
		}
	}

	.c-list {
		font-size: 26upx;
		color: #606266;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 30upx 0 0 0;
			position: relative;
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: #303133;

			.selected-text {
				margin-right: 10upx;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 32vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: #FF6600;
				font-size: 30upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -76upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: 26upx;
				color: #606266;
				line-height: 42upx;

				.price {
					font-size: 32upx;
					color: #FF6600;
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: 30upx;
			color: #606266;
			padding-top: 30upx;
			padding-left: 10upx;
			padding-bottom: 16upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 8upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: 28upx;
				color: #303133;
			}

			.selected {
				background: #ffeee2;
				color: #FF6600;
			}
		}
	}
	
	.d-header{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		font-size: 30upx;
		color: #303133;
		position: relative;
			
		text{
			padding: 0 20upx;
			background: #fff;
			position: relative;
			z-index: 1;
		}
		&:after{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%);
			width: 300upx;
			height: 0;
			content: '';
			border-bottom: 1px solid #ccc; 
		}
	}
	
	//提交订单栏
	// .navigation {
	// 	display: flex;
	// 	position: fixed;
	// 	margin-top: 100rpx;
	// 	border: solid 2rpx #f2f2f2;
	// 	background-color: #ffffff;
	// 	padding: 16rpx 0;
	// 	width: 100%;
	// 	bottom:0;
	// 	.left {
	// 		display: flex;
	// 		font-size: 20rpx;
	// 		.item {
	// 			margin: 0 30rpx;
	// 			&.car {
	// 				text-align: center;
	// 				position: relative;
	// 				.car-num {
	// 					position: absolute;
	// 					top: -10rpx;
	// 					right: -10rpx;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	.right {
	// 		display: flex;
	// 		font-size: 28rpx;
	// 		align-items: center;
	// 		.btn {
	// 			line-height: 66rpx;
	// 			padding: 0 30rpx;
	// 			border-radius: 36rpx;
	// 			color: #ffffff;
	// 		}
	// 		.cart {
	// 			background-color: #ed3f14;
	// 			margin-right: 30rpx;
	// 		}
	// 		.buy {
	// 			background-color: #ff7900;
	// 		}
	// 	}
	// }
	
	//提交订单栏
	.navigation {
		display: flex;
		position: fixed;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		width: 100%;
		bottom:0;
		.left {
			display: flex;
			font-size: 20rpx;
			.item {
				margin: 0 30rpx;
				&.car {
					text-align: center;
					position: relative;
					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			position: relative;
			width: 100%;
			
			.button{
				width: 100%;
				text-align: right;
				margin-right: 20upx;
				
				.btn {
					line-height: 66upx;
					padding: 14upx 30upx;
					border-radius: 36upx;
					color: #ffffff;
				}
				.buy {
					background-color: #ed3f14;
				}
			}
		}
	}
</style>
