<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url : '',//威富通跳转路径
			}
		},
		onLoad:function(pay){
			console.log(pay)
			this.url = 'https://pay.swiftpass.cn/pay/jspay?showwxtitle=1&token_id=' + pay
			console.log(this.url)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
