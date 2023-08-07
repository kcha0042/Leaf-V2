import {
    addDoc,
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    QueryDocumentSnapshot,
    DocumentData,
    writeBatch,
    WhereFilterOp,
    QuerySnapshot,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { DatabaseCollection } from "./DatabaseCollection";

class DatabaseSession {
    public static readonly inst = new DatabaseSession();

    private constructor() {}

    /**
     * Inserts a single document into a specified collection.
     *
     * @param {DatabaseCollection} collectionName - The name of the collection.
     * @param {Record<string, any>} data - The document data to insert.
     * @param {string} [id] - The document ID (optional). If not provided, Firestore will generate one.
     * @returns {Promise<boolean>} - Returns true on success, false on failure.
     *
     * @example
     * DatabaseSession.inst.insertOne('users', { name: 'John', age: 25 });
     * DatabaseSession.inst.insertOne('users', { name: 'Jane', age: 20 }, 'customID');
     */
    public async insertOne(
        collectionName: DatabaseCollection,
        data: {},
        id: string | undefined = undefined,
    ): Promise<boolean> {
        try {
            if (id === undefined) {
                await addDoc(collection(db, collectionName), data);
            } else {
                const docRef = doc(db, collectionName, id);
                await setDoc(docRef, data);
            }
            console.log(`[DATABASE SESSION] Inserted 1 document`);
            return true;
        } catch (error) {
            console.error(`[DATABASE SESSION] Document insertion failed: ${error}`);
            return false;
        }
    }

    /**
     * Inserts multiple documents into a specified collection.
     *
     * @param {DatabaseCollection} collectionName - The name of the collection.
     * @param {Record<string, any>[]} data - An array of documents to insert.
     * @returns {Promise<boolean>} - Returns true on success, false on failure.
     *
     * @example
     * DatabaseSession.inst.insertMany('users', [{ name: 'John' }, { name: 'Jane' }]);
     */
    public async insertMany(collectionName: DatabaseCollection, data: {}[]): Promise<boolean> {
        try {
            const batch = writeBatch(db);

            data.forEach((docData) => {
                const docRef = doc(collection(db, collectionName));
                batch.set(docRef, docData);
            });

            await batch.commit();

            console.log(`[DATABASE SESSION] Inserted ${data.length} documents`);
            return true;
        } catch (error) {
            console.error(`[DATABASE SESSION] Multiple document insertion failed: ${error}`);
            return false;
        }
    }

    /**
     * Reads a specific document from a specified collection by its ID.
     *
     * @param {DatabaseCollection} collectionName - The name of the collection.
     * @param {string} id - The ID of the document to read.
     * @returns {Promise<Record<string, any> | null>} - Returns the document data if found, otherwise null.
     *
     * @example
     * DatabaseSession.inst.read('users', 'documentID');
     */
    public async read(collectionName: DatabaseCollection, id: string): Promise<DocumentData | null> {
        try {
            const docRef = doc(db, collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(`[DATABASE SESSION] Document data: `, docSnap.data());
                return docSnap.data();
            } else {
                console.log(`[DATABASE SESSION] No such document!`);
                return null;
            }
        } catch (error) {
            console.error(`[DATABASE SESSION] Failed to fetch document: ${error}`);
            return null;
        }
    }

    /**
     * Reads all documents from a specified collection.
     *
     * @param {DatabaseCollection} collectionName - The name of the collection.
     * @returns {Promise<Record<string, any>[]}> - Returns an array of documents.
     *
     * @example
     * DatabaseSession.inst.readCollection('users');
     */
    public async readCollection(collectionName: DatabaseCollection): Promise<QueryDocumentSnapshot<DocumentData>[]> {
        try {
            const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, collectionName));
            const docs: QueryDocumentSnapshot<DocumentData>[] = [];
            querySnapshot.forEach((doc) => {
                docs.push(doc);
            });
            console.log(`[DATABASE SESSION] Retrieved ${docs.length} documents from ${collectionName}`);
            return docs;
        } catch (error) {
            console.error(`[DATABASE SESSION] Failed to get documents from collection ${collectionName}: ${error}`);
            return [];
        }
    }

    /**
     * Updates a specific document in a specified collection.
     *
     * @param {DatabaseCollection} collectionName - The name of the collection.
     * @param {string} id - The ID of the document to update.
     * @param {Record<string, any>} data - The new data for the document.
     * @returns {Promise<boolean>} - Returns true on success, false on failure.
     *
     * @example
     * DatabaseSession.inst.update('users', 'documentID', { age: 26 });
     */
    public async update(collectionName: DatabaseCollection, id: string, data: {}): Promise<boolean> {
        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, data);
            console.log(`[DATABASE SESSION] Document updated`);
            return true;
        } catch (error) {
            console.error(`[DATABASE SESSION] Failed to update document: ${error}`);
            return false;
        }
    }

    /**
     * Deletes a specific document from a specified collection.
     *
     * @param {DatabaseCollection} collectionName - The name of the collection.
     * @param {string} id - The ID of the document to delete.
     * @returns {Promise<boolean>} - Returns true on success, false on failure.
     *
     * @example
     * DatabaseSession.inst.delete('users', 'documentID');
     */
    public async delete(collectionName: DatabaseCollection, id: string): Promise<boolean> {
        try {
            const docRef = doc(db, collectionName, id);
            await deleteDoc(docRef);
            console.log(`[DATABASE SESSION] Document deleted`);
            return true;
        } catch (error) {
            console.error(`[DATABASE SESSION] Failed to delete document: ${error}`);
            return false;
        }
    }

    /**
     * Queries a collection based on field conditions.
     *
     * @param {DatabaseCollection} collectionName - The name of the collection.
     * @param {string} fieldPath - The path to the field.
     * @param {WhereFilterOp} opStr - The operation string (e.g., '==', '>', '<', etc.).
     * @param {any} value - The value for the condition.
     * @returns {Promise<QueryDocumentSnapshot<DocumentData>[]>} - Returns an array of documents that match the query.
     *
     * @example
     * DatabaseSession.inst.query('users', 'age', '>', 25);
     * DatabaseSession.inst.query('users', 'name', '==', 'John');
     */
    public async query(
        collectionName: DatabaseCollection,
        fieldPath: string,
        opStr: WhereFilterOp,
        value: any,
    ): Promise<QueryDocumentSnapshot<DocumentData>[]> {
        try {
            const q = query(collection(db, collectionName), where(fieldPath, opStr, value));
            const querySnapshot = await getDocs(q);
            let docs: QueryDocumentSnapshot<DocumentData>[] = [];
            querySnapshot.forEach((doc) => {
                docs.push(doc);
            });
            console.log(`[DATABASE SESSION] Found ${docs.length} documents`);
            return docs;
        } catch (error) {
            console.error(`[DATABASE SESSION] Failed to perform query: ${error}`);
            return [];
        }
    }

    /**
     * Subscribes to a collection for real-time data updates.
     *
     * @param {DatabaseCollection} collectionName - The name of the collection.
     * @param {function} callback - A callback function to handle data updates.
     * @returns {function} - Returns an unsubscribe function to stop listening to data updates.
     *
     * @example
     * const unsubscribe = DatabaseSession.inst.subscribe('users', (docs) => console.log(docs));
     * unsubscribe();  // Call this when you no longer want to listen to updates
     */
    public subscribe(
        collectionName: DatabaseCollection,
        callback: (docs: QueryDocumentSnapshot<DocumentData>[]) => void,
    ) {
        const q = collection(db, collectionName);
        return onSnapshot(q, (querySnapshot) => {
            let docs: QueryDocumentSnapshot<DocumentData>[] = [];
            querySnapshot.forEach((doc) => {
                docs.push(doc);
            });
            callback(docs);
        });
    }
}

export default DatabaseSession;
