<template>
	<view>
		<!-- 顶部搜索栏 -->
		<view class="search">
			<view style="width: 22%;padding-top: 2upx;display: flex;" @click="returnJump">
				<u-icon name="arrow-left" color="#fff" size="42"></u-icon>
				<view class="return">返回</view>
			</view>

			<view style="width: 100%;">
				<u-search placeholder="搜索" :disabled="true" :show-action="false" bg-color="rgba(255,255,255,0.9)" @click="searchClick"></u-search>
			</view>
			<view class="sh_news">
				<!-- <u-badge size="default" type="error" isDot="false" :count="count" :offset="[6,-4]"></u-badge> -->
				<u-icon name="chat-fill" color="#fff" size="50"></u-icon>
			</view>
		</view>

		<!-- 轮播区 -->
		<u-swiper :list="rotationChart" :height="500" indicator-pos="bottomRight"></u-swiper>

		<!-- 金刚区 -->
		<view class="h_vajraDistrict">
			<view class="vd_item">
				<view class="item_view" v-for="(item,index) in classification" :key="index" @click="itemClick(item.name)">
					<image class="view_image" :src="item.image" mode="aspectFit"></image>
					<text class="view_text">{{item.name}}</text>
				</view>
				<view class="item_view" @click="itemClick2">
					<image class="view_image" src="../../../../static/WSSC/genduo.png" mode="aspectFit"></image>
					<text class="view_text">查看更多</text>
				</view>
			</view>
		</view>

		<!-- banner区 -->
		<view>
			<image style="width: 100%; height: 220upx;margin: 20upx 0;" src="../../../../static/WSSC/guangao.png" mode="aspectFill"></image>
		</view>

		<!-- 资讯 -->
		<view class="realTimeInfo">
			<view class="rti_block" v-for="(item,index) in realTimeInfo" :key="index">
				<view>
					<text class="title">{{item.title}}</text>
					<text class="content">{{item.content}}</text>
					<image class="image" :src="item.image" mode="aspectFit"></image>
				</view>
			</view>
		</view>

		<!-- 瀑布流 -->
		<view class="wrap" style="margin-top: 16upx;">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="detailsJump(item.id)">
						<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
						<view class="demo-title">
							{{item.introduce}}
						</view>
						<view class="demo-price">
							{{item.unit_price}}元
						</view>
						<!-- <view class="demo-tag">
							<view class="demo-tag-owner">
								自营
							</view>
							<view class="demo-tag-text">
								放心购
							</view>
						</view> -->
						<view class="demo-shop">
							{{item.name}}
						</view>
						<!-- <u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon> -->
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="detailsJump(item.id)">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
						<view class="demo-title">
							{{item.introduce}}
						</view>
						<view class="demo-price">
							{{item.unit_price}}元
						</view>
						<!-- <view class="demo-tag">
							<view class="demo-tag-owner">
								自营
							</view>
							<view class="demo-tag-text">
								放心购
							</view>
						</view> -->
						<view class="demo-shop">
							{{item.name}}
						</view>
						<!-- <u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon> -->
					</view>
				</template>
			</u-waterfall>
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rotationChart: [], //轮播图
				count: 2, //徽标指数
				realTimeInfo: [{
						title: '土特产',
						content: '农家土货',
						image: '../../../../static/WSSC/jidan.png'
					},
					{
						title: '养生保健',
						content: '营养美食',
						image: '../../../../static/WSSC/xianggu.png'
					},
					{
						title: '拼宝严选',
						content: '甄选只为你',
						image: '../../../../static/WSSC/ningmeng.png'
					}
				], //资讯数组

				loadStatus: 'loadmore',
				flowList: [],
				// list: [{
				// 		price: 35,
				// 		title: '北国风光，千里冰封，万里雪飘',
				// 		shop: '李白杜甫白居易旗舰店',
				// 		image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
				// 	},
				// 	{
				// 		price: 75,
				// 		title: '望长城内外，惟余莽莽',
				// 		shop: '李白杜甫白居易旗舰店',
				// 		image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg',
				// 	},
				// 	{
				// 		price: 385,
				// 		title: '大河上下，顿失滔滔',
				// 		shop: '李白杜甫白居易旗舰店',
				// 		image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				// 	},
				// 	{
				// 		price: 784,
				// 		title: '欲与天公试比高',
				// 		shop: '李白杜甫白居易旗舰店',
				// 		image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
				// 	},
				// 	{
				// 		price: 7891,
				// 		title: '须晴日，看红装素裹，分外妖娆',
				// 		shop: '李白杜甫白居易旗舰店',
				// 		image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg',
				// 	},
				// 	{
				// 		price: 2341,
				// 		shop: '李白杜甫白居易旗舰店',
				// 		title: '江山如此多娇，引无数英雄竞折腰',
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg',
				// 	},
				// 	{
				// 		price: 661,
				// 		shop: '李白杜甫白居易旗舰店',
				// 		title: '惜秦皇汉武，略输文采',
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
				// 	},
				// 	{
				// 		price: 1654,
				// 		title: '唐宗宋祖，稍逊风骚',
				// 		shop: '李白杜甫白居易旗舰店',
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 	},
				// 	{
				// 		price: 1678,
				// 		title: '一代天骄，成吉思汗',
				// 		shop: '李白杜甫白居易旗舰店',
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 	},
				// 	{
				// 		price: 924,
				// 		title: '只识弯弓射大雕',
				// 		shop: '李白杜甫白居易旗舰店',
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 	},
				// 	{
				// 		price: 8243,
				// 		title: '俱往矣，数风流人物，还看今朝',
				// 		shop: '李白杜甫白居易旗舰店',
				// 		image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
				// 	},
				// ],
				scrollTop: 0,
				classification: [],
				list: [],
			}
		},

		onLoad() {
			this.rotationLoadData();
			this.productList();
		},

		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},

		methods: {
			//轮播图请求
			rotationLoadData: function() {
				//轮播图
				uni.request({
					url: this.$wssc.KyInterface.getImage.Url,
					method: this.$wssc.KyInterface.getImage.method,
					data: {
						type: '0'
					},
					success: (res) => {
						// console.log('轮播区', res)
						if (res.data.status == true) {
							this.rotationChart.push(res.data.data.image)
							// console.log('轮播区', this.rotationChart)
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


				//首页分类
				uni.request({
					url: this.$wssc.KyInterface.getMallHomepage.Url,
					method: this.$wssc.KyInterface.getMallHomepage.method,
					success: (res) => {
						console.log('首页分类', res)
						if (res.data.status == true) {
							for (let item of res.data.data) {
								var obj = {
									name: item.title, //功能名称
									image: JSON.parse(item.image)[0], //功能图标
								}
								this.classification.push(obj);
							}
							console.log('首页分类', this.classification)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail: function() {
						uni.showToast({
							title: '首页分类网络加载异常',
							icon: 'none'
						})
					}
				})
			},

			//商品列表
			productList: function() {
				uni.request({
					url: this.$wssc.KyInterface.getProductList.Url,
					method: this.$wssc.KyInterface.getProductList.method,
					success: (res) => {
						console.log('首页分类', res)
						if (res.data.status == true) {
							this.list = res.data.data;
							this.addRandomData();
							console.log('111', this.list)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail: function() {
						uni.showToast({
							title: '首页分类网络加载异常',
							icon: 'none'
						})
					}
				})
			},

			//点击跳转
			itemClick: function(name) {
				// console.log(entrance)
				uni.navigateTo({
					url: 'osm_list?name=' + name,
				})
			},

			//点击跳转
			itemClick2: function() {
				uni.navigateTo({
					url: './osm_seeMore'
				})
			},

			//点击搜索跳转
			searchClick: function() {
				uni.navigateTo({
					url: 'osm_search'
				})
			},

			returnJump: function() {
				uni.navigateBack({
					delta: 1,
				})
			},
			
			detailsJump:function(e){
				uni.navigateTo({
					url: './osm_detailsPage?id='+e
				})
			},

			//------------------------瀑布流-------------------------------------------

			addRandomData() {
				console.log('拿到的数据', this.list)
				for (let i = 0; i < 10; i++) {
					let index = this.$u.random(0, this.list.length - 1);
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(this.list[index]))
					// item.id = this.$u.guid();
					this.flowList.push(item);
				}
				console.log('拿到的数据2',this.flowList)
			},
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},

			//------------清空瀑布流的方法（现在暂时隐藏）-----------------------------------
			// clear() {
			// 	this.$refs.uWaterfall.clear();
			// }
		}
	}
</script>

<style lang="scss">
	//页面全局样式
	page {
		background-color: #f9f9f9;
	}

	.search {
		position: absolute;
		display: flex;
		z-index: 999;
		margin-top: 74upx;
		margin-left: 20upx;
		width: 92%;
	}

	.return {
		font-size: 30upx;
		color: #FFFFFF;
		padding-top: 10upx;
	}

	.sh_news {
		margin-left: 20upx;
		margin-top: 10upx;
	}

	//金刚区样式
	.h_vajraDistrict {
		background: #FFFFFF;
		padding: 0 16upx;
		display: flex;

		.vd_item {
			word-wrap: break-word;
			width: 100%;

			.item_view {
				width: 20%;
				text-align: center;
				padding: 32upx 0upx;
				float: left;

				.view_image {
					width: 104upx;
					height: 104upx;
				}

				.view_text {
					font-size: 28upx;
					color: #333333;
					display: block;
				}
			}
		}
	}

	.realTimeInfo {
		background: #FFFFFF;
		display: flex;

		.rti_block {
			width: 34%;
			padding: 30upx 20upx;
			border-right: 1upx solid #F5F5F5;

			.title {
				display: block;
				font-size: 30upx;
				font-weight: bold;
				color: #333333;
			}

			.content {
				display: block;
				font-size: 28upx;
				color: #999999;
				padding-top: 20upx;
			}

			.image {
				width: 100%;
				height: 104upx;
				padding-top: 40upx;
			}
		}
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}

	.wrap {
		height: 200vh;
	}
</style>
