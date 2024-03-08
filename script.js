const playButton = document.getElementById("playButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const songButtons = document.querySelectorAll(".songButtons");
const progressRange = document.getElementById("progressRange");
const progressBar = document.getElementById("progressBar");
const audio = document.getElementById("audio");

const songs = ['1','2','3'];
let songIndex = 0;
let isPlay = false;

loadSong(songs[songIndex]);
playAudio;

function loadSong(song) {
    audio.src = song + '.mp3';
}

//playList
songButtons.forEach(button => {
    button.addEventListener("click", () => {
        for (let i =0; i < songButtons.length; i++) {
            songButtons[i].classList.remove("current");
        }
        isPlay = false;
        songIndex = button.id;
        loadSong(songs[songIndex]);
        button.classList.add("current");
        playAudio();
        console.log(isPlay);
    })
})

//navigation
playButton.addEventListener("click", playAudio);

function playAudio() {
    if (isPlay == false) {
        audio.play();
        playButton.src = "pauseButton.png";
        isPlay = true;        
    } else if (isPlay == true) {
        audio.pause();
        playButton.src = "playButton.png";
        isPlay = false;
    }
}

prevButton.addEventListener("click", prevSong);

function prevSong() {
    for (let i =0; i < songButtons.length; i++) {
        songButtons[i].classList.remove("current");
    }
    isPlay = false;
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    songButtons[songIndex].classList.add("current"); 
    playAudio();
}
nextButton.addEventListener("click", nextSong);

function nextSong() {
    for (let i =0; i < songButtons.length; i++) {
        songButtons[i].classList.remove("current");
    }
    isPlay = false;
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    console.log("songIndex:" + songIndex);
    loadSong(songs[songIndex]);
    songButtons[songIndex].classList.add("current"); 
    playAudio();
}

//progress
audio.addEventListener("timeupdate", progressUpdate);
progressRange.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

function progressUpdate() {
    var duration = audio.duration;
    var currentTime = audio.currentTime;
    
    var percent = (currentTime/duration) * 100;
    progressBar.style.width = percent + '%';
}

function setProgress(ev) {
    const width = progressRange.clientWidth;
    const clickX = ev.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX/width) * duration; 

}