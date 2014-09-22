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
jsAudioRecorder.Recorder    = Recorder;
jsAudioRecorder.mediaPath   = '/medias/Temp/';
jsAudioRecorder.phpFile     = '/form/Process.php'; //Create your own file or ask me for it (edouard.kombo@gmail.com)
jsAudioRecorder.audioTagId  = 'myAudio';

jsAudioRecorder.init();


function startRecording() {
    jsAudioRecorder.startRecording();
}

function stopRecording() {
    jsAudioRecorder.stopRecording('downloadAndStream');
    
    //No parameters will make your file to be downloader on your server
    //jsAudioRecorder.stopRecording();
}
