var compassInt;

function updateCompassStatus(status) {
    $("#compassStatus").html(status);
}

function compassOnSuccess(heading) {
    $("#magneticHeading").html(textFormat(heading.magneticHeading));
    $("#trueHeading").html(textFormat(heading.trueHeading));
    $("#accuracy").html(textFormat(heading.headingAccuracy));
    $("#compTime").html(toDateStr(new Date(heading.timestamp)));
}

function compassOnError(error) {
    var contents  = addGridRow("a", boldLabel("ERROR:"));
    contents += addGridRow("b", error.code);
    
    $("#compassProperties").html(contents);
    updateCompassStatus("ERROR");
}

function updateCompass() {
    if ( compassInt != undefined ) {
        navigator.compass.clearWatch(compassInt);
    }
    
    var uDefFreq = $("#compFreq").val();
    
    if ( uDefFreq > 0 && uDefFreq < 11 ) {
        compassInt = navigator.compass.watchHeading(compassOnSuccess, compassOnError, { frequency: uDefFreq * 1000 });
        updateCompassStatus("Updating... Frequency: " + uDefFreq + " sec");
    } else {
        updateCompassStatus("ERROR: Freq must be between 1 and 10");
    }
}

function stopUpdateCompass() {
    navigator.compass.clearWatch(compassInt);
    compassInt = undefined;
    updateCompassStatus("Stopped");
}

function getCompassReady() {
    if ( compassInt != undefined ) {
        navigator.compass.clearWatch(compassInt);
    }
    
    if ( $("#compFreq").val() != 1 ) {
        $("#compFreq").val(1).slider("refresh"); // reset slider to 1
    }
    
    navigator.compass.getCurrentHeading(compassOnSuccess, compassOnError);
    updateCompassStatus("Initialized");
    
    $("#startUpdateButton").on('vclick', function(e){
                               e.preventDefault();
                               updateCompass();
                               return false;
                               });
    $("#stopUpdateButton").on('vclick', function(e){
                              e.preventDefault();
                              stopUpdateCompass();
                              return false;
                              });
}

//*********************************************************
// initialize the environment
//********************************************************* 
$("#compassMainPage").bind("pagebeforeshow", function() { getCompassReady(); } );