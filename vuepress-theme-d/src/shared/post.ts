import {Dir} from "./dir";

export interface Post {
    date: string
    title?: string
    //简介
    excerpt?: string
    //url路径
    path?: string
    //所属目录
    dir?: Dir
}
