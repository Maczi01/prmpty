'use client';

import React from 'react';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { Session } from '@node_modules/next-auth';

const Provider = ({ children, session }:
                      { children?: React.ReactNode, session?: Session }) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Provider;
