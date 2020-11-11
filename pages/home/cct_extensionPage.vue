<template>
	<view>
		<view class="modularView" v-for="(item,index ) in  list " :key="index" @click="skipClick(item.clickURL)">
			<image class="mou_image"  :src="item.src" :class="item.iamgeClass" mode="aspectFit"></image>
			<view class="mou_View">
				<text class="vie_title">{{item.title}}</text>
				<text class="vie_content">{{item.content}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list : [{
					id : 0,
					src : '../../static/home/extensionPage/cpdg.png',
					title : '车票订购',
					content : '轻松购票，旅途愉快',
					clickURL : '../../pages_ZXGP/pages/ZXGP/TraditionSpecial/Home/ctkyIndex',
					iamgeClass : 'mou_image_class1'
				},{
					id : 1,
					src : '../../static/home/extensionPage/ycjj.png',
					title : '议价叫车',
					content : '优惠价格，方便叫车',
					clickURL : '../../pages/home/ChooseSite',
					iamgeClass : 'mou_image_class2'
				}]
			}
		},
		methods: {
			skipClick:function(e){
				if(e == ''){
					uni.showToast({
						title:'敬请期待',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url : e
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.modularView{
		width: 92%; 
		height: 200upx; 
		border-radius: 16upx;
		margin: 32upx;
		box-shadow: 1px 1px 8px #d9d9d9;
		display: flex;
		padding: 50upx 75upx;
		.mou_image{
			width: 67upx;
		}
		.mou_View{
			margin-left: 40upx;
			.vie_title{
				font-size: 36upx; 
				font-weight: bold;
			}
			.vie_content{
				display: block; 
				font-size: 28upx; 
				color: #AAAAAA; 
				margin-top: 8upx;
			}
		}
	}
	
	//车票订购
	.mou_image_class1{
		height: 59upx;
		margin-top: 18upx;
	}
	
	//议价叫车
	.mou_image_class2{
		height: 60upx;
		margin-top: 16upx;
	}
</style>
