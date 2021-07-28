<template>
  <div>
    postList
    <post-card v-for="item in postsReactive.posts" :post="item"/>

    <Pagination
        :total="total"
        :pageSize="pageSize"
        :pageNum="pageNum"
        v-show="Math.ceil(total / pageSize) > 1"
        @getCurrentPage="gotoPage"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import type {Post} from "../../shared"
import PostCard from "./PostCard.vue"
import Pagination from "./Pagination.vue"

const sourcePosts: Post[] = __POSTS__

export default defineComponent({

      name: "PostList",
      components: {
        PostCard,
        Pagination
      },
      setup() {
        let route = useRoute();
        let router = useRouter();
        let total = sourcePosts.length + 1

        let pageNum = ref(1)
        let pageSize = ref(10)
        let postsReactive: { posts: Post[] } = reactive({posts: []})


        //从路由获取页码
        if (route.query.p != null && pageNum.toString() !== route.query.p) {
          pageNum.value = Number(route.query.p)
        }


        //刷新页面
        let flushPage = () => {
          //根据编码截取数组
          console.log(sourcePosts.slice((pageNum.value - 1) * pageSize.value, pageNum.value * pageSize.value))
          postsReactive.posts = sourcePosts.slice((pageNum.value - 1) * pageSize.value, pageNum.value * pageSize.value)

          //路由跳转
          router.push({
            query: {
              ...route.query,
              p: pageNum.value
            }
          })
        }

        flushPage()

        let nextPage = () => {
          pageNum.value++
          flushPage()
        }
        let previousPage = () => {
          pageNum.value--
          flushPage()
        }
        let gotoPage = (i) => {
          pageNum.value = i
          flushPage()
        }


        return {postsReactive, pageNum, nextPage, previousPage, total, pageSize, gotoPage}
      },

    }
)

</script>
