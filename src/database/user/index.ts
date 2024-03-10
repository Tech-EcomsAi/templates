
// import { collection, getDocs, query, where } from "@firebase/firestore";
// import { firebaseClient } from "@lib/firebase/firebaseClient";

// export const getUserByEmail = (email: string) => {
//     return new Promise(async (res, rej) => {
//         const q = query(collection(firebaseClient, "users"), where("email", "==", email));
//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.empty) {
//             console.log('User not found.');
//             res({});
//         } else {
//             querySnapshot.forEach(doc => res({ ...doc.data(), id: doc.id }));
//         }
//     })
// }

// export const getUserChats = (userId: string) => {
//     return new Promise(async (res, rej) => {
//         // const q = query(collection(firebaseClient, "files"));
//         const q = query(collection(firebaseClient, "chats"), where("userId", "==", userId));
//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.empty) {
//             console.log('getUserChats not available.');
//             res([]);
//         } else {
//             const uploadedFiles: any = [];
//             querySnapshot.forEach((doc) => {
//                 uploadedFiles.push({ ...doc.data(), id: doc.id })
//             });
//             res(uploadedFiles)
//         }
//     })
// }

// export const getUserMessages = (chatId: string) => {
//     return new Promise(async (res, rej) => {
//         // const q = query(collection(firebaseClient, "files"));
//         const q = query(collection(firebaseClient, "messages"), where("chatId", "==", chatId));
//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.empty) {
//             console.log('getUserMessages not available.');
//             res([]);
//         } else {
//             const uploadedFiles: any = [];
//             querySnapshot.forEach((doc) => {
//                 uploadedFiles.push({ ...doc.data(), id: doc.id })
//             });
//             res(uploadedFiles)
//         }
//     })
// }

// export const getUserWebMessages = (userId: string) => {
//     return new Promise(async (res, rej) => {
//         const q = query(collection(firebaseClient, "webmessages"), where("userId", "==", userId));
//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.empty) {
//             console.log('getUserMessages not available.');
//             res([]);
//         } else {
//             const uploadedFiles: any = [];
//             querySnapshot.forEach((doc) => {
//                 uploadedFiles.push({ ...doc.data(), id: doc.id })
//             });
//             res(uploadedFiles)
//         }
//     })
// }