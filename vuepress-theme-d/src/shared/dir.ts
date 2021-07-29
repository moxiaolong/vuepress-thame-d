import {Post} from "./post";

export interface Dir extends Post {
    date: string
    title?: string
    excerpt?: string
    path?: string
    child?: Post[]
}
