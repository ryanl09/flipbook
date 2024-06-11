import gql from "graphql-tag";

export const typeDefs = gql`
    
schema {
    query: Query
    mutation: Mutation
}

type Query {
    events: [Event]!
    backgrounds(eventId: String): [Background]!
}

type Mutation {
    createEvent(name: String!, date: String!, time: String!, description: String!): Event
    updateEvent(eventId: String!, name: String!, date: String!, time: String!, description: String!): Event
    deleteEvent(eventId: String!): Boolean!

    createBackground(url: String!, eventId: String): Background
    deleteBackground(backgroundId: String!): Boolean!
}

type Event {
    background_id: String!
    name: String!
    date: String!
    time: String!
    description: String!
    active: Boolean!
    created: String!
    modified: String!
    backgrounds: [Background]!
}

type Background {
    background_id: String!
    url: String!
    events: [Event]!
}

`;