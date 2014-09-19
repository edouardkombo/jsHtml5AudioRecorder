/**
 * Object: jsHtml5AudioRecorder
 * Version: 0.0.0
 * Author: Edouard Kombo
 * Twitter: @EdouardKombo
 * Github: Edouard Kombo
 * Url: https://github.com/edouardkombo/jsHtml5AudioRecorder
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Record live audio stream in html5, save to server or direct download
 */

var jsHtml5AudioRecorder = function(){};

jsHtml5AudioRecorder.prototype = {
    audioContext: '',
    microphone: '',  
    recIndex: 0,
    Recorder: false,
    mediaPath: '',
    phpFile: '',
    fftSize: 2048,
    
    initAudio: function (){
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

        window.onload       = this.onLoad();
    },
    
    onLoad: function () {
        try {
            this.audioContext    = new AudioContext();
            console.log('Audio context set up.');
            console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
        } catch (e) {
            alert('No web audio support in this browser!');
        }        
        
        navigator.getUserMedia({audio:true}, this.startStream.bind(this), function(e) {
            alert('No audio stream!');
            console.log(e);
        });        
    },

    startStream: function(stream) {
        this.inputPoint         = this.audioContext.createGain();

        this.microphone         = this.audioContext.createMediaStreamSource(stream);
        this.microphone.connect(this.inputPoint);

        var analyserNode        = this.audioContext.createAnalyser();
        analyserNode.fftSize    = this.fftSize;
        this.inputPoint.connect( analyserNode );

        this.Recorder           = new Recorder( this.inputPoint );

        var zeroGain            = this.audioContext.createGain();
        zeroGain.gain.value     = 0.0;
        this.inputPoint.connect( zeroGain );
        zeroGain.connect( this.audioContext.destination );        
    },
    
    startRecording: function() {
        this.Recorder && this.Recorder.record();        
        console.log('Recording audio...');
    },
    
    stopRecording: function(method) {
        this.Recorder && this.Recorder.stop();

        this.Recorder && this.Recorder.exportWAV(function(blob) {
            console.log(blob);
            
            if (method === 'save') {
                this.save(blob);
            } else if (method === 'download') {
                this.download(blob);
            } else {
                this.save(blob);                
            }
            
        }.bind(this));

        this.Recorder.clear();
        console.log('Stop Recording audio!');        
    },

    save: function (blob) {
        
        var datas       = 'path='+this.mediaPath+'&format=.wav';                  

        //Because with classic ajax requests we are unable to send huge files
        //We use original XMLHttpRequest object
        var client = new XMLHttpRequest();
        client.onreadystatechange = function() 
        {
            if (client.readyState === 4 && client.status === 200) 
            {
                console.log(client.response);                        
            }
        }.bind(this);
        client.open("post", this.phpFile+'?'+datas, true);
        client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        client.setRequestHeader("cache-Control", "no-store, no-cache, must-revalidate");
        client.setRequestHeader("cache-Control", "post-check=0, pre-check=0");
        client.setRequestHeader("cache-Control", "max-age=0");
        client.setRequestHeader("Pragma", "no-cache");            
        client.setRequestHeader("X-File-Name", encodeURIComponent('1'));
        client.setRequestHeader("Content-Type", "application/octet-stream");
        client.send(blob);
    },   

    download: function(blob) {
        
        var url             = window.URL.createObjectURL(blob);
        var au              = document.createElement('audio');
        var hf              = document.createElement('a');

        var temporaryId     = new Date().toISOString();

        au.controls         = true;
        au.src              = url;
        hf.href             = url;
        hf.id               = temporaryId;
        hf.download         = temporaryId + '.wav';
        hf.innerHTML        = hf.download;
        hf.style.display    = 'none';
        hf.style.visibility = 'hidden';
        document.body.appendChild(hf);

        document.getElementById(hf.id).click();
        document.getElementById(hf.id).remove();
    }
};