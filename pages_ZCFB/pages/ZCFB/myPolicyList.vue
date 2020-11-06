<template>
	<view>
			<!-- 内容1 -->
			<view>
				<view class="infor_view" v-for="(item,index) in groupTitle" :key="index">
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
						<text>{{item.state}}</text>
						<text class="cont_text">{{gettime(item.update_time)}}</text>
						<view class="at_buttonView">
						<view class="at_button at_btDelete" @tap="Update(item.id)">修改</view>
						<view class="at_button at_btDelete" @tap="Delete(item.id)">删除</view>
						<view class="at_button at_btDelete"v-if="item.state=='已下架'" @tap="updatestate(item.id)">上架</view>
						<view class="at_button at_btDelete"v-if="item.state=='已上架'" @tap="updatestate(item.id)">下架</view>
						<view class="at_button at_btDelete" @tap="details(item.id)">详情</view>
						</view>
					</view>
					<u-gap height="4" bg-color="#f9f9f9"></u-gap>
				</view>
				<view class="policybtn" @click="gopolicy">发布新政策</view>
				<view style="text-align: center; margin-bottom: 20upx; font-size: 28upx; color: #aaa;margin-top: 30upx;">
					<text>{{loadingType=== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
				</view>
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
			// this.zcfbData();
		},
		onShow() {
			this.zcfbData();
		},
		
		onPullDownRefresh: function() {
			uni.showLoading({
				title: '加载列表中...',
			})
			this.zcfbData();
		},
		
		onReachBottom() {
			this.getMore();
		},
		
		methods: {
			//----------------------列表接口--------------------------------
			zcfbData:function(){
				uni.showLoading({
					title: '加载列表中...',
				})
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res);
				uni.request({
					url:this.$zcfb.KyInterface.getPolicyById.Url,
					method:this.$zcfb.KyInterface.getPolicyById.method,
					data:{
						userId:100011,
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
			//----------------修改------------------
			Update:function(e){
				uni.navigateTo({
					url:'issuePolicy?id=' +e,
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
			gopolicy:function(e){
				uni.navigateTo({
					url:'issuePolicy'
				})
			},
			//--------------上下架--------------
			updatestate:function(e){
				uni.showLoading({
					title: '修改中...',
				})
			
				uni.request({
					url:this.$zcfb.KyInterface.upAndDownArchives.Url,
					method:this.$zcfb.KyInterface.upAndDownArchives.method,
					data:{
						id:e,
					},
					success:(res) =>{
						console.log(res)
						if(res.data.status){
							uni.hideLoading();
							this.zcfbData();
						}else{
							uni.showToast({
								title: '修改失败',
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
			//--------------删除--------------
			Delete:function(e){
				uni.showLoading({
					title: '删除中...',
				})
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res);
				uni.request({
					url:this.$zcfb.KyInterface.deleteArchives.Url,
					method:this.$zcfb.KyInterface.deleteArchives.method,
					data:{
						id:e,
						userId:res.data.userId,
					},
					success:(res) =>{
						console.log(res)
						if(res.data.status){
							uni.showToast({
								title: '删除成功',
								icon: 'none'
							})
							uni.hideLoading();
							this.zcfbData();
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
	.at_buttonView {
			display: flex;
			float: right;
	
			// 按钮
			.at_button {
				padding: 10upx 12upx;
				font-size: 20upx;
				border-radius: 6upx;
			}
			.at_btDelete {
				border: 1upx solid #888;
				color: #888;
				margin-right: 24upx;
			}
		}
	.policybtn{
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
