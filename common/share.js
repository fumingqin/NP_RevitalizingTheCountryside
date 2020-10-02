export default{
    data(){
        return {
             //设置默认的分享参数
            share:{
                title:'一款邵泰人民的专属快线~',
                path:'pages/home/h_jtzx_home',
            }
        }
    },
    onShareAppMessage:function(res) {
        return {
            title:this.share.title,
            path:this.share.path,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    }
}