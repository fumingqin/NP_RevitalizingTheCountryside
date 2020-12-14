<template>
	<view>
		<view>
			<view class="content">
				<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
					
					<!-- 标题 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="标题" :border-bottom="false" prop="intro">
						<view class="viewClass">
							<input style="height: 96upx; padding-left: 24upx;" placeholder="如:2020年村级第四季度考评工作" v-model="model.intro"  />
						</view>
					</u-form-item>

					<!-- 乡村名 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="乡村名" :border-bottom="false" prop="name">
						<view class="viewClass">
							<input style="height: 96upx; padding-left: 24upx;" placeholder="点击选择需考评的乡村" v-model="model.name" disabled="true"
							 @click="VillageShow = true" />
						</view>
					</u-form-item>


					<!-- 考评人 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="考评人" :border-bottom="false" prop="name">
						<view class="viewClass">
							<input style="height: 96upx; padding-left: 24upx;" placeholder="自动分配考评人员" v-model="AssessorList.name" disabled="true" />
						</view>
					</u-form-item>

					<!-- 考评时间 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="考评时间" :border-bottom="false" prop="">
						<view class="viewClass">
							<view style="height: 96upx; padding:16upx 0 0 24upx; font-size: 32upx;" @click="onShowDatePicker('date')">{{datestring}}&nbsp;&nbsp;&nbsp;&nbsp;{{Week}}</view>
							<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
							 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
						</view>
					</u-form-item>

					<!-- 考评指标 -->
					<view style="font-size: 17px;font-weight: bold;margin-top:20upx;">考评指标</view>
					<view style="display: flex;">
						<view v-for="(item,index) in tesklist" :key="index">
							<button class="allBtn" @click="open()">{{item.teskname}}</button>
						</view>
						<!-- 嵌套弹框组件popup -->
						<uni-popup ref="popup" type="bottom">
							<view class="boxVlew">
								<view class="titleView">
									<text class="Nb_text1">指标详情</text>
									<text class="Nb_text2 jdticon icon-fork " @click="close()"></text>
								</view>
								<scroll-view class="noticeBox" scroll-y="ture">
									<text class="Nb_text4">
										{{item.teskname}}
									</text>
								</scroll-view>
							</view>
						</uni-popup>
					</view>
					
					<!-- <u-form-item :label-style="customStyle" :label-position="labelPosition" label="相关图片" :border-bottom="false" prop="photo">
						<view>
							<u-upload :label-style="uploadStyle" ref="uUpload" :show-upload-list="showUploadList" :action="action" width="164"
							 height="164" :file-list="fileList" @on-remove="uploadOnRemove" @on-success="uploadOnsuccess"></u-upload>
						</view>
					</u-form-item> -->

					<!-- 简要备注 -->
					<!-- <u-form-item :label-style="customStyle" :label-position="labelPosition" label="问题内容" :border-bottom="false" >
						<view class="viewClass">
							<u-input :custom-style="textareaStyle" type="textarea" :height="200" :auto-height="autoHeight"  placeholder="请描述遇到的问题" :maxlength="50000" v-model="model.intro" />
						</view>
					</u-form-item> -->
				</u-form>
			</view>
		</view>
		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>

		<!-- 提交申请 -->
		<view class="operButton">
			<text class="buttonView2" @click="submit">发布</text>
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

		<u-picker mode="region" v-model="pickerShow"></u-picker>
	</view>
</template>

<script>
	import MxDatePicker from "../../components/HOME/mx-datepicker/mx-datepicker.vue";
	import uniPopup from "@/pages_JDKP/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			MxDatePicker,
			uniPopup
		}, //注册为子组件
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
				AssessorList: {
					rural_id: '', //考评人ID
					name: '', //考评人姓名
					phone: '', //考评人电话
				}, //考评人信息

				//--------------时间参数-----------
				value: '',
				showPicker: false,
				date: '',
				type: 'rangetime',
				datestring: '请选择考评时间',
				Week: '',
				//--------------时间参数-----------


				showUploadList: true, //图片展示数组状态
				action: 'http://120.24.144.6:8080/api/file/upload', // 演示地址
				fileList: [], //图片数组
				fileListTest: [], //图片数组

				techShow: false, //技术类型选项栏开启状态
				PersonShow: false, //人员名单弹窗状态值

				userInfo: '', //用户信息


				scrollHeight: '800upx', //弹框高度默认值
				tesklist:[{
					teskid:1,
					teskname:'任务一',
					// norm:{
					// indexid:1,
					// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
					// indexgrade:3,
					// },
					// {
					// indexid:2,
					// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
					// indexgrade:3,
					// },
					// {
					// indexid:3,
					// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
					// indexgrade:3,
					// },
					// {
					// indexid:4,
					// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
					// indexgrade:3,
					// },
					// {
					// indexid:5,
					// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
					// indexgrade:3,
					// },
					// {
					// indexid:6,
					// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
					// indexgrade:3,
					// },{
					// indexid:7,
					// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
					// indexgrade:3,
					// },
					// {
					// indexid:8,
					// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
					// indexgrade:3,
					// },
					// {
					// indexid:9,
					// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
					// indexgrade:3,
					// },
					// {
					// indexid:10,
					// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
					// indexgrade:3,
					// }
				},
				{
						teskid:2,
						teskname:'任务二',
						// {
						// indexid:1,
						// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那',
						// indexgrade:3,
						// },
						// {
						// indexid:2,
						// indexname:'大家问的我我加点击我懂你的玩电脑玩i',
						// indexgrade:3,
						// },
						// {
						// indexid:3,
						// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
						// indexgrade:3,
						// },
						// {
						// indexid:4,
						// indexname:'大家问的我我加点击我懂你的玩玩ID那我i',
						// indexgrade:3,
						// },
						// {
						// indexid:5,
						// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
						// indexgrade:3,
						// },
						// {
						// indexid:6,
						// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
						// indexgrade:3,
						// },{
						// indexid:7,
						// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
						// indexgrade:3,
						// },
						// {
						// indexid:8,
						// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
						// indexgrade:3,
						// },
						// {
						// indexid:9,
						// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
						// indexgrade:3,
						// },
						// {
						// indexid:10,
						// indexname:'大家问的我我加点击我懂你的玩电脑玩ID那我i',
						// indexgrade:3,
						// }
				}
				],

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
					// techValue: [{
					// 	required: true,
					// 	message: '请选择技术类型',
					// 	trigger: 'change',
					// }],
					intro: [{
							required: true,
							message: '请输入标题'
						},
						{
							min: 5,
							message: '标题不能少于5个字',
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
		onShow: function() {
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
							title: '您暂未登录，已为您跳转登录页面',
							icon: 'none',
							success: () => {
								uni.navigateTo({
									url: '../../pages/GRZX/userLogin'
								})
							}
						})
					}
				});
			},

			//--------------------------提交表单
			submit: function() {
				uni.showLoading({
					title: '提交中...'
				})
				//-----------------提交表单数据-----------------------
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						// var imageListData = [];
						// console.log(this.fileListTest)
						// if (this.fileListTest != '') {
						// 	if (this.fileListTest.length != 0) {
						// 		for (var i = 0; i < this.fileListTest.length; i++) {
						// 			imageListData.push(this.fileListTest[i].url)
						// 			console.log('循环图片', imageListData)
						// 		}
						// 	}
						// }
						if( this.datestring == '请选择考评时间'){
							uni.hideLoading()
							uni.showToast({
								title: '请选择考评时间',
								icon: 'none'
							})
						}else{
							uni.request({
								url: this.$jdkp.KyInterface.releaseEvaluation.Url,
								method: this.$jdkp.KyInterface.releaseEvaluation.method,
								data: {
									title : this.model.intro,
									content : '乡村季度考评，根据考评结果进行评分',
									image : '',
									userId: this.userInfo.userId, //用户id
									examinerId : this.AssessorList.id, //考评人ID
									ruralId: this.VillageData.id, //乡村名id
									reviewTime : this.datestring,//考评时间
								},
								success: (res) => {
									console.log(res)
									if (res.data.status) {
										uni.hideLoading()
										uni.showToast({
											title: res.data.msg,
											success: () => {
												// uni.removeStorage({
												// 	key: 'uploadData'
												// })
												// this.fileList = [];
												// this.fileListTest = [];
												setTimeout(function(){
													uni.navigateBack()
												},1500)
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
								fail: (err) => {
									uni.hideLoading()
									uni.showToast({
										title: '申请失败，服务器异常，请联系客服处理异常',
										icon: 'none'
									})
									console.log(err)
								}
							})
						}
					} else {
						uni.hideLoading()
						// console.log('验证失败');
						uni.showToast({
							title: '请根据相关红字提醒，填写或选择内容',
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
				this.AssessorSuccess();
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
			},

			//请求考评人
			AssessorSuccess: function() {
				uni.showLoading({
					title: '自动分配考评人...'
				})
				uni.request({
					url: this.$jdkp.KyInterface.getExaminer.Url,
					method: this.$jdkp.KyInterface.getExaminer.method,
					success: (res) => {
						console.log(res)
						if (res.data.msg == '获取成功') {
							uni.hideLoading()
							this.AssessorList = res.data.data[0];
							console.log(this.AssessorList)
						} else {
							uni.hideLoading()
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})

						}
					},
					fail: (err) => {
						console.log(err)
						uni.hideLoading()
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},


			//---------------------------------获取当前日期---------------------------------
			getTodayDate() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var timer = year + '-' + month + '-' + day;
				this.queryWeek(date.toString().substring(0, 3));
				this.datestring = timer;
			},
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			//选择时间
			onSelected(e) {
				this.showPicker = false;
				if (e) {
					// this[this.type] = e.value;
					this[this.type] = e.value.split('/')[0] + "-" + e.value.split('/')[1] + "-" + e.value.split('/')[2];
					this.datestring = this[this.type];
					this.queryWeek(e.date.toString().substring(0, 3));
					// console.log(this[this.type]);
					// console.log(e.date.toString().substring(0,3));
					// console.log(this.Week);
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
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
			//打开popup下弹框
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
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
	.allBtn {
		padding: 0 20upx;
		font-size: 26upx;
		border-radius: 8upx;
		border: 0.1 solid #06B4FD;
		margin-right: 30upx;
		background-color: #fff;
		color: #666666;
	}
	//须知弹框
	.boxVlew {
		width: 100%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;
	
		.titleView {
			margin: 24upx 0;
	
			//弹框标题
			.Nb_text1 {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
				margin-bottom: 16upx;
			}
	
			//弹框关闭按钮
			.Nb_text2 {
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}
	
		.noticeBox {
			height: 800upx;
			line-height: 32upx;
	
			.Nb_text3 {
				display: block;
				margin-top: 32upx;
				font-size: 34upx;
				font-weight: bold;
			}
	
			.Nb_text4 {
				display: block;
				line-height: 64upx;
				margin: 32upx 0;
				font-size: 30upx;
			}
		}
	}
</style>
