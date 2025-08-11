<script setup>
import { onMounted } from 'vue'
import { loadSidebarSetting, sidebarArticleRef } from '../../store/ref'

onMounted(async () => {
  // まだ読み込んでいない場合だけ読み込む
  if (sidebarArticleRef.value == null) {
    await loadSidebarSetting()
  }
})
</script>

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
      <div v-if="$route.name != 'ArticlesListPage'">
        <router-link
          :to="{ name: 'ArticlesListPage' }"
          class="sidebar-item"
        >
          <i class="far fa-newspaper"></i>
          <span>記事</span>
        </router-link>
      </div>
      <div v-if="$route.name != 'CategoryPage'">
        <router-link
          :to="{ name: 'CategoryPage' }"
          class="sidebar-item"
        >
          <i class="far fa-folder-open"></i>
          <span>カテゴリー</span>
        </router-link>
      </div>
      <div v-if="$route.name != 'SettingPage'">
        <router-link
          :to="{ name: 'SettingPage' }"
          class="sidebar-item"
        >
          <i class="fas fa-cog"></i>
          <span>設定</span>
        </router-link>
      </div>
    </footer>
  </section>
</template>

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

.sidebar-item:has(i) {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 50px;
  align-items: center;
  color: #505050;
}

.sidebar-item:hover {
  background-color: #FFFFFF80;
  border-radius: .2rem;
}

.sidebar-item i {
  width: 50px;
  text-align: center;
}
</style>
