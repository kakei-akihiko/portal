<template>
  <div :class="entireClassName">
    <div class="panel-abstract">
      <h3>
        <span v-if="article.url == null">{{ article.title }}</span>
        <a v-else :href="article.url" target="_blank">{{ article.title }}</a>
      </h3>
    </div>
    <div class="panel-side-buttons">
      <ButtonExpand
        v-if="expandButtonVisible"
        :expanded="expanded"
        @click="expandButtonClick"
      />
      <button
        class="article-read-button"
        @click="articleReadButtonClick"
      >
        <i class="far fa-newspaper"></i>
      </button>
      <button
        class="article-edit-button"
        @click="articleEditButtonClick"
      >
        <i class="fas fa-edit"></i>
      </button>
    </div>
    <div class="panel-tags">
      <span
        v-for="tag in tags"
        :key="tag"
        class="badge badge-info"
      >
        {{ tag }}
      </span>
    </div>
    <div v-show="expanded" v-html="bodyHtml" class="article-body-view"/>
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

const entireClassName = computed(() => ({
  "panel-article": true,
  "side-tags": props.tagPosition !== 'bottom',
  "bottom-tags": props.tagPosition === 'bottom'
}))

const tags = computed(() => props.article.tags ?? [])

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

<style scoped>
.panel-article {
  border-top: solid 1px #ccc;
}

.panel-article.side-tags {
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-template-areas:
    "area-abstract area-tags area-side"
    "area-body area-body area-body";
}

.panel-article.bottom-tags {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "area-abstract area-side"
    "area-tags area-tags"
    "area-body area-body";
}

.panel-abstract {
  grid-area: area-abstract;
}

.panel-tags {
  grid-area: area-tags;
}

.panel-side-buttons {
  grid-area: area-side;
}

.article-body-view {
  grid-area: area-body;
}

.panel-side-buttons {
  display: flex;
  gap: 5px;
  align-items: center;
}

.article-edit-button {
  border-width: 0;
  background-color: var(--button-background);
}

.article-edit-button:hover {
  background-color: var(--button-hover-background);
}

.article-read-button {
  border-width: 0;
  background-color: var(--button-background);
}

.article-read-button:hover {
  background-color: var(--button-hover-background);
}
</style>
