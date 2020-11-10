<template>
	<view class="content">
		<image src="@/static/GRZX/logo.png" class="logoClass"></image>
		<text class="titleClass">{{title}}</text>
		<text class="versionClass">{{versionNum}}{{version}}</text>
		<view class="boxClass1">
			<view class="checkClass" @click="checkClick">
				<text class="fontClass">{{checkVersion}}</text>
				<image src="../../static/GRZX/btnRight.png" class="imgClass1"></image>
			</view>
		</view>
		<view class="boxClass2">
			<text class="agreementClass" @click="agreementClick">{{agreement}}</text>
			<text class="privacyClass" @click="privacyClick">{{privacy}}</text>
			<text class="copyrightClass">{{copyright1}}</text>
			<text class="copyrightClass">{{copyright2}}</text>
			<text class="copyrightClass">{{copyright3}}</text>
		</view>
		
		<!-- 服务协议和隐私政策 -->
		<uni-popup ref="centerPopup" type="center">
			<view class="centerClass">
				<view class="pTitleClass">服务协议和隐私政策</view>
				<view class="pTextClass">
					<text>请你务必审慎阅读，充分理解“软件许可及服务协议”和“隐私政策”各条款。</br>你可阅读</text>
					<text style="color: #2F9BFE;" @click="agreementClick">《软件许可及服务协议》</text>
					<text>和</text>
					<text style="color: #2F9BFE;" @click="privacyClick">《隐私政策》</text>
					<text>了解详细信息。如你同意，请点击“同意”开始接受我们的服务。</text>
				</view>
				<view class="btnBox">
					<view class="btnClass1" @click="closePopup('centerPopup')">暂不使用</view>
					<view class="btnClass2" @click="confirm">同意</view>
				</view>
			</view>
		</uni-popup>
		
		<u-modal v-model="show" :content="content" :show-cancel-button="true"
		confirm-text="前往下载" cancel-text="取消" @confirm="confirmClick" @cancel="cancelClick" title="检查更新"></u-modal>
	</view>
</template>

<script>
	import uniPopup from "@/components/HOME/uni-popup/uni-popup.vue";
	export default{
		data(){
			return{
				title:'乡村振兴',
				versionNum:'Version ',
				functionIntroduction:'功能介绍',
				checkVersion:'检查新版本',
				agreement:'《软件许可及服务协议》',
				privacy:'《隐私政策》',
				copyright1:'途游信息科技 版权所有',
				copyright2:'Copyright©2020 Journey',
				copyright3:'All Rights Reserved',
				version:'',
				logo:'../../../../static/GRZX/logo.png',
				show:false,	//是否开启下载提示
				content:'',//提示信息
			}
		},
		onLoad(){
			// #ifdef APP-PLUS
			this.version=plus.runtime.version;
			//#endif
			// this.loadService();
		},
		components: { uniPopup },  //注册为子组件
		methods:{
			//--------------------------------加载logo--------------------------
			loadImg(){
				var that = this;
				that.$ChangeImage.GetImage("南平综合出行","logo").then(function(data) {
					that.logo = data;
				});
			},
			//--------------------------加载是否服务--------------------------
			loadService:function(){
				var that=this;
				uni.getStorage({
					key:'acceptService',
					success(res) {
						console.log(res)
						if(res.data){
							that.openPopup('centerPopup');
						}
					},
					fail(err) {
						that.openPopup('centerPopup');
					}
				})
			},
			
			//--------------------------开启弹窗--------------------------
			openPopup: function(value) {
				this.$nextTick(function() {
					this.$refs[value].open();
				});
			},
			
			//--------------------------关闭弹窗--------------------------
			closePopup: function(value) {
				this.$nextTick(function() {
					this.$refs[value].close();
				});
			},
			
			//--------------------------是否同意软件协议--------------------------
			confirm:function(){
				uni.setStorageSync('acceptService',true);
				this.closePopup('centerPopup');
			},
			
			//--------------------------功能介绍--------------------------
			functionClick(){
				uni.showToast({
					icon:'none',
					title:'功能介绍'
				})
			},
			
			// // #ifdef APP-PLUS
			// plus.runtime.openURL(that.$GrzxInter.downloadAPP);
			// // #endif
			// // #ifndef APP-PLUS
			// uni.showToast({
			// 	title:'暂无法下载新版本',
			// 	icon:'none'
			// })
			// // #endif
			// wgt :http://27.148.155.9:9248/LoadAppWebsite/zxxc_gxb.wgt
			//--------------------------检查新功能--------------------------
			checkClick(){
				uni.request({
					url: this.$GrzxInter.Interface.getVersion.value,
					method: this.$GrzxInter.Interface.getVersion.method,
					success: res => {
						console.log(res,"版本号");
						if(res.data.status){
							if(this.cpr_version(this.version,res.data.data)){
								this.show = true;
								this.content = "检测到您有新版版本，版本号为："+res.data.data+"，是否前往下载?";
							}else{
								uni.showToast({
									title: '您已是最新版本',
									icon:'none',
								});
							}
						}else{
							uni.showToast({
								title: '您已是最新版本',
								icon:'none',
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '网络连接错误',
							icon:'none',
						});
					},
					complete: () => {}
				});
			},
			toNum(a){
				var a=a.toString();
				//也可以这样写 var c=a.split(/\./);
				var c=a.split('.');
				var num_place=["","0","00","000","0000"],r=num_place.reverse();
				for (var i=0;i<c.length;i++){ 
					var len=c[i].length;       
					c[i]=r[len]+c[i];  
				} 
				var res= c.join(''); 
				return res; 
			},
			cpr_version(a,b){ 
				//返回true，有新版本
				//返回false，无新版本
				var oldVersion=this.toNum(a);
				var newVersion=this.toNum(b);   
				if(oldVersion<newVersion){
					return true;
				}else{
					return false;
				}
			},
			
			//--------------------------下载按钮--------------------------
			confirmClick(){
				console.log("下载");
				var wgtUrl="http://27.148.155.9:9248/LoadAppWebsite/zxxc_gxb.wgt";  
				plus.nativeUI.showWaiting("下载wgt文件...");  
				plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){  
				    if ( status == 200 ) {   
				        console.log("下载wgt成功："+d.filename);  
				        var path = d.filename;
						plus.nativeUI.showWaiting("安装wgt文件...");  
						plus.runtime.install(path,{},function(){  
						    plus.nativeUI.closeWaiting();  
						    console.log("安装wgt文件成功！");  
						    plus.nativeUI.alert("应用资源更新完成！",function(){  
						        plus.runtime.restart();  
						    });  
						},function(e){  
						    plus.nativeUI.closeWaiting();  
						    console.log("安装wgt文件失败["+e.code+"]："+e.message);  
						    plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);  
						});  
				    } else {  
						console.log(status,"打印");
				        console.log("下载wgt失败！");  
				        plus.nativeUI.alert("下载wgt失败！");  
				    }  
				    plus.nativeUI.closeWaiting();  
				}).start();  
			},
			
			//--------------------------取消按钮--------------------------
			cancelClick(){
				console.log("取消");
			},
			
			//--------------------------软件许可及服务协议--------------------------
			agreementClick(){
				// uni.navigateTo({
				// 	url:this.$GrzxInter.Route.privacyService.url+'?title=软件许可及服务协议',
				// })
			},
			
			//--------------------------隐私政策--------------------------
			privacyClick(){
				// uni.navigateTo({
				// 	url:this.$GrzxInter.Route.privacyService.url+'?title=隐私政策',
				// })
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.content{
		
	}
	.logoClass{		//LOGO样式
		position: absolute;
		top:100upx;
		left: 39%;
		width: 180upx;
		height: 180upx;
		border-radius: 50%;
	}
	.titleClass{	//大武夷智慧游
		position: absolute;
		top:300upx;
		width: 100%;
		font-size: 50upx;
		font-weight: bold;
		text-align: center;
	}
	.versionClass{	//版本号
		position: absolute;
		top:360upx;
		width: 100%;
		font-size: 30upx;
		text-align: center;
		margin-top: 10upx;
	}
	.boxClass1{
		position: absolute;
		top:520upx;
		left: 5%;
		width: 90%;
		font-size: 34upx;
		display: flex;
		flex-direction: column;
	}
	.boxClass2{
		position: absolute;
		bottom:40upx;
		width: 100%;
		display: flex;
		text-align: center;
		flex-direction: column;
	}
	.functionClass{		//功能介绍
		width: 100%;
		height: 110upx;
		line-height: 110upx;
		border-top: 1upx solid #EAEAEA;
	}
	.checkClass{		//检查新版本
		width: 100%;
		height: 110upx;
		line-height: 110upx;
		border-top: 1upx solid #EAEAEA;
		border-bottom: 1upx solid #EAEAEA;
	}
	.fontClass{
		margin-left: 3%;
	}
	.agreementClass{
		color: #96a0b4;
		font-size: 30upx;
		margin-left: 28%;
		width: 335upx;
		height: 30upx;
		line-height: 30upx;
		margin-bottom: 15upx;
	}
	.privacyClass{
		color: #96a0b4;
		font-size: 30upx;
		margin-left: 28%;
		width: 335upx;
		height: 30upx;
		line-height: 30upx;
		margin-bottom: 10upx;
	} 
	.copyrightClass{
		color: #bababa;
		font-size: 26upx;
		margin-bottom: 5upx;
	}
	.imgClass1{
		width: 45upx;
		height: 45upx;
		position: absolute;
		top:35upx;
		right: 0%;
	}
	.imgClass2{
		width: 45upx;
		height: 45upx;
		position: absolute;
		top:146upx;
		right: 0%;
	}
	.textCLass{
		font-size: 30upx;
		position: absolute;
		top:116upx;
		right: 6%;
	}
	//弹框start
	.centerClass{  //弹框的样式
		width: 82%;
		margin-left: 9%;
		// height: 550upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}
	.pTitleClass{
		padding-top: 15upx;
		text-align: center;
		font-size: 38upx;
		color: #333333;
		padding: 40upx 0 20upx 0;
	}
	.pTextClass{
		width: 80%;
		margin-left: 10%;
		font-size: 34upx;
	}
	.btnBox{
		width: 100%;
		border-top: 1upx solid #EAEAEA;
		// height: 80upx;
		margin-top: 80upx;
		display: flex;
		flex-direction: row; //column纵向，row横向
	}
	.btnClass1{
		color: #333333;
		text-align: center;
		width: 50%;
		font-size: 38upx;
		padding: 25upx 0;
		border-right: 1upx solid #EAEAEA;
	}
	.btnClass2{
		color: #2F9BFE;
		text-align: center;
		width: 50%;
		font-size: 38upx;
		padding: 25upx 0;
	}
	//弹框end
</style>
