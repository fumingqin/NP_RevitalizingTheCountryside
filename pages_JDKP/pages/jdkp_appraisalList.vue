<template>
	<view>
		<view style="width: 100%;" :style="{ 'height':scrollHeight }">
			<image style="width: 100%; height: 100%;" src="../static/beijing.png" mode="aspectFill"></image>
			<view style="position: absolute; top: 660upx; left: 57upx; width: 636upx;  background: #FFFFFF; border-radius: 12upx;">
					<view style="margin: 40upx 48upx;display: flex; position: relative;" v-for="(item,index) in rankingList" :key="index">
					<image style="width: 51upx; height: 51upx;" src="../static/1.png" mode="aspectFill" v-if="item.index == 1"></image>
					<image style="width: 51upx; height: 51upx;" src="../static/2.png" mode="aspectFill" v-if="item.index == 2"></image>
					<image style="width: 51upx; height: 51upx;" src="../static/3.png" mode="aspectFill" v-if="item.index == 3"></image>
					<view style="line-height: 1.8; margin-left: 18upx; margin-right: 20upx;" v-if="item.index >= 4 && item.index <= 9">{{item.index}}</view>
					<view style="line-height: 1.8; margin-left: 14upx; margin-right: 10upx;" v-if="item.index >= 10">{{item.index}}</view>
					<view style="line-height: 1.8; margin-left: 24upx;">{{item.rural_name}}</view>
					<view style="line-height: 1.8; right: 12upx; position: absolute;">{{item.score}}分</view>
				</view>
				<!-- 防触底空模块 -->
				<view style="width: 100%; height: 112upx;" v-if="rankingList.length >= 10"></view>
			</view>
			
		</view>
		<!-- 选择乡县市 -->
			<view class="operButton" >
				<u-picker :value="rankingIndex" v-model="rankingShow" :mode="mode" :range="rankingData" @confirm="rankingConfirm"></u-picker>
				<text class="buttonView2" style="background: #18B566;" @click="rankingChange">{{rankingValue}} ↑ </text>
				<u-picker :value="rangValue" v-model="show" :mode="mode" :range="rangeList" @confirm="rangeConfirm"></u-picker>
				<text class="buttonView2" style="background: #FF6600;" @click="statusChange">{{range}} ↑ </text>
			</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rankingList : [], //排行数组
				scrollHeight : '1334upx',//弹框高度默认值
				show: false,
				rangData : '',//乡县数据
				range: '全部',
				rangeList:[],
				rangValue:0,
				rangIndex : 0,
				mode: 'selector',
				lists:'',
				
				//----排行类型-----
				rankingIndex : 0,//默认初始值
				rankingData : ['试点村排行','示范带排行'],//排行数组
				rankingValue : '试点村排行',//默认排行值
				rankingShow: false,
			}
		},
		
		onLoad:function(){
			/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = `${res.windowHeight}px`;
				}
			});
			this.choiceData();
		},
		
		onPullDownRefresh: function() {
			this.loadData();
		},
		
		methods: {
			//选择打开弹框
			statusChange() {
				this.show = true;
			},
			
			rankingChange() {
				this.rankingShow = true;
			},
			//点击传值
			rangeConfirm:function(e){
				console.log('点击回调',e)
				this.rangIndex = e[0];
				this.range = this.rangeList[e[0]]
				console.log('1',e[0])
				console.log('2',this.range)
				uni.startPullDownRefresh();
			},
			
			//类型传值
			rankingConfirm:function(e){
				console.log('点击回调',e)
				this.rankingIndex = e[0];
				this.rankingValue = this.rankingData[e[0]]
				console.log('1',e[0])
				console.log('2',this.rankingValue)
				uni.startPullDownRefresh();
			},
			
			//请求乡县
			choiceData:function(){
				uni.request({
					url: this.$jdkp.KyInterface.getCountyList.Url,
					method: this.$jdkp.KyInterface.getCountyList.method,
					success: (res) => {
						// console.log('乡县市所有列表数据',res)
						this.rangData = res.data.data;
						let rangdata ={
							id :'0',
							county_name : '全部'
						};
						this.rangData.unshift(rangdata)
						console.log(this.rangData)
						this.rangeList = [];
						for (let i = 0; i < res.data.data.length; i++) {
							var a = res.data.data[i].county_name
							this.rangeList.push(a)
						}
						this.loadData(); //执行加载排行
						// console.log(this.rangeList)
					},
					fail: (err) => {
						uni.stopPullDownRefresh();
						uni.hideLoading()
						console.log(err)
					}
				})
			},
			
			//执行加载排行
			loadData:function(){
				uni.showLoading({
					title:'加载排名中...'
				})
				var a;
				if(this.range == '全部'){
					a = 0;
				}else{
					a = this.rangData[this.rangIndex].id;
				}
				uni.request({
					url: this.$jdkp.KyInterface.getEvaluationByCountyId.Url,
					method: this.$jdkp.KyInterface.getEvaluationByCountyId.method,
					data:{
						countyId:a
					},
					success: (res) => {
						console.log(res)
						uni.stopPullDownRefresh();
						this.rankingList = [];
						if(this.rankingValue == '试点村排行'){
							var resData = res.data.data.filter(item =>{
								return item.title == '2020年度省级乡村振兴试点村“一村一档”情况考评'
							})
							for(var i=0; i<resData.length;i++){
								var a = {
									index : 1 + i,
									rural_name : resData[i].rural_name,
									score : resData[i].score,
								}
								this.rankingList.push(a)
							}
						}else if(this.rankingValue == '示范带排行'){
							var resData = res.data.data.filter(item =>{
								return item.title == '2020年度乡村振兴“一带N点”示范带建设情况考评'
							})
							for(var i=0; i<resData.length;i++){
								var a = {
									index : 1 + i,
									rural_name : resData[i].rural_name,
									score : resData[i].score,
								}
								this.rankingList.push(a)
							}
						}
						uni.hideLoading()
						console.log(res)
					},
					fail: (err) => {
						uni.stopPullDownRefresh();
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
	
	//选择乡县市
	.operButton {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 96upx;
		float: left;
		text-align: center;
	
		.buttonView2 {
			width: 50%;
			color: #FFFFFF;
			font-size: 32upx;
			line-height: 3;
		}
	}
</style>
