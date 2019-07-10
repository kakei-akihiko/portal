import * as _store from '@/store.js'
import {cloneDeep} from 'lodash'

describe('store.js', () => {

  it('記事を追加', () => {
    const {
      getters,
      mutations,
      state,
    } = cloneDeep(_store.default.modules.articles);

    const article = {
      "title":"YouTube",
      "text":"https://www.youtube.com/?gl=JP",
      "tags": ["動画"],
      "compact":true
    };
    const expectedTags = ['コンパクト', '動画', '記事', '非コンパクト'];

    mutations.setArticle(state, {article});

    const article3 = state.articles[3];
    expect(article3).toHaveProperty('title', article.title);
    expect(article3).toHaveProperty('attributes.leadHtml');
    expect(article3).toHaveProperty('attributes.bodyHtml');

    const tags = getters.tags(state);
    expect(tags).toEqual(expect.arrayContaining(expectedTags));
  })

  it('記事配列を初期化', () => {
    const {
      getters,
      mutations,
      state,
    } = cloneDeep(_store.default.modules.articles);

    mutations.setArticles(state, []);

    expect(state.articles).toHaveLength(0);

    const tags = getters.tags(state);
    expect(tags).toHaveLength(0);
  })
})
