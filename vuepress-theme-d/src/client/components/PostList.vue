<template>
  <div>
    <post-card v-for="item in postsReactive" :post="item"/>

    <Pagination
        :total="total"
        :pageSize="pageSize"
        :pageNum="pageNum"
        v-show="Math.ceil(total / pageSize) > 1"
        @gotoPage="gotoPage"
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from 'vue'
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
        console.log("postList setup")
        let route = useRoute();
        let router = useRouter();
        let total = sourcePosts.length + 1
        let pageNum = ref(1)
        let pageSize = ref(10)
        let postsReactive = computed(() => {
          return sourcePosts.slice((pageNum.value - 1) * pageSize.value, pageNum.value * pageSize.value)
        })

        let gotoPage = (i) => {
          //路由跳转
          router.push({
            query: {
              ...route.params,
              p: i
            }
          })
        }

        watchEffect(
            () => {
              //记一个bug 从/a跳转到/b 再回退时setup中route.path还是/b,结束后才变成/a,所以为了取到回退后参数中的p值,这里监听路由path变化,并跳过非首页路径
              if (route.path != "/") {
                return;
              }
              if (route.query.p == null) {
                return;
              }
              //从路由获取页码
              pageNum.value = Number(route.query.p)
            }
        )

        return {postsReactive, pageNum, total, pageSize, gotoPage}
      }
    }
)

</script>
