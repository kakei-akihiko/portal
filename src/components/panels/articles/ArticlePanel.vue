<template>
  <b-card body-class="py-2">
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
            <b-badge
              v-for="tag in article.tags"
              :key="tag"
              variant="info"
            >
              {{ tag }}
            </b-badge>
          </div>
        </div>
      </div>

      <div class="right-side">
        <div
          v-if="!bottomTagsVisible && article.tags != null"
          class="pr-2 d-inline-block h-interval"
        >
          <b-badge
            v-for="tag in article.tags"
            :key="tag"
            variant="info"
          >
            {{ tag }}
          </b-badge>
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
  </b-card>
</template>

<script>
import { marked } from '../../../infrastructure/markdown.js'
import ButtonExpand from '../../buttons/ButtonExpand.vue'

export default {

  name: 'ArticlePanel',

  components: { ButtonExpand },

  props: {
    article: {
      type: Object,
      required: true
    },
    tagPosition: {
      default: 'right',
      type: String
    }
  },

  computed: {
    bodyHtml () {
      return marked.parse(this.article.text)
    },
    expandButtonVisible () {
      return this.article.text != null && this.article.text.length > 0
    },
    expanded () {
      return this.article.expanded === true
    },
    bottomTagsVisible () {
      return this.tagPosition === 'bottom'
    }
  },

  methods: {
    articleEditButtonClick () {
      this.$router.push({
        name: 'ArticleEditPage',
        params: {id: this.article.id}
      })
    },
    articleReadButtonClick () {
      this.$router.push({
        name: 'ArticleReadPage',
        params: {id: this.article.id}
      })
    },
    expandButtonClick () {
      this.$emit('expand', !this.expanded)
    }
  }
}
</script>
