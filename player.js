'use_strict';

var player = document.getElementById('main-player');
//player.removeAttribute('controls');
var btn_play_pause = document.getElementById('btn-play-pause');
var btn_settings = document.getElementById('btn-settings');
var progress_bar = document.getElementById('progress-bar');
var progress_text = document.getElementById('progress-text');

var is_playing = false;

//* EVENTS *//

window.onresize = function(){
  resize();
};

window.onload = function(){
  resize();
};

btn_play_pause.onclick = function(){
  toggle_play_pause();
};

player.ontimeupdate = function(e){
  console.log(e.timeStamp, player.duration);
};

//* END EVENTS */

/**
 * Do resizing things that require javascript
 */
function resize(){
  player.width = window.innerWidth;
  player.height = window.innerHeight;
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
}

/**
 * Start video playback
 */
function play(){
  is_playing = true;
  player.play();
}
