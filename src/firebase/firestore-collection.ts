import { addDoc, collection, CollectionReference, doc, DocumentData, DocumentReference, getDoc, getDocs, setDoc, updateDoc, } from "firebase/firestore";
import { firestoredb } from './firebase-config';
import { SubmittedFormType } from "../pages/Register/validation";
import { thumbnailType, providedDocumentsList } from "../pages/Home/CertificateCarousel";
import { applyCertFormType } from "../pages/AuthenticatedPages/Apply-Download/CertificateDownload";
import { IDepartments, IUploadedCertificate } from "../pages/AuthenticatedPages/Apply-Download/StepsToDownload";
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

interface CertificateDownloadForm extends DocumentFields {
    apply: boolean,
    pending: boolean,
    certDown: applyCertFormType
}
export interface ReceivedDocuments {
    id: string;
    fields: DocumentFields;
}


//marksheet

export type studentMarkshet = {
    name: string,
    regdNumber: string,
    rollNumber: string,
    marks: []
}

export type marksheetData={
   data:{
    subjects:[],
    markList: studentMarkshet[]
   }
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
                const userEmail = formDetails.emailId;
                const userDocRef = this.getUserDocRef(userEmail);
                await setDoc(userDocRef, formDetails);
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

    async readSpecifUserDetails(userEmail: string): Promise<CertificateDownloadForm> {
        const userDocRef = this.getUserDocRef(userEmail);
        const snapshot = await getDoc(userDocRef);
        return snapshot.data() as CertificateDownloadForm;
    }
    async readProvidedDocuments(): Promise<providedDocumentsList[]> {
        const snapshot = await getDocs(this.collectionRef);
        const documents = snapshot.docs.map((doc) => {
            const fields = doc.data() as thumbnailType;
            return { id: doc.id, fields };
        });
        return documents;
    }
    async updateUserFields(userEmail: string, fields: Record<string, any>): Promise<void> {
        try {
            // Get a reference to the user document using their email address
            const userDocRef = doc(this.collectionRef, userEmail);

            // Update the user document with the specified fields
            await updateDoc(userDocRef, fields);
            console.log("Fields updated successfully");
        } catch (error) {
            console.log("Error updating fields: ", error);
        }
    }

    async getAllClearanceList(userEmail: string): Promise<IDepartments> {
        try {
            const fieldName: string = 'clearance';
            const docRef = doc(this.collectionRef, userEmail);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                const fieldValue = docSnapshot.data()?.[fieldName];
                return fieldValue;
            } else {
                throw new Error(`${this.collectionName} document not found`);
            }
        } catch (error) {
            console.error("Error fetching departments: ", error);
            throw error;
        }
    }
    //read all uploaded certificate details
    async readUploadedCertificateData(regdNumber: string): Promise<IUploadedCertificate> {
        const userDocRef = this.getUserDocRef(regdNumber);
        const snapshot = await getDoc(userDocRef);
        return snapshot.data() as IUploadedCertificate;
    }

    //marksheet data
    async readMarkSheetData(branch:string):Promise<marksheetData>{
        const userDocRef=this.getUserDocRef(branch)
        const snapshot=await getDoc(userDocRef)
      return snapshot.data() as marksheetData
    }

}