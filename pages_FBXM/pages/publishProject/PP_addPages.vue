<template>
	<view>
		<view class="content">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<!-- 商品名称 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="标题内容" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入标题内容" v-model="model.name" type="text"></u-input>
					</view>
				</u-form-item>

				<!-- 乡村名称 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="乡村名称" :border-bottom="false">
					<view class="top_chooseTime" hover-class="ve_hover" @click="SelectRural">
						<text class="dateClass" v-if="village_name==''" style="color: #bec3ca;">请选择乡村名称</text>
						<text class="dateClass" style="color: #333333;">{{village_name}}</text>
					</view>
				</u-form-item>

				<!-- 负责人 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="负责人" :border-bottom="false">
					<view class="top_chooseTime" hover-class="ve_hover" @click="SelectPersonInCharge">
						<text class="dateClass" v-if="nick_name==''" style="color: #bec3ca;">请选择负责人</text>
						<text class="dateClass" style="color: #333333;">{{nick_name}}</text>
					</view>
				</u-form-item>

				<!-- 上传图片 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="上传图片" :border-bottom="false">
					<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action" max-count="1" width="164"
					 height="164" :file-list="fileList" @on-remove="uploadOnRemove" @on-success="uploadOnsuccess">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="photo" size="60" color="#c0c4cc"></u-icon>
						</view>
					</u-upload>
				</u-form-item>

				<!-- 上传视频 -->
				<!-- <u-form-item :label-style="customStyle" :label-position="labelPosition" label="上传视频" :border-bottom="false">
					<easy-upload :dataList="imageList" uploadUrl="http://8.135.49.179:8080/api/file/uploadvideo" :types="category"
					 deleteUrl='http://8.135.49.179:8080/api/file/uploadvideo' :uploadCount="1" @successVideo="successvideo"></easy-upload>
					<text class="videoClass">*目前该功能暂时只能上传小于20MB的视频</text>
				</u-form-item> -->

				<!-- 文件上传 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="添加文件" :border-bottom="false">
					<view class="viewClass">
						<view>
							<l-file ref="lFile" @up-success="onSuccess"></l-file>
							<view class="padding text-center">
								<view class="padding">
									<button @tap="onUpload">上传</button>
								</view>
								<view>{{filename}}</view>
							</view>
						</view>
					</view>
				</u-form-item>

				<!-- 简介 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="简介" :border-bottom="false">
					<view class="viewClass" style="padding:20rpx 30rpx;">
						<u-input type="textarea" :border="border" placeholder="请填写简介内容" maxlength="30" v-model="model.content" />
					</view>
				</u-form-item>

				<!-- 档案简介 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="档案简介" :border-bottom="false">
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
							<i :class="'iconfont icon-zuoduiqi ' + (formats.align === 'left' ? 'ql-active' : '')" data-name="align"
							 data-value="left"></i>
							<i :class="'iconfont icon-juzhongduiqi ' + (formats.align === 'center' ? 'ql-active' : '')" data-name="align"
							 data-value="center"></i>
							<i :class="'iconfont icon-youduiqi ' + (formats.align === 'right' ? 'ql-active' : '')" data-name="align"
							 data-value="right"></i>
							<i :class="'iconfont icon-zuoyouduiqi ' + (formats.align === 'justify' ? 'ql-active' : '')" data-name="align"
							 data-value="justify"></i>
							<i :class="'iconfont icon-line-height ' + (formats.lineHeight ? 'ql-active' : '')" data-name="lineHeight"
							 data-value="2"></i>
							<i :class="'iconfont icon-Character-Spacing ' + (formats.letterSpacing ? 'ql-active' : '')" data-name="letterSpacing"
							 data-value="2em"></i>
							<i :class="'iconfont icon-722bianjiqi_duanqianju ' + (formats.marginTop ? 'ql-active' : '')" data-name="marginTop"
							 data-value="20px"></i>
							<i :class="'iconfont icon-723bianjiqi_duanhouju ' + (formats.micon-previewarginBottom ? 'ql-active' : '')"
							 data-name="marginBottom" data-value="20px"></i>
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
							<i :class="'iconfont icon-wuxupailie ' + (formats.list === 'bullet' ? 'ql-active' : '')" data-name="list"
							 data-value="bullet"></i>
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
			<view style="padding-bottom: 120upx;"></view>
			<u-button type="success" :custom-style="buttonStyle" @click="successData">提交</u-button>
		</view>
	</view>
</template>

<script>
	import tColorPicke from '@/components/t-color-picker.vue';
	import {
		pathToBase64,
		base64ToPath
	} from '@/pages_GRZX/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	import robbyImageUpload from '@/pages_FBXM/compontents/robby-image-upload/robby-image-upload.vue';
	var _self;
	export default {
		components: {
			't-color-picker': tColorPicke,
			robbyImageUpload, // 导入图片上传
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
					content: '', //简介
					village: '', //乡村名
					personnel: '', //负责人
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
				//----------------uview表单验证--------------------------
				rules: {
					name: [{
							required: true,
							message: '请输入标题内容',
							trigger: 'blur',
						},
						{
							min: 1,
							message: '请输入标题内容',
							trigger: ['change', 'blur'],
						},
					],
					village: [{
							required: true,
							message: '请输入乡村名称',
							trigger: 'blur',
						},
						{
							min: 1,
							message: '请输入乡村名称',
							trigger: ['change', 'blur'],
						},
					],
					personnel: [{
							required: true,
							message: '请输入负责人',
							trigger: 'blur',
						},
						{
							min: 1,
							message: '请输入负责人',
							trigger: ['change', 'blur'],
						},
					],
					content: [{
							required: true,
							message: '请填写简介'
						},
						{
							min: 5,
							message: '简介不能少于5个字',
							trigger: 'change',
						},
					]
				},
				pickerShow: false,
				errorType: ['message'],
				labelPosition: 'right',
				maxCount: 3,
				multiple: true,
				show: true, //是否显示
				formData: { //表格数据
					userId: 2
				},
				types: '',
				imageList: [],
				enableDel: true, //是否启动del
				enableAdd: true, //是否启动删除
				pictureArray: [], //存储图片base64
				userInfo: [], //个人信息
				issueText: '',
				border: false,
				selectShow: false,
				jumpStatus: '',
				id: '',
				informationDetail: [],
				action: 'http://8.135.49.179:8080/api/file/upload', // 演示地址
				showUploadList: true,
				lists: [],
				fileList: [],
				category: 'video',
				videoData: '',
				videoArray: [],
				localPath: [],
				filename: '',
				ruralId: '',
				village_name: '',
				personId: '',
				nick_name: '',
			}
		},


		onRemove: function(e) {
			console.log(e)
		},

		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},

		onLoad(param) {
			_self = this;
			this.userData();
			this.jumpStatus = param.jumpStatus;
			this.id = param.id;
		},
		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData: function() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						// console.log('获取个人信息', this.userInfo)
					}
				});
			},

			//---------------------------------点击选择乡村---------------------------------
			SelectRural() {
				var that = this;
				//监听事件,监听下个页面返回的值
				uni.$on('startstaionChange', function(data) {
					// data即为传过来的值，给上车点赋值
					that.ruralId = data.data;
					that.village_name = data.data2;
					//清除监听，不清除会消耗资源
					uni.$off('startstaionChange');
					//如果重新选择就清空负责人参数
					that.personId = '';
					that.nick_name = '';
					console.log('乡村id值', that.ruralId)
					console.log('乡村名称', that.village_name)
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是上车点
					url: 'pp_chooseCountryside',
				})

			},

			//---------------------------------点击选择负责人---------------------------------
			SelectPersonInCharge() {
				var that = this;
				if (that.ruralId !== '') {
					//监听事件,监听下个页面返回的值
					uni.$on('startstaionChange', function(data) {
						// data即为传过来的值，给上车点赋值
						that.personId = data.data;
						that.nick_name = data.data2;
						//清除监听，不清除会消耗资源
						uni.$off('startstaionChange');
						console.log('负责人id值', that.personId)
						console.log('负责人名称', that.nick_name)
					});
					uni.navigateTo({
						//跳转到下个页面的时候加个字段，判断当前点击的是上车点
						url: 'pp_choicePersonInCharge?&ruralId=' + that.ruralId,
					})
				} else {
					uni.showToast({
						title: '请选择乡村名称',
						icon: 'none',
					})
				}
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
				var that = this;
				uni.createSelectorQuery().select('#editor').context(function(res) {
					// console.log(res);
					_self.editorCtx = res.context;
					that.editorCtx.setContents({
						html: that.issueText //this.EditGoodsDetail.content为赋值内容。    
					})
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
				// console.log(name);
				// console.log(value);
				// console.log(e.target.dataset);
				if (!name) return; // console.log('format', name, value)
				// console.log(this.editorCtx);
				this.editorCtx.format(name, value);
				// console.log(this.editorCtx);
			},

			onStatusChange(e) {
				this.formats = e.detail;
			},

			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						// console.log('insert divider success');
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
				let that = this;
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: this.$ycyd.KyInterface.upload.Url,
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log("编辑详情的时候返回照片地址", uploadFileRes)
								const back = JSON.parse(uploadFileRes.data);
								console.log(back)
								that.editorCtx.insertImage({
									src: back.data,
									data: {
										id: 'abcd',
										role: 'god'
									},
									width: '80%',
									success: function() {
										console.log('insert image success');
									}
								})
							}
						})
					}
				})
			},

			//---------------------------上传视频回调-------------------------------
			successvideo: function(e) {
				console.log(e)
				var data = JSON.parse(e.data);
				console.log(data)
				this.videoData = data;
				console.log('视频上传成功', this.videoData)
			},

			//删除图片提示
			uploadOnRemove: function(e) {
				this.fileList = undefined;
				this.lists = [];

			},

			deleteVideo: function(e) {
				this.types = e
				if (this.types == 0) {
					var videoArray = [];
				}
			},

			//删除图片提示
			uploadOnsuccess: function(e) {
				console.log('上传成功', e)
				var a = {
					data: e.data
				};
				this.lists.push(a.data)
				console.log(this.lists)
				console.log(this.fileList)
			},

			//-------------------------------上传文件---------------------------------------------------------------------------
			onOpenDoc() {
				let url = 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg';
				/* 下载返回临时路径（退出应用失效） */
				this.$refs.lFile.download(url)
					.then(path => {
						/* 预览 */
						this.$refs.lFile.open(path);
					});
			},

			/* 保存 */
			onDown() {
				let url = 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg';
				this.$refs.lFile.download(url, 'local')
					.then(path => {
						this.localPath = path;
					});
			},

			/* 上传 */
			onUpload() {
				this.filename = '';
				this.localPath = [];
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					//非真实地址，记得更换,调试时ios有跨域，需要后端开启跨域并且接口地址不要使用http://localhost/
					url: 'http://8.135.49.179:8080/api/file/upload',
					//默认file,上传文件的key
					name: 'file',
					// header: {'Authorization':'token'},
					//...其他参数
				});
			},
			onSuccess(res) {
				console.log('上传成功回调', res);
				this.filename = res.fileName;
				this.localPath = JSON.parse(res.data.id);
				console.log('上传成功回调', this.localPath);
			},

			successData: function() {
				this.editorCtx.getContents({
					success: (res) => {
						console.log(res);
						this.issueText = res.html;

						this.uploadData(this.issueText);
					}
				});

			},

			uploadData: function(e) {
				uni.showLoading({
					title: '提交中...',
					mask: true,
				})
				var arr = [];
				arr.push(this.localPath.data);
				console.log('1', arr);
				var arr2 = [];
				arr2.push(this.filename);
				console.log('2', arr2);
				//-----------------提交表单数据-----------------------

				if (this.issueText !== '<p><br></p>') {
					if(this.lists.length!==0){
						this.$refs.uForm.validate(valid => {
							if (valid) {
								// uni.hideLoading();
								if (this.ruralId !== '') {
									if (this.personId !== '') {
										if (this.model.name !== '') {
											if (this.model.content !== '') {
												if (this.model.content.length > 5) {
													uni.request({
														url: this.$fbxm.KyInterface.releaseProject.Url,
														method: this.$fbxm.KyInterface.releaseProject.method,
														data: {
															userId: this.userInfo.userId,
															content: e,
															image: JSON.stringify(this.lists),
															title: this.model.name,
															pdfFile: JSON.stringify(arr),
															pdfName: JSON.stringify(arr2),
															ruralId: this.ruralId,
															personId: this.personId,
															introduce: this.model.content,
														},
														success: (res) => {
															console.log(res, "请求完接口");
															if (res.data.status) {
																uni.showToast({
																	title: res.data.msg,
																})
																setTimeout(function() {
																	uni.navigateBack();
																}, 1000)
															} else {
																uni.showToast({
																	title: res.data.msg,
																	icon: 'none',
																})
															}
														},
														fail: () => {
															uni.showToast({
																title: '提交失败',
																icon: 'none',
															})
														},
														complete: () => {
															setTimeout(function() {
																uni.hideLoading();
															}, 800)
														}
													});
												}
											}
										}
									}
								}
							} else {
								//---------------提示内容------------------------
						
								uni.hideLoading();
								console.log('验证失败');
								if (this.model.name == '') {
									uni.showToast({
										title: '提交失败,请编辑标题内容',
										icon: 'none',
									})
								}
						
								if (this.ruralId == '') {
									uni.showToast({
										title: '提交失败,请选择乡村',
										icon: 'none',
									})
								}
						
								if (this.personId == '') {
									uni.showToast({
										title: '提交失败,请选择负责人',
										icon: 'none',
									})
								}
								if (this.model.content == '') {
									uni.showToast({
										title: '提交失败,请输入简介',
										icon: 'none',
									})
								}
								if (this.model.content.length < 5) {
									uni.showToast({
										title: '提交失败,简介至少大于5个字',
										icon: 'none',
									})
								}
							}
						});
					}else{
						uni.showToast({
							title: '提交失败,请选择图片',
							icon: 'none',
						})
					}
				} else {
					uni.showToast({
						title: '提交失败,请编辑档案简介',
						icon: 'none',
					})
				}
			},
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

	//选择时间
	.top_chooseTime {
		// position: absolute;
		display: flex;
		width: 100%;
		// height:100%;
		overflow: hidden;
		left: 6%;
		padding: 12upx 20upx;
		border-radius: 14upx;
		background-color: #FFFFFF;
		z-index: 2;

		//出发点
		.dateClass {
			display: flex;
			font-size: 28upx;
			left: 0;
			text-align: left;
		}
	}

	//点击态
	.ve_hover {
		transition: all .3s; //过度
		border-top-left-radius: 22rpx;
		border-bottom-left-radius: 22rpx;
		opacity: 0.9;
		background: #E4E7ED;
	}

	.videoClass {
		color: #FA3534;
		font-size: 28upx;
	}
</style>
