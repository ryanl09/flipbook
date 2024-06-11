import gql from "graphql-tag";

export const getBackgrounds = gql`
    query backgrounds($eventId: String) {
        backgrounds(eventId: $eventId) {
            background_id
            url
        }
    }
`;

export const getEvents = gql`
    query events {
        events {
            event_id
            name
            date
            time
        }
    }
`;