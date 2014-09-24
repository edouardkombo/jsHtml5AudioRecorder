/***************************************************
    Detect browser
***************************************************/
if((window.chrome !== null) && (window.navigator.vendor === "Google Inc.")) {
} else { 
   alert('This application will only work on Google Chrome, Firefox and Opera!');
}

var jsAudioRecorder = new jsHtml5AudioRecorder();

/***************************************************
	Init Html5 Audio Streaming
***************************************************/
jsAudioRecorder.Recorder            = Recorder;         //External library that effectively record audio stream

jsAudioRecorder.mediaPath           = '/medias/Temp/';  //Path where to store audio files
jsAudioRecorder.audioExtension      = 'wav';            //Only wav format is supported
jsAudioRecorder.audioTagId          = 'myAudio';
jsAudioRecorder.showStreamOnFinish  = false;            //Show audio player on finish?

jsAudioRecorder.phpFile             = '/form/audioProcess.php'; //Php file that will proceed to audio file 

jsAudioRecorder.init();


function startRecording() {
    jsAudioRecorder.startRecording();
}

/**
 * You can use "save", "saveAndDownload" or "saveAndStream", "downloadAndStream" parameters
 */
function stopRecording() {
    //For demo
    jsAudioRecorder.stopRecording('downloadAndStream');
    
    //In production
    //jsAudioRecorder.stopRecording('saveAndStream');
}
