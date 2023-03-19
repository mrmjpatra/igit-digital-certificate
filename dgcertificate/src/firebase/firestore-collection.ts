import { addDoc, collection, CollectionReference, doc, DocumentData,getDoc, getDocs, } from "firebase/firestore";
import { firestoredb } from './firebase-config';
import { SubmittedFormType } from "../pages/Register/validation";
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
type ProvidedDocument = {
    id: number,
    title: string,
    image: string
}
export type providedDocumentsType = ProvidedDocument[];

export class FireStoreCollection {
    private collectionName: string;
    private collectionRef: CollectionReference<DocumentData>;
    constructor(collectionName: string) {
        this.collectionName = collectionName;
        this.collectionRef = collection(firestoredb, this.collectionName);
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

    async readProvidedDocuments(): Promise<providedDocumentsType> {
        const docRef = doc(firestoredb, this.collectionName, 'rXp3CaNCqr0BRqJ0WqCm');
        try {
            const snapshot = await getDoc(docRef);
            console.log(snapshot)
            const documents = snapshot.data()?.documents ?? [];
            const documentList = documents.map((doc: any) => ({
                id: doc.id,
                title: doc.title,
                image: doc.image,
            })) as providedDocumentsType;
            return documentList;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}