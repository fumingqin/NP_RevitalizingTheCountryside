<template>
	<view>
		<!-- 内容1 -->
		<view>
			<view class="infor_view" v-for="(item,index) in groupTitle" :key="index" @click="routeJump(item.id)">
				<view class="view_titleView">
					<view class="tv_view">
						<view style="display: flex;">
							<view style="margin-top: 10upx;">
								<text class="tv_label" style="background: #007AFF;">项目监督</text>
							</view>
							<view class="tv_title">{{item.title}}</view>
						</view>
						<!-- <text class="tv_richText">{{item.content}}</text> -->
						<view class="tv_view2">
							<!-- <rich-text class="tv_richText" :nodes="item.content"></rich-text> -->
							<text class="tv_richText">{{item.introduce}}</text>
						</view>
					</view>
					<image class="tv_image" :src="item.image" mode="aspectFill"></image>
				</view>
				
				<view class="tv_investment" style="padding-top: 10upx;">
					<text class="it_text">负责人：{{item.personName}}</text>
					<text class="it_text" style="margin-left: 20upx;">已投资：{{item.ready_investment}}</text>
				</view>
				
				<view class="view_contentView">
					<text>{{item.nick_name}}</text>
					<text class="cont_text">{{item.view}}人看过</text>
					<text class="cont_text">{{informationDate(item.update_time)}}</text>
					<u-icon class="cont_icon" name="more-dot-fill"></u-icon>
				</view>
				<u-gap height="4" bg-color="#f9f9f9"></u-gap>
			</view>
			<!-- <view style="text-align: center; margin-bottom: 20upx; font-size: 28upx; color: #aaa;margin-top: 30upx;">
				<text>{{loadingType=== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
			</view> -->
			<!-- 缺省提示 -->
			<view style="margin-top: 360upx;" v-if="groupTitle.length==0">
				<u-empty text="该分类没有项目哦~" mode="news"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				groupTitle:[],
				selectId:'',//去出id
				selectIndex:0,//下标
				// loadingType: 0, //加载更多状态
				// loadingText:{
				// 	down :'上拉加载更多',
				// 	refresh : '正在加载...',
				// 	nomore : '没有更多了',
				// },
				// scenicListIndex:5,//列表默认数量
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
			// 		var a = this.scenicListIndex +6;
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
				uni.request({
					url:this.$fbxm.KyInterface.getProject.Url,
					method:this.$fbxm.KyInterface.getProject.method,
					success:(res) =>{
						console.log('列表数据',res)
						if(res.data.status == true){
							this.groupTitle = res.data.data
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
					url:'pp_detailsPage?id=' +e,
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
					width: 295upx;
					white-space: nowrap;
					overflow: hidden;
				}
				
				.tv_view2{
					display: block;
					padding-top: 10upx;
					position: relative;
					
					.tv_richText{
						padding-right: 40upx;
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
		
		.tv_investment{
			font-size: 24upx; 
			color: #E3424B; 
			.it_text{
				
			}
		}
		
		.view_contentView{
			font-size: 24upx; 
			color: #AAAAAA; 
			padding: 10upx 0 22upx 0; 
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
