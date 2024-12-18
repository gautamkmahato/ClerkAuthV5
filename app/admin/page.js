import { checkRole } from '@/utils/roles';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
    const isAdmin = await checkRole('admin');
    if (!isAdmin) {
        return(
            <>
                <h1>You are not authorized, Please Login with correct user</h1>
            </>
        )
    }
    return (
        <>
            <h1 className='text-4xl'>Admin Page</h1>
        </>
    )
}
