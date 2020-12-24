type NewsQueryResponseCommunityInfoType = {
    id: number;
    url: string;
    pic: string;
};

type NewsQueryResponsePostType = {
    id: number;
    time: number;
    type: 'post' | 'copy';
    pin: boolean;
    text: string;
    pic?: {
        small: string;
        big: string;
    };
};

export type NewsQueryResponseType = {
    com: NewsQueryResponseCommunityInfoType;
    posts: NewsQueryResponsePostType[];
};

export type NotificationQueryResponseType = {
    enabled: boolean;
    time: number;
    text: string;
};
