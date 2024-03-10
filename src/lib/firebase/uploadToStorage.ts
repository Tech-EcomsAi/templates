
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage } from "./firebaseClient";
// const storageRef = ref(storage, 'templates');

// Data URL string
// const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
// uploadString(storageRef, message4, 'data_url').then((snapshot) => {
//     console.log('Uploaded a data_url string!');
// });


type fileData = {
    componentId: any,
    url: any,
    name: any,
}
const uploadImageToStorage = (fileData: fileData) => {
    return new Promise((resolve: any, reject: any) => {

        // Create the file metadata
        /** @type {any} */
        const metadata = {
            componentId: fileData.componentId,
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(firebaseStorage, 'templates/' + fileData.componentId + "/" + fileData.name);
        const uploadTask = uploadBytesResumable(storageRef, fileData.url, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );

    })



}
export default uploadImageToStorage;