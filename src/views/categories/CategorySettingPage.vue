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

          <form>
            <fieldset class="form-group">
              <div class="form-row">
                <legend tabindex="-1" class="col-4 col-form-label pt-0">
                  タグの選択
                </legend>
                <div class="col">
                  <div class="custom-control custom-control-inline custom-radio">
                    <input
                      class="custom-control-input"
                      type="radio"
                      name="tagsSelection"
                      value="single"
                      v-model="tagSelectionSelected"
                      id="tagsSelection-single"
                    />
                    <label class="custom-control-label" for="tagsSelection-single">
                      <span>最大1個</span>
                    </label>
                  </div>

                  <div class="custom-control custom-control-inline custom-radio">
                    <input
                      class="custom-control-input"
                      type="radio"
                      name="tagsSelection"
                      value="multiple"
                      v-model="tagSelectionSelected"
                      id="tagsSelection-multiple"
                    />
                    <label class="custom-control-label" for="tagsSelection-multiple">
                      <span>複数</span>
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset class="form-group">
              <div class="form-row">
                <legend tabindex="-1" class="col-4 col-form-label pt-0">
                  タグの表示位置
                </legend>
                <div class="col">
                  <div class="custom-control custom-control-inline custom-radio">
                    <input
                      class="custom-control-input"
                      type="radio"
                      name="tagsPosition"
                      value="right"
                      v-model="tagPositionSelected"
                      id="tagsPosition-right"
                    />
                    <label class="custom-control-label" for="tagsPosition-right">
                      <span>タイトルの右</span>
                    </label>
                  </div>

                  <div class="custom-control custom-control-inline custom-radio">
                    <input
                      class="custom-control-input"
                      type="radio"
                      name="tagsPosition"
                      value="bottom"
                      v-model="tagPositionSelected"
                      id="tagsPosition-bottom"
                    />
                    <label class="custom-control-label" for="tagsPosition-bottom">
                      <span>タイトルの下</span>
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
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
      categoryId: null
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
        console.log('tagSelectionSelected set', tagSelectionMode)
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
