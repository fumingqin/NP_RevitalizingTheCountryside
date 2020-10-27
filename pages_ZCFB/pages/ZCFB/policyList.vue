<template>
	<view>
		<!-- 内容1 -->
		<view>
			<view class="content">
				<view class="groupTour" v-for="(item,index) in groupTitle" :key="index" @click="details(item.id)">
					<view class="groupContent">
						<image class="contentImage" :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="groupText">
						<view class="groupCost">
							<view class="TitleContent">
								<text class="contentText">{{item.title}}</text>
							</view>
							<view class="projectContent">{{item.content}}</view>
							<text class="cost">{{gettime(item.update_time)}}</text>
							<text class="sellComment" style="color: #42e800;">{{item.state}}</text>
						</view>
					</view>
				</view>
				<view style="text-align: center; margin-bottom: 20upx; font-size: 28upx; color: #aaa;">
					<text>{{loadingType=== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				groupTitle:'',
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
		onReachBottom() {
			this.getMore();
		},
		onLoad() {
			this.ycydData();
		},
		
		methods: {
			//----------------------列表接口--------------------------------
			ycydData:function(){
				uni.showLoading({
					title: '加载列表中...',
				})
				uni.request({
					url:this.$zcfb.KyInterface.getPolicy.Url,
					method:this.$zcfb.KyInterface.getPolicy.method,
					data:{
						
					},
					success:(res) =>{
						console.log('列表数据',res)
						if(res.data.status == true){
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
		background-color: #f6f6f6;
	}
	
	.to_scroll {
		display: flex;
		white-space: nowrap;
		width: 100%;
		
		
	}
	
	//内容1
	.content {
		margin: 30upx 32upx 0 32upx;
	
		.groupTour {
			display: flex;
			background-color: #FFFFFF;
			padding-top: 40upx;
			padding-bottom: 40upx;
			padding-left: 30upx;
			padding-right: 30upx;
			margin-bottom: 20upx;
			border-radius: 20upx;
	
			.groupContent {
	
				// display: flex;
				.contentImage {
					width: 190upx;
					height: 150upx;
					border-radius: 12upx;
				}
			}
	
			.groupText {
				margin-left: 25upx;
				
				
				.contentLabel {
					display: block;
					font-size: 28upx;
					color: #aba9aa;
					margin-top: 24upx;
				}
	
				.groupCost {
					position: relative;
					
					.TitleContent{
						display: flex;
						margin-bottom: 22upx;
						
						.contentText {
							font-size: 36upx;
							font-weight: bold;
							font-family: Source Han Sans SC;
							overflow: hidden; //超出溢出
							-webkit-line-clamp: 1; //限制2行
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							text-align: justify;
						}
						
						.contentCost{
							position: absolute;
							// font-weight: bold;
							right: 0;
							font-size: 36upx;
							color: #FF5555;
						}
					}
					
					.cost {
						display: block;
						font-size: 28upx;
						color: #aba9aa;
						padding-top: 14upx;
					}
					
					.projectContent {
						font-size: 28upx;
						color: #aba9aa;
						text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
						white-space: nowrap;
						overflow: hidden;
						width: 420upx;
					}
					
					.sellComment {
						position: absolute;
						font-size: 28upx;
						right: 0;
						bottom: 0;
					}
				}
			}
		}
		
		.select{
			display: flex;
			background-color: #FFFFFF;
			padding-top: 40upx;
			padding-bottom: 40upx;
			padding-left: 30upx;
			padding-right: 30upx;
			margin-bottom: 20upx;
			border-radius: 20upx;
			border: #5AD234 solid 2rpx;
		}
	}
	
</style>
