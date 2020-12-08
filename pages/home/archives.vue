<template>
	<view>
		<view class="map_view" :style="{'height':viewHeight}" >
			<image class="map_view_image" :style="{'height':imageHeight}" src="../../static/home/archives/bj.png" mode="aspectFill"></image>
			<movable-area style="z-index: 2;">
				<movable-view style="width: 1342upx; height:800upx;" scale-min="0.5" scale-max="2" scale="true" inertia="true"
				 direction='all' scale-value="0.5">
					<image class="movable_view_iamge" src="../../static/home/archives/ditu.png"></image>
					
					<view v-if="iponeModelStats == false">
						<view v-for="(item,index) in ruralList" :key="index" @click="ruralClick(item.name,index)" >
							<view style="display: flex;" :class="item.fixed" v-if="item.iconSatus == false">
								<image class="movable_view_Sign_iamge" src="../../static/home/archives/zhen.png" mode="aspectFit" v-if="item.nameType == '镇'"></image>
								<image class="movable_view_Sign_iamge" src="../../static/home/archives/xiang.png" mode="aspectFit" v-if="item.nameType == '村'"></image>
								<text class="movable_view_Sign_text" style="color: #FFFFFF;">{{item.name}}</text>
							</view>
							<view style="display: flex;" :class="item.fixed" v-if="item.iconSatus == true">
								<image class="movable_view_Sign_iamge" src="../../static/home/archives/zhen2.png" mode="aspectFit" v-if="item.nameType == '镇'"></image>
								<image class="movable_view_Sign_iamge" src="../../static/home/archives/xiang2.png" mode="aspectFit" v-if="item.nameType == '村'"></image>
								<text class="movable_view_Sign_text" style="color: #44f5ff;">{{item.name}}</text>
							</view>
						</view>
						<view style="display: flex; position: absolute; left: 752upx; top: 832upx;">
							<image class="government_image" src="../../static/home/archives/zhengfu.png" mode="aspectFit"></image>
							<text class="government_text" style="color: #FFFFFF;">人民政府</text>
						</view>
					</view>
					
					<view v-if="iponeModelStats == true">
						<view v-for="(item,index) in ruralList" :key="index" @click="ruralClick(item.name,index)" >
							<view style="display: flex;" :class="item.fixedSpecial" v-if="item.iconSatus == false">
								<image class="movable_view_Sign_iamge" src="../../static/home/archives/zhen.png" mode="aspectFit" v-if="item.nameType == '镇'"></image>
								<image class="movable_view_Sign_iamge" src="../../static/home/archives/xiang.png" mode="aspectFit" v-if="item.nameType == '村'"></image>
								<text class="movable_view_Sign_text" style="color: #FFFFFF;">{{item.name}}</text>
							</view>
							<view style="display: flex;" :class="item.fixedSpecial" v-if="item.iconSatus == true">
								<image class="movable_view_Sign_iamge" src="../../static/home/archives/zhen2.png" mode="aspectFit" v-if="item.nameType == '镇'"></image>
								<image class="movable_view_Sign_iamge" src="../../static/home/archives/xiang2.png" mode="aspectFit" v-if="item.nameType == '村'"></image>
								<text class="movable_view_Sign_text" style="color: #44f5ff;">{{item.name}}</text>
							</view>
						</view>
						<view style="display: flex; position: absolute; left: 752upx; top: 746upx;">
							<image class="government_image" src="../../static/home/archives/zhengfu.png" mode="aspectFit"></image>
							<text class="government_text" style="color: #FFFFFF;">人民政府</text>
						</view>
					</view>
					
					
					
					
				</movable-view>
			</movable-area>
		</view>


		<!-- 搜索区域 -->
		<view class="inf_dis_view">
			<view class="dis_view_tips" style="color: #888888;">注：可通过双指缩放地图大小</view>
			<view class="dis_view_tips" style="color: #19BE6B;">注：可通过点击地图乡村/下方标签查看乡村信息</view>
			<!-- 输入框 -->
			<view class="box_inputView">
				<input class="inputStyle" v-model="contentInputData" type="text" placeholder="请输入关键字,目前仅支持建阳区内乡村" @input="onInput" />
			</view>

			<!-- 搜索列表 -->
			<view class="stationList" :style="{ 'height':scrollHeight }" v-if="SearchStatus">
				<block v-for="(item,index) in keywordList" :key="index">
					<view class="listItem" @click="searchClick(item.village_name)">
						<rich-text :nodes="item.village_name"></rich-text>
					</view>
				</block>
			</view>


			<scroll-view style="margin: 16upx 0;" scroll-x>
				<view style="display: flex;">
					<view class="box_scrollView" v-for="(item,index) in ruralList" :key="index" @click="ruralClick(item.name,index)">
						<text class="scrollView_text" :class="item.status ? 'scrollView_text_color' : ''">{{item.name}}</text>
					</view>
				</view>
			</scroll-view>

			<!-- 查询流程 -->
			<view class="dis_view_view" v-if="loadStatus == true">
				<view class="dis_view_title">{{loadText}}</view>
				<view class="dis_view_text" :hidden="loadIndex < 1">查询乡村：{{loadRuralText}}</view>
				<view class="dis_view_text" :hidden="loadIndex < 2">查询内容：所有</view>
				<view class="dis_view_text" :hidden="loadIndex < 3">查询时长：预计15秒</view>
			</view>

			<!-- 查询成功 -->
			<view class="dis_view_view" v-if="queryStatus == 1">
				<view class="dis_view_title">查询成功，请点击右侧按钮</view>
				<view class="dis_view_text">查询乡村：{{loadRuralText}}</view>
				<view class="dis_view_text">查询内容：所有</view>
				<view class="dis_view_text">祝您游览愉快~！</view>
				<image style="position: absolute; bottom: 8upx; right: 24upx; width:200upx; height: 200upx; z-index: 5;" src="../../static/home/archives/chakan.png"
				 mode="aspectFit" @click="newsShow = true"></image>
			</view>

			<!-- 查询失败 -->
			<view class="dis_view_view" v-if="queryStatus == 2">
				<view class="dis_view_title" style="color: #FA3534;">查询失败，{{contentsText}}</view>
				<view class="dis_view_text">查询乡村：{{loadRuralText}}</view>
				<view class="dis_view_text">查询内容：所有</view>
			</view>
		</view>

		<!-- 打开乡村档案弹框-8个模块内容 -->
		<u-popup v-model="newsShow" mode="bottom" :closeable="true" :safe-area-inset-bottom="true" height="90%" border-radius="16">
			<view>
				<!-- 一村一档 : village -->
				<view style="padding: 24upx;">
					<view class="news_viewTitle">| 乡村档案_{{newsData.village.village_name}}</view>
					<view class="dyn_view" :hidden="newsData.village.village_name == ''">
						<view class="dyn_text">所属市级：{{newsData.village.city_name}}</view>
						<view class="dyn_text">所属县级：{{newsData.village.county_name}}</view>
						<view class="dyn_text">村长姓名：{{newsData.village.head_name}}</view>
						<view class="dyn_text">村长年龄：{{newsData.village.head_age}}岁</view>
						<view class="dyn_text">任职工龄：{{newsData.village.head_year}}年</view>
						<view class="dyn_text">职责人数：{{newsData.village.duty_num}}人</view>
						<view class="dyn_text">总户口数：{{newsData.village.registered_num}}户</view>
						<view class="dyn_text">总人口数：{{newsData.village.total_people}}人</view>
						<view class="dyn_text_view">
							<view>建档时间：{{informationDate(newsData.village.create_time)}}</view>
							<view class="dyn_text_view_text" @click="detailsClick(1,newsData.ruralId)">查看详细档案 ></view>
						</view>
					</view>

					<!-- 缺省提示 -->
					<view class="defaultStyle" v-if="newsData.village.village_name == ''" >
						<text>暂时没有档案哦~</text>
					</view>
				</view>

				<!-- 乡村动态 : dynamic -->
				<view style="padding: 24upx;">
					<view class="news_viewTitle">| 乡村动态</view>
					<view class="infor_view" v-for="(item,index) in newsData.dynamic " :key="index" @click="detailsClick(2,item.id)">
						<view class="view_titleView">
							<text class="tv_view">
								<text class="tv_label">{{item.article_type}}</text>
								<text class="tv_title">{{item.title}}</text>
							</text>
							<image class="tv_image" :src="item.image" mode="aspectFill"></image>
						</view>

						<view class="view_contentView">
							<text>{{item.nick_name}}</text>
							<text class="cont_text">{{item.count}}人看过</text>
							<text class="cont_text">{{informationDate(item.create_time)}}</text>
							<u-icon class="cont_icon" name="more-dot-fill"></u-icon>
						</view>
						<u-gap height="4" bg-color="#f9f9f9"></u-gap>
					</view>

					<!-- 缺省提示 -->
					<view class="defaultStyle" v-if="newsData.dynamic.length == 0">
						<text>暂时没有动态哦~</text>
					</view>
				</view>

				<!-- 乡村政策 : policy  -->
				<view style="padding: 24upx;">
					<view class="news_viewTitle">| 乡村政策</view>
					<view class="infor_view" v-for="(item,index) in newsData.policy " :key="index" @click="detailsClick(3,item.id)">
						<view class="view_titleView">
							<text class="tv_view">
								<text class="tv_label">{{item.introduce}}</text>
								<text class="tv_title">{{item.title}}</text>
							</text>
							<image class="tv_image" :src="item.image" mode="aspectFill"></image>
						</view>

						<view class="view_contentView">
							<text>{{item.nick_name}}</text>
							<!-- <text class="cont_text">{{item.view}}人看过</text> -->
							<text class="cont_text">发布时间：{{informationDate(item.create_time)}}</text>
							<u-icon class="cont_icon" name="more-dot-fill"></u-icon>
						</view>
						<u-gap height="4" bg-color="#f9f9f9"></u-gap>
					</view>

					<!-- 缺省提示 -->
					<view class="defaultStyle" v-if="newsData.policy.length == 0">
						<text>暂时没有信息哦~</text>
					</view>
				</view>

				<!-- 水美经济 : economy  -->
				<view style="padding: 24upx;">
					<view class="news_viewTitle">| 乡村美景</view>
					<view class="infor_view" v-for="(item,index) in newsData.economy " :key="index" @click="detailsClick(4,item.id)">
						<view class="view_titleView">
							<text class="tv_view">
								<text class="tv_label">乡村美景</text>
								<text class="tv_title">{{item.title}}</text>
							</text>
							<image class="tv_image" :src="item.image" mode="aspectFill"></image>
						</view>

						<view class="view_contentView">
							<text>{{item.nick_name}}</text>
							<text class="cont_text">{{item.view}}人看过</text>
							<text class="cont_text">{{informationDate(item.create_time)}}</text>
							<u-icon class="cont_icon" name="more-dot-fill"></u-icon>
						</view>
						<u-gap height="4" bg-color="#f9f9f9"></u-gap>
					</view>

					<!-- 缺省提示 -->
					<view class="defaultStyle" v-if="newsData.economy.length == 0" >
						<text>暂时没有美景哦~</text>
					</view>
				</view>

				<!-- 项目监督 : project  -->
				<view style="padding: 24upx;">
					<view class="news_viewTitle">| 项目监督</view>
					<view class="infor_view" v-for="(item,index) in newsData.project " :key="index" @click="detailsClick(5,item.id)">
						<view class="view_titleView">
							<text class="tv_view">
								<text class="tv_label">项目监督</text>
								<text class="tv_title">{{item.title}}</text>
							</text>
							<image class="tv_image" :src="item.image" mode="aspectFill"></image>
						</view>

						<view class="view_contentView">
							<text>{{item.nick_name}}</text>
							<text class="cont_text">{{item.view}}人看过</text>
							<text class="cont_text">{{item.warnNum}}次警告</text>
							<text class="cont_text">{{informationDate(item.create_time)}}</text>
							<u-icon class="cont_icon" name="more-dot-fill"></u-icon>
						</view>
						<u-gap height="4" bg-color="#f9f9f9"></u-gap>
					</view>

					<!-- 缺省提示 -->
					<view class="defaultStyle" v-if="newsData.project.length == 0">
						<text>暂时没有项目哦~</text>
					</view>
				</view>

				<!-- 生态银行 : ecology -->
				<view style="padding: 24upx;">
					<view class="news_viewTitle">| 乡村生态</view>
					<view class="infor_view" v-for="(item,index) in newsData.ecology " :key="index" @click="detailsClick(6,item.id)">
						<view class="view_titleView">
							<text class="tv_view">
								<text class="tv_label">生态银行</text>
								<text class="tv_title">{{item.title}}</text>
							</text>
							<image class="tv_image" :src="item.image" mode="aspectFill"></image>
						</view>

						<view class="view_contentView">
							<text>{{item.nick_name}}</text>
							<text class="cont_text">{{item.view}}人看过</text>
							<text class="cont_text">{{informationDate(item.create_time)}}</text>
							<u-icon class="cont_icon" name="more-dot-fill"></u-icon>
						</view>
						<u-gap height="4" bg-color="#f9f9f9"></u-gap>
					</view>

					<!-- 缺省提示 -->
					<view class="defaultStyle" v-if="newsData.ecology.length == 0">
						<text>暂时没有信息哦~</text>
					</view>
				</view>

				<!-- 季度考评 : evaluation  -->
				<view style="padding: 24upx;">
					<view class="news_viewTitle">| 季度考评</view>
					<view class="jdkp_view" v-for="(item,index) in newsData.evaluation" :key="index" @click="detailsClick(7,item.id)">
						<view class="jdkp_titleView">
							<text class="jdkp_tv_view">
								<text class="jdkp_tv_label" style="background: #007AFF;" v-if="item.state !== '已取消'">{{item.state}}</text>
								<text class="jdkp_tv_label" style="background: #FA3534;" v-if="item.state == '已取消'">{{item.state}}</text>
								<text class="jdkp_tv_title">{{item.title}}</text>
								<text class="jdkp_tv_content"><text style="font-weight: bold;">乡村名：</text>{{item.rural_name}}</text>
								<text class="jdkp_tv_content"><text style="font-weight: bold;">发布人：</text>{{item.nick_name}}</text>
								<text class="jdkp_tv_content" selectable=""><text style="font-weight: bold;">考评时间：</text>{{informationDate(item.reviewTime)}}</text>
							</text>
						</view>

						<view class="jdkp_view_contentView">
							<text>申请时间：{{informationDate(item.create_time)}}</text>
							<!-- <text class="cont_text"></text> -->
							<u-icon class="jdkp_cont_icon" name="more-dot-fill"></u-icon>
						</view>
						<u-gap height="4" bg-color="#f9f9f9"></u-gap>
					</view>

					<!-- 缺省提示 -->
					<view class="defaultStyle" v-if="newsData.evaluation.length == 0">
						<text>暂时没有考评哦~</text>
					</view>
				</view>

				<!-- 民情反馈 : feedback -->
				<view style="padding: 24upx;">
					<view class="news_viewTitle">| 民情反馈</view>
					<view class="serchView">
						<view class="comment" v-for="(item,index) in newsData.feedback" :key="index">
							<!-- 评论用户个人信息 -->
							<view class="personalInformation">
								<u-avatar :src="item.avatar"></u-avatar>
								<view class="user">
									<view class="userName">{{item.nick_name}}</view>
									<view class="timePublication">{{informationDate(item.create_time)}}</view>
								</view>
							</view>
							<!-- 评论内容 -->
							<view class="comments">
								<!-- 评论内容 -->
								<text class="userComments">{{item.content}}</text>
								<!-- 评论图片 -->
								<view v-if="item.image!==''">
									<image class="commentsImage" :src="item.image" mode="aspectFill"></image>
								</view>
								<!-- 回复评论 -->
								<view class="replyArea" v-if="item.return_content!==''">
									<text class="replyingPerson">客服回复：<text class="replyContent">{{item.return_content}}</text></text>
								</view>
							</view>
						</view>
					</view>

					<!-- 缺省提示 -->
					<view class="defaultStyle" v-if="newsData.feedback.length == 0">
						<text>暂时没有反馈哦~</text>
					</view>
				</view>
			</view>

		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				ruralList: [{
					name: '黄坑镇',
					nameType: '镇',
					fixed: 'fix_hukz',
					fixedSpecial: 'fix_hukz2',
					status: false,
					iconSatus: false,
				}, {
					name: '麻沙镇',
					nameType: '镇',
					fixed: 'fix_masz',
					fixedSpecial: 'fix_masz2',
					status: false,
					iconSatus: false,
				}, {
					name: '书坊乡',
					nameType: '村',
					fixed: 'fix_shufx',
					fixedSpecial: 'fix_shufx2',
					status: false,
					iconSatus: false,
				}, {
					name: '莒口镇',
					nameType: '镇',
					fixed: 'fix_jukz',
					fixedSpecial: 'fix_jukz2',
					status: false,
					iconSatus: false,
				}, {
					name: '将口镇',
					nameType: '镇',
					fixed: 'fix_jiangkz',
					fixedSpecial: 'fix_jiangkz2',
					status: false,
					iconSatus: false,
				}, {
					name: '徐市镇',
					nameType: '镇',
					fixed: 'fix_xusz',
					fixedSpecial: 'fix_xusz2',
					status: false,
					iconSatus: false,
				}, {
					name: '崇雒乡',
					nameType: '村',
					fixed: 'fix_conglx',
					fixedSpecial: 'fix_conglx2',
					status: false,
					iconSatus: false,
				}, {
					name: '漳墩镇',
					nameType: '镇',
					fixed: 'fix_zhangdz',
					fixedSpecial: 'fix_zhangdz2',
					status: false, 
					iconSatus: false,
				}, {
					name: '回龙乡',
					nameType: '村',
					fixed: 'fix_huilx',
					fixedSpecial: 'fix_huilx2',
					status: false,
					iconSatus: false,
				}, {
					name: '水吉镇',
					nameType: '镇',
					fixed: 'fix_shuijz',
					fixedSpecial: 'fix_shuijz2',
					status: false,
					iconSatus: false,
				}], //乡村列表
				contentInputData: '', //搜索
				imageHeight: '1334upx', //手机屏幕高度
				viewHeight : '614upx', //选择区高度
				//---------------以下是输入框监听参数--------------
				SearchStatus: false, //搜索列表框
				keywordList: [], //搜索关键字列表

				// ---------------以下是提示内容参数-------------
				ruralListIndex: -1, //数组默认值
				loadStatus: false, //加载状态
				loadIndex: 0, //加载数值，用于加载展示
				loadText: '正在查询乡村信息.', //加载文字提示
				loadRuralText: '', //文字乡村提示

				// ---------------以下是成功的提示内容参数-------------
				queryStatus: 0, //成功的提示框
				contentsText: '', //成功/失败的提示文字
				newsData: {
					village: {
						create_time: undefined
					},
					dynamic : [],
					policy : [],
					economy : [],
					project : [],
					ecology : [],
					evaluation : [],
					feedback : [],
				}, //接口成功，返回的乡村数据
				newsShow: false, //弹框的打开状态
				iponeModel : '',//机器型号
				iponeModelStats : false,//演示器状态
			}
		},
		onLoad: function() {
			this.iponeModel = plus.device.vendor; //获取手机厂商
			if(this.iponeModel == 'rockchip'){
				this.iponeModelStats = true;
			}
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					this.imageHeight = res.windowHeight + 'px'
					if(this.iponeModel == 'rockchip'){
						this.viewHeight = res.windowHeight / 2.5  + 'px'
					}else{
						this.viewHeight = res.windowHeight / 2 + 'px'
					}
					
					// console.log(this.imageHeight)
				}
			})
		},
		methods: {
			//搜索框点击查询
			searchClick: function(name) {
				var index = this.ruralList.findIndex((item) => item.name == name)
				console.log(index)
				if (index == -1) {
					uni.showToast({
						title: '暂无' + name + '的乡村信息',
						icon: 'none',
						duration: 3000
					})
				} else {
					this.SearchStatus = false;
					this.ruralClick(name, index)
				}

			},

			//点击乡村显示效果
			ruralClick: function(name, index) {
				this.loadRuralText = name;
				this.loadStatus = false;
				this.loadIndex = 0;
				this.queryStatus = 0;
				if (this.ruralListIndex == index) {
					this.ruralList[this.ruralListIndex].status = false;
					this.ruralList[this.ruralListIndex].iconSatus = false;
					this.ruralListIndex = -1;
				} else {
					if (this.ruralListIndex == -1) {
						this.ruralList[index].status = true;
						this.ruralList[index].iconSatus = true;
						this.ruralListIndex = index;
						this.loadTips();
					} else {
						this.ruralList[this.ruralListIndex].status = false;
						this.ruralList[this.ruralListIndex].iconSatus = false;
						this.ruralList[index].status = true;
						this.ruralList[index].iconSatus = true;
						this.ruralListIndex = index;
						this.loadTips();
					}
				}
			},

			//加载提示
			loadTips: function() {
				this.loadStatus = true;
				this.loadTestTips()
				var b = setInterval(() => {
					if (this.loadIndex == 3) {
						clearInterval(b);
						this.loadData()
					} else {
						this.loadIndex = this.loadIndex + 1;
					}
				}, 1000)

			},

			//设置加载定时器
			loadTestTips: function() {
				var a = setInterval(() => {
					if (this.loadStatus == false) {
						clearInterval(a);
					} else {
						if (this.loadText == '正在查询乡村信息.') {
							this.loadText = '正在查询乡村信息..'
						} else if (this.loadText == '正在查询乡村信息..') {
							this.loadText = '正在查询乡村信息...'
						} else if (this.loadText == '正在查询乡村信息...') {
							this.loadText = '正在查询乡村信息.'
						}
					}
				}, 1000)
			},

			//加载数据
			loadData: function() {
				uni.request({
					url: this.$home.KyInterface.getDataByVillageName.Url,
					method: this.$home.KyInterface.getDataByVillageName.method,
					data: {
						villageName: this.loadRuralText
					},
					success: (res) => {
						this.loadStatus = false;
						this.loadIndex = 0;
						if (res.data.status == true) {
							if (res.data.msg == '当前不存在该村') {
								this.queryStatus = 2;
								this.contentsText = res.data.msg;
								console.log(this.newsData)
							} else {
								this.queryStatus = 1;
								this.newsData = res.data.data;
								console.log(this.newsData)
							}
						} else {
							this.queryStatus = 1;
							this.contentsText = '服务器异常';
							console.log(this.newsData)
						}


						console.log('成功', res)
					},
					fail: (err) => {
						console.log('失败', err)
					}
				})
			},

			//资讯时间
			informationDate: function(e) {
				if (e !== undefined) {
					var a = e.substr(0, 10)
					return a;
				} else {
					return '';
				}
			},

			//关键字搜索
			onInput: function(e) {
				console.log('监听输入', e)
				//以下示例截取淘宝的关键字，请替换成你的接口
				if (e.detail.value != '') {
					this.SearchStatus = true;
				} else {
					this.SearchStatus = false;
				}
				uni.request({
					url: this.$home.KyInterface.getVillageByKey.Url,
					method: this.$home.KyInterface.getVillageByKey.method,
					data: {
						key: e.detail.value
					},
					success: (res) => {
						console.log('搜索', res)
						if (res.data.status) {
							this.keywordList = res.data.data;
						} else {
							this.SearchStatus = false;
							uni.showToast({
								title: '服务器搜索异常',
								icon: 'none'
							})
						}
					},
					fail: (err) => {
						this.SearchStatus = false;
						uni.showToast({
							title: '服务器搜索异常',
							icon: 'none'
						})
					}
				})
			},


			//跳转方法，一村一档(1)，乡村动态（2），乡村政策（3），水美经济（4），项目监督（5），生态银行（6），季度考评（7）
			detailsClick: function(module, e) {
				console.log('点击跳转')
				if (module == 1) {
					uni.navigateTo({
						url: '../../pages_YCYD/pages/YCYD/villageDetails?id=' + e
					})
				} else if (module == 2) {
					uni.navigateTo({
						url: '../../pages_XCDT/pages/ruralDynamics/rd_detailsPage?id=' + e
					})
				} else if (module == 3) {
					uni.navigateTo({
						url: '../../pages_ZCFB/pages/ZCFB/policyDetails?id=' + e
					})
				} else if (module == 4) {
					uni.navigateTo({
						url: '../../pages_SMJJ/pages/shuimeiEconomy/se_detailsPage?id=' + e
					})
				} else if (module == 5) {
					uni.navigateTo({
						url: '../../pages_FBXM/pages/publishProject/pp_detailsPage?id=' + e
					})
				} else if (module == 6) {
					uni.navigateTo({
						url: '../../pages_STYH/pages/ecologicalBank/eb_detailsPage?id=' + e
					})
				} else if (module == 7) {
					uni.navigateTo({
						url: '../../pages_JDKP/pages/jdkp_cj_details?id=' + e
					})
				}
			},

		}
	}
</script>

<style lang="scss">
	page {
		background: #1f4856;
	}

	.map_view {
		// height: 614upx;

		.map_view_image {
			width: 100%;
			z-index: 1;
			position: absolute;
		}

		.movable_view_iamge {
			width: 1342upx;
			height: 378px;
			padding: 400upx 0upx 0upx 80upx;
			position: relative;
		}

		.movable_view_Sign_iamge {
			width: 23upx;
			height: 23upx;
			padding-top: 3upx;
		}

		.movable_view_Sign_text {
			font-size: 18upx;
			margin-left: 4upx;
		}
	}

	.government_image {
		width: 23upx;
		height: 23upx;
	}

	.government_text {
		font-size: 18upx;
		margin-left: 4upx;
	}





	//输入区域
	.box_inputView {
		background: #FFFFFF;
		border-radius: 60upx;
		margin: 16upx 24upx;

		.inputStyle {
			// height: 96upx;
			padding: 26upx 44upx 26upx 44upx;
			font-size: 30upx;
		}
	}

	//关键字列表
	.stationList {
		background-color: #FFFFFF;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		margin: 8upx 24upx;
		border-radius: 60upx;
		padding: 8upx 18upx;

		.listItem {
			padding: 12rpx 0;
			margin-left: 20rpx;
			border-bottom: 1rpx solid #eeeeee;
			width: 92%;
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
			color: #EEEEEE;
			border: 1upx solid #EEEEEE;
			border-radius: 8upx;
		}

		.scrollView_text_color {
			color: #19BE6B;
			border: 1upx solid #19BE6B;
		}
	}

	//搜索区域样式
	.inf_dis_view {
		z-index: 3;
		position: sticky;
		top: 0;

		.dis_view_tips {
			padding: 12upx 24upx;
		}

		.dis_view_view {
			padding: 10upx 24upx;

			.dis_view_title {
				color: #19BE6B;
				font-weight: bold;
				font-size: 34upx;
			}

			.dis_view_text {
				color: #FFFFFF;
				margin: 10upx 0;
			}
		}
	}

	//无数据提示样式
	.defaultStyle {
		width: 100%;
		text-align: center;
		padding: 24upx 0;
	}

	.news_viewTitle {
		font-weight: bold;
		font-size: 34upx;
		color: #18B566;
	}

	//--------------------------------------一村一档-----------------------------------------------
	.dyn_view {
		margin-top: 32upx;
		font-size: 30upx;

		.dyn_text {
			padding: 8upx 0;
		}

		.dyn_text_view {
			position: relative;
			padding: 8upx 0;

			.dyn_text_view_text {
				color: #007AFF;
				font-size: 28upx;
				position: absolute;
				right: 0;
				bottom: 6upx;
			}
		}
	}



	//----------------------------------------乡村动态样式----------------------------------------
	.infor_view {
		// padding: 0 32upx;
		margin-top: 32upx;

		.view_titleView {
			display: flex;

			.tv_view {
				padding-right: 32upx;
				width: 468upx;

				.tv_label {
					font-size: 24upx;
					background: #007AFF;
					color: #FFFFFF;
					padding: 4upx 8upx;
					border-radius: 4upx;
				}

				.tv_title {
					font-weight: bold;
					font-size: 34upx;
					margin-left: 12upx;
					line-height: 1.7;
				}
			}

			.tv_image {
				width: 220upx;
				height: 160upx;
				border-radius: 8upx;
			}
		}

		.view_contentView {
			font-size: 24upx;
			color: #AAAAAA;
			padding: 16upx 0;
			margin-bottom: 16upx;

			.cont_text {
				margin-left: 20upx;
			}

			.cont_icon {
				float: right;
				padding: 12upx 0;
				margin-right: 16upx;
			}
		}
	}

	//----------------------------------------季度考评样式----------------------------------------
	.jdkp_view {
		// padding: 0 32upx;
		margin-top: 32upx;

		.jdkp_titleView {
			display: flex;

			.jdkp_tv_view {
				padding-right: 32upx;

				.jdkp_tv_label {
					font-size: 24upx;
					color: #FFFFFF;
					padding: 6upx 8upx;
					// border-radius: 4upx;
				}

				.jdkp_tv_title {
					padding-top: 12upx;
					font-weight: bold;
					font-size: 34upx;
					margin-left: 12upx;
					line-height: 1.8;
				}

				.jdkp_tv_content {
					display: block;
					font-size: 28upx;
					margin-top: 6upx;
					line-height: 1.7;
				}
			}

			.jdkp_tv_image {
				width: 220upx;
				height: 160upx;
				// border-radius: 8upx;
			}
		}

		.jdkp_view_contentView {
			font-size: 24upx;
			color: #AAAAAA;
			padding: 16upx 0;
			margin-bottom: 16upx;

			.jdkp_cont_text {
				margin-left: 20upx;
			}

			.jdkp_cont_icon {
				float: right;
				padding: 12upx 0;
				margin-right: 16upx;
			}
		}
	}

	//----------------------------------------民情反馈样式----------------------------------------
	.serchView {
		padding-bottom: 20rpx;

	}

	.comment {
		padding-top: 40upx;
		padding-bottom: 12upx;
		border-bottom: 1upx solid #EAEAEA;
	}

	.personalInformation {
		display: flex;
	}

	.user {
		padding-left: 18upx;
	}

	.userName {
		color: #333333;
		font-size: 32upx;
		font-weight: bold;
		padding-top: 6upx;
	}

	.timePublication {
		color: #999999;
		font-size: 26upx;
		padding-top: 10upx;
	}

	.comments {
		// display: block;
		width: 100%;
		margin: 12upx 0;

		.userComments {
			// width: 86%;
			font-size: 30upx;
			color: #333333;
			text-align: justify;
			line-height: 48rpx;
		}

		.commentsImage {
			width: 204upx;
			height: 204upx;
			padding: 0 8upx;
			margin-top: 20upx;
		}

		//回复区域
		.replyArea {
			padding: 26upx;
			background: #F5F9FB;
			margin-top: 20upx;
			width: 100%;
			border-radius: 5px;
			text-align: justify;
			line-height: 48rpx;

			.replyingPerson {
				font-size: 30upx;
				color: #576B95;

				.replyContent {
					font-size: 30upx;
					color: #999999;
				}
			}
		}
	}

	//-----------------------从这里开始是乡村的地图固定坐标---------------------------------------
	.fix_hukz {
		position: absolute;
		left: 206upx;
		top: 586upx;
	}
	
	.fix_hukz2 {
		position: absolute;
		left: 206upx;
		top: 500upx;
	}
	
	.fix_masz {
		position: absolute;
		left: 400upx;
		top: 804upx;
	}
	
	.fix_masz2 {
		position: absolute;
		left: 400upx;
		top: 718upx;
	}

	.fix_shufx {
		position: absolute;
		left: 394upx;
		top: 896upx;
	}
	.fix_shufx2 {
		position: absolute;
		left: 394upx;
		top: 810upx;
	}

	.fix_jukz {
		position: absolute;
		left: 540upx;
		top: 834upx;
	}
	
	.fix_jukz2 {
		position: absolute;
		left: 540upx;
		top: 748upx;
	}
	
	.fix_jiangkz {
		position: absolute;
		left: 696upx;
		top: 736upx;
	}
	
	.fix_jiangkz2 {
		position: absolute;
		left: 696upx;
		top: 650upx;
	}
	
	.fix_xusz {
		position: absolute;
		left: 708upx;
		top: 1006upx;
	}
	
	.fix_xusz2 {
		position: absolute;
		left: 708upx;
		top: 920upx;
	}
	
	.fix_conglx {
		position: absolute;
		left: 794upx;
		top: 684upx;
	}
	
	.fix_conglx2 {
		position: absolute;
		left: 794upx;
		top: 598upx;
	}

	.fix_zhangdz {
		position: absolute;
		left: 1046upx;
		top: 608upx;
	}
	
	.fix_zhangdz2 {
		position: absolute;
		left: 1046upx;
		top: 522upx;
	}

	.fix_huilx {
		position: absolute;
		left: 1024upx;
		top: 696upx;
	}
	
	.fix_huilx2 {
		position: absolute;
		left: 1024upx;
		top: 610upx;
	}

	.fix_shuijz {
		position: absolute;
		left: 1016upx;
		top: 762upx;
	}
	
	.fix_shuijz2 {
		position: absolute;
		left: 1016upx;
		top: 676upx;
	}
</style>
