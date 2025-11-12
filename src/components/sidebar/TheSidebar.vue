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
      <div v-if="$route.name != 'ArticlesListPage' && $route.name != 'ArticlesListPageNoSelected'">
        <router-link
          :to="{ name: 'ArticlesListPageNoSelected' }"
          class="sidebar-item"
        >
          <i class="far fa-newspaper"></i>
          <span>記事</span>
        </router-link>
      </div>
      <div v-if="$route.name != 'CategoryPage'">
        <SidebarCategoryItem/>
      </div>
      <div v-if="$route.name != 'SettingPage'">
        <SidebarSettingItem/>
      </div>
    </footer>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { loadSidebarSetting, sidebarArticleRef } from '../../store/ref'

import SidebarCategoryItem from './SidebarCategoryItem.vue'
import SidebarSettingItem from './SidebarSettingItem.vue'

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
