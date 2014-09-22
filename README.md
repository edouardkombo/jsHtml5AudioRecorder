Js Html5 Audio Recorder
=======================

JsHtml5AudioRecorder is a native html5 object that helps you record live audio stream from your browser.
it provides echo cancellation and clear record.
It works perfectly on Google Chrome, Firefox and Opera.


1) How to install
---------------------

    bower install js-html5-audio-recorder


2) How to use it?
-----------------

    //Instantiate the object
    var jsAudioRecorder         = new jsHtml5AudioRecorder();

    //Set Parameters
    jsAudioRecorder.Recorder    = Recorder; //From Matt Diamond Recorder.js
    jsAudioRecorder.mediaPath   = "PATH_TO_MEDIA_DIRECTORY";
    jsAudioRecorder.phpFile     = "PHP_FILE_TO_TARGET";
    jsAudioRecorder.audioTagId  = "myAudio";

    //Initialize it
    jsAudioRecorder.init();

    //Start recording
    jsAudioRecorder.startRecording();

    //Stop recording with options
    jsAudioRecorder.stopRecording(); //Save audio on your server
    jsAudioRecorder.stopRecording('save'); //Save audio on your server
    jsAudioRecorder.stopRecording('download'); //Download audio from browser
    jsAudioRecorder.stopRecording('stream'); //Directly stream audio from browser
    jsAudioRecorder.stopRecording('saveAndStream'); //Save audio on server and stream it
    jsAudioRecorder.stopRecording('downloadAndStream'); //Download audio from browser and stream it

        
3) Live Demonstration
---------------------

http://edouardkombo.github.io/jsHtml5AudioRecorder/demo/
    

Contributing
-------------

If you do contribute, please make sure it conforms to the PSR coding standard. The easiest way to contribute is to work on a checkout of the repository, or your own fork, rather than an installed version.

Want to learn more? Visit my blog http://creativcoders.wordpress.com


Issues
------

Bug reports and feature requests can be submitted on the [Github issues tracker](https://github.com/edouardkombo/jsHtml5AudioRecorder/issues).

For further informations, contact me directly at edouard.kombo@gmail.com.
