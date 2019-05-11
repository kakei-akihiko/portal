<template>
  <MainTemplate title="Home">
    <div slot="sidebar">
      <b-card title="タグ">
        <b-button
            v-for="tagOption in tagOptions" :key="tagOption.text"
            :variant="tagOption.selected ? 'primary' : 'outline-primary'"
            @click="tagOptionClick(tagOption)" size="sm">
          {{ tagOption.text }}
        </b-button>
      </b-card>
    </div>

    <section class="h-100" slot="main">
      <div class="h-100 scroll" v-if="!editPanel.visible">
        <b-card>
          <div class="text-right">
            <ExpandingIcon
              :expanded="compactTableExpanded"
              @click="compactTableExpanded = !compactTableExpanded"/>
          </div>
          <TagAndTextTable v-show="compactTableExpanded"/>
        </b-card>

        <div class="text-right">
          <b-button variant="primary" @click="articleCreateClick">作成</b-button>
        </div>

        <b-row no-gutters>
          <b-col v-for="article in articles" :key="article.id" cols="12" xl="6">
            <b-card>

              <b-card-title class="d-flex">
                <div class="flex-grow-1">
                  <span v-if="article.url == null">{{ article.title }}</span>
                  <a v-else :href="article.url">{{ article.title }}</a>
                </div>
                <b-button variant="link" size="sm" @click="articleEditClick(article)">
                  <i class="fas fa-pencil-alt fa-lg"></i>
                </b-button>
                <b-button variant="link" size="sm" @click="articleShowModalClick(article)">
                  <i class="far fa-window-maximize fa-lg"></i>
                </b-button>
              </b-card-title>

              <div class="text-truncate" v-if="article.attributes.leadHtml == null">
                {{ article.url }}
              </div>
              <div class="text-truncate" v-else v-html="article.attributes.leadHtml"></div>

            </b-card>
          </b-col>
        </b-row>
      </div>

      <FullHeight v-if="editPanel.visible">
        <div slot="header">
          <b-form-group label-sr-only class="pt-3">
            <b-input v-model="editPanel.article.title" placeholder="タイトル" />
          </b-form-group>

          <b-form-group label-sr-only>
            <b-checkbox v-model="editPanel.article.compact">コンパクト表示</b-checkbox>
          </b-form-group>
        </div>

        <b-container fluid class="h-100 p-0">
          <b-row class="h-100 p-0" no-gutters>
            <b-col class="h-100 scroll">
              <b-textarea :value="editPanel.article.text" @input="articleTextInput" placeholder="本文" class="h-100" />
            </b-col>
            <b-col>
              <div v-html="editPanel.html" class="p-2"></div>
            </b-col>
          </b-row>
        </b-container>

        <b-form-group label-sr-only slot="footer">
          <div class="d-flex pt-3">
            <b-input v-model="editPanel.article.tags" class="flex-glow-1" placeholder="タグ1 タグ2 ..." />
            <b-button @click="editSaveClick" variant="primary">
              保存
            </b-button>
            <b-button @click="editCancelClick" variant="default">
              キャンセル
            </b-button>
          </div>
        </b-form-group>
      </FullHeight>
    </section>

    <div slot="float-elements">
      <b-modal ref="articleModal" size="lg" no-fade ok-only ok-variant="default" ok-title="閉じる">
          <template slot="modal-title" v-if="articleModal.article != null">
            {{ articleModal.article.title }}
          </template>
        <div v-if="articleModal.article != null" v-html="articleModal.article.attributes.bodyHtml"></div>
      </b-modal>
    </div>
  </MainTemplate>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import marked from 'marked'

import ExpandingIcon from '@/components/inlines/ExpandingIcon'
import MainTemplate from '@/components/templates/MainTemplate.vue'
import TagAndTextTable from '@/components/organisms/TagAndTextTable.vue'

export default {
  name: 'root-page',

  components: {
    ExpandingIcon,
    MainTemplate,
    TagAndTextTable,
  },

  computed: {
    articles() {
      return this.selectedTags.length > 0
        ? this.articlesHasSelectedTag
        : this.articlesHasnotTag
    },

    tagOptions() {
      return this.tags.map(tagText => {
        const selected = this.selectedTags.some(_tagText => tagText == _tagText)
        return {text: tagText, selected}
      })
    },

    ...mapGetters('articles', [
      'articlesHasnotTag',
      'articlesHasSelectedTag',
      'tags',
    ]),

    ...mapState('articles', ['selectedTags']),
  },

  methods: {
    articleCreateClick() {
      const {id, title, text, compact, tags} = {}
      this.editPanel.article = {
        id, title, text, compact, tags,
      }
      this.editPanel.visible = true
      this.editPanel.html = marked('')
    },

    articleEditClick(article) {
      const {id, title, text, compact, tags} = article
      this.editPanel.article = {
        id, title, text, compact, tags: tags.join(' ')
      }
      this.editPanel.visible = true
      this.editPanel.html = marked(text || '')
    },

    articleShowModalClick(article) {
      this.articleModal.article = article
      console.log('$ref', Object.keys(this.$refs))
      this.$refs.articleModal.show()
    },

    articleTextInput(text) {
      this.editPanel.article.text = text
      this.editPanel.html = marked(text)
    },

    editSaveClick() {
      const tags = (this.editPanel.article.tags || '').split(' ').filter(tag => tag.length > 0)
      const article = {
        ...this.editPanel.article,
        ...{tags},
      }
      this.setArticle({article})
      this.editPanel.visible = false
      this.editPanel.article = null
    },

    editCancelClick() {
      this.editPanel.visible = false
      this.editPanel.article = null
    },

    tagOptionClick(tagOption) {
      this.selectTag({
        tag: tagOption.text,
        selected: !tagOption.selected
      })
    },

    ...mapActions('articles', ['loadArticles']),
    ...mapMutations('articles', ['selectTag', 'setArticle']),
  },
  
  data() {
    return {
      compactTableExpanded: true,
      editPanel: {
        visible: false,
        article: null,
        html: null,
      },
      articleModal: {
        article: null,
      },
    }
  },

  mounted() {
    this.loadArticles()
  },
}
</script>
