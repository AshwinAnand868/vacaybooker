import { getServerSession } from "next-auth/next";

import prisma from "@/app/libs/prismadb";
import { authOptions } from "../libs/auth";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {

    try {
        const session = await getSession();
    
        if(!session?.user?.email) {
            return null;
        }
    
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if(!currentUser) {
            return null;
        }

        return currentUser;;
        
    } catch (error) {
        return null;
    }
}
