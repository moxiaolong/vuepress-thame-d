import {Dir} from "./dir";

export interface Post {
    index:number
    date: Date
    title?: string
    //简介
    excerpt?: string
    //url路径
    path?: string
    //所属目录
    dir?: Dir
}
