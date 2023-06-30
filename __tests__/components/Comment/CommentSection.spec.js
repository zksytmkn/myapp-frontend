import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import CommentSection from '@/components/Comment/CommentSection.vue';

const localVue = createLocalVue();

describe('CommentSection.vue', () => {
  let vuetify;
  let wrapper;
  let mockProps;

  beforeEach(() => {
    vuetify = new Vuetify();

    mockProps = {
      cmt: true,
      comments: [
        {
          id: 1,
          content: 'Test comment',
          updated_at: new Date(),
          user: {
            id: 1,
            name: 'User1',
            image_url: null
          }
        }
      ],
      inputted: { cmt: '' }
    };

    // $auth オブジェクトをモック
    const $auth = {
      user: {
        id: 2,
        name: 'User2',
        image_url: null
      }
    };

    wrapper = shallowMount(CommentSection, {
      localVue,
      vuetify,
      propsData: mockProps,
      mocks: {
        $auth
      },
    });

    // this.$refs.new.resetをモック
    wrapper.vm.$refs = {
      new: {
        reset: jest.fn()
      }
    };
  });

  it('renders correctly when comments are provided', () => {
    expect(wrapper.find('v-container-stub').isVisible()).toBe(true);
    // コンテンツが正しくレンダリングされているか確認
    expect(wrapper.html()).toContain('Test comment');
  });

  it('emits addComment event when addComment method is called', () => {
    wrapper.setData({ localInputtedCmt: 'New comment', isValid: true });
    wrapper.vm.addComment();

    expect(wrapper.emitted().addComment).toBeTruthy();
    expect(wrapper.emitted().addComment[0][0]).toEqual({ comment: 'New comment', isValid: true });
  });

  it('emits deleteComment event when deleteComment method is called', () => {
    wrapper.vm.deleteComment(1);

    expect(wrapper.emitted().deleteComment).toBeTruthy();
    expect(wrapper.emitted().deleteComment[0][0]).toBe(1);
  });
});
