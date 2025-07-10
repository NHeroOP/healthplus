import { connect, connection as mongoConnection } from "mongoose";

type ConnectionObject = {
  isConnected?: number
}

const connection: ConnectionObject = {}

export default async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Db Already connected");
    return;
  }

  try {
    const db = await connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState
    console.log("DB connected successfully");
    return;
    
  } catch (err) {
    console.log("DB connection failed", err);
    process.exit(1);
  }
}