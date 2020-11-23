<template>
	<view>
		<!-- 轮播区 -->
		<u-swiper :list="groupTitle.image" :height="422" indicator-pos="bottomRight">
			<u-loading slot="loading"></u-loading>
			<view slot="error" style="font-size: 24rpx;">加载失败</view>
		</u-swiper>
		
		<view class="ovof_dp_background">
			<view style="width: 750upx;"></view>
			<view class="ovof_dp_bg_background">
				<view class="ovof_dp_bg_title">{{groupTitle.city_name}}-{{groupTitle.county_name}}-{{groupTitle.village_name}}</view>
				<view class="ovof_dp_bg_time">
					<text class="time">{{gettime(groupTitle.create_time)}}</text>
				</view>
				<view class="grClass">
					<image v-if="groupTitle.avatar!==''" class="txImage" :src="groupTitle.head_avatar" mode="aspectFill"></image>
					<image v-if="groupTitle.avatar==''" class="txImage" src="../../static/missing-face.png" mode="aspectFill"></image>
					<view class="grView">
						<view class="name">{{groupTitle.head_name}}</view>
					</view>
				</view>
			</view>
			
			<view class="u-content">
				
				<!-- 顶部滑动 -->
				<view class="screen">
					<view class="screenView">
						<view class="screenText" :class="{current:type===0}" @click="tabClick(0)"> 
							职责人员
						</view>
						<view class="screenText" :class="{current:type===1}" @click="tabClick(1)">
							包含街道
						</view>
					</view>
				</view>
				
				<u-read-more v-if="type==0" :toggle="toggle" :show-height="showHeight">
					<view class="ditailsView">
						<view class="detailsname" style="color: #000000;font-size: 30upx;">姓名</view>
						<view class="detailsage">年龄</view>
						<view class="detailstele">联系电话</view>
						<view class="detailsduty">职责</view>
					</view>
					<view class="infor_view" v-for="(item,index) in crewinfo" :key="index">
						<view class="ditailsView">
							<view class="detailsname">{{item.name}}</view>
							<view class="detailsage">{{item.age}}</view>
							<view class="detailstele">{{item.telephone}}</view>
							<view class="detailsduty">{{item.duty}}</view>
						</view>
					</view>
				</u-read-more>
				
				<u-read-more v-if="type==1" :toggle="toggle" :show-height="showHeight">
					<view class="ditailsView">
						<view class="detailsroad">街道名</view>
						<view class="detailsroadcount">总户数</view>
						<view class="detailscount">总人口</view>
					</view>
					<view class="infor_view" v-for="(item,index) in streetinfo" :key="index">
						<view class="ditailsView">
							<view class="detailsroad">{{item.road}}</view>
							<view class="detailsroadcount">{{item.road_count}}</view>
							<view class="detailscount">{{item.count}}</view>
						</view>
					</view>
				</u-read-more>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rotationChart: [], //轮播图
				groupTitle:[],
				crewinfo:[],
				streetinfo:[],
				title:'农田基础建设项目',
				time:'2020-02-10',
				browse:'122',
				showHeight:600,
				toggle: false,
				post:'市级职责人员',
				type: 0,
				id:'',
				// 字符串的形式
				style: {
					// p: 'letter-spacing: 4rpx;text-align: justify;line-height: 48rpx;font-size:30rpx;text-justify: inter-ideograph;padding-bottom: 20rpx;padding-top: 20rpx;',
					span: 'font-size: 30rpx'
				},
			}
		},
		
		onLoad:function(param) {
			uni.showLoading({
				title: '加载详情中...',
			})
			this.id = param.id;
			console.log(this.id)
			this.loadData();
		},
		
		methods: {
			//加载数据
			loadData: function() {
				uni.request({
					url:this.$newycyd.KyInterface.getArchivesByRuralId.Url,
					method:this.$newycyd.KyInterface.getArchivesByRuralId.method,
					data:{
						ruralId : 8
					},
					success: (res) => {
						console.log('详情', res)
						if(res.data.status == true){
							this.groupTitle=res.data.data;
							this.crewinfo=res.data.data.duty;
							this.streetinfo=res.data.data.info;
							uni.stopPullDownRefresh();
							uni.hideLoading();
						}else{
							uni.stopPullDownRefresh();
							uni.hideLoading();
							uni.showToast({
								title: '暂无列表信息',
								icon: 'none'
							})
						}
						// console.log('111111111',this.rotationChart)
					},
					fail: function() {
						uni.hideLoading();
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						})
					}
				})
			},
			onSuccess(res) {
				console.log('上传成功回调',JSON.stringify(res));
				uni.showToast({
					title: JSON.stringify(res),
					icon: 'none'
				})
			},
			//-------------------时间切割---------------------------
			gettime:function(param){
				if(param==''||param==undefined){
					return '暂无';
				}else{
					let array=param.split(' ');
					let array2=array[1].split(':');
					var a=array[0]+' '+array2[0]+':'+array2[1];
					return a;
					}
			},
			//----------------预览--------------------
			onOpenDoc(e) {
				let url = e;
				/* 下载返回临时路径（退出应用失效） */
				this.$refs.lFile.download(url)
				.then(path=>{
					/* 预览 */
					this.$refs.lFile.open(path);
				});
			},
			//--------------下载---------------------
				onDown(e) {
					let url = e;
					this.$refs.lFile.download(url,'local')
					.then(path=>{
						console.log(path);
					}); 
				},
			tabClick(e) {
				if (e == 0) {
					this.type = 0;
				} else if (e == 1) {
					this.type = 1;
				}else if (e == 2) {
					this.type = 2;
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
	
	.ovof_dp_background{
		position: absolute;
		z-index: 999;
		top: 376upx;
	}
	
	.ovof_dp_bg_background{
		padding: 30upx;
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
		width: 100%;
		background: #FFFFFF;
	}
	
	.ovof_dp_bg_title{
		color: #333333;
		font-size: 40upx;
		font-weight: bold;
		padding-top: 20rpx;
	}
	
	.ovof_dp_bg_time{
		display: flex;
		margin-top: 20upx;
		
		.time{
			font-size: 30upx;
			color: #888;
		}
		
		.browse{
			padding-left: 20upx;
			font-size: 30upx;
			color: #888;
		}
	}
	
	.u-content{
		// margin-top: 20upx;
		background: #FFFFFF;
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
		position: sticky;
		top: 0;
		z-index: 1;
		background: #FFFFFF;

		.screenView {
			left: 0;
			display: flex;
			width: 60%;
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
				margin-left: 10upx;



				&.current {
					color: #70c778;
					// background-color: #FFFFFF;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 104upx;
						height: 0;
						border-bottom: 4upx solid #70c778;
					}
				}
			}
		}
	}
	.uploader_video{
	    position: relative;
	    z-index: 1;
	    width: 200upx;
	    height: 200upx;
		margin-top: 30upx;
		margin-bottom: 30upx;
	}
	.at_button {
		text-indent : 0em;
		padding: 16upx 68upx;
		// font-size: 24upx;
		border-radius: 6upx;
		border: 1upx solid #888;
		color: #888;
		margin-right: 24upx;
	}
	.ditailsView {
		position: relative;
		display: flex;
		.detailsroad{
			padding: 8upx 20upx;
			margin-right: 16upx;
			// text-align: center;
			font-size: 30upx;
		}
		.detailsage {
			position: absolute;
			left: 0;
			margin-left: 150upx;
			font-size: 30upx;
		}
		.detailstele {
			position: absolute;
			left: 0;
			margin-left: 300upx;
			font-size: 30upx;
		}
		.detailsduty {
			position: absolute;
			right: 0;
			font-size: 30upx;
		}
		.detailsroad{
			padding: 8upx 20upx;
			margin-right: 16upx;
			// text-align: center;
			font-size: 30upx;
		}
		.detailsroadcount {
			position: absolute;
			left: 0;
			margin-left: 300upx;
			font-size: 30upx;
		}
		.detailscount {
			position: absolute;
			right: 0;
			font-size: 30upx;
		}
		}
</style>
