"use strict";

(function () {
  angular
  .module('App',['firebase'])
  .controller('synth', ['$interval', '$timeout', synthCtrlFunc]);

  var kickArray = [1,2,3,4,5,6,7,8];
  var snareArray = [1,2,3,4,5,6,7,8];
  var hatArray = [1,2,3,4,5,6,7,8];
  var crashArray =[1,2,3,4,5,6,7,8];

  kickArray.forEach(function(i){
    $('#kick-Seq').append('<label><input id="kickRow" type="checkbox" data-ng-click="vm.activateKick('+i+')"><span class="col s1 lever '+i+'"></span></label>');
  });
  snareArray.forEach(function(i){
    $('#Snare-Seq').append('<label><input id="snareRow" type="checkbox" data-ng-click="vm.activateSnare('+i+')"><span class="col s1 lever '+i+'"></span></label>');
  });
  hatArray.forEach(function(i){
    $('#Hat-Seq').append('<label><input id="hatRow" type="checkbox" data-ng-click="vm.activateHat('+i+')"><span class="col s1 lever '+i+'"></span></label>');
  });
  crashArray.forEach(function(i){
    $('#Crash-Seq').append('<label><input id="crashRow" type="checkbox" data-ng-click="vm.activateCrash('+i+')"><span class="col s1 lever '+i+'"></span></label>');
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
      request.open('GET', '../sounds/HandClap.wav', true);
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

    function loadCrash(x){
      var request = new XMLHttpRequest();
      request.open('GET', '../sounds/VEC1_Cymbals_OH_035.wav', true);
      request.responseType = 'arraybuffer';

      // Decode asynchronously
      request.onload = function(buffer) {
        context.decodeAudioData(request.response, function(buffer) {
          x.crash = buffer;
          // playSound(Crash);
        });
      }
      request.send();

    };

    function loadHat(x){
      var request = new XMLHttpRequest();
      request.open('GET', '../sounds/Dance_Hat01.wav', true);
      request.responseType = 'arraybuffer';

      // Decode asynchronously
      request.onload = function(buffer) {
        context.decodeAudioData(request.response, function(buffer) {
          x.hat = buffer;
          // playSound(Hat);
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



  function synthCtrlFunc($interval, $timeout){

    var vm = this;

    vm.setKickInt = function (){


      $interval(init, 2000);

      function init(){
        console.log('fudge');
        var delay1 = null;
        var delay2 = null;
        var delay3 = null;
        var delay4 = null;
        var delay5 = null;
        var delay6 = null;
        var delay7 = null;

        var delay250 = function(){
          delay1 = $timeout(vm.playKick, 250);

        };
        var delay500 = function(){

          delay2 = $timeout(vm.playKick, 500);
          // $timeout.cancel(delay);
        };
        var delay750 = function(){

          delay3 = $timeout(vm.playKick, 750);
          // $timeout.cancel(delay);
        };
        var delay1000 = function(){

          delay4 = $timeout(vm.playKick, 1000);
          // $timeout.cancel(delay);
        };
        var delay1250 = function(){

          delay5 = $timeout(vm.playKick, 1250);
          // $timeout.cancel(delay);
        };
        var delay1500 = function(){

          delay6 = $timeout(vm.playKick, 1500);
          // $timeout.cancel(delay);
        };
        var delay1750 = function(){

          delay7 = $timeout(vm.playKick, 1750);
          // $timeout.cancel(delay);
        };
        // delays = [0, 250, 500]
        // sounds = []
        // for each activekick
        //   $timeout($interval(vm.playKick(), 2000), delays[activeKick]);

        if($.inArray(1, vm.activeKick) !== -1){
          $interval(vm.playKick(), 2000);
          console.log("1");
        }else{

        };
        if($.inArray(2, vm.activeKick) !== -1){

          var interval = $interval(delay250, 2000, 1);
          console.log('ey',delay1);
          $timeout.cancel(delay1);

        }else{

        };
        if($.inArray(3, vm.activeKick) !== -1){
          var interval = $interval(delay500, 2000, 1);

        }else{

        };
        if($.inArray(4, vm.activeKick) !== -1){
          var interval = $interval(delay750, 2000, 1);

        }else{

        };
        if($.inArray(5, vm.activeKick) !== -1){
          var interval = $interval(delay1000, 2000, 1);

        }else{

        };
        if($.inArray(6, vm.activeKick) !== -1){
          var interval = $interval(delay1250, 2000, 1);

        }else{

        };
        if($.inArray(7, vm.activeKick) !== -1){
          var interval = $interval(delay1500, 2000, 1);

        }else{

        };
        if($.inArray(8, vm.activeKick) !== -1){
          var interval = $interval(delay1750, 2000, 1);

        }else{

        }
      };
    };
    vm.setKickInt();

    vm.setSnareInt = function (){


      $interval(init, 2000);

      function init(){
        console.log('fudge1');
        var delay1 = null;
        var delay1 = null;
        var delay2 = null;
        var delay3 = null;
        var delay4 = null;
        var delay5 = null;
        var delay6 = null;
        var delay7 = null;

        var delay250 = function(){

        delay1 = $timeout(vm.playSnare, 250);


        };
        var delay500 = function(){

          delay2 = $timeout(vm.playSnare, 500);
          // $timeout.cancel(delay);
        };
        var delay750 = function(){

          delay3 = $timeout(vm.playSnare, 750);
          // $timeout.cancel(delay);
        };
        var delay1000 = function(){

          delay4 = $timeout(vm.playSnare, 1000);
          // $timeout.cancel(delay);
        };
        var delay1250 = function(){

          delay5 = $timeout(vm.playSnare, 1250);
          // $timeout.cancel(delay);
        };
        var delay1500 = function(){

          delay6 = $timeout(vm.playSnare, 1500);
          // $timeout.cancel(delay);
        };
        var delay1750 = function(){

          delay7 = $timeout(vm.playSnare, 1750);
          // $timeout.cancel(delay);
        };
        // delays = [0, 250, 500]
        // sounds = []
        // for each activeSnare
        //   $timeout($interval(vm.playSnare(), 2000), delays[activeSnare]);

        if($.inArray(1, vm.activeSnare) !== -1){
          $interval(vm.playSnare(), 2000);
        }else{

        };
        if($.inArray(2, vm.activeSnare) !== -1){

          var interval = $interval(delay250, 2000, 1);

        }else{

        };
        if($.inArray(3, vm.activeSnare) !== -1){
          var interval = $interval(delay500, 2000, 1);

        }else{

        };
        if($.inArray(4, vm.activeSnare) !== -1){
          var interval = $interval(delay750, 2000, 1);

        }else{

        };
        if($.inArray(5, vm.activeSnare) !== -1){
          var interval = $interval(delay1000, 2000, 1);

        }else{

        };
        if($.inArray(6, vm.activeSnare) !== -1){
          var interval = $interval(delay1250, 2000, 1);

        }else{

        };
        if($.inArray(7, vm.activeSnare) !== -1){
          var interval = $interval(delay1500, 2000, 1);

        }else{

        };
        if($.inArray(8, vm.activeSnare) !== -1){
          var interval = $interval(delay1750, 2000, 1);

        }else{

        }
      };
    };
    vm.setSnareInt();

    vm.setHatInt = function (){


      $interval(init, 2000);

      function init(){
        console.log('fudge1');
        var delay1 = null;
        var delay1 = null;
        var delay2 = null;
        var delay3 = null;
        var delay4 = null;
        var delay5 = null;
        var delay6 = null;
        var delay7 = null;

        var delay250 = function(){

        delay1 = $timeout(vm.playHat, 250);




        };
        var delay500 = function(){

          delay2 = $timeout(vm.playHat, 500);
          // $timeout.cancel(delay);
        };
        var delay750 = function(){

          delay3 = $timeout(vm.playHat, 750);
          // $timeout.cancel(delay);
        };
        var delay1000 = function(){

          delay4 = $timeout(vm.playHat, 1000);
          // $timeout.cancel(delay);
        };
        var delay1250 = function(){

          delay5 = $timeout(vm.playHat, 1250);
          // $timeout.cancel(delay);
        };
        var delay1500 = function(){

          delay6 = $timeout(vm.playHat, 1500);
          // $timeout.cancel(delay);
        };
        var delay1750 = function(){

          delay7 = $timeout(vm.playHat, 1750);
          // $timeout.cancel(delay);
        };
        // delays = [0, 250, 500]
        // sounds = []
        // for each activeHat
        //   $timeout($interval(vm.playHat(), 2000), delays[activeHat]);

        if($.inArray(1, vm.activeHat) !== -1){
          $interval(vm.playHat(), 2000);
        }else{

        };
        if($.inArray(2, vm.activeHat) !== -1){

          var interval = $interval(delay250, 2000, 1);

        }else{

        };
        if($.inArray(3, vm.activeHat) !== -1){
          var interval = $interval(delay500, 2000, 1);

        }else{

        };
        if($.inArray(4, vm.activeHat) !== -1){
          var interval = $interval(delay750, 2000, 1);

        }else{

        };
        if($.inArray(5, vm.activeHat) !== -1){
          var interval = $interval(delay1000, 2000, 1);

        }else{

        };
        if($.inArray(6, vm.activeHat) !== -1){
          var interval = $interval(delay1250, 2000, 1);

        }else{

        };
        if($.inArray(7, vm.activeHat) !== -1){
          var interval = $interval(delay1500, 2000, 1);

        }else{

        };
        if($.inArray(8, vm.activeHat) !== -1){
          var interval = $interval(delay1750, 2000, 1);

        }else{

        }
      };
    };
    vm.setHatInt();

    vm.setCrashInt = function (){


      $interval(init, 2000);

      function init(){
        console.log('fudge1');
        var delay1 = null;
        var delay1 = null;
        var delay2 = null;
        var delay3 = null;
        var delay4 = null;
        var delay5 = null;
        var delay6 = null;
        var delay7 = null;

        var delay250 = function(){

        delay1 = $timeout(vm.playCrash, 250);




        };
        var delay500 = function(){

          delay2 = $timeout(vm.playCrash, 500);
          // $timeout.cancel(delay);
        };
        var delay750 = function(){

          delay3 = $timeout(vm.playCrash, 750);
          // $timeout.cancel(delay);
        };
        var delay1000 = function(){

          delay4 = $timeout(vm.playCrash, 1000);
          // $timeout.cancel(delay);
        };
        var delay1250 = function(){

          delay5 = $timeout(vm.playCrash, 1250);
          // $timeout.cancel(delay);
        };
        var delay1500 = function(){

          delay6 = $timeout(vm.playCrash, 1500);
          // $timeout.cancel(delay);
        };
        var delay1750 = function(){

          delay7 = $timeout(vm.playCrash, 1750);
          // $timeout.cancel(delay);
        };
        // delays = [0, 250, 500]
        // sounds = []
        // for each activeCrash
        //   $timeout($interval(vm.playCrash(), 2000), delays[activeCrash]);

        if($.inArray(1, vm.activeCrash) !== -1){
          $interval(vm.playCrash(), 2000);
        }else{

        };
        if($.inArray(2, vm.activeCrash) !== -1){

          var interval = $interval(delay250, 2000, 1);

        }else{

        };
        if($.inArray(3, vm.activeCrash) !== -1){
          var interval = $interval(delay500, 2000, 1);

        }else{

        };
        if($.inArray(4, vm.activeCrash) !== -1){
          var interval = $interval(delay750, 2000, 1);

        }else{

        };
        if($.inArray(5, vm.activeCrash) !== -1){
          var interval = $interval(delay1000, 2000, 1);

        }else{

        };
        if($.inArray(6, vm.activeCrash) !== -1){
          var interval = $interval(delay1250, 2000, 1);

        }else{

        };
        if($.inArray(7, vm.activeCrash) !== -1){
          var interval = $interval(delay1500, 2000, 1);

        }else{

        };
        if($.inArray(8, vm.activeCrash) !== -1){
          var interval = $interval(delay1750, 2000, 1);

        }else{

        }
      };
    };
    vm.setCrashInt();


    vm.switchOsc = function(selection){
      console.log(selection);
      oscillator.type = selection;
    };

    vm.currentFreq = 0;
    vm.currentFilt = 2000;
    vm.currentVolume = 0;
    vm.activeKick = [];
    vm.activeSnare = [];
    vm.activeHat = [];
    vm.activeCrash = [];

    vm.filterChange = function() {
      filter.frequency.value = vm.currentFilt;
    };
    vm.volChange = function() {
      gainNode.gain.value = vm.currentVolume;
    };
    vm.freqChange = function() {
      oscillator.frequency.value = vm.currentFreq;
    };

    loadKick (vm);
    loadSnare(vm);
    loadHat(vm);
    loadCrash(vm);

    vm.playKick = function(){
      playSound(vm.kick);
    };

    vm.playSnare = function(){
      playSound(vm.snare);
    };

    vm.playHat = function(){
      playSound(vm.hat)
    };

    vm.playCrash = function(){
      playSound(vm.crash)
    };

    vm.activateKick = function(val){
      if($.inArray(val, vm.activeKick) == -1){
        console.log('first', $.inArray(val, vm.activeKick));
        vm.activeKick.push(val);
        console.log(vm.activeKick);
      }else{
        console.log('second', $.inArray(val, vm.activeKick));
        vm.activeKick.splice($.inArray(val, vm.activeKick), 1);
        console.log(vm.activeKick);
      }
    };

    vm.activateSnare = function(val){
      if($.inArray(val, vm.activeSnare) == -1){
      vm.activeSnare.push(val);
      console.log(vm.activeSnare);
      }else{
        vm.activeSnare.splice($.inArray(val, vm.activeSnare), 1);
        console.log(vm.activeSnare)
      }
    };

    vm.activateHat = function(val){
      if($.inArray(val, vm.activeHat) == -1){
      vm.activeHat.push(val);
      console.log(vm.activeHat);
      }else{
        vm.activeHat.splice($.inArray(val, vm.activeHat));
        console.log(vm.activeHat)
      }
    };

    vm.activateCrash = function(val){
      if($.inArray(val, vm.activeCrash) == -1){
      vm.activeCrash.push(val);
      console.log(vm.activeCrash);
      }else{
        vm.activeCrash.splice($.inArray(val, vm.activeCrash));
        console.log(vm.activeCrash)
      }
    };

  }
})();
