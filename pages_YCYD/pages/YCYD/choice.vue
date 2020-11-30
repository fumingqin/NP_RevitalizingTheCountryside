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
				id:0,
			}
		},
		onLoad(param) {
		this.id=param.id;
			console.log(param)
			console.log(this.id)
		},
		methods: {
			head:function(){
				if(this.id!=0){
					uni.showToast({
						title: '该村已存在村长无法继续添加',
						icon: 'none'
					})
				}else{
				uni.navigateTo({
					url:'./addVillageHead'
				})
				}
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
