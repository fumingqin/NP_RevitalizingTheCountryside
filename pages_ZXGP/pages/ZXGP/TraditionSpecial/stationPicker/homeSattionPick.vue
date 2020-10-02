<template>
	<view>
		<!-- 顶部搜索框 -->
		<view class="topSerchView">
			<view class="SearchBar" elevation='5px' style="">
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
		<!-- 联动列表 -->
		<view class="list_box" v-if="type== '车票订购'">	
			<!-- 左边的列表 -->
			<view class="left">
				<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
					<view class="item" v-for="(item,index) in stationArray" :key="index" :class="{ 'active':index==leftIndex }"
					 @click="leftTap(index)">{{item.cityName}}</view>
				</scroll-view>
			</view>
			
			<!-- 右边的列表 -->
			<view class="main">
				<swiper class="swiper" :style="{ 'height':scrollHeight }" vertical="true" duration="300">
					<swiper-item>
						<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
							<view class="item">
								<view class="goods" v-for="(item,index) in mainArray" :key="index" @click="detailStationTap(item)">
									<view>
										<view>{{item.countys}}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<!-- 联动列表 -->
		<view class="list_box" v-if="type=='邵泰专线' || type== '武夷新区专线'">
			<view class="main">
				<swiper class="swiper" :style="{ 'height':scrollHeight }" vertical="true" duration="300">
					<swiper-item>
						<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
							<view class="item">
								<view class="goods" v-for="(item,index) in mainArray" :key="index" @click="detailStationTap(item)">
									<view>
										<view>{{item.LineName}}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	// import $Zxgp from "@/common/zxgp.js"
	import $KyInterface from "@/common/Ctky.js"
	export default {
		data() {
			return {
				scrollHeight:'500px',
				stationArray:[],
				leftArray:[],
				mainArray:[],
				leftIndex:0,
				keywordList: [],
				isShowAllList:true,//是否显示联动列表
				isShowList:false,//是否显示站点列表
				stationType:'',//判断上个页面点击的是上车点还是下车点
				type:'',
			}
		},
		onLoad(param){
			var that = this;
			that.stationType = param.station;
			that.type = param.type;
			that.applyName = that.$oSit.Interface.system.appName;
			that.applyName2 = that.$oSit.Interface.system.applyName2;
			that.applyName4 = that.$oSit.Interface.system.applyName4;
			that.applyName5 = that.$oSit.Interface.system.applyName5;
			console.log(that.type);
			/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = `${res.windowHeight}px`;
				}
			});
			//获取站点列表
			that.getBusStationList();
		},
		onShow() {
			var that = this;
			
		},
		methods: {
			//-------------------------获取车站列表数据-------------------------
			getBusStationList() {
				uni.showLoading();
				// console.log($Zxgp.KyInterface.Cs_GetInsuranceCheckState.Url)
				// console.log($KyInterface.KyInterface.getStations.Url)
				if(this.type=='车票订购'){
					var systemNameCode = '八闽出行';
					uni.request({
						url: $KyInterface.KyInterface.getStations.Url,
						method: $KyInterface.KyInterface.getStations.method,
						data:{
							systemName: systemNameCode
						},
						success: (res) => {
							
							uni.hideLoading();
							var a=res.data;
							var b=JSON.parse(a);
							console.log('请求接口的数据：', b)
							// console.log(this.stationArray)
							if (b.length != 0) {
								for (var i = 0; i < b.length; i++) {
									var cityNameArray = {
										cityName : b[i].cityName,
										countysArray : []
									}
									// console.log(cityNameArray)
									this.stationArray.push(cityNameArray);
									// console.log(this.stationArray)
									
									for (var j = 0; j < b[i].countys.length;j++) {
										var countysArray = {
											countys : b[i].countys[j]
										}
										// console.log(countysArray)
										this.stationArray[i].countysArray.push(countysArray);
									}
								}
								this.mainArray = this.stationArray[0].countysArray;
								// console.log(this.mainArray)
								
							}
						},	
						fail(res) {
							uni.hideLoading();
						}
					})
				}else if(this.type=='邵泰专线' || this.type=='武夷新区专线'){
					uni.request({
						url: $KyInterface.KyInterface.GetLineName.Url,
						method: $KyInterface.KyInterface.GetLineName.method,
						data:{
							AppSystemName:this.type
						},
						success: (res) => {
							uni.hideLoading();
							// console.log('type2路线',res)
							if(res.data.data.length != 0){
								this.mainArray = res.data.data;
								// console.log(this.mainArray)
							}
						},
						fail(res) {
							uni.hideLoading();
						}
					})
				}
			},
			//-------------------------监听输入-------------------------
			onInput(event){
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
					url:$KyInterface.KyInterface.GetLineNameByKey.Url,
					method:$KyInterface.KyInterface.GetLineNameByKey.method,
					data:{
						AppSystemName:this.type,
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
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i].LineName;
					var start = keywords[i].StartSite;
					var end = keywords[i].EndSite;
					//定义高亮#9f9f9f
					var html = row.replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row,
						htmlStr: html,
						StartSite:start,
						EndSite:end
					};
					keywordArr.push(tmpObj)
					// console.log(keywordArr)
				}
				return keywordArr;
			},
			//-------------------------点击下拉站点-------------------------
			itemClick(index){
				var that = this;
				//获取点击选项的文字
				var key = this.keywordList[index];
				// console.log(key)
				if(this.type=='邵泰专线' || this.type=='武夷新区专线'){
					//当前是上车点
					uni.$emit('startstaionChange', {
						data: key.StartSite,
						data2: key.EndSite,
					});
					uni.navigateBack({});
				}else {
					uni.showToast({
						title:'暂无搜索',
						icon:'none'
					})
				}
			},
			//-------------------------点击站点-------------------------
			detailStationTap(item){
				// console.log(item.countys);
				var that = this;
				if(this.type=='车票订购'){
					if (that.stationType == 'qidian') {
						//当前是上车点
						uni.$emit('startstaionChange', {
						    data: item.countys
						});
						uni.navigateBack({ });
					}else if(that.stationType == 'zhongdian') {
						//当前是下车点
						uni.$emit('endStaionChange', {
						    data: item.countys
						});
						uni.navigateBack({ });
					}
				}else if(this.type=='邵泰专线' || this.type=='武夷新区专线'){
					//当前是上车点
					uni.$emit('startstaionChange', {
						data: item.StartSite,
						data2: item.EndSite,
					});
					uni.navigateBack({});
				}
			},
			
			//-------------------------左侧导航点击-------------------------
			leftTap:function(e){
				var that = this;
				// console.log(e)
				this.leftIndex = e;
				// console.log(this.leftIndex)
				that.mainArray = that.stationArray[e].countysArray;
			},
			
			swiperChange(e){
				var that = this;
				let index=e.detail.current;
				this.leftIndex=Number(index);
				that.mainArray = that.stationArray[e.detail.current].countysArray;
			}
		}
	}
</script>

<style lang="scss">
	.topSerchView {
		background-color: #DBDBDB;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.SearchBar {
		background-color: #FFFFFF;
		margin-right: 20rpx;
		margin-left: 20rpx;
		box-shadow: 0px 4px 9px 1px rgba(204, 204, 204, 1);
		flex-direction: row;
		border-radius: 9px;
		padding: 20rpx;
		align-items: center;
		justify-content: space-between;
	}

	//地址搜索输入
	.addressInput {
		color: #999999;
		font-size: 30rpx;
		font-weight: 300;
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

	.list_box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 28rpx;

		.left {
			width: 200rpx;
			background-color: #f6f6f6;
			line-height: 80rpx;
			box-sizing: border-box;
			font-size: 32rpx;
			text-align: center;

			.item {
				padding-left: 20rpx;
				position: relative;
				padding: 8upx 0;

				&:not(:first-child) {
					margin-top: 1px;

					&::after {
						content: '';
						display: block;
						height: 0;
						border-top: #d6d6d6 solid 1px;
						width: 620upx;
						position: absolute;
						top: -1px;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}

				&.active,
				&:active {
					color: #42b983;
					background-color: #fff;
					padding: 8upx 0;
				}
			}
		}

		.main {
			background-color: #fff;
			padding-left: 20rpx;
			width: 0;
			flex-grow: 1;
			box-sizing: border-box;

			.swiper {
				height: 500px;
			}


			.item {
				padding-bottom: 10rpx;
			}
		}

		.goods {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin-bottom: 10rpx;
			border-bottom: 1rpx solid #eeeeee;
			line-height: 100upx;
			padding-left: 20upx;
		}
	}
</style>
