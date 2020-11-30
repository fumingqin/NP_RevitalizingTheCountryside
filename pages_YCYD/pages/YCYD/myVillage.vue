<template>
	<view>
			<!-- 内容1 -->
			<view>
				<view class="tab">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#3DABFC"></uni-segmented-control>
				</view>
				<view v-if="current === 0" style="margin-top: 20rpx;">
				<view class="infor_view" v-if="villageHead!=''">
					<view class="view_titleView">
						<view class="tv_view">
							<view style="display: flex;">
								<view style="margin-top: 10upx;">
									<text class="tv_label">村长</text>
								</view>
								<view class="tv_title">{{villageHead.head_name}}</view>
							</view>
							<view class="tv_view2">
								<view class="tv_richText">年龄：{{villageHead.head_age}}</view>
								<view class="tv_richText">电话：{{villageHead.head_telephone}}</view>
								<view class="tv_richText">任职年数：{{villageHead.head_year}}</view>
							</view>
						</view>
						<image class="tv_image" :src="villageHead.head_avatar" mode="aspectFill"></image>
					</view>
					
					<view class="view_contentView">
						<text class="cont_text">记录时间：{{gettime(villageHead.create_time)}}</text>
						<view class="at_buttonView">
						<view class="at_button2 at_btDelete" @tap="UpdateHead(villageHead)">修改</view>
						</view>
					</view>
					<u-gap height="4" bg-color="#f9f9f9"></u-gap>
				</view>
				<view v-if="villageHead==''" style="margin-top: 500upx;">
					<u-empty :isShow="villageHead==''" text="暂无数据" textColor="#999999"></u-empty>
				</view>
				</view>
				<view v-if="current === 1" style="margin-top: 20rpx;">
					<view class="infor_view" v-for="(item,index) in villageCrewinfo" :key="index">
						<view class="view_titleView">
							<view class="tv_view">
								<view style="display: flex;">
									<view style="margin-top: 10upx;">
										<text class="tv_label">{{item.duty}}</text>
									</view>
									<view class="tv_title">{{item.name}}</view>
								</view>
								<!-- <text class="tv_richText">{{item.content}}</text> -->
								<view class="tv_view2">
								<view class="tv_richText">年龄：{{item.age}}</view>
								<view class="tv_richText">电话：{{item.telephone}}</view>
								<view class="tv_richText">任职年数：{{item.duty_year}}</view>
								</view>
							</view>
							<view class="at_buttonView">
							<view class="at_button at_btDelete" @tap="UpdateCrew(item)">修改</view>
							<view class="at_button at_btDelete" @tap="DeleteCew(item.id)">删除</view>
							</view>
						</view>
						
						<view class="view_contentView">
							<text class="cont_text">修改时间：{{gettime2(item.update_time)}}</text>
						</view>
						<u-gap height="4" bg-color="#f9f9f9"></u-gap>
					</view>
					<view v-if="villageCrewinfo.length==0" style="margin-top: 500upx;">
						<u-empty :isShow="villageCrewinfo.length==0" text="暂无数据" textColor="#999999"></u-empty>
					</view>
				</view>
				<view v-if="current === 2" style="margin-top: 20rpx;">
					<view class="infor_view" v-for="(item,index) in villageStreetinfo" :key="index">
						<view class="view_titleView">
							<view class="tv_view">
								<view style="display: flex;">
									<view style="margin-top: 10upx;">
										<text class="tv_label">街道</text>
									</view>
									<view class="tv_title">{{item.road}}</view>
								</view>
								<view class="tv_view2">
									<view class="tv_richText">总户数：{{item.road_count}}户</view>
									<view class="tv_richText">总人口：{{item.count}}人</view>
								</view>
							</view>
							<view class="at_buttonView">
							<view class="at_button at_btDelete" @tap="UpdateStreet(item)">修改</view>
							<view class="at_button at_btDelete" @tap="DeleteStreet(item.id)">删除</view>
							</view>
						</view>
						
						<view class="view_contentView">
							<text class="cont_text">上架时间：{{gettime2(item.update_time)}}</text>
						</view>
						<u-gap height="4" bg-color="#f9f9f9"></u-gap>
					</view>
					<view v-if="villageStreetinfo.length==0" style="margin-top: 500upx;">
						<u-empty :isShow="villageStreetinfo.length==0" text="暂无数据" textColor="#999999"></u-empty>
					</view>
				</view>
				<view class="btn" @click="entering(villageHead.head_id)">录入信息</view>
			</view>
		</view>
	</template>
</template>

<script>
	import uniSegmentedControl from "@/components/Order/uni-segmented-control/uni-segmented-control.vue";
	export default {
		components:{
			uniSegmentedControl,
		},
		data() {
			return {
				id:0,
				items: ['村长', '职责人员', '街道'],
				current: 0,
				groupTitle:[],
				villageHead:'',
				villageCrewinfo:[],
				villageStreetinfo:[],
				selectId:'',//去出id
				selectIndex:0,//下标
				loadingType: 0, //加载更多状态
				loadingText:{
					down :'上拉加载更多',
					refresh : '正在加载...',
					nomore : '没有更多了',
				},
				scenicListIndex:5,//列表默认数量}
				}
		},
		onLoad() {
			uni.getStorage({
				key: 'userInfo',
				fail() {
					uni.showToast({
						icon: 'none',
						title: '暂未登录,请登录后查看'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/GRZX/userLogin'
						})
					}, 500);
				}
			});
			uni.showLoading({
				title: '加载列表中...',
			})
			
		},
		onShow() {
			this.villageData();
		},
		onPullDownRefresh: function() {

			this.villageData();
		},
		
		onReachBottom() {
			this.getMore();
		},
		
		methods: {
			//-----------------------------------------
			onClickItem(e) { //tab点击事件
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			//----------------------列表接口--------------------------------
			villageData:function(){
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res.data.rId)
				uni.request({
					url:this.$newycyd.KyInterface.getArchivesByRuralId.Url,
					method:this.$newycyd.KyInterface.getArchivesByRuralId.method,
					data:{
						ruralId :55,
					},
					success:(res) =>{
						this.groupTitle=[],
						this.villageHead='',
						this.villageCrewinfo=[],
						this.villageStreetinfo=[],
						console.log('列表数据',res)
						if(res.data.status == true){
						if(res.data.data.head_id!=0){
							this.villageHead=res.data.data;
						}
							this.villageCrewinfo=res.data.data.duty;
							console.log(this.villageCrewinfo)
							this.villageStreetinfo=res.data.data.info;
							console.log(this.villageStreetinfo)
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
					},
					fail(res) {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						})
						// console.log(res)
					},
					complete() {
						setTimeout(function(){
							if(this.groupTitle==''){
								uni.hideLoading();
								uni.showToast({
									title: '服务器异常',
									icon: 'none'
								})
							}
						},3000);
					}
				})
				}
				})
			},
			 entering:function(e){
				uni.navigateTo({
					url:'choice?id='+e
				});
			 },
			//-------------------------修改村长-------------------------
			UpdateHead: function(e) {
				console.log(e)
				uni.setStorage({
					key: 'villageHead',
					data: e,
					success: (res) => {
						console.log(res)
						uni.navigateTo({
							url: 'addVillageHead?id=1'
						});
					},
					fail: function(res) {
						console.log(res)
						uni.showToast({
							title: '网络异常',
							icon: 'none'
						})
					},
				})
			},
			//-----------修改职责人员-------------
			UpdateCrew: function(e) {
				console.log(e)
				uni.setStorage({
					key: 'villageCrew',
					data: e,
					success: (res) => {
						console.log(res)
						uni.navigateTo({
							url: 'addVillageCrew?id=1'
						});
					},
					fail: function(res) {
						console.log(res)
						uni.showToast({
							title: '网络异常',
							icon: 'none'
						})
					},
				})
			},
			//---------------修改街道----------------------
			UpdateStreet: function(e) {
				console.log(e)
				uni.setStorage({
					key: 'villageStreet',
					data: e,
					success: (res) => {
						console.log(res)
						uni.navigateTo({
							url: 'addVillageStreet?id=1'
						});
					},
					fail: function(res) {
						console.log(res)
						uni.showToast({
							title: '网络异常',
							icon: 'none'
						})
					},
				})
			},
			//--------------删除街道--------------
			DeleteStreet:function(e){
				uni.showLoading({
					title: '删除中...',
				})
				uni.request({
					url:this.$newycyd.KyInterface.deleteVillageInfo.Url,
					method:this.$newycyd.KyInterface.deleteVillageInfo.method,
					data:{
						id:e,
					},
					success:(res) =>{
						console.log(res)
						if(res.data.status){
							uni.showToast({
								title: '删除成功',
								icon: 'none'
							})
							uni.hideLoading();
							this.villageData();
						}else{
							uni.showToast({
								title: '删除失败',
								icon: 'none'
							})
						}
					},
					fail(res) {
						uni.hideLoading();
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						})
						// console.log(res)
					}
				})
			},
			//--------------删除职责人员-------------------
			DeleteCew:function(e){
				uni.showLoading({
					title: '删除中...',
				})
				uni.request({
					url:this.$newycyd.KyInterface.deleteVillagePeople.Url,
					method:this.$newycyd.KyInterface.deleteVillagePeople.method,
					data:{
						id:e,
					},
					success:(res) =>{
						console.log(res)
						if(res.data.status){
							uni.showToast({
								title: '删除成功',
								icon: 'none'
							})
							uni.hideLoading();
							this.villageData();
						}else{
							uni.showToast({
								title: '删除失败',
								icon: 'none'
							})
						}
					},
					fail(res) {
						uni.hideLoading();
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						})
						// console.log(res)
					}
				})
			},
			//-------------加载更多----------------
			getMore(){
				this.loadingType = 1;
				
				if(this.scenicListIndex < this.groupTitle.length){
					var a = this.scenicListIndex +6;
					this.scenicListIndex = a;
					this.loadingType = 0;
				}
				if(this.scenicListIndex >= this.groupTitle.length){
					this.loadingType = 2;
				}
			},
			
			//-------------------时间切割---------------------------
			gettime:function(param){
				if(param==''||param==undefined){
					return '暂无';
				}else{
					let array=param.split(' ');
					var a=array[0];
					return a;
					}
			},
			gettime2:function(param){
				if(param==''||param==undefined){
					return '暂无';
				}else{
					let array=param.split('T');
					var a=array[0];
					return a;
					}
			},
			//--------------------------路由跳转------------------------------
			details:function(e){
				uni.redirectTo({
					url:'villageDetails?id=' +e,
				})
			}
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #FFFFFF;
	}
	
	.to_scroll {
		display: flex;
		white-space: nowrap;
		width: 100%;
		
		
	}
	
	//资讯列表样式
	.infor_view{
		padding: 0 32upx; 
		margin-top: 32upx;
		.view_titleView{
			display: flex;
			.tv_view{
				// display: flex;
				// padding-right: 32upx; 
				// width: 468upx; 
				
				.tv_label{
					font-size: 24upx; 
					background: #007AFF; 
					color: #FFFFFF; 
					padding: 4upx 8upx; 
					border-radius: 4upx;
				}
				.tv_title{
					position: relative;
					font-weight: bold; 
					font-size: 34upx; 
					margin-left: 12upx; 
					line-height: 1.7;
					width: 320upx;
					white-space: nowrap;
					overflow: hidden;
				}
				
				.tv_view2{
					display: block;
					padding-top: 10upx;
					position: relative;
					
					.tv_richText{
						padding-right: 16upx;
						width: 454upx;
						line-height: 1.7;
						height: 44upx;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
			}
			
			
			.tv_image{
				width: 220upx; 
				height: 160upx; 
				border-radius: 8upx;
			}
		}
		.view_contentView{
			font-size: 24upx; 
			color: #AAAAAA; 
			padding: 22upx 0; 
			.cont_text{
				// margin-left: 20upx;
			}
			.cont_icon{
				float: right; 
				padding: 12upx 0;
				margin-right: 16upx;
			}
		}
	}
	.tab {
		position: sticky;
		top: 0upx;
		background: #f5f5f5;
		height: 140upx;
		z-index: 99999;
	
	}
	.at_buttonView {
			float: right;
	
			// 按钮
			.at_button2 {
				padding: 10upx 30upx;
				font-size: 20upx;
				border-radius: 6upx;
				margin-bottom: 20upx;
				margin-right: 70upx;
			}
			.at_button {
				padding: 24upx 48upx;
				font-size: 20upx;
				border-radius: 6upx;
				margin-bottom: 20upx;
			}
			.at_btDelete {
				border: 1upx solid #ff0000;
				color: #ff0000;
			}
		}
		.btn{
			position: fixed;
			bottom: 10upx;
			left: 0;
			right: 0;
			padding: 24upx 0;
			border-radius: 64upx;
			margin: 0 76upx;
			background: #FC4646;
			text-align: center;
			color: #FFFFFF;
			font-size: 32upx;
			font-weight: 400;
			box-shadow: 0px 0.2px 0px #aaa;
		}
</style>
