<template>
	<view class="myView">
		<view class="headerClass">
		</view>

		<!-- 内容 -->
		<view class="np_content">
			<!-- 顶部订单信息 -->
			<view class="np_ct_orderCommonClass">
				<view class="np_ct_occ_ticketInfoClass">

					<!-- 时间-价格 -->
					<view class="np_ct_occ_ti_timePrice">
						<view class="textCLass1">{{turnDate(ticketDetail.setTime)}}出发</view>
						<view class="textCLass2">全票￥{{ticketDetail.fare}}</view>
					</view>

					<!-- 站点-余票 -->
					<view class="np_ct_occ_ti_siteRemainingTickets">
						<text class="textCLass1">{{ticketDetail.lineName}}</text>
						<text class="textCLass2">半票￥{{ticketDetail.halfTicket}}</text>
					</view>

					<!-- 车型-儿童半价 -->
					<view class="np_ct_occ_ti_model">
						<view class="textCLass1">{{ticketDetail.carType}}&nbsp;&nbsp;{{ticketDetail.planScheduleCode}}</view>
						<view class="textCLass2">余{{ticketDetail.remainingVotes}}张</view>
					</view>
				</view>
			</view>

			<!-- 地图标点 -->
			<!-- <view class="np_ct_mapPunctuation" v-if="ticketDetail.shuttleType == '定制班车'" @click="checkLocation">
				<view class="np_ct_mp_title">地图标点</view>
				<view class="np_ct_mp_text">
					<view class="textClass">查看班次信息</view>
					<image class="imageClass" src="../../../../static/ZXGP/right.png"></image>
				</view>
			</view> -->

			<!-- 查看所有途经点 -->
			<view class="np_ct_routeSite" @tap="approachPoint">
				<view class="np_ct_rs_title">查看所有途经站</view>
				<view class="np_ct_rs_text">
					<view class="textClass">{{routeSite.length}}个站点</view>
					<image class="imageClass" src="../../../../static/ZXGP/right.png"></image>
				</view>
			</view>

			<!-- 上下车点选择,0是普通购票不显示上下车点选择 -->
			<!-- v-if="ticketDetail.shuttleType == '定制班车'" -->
			<!-- <view class="np_ct_stationContentView" v-if="ticketDetail.shuttleType == '普通班车' && highSpeed!=='(高速)'">
				<view class="np_ct_sc_boarding" @tap="stationTap">
					<view class="np_ct_sc_bd_title">下车点</view>
					<view class="np_ct_sc_bd_text">
						<view class="endStationClass">{{endStation}}</view>
						<image class="imageClass" src="../../../../static/ZXGP/right.png"></image>
					</view>
				</view>
			</view> -->

			<!-- 上下车点选择,0是普通购票不显示上下车点选择 -->
			<!-- v-if="ticketDetail.shuttleType == '定制班车'" -->
			<view class="np_ct_stationContentView" v-if="ticketDetail.shuttleType == '定制班车'">
				<view class="np_ct_sc_boarding" style="border-bottom:#EAEAEA solid 1px;" @tap="stationTap">
					<view class="np_ct_sc_bd_title">上车点</view>
					<view class="np_ct_sc_bd_text">
						<view class="endStationClass">{{startStation}}</view>
						<image class="imageClass" src="../../../../static/ZXGP/right.png"></image>
					</view>
				</view>
				<view class="np_ct_sc_boarding" @tap="stationTap">
					<view class="np_ct_sc_bd_title">下车点</view>
					<view class="np_ct_sc_bd_text">
						<view class="endStationClass">{{endStation}}</view>
						<image class="imageClass" src="../../../../static/ZXGP/right.png"></image>
					</view>
				</view>
			</view>

			<!-- 乘车人信息 -->
			<view class="np_ct_Passengers">
				<view class="np_ct_pe_title">乘车人信息</view>
				<view class="np_ct_pe_text">
					<!-- <button @tap="addPassenger('成人')" class="button_1"  style="border: #AAAAAA 1px solid;padding: 0 40rpx;height: 66upx;align-items: center;font-size: 25upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;">添加成人/儿童</button> -->
					<button @tap="pickPassenger" class="button_1" style="border: #AAAAAA 1px solid;font-size: 25upx; color:#2C2D2D ;text-align: center;background: #FFFFFF; padding: 8upx 120upx;">选择乘客</button>
					<!-- <button @tap="addPassenger('免童')" class="button_1" style="border: #AAAAAA 1px solid;font-size: 25upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;margin-left: 22upx;">携带免童</button> -->
				</view>
				<view class="np_ct_pe_passengerInformation" v-for="(items,index) in passengerInfo" :key=index v-model="passengerInfo">
					<view class="np_ct_pe_pi_passengerInfoDetail">
						<view class="np_ct_pe_pi_pi_content">
							<view class="delete">
								<image class="imageClass" src="../../../../static/ZXGP/delete.png" @click="deleteInfo(index)"></image>
							</view>
							<view class="content">
								<view class="contentView">
									<text class="textClass">{{items.userName}}</text>
									<view class="viewClass">{{items.userType}}</view>
								</view>
								<view class="IDinformation">
									<text class="textClass">身份证</text><text>{{items.userCodeNum}}</text>
								</view>
							</view>
						</view>
						<view>
							<image class="imageRight" src="../../../../static/ZXGP/right.png"></image>
						</view>
					</view>
				</view>
			</view>

			<!-- 优惠券 -->
			<view class="np_ct_coupon" @click="toggleMask" v-if="false">
				<view class="np_ct_cp_title">优惠券</view>
				<view class="np_ct_cp_text">
					<view class="viewClass">{{couponIndex}}</view>
					<image class="imageClass" src="../../../../static/ZXGP/right.png"></image>
				</view>
			</view>

			<!-- 乘车险 -->
			<view class="orderCommonClass">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 28upx;">购买乘车险</view>
					<view style="margin-left: 16upx;color:#FC4B4B ; font-size:24upx ;">{{InsurePrice}}元</view>
				</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view style="font-size: 28upx;color: #2C2D2D;">{{passengerNum}}份</view>
					<radio class="Mp_box" value="1" :color="'#01aaef'" :checked="isInsurance===1 ? true : false" @click="insuranceTap"></radio>
				</view>
			</view>

			<!-- 上门服务 -->
			<view class="orderCommonClass" v-if="pickUp_Display == true">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 28upx;">上门接客服务</view>
					<view style="margin-left: 16upx;color:#FC4B4B ; font-size:24upx; margin-top: 6upx;">{{pickUp_Price}}元</view>
					<view style="margin-left: 16upx;color:#01aaef ; font-size:24upx; margin-top: 6upx;" @click="pickUpPoint">查看服务</view>
					<u-popup v-model="pickUp_popup" mode="bottom">
						<view class="boxView">
							<view class="titleView">
								<text class="Nb_text1">接送服务须知</text>
							</view>
							<scroll-view class="noticeBox" scroll-y="ture">
								<rich-text class="Nb_text4" :nodes="pickUpWay"></rich-text>
							</scroll-view>
						</view>
					</u-popup>
				</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<radio class="Mp_box" value="1" :color="'#01aaef'" :checked="pickUp_Status" @click="pickUpClick"></radio>
				</view>
			</view>

			<!-- 选择接送上车点 -->
			<view class="orderCommonClass" v-if="pickUp_Display == true" :hidden="pickUp_Status == false" @click="pickUpAddress">
				<view style="display: flex; align-items: center; margin-left: 41upx;">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #888888;font-size: 26upx;">接送上车点：</view>
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #01aaef;font-size: 26upx;">{{pickUp_Address}}</view>
				</view>
			</view>

			<!-- 点击预订同意购票须知 -->
			<view style="display: flex;font-size: 24upx;margin:0 46upx;color: #808080;margin-left: 16%;margin-bottom: 140upx;">点击立即预定表示已阅读并同意<view
				 style="font-size: 24upx;color: #01aaef;" @tap="checkAttention"> 《购票须知》</view>
			</view>

			<view class="toPayClass">
				<view style="display: flex;align-items: center;margin-left: 32upx;">
					<text style="font-size: 38upx;color: #FC4646;padding: 0;">￥{{totalPrice}}</text>
					<text style="font-size: 28upx;margin-left: 9upx;font-family:SourceHanSansSC-Light; font-weight: lighter;color: #666666;padding: 0;">共{{passengerNum}}人</text>
				</view>
				<view @tap="reserveTap" class="orderReserve" :class="{tapColor:totalPrice !== 0}">立即预定</view>
			</view>
		</view>

		<!-- 呼出优惠券面板 -->
		<popup type="bottom" ref="popup">
			<view class="discountView">
				<!-- 头部 -->
				<view class="couponTitle">
					<text class="Co_text1">优惠券</text>
					<text class="Co_text2" @click="couponReset">不使用优惠券</text>
				</view>

				<!-- 优惠券列表 -->
				<scroll-view scroll-y="true" class="discountScroll">

					<view class="coupon-item" v-for="(item,index) in couponList" :key="index" @tap="couponEvent">
						<view class="con">
							<view class="left">
								<text class="title">{{item.title}}</text>
								<text class="time">有效期至2019-06-30</text>
							</view>

							<view class="right">
								<text class="price">{{item.price}}</text>
								<text>满{{couponList[index].condition}}可用</text>
							</view>

							<view class="circle l"></view>
							<view class="circle r"></view>
						</view>
						<text class="tips">限新用户使用</text>
					</view>

				</scroll-view>

			</view>
		</popup>


		<!-- 旅客须知 -->
		<u-popup v-model="notice_popup" mode="bottom">
			<view class="boxView">
				<view class="titleView">
					<text class="Nb_text1">购票须知</text>
				</view>
				<scroll-view class="noticeBox" scroll-y="ture">
					<rich-text class="Nb_text4" :nodes="way"></rich-text>
				</scroll-view>
			</view>
		</u-popup>

		<!-- 查看须知popup -->
		<popup ref="popup3" type="center">
			<view class="boxView2">
				<view class="titleView2">
					<text class="Nb_text3">所有途经站</text>
					<text class="Nb_text4 jdticon icon-fork " @click="close2(3)"></text>
				</view>
				<scroll-view class="noticeBox2" scroll-y="ture">
					<view class="tv_title">
						<view style="padding-left: 20upx;padding-top: 48upx;" v-for="(item,index) in routeSite" :key="index">
							<image src="../../../../static/ZXGP/startDot.png" style="width: 20upx ;height: 20upx;"></image>
							<text class="ti_text">{{item}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</popup>
	</view>
</template>

<script>
	import popup from "@/pages_ZXGP/components/ZXGP/uni-popup/uni-popup.vue";
	export default {
		components: {
			popup
		},
		data() {
			return {
				way: '', //购票须知
				pickUpWay: '', //接送须知
				title: '',
				count: 1,
				startStation: '', //定制班车上车点
				endStation: '', //定制班车下车点
				indexArray: [], //下标数组
				startStaionIndex: '',
				endStationIndex: '',
				passengerInfo: [], //乘车人数组
				couponList: [{
					couponID: '0',
					title: '新用户专享优惠券',
					price: 5,
					condition: 10,
				}],
				couponIndex: '请选择优惠券', //优惠券默认内容
				couponColor: '', //优惠券couponID，大于等于0触发价格判断事件
				couponCondition: '', //优惠券的满足条件值
				isInsurance: 1, //默认选择乘车险
				maskState: 0, //优惠券面板显示状态
				ticketDetail: [], //车票详情数据
				totalPrice: 0, //车票总价格
				passengerNum: 0, //乘车人数量
				shuttleType: '', //班车类型'定制班车''普通班车'
				sepecialStartArray: [], //定制班车起点数组
				specialEndArray: [], //定制班车终点数组
				InsurePrice: '0', //保险价格
				adultNum: 0, //成人数
				applyName: '',
				mainArray: [],
				approachPoint1: '', //终点
				approachPoint2: '', //起点
				routeSite: [], //途径点
				selectRoutePoint: [], //普通班车下车点
				ordinaryBoarding: '', //普通班车上车点
				appName: '',
				highSpeed: '', //高速
				pickUp_Display: true, //接送服务是否显示
				pickUp_Price: 4, //上门默认价格，用于显示
				pickUpPersonPrice: 0, //用于算法和传值的价格
				pickUp_Status: false, //默认开启
				pickUp_Address: '请选择接送上车点', //接送点
				pickUp_Latitude: 0, //接送点纬度
				pickUp_Longitude: 0, //接送点经度
				StartStaion_Latitude: 0, //始发站点纬度
				StartStaion_Longitude: 0, //始发站经度
				PickUpCenter: '', //中心经纬度地名
				PickUpCenterLat: 0, //中心经度
				PickUpCenterLon: 0, //中心纬度
				PickUpRange: 0, //半径范围

				pickUp_popup: false, //弹出服务内容
				notice_popup: false, //弹出服务内容
			}
		},

		onLoad: function(e) {
			var that = this;
			//加载应用名称
			that.applyName = that.$oSit.Interface.system.applyName;
			that.appName = that.$oSit.Interface.system.appName;
			that.startStation = '', //定制班车上车点
				that.endStation = '', //定制班车下车点
				console.log(that.endStation)
			uni.setNavigationBarTitle({
				title: '填写订单'
			});
			//---------------------读取班次数据-----------------
			uni.getStorage({
				key: 'ticketDate',
				success: function(data) {
					that.ticketDetail = data.data; //车票信息数组
					that.totalPrice = data.data.fare; //价格
					that.shuttleType = data.data.shuttleType; //班车类型
					that.sepecialStartArray = data.data.starSiteArr; //班车起点数组
					that.specialEndArray = data.data.endSiteArr; //班车终点数组
					that.ordinaryBoarding = data.data.startStaion; //普通班车的起点数据
					that.shuttleType = data.data.shuttleType; //班车类型
					that.InsurePrice = data.data.insurePrice; //保险价格

					// console.log('选择车票的班次数据', that.ticketDetail);
					that.intercept();
					that.calculateTotalPrice(); //执行计算价格
					that.removal(that.ticketDetail);
					that.getpickUpDate();
					// that.getStationData();
					//刚进首页跳转选择上下车点页面（如果是普通班车以及高速就默认下车点）
					// if (that.highSpeed !== '(高速)') {
					// 	uni.showLoading({
					// 		title: '跳转中...'
					// 	})
					// 	that.stationTap();
					// } else {

					// }
				}
			})
			// that.getStationData();
			uni.removeStorage({
				key: 'CTKYStationList',
				success: function(res) {
					console.log('success');
				}
			})
			that.noticeLoadData(); //加载须知
			

		},
		onShow() {
			//读取乘车人信息
			this.userData();
			this.getStationData();
			

		},
		onReady() {

		},
		onUnload() {
			uni.removeStorage({
				key: 'ticketDate',
				success: function(res) {
					console.log('success');
				}
			});
			uni.removeStorage({
				key: 'CTKYStationList',
				success: function(res) {
					console.log('success');
				}
			})
		},
		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData() {
				var that = this;
				uni.getStorage({
					key: 'passengerList',
					success: (res) => {
						that.passengerInfo = res.data;
						//计算价格
						that.calculateTotalPrice();
					}
				});
			},

			//------------------------截取高速------------------------------------------
			intercept: function() {
				//截取(高速)
				var string = this.ticketDetail.lineName;
				var stringlength = string.length;
				var newstring = string.substring(stringlength - 4, stringlength);
				this.highSpeed = newstring;
				console.log('截取', this.highSpeed);
			},

			getStationData() {
				var that = this;
				//-------------------------------读取上下车点缓存-------------------------------
				uni.getStorage({
					key: 'CTKYStationList',
					success: (res) => {
						console.log(res)
						that.startStation = res.data.startStation;
						that.startStaionIndex = res.data.startStationIndex;
						that.endStation = res.data.endStation;
						that.endStationIndex = res.data.endStationIndex;
						console.log(that.startStation)
						console.log(that.startStaionIndex)
						if (that.startStation == '') {
							that.startStation = "请选择上车点"
						}
						if (that.endStation == '') {
							that.endStation = "请选择下车点"
						}
						// if (that.ticketDetail.shuttleType == '普通班车' && that.highSpeed !== '(高速)') {
						// 	that.endStation = that.endStation;
						// }
					},
					fail: () => {
						that.startStation = "请选择上车点"
						that.endStation = "请选择下车点"
					}
				})
			},

			noticeLoadData: function() {
				uni.request({
					url: this.$ky_cpdg.KyInterface.Cs_getByTitle.Url,
					method: this.$ky_cpdg.KyInterface.Cs_getByTitle.method,
					success: (res) => {
						console.log('购票须知', res)
						var data = res.data.data.filter(item => {
							return item.Type == '购票须知';
						})
						this.way = data[0].Body;
						console.log('购票须知2', this.way)
					}
				})

				uni.request({
					url: this.$ky_cpdg.KyInterface.Cs_getByTitle.Url,
					method: this.$ky_cpdg.KyInterface.Cs_getByTitle.method,
					success: (res) => {
						console.log('接送服务须知', res)
						var data = res.data.data.filter(item => {
							return item.Type == '接送服务';
						})
						this.pickUpWay = data[0].Body;
					}
				})
			},

			getpickUpDate: function() {
				var pickUpDate = this.ticketDetail.setTime.replace('T', ' ');
				console.log(pickUpDate)
				// 请求是否有上门服务	
				uni.request({
					url: this.$ky_cpdg.KyInterface.GetIsPickUp.Url,
					method: this.$ky_cpdg.KyInterface.GetIsPickUp.method,
					data: {
						SetOutTime: pickUpDate,
						LineName: this.ticketDetail.lineName,
					},
					success: (res) => {
						console.log('是否接送服务', res)
						if (res.data.status	 == false) {
							this.pickUp_Display = res.data.data.IsPickUp;
							this.pickUp_Price = res.data.data.Price;
							this.pickUp_Status = false;
							this.pickUp_Address = '';
							this.PickUpCenter = res.data.data.PickUpCenter;
							this.PickUpCenterLat = res.data.data.PickUpCenterLat;
							this.PickUpCenterLon = res.data.data.PickUpCenterLon;
							this.PickUpRange = res.data.data.PickUpRange;
							this.calculateTotalPrice();
						} else {
							this.pickUp_Status = true;
							this.pickUp_Display = res.data.data.IsPickUp;
							this.pickUp_Price = res.data.data.Price;
							this.PickUpCenter = res.data.data.PickUpCenter;
							this.PickUpCenterLat = res.data.data.PickUpCenterLat;
							this.PickUpCenterLon = res.data.data.PickUpCenterLon;
							this.PickUpRange = res.data.data.PickUpRange;
							this.getLocation();
							this.calculateTotalPrice();
						}


					}
				})
			},


			//-------------------------------时间转换-------------------------------
			turnDate(date) {
				if (date) {
					var setTime = date.replace('T', ' ');
					var setTime2 = setTime.substr(0, 16);
					return setTime2;
				}
			},
			//-------------------------------点击定制班车上车点-----------------------------
			stationTap: function() {
				//跳转到选择上车点页面
				uni.navigateTo({
					url: '../stationPicker/selectStation'
				})
			},

			//-------------------------------删除乘车人-----------------------------
			deleteInfo(e) {
				console.log(e)
				this.passengerInfo.splice(e, 1)
				this.passengerNum--
				this.calculateTotalPrice();
				if (this.passengerNum == 0) {
					this.totalPrice = 0;
				}
				uni.setStorage({
					key: "passengerList",
					data: this.passengerInfo,
				})
			},
			//-------------------------------显示优惠券面板-----------------------------
			toggleMask() {
				this.$refs.popup.open();
			},
			//-------------------------------优惠券赋值-----------------------------
			couponEvent() {
				console.log('1111111')
			},
			//-------------------------------取消优惠券-----------------------------
			couponReset: function(index) {
				this.couponIndex = '请选择优惠券';
				this.couponColor = '';
				this.$refs.popup.close()
				// this.numberChange();
				// this.toggleMask();
			},
			//-------------------------------选择保险-----------------------------
			insuranceTap: function() {
				if (this.isInsurance == 0) {
					this.isInsurance = 1;
					this.calculateTotalPrice();
				} else {
					this.isInsurance = 0;
					this.calculateTotalPrice();
				}
			},
			//-------------------------------选择保险-----------------------------
			pickUpClick: function() {
				if (this.pickUp_Status == false) {
					this.pickUp_Status = true;
					this.pickUp_Address = '请选择接送上车点';
					this.getLocation();
					this.calculateTotalPrice();
				} else {
					this.pickUp_Status = false;
					this.pickUp_Address = '';
					this.calculateTotalPrice();
				}
			},
			//-------------------------------自动获取接送上车点-------------------------
			getLocation: function() {
				console.log('获取自动定位')
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						console.log('当前经纬度',res)
						let latitude, longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						uni.request({
							url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude +
								'&key=4YNBZ-TXLLD-OF34F-HRHPX-PXVI5-OAFFX',
							header: {
									"Content-Type": "application/text"
								},
							success:(re)=>{
								console.log("中文位置",re)
								var a = this.$ky_cpdg.mathLonLatToDistance(latitude, longitude, this.PickUpCenterLat, this.PickUpCenterLon)
								console.log(re.data.result.address)
								if (a <= this.PickUpRange) {
									this.pickUp_Address = re.data.result.address; //选择的地名
									this.pickUp_Latitude = re.data.result.location.lat; //选择的纬度
									this.pickUp_Longitude = re.data.result.location.lng; //选择的经度
								} else {
									uni.showModal({
										title: '当前默认定位不在范围内',
										content: '您可以手动选择' + '~' + this.PickUpCenter + '~' + '附近，' + this.PickUpRange + '米范围内的正常道路接送点',
										confirmText: '选择',
										confirmColor: '#007AFF',
										success: (res) => {
											// console.log(res)
											if (res.confirm == true) {
												this.pickUpAddress();
											} else {
								
											}
										},
									})
								}
							}
						});
					}
				})
			},
			//-------------------------------选择接送上车点-----------------------------
			pickUpAddress: function() {
				uni.chooseLocation({
					success: (res) => {
						console.log('选择后的上车点数据', res)
						if (res.name == '') {
							uni.showToast({
								title: '请选择并确认相关上车点',
								icon: 'none'
							})
						} else {
							console.log(res.latitude)
							console.log(res.longitude)
							console.log(this.PickUpCenterLat)
							console.log(this.PickUpCenterLon)
							var a = this.$ky_cpdg.mathLonLatToDistance(res.latitude, res.longitude, this.PickUpCenterLat, this.PickUpCenterLon)
							console.log(a)
							if (a <= this.PickUpRange) {
								this.pickUp_Address = res.name; //选择的地名
								this.pickUp_Latitude = res.latitude; //选择的纬度
								this.pickUp_Longitude = res.longitude //选择的经度
							} else {
								uni.showModal({
									title: '您选择的接送点不在范围内',
									content: '请选择' + '~' + this.PickUpCenter + '~' + '附近，' + this.PickUpRange + '米范围内的正常道路接送点',
									confirmText: '重选',
									confirmColor: '#007AFF',
									success: (res) => {
										// console.log(res)
										if (res.confirm == true) {
											this.pickUpAddress();
										} else {

										}
									},
								})
							}



						}

					}
				})

			},

			//-------------------------------查看须知-----------------------------
			checkAttention: function() {
				this.notice_popup = true;
			},
			close(e) {
				this.$refs.popup2.close()
			},

			approachPoint() {
				this.$refs.popup3.open()
			},

			close2(e) {
				this.$refs.popup3.close()
			},

			pickUpPoint: function() {
				this.pickUp_popup = true;
			},
			//-------------------------------跳转到地图标点-----------------------------
			checkLocation() {
				var that = this;
				uni.navigateTo({
					url: '../MapMark/specialMark?specialArray=' + JSON.stringify(this.ticketDetail)
				})
				// // #ifdef MP-WEIXIN
				// uni.showModal({
				// 	content:'小程序暂不支持地图显示',
				// 	showCancel:false,
				// })
				// // #endif

				// // #ifndef MP-WEIXIN
				// uni.navigateTo({
				// 	url: '../MapMark/specialMark?specialArray=' + JSON.stringify(this.ticketDetail)
				// })
				// // #endif

				// if (that.ticketDetail.starSiteArr && that.ticketDetail.endSiteArr) {
				// 	if (this.ticketDetail.shuttleType == '普通班车') { //普通班车
				// 		uni.navigateTo({
				// 			url: '../MapMark/traditionCarMark?traditionArray=' + JSON.stringify(this.ticketDetail)
				// 		})
				// 	} else if (this.ticketDetail.shuttleType == '定制班车') { //定制班车

				// 	}
				// }
			},
			//-------------------------------选择乘客-----------------------------
			pickPassenger() {
				uni.getStorage({
					key: 'userInfo',
					fail() {
						uni.showToast({
							icon: 'none',
							title: '未登录无法选择乘车人,请先登录'
						})
						// #ifdef APP-PLUS
						setTimeout(function() {
							uni.navigateTo({
								//loginType=1,泉运登录界面
								//loginType=2,今点通登录界面
								//loginType=3,武夷股份登录界面
								url: '/pages/GRZX/userLogin?loginType=1',
							})
						}, 500);
						//#endif
						//#ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/GRZX/wxAuthorize',
						})
						// #endif
					},
					success() {
						//跳转到选择乘客页面
						uni.navigateTo({
							url: '/pages/GRZX/passengerInfo?submitType=1',
						})
					}
				})
			},
			//点击携带儿童
			addPassenger(param) {
				uni.getStorage({
					key: 'userInfo',
					fail() {
						uni.showToast({
							icon: 'none',
							title: '未登录无法添加儿童,请先登录'
						})
						//#ifdef APP-PLUS
						setTimeout(function() {
							uni.navigateTo({
								//loginType=1,泉运登录界面
								//loginType=2,今点通登录界面
								//loginType=3,武夷股份登录界面
								url: '/pages/GRZX/userLogin?loginType=1'
							})
						}, 500);
						// #endif
						//#ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/GRZX/wxAuthorize',
						})
						// #endif
					},
					success() {
						//跳转到添加乘客页面
						if (param == '成人') {
							uni.navigateTo({
								url: '/pages/GRZX/addPassenger?type=add',
							})
						} else if (param == '免童') {
							uni.navigateTo({
								url: '/pages/GRZX/addFreeChildren?type=add',
							})
						}

					}
				})

			},
			//-------------------------------计算总价格-----------------------------
			calculateTotalPrice() {
				var that = this;
				//儿童票数量
				let childNum = 0;
				//成年票数量
				let adultNum = 0;
				//清空乘车人
				that.passengerNum = 0;
				//儿童数组
				let childArray = [];
				//成年数组
				let adultArray = [];
				//车票单价
				let price = that.ticketDetail.fare;
				//半价票单价
				let halfPrice = that.ticketDetail.halfTicket;
				//接送服务单价
				if (that.pickUp_Status == true) {
					that.pickUpPersonPrice = that.pickUp_Price;
				} else {
					that.pickUpPersonPrice = 0;
				}

				// console.log(pickUpPersonPrice)
				let insurePrice = that.InsurePrice;
				if (that.isInsurance == 0) { //不选择保险
					insurePrice = 0;
				}
				//查看乘车人个数
				if (that.passengerInfo.length > 0) {
					for (var i = 0; i < that.passengerInfo.length; i++) {
						that.passengerNum++;
						//把儿童票筛选出来
						if (that.passengerInfo[i].userType == '半票儿童') {
							//将半价儿童票加入数组
							childArray.push(that.passengerInfo[i]);
							childNum++;
						} else if (that.passengerInfo[i].userType == '成人') {
							//将成人票加入数组
							adultArray.push(that.passengerInfo[i]);
							adultNum++;
							that.adultNum = adultNum;
						}
					}
					//计算总价
					that.totalPrice = Number(price) * adultNum + Number(halfPrice) * childNum + Number(insurePrice) * that.passengerNum +
						Number(that.pickUpPersonPrice) * adultNum + Number(that.pickUpPersonPrice) * childNum
				} else {
					//计算总价
					that.totalPrice = Number(price) * adultNum + Number(halfPrice) * childNum + Number(insurePrice) * that.passengerNum +
						Number(that.pickUpPersonPrice) * adultNum + Number(that.pickUpPersonPrice) * childNum
				}
			},

			//-------------------------------------点击订单预定-----------------------------------
			reserveTap() {
				var that = this;
				// if (that.shuttleType == '普通班车') {
				// 	that.startStation = " "
				// 	that.endStation = " "
				// }
				//当选中用户须知且选择了上下车点和乘客之后发送请求
				if (that.ticketDetail.starSiteArr.length > 2 || that.ticketDetail.endSiteArr.length > 2) {
					if (that.startStation == '请选择上车点' && that.endStation == '请选择下车点') {
						uni.showToast({
							title: '滴！请选择上下车点',
							icon: 'none'
						})
					} else if (that.passengerInfo.length == 0) {
						uni.showToast({
							title: '滴！请选择乘车人',
							icon: 'none'
						})
					} else if (that.adultNum == 0) {
						uni.showToast({
							title: '免童/儿童不可单独购票',
							icon: 'none'
						})
					} else if (that.pickUp_Status == true && that.pickUp_Address == '请选择接送上车点') {
						uni.showToast({
							title: '你还没有选择接送服务的上车点哦~',
							icon: 'none'
						})
					} else {
						that.jumpTo();
					}
				} else {
					// if (that.endStation == '请选择下车点' && that.highSpeed !== '(高速)') {
					// 	uni.showToast({
					// 		title: '滴！请选择下车点',
					// 		icon: 'none'
					// 	})
					// } else 
					if (that.passengerInfo.length == 0) {
						uni.showToast({
							title: '滴！请选择乘车人',
							icon: 'none'
						})
					} else if (that.adultNum == 0) {
						uni.showToast({
							title: '免童/儿童不可单独购票',
							icon: 'none'
						})
					} else if (that.pickUp_Status == true && that.pickUp_Address == '请选择接送上车点') {
						uni.showToast({
							title: '你还没有选择接送服务的上车点哦~',
							icon: 'none'
						})

					} else {
						that.jumpTo();
					}
				}
			},
			//-----------------------------------跳转-----------------------------------
			jumpTo() {
				var that = this;
				//计算价格
				that.calculateTotalPrice();
				//请求成功之后跳转到支付页面,传是否选择保险1:选择 0:未选择
				if (that.pickUp_Status == false) {
					that.pickUp_Address = ''
				}
				if (that.ticketDetail.shuttleType == '普通班车') {
					var array = {
						isInsurance: that.isInsurance, //是否选择了保险
						totalPrice: that.totalPrice, //总价格
						shuttleType: that.shuttleType, //班车类型
						getOnPoint: that.startStation, //起点
						getOffPoint: that.ticketDetail.endStation, //终点
						pickUpStatus: that.pickUp_Status, //是否上门服务
						PickUpPrice: that.pickUpPersonPrice, //接送价格
						PickUpAddress: that.pickUp_Address, //接送上车点
						pickUpLatitude: that.pickUp_Latitude, //接送点纬度
						pickUpLongitude: that.pickUp_Longitude, //接送点经度
						StartStaionLatitude: that.ticketDetail.starSiteArr[0].Latitude, //始发站点纬度
						StartStaionLongitude: that.ticketDetail.starSiteArr[0].Longitude, //始发站经度
					}
				} else {
					var array = {
						isInsurance: that.isInsurance, //是否选择了保险
						totalPrice: that.totalPrice, //总价格
						shuttleType: that.shuttleType, //班车类型
						getOnPoint: that.startStation, //起点
						getOffPoint: that.endStation, //终点
						pickUpStatus: that.pickUp_Status, //是否上门服务
						PickUpPrice: that.pickUpPersonPrice, //接送价格
						PickUpAddress: that.pickUp_Address, //接送上车点
						pickUpLatitude: that.pickUp_Latitude, //接送点纬度
						pickUpLongitude: that.pickUp_Longitude, //接送点经度
						StartStaionLatitude: that.ticketDetail.starSiteArr[0].Latitude, //始发站点纬度
						StartStaionLongitude: that.ticketDetail.starSiteArr[0].Longitude, //始发站经度
					}
				}
				console.log(array)
				uni.navigateTo({
					url: '../PayMent/orderPayment?array=' + JSON.stringify(array)
				})
			},

			//------------------------计算途径点----------------------------------
			removal: function(e) {
				//****途径站点(用于查询所有途径点)****//
				var routeSite = e.lineViaSiteDesc.split(",");
				this.routeSite = routeSite
				console.log('分割', this.routeSite)

				//筛选普通班车下车点途径站点
				var d = [];
				d = routeSite.slice();
				// a = c;
				this.selectRoutePoint = d; //终点
				// this.approachPoint1.shift();
				for (var i = 0; i < this.selectRoutePoint.length; i++) {
					if (this.selectRoutePoint[i] == this.ticketDetail.startStaion) {
						this.selectRoutePoint.splice(i, 1);
						i = i - 1;
					}
				}

				console.log('分割下车点', this.selectRoutePoint)
			},
		}
	}
</script>

<style lang="scss">
	page,
	.myView {
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}

	.headerClass {
		z-index: 1;
		width: 100%;
		height: 140upx;
		background: #FC4646;
	}

	.np_content {
		position: absolute;
		z-index: 4;
		top: 34upx;

		.np_ct_orderCommonClass {
			background: #FFFFFF;
			border-radius: 14upx;
			margin: 0 26upx;
			margin-bottom: 20upx;
			display: flex;
			justify-content: space-between;

			.np_ct_occ_ticketInfoClass {
				width: 700upx;
				text-align: left;
				padding: 28upx 29upx;

				.np_ct_occ_ti_timePrice {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.textCLass1 {
						font-family: MicrosoftYaHei;
						font-weight: 400;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-bottom: 10upx;
						font-size: 28upx;
						color: #333333;
					}

					.textCLass2 {
						font-family: MicrosoftYaHei;
						font-weight: 400;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-bottom: 10upx;
						font-size: 28upx;
						color: #FC4646;
					}
				}

				.np_ct_occ_ti_siteRemainingTickets {
					display: flex;

					.textCLass1 {
						font-family: MicrosoftYaHei;
						font-weight: 400;
						margin-bottom: 10upx;
						font-size: 32upx;
						color: #333333;
						width: 488upx;
						margin-right: 18upx;
					}

					.textCLass2 {
						font-family: MicrosoftYaHei;
						font-weight: 400;
						margin-bottom: 10upx;
						font-size: 28upx;
						width: 140upx;
						color: #FC4646;
						text-align: right;
					}
				}

				.np_ct_occ_ti_model {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.textCLass1 {
						font-family: MicrosoftYaHei;
						font-weight: 400;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-bottom: 10upx;
						font-size: 24upx;
						color: #999999;
					}

					.textCLass2 {
						font-family: MicrosoftYaHei;
						font-weight: 400;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-bottom: 10upx;
						font-size: 24upx;
						font-style: SourceHanSansSC-Light;
						color: #666666;
					}
				}
			}
		}

		.np_ct_mapPunctuation {
			background: #FFFFFF;
			border-radius: 14upx;
			margin: 0 26upx;
			margin-bottom: 20upx;
			display: flex;
			justify-content: space-between;

			.np_ct_mp_title {
				margin-left: 41upx;
				margin-top: 35upx;
				margin-bottom: 35upx;
				font-size: SourceHanSansSC-Regular;
				color: #2C2D2D;
				font-size: 30upx;
			}

			.np_ct_mp_text {
				display: flex;
				margin-right: 41upx;
				align-items: center;

				.textClass {
					font-size: 28upx;
					font-family: SourceHanSansSC-Light;
					color: #999999;
				}

				.imageClass {
					width: 11upx;
					height: 21upx;
					margin-left: 10upx;
				}
			}
		}

		.np_ct_routeSite {
			background: #FFFFFF;
			border-radius: 14upx;
			margin: 0 26upx;
			margin-bottom: 20upx;
			display: flex;
			justify-content: space-between;

			.np_ct_rs_title {
				margin-left: 41upx;
				margin-top: 35upx;
				margin-bottom: 35upx;
				font-size: SourceHanSansSC-Regular;
				color: #2C2D2D;
				font-size: 30upx;
			}

			.np_ct_rs_text {
				display: flex;
				margin-right: 41upx;
				align-items: center;

				.textClass {
					font-size: 28upx;
					font-family: SourceHanSansSC-Light;
					color: #999999;
				}

				.imageClass {
					width: 11upx;
					height: 21upx;
					margin-left: 10upx;
				}
			}
		}

		.np_ct_stationContentView {
			flex-direction: column;
			background: #FFFFFF;
			margin: 0 26upx;
			margin-bottom: 20upx;
			border-radius: 14upx;

			.np_ct_sc_boarding {
				background: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 41upx;
				margin-right: 41upx;

				.np_ct_sc_bd_title {
					margin-top: 35upx;
					margin-bottom: 35upx;
					font-size: SourceHanSansSC-Regular;
					color: #2C2D2D;
					font-size: 30upx;
				}

				.np_ct_sc_bd_text {
					display: flex;
					align-items: center;

					.endStationClass {
						font-size: 28upx;
						font-family: SourceHanSansSC-Light;
						color: #999999;
						text-align: right;
					}

					.imageClass {
						width: 11upx;
						height: 21upx;
						margin-left: 10upx;
					}
				}
			}
		}

		.np_ct_Passengers {
			background: #FFFFFF;
			border-radius: 14upx;
			margin: 0 26upx;
			margin-bottom: 20upx;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			padding-bottom: 25upx;

			.np_ct_pe_title {
				margin-top: 35upx;
				margin-bottom: 35upx;
				margin-left: 41upx;
				font-size: SourceHanSansSC-Regular;
				color: #2C2D2D;
				font-size: 30upx;
			}

			.np_ct_pe_text {
				display: flex;
				margin-bottom: 35upx;

			}

			.np_ct_pe_passengerInformation {
				flex-direction: column;
				background: #FFFFFF;

				.np_ct_pe_pi_passengerInfoDetail {
					border-bottom: 1upx solid #DADADA;
					margin-left: 33upx;
					margin-right: 33upx;
					//position: absolute;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.np_ct_pe_pi_pi_content {
						display: flex;
						text-align: center;
						align-items: center;

						.delete {
							width: 73upx;

							.imageClass {
								width: 34upx;
								height: 34upx;
							}
						}

						.content {
							height: 100%;

							.contentView {
								display: flex;
								margin-top: 18upx;
								margin-bottom: 18upx;

								.textClass {
									font-size: 32upx;
									color: #333333;
									padding: 0;
									padding-right: 24upx;
								}

								.viewClass {
									background: #EBEBEB;
									font-size: 18upx;
									border-radius: 24upx;
									width: 100upx;
									height: 37upx;
									line-height: 37upx;
									text-align: center;
								}
							}
						}

						.IDinformation {
							display: flex;
							font-size: 28upx;
							color: #999999;
							margin-top: 18upx;
							margin-bottom: 18upx;

							.textClass {
								margin-right: 20upx;
							}
						}
					}

					.imageRight {
						width: 12upx;
						height: 21upx;
					}
				}
			}
		}

		//优惠券
		.np_ct_coupon {
			background: #FFFFFF;
			border-radius: 14upx;
			margin: 0 26upx;
			margin-bottom: 20upx;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			padding-bottom: 25upx;

			.np_ct_cp_title {
				margin-left: 41upx;
				margin-top: 35upx;
				margin-bottom: 35upx;
				font-size: SourceHanSansSC-Regular;
				color: #2C2D2D;
				font-size: 30upx;
			}

			.np_ct_cp_text {
				display: flex;
				margin-right: 41upx;
				align-items: center;

				.viewClass {
					font-size: 28upx;
					font-family: SourceHanSansSC-Light;
					color: #999999;
				}

				.imageClass {
					width: 11upx;
					height: 21upx;
					margin-left: 10upx;
				}
			}
		}
	}


	//下弹框标题
	.couponTitle {
		padding: 40upx;
		padding-bottom: 16upx;

		.Co_text1 {
			font-size: 38upx;
			font-weight: bold;
		}

		.Co_text2 {
			margin-top: 8upx;
			float: right;
			color: #f85e52;
			font-size: 28upx;
		}
	}

	//须知弹框
	.boxView {
		width: 100%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
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
			min-height: 30vh;
			max-height: 70vh;
			line-height: 32upx;

			.Nb_text3 {
				display: block;
				margin-top: 32upx;
				font-size: 34upx;
				font-weight: bold;
			}

			.Nb_text4 {
				display: block;
				line-height: 64upx;
				margin: 32upx 0;
				font-size: 30upx;
			}
		}
	}

	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		bottom: 100rpx;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: #f85e52;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: #999999;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999999;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: #f85e52;

			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: #999999;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}

	.ticketInfoClass {
		width: 700upx;
		text-align: left;
		padding: 28upx 29upx;
	}

	.passengerInfoDetail {
		border-bottom: 1upx solid #DADADA;
		margin-left: 33upx;
		margin-right: 33upx;
		//position: absolute;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	//取票电话、优惠券、购买乘车险通用块
	.commonClass {
		margin-top: 10upx;
		margin-bottom: 10upx;
		width: 100%;
		height: 110upx;
		padding-left: 31upx;
		padding-right: 31upx;
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}

	.toPayClass {
		width: 100%;
		height: 112upx;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		// z-index: 1010;
		background: #FFFFFF;
		justify-content: space-between;
	}



	//上下车点
	.boarding {
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 41upx;
		margin-right: 41upx;
	}

	.Mp_box {
		float: right;
		position: relative;
		bottom: 6upx;
		right: -12upx;
	}

	//预定
	.orderReserve {
		width: 45%;
		height: 112upx;
		color: #FFFFFF;
		background: #aaa;
		font-size: 32upx;
		line-height: 112upx;
		text-align: center;

		&.tapColor {
			background: #FC4646;
		}
	}

	//途径点弹框
	.boxView2 {
		width: 100%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;
		border-radius: 20upx;
		z-index: 999;

		.titleView2 {
			margin: 24upx 0;
			text-align: center;
			width: 560upx;

			//弹框标题
			.Nb_text3 {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
				margin-bottom: 16upx;
			}

			//弹框关闭按钮
			.Nb_text4 {
				margin-top: 8upx;
				float: right;
				color: #333;
				padding-top: 16upx;
				font-size: 32upx;
			}
		}

		.noticeBox2 {
			line-height: 32upx;
			height: 586upx;

			.tv_title {
				display: block;
				width: 100%;

				.ti_text {
					padding-left: 20upx;
					font-size: 30upx;
				}
			}
		}
	}

	.button_1::after {
		border: none;
	}

	//订单提交通用块
	.orderCommonClass {
		background: #FFFFFF;
		border-radius: 14upx;
		margin: 0 26upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content: space-between;
	}

	//订单提交通用块
	.ticketContent {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	//订单提交通用块
	.textCLass {
		font-family: MicrosoftYaHei;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 10upx;
	}

	// 上下车点选择
	.stationContentView {
		flex-direction: column;
		background: #FFFFFF;
		margin: 0 26upx;
		margin-bottom: 20upx;
		border-radius: 14upx;
	}

	/* 优惠券面板 */
	.discountView {
		min-height: 30vh;
		max-height: 70vh;
		width: 100%;
		background: #f3f3f3;
		margin-bottom: 100rpx;
	}

	//优惠券
	.discountScroll {
		min-height: 30vh;
		max-height: 60vh;
		width: 100%;
	}
</style>
