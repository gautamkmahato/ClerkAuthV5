import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'

export default async function Home() {

    const user = await currentUser(); 

    console.log(user)

    return (
        <>
        <h1 className='text-4xl'>Welcome to TODO App {user?.firstName}</h1>
        </>
    );
}

