<template>
	<view>
		<view class="content">

				<!-- 商品名称 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="政策标题" :border-bottom="false" prop="name">
					<view class="viewClass" style="padding-right: 20rpx;">
						<u-input :custom-style="tradeNameStyle" :border="false" placeholder="请输入政策标题" v-model="model.name" :type="text"></u-input>
					</view>
				</u-form-item>
				<!-- 文件上传 -->
				<view style="font-size: 34upx;font-weight: bold;margin-top:20upx;">文件上传</view>
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
				<!-- 上传图片 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="上传图片" :border-bottom="false" prop="photo">
					<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action" max-count="1" width="164" height="164" :file-list="fileList" @on-remove="uploadOnRemove" @on-success="uploadOnsuccess">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150" >
							<u-icon name="photo" size="60" color="#c0c4cc"></u-icon>
						</view>
					</u-upload>
				</u-form-item>
			
				<!-- 上传视频 -->
<!-- 				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="上传视频" :border-bottom="false" prop="photo">
					<easy-upload :dataList="imageList" uploadUrl="http://120.24.144.6:8080/api/file/uploadvideo" :types="category"
					 deleteUrl='http://120.24.144.6:8080/api/file/uploadvideo' :uploadCount="1" @successVideo="successvideo"></easy-upload>
				</u-form-item> -->
				<!-- 简介 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="简介" :border-bottom="false">
					<view class="viewClass" style="padding:20rpx 30rpx;">
						<u-input type="textarea" :border="border" placeholder="请填写简介内容" maxlength="30" v-model="model.centent"/>
					</view>
				</u-form-item>
				
				<!-- 商品简介 -->
				<u-form-item :label-style="customStyle" :label-position="labelPosition" label="政策内容" :border-bottom="false" prop="intro">
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
			<u-button type="success" :custom-style="buttonStyle" @click="submitState">提交</u-button>
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
				issueState:true,
				src:'',
				localPath: '',
				filename:'',
				lists: [],
				fileList:[],
				policyId:'',
				issueText: '',
				imageList: [],
				videoData: '',
				category: 'video',
				showUploadList: true,
				border: false,
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
				action: 'http://120.24.144.6:8080/api/file/upload',
				autoHeight: true,
			}
		},
		onLoad(option) {
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
			_self = this;
			console.log(option)
			_self.policyId='';
			if(option.id>0){
				_self.policyId=option.id;
				_self.Update();
			}else{
				_self.localPath='';
				_self.filename='';
				_self.policyId='';
				_self.lists=[];
				_self.fileList=[];
				_self.model.name='';
				_self.model.centent='';
			}
		},
		
		methods: {
			// //---------------上传视频--------------
			// chooseVideo(){
			//     // 上传视频
			//     console.log('上传视频')
			//     uni.chooseVideo({
			//         maxDuration:10,	
			//         count: 1,
			//         camera: this.cameraList[this.cameraIndex].value,
			//         sourceType: sourceType[this.sourceTypeIndex],
			//         success: (res) => {
			// 					const tempFilePaths = res.tempFilePath;
			// 					console.log(tempFilePaths)
			// 					uni.uploadFile({
			// 						url: this.$zcfb.KyInterface.upload.Url,
			// 						filePath: tempFilePaths,
			// 						name: 'file',
			// 						success: (uploadFileRes) => {
			// 							console.log("编辑详情的时候返回照片地址", uploadFileRes)
			// 							const back = JSON.parse(uploadFileRes.data);
			// 							this.src=back.data;
			// 						}
			// 					});  
			//         }
			//     })
			// },
			// //-----------------------------------
			// delectVideo(){
			//     uni.showModal({
			//         title:"提示",
			//         content:"是否要删除此视频",
			//         success:(res) =>{
			//             if(res.confirm){
			//                 this.src = ''
			//             }
			//         }
			//     })
			// },
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
						url: 'http://120.24.144.6:8080/api/file/upload',
						//默认file,上传文件的key
						name: 'file',
						// header: {'Authorization':'token'},
						//...其他参数
					});
				},
				onSuccess(res) {
					var that=this;
					console.log('上传成功回调',JSON.stringify(res));
					that.filename = res.fileName;
					var aaa=JSON.parse(res.data.id);
					that.localPath=aaa.data;
				},	
				//---------------------------上传视频回调-------------------------------
				// successvideo: function(e) {
				// 	var that=this;
				// 	var data = JSON.parse(e.data);
				// 	// console.log(data)
				// 	var  aa= data;
				// 	that.videoData=aa.data;
				// 	console.log('视频上传成功', that.videoData)
				// },
				
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
						that.editorCtx.getContents({
							success: (res) => {
								console.log(res);
								that.issueText = res.html;
								that.submissionState = true;
								if(that.policyId!=''){
									that.updateSubmit(that.issueText);
								}else{
									that.submit(that.issueText);
								}
							}
						});
						
				}else
				if(that.model.name==''){
					uni.showToast({
						title:'请输入政策标题',
						icon:'none'
					})
				}else
				if(that.lists.length==0){
					uni.showToast({
						title:'请上传封面图片',
						icon:'none'
					})
				}else
				if(that.filename==''){
					uni.showToast({
						title:'请上传相关文件',
						icon:'none'
					})
				}else
				if(that.model.centent==''){
					uni.showToast({
						title:'请输入政策简介',
						icon:'none'
					})
				}else
				if(that.$Src.checkSrc('image',that.lists[0])==false){
					uni.showToast({
						title:'图片格式不正确，请修改后从新发布',
						icon:'none'
					})
				}else
				if(that.$Src.checkSrc('pdf',that.localPath)==false){
					uni.showToast({
						title:'文件格式不正确，请修改后从新发布',
						icon:'none'
					})
				}
			},

			submit: function(e) {
				var that = this;
				uni.showLoading({
					title: '提交数据中...'
				});
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)
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
					success: (res) =>  {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: this.$zcfb.KyInterface.upload.Url,
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log("编辑详情的时候返回照片地址", uploadFileRes)
								const back = JSON.parse(uploadFileRes.data);
								console.log(back)
								this.editorCtx.insertImage({
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
				});
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
	
.uni-uploader__file,.uploader_video{
    position: relative;
    z-index: 1;
    width: 300upx;
    height: 300upx;
}
.video{
    width: 90%;
    height: 90%;
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
