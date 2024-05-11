import projectId, { collectionId, databasesId, bucketId } from '../appwriteId';
import { Client, Account, ID, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);

const account = new Account(client);

const databases = new Databases(client);

// function for Registering new user
async function registerAw(email, password, userName) {
    await account.create(
        ID.unique(),
        email,
        password,
        userName,
    )
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
        return await account.get();
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

export default registerAw;
export {
    loginAw,
    getUserAw,
    getAllPosts,

}

