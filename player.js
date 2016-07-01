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

progress_bar.onclick = function(e){
  console.log(e);
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
};

function updateTimeDisplay(currentTime, duration){
  if(duration < 0){
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
}

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
