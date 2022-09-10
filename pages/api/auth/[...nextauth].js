import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
    TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        version: '2.0',
      }),
    // ...add more providers here
  ],

  callbacks: {
    async session({session, token,user}){
      session.user.username = session.user.name
      .split(" ")
      .join("")
      .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    }
  }
  
})