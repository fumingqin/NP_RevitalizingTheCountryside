<template>
	<view>
		<view class="content">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">

				<!-- 商品名称 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="政策标题" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入政策标题" v-model="model.name" :type="text"></u-input>
					</view>
				</u-form-item>
				<!-- 文件上传 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="添加文件" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
							<view class="padding">
								<button @tap="onUpload">上传</button>
							</view>
					</view>
				</u-form-item>
				<!-- 上传图片 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="上传图片" :border-bottom="false" prop="photo">
					<u-upload ref="uUpload" :custom-btn="true" :max-count="maxCount" :multiple="multiple" width="160" height="160"
					 :action="action" v-model="model.photo">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
						</view>
					</u-upload>
				</u-form-item>

				<!-- 商品来源地 -->
				<!-- <u-form-item :label-style="customStyle" :label-position="labelPosition" label="商品来源地" :border-bottom="false" prop="region">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" type="select" :select-open="pickerShow" v-model="model.region" placeholder="请选择商品来源地" @click="pickerShow = true"></u-input>
					</view>
				</u-form-item> -->

				<!-- 商品价格 -->
				<!-- <u-form-item :label-style="customStyle" :label-position="labelPosition" label="商品价格" :border-bottom="false" prop="cost">
					<view class="viewClass" s1tyle="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入商品价格" v-model="model.cost" :type="text"></u-input>
					</view>
				</u-form-item> -->

				<!-- 上传视频 -->
				<view class="burst-wrap">
				    <view class="burst-wrap-bg">
				        <view>
				            <!-- 信息提交 -->
				            <view class="burst-info">
				                <view class="uni-uploader-body">
				                    <view class="uni-uploader__files">
				                        <!-- 视频 -->
				                        <view class="uni-uploader__file" v-if="src">
				                            <view class="uploader_video">
				                                <view class="icon iconfont icon-cuo" @tap="delectVideo"></view>
				                                <video :src="src" class="video"></video>
				                            </view>
				                        </view>
				                        <view>
											<button @tap="chooseVideo">上传</button>
				                        </view>
				                    </view>
				                </view>
				
				
				            </view>
				        </view>
				    </view>
				</view>
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
			<u-button type="success" :custom-style="buttonStyle" @click="submit">提交</u-button>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		</view>
	</view>
</template>

<script>
	import tColorPicke from '@/components/t-color-picker.vue';
	import lFile from '@/components/l-file/l-file.vue'
	var _self;
	var sourceType = [
	        ['camera'],
	        ['album'],
	        ['camera', 'album']
	    ]
	export default {
		components: {
			't-color-picker': tColorPicke,
			lFile,
		},
		data() {
			return {
				localPath: '',
                imageList:[],//图片
                src:"",//视频存放
                sourceTypeIndex: 2,
                checkedValue:true,
                checkedIndex:0,
                sourceType: ['拍摄', '相册', '拍摄或相册'],
                cameraList: [{
                        value: 'back',
                        name: '后置摄像头',
                        checked: 'true'
                    },
                    {
                        value: 'front',
                        name: '前置摄像头'
                    },
                ],
                cameraIndex: 0,
                VideoOfImagesShow:true,
				submissionState: false,
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
					cost: '', //价格
					photo: '', //图片
					intro: '', //商品简介
				},
				//----------------uview样式--------------------------
				customStyle: {
					fontWeight: 'bold',
					fontSize: '17px',
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
							message: '请输入政策标题',
							trigger: 'blur',
						},
						{
							min: 1,
							message: '请输入政策标题',
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
					intro: [{
							required: true,
							message: '请填写简介'
						},
						{
							min: 5,
							message: '简介不能少于5个字',
							trigger: 'change',
						},
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
							//loginType=1,泉运登录界面
							//loginType=2,今点通登录界面
							//loginType=3,武夷股份登录界面
							url: '/pages/GRZX/userLogin?loginType=4'
						})
					}, 500);
				}
			});
			_self = this;
		},
		methods: {
			//---------------上传视频--------------
			chooseVideo(){
                // 上传视频
                console.log('上传视频')
                uni.chooseVideo({
                    maxDuration:10,	
                    count: 1,
                    camera: this.cameraList[this.cameraIndex].value,
                    sourceType: sourceType[this.sourceTypeIndex],
                    success: (res) => {
                        console.log(JSON.stringify(res.tempFilePath),'视频')
                        this.src = res.tempFilePath;
                        console.log(this.src)
                    }
                })
            },
			//-----------------------------------
			delectVideo(){
			    uni.showModal({
			        title:"提示",
			        content:"是否要删除此视频",
			        success:(res) =>{
			            if(res.confirm){
			                this.src = ''
			            }
			        }
			    })
			},
			//--------------------------------------------------
				onOpenDoc() {
					let url = 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg';
					/* 下载返回临时路径（退出应用失效） */
					this.$refs.lFile.download(url)
					.then(path=>{
						/* 预览 */
						this.$refs.lFile.open(path);
					});
				},
				
				/* 保存 */
				onDown() {
					let url = 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg';
					this.$refs.lFile.download(url,'local')
					.then(path=>{
						this.localPath = path;
					}); 
				},
				
				/* 上传 */
				onUpload() {
					this.$refs.lFile.upload({
						// #ifdef APP-PLUS
						// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
						currentWebview: this.$mp.page.$getAppWebview(),
						// #endif
						//非真实地址，记得更换,调试时ios有跨域，需要后端开启跨域并且接口地址不要使用http://localhost/
						url: 'https://www.example.com/upload',
						//默认file,上传文件的key
						name: 'myFile',
						// header: {'Authorization':'token'},
						//...其他参数
					});
				},
				onSuccess(res) {
					console.log('上传成功回调',JSON.stringify(res));
					uni.showToast({
						title: JSON.stringify(res),
						icon: 'none'
					})
				},

			submitState: function() {
				var that = this;

				if (this.submissionState == false) {
					this.submissionState = true;
					this.submit();
				} else if (this.submissionState == true) {
					uni.showToast({
						title: '请勿重复点击提交',
						icon: 'none',
						duration: 2000
					})
				}
			},

			submit: function() {
				uni.showLoading({
					title: '提交数据中...'
				});
				var that = this;
				console.log(that.issueimage);
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)
						uni.request({
							url: 'http://218.67.107.93:9210/api/app/publish-strategy',
							method: 'POST',
							data: {
								title: that.title,
								content: that.issueText,
								imgUrl: that.issueimage,
								publisher: res.data.username,
								publisherTel: res.data.phoneNumber,
								colleagueNum: that.people_number,
								cost: that.people_cost,
								startPlayTime: that.range[0],
								endPlayTime: that.range[1],
							},
							success: (res) => {
								console.log(res)
								if (res.data.msg == '发布攻略成功，待后台审核！') {
									uni.hideLoading()
									uni.showToast({
										title: '提交成功',
										success() {
											uni.navigateBack({
												url: './pictureList'
											})
										}
									})
								} else if (res.data.msg == '提交失败2分钟内请勿重复发表照片') {
									uni.hideLoading()
									uni.showToast({
										title: '每次提交请间隔两分钟',
										icon: 'none'
									})
								} else {
									uni.hideLoading()
									uni.showToast({
										title: '提交失败',
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

			//------------------富文本--------------

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
				var that = this;
				// this.hideKey();
				let {
					name,
					value
				} = e.target.dataset;
				console.log(name);
				console.log(value);
				console.log(e.target.dataset);
				if (!name) return; // console.log('format', name, value)
				that.editorCtx.format(name, value);
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
						console.log(res);
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
	
.uni-uploader__file,.uploader_video{
    position: relative;
    z-index: 1;
    width: 200upx;
    height: 200upx;
}
.video{
    width: 100%;
    height: 100%;
}
.icon-cuo {
	    position: absolute;
	    right: 0;
	    top: 5upx;
	    background: linear-gradient(90deg,rgba(251,91,80,1) 0%,rgba(240,45,51,1) 100%);
	    color: #FFFFFF;
	    z-index: 999;
	    border-top-right-radius: 20upx;
	    border-bottom-left-radius: 20upx;
	}
	
</style>
