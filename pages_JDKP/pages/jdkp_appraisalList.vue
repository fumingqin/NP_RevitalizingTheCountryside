<template>
	<view>
		<view style="width: 100%;" :style="{ 'height':scrollHeight }">
			<image style="width: 100%; height: 100%;" src="../static/beijing.png" mode="aspectFill"></image>
			<view style="position: absolute; top: 720upx; left: 57upx; width: 636upx;  background: #FFFFFF; border-radius: 12upx;">
					<view style="margin: 40upx 48upx;display: flex; position: relative;" v-for="(item,index) in rankingList" :key="index">
					<image style="width: 51upx; height: 51upx;" src="../static/1.png" mode="aspectFill" v-if="item.index == 1"></image>
					<image style="width: 51upx; height: 51upx;" src="../static/2.png" mode="aspectFill" v-if="item.index == 2"></image>
					<image style="width: 51upx; height: 51upx;" src="../static/3.png" mode="aspectFill" v-if="item.index == 3"></image>
					<view style="line-height: 1.8; margin-left: 18upx; margin-right: 20upx;" v-if="item.index >= 4 && item.index <= 9">{{item.index}}</view>
					<view style="line-height: 1.8; margin-left: 14upx; margin-right: 10upx;" v-if="item.index >= 10">11</view>
					<view style="line-height: 1.8; margin-left: 24upx;">{{item.rural_name}}</view>
					<view style="line-height: 1.8; right: 12upx; position: absolute;">{{item.score}}分</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rankingList : [], //排行数组
				scrollHeight : '1334upx',//弹框高度默认值
			}
		},
		onLoad:function(){
			/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = `${res.windowHeight}px`;
				}
			});
			this.loadData();
		},
		methods: {
			loadData:function(){
				uni.showLoading({
					title:'加载排名中...'
				})
				uni.request({
					url: this.$jdkp.KyInterface.getEvaluation.Url,
					method: this.$jdkp.KyInterface.getEvaluation.method,
					success: (res) => {
						this.rankingList = [];
						for(var i=0; i<res.data.data.length;i++){
							var a = {
								index : 1 + i,
								rural_name : res.data.data[i].rural_name,
								score : res.data.data[i].score
							}
							console.log(a)
							this.rankingList.push(a)
						}
						uni.hideLoading()
						console.log(res)
					},
					fail: (err) => {
						uni.hideLoading()
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #b1eaf8;
	}
</style>
