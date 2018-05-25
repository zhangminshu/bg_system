var dialogVm;
avalon.component('ms-dialog',{
    template:'<div class="ms-dialog-box" ms-visible="@isShow">\n' +
    '    <div class="ms-mask" :click="@onClose()"></div>\n' +
    '    <div class="ms-dialog dialog-select">\n' +
    '        <div class="dialog-head ms-clear">\n' +
    '            <div class="title ms-left">标题</div>\n' +
    '            <div class="iconBtn close ms-right" :click="@onClose()"><i class="icon-close"></i></div>\n' +
    '        </div>\n' +
    '        <div class="dialog-body">\n' +
    '            <div class="list-warp ms-clear">\n' +
    '                <div class="list-left ms-left">\n' +
    '                    <div class="list-title">SDK游戏列表</div>\n' +
    '                    <div class="list-body">\n' +
    '                        <div class="list-search"><input type="text" placeholder="请输入关键字搜索"></div>\n' +
    '                        <div class="list">\n' +
    '                            <div class="list-item" ms-click="@selectedItem()">Kaiserdemo</div>\n' +
    '                            <div class="list-item">Kaiserdemo1</div>\n' +
    '                            <div class="list-item">Kaiserdemo2</div>\n' +
    '                            <div class="list-item">Kaiserdemo3</div>\n' +
    '                            <div class="list-item">Kaiserdemo4</div>\n' +
    '                            <div class="list-item">Kaiserdemo4</div>\n' +
    '                            <div class="list-item">Kaiserdemo4</div>\n' +
    '                            <div class="list-item">Kaiserdemo4</div>\n' +
    '                            <div class="list-item">Kaiserdemo4</div>\n' +
    '                            <div class="list-item">Kaiserdemo4</div>\n' +
    '                            <div class="list-item">Kaiserdemo4</div>\n' +
    '                            <div class="list-item">Kaiserdemo4</div>\n' +
    '                            <div class="list-item">Kaiserdemo4</div>\n' +
    '                            <div class="list-item">Kaiserdemo4</div>\n' +
    '                            <div class="list-item">Kaiserdemo4</div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="list-middle ms-left">\n' +
    '                    <div class="btn-right"> >> </div>\n' +
    '                    <div class="btn-left"> << </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="list-right ms-left">\n' +
    '                    <div class="list-title">投放系统游戏列表</div>\n' +
    '                    <div class="list-body">\n' +
    '                        <div class="list list-right">\n' +
    '\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '\n' +
    '        </div>\n' +
    '        <div class="dialog-foot">\n' +
    '            <span class="ms-ok" ms-click="@onOk()">确定</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>',
    defaults:{
        isShow:'false',
        cbProxy: avalon.noop,
        onClose: avalon.noop,
        selectedItem:function(){


        },
        onOk:function(){
            var _this = this;
            var data = [0,1,2]
            _this.cbProxy(data)
        },
        onInit:function(e){
            // this.render()
            // console.log(avalon)
            dialogVm = e.vmodel;
        },
        onReady:function(){

        }
    }
})