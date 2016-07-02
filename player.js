'use_strict';

var player = document.getElementById('main-player');
player.removeAttribute('controls');
var btn_play_pause = document.getElementById('btn-play-pause');
var btn_settings = document.getElementById('btn-settings');
var btn_fullscreen = document.getElementById('btn-fullscreen');
var btn_volume = document.getElementById('btn-volume');
var progress_bar = document.getElementById('progress-bar');
var progress_text = document.getElementById('progress-text');
var controls = document.getElementById('controls');

var is_playing = false;
var is_dragging = false;
var is_fullscreen = false;
//* EVENTS *//

window.onresize = function(){
  resize();
};

window.onload = function(){
  resize();
};

window.addEventListener('mouseenter', function(){
  controls.style.opacity = 100;
}, false);

window.addEventListener('mouseleave', function(){
  controls.style.opacity = 0;
}, false);

btn_play_pause.onclick = function(){
  toggle_play_pause();
};

btn_volume.onclick = function(){

};

btn_fullscreen.onclick = function(){
  fullscreenToggle();
};

progress_bar.onclick = function(e){
  setTime(e.offsetX / progress_bar.offsetWidth);
};

progress_bar.onmousedown = function(){
  is_dragging = true;
};

progress_bar.onmouseup = function(){
  is_dragging = false;
};

progress_bar.onmousemove = function(e){
  if(is_dragging){
    setTime(e.offsetX / progress_bar.offsetWidth);
  }
};
/*
Is not smooth enough to display timings
player.ontimeupdate = function(e){
  updateTimeDisplay(player.currentTime, player.duration);
};
*/
setInterval(function(){
  updateTimeDisplay(player.currentTime, player.duration);
}, 10);

//* END EVENTS */

/**
 * Do resizing things that require javascript
 */
function resize(){
  player.width = window.innerWidth;
  player.height = window.innerHeight;

  progress_bar.style.width = player.width - 50 - 50 - progress_text.offsetWidth - 10 +'px';
  if(player.width < 460){
    progress_text.style.display = 'none';
    progress_bar.style.width = player.width - 50 - 50 - 50 - 50 - 10 +'px';
  }else{
    progress_text.style.display = 'inline';
    progress_bar.style.width = player.width - 50 - 50 - 50 - 50 - progress_text.offsetWidth - 10 +'px';
  }
};

/**
 * Set the time to a location
 */
function setTime(percentage){
  player.currentTime = player.duration * percentage;
  updateTimeDisplay(player.currentTime, player.duration);
}

/**
 * Update the progress bar and time display
 */
function updateTimeDisplay(currentTime, duration){
  if(duration <= 0 || !duration){ //prevent running when not loaded
    return;
  }
  var ct_s = Math.floor(currentTime % 60);
  var ct_m = Math.floor(currentTime / 60);
  var d_s = Math.floor(duration % 60);
  var d_m = Math.floor(duration / 60);
  ct_s = ct_s < 10 ? '0' + ct_s : ct_s;
  ct_m = ct_m < 10 ? '0' + ct_m : ct_m;
  d_s = d_s < 10 ? '0' + d_s : d_s;
  d_m = d_m < 10 ? '0' + d_m : d_m;

  progress_text.innerHTML = ct_m + ":" + ct_s + " / " + d_m + ":" + d_s;
  progress_bar.value = (currentTime / duration) * 100;
};

/**
 * Toggle video playback
 */
function toggle_play_pause(){
  if(is_playing){
    pause();
  }else{
    play();
  }
};

/**
 * Stop video playback
 */
function pause(){
  is_playing = false;
  player.pause();
  btn_play_pause.innerHTML = '<i class="fa fa-play"></i>';
};

/**
 * Start video playback
 */
function play(){
  is_playing = true;
  player.play();
  btn_play_pause.innerHTML = '<i class="fa fa-pause"></i>';
};

/**
 * Toggle fullscreen for video
 */
function fullscreenToggle(){
  if(is_fullscreen){
    leaveFullscreen();
  }else{
    enterFullscreen();
  }
};

/**
 * Leave fullscreen
 */
function leaveFullscreen(){
  is_fullscreen = false;
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
};

/**
 * Enter fullscreen
 */
function enterFullscreen(){
  is_fullscreen = true;
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    alertMessage('Fullscreen is not supported by your browser', 'error');
    is_fullscreen = false;
  }
}

function alertMessage(msg, type){
  alert(msg);
};
