<template>
    <!-- 根据isPlaying的状态来控制唱片的旋转 -->
    <div class="music-player" :class="{ playing: isPlaying, paused: !isPlaying }">
        <div class="music-container">
            <!-- 音乐封面 -->
            <div class="img-container">
                <img :src="currentCoverUrl" alt="music-cover" class="cover-img">
            </div>

            <!-- 音乐信息 -->
            <div class="music-info">
                <h4 class="title">{{ currentSong }}</h4>
            </div>

            <!-- 播放控制 -->
            <div class="controls">
                <button @click="prevSong">
                    <img src="../images/上一个.png" alt="">
                </button>
                <button v-if="!isPlaying" @click="playSong">
                    <img src="../images/播放.png" alt="">
                </button>
                <button v-else @click="pauseSong">
                    <img src="../images/暂停.png" alt="">
                </button>
                <button @click="nextSong">
                    <img src="../images/下一个.png" alt="">
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            isPlaying: false, //判断是否正在播放
            songs: ["气象站台", "打上花火", "Mojito", "小城小爱", "当爱在靠近", "云与海", "我的楼兰"],
            songIndex: 0,
            currentSong: "",
            currentCoverUrl: "",
            audio: null,
        };
    },
    mounted() {
        // 加载完成第一首歌
        this.loadSong();
    },
    computed: {
        currentSongUrl() {
            return require(`@/images/music/source/${this.currentSong}.mp3`);  // 根据当前播放的音乐名称获取音乐的URL
        },
    },
    methods: {
        // 加载所有音乐，给data数据初始化
        loadSong() {
            this.currentSong = this.songs[this.songIndex];
            this.currentCoverUrl = require(`@/images/music/img/${this.currentSong}.jpg`);
            if (this.audio) {
                this.audio.src = this.currentSongUrl;
            }
        },
        createAudio() {
            this.audio = new Audio(); //创建音频对象
            this.audio.src = this.currentSongUrl; // 设置音频对象的音乐源URL
            this.audio.addEventListener("ended", this.nextSong); // 监听音频播放结束事件，以便切换到下一首歌曲
        },
        playSong() {
            this.isPlaying = true;
            if (!this.audio) {
                this.createAudio(); // 如果音频对象不存在，则创建音频对象并设置音乐源URL
            }
            this.audio.play();
        },
        pauseSong() {
            this.isPlaying = false;
            if (this.audio) {
                this.audio.pause();
            }
        },
        prevSong() {
            this.songIndex = (this.songIndex - 1 + this.songs.length) % this.songs.length; // 计算上一首歌曲在音乐列表中的索引
            this.loadSong(); // 加载并播放上一首歌曲
            if (this.isPlaying) {
                this.audio.play();
            }
        },
        nextSong() {
            this.songIndex = (this.songIndex + 1) % this.songs.length; // 计算下一首歌曲在音乐列表中的索引
            this.loadSong();
            if (this.isPlaying) {
                this.audio.play();
            }
        },

    },
    beforeDestroy() {
        if (this.audio) {
            this.audio.pause(); // 在组件销毁前暂停音乐播放
            this.audio.removeEventListener("ended", this.nextSong); // 移除音频播放结束事件监听器
        }
    },
};
</script>  
  
<style scoped>
.music-player {
    width: 800px;
    height: 300px;
    margin: 0 auto 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 8px rgb(127, 178, 245),
        0 0 8px rgb(127, 178, 245),
        12px 12px 20px rgb(127, 178, 245),
        0 0 8px rgb(127, 178, 245);
    border-radius: 12px;

}

.music-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cover-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
}

.title {
    margin: 0;
    font-size: 24px;
}

.controls {
    margin-top: 20px;
}

.controls img {
    cursor: pointer;
    width: 40px;
    height: 40px;
}

.controls button {
    margin-left: 30px;
    border: none;
    background-color: #f3f3f3;
    border-radius: 8px;
}

.controls button:first-child {
    margin: 0;
}

/* 添加旋转动画 */
@keyframes rotate {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

/* 播放状态下运行动画 */
.playing .cover-img {
    animation: rotate 5s linear infinite;
}

/* 暂停状态下停止动画 */
.paused .cover-img {
    animation-play-state: paused;
}
</style>
  