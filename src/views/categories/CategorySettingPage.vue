<template>
  <TheMainLayout main-panel-scroll>
    <template v-slot:sidebar>
      <TheSidebar/>
    </template>

    <template v-slot:panel-main>
      <div
        slot="panel-main"
        class="h-100"
      >
        <NotFoundAlert v-if="category == null"/>
        <div
          v-else
          class="h-100"
        >
          <h2>{{ category.title }}の設定</h2>

          <b-form>
            <fieldset class="form-group">
              <div class="form-row">
                <legend tabindex="-1" class="col-4 col-form-label pt-0">
                  タグの選択
                </legend>
                <div class="col">
                  <b-radio-group
                    name="tagsSelection"
                    :options="tagSelection.options"
                    v-model="tagSelectionSelected"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset class="form-group">
              <div class="form-row">
                <legend tabindex="-1" class="col-4 col-form-label pt-0">
                  タグの表示位置
                </legend>
                <div class="col">
                  <b-radio-group
                    name="tagsPosition"
                    :options="tagsPosition.options"
                    v-model="tagPositionSelected"
                  />
                </div>
              </div>
            </fieldset>
          </b-form>
        </div>
      </div>
    </template>

  </TheMainLayout>
</template>

<script>
import ArticlesDatabase from '@/infrastructure/ArticlesDatabase.js'
import CategoryRepository from '@/infrastructure/CategoryRepository.js'

const articlesDatabase = new ArticlesDatabase()
const categoryRepository = new CategoryRepository(articlesDatabase)

export default {
  name: 'CategorySettingPage',

  data () {
    return {
      category: null,
      categoryId: null,
      tagsPosition: {
        options: [
          { text: 'タイトルの右', value: 'right' },
          { text: 'タイトルの下', value: 'bottom' }
        ]
      },
      tagSelection: {
        options: [
          { text: '最大1個', value: 'single' },
          { text: '複数', value: 'multiple' }
        ]
      }
    }
  },

  computed: {
    tagPositionSelected: {
      get () {
        return this.category?.tagPosition ?? 'right'
      },
      async set (tagPosition) {
        const { categoryId } = this
        await this.$store.dispatch('setCategorySettings', { categoryId, tagPosition })
        await this.loadCategory()
      }
    },
    tagSelectionSelected: {
      get () {
        return this.category?.tagSelectionMode ?? 'single'
      },
      async set (tagSelectionMode) {
        const { categoryId } = this
        await this.$store.dispatch('setCategorySettings', { categoryId, tagSelectionMode })
        await this.loadCategory()
      }
    }
  },

  watch: {
    $route (to) {
      this.categoryId = parseInt(to.params.categoryId)
      this.loadCategory()
    }
  },

  mounted () {
    this.categoryId = parseInt(this.$route.params.categoryId)
    this.loadCategory()
  },

  methods: {
    async loadCategory () {
      this.category = await categoryRepository.get(this.categoryId)
    }
  }
}
</script>
