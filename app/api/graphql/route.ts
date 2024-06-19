//@ts-nocheck

import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { typeDefs } from "@/graphql/typeDefs";
import { resolvers } from "@/graphql/resolvers";

let handlerPromise = (async () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    return startServerAndCreateNextHandler(apolloServer, {
        context: async (req: NextRequest): Promise<{ req: NextRequest}> => {
            /* authentication will go here */

            return {
                req,
            }
        },
    });
})();

const route = async (req: NextRequest) => {
    const handler = await handlerPromise;
    return handler(req);
};

export { route as GET, route as POST };