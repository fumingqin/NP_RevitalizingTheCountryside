<template>
	<view>
		<view>
			<view class="content">
				<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">

					<!-- 乡村名 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="乡村名" :border-bottom="false" prop="name">
						<view class="viewClass">
							<input style="height: 96upx; padding-left: 24upx;" placeholder="点击选择乡村名" v-model="model.name" disabled="true"
							 @click="VillageShow = true" />
						</view>
					</u-form-item>

					<!-- 技术类型 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="问题类型" :border-bottom="false" prop="">
						<view class="viewClass">
							<u-input :custom-style="tradeNameStyle" :border="false" v-model="model.techValue" type="select" @click="techShow = true"></u-input>
							<u-action-sheet :list="techList" v-model="techShow" @click="actionSheet"></u-action-sheet>
						</view>
					</u-form-item>

					<!-- 相关图片 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="相关图片" :border-bottom="false" prop="photo">
						<view>
							<u-upload :label-style="uploadStyle" ref="uUpload" :show-upload-list="showUploadList" :action="action" width="164"
							 height="164" :file-list="fileList" @on-remove="uploadOnRemove" @on-success="uploadOnsuccess"></u-upload>
						</view>

					</u-form-item>

					<!-- 简要备注 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="问题内容" :border-bottom="false" prop="intro">
						<view class="viewClass">
							<u-input :custom-style="textareaStyle" type="textarea" :height="200" :auto-height="autoHeight"  placeholder="请描述遇到的问题" :maxlength="50000" v-model="model.intro" />
						</view>
					</u-form-item>
				</u-form>
			</view>
		</view>
		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>

		<!-- 提交申请 -->
		<view class="operButton">
			<text class="buttonView2" @click="submit">提交申请</text>
		</view>

		<u-popup v-model="VillageShow" mode="center">
			<view>
				<!-- 顶部搜索框 -->
				<view class="topSerchView">
					<view class="SearchBar" elevation='5px'>
						<input class="addressInput" @input="onInput" placeholder="请输入关键字搜索" />
					</view>
				</view>


				<!-- 搜索列表 -->
				<view class="stationList" :style="{ 'height':scrollHeight }" v-if="SearchStatus">
					<block v-for="(item,index) in VillageSearchList" :key="index">
						<view class="listItem" @click="Listclick(item)">
							<rich-text :nodes="item.village_name"></rich-text>
						</view>
					</block>
				</view>

				<!-- 原列表 -->
				<view class="stationList" :style="{ 'height':scrollHeight }" v-if="VillageStatus">
					<block v-for="(item,index) in VillageList" :key="index">
						<view class="listItem" @click="Listclick(item)">
							<rich-text :nodes="item.village_name"></rich-text>
						</view>
					</block>
				</view>
				
				<view class="operButton">
					<text class="buttonView2" @click="VillageShow = false">关闭弹框</text>
				</view>
			</view>
		</u-popup>

		<u-picker mode="region" v-model="pickerShow" ></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					name: '', //乡村名
					techValue: '', //技术类型
					intro: '', //问题内容
				},
				VillageShow: false, //乡村弹框
				VillageSearchList: [], //关键字查询的乡村
				VillageList: [], //乡村列表
				VillageData: '', //乡村名数据缓存
				VillageStatus: true, //原列表显示状态
				SearchStatus: false, //搜索框显示状态

				showUploadList: true, //图片展示数组状态
				action: 'http://120.24.144.6:8080/api/file/upload', // 演示地址
				fileList: [], //图片数组
				fileListTest: [], //图片测试数组

				techShow: false, //技术类型选项栏开启状态

				userInfo : '',//用户信息

				techList: [{
					text: '设备故障'
				}, {
					text: '设备维护'
				}, {
					text: '乡村种植'
				}, {
					text: '乡村帮扶'
				}], //技术类型

				scrollHeight : '800upx',//弹框高度默认值


				//----------------uview样式--------------------------
				customStyle: {
					fontWeight: 'bold',
					fontSize: '17px',
					marginTop: '32rpx',
					padding: '0rpx',
				},
				uploadStyle: {
					background: '#FFFFFF',
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
				//----------------uview表单验证--------------------------
				rules: {
					name: [{
							required: true,
							message: '请选择乡村名',
							trigger: 'blur',
						},
						{
							min: 1,
							message: '请选择乡村名',
							trigger: ['change', 'blur'],
						},
					],
					techValue: [{
						required: true,
						message: '请选择技术类型',
						trigger: 'change',
					}],
					intro: [{
							required: true,
							message: '请填写简介'
						},
						{
							min: 5,
							message: '简介不能少于5个字',
							trigger: 'change',
						}
					],
				},
				pickerShow: false,
				errorType: ['message'],
				labelPosition: 'right',
				maxCount: 3,
				multiple: true,
				autoHeight: true,
			}
		},

		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},

		onLoad() {
			/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = `${res.windowHeight}px`;
				}
			});
			this.lostData();
		},
		onShow:function(){
			this.userData();
		},

		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData: function() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						console.log('获取个人信息', this.userInfo)
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title:'您暂未登录，已为您跳转登录页面',
							icon:'none',
							success: () => {
								uni.navigateTo({
									url : '../../pages/GRZX/userLogin'
								})
							}
						})
					}
				});
			},
			
			//--------------------------提交表单
			submit: function() {
				uni.showLoading({
					title:'提交中...'
				})
				//-----------------提交表单数据-----------------------
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						var imageListData = [];
						console.log(this.fileListTest)
						if(this.fileListTest != ''){
							if(this.fileListTest.length != 0){
								for(var i=0; i<this.fileListTest.length; i++){
									imageListData.push(this.fileListTest[i].url)
									console.log('循环图片',imageListData)
								}
							}
						}
						console.log(this.model.techValue)
						console.log(this.model.intro)
						console.log(imageListData)
						console.log(this.userInfo.userId)
						console.log(this.userInfo.phoneNumber)
						console.log(this.VillageData.id)
						
						uni.request({
							url: this.$pyfw.KyInterface.releaseCommissioner.Url,
							method: this.$pyfw.KyInterface.releaseCommissioner.method,
							data: {
								applyType :  this.model.techValue,//问题类型
								content :  this.model.intro,//问题内容
								image :  JSON.stringify(imageListData),//相关图片
								userId : this.userInfo.userId ,//用户id
								telephone : this.userInfo.phoneNumber,//用户电话
								villageId : this.VillageData.id,//乡村名id
							},
							success: (res) => {
								console.log(res)
								if(res.data.status){
									uni.hideLoading()
									uni.showToast({
										title:res.data.msg,
										success: () => {
											uni.removeStorage({
												key:'uploadData'
											})
											this.fileList = [];
											this.fileListTest = [];
											uni.navigateBack()
										}
										
									})
								}else{
									uni.hideLoading()
									uni.showToast({
										title:'申请失败，请联系客服处理异常',
										icon:'none'
									})
								}
								
							},
							fail: (err) => {
								uni.hideLoading()
								uni.showToast({
									title:'申请失败，服务器异常，请联系客服处理异常',
									icon:'none'
								})
								console.log(err)
							}
						})
					} else {
						uni.hideLoading()
						// console.log('验证失败');
						uni.showToast({
							title:'请根据相关红字提醒，填写或选择内容',
							icon: 'none'
						})
					}
				});
			},

			//-----------------请求乡村列表-----------------------
			lostData: function() {
				uni.request({
					url: this.$pyfw.KyInterface.getVillageList.Url,
					method: this.$pyfw.KyInterface.getVillageList.method,
					success: (res) => {
						uni.hideLoading();
						// console.log('乡村列表', res);
						this.VillageList = res.data.data;
					},
					fail(res) {
						uni.hideLoading();
					}
				})
			},

			//选择技术类型回调
			actionSheet: function(index) {
				// console.log(index)
				this.model.techValue = this.techList[index].text;
			},

			onInput: function(e) {
				// console.log('监听输入', e)
				//以下示例截取淘宝的关键字，请替换成你的接口
				if (e.detail.value != '') {
					this.VillageStatus = false;
					this.SearchStatus = true;
				} else {
					this.VillageStatus = true;
					this.SearchStatus = false;
				}

				uni.showLoading();
				uni.request({
					url: this.$pyfw.KyInterface.getVillageListByName.Url,
					method: this.$pyfw.KyInterface.getVillageListByName.method,
					data: {
						keyName: e.detail.value
					},
					success: (res) => {
						uni.hideLoading();
						// console.log('模糊搜索', res);
						this.VillageSearchList = res.data.data;
					},
					fail(res) {
						uni.hideLoading();
					}
				});
			},
			//点击列表内容后，赋值清空状态，关闭弹框
			Listclick: function(e) {
				this.model.name = e.village_name;
				this.VillageData = e;
				// console.log(this.VillageData)
				this.VillageStatus = true;
				this.SearchStatus = false;
				this.VillageShow = false;
			},

			//删除图片提示
			uploadOnRemove: function(e) {
				console.log('删除成功', e)
				// console.log('删除前',this.fileList)
				// console.log('删除前',this.fileListTest)
				this.fileList.splice(e, 1);
				this.fileListTest.splice(e, 1);
				// console.log('删除后',this.fileList)
				// console.log('删除后',this.fileListTest)
			},

			//上传成功提示
			uploadOnsuccess: function(e) {
				console.log('上传成功', e)
				console.log(this.fileList)
				uni.setStorage({
					key: 'uploadData',
					data: e.data,
					success: (res) => {
						this.getuploadImage();
					}

				})

			},
			getuploadImage: function() {
				uni.getStorage({
					key: 'uploadData',
					success: (res) => {
						console.log(res)
						var a = {
							url: res.data
						};
						this.fileListTest.push(a)
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

	//派员编号
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

	.topSerchView {
		background-color: #DBDBDB;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		width: 750upx;

		.SearchBar {
			background-color: #FFFFFF;
			margin-right: 20rpx;
			margin-left: 20rpx;
			box-shadow: 0px 4px 9px 1px rgba(204, 204, 204, 1);
			flex-direction: row;
			border-radius: 9px;
			padding: 20rpx;
			align-items: center;
			justify-content: space-between;
		}

		//地址搜索输入
		.addressInput {
			color: #999999;
			font-size: 30rpx;
			font-weight: 300;
		}
	}

	//站点列表
	.stationList {
		background-color: #FFFFFF;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		.listItem {
			margin-left: 20rpx;
			border-bottom: 1rpx solid #eeeeee;
		}
	}

	.list_box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 28rpx;

		.left {
			width: 200rpx;
			background-color: #f6f6f6;
			line-height: 80rpx;
			box-sizing: border-box;
			font-size: 32rpx;
			text-align: center;

			.item {
				padding-left: 20rpx;
				position: relative;
				padding: 8upx 0;

				&:not(:first-child) {
					margin-top: 1px;

					&::after {
						content: '';
						display: block;
						height: 0;
						border-top: #d6d6d6 solid 1px;
						width: 620upx;
						position: absolute;
						top: -1px;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}

				&.active,
				&:active {
					color: #42b983;
					background-color: #fff;
					padding: 8upx 0;
				}
			}
		}

		.main {
			background-color: #fff;
			padding-left: 20rpx;
			width: 0;
			flex-grow: 1;
			box-sizing: border-box;

			.swiper {
				height: 500px;
			}


			.item {
				padding-bottom: 10rpx;
			}
		}

		.goods {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin-bottom: 10rpx;
			border-bottom: 1rpx solid #eeeeee;
			line-height: 100upx;
			padding-left: 20upx;
		}
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
</style>
