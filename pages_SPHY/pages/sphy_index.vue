<template>
	<view>
		<image class="view_image" :style="{'height': imageHeight}" src="../static/hysp_image.png" mode="aspectFill"></image>
		<view class="page_view">
			<view class="view_input">
				<view class="inp_view">会议标题</view>
				<input class="inp_inp" v-model="titleData" type="text" placeholder="请输入本次会议标题" />
			</view>
			<view class="view_input2">
				<view class="inp_view2">参会人员</view>
				<view class="inp_inp2"> 点击选择参会人员<view style="float: right;"> > </view></view>
			</view>
			
			<view class="view_input2" :hidden="personnelList.length == 0">
				<view class="inp_view2">已选人员</view>
				<view class="inp_inp3" v-for="(item,index) in personnelList " :key="index">
					<text>{{item.name}}&nbsp;&nbsp;{{item.duty}}&nbsp;&nbsp;{{item.phoneNumber}} </text><view style="float: right; color: red; font-size: 34upx;" @click="delPersonnel(index)">×</view>
				</view>
			</view>
			
			<view class="view_input4" :hidden="personnelList.length !== 0">				<view class="inp_inp4" @click="tips">发起</view>			</view>
			
			
			<!-- 防触底空模块 -->
			<view style="width: 100%; height: 112upx;"></view>
		</view>
		<!-- 派员编号 -->
		<view class="operButton" :hidden="personnelList.length == 0">
			<text class="buttonView2" @click="launch">发起</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageHeight: '1334upx', //页面宽度
				personnelList : [{
					name: '王立新',
					duty : '村级职责',
					phoneNumber : '13489208677'
				},{
					name: '刘汉良',
					duty : '普通用户',
					phoneNumber : '13489208677'
				}], //人员数组
				titleData : '',//标题内容
			}
		},
		onLoad: function() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					this.imageHeight = res.windowHeight + 'px'
					this.imageWidth = res.windowWidth + 'px'
				}
			})
		},

		methods: {
			//删除已选人员
			delPersonnel : function(e){
				this.personnelList.splice(e,1);
			},
			
			//提示
			tips : function(){
				if(this.titleData == ''){
					uni.showToast({
						title:'请填写标题',
						icon:'none'
					})
				}else if(this.personnelList.length == 0){
					uni.showToast({
						title:'请选择参会人员',
						icon:'none'
					})
				}
			},
			
			//发起会议
			launch : function(){
				uni.showToast({
					title:'功能调试中，敬请期待',
					icon:'none'
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background: #1cac69;
	}
	.view_image {
		width: 100%;
		position: relative;
	}
	
	.page_view{
		position: absolute;
		top: 30%;
		margin: 0 32upx;
		width: 100%;
	}

	//选择模板1
	.view_input {
		margin-top: 40upx;
		.inp_view {
			font-size: 36upx;
			font-weight: bold;

		}

		.inp_inp {
			width: 86%;
			height: 96upx;
			padding-left: 32upx;
			background: #FFFFFF;
			margin: 24upx 0;
			border-radius: 12upx;
		}
	}
	
	//选择模板2
	.view_input2 {
		margin-top: 40upx;
	
		.inp_view2 {
			font-size: 36upx;
			font-weight: bold;
			margin-bottom: 24upx;
		}
	
		.inp_inp2 {
			width: 90%;
			padding: 32upx ;
			background: #FFFFFF;
			color: #888;
			margin: 24upx 0;
			border-radius: 12upx;
		}
		.inp_inp3 {
			width: 90%;
			padding: 32upx ;
			background: #FFFFFF;
			color: #888;
		}
	}
	
	//选择模板3
	.view_input4 {
		margin-top: 56upx;
		text-align: center;
		.inp_inp4 {
			width: 90%;
			padding: 28upx ;
			color: #FFFFFF;
			background: #2FC700;
			margin: 24upx 0;
			border-radius: 12upx;
			font-size: 34upx;
		}
	}
	
	//发起
	.operButton {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 96upx;
		text-align: center;
	
		.buttonView2 {
			width: 100%;
			background: #2FC700;
			color: #FFFFFF;
			font-size: 32upx;
			line-height: 3;
		}
	}
	
</style>
