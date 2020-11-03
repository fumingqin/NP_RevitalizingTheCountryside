<template>
	<view>
		<!-- 顶部搜索框 -->
		<view class="serchView" style="margin-top: 20upx;">
			<view class="SearchBar" elevation='5px'>
				<image class="iconImage" src="../../static/LYFW/agricultureProducts/sousuo.png"></image>
				<input class="addressInput" @input="onInput" placeholder="请输入关键字搜索" />
			</view>
		</view>
		
		<!-- 搜索列表 -->
		<view class="stationList" :style="{ 'height':scrollHeight }" v-if="isShowList">
			<block v-for="(item,index) in keywordList" :key="index">
				<view class="listItem" @click="itemClick(index)">
					<rich-text :nodes="item.htmlStr"></rich-text>
				</view>
			</block>
		</view>
		
		<!-- 问题区域 -->
		<view class="serchView">
			<view class="problemContent">
				<text class="title">猜你想问</text>
				<view style="margin-top: 15upx;">
					<u-read-more :toggle="true" show-height="500" text-indent="0" close-text="查看更多问题">
						<view class="content" v-for="(item,index) in listTitle" :key="index" @click="routeJump2(listTitle[index])">
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
				<view class="comment" v-for="(item,index) in groupTitle" :key="index">
					<!-- 评论用户个人信息 -->
					<view class="personalInformation">
						<u-avatar :src="item.avatar"></u-avatar>
						<view class="user">
							<view class="userName">{{item.nick_name}}</view>
							<view class="timePublication">{{informationDate(item.create_time)}}</view>
						</view>
					</view>
					<!-- 评论内容 -->
					<view class="comments">
						<!-- 评论内容 -->
						<text class="userComments">{{item.content}}</text>
						<!-- 评论图片 -->
						<view v-if="item.image!==''">
							<image class="commentsImage" :src="item.image" mode="aspectFill"></image>
						</view>
						<!-- 回复评论 -->
						<view class="replyArea" v-if="item.title!==''">
							<text class="replyingPerson">客服回复：<text class="replyContent">{{item.title}}</text></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="buttonClass" v-if="!isShowList">
			<image class="btnClass" src="../../static/LYFW/agricultureProducts/pinglun.png" @click="routeJump"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollHeight:'500px',
				groupTitle:[],
				listTitle:[],
				src:'/pages_MQFK/static/LYFW/agricultureProducts/banner.png',
				keywordList: [],
				isShowAllList:true,//是否显示联动列表
				isShowList:false,//是否显示站点列表
			}
		},
		
		onLoad() {
			this.wtfkData();
			/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = `${res.windowHeight}px`;
				}
			});
		},
		
		onShow() {
			uni.showLoading({
				title: '加载列表中...',
			})
			this.userData();
		},
		
		onUnload() {
			uni.hideLoading();
		},
		
		onPullDownRefresh: function() {
			uni.showLoading({
				title: '加载列表中...',
			})
			this.userData();
		},
		
		onReachBottom() {
			// this.getMore();
		},
		
		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData:function() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						console.log('获取个人信息',this.userInfo)
						this.ycydData();
					}
				});
			},
			
			//--------------------------路由跳转(添加列表文章)------------------------------
			routeJump:function(){
				uni.navigateTo({
					url:'./pf_addPage'
				})
			},
			
			//--------------------------路由跳转(添加列表文章)------------------------------
			routeJump2:function(item){
				var array = {
					content: item.content,
					title: item.title,
					create_time: item.create_time,
				}
				uni.setStorage({
					key: 'listTitleData',
					data: array,
					success() {
						uni.navigateTo({
							url: 'pf_details'
						})
					},
					fail() {
						
					}
				});
			},
			
			//----------------------列表接口--------------------------------
			ycydData:function(){
				uni.showLoading({
					title: '加载列表中...',
				})
				uni.request({
					url:this.$mqfk.KyInterface.getFeedback.Url,
					method:this.$mqfk.KyInterface.getFeedback.method,
					success:(res) =>{
						console.log('列表数据',res)
						if(res.data.status == true){
							this.groupTitle=res.data.data;
							// console.log('列表数据',this.groupTitle)
							uni.stopPullDownRefresh();
							uni.hideLoading();
						}else{
							this.groupTitle=res.data.data;
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
			
			wtfkData:function(){
				uni.request({
					url:this.$mqfk.KyInterface.getFeedbackDemo.Url,
					method:this.$mqfk.KyInterface.getFeedbackDemo.method,
					success:(res) =>{
						console.log('列表数据2',res)
						if(res.data.status == true){
							this.listTitle=res.data.data;
							// console.log('列表数据',this.groupTitle)
							uni.stopPullDownRefresh();
							uni.hideLoading();
						}else{
							this.groupTitle=res.data.data;
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
			
			//--------------------时间--------------------------
			informationDate: function(e) {
				// console.log(e)
				var tsetDate = e.replace('T', ' ')
				var a = tsetDate.substr(0, 11)
				return a;
			},
			
			//-------------------------监听输入-------------------------
			onInput:function(event){
				var keyword = event.detail?event.detail.value:event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowList = false;
					this.isShowAllList = true;
					return;
				}
				this.isShowList = true;
				this.isShowAllList = false;
				//以下示例截取淘宝的关键字，请替换成你的接口
				uni.showLoading();
				uni.request({
					url:this.$mqfk.KyInterface.getFeedbackByKeyword.Url,
					method:this.$mqfk.KyInterface.getFeedbackByKeyword.method,
					data:{
						keyword:keyword
					},
					success: (res) => {
						uni.hideLoading();
						console.log('模糊搜索',res);
						this.keywordList = [];
						this.keywordList = this.drawCorrelativeKeyword(res.data.data, keyword);
					},
					fail(res) {
						uni.hideLoading();
					}
				});
			},
			
			//-------------------------高亮关键字-------------------------
			drawCorrelativeKeyword(keywords, keyword) {
				// console.log(keywords);
				// console.log(keyword);
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var content = keywords[i].content;
					var create_time = keywords[i].create_time;
					var title = keywords[i].title;
					//定义高亮#9f9f9f
					var html = content.replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						content: content,
						htmlStr: html,
						create_time:create_time,
						title:title
					};
					keywordArr.push(tmpObj)
					// console.log(keywordArr)
				}
				return keywordArr;
			},
			
			//-------------------------点击下拉站点-------------------------
			itemClick(index){
				console.log(index)
				var that = this;
				//获取点击选项的文字
				var key = this.keywordList[index];
				console.log(key)
				var array = {
					content: key.content,
					title: key.title,
					create_time: key.create_time,
				}
				uni.setStorage({
					key: 'listTitleData',
					data: array,
					success() {
						uni.navigateTo({
							url: 'pf_details'
						})
					},
					fail() {
						
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
	
	.user{
		padding-left: 18upx;
	}
	
	//用户名称
	.userName{
		color: #333333;
		font-size: 32upx;
		font-weight: bold;
		padding-top: 6upx;
	}
	
	//发表时间
	.timePublication{
		color: #999999;
		font-size: 26upx;
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
	
	.buttonClass {
		position: fixed;
		bottom: 20upx;
		right: 24upx;
	
		.btnClass {
			width: 50px;
			height: 50px;
			padding: 20upx 0;
			border-radius: 15upx;
			font-size: 34upx;
		}
	}
	
	//站点列表
	.stationList {
		background-color: #FFFFFF;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		height: 100rpx;
	
		.listItem {
			margin-left: 20rpx;
			border-bottom: 1rpx solid #eeeeee;
		}
	}
</style>
