<template>
	<view>
		<!-- 内容1 -->
		<view>
			<view class="infor_view" v-for="(item,index) in groupTitle" :key="index" @click="routeJump(item.id)">
				<view class="view_titleView">
					<image class="tv_image" :src="item.image" mode="aspectFill"></image>
					<view class="tv_view">
						<view style="display: flex;">
							<view style="display: flex;">
								<view class="tv_title">{{item.name}}</view>
							</view>
						</view>
						<view class="tv_view2">
							<rich-text class="tv_richText" :nodes="item.content"></rich-text>
							<view class="view_contentView2">
								<text class="tv_view3">来源地:{{item.origin_region}}</text>
								<text class="cont_icon" style="color: #FF9012;">￥{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="view_contentView">
					<text>{{item.nick_name}}</text>
					<text class="cont_text">{{item.view}}人看过</text>
					<text class="cont_text">{{informationDate(item.update_time)}}</text>
				</view>
				<u-gap height="4" bg-color="#f9f9f9"></u-gap>
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
			}
		},
		
		onLoad() {
			uni.showLoading({
				title: '加载列表中...',
			})
			this.ycydData();
		},
		
		onPullDownRefresh: function() {
			uni.showLoading({
				title: '加载列表中...',
			})
			this.ycydData();
		},
		
		onReachBottom() {
			this.getMore();
		},
		
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
			
			//----------------------列表接口--------------------------------
			ycydData:function(){
				uni.request({
					url:this.$fbrcp.KyInterface.getProduct.Url,
					method:this.$fbrcp.KyInterface.getProduct.method,
					success:(res) =>{
						console.log('列表数据',res)
						if(res.data.status == true){
							this.groupTitle=res.data.data;
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
					url:'ap_details?id=' +e,
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
			
			.tv_image{
				width: 220upx; 
				height: 192upx; 
				border-radius: 8upx;
			}
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
					font-size: 32upx; 
					line-height: 1.7;
					width: 320upx;
					padding-left: 16upx;
					white-space: nowrap;
					overflow: hidden;
				}
				
				.tv_view2{
					display: block;
					position: relative;
					
					.tv_richText{
						padding-left: 16upx;
						color: #2C2D2D;
						width: 454upx;
						// font-weight: bold;
						font-size: 28upx; 
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
		}
	}
	
	.view_contentView{
		font-size: 28upx; 
		color: #AAAAAA; 
		padding: 16upx 0 16upx 0; 
		.cont_text{
			margin-left: 20upx;
		}
	}
	
	.view_contentView2{
		padding: 0 0 0 16upx; 
		
		.tv_view3{
			font-size: 24upx;
			background: #007AFF;
			color: #FFFFFF; 
			border-radius: 4upx;
			padding: 4upx 10upx;
		}
		.cont_icon{
			padding-left: 16upx;
			font-size: 28upx;
		}
	}
	
</style>
