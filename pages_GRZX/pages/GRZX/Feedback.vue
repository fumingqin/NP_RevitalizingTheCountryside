<template>
	<view>
		<!-- 上边view -->
		<view class="top-view">
			<!-- 上边类型 -->
			<!-- <view style="display: flex;flex-direction: row;flex-wrap: wrap;">
				<view v-for="(item,index) in typeList" :key="index" @click="change(index)">
					<view class="top-view-Type">
						<view :class="item.checked?'changefontStyle btn_background':'fontStyle'">{{item.text}}</view>
					</view>
				</view>
			</view> -->
			<!-- 文本域 -->
			<view class="top-view-textarea">
				<textarea v-model="ideaContent" placeholder="请描述问题，更快帮您解决问题" maxlength="500" @input="Inputtext" />
			</view>
			<!-- 字数 -->
			<view class="top-view-bottomtext">
				{{textmarn}}/500字
			</view>
		</view>
		<!-- 下边view -->
		<view class="bottom-view">
			<view class="bottom-view-text">
				上传图片（选填）
			</view>
			<view class="bottom-view-ImageUpload">
				<robby-image-upload v-model="detailInfo.imageData" 
				 :showUploadProgress="show" :form-data="formData" @delete="deleteImage" @add="addImage" :enable-del="enableDel"
				 :enable-add="enableAdd" limit="3"></robby-image-upload>
			</view>
		</view>
		<!-- 提交 -->
		<view class="btnClass changecolor2 btn_background" @click="successClick">提交</view>
		<!-- <view class="btnClass" :class="btncheck?'changecolor2 btn_background':'changecolor1'" @click="successClick(btncheck)">提交</view> -->
	</view>
</template>

<script>
import { pathToBase64, base64ToPath } from '@/pages_GRZX/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
import robbyImageUpload from '@/pages_GRZX/components/GRZX/robby-image-upload/robby-image-upload2.vue';
export default {
	data() {
		return {
			pictureArray:[],//存储图片base64
			ideaContent:'',//存储内容
			textmarn:0,//字数
			btncheck:false,//提交按钮是否变换
			checkedType:[], //选中的类型
			//类型文字
			typeList:[
				{
					text:'用户体验',
					checked:false,
				},
				{
					text:'车票定价',
					checked:false,
				},
				{
					text:'功能建议',
					checked:false,
				},
				{
					text:'平台',
					checked:false,
				},
				{
					text:'优惠活动',
					checked:false,
				},
				{
					text:'导航定位',
					checked:false,
				}
			],
			
			// 上传图片
			enableDel: true, //是否启动del
			enableAdd: true, //是否启动删除
			enableDrag: false, //是否启动拖动
			show: true, //是否显示
			formData: { //表格数据
				userId: 2
			},
			detailInfo: { //详细信息
				imageData: [], //图像日期	
			},
			
			userInfo:'',	//用户信息
			systemType:'',	//系统类型
		}
	},
	components: {
		robbyImageUpload, // 导入图片上传
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title:'意见反馈',
		})
		uni.getStorage({
			key:'userInfo',
			success: res => {
				this.userInfo = res.data;
			}
		})
		try {
		    const res = uni.getSystemInfoSync();
			if(res.platform == 'ios'){
				//当前是iOS系统
				this.systemType = 1;
			}else {
				//当前是Android系统
				this.systemType = 0;
			}
		} catch (e) {
		    // error
		}
	},
	methods: {
		deleteImage: function(e){
			console.log(e)
			var index = this.pictureArray.findIndex(item => {
				for(var i=0;i<e.allImages.length;i++){
					if(item ==this.typeList[i].text) {
						return true;
					}
				}
			})
			this.pictureArray.splice(index,1);
		},
		addImage: function(e){
			console.log(e)
			for(var i=0;i<e.allImages.length;i++){
				pathToBase64(e.allImages[i])
				.then(base64 => {
					this.pictureArray.push(base64);
				})
			}
		},
		Inputtext:function(e){ //字数
			var that = this;
			that.textmarn=e.detail.cursor; 
		},
		change:function(e) {
			var that =this;
			for (var i = 0; i < that.typeList.length; i++) {
				if (e == i) {
					if(!that.typeList[i].checked)
					{
						if(that.checkedType.length<3){
							that.typeList[i].checked = true;
							that.btncheck=true;
							that.checkedType.push(that.typeList[i].text);
						}else{
							uni.showToast({
								icon:'none',
								title:'意见类型最多选中3个'
							})
						}
					}else{
						that.typeList[i].checked = false;	
						var index = that.checkedType.findIndex(item => {
							if (item ==that.typeList[e].text) {
								return true;
							}
						})
						that.checkedType.splice(index,1);
					}
				}
			}
			var list=that.typeList.filter(item => {
				return item.checked == true;
			})
			if(list.length==0){
				that.btncheck=false;
			}
		},
		successClick:function(e){
			if(this.ideaContent==""){
				uni.showToast({
					icon:'none',
					title:'请填写意见，谢谢'
				})
			}else{
				uni.request({
					url: this.$GrzxInter.Interface.Add_Suggestion.value,
					method: this.$GrzxInter.Interface.Add_Suggestion.method,
					data: {
						userID : this.userInfo.userId,		//用户id
						SuggestionPicture : this.pictureArray,		//反馈图片
						Suggestion : this.ideaContent,		//反馈内容
						Phone : this.userInfo.phoneNumber,	//用户手机号
						SystemType : this.systemType,		//系统类型
						SuggestionType:'',					//反馈类型
						AppType : this.$GrzxInter.systemConfig.openidtype,	//应用类型
						ProjectCode : this.$GrzxInter.systemConfig.applyName,		//项目名称
					},
					success: res => {
						console.log(res,"反馈");
						uni.showToast({
							title: res.data.msg,
							icon:'none'
						});
						if(res.data.status){
							setTimeout(function(){
								uni.navigateBack();
							},500)
						}
					},
					fail: () => {
						uni.showToast({
							title: '网络连接失败',
							icon:'none'
						});
					},
				});
			}
		}
	},
}
</script>

<style lang="scss">
	page {
		background-color: #F4F6F8;
	}

	.top-view {
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 30upx 20upx 28upx 28upx;
	}

	.top-view-Type {
		width: 193upx;
		height: 68upx;
		border-radius: 34upx;
		background-color: #ECEEF0;
		margin-left: 29upx;
		margin-top: 30upx;
		text-align: center;
		line-height: 63upx;
	}
	.fontStyle {
		font-size: 28upx;
		color: #2C2D2D;
	}
	.changefontStyle{
		font-size: 28upx;
		color: #FFFFFF;
		width: 100%;
		text-align: center;
		width: 193upx;
		height: 68upx;
		border-radius: 34upx;
	}
	.top-view-textarea{
		margin-left: 43upx;
		margin-top: 30upx;
		font-size: 32upx;
		padding-top: 20upx;
	}
	.top-view-bottomtext{
		font-size: 28upx;
		color: #AAAAAA;
		padding: 50upx;
		text-align: right;
	}
	.bottom-view {
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 0upx 20upx 28upx 28upx;
		padding-bottom: 10upx;

		.bottom-view-text {
			font-size: 34upx;
			color: #333333;
			margin-left: 28upx;
			padding-top: 43upx;
			font-weight: 500;
		}
	}
	.btnClass{
		position: fixed;
		bottom: 20upx;
		left: 4%;
		width: 92%;
		text-align: center;
		font-size: 34upx;
		border-radius: 20upx;
		padding: 30upx 0;
	}
	.changecolor1{
		background-color: #FFFFFF;
		color: #999999;
	}
	.changecolor2{
		color: #FFFFFF;
	}
</style>
