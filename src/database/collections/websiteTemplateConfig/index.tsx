import { DB_COLLECTIONS } from "@constant/database";
import { TEMPLATE_TYPES } from "@constant/templates";
import { SESSION_TYPE } from "@lib/auth";
import { firebaseClient } from "@lib/firebase/firebaseClient";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const COLLECTION = DB_COLLECTIONS.WEBSITE_TEMPLATES_CONFIG;

const getCollectionRef = (session: SESSION_TYPE, templateId: any, entityType: any) => {
    return doc(firebaseClient, `${COLLECTION}/${session.tId}/${session.sId}`, templateId);
}

//referances
// https://firebase.google.com/docs/firestore/manage-data/add-data
//

export const addTemplateConfig = (session: SESSION_TYPE, templateConfigDetails: any, templateId: any, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const collectionDocRef = getCollectionRef(session, templateId, entityType);
        const docRef = await setDoc(collectionDocRef, templateConfigDetails);
        console.log("Document written with ID: ", docRef);
        res(docRef)
    })
}

export const updateTemplateConfig = (session: SESSION_TYPE, templateConfigDetails: any, templateId: any, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const collectionDocRef = getCollectionRef(session, templateId, entityType);
        const docRef = await updateDoc(collectionDocRef, templateConfigDetails);
        console.log("Document written with ID: ", docRef);
        res(docRef)
    })
}

//referances
// https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
//
export const getTemplateConfigById = (session: SESSION_TYPE, templateId: any, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const collectionDocRef = getCollectionRef(session, templateId, entityType);
        const docSnap = await getDoc(collectionDocRef);
        if (docSnap.exists()) {
            res({ ...docSnap.data(), id: templateId });
        } else {
            rej()
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    })
}