// This is to augment NextAuth, to implement the role attribute for User
import { DefaultSession } from "next-auth"

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            role: string
        } & DefaultSession["user"]
    }
    interface User {
        role: string
    }
    interface JWT {
        role: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: string
    }
}

declare module "next-auth/adapters" {
    interface AdapterUser {
        role: string
    }
}
