<template>
	<view>
		<!-- 搜索栏 -->
		<view class="searchTopBox">
			<view class="searchBoxRadius">
				<input class="inputIocale" type="search" v-model="searchValue" @confirm="searchNow" placeholder="搜索村名称" />
				<image class="searchImage" src="../../static/search.png" />
			</view>
		</view>
		
			<!-- 内容1 -->
			<view>
				<view class="tab">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#3DABFC"></uni-segmented-control>
				</view>
				<view v-if="current === 0" style="margin-top: 20rpx;">
				<view class="infor_view" v-for="(item,index) in groupTitle" :key="index" @click="details(item.ruralId)">
					<view class="view_titleView">
						<view class="tv_view">
							<view style="display: flex;">
								<view style="margin-top: 10upx;">
									<text class="tv_label">一村一档</text>
								</view>
								<view class="tv_title">{{item.county_name}}-{{item.village_name}}</view>
							</view>
							<!-- <text class="tv_richText">{{item.content}}</text> -->
							<view class="tv_view2">
								<view class="tv_richText">村长：{{item.head_name}}</view>
								<view class="tv_richText">总人口：{{item.total_people}}人</view>
							</view>
						</view>
						<image class="tv_image" :src="item.image" mode="aspectFill"></image>
					</view>
					
					<view class="view_contentView">
						<text class="cont_text">建档时间：{{gettime(item.create_time)}}</text>
					</view>
					<u-gap height="4" bg-color="#f9f9f9"></u-gap>
				</view>
				<view v-if="groupTitle.length==0" style="margin-top: 500upx;">
					<u-empty :isShow="groupTitle.length==0" text="暂无数据" textColor="#999999"></u-empty>
				</view>
				</view>
				
				<view v-if="current === 1" style="margin-top: 20rpx;">
				<view class="infor_view" v-for="(item,index) in people" :key="index" @click="details(item.ruralId)">
					<view class="view_titleView">
						<view class="tv_view">
							<view style="display: flex;">
								<view style="margin-top: 10upx;">
									<text class="tv_label">一村一档</text>
								</view>
								<view class="tv_title">{{item.county_name}}-{{item.village_name}}</view>
							</view>
							<!-- <text class="tv_richText">{{item.content}}</text> -->
							<view class="tv_view2">
								<view class="tv_richText">村长：{{item.head_name}}</view>
								<view class="tv_richText">总人口：{{item.total_people}}人</view>
							</view>
						</view>
						<image class="tv_image" :src="item.image" mode="aspectFill"></image>
					</view>
					
					<view class="view_contentView">
						<text class="cont_text">建档时间：{{gettime(item.create_time)}}</text>
					</view>
					<u-gap height="4" bg-color="#f9f9f9"></u-gap>
				</view>
				<view v-if="people.length==0" style="margin-top: 500upx;">
					<u-empty :isShow="people.length==0" text="暂无数据" textColor="#999999"></u-empty>
				</view>
				</view>
				
				<view v-if="current === 2" style="margin-top: 20rpx;">
				<view class="infor_view" v-for="(item,index) in time" :key="index" @click="details(item.ruralId)">
					<view class="view_titleView">
						<view class="tv_view">
							<view style="display: flex;">
								<view style="margin-top: 10upx;">
									<text class="tv_label">一村一档</text>
								</view>
								<view class="tv_title">{{item.county_name}}-{{item.village_name}}</view>
							</view>
							<!-- <text class="tv_richText">{{item.content}}</text> -->
							<view class="tv_view2">
								<view class="tv_richText">村长：{{item.head_name}}</view>
								<view class="tv_richText">总人口：{{item.total_people}}人</view>
							</view>
						</view>
						<image class="tv_image" :src="item.image" mode="aspectFill"></image>
					</view>
					
					<view class="view_contentView">
						<text class="cont_text">建档时间：{{gettime(item.create_time)}}</text>
					</view>
					<u-gap height="4" bg-color="#f9f9f9"></u-gap>
				</view>
				<view v-if="time.length==0" style="margin-top: 500upx;">
					<u-empty :isShow="time.length==0" text="暂无数据" textColor="#999999"></u-empty>
				</view>
				</view>
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
				allData:[],
				groupTitle:[],
				people:[],
				time:[],
				items: ['综合排序', '人口最多', '最新建档'],
				current: 0,
				searchValue: '', //搜索框值
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
			this.villageData();
		},
		
		onPullDownRefresh: function() {

			this.villageData();
		},
		
		onReachBottom() {
			this.getMore();
		},
		
		methods: {
			//----------------------列表接口--------------------------------
			villageData:function(){

				uni.request({
					url:this.$newycyd.KyInterface.getArchives.Url,
					method:this.$newycyd.KyInterface.getArchives.method,
					data:{
						
					},
					success:(res) =>{
						console.log('列表数据',res)
						if(res.data.status == true){
							this.allData = res.data.data;
							this.groupTitle = res.data.data;
							this.groupTitle.sort(function(a, b){
								return b.ruralId - a.ruralId
							});
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
			
			//搜索框-搜索
			searchNow: function() {
				var that=this;
				if (that.searchValue == '') {
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					// retuan false;
				}
				//搜索请求
				uni.hideKeyboard()
				uni.showLoading({
					title: '正在搜索',
				})
				uni.request({
					url:that.$newycyd.KyInterface.getArchivesByKey.Url,
					method:that.$newycyd.KyInterface.getArchivesByKey.method,
					data: {
						key: that.searchValue,
					},
					success: (res) => {
						console.log(res)
						if (res.data.status) {
							that.groupTitle = res.data.data;
							that.searchValue = ''
							uni.hideLoading()
						} else {
							uni.hideLoading()
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							});
							that.searchValue = ''
						}
					}
				})
			
			},
			//tab点击事件
			onClickItem(e) { 
				console.log(this.allData,"全部");
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
				if(e.currentIndex == 0){
					this.groupTitle=this.allData;
					this.groupTitle.sort(function(a, b){
						return b.ruralId - a.ruralId
					});
				}
				if(e.currentIndex == 1){
					this.people = this.allData;
					this.people.sort(function(a, b){
						return b.total_people - a.total_people
					});
				}
				if(e.currentIndex == 2){
					this.time = this.allData;
					this.time.sort(function(a, b){
						return Date.parse(b.create_time) - Date.parse(a.create_time)
					});
				}
			},
			//-------------------时间切割---------------------------
			gettime:function(param){
					let array=param.split('T');
					var a=array[0];
					return a;
			},
			//--------------------------路由跳转------------------------------
			details:function(e){
				uni.navigateTo({
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
					font-size: 30upx; 
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
	.searchTopBox {
		display: flex;
		text-overflow: ellipsis; //文本溢出：省略号
		margin: 32upx 32upx;
		.searchBoxRadius {
			/* #ifdef H5 */
			width: 80%;
			/* #endif */
			/* #ifndef H5 */
			width: 96%;
			/* #endif */
			height: 78upx;
			background-color: #fff;
			border-radius: 46upx;
			background: #f5f5f5;
	
			.searchImage {
				padding-left: 24upx;
				padding-top: 18upx;
				width: 48upx;
				height: 48upx;
			}
	
			.inputIocale {
				position: absolute;
				height: 72upx;
				padding-top: 4upx;
				padding-left: 88upx;
				font-size: 30upx;
			}
	
		}
	}
	.tab {
		position: sticky;
		top: 0upx;
		background: #f5f5f5;
		height: 90upx;
		z-index: 99999;
	
	}
</style>
