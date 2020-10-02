<template>
	<view>
		<!-- 轮播区 -->
		<u-swiper :list="rotationChart" :height="422" indicator-pos="bottomRight" name="ImageURL"></u-swiper>
		<!-- 金刚区 -->
		<view class="h_vajraDistrict " circular>
			<view class="vd_item" v-for="(item,index) in functionArray" :key="index">
				<view class="item_view" v-for="(item2,index2) in item.array" :key="index2" v-if="item2.display == true">
					<view class="view_image" @click="itemClick(item2.entrance)">
						<image :class="item2.system" mode="aspectFit" :src="item2.image" lazy-load="true"></image>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 资讯区 -->
		<u-notice-bar  :list="information" :volume-icon="false" type="warning" font-size="26"></u-notice-bar>
		<view class="h_information" @click="itemClick('../ZXDT/zxdt_information')">
			<image class="inf_image" src="../../static/home/information/dongtai.png"></image>
			<view  class="inf_view">
				<swiper class="inf_view_swiper" vertical autoplay circular>
					<swiper-item v-for="(item,index) in information2" :key="index">
						<view class="inf_view_swiper_view">{{item.Title}}</view>
					</swiper-item>
				</swiper>
				<view class="inf_view_view">点击查看资讯动态</view>
			</view>
		</view>
		
		<!-- 小功能引导区 -->
		<!-- <view class="h_guidanceArea">
			<u-row gutter="12">
				<u-col span="4">
					<view class="gui_view">
						<text class="gui_view_title">健康码</text>
						<text class="gui_view_text">快捷八闽健康码</text>
						<image class="gui_view_iamge" src="../../static/home/guidance/tuceng1.png" ></image>
					</view>
				</u-col>
				<u-col span="4">
					<view class="gui_view">
						<text class="gui_view_title">出行助手</text>
						<text class="gui_view_text">车站导航/找车车</text>
						<image class="gui_view_iamge" src="../../static/home/guidance/tuceng2.png" ></image>
					</view>
				</u-col>
				<u-col span="4">
					<view class="gui_view">
						<text class="gui_view_title">每日南平</text>
						<text class="gui_view_text">南平那些新鲜事</text>
						<image class="gui_view_iamge" src="../../static/home/guidance/tuceng3.png" ></image>
					</view>
				</u-col>
			</u-row>
		</view> -->
		
		<!-- 广告区 -->
		<u-swiper style="margin-top: 32upx;" :list="advertisingMap"  :effect3d="true" :title="true" name="ShowImageURL"></u-swiper>
		
		<!-- 快捷入口 -->
		<view class="h_quickEntry">
			<view class="qui_titleView">快捷车票</view>
			<view class="qui_imageview">
				<view class="qui_imageview_view" v-for="(item,index) in quickEntryData" :key="index" @click="quickEntryClick(item)">
					<image class="qui_imageview_view_image" :src="item.image" mode="aspectFill"></image>
					<text class="qui_imageview_view_text">{{item.start}} → {{item.end}}</text>
				</view>
			</view>
		</view>
		
		<!-- 隐藏协议弹出 -->
		<u-modal v-model="protocolStatus" :show-cancel-button="true"  confirm-text="同意" title="服务协议和隐私政策" @confirm="agreeProtocol">
			<view class="h_popupText">
				<text>请你务必审慎阅读，充分理解“软件许可及服务协议”和“隐私政策”各条款。</br>你可阅读</text>
				<text style="color: #2F9BFE;" @click="agreementClick">《软件许可及服务协议》</text>
				<text>和</text>
				<text style="color: #2F9BFE;" @click="privacyClick">《隐私政策》</text>
				<text>了解详细信息。</br>如你同意，请点击“同意”开始接受我们的服务。</text>
			</view>
		</u-modal>
		
		<!-- 发现新版本弹出 -->
		<u-modal v-model="upgradeStatus" :show-cancel-button="true"  confirm-text="升级" title="发现新版本" @confirm="agreeProtocol">
			<view class="h_popupText">
				<rich-text :nodes="upgradeContent"></rich-text>
			</view>
		</u-modal>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rotationChart: ['',''], //轮播图
				advertisingMap: ['','',''], //广告图
				information : ['邵泰专线来啦！10月1日正式上线！快来体验吧！'], //新闻列表
				information2 : ['',''], //新闻列表
				protocolStatus : false, //隐藏弹出层，f为不弹，t为弹
				upgradeStatus : false, //升级弹出层，f为不弹，t为弹
				currentDate : '', //当前时间
				upgradeContent : `
								1. 修复badge组件的size参数无效问题<br>
								2. 新增Modal模态框组件<br>
								3. 新增压窗屏组件，可以在APP上以弹窗的形式遮盖导航栏和底部tabbar<br>
								4. 修复键盘组件在微信小程序上遮罩无效的问题
								`,
				quickEntryData : [{
					start : '泰宁',
					end : '邵武',
					image : '../../static/home/temporary/xianlu.png' 
				},{
					start : '邵武',
					end : '泰宁',
					image : '../../static/home/temporary/xianlu.png'
				}], //快捷入口数据
				functionArray: [
					{
					array: [{
						name: '邵泰专线',
						image: '../../static/home/stzx/stcx.png',
						display: true,
						entrance: '../../pages_ZXGP/pages/ZXGP/TraditionSpecial/Home/stzxIndex',
						system:'KYCXIcon',
					}, {
						name: '客运专线', //功能名称
						image: '../../static/home/stzx/kyzx.png', //功能图标
						display: true, //是否显示
						entrance: '', //跳转路径
						system:'STZXIcon',
					}]}
				], //功能数组
			}
		},
		
		onLoad:function(){
			// uni.clearStorage()
			let pro = uni.getStorageSync('protocol')
			if(pro !== true){
				// this.protocolStatus = true;
			}
			this.loadData();
			this.getTodayDate();
			// #ifdef MP-WEIXIN
			// 校验小程序登录
			this.getLoginState();       
			//#endif
		},
			
		methods: {
			//加载数据
			loadData : function(){
				uni.request({
					url: this.$home.KyInterface.GetRotationChart.Url,
					method:this.$home.KyInterface.GetRotationChart.method,
					success:(res)=>{
						console.log('轮播区',res)
						this.rotationChart = res.data.data.filter(item => {
							return item.Type == '首页轮播图';
						})
						// console.log(this.rotationChart)
					},
					fail:function(){
						uni.showToast({
							title:'首页轮播图网络加载异常',
							icon:'none'
						})
					}
				})
				
				
				uni.request({
					url: this.$home.KyInterface.GetNews.Url,
					method:this.$home.KyInterface.GetNews.method,
					success:(res)=>{
						// console.log('新闻资讯',res)
						this.information2 = res.data.data;
						// console.log(this.rotationChart)
					},
					fail:function(){
						uni.showToast({
							title:'新闻资讯加载异常',
							icon:'none'
						})
					}
				})
				
				uni.request({
					url: this.$home.KyInterface.GetHomeStyle.Url,
					method:this.$home.KyInterface.GetHomeStyle.method,
					success:(res)=>{
						// console.log('广告区',res)
						this.advertisingMap = [];
						for(let i=0; i<res.data.data.length; i++){
							var a = {
								AID : res.data.data[i].AID,
								ShowImageURL : res.data.data[i].ShowImageURL,
								title : res.data.data[i].Title,
							}
							this.advertisingMap.push(a);
						}
						// console.log(this.rotationChart)
					},
					fail:function(){
						uni.showToast({
							title:'首页广告图网络加载异常',
							icon:'none'
						})
					}
				})
				
			},
			
			//获取时间
			getTodayDate() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
			    var timer = year + '-' + month + '-' + day;
				this.currentDate = timer;
				// console.log(this.currentDate)
			},
			
			//点击跳转
			itemClick:function(entrance){
				// console.log(entrance)
				if(entrance == ''){
					uni.showToast({
						title:'敬请期待',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:entrance,
					})
				}
			},
			
			//快捷车票跳转
			quickEntryClick:function(item){
				// console.log(item)
				uni.navigateTo({
					url:'../../pages_ZXGP/pages/ZXGP/TraditionSpecial/Order/selectTickets?&startStation=' +item.start +'&endStation=' +item.end +'&date=' + this.currentDate,
				})
			},
			
			//同意添弹框缓存 - 隐私服务
			agreeProtocol:function(){
				uni.setStorage({
					key:'protocol',
					data: true,
				})
			},
			//查看服务协议
			agreementClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.privacyService.url + '?title=软件许可及服务协议',
				})
			},
			//查看隐私政策
			privacyClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.privacyService.url + '?title=隐私政策',
				})
			},
			
			// #ifdef MP-WEIXIN
			getLoginState() {
				uni.getStorage({
					key: 'isCanUse',
					success(res) {},
					fail(err) {
						uni.showModal({
							content: '您暂未登录，是否登录',
							confirmText: '去登录',
							cancelText: '暂不登录',
							success(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/GRZX/wxAuthorize?type=index'
									})
								} else if (res.cancel) {
									// console.log('用户点击取消');
								}
							}
						})
					}
				})
			},
			//#endif
			
			
		}
	}
</script>

<style lang="scss">
	//页面全局样式
	page {
		background-color: #f9f9f9;
	}

	//轮播区样式
	.h_swiper {
		height: 422upx;

		.sw_item {
			width: 100%;
			height: 100%;

			.item_image {
				width: 100%;
				height: 422upx;
			}
		}
	}

	//金刚区样式
	.h_vajraDistrict {
		height: 228upx;
		width: 100%;
	
		.vd_item {
			width: 100%;
			height: 100%;
			overflow: hidden;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			
			.item_view{
				display: flex;
				width: 50%;
				justify-content: center;
				
				.view_image{
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
				}
			}
		}
	}
	
	//资讯区样式
	.h_information{
		background: #FFFFFF; 
		padding: 36upx; 
		display: flex;
		margin-bottom: 40upx;
		.inf_image{
			width: 146upx; 
			height: 82upx;
		}
		.inf_view{
			margin-left: 20upx; 
			width: 75%;
			.inf_view_swiper{
				width: 100%; 
				height: 36upx;
				.inf_view_swiper_view{
					font-size: 26upx; 
					height: 48upx; 
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
			.inf_view_view{
				margin-top: 12upx; 
				font-size: 26upx; 
				color: #aaa;
			}
		}
		
	}
	
	//小功能引导区
	.h_guidanceArea{
		margin: 40upx 0;
		.gui_view{
			// border-radius: 8upx; 
			// background: #FFFFFF; 
			padding: 37upx 20upx;
			position: relative;
			.gui_view_iamge{
				position: absolute;
				left: 0;
				top: 0;
				width: 240upx;
				height: 140upx;
				z-index: 1;
			}
			.gui_view_title{
				position: relative;
				z-index: 3;
				font-weight: bold;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
			.gui_view_text{
				position: relative;
				z-index: 2;
				font-size: 24upx;
				color: #aaa; 
				display: block;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}
	
	//快捷入口样式
	.h_quickEntry{
		padding: 48upx 0upx;
		.qui_titleView{
			font-size: 36upx; 
			font-weight: bold; 
			margin-left: 28upx;
		}
		.qui_imageview{
			margin-top: 24upx;
			display: flex;
			flex-wrap: wrap; //循环换行
			.qui_imageview_view{
				position: relative;
				margin-left: 26upx; 
				margin-top: 16upx;
				.qui_imageview_view_image{
					width: 216upx; 
					height: 160upx; 
					border-radius: 12upx;
					
				}
				.qui_imageview_view_text{
					position: absolute; 
					left: 16upx; 
					line-height: 160upx; 
					font-size: 34upx; 
					font-weight: bold; 
					color: #FFFFFF;
				}
			}
			
		}
	}
	
	//弹出层-通用字体样式
	.h_popupText{
		font-size: 26rpx;
		color: $u-content-color;
		line-height: 1.7; 
		padding: 30rpx;
	}
	
	.STZXIcon{
		width: 318upx;
		height: 188upx;
		padding-right: 16upx;
		padding-top: 6upx;
	}
	
	.KYCXIcon{
		width: 318upx;
		height: 188upx;
		padding-left: 16upx;
		padding-top: 6upx;
	}
	
	//-------------------------------点击状态---------------------------
	
</style>
