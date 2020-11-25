<template>
	<view>
		<view class="content">
				<!-- 姓名 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="姓名" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入姓名" v-model="model.name" type="text"></u-input>
					</view>
				</u-form-item>
				<!-- 年龄 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="年龄" :border-bottom="false" prop="age">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入年龄"maxlength="2" v-model="model.age" type="number" ></u-input>
					</view>
				</u-form-item>
				<!-- 电话 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="电话" :border-bottom="false" prop="telephone">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入电话" maxlength="11" v-model="model.telephone" type="number"></u-input>
					</view>
				</u-form-item>
				<!-- 任职年限 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="任职年限" :border-bottom="false" prop="year">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入任职年限" maxlength="2" v-model="model.year" type="number"></u-input>
					</view>
				</u-form-item>
				<!-- 头像 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="上传头像" :border-bottom="false" prop="photo">
					<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action" max-count="1" width="164" height="164" :file-list="fileList" @on-remove="uploadOnRemove" @on-success="uploadOnsuccess">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150" >
							<u-icon name="photo" size="60" color="#c0c4cc"></u-icon>
						</view>
					</u-upload>
				</u-form-item>
				<!-- 头像 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="上传乡村图片" :border-bottom="false" prop="photo">
					<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action" max-count="1" width="164" height="164" :file-list="fileList2" @on-remove="uploadOnRemove2" @on-success="uploadOnsuccess2">
						<view slot="addBtn" class="slot-btn2" hover-class="slot-btn__hover" hover-stay-time="150" >
							<u-icon name="photo" size="60" color="#c0c4cc"></u-icon>
						</view>
					</u-upload>
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
				lists: '',
				fileList:[],
				lists2: '',
				fileList2:[],
				submissionState:false,
				headid:0,
				imageList: [],
				showUploadList: true,
				border: false,
				placeholder: '开始输入...',
				editorHeight: 300,
				keyboardHeight: 0,
				action: 'http://120.24.144.6:8080/api/file/upload',
				model: {
					name: '', //姓名
					age: '', //年龄
					telephone:'',//电话
					year:'',//任职年限
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
					key: 'villageHead',
					success:(res)=>{
						that.submissionState=false;
						that.headid=res.data.head_id;
						that.model.name=res.data.head_name;
						that.model.age=res.data.head_age;
						that.model.telephone=res.data.head_telephone;
						console.log(that.model.telephone)
						that.model.year=res.data.head_year;
						var avatarObj={
							url:res.data.head_avatar
						};
						that.fileList.push(avatarObj);
						that.lists=res.data.head_avatar;
						var imageObj={
							url:res.data.head_image
						};
						that.fileList2.push(imageObj);
						that.lists2=res.data.head_image;
					}
				});
			}else{
				that.headid=0;
				that.model.name='';
				that.model.age='';
				that.model.telephone='';
				that.model.year='';
				that.lists= '';
				that.fileList=[];
				that.lists2='';
				that.fileList2=[];
				that.submissionState=false;
			}
			},
		methods: {
			//删除图片提示
			uploadOnRemove:function(e){
				this.fileList = undefined;
				this.lists ='';
				
			},
			//------------上传头像----------------
			uploadOnsuccess:function(e){
				console.log('上传成功',e)
				var a = {
					data : e.data
				};
				this.lists=a.data
				console.log(this.lists)
			},
			//删除图片提示
			uploadOnRemove2:function(e){
				this.fileList2 = undefined;
				this.lists2 ='';
				
			},
			//------------上传乡村图片----------------
			uploadOnsuccess2:function(e){
				console.log('上传成功',e)
				var a = {
					data : e.data
				};
				this.lists2=a.data
				console.log(this.lists2)
			},
			
			submitState: function() {
				console.log(this.submissionState)
				var that = this;
				console.log(that.model.telephone.length)
				if(that.model.telephone.length==11||that.model.telephone.length==undefined){
				if(that.model.name!=''&&that.model.age>0&&that.lists.length>0&&that.lists2.length>0&&that.model.year>0){
					
						if (this.submissionState == false) {
							this.submissionState = true;
							if(that.headid>0){
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
						title:'请输入村长姓名',
						icon:'none'
					})
				}else
				if(that.model.age<=0){
					uni.showToast({
						title:'请输入正确年龄',
						icon:'none'
					})
				}else
				if(that.model.year<=0){
					uni.showToast({
						title:'请输入正确任职年限',
						icon:'none'
					})
				}else
				if(that.lists.length==0){
					uni.showToast({
						title:'请上传村长图片',
						icon:'none'
					})
				}else
				if(that.lists2.length==0){
					uni.showToast({
						title:'请上传乡村图片',
						icon:'none'
					})
				}
				}else{
					uni.showToast({
						title:'请输入正确电话号码',
						icon:'none'
					})
				}
			},

			
			submit: function() {
				console.log('111')
				var that = this;
				uni.showLoading({
					title: '提交数据中...'
				});
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)
						console.log(that.lists)
						console.log(that.lists2)
						uni.request({
							url: that.$newycyd.KyInterface.addLeader.Url,
							method: that.$newycyd.KyInterface.addLeader.method,
							data: {
								name: that.model.name,
								age: that.model.age,
								telephone: that.model.telephone,
								year: that.model.year,
								avatar:that.lists,
								image:that.lists2,
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
				console.log('222')
				var that = this;
				uni.showLoading({
					title: '提交数据中...'
				});
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)
						uni.request({
							url: that.$newycyd.KyInterface.updateLeader.Url,
							method: that.$newycyd.KyInterface.updateLeader.method,
							data: {
								id:that.headid,
								name: that.model.name,
								age: that.model.age,
								telephone: that.model.telephone,
								year: that.model.year,
								avatar:that.lists,
								image:that.lists2,
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
	.slot-btn2 {
		width: 88px;
		height: 88px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 10upx;
		margin-bottom: 100upx;
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
