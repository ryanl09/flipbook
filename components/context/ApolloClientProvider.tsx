'use client';

import React, { useMemo } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

export const ApolloClientProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const client = useMemo((): ApolloClient<object> => {
        return new ApolloClient({
            uri: '/api/graphql',
            cache: new InMemoryCache()
        });
    }, []);

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}