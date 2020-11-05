<template>
	<view>
			<!-- 内容1 -->
			<view>
				<view class="infor_view" v-for="(item,index) in groupTitle" :key="index" @click="details(item.id)">
					<view class="view_titleView">
						<view class="tv_view">
							<view style="display: flex;">
								<view style="margin-top: 10upx;">
									<text class="tv_label">{{item.id}}</text>
								</view>
								<view class="tv_title">{{item.title}}</view>
							</view>
							<!-- <text class="tv_richText">{{item.content}}</text> -->
							<view class="tv_view2">
								<rich-text class="tv_richText" :nodes="item.content"></rich-text>
							</view>
						</view>
						<image class="tv_image" :src="item.image" mode="aspectFill"></image>
					</view>
					
					<view class="view_contentView">
						<text class="cont_text">上架时间：{{gettime(item.update_time)}}</text>
					</view>
					<u-gap height="4" bg-color="#f9f9f9"></u-gap>
				</view>
				<!-- <view style="text-align: center; margin-bottom: 20upx; font-size: 28upx; color: #aaa;margin-top: 30upx;">
					<text>{{loadingType=== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
				</view> -->
			</view>
		</view>
	</template>
</template>

<script>
	export default {
		data() {
			return {
				groupTitle:[],
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
			uni.showLoading({
				title: '加载列表中...',
			})
			this.zcfbData();
		},
		
		onPullDownRefresh: function() {

			this.zcfbData();
		},
		
		onReachBottom() {
			this.getMore();
		},
		
		methods: {
			//----------------------列表接口--------------------------------
			zcfbData:function(){

				uni.request({
					url:this.$zcfb.KyInterface.getPolicy.Url,
					method:this.$zcfb.KyInterface.getPolicy.method,
					data:{
						
					},
					success:(res) =>{
						console.log('列表数据',res)
						if(res.data.status == true){
							this.groupTitle = res.data.data;
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
					let array=param.split(' ');
					var a=array[0];
					return a;
			},
			//--------------------------路由跳转------------------------------
			details:function(e){
				uni.navigateTo({
					url:'policyDetails?id=' +e,
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
				// margin-left: 20upx;
			}
			.cont_icon{
				float: right; 
				padding: 12upx 0;
				margin-right: 16upx;
			}
		}
	}
</style>
