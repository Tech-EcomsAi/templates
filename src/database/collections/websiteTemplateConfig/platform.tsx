import { DB_COLLECTIONS } from "@constant/database";
import { firebaseClient } from "@lib/firebase/firebaseClient";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const COLLECTION = DB_COLLECTIONS.WEBSITE_TEMPLATES_CONFIG;

const tennatId = 0;
const storeId = 0;

const getCollectionRef = (templateId: any) => {
    return doc(firebaseClient, `${COLLECTION}/${tennatId}/${storeId}`, templateId);
}

//referances
// https://firebase.google.com/docs/firestore/manage-data/add-data
//

export const addPlatformTemplateConfig = (templateConfigDetails: any, templateId: any) => {
    return new Promise(async (res, rej) => {
        const collectionDocRef = getCollectionRef(templateId);
        const docRef = await setDoc(collectionDocRef, templateConfigDetails);
        console.log("Document written with ID: ", docRef);
        res(docRef)
    })
}

export const updatePlatformTemplateConfig = (templateConfigDetails: any, templateId: any) => {
    return new Promise(async (res, rej) => {
        const collectionDocRef = getCollectionRef(templateId);
        const docRef = await updateDoc(collectionDocRef, templateConfigDetails);
        console.log("Document written with ID: ", docRef);
        res(docRef)
    })
}

//referances
// https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
//
export const getPlatformTemplateConfigById = (templateId: any) => {
    return new Promise(async (res, rej) => {
        const collectionDocRef = getCollectionRef(templateId);
        const docSnap = await getDoc(collectionDocRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            res(docSnap.data());
        } else {
            rej()
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    })
}