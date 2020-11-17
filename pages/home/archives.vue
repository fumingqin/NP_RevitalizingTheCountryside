<template>
	<view>
		<view class="map_view">
			<image class="map_view_image" :style="{'height':imageHeight}" src="../../static/home/archives/bj.png" mode="aspectFill"></image>
			<movable-area style="z-index: 2;">
				<movable-view style="width: 1342upx; height:800upx;" scale-min="0.5" scale-max="2" scale="true" inertia="true" direction='all' scale-value="0.5">
					<image class="movable_view_iamge" src="../../static/home/archives/ditu.png"></image>
					<view v-for="(item,index) in ruralList" :key="index" @click="ruralClick(item.name,index)">
						<view style="display: flex;" :class="item.fixed" v-if="item.iconSatus == false">
							<image class="movable_view_Sign_iamge" src="../../static/home/archives/zhen.png" mode="aspectFit" v-if="item.nameType == '镇'"></image>
							<image class="movable_view_Sign_iamge"  src="../../static/home/archives/xiang.png" mode="aspectFit" v-if="item.nameType == '村'"></image>
							<text class="movable_view_Sign_text" style="color: #FFFFFF;">{{item.name}}</text>
						</view>
						<view style="display: flex;" :class="item.fixed" v-if="item.iconSatus == true">
							<image class="movable_view_Sign_iamge"  src="../../static/home/archives/zhen2.png" mode="aspectFit" v-if="item.nameType == '镇'"></image>
							<image class="movable_view_Sign_iamge"  src="../../static/home/archives/xiang2.png" mode="aspectFit" v-if="item.nameType == '村'"></image>
							<text class="movable_view_Sign_text" style="color: #44f5ff;">{{item.name}}</text>
						</view>
					</view>
				</movable-view>
			</movable-area>
		</view>


		<!-- 搜索区域 -->
		<view class="inf_dis_view">
			<view class="dis_view_tips" style="color: #dddddd;">注：可通过双指缩放地图大小</view>
			<view class="dis_view_tips" style="color: #19BE6B;">注：可通过点击地图乡村/下方标签查看乡村信息</view>
			<!-- 输入框 -->
			<view class="box_inputView">
				<input class="inputStyle" v-model="contentInputData" type="text" placeholder="请输入关键字,目前仅支持建阳区内乡村" />
			</view>
			<scroll-view style="margin: 16upx 0;" scroll-x>
				<view style="display: flex;">
					<view class="box_scrollView" v-for="(item,index) in ruralList" :key="index" @click="ruralClick(item.name,index)">
						<text class="scrollView_text" :class="item.status ? 'scrollView_text_color' : ''">{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
			
			<!-- 查询流程 -->
			<view class="dis_view_view" v-if="loadStatus == true">
				<view class="dis_view_title">{{loadText}}</view>
				<view class="dis_view_text" :hidden="loadIndex < 1">查询乡村：{{loadRuralText}}</view>
				<view class="dis_view_text" :hidden="loadIndex < 2">查询内容：所有</view>
				<view class="dis_view_text" :hidden="loadIndex < 3">系统状态：正常</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				ruralList: [{
					name: '黄坑镇',
					nameType: '镇',
					fixed: 'fix_hukz',
					status: false,
					iconSatus: false,
				}, {
					name: '麻沙镇',
					nameType: '镇',
					fixed: 'fix_masz',
					status: false,
					iconSatus: false,
				}, {
					name: '书坊乡',
					nameType: '村',
					fixed: 'fix_shufx',
					status: false,
					iconSatus: false,
				}, {
					name: '莒口镇',
					nameType: '镇',
					fixed: 'fix_jukz',
					status: false,
					iconSatus: false,
				}, {
					name: '将口镇',
					nameType: '镇',
					fixed: 'fix_jiangkz',
					status: false,
					iconSatus: false,
				}, {
					name: '徐市镇',
					nameType: '镇',
					fixed: 'fix_xusz',
					status: false,
					iconSatus: false,
				}, {
					name: '崇雒乡',
					nameType: '村',
					fixed: 'fix_conglx',
					status: false,
					iconSatus: false,
				}, {
					name: '漳墩镇',
					nameType: '镇',
					fixed: 'fix_zhangdz',
					status: false,
					iconSatus: false,
				}, {
					name: '回龙乡',
					nameType: '村',
					fixed: 'fix_huilx',
					status: false,
					iconSatus: false,
				}, {
					name: '水吉镇',
					nameType: '镇',
					fixed: 'fix_shuijz',
					status: false,
					iconSatus: false,
				}], //乡村列表
				contentInputData: '', //搜索
				imageHeight: '1334upx', //手机屏幕高度
				ruralListIndex: -1, //数组默认值
				loadStatus: false, //加载状态
				loadIndex: 0, //加载数值，用于加载展示
				loadText: '正在查询乡村信息.', //加载文字提示
				loadRuralText: '', //文字乡村提示
			}
		},
		onLoad: function() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					this.imageHeight = res.windowHeight + 'px'
					// console.log(this.imageHeight)
				}
			})
		},
		methods: {

			//点击乡村显示效果
			ruralClick: function(name, index) {
				this.loadRuralText = name;
				this.loadStatus = false;
				this.loadIndex = 0;
				if (this.ruralListIndex == index) {
					this.ruralList[this.ruralListIndex].status = false;
					this.ruralList[this.ruralListIndex].iconSatus = false;
					this.ruralListIndex = -1;
				} else {
					if (this.ruralListIndex == -1) {
						this.ruralList[index].status = true;
						this.ruralList[index].iconSatus = true;
						this.ruralListIndex = index;
						this.loadTips();
					} else {
						this.ruralList[this.ruralListIndex].status = false;
						this.ruralList[this.ruralListIndex].iconSatus = false;
						this.ruralList[index].status = true;
						this.ruralList[index].iconSatus = true;
						this.ruralListIndex = index;
						this.loadTips();
					}
				}
			},

			//加载提示
			loadTips: function() {
				this.loadStatus = true;
				this.loadTestTips()
				var b = setInterval(() => {
					if (this.loadIndex == 3) {
						clearInterval(b);
					} else {
						this.loadIndex = this.loadIndex + 1;
					}
				}, 1000)
			},

			//设置加载定时器
			loadTestTips: function() {
				var a = setInterval(() => {
					if (this.loadStatus == false) {
						clearInterval(a);
					} else {
						if (this.loadText == '正在查询乡村信息.') {
							this.loadText = '正在查询乡村信息..'
						} else if (this.loadText == '正在查询乡村信息..') {
							this.loadText = '正在查询乡村信息...'
						} else if (this.loadText == '正在查询乡村信息...') {
							this.loadText = '正在查询乡村信息.'
						}
					}
				}, 1000)


			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #1f4856;
	}
	
	.map_view{
		height: 800upx;
		.map_view_image{
			width: 100%;
			z-index: 1; 
			position: absolute;
		}
		
		.movable_view_iamge{
			width: 1342upx; 
			height:378px; 
			padding:400upx 0upx 0upx 80upx; 
			position: relative;
		}
		
		.movable_view_Sign_iamge{
			width: 23upx; 
			height: 23upx; 
			padding-top:3upx;
		}
		.movable_view_Sign_text{
			font-size: 18upx; 
			margin-left: 4upx;
		}
	}






	//输入区域
	.box_inputView {
		background: #FFFFFF;
		border-radius: 60upx;
		margin: 16upx 24upx;

		.inputStyle {
			height: 96upx;
			padding: 0 44upx;
			font-size: 30upx;
		}
	}

	//滑动区域
	.box_scrollView {
		margin: 40upx 0;
		white-space: nowrap;

		.scrollView_text {
			margin-left: 24upx;
			padding: 16upx 32upx;
			font-size: 28upx;
			color: #EEEEEE;
			border: 1upx solid #EEEEEE;
			border-radius: 8upx;
		}

		.scrollView_text_color {
			color: #19BE6B;
			border: 1upx solid #19BE6B;
		}
	}
	
	//搜索区域样式
	.inf_dis_view {
		z-index: 3;
		position: sticky;
		top: 0;
		.dis_view_tips{
			padding: 12upx 24upx; 
		}
		
		.dis_view_view {
			padding: 10upx 24upx;

			.dis_view_title {
				color: #19BE6B;
				font-weight: bold;
				font-size: 34upx;
			}

			.dis_view_text {
				color: #FFFFFF;
				margin: 10upx 0;
			}
		}

	}



	//-----------------------从这里开始是乡村的地图固定坐标---------------------------------------
	.fix_hukz {
		position: absolute;
		left: 206upx;
		top: 586upx;
	}

	.fix_masz {
		position: absolute;
		left: 400upx;
		top: 804upx;
	}

	.fix_shufx {
		position: absolute;
		left: 394upx;
		top: 896upx;
	}

	.fix_jukz {
		position: absolute;
		left: 540upx;
		top: 834upx;
	}

	.fix_jiangkz {
		position: absolute;
		left: 696upx;
		top: 736upx;
	}

	.fix_xusz {
		position: absolute;
		left: 708upx;
		top: 1006upx;
	}

	.fix_conglx {
		position: absolute;
		left: 794upx;
		top: 684upx;
	}

	.fix_zhangdz {
		position: absolute;
		left: 1046upx;
		top: 608upx;
	}

	.fix_huilx {
		position: absolute;
		left: 1024upx;
		top: 696upx;
	}

	.fix_shuijz {
		position: absolute;
		left: 1016upx;
		top: 762upx;
	}
</style>
