<template>
  <TheMainLayout main-panel-scroll>
    <template v-slot:sidebar>
      <TheSidebar/>
    </template>

    <template v-slot:panel-main>
      <h2>設定</h2>

      <section class="sidebar-article">
        <h3>サイドバーの記事</h3>
        <fieldset class="form-group">
          <label>記事ID</label>
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
      </section>
      
      <section class="danger-panel">
        <h3>危険な設定</h3>
        <fieldset class="form-group">
          <button
            type="button"
            class="delete-database"
            @click="deleteDatabaseButtonClick"
          >
            データベース削除
          </button>
        </fieldset>
      </section>
    </template>
  </TheMainLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { loadSidebarSetting, setSidebarArticleId, sidebarArticleRef } from '../store/ref'
import ArticlesDatabase from '../infrastructure/ArticlesDatabase.js'

const articlesDatabase = new ArticlesDatabase()

const sidebarArticleId = ref(null)

const deleteDatabaseButtonClick = () => {
  articlesDatabase.delete()
  console.log('データベースを削除しました。')
}

const sidebarArticleButtonClick = async () => {
  const idIsEmpty = sidebarArticleId.value === '' || sidebarArticleId.value == null
  const id = idIsEmpty ? null : Number(sidebarArticleId.value)
  await setSidebarArticleId(id)
}

onMounted(async () => {
  await loadSidebarSetting()
  sidebarArticleId.value = sidebarArticleRef.value?.id
})
</script>

<style scoped>
.form-group {
  border-width: 0;
}

.sidebar-article fieldset label {
  margin-right: 10px;
}

.danger-panel {
  margin-top: 10px;
  border-top: 1px solid #ccc;
}

.delete-database:hover {
  background-color: rgb(250,100,100);
}
</style>
