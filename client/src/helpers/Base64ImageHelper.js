//Convert image to base64
export function toDataURL(src) {
    return new Promise(resolve => {
        var image = new Image();
        image.crossOrigin = 'Anonymous';

        image.onload = function () {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            context.drawImage(this, 0, 0);
            var dataURL = canvas.toDataURL('image/jpeg');
            resolve(dataURL);
        };

        image.src = src;
    })
  
}
