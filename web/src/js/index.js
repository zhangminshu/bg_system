
var indexVm = avalon.define({
    $id: "index",
    navMenu: []
})

indexVm.$watch('onReady', function(){
    var _this = this
    setTimeout(function(){
        api.navMenu().then((res)=>{
            if(res.code !==10000)return;
            _this.navMenu = res.data;
            layui.element.render()
        })
    }, 0)

})