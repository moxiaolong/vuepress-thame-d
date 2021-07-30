import {Post} from "./post";

export interface Dir extends Post {
    //包含内容
    child?: Post[]
}
