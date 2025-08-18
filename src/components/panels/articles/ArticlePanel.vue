<template>
  <div class="card" body-class="py-2">
    <div class="card-body py-2">
      <div class="d-flex align-items-center">
        <div class="mr-auto d-flex flex-column">
          <div class="title">
            <span v-if="article.url == null">{{ article.title }}</span>
            <a v-else :href="article.url" target="_blank">{{ article.title }}</a>
          </div>

          <div
            v-if="bottomTagsVisible"
            class="tags"
          >
            <div
              v-if="article.tags != null"
              class="tags pr-2 h-interval"
            >
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="badge badge-info"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div class="right-side">
          <div
            v-if="!bottomTagsVisible && article.tags != null"
            class="pr-2 d-inline-block h-interval"
          >
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="badge badge-info"
            >
              {{ tag }}
            </span>
          </div>

          <ButtonExpand
            v-if="expandButtonVisible"
            :expanded="expanded"
            @click="expandButtonClick"
          />
          <button
            class="btn btn-link"
            @click="articleReadButtonClick"
          >
            <i class="far fa-newspaper"></i>
          </button>
          <button
            class="btn btn-link"
            @click="articleEditButtonClick"
          >
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>
      <div v-show="expanded" v-html="bodyHtml" class="article-body-view"/>
    </div>
  </div>
</template>

<script setup>
import { computed  } from 'vue'
import router from '../../../router/index'
import { marked } from '../../../infrastructure/markdown.js'
import ButtonExpand from '../../buttons/ButtonExpand.vue'

const emit = defineEmits(['expand'])

const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  tagPosition: {
    default: 'right',
    type: String
  }
})

const bodyHtml = computed(() => marked.parse(props.article.text))

const expandButtonVisible = computed(() => {
  return props.article.text != null && props.article.text.length > 0
})

const expanded = computed(() => props.article.expanded === true)

const bottomTagsVisible = computed(() => props.tagPosition === 'bottom')

const articleEditButtonClick = () => {
  router.push({
    name: 'ArticleEditPage',
    params: { id: props.article.id }
  })
}

const articleReadButtonClick = () => {
  router.push({
    name: 'ArticleReadPage',
    params: { id: props.article.id }
  })
}

const expandButtonClick = () => {
  emit('expand', !expanded.value)
}
</script>
