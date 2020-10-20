<template>
	<view>
		<view>
			<view style="margin-top: 30upx;padding-left: 32upx;">
				<scroll-view class="to_scroll" scroll-x="true" >
					<u-button type="success" :ripple="true" shape="square" ripple-bg-color="#909399" size="medium" :custom-style="customStyle" v-if="groupTitle[selectIndex].colleagueStatus == true">发布中</u-button>
					<u-button type="success" :ripple="true" shape="square" ripple-bg-color="#909399" size="medium" :custom-style="customStyle" v-if="groupTitle[selectIndex].colleagueStatus == false">未发布</u-button>
					<u-button type="success" :ripple="true" shape="square" ripple-bg-color="#909399" size="medium" :custom-style="customStyle">删除</u-button>
					<u-button type="success" :ripple="true" shape="square" ripple-bg-color="#909399" size="medium" :custom-style="customStyle">添加</u-button>
					<u-button type="success" :ripple="true" shape="square" ripple-bg-color="#909399" size="medium" :custom-style="customStyle">修改</u-button>
				</scroll-view>
			</view>
		</view>
		
		<!-- 内容1 -->
		<view>
			<view class="content">
				<view class="groupTour" :class="{'select':selectIndex == index}" @tap="selectClick(index)" v-for="(item,index) in groupTitle" :key="index" v-if="index < scenicListIndex">
					<view class="groupContent">
						<image class="contentImage" :src="item.imgUrl" mode="aspectFill"></image>
					</view>
					<view class="groupText">
						<!-- <text class="contentLabel">{{item2.contentLabelS1}} | {{item2.contentLabelS2}} | {{item2.contentLabelS3}}</text> -->
						<view class="groupCost">
							<view class="TitleContent">
								<text class="contentText">{{item.title}}</text>
								<!-- <text class="contentCost">￥{{item.cost}}</text> -->
							</view>
							<view class="projectContent">{{item.content}}</view>
							<text class="cost">{{item.updatedTime}}&nbsp;&nbsp;{{item.count}}浏览量</text>
							<text class="sellComment" style="color: #5AD234;" v-if="item.colleagueStatus==true">发布中</text>
							<text class="sellComment" style="color: #ff0000;" v-if="item.colleagueStatus==false">未发布</text>
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
				customStyle: { //button样式
					paddingTop: '25px',
					paddingBottom: '25px',
					paddingLeft: '30px',
					paddingRight: '30px',
					marginRight: '16px',
					background: '#FFFFFF',
					borderRadius: '10px',
					color: '#161616',
					fontSize:'17px',
				},
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
			this.userData();
			this.ycydData();
		},
		
		onReachBottom() {
			this.getMore();
		},
		
		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData:function() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						console.log('获取个人信息',this.userInfo)
					}
				});
			},
			
			//--------------------点击列表事件------------------------------
			selectClick:function(e){
				//给选择的下标赋值
				this.selectIndex = e;
				console.log('上车点下标赋值',this.selectIndex)
				//取出id
				// this.selectId = this.groupTitle[e].id;
				// console.log('取出id',this.selectId)
			},
			
			//----------------------列表接口--------------------------------
			ycydData:function(){
				uni.request({
					url:this.$ycyd.KyInterface.getArchivesByUserID.Url,
					method:this.$ycyd.KyInterface.getArchivesByUserID.method,
					success:(res) =>{
						console.log('列表数据',res)
						this.groupTitle=res.data.data;
						// console.log('列表数据',this.groupTitle)
					},
					fail(res) {
						// console.log(res)
					}
				})
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
			padding-top: 26upx;
			padding-bottom: 26upx;
			padding-left: 30upx;
			padding-right: 30upx;
			margin-bottom: 20upx;
			border-radius: 20upx;
	
			.groupContent {
	
				// display: flex;
				.contentImage {
					width: 190upx;
					height: 100%;
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
							font-size: 32upx;
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
							font-size: 30upx;
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
