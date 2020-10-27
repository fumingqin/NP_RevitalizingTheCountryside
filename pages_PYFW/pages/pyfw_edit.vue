<template>
	<view>
		<view>
			<view class="content">
				<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">

					<!-- 乡村名 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="乡村名" :border-bottom="false" prop="name">
						<view class="viewClass">
							<input style="height: 96upx; padding-left: 24upx;" placeholder="点击选择乡村名" v-model="villageName" disabled="true"
							 @click="VillageShow = true" />
						</view>
					</u-form-item>

					<!-- 技术类型 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="问题类型" :border-bottom="false">
						<view class="viewClass">
							<u-input :custom-style="tradeNameStyle" :border="false" v-model="techValue" type="select" @click="techShow = true"></u-input>
							<u-action-sheet :list="techList" v-model="techShow" @click="actionSheet"></u-action-sheet>
						</view>
					</u-form-item>

					<!-- 相关图片 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="相关图片" :border-bottom="false" prop="photo">
						<u-upload ref="uUpload" :custom-btn="true" :max-count="maxCount" :multiple="multiple" width="160" height="160"
						 :action="action" v-model="model.photo">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
							</view>
						</u-upload>
					</u-form-item>

					<!-- 简要备注 -->
					<u-form-item :label-style="customStyle" :label-position="labelPosition" label="问题内容" :border-bottom="false" prop="intro">
						<view class="viewClass">
							<u-input :custom-style="textareaStyle" type="textarea" :height="200" :auto-height="autoHeight" :border="border"
							 placeholder="请描述遇到的问题" :maxlength="50000" v-model="model.intro" />
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
				
			</view>
		</u-popup>

		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				villageName: '点击选择乡村名', //乡村名
				VillageShow: false, //乡村弹框
				VillageSearchList: [], //关键字查询的乡村
				VillageList: [], //乡村列表
				VillageData: '', //乡村名数据缓存
				VillageStatus: true, //原列表显示状态
				SearchStatus: false, //搜索框显示状态


				techShow: false, //技术类型选项栏开启状态
				techValue: '请选择类型', //技术类型的默认值

				model: {
					name: '', //商品名称value
					region: '', //选择来源地value
					type: '', //类型
					photo: '', //图片
					intro: '', //商品简介
				},
				techList: [{
					text: '设备故障'
				}, {
					text: '设备维护'
				}, {
					text: '乡村种植'
				}, {
					text: '乡村帮扶'
				}], //技术类型

				//----------------uview样式--------------------------
				customStyle: {
					fontWeight: 'bold',
					fontSize: '17px',
					marginTop: '32rpx',
					padding: '0rpx',
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
					region: [{
						required: true,
						message: '请选择商品来源地',
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
						},
						// 正则校验示例，此处用正则校验是否中文，此处仅为示例，因为uView有this.$u.test.chinese可以判断是否中文
						// {
						// 	pattern: /^[\u4e00-\u9fa5]+$/gi,
						// 	message: '简介只能为中文',
						// 	trigger: 'change',
						// },
					],
				},
				pickerShow: false,
				errorType: ['message'],
				labelPosition: 'right',
				maxCount: 3,
				multiple: true,
				action: 'http://www.example.com/upload',
				autoHeight: true,
			}
		},

		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		
		onLoad(){
			this.lostData();
		},
		
		methods: {
			submit() {
				//-----------------提交表单数据-----------------------
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
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
						console.log('乡村列表', res);
						this.VillageList = res.data.data;
					},
					fail(res) {
						uni.hideLoading();
					}
				})
			},

			//--------------------- 选择地区回调 --------------------------
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
				console.log(this.model)
			},

			//选择技术类型回调
			actionSheet: function(index) {
				// console.log(index)
				this.techValue = this.techList[index].text;
			},

			onInput: function(e) {
				console.log('监听输入', e)
				//以下示例截取淘宝的关键字，请替换成你的接口
				if(e.detail.value != ''){
					this.VillageStatus = false;
					this.SearchStatus = true;
				}else{
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
						console.log('模糊搜索', res);
						this.VillageSearchList = res.data.data;
					},
					fail(res) {
						uni.hideLoading();
					}
				});
			},

			Listclick: function(e) {
				this.villageName = e.village_name;
				this.VillageData = e;
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
		height: 800rpx;

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
</style>
