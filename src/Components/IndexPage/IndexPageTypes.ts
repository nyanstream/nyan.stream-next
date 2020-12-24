export type PlayerType = 'twitch-main' | 'twitch-backup' | 'gg' | 'asianwave';

export type SidebarTabType = 'chat' | 'schedule' | 'news';

export type SidebarTabItemDataType = {
    key: SidebarTabType;
    title: string;
};
