<template>
  <div class="pagination">
    <span
        class="card-box prev iconfont icon-jiantou-zuo"
        :class="{disabled: pageNum === 1}"
        @click="goPre()"
    >
      <p>上一页</p>
    </span>

    <!-- 分页在5页及以下时 -->
    <div
        class="pagination-list"
        v-if="pages <= 5"
    >
      <span
          class="card-box"
          v-for="item in pages"
          :key="item"
          :class="{active: pageNum === item}"
          @click="goIndex(item)"
      >{{ item }}</span>
    </div>
    <!-- 分页在5页以上 -->
    <div
        class="pagination-list"
        v-else
    >
      <!-- 一号位 -->
      <span
          class="card-box"
          :class="{active: pageNum === 1}"
          @click="goIndex(1)"
      >1</span>

      <!-- 二号位 -->
      <span
          class="ellipsis ell-two"
          v-show="pageNum > 3"
          @click="goIndex(pageNum - 2)"
          title="上两页"
      />
      <!--这里没有使用v-if的原因是因为部署版本在当前页大于3时刷新页面出现了一些bug-->
      <span
          class="card-box"
          v-show="pageNum <= 3"
          :class="{active: pageNum === 2}"
          @click="goIndex(2)"
      >2</span>

      <!-- 三号位 -->
      <span
          class="card-box"
          :class="{active: pageNum >= 3 && pageNum <= (pages - 2)}"
          @click="goIndex(threeNum())"
      >{{ threeNum() }}</span>

      <!-- 四号位 -->
      <span
          class="ellipsis ell-four"
          v-show="pageNum < (pages - 2)"
          @click="goIndex(pageNum + 2)"
          title="下两页"
      />
      <span
          class="card-box"
          v-show="pageNum >= (pages - 2)"
          :class="{active: pageNum === pages-1}"
          @click="goIndex(pages-1)"
      >{{ pages - 1 }}</span>

      <!-- 五号位 -->
      <span
          class="card-box"
          :class="{active: pageNum === pages}"
          @click="goIndex(pages)"
      >{{ pages }}</span>
    </div>

    <span
        class="card-box next iconfont icon-jiantou-you"
        :class="{disabled: pageNum === pages}"
        @click="goNext()"
    >
      <p>下一页</p>
    </span>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, toRefs} from "vue";

export default defineComponent({
  emits: ['getCurrentPage'],
  props: {
    total: { // 总长度
      type: Number,
      default: 10
    },
    pageSize: { // 每页长
      type: Number,
      default: 10
    },
    pageNum: { // 当前页
      type: Number,
      default: 1
    }
  },

  setup(props, context) {
    const {total, pageSize, pageNum} = toRefs(props)
    let pages = computed(() => {
      return Math.ceil(total.value / pageSize.value)
    })


    let threeNum = () => { // 三号位页码计算
      let num = 3
      if (pageNum.value < 3) {
        num = 3
      } else if (pageNum.value > (pages.value - 3)) {
        num = pages.value - 2
      } else {
        num = pageNum.value
      }
      return num
    }

    let handleEmit = (i) => {
      context.emit('getCurrentPage', i)
    }

    let goNext = () => {
      if (pageNum.value < pages.value) {
        handleEmit(++pageNum.value)
      }
    }

    let goIndex = (i) => {
      if (i !== pageNum.value) {
        handleEmit(i)
      }
    }
    let goPre = () => {
      if (pageNum.value > 1) {
        handleEmit(--pageNum.value)
      }
    }

    return {
      goPre, goIndex, goNext, threeNum, pages, pageNum
    }

  }


})
</script>
