import { mount } from '@vue/test-utils';
import PostTable from '@/components/Post/PostTable.vue';

describe('PostTable.vue', () => {

  let wrapper;

  beforeEach(() => {
    const posts = [
      {
        id: 1,
        title: 'Post Title 1',
        body: 'Post Body 1',
        updated_at: '2023-07-03T10:15:30',
        favorites_count: 2,
        unfavorites_count: 1
      },
      {
        id: 2,
        title: 'Post Title 2',
        body: 'Post Body 2',
        updated_at: '2023-07-03T11:15:30',
        favorites_count: 3,
        unfavorites_count: 0
      }
    ];

    wrapper = mount(PostTable, {
      propsData: {
        title: 'Test Title',
        posts,
        message: 'No posts available',
        otherPosts: false
      },
      stubs: {
        NuxtLink: true,
      }
    });
  });

  // コンポーネントが正しくマウントされるかをテスト
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // タイトルが正しく表示されるかをテスト
  test('renders the title', () => {
    const titleElement = wrapper.find('v-list-item-title');
    expect(titleElement.text()).toContain('Test Title');
  });

  // テーブルが存在するかをテスト
  test('renders the data table', () => {
    const dataTable = wrapper.find('v-data-table');
    expect(dataTable.exists()).toBe(true);
  });

  // ページネーションが表示されるかをテスト
  test('renders the pagination', () => {
    const pagination = wrapper.find('v-pagination');
    expect(pagination.exists()).toBe(true);
  });
});
