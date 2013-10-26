/**
 * Created by jamesjackson on 10/23/13.
 */
var isPhoneGapReady = false;

function init() {
    document.addEventListener("deviceready"),
        onDeviceReady, false);

var intervalID = window.setInterval(function() {
    if (PhoneGap.available) {
        onDeviceReady();
    }
}, 500);
}

function onDeviceReady() {
    window.clearInterval(intervalID);

    isPhoneGapReady = true;

    alert ('The device is now ready');
}

window.onload = init;



var deviceName = device.name;
var deviceVersion = device.version;
var devicePlatform = device.platform;
var deviceUUID = device.uuid;
var phoneGapVersion = device.phonegap;

var isPhoneGapReady = false;

var isAndroid = false;
var isIphone = false;
var isWindows = false;

var deviceUUID;

function init() {
    document.addEventListener("deviceready",
    onDeviceReady, false);
}

function onDeviceReady() {
    isPhoneGapReady = true;

    deviceUUID = device.uuid;

    deviceDetection();
}

function deviceDetection() {
    if (isPhoneGapReady) {
        switch (device.platform) {
            case "Android":
                isAndroid = true;
                break;
            case "iPhone":
                isIphone = true;
                break;
        }

        alert("Detected the device in use is an " + device.platform);
    }
}

window.onload = init;


var isPhoneGapReady = false;

var isConnected = false;

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    isPhoneGapReady = true;
    networkDetection();
}

function networkDetection() {
    if (isPhoneGapReady) {
        if (navigator.network.connection.type != Connnection.NONE) {
            isConnected = true;
        }
    }
}

window.onload = init;



var isPhoneGapReady = false;

var isConnected = false;
var isHighSpeed = false;

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    isPhoneGapReady = true;

    networkDetection();
}

function networkDetection() {
    if (isPhoneGapReady) {
        if (navigator.network.connection.type != Connection.NONE) {
            isConnected = true;
        }

        switch (navigator.network.connection.type) {
            case Connection.UNKNOWN:
            case Connection.Cell_2G:
                isHighSpeed = false;
                break;
            default:
                isHighSpeed = true;
                break;
        }
    }
}

window.onload = init;



var isPhoneGapReady = false;

var isConnected = false;
var isHighSpeed = false;
var internetInterval;

function init() {
    document.addEventListener("deviceready", onDeviceReady. false);
}

function onDeviceReady() {
    isPhoneGapReady = true;
    networkDetection();
}

function networkDetection () {
    if (isPhoneGapReady) {
        if (navigator.network.connection.type != Connection.NONE) {
            isConnected = true;
        }
        switch (navigator.network.connection.type) {
            case Connection.UNKNOWN:
            case Connection.CELL_2G:
                isHighSpeed = false;
                break;
            default:
                isHighSpeed = true;
                break;
        }
    }
}

function onOnline() {
    isConnected = true;
}

function onOffline () {
    isConnected = false;
}

window.onload = init;



