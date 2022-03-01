export interface Menus {
    [key: string]: MenuDetail[]
}

export interface MenuDetail {
    name: string;
    icon: string;
}