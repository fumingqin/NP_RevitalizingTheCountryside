<template>
	<view>
		<!-- 顶部滑动 -->
		<view class="screen">
			<view class="screenView">
				<view class="screenText" :class="{current:type===0}" @click="tabClick(0)">
					审核中
				</view>
				<view class="screenText" :class="{current:type===1}" @click="tabClick(1)">
					投诉成功
				</view>
				<view class="screenText" :class="{current:type===2}" @click="tabClick(2)">
					投诉失败
				</view>
			</view>
		</view>

		<view v-if="show">
			<view class="itemClass" v-for="(item,index) in complaintList" :key="index" v-if="formatType(item.IsReply) == type">
				<text class="fontStyle fontSize">{{item.ProjectType}}</text>
				<text class="fontStyle">投诉对象：{{item.DriverName ||'暂无'}}</text>
				<text class="fontStyle">投诉时间：{{formateTime(item.CreatetTime) ||'暂无'}}</text>
				<text class="fontStyle">投诉内容：{{item.ComplaintContent ||'暂无'}}</text>
				<text class="statusClass">{{formatState(item.IsReply) ||'暂无'}}</text>
				<view class="btnClass" @click="gotoStatus(item)">详细</view>
			</view>
		</view>
		
		<view class="noneData" v-if="!show">
			<!-- 您当前暂无投诉 -->
			<u-empty text="您当前暂无投诉" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,		//是否显示
				type: 0, //默认审核中
				complaintList: [],	//投诉列表
				userId:'',		//用户id
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:'我的投诉',
			})
			const userInfo = uni.getStorageSync('userInfo') || '';
			if(userInfo == ""){
				uni.showToast({
					title: '您当前暂未登录',
					icon:'none',
				});
			}else{
				this.userId = userInfo.userId;
			}
		},
		onShow() {
			this.loadComplaintList();
		},
		methods: {
			//-------------------------------顶部Tab-------------------------------
			tabClick(e) {
				this.type = e;
				var list=this.complaintList.filter(item => {
					return this.formatType(item.IsReply) == e; //条件
				})
				if(list.length > 0){
					this.show = true;
				}else{
					this.show = false;
				}
			},
			
			//-------------------------------投诉详情-------------------------------
			gotoStatus(e) {
				uni.setStorageSync('complaintDetail',e)
				uni.navigateTo({
					url: './complaintStatus'
				})
			},
			
			//-------------------------------加载投诉列表-------------------------------
			loadComplaintList(status) {
				uni.showLoading({
					title:'加载中...'
				})
				uni.request({
					url: this.$GrzxInter.Interface.GetMyComplaintList.value,
					method: this.$GrzxInter.Interface.GetMyComplaintList.method,
					data: {
						userID : this.userId,
					},
					success: res => {
						console.log(res);
						this.complaintList = res.data.data;
						var list=this.complaintList.filter(item => {
							return this.formatType(item.IsReply) == 0; //条件
						})
						if(list.length > 0){
							this.show = true;
						}else{
							this.show = false;
						}
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			
			//-------------------------------格式化审核状态-------------------------------
			formatState(status) {
				switch (status) {
					case false:
						return '审核中';
						break;
					case true:
						return '投诉成功';
						break;
					case 2:
						return '投诉失败';
						break;
					default:
						return '';
				}
			},
			formatType(status){
				switch (status) {
					case false:
						return 0;
						break;
					case true:
						return 1;
						break;
					case 2:
						return 2;
						break;
					default:
						return '';
				}
			},
			
			//---------------------------------格式化时间---------------------------------
			formateTime(time){
				let date=time.replace('T',' ');
				return date.substring(0,16);
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F6F8;
	}

	//筛选样式
	.screen {
		height: 87upx;
		background-color: #f6f6f6;
		position: sticky;
		top: 0;
		z-index: 999;
		.screenView {
			left: 0;
			display: flex;
			width: 750upx;
			height: 87upx;
			z-index: 10;
			position: sticky;
			top: 0;
			.screenText {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 30upx;
				color: #333333;
				position: relative;
				&.current {
					color: #FFAF2A;
					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 77upx;
						height: 0;
						border-bottom: 4upx solid #FFAF2A;
					}
				}
			}
		}
	}
	
	.itemClass{
		margin: 30upx 5% 0 5%;
		background-color: #FFFFFF;
		border-radius: 20upx;
		display: flex;
		flex-direction: column;
		position: relative;
		.fontStyle{
			font-size: 30upx;
			color: #333333;
			padding: 20upx 0 0 7%;
			width: 80%;
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		.fontSize{
			font-size: 40upx;
			font-weight: bold;
		}
		.btnClass{
			margin: 20upx 0 30upx 65%;
			padding: 18upx 0upx;
			border-radius: 15upx;
			width: 28%;
			text-align: center;
			border: 1upx solid #999999;
			color: #414141;
			font-size: 32upx;
		}
		.mt{
			margin-top: 10upx;
		}
		.statusClass{
			position: absolute;
			right: 7%;
			top: 25upx;
			color: #414141;
		}
	}
	
	.noneData{
		color: #5a5a5b;
		display: flex; 
		justify-content: center;
		margin-top: 400upx;
	}
</style>
