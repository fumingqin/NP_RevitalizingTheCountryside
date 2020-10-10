<template>
	<view class="content">
		<view class="itemClass mm">
			<text class="fontClass">手机号码</text>
			<text class="fontClass mb">{{phone}}</text>
		</view>
		<view class="itemClass">
			<text class="fontClass">验证码</text>
			<view class="boxClass">
				<input type="number" v-model="code" maxlength="4" placeholder="请输入验证码" class="inputClass1"/>
				<view class="getcode">
					获取验证码
				</view>
			</view>
		</view>
		<view class="itemClass bb">
			<text class="fontClass">校验码</text>
			<input v-model="checkcode" placeholder="请输入校验码" class="inputClass2"/>
		</view>
		
		<text class="btnClass btn_background">完成</text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				phone:'158****9877',	//手机号码
				code:'',				//验证码
				checkcode:'',			//校验码
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			//---------------------------返回---------------------------
			back(){
				uni.navigateBack();
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.content{
		display: flex;
		flex-direction: column;
	}
	.mm{
		margin-top: 2upx;
	}
	.itemClass{
		display: flex;
		flex-direction: column;
		border-top:1upx solid #EAEAEA;
		background-color: #ffffff;
		font-size: 32upx;
		.fontClass{
			margin: 30upx 5% 0 5%;
		}
		.mb{
			margin-bottom: 30upx;
		}
		.boxClass{
			display: flex;
			flex-direction: row;
			margin: 30upx 5% 30upx 5%;
		}
		.inputClass1{
			
		}
		.getcode{
			margin-left: 20%;
		}
		.inputClass2{
			margin: 30upx 5%  30upx 5%;
		}
	}
	.bb{
		border-bottom:1upx solid #EAEAEA;
	}
	
	.btnClass{
		position: fixed;
		bottom: 20upx;
		left: 5%;
		width: 90%;
		padding: 20upx 0;
		color: #FFFFFF;
		text-align: center;
		border-radius: 15upx;
		font-size: 34upx;
	}	
</style>
