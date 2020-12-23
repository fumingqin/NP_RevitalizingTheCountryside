<template>
	<view class="Cr_background">
		<form @submit="formSubmit" >
			<!-- #ifdef H5 --> <!--公众号 头像，背景图 --> 
			<image v-if="backImg!=''" class="bg" :src="backImg||'/static/GRZX/backImg.png'" mode="aspectFill" name="backImg"></image>
			<view v-if="backImg==''" class="bg bc_GRZX" name="backImg"></view>
			<image class="tx" :src="portrait||'/static/GRZX/missing-face.png'" name="portrait"></image>
			<!-- #endif -->
			
			<!-- #ifndef H5 -->  <!--除了公众号 头像，背景图 --> 
			<image v-if="backImg!=''" class="bg" :src="backImg||'/static/GRZX/backImg.png'" mode="aspectFill" name="backImg"></image>
			<view v-if="backImg==''" class="bg bc_GRZX" name="backImg"></view>
			
			<image class="tx" :src="portrait||'/static/GRZX/missing-face.png'" name="portrait" @click="getPhoto"></image>
			<button class="xgbg"  plain="" @click="reviseBackground">修改背景</button>
			<!-- #endif -->
			
			
			<!-- 姓名 -->
			<view class="boxClass">
				<text class="bz">姓&nbsp;名：</text>
				<input class="slk" maxlength="15"  name="userName"  placeholder="请输入" v-model="userName" />
			</view>
			
			<!-- 职位 -->
			<view class="boxClass">
				<text class="bz">职&nbsp;位：</text>
				<input class="slk" name="duty" placeholder="你想要说的话"  v-model="duty" disabled='true'/>
			</view>
			
			<!-- 性别 -->
			<view class="boxClass">
				<text class="bz">性&nbsp;别：</text>
				<picker class="slk1" name="gender"  mode="selector" @change="genderChange" :range="genderSex" :value="gender">
					{{selector}}
				</picker>
			</view>
			
			
			
			<!-- 保存按钮 -->
			<button class="an btn_background btn_fontColor" form-type="submit">保存</button>
		</form>
	</view>
	 
</template>
<script>
	import { pathToBase64, base64ToPath } from '@/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	import wPicker from "@/pages_GRZX/components/GRZX/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				mode:"region",
				genderSex:['男','女'], 
				selector:'请选择',
				/* 载入数据 */
				portrait : '',
				backImg:'',
				userName : '',
				gender:0,
				userId:'',
				phoneNumber:'',
				port:'',
				port1:'',
				duty:'',
			};
		},
		components:{
		            wPicker
		        },
		onLoad:function(){
			this.loadUserInfo();
		},
		computed:{
			startDate() {
			    return this.getDate('start');
			}, 
			endDate() {
			    return this.getDate('end');
			},
		},
		methods:{
			// --------------------------------------1.加载用户信息------------------------------------
			loadUserInfo(){
				uni.showLoading({
					title:'加载中...'
				})
				var that=this;
				uni.getStorage({
					key:'backUrl', //加载背景图
					success:function(res1){
						that.backImg=res1.data;
					}
				})
				uni.getStorage({
					key:'userInfo',
					success(res){
						let data = res.data;
						that.userId = data.userId;
						// ------------1.头像-------------
						if (data.portrait == "" || data.portrait == null) {
							that.port = "";
							that.port1 = "";
							that.portrait= "";
						} else {
							that.port = data.portrait;
							that.port1 = data.portrait;
							that.portrait =  data.portrait;
							// that.port="http://120.24.144.6:888/prod-api" + data.portrait;
							// that.port1 = data.portrait;
							// that.portrait = "http://120.24.144.6:888/prod-api" + data.portrait;
						}
						// ------------2.昵称-------------
						that.userName =data.userName;
						// ------------3.性别-------------
						that.gender=parseInt(data.sex);
						that.selector=that.genderSex[that.gender];
						// ------------4.职位-------------
						if(data.duty==null||data.duty==""){
							that.duty="暂无";
						}else{
							that.duty =data.duty;
						}
						uni.hideLoading();
					}
				})	
			},
			
			// --------------------------------------2.性别------------------------------------
			genderChange : function(e){
				this.selector =this.genderSex[e.detail.value]; 
				this.gender=e.detail.value;
			},
			
			// --------------------------------------3.日期------------------------------------
			dateChange : function(e){
				this.birthday = e.detail.value;
			},
			
			// --------------------------------------4.获得日期------------------------------------
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 0;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			
			// --------------------------------------5.地址切换------------------------------------
			toggleTab(e){
				this.$refs[this.mode].show(); 
			},
			onConfirm(e){
				this.address=e.result;
			},
			
			// --------------------------------------6.更换背景图------------------------------------
			reviseBackground(){
				var that=this;
				uni.chooseImage({
					count:1,
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
							tempFilePath: tempFilePaths[0],
							success: function (res1) {
								var savedFilePath = res1.savedFilePath;
								uni.setStorage({
									key:'backUrl',
									data:savedFilePath
								})
								uni.getStorage({
									key:'backUrl',
									success:function(res){
										that.backImg=res.data;
									}
								})
							}
						});
					}
				})
			},
			 
			// --------------------------------------7.提交数据------------------------------------
			formSubmit: function(e) {
				uni.showLoading({
					title:'保存中...'
				})
				if(this.userName==""){
					uni.showToast({
						title:'请输入姓名',
						icon:'none'
					})
				}else if(this.selector=='请选择'){
					uni.showToast({
						title:'请选择性别',
						icon:'none'
					})
				}else{
					//if(this.port.indexOf("http://120.24.144.6:888") != -1 || this.port == ""){
					if(this.port.indexOf("http://8.135.49.179:888") != -1 || this.port == ""){
						this.changeInfo(this.port1);
					}else{
						console.log(this.port,"111");
						uni.uploadFile({
							url: this.$GrzxInter.Interface.avatar.value, 
							filePath: this.port,
							name: 'file',
							success: (res) => {
								console.log(res,"上传头像");
								let data = JSON.parse(res.data);
								if(data.code == 200){
									this.changeInfo(data.msg);
								}else{
									uni.showToast({
										title: '上传失败',
										icon:'none'
									});
								}
							},
							fail:(err)=>{
								console.log(err);
								uni.showToast({
									title: '网络错误',
									icon:'none'
								});
							}
						});
					}
				}
			},
			
			// --------------------------------------8.修改用户信息------------------------------------
			changeInfo(e){
				console.log("id",this.userId);
				console.log("性别",this.gender);
				console.log("头像",e);
				console.log("姓名",this.userName);
				uni.request({
					url:this.$GrzxInter.Interface.changUserInfo.value,
					data:{
						userId:this.userId,
						sex:this.gender,
						portrait: e,
						userName:this.userName,
					},
					method:this.$GrzxInter.Interface.changUserInfo.method,
					success:(res)=> {
						console.log(res,"286")
						if(res.data.status){
							uni.showToast({
								title: '修改成功',
							});
							setTimeout(function(){
								uni.navigateBack();
							},800)
						}else{
							uni.showToast({
								title: res.data.msg,
								icon:'none',
							});
						}
					},
					fail() {
						uni.showToast({
							title:'网络连接失败',
							icon:'none'
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},
			
			// --------------------------------------9.获得头像------------------------------------
			getPhoto(){
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						var tempFilePaths = res.tempFilePaths;;
						uni.saveFile({
							tempFilePath: tempFilePaths[0],
							success: function (res1) {
								that.portrait=res1.savedFilePath;
								that.port = res1.savedFilePath;
							}
						}); 
					}
				})	
			},
			
			// --------------------------------------9.判断是否为base64格式------------------------------------
			isBase64:function(str) {
			    if (str ==='' || str.trim() ===''){ return false; }
			    try {
			        return btoa(atob(str)) == str;
			    } catch (err) {
			        return false;
			    }
			},
	}
}
</script>
<style lang="scss">	
	.Cr_background{
		widows: 100%;
		height: 100%;
		.bg{
			width: 100%;
			height: 500upx;
			filter: blur(0.5px);
			// opacity: .7;
		}
		.tx{
			position: absolute;
			width: 200upx;
			height: 200upx; 
			left: 250upx;
			top: 52upx;
			border-radius: 50%;
			margin: 20upx;
		}
		.xgbg{
			position: absolute;
			width:220upx;
			font-size:32upx;
			left: 242upx;
			top: 294upx;
			margin: 20upx;
			border-radius: 40upx;
			line-height: 74upx;
			border-color: #FFFFFF;
			color: #FFFFFF;
		}
		.Cr_slk1{
			margin-top: -20upx;
		}
		.Cr_slk2{
			margin-top: -8upx;
		}
		.bz{
			position: relative;
			left: 36upx;
			top: 74upx;
			color: #AAAAAA;
		}
		.slk{
			position: relative;
			width: 90%;
			height: 104upx;
			left: 36upx;
			text-align: right;
			// border-bottom:#F5F5F5 1px solid;
			border-left-width:0px;
			border-right-width:0px;
			border-top-width:0px;
		}
		.slk1{
			position: relative;
			width: 90%;
			height: 72upx;
			left: 36upx;
			text-align: right;
			padding-top: 24upx;
			padding-bottom: 4upx;
			// border-bottom:#F5F5F5 1px solid;
			border-left-width:0px;
			border-right-width:0px;
			border-top-width:0px;
		}
		.an{
			width: 90%;
			height: 95upx;
			line-height: 95upx;
			font-size: 36upx;
			margin-top: 48upx; 
			margin-bottom: 48upx;
		}
		.txtClass{
			position: relative;
			top: 25rpx;
		}
	}
	
	.boxClass{
		width: 90%;
		margin-left: 5%;
		border-bottom:2upx solid  #F5F5F5;
	}

</style>