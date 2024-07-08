import getCurrentUser from "@/hooks/getCurrentUser";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from "@/util/authOptions";
import Bio from "@/components/_components/bio";
import ReplyRepost from "@/components/myComponents/reply_repost";

export default async function ProfilePage({ params, children }: {
    params: {
        userName: string
    },
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/login');
        return null; // Ensures the function doesn't continue after redirect
    }

    const currentUser = await fetchCurrentUser(session.user.id);
    if (!currentUser) {
        return (
            <div className="">
                ...Loading
            </div>
        );
    }

    const sanitizedUserName = params.userName.replace(/%40/g, "").replace(/%20/g, "");

    return (
        <>
            <title>{`${currentUser?.name} (@${sanitizedUserName} on Threads)`}</title>
            <div className="flex flex-col flex-wrap z-99999">
                
                <ReplyRepost userName={params.userName} />
                {children}
            </div>
        </>
    );
}

async function fetchCurrentUser(userId: string) {
    try {
        const currentUser = await getCurrentUser(userId);
        return currentUser;
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        return null;
    }
}
