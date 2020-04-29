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