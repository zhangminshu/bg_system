var slideVm;
avalon.component('ms-slide', {
    template: '        <div class="layui-side ms-side-nav-warp">\n' +
    '            <div class="layui-side-scroll">\n' +
    '                <ul class="layui-nav layui-nav-tree ms-nav-tree">\n' +
    '                    <li :for="(index,item) in @navMenu" class="layui-nav-item " :class="[@index==@active ? \'layui-nav-itemed\':\'\']">\n' +
    '                        <a href="javascript:;"><span class="navIcon" :class="\'icon-\'+(@index+1)"></span>{{item.name}}</a>\n' +
    '                        <dl class="layui-nav-child">\n' +
    '                            <dd class="ms-nav-item" :for="(subIndex,subItem) in item.list"><a href="javascript:;">{{subItem.name}}</a></dd>\n' +
    '                        </dl>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>',
    defaults: {
        active:0,
        navMenu:[],
        onInit:function(e){
            slideVm = e.vmodel
        },
        onReady:function(){

            var _this = this
            setTimeout(function(){
                api.navMenu().then(function(res){
                    console.log(res)
                    if(res.code !==10000)return;
                    _this.navMenu = res.data;
                    layui.element.render()
                })
            }, 0)
        }
    }
});