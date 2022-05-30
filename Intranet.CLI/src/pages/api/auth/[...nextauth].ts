import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks:{
        async session({ session, token, user }){

            try {
                
                return {
                    ...session,
                    id: user.id,
                    ...token
                }

            } catch {
                
                return  {
                    ...session,
                    id: null,
                    ...token
                }
            }

        },
        async signIn({user, account, profile}){

            const { email } = user;

            try {
                return true
            } catch (error) {
                console.log('Ocorreu um erro: ', error)
                return false
            }

        }
    }
})