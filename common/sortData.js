//参数1：数组
//参数2：字段名
//参数3：顺序：0，倒序：1

function SortData(list,title,sort) {
	var arr = list;
	if (Array.isArray(arr)) {
		for (var i = 0; i < arr.length - 1; i++) {
			var minIdex = i;
			for (var j = i + 1; j < arr.length; j++) {
				if(title == "total_people" && sort == 0){
					minIdex = arr[j].total_people < arr[minIdex].total_people ? j : minIdex;
				}else if(title == "total_people" && sort == 1){
					minIdex = arr[j].total_people > arr[minIdex].total_people ? j : minIdex;
				}
				if(title == "create_time" && sort == 0){
					minIdex = arr[j].create_time < arr[minIdex].create_time ? j : minIdex;
				}else if(title == "create_time" && sort == 1){
					minIdex = arr[j].create_time > arr[minIdex].create_time ? j : minIdex;
				}
			}
			[arr[i], arr[minIdex]] = [arr[minIdex], arr[i]];
		}
		return arr;
	}
}

// 接口声明区
export default {
	SortData
}
