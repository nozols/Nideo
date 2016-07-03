'use_strict';

var player = document.getElementById('main-player');
player.removeAttribute('controls');
var btn_play_pause = document.getElementById('btn-play-pause');
var btn_settings = document.getElementById('btn-settings');
var btn_fullscreen = document.getElementById('btn-fullscreen');
var btn_volume = document.getElementById('btn-volume');
var input_volume = document.getElementById('input-volume');
var input_playback = document.getElementById('input-playback');
var input_loop = document.getElementById('input-loop');
//var progress_bar = document.getElementById('progress-bar');
var progress_bar_container = document.getElementById('progress-bar');
var progress_bar_in_buffer = document.getElementById('in-buffer');
var progress_bar_completed = document.getElementById('completed');
var progress_text = document.getElementById('progress-text');
var controls = document.getElementById('controls');
var volume = document.getElementById('volume');
input_volume.value = player.volume * 100;

var is_playing = false;
var is_dragging = false;
var is_fullscreen = false;
var is_muted = false;
var is_settings_open = false;
var mouse_still = 0;

//* EVENTS *//

window.onresize = function(){
  resize();
};

window.onload = function(){
  resize();
};

player.onmouseenter = function(){
  controls.style.opacity = 100;
};

player.onmouseleave = function(){
  controls.style.opacity = 100;
};

player.onmousemove = function(){
  mouse_still = 0;
};

player.onended = function(){
  pause(true);
};

controls.onmouseenter = function(){
  controls.style.opacity = 100;
};

controls.onmouseleave = function(){
  controls.style.opacity = 100;
};

controls.onmousemove = function(){
  mouse_still = 0;
};

btn_play_pause.onclick = function(){
  togglePlayPause();
};

btn_volume.onclick = function(){
  toggleMute();
};

btn_volume.onmouseenter = function(){
  volume.style.opacity = 100;
  volume.style.visibility = 'visible';
};

btn_volume.parentElement.onmouseleave = function(){
  volume.style.opacity = 0;
  volume.style.visibility = 'hidden';
};

btn_fullscreen.onclick = function(){
  fullscreenToggle();
};

btn_settings.onclick = function(){
  if(is_settings_open){
    settings.style.opacity = 0;
    settings.style.visibility = 'hidden';
  }else{
    settings.style.opacity = 100;
    settings.style.visibility = 'visible';
  }
  is_settings_open = !is_settings_open;
};

input_volume.oninput = function(){
  player.volume = input_volume.value;
  updateVolumeIcon();
};

input_loop.onchange = function(){
  player.loop = input_loop.value;
};

input_playback.onchange = function(){
  player.playbackRate = input_playback.value;
};

progress_bar_container.onclick = function(e){
  setTime(e.offsetX / progress_bar_container.offsetWidth);

};

progress_bar_container.onmousedown = function(){
  is_dragging = true;
};

progress_bar_container.onmouseup = function(){
  is_dragging = false;
};

progress_bar_container.onmousemove = function(e){
  if(is_dragging){
    setTime(e.offsetX / progress_bar_container.offsetWidth);
  }
};

setInterval(function(){
  updateTimeDisplay(player.currentTime, player.duration);
  mouse_still++;
}, 10);

//* END EVENTS */

/**
 * Do resizing things that require javascript
 */
function resize(){
  player.width = window.innerWidth;
  player.height = window.innerHeight;

  if(player.width < 460){
    progress_text.style.display = 'none';
    progress_bar_container.style.width = player.width - 50 - 50 - 50 - 50 - 10 +'px';
  }else{
    progress_text.style.display = 'inline';
    progress_bar_container.style.width = player.width - 50 - 50 - 50 - 50 - progress_text.offsetWidth - 10 +'px';
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
  progress_bar_completed.style.width = (currentTime / duration) * 100 + '%';
  progress_bar_in_buffer.style.width = (player.buffered.end(0) / duration) * 100 + '%';
};

/**
 * Toggle video playback
 */
function togglePlayPause(){
  if(is_playing){
    pause();
  }else{
    play();
  }
};

/**
 * Stop video playback
 */
function pause(ended){
  is_playing = false;
  btn_play_pause.innerHTML = '<i class="fa fa-play"></i>';
  player.pause();
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

/**
 * Toggle mute of video
 */
function toggleMute(){
  if(is_muted){
    unmute();
  }else{
    mute();
  }
};

/**
 * Mute sound
 */
function mute(){
  is_muted = true;
  player.muted = true;
  input_volume.value = 0;
  updateVolumeIcon();
};

/**
 * Unmute sound
 */
function unmute(){
  is_muted = false;
  player.muted = false;
  input_volume.value = player.volume;
  updateVolumeIcon();
};

/**
 * Update the volume icon based on volume of playback
 */
function updateVolumeIcon(){
  if(is_muted){
    btn_volume.innerHTML = '<i class="fa fa-volume-off"></i>';
  }else if(player.volume > .6){
    btn_volume.innerHTML = '<i class="fa fa-volume-up"></i>';
  }else if(player.volume <= .6 && player.volume != 0){
    btn_volume.innerHTML = '<i class="fa fa-volume-down"></i>';
  }else{
    btn_volume.innerHTML = '<i class="fa fa-volume-off"></i>';
  }
};

/**
 * Put a message on the screen
 * (For now just an ordinary alert)
 */
function alertMessage(msg, type){
  alert(msg);
};
