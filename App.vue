<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss"; //引入uview框架样式
	@import url("@/common/overallSituation.css"); //引入全局css样式
	/*每个页面公共css */
</style>
