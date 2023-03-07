<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ArticlesDatabase from '@/infrastructure/ArticlesDatabase.js'
import CategoryRepository from '@/infrastructure/CategoryRepository.js'
import store from '../../store/index'

const articlesDatabase = new ArticlesDatabase()
const categoryRepository = new CategoryRepository(articlesDatabase)

const category = ref(null)
const categoryId = ref(null)
const route = useRoute()

const loadCategory = async () => {
  category.value = await categoryRepository.get(categoryId.value)
}

const tagPositionSelected = computed({
  get () {
    return category.value?.tagPosition ?? 'right'
  },
  async set (tagPosition) {
    await store.dispatch(
      'setCategorySettings',
      {
        categoryId: categoryId.value,
        tagPosition
      }
    )
    await loadCategory()
  }
})

const tagSelectionSelected = computed({
  get () {
    return category.value?.tagSelectionMode ?? 'single'
  },
  async set (tagSelectionMode) {
    console.log('tagSelectionSelected set', tagSelectionMode)
    await store.dispatch(
      'setCategorySettings',
      {
        categoryId: categoryId.value,
        tagSelectionMode
      }
    )
    await loadCategory()
  }
})

watch(() => route.params.categoryId, async newId => {
  categoryId.value = parseInt(newId)
  loadCategory()
})

onMounted(() => {
  categoryId.value = parseInt(route.params.categoryId)
  loadCategory()
})
</script>

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
