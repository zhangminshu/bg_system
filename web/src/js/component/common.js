'use strict'
;(function(){

    var baseUrl = 'http://115.159.189.146:8001';

    window.api = {
        post: function(url, data){
            var def = $.Deferred()
            $.post(url, data)
                .then(function(res){
                    res = $.parseJSON(res)
                    def.resolve(res);
                    //   if(res.code === 10000){
                    //       def.resolve(res);
                    //   }else{
                    //       dialog.errorMsg(res.msg)
                    //       def.reject(res);
                    //   }
                });
            return def;
        },
        get: function(url, data){
            var def = $.Deferred()
            $.get(url, data)
                .then(function(res){
                    // res = $.parseJSON(res)
                    if(res.code === 10000){
                        def.resolve(res);
                    }else{
                        dialog.errorMsg(res.msg)
                        def.reject(res);
                    }
                });
            return def;
        },
        jsonp: function(url, data){
            var def = $.Deferred()
            $.ajax({
                url: baseUrl + url,
                type: 'get',
                dataType: 'jsonp',
                jsonp: 'callback',
                data: data
            }).then(function(res){
                if(res.code === 10000){
                    def.resolve(res);
                }else{
                    dialog.errorMsg(res.msg)
                    def.reject(res);
                }
            });
            return def;
        },
        //上传图片
        upload: function(data){
            return this.post('/kf/upload', data)
        },
        //搜索问题
        search: function(data){
            return this.post('/kf/search', data)
        },
        //SDK用户 信息校验
        check: function(data){
            return this.post('/sdk-user/check', data)
        },
        //轮播
        carousel: function(data){
            return this.post('/kf/scroll', data)
        },
        //登录
        login: function(data){
            return this.jsonp('/sdk-user/login', data)
        },
        //发送验证码
        sendCode: function(data){
            return this.jsonp('/sdk-user/send-sms-code', data)
        },
        //注册
        reg: function(data){
            return this.jsonp('/sdk-user/reg', data)
        },
        //找回密码
        findPwd: function(data){
            return this.jsonp('/sdk-user/find-pwd', data)
        },
        //修改密码
        changePwd: function(data){
            return this.jsonp('/sdk-user/change-pwd', data)
        },
        //是否登录
        isLogin: function(data){
            return this.jsonp('/sdk-user/is-login', data)
        },
        //注销
        logout: function(){
            return this.jsonp('/sdk-user/logout')
        },
        //返回成功
        success:function(data){
            return this.get('/src/mock/success.json')
        },

        //侧边导航
        navMeau:function(){
            return this.get('/src/mock/navMeau.json')
        }

    };

    window.account = {
        dialogConfig:{
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: false,  //点击遮罩关闭
            area: ['380px', '535px'],//宽高
            skin: 'account-dialog',//自定义样式
            shade: [0.7,'#000'],
        },
        copyState:1,    //复制状态
        time: 60,
        login: function(){
            var that = this;
            this.dialogConfig.area = ['410px', '305px'];
            this.dialogConfig.content = '<div class="dialog-wrap">\
                                            <form>\
                                            <div class="login">\
                                                <div class="head">登录<div class="icon-account-close" id="loginClose"></div></div>\
                                                <div class="username"><input class="input" type="text" name="username" placeholder="请输入帐号或手机号" autocomplete="off"><label for="username" class="icon-user"></label></div>\
                                                <div class="password"><input class="input" type="password" name="password" placeholder="请输入密码" autocomplete="off"><label for="password" class="icon-password"></label></div>\
                                                <div class="link"><a onclick="layer.closeAll();account.forget();">忘记密码</a> <span class="line">丨</span> <a onclick="layer.closeAll();account.register();" >注册</a></div>\
                                                <div class="btn"><button type="submit" class="login-btn">登&nbsp;&nbsp;录</button></div>\
                                            </div>\
                                            </form>\
                                        </div>';
            this.dialogConfig.success = function(ele, index){
                ele.find('#loginClose').on('click', function(){
                    layer.close(index);
                });
                ele.find('[name=username]').focus();
                ele.find('form').on('submit', function(e){
                    e.preventDefault();
                    var data = {
                        username: $.trim(ele.find('[name=username]').val()),
                        password: $.trim(ele.find('[name=password]').val()),
                    }
                    if(!data.username){
                        layer.alert('请输入手机号/帐号');
                        return false;
                    }
                    if(!data.password){
                        layer.alert('请输入密码');
                        return false;
                    }
                    api.login(data)
                        .then(function(res){
                            that.storeUserInfo(res.data);
                            util.reload();
                        });
                    return false;
                });
            };
            layer.open(this.dialogConfig);
        },
        register: function(){
            var that = this;
            this.dialogConfig.area = ['380px', '375px'];
            this.dialogConfig.content = '<div class="dialog-wrap">\
                                            <div class="login login-register">\
                                                <div class="head"><span class="icon-account-dialog-back" onclick="layer.closeAll();account.login();"></span>注册<div class="icon-account-close" id="loginRegisterClose"></div></div>\
                                                <div class="register-title clear"><span class="active register-title-phone" onclick="common.tabToggle(this);$(this).parent().nextAll().eq(0).find(\'[name=username]\').focus();"><em>手机</em></span><span class="register-title-username" onclick="common.tabToggle(this);$(this).parent().nextAll().eq(1).find(\'[name=username]\').focus();"><em>用户名</em></span></div>\
                                                <div class="reg-box">\
                                                    <form>\
                                                    <div class="phone clear"><input class="input" type="text" name="username" placeholder="请输入手机号码" autocomplete="off"><button type="button" onclick="account.sendCode(this,\'reg\');">发送验证码</button><label for="valicode" class="icon-phone"></label></div>\
                                                    <div class="valicode"><input class="input" type="text" name="sms_code" placeholder="请输入验证码" id="valicode" autocomplete="off"><label for="valicode" class="icon-valicode"></label></div>\
                                                    <div class="password"><input class="input" type="password" name="password" placeholder="请输入密码（6-16位）" id="password" autocomplete="off"><label for="password" class="icon-password"></label></div>\
                                                    <div class="arg">注册表示您同意 <a href="https://cdn.uu66.com/adminIP/home.html" target="_blank">《凯撒用户协议》</a><a class="account-has" onclick="layer.closeAll();account.login();">已有帐号</a></div>\
                                                    <div class="btn"><button type="submit" class="login-btn" id="phoneReg">注册并登录</button></div>\
                                                    </form>\
                                                </div>\
                                                <div class="reg-box hide">\
                                                    <form>\
                                                    <div class="username"><input class="input" type="text" name="username" placeholder="请输入用户名（6-16位）" autocomplete="off"><label for="username" class="icon-user"></label></div>\
                                                    <div class="password"><input class="input" type="password" name="password" placeholder="请输入密码（6-16位）" autocomplete="off"><label for="password" class="icon-password"></label></div>\
                                                    <div class="arg">注册表示您同意 <a href="https://cdn.uu66.com/adminIP/home.html" target="_blank">《凯撒用户协议》</a><a class="account-has" onclick="layer.closeAll();account.login();">已有帐号</a></div>\
                                                    <div class="btn"><button type="submit" class="login-btn" id="userReg">注册并登录</button></div>\
                                                    </form>\
                                                </div>\
                                            </div>\
                                        </div>';
            this.dialogConfig.success = function(ele, index){

                ele.find('#loginRegisterClose').on('click', function(){
                    layer.close(index);
                });
                ele.find('[name=username]').eq(0).focus();
                ele.find('form').eq(0).on('submit', function(e){
                    e.preventDefault();
                    var regBox = $(this).parents('.reg-box');
                    var data = {
                        username: $.trim(regBox.find('[name=username]').val()),
                        sms_code: $.trim(regBox.find('[name=sms_code]').val()),
                        password: $.trim(regBox.find('[name=password]').val()),
                    }
                    if(!data.username){
                        layer.alert('请输入手机号码');
                        return false;
                    }
                    if(!(/^1(3|4|5|7|8)\d{9}$/.test(data.username))){
                        layer.alert('手机号码格式不正确');
                        return false;
                    }
                    if(!data.sms_code){
                        layer.alert('请输入验证码');
                        return false;
                    }
                    if(!data.password){
                        layer.alert('请输入密码');
                        return false;
                    }
                    api.reg(data)
                        .then(function(res){
                            api.login({username: data.username, password: data.password})
                                .then(function(respone){
                                    that.storeUserInfo(respone.data);
                                    util.reload();
                                });
                        });
                    return false;
                });

                ele.find('form').eq(1).on('submit', function(e){
                    e.preventDefault();
                    var regBox = $(this).parents('.reg-box');
                    var data = {
                        username: $.trim(regBox.find('[name=username]').val()),
                        password: $.trim(regBox.find('[name=password]').val()),
                    }
                    if(!data.username){
                        layer.alert('请输入用户名');
                        return false;
                    }
                    if(!data.password){
                        layer.alert('请输入密码');
                        return false;
                    }
                    api.reg(data)
                        .then(function(res){
                            api.login({username: data.username, password: data.password})
                                .then(function(res){
                                    that.storeUserInfo(res.data);
                                    util.reload();
                                });
                        });
                    return false;
                });
            };
            layer.open(this.dialogConfig);
        },
        forget: function(){
            var that = this;
            this.dialogConfig.area = ['380px', '335px'];
            this.dialogConfig.content = '<div class="dialog-wrap">\
                                            <form>\
                                            <div class="login login-forget">\
                                                <div class="head"><span class="icon-account-dialog-back" onclick="layer.closeAll();account.login();"></span>忘记密码<div class="icon-account-close" id="loginForgetClose"></div></div>\
                                                <div class="phone clear"><input class="input" type="text" name="phone" placeholder="请输入手机号码" autocomplete="off"><button type="button" onclick="account.sendCode(this,\'find_pwd\');">发送验证码</button><label for="valicode" class="icon-phone"></label></div>\
                                                <div class="valicode"><input class="input" type="text" name="sms_code" placeholder="请输入验证码" autocomplete="off"><label for="valicode" class="icon-valicode"></label></div>\
                                                <div class="password"><input class="input" type="password" name="password" placeholder="请输入密码" autocomplete="off"><label for="password" class="icon-password"></label></div>\
                                                <div class="btn"><button type="submit" class="login-btn" id="findPwdBtn">确认</button></div>\
                                            </div>\
                                            </form>\
                                        </div>';
            this.dialogConfig.success = function(ele, index){

                ele.find('#loginForgetClose').on('click', function(){
                    layer.close(index);
                });
                ele.find('[name=phone]').focus();
                ele.find('form').on('submit', function(e){
                    e.preventDefault();
                    var data = {
                        phone: $.trim(ele.find('[name=phone]').val()),
                        sms_code: $.trim(ele.find('[name=sms_code]').val()),
                        password: $.trim(ele.find('[name=password]').val()),
                    }
                    if(!data.phone){
                        layer.alert('请输入手机号码');
                        return false;
                    }
                    if(!(/^1(3|4|5|7|8)\d{9}$/.test(data.phone))){
                        layer.alert('手机号码格式不正确');
                        return false;
                    }
                    if(!data.sms_code){
                        layer.alert('请输入验证码');
                        return false;
                    }
                    if(!data.password){
                        layer.alert('请输入密码');
                        return false;
                    }
                    api.findPwd(data)
                        .then(function(res){
                            layer.alert(res.msg, function(index){
                                layer.closeAll()
                                account.login()
                            });
                        });
                    return false;
                });
            };
            layer.open(this.dialogConfig);
        },
        change: function(){
            var that = this;
            this.dialogConfig.area = ['410px', '335px'];
            this.dialogConfig.content = '<div class="dialog-wrap">\
                                            <form>\
                                            <div class="login change">\
                                                <div class="head"></span>修改密码<div class="icon-account-close" id="loginChangeClose"></div></div>\
                                                <div class="password"><input class="input" type="password" name="old_pwd" placeholder="请输入当前密码（6-16位字符）" autocomplete="off"></div>\
                                                <div class="password"><input class="input" type="password" name="new_pwd" placeholder="请输入新密码（6-16位字符）" autocomplete="off"></div>\
                                                <div class="password"><input class="input" type="password" name="repeat_pwd" placeholder="请再次输入新密码（6-16位字符）" autocomplete="off"></div>\
                                                <div class="btn"><button type="submit" class="login-btn" id="changeBtn">确认</button></div>\
                                            </div>\
                                            </form>\
                                        </div>';
            this.dialogConfig.success = function(ele, index){

                ele.find('#loginChangeClose').on('click', function(){
                    layer.close(index);
                });
                ele.find('[name=old_pwd]').focus();
                ele.find('form').on('submit', function(e){
                    e.preventDefault();
                    var data = {
                        old_pwd: $.trim(ele.find('[name=old_pwd]').val()),
                        new_pwd: $.trim(ele.find('[name=new_pwd]').val()),
                        repeat_pwd: $.trim(ele.find('[name=repeat_pwd]').val()),
                        username: util.getStorage('userInfo').user_name
                    }
                    if(!data.old_pwd){
                        layer.alert('请输入当前密码');
                        return false;
                    }
                    if(!data.new_pwd){
                        layer.alert('请输入新密码');
                        return false;
                    }
                    if(data.new_pwd !== data.repeat_pwd){
                        layer.alert('两次密码输入不一致');
                        return false;
                    }

                    api.changePwd(data)
                        .then(function(res){
                            that.logout();
                        });
                    return false;
                });

            };
            layer.open(this.dialogConfig);

        },
        storeUserInfo: function(data){
            util.setStorage('userInfo', data);
        },
        // signIn: function(){
        //   var userInfo = $('#userInfo');
        //       userInfo.show().prev().hide().end().find('.username').text(util.getStorage('userInfo').user_name);
        // },
        confirmLogout: function(){
            var that = this;
            layer.confirm('确认要注销吗？', function(index){
                api.logout()
                    .then(function(){
                        that.logout();
                    })
            });
        },
        logout: function(){
            util.clearStorage();
            util.reload();
        },
        countDown: function(e){
            var that = this;
            var time = that.time;
            e.innerHTML = that.time + 's';
            e.disabled = true;
            var timer = setInterval(function(){
                if(that.time == 0){
                    clearInterval(timer);
                    e.innerHTML = '发送验证码';
                    e.disabled = false;
                    that.time = time;
                }else{
                    that.time--;
                    e.innerHTML = that.time + 's';
                }
            },1000)
        },
        sendCode: function(e, type){
            var that = this;
            var phone = $.trim($(e).prev().val());
            if(!phone){
                layer.alert('请输入手机号码');
                return;
            }
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
                layer.alert('手机号码格式不正确');
                return;
            }
            api.sendCode({phone: phone, type: type})
                .then(function(res){
                    that.countDown(e);
                });
        },
    };

    window.dialog = {
        successMsg: function(msg, content){
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                time: 2000,
                skin: 'dialog-msg',
                content: content || '<div class="dialog-container"><div class="dialog-content"><span class="icon icon-success"></span>' + msg +'</div></div>'
            })
        },
        errorMsg: function(msg, content){
            this.successMsg.call(this, msg, content || '<div class="dialog-container"><div class="dialog-content"><span class="icon icon-error"></span>' + msg +'</div></div>')
        },
        confirm: function(msg, yesText, successCb, cancelCb){
            var arg = arguments
            var btntext = '确定'
            if(typeof yesText === 'string'){
                btntext = yesText
            }
            var content = '<div class="dialog-container">\
                            <div class="dialog-content">'+ msg +'</div>\
                            <div class="dialog-btns">\
                                <button class="dialog-btn dialog-yes">'+ btntext +'</button>\
                                <button class="dialog-btn dialog-cancel">取消</button>\
                            </div>\
                         </div>'
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                skin: 'dialog-confirm',
                content: content,
                success: function(ele, index){
                    ele.find('.dialog-yes').on('click', function(){
                        if(typeof yesText === 'function'){
                            yesText && yesText()
                        }else if(yesText && typeof yesText === 'string'){
                            successCb && successCb()
                        }
                        layer.close(index)
                    })
                    ele.find('.dialog-cancel').on('click', function(){
                        if(typeof yesText === 'function' && arg.length === 3){
                            successCb && successCb()
                        }else if(typeof yesText === 'string' && arg.length === 4){
                            cancelCb && cancelCb()
                        }
                        layer.close(index)
                    })
                }
            })
        },
        detail: function(title, detail){    //由于客服需要自定义弹窗内容样式，为了不受外部样式干扰，所以使用iframe
            var content = '<div class="dialog-detailWrap">\
                                <div class="dialog-detailTitle">'+ title +'<span class="icon-dialog-close dialog-detailClose"></span></div>\
                                <div class="dialog-detailContent"><iframe frameborder="0" style="width: 100%; height:100%; margin: 0"></iframe></div>\
                           </div>'
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: ['500px', '80%'],
                //maxHeight: '80%',
                skin: 'dialog-detail',
                content: content,
                success: function(ele, index){
                    setTimeout(function(){
                        ele.find('iframe').contents().find('body').html(detail)
                        ele.find('iframe').contents().find('img').css('max-width', '100%')
                        ele.find('.dialog-detailClose').on('click', function(){
                            layer.close(index)
                        })
                    }, 0)
                }
            })
        },
        message:function(title, detail) {
            var content = '<div class="dialog-detailWrap">\
                                <div class="dialog-detailTitle">'+ title +'<span class="icon-dialog-close dialog-detailClose"></span></div>\
                                <div class="dialog-messageContent">'+detail+'</div>\
                                <div class="dialog-btnWarp dialog-btnPos dialog-ok">关闭</div>\
                            </div>'
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: ['377px', '238px'],
                //maxHeight: '80%',
                skin: 'dialog-message',
                content: content,
                success: function(ele, index){
                    setTimeout(function(){
                        ele.find('.dialog-detailClose,.dialog-ok').on('click', function(){
                            layer.close(index)
                        })
                    }, 0)
                }
            })
        }
    }

    window.common = {
        tabToggle: function(e){
            var node = $(e);
            var siblings = $(e).siblings();
            var index = $(e).index();
            var listBox = node.parent().nextAll();
            node.addClass('active');
            siblings.removeClass('active');
            $.each(listBox,function(k,v){
                if(k === index){
                    v.style.display = 'block';
                }else{
                    v.style.display = 'none';
                }
            });
        }
    }

    window.util = {
        getQueryString: function(name){
            var url = window.location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest[name];
        },
        setStorage: function(key, val){
            window.localStorage.setItem(key, JSON.stringify(val));
        },
        getStorage: function(key){
            return $.parseJSON(window.localStorage.getItem(key));
        },
        removeStorage: function(key){
            window.localStorage.removeItem(key);
        },
        clearStorage: function(){
            window.localStorage.clear();
        },
        reload: function(){
            window.location.reload();
        },
        isPhone: function(phone){
            return (/^1(3|4|5|6|7|8)\d{9}$/.test(phone))
        },
        isEmpty: function(e){
            for (var key in e){
                return false
            }
            return true
        },
        back: function(){
            window.history.go(-1)
        },
        flashChecker: function() {
            var hasFlash = 0; //是否安装了flash
            var flashVersion = 0; //flash版本
            if (document.all) {
                try {
                    var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    if (swf) {
                        hasFlash = 1;
                        var VSwf = swf.GetVariable("$version");
                        flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
                    }
                }catch(e){
                    hasFlash = 0;
                }
            } else {
                if (navigator.plugins && navigator.plugins.length > 0) {
                    var swf = navigator.plugins["Shockwave Flash"];
                    if (swf) {
                        hasFlash = 1;
                        var words = swf.description.split(" ");
                        for (var i = 0; i < words.length; ++i) {
                            if (isNaN(parseInt(words[i]))) continue;
                            flashVersion = parseInt(words[i]);
                        }
                    }
                }
            }
            return { f: hasFlash, v: flashVersion };
        },
        formDate:function(time){

            function placeNum(v){
                return v > 9 ? v : '0' + v
            }
            var newDate = "";
            if(time !=="" && time !==0){
                var d = new Date(time*1000),
                    y = placeNum(d.getFullYear()),
                    m = placeNum(d.getMonth() + 1),
                    dd = placeNum(d.getDate()),
                    h = placeNum(d.getHours()),
                    min = placeNum(d.getMinutes()),
                    s = placeNum(d.getSeconds());
                newDate = y+"-"+m+"-"+dd+"  "+h+":"+min+":"+s;
            }
            return newDate;
        },
        /**
         * 分页数据分割
         * @param data 后台返回的列表数组
         * @param limit 每页显示的页数
         * @param currPage 第几页
         * @returns {Array}
         */
        splitArrs:function(data,limit,currPage){
            var arr = [];
            var minPage = (currPage-1)*limit;
            var maxPage = currPage*limit;
            for(var i = minPage;i<maxPage;i++){
                if(data[i]){
                    arr.push(data[i])
                }
            }
            return arr;
        },
        randomVerificationCode:function(len){
            var str ='',pos,
                arr=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
                    'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
                    'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            for(var i=0; i<len; i++){
                pos = Math.round(Math.random() * (arr.length-1));
                str += arr[pos];
            }
            return str;
        },
        getProvince:function(){
            var provinces =['北京市','上海市','天津市','重庆市','河北省','山西省','内蒙古自治区','辽宁省','吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','广西壮族自治区','海南省','四川省','贵州省','云南省','西藏自治区','陕西省','甘肃省','宁夏回族自治区','青海省','新疆维吾尔族自治区','香港','澳门','台湾'];
            provinces = provinces.map(function(val,index){
                return {val:val,text:val}
            });
            return provinces;
        },
        getCity:function(province){
            if(province===''){return;}
            var cityArr ={
                "北京市": ["北京市市辖区"],
                "天津市": ["天津市市辖区","天津市郊县"],
                "河北省": ["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市"],
                "山西省": ["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市"],
                "内蒙古自治区": ["呼和浩特市","包头市","乌海市","赤峰市","通辽市","鄂尔多斯市","呼伦贝尔市","巴彦淖尔市","乌兰察布市","兴安盟","锡林郭勒盟","阿拉善盟"],
                "辽宁省": ["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","营口市","阜新市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市"],
                "吉林省": ["长春市","吉林市","四平市","辽源市","通化市","白山市","松原市","白城市","延边朝鲜族自治州"],
                "黑龙江省": ["哈尔滨市","齐齐哈尔市","鸡西市","鹤岗市","双鸭山市","大庆市","伊春市","佳木斯市","七台河市","牡丹江市","黑河市","绥化市","大兴安岭地区"],
                "上海市": ["上海市市辖区","上海市郊县"],
                "江苏省": ["南京市","无锡市","徐州市","常州市","苏州市","南通市","连云港市","淮安市","盐城市","扬州市","镇江市","泰州市","宿迁市"],
                "浙江省": ["杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市"],
                "安徽省": ["合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","六安市","亳州市","池州市","宣城市"],
                "福建省": ["福州市","厦门市","莆田市","三明市","泉州市","漳州市","南平市","龙岩市","宁德市"],
                "江西省": ["南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市"],
                "山东省": ["济南市","青岛市","淄博市","枣庄市","东营市","烟台市","潍坊市","济宁市","泰安市","威海市","日照市","莱芜市","临沂市","德州市","聊城市","滨州市","菏泽市"],
                "河南省": ["郑州市","开封市","洛阳市","平顶山市","安阳市","鹤壁市","新乡市","焦作市","濮阳市","许昌市","漯河市","三门峡市","南阳市","商丘市","信阳市","周口市","驻马店市","济源市"],
                "湖北省": ["武汉市","黄石市","十堰市","宜昌市","襄阳市","鄂州市","荆门市","孝感市","荆州市","黄冈市","咸宁市","随州市","恩施土家族苗族自治州","仙桃市","潜江市","天门市","神农架林区"],
                "湖南省": ["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西土家族苗族自治州"],
                "广东省": ["广州市","韶关市","深圳市","珠海市","汕头市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市"],
                "广西壮族自治区": ["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市"],
                "海南省": ["海口市","三亚市","三沙市","儋州市","五指山市","琼海市","文昌市","万宁市","东方市","定安县","屯昌县","澄迈县","临高县","白沙黎族自治县","昌江黎族自治县","乐东黎族自治县","陵水黎族自治县","保亭黎族苗族自治县","琼中黎族苗族自治县"],
                "重庆市": ["重庆市市辖区","重庆市郊县"],
                "四川省": ["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","眉山市","宜宾市","广安市","达州市","雅安市","巴中市","资阳市","阿坝藏族羌族自治州","甘孜藏族自治州","凉山彝族自治州"],
                "贵州省": ["贵阳市","六盘水市","遵义市","安顺市","毕节市","铜仁市","黔西南布依族苗族自治州","黔东南苗族侗族自治州","黔南布依族苗族自治州"],
                "云南省": ["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","普洱市","临沧市","楚雄彝族自治州","红河哈尼族彝族自治州","文山壮族苗族自治州","西双版纳傣族自治州","大理白族自治州","德宏傣族景颇族自治州","怒江傈僳族自治州","迪庆藏族自治州"],
                "西藏自治区": ["拉萨市","日喀则市","昌都市","林芝市","山南地区","那曲地区","阿里地区"],
                "陕西省": ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市"],
                "甘肃省": ["兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏回族自治州","甘南藏族自治州"],
                "青海省": ["西宁市","海东市","海北藏族自治州","黄南藏族自治州","海南藏族自治州","果洛藏族自治州","玉树藏族自治州","海西蒙古族藏族自治州"],
                "宁夏回族自治区": ["银川市","石嘴山市","吴忠市","固原市","中卫市"],
                "新疆维吾尔族自治区": ["乌鲁木齐市","克拉玛依市","吐鲁番市","哈密地区","昌吉回族自治州","博尔塔拉蒙古自治州","巴音郭楞蒙古自治州","阿克苏地区","克孜勒苏柯尔克孜自治州","喀什地区","和田地区","伊犁哈萨克自治州","塔城地区","阿勒泰地区","石河子市","阿拉尔市","图木舒克市","五家渠市","北屯市","铁门关市","双河市","可克达拉市"],
                "台湾":["台北市","高雄市"],
                "香港": ["中西区","湾仔区","东区","南区","油尖旺区","深水埗区","九龙城区","黄大仙区","观塘区","荃湾区","屯门区","元朗区","北区","大埔区","西贡区","沙田区","葵青区","离岛区"],
                "澳门": ["花地玛堂区","花王堂区","望德堂区","大堂区","风顺堂区","嘉模堂区","路凼填海区","圣方济各堂区"]
            }
            var cityList = (cityArr[province]).map(function(val,index){
                return {val:val,text:val}
            });
            return cityList;


        }
    };
    layui.use(['element','form'], function(){
        var element = layui.element,form = layui.form;
    });
    // layui.use('layer', function(){
    //     $(function(){
    //         var userInfo = util.getStorage('userInfo');
    //         if(userInfo){
    //             api.isLogin({userinfo:JSON.stringify(userInfo)})
    //                 .then(function(res){
    //                     if(res.code === 10000){
    //                         //account.signIn();
    //                     }else{
    //                         util.removeStorage('userInfo');
    //                     }
    //                 }, function(){
    //                     util.removeStorage('userInfo');
    //                 });
    //         }
    //     });
    //     var index;
    //     $(document).ajaxStart(function(){
    //         index = layer.load()
    //     });
    //     $(document).ajaxStop(function(){
    //         layer.close(index)
    //     });
    //     $(document).ajaxError(function(){
    //         layer.msg('请求错误');
    //     })
    // });
})();
