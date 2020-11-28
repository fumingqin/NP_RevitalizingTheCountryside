<template>
	<view class="content">
		<form @submit="formSubmit" style="width: 100%;">
			<view class="box1">
				<view class="itemClass">
					<view class="fontStyle">姓名	</view>
					<input placeholder="与证件姓名一致" class="inputClass" maxlength="6"  name="name" v-model="user.name" @blur="nameClick"/> 
				</view>
				<view class="itemClass borderTop">
					<view class="fontStyle">性别</view>
					<radio-group class="inputClass" name="sex">
						<label v-for="(item, index) in sexMode" :key="index" @click="radioClick(index)" > 
							<radio style="transform: scale(0.7)" :value="user.sex" :checked="index===user.sex" />{{item.title}}
						</label>  
					</radio-group>
				</view>
				<view class="itemClass borderTop">
					<view class="fontStyle">手机号码</view>
					<input
						type="number"
						placeholder="请输入手机号码"
						maxlength="11"
						class="inputClass"
						v-model="user.phone"
						name="phone"
						@blur="checkPhone"
					/>				
				</view>
			</view>
			<view class="codeClass">证件</view>
			<view class="box2">
				<view class="itemClass">
					<view class="fontStyle" style="font-weight: bold;">证件类型</view>
					<view class="inputClass">
						<picker name="code_type"  mode="selector" @change="codeChange" :range="selectCode" :value="code">
							{{code_type}}
						</picker>	
					</view>
				</view>
				<!-- 身份证 -->
				<view v-if="code==0||code==1" class="itemClass borderTop">
					<view class="fontStyle">证件号</view>
					<input
						placeholder="请保持与证件号码一致"
						class="inputClass"
						v-model="user.code"
						name="code"
						type="idcard"
						maxlength="18"
						@blur="checkCodeNum1"
					/>	
				</view>
				<!-- 护照 -->
				<view v-if="code==2" class="itemClass borderTop">
					<view class="fontStyle">证件号</view>
					<input
						placeholder="请保持与证件号码一致"
						class="inputClass"
						v-model="user.code"
						name="code"
						@blur="checkCodeNum2"
						maxlength="9"
					/>	
				</view>
				<!-- 港澳通行证 -->
				<view v-if="code==3" class="itemClass borderTop">
					<view class="fontStyle">证件号</view>
					<input
						placeholder="请保持与证件号码一致"
						class="inputClass"
						v-model="user.code"
						name="code"
						@blur="checkCodeNum3"
						maxlength="11"
					/>	
				</view>
				<!-- 台胞证 -->
				<view v-if="code==4" class="itemClass borderTop">
					<view class="fontStyle">证件号</view>
					<input
						placeholder="请保持与证件号码一致"
						class="inputClass"
						v-model="user.code"
						name="code"
						@blur="checkCodeNum4"
						maxlength="10"
					/>	
				</view>
				<!-- 回乡证 -->
				<!-- <view v-if="code==5" class="itemClass borderTop">
					<view class="fontStyle">证件号</view>
					<input
						placeholder="请保持与证件号码一致"
						class="inputClass"
						:value="user.code"
						name="code"
						@blur="checkCodeNum5"
					/>	
				</view> -->
				
				<view class="itemClass borderTop">
					<view class="fontStyle">购票类型</view>
					<view class="inputClass">
						<picker name="type"  mode="selector" @change="typeChange" :range="selectType" :value="user.type">
							{{ticketType}}
						</picker>	
					</view>
				</view>
				
				<!-- <view class="itemClass borderTop">
					<view class="fontStyle">特殊凭证</view>
					<view class="inputClass">
						<picker name="prove"  mode="selector" @change="proveChange" :range="proveType" :value="user.prove">
							{{selector}}
						</picker>
					</view>	
				</view> -->
				
			</view>
			
			<view class="personClass">
				<view class="fontStyle">设置为本人</view>
				<view class="checkBox">
					<checkbox-group name="default_self" @change="checkChange">
						<label>
							<checkbox :checked="user.default_self" :value="user.default_self"  />
						</label>
					</checkbox-group>
				</view>
			</view>
			
			<view class="noticeClass">
				<rich-text :nodes="noticeText" style="width: 100%;"></rich-text>
				<!-- <p>购票说明：</p></br><p>①成人和身高超过1.5米的儿童购买全票。</p></br>
				<p>②身高1.2-1.5米，或身高1.2米以下需要单独占用座位的儿童可购买半票。</p></br>
				<p>③身高1.2米以下儿童乘车免票，需由成人陪同不提供单独座位。
				根据交管部门规定，一班车免票儿童人数不得超过核定座位数的10%，如携带儿童乘车务必在此声明人数。
				如系统提示免票儿童名额已满，请选择其他时间班次或购买半票。</p></br>
				<p>④根据车站相关规定，请携带并出示相关的证件。</p> -->
			</view>
			
			<!-- <view v-if="!user.show" style="margin-bottom: 150upx;"></view>
			<view v-if="false" class="emergencyClass">
				<view class="fontStyle">紧急联系人</view>
				<view class="checkBox">
					<checkbox-group name="emergency_content">
						<label>
							<checkbox :checked="user.emergency_content" :value="user.emergency_content" />
						</label>
					</checkbox-group>
				</view>
			</view> -->
			<button  class="btndelete btn_GRZX_CZ" @click="resetClick">重置</button>
			<button form-type="submit" class="btnsubmit btn_background btn_fontColor">保存</button>		
		</form>
		<view class="title">
			<image src="../../static/GRZX/btnReturn.png" class="returnClass" @click="returnClick"></image>
			<text class="textClass" @click="returnClick">常用信息设置</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				sexMode :[
					{title:'男'},
					{title:'女'}
				],
				proveType:['请选择','军人','教师','学生'],
				selectTypeState:false,		//控制是否有免票儿童
				selectType:['请选择','成人','半票儿童'],
				selectCode:['请选择','身份证','护照','港澳通行证','台胞证'],
				// code_type:'请选择证件类型 >',
				code_type:'身份证 >',
				ticketType:'成人 >',
				selector:'请选择特殊凭证 >',
				user:{
					id:0,//乘车人id
					name:'',	
					sex:0,
					phone:'',
					code:'',
					default_self:false,
					show:true,
					prove:0,
					type:1,
					// emergency_content:false,
					// date:'请选择',
					// date:'',
				},
				user_type:'',
				address:'',
				userId:'', //账号id
				code:1,
				
				noticeText:'', //乘车人须知
				whetherCheck:true,//是否开启身份验证
			}
		},
		onLoad (options){
			if(this.selectTypeState){
				this.selectType.push('免票儿童');
			}
			this.loadUnid();
			var type=options.type;
			this.type=options.type;
			if(options.type=="edit"){
				this.loadData(type);
			}
			//this.loadText();//加载乘车人须知
		},
		onUnload() {  //页面关闭时执行
			//------------------清除editPassenger缓存----------------
			uni.removeStorageSync('editPassenger');
		},
		methods:{
			//------------------加载账号id----------------
			loadUnid:function(){
				var the=this;
				uni.getStorage({
					key:'userInfo',
					success(res){
						the.userId=res.data.userId;
					},
					fail(){
						uni.showToast({
							icon:'none',
							title:'暂未登录,请登录后查看'
						})
						uni.stopPullDownRefresh();
						//#ifdef APP-PLUS
						setTimeout(function(){
							uni.navigateTo({	
								url  : '/pages/GRZX/userLogin'
							}) 
						},500);
						//#endif
						//#ifdef MP-WEIXIN
						setTimeout(function(){
							uni.navigateTo({
								url:'/pages/GRZX/wxAuthorize',
							})
						},1500);
						// #endif
					}
				})
			},
			
			//------------------加载乘车人信息----------------
			loadData:function(type){
				uni.showLoading({
					title:'加载中...'
				})
				var that=this;
				uni.getStorage({
					key:'editPassenger',
					success:function(res){
						console.log(res,"res")
					//----------加载id--------
						that.user.id=res.data.id;
					//----------加载姓名--------
						that.user.name=res.data.name;
					//----------加载性别--------
						if(res.data.sex=="男"){
							that.user.sex=0;
						}else{
							that.user.sex=1;
						}
					//----------加载身份证--------
						that.user.code =res.data.code ;
					//----------是否为本人--------
						that.user.default_self=res.data.default_self;
					// that.user.show=!that.user.default_self;
					//----------是否为紧急联系人--------
					// that.user.emergency_content=res.data.emergency_content;
					//----------加载电话号码--------
						that.user.phone=res.data.phone;
					//----------加载购票类型--------
						if(res.data.user_type=='军人'||res.data.user_type=='教师'||res.data.user_type=='学生'){
							that.selector=res.data.user_type+" >";
							if(res.data.user_type=='军人'){
								that.user.prove=1;
							}else if(res.data.user_type=='教师'){
								that.user.prove=2;
							}else if(res.data.user_type=='学生'){
								that.user.prove=3;
							}
							that.ticketType='成人 >';
							that.user.type=1;
						}else{
							that.ticketType=res.data.user_type+" >";
						}
						if(that.ticketType=='成人 >'){
							that.user.type=1;
						}else if(that.ticketType=='半票儿童 >'){
							that.user.type=2;
						}else if(that.ticketType=='免票儿童 >'){
							that.user.type=3;
						}
					//----------加载证件类型--------	
						if(res.data.code_type==""){
							that.user.codeNumType="请选择证件类型 >";
							that.code=0;
						}else{
							that.codeNumType=res.data.code_type+" >";
							if(res.data.code_type=='身份证'){
								that.code=1;
							}else if(res.data.code_type=='护照'){
								that.code=2;
							}else if(res.data.code_type=='港澳通行证'){
								that.code=3;
							}else if(res.data.code_type=='台胞证'){
								that.code=4;
							}else if(res.data.code_type=='回乡证'){
								that.code=5;
							}
						}
						uni.hideLoading();
					}
				})
			}, 
			
			//------------------加载乘车人须知----------------
			loadText:function(){
				uni.request({
					url:this.$GrzxInter.Interface.GetAggrement.value,
					method:this.$GrzxInter.Interface.GetAggrement.method,
					success: res =>{
						console.log(res,'乘车人须知');
						if(res.data.status){
							for(let i = 0; i < res.data.data.length; i++){
								if(res.data.data[i].Title == "购票须知"){
									this.noticeText=res.data.data[i].Body;
								}
							}
						}
					},
				})
			},
			
			//------------------选择性别----------------
			radioClick:function(e){
				this.user.sex = e;
			},
			//------------------上传乘车人信息----------------
			formSubmit:function(e){
				var data1=e.target.value;
				var that=this;
				data1.id=that.user.id;
				if(data1.default_self==null||data1.default_self==""){
					data1.default_self=false;
				}else{
					data1.default_self=true;
				}
				// -------证件类型----------
				data1.code_type=that.code_type;
				if(that.selector!="请选择特殊凭证 >"){
					data1.user_type=that.selector;
				}else{
					data1.user_type=that.ticketType;
				}
				var	checkState='';//是否开启验证，true开启，false关闭
				console.log(data1.user_type,"购票类型")
				if(data1.user_type=="免票儿童 >"||data1.user_type=="半票儿童 >"){
					checkState=false;
				}else{
					checkState=that.whetherCheck;
				}
				console.log(checkState,"是否开启验证")
				var reg=(/^1(3|4|5|6|7|8|9)\d{9}$/);
				if(data1.name==""||data1.name==null){
					uni.showToast({
						title:'请输入姓名',
						icon:'none',
					})
				}else if(data1.name.length<2){
					uni.showToast({
						title:'输入的姓名不能少于2位',
						icon:'none',
					})
				}else if(data1.phone==""||data1.phone==null){
					uni.showToast({
						title:'请输入手机号码',
						icon:'none',
					})
				}else if(data1.phone.length!=11||!reg.test(data1.phone)){
					uni.showToast({
						icon:'none',
						title:'输入的手机号有误，请检查'
					})
				}else if(data1.code_type=="请选择证件类型 >"){
					uni.showToast({
						title:'请选择证件类型',
						icon:'none',
					})
				}else if(data1.code==""||data1.code==null){
					uni.showToast({
						title:'请输入证件号',
						icon:'none',
					})
				}else if(data1.code_type=="身份证 >"&&!that.checkIDCard(data1.code)&&checkState){
					uni.showToast({
						title:'输入的身份证号有误，请检查',
						icon:'none',
					})
				}else if(data1.code_type=="护照 >"&&!that.checkPass1(data1.code)&&checkState){
					uni.showToast({
						title:'输入的证件号有误，请检查',
						icon:'none',
					})
				}else if(data1.code_type=="港澳通行证 >"&&!that.checkPass2(data1.code)&&checkState){
					uni.showToast({
						title:'输入的证件号有误，请检查',
						icon:'none',
					})
				}else if(data1.code_type=="台胞证 >"&&!that.checkPass3(data1.code)&&checkState){
					uni.showToast({
						title:'输入的证件号有误，请检查',
						icon:'none',
					})
				}else if(data1.user_type=="请选择购票类型 >"){
					uni.showToast({
						title:'请选择购票类型',
						icon:'none',
					})
				}else if((data1.user_type=="免票儿童 >"||data1.user_type=="半票儿童 >") && data1.default_self == true){
					uni.showToast({
						title:'儿童不允许设置为本人',
						icon:'none',
					})
				}
				else{
					data1.user_type = data1.user_type.substring(0,data1.user_type.length-2);
					data1.code_type = data1.code_type.substring(0,data1.code_type.length-2);
					uni.showLoading({
						title:'保存中...'
					})
					that.keepPassenger(data1); //检查列表中是否存在本人
				}
			},
			
			// ------------------保存用户信息----------------
			keepPassenger:function(data1){
				var that=this;
				console.log(data1,"data1");
				uni.request({
					url:that.$GrzxInter.Interface.changeUserInfo.value,
					// url:'http://localhost:6480/api/passenger/changeUserInfo',
					data:{
						id:data1.id, //2.乘车人id   
						user_type:data1.user_type,   //3.用户类别 成人/儿童 
						name:data1.name,   //4.用户姓名   
						sex:data1.sex,   //5.用户性别   
					  	code:data1.code,   //6.用户身份证   
					  	phone:data1.phone,   //7.用户手机号   
					  	default_self:data1.default_self,   //8.用户是否本人 true/false 
					  	emergencyContact:'false',   //9.是否设置为紧急联系人 true/false
						code_type:data1.code_type,   //12.证件类型
						userId:that.userId,
					},
					method:that.$GrzxInter.Interface.changeUserInfo.method,
					success(res) {
						console.log(res,"370")
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
						if(res.data.status){
							if(that.type=="add"){
								uni.getStorage({
									key:'passengerList',
									success(list){
										console.log(list,"378")
										var passList=[];
										for(var i=0;i<list.data.length;i++){
											passList.push(list.data[i]);
										}
										if(res.data.data.sex==0){
											res.data.data.sex="男";
										}else{
											res.data.data.sex="女";
										}
										var list1={
											id:res.data.data.id, //乘车人id
											user_type:res.data.data.user_type,   //用户类别 成人/儿童 
											name:res.data.data.name,   //用户姓名   
											sex:res.data.data.sex,   //用户性别   
										  	code:res.data.data.code,   //用户身份证   
										  	phone:res.data.data.phone,   //用户手机号   
										  	default_self:res.data.data.default_self,   //用户是否本人 true/false 
										  	emergency_content:res.data.data.emergency_content, //是否设置为紧急联系人 true/false
											hiddenIndex:1,  //1代表选中
										}
										passList.push(list1);
										uni.setStorage({
											key:'passengerList',
											data:passList
										})
									}
								})
							}
							setTimeout(function(){
								uni.navigateBack();
							},500);	
						}
					},
				})
			},
			
			// ------------------绑定日期----------------
			bindDateChange:function(e){
				this.user.date = e.target.value;
			},
			
			//------------------选择证件类型----------------
			codeChange:function(e){
				this.code=e.detail.value;
				this.user.code="";
				if(e.detail.value==0){
					this.code_type="请选择证件类型 >";
				}else{
					this.code_type=this.selectCode[e.detail.value]+" >";
				}
			},
			
			//------------------添加额外凭证----------------
			proveChange:function(e){
				this.user.prove=e.detail.value;
				if(e.detail.value==0){
					this.selector="请选择特殊凭证 >";
				}else{
					this.selector=this.proveType[e.detail.value]+" >";
				}
			},
			
			//------------------选择购票类型----------------
			typeChange:function(e){
				this.user.type=e.detail.value;
				console.log(e)
				if(e.detail.value==0){
					this.ticketType="请选择购票类型 >";
				}else{
					this.ticketType=this.selectType[e.detail.value]+" >";
				}
			},
			
			//------------------重置信息----------------
			resetClick:function(e){
				console.log(e)
				// this.user.date="请选择";
				this.user.sex=0;
				this.user.show=true;
				this.user.name="";
				this.user.phone="";
				this.user.code="";
				this.code_type="身份证 >";
				this.ticketType="成人 >";
				this.selector="请选择特殊凭证 >";
				this.user.default_self=false;
				this.code=1;
				this.user.prove=1;
				this.user.type=0;
				// this.user.emergency_content=false;
			},
			
			//------------------是否选中本人----------------
			checkChange:function(e){
				//console.log(e.detail.value,"xuanzhong");
				if(e.detail.value=="false"||e.detail.value=="true"){ //选中
					this.user.show=false;
				}else{	//未选中
					this.user.show=true;
					this.user.emergency_content=false;
				}
			},
			
			//------------------返回按钮----------------
			returnClick:function(){
				uni.navigateBack();
			},
			
			//------------------校验手机号----------------
			checkPhone:function(e){
				var reg=(/^1(3|4|5|6|7|8|9)\d{9}$/);
				if(e.detail.value==""){
					console.log("空的")
				}else if(reg.test(e.detail.value)){
					console.log("正确")
				}else{
					uni.showToast({
						title:'输入的手机号有误，请检查',
						icon:'none'
					})
				}
			},
			
			//------------------校验身份证号----------------
			checkCodeNum1:function(e){
				console.log(e)
				if(e.detail.value==""){
					console.log("空的")
				}else if(this.checkIDCard(e.detail.value)){
					console.log("正确")
				}else{
					// uni.showToast({
					// 	title:'输入的身份证有误，请检查',
					// 	icon:'none'
					// })
				}
			},
			checkCodeNum2:function(e){
				if(e.detail.value==""){
					console.log("空的")
				}else if(this.checkPass1(e.detail.value)){
					console.log("正确")
				}else{
					// uni.showToast({
					// 	title:'输入的证件号有误，请检查',
					// 	icon:'none'
					// })
				}
			},
			checkCodeNum3:function(e){
				if(e.detail.value==""){
					console.log("空的")
				}else if(this.checkPass2(e.detail.value)){
					console.log("正确")
				}else{
					// uni.showToast({
					// 	title:'输入的证件号有误，请检查',
					// 	icon:'none'
					// })
				}
			},
			checkCodeNum4:function(e){
				if(e.detail.value==""){
					console.log("空的")
				}else if(this.checkPass3(e.detail.value)){
					console.log("正确")
				}else{
					// uni.showToast({
					// 	title:'输入的证件号有误，请检查',
					// 	icon:'none'
					// })
				}
			},
			checkCodeNum5:function(e){
				if(e.detail.value==""){
					console.log("空的")
				}else if(this.checkPass4(e.detail.value)){
					console.log("正确")
				}else{
					uni.showToast({
						title:'输入的证件号有误，请检查',
						icon:'none'
					})
				}
			},
			
			//------------------校验身份证号----------------
			checkIDCard:function(idcode){
			    // 加权因子
			    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
			    // 校验码
			    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];
			    var code = idcode + "";
			    var last = idcode[17];//最后一位
			    var seventeen = code.substring(0,17);
			    // 判断最后一位校验码是否正确
			    var arr = seventeen.split("");
			    var len = arr.length;
			    var num = 0;
			    for(var i = 0; i < len; i++){
			        num = num + arr[i] * weight_factor[i];
			    }
			    // 获取余数
			    var resisue = num%11;
			    var last_no = check_code[resisue];
				var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				// 判断格式是否正确
				var format = idcard_patter.test(idcode);
				// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
				return last === last_no && format ? true : false;
			},
			
			//------------------校验护照----------------
			checkPass1:function(e){
				var reg=/^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(e);
				return reg;
			},
			
			//------------------校验港澳通行证----------------
			checkPass2:function(e){
				var reg=/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(e);
				return reg;
			},
			
			//------------------校验台胞证----------------
			checkPass3:function(e){
				var reg=/^(?:(830000(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX])|\d{10}[DAB])$/.test(e);
				return reg;
			},
			
			//------------------校验回乡证----------------
			checkPass4:function(e){
				// var reg=/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(e);
				return true;
			},
			
			//------------------校验姓名----------------
			nameClick:function(e){
				if(e.detail.value==""){
					console.log("空的")
				}else if(e.detail.value.length>=2){
					console.log("正确")
				}else{
					uni.showToast({
						title:'输入的姓名不能少于2位',
						icon:'none'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F8FC;
	}
	.content {
		// position: relative;
		display: flex;
		width: 100%;
	}
	.title{
		width: 100%;
		/* #ifdef H5 */
		height: 74upx;
		/* #endif */
		/* #ifndef H5 */
		height: 144upx;
		/* #endif */
		position: fixed;
		left: 3.47%;
		top: 0upx;
		background-color: #F6F8FC;
	}
	.returnClass{
		width: 22upx;
		height: 40upx;
		display: flex;
		flex-direction: row;
		position: absolute;
		/* #ifdef H5 */
		top: 30upx;
		/* #endif */
		/* #ifndef H5 */
		top: 100upx;
		/* #endif */
	}
	.textClass{
		color: #333333;
		font-size: 38upx;
		height: 44upx;
		line-height: 44upx;
		position: absolute;
		left: 36upx;
		/* #ifdef H5 */
		top: 25upx;
		/* #endif */
		/* #ifndef H5 */
		top: 95upx;
		/* #endif */
	}
	
	.box1{ //姓名，性别，手机号
		display: flex;
		flex-direction: column;
		width: 93.07%;
		height: 330upx;
		/* #ifdef H5 */
		margin-top: 100upx;
		/* #endif */
		/* #ifndef H5 */
		margin-top: 170upx;
		/* #endif */
		margin-left: 3.47%;
		background-color: #FFFFFF;
		border-radius: 25upx;
	}
	.box2{		//证件相关信息
		display: flex;
		flex-direction: column;
		width: 93.07%;
		margin-top: 20upx;
		margin-left: 3.47%;
		background-color: #FFFFFF;
		border-radius: 25upx;
	}
	.itemClass{  
		width: 618upx;
		height: 110upx;
		margin-left: 40upx;
		margin-top: 0upx;
		
	}
	.codeClass{  //证件
		margin-top: 20upx;
		margin-left: 3.33%;
		font-size:32upx;
		font-family:Source Han Sans SC;
		font-weight:400;
		color:#2C2D2D;
		//font-weight: bold;
	}
	
	.fontStyle{   //文字样式
		color: #2C2D2D;
		font-size: 30upx;
		position: absolute;
		left: 9%;
		line-height: 108upx;
	}

	.personClass{	//是否为本人
		width: 93.07%;
		height: 110upx;
		background-color: #FFFFFF;
		margin-top: 20upx;
		margin-left: 3.47%;
		border-radius: 25upx;
	}
	
	.noticeClass{
		width: 85%;
		margin-top: 20upx;
		margin-left: 7.47%;
		margin-bottom: 150upx;
		border-radius: 25upx;
		font-size: 28upx;
		font-weight: 500;
		margin-bottom: 150upx;
		color: #FC4646;//#ff9e2e 备用色
	}
	
	// .emergencyClass{	//是否为紧急联系人
	// 	width: 93.07%;
	// 	height: 110upx;
	// 	background-color: #FFFFFF;
	// 	margin-top: 20upx;
	// 	margin-left: 3.47%;
	// 	margin-bottom: 150upx;
	// 	border-radius: 25upx;
	// }
	.btndelete{	//重置
		width: 40%;
		height: 108upx;
		position: fixed;
		bottom: 0upx;
		left: 0%;
		border-radius: 0upx;
		text-align: center;
		line-height: 108upx;
		font-size: 35upx;
	}
	.btnsubmit{		//保存
		width: 60%;
		height: 108upx;
		position: fixed;
		bottom: 0upx;
		left: 40%;
		border-radius: 0upx;
		text-align: center;
		line-height: 108upx;
		font-size: 35upx;
	}
	.inputClass{
		position: absolute;
		width: 50%;
		height: 108upx;
		font-size: 32upx;
		right: 9%;
		line-height: 108upx;
		text-align: right;
	}
	.checkBox{ 
		line-height: 108upx;
		position: absolute;
		right: 9%;
	}
	.borderTop{  
		border-top: 1upx solid #F5F5F5;
	}
	.frontClass{  //证件正面
		width: 93.07%;
		height: 440upx;
		margin-top: 20upx;
		margin-left: 3.47%;
		// border: 1upx solid #EAEAEA;
		background-color: #FFFFFF;
		border-radius: 25upx;
		position: relative;
	}
	.backClass{ //证件主页
		width: 93.07%;
		height:	440upx;
		margin-top: 20upx;
		margin-left: 3.47%;
		// border: 1upx solid #EAEAEA;
		background-color: #FFFFFF;
		border-radius: 25upx;
		position: relative;
	}
	.addClass{	//添加图片
		width: 100upx;
		height: 100upx;
		position: absolute;
		left: 42%;
		top:150upx;
	}
	.fontClass{		//字体（证件）
		text-align: center;
		width: 100%;
		font-size: 32upx;
		position: absolute;
		top:270upx;
		color:#cdcdcd;
	}
	.proveClass{	//额外凭证
		font-size: 32upx;
		height: 108upx;
		line-height: 108upx;
		// margin-top: -53upx;
		// margin-left: 39%;
		//color: #ff0000;
		text-align: center;
	}
	.imgClass{
		width: 100%;
		height: 440upx;
		border-radius: 25upx;
	}
	.auditClass{ //审核的背景图
		position: absolute;
		right: 0upx;
		top: 0;
		width: 100upx;
		height: 30upx;
	}
	.stateClass{	//审核状态的文字样式
		position: absolute;
		left: 20upx;
		top: 0;
		//width: 112upx;
		height: 52upx;
		line-height: 52upx;
		font-size: 32upx;
		color: #ff0000;
	}
</style>
