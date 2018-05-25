
var indexVm = avalon.define({
    $id: "index",
    isShow:true,
    cbProxy: function(ok){
        console.log(ok)
        console.log(1231)
        this.isShow = false;
    },
    showDialog(){
        this.isShow = true;
    },
    onClose(data){
        this.isShow = false;
    },
    onConfirm(){

    }
})

indexVm.$watch('onReady', function(){
    var _this = this
    setTimeout(function(){
    }, 0)

})