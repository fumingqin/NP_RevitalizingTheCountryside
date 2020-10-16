<template>
	<view>
		<view class="content">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">

				<!-- 商品名称 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="商品名称" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入产品名称" v-model="model.name" :type="text"></u-input>
					</view>
				</u-form-item>

				<!-- 商品来源地 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="商品来源地" :border-bottom="false" prop="region">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" type="select" :select-open="pickerShow" v-model="model.region" placeholder="请选择商品来源地" @click="pickerShow = true"></u-input>
					</view>
				</u-form-item>

				<!-- 商品价格 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="商品价格" :border-bottom="false" prop="cost">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入商品价格" v-model="model.cost" :type="text"></u-input>
					</view>
				</u-form-item>

				<!-- 上传图片 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="上传图片" :border-bottom="false" prop="photo">
					<u-upload ref="uUpload" :custom-btn="true" :max-count="maxCount" :multiple="multiple" width="160" height="160" :action="action" v-model="model.photo">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
						</view>
					</u-upload>
				</u-form-item>
				
				<!-- 商品简介 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="商品简介" :border-bottom="false" prop="intro">
					<view class="viewClass" style="padding: 20rpx;">
						<view class="container">
							<editor id="editor" show-img-size :read-only="isEdit" show-img-resize show-img-toolbar class="ql-container"
							 :placeholder="placeholder" @statuschange="onStatusChange" @ready="onEditorReady">
							</editor>
						</view>
						
						<view class="toolbar" @touchend.stop="format" :style="'bottom: ' + (isIOS ? keyboardHeight : 0) + 'px'">
							<i class="iconfont icon-charutupian" @touchend.stop="insertImage"></i>
							<i :class="'iconfont icon-format-header-1 ' + (formats.header === 1 ? 'ql-active' : '')" data-name="header"
							 :data-value="1"></i>
							<i :class="'iconfont icon-format-header-2 ' + (formats.header === 2 ? 'ql-active' : '')" data-name="header"
							 :data-value="2"></i>
							<i :class="'iconfont icon-format-header-3 ' + (formats.header === 3 ? 'ql-active' : '')" data-name="header"
							 :data-value="3"></i>
							<i :class="'iconfont icon-format-header-4 ' + (formats.header === 4 ? 'ql-active' : '')" data-name="header"
							 :data-value="4"></i>
							<i :class="'iconfont icon-format-header-5 ' + (formats.header === 5 ? 'ql-active' : '')" data-name="header"
							 :data-value="5"></i>
							<i :class="'iconfont icon-format-header-6 ' + (formats.header === 6 ? 'ql-active' : '')" data-name="header"
							 :data-value="6"></i>
							<i :class="'iconfont icon-zitijiacu ' + (formats.bold ? 'ql-active' : '')" data-name="bold"></i>
							<i :class="'iconfont icon-zitishanchuxian ' + (formats.strike ? 'ql-active' : '')" data-name="strike"></i>
							<i :class="'iconfont icon-zitixieti ' + (formats.italic ? 'ql-active' : '')" data-name="italic"></i>
							<i :class="'iconfont icon-zuoduiqi ' + (formats.align === 'left' ? 'ql-active' : '')" data-name="align" data-value="left"></i>
							<i :class="'iconfont icon-juzhongduiqi ' + (formats.align === 'center' ? 'ql-active' : '')" data-name="align"
							 data-value="center"></i>
							<i :class="'iconfont icon-youduiqi ' + (formats.align === 'right' ? 'ql-active' : '')" data-name="align" data-value="right"></i>
							<i :class="'iconfont icon-zuoyouduiqi ' + (formats.align === 'justify' ? 'ql-active' : '')" data-name="align"
							 data-value="justify"></i>
							<i :class="'iconfont icon-line-height ' + (formats.lineHeight ? 'ql-active' : '')" data-name="lineHeight" data-value="2"></i>
							<i :class="'iconfont icon-Character-Spacing ' + (formats.letterSpacing ? 'ql-active' : '')" data-name="letterSpacing"
							 data-value="2em"></i>
							<i :class="'iconfont icon-722bianjiqi_duanqianju ' + (formats.marginTop ? 'ql-active' : '')" data-name="marginTop"
							 data-value="20px"></i>
							<i :class="'iconfont icon-723bianjiqi_duanhouju ' + (formats.micon-previewarginBottom ? 'ql-active' : '')" data-name="marginBottom"
							 data-value="20px"></i>
							<i class="iconfont icon-clearedformat" @tap="removeFormat"></i>
							<i :class="'iconfont icon-font ' + (formats.fontFamily ? 'ql-active' : '')" data-name="fontFamily" data-value="Pacifico"></i>
							<i :class="'iconfont icon-fontsize ' + (formats.fontSize === '24px' ? 'ql-active' : '')" data-name="fontSize"
							 data-value="24px"></i>
							<i :class="'iconfont icon-text_color ' + (formats.color === fontColor ? 'ql-active' : '')" data-name="color"
							 :data-value="fontColor" @tap="open"></i>
							<i :class="'iconfont icon-fontbgcolor ' + (formats.backgroundColor === '#00ff00' ? 'ql-active' : '')" data-name="backgroundColor"
							 data-value="#00ff00"></i>
							<!-- 引用黄河浪的color取色器 -->
							<i class="iconfont icon-date" @tap="insertDate"></i>
							<i class="iconfont icon-undo" @tap="undo"></i>
							<i class="iconfont icon-redo" @tap="redo"></i>
							<i :class="'iconfont icon-zitixiahuaxian ' + (formats.underline ? 'ql-active' : '')" data-name="underline"></i>
							<i class="iconfont icon--checklist" data-name="list" data-value="check"></i>
							<i :class="'iconfont icon-youxupailie ' + (formats.list === 'ordered' ? 'ql-active' : '')" data-name="list"
							 data-value="ordered"></i>
							<i :class="'iconfont icon-wuxupailie ' + (formats.list === 'bullet' ? 'ql-active' : '')" data-name="list" data-value="bullet"></i>
							<i class="iconfont icon-outdent" data-name="indent" data-value="-1"></i>
							<i class="iconfont icon-indent" data-name="indent" data-value="+1"></i>
							<i class="iconfont icon-fengexian" @tap="insertDivider"></i>
							<i class="iconfont icon-preview" @tap="store" id="2"></i>
							<i :class="'iconfont icon-zitixiabiao ' + (formats.script === 'sub' ? 'ql-active' : '')" data-name="script"
							 data-value="sub"></i>
							<i :class="'iconfont icon-zitishangbiao ' + (formats.script === 'super' ? 'ql-active' : '')" data-name="script"
							 data-value="super"></i>
							<!-- <i class="iconfont icon-quanping"></i> -->
							<i class="iconfont icon-shanchu" @tap="clear"></i>
							<i :class="'iconfont icon-direction-rtl ' + (formats.direction === 'rtl' ? 'ql-active' : '')" data-name="direction"
							 data-value="rtl"></i>
							<i class="iconfont icon-baocun" @tap="store" id="1"></i>
						</view>
						<t-color-picker ref="colorPicker" :color="color" @confirm="confirm" @cancel="cancel"></t-color-picker>
					</view>
				</u-form-item>
			</u-form>
			<u-button type="success" :custom-style="buttonStyle" @click="submit">提交</u-button>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		</view>
	</view>
</template>

<script>
	import tColorPicke from '@/components/t-color-picker.vue';
	var _self;
	export default {
		components: {
			't-color-picker': tColorPicke
		},
		data() {
			return {
					color: {
						r: 255,
						g: 0,
						b: 0,
						a: 0.6
					},
					isEdit: false,
					fontColor: '#000',
					formats: {},
					readOnly: false,
					placeholder: '开始输入...',
					editorHeight: 300,
					keyboardHeight: 0,
					isIOS: false,
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
					paddingTop: '8px',
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
		onLoad() {
			_self = this;
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
			//--------------------------------------------
			
				cancel() {
					this.isEdit = false;
				},
				open() {
					this.$refs.colorPicker.open();
					this.isEdit = true;
					// uni.hideKeyboard();
				},
				hideKey() {
					uni.hideKeyboard();
				},
				async confirm(e) {
					this.isEdit = false;
					this.fontColor = await e.hex;
					this.onStatusChange({
						detail: {
							color: e.hex
						}
					});
					this.$forceUpdate();
				},
				readOnlyChange() {
					this.readOnly = !this.readOnly
				},
				onEditorReady() {
					uni.createSelectorQuery().select('#editor').context(function(res) {
						console.log(res);
						_self.editorCtx = res.context;
					}).exec();
				},
				undo() {
					this.editorCtx.undo();
				},
			
				redo() {
					this.editorCtx.redo();
				},
			
				blur() {
					this.editorCtx.blur();
				},
			
				format(e) {
					// this.hideKey();
					let {
						name,
						value
					} = e.target.dataset;
					console.log(name);
					console.log(value);
					console.log(e.target.dataset);
					if (!name) return; // console.log('format', name, value)
					console.log(this.editorCtx);
					this.editorCtx.format(name, value);
					console.log(this.editorCtx);
				},
			
				onStatusChange(e) {
					this.formats = e.detail;
				},
			
				insertDivider() {
					this.editorCtx.insertDivider({
						success: function() {
							console.log('insert divider success');
						}
					});
				},
			
				store(e) {
					this.editorCtx.getContents({
						success: function(res) {
							e.currentTarget.id == 1 ? console.log('保存内容:', res.html) : uni.navigateTo({
								url: `../preview/preview?rich=${encodeURIComponent(res.html)}`
							});
						}
					});
				},
			
				clear() {
					this.editorCtx.clear({
						success: function(res) {
							console.log("clear success");
						}
					});
				},
			
				removeFormat() {
					this.editorCtx.removeFormat();
				},
			
				insertDate() {
					const date = new Date();
					const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
					this.editorCtx.insertText({
						text: formatDate
					});
				},
			
				insertImage() {
					// const that = this;
					uni.chooseImage({
						count: 1,
						success: function(res) {
							_self.editorCtx.insertImage({
								src: res.tempFilePaths[0],
								data: {
									id: 'abcd',
									role: 'god'
								},
								width: '80%',
								success: function() {
									console.log('insert image success');
								}
							});
						}
					});
				}
		}
	}
</script>

<style lang="scss">
	@import "./editor.css";
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
</style>
