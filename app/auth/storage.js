import * as storage from 'expo-secure-store';

const storeUser = async (user) => {
    try {
        await storage.setItemAsync('user', JSON.stringify(user));
    } catch (error) {
        console.log(error)
    }
}

const getUser = async () => {
    try {
        const user = await storage.getItemAsync('user');
        return user;
    } catch (error) {
        console.log("Error getting user")
    }
}

const removeUser = async () => {
    try {
        await storage.deleteItemAsync('user');
    } catch (error) {
        console.log("Error removing user")
    }
}

export default {
    storeUser,
    getUser,
    removeUser
}
    