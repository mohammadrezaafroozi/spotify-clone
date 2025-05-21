// start swiper

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  speed: 600,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 10,
    stretch: 120,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
  on: {
    click(event) {
      swiper.slideTo(this.clickedIndex);
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

// end of swiper

//select element

const progress = document.getElementById('progress')
const song = document.getElementById('song')
const controlIcon = document.getElementById('controlIcon')
const playPauseBtn = document.querySelector('.play-pause-btn')
const forwardBtn = document.querySelector('.controls button.forward')
const backwardBtn = document.querySelector('.controls button.backward')
const rotatingImage = document.getElementById('rotatingImage')
const songName = document.querySelector('.music-player h2')
const artistName = document.querySelector('.music-player p')
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const musicPlays = document.querySelectorAll(".song");

let rotating =false;
let currentRotation = 0;
let rotateInterval


const songs = [
  {
    title: "Gole Yakh",
    name: "koroush yaghmaei",
    source: "music/1Kourosh Yaghmaei Gole Yakh.mp3",
    cover: "img/1.jpg"
  },
  {
    title: "Asire Shab",
    name: "farhad mehrad ",
    source: "music/2Farhad Asire Shab.mp3",
    cover: "img/2.jpg"
  },
  {
    title: "Pol",
    name: "Googoosh",
    source: "music/3Googoosh Pol.mp3",
    cover: "img/3.jpg"
  },
  {
    title: "Pichak",
    name: "Ebi",
    source: "music/4Ebi Pichak.mp3",
    cover: "img/4.jpg"
  },
  {
    title: "Bohemian-Rhapsody",
    name: "Queen",
    source: "music/5Queen-Bohemian-Rhapsody-Official-Video_15973.mp3",
    cover: "img/5.jpg"
  },

  {
    title: "Taghdir",
    name: "Shadmehr",
    source: "music/6Shadmehr Aghili Taghdir.mp3",
    cover: "img/6.jpg"
  },
  {
    title: "Pooste Shir",
    name: "Ebi",
    source: "music/7Ebi Pooste Shir.mp3",
    cover: "img/7.jpg"
  },
];


// start profile section

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

// end of profile section




let currentSongIndex = 0
function startRotation(){
    if(!rotating){
        rotating = true
        rotationInterval =setInterval(rotateImage, 50)
    }
}
function pauseRotation(){
    clearInterval(rotationInterval)
    rotating = false
}
function rotateImage(){
    currentRotation += 1;
    rotatingImage.style.transform = `rotate(${currentRotation}deg)`
}
function updateSongInfo(){
    songName.textContent = songs[currentSongIndex].title
    artistName.textContent = songs[currentSongIndex].name; 
    song.src = songs[currentSongIndex].source;
    rotatingImage.src = songs[currentSongIndex].cover;

    song.addEventListener('loadedmetadata', function updateDuration() {
        durationEl.textContent = formatTime(song.duration);
        song.removeEventListener('loadedmetadata', updateDuration);
    });

    // for sync active music---
    musicPlays.forEach((songEl, runSong) => {
        songEl.className = "song";
        if(runSong === currentSongIndex){
            songEl.classList.add("active");
        }
    });
}
song.addEventListener('loadedmetadata' , function(){
  progress.max = song.duration;
  progress.value = song.currentTime
});
song.addEventListener('ended', function(){
  currentSongIndex =(currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause()
});
song.addEventListener('timeupdate', function(){
  if(!song.paused){
    progress.value = song.currentTime;
  }
})

/////controls
function playPause(){
  if(song.paused){
    song.play()
    controlIcon.classList.add('fa-pause')
    controlIcon.classList.remove('fa-play')
    startRotation();
  } else{
    song.pause()
    controlIcon.classList.remove('fa-pause')
    controlIcon.classList.add('fa-play')
    pauseRotation()
  }
}
playPauseBtn.addEventListener('click', playPause);
progress.addEventListener('input' , function(){
  song.currentTime= progress.value;
})
progress.addEventListener('change', function(){
  song.play()
   controlIcon.classList.add('fa-pause');
    controlIcon.classList.remove('fa-play');
    startRotation();
})
forwardBtn.addEventListener('click', function(){
  currentSongIndex++
  if(currentSongIndex>songs.length - 1){
    currentSongIndex = 0
  }
  updateSongInfo();
  playPause();
})
backwardBtn.addEventListener('click', function(){
  currentSongIndex--
  if(currentSongIndex < 0){
    currentSongIndex = songs.length - 1;
  }
  updateSongInfo()
  playPause()
})


///time show
function formatTime(sec) {
  const minutes = Math.floor(sec / 60) || 0;
  const seconds = Math.floor(sec % 60) || 0;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

song.addEventListener('loadedmetadata', function() {
  durationEl.textContent = formatTime(song.duration);
});

song.addEventListener('timeupdate', function() {
  currentTimeEl.textContent = formatTime(song.currentTime);
});

////music click




musicPlays.forEach((musicPlay, i) => {
  musicPlay.addEventListener("click", () => {
    musicPlays.forEach((song) => {
      song.className = "song";
    });
    musicPlay.className = "song active";
    currentSongIndex = i;          
    updateSongInfo();             
    playPause();                
  });
});