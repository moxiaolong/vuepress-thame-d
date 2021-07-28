<template>
  <div>
    postcard
    {{ post.title }}
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
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

        let post = props.post;

        return {
          post
        }
      }
    }
)

</script>
