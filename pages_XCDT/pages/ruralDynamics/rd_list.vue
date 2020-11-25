<template>
	<view>
		<!-- 头部切换栏 -->
		<u-tabs :list="headList" :is-scroll="false" :current="headCurrent" @change="headChange" height="104"></u-tabs>
		
		<!-- 内容1 -->
		<view class="infor_view" :class="{'select':selectIndex == index}" v-for="(item,index) in groupTitle" :key="index" @click="selectClick(index)">
			<view class="view_titleView">
				<view class="tv_view">
					<view style="display: flex;">
						<view style="margin-top: 10upx;">
							<text class="tv_label" v-if="item.article_type=='村容村貌'" style="background: #007AFF;">{{item.article_type}}</text>
							<text class="tv_label" v-if="item.article_type=='环境整治'" style="background: #18B566;">{{item.article_type}}</text>
							<text class="tv_label" v-if="item.article_type=='企业帮扶'" style="background: #F29100;">{{item.article_type}}</text>
							<text class="tv_label" v-if="item.article_type=='三化管理'" style="background: #E3424B;">{{item.article_type}}</text>
						</view>
						<view class="tv_title">{{item.title}}</view>
					</view>
					<!-- <text class="tv_richText">{{item.content}}</text> -->
					<view class="tv_view2">
						<text class="tv_richText">{{item.introduce}}</text>
						<!-- <rich-text class="tv_richText" :nodes="item.content"></rich-text> -->
					</view>
				</view>
				<image class="tv_image" :src="item.image" mode="aspectFill"></image>
			</view>
			
			<view class="view_contentView">
				<text>{{item.nick_name}}</text>
				<text class="cont_text">{{item.count}}人看过</text>
				<text class="cont_text">{{informationDate(item.create_time)}}</text>
				<text class="cont_icon" style="color: #007AFF;" v-if="item.state=='已上架'">发布中</text>
				<text class="cont_icon" style="color: #FC4646;" v-if="item.state=='已下架'">未发布</text>
				<!-- <u-icon class="cont_icon" name="more-dot-fill"></u-icon> -->
			</view>
			<u-gap height="4" bg-color="#f9f9f9"></u-gap>
			<!-- <view style="text-align: center; margin-bottom: 20upx; font-size: 28upx; color: #aaa;">
				<text>{{loadingType=== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
			</view> -->
		</view>
		<view  style="padding-bottom: 180upx;"></view>
		<view>
			<view class="to_view">
				<scroll-view class="to_scroll" scroll-x="true">
					<u-button type="success" :ripple="true" shape="square" ripple-bg-color="#909399" size="medium" :custom-style="customStyle" @click="routeJump2">添加</u-button>
					<u-button type="success" :ripple="true" shape="square" ripple-bg-color="#909399" size="medium" :custom-style="customStyle" @click="routeJump(groupTitle[selectIndex].id)">详情</u-button>
					<u-button type="success" :ripple="true" shape="square" ripple-bg-color="#909399" size="medium" :custom-style="customStyle" @click="modifyJump(groupTitle[selectIndex])">修改</u-button>
					<u-button type="success" :ripple="true" shape="square" ripple-bg-color="#909399" size="medium" :custom-style="customStyle" @click="Delete(groupTitle[selectIndex].id)">删除</u-button>
					<!-- <u-button type="success" :ripple="true" shape="square" ripple-bg-color="#909399" size="medium" :custom-style="customStyle" @click="onTheShelf(groupTitle[selectIndex].id)">{{release}}</u-button> -->
					<u-button type="success" :ripple="true" shape="square" ripple-bg-color="#909399" size="medium" :custom-style="customStyle" @click="onTheShelf(groupTitle[selectIndex].id)">上下架</u-button>
				</scroll-view>
			</view>
		</view>
		
		<!-- 缺省提示 -->
		<view style="margin-top: 250upx;" v-if="groupTitle.length ==0">
			<u-empty text="该分类没有相关档案哦~" mode="news"></u-empty>
		</view>
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				headList: [{
					name: '全部'
				},{
					name: '村容村貌'
				},{
					name: '环境整治'
				},{
					name: '企业帮扶'
				},{
					name: '三化管理'
				}], //头部数组
				headCurrent: 0, //头部tabs下标
				customStyle: { //button样式
					paddingTop: '25px',
					paddingBottom: '25px',
					paddingLeft: '30px',
					paddingRight: '30px',
					marginRight: '16px',
					background: '#FFFFFF',
					borderRadius: '10px',
					color: '#007AFF',
					fontSize:'17px',
					border:'#007AFF solid 1rpx',
					
				},
				groupTitle:[],
				selectId:'',//去出id
				selectIndex:0,//下标
				loadingType: 0, //加载更多状态
				loadingText:{
					down :'上拉加载更多',
					refresh : '正在加载...',
					nomore : '没有更多了',
				},
				scenicListIndex:5,//列表默认数量
				userInfo:[],
				state:'修改',
				release:'',
			}
		},
		
		onShow() {
			uni.showLoading({
				title: '加载列表中...',
			})
			this.userData();
		},
		
		onUnload() {
			uni.hideLoading();
		},
		
		onPullDownRefresh: function() {
			uni.showLoading({
				title: '加载列表中...',
			})
			this.userData();
		},
		
		onReachBottom() {
			// this.getMore();
		},
		
		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData:function() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						console.log('获取个人信息',this.userInfo)
						this.ycydData();
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title:'您暂未登录，已为您跳转登录页面',
							icon:'none',
							success: () => {
								uni.navigateTo({
									url : '../../../pages/GRZX/userLogin'
								})
							}
						})
					}
				});
			},
			
			//--------------------点击列表事件------------------------------
			selectClick:function(e){
				//给选择的下标赋值
				this.selectIndex = e;
				// this.release=this.groupTitle[e].state=='已上架'?'下架':'发布';
				console.log('上车点下标赋值',this.selectIndex)
				//取出id
				// this.selectId = this.groupTitle[e].id;
				// console.log('取出id',this.selectId)
			},
			
			//--------------------资讯时间-------------------------------
			informationDate:function(e){
				console.log(e)
				// var tsetDate = e.replace('T',' ')
				var a = e.substr(0,10)
				return a;
			},
			
			//----------------------点击tab切换----------------------------
			headChange: function(e) {
				this.headCurrent = e;
				uni.showLoading({
					title: '加载信息中...'
				})
				this.ycydData(e);
			},
			
			
			//----------------------列表接口--------------------------------
			ycydData:function(e){
				uni.showLoading({
					title: '加载列表中...',
				})
				this.groupTitle = [],
				uni.request({
					url:this.$ycyd.KyInterface.getArchivesByUserID.Url,
					method:this.$ycyd.KyInterface.getArchivesByUserID.method,
					data:{
						userId:this.userInfo.userId,
						// userId: 100006,
					},
					success:(res) =>{
						console.log('列表数据',res)
						if(res.data.status == true){
							if (this.headCurrent == 0) {
								uni.hideLoading();
								this.groupTitle = res.data.data
							}else if (this.headCurrent == 1){
								this.groupTitle = res.data.data.filter(item => {
									uni.hideLoading();
									return item.article_type == '村容村貌';
								})
							}else if (this.headCurrent == 2){
								this.groupTitle = res.data.data.filter(item => {
									uni.hideLoading();
									return item.article_type == '环境整治'
								})
							} else if (this.headCurrent == 3){
								this.groupTitle = res.data.data.filter(item => {
									uni.hideLoading();
									return item.article_type == '企业帮扶'
								})
							} else if (this.headCurrent == 4){
								this.groupTitle = res.data.data.filter(item => {
									uni.hideLoading();
									return item.article_type == '三化管理'
								})
							}
							// this.release=this.groupTitle[0].state=='已上架'?'下架':'发布';
							// console.log('列表数据',this.groupTitle)
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
						uni.hideLoading();
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						})
						// console.log(res)
					}
				})
			},
			
			//----------------------加载更多--------------------------------
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
			
			//--------------------------路由跳转------------------------------
			routeJump:function(e){
				uni.navigateTo({
					url:'rd_detailsPage?id=' +e,
				})
			},
			
			//--------------------------路由跳转(添加列表文章)------------------------------
			routeJump2:function(e){
				uni.navigateTo({
					url:'./rd_addPage',
				})
			},
			
			//--------------------------路由跳转(修改列表文章)------------------------------
			modifyJump:function(item){
				uni.navigateTo({
					url: './rd_edit?jumpStatus=' +this.state + '&id=' + item.id
				})
			},
			
			//-----------------------上架------------------------------------
			onTheShelf: function(e) {
				console.log(this.selectIndex)
				if (this.groupTitle[this.selectIndex].state == '已下架') {
					uni.showModal({
						title: '你确认发布文章？',
						success: (res) => {
							console.log(res)
							if (res.confirm == true) {
								uni.showLoading({
									title: '正在发布....'
								})
								uni.request({
									url: this.$ycyd.KyInterface.upAndDownArchives.Url,
									method: this.$ycyd.KyInterface.upAndDownArchives.method,
									data: {
										id: e
									},
									success: (res) => {
										console.log(res)
										if (res.data.status == true) {
											uni.hideLoading()
											uni.showToast({
												title: '发布成功',
												icon: 'success'
											})
											uni.startPullDownRefresh();
										} else {
											uni.hideLoading()
											uni.showToast({
												title: '发布失败',
												icon: 'success'
											})
											uni.startPullDownRefresh();
										}
				
									},
									fail: () => {
										uni.hideLoading()
										uni.showToast({
											title: '服务器异常，请重试',
											icon: 'success'
										})
										uni.startPullDownRefresh();
									}
								})
							} else {
				
							}
						}
					})
				} else if (this.groupTitle[this.selectIndex].state == '已上架') {
					uni.showModal({
						title: '你确认下架文章？',
						success: (res) => {
							console.log(res)
							if (res.confirm == true) {
								uni.showLoading({
									title: '正在发布....'
								})
								uni.request({
									url: this.$ycyd.KyInterface.upAndDownArchives.Url,
									method: this.$ycyd.KyInterface.upAndDownArchives.method,
									data: {
										id: e
									},
									success: (res) => {
										console.log(res)
										if (res.data.status == true) {
											uni.hideLoading()
											uni.showToast({
												title: '发布成功',
												icon: 'success'
											})
											uni.startPullDownRefresh();
										} else {
											uni.hideLoading()
											uni.showToast({
												title: '发布失败',
												icon: 'success'
											})
											uni.startPullDownRefresh();
										}
				
									},
									fail: () => {
										uni.hideLoading()
										uni.showToast({
											title: '服务器异常，请重试',
											icon: 'success'
										})
										uni.startPullDownRefresh();
									}
								})
							} else {
				
							}
						}
					})
				}
			},
			
			
			//-----------------------删除------------------------------------
			Delete: function(e) {
				uni.showModal({
					title: '你确认删除文章？',
					success: (res) => {
						console.log(res)
						if (res.confirm == true) {
							uni.showLoading({
								title: '正在删除....'
							})
							uni.request({
								url: this.$ycyd.KyInterface.deleteArchives.Url,
								method: this.$ycyd.KyInterface.deleteArchives.method,
								data: {
									id: e,
									userId:this.userInfo.userId
									// userId: 100006,
								},
								success: (res) => {
									console.log(res)
									if (res.data.status == true) {
										uni.hideLoading()
										uni.showToast({
											title: res.data.msg,
											icon: 'success'
										})
										uni.startPullDownRefresh();
									} else {
										uni.hideLoading()
										uni.showToast({
											title: res.data.msg,
											icon: 'success'
										})
										uni.startPullDownRefresh();
									}
			
								},
								fail: () => {
									uni.hideLoading()
									uni.showToast({
										title: '服务器异常，请重试',
										icon: 'success'
									})
									uni.startPullDownRefresh();
								}
							})
						} else {
			
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #FFFFFF;
	}
	
	.to_view{
		margin-top: 30upx;
		padding-left: 32upx;
		bottom:40upx;
		position:fixed;
		overflow:scroll;
		width: 100%;
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
					// background: #007AFF; 
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
						// font-weight: bold;
						font-size: 30upx; 
						line-height: 1.7;
						height: 100upx;
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
			padding: 19upx 0; 
			.cont_text{
				margin-left: 20upx;
			}
			.cont_icon{
				float: right; 
			}
		}
	}
	
	.select{
		padding: 0 32upx;
		margin-left: 18upx;
		border-left: #007AFF solid 6rpx;
	}
</style>
