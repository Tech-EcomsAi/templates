import { DB_COLLECTIONS } from "@/constants/database";
import { firebaseClient } from "@/lib/firebase/firebaseClient";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

const COLLECTION = DB_COLLECTIONS.COMPONENTS;

export const getComponents = () => {
    return new Promise(async (res, rej) => {
        const querySnapshot = await getDocs(collection(firebaseClient, COLLECTION));
        const templatesList: any[] = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            templatesList.push({ id: doc.id, ...doc.data() })
        });
        res(templatesList);
    })
}

export const getComponentById = (id: any) => {
    return new Promise(async (res, rej) => {
        try {
            const ref = doc(firebaseClient, `${COLLECTION}`, `${id}`);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                res(docSnap.data())
                console.log("Document data:", docSnap.data());
            } else {
                rej()
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (error: any) {
            rej()
        }
    })
}

export const addComponent = (sectionDetails: any) => {
    return new Promise(async (res, rej) => {
        await setDoc(doc(firebaseClient, COLLECTION, `${sectionDetails.componentId}`), sectionDetails);
        res(true)
    })
}