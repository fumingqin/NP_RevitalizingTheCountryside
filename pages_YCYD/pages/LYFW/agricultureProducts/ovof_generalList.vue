<template>
	<view>
		<!-- 头部切换栏 -->
		<u-tabs :list="headList" :is-scroll="false" :current="headCurrent" @change="headChange" height="104"></u-tabs>
		
		<!-- 内容1 -->
		<view>
			<view class="infor_view" v-for="(item,index) in groupTitle" :key="index" @click="routeJump(item.id)">
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
					<u-icon class="cont_icon" name="more-dot-fill"></u-icon>
				</view>
				<u-gap height="4" bg-color="#f9f9f9"></u-gap>
			</view>
			<!-- 缺省提示 -->
			<view style="margin-top: 250upx;" v-if="groupTitle.length ==0">
				<u-empty text="该分类没有相关档案哦~" mode="news"></u-empty>
			</view>
			<!-- <view style="text-align: center; margin-bottom: 20upx; font-size: 28upx; color: #aaa;margin-top: 30upx;">
				<text>{{loadingType=== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
			</view> -->
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
				groupTitle:[],
				selectId:'',//去出id
				selectIndex:0,//下标
				loadingType: 0, //加载更多状态
				// loadingText:{
				// 	down :'上拉加载更多',
				// 	refresh : '正在加载...',
				// 	nomore : '没有更多了',
				// },
				scenicListIndex:5,//列表默认数量
			}
		},
		
		onShow() {
			uni.showLoading({
				title: '加载列表中...',
			})
			this.ycydData();
		},
		
		onUnload() {
			uni.hideLoading();
		},
		
		onPullDownRefresh: function() {
			uni.showLoading({
				title: '加载列表中...',
			})
			this.ycydData();
		},
		
		// onReachBottom() {
		// 	this.getMore();
		// },
		
		methods: {
			//--------------------点击列表事件------------------------------
			selectClick:function(e){
				//给选择的下标赋值
				this.selectIndex = e;
				console.log('上车点下标赋值',this.selectIndex)
				//取出id
				this.selectId = this.groupTitle[e].id;
				console.log('取出id',this.selectId)
			},
			
			//----------------------加载更多--------------------------------
			// getMore(){
			// 	this.loadingType = 1;
				
			// 	if(this.scenicListIndex < this.groupTitle.length){
			// 		var a = this.scenicListIndex +5;
			// 		this.scenicListIndex = a;
			// 		this.loadingType = 0;
			// 	}
			// 	if(this.scenicListIndex >= this.groupTitle.length){
			// 		this.loadingType = 2;
			// 	}
			// },
			
			//----------------------点击tab切换----------------------------
			headChange: function(e) {
				this.headCurrent = e;
				uni.showLoading({
					title: '加载信息中...'
				})
				this.ycydData(e);
			},
			
			//----------------------列表接口--------------------------------
			ycydData:function(){
				uni.showLoading({
					title: '加载列表中...',
				})
				uni.request({
					url:this.$ycyd.KyInterface.getArchives.Url,
					method:this.$ycyd.KyInterface.getArchives.method,
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
			
			//--------------------资讯时间-------------------------------
			informationDate:function(e){
				console.log(e)
				// var tsetDate = e.replace('T',' ')
				var a = e.substr(0,10)
				return a;
			},
			
			//--------------------------路由跳转------------------------------
			routeJump:function(e){
				uni.navigateTo({
					url:'ovof_detailsPage?id=' +e,
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
			padding: 22upx 0; 
			.cont_text{
				margin-left: 20upx;
			}
			.cont_icon{
				float: right; 
				padding: 12upx 0;
				margin-right: 16upx;
			}
		}
	}
	
</style>
