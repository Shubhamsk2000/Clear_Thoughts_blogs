import projectId, { collectionId, databasesId, bucketId } from '../appwriteId';
import { Client, Account, ID, Databases, Storage } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);

const account = new Account(client);

const databases = new Databases(client);
const storage = new Storage(client);

// function for Registering new user
async function registerAw(email, password, userName) {
    try {
        await account.create(
            ID.unique(),
            email,
            password,
            userName,
        )

    } catch (error) {
        
        console.log(error.message);
    }
}
// function for login user
async function loginAw(email, password) {
    try {
        await account.createEmailPasswordSession(
            email,
            password,
        )

    } catch (error) {
        console.log(error.message);
    }

}

async function getUserAw() {
    try {
    console.log("Server request successful for get user");

        return await account.get();
    } catch (error) {
        console.log(error.message);
    }
}
async function logOut() {
    try {
        return await account.deleteSessions();
    } catch (error) {
        console.log(error.message);
    }
}
async function getAllPosts() {
    try {
        return await databases.listDocuments(
            databasesId,
            collectionId
        )
    } catch (error) {
        console.log(error.message);
    }
}
async function getDocument(slug) {
    try {
        return await databases.getDocument(
            databasesId,
            collectionId,
            slug,
        )
    } catch (error) {
        console.log(error.message);
    }
}

async function createPost(title, slug, content, userId, authorName) {
    try {
        return await databases.createDocument(
            databasesId,
            collectionId,
            slug,
            {
                title,
                userId,
                content,
                authorName,
            }
        )
    } catch (error) {
        console.log(error.message)
    }
}

async function uploadFile(File, slug) {
    try {
        return await storage.createFile(
            bucketId,
            slug,
            File
        )
    } catch (error) {
        console.log(error.message);
    }
}

async function getFile(slug){
    try {
        return await storage.getFile(
            bucketId,
            slug
        )
    } catch (error) {
        console.log(error.message, "error in getFile");
    }
}
async function getFilePreview(slug){
    try {
        return await storage.getFilePreview(
            bucketId,
            slug
        )
    } catch (error) {
        console.log(error.message, "error in getFile");
    }
}


async function getFileList(){
    try {
        return await storage.listFiles(
            bucketId
        )
    } catch (error) {
        console.log(error.message, "error in getFile");
    }

}

export default registerAw;
export {
    loginAw,
    getUserAw,
    getAllPosts,
    getDocument,
    logOut,
    createPost,
    uploadFile,
    getFile,
    getFilePreview,
    getFileList



}

