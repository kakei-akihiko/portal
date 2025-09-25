<template>
  <TheMainLayout main-panel-scroll>
    <template v-slot:sidebar>
      <TheSidebar/>
    </template>

    <template v-slot:panel-main>
      <NotFoundAlert v-if="category == null"/>
      <div v-else>
        <h2>{{ category.title }}の設定</h2>
        <section class="tag-section">
          <h3>タグの選択</h3>
          <fieldset class="form-group">
            <div>
              <input
                type="radio"
                name="tagsSelection"
                value="single"
                v-model="tagSelectionSelected"
                id="tagsSelection-single"
              />
              <label for="tagsSelection-single">
                最大1個
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="tagsSelection"
                value="multiple"
                v-model="tagSelectionSelected"
                id="tagsSelection-multiple"
              />
              <label for="tagsSelection-multiple">
                複数
              </label>
            </div>
          </fieldset>
        </section>
        <section class="tag-section">
          <h3>タグの表示位置</h3>
          <fieldset class="form-group">
            <div>
              <input
                type="radio"
                name="tagsPosition"
                value="right"
                v-model="tagPositionSelected"
                id="tagsPosition-right"
              />
              <label for="tagsPosition-right">
                <span>タイトルの右</span>
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="tagsPosition"
                value="bottom"
                v-model="tagPositionSelected"
                id="tagsPosition-bottom"
              />
              <label for="tagsPosition-bottom">
                <span>タイトルの下</span>
              </label>
            </div>
          </fieldset>
        </section>
      </div>
    </template>
  </TheMainLayout>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ArticlesDatabase from '../../infrastructure/ArticlesDatabase.js'
import CategoryRepository from '../../infrastructure/CategoryRepository.js'
import { setCategorySettings } from '../../store/index'

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
    await setCategorySettings({
      categoryId: categoryId.value,
      tagPosition
    })
    await loadCategory()
  }
})

const tagSelectionSelected = computed({
  get () {
    return category.value?.tagSelectionMode ?? 'single'
  },
  async set (tagSelectionMode) {
    console.log('tagSelectionSelected set', tagSelectionMode)
    await setCategorySettings({
      categoryId: categoryId.value,
      tagSelectionMode
    })
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
