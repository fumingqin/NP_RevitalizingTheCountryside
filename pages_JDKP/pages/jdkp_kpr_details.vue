<template>
	<view>
		<view style="padding: 32upx 0;">
			<uni-steps :options="stepsList" :active="StepsIndex" :hidden="stepsData.state == '已取消'"></uni-steps>
			<uni-steps :options="stepsList2" :active="StepsIndex" v-if="stepsData.state == '已取消'" activeColor="#FA3534"></uni-steps>
		</view>

		<view style="font-size: 24upx; margin: 8upx 32upx; color: #DD524D;">*如若顶部进度条未变绿/红色 或 打不开评分栏，请下拉刷新</view>
		<!-- 申请信息 -->
		<view class="deta_view">
			<view class="deta_title">考评信息</view>
			<view class="deta_text"><text>考评标题：</text>{{stepsData.title}}</view>
			<view class="deta_text"><text>考评乡村：</text>{{stepsData.rural_name}}</view>
			<view class="deta_text"><text>考评截至：</text>{{informationDate(stepsData.reviewTime)}}</view>
		</view>


		<!-- 发布人信息 -->
		<view class="deta_view">
			<view class="deta_title">发布人信息</view>
			<view class="deta_text"><text>发布人：</text>{{stepsData.nick_name}}</view>
			<view class="deta_text"><text>发布时间：</text>{{informationDate(stepsData.update_time)}}</view>
			<view class="deta_text"><text>发布人电话：</text>{{stepsData.phoneNumber}}</view>
		</view>

		<!-- <view class="deta_view">
			<view class="deta_title">问题信息</view>
			<view class="deta_text"><text>问题类型：</text>{{stepsData.apply_type}}</view>
			<view class="deta_text">
				<text>相关图片：</text><text v-if="stepsData.image == null">未上传</text>
				<view class="imageView">
					<image class="imageS" v-if="stepsData.image !== null" v-for="(item,index) in stepsData.image" :key="index" :src="item"
					 mode="aspectFill" @click="previewOpen(index)"></image>
				</view>
			</view>
			<view class="deta_text"><text>问题内容：</text>{{stepsData.content}}</view>
		</view> -->
		<view class="deta_view">
			<view class="deta_title">考评指标</view>
			<view class="deta_text">
				<view class="allBtn" @click="open()">查看指标详情</view>
			</view>
		</view>
		<!-- 执行结果 -->
		<view class="deta_view" v-if="StepsIndex == 2">
			<view class="deta_title">考评结果</view>
			<view class="deta_text"><text>分数：</text>{{stepsData.score}}分</view>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="boxVlew">
				<view class="titleView">
					<text class="Nb_text1">指标详情</text>
					<text class="Nb_text2 jdticon icon-fork " @click="close()"></text>
				</view>
				<scroll-view class="noticeBox" scroll-y="ture">
					<view v-for="(item,index) in stepsData.item" :key="index">
						<view class="teskName">{{index+1}}.{{item.itemTitle}}</view>
						<view class="teskView">
							<view class="teskScore">满分:{{item.itemscore}}分</view>
							<view v-if="stepsData.state=='已完成'">
								<view class="teskGrade">评分:{{item.score}}分</view>
							</view>
							<view v-if="stepsData.state!='已完成'">
								<view class="teskGrade">评分:暂无评分</view>
							</view>
							<view>
								<image :src="imageDate(item.image)" class="teskimage" @click="goImgList(imageDate(item.image))"></image>
								<!-- <image v-if="item.image == '[]'" src="../static/tupian.png" mode="aspectFill"></image> -->
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>

		<!-- 功能按钮 -->
		<view class="operButton" v-if="stepsData.state == '已发布'">
			<view class="buttonView1 " hover-class="btn_Click" @click="TelephoneClick">联系发布人</view>
			<view class="buttonView2 " hover-class="btn_Click" @click="cancelShowClick">提交评分</view>
		</view>

		<!-- 功能按钮 -->
		<view class="operButton" v-if="stepsData.state !== '已发布'">
			<view class="buttonView3" style="width: 100%;" hover-class="btn_Click" @click="TelephoneClick">联系发布人</view>
		</view>

		<!-- 提交弹框 -->
		<u-popup v-model="cancelShow" mode="bottom" :closeable="true" height="90%">
			<view class="box_Vlew">
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">请为本次考评打分</text>
						<view style="color: #FC4646; font-size:28upx; margin-top: 12upx;">注：随手保存是美德</view>
						<!-- <text ></text> -->
					</view>
				</view>

				<view style="display: block;padding-top: 30upx;padding-bottom: 30upx;border-bottom: 1upx solid #f4f5f6;" v-for="(item,index) in stepsData.item"
				 :key="index">
					<view style="display: block;width: 100%;">
						<view style="width: 100%;font-size: 32upx;font-weight: bold;">{{numberData(index)}}.{{item.itemTitle}}</view>
					</view>

					<view style="display: flex;padding-top: 30upx;">
						<!-- <view style="display: block;width: 30%;">
							<view style="margin-bottom: 20upx;">最高评分</view>
							<view style="margin-bottom: 20upx;color: #FC4646;">3分</view>
						</view> -->

						<view style="display: block;width: 50%;">
							<view style="margin-bottom: 40upx;">最高评分<text style="color: #FC4646;">(最高评分{{item.itemscore}}分)</text></view>
							<u-input type="number" v-model="dataList[index].score" :border="border" @click="inputSubscript(index,item.itemscore)"
							 @input="inputData" />
						</view>

						<view style="display: block;margin-left: 40upx;">
							<!-- <u-upload :action="action" :file-list="fileList"></u-upload> -->
							<view style="display: flex;">
								<view style="margin-bottom: 22upx;">上传图片</view>
								<view style="margin-bottom: 22upx; margin-left: 30upx; color: #E3424B;" @click="remove(0,index)" v-if="dataList[index].image !== ''">删除图片</view>
							</view>

							<view style="display: flex;" @click="uploadSubscript(index)">
								<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action" max-count="1"
								 width="100" height="100" @on-success="uploadOnsuccess" @on-remove="remove(1,index)">
									<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
										<u-icon name="photo" size="40" color="#c0c4cc"></u-icon>
									</view>
								</u-upload>
								<image style="width: 100upx; height: 100upx; margin-left: 32upx; padding-top: 8upx;" :src="dataParse(dataList[index].image)"
								 mode="aspectFill" v-if="dataList[index].image != ''" @click="goImgList(dataList[index].image)"></image>
							</view>
						</view>
					</view>
				</view>

				<view style="margin-top: 60upx;"></view>

			</view>

			<!-- 确认按钮 -->
			<view class="operButton" style="z-index: 3;">
				<view class="buttonView3 buttonView4" style="width: 65%;" hover-class="btn_Click" @click="keepData(1)">手动保存</view>
				<view class="buttonView3" style="width: 35%;" hover-class="btn_Click" @click="Submit">提交</view>
			</view>
		</u-popup>

		<!-- <previewImage ref="previewImage" :opacity="0.8"  :imgs="stepsData.image" ></previewImage> -->
	</view>
</template>

<script>
	import uniSteps from '../components/uni-steps/uni-steps.vue'; //引入时间轴
	import previewImage from '../components/kxj-previewImage/kxj-previewImage.vue'; //图片预览
	import uniPopup from "@/pages_JDKP/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniSteps, //声明时间轴组件
			previewImage, //声明图片预览组件
			uniPopup
		},
		data() {
			return {
				stepsList: [{
					title: '待考评'
				}, {
					title: '考评中'
				}, {
					title: '已考评'
				}], //时间轴的标题数组
				stepsList2: [{
					title: '待考评'
				}, {
					title: '考评中'
				}, {
					title: '已取消'
				}], //时间轴的标题数组
				StepsIndex: -1, //绿条时间轴的下标数值		
				stepsData: '', //存放任务数据
				border: true,
				id: '', //任务id
				cancelShow: false, //提交弹框默认值
				contentInputData: '', //输入框内容
				contentList: ['100', '90', '80', '70', '60', '50', '40', '30', '20', '10', '0'], //可选失败内容
				fileList: [],
				goodsType: '', //输入框参数
				uploadList: '', //上传图片数组
				inpuIndex: '', //输入框下标
				scoreIndex: '', //最高分
				uploadIndex: 0, //上传图片下标
				showUploadList: true, //是否选择图片内部组件预览
				action: 'http://8.135.49.179:8080/api/file/upload', // 演示地址
				dataList: [],
				ModalStatus: false, //删除模态框状态
			}
		},

		onLoad: function(e) {
			this.id = e.id;
			this.userData();
		},
		onShow: function() {
		},
		onPullDownRefresh: function() {
			this.loadData();
		},
		onHide: function() {
			// this.keepData()
		},
		onBackPress: function() {
			this.keepData()
		},

		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData: function() {
				uni.showLoading({
					title: '加载信息中...',
					// mask: true,
				})
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						this.loadData()
						// console.log('获取个人信息', this.userInfo)
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

			//加载列表数据
			loadData: function(e) {
				uni.request({
					url: this.$jdkp.KyInterface.getEvaluationById.Url,
					method: this.$jdkp.KyInterface.getEvaluationById.method,
					data: {
						id: this.id
					},
					success: (res) => {
						console.log(res)
						// console.log(this.stepsData.item)
						this.stepsData = res.data.data;
						if (this.stepsData.state == '已发布') {
							this.StepsIndex = 1
						} else if (this.stepsData.state == '已完成' || this.stepsData.state == '已取消') {
							this.StepsIndex = 2
						}
						if (this.stepsData.state == '已发布') {
							this.IndexData(); //加载指标
						} else {
							this.dataList = this.stepsData.item;
							uni.hideLoading()
							uni.stopPullDownRefresh()
						}
					},
					fail: (err) => {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						uni.showToast({
							title: '网络异常，下拉刷新试试',
							icon: 'none'
						})
					}
				})
			},

			//加载指标
			IndexData: function() {
				uni.getStorage({
					key: 'dataList' + this.id,
					success: (Storage) => {
						console.log(Storage)
						this.dataList = [];
						uni.hideLoading()
						uni.stopPullDownRefresh()
						if (Storage.data.data.length == this.stepsData.item_count && this.stepsData.groupTitle ==
							'2020年度省级乡村振兴试点村“一村一档”情况考评') {
							this.dataList = Storage.data.data;
							this.keepData();
						} else if (Storage.data.data.length == this.stepsData.item_count && this.stepsData.groupTitle ==
							'2020年度乡村振兴“一带N点”示范带建设情况考评') {
							this.dataList = Storage.data.data;
							this.keepData();
						} else if (this.stepsData.groupTitle == '2020年度省级乡村振兴试点村“一村一档”情况考评') {
							for (let i = 0; i < this.stepsData.item_count; i++) {
								this.dataList.push(Storage.data.data[i])
							}
							this.keepData();
						} else if (this.stepsData.groupTitle == '2020年度乡村振兴“一带N点”示范带建设情况考评') {
							for (let i = 0; i < this.stepsData.item_count; i++) {
								this.dataList.push(Storage.data.data[i])
							}
							this.keepData();
						}

					},
					fail: () => {
						uni.request({
							url: this.$jdkp.KyInterface.getData.Url,
							method: this.$jdkp.KyInterface.getData.method,
							data: {
								id: this.id	
							},
							success: (keepRes) => {
								console.log('指标回调', keepRes)
								this.dataList = [];
								if (keepRes.data.status == true && keepRes.data.data !== "[]") {
									var keepRes2 = keepRes.data.data.sort((a,b)=>{
										return a.itemId - b.itemId
									})
									for (let i = 0; i < this.stepsData.item_count; i++) {
										var a = {
											itemId: keepRes2[i].itemId,
											itemTitle: keepRes2[i].itemTitle,
											score: keepRes2[i].score,
											image: '',
										}
										if(keepRes2[i].image !== ''){
											a.image = JSON.parse(keepRes2[i].image) 
										}
										this.dataList.push(a)
									}
									uni.hideLoading()
									uni.stopPullDownRefresh()
								} else {
									for (let i = 0; i < this.stepsData.item.length; i++) {
										var a = {
											itemId: this.stepsData.item[i].itemId,
											itemTitle: this.stepsData.item[i].itemTitle,
											score: '',
											image: '',
										}
										this.dataList.push(a)
									}
									uni.hideLoading()
									uni.stopPullDownRefresh()
								}
							},
							fail: () => {
								uni.hideLoading()
								uni.stopPullDownRefresh()
								uni.showToast({
									title: '获取保存数据失败，网络异常',
									icon: 'none'
								})
							}
						})
					}
				})
			},

			//打开popup下弹框
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},


			//拨打申请人电话
			TelephoneClick: function() {
				if (this.stepsData.phoneNumber == '') {
					uni.showToast({
						title: '相关发布人电话错误，请联系客服处理',
						icon: 'none'
					})
				} else {
					uni.makePhoneCall({
						phoneNumber: this.stepsData.phoneNumber
					})
				}

			},

			//打开评分弹框
			cancelShowClick: function() {
				this.cancelShow = true;
			},

			//点击放大图片
			previewOpen: function(e) {
				// console.log(e);
				this.$refs.previewImage.open(e); // 传入当前选中的图片地址或序号
			},

			//点击插入文字
			choiseListData: function(e) {
				var a = this.contentList[e];
				var b = this.contentInputData;
				var c = b.concat(a)
				this.contentInputData = c;
			},

			//编号
			numberData: function(e) {
				var a = e + 1;
				return a
			},

			//输入框下标
			inputSubscript: function(e, res) {
				// console.log('输入框下标',e)
				this.inpuIndex = e
				this.scoreIndex = res
				// console.log('输入框下标', this.inpuIndex)
			},

			//输入框参数值
			inputData: function(e) {
				// console.log('输入框参数',e)
				this.goodsType = e;
				if (this.goodsType <= this.scoreIndex && this.goodsType >= 0) {
					this.dataList[this.inpuIndex].score = this.goodsType
					console.log(this.dataList[this.inpuIndex].score)
				} else {
					this.dataList[this.inpuIndex].score = 0;
					if (this.goodsType !== '') {
						this.dataList[this.inpuIndex].score = 0 ;
						uni.showToast({
							title: '分数不能大于' + this.stepsData.item[this.inpuIndex].itemscore,
							icon: 'none'
						})
					}
				}
			},

			//上传图片下标
			uploadSubscript: function(e) {
				console.log('上传图片下标', e)
				this.uploadIndex = e;
				// console.log('上传图片下标', this.uploadIndex)
			},

			//上传图片成功
			uploadOnsuccess: function(e) {
				var that = this;
				that.uploadList = [];
				that.uploadList.push(e.data)
				that.dataList[that.uploadIndex].image = that.uploadList
				// console.log('3',that.dataList[that.uploadIndex].image)
			},

			//删除图片
			remove: function(e, index) {
				if (e == 0) {
					uni.showModal({
						content: '您确认删除该已保存的图片吗？',
						success: (res) => {
							if (res.confirm) {
								this.dataList[index].image = ''
								this.$refs.clear.fileList;
							}
						}
					})
				} else if (e == 1) {
					this.dataList[index].image = ''
				}


			},


			//提交校验
			Submit: function() {
				var that = this;
				uni.showLoading({
					title: '提交中...',
					mask: true,
				})
				if(that.dataList.length == that.stepsData.item_count){
					that.reallySubmit()
				}else{
					var SubmitList = that.dataList;
					that.dataList = []
					for (let i = 0; i < that.stepsData.item_count; i++) {
						that.dataList.push(SubmitList[index])
					}
					if(that.dataList.length == that.stepsData.item_count){
						that.reallySubmit()
					}
				}
				
				
			},
			
			//待校验后提交
			reallySubmit:function(){
				let res = this.dataList.every(item => 0 <= item.score)
				let res2 = this.dataList.every(item =>  item.score <= 3)
				if (res) {
					if(res2){
						uni.showModal({
							title:'您确认提交吗？',
							content:'一旦提交考评信息，将无法进行修改',
							success: (res) => {
								if(res.confirm){
										var keepList = [];
										for (let i = 0; i < this.stepsData.item_count; i++) {
											var keepA = {
												itemId: this.dataList[i].itemId,
												itemTitle: this.dataList[i].itemTitle,
												score: this.dataList[i].score,
												image: '',
											}
											if(this.dataList[i].image !== ''){
												keepA.image = JSON.stringify(this.dataList[i].image) 
											}
											keepList.push(keepA)
										}
										uni.request({
											url: this.$jdkp.KyInterface.evaluationScore.Url,
											method: this.$jdkp.KyInterface.evaluationScore.method,
											data: {
												id: this.id,
												item: keepList
											},
											success: (res) => {
												// console.log(res)
												if (res.data.status) {
													uni.hideLoading()
													uni.showToast({
														title: '提交成功',
														success: () => {
															this.cancelShow = false;
															uni.startPullDownRefresh();
														}
													})
													uni.removeStorage({
														key: 'dataList' + this.id
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
												uni.stopPullDownRefresh()
												uni.showToast({
													title: '提交数据失败，下拉刷新试试',
													icon: 'none'
												})
											}
										})
								}
							}
						})
					}else{
						uni.hideLoading()
						uni.showToast({
							title: '您有一项/多项大于最高评分值',
							icon: 'none'
						})
					}
					
				
				} else {
					uni.hideLoading()
					uni.showToast({
						title: '您有评分未填入',
						icon: 'none'
					})
				}
			},
			

			//资讯时间
			informationDate: function(e) {
				// console.log(e)
				// var tsetDate = e.replace('T',' ')
				if (e !== undefined) {
					var a = e.substr(0, 10)
					return a;
				} else {
					return '';
				}
			},
			imageDate: function(e) {
				if (e == "") {
					return "暂无"
				} else {
					var a = JSON.parse(e);
					return a[0];
				}
			},

			//图片转换
			dataParse: function(e) {
				// console.log(e)
				if (e == '') {
					return e
				} else {
					// var a = JSON.parse(e)
					return e[0]
				}
			},


			//保存数据
			keepData: function(e) {
				if(e == 1){
					uni.showLoading({
						title:'保存中...',
						mask: true,
					})
				}
				console.log('触发保存')
				if (this.stepsData.state == '已发布') {
					// console.log('上传前数组',this.dataList)
					var keepList = [];
					for (let i = 0; i < this.stepsData.item_count; i++) {
						var keepA = {
							itemId: this.dataList[i].itemId,
							itemTitle: this.dataList[i].itemTitle,
							score: this.dataList[i].score,
							image: '',
						}
						if(this.dataList[i].image !== ''){
							keepA.image = JSON.stringify(this.dataList[i].image) 
						}
						keepList.push(keepA)
						if(i == (this.stepsData.item_count - 1)){
							// console.log('执行提交',keepList)
							this.keepDataSumbit(keepList,e)
						}
					}
					
				}
			},
			
			//提交保存
			keepDataSumbit:function(item,e){
				console.log('准备提交保存', item)
				uni.request({
					url: this.$jdkp.KyInterface.saveData.Url,
					method: this.$jdkp.KyInterface.saveData.method,
					data: {
						id: this.id,
						content: item
					},
					success: (res) => {
						console.log('保存成功', res)
						if(res.data.status){
							uni.removeStorage({
								key: 'dataList' + this.id
							})
							if(e == 1){
								uni.hideLoading()
								uni.stopPullDownRefresh()
								uni.showToast({
									title:'保存成功'
								})
							}
						}else {
							if(e == 1){
								uni.hideLoading()
								uni.stopPullDownRefresh()
								uni.showToast({
									title:'保存失败，10秒后重试',
									icon:'none'
								})
							} 
						}
					},
					fail: () => {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						uni.showToast({
							title: '自动保存失败，网络异常',
							icon: 'none'
						})
					}
				})
			},

			//保存图片至本地并打开新页面
			goImgList(e) {
				uni.setStorageSync('imagePiclist', e);
				uni.navigateTo({
					url: 'imgPreview4',
				})
			},

		}
	}
</script>

<style lang="scss">
	//按钮样式
	.operButton {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 96upx;
		text-align: center;

		.buttonView1 {
			width: 35%;
			background: #F5F5F5;
			color: #333333;
			font-size: 26upx;
			line-height: 3.5;
		}

		.buttonView2 {
			width: 65%;
			background: #18B566;
			color: #FFFFFF;
			font-size: 32upx;
			line-height: 3;
		}

		.buttonView3 {
			width: 100%;
			background: #18B566;
			color: #FFFFFF;
			font-size: 32upx;
			line-height: 3;
		}
		
		.buttonView4 {
			background: #FF6600;
		}
	}

	//图片样式
	.imageView {
		display: flex;
		margin-top: 20upx;

		.imageS {
			display: block;
			width: 212upx;
			height: 212upx;
			margin-right: 20upx;
		}
	}

	//主体文字样式
	.deta_view {
		padding: 0upx 32upx;

		.deta_title {
			margin: 8upx 0;
			font-weight: bold;
			font-size: 34upx;
			margin-top: 24upx;
		}

		.deta_text {
			font-size: 30upx;
			padding: 20upx 16upx;
		}
	}

	//提交弹框
	.box_Vlew {
		padding: 16upx 40upx;
		padding-bottom: 24upx;
		background: #FFFFFF;

		//标题样式
		.box_refundView {
			margin: 24upx 0upx;

			//确认
			.box_refundContentView {
				margin-top: 64upx;
				text-align: center;

				.box_refundContentTitle {
					font-size: 36upx;
					font-weight: bold;
				}
			}
		}

		//滑动区域
		.box_scrollView {
			margin: 40upx 0;
			white-space: nowrap;

			.scrollView_text {
				margin-left: 24upx;
				padding: 16upx 32upx;
				font-size: 28upx;
				color: #AAAAAA;
				border: 1upx solid #AAAAAA;
				border-radius: 8upx;
			}
		}

		//输入区域
		.box_inputView {
			width: 100%;
			background: #EEEEEE;
			border-radius: 60upx;

			.inputStyle {
				// height: 96upx; 
				padding: 26upx 44upx 26upx 44upx;
				font-size: 30upx;
			}
		}

		//确认按钮
		.box_refundButtonView {
			text-align: center;
			margin: 56upx 0;
			margin-top: 72upx;

			//确认按钮
			.box_refundButton {
				font-size: 34upx;
				color: #FFFFFF;
				border-radius: 56upx;
				background: #FF6600;
				padding: 24upx 160upx;
			}
		}
	}

	//自定义上传按钮
	.slot-btn {
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f4f5f6;
		border-radius: 10rpx;
		// margin: 10upx;
	}

	//自定义上传按钮颜色
	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}

	.allBtn {
		padding-top: 12upx;
		font-size: 30upx;
		background-color: #fff;
		color: #06B4FD;
	}

	.boxVlew {
		width: 100%;
		padding: 16upx 40upx;
		// padding-bottom: 92upx;
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

			.teskName {
				width: 660upx;
				padding: 8upx 0upx;
				// text-align: center;
				font-size: 32upx;
				font-weight: bold;
			}

			.teskView {
				position: relative;
				display: flex;

				.teskimage {
					width: 100upx;
					height: 100upx;
				}

				.teskScore {
					position: absolute;
					left: 0;
					margin-left: 160upx;
					margin-top: 20upx;
					font-size: 26upx;
					color: #888;
				}

				.teskGrade {
					position: absolute;
					left: 0;
					margin-left: 160upx;
					margin-top: 70upx;
					font-size: 26upx;
					color: #ff0000;
				}
			}

		}
	}
</style>
