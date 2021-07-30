<template>
  <div class="postcard">
    <h2>
      <router-link :to="post.path">{{ post.title }}</router-link>
    </h2>
    <span>日期:{{post.date}}</span>
    <span>目录{{post.dir}}</span>


  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, toRefs} from 'vue'
import type {Post} from "../../shared";

export default defineComponent({

      name: "PostCard",
      props: {
        post: { // 菜单数据
          type: Object as PropType<Post>,
          required: true
        }
      },

      setup(props) {

        let {post} = toRefs(props)

        return {
          post
        }
      }
    }
)

</script>
