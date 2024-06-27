import { Background } from "@/global/types";
import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";

export const resolvers = {
    Query: {
        events: async(parent: any, args: any, ctx: any): Promise<Event[]> => {
            return [];
        },
        backgrounds: async(parent: any, { eventId }: {
            eventId?: string|null;
        }, ctx: any): Promise<Background[]> => {
            return await prisma.backgrounds.findMany({
                where: {
                    active: true
                }
            });
        },
    },
    Mutation: {
        createEvent: async(parent: any, { name, date, time, description }: {
            name: string;
            date: string;
            time: string;
            description?: string|null;
        }, ctx: any): Promise<Event|null> => {
            return null;
        },
        updateEvent: async(parent: any, { eventId, name, date, time, description }: {
            eventId: string;
            name: string;
            date: string;
            time: string;
            description: string;
        }, context: any): Promise<Event|null> => {
            return null;
        },
        deleteEvent: async(parent: any, { eventId }: {
            eventId: string;
        }, ctx: string): Promise<boolean> => {
            return false;
        },
        createBackground: async(parent: any, { url }: {
            url: string|null;
        }, ctx: any): Promise<Background|null> => {
            if (!url){
                return null;
            }

            return await prisma.backgrounds.create({
                data: {
                    background_id: randomUUID(),
                    url: url,
                }
            });
        },
        deleteBackground: async(parent: any, { backgroundId }: {
            backgroundId: string;
        }, ctx: any): Promise<boolean> => {
            const status = await prisma.backgrounds.update({
                data: {
                    active: false
                },
                where: {
                    background_id: backgroundId
                }
            });

            return !status.active;
        },
    },
    Event: {
        backgrounds: async (parent: Event, args: any, ctx: any): Promise<any> => {
            return [];
        },
    },
    Background: {
        events: async (parent: Background, args: any, ctx: any): Promise<any> => {

        },
    }
}