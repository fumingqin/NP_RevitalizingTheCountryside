<template>
	<view>
		<view class="status_bar" v-if="cateMaskState!==1">
			<view class="top_view"></view>
		</view>
		
		<!-- 绿色背底 -->
		<image class="backgroundMap" src="../../../../static/WSSC/listTop.png" mode="aspectFill"></image>
		<!-- 白色背底 -->
		<view class="background"></view>
		
		<!-- 弹框 -->
		<!-- <popup-layer ref="popupRef" :direction="'right'">
			<view style="width:750upx;height: 100%;">
				<citySelect @back_city="backCity"></citySelect>
			</view>
		</popup-layer> -->
		
		<!-- 顶部搜索栏 -->
		<view class="content">
			<view class="search">
				<view style="width: 22%;padding-top: 2upx;display: flex;" @click="returnJump">
					<u-icon name="arrow-left" color="#fff" size="42"></u-icon>
					<view class="return">返回</view>
				</view>
				
				<view style="width: 100%;">
					<u-search placeholder="搜索商品/特产" placeholder-color="#fff" search-icon-color="#fff" input-align="center" :disabled="true"
					 :show-action="false" bg-color="rgba(0,136,54,0.3)" @click="searchClick"></u-search>
				</view>
				<view class="sh_news">
					<!-- <u-badge size="default" type="error" isDot="false" :count="count" :offset="[6,-4]"></u-badge> -->
					<u-icon name="chat-fill" color="#fff" size="50"></u-icon>
				</view>
			</view>

			<!-- 轮播区 -->
			<view class="rotationChart">
				<u-swiper :list="rotationChart" :height="240" indicator-pos="bottomRight"></u-swiper>
			</view>

			<!-- 筛选列表 -->
			<view class="screenView">
				<view class="screenText" :class="{current: screenIndex === 0}" @click="tabClick(0)">
					综合排序
				</view>
				<view class="screenText" :class="{current: screenIndex === 1}" @click="tabClick(1)">
					销量优先
				</view>
				<view class="screenText" :class="{current: screenIndex === 2}" @click="tabClick(2)">
					<text>价格</text>
					<view class="priceView">
						<text :class="{active: priceOrder === 1 && screenIndex === 2}" class="jdticon icon-shang"></text>
						<text :class="{active: priceOrder === 2 && screenIndex === 2}" class="jdticon icon-shang xia"></text>
					</view>
				</view>
				<!-- <text :class="{active:screenIndex === 3}" class="cate-item jdticon icon-fenlei1" @click="toggleCateMask('show')"></text> -->
			</view>

			<!-- 列表数据 -->
			<view class="gd_list" :hidden="screenIndex == 3">
				<view v-for="(item, index) in goodsList" :key="index" v-if="index < goodsListIndex " class="gd_item" @click="navToDetailPage(item)">
					<view class="gd_wrapper">
						<!-- <image :src="JSON.parse(item.image)[0]" mode="aspectFill"></image> -->
						<image :src="JSON.parse(item.image)[0]" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.introduce}}</text>
					<view class="gd_box">
						<text class="price">{{item.unit_price}}</text>
						<text>已售 {{item.sale_volume}}</text>
					</view>
				</view>
				<view style="text-align: center; padding: 24upx 0; font-size: 28upx; color: #aaa;width: 100%;" v-if="index<6">
					<text>{{loadingType=== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
				</view>
			</view>
			
			<!-- 缺省提示 -->
			<view style="margin-top: 360upx;" v-if="goodsList.length == 0">
				<u-empty text="暂无数据哦~" mode="list"></u-empty>
			</view>
			
			<!-- 分类面板 -->
			<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
				<view class="cate-content">
					<view style="width: 100%;height: 100%;background: #FFFFFF;">
						<scroll-view scroll-y class="cate-list">
							<view v-for="item in cateList" :key="item.id">
								<view class="cate-item b-b two">{{item.name}}</view>
								<view v-for="tItem in item.child" :key="tItem.childId" class="cate-item b-b" :class="{active: tItem.childId==cateId}"
								 @click="changeCate(tItem)">
									{{tItem.name}}
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import popupLayer from '@/components/HOME/uni-location/popup-layer/popup-layer.vue'
	export default {
		components: {
			popupLayer
		},
		data() {
			return {
				rotationChart: [], //轮播图
				screenIndex: 0, //筛选框默认值
				priceOrder: 0, //1 价格从低到高  2价格从高到低
				cateMaskState: 0, //分类面板展开状态
				goodsListIndex: 10, //列表默认数量
				loadingType: 0, //加载更多状态
				cateId: 0, //已选三级分类id
				loadingText: {
					down: '上拉加载更多',
					refresh: '正在加载...',
					nomore: '没有更多了',
				},
				slidingState:0,//滑动状态
				cateList: [{
					name:'特产',
					id:1,
					child:[{
						childId:1,
						name:'武夷岩茶'
					},
					{
						childId:2,
						name:'武夷留香'
					},
					{
						childId:3,
						name:'顺和笋干'
					},
					{
						childId:4,
						name:'建阳桔柚'
					},
					{
						childId:5,
						name:'五夫白莲'
					},
					{
						childId:6,
						name:'建瓯栗子'
					},
					{
						childId:7,
						name:'武夷岩茶'
					},
					{
						childId:8,
						name:'武夷留香'
					},
					{
						childId:9,
						name:'顺和笋干'
					},
					{
						childId:10,
						name:'建阳桔柚'
					},
					{
						childId:11,
						name:'五夫白莲'
					},
					{
						childId:12,
						name:'建瓯栗子'
					},
					{
						childId:13,
						name:'武夷岩茶'
					},
					{
						childId:14,
						name:'武夷留香'
					},
					{
						childId:15,
						name:'顺和笋干'
					},
					{
						childId:16,
						name:'建阳桔柚'
					},
					{
						childId:17,
						name:'五夫白莲'
					},
					{
						childId:18,
						name:'建瓯栗子'
					}],
				}], //分类数组
				// goodsList: [{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 		title: '惜秦皇汉武，略输文采',
				// 		price: 1654,
				// 		sales: 57,
				// 		ticketId:1,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
				// 		title: '一代天骄，成吉思汗',
				// 		price: 454,
				// 		sales: 4,
				// 		ticketId:2,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 		title: '惜秦皇汉武，略输文采',
				// 		price: 368,
				// 		sales: 1,
				// 		ticketId:3,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
				// 		title: '一代天骄，成吉思汗',
				// 		price: 123,
				// 		sales: 88,
				// 		ticketId:4,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 		title: '惜秦皇汉武，略输文采',
				// 		price: 56,
				// 		sales: 3,
				// 		ticketId:5,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
				// 		title: '一代天骄，成吉思汗',
				// 		price: 77,
				// 		sales: 99,
				// 		ticketId:6,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 		title: '惜秦皇汉武，略输文采',
				// 		price: 9,
				// 		sales: 111,
				// 		ticketId:7,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
				// 		title: '一代天骄，成吉思汗',
				// 		price: 88,
				// 		sales: 333,
				// 		ticketId:8,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 		title: '惜秦皇汉武，略输文采',
				// 		price: 1111,
				// 		sales: 56,
				// 		ticketId:9,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
				// 		title: '一代天骄，成吉思汗',
				// 		price: 444,
				// 		sales: 77,
				// 		ticketId:10,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 		title: '惜秦皇汉武，略输文采',
				// 		price: 777,
				// 		sales: 99,
				// 		ticketId:11,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
				// 		title: '一代天骄，成吉思汗',
				// 		price: 774,
				// 		sales: 98,
				// 		ticketId:12,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 		title: '惜秦皇汉武，略输文采',
				// 		price: 999,
				// 		sales: 66,
				// 		ticketId:13,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
				// 		title: '一代天骄，成吉思汗',
				// 		price: 33,
				// 		sales: 57,
				// 		ticketId:14,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 		title: '惜秦皇汉武，略输文采',
				// 		price: 434,
				// 		sales: 34,
				// 		ticketId:15,
				// 	},
				// 	{
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
				// 		title: '一代天骄，成吉思汗',
				// 		price: 564,
				// 		sales: 47,
				// 		ticketId:16,
				// 	}
				// ],
				name:'',//商品名字
				goodsList:[],//列表数据
			}
		},
		
		onLoad(param) {
			this.name=param.name;
		},
		
		onShow() {
			this.rotationLoadData();
			this.listData();
		},
		
		onReachBottom() {
			this.getMore();
		},

		methods: {
			moveHandle(){
				return;
			},
			//--------------------------------轮播图请求---------------------------------
			rotationLoadData: function() {
				//轮播图
				uni.request({
					url: this.$wssc.KyInterface.getImage.Url,
					method: this.$wssc.KyInterface.getImage.method,
					data: {
						type: '6'
					},
					success: (res) => {
						console.log('轮播区', res)
						if (res.data.status == true) {
							this.rotationChart = res.data.data
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail: function() {
						uni.showToast({
							title: '首页轮播图网络加载异常',
							icon: 'none'
						})
					}
				})
			},
			
			
			//列表
			listData:function(){
				uni.request({
					url:this.$wssc.KyInterface.getHomepageByKey.Url,
					method:this.$wssc.KyInterface.getHomepageByKey.method,
					data:{
						key:this.name
					},
					success: (res) => {
						console.log('列表数据',res);
						this.goodsList = res.data.data;
					},
					fail(res) {
						uni.hideLoading();
					}
				});
			},

			//------------------点击搜索跳转---------------------------
			searchClick: function() {
				uni.navigateTo({
					url: 'osm_search'
				})
			},

			//------------------------筛选点击--------------------------
			
			tabClick(index) {
				if (this.screenIndex === index && index !== 2) {
					//切换后重置加载参数
					this.goodsListIndex = 10;
					this.loadingType = 0;
					return;
				}
				this.screenIndex = index;
				if (index === 2) {
					this.priceOrder = this.priceOrder === 1 ? 2 : 1;
					//切换后重置加载参数
					this.goodsListIndex = 10;
					this.loadingType = 0;
				} else {
					this.priceOrder = 0;
					//切换后重置加载参数
					this.goodsListIndex = 10;
					this.loadingType = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.clickSork();
			},

			//点击排序
			clickSork: function() {
				var sc = this.goodsList;
				this.goodsList = [];
				//筛选，数据直接前端筛选了
				if (this.screenIndex == 0) {
					sc.sort((a, b) => a.ticketId - b.ticketId)
					this.cateId = '';
				}
				if (this.screenIndex == 1) {
					sc.sort((a, b) => b.sales - a.sales)
					this.cateId = '';
				}
				if (this.screenIndex == 2) {
					sc.sort((a, b) => {
						if (this.priceOrder == 1) {
							return a.price - b.price;
						}
						return b.price - a.price;
					})
					this.cateId = '';
				}
				if (this.screenIndex == 3) {
					let screen = sc.filter(item => {
						return item.ticketTitle == this.cateValue;
					})
					this.goodsListCate = screen;
					uni.hideLoading()
				}

				this.goodsList = this.goodsList.concat(sc);
			},

			//显示分类面板
			toggleCateMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(() => {
					this.cateMaskState = state;
				}, timer)
			},
			
			//加载信息
			getMore(){
				this.loadingType = 1;
			
				if (this.goodsListIndex < this.goodsList.length) {
					var a = this.goodsListIndex + 10;
					this.goodsListIndex = a;
					this.loadingType = 0;
				}
				if (this.goodsListIndex >= this.goodsList.length) {
					this.loadingType = 2;
				}
			},
			
			//跳转详情
			navToDetailPage:function(e){
				uni.navigateTo({
					url: 'osm_detailsPage?id='+e.id
				})
			},
			
			returnJump:function(){
				uni.navigateBack({
					delta:1,
				})
			}
		}
	}
</script>

<style lang="scss">
	//页面全局样式
	page {
		background-color: #f9f9f9;
	}
	
	.status_bar {  
	    height: 60upx;  
	    width: 100%;  
		background: linear-gradient(to right, #00c34e,#11e177);
		z-index: 99;
	}  
	.top_view {  
	    height: 60upx;  
	    width: 100%;  
	    position: fixed;  
	    // background-color: #00c34e;
		background: linear-gradient(to right, #00c34e,#11e177);
	    top: 0;  
	    z-index: 99;  
	} 

	//轮播图
	.backgroundMap {
		position: absolute;
		top: 0;
		z-index: 2;
		width: 100%;
		height: 350upx;
	}

	.background {
		z-index: 1;
		position: absolute;
		background: #fff;
		top: 328upx;
		width: 100%;
		height: 120upx;
	}

	//内容最外层
	.content {
		position: relative;
		z-index: 97;
	}

	//搜索框
	.search {
		display: flex;
		margin-top: 20upx;
		margin-left: 30upx;
		width: 92%;
	}
	
	.return{
		font-size: 30upx;
		color: #FFFFFF;
		padding-top: 10upx;
	}

	.sh_news {
		margin-left: 20upx;
		margin-top: 10upx;
	}

	.rotationChart {
		margin: 0 20upx;
		margin-top: 40upx;
		margin-bottom: 20upx;
	}

	//筛选样式
	.screenView {
		left: 0;
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		z-index: 10;
		position: sticky;
		top: 56upx;
		box-shadow: 0 7px 7px -7px rgba(0, 0, 0, 0.06); //底部阴影

		.screenText {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: #888;
			position: relative;

			&.current {
				color: #22C704;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid #22C704;
				}
			}
		}

		.priceView {
			display: flex;
			flex-direction: column;

			.jdticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: #22C704;
				}

			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 商品列表 */
	.gd_list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		z-index: 11;

		.gd_item {
			background: #fff;
			padding-left: 20upx;
			padding-top: 20upx;
			padding-right: 20upx;
			border-radius: 3px;
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 20upx;
			margin-top: 20upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.gd_wrapper {
			width: 100%;
			height: 268upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: 32upx;
			color: #303133;
			line-height: 80upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: block;
		}

		.gd_box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: #909399;
		}

		.price {
			font-size: 32upx;
			color: #fa436a;
			line-height: 1;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	
	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 996;
		transition: .3s;
	
		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
			padding-top: 62upx;
		}
	
		&.none {
			display: none;
		}
	
		&.show {
			background: rgba(0, 0, 0, .4);
	
			.cate-content {
				transform: translateX(0);
			}
		}
	}
	
	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;
	
		.cate-item {
			z-index: 999;
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}
	
		.two {
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
	
		.active {
			color: #06B4FD;
		}
	}
</style>
