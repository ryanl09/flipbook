import gql from "graphql-tag";

export const createEvent = gql`
    mutation createEvent($name: String!, $date: String!, $time: String!, $description: String) {
        createEvent(name: $name, date: $date, time: $time, description: $description) {
            event_id
            date
            time
            description
            created
            modified
            active
        }
    }
`;

export const updateEvent = gql`
    mutation updateEvent($eventId: String!, $name: String!, $date: String!, $time: String!, $description: String) {
        updateEvent(eventId: $eventId, name: $name, date: $date, time: $time, description: $description) {
            event_id
            date
            time
            description
            created
            modified
            active
        }
    }`;

export const deleteEvent = gql`
    mutation deleteEvent($eventId: String!) {
        deleteEvent(eventId: $eventId)
    }
`;

export const createBackground = gql`
    mutation createBackground($url: String!) {
        createBackground(url: $url) {
            background_id
            url
        }
    }
`;

export const deleteBackground = gql`
    mutation deleteBackground($backgroundId: String!) {
        deleteBackground(backgroundId: $backgroundId)
    }
`;