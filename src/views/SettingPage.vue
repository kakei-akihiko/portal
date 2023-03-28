<script setup>
import { onMounted, ref } from 'vue'
import store from '../store/index'
import { setSidebarArticleId } from '../store/ref'
import ArticlesDatabase from '@/infrastructure/ArticlesDatabase.js'

const articlesDatabase = new ArticlesDatabase()

const sidebarArticleId = ref(null)

const deleteDatabaseButtonClick = () => {
  articlesDatabase.delete()
  console.log('データベースを削除しました。')
}

const reload = async () => {
  await store.dispatch('sidebar/loadSetting')
  sidebarArticleId.value = store.state.sidebar.articleId
}

const sidebarArticleButtonClick = async () => {
  const idIsEmpty = sidebarArticleId.value === '' || sidebarArticleId.value == null
  const id = idIsEmpty ? null : Number(sidebarArticleId.value)
  await setSidebarArticleId(id)
  await reload()
}

onMounted(() => reload())
</script>

<template>
  <TheMainLayout main-panel-scroll>
    <template v-slot:sidebar>
      <TheSidebar/>
    </template>

    <template v-slot:panel-main>
      <h2>設定</h2>

      <div class="card">
        <div class="card-header">サイドバーの記事</div>
        <div class="card-body">
          <fieldset class="form-group" label="記事ID">
            <input
              name="sidebar-article-id"
              class="form-control"
              v-model="sidebarArticleId"
            />
          </fieldset>
          <fieldset class="form-group mb-0" label-sr-only>
            <button
              class="btn btn-primary"
              type="button"
              @click="sidebarArticleButtonClick"
            >
              反映
            </button>
          </fieldset>
        </div>
      </div>

      <div class="card border-danger">
        <div class="card-header border-danger text-danger">危険な設定</div>
        <div class="card-body">
          <fieldset class="form-group">
            <button
              type="button"
              class="btn btn-secondary"
              @click="deleteDatabaseButtonClick"
            >
              データベース削除
            </button>
          </fieldset>
        </div>
      </div>
    </template>
  </TheMainLayout>
</template>
