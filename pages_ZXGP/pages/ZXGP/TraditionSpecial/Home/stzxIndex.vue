<template>
	<view>
		<u-image width="100%" height="400rpx" :src="background[0].ImageURL" mode="aspectFill">
			<u-loading slot="loading"></u-loading>
			<view slot="error" style="font-size: 24rpx;">加载失败</view>
		</u-image>

		<view class="si_content">
			<view class="si_ct_selectAddress">
				<view class="si_ct_sa_lineClass">
					<!-- 起点站 -->
					<view class="start" @tap="setOutStationTap">{{departure}}</view>
					<!-- </navigator> -->
					<image class="changeImage" src="../../../../static/ZXGP/change.png" mode="aspectFill" @click="changeClick"></image>
					<!-- 终点站 -->
					<view class="start" style="text-align: right;" @tap="setOutStationTap">{{destination}}</view>
				</view>

				<view class="si_ct_sa_lineClass">
					<view class="start">
						<text @click="onShowDatePicker('date')">{{datestring}} {{Week}}</text>
					</view>
					<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
					 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
				</view>

				<u-button :ripple="true" shape="circle" ripple-bg-color="#ffcb27" :custom-style="customStyle" @click="queryClick">查询</u-button>
			</view>

			<!-- 查看历史 -->
			<view class="si_st_historyView">
				<view class="si_st_hv_history">
					<label class="historyTitle">历史记录</label>
					<label class="clearHistory" @click="clickHistory">清除历史</label>
				</view>
				<view class="si_st_historyListView">
					<view class="historyText" @tap="historyItemTap(index)" v-for="(i,index) in historyLines2" :key=index v-if="index<10">{{i}}</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import $KyInterface from "@/common/Ctky.js"
	import MxDatePicker from "@/pages_ZXGP/components/ZXGP/mx-datepicker/mx-datepicker.vue";

	export default {
		components: {
			MxDatePicker
		},

		data() {
			return {
				src: '/pages_ZXGP/static/ZXGP/stzx.png',
				departure: '', //终点
				destination: '', //起点
				datestring: '', //时间
				changeText: '',
				Week: '',
				type: 'rangetime',
				value: '',
				showPicker: false,
				date: '',
				customStyle: { //button样式
					marginTop: '30px',
					width: '92%',
					height: '90rpx',
					background: 'linear-gradient(to right,#ffbe29, #ff9c20)',
					color: '#FFFFFF',
				},
				state: '邵泰专线', //状态值
				isNormal:0,//判断是普通购票还是定制班车默认是普通购票
				historyLines2: [],
				background:[{
					ImageURL: '',
				}],
			}
		},

		onLoad() {
			var that = this;
			if (that.departure == '' || that.destination == '' || that.Week == '') {
				that.departure = '邵武';
				that.destination = '泰宁';
				that.Week = '今天';
			}
			uni.getStorage({
				key:'historyLines2',
				success:function(data){
					that.historyLines2 = data.data;
					if(data.data){
						var station = data.data[0].split('-');
						that.departure = station[0];
						that.destination = station[1];
					}
				}
			})
			
			//获取当前日期
			that.getTodayDate();
			that.loadData();
		},

		methods: {
			//加载数据
			loadData : function(){
				uni.request({
					url: this.$home.KyInterface.GetRotationChart.Url,
					method:this.$home.KyInterface.GetRotationChart.method,
					success:(res)=>{
						console.log('轮播区',res)
						this.rotationChart = res.data.data;
						this.background = res.data.data.filter(item => {
							return item.Type == '客运首页';
						})
						console.log('轮播区',this.background[0].ImageURL)
					},
					fail:function(){
						uni.showToast({
							title:'首页轮播图网络加载异常',
							icon:'none'
						})
					}
				})
			},
			
			//---------------------------------点击起点站---------------------------------
			setOutStationTap() {
				var that = this;
				//监听事件,监听下个页面返回的值
				uni.$on('startstaionChange', function(data) {
					// data即为传过来的值，给上车点赋值
					that.departure = data.data;
					that.destination = data.data2;
					//清除监听，不清除会消耗资源
					uni.$off('startstaionChange');
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是上车点
					url: '../stationPicker/homeSattionPick?&station=' + 'qidian' + '&type=' + this.state,
				})
			},

			//---------------------------------获取当前日期---------------------------------
			getTodayDate() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var timer = year + '-' + month + '-' + day;
				this.datestring = timer;
			},
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];

			},

			//---------------------------------互换起止地址---------------------------------
			changeClick: function() {
				if(this.departure !== '选择上车点' || this.destination !== '选择下车点'){
					this.changeText = this.departure;
					this.departure = this.destination;
					this.destination = this.changeText;
				}else{
					uni.showToast({
						title: '请选择上下车点',
						icon: 'none'
					})
				}
			},

			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					// this[this.type] = e.value;
					this[this.type] = e.value;
					this.datestring = this[this.type];
					this.queryWeek(e.date.toString().substring(0, 3));
					this.date = e.value;
				}
			},
			queryWeek(e) {
				console.log(e);
				switch (e) {
					case "Mon":
						this.Week = '周一';
						break;
					case "Tue":
						this.Week = "周二";
						break;
					case "Wed":
						this.Week = "周三";
						break;
					case "Thu":
						this.Week = "周四";
						break;
					case "Fri":
						this.Week = "周五";
						break;
					case "Sat":
						this.Week = "周六";
						break;
					case "Sun":
						this.Week = "周日";
						break;
					default:
						break;
				}
			},
			
			//---------------------------------清除历史---------------------------------
			clickHistory: function() {
				this.historyLines2 = [];
			},
			//---------------------------------点击历史记录---------------------------------
			historyItemTap(res) {
				let stationArray = this.historyLines2[res].split('-');
				this.departure = stationArray[0];
				this.destination = stationArray[1];
			},
			
			//---------------------------------点击查询---------------------------------
			queryClick: function() {
				var that = this;
				if(that.departure == '选择上车点' || that.destination == '选择下车点') {
					uni.showToast({
						title: '请选择上下车点',
						icon: 'none'
					})
				}else {
					var station = this.departure + "-" + this.destination;
					if(this.historyLines2) {
						for(let i = 0; i <= this.historyLines2.length;i++){
							if(station == this.historyLines2[i]) {
								this.historyLines2.splice(i,1);
							}
						}
						this.historyLines2.unshift(this.departure + "-" + this.destination);
					}
					uni.setStorage({
						key:'historyLines2',
						data:this.historyLines2,
					})
					//页面传参通过地址后面添加参数 this.isNormal=0是普通购票1是定制班车
					
					var params='../Order/selectTickets?&startStation=' + this.departure +'&endStation=' + this.destination + '&date=' + this.datestring + '&isNormal=' + this.isNormal;
					uni.navigateTo({ 
						url:params
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	//页面全局样式
	page {
		background-color: #f9f9f9;
	}

	.si_content {
		z-index: 999;
		position: absolute;
		width: 100%;
		top: 370upx;

		.si_ct_selectAddress {
			background: #FFFFFF;
			border-radius: 14upx;
			margin-left: 20upx;
			margin-right: 20upx;
			padding-top: 30upx;
			width: 95%;
			padding-bottom: 60upx;

			//选择起始点
			.si_ct_sa_lineClass {
				display: flex;
				align-items: center;
				justify-items: center;
				margin-left: 36upx;
				margin-right: 36upx;
				padding-bottom: 8upx;
				border-bottom: 1px #F5F5F5 dotted; //虚线
				// margin-bottom: 20upx;

				.start {
					font-size: 32upx;
					font-weight: 300;
					color: #2C2D2D;
					// width: 234upx;
					left: 0;
					text-align: left;
					// border-bottom: 1upx solid #dadada;
					margin-top: 40rpx;
					padding-bottom: 20rpx;
				}

				.changeImage {
					width: 50upx;
					height: 52upx;
					padding-top: 22upx;
					margin: 0 auto;
				}

			}
		}

		.si_st_historyView {
			padding-top: 20rpx;
			background-color: #FFFFFF;
			border-radius: 14rpx;
			margin-top: 20rpx;
			margin-left: 20upx;
			margin-right: 20upx;
			width: 95%;
			font-family: MicrosoftYaHei;
			color: #999999;
			font-size: 24upx;

			.si_st_hv_history {
				justify-content: space-between;
				align-items: center;
				display: flex;

				.historyTitle {
					font-size: 28rpx;
					color: #2C2D2D;
					margin-left: 20rpx;
				}

				.clearHistory {
					font-size: 28rpx;
					color: #2C2D2D;
					margin-right: 20rpx;
					float: right;
				}
			}
			
			.si_st_historyListView {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				color: #999999;
				font-size: 26rpx;
				font-weight: 300;
				margin-left: 20rpx;
				margin-right: 20rpx;
				padding-bottom: 20rpx;
			
				.historyText {
					margin-top: 20rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
