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
      <ButtonArticleReadPage :id="props.article.id"/>
      <ButtonArticleEditPage :id="props.article.id"/>
    </div>
    <div class="panel-tags">
      <TagBadge
        v-for="tag in tags"
        :key="tag"
        :title="tag"
      />
    </div>
    <div v-show="expanded" v-html="bodyHtml" class="article-body-view"/>
  </div>
</template>

<script setup>
import { computed  } from 'vue'
import router from '../../../router/index'
import { marked } from '../../../infrastructure/markdown.js'
import TagBadge from '../../badge/TagBadge.vue'
import ButtonArticleEditPage from '../../buttons/ButtonArticleEditPage.vue'
import ButtonArticleReadPage from '../../buttons/ButtonArticleReadPage.vue'
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
  gap: 5px;
}

.panel-article.bottom-tags {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "area-abstract area-side"
    "area-tags area-tags"
    "area-body area-body";
  gap: 5px;
}

.panel-abstract {
  grid-area: area-abstract;
}

.panel-tags {
  grid-area: area-tags;
  display: flex;
  gap: 5px;
  align-items: center;
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
</style>
