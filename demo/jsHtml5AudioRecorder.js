/**
 * Object:  jsHtml5AudioRecorder
 * Version: master
 * Author:  Edouard Kombo
 * Twitter: @EdouardKombo
 * Github:  https://github.com/edouardkombo
 * Blog:    http://creativcoders.wordpress.com
 * Url:     https://github.com/edouardkombo/jsHtml5AudioRecorder
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Record live audio stream in html5 with echo cancellation, save it on server or download directly from browser
 */

var jsHtml5AudioRecorder = function(){};

jsHtml5AudioRecorder.prototype = {
    audioContext: '',
    Recorder: false,
    mediaPath: '',
    phpFile: '',
    fftSize: 2048,
    
    /**
     * Get Proper html5 getUsermedia from window.navigator object, depending on the browser
     * 
     * @returns {undefined}
     */
    initAudio: function (){
        if (!navigator.getUserMedia) {
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        }
 
        window.onload = this.onLoad();
    },
    
    /**
     * Create audio context and live stream, and pass it to getUserMedia html5 api
     * 
     * @returns {undefined}
     */
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

    /**
     * Create live audio stream with echo cancellation
     * 
     * @param {Object} stream
     * @returns {undefined}
     */
    startStream: function(stream) {
        
        //Create virtual input from empty amplification factor object
        var virtualInput        = this.audioContext.createGain();
       
        //Assign stream source to html5 audio context object
        var microphone         = this.audioContext.createMediaStreamSource(stream);
        
        //Connect media source output to virtualInput input
        //So, virtualInput now equals microphone input
        microphone.connect(virtualInput);

        //Set audio quality and assign it to virtualInput
        var analyserNode        = this.audioContext.createAnalyser();
        analyserNode.fftSize    = this.fftSize;
        virtualInput.connect( analyserNode );

        //Record audio input
        this.Recorder           = new Recorder( microphone );

        //Set volume to zero
        var amplificationFactor = this.audioContext.createGain();
        amplificationFactor.gain.value     = 0.0;
        
        //We set volume to zero to output, so we cancel echo
        amplificationFactor.connect( this.audioContext.destination );        
    },
    
    /**
     * Start audio record
     * 
     * @returns {undefined}
     */
    startRecording: function() {
        this.Recorder && this.Recorder.record();        
        console.log('Recording audio...');
    },
    
    /**
     * Stop audio record and choose export method (save or download)
     * 
     * @param {String} method
     * @returns {undefined}
     */
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

    /**
     * Save audio file to server
     * 
     * @param {Object} blob
     * @returns {undefined}
     */
    save: function (blob) {
        
        var datas       = 'path='+this.mediaPath+'&format=.wav';                  

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

    /**
     * Directly download audio file from the browser
     * 
     * @param {Object} blob
     * @returns {undefined}
     */
    download: function(blob) {
        
        var url             = window.URL.createObjectURL(blob);
        var hf              = document.createElement('a');

        var temporaryId     = new Date().toISOString();

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