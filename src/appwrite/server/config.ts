import env from '@/env';
import { Client, Storage, Databases, Users, Avatars, Account } from 'node-appwrite';

export async function createSessionClient(session: any) {
  
  const client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId);
  

  if (!session || !session.value) {
    throw new Error("No session found");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get storage() {
      return new Storage(client);
    },
    get databases() {
      return new Databases(client);
    },
    get users() {
      return new Users(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
}


export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId)
    .setKey(env.appwrite.apiKey);
  
  return {
    get account() {
      return new Account(client);
    },
    get storage() {
      return new Storage(client);
    },
    get databases() {
      return new Databases(client);
    },
    get users() {
      return new Users(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
}