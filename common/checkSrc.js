
//校验上传文件的格式
//type：image表示图片，video表示视频，pdf表示文件
//src：需要校验的路径
//正确返回 true
//错误返回 false
function checkSrc(type,src) {
	let array = src.split('.');
	let num = array.length - 1;
	let suffix = array[num];
	
	let imageSrc = ['png','jpg','jpeg']; 	//图片
	let videoSrc = ['mp4'];				//视频
	let pdfSrc = ['pdf','doc','docx'];	//文件
	
	if(type == 'image'){
		return checkCorrentSrc(imageSrc,suffix);
	}
	else if(type == 'video'){
		return checkCorrentSrc(videoSrc,suffix);
	}
	else if(type == 'pdf'){
		return checkCorrentSrc(pdfSrc,suffix);
	}
	else{
		return false;
	}
}

function checkCorrentSrc(correntSrc,suffix) {
	for(let item of correntSrc){
		if(item == suffix){
			return true;
		}
	}
	return false;
}

// 接口声明区
export default {
	checkSrc
}