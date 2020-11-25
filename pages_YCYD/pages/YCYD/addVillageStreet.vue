<template>
	<view>
		<view class="content">
				<!-- 街道名 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="街道名" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入街道名" v-model="model.name" type="text"></u-input>
					</view>
				</u-form-item>
				<!-- 户数 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="户数" :border-bottom="false" prop="roadcount">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入该街道总户数" v-model="model.roadcount" type="number"></u-input>
					</view>
				</u-form-item>
				<!-- 人数 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="人数" :border-bottom="false" prop="count">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入该街道总人数" v-model="model.count" type="number"></u-input>
					</view>
				</u-form-item>
		</view>
		<!-- 提交申请 -->
		<view class="operButton">
			<text class="buttonView2" @click="submitState">提交</text>
		</view>
	</view>
</template>

<script>
	import tColorPicke from '@/components/t-color-picker.vue';
	import lFile from '@/components/l-file/l-file.vue'
	export default {
		components: {
			't-color-picker': tColorPicke,
			lFile,
		},
		data() {
			return {
				addid:2,
				lists: [],
				fileList:[],
				streetid:0,
				showUploadList: true,
				border: false,
				submissionState: false,
				isEdit: false,
				fontColor: '#000',
				formats: {},
				readOnly: false,
				placeholder: '开始输入...',
				editorHeight: 300,
				keyboardHeight: 0,
				action: 'http://120.24.144.6:8080/api/file/upload',
				isIOS: false,
				model: {
					name: '', //街道名称
					roadcount: '', //户数
					count:'',//总人数
				},
				//----------------uview样式--------------------------
				customStyle: {
					fontWeight: 'bold',
					fontSize: '17px',
					paddingTop: '8px',
				},
				buttonStyle: {
					marginTop: '20px',
				},
				tradeNameStyle: {
					background: '#FFFFFF',
					paddingTop: '5px',
					paddingBottom: '5px',
					paddingLeft: '10px',
					paddingRight: '10px',
					borderRadius: "6px",
				},
				textareaStyle: {
					background: '#FFFFFF',
					paddingTop: '10px',
					paddingBottom: '10px',
					paddingLeft: '10px',
					paddingRight: '10px',
					borderRadius: "6px",
				},
				pickerShow: false,
				errorType: ['message'],
				labelPosition: 'right',
				maxCount: 3,
				multiple: true,
				autoHeight: true,
			}
		},
		onLoad(param) {
			var that=this;
			uni.getStorage({
				key: 'userInfo',
				fail() {
					uni.showToast({
						icon: 'none',
						title: '暂未登录,请登录后查看'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/GRZX/userLogin'
						})
					}, 500);
				}
			});
			if(param.id>0){
				uni.getStorage({
					key: 'villageStreet',
					success:(res)=>{
						that.streetid=res.data.id;
						that.model.name=res.data.road;
						that.model.roadcount=res.data.road_count;
						that.model.count=res.data.count;
					}
				});
			}else{
				that.streetid=0;
				that.model.name='';
				that.model.roadcount='';
				that.model.count='';
			}
			},
		methods: {
			
			submitState: function() {
				var that = this;
				if(that.model.name!=''&&that.model.roadcount>0&&that.model.count>0){
					if (this.submissionState == false) {
						this.submissionState = true;
						if(that.streetid>0){
							this.updateSubmit();
						}else{
							this.submit();
						}
					} else if (this.submissionState == true) {
						uni.showToast({
							title: '请勿重复点击提交',
							icon: 'none',
							duration: 2000
						})
					}
				}else
				if(that.model.name==''){
					uni.showToast({
						title:'请输入街道名',
						icon:'none'
					})
				}else
				if(that.model.roadcount<=0){
					uni.showToast({
						title:'请输入正确的户数',
						icon:'none'
					})
				}else
				if(that.model.count<=0){
					uni.showToast({
						title:'请输入正确的人数',
						icon:'none'
					})
				}
			},

			submit: function() {
				var that = this;
				uni.showLoading({
					title: '提交数据中...'
				});
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)
						uni.request({
							url: that.$newycyd.KyInterface.addVillageInfo.Url,
							method: that.$newycyd.KyInterface.addVillageInfo.method,
							data: {
								road: that.model.name,
								roadcount: that.model.roadcount,
								count: that.model.count,
								ruralId:res.data.rId,
							},
							success: (res) => {
								console.log(res)
								if (res.data.status) {
									uni.hideLoading()
									uni.showToast({
										title: '添加成功',
										success() {
											uni.navigateBack({
												url: './pictureList'
											})
										}
									})
								} else {
									uni.hideLoading()
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
							},
							fail: (res) => {
								console.log(res)
								uni.hideLoading()
								uni.showToast({
									title: '添加失败',
									icon: 'none'
								})
							}
						})
						
					}
				})
			},
			//------------提交修改-----------------
			updateSubmit: function() {
				var that = this;
				uni.showLoading({
					title: '提交数据中...'
				});
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)
						uni.request({
							url: that.$newycyd.KyInterface.updateVillageInfo.Url,
							method: that.$newycyd.KyInterface.updateVillageInfo.method,
							data: {
								id:that.streetid,
								road: that.model.name,
								roadcount: that.model.roadcount,
								count: that.model.count,
								ruralId:res.data.rId,
							},
							success: (res) => {
								console.log(res)
								if (res.data.status) {
									uni.hideLoading()
									uni.showToast({
										title: '修改成功',
										success() {
											uni.navigateBack({
												url: 'myVillage'
											})
										}
									})
								} else {
									uni.hideLoading()
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
							},
							fail: (res) => {
								console.log(res)
								uni.hideLoading()
								uni.showToast({
									title: '提交失败',
									icon: 'none'
								})
							}
						})
						
					}
				})
			},
		}
	}
</script>

<style lang="scss">

	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}

	.content {
		margin: 0 30upx 40upx 30upx;
	}

	.viewClass {
		width: 100%;
		background: #FFFFFF;
		border-radius: 6px;
	}

	//自定义上传按钮
	.slot-btn {
		width: 88px;
		height: 88px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 10upx;
	}

	//自定义上传按钮颜色
	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}
	
	.operButton {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 96upx;
		text-align: center;
	
		.buttonView2 {
			width: 100%;
			background: #18B566;
			color: #FFFFFF;
			font-size: 32upx;
			line-height: 3;
		}
	}
	
</style>
