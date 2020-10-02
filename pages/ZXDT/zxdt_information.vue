<template>
	<view>
		<!-- 头部切换栏 -->
		<u-tabs :list="headList" :is-scroll="false" :current="headCurrent" @change="headChange" height="104"></u-tabs>
		
		<!-- 资讯列表 -->
		<view class="infor_view"  v-for="(item,index) in informationList" :key="index" @click="detailsClick(item.AID)">
			<view class="view_titleView">
				<text class="tv_view">
					<text class="tv_label">{{labelVariety(item.Type)}}</text>
					<text class="tv_title">{{item.Title}}</text>
				</text>
				<image class="tv_image" :src="item.ImageUrl" mode="aspectFill"></image>
			</view>
			
			<view class="view_contentView">
				<text>邵泰官方</text>
				<text class="cont_text">{{item.ViewCount}}人看过</text>
				<text class="cont_text">{{informationDate(item.CreateTime)}}</text>
				<u-icon class="cont_icon" name="more-dot-fill"></u-icon>
			</view>
			<u-gap height="4" bg-color="#f9f9f9"></u-gap>
		</view>
		
		<!-- 缺省提示 -->
		<view style="margin-top: 360upx;" :hidden="listStatusIndex !==0">
			<u-empty text="该分类没有资讯哦~" mode="news"></u-empty>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headList : [{
					name : '系统通知'
				},{
					name : '车站新讯' 
				},{
					name : '每日南平'
				},{
					name : '其他资讯'
				}],//头部数组
				headCurrent : 0,  //头部tabs下标
				informationList : '', //资讯列表
				listStatusIndex : '', //资讯缺省提示初始值
			}
		},
		onLoad:function(){
			this.loadData(0);
		},
		methods: {
			//加载接口数据
			loadData:function(e){
				uni.request({
					url: this.$home.KyInterface.GetNews.Url,
					method:this.$home.KyInterface.GetNews.method,
					success:(res)=>{
						console.log(res)
						if(e == 0){
							this.informationList = res.data.data.filter(item =>{
								return item.Type == '通知公告';
							})
							
						}else if(e == 1){
							this.informationList = res.data.data.filter(item =>{
								return item.Type == '车站新讯';
							})
						}else if(e == 2){
							this.informationList = res.data.data.filter(item =>{
								return item.Type == '每日南平';
							})
						}else if(e == 3){
							this.informationList = res.data.data.filter(item =>{
								return item.Type !== '通知公告' && item.Type !== '车站新讯' && item.Type !== '每日南平';
							})
						}
						// console.log(this.informationList.length)
						this.listStatusIndex = this.informationList.length;
						
						
					}
				})
			},
			
			detailsClick:function(e){
				uni.navigateTo({
					url:'infor_details?AID=' +e
				})
			},
			
			//列表通知标签变化
			labelVariety:function(e){
				if(e=='通知公告'){
					return '通知'
				}else if(e=='车站新讯'){
					return '车站'
				}else if(e=='每日南平'){
					return '车站'
				}else {
					return e
				}
			},
			
			//资讯时间
			informationDate:function(e){
				console.log(e)
				var tsetDate = e.replace('T',' ')
				var a = tsetDate.substr(5,11)
				return a;
			},
			
			//点击tab切换
			headChange:function(e){
				this.headCurrent = e;
				this.loadData(e);
			}
		}
	}
</script>

<style lang="scss">
	//资讯列表样式
	.infor_view{
		padding: 0 32upx; 
		margin-top: 32upx;
		.view_titleView{
			display: flex;
			.tv_view{
				padding-right: 32upx; 
				width: 468upx; 
				.tv_label{
					font-size: 24upx; 
					background: #007AFF; 
					color: #FFFFFF; 
					padding: 4upx 8upx; 
					border-radius: 4upx;
				}
				.tv_title{
					font-weight: bold; 
					font-size: 34upx; 
					margin-left: 12upx; 
					line-height: 1.7;
				}
			}
			.tv_image{
				width: 220upx; 
				height: 160upx; 
				border-radius: 8upx;
			}
		}
		.view_contentView{
			font-size: 24upx; 
			color: #AAAAAA; 
			padding: 16upx 0; 
			margin-bottom: 16upx;
			.cont_text{
				margin-left: 20upx;
			}
			.cont_icon{
				float: right; 
				padding: 12upx 0;
				margin-right: 16upx;
			}
		}
	}
</style>
