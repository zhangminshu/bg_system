
var indexVm = avalon.define({
    $id: "index",
    name: "司徒正美sdfsdf",
    navMenu: []
})

indexVm.$watch('onReady', function(){
    var _this = this

    setTimeout(function(){
        api.navMeau().then((res)=>{
            console.log(res.data)
            if(res.code !==10000)return;
            _this.navMenu = res.data;
            layui.element.render()
        })
    }, 0)

})