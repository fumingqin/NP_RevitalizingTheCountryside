<template>
	<view>
		<!-- 顶部搜索框 -->
		<view class="serchView" style="margin-top: 20upx;">
			<view class="SearchBar" elevation='5px'>
				<image class="iconImage" src="../../../../pages_MQFK/static/LYFW/agricultureProducts/sousuo.png"></image>
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
		
		<!-- 历史搜索 -->
		<view class="historySearch" v-if="cacheStatus==true">
			<view class="hs_view">
				<text class="hs_text">历史记录</text>
				<view style="position: absolute;right: 0;" @click="clickHistory">
					<u-icon name="trash" color="#333333" size="40"></u-icon>
				</view>
			</view>
			<view class="historyListView">
				<text class="historyText" @tap="historyItemTap(index)" v-for="(item,index) in historyLines" :key="index">{{item}}</text>
			</view>
		</view>
		
		<view class="historySearch">
			<view class="hs_view">
				<text class="hs_text">搜索发现</text>
			</view>
			<view class="historyListView">
				<text class="historyText" @tap="historyItemTap(index)" v-for="(item,index) in searchDiscovery" :key="index">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollHeight:'700px',
				keywordList: [],//搜索
				historyLines:[],//拿取搜索缓存
				isShowAllList:true,//是否显示联动列表
				isShowList:false,//是否显示站点列表
				cacheStatus:false,//历史记录状态
				searchDiscovery:['我不知道','我知道','发现了什么','不知道发现了什么','懂王败选','拜登吃屎','没有人比我更懂新冠',]
			}
		},
		
		onLoad() {
			this.cacheData();
			/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = `${res.windowHeight}px`;
				}
			});
		},
		
		methods: {
			//----------------------拿取搜索缓存------------------------
			cacheData:function(){
				uni.getStorage({
					key: 'historyLines',
					success: (res) => {
						this.historyLines = res.data;
						if(this.historyLines.length<=1){
							this.cacheStatus=true;
						}
						console.log('拿取搜索缓存',this.historyLines)
					},
				});
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
					url:this.$wssc.KyInterface.getHomepageByKey.Url,
					method:this.$wssc.KyInterface.getHomepageByKey.method,
					data:{
						key:keyword
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
					var name = keywords[i].name;
					//定义高亮#9f9f9f
					var html = name.replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						content: content,
						htmlStr: html,
						name:name
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
					name: key.name,
				}
				if(this.historyLines) {
					for(let i = 0; i <= this.historyLines.length;i++){
						this.historyLines.splice(i,1);
					}
					this.historyLines.unshift(array.name);
				}
				uni.navigateTo({
					url: './osm_list?name='+this.historyLines
				})
			},
			
			//---------------------------------清除历史---------------------------------
			clickHistory: function() {
				this.historyLines = [];
				uni.removeStorageSync('historyLines');
				this.cacheStatus=false;
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #FFFFFF;
	}
	
	.serchView {
		padding-bottom: 20rpx;
	}
	
	.SearchBar {
		display: flex;
		background-color: #F1F1F1;
		color: #999999;
		margin-right: 30rpx;
		margin-left: 30rpx;
		// box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		flex-direction: row;
		border-radius: 50px;
		padding: 20upx 30upx;
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
	
	.historySearch{
		margin-top: 30upx;
		margin-left: 30upx;
		margin-right: 30upx;
	}
	 
	.hs_view{
		position: relative;
		display: flex;
		
		.hs_text{
			font-size:32upx;
			font-weight: bold;
			color: #333333;
		}
	}
	
	//搜索列表
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
	
	.historyListView{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-top: 10upx;
	}
	
	.historyText{
		font-size: 28upx;
		color: #999999;
		background:#F7F7F7;
		border-radius: 50px;
		padding: 20upx 40upx;
		margin-right: 20upx;
		margin-top: 20upx;
	}
</style>
