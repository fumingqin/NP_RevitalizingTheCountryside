<template>
	<view>
		<view>
			<view class="content">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">

				<!-- 乡村名 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="乡村名" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请选择乡村名" v-model="model.name" :type="text"></u-input>
					</view>
				</u-form-item>

				<!-- 商品来源地 -->
				<!-- <u-form-item :label-style="customStyle" :label-position="labelPosition" label="." :border-bottom="false" prop="region">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" type="select" :select-open="pickerShow" v-model="model.region" placeholder="请选择商品来源地" @click="pickerShow = true"></u-input>
					</view>
				</u-form-item> -->

				<!-- 技术类型 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="问题类型" :border-bottom="false" prop="cost">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请选择问题类型" v-model="model.cost" :type="text"></u-input>
					</view>
				</u-form-item>

				<!-- 相关图片 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="相关图片" :border-bottom="false" prop="photo">
					<u-upload ref="uUpload" :custom-btn="true" :max-count="maxCount" :multiple="multiple" width="160" height="160" :action="action" v-model="model.photo">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
						</view>
					</u-upload>
				</u-form-item>
				
				<!-- 简要备注 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="问题内容" :border-bottom="false" prop="intro">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="textareaStyle" type="textarea"  :height="200" :auto-height="autoHeight" :border="border" placeholder="请描述遇到的问题" :maxlength="50000" v-model="model.intro" />
					</view>
				</u-form-item>
			</u-form>
			</view>
			<!-- 提交申请 -->
			<view class="operButton">
				<text class="buttonView2" @click="submit">提交申请</text>
			</view>
		</view>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					name: '', //商品名称value
					region: '', //选择来源地value
					cost: '',//价格
					photo:'',//图片
					intro:'',//商品简介
				},
				//----------------uview样式--------------------------
				customStyle: {
					fontWeight: 'bold',
					fontSize: '17px',
					marginTop : '32rpx',
				},
				buttonStyle: {
					marginTop:'20px',
				},
				tradeNameStyle: {
					background: '#FFFFFF',
					paddingTop: '5px',
					paddingBottom: '5px',
					paddingLeft: '10px',
					paddingRight: '10px',
					borderRadius: "6px",
				},
				textareaStyle:{
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
							message: '请输入商品名称',
							trigger: 'blur',
						},
						{
							min: 1,
							message: '请输入商品名称',
							trigger: ['change', 'blur'],
						},
					],
					region: [{
						required: true,
						message: '请选择商品来源地',
						trigger: 'change',
					}],
					cost: [{
							required: true,
							message: '请输入价格',
							trigger: ['change', 'blur'],
						},
						{
							type: 'number',
							message: '价格只能为数字',
							trigger: ['change', 'blur'],
						}
					],
					intro: [
						{
							required: true,
							message: '请填写简介'
						},
						{
							min: 5,
							message: '简介不能少于5个字',
							trigger: 'change' ,
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
				maxCount:3,
				multiple:true,
				action: 'http://www.example.com/upload',
				autoHeight:true,
			}
		},

		onReady() {
			this.$refs.uForm.setRules(this.rules);
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

			//--------------------- 选择地区回调 --------------------------
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
				console.log(this.model)
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
	.operButton{
		display: flex; 
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 96upx;
		text-align: center;
		.buttonView2{
			width: 100%; 
			background: #18B566; 
			color: #FFFFFF;
			font-size: 32upx; 
			line-height: 3;
		}
	}
</style>
