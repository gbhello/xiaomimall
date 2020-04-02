//处理首页导航部分 生命模块遵从AMD
define(["jquery"], function ($) {
    function download() {
        //数据下载
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function (result) {
                var bannerArr = result.banner;
                //通过循环将数据添加到页面上
                for (var i = 0; i < bannerArr.length; i++) {
                    $(`<a href="${bannerArr[i].url}">
                    <img class='swiper-lazy swiper-lazy-loaded' src='../images/banner/${bannerArr[i].img}' alt=""/>
                    </a>`).appendTo("#J_homeSwiper .swiper-slide");

                    var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`)
                    if (i == 0) {
                        node.addClass("swiper-pagination-bullet-active");
                    }
                    node.appendTo("#J_homeSwiper .swiper-pagination");
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }


    //实现轮播图的轮播效果
    function banner() {
        //记录当前显示的图片下标
        var iNow = 0;

        //记录图片
        var aImgs = null;

        //记录小圆圈
        var aBtns = null;

        //定时器
        var timer = setInterval(function () {
            iNow++;
            tab();
        }, 2500);

        //封装切换函数
        function tab() {
            //如果图片不存在，查找轮播图图片
            if (!aImgs) {
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            //如果按钮不存在，查找按钮
            if (!aBtns) {
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a")
            }

            //循环展示图片
            if (iNow == 5) {
                iNow = 0;
            }
            //图片切换
            aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({ opacity: 1 }, 500);
            //小圆点按钮切换
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        //添加鼠标的移入移出
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 2500);
        })

        //点击小圆圈，可以完成对应的图片切换 【注】 事件委托
        $("#J_homeSwiper .swiper-pagination").on("click","a",function(){
            iNow=$(this).index();
            tab();
            return false;
        })

        //点击左右切换按钮，切换图片
        $(".swiper-button-prev,.swiper-button-next").click(function(){
            if(this.className =="swiper-button-prev"){
                iNow--;
                if(iNow==-1){
                    iNow=4;
                }
            }else{
                iNow++;
            }
            tab();
        })

    }

    return {
        download: download,
        banner: banner
    }
})