import { DB_COLLECTIONS } from "@/constants/database";
import { firebaseClient } from "@/lib/firebase/firebaseClient";
import { addDoc, collection, getDocs } from "firebase/firestore";

const COLLECTION = DB_COLLECTIONS.SECTIONS;

export const getSections = () => {
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

export const addSection = (sectionDetails: any) => {
    return new Promise(async (res, rej) => {
        const docRef = await addDoc(collection(firebaseClient, COLLECTION), sectionDetails);
        const sectionId = docRef.id
        console.log("Section written with ID: ", sectionId);
        res(docRef.id)
    })
}