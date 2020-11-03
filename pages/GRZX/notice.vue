<template>
	<view> 
		<view v-for="(item, index) in tweetArticle" :key="index" class="boxClass">
			<view class="timeClass">{{item.create_time}}</view>
			<view class="boxClass1" @click="selete(item)">
				<view class="titleClass generalStyle">{{item.title}}</view>
				<view class="imgClass generalStyle">
					<image :src="item.image" style="width: 100%;" mode="widthFix" role="img"></image>
				</view>
				<!-- <rich-text class="textClass generalStyle" :nodes="item.content"></rich-text> -->
				<view class="detailClass generalStyle">
					<text class="detailText">查看详情</text>
					<text class="more-icon jdticon icon-you"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tweetArticle:[],	//推文列表
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.loadData();
		},
		methods:{
			//------------------加载通知----------------
			loadData:function(){
				var that = this;
				uni.request({
					url:this.$home.KyInterface.getNotice.Url,
					method:this.$home.KyInterface.getNotice.method,
					success:(res)=>{
						// console.log('公告通知',res)
						this.tweetArticle = res.data.data;
						// console.log(this.tweetArticle)
					},
					fail:function(err){
						console.log(err)
						uni.showToast({
							title:'公告通知',
							icon:'none'
						})
					}
				})
			},
			
			//------------------选择通知----------------
			selete(e){
				uni.setStorage({
					key:'detailTweet',
					data:e
				})
				uni.navigateTo({
					url:'detailTweet'
				})
			},
			
		}
		
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F9FA;
	}
	.boxClass{
		display: flex;
		flex-direction: column;
		margin-top: 24upx;
		margin-bottom: 30upx;
	}
	.boxClass1{
		width: 92%;
		background-color: #FFFFFF;
		margin-top: 20upx;
		margin-left: 4%;
		//margin-bottom: 20upx;
		border-radius: 10upx;
	}
	.generalStyle{
		width: 92%;
		margin-left: 4%;
	}
	.titleClass{	//标题
		font-size: 32upx;
		color: #333333;
		line-height: 90upx;
		height: 90upx;
	}
	.textClass{		//正文
		font-size: 28upx;
		color: #333333;
		line-height: 50upx;
		height: 54upx;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		
	}
	.imgClass{		//图片
	
	}
	.more-icon{
		font-size: 32upx;
		padding-left: 79%;
	}
	.detailClass{
		height: 80upx;
		line-height: 77upx;
		// border-top: 1rpx solid #DDDDDD;
	}
	.detailText{
		font-size: 24upx;
		color: #707070;
	}
	.timeClass{		//时间
		color: #707070;
		font-size: 28upx;
		height: 40upx;
		line-height: 40upx;
		width: 100%;
		text-align: center;
	}
</style>
