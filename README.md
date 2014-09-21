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

    //Create the object
    var jsAudioRecorder = new jsHtml5AudioRecorder();
    
    //Initialize it
    jsAudioRecorder.initAudio();

    //Set Parameters
    jsAudioRecorder.Recorder    = Recorder;
    jsAudioRecorder.mediaPath   = "PATH_TO_MEDIA_DIRECTORY";
    jsAudioRecorder.phpFile     = "PHP_FILE_TO_TARGET";

    //Start recording
    jsAudioRecorder.startRecording();

    //Stop recording and save audio file into Directory
    jsAudioRecorder.stopRecording('save');

    //Stop recording and download audio file
    jsAudioRecorder.stopRecording('download');

        
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
