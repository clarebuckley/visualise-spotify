//Convert file to base64 string
export function fileToBase64(filename, filepath) {
    return new Promise(resolve => {
        var file = new File([filename], filepath, { type: 'image/jpeg' });
        var reader = new FileReader();
        reader.onload = function (event) {
            resolve(event.target.result);
        };

        //Convert data to base64
        reader.readAsDataURL(file);
    });
};

export function toDataURL(src, callback) {
  var image = new Image();
  image.crossOrigin = 'Anonymous';

  image.onload = function() {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    context.drawImage(this, 0, 0);
    var dataURL = canvas.toDataURL('image/jpeg');
    callback(dataURL);
  };

  image.src = src;
}
