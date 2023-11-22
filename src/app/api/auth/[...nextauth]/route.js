import { User } from "@/models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log('creds - ',{credentials});
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);

        const user = await User.findOne({email});
        const passwordOk = user && bcrypt.compareSync(password, user.password)
console.log({passwordOk});
console.log(user);
        if (passwordOk) {
          return user;
        }
        return null
      }
    })
  ],
  // callbacks: {
  //   session: async (session, user) => {
  //     session.user = user;
  //     return Promise.resolve(session);
  //   },
  //   jwt: async (token, user) => {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return Promise.resolve(token);
  //   },
  // },

}
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}