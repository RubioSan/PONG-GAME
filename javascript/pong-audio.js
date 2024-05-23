/* This File creates the sound file players and their default properties
If you create a new player, be sure to import it at the top of index.js!
*/

// import * as Tone from "../lib/Tone.js";

class soundFile {
  constructor(file, deferPlay = false) {
    this.deferPlay = deferPlay;
    this.player = new Tone.Player({
      url: "./sounds/" + file,
      loop: false,
      autostart: false,
      onload: () => {
        console.log(`${file} loaded`);
      }
    }).toMaster();
  }

  // Play function with pre-stop and deferred playing
  play() {
    // Defer playback if sound isn't finished loading
    if (this.player.loaded === true) {
      this.deferPlay = false;
      this.player.stop();
      this.player.start();
      console.log(`${this.player.buffer.url} playing`);
    } else {
      this.deferPlay = true;
      console.log(`${this.player.buffer.url} deferred`);
    }
  }

  // Stop function that may have easier syntax
  stop() {
    this.player.stop();
    console.log(`${this.player.buffer.url} stopped`);
  }
}

// Try to play sounds that had their playback deferred
export function playDeferredSounds() {
  for (var i = 0; i < soundArray.length; i++) {
    if (soundArray[i].deferPlay === true) {
      soundArray[i].play();
    }
  }
}

export var soundArray = []; // List of sounds loaded

// Here is where all the Sound File Players Start

export var wallSound = new soundFile("woof.wav"); // Load sound
soundArray.push(wallSound); // Add sound to list of sounds
wallSound.player.volume.value = 3; 

export var paddleSound = new soundFile("meow.wav");
soundArray.push(paddleSound);
paddleSound.player.volume.value = 3;

export var scoreSound = new soundFile("silence.mp3");
soundArray.push(scoreSound);

export var ambientSound = new soundFile("brown.mp3");
soundArray.push(ambientSound);
ambientSound.player.loop = true; // Turn on looping
ambientSound.player.volume.value = -20; // Turn down volume

export var adventureMusic = new soundFile("yyu - eggo.mp3", true); // Set deferPlay to true
soundArray.push(adventureMusic);
adventureMusic.player.loop = true;
adventureMusic.player.volume.value = 0;

export var villageMusic = new soundFile("silence.mp3");
soundArray.push(villageMusic);
villageMusic.player.loop = true;
villageMusic.player.volume.value = -16;

// Adding the event listener to call playDeferredSounds on page load
document.addEventListener("DOMContentLoaded", function() {
  playDeferredSounds();
});
