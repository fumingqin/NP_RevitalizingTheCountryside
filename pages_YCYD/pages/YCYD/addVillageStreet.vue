<template>
	<view>
		<view class="content">
				<!-- 街道名 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="街道名" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入街道名" v-model="model.name" :type="text"></u-input>
					</view>
				</u-form-item>
				<!-- 户数 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="户数" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入该街道总户数" v-model="model.name" :type="text"></u-input>
					</view>
				</u-form-item>
				<!-- 人数 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="人数" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入该街道总人数" v-model="model.name" :type="text"></u-input>
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
					name: '', //商品名称value
					intro: '', //商品简介
					centent:'',
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
		onLoad() {
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
			},
		methods: {
			//删除图片提示
			uploadOnRemove:function(e){
				this.fileList = undefined;
				this.lists = [];
				
			},
			//------------上传图片----------------
			uploadOnsuccess:function(e){
				console.log('上传成功',e)
				var a = {
					data : e.data
				};
				this.lists.push(a.data)
				console.log(this.lists)
			},
			
			submitState: function() {
				var that = this;
				if(that.model.name!=''&&that.lists.length>0&&that.filename!=''&&that.model.centent!=''){
					if (this.submissionState == false) {
						that.editorCtx.getContents({
							success: (res) => {
								console.log(res);
								that.issueText = res.html;
							}
						});
						this.submissionState = true;
						if(that.policyId!=''){
							this.updateSubmit(that.issueText);
						}else{
							this.submit(that.issueText);
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
				if(that.lists.length==0){
					uni.showToast({
						title:'请上传头像',
						icon:'none'
					})
				}
			},

			submit: function(e) {
				var that = this;
				console.log(that.videoData)
				console.log(this.videoData)
				uni.showLoading({
					title: '提交数据中...'
				});
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)

						// console.log(that.videoData);
						// array.push(that.videoData);
						var array2=[];
						console.log(that.localPath);
						array2.push(that.localPath);
						var array3=[];
						array3.push(that.filename);
						uni.request({
							url: that.$zcfb.KyInterface.releasePolicy.Url,
							method: that.$zcfb.KyInterface.releasePolicy.method,
							data: {
								title: that.model.name,
								content: e,
								image:  JSON.stringify(that.lists),
								video:'',
								pdfName:JSON.stringify(array3),
								pdfFile:JSON.stringify(array2),
								introduce:that.model.centent,
								userId:res.data.userId,
							},
							success: (res) => {
								console.log(res)
								if (res.data.status) {
									uni.hideLoading()
									uni.showToast({
										title: '提交成功',
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
									title: '提交失败',
									icon: 'none'
								})
							}
						})
						
					}
				})
			},
			//------------提交修改-----------------
			updateSubmit: function(e) {
				var that = this;
				uni.showLoading({
					title: '提交数据中...'
				});
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)
						// var array=[];
						// array.push(that.videoData);
						var array2=[];
						array2.push(that.localPath);
						var array3=[];
						array3.push(that.filename);
						uni.request({
							url: that.$zcfb.KyInterface.updatePolicy.Url,
							method: that.$zcfb.KyInterface.updatePolicy.method,
							data: {
								id:that.policyId,
								title: that.model.name,
								content: e,
								image:  JSON.stringify(that.lists),
								video: '',
								pdfFile:JSON.stringify(array2),
								pdfName:JSON.stringify(array3),
								userId: res.data.userId,
								introduce:that.model.centent,
							},
							success: (res) => {
								console.log(res)
								if (res.data.status) {
									uni.hideLoading()
									uni.showToast({
										title: '发布成功',
										success() {
											uni.navigateBack({
												url: 'myPolicyList'
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
			Update:function(){
				var that=this;
				uni.request({
					url:this.$zcfb.KyInterface.getPolicyDetailByID.Url,
					method:this.$zcfb.KyInterface.getPolicyDetailByID.method,
					data:{
						id:that.policyId,
					},
					success:(res) =>{
						console.log(res)
						if(res.data.status){
							that.model.name=res.data.data.title;
							console.log(that.model.name);
							that.issueText=res.data.data.content;
							console.log(that.issueText);
							that.filename=res.data.data.pdfName[0];
							console.log(that.filename);
							var imageObj={
								url:res.data.data.image[0]
							};
							that.fileList.push(imageObj);
							console.log(that.fileList);
							that.lists=res.data.data.image;
							console.log(that.lists);
							that.localPath=res.data.data.pdfFile[0];
							console.log(that.localPath);
							that.model.centent=res.data.data.introduce;
							console.log(that.model.centent);
							// that.videoData=res.data.data.video[0];
							// console.log(that.videoData);
							uni.createSelectorQuery().select('#editor').context(function(res) {
								// console.log(res);
								_self.editorCtx = res.context;
								that.editorCtx.setContents({
									html: that.issueText //this.EditGoodsDetail.content为赋值内容。    
								})
							}).exec();
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail(res) {
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						}) 
						// console.log(res)
					}
				})
			}
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
