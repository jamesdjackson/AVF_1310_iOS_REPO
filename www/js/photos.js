/**
 * Created by jamesjackson on 10/23/13.
 */

var loaded = false;

function onPhotosLoad() {
    if (!loaded) {
        navigator.camera.getPicture(onPhotosLoadSuccess, onFail,
            {
                quality: 50,
                encodingType: Camera.EncodingType.PNG,
                destinationType: navigator.camera.DestinationType.FILE_URI
            });
        loaded = true;
    }
}

function onPhotoLoadSuccess (photoUri) {
    currentPhoto = photoUri;
    document.getElementById('photo').src = photoUri;
}

function onFail(message) {
    alert ('Failed because: ' + message);
}

function savePhoto() {
    if (currentPhoto == null) {
        alert ("Please select a photo!");
        return;
    }

    var uploadOptions = new FileUploadOptions();
    uploadOptions.fileKey = "file";
    uploadOptions.fileName = currentPhoto.substr(currentPhoto.lastIndexOf ('/') + 1);
    uploadOptions.mimeType="image.png";

    var fileTransfer = new FileTransfer();
    fileTransfer.upload(currentPhoto, "http://www.webistrate.com/phonegap/upload.php", uploadSuccess,
    uploadFail, uploadOptions);
}

function uploadSuccess (result) {
    alert ("Successfully uploaded " + result.bytesSent + "bytes");
}

function uploadFail (error) {
    alert ("Error uploading image: " + error.code);
}