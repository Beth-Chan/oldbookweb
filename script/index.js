$(function() { // 是$(document).ready(function(){ // ... })形式的一种简写，即原生js的window.onload = function(){ // ... });
    check_latest();
    getCarousel();
    if (getCookie("tel") != "") {
        $("#head_tel").html(getCookie("tel"));
        loginOrLogout();
    }
});

function loginOrLogout() {
    $('.sell').toggle();
    $('.register').toggle();
    $('.login').toggle();
    $('.logout').toggle();
    $('.order').toggle();
    $('.collect').toggle();
}

function check_latest() {
    $.ajax({ // 通过 HTTP get 请求从服务器载入数据。这是jQuery的Ajax函数，也可以写成$.post(url,data,success(data, textStatus, jqXHR),dataType)的形式;
        type: 'get',
        url: 'getLatestbook.php',
        data: {},
        dataType: 'JSON',
        success: function(rs) {
            if (rs != 0) {
                deal_latest(rs);
            }
            pagenum();
        }
    });

}

function deal_latest(rs) {
    $('#latest_ul').html('');
    for (var book of rs) {
        var b_name = book.b_name;
        var b_price = book.b_price;
        var pic_url = book.pic_url;

        $('#latest_ul').append(
            "<li class='latest_li'>" +
            "<div class=>" +
            "<div class='cover'>" +
            "<a onclick=detail(" + book.b_ID + ")><img src=" + pic_url + " class='pic'></a>" +
            "</div><div class='content'>" +
            "<div class='name_and_price'>" +
            " <span><a onclick=detail(" + book.b_ID + ") target='_blank' style='float:left;' id='bookName' title=" + b_name + ">" +
            "<strong class='bookname'>&nbsp;" + b_name + "</strong></a></span>" +
            "<span style='float:left;'>&nbsp;&nbsp;￥" + b_price + "</span></div> </div></div> </li>"
        );
    }
}

function getCarousel() {
    $.ajax({
        type: 'get',
        url: 'getCarousel.php',
        data: {},
        dataType: 'JSON',
        success: function(rs) {
            if(rs != 0) {
                deal_Carousel(rs);
            }
        }
    });
}

function deal_Carousel(rs) {
    for(var book of rs) {
        var pic_url = book.pic_url;
    }

    $('#carousel-img').attr("src", pic_url);
}

function showLoginBox() {
    layer.open({
        type: 1,
        skin: 'layui-layer-rim',
        title: "登录",
        area: ["350px", "260px"],
        content: $(".loginBox")
    });
}

function showRegBox() {
    layer.open({
        type: 1,
        skin: 'layui-layer-rim',
        title: "注册",
        area: ["350px", "450px"],
        content: $(".regBox")
    });
}

function login() {
    var tel = $.trim($("#login_tel").val());
    var pwd = $.trim($("#login_pwd").val());
    $.ajax({
        type: 'post',
        url: 'login.php',
        data: {
            tel: tel,
            pwd: pwd
        },
        dataType: 'text',
        success: function(num) {
            if (num == 1) {
                $("#head_tel").html(getCookie("tel"));
                layer.closeAll();
                loginOrLogout();
            } else layer.alert("登录失败");
        }
    });
}

function logout() {
    clearCookie('tel');
    loginOrLogout();
    $("#head_tel").html('');
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    // 将cookie名称、值及其过期日期存入document.cookie对象
    document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue) + "; " + expires;
}

function getCookie(c_name) {
    // 检查document.cookie对象中是否存有cookie
    if (document.cookie.length > 0) {
        // 继续检查我们指定的cookie是否已储存
        c_start = document.cookie.indexOf(encodeURIComponent(c_name) + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            // 解码除了空格之外的其他字符，返回找到的cookie值
            return decodeURIComponent(document.cookie.substring(c_start, c_end))
        }
    }
    // 没有cookie时返回空字符串
    return "";
}

function clearCookie(name) {
    setCookie(name, "", -1);
}

function checkPwd_reg() {
    var pwd = $("#re_pwd").val();
    var pwd2 = $("#re_pwd2").val();
    if (pwd != pwd2) {
        layer.msg('您两次输入的密码不同！',{icon:5,time:1000});
    }
}

function checkphone(tel) {
    var str = tel;
    var pattern = new RegExp(/^1[3|4|5|8][0-9]\d{4,8}$/);
    if (pattern.test(str) == true) {
        return true;
    } else {
        return false;
    }
}

function register() {
    var tel = $("#re_tel").val();
    var username = $("#re_username").val();
    var pwd = $("#re_pwd").val();
    var pwd2 = $("#re_pwd2").val();
    var dormitory = $("#re_dor").val();
    var classname = $("#re_class").val();

    if (tel == "") {
        layer.msg('请输入手机号码！',{icon:5,time:1000});
    } else if (username == "") {
        layer.msg('请输入用户名！',{icon:5,time:1000});
    } else if (pwd == "") {
        layer.msg('请输入密码！',{icon:5,time:1000});
    } else if (pwd != pwd2) {
        layer.msg('您两次输入的密码不同！',{icon:5,time:1000});
    } else if (classname == "") {
        layer.msg('请输入专业班级！',{icon:5,time:1000});
    } else if (!checkphone(tel)) {
        layer.msg('您输入的手机号码格式不正确！',{icon:5,time:1000});
    } else {
        $.ajax({
            type: 'post',
            url: 'register.php',
            data: {
                tel: tel,
                username: username,
                pwd: pwd,
                dormitory: dormitory,
                classname: classname
            },
            dataType: 'text',
            success: function(num) {
                if (num == 1) {
                    layer.msg('注册成功，请登录', {
                        icon: 6,
                        time: 1500 
                    }, function() {
                        layer.closeAll();
                    });
                } else layer.msg('注册失败',{icon:5,time:1000});
            }
        });

    }
}

function find_isbn() {
    ISBN = $("#findISBN").val();
    $.ajax({
        type: 'post',
        url: 'getIsbn.php',
        data: {
            isbn: ISBN
        },
        dataType: 'JSON',
        success: function(rs) {
            if (rs != 0) {
                dealISBN(rs);
            } else layer.alert("查无此书！");
        }
    });
}

function dealISBN(b) {
    console.log(b);
    $("#b_author").val(b.author);
    $("#b_name").val(b.title);
    $("#price").val(b.price);
    $("#b_press").val(b.publisher);
    $("#image").src = b.images.medium;
    $("#pic_url").val(b.images.medium);
}

// “所有书籍分页”页面初始化时加载这个函数
function readyinit() {
    check_latest();
    countpage();
}

function detail(id) {
    setCookie('b_ID', id, 1);
    self.location = 'details.html';
}

var page = 1;
var is_last_page = false;

function more_latest() {
    $.ajax({
        type: 'post',
        url: 'latestMore.php',
        data: { page: page },
        dataType: 'JSON',
        success: function(rs) {
            if (rs.length < 12) {
                is_last_page = true;
            } else { is_last_page = false };
            if (rs != 0) {
                deal_latest(rs);
            }
            pagenum();
        }
    });
}

var countpage;

function countpage() {
    $.ajax({
        type: 'post',
        url: 'countpage.php',
        data: { page: page },
        dataType: 'JSON',
        success: function(rs) {
            countpage = Math.ceil(rs / 12);
            pagenum();
        }
    });
}

function pagenum() {
    $("#pagenum").html('');
    for (var i = page - 1; i <= countpage; i++) {
        if (i < 1) i = 1;
        if (i - page > 2) break;
        $("#pagenum").append("<a onclick=mypage(this) page='" + i + "'>" + i + "</a>");
    }

}

function mypage(obj) {
    page = $(obj).attr('page');
    more_latest();
}

function prepage(obj) {
    page--;
    if (page < 1) page = 1;
    more_latest();
}

function nextpage() {
    if (!is_last_page) {
        page++;
        more_latest();
    } else {
        layer.msg('已到最后一页，没有更多了', { icon:5, time: 500 });
        return;
    }
}

function showDetails() {
    $.ajax({
        type: 'post',
        url: 'details.php',
        data: { b_ID: getCookie('b_ID')},
        dataType: 'JSON',
        success: function(rs) {
            if (rs != 0) {
                dealDetails(rs);
            }
        }
    });
}

function dealDetails(rs) {
    for (var book of rs) {
        $("#title").html(book.b_name);
        $("#b_author").html(book.b_author);
        $("#b_press").html(book.b_press);
        $("#b_price").html(book.b_price);
        $("#addTime").html(book.addDate);
        $("#b_quantity").html(book.b_quantity);
        $("#collect").attr("b_id", book.b_ID);
        $("#buy").attr("b_id", book.b_ID);
        $("#pic_url").attr("src", book.pic_url);
    }
}

function showOrder() {
    $.ajax({
        type: 'post',
        url: 'buy.php',
        data: {},
        dataType: 'JSON',
        success: function(rs) {
            if (rs != 0) {
                dealOrder(rs);
            }
        }
    });
}

function dealOrder(rs) {
    $('.orderList').html('');
    for (var book of rs) {
        var order_ID = book.b_name;
        var b_author = book.b_author;
        var b_press = book.b_press;
        var b_price = book.b_price;
        var addTime = book.addTime;
        var classname = book.classname;
        var b_quantity = book.b_quantity;

        $('.orderList').append(
            "<div class='orderList'>" +
            "<table>" +
            "<tr style='background-color: #ececec; width: 350px;'>" +
            "<td  style='text-align:left'><label>日期：" + addTime + "</label></td>" +
            "<td ><label>订单号：" + order_ID + "</label></td>" +
            "<td colspan='4' style='text-align:left'><label>卖方ID：" + seller_tel + "</label></td>" +
            "</tr>" +
            "<tr>" +
            "<td rowspan='2'><img src='images/books/doudou.jpg' id='bookCover' width='100px' height='120px'></td>" +
            "<td><label>书籍ID</label></td>" +
            "<td><label>书名</label></td>" +
            "<td><label>单价</label></td>" +
            "<td><label>数量</label></td>" +
            "<td><label>总价</label></td>" +
            "</tr>" +
            "<tr>" +
            "<td><label>" + b_ID + "</label></td>" +
            "<td><label>" + b_name + "</label></td>" +
            "<td><label>￥" + b_price + "</label></td>" +
            "<td><label>" + b_quantity + "</label></td>" +
            "<td><label>￥" + totalprice + "</label></td>" +
            "</tr>" +
            "</table>" +
            "</div>"
        );
    }

}

function collect(t) {
    var b_ID = $(t).attr('b_id');
    $.ajax({
        type: 'post',
        url: 'collect.php',
        data: { b_ID: b_ID},
        dataType: 'JSON',
        success: function(rs) {
            if (rs != 0) {
                layer.msg('收藏成功！', { icon:6, time: 1000 });
            }
        }
    });
}

// function dealCollect(rs) {
//      $('.orderList').html('');
//     for (var book of rs) {
//         var seller_tel = book.seller_tel;
//         var pic_url = book.pic_url;
//         var b_ID = book.b_ID;
//         var b_price = book.b_price;
//         var b_quantity = book.b_quantity;

//         $('.orderList').append(

//             "<div class='orderList'><table><tr style='background-color: #ececec; width: 350px;'><td colspan='6' style='text-align:left'>"+
//                     "<label>卖方ID："+seller_tel+"</label></td></tr><tr><td rowspan='2'><div class='checkbox'><label>勾选商品</label>"+
//                     "</div><img src='"+pic_url+"' id='bookCover' width='100px' height='120px'></td><td>"+
//                     "<label>书籍ID</label></td><td><label>书名</label></td><td><label>单价</label></td><td><label>数量</label></td>"+
//                     "<td rowspan='2'><a>移出收藏</a></td></tr><tr><td>"+
//                     "<label>"+b_ID+"</label></td><td>"+
//                     "<label>"+b_name+"</label></td><td>"+
//                     "<label>￥"+b_price+"</label></td><td><label>"+b_quantity+"</label></td></tr></table></div>"
//         );
//     }
// }

function mycollect() {
    // var b_ID = $(t).attr('b_id');
    $.ajax({
        type: 'post',
        url: 'mycollect.php',
        data: { b_ID: getCookie('b_ID')},
        dataType: 'JSON',
        success: function(rs) {
            if (rs != 0) {
                // layer.msg('收藏成功！', { icon:6, time: 1000 });
                dealCollect(rs);
            }
        }
    });
}

function dealCollect(rs) {
    for (var book of rs) {
        $("#b_ID")=getCookie('b_ID');
        $("#b_name").html(book.b_name);
//         $("#b_author").html(book.b_author);
//         $("#b_press").html(book.b_press);
        $("#b_price").html(book.b_price);
//         $("#addTime").html(book.addTime);
        $("#b_quantity").html(book.b_quantity);
//         $("#collect").attr("b_id", book.b_ID);
//         $("#buy").attr("b_id", book.b_ID);
        $('#bookCover').val(book.pic_url);
        $("#pic_url").src = book.pic_url;
        
//          // $("#classname").html(user.classname);
    }
}

function buy(t) {
    var tel = $(t).attr('tel');
    // $.ajax({
    //     type: 'post',
    //     url: 'buy.php',
    //     data: { tel: tel },
    //     dataType: 'JSON',
    //     success: function(rs) {
    //         if (rs != 0) {
                layer.alert('卖方手机号码为13312345678，请私下与卖方沟通！');
    //         }
    //     }
    // });
}

function search() {
    var b_name = $.trim($("#b_name").val());
    if (b_name == "") {
        layer.alert("搜索关键词不能为空！");

    } else {
        $.ajax({
            url: 'search.php?keyword=' + b_name,
            data: {
                b_name: b_name
            },
            dataType: 'text',
            success: function(num) {
                if (num == 1) {
                    showDetails();
                } else layer.alert("查无此书！");
            }
        });
    }
}