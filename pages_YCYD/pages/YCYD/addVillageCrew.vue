<template>
	<view>
		<view class="content">
				<!-- 姓名 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="姓名" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入职责人员姓名" v-model="model.name" type="text"></u-input>
					</view>
				</u-form-item>
				<!-- 年龄 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="年龄" :border-bottom="false" prop="age">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入年龄" v-model="model.age"  maxlength="2" type="number"></u-input>
					</view>
				</u-form-item>
				<!-- 电话 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="电话" :border-bottom="false" prop="telephone">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入电话" v-model="model.telephone" maxlength="11" type="number"></u-input>
					</view>
				</u-form-item>
				<!-- 职责 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="职责" :border-bottom="false" prop="year">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入职位" v-model="model.duty" type="text"></u-input>
					</view>
				</u-form-item>
				<!-- 任职年限 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="任职年限" :border-bottom="false" prop="year">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入任职年限" v-model="model.year" maxlength="2" type="number"></u-input>
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
				crewid:0,
				border: false,
                sourceTypeIndex: 2,
				submissionState: false,
				placeholder: '开始输入...',
				editorHeight: 300,
				keyboardHeight: 0,
				model: {
					name: '', //姓名
					age: '', //年龄
					telephone:'',//电话
					year:'',//任职年数
					duty:'',//职责
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
				errorType: ['message'],
				labelPosition: 'right',
			}
		},
		onLoad(param) {
		var	that=this;
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
					key: 'villageCrew',
					success:(res)=>{
						that.crewid=res.data.id;
						that.model.name=res.data.name;
						that.model.age=res.data.age;
						that.model.telephone=res.data.telephone;
						that.model.year=res.data.duty_year;
						that.model.duty=res.data.duty;
					}
				});
			}else{
				that.crewid=0;
				that.model.name='';
				that.model.age='';
				that.model.telephone='';
				that.model.year='';
				that.model.duty='';
			}
			},
		methods: {
			
			//-------------------------------------------------
			submitState: function() {
				var that = this;
				if(that.model.telephone.length==11||that.model.telephone.length==undefined){
				if(that.model.name!=''&&that.model.age>0&&that.model.duty!=''&&that.model.year>0&&that.model.telephone.length==11&&that.model.telephone.length==undefined){
					if (this.submissionState == false) {
						this.submissionState = true;
						if(that.crewid>0){
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
						title:'请输入姓名',
						icon:'none'
					})
				}else
				if(that.model.age<=0){
					uni.showToast({
						title:'请输入正确年龄',
						icon:'none'
					})
				}else
				if(that.model.duty==''){
					uni.showToast({
						title:'请输入职务',
						icon:'none'
					})
				}else
				if(that.model.year<=0){
					uni.showToast({
						title:'请输入正确的任职年限',
						icon:'none'
					})
				}
				}else{
					uni.showToast({
						title:'请输入正确的电话号码',
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
							url: that.$newycyd.KyInterface.addVillagePeople.Url,
							method: that.$newycyd.KyInterface.addVillagePeople.method,
							data: {
								name: that.model.name,
								age: that.model.age,
								telephone: that.model.telephone,
								year: that.model.year,
								duty:that.model.duty,
								ruralId:58,
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
							url: that.$newycyd.KyInterface.updateVillagePeople.Url,
							method: that.$newycyd.KyInterface.updateVillagePeople.method,
							data: {
								id:that.crewid,
								name: that.model.name,
								age: that.model.age,
								telephone: that.model.telephone,
								year: that.model.year,
								duty:that.model.duty,
								ruralId:58,
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
