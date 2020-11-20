<template>
	<view>
		<view class="View">
			<view class="Btn" @click="head">添加村长</view>
			<view class="Btn" @click="crew">添加在职人员</view>
			<view class="Btn" @click="street">添加街道</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			head:function(){
				uni.navigateTo({
					url:'./addVillageHead'
				})
			},
			crew:function(){
				uni.navigateTo({
					url:'./addVillageCrew'
				})
			},
			street:function(){
				uni.navigateTo({
					url:'./addVillageStreet'
				})
			}
		}
	}
</script>

<style lang="scss">
	.View {
		padding-left: 25%;
		padding-top: 50%;
		width: 100%;
		height: 500upx;
		text-align: center;
	
		.Btn {
			width: 60%;
			background: #18B566;
			color: #FFFFFF;
			font-size: 32upx;
			line-height: 3;
			margin-bottom: 50upx;
		}
	}
</style>
