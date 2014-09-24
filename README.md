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
    var jsAudioRecorder                 = new jsHtml5AudioRecorder();

    //Set Parameters
    jsAudioRecorder.Recorder            = Recorder;         //External library that effectively record audio stream

    jsAudioRecorder.mediaPath           = '/medias/Temp/';  //Path where to store audio files
    jsAudioRecorder.audioExtension      = 'wav';            //Only wav format is supported
    jsAudioRecorder.audioTagId          = 'myAudio';
    jsAudioRecorder.showStreamOnFinish  = false;            //Show audio player on finish?

    jsAudioRecorder.phpFile             = '/form/audioProcess.php'; //Php file that will proceed to audio file 

    //Initialize it
    jsAudioRecorder.init();

    //Start recording
    jsAudioRecorder.startRecording();


    function startCapture() {
        jsPhotoBooth.startCapture();
        stopRecording();
    }

    /**
     * You can use "save", "saveAndDownload" or "saveAndStream", "downloadAndStream" parameters
     */
    function stopRecording() {
        //For demo
        jsPhotoBooth.stopCapture('downloadAndStream');

        //Use this in production
        //jsPhotoBooth.stopCapture('saveAndStream');
    }

        
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
