// Selecting The Required Elements
const music = document.getElementById("current-music");
const img = document.getElementById("current-img");
const play = document.getElementById("play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progress_div = document.getElementById('progress-div');

// Selecting the require duration of songs
let total_duration = document.getElementById('duration');
const current_Time = document.getElementById('current-time');

// Selecting the required songs and there features
const musics =
    [
        {
            name: "kahanisuno",
            title: "Kahani Suno 2.0",
            artist: "Kaifi Khalil",
        },
        {
            name: "taare",
            title: "Taare Slowed",
            artist: "Tanishk Bagchi",
        },
        {
            name: "alagaasman",
            title: "Alag Aasman",
            artist: "Anuv Jain",
        },
        {
            name: "moonrise",
            title: "Moon Rise",
            artist: "Guru Randhawa",
        },
        {
            name: "daku",
            title: "Daku Slowed",
            artist: "Inderpal Moga",
        },
        {
            name: "miamor",
            title: "Mi Amor",
            artist: "Sharn",
        },
        {
            name: "humnavamere",
            title: "Humnava Mere",
            artist: "Jubin Nautiyal",
        },
        {
            name: "youreyes",
            title: "Your Eyes",
            artist: "Barney SKu",
        },
    ]

// Setting the default player value as false
var isPlaying = false;

// Creating the play function
const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add("anime");
};

// Creating the pause function
const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove("anime");
};

//Creating Event Responses
play.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    }
    else {
        playMusic();
    }
});

//Loading The Songs
const loadSong = (musics) => {
    title.textContent = musics.title;
    artist.textContent = musics.artist;
    music.src = "/musics/" + musics.name + ".mp3";
    img.src = "/images/" + musics.name + ".jpg";
};

//Adding The Duration Or Progress Bar
music.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    //Music Duration Update
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let tot_duration = `${min_duration}:${sec_duration}`;
    if (duration) {
        total_duration.textContent = `${tot_duration}`;
    }

    //Current Duration Update
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_Time.textContent = `${tot_currentTime}`;
});

//Progress OnClick Functionality
progress_div.addEventListener('click',(event) =>
{
    const {duration} = music;
    let move_progress = (event.offsetX/event.target.clientWidth)*duration;
    music.currentTime = move_progress;
});

//Default Music As The 1st One
let music_current = 0;

//Adding Event To The Next Function
next.addEventListener('click', () => {
    if (music_current < 7) {
        music_current = music_current + 1;
        loadSong(musics[music_current]);
        isPlaying = false;
        music.pause();
        play.classList.replace('fa-pause', 'fa-play');
        img.classList.remove("anime");
    }

    else {
        alert("NO SONG IS AVAILIABLE AT THE MOMENT");
    }
});

//Adding Event To The Previous Function
prev.addEventListener('click', () => {
    if (music_current > 0) {
        music_current = music_current - 1;
        loadSong(musics[music_current]);
        isPlaying = false;
        music.pause();
        play.classList.replace('fa-pause', 'fa-play');
        img.classList.remove("anime");
    }

    else {
        alert("NO SONG IS AVAILIABLE AT THE MOMENT");
    }
});

//Making play/pause accessible with the space bar
window.onkeydown = function (event) {
    if (event.keyCode === 32) {
        event.preventDefault();
        play.click();
    }
};