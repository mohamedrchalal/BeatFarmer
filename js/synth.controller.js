"use strict";

(function () {
  angular
  .module('App')
  .controller('synth', ['$interval', synthCtrlFunc]);

  var array = [1,2,3,4,5,6,7,8];
  var array2 = [9,10,11,12,13,14,15,16];

  array.forEach(function(i){
    $('#kick-Seq').append('<label><input id="kickRow" type="checkbox" data-ng-click="vm.activate('+i+')"><span class="col s1 lever '+i+'"></span></label>');
  });
  array2.forEach(function(i){
    $('#Snare-Seq').append('<label><input id="snareRow" type="checkbox" data-ng-click="vm.activate('+i+')"><span class="col s1 lever '+i+'"></span></label>');
  });

  AudioContext = window.AudioContext || window.webkit;


  var context = new AudioContext(),
  oscillator = context.createOscillator(),
  analyser = context.createAnalyser(),
  filter = context.createBiquadFilter(),
  gainNode = context.createGain();

  // var canvas = document.getElementById('analyser');
  // var canvasContext = canvas.getContext('2d');
  // var canvasWidth = canvas.width;
  // var canvasHeight = canvas.height;
  // var analyserMethod = "getByteTimeDomainData";

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(analyser);
  gainNode.connect(context.destination);
  oscillator.start(0);

  gainNode.gain.value = 0;
  oscillator.frequency.value = 0;
  oscillator.type = 'sawtooth';

  filter.type = "lowpass";
  filter.frequency.value = 2000;
  filter.gain.value = 25;

  analyser.fftSize = 32768;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);


  var kick = null;

// document.onload(){
  function loadKick(x){
    var request = new XMLHttpRequest();
    request.open('GET', '../sounds/Digitalo_Kick20.wav', true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function(buffer) {
      context.decodeAudioData(request.response, function(buffer) {
        x.kick = buffer;
        // playSound(kick);
      });
    }
    request.send();

  };

  function loadSnare(x){
    var request = new XMLHttpRequest();
    request.open('GET', '../sounds/Allstar_Snare09.wav', true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function(buffer) {
      context.decodeAudioData(request.response, function(buffer) {
        x.snare = buffer;
        // playSound(snare);
      });
    }
    request.send();

  };


  function playSound(buffer) {
    var source = context.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now
    // note: on older systems, may have to use deprecated noteOn(time);
  };

// };

  function synthCtrlFunc($interval){
    var vm = this;

    vm.switchOsc = function(selection){
      console.log(selection);
      oscillator.type = selection;
    }//vm.swtichOsc(selection)

    vm.currentFreq = 0;
    vm.currentFilt = 2000;
    vm.currentVolume = 0;
    vm.active = [];

    vm.filterChange = function() {
      console.log('bitches');
      filter.frequency.value = vm.currentFilt;
    };
    vm.volChange = function() {
      console.log('bitches');
      gainNode.gain.value = vm.currentVolume;
    };
    vm.freqChange = function() {
      console.log('douchelords');
      oscillator.frequency.value = vm.currentFreq;
    };
    loadKick (vm);
    vm.playKick = function(){
      playSound(vm.kick);
    };

    loadSnare(vm);
    vm.playSnare = function(){
      playSound(vm.snare)
    };

    vm.activate = function(thing){
      if($.inArray(thing, vm.active) < 0){
      vm.active.push(thing);
      console.log(vm.active);
    }else{
      vm.active.splice($.inArray(thing));
      console.log(vm.active)
    }
    };
    vm.start = function(){
      $interval()
    };
  }
})();
