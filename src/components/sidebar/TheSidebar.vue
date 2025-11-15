<template>
  <section class="sidebar sidebar-scoped">
    <header>
      <h1 class="site-title">
        <span class="house">🏠</span>
        <span class="animals">🐕🦘🐬🐓🕊🦢</span>
      </h1>
    </header>
    <slot/>
    <footer>
      <div v-if="sidebarArticleRef != null">
        <div v-html="sidebarArticleRef.html" />
      </div>
      <SidebarArticleItem v-if="articleItemVisible"/>
      <SidebarCategoryItem v-if="categoryItemVisible"/>
      <SidebarSettingItem v-if="settingItemVisible"/>
    </footer>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { loadSidebarSetting, sidebarArticleRef } from '../../store/ref'

import SidebarArticleItem from './SidebarArticleItem.vue'
import SidebarCategoryItem from './SidebarCategoryItem.vue'
import SidebarSettingItem from './SidebarSettingItem.vue'

const route = useRoute()

const articleItemVisible = computed(() =>
  route.name != 'ArticlesListPage' && route.name != 'ArticlesListPageNoSelected'
)

const categoryItemVisible = computed(() =>
  route.name != 'CategoryPage'
)

const settingItemVisible = computed(() =>
  route.name != 'SettingPage'
)

onMounted(async () => {
  // まだ読み込んでいない場合だけ読み込む
  if (sidebarArticleRef.value == null) {
    await loadSidebarSetting()
  }
})
</script>

<style scoped>
.sidebar-scoped {
  background: #E0F0FF;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;

  & header {
    padding: 0 .5rem;
  }

  & footer {
    margin-top: auto;
    padding: 0 .5rem;
  }
}

.site-title {
  margin: .5rem 0 0;
  font-size: 2.5rem;

  & .house {
    width: 50px;
  }

  & .animals {
    font-size: 40%
  }
}
</style>
