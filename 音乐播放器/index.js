window.addEventListener('load', (e) => {
    //当前曲
    let current = 0;
    //audio
    let audio = document.querySelector('audio');
    // 右侧显示
    let list = document.querySelector('.list');
    let list2 = document.querySelector(".fa-angle-right");
    let liebiao = document.querySelector("#liebiao");
    liebiao.addEventListener("click", () => {
        //点击后获取元素 才会使list3不为空
        let list3 = document.querySelectorAll('#a');
        if (list.style.width == 0 + 'px') {
            list.style.width = '25%';
            list3.forEach((item) => {
                item.style.opacity = 1;
            })
        }
        else {
            list.style.width = 0;
            list3.forEach((item) => {
                item.style.opacity = 0;
            })
        }
    });
    list2.addEventListener("click", () => {
        let list3 = document.querySelectorAll('#a');
        list.style.width = 0;
        list3.forEach((item) => {
            item.style.opacity = 0;
        })
    })

    jindu();
    //动态渲染歌曲信息
    let info = document.querySelector(".info");
    const musicAdd = (data) => {
        let music_info = `
                <h4 class="name">${data[current].name}</h4>
                <div class="singer">${data[current].author}</div>
                <div class="progress">
                    <div class="music-top">
                        <span class="now">00:05</span>
                        <span class="residue">${data[current].time}</span>
                    </div>
                    <div class="music-bottom">
                        <span class="line"></span>
                    </div>
                </div>
                `
        info.innerHTML = music_info;
    }
    musicAdd(data);

    //动态渲染列表信息
    let music_list = document.querySelector(".list-bottom");
    const listAdd = (data) => {
        data.forEach((item, index) => {
            let list_info = `
                    <p id="${index}">${index}.${item.name} - ${item.author}<i class="fa fa-play-circle" id="a"></i></p>
                     `
            music_list.innerHTML += list_info;
        });
    }
    listAdd(data);


    //背景渲染
    let mask = document.querySelector('.mask');
    const mask_render = (data) => {
        mask.style.background = `url(${data[current].cover}) no-repeat center center;`
    }
    // mask_render(data);

    //音乐列表事件
    //音乐列表
    //音乐列表
    let p = document.querySelectorAll('p');
    let node = document.querySelectorAll('#a');
    for (let i = 0; i < p.length; i++) {
        p[i].addEventListener("click", function () {
            for (let j = 0; j < p.length; j++) {
                p[j].style.color = 'black';
                node[j].className = 'fa fa-play-circle';
            }
            this.style.color = '#00AEEC';
            node[i].className = 'fa fa-pause-circle';
            current = this.id;
            //换唱片和背景
            img.src = data[current].cover;
            mask_render(data);
            //信息更改
            musicAdd(data);
            qiehuan();
        })
    }

    //播放按钮
    //暂停控制
    let run = document.querySelector(".card");
    let running = document.querySelector("#button");
    //卡片划出
    let palyer_info = document.querySelector(".palyer-info");
    //给播放链接
    audio.src = data[current].audio_url;   //不应该在播放函数里 否则会每次重置路径导致暂停后播放从头开始
    running.addEventListener("click", () => {
        bofang();
    })

    //下一曲
    let next = document.querySelector("#next");
    let img = document.querySelector('#card_img');
    //记忆的唱片背景
    img.src = data[current].cover;
    next.addEventListener("click", () => {
        next_music();
    })

    //上一曲
    let prev = document.querySelector('#prev');
    prev.addEventListener("click", () => {
        current--;
        if (current < 0) {
            current = data.length - 1;
        }
        //换唱片和背景
        img.src = data[current].cover;
        // mask_render(data);
        //信息更改
        musicAdd(data);
        qiehuan();
        //列表切换
        list_change();
    })


    //记忆
    //进度条  
    audio.addEventListener("timeupdate", () => {
        localStorage.setItem('audioCurrentTime', audio.currentTime);
        localStorage.setItem('index', current);
        let now_time = dura(audio.currentTime);
        document.querySelector('.now').innerHTML = now_time;
        //进度---audio.duration--歌曲总时长
        let value = (audio.currentTime / audio.duration) * 100;  //每次发生播放事件时都要重新获取 不然获取的一直是第一次的
        document.querySelector('.line').style.width = value + '%';
        //当歌曲播完后 切歌
        if (audio.currentTime == audio.duration) {
            next_music();
        }
    })

    // 下一曲函数
    function next_music() {
        current++;
        if (current > data.length - 1) {
            current = 0;
        }
        //换唱片和背景
        img.src = data[current].cover;
        // mask_render(data);
        //信息更改
        musicAdd(data);
        //切歌
        qiehuan();
        //列表切换
        list_change();
    }

    //开始时播放函数
    function bofang() {
        running.classList.toggle('fa-pause');
        if (run.style.animationPlayState == 'paused') {
            run.style.animationPlayState = 'running';
            palyer_info.style.top = -90 + 'px';
            palyer_info.style.opacity = 1;
            // audio.src = data[current].audio_url;
            node[current].className = 'fa fa-pause-circle';
            audio.play();
            //列表切换
            list_change();
        }
        else {
            run.style.animationPlayState = 'paused';
            palyer_info.style.top = -10 + 'px';
            palyer_info.style.opacity = 0;
            audio.pause();
            node[current].className = 'fa fa-play-circle';
        }
    }
    //切换时播放函数
    function qiehuan() {
        running.className = 'fa fa-play fa-pause';
        run.style.animationPlayState = 'running';
        palyer_info.style.top = -90 + 'px';
        palyer_info.style.opacity = 1;
        audio.src = data[current].audio_url;
        audio.play();
    }


    //恢复之前播放进度
    function jindu() {
        const savedTime = localStorage.getItem('audioCurrentTime');
        if (localStorage.getItem('index')) {
            current = localStorage.getItem('index');
        }
        else {
            current = 0;
        }
        if (savedTime) {
            audio.currentTime = savedTime;
        }
    }
    //时长
    function dura(time) {
        let m = parseInt(time / 60);
        let s = parseInt(time % 60);
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return `${m}:${s}`
    }

    //列表切换
    function list_change() {
        for (let i = 0; i < p.length; i++) {
            p[i].style.color = 'black';
            node[i].className = 'fa fa-play-circle';
        }
        p[current].style.color = '#00AEEC';
        node[current].className = 'fa fa-pause-circle';
    }


})