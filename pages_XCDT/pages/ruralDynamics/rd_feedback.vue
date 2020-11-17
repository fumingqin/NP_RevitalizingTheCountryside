<template>
	<view>
		<!-- 顶部搜索框 -->
		<view class="serchView" style="margin-top: 20upx;">
			<view class="SearchBar" elevation='5px'>
				<image class="iconImage" src="../../../static/LYFW/agricultureProducts/sousuo.png"></image>
				<input class="addressInput" @input="onInput" placeholder="请输入关键字搜索" />
			</view>
		</view>
		
		<!-- 问题区域 -->
		<view class="serchView">
			<view class="problemContent">
				<text class="title">猜你想问</text>
				<view style="margin-top: 15upx;">
					<u-read-more :toggle="true" show-height="500" close-text="查看更多问题">
						<view class="content" v-for="(item,index) in text" :key="index">
							<text>{{item.title}}</text>
						</view>
					</u-read-more>
				</view>
			</view>
		</view>
		
		<!-- 广告 -->
		<view class="banner">
			<u-image width="100%" height="230rpx" :src="src">
				<u-loading slot="loading"></u-loading>
				<view slot="error" style="font-size: 24rpx;">加载失败</view>
			</u-image>
		</view>
		
		<!-- 用户评论 -->
		<view class="serchView">
			<view class="problemContent">
				<text class="title">用户评论</text>
				<view class="comment" v-for="(item,index) in commentArea" :key="index">
					<!-- 评论用户个人信息 -->
					<view class="personalInformation">
						<u-avatar :src="item.headPortrait"></u-avatar>
						<text class="userName">{{item.name}}</text>
						<text class="timePublication">{{item.time}}</text>
					</view>
					<!-- 评论内容 -->
					<view class="comments">
						<!-- 评论内容 -->
						<text class="userComments">{{item.content}}</text>
						<!-- 评论图片 -->
						<view>
							<image class="commentsImage" v-for="(item2,index) in item.contentImage" :key="index" :src="item2" mode="aspectFill"></image>
						</view>
						<!-- 回复评论 -->
						<view class="replyArea" v-for="(item3,index) in item.replyArea" :key="index">
							<text class="replyingPerson">{{item3.replyingPerson}}：<text class="replyContent">{{item3.replyContent}}</text></text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:'/pages_XCDT/static/LYFW/agricultureProducts/banner.png',
				commentArea:[{
					headPortrait:'/pages_XCDT/static/LYFW/agricultureProducts/touxiang.png',
					name:'叮当猫',
					content:'漳州也是依托旅游拓展经济,希望不要再出什么30天无理由退货了',
					time:'2020-10-10 21:00',
					contentImage:['/pages_XCDT/static/LYFW/agricultureProducts/banner.png','/pages_XCDT/static/LYFW/agricultureProducts/banner.png','/pages_XCDT/static/LYFW/agricultureProducts/banner.png',],
					replyArea:[{
						replyingPerson:'漳州达达通小弟',
						replyContent:'您好！感谢您的意见和建议，同时感谢您的支持，在今后的使用过程中有任何疑问，可随时拨打400-88-96301向',
					}],
				},
				{
					headPortrait:'/pages_XCDT/static/LYFW/agricultureProducts/touxiang.png',
					name:'叮当猫',
					content:'漳州也是依托旅游拓展经济,希望不要再出什么30天无理由退货了',
					time:'2020-10-10 21:00',
					contentImage:[],
					replyArea:[{
						replyingPerson:'漳州达达通小弟',
						replyContent:'您好！感谢您的意见和建议，同时感谢您的支持，在今后的使用过程中有任何疑问，可随时拨打400-88-96301向',
					}],
				}],
				text:[{
					title:'什么是助力车套餐？'
				},
				{
					title:'功能不齐全，经常闪退！'
				},
				{
					title:'无法按时退款，退款时间延迟？'
				},
				{
					title:'优惠活动力度不大，免单金额怎么处理！'
				},
				{
					title:'用户体验不顺畅，提升功能！'
				},
				{
					title:'如何自动续费？'
				},
				{
					title:'用户体验不顺畅，提升功能！'
				},
				{
					title:'用户体验不顺畅，提升功能！'
				},
				{
					title:'用户体验不顺畅，提升功能！'
				},
				{
					title:'优惠活动力度不大，免单金额怎么处理！'
				},
				{
					title:'优惠活动力度不大，免单金额怎么处理！'
				},
				{
					title:'优惠活动力度不大，免单金额怎么处理！'
				},
				{
					title:'优惠活动力度不大，免单金额怎么处理！'
				}]
			}
		},
		onLoad() {
			this.userData();
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
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}
	
	.serchView {
		padding-bottom: 20rpx;
	}
	
	.SearchBar {
		display: flex;
		background-color: #FFFFFF;
		margin-right: 20rpx;
		margin-left: 20rpx;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		flex-direction: row;
		border-radius: 9px;
		padding: 20upx 30upx;
		align-items: center;
		justify-content: space-between;
	}
	
	.problemContent{
		display: block;
		background-color: #FFFFFF;
		margin-right: 20rpx;
		margin-left: 20rpx;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		flex-direction: row;
		border-radius: 9px;
		padding: 30upx;
		align-items: center;
		justify-content: space-between;
	}
	
	.iconImage{
		width: 34upx;
		height: 34upx;
	}
	
	//地址搜索输入
	.addressInput {
		color: #999999;
		font-size: 30rpx;
		font-weight: 300;
		width: 100%;
		padding-left: 10upx;
	}
	
	.title{
		font-size: 34upx;
		font-weight: bold;
		color: #333333;
	}
	
	.content{
		padding: 15upx 0;
	}
	
	.banner{
		padding: 0 20upx 20upx 20upx;
	}
	
	//评论
	.comment{
		padding-top: 40upx;
	}
	
	.personalInformation{
		display: flex;
	}
	
	//用户名称
	.userName{
		width: 100%;
		color: #333333;
		font-size: 32upx;
		font-weight: bold;
		padding-left: 18upx;
		padding-top: 10upx;
	}
	
	//发表时间
	.timePublication{
		width: 100%;
		text-align: right;
		color: #999999;
		font-size: 28upx;
		padding-top: 10upx;
	}
	
	//评论内容
	.comments{
		// display: block;
		width: 100%;
		margin: 12upx 0;
		
		.userComments{
			// width: 86%;
			font-size: 30upx;
			color: #333333;
			text-align: justify;
			line-height: 48rpx;
		}
		
		.commentsImage{
			width: 204upx;
			height: 204upx;
			padding:0 8upx;
			margin-top: 20upx;
		}
		
		//回复区域
		.replyArea{
			padding: 26upx;
			background: #F5F9FB;
			margin-top: 20upx;
			width: 100%;
			border-radius: 5px;
			text-align: justify;
			line-height: 48rpx;
			
			.replyingPerson{
				font-size: 30upx;
				color: #576B95;
				
				.replyContent{
					font-size: 30upx;
					color: #999999;
				}
			}
		}
	}
</style>
