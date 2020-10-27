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
				groupTitle: [{
						imgUrl: '',
						title: '商品名',
						content: '农产品流通重点设施建设，商品商品商品商品商品商品商品商品商品商品',
						count: 122,
						cost: 1200,
						id: 1,
						updatedTime: '2020-09-12',
						colleagueStatus: true
					},
					{
						imgUrl: '',
						title: '商品名',
						content: '农产品流通重点设施建设，商品商品商品商品商品商品商品商品商品商品',
						count: 122,
						cost: 1200,
						id: 2,
						updatedTime: '2020-09-12',
						colleagueStatus: false
					},
					{
						imgUrl: '',
						title: '商品名',
						content: '农产品流通重点设施建设，商品商品商品商品商品商品商品商品商品商品',
						count: 122,
						cost: 1200,
						id: 3,
						updatedTime: '2020-09-12',
						colleagueStatus: false
					},
					{
						imgUrl: '',
						title: '商品名',
						content: '农产品流通重点设施建设，商品商品商品商品商品商品商品商品商品商品',
						count: 122,
						cost: 1200,
						id: 4,
						updatedTime: '2020-09-12',
						colleagueStatus: true
					},
					{
						imgUrl: '',
						title: '商品名',
						content: '农产品流通重点设施建设，商品商品商品商品商品商品商品商品商品商品',
						count: 122,
						cost: 1200,
						id: 5,
						updatedTime: '2020-09-12',
						colleagueStatus: true
					},
					{
						imgUrl: '',
						title: '商品名',
						content: '农产品流通重点设施建设，商品商品商品商品商品商品商品商品商品商品',
						count: 122,
						cost: 1200,
						id: 6,
						updatedTime: '2020-09-12',
						colleagueStatus: true
					}
				],
				selectId: '', //去出id
				selectIndex: 0, //下标
				loadingType: 0, //加载更多状态
				loadingText: {
					down: '上拉加载更多',
					refresh: '正在加载...',
					nomore: '没有更多了',
				},
				scenicListIndex: 5, //列表默认数量
			}
		},
		onReachBottom() {
			this.getMore();
		},

		methods: {
			//---------------------------跳转详情页----------------------
			details() {
				console.log('aaa')
				uni.navigateTo({
					url: '../goodsDetails'
				})
			},
			//----------------------加载更多--------------------------------
			getMore() {
				this.loadingType = 1;

				if (this.scenicListIndex < this.groupTitle.length) {
					var a = this.scenicListIndex + 6;
					this.scenicListIndex = a;
					this.loadingType = 0;
				}
				if (this.scenicListIndex >= this.groupTitle.length) {
					this.loadingType = 2;
				}
			},
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

					.TitleContent {
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

						.contentCost {
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

		.select {
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
