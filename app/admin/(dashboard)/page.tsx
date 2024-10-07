"use client";
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import router from 'next/router';


const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return(
        <div
            className='h-screen'
        ></div>
    )

};

export default Dashboard;
