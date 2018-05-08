
var indexVm = avalon.define({
    $id: "index",
    name: "司徒正美sdfsdf",
    array: [11,22,3334234]
})

indexVm.$watch('onReady', function(){
    var _this = this
    setTimeout(function(){
        indexVm.array.set(0, 444)
    }, 3000)

})