import { addDoc, collection, CollectionReference, doc, DocumentData, DocumentReference, getDoc, getDocs, } from "firebase/firestore";
import { firestoredb } from './firebase-config';
import { SubmittedFormType } from "../pages/Register/validation";
import { thumbnailType, providedDocumentsList } from "../pages/Home/CertificateCarousel";
interface DocumentFields {
    emailId: string,
    gender: string,
    mobileNumber: string,
    name: string,
    passYear: string,
    regdNo: string,
    rollNo: string,
    verifyed: boolean
}
export interface ReceivedDocuments {
    id: string;
    fields: DocumentFields;
}




export class FireStoreCollection {
    private collectionName: string;
    private collectionRef: CollectionReference<DocumentData>;
    constructor(collectionName: string) {
        this.collectionName = collectionName;
        this.collectionRef = collection(firestoredb, this.collectionName);
    }
    getCollectionRef(): CollectionReference<DocumentData> {
        return this.collectionRef;
    }
    getUserDocRef(userId: string): DocumentReference<DocumentData> {
        return doc(this.collectionRef, userId);
    }
    async addDocumentWithId(formDetails: SubmittedFormType, collectionName?: string) {
        if (this.collectionName) {
            try {
                await addDoc(this.collectionRef, formDetails);
            } catch (error) {
                console.log(error);
                throw Error("Error while Document Uploading");
            }
        }
    }
    //reading user details
    async readAllFieldsFromDocument(): Promise<ReceivedDocuments[]> {
        const snapshot = await getDocs(this.collectionRef);
        const documents = snapshot.docs.map((doc) => {
            const fields = doc.data() as DocumentFields; // Cast doc.data() to DocumentField interface
            return { id: doc.id, fields };
        });
        return documents;
    }

    async readProvidedDocuments(): Promise<providedDocumentsList[]> {
        const snapshot = await getDocs(this.collectionRef);
        const documents = snapshot.docs.map((doc) => {
            const fields = doc.data() as thumbnailType;
            return { id: doc.id, fields };
        });
        return documents;
    }

}