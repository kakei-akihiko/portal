<template>
  <b-container fluid class="mx-0 px-0 h-100">
    <div class="background" :style="backgroundStyle" v-if="backgroundStyle != null"></div>
    <b-row no-gutters class="h-100">
      <div :class="sideBarClass">
        <div class="h-100 d-flex flex-column">
          <b-container>
            <h1>{{ title }}</h1>
          </b-container>
          <div class="flex-grow-1 h-0">
            <b-container class="h-100 scroll">
              <slot name="sidebar" />
              <InformationBar/>
            </b-container>
          </div>
        </div>
      </div>
      <div :class="mainPanelClass">
        <FullHeight>
          <b-container slot="header" class="p-0">
            <div class="d-flex">
              <b-button variant="link" @click="sideBarExpanded = !sideBarExpanded" class="d-none d-md-block">
                <i class="fas fa-bars"></i>
              </b-button>
              <b-nav tabs class="flex-grow-1">
                <b-nav-item :active="activeTabName == 'tagAndText'" @click="tabClick('tagAndText')">タグとテキスト</b-nav-item>
                <b-nav-item :active="activeTabName == 'settings'" @click="tabClick('settings')">設定</b-nav-item>
              </b-nav>
            </div>
          </b-container>

          <div class="h-100">
            <b-container class="p-0 h-100">
              <slot name="main" />
            </b-container>
          </div>

        </FullHeight>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import InformationBar from '@/components/organisms/InformationBar.vue'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'main-template',

  props: {
    title: String,
  },

  components: {
    InformationBar,
  },

  computed: {
    activeTabName() {
      if(this.$route.name == 'tag-and-text-page') {
        return 'tagAndText'
      }
      if(this.$route.name == 'settings-page') {
        return 'settings'
      }
      return null
    },

    sideBarClass() {
      const mode = this.sideBarExpanded ? 'normal' : 'alternate'
      return this.panelClasses[mode].sideBar + ' h-100 bg-side-bar border-0'
    },

    mainPanelClass() {
      const mode = this.sideBarExpanded ? 'normal' : 'alternate'
      return this.panelClasses[mode].mainPanel + ' h-100'
    },

    backgroundStyle() {
      const {url, opacity, height} = this.background
      if (url == null || url.length <= 0
          || opacity == null
          || height == null) {
        return null
      }
      return {
        'background-image': 'url(' + url + ')',
        opacity,
        'background-size': 'auto ' + height,
        'background-position': 'right bottom',
      }
    },

    ...mapState('settings', ['background']),
  },

  methods: {
    tabClick(name) {
      if (name == 'tagAndText') {
        this.$router.push({name: 'tag-and-text-page'})
      }
      if (name == 'settings') {
        this.$router.push({name: 'settings-page'})
      }
    },

    ...mapActions('settings', ['loadBackground'])
  },

  data() {
    return {
      panelClasses: {
        normal: {sideBar: 'd-none d-md-block col-md-3', mainPanel: 'col-12 col-md-9'},
        alternate: {sideBar: 'd-none', mainPanel: 'col-12'},
      },
      sideBarExpanded: true,
      tabs: {
        active: 'tagAndText',
        markup: {
          tagAndText: true,
          settings: false,
        },
      },

    }
  },

  mounted() {
    this.loadBackground()
  },
}
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: .3;
  z-index: -1;
}

.bg-side-bar {
  background-color: rgba(206, 212, 218, 0.5) !important;
}
</style>
