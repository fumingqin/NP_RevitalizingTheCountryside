<template>
	<view>
		<!-- 轮播区 -->
		<u-swiper :list="imageinfo" :height="422" indicator-pos="bottomRight">
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
					<image  class="txImage" src="../../static/face.jpg" mode="aspectFill"></image>
					<view class="grView">
						<view class="name">村支书：{{groupTitle.secretary_name}}</view>
					</view>
				</view>
			</view>
			
			<view class="u-content">
				
				<!-- 顶部滑动 -->
				<view class="screen">
					<view class="screenView">
						<view class="screenText" :class="{current:type===0}" @click="tabClick(0)"> 
							基础信息：
						</view>
					</view>
				</view>
					<u-read-more v-if="type==0" :toggle="toggle" :show-height="showHeight">
							<view class="ditailsView">
								<view class="detailsname">是否位于政府驻地</view>
								<view v-if="groupTitle.is_government_region==false" class="detailsage">否</view>
								<view v-if="groupTitle.is_government_region==true" class="detailsage">是</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">村集体自主经营性收入</view>
								<view class="detailsage">{{groupTitle.collective_income}}元</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">农村居民人均收入可支配收入</view>
								<view class="detailsage">{{groupTitle.average_income}}元</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">户籍户数</view>
								<view class="detailsage">{{groupTitle.households_count}}户</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">户籍人口数</view>
								<view class="detailsage">{{groupTitle.inhabitant_count}}人</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">常住人口数</view>
								<view class="detailsage">{{groupTitle.always_live_count}}人</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">16-60岁常住人口</view>
								<view class="detailsage">{{groupTitle.small_sixty_count}}人</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">60岁以上常住人口</view>
								<view class="detailsage">{{groupTitle.large_sixty_count}}人</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">地形地貌</view>
								<view class="detailsage">{{groupTitle.terrain_landforms}}</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">村域面积</view>
								<view class="detailsage">{{groupTitle.space}}KM2</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">耕地面积</view>
								<view class="detailsage">{{groupTitle.land_space}}亩</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">林地面积</view>
								<view class="detailsage">{{groupTitle.forest_space}}亩</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">山垅田面积</view>
								<view class="detailsage">{{groupTitle.mountain_space}}亩</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">村庄建筑用地面积</view>
								<view class="detailsage">{{groupTitle.available_space}}亩</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">自然村数量</view>
								<view class="detailsage">{{groupTitle.natural_count}}个</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">农村住房总户数</view>
								<view class="detailsage">{{groupTitle.housing_count}}户</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">常年无人居住住房户数</view>
								<view class="detailsage">{{groupTitle.no_housing_count}}户</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">省级以上农民专业合作示范社数量</view>
								<view class="detailsage">{{groupTitle.cooperation_count}}个</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">省级以上家庭农场数量</view>
								<view class="detailsage">{{groupTitle.farm_count}}个</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">集中供水率</view>
								<view class="detailsage">{{groupTitle.water_rate}}%</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">垃圾收集处理率</view>
								<view class="detailsage">{{groupTitle.garbage_rate}}%</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">污水处理率</view>
								<view class="detailsage">{{groupTitle.bad_water_rate}}%</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">通自然村道路硬化数</view>
								<view class="detailsage">{{groupTitle.road_harden_count}}</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">通光纤宽带自然村数</view>
								<view class="detailsage">{{groupTitle.bandwidth_count}}</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">年垃圾处理费</view>
								<view class="detailsage">{{groupTitle.handle_garbage}}元</view>
							</view>
							<view class="ditailsView">
								<view class="detailsname">公共垃圾收集桶</view>
								<view class="detailsage">{{groupTitle.garbage_barrel}}个</view>
							</view>
							
						<view v-if="groupTitle.length==0" style="padding-top:150upx;">
							<u-empty :isShow="groupTitle.length==0" text="暂无数据" textColor="#999999"></u-empty>
						</view>
					</u-read-more>
					
				<!-- 	<u-read-more v-if="type==1" :toggle="toggle" :show-height="showHeight">
						<view>总人口:{{groupTitle.total_people}}人</view>	
						<view style="height: 400upx;">
						<view v-if="streetinfo.length!=0" class="ditailsView">
							<view class="detailsroad">街道名</view>
							<view class="detailsroadcount">户数</view>
							<view class="detailscount">人口</view>
						</view>
						<view class="infor_view" v-for="(item,index) in streetinfo" :key="index">
							<view class="ditailsView">
								<view class="detailsroad">{{item.road}}</view>
								<view class="detailsroadcount">{{item.road_count}}</view>
								<view class="detailscount">{{item.count}}</view>
							</view>
						</view>
						<view v-if="streetinfo.length==0" style="margin-top:150upx;">
							<u-empty :isShow="streetinfo.length==0" text="暂无数据" textColor="#999999"></u-empty>
						</view>
						</view>
					</u-read-more> -->
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
				imageinfo:[],
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
						ruralId : this.id,
					},
					success: (res) => {
						console.log('详情', res)
						if(res.data.status == true){
							var a = JSON.parse(res.data.data.image_address);
							this.imageinfo.push(a);
							this.groupTitle=res.data.data;
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
					let array=param.split('T');
					let array2=array[1].split(':');
					var a=array[0]+' '+array2[0]+':'+array2[1];
					return a;
					}
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
			width: 66upx;
			height: 66upx;
		}
	
		.grView {
			margin-left: 25upx;
			.name {
				display: flex;
				font-size: 32upx;
				color: #333333;
				margin-top: 16upx;
	
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
				// justify-content: center;
				// align-items: center;
				padding:30upx 60upx;
				height: 100%;
				font-size: 36upx;
				font-weight: 500;
				color: #000000;
				position: relative;
				margin-bottom: 10upx;



				// &.current {
				// 	color: #70c778;
				// 	// background-color: #FFFFFF;

				// 	&:after {
				// 		content: '';
				// 		position: absolute;
				// 		left: 50%;
				// 		bottom: 0;
				// 		transform: translateX(-50%);
				// 		width: 104upx;
				// 		height: 0;
				// 		border-bottom: 4upx solid #70c778;
				// 	}
				// }
			}
		}
	}
	.ditailsView {
		position: relative;
		display: flex;
		.detailsname{
			width: 450upx;
			padding: 8upx 0upx;
			font-size: 26upx;
			color: #000000;
		}
		.detailsage {
			position: absolute;
			left: 0;
			margin-left: 550upx;
			font-size: 26upx;
			color: #000000;
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
			padding: 8upx 0upx;
			margin-right: 16upx;
			// text-align: center;
			font-size: 30upx;
		}
		.detailsroadcount {
			position: absolute;
			left: 0;
			margin-left: 250upx;
			font-size: 30upx;
		}
		.detailscount {
			position: absolute;
			left: 0;
			margin-left: 500upx;
			font-size: 30upx;
		}
		}
</style>
