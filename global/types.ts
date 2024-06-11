
export type StepIcon = {
    title: string;
    icon: React.ReactNode;
}

export type ImageDimensions = {
    width: number;
    height: number;
}

export type Event = {
    event_id: string;
    name: string;
    date: string;
    time: string;
    description?: string|null;
    active: boolean;
    created: Date;
    modified: Date;
    backgrounds?: Background[];
}

export type Background = {
    background_id: string;
    url: string;
    active: boolean;
    created: Date;
    modified: Date;
    events?: Event[];
}

export type ApiResponse = {
    message: string;
    status: number;
}

export type BackgroundApiResponse = ApiResponse & {
    url?: string;
}

export type FlipImage = {
    image: HTMLImageElement;
    background?: HTMLImageElement|null;
}