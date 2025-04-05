//swiper控制
var mySwiper = new Swiper('.swiper', {
    direction: 'vertical', // 垂直切换选项
    loop: false, // 循环模式选项
    init: false,//是否立即触发滑动
    on: {
        slideChangeTransitionEnd: function () {
            current = this.activeIndex;
            let play = document.querySelectorAll(".play");
            let video = document.querySelectorAll('video');
            for (let i = 0; i < video.length; i++) {
                video[i].pause();
                play[i].style.opacity = 1;
            }
            video[this.activeIndex].play();
            play[this.activeIndex].style.opacity = 0; //切换结束时告诉第几个视频
        },
        //swiper切换到最后一个Slide时  再次发请求
        reachEnd: function () {
            num++;
            getVideo(num, 5, (data) => {
                MyVideo(data);
                mySwiper.update();   //放里面  放外面不稳定
            });
            // mySwiper.update();              // 更新 DOM 结构
        }
    }
})

//动态创建swiper-slide  请求多少条数据 创建多少个 添加到swiper-wrapper中
let swiper_wrapper = document.querySelector(".swiper-wrapper");
let num = 11;
getVideo(num, 5, (data) => {
    MyVideo(data);
});

function MyVideo(data) {
    let list = data.result.list;
    let add = [];
    list.forEach((item, index) => {
        let info = `
            <div class="swiper-slide">
                    <video class="video" poster="${item.coverUrl}" src="${item.playUrl}"></video>
                    <p class="author">${item.userName}</p>
                    <span class="content">${item.title}</span>
                    <span class="play" style="opacity:1">
                        <i></i>
                    </span>
            </div>`
        add.push(info);
    })
    swiper_wrapper.innerHTML += add.join("");
    //初始化swiper
    mySwiper.init();
    //获取dom元素
    let play = document.querySelectorAll(".play");
    let video = document.querySelectorAll('video');
    let current = 0;
    //播放按钮绑定事件 点击播放
    for (let i = 0; i < play.length; i++) {
        play[i].addEventListener("click", () => {
            current = i;
            if (play[i].style.opacity == 1) {
                bofang();
            }
            else {
                play[i].style.opacity = 1;
                video[i].pause();
            }
        })
    }

    //视频播放结束
    for (let i = 0; i < video.length; i++) {
        video[i].addEventListener("ended", function () {
            play[i].style.opacity = 1;
            video[i].pause();
        })
    }

    //video播放排他
    function bofang() {
        for (let i = 0; i < video.length; i++) {
            video[i].pause();
            play[i].style.opacity = 1;
        }
        video[current].play();
        play[current].style.opacity = 0;
    }
}


//发送ajax请求函数
function getVideo(page, size, callback) {
    //创建xhr对象
    var xhr = new XMLHttpRequest();
    //配置请求参数
    xhr.open("GET", `https://api.apiopen.top/api/getHaoKanVideo?page=${page}&size=${size}`);
    //发送请求
    xhr.send();
    //设置响应类型
    xhr.responseType = 'json';
    //设置请求完成的回调函数--监听事件
    xhr.onload = function () {
        if (xhr.status === 200) {
            //请求成功，处理响应数据
            //xhr.status  --- 相当于code
            //xhr.response  --相当于result
            let result = xhr.response;
            //闭包-外界函数使用内部数据
            callback && callback(result);
        }
        else {
            //请求失败，处理错误
            console.error('请求失败:', xhr.status, xhr.statusText);
        }
    }
}
