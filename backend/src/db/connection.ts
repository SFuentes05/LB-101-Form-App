import { connect ,disconnect} from 'mongoose'

// Database connection function
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw new Error("Cannot Connect To MongoDB");
    }
}

// In order to make the app secure, I've added a disconnect function just in case something in the application goes wrong
async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Could Not Disconnect From MongoDB");
    }
}

export {connectToDatabase, disconnectFromDatabase};