import { DB_COLLECTIONS } from "@constant/database";
import { TEMPLATE_TYPES } from "@constant/templates";
import { addDoc, collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { SESSION_TYPE } from "@lib/auth";
import { firebaseClient } from "@lib/firebase/firebaseClient";
import { getStoreId, getTenantId } from "@util/tenantStore";
import { addTemplateConfig, getTemplateConfigById } from "../websiteTemplateConfig";

const COLLECTION = DB_COLLECTIONS.WEBSITE_TEMPLATES;

const getCollectionRef = (session: SESSION_TYPE, entityType) => {
    return collection(firebaseClient, `${COLLECTION}/${session.tId}/${session.sId}`)
}

export const addTemplate = (session: SESSION_TYPE, templateDetails: any, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const docRef = await addDoc(getCollectionRef(session, entityType), templateDetails);
        const templateId = docRef.id
        console.log("Document written with ID: ", templateId);
        await addTemplateConfig(session, { config: "" }, templateId).then(() => {
            console.log("Config updated successfully")
            res(docRef.id)
        });
    })
}

export const getTemplate = (session: SESSION_TYPE, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const querySnapshot = await getDocs(getCollectionRef(session, entityType));
        const templatesList = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            templatesList.push({ id: doc.id, ...doc.data() })
        });
        res(templatesList);
    })
}


export const getTemplateById = (session: SESSION_TYPE, templateId, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const ref = doc(firebaseClient, `${COLLECTION}/${getTenantId(entityType)}/${getStoreId(entityType)}`, templateId);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            res(docSnap.data())
            console.log("Document data:", docSnap.data());
        } else {
            rej()
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    })
}

export const getTemplateWithConfigById = (session: SESSION_TYPE, templateId, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const ref = doc(firebaseClient, `${COLLECTION}/${getTenantId()}/${session.sId}`, templateId);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const templateConfig: any = await getTemplateConfigById(session, templateId);
            const templateDetails: any = { ...docSnap.data(), id: templateId, templateConfig }
            res(templateDetails)
        } else {
            rej()
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    })
}