import $oSit from '@/common/overallSituation.js';
// #ifdef H5
	const Url=$oSit.Interface.address.Url;
// #endif
// #ifndef H5
	const Url=$oSit.Interface.address.Url;
// #endif


//获取图片的路径
async function GetImage(type,title) {
	var res = await request(type,title);
	return res;
}

//request请求
function request (type,title) {
  return new Promise(function (resolve, reject) {
    uni.request({
    	url:Url+'/api/BasicImage/GetRotationChart',
    	method:'POST',
    	success(res){
			console.log(res,"图片");
			var data = res.data.data;
			for(var item of data){
				if(item.Title == title && item.Type == type){
					resolve(item.ImageURL);
				}
			}
    	},
    	fail(err){
    		console.log(err,"err")
			reject('-1');
    	}
    })
  })
}

//弹窗提示
function showToast(title,icon){
	var sign=icon==undefined?'none':icon;
	uni.showToast({
		title:title,
		icon:sign,
	})
}

// 接口声明区
export default {
	GetImage,showToast
}