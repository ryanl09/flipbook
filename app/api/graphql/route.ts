//@ts-nocheck

import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { typeDefs } from "@/graphql/typeDefs";
import { resolvers } from "@/graphql/resolvers";

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });


export { route as GET, route as POST };


const handler = startServerAndCreateNextHandler(apolloServer, {
    context: async (req: NextRequest) => {

      return {
        req,
      };
    },
  });
// Export the handler for GET and POST requests
export { handler as GET, handler as POST };