import { shallowMount } from '@vue/test-utils';
import MessageBoard from '@/components/Message/MessageBoard.vue';

describe('MessageBoard.vue', () => {

  const title = 'Test Title';
  const messages = [
    {
      user_id: 1,
      content: 'Hello',
      updated_at: '2022-07-03T10:15:30'
    },
    {
      user_id: 2,
      content: 'Hi',
      updated_at: '2022-07-03T11:15:30'
    }
  ];
  const inputted = {
    msg: 'Test Message'
  };

  const wrapper = shallowMount(MessageBoard, {
    propsData: { title, messages, inputted },
    mocks: {
      $auth: {
        user: {
          id: 1
        }
      }
    },
  });

  wrapper.vm.$refs = { new: { reset: jest.fn() } }; // 追加

  // コンポーネントが正しくマウントされるかをテスト
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // タイトルが正しく表示されるかをテスト
  test('renders the title', () => {
    expect(wrapper.find('v-list-item-title').text()).toBe(title);
  });

  // メッセージが正しく表示されるかをテスト
  test('renders the messages', () => {
    const messageContent = wrapper.findAll('v-list-item-title');
    expect(messageContent.at(1).text()).toBe(messages[0].content);
    expect(messageContent.at(2).text()).toBe(messages[1].content);
  });

  // submitMessageメソッドが正しく動作するかをテスト
  test('emits submitMessage event with message and isValid flag', async () => {
    wrapper.setData({ isValid: true, localInputtedMsg: 'New Message' });
    await wrapper.vm.submitMessage();

    expect(wrapper.emitted().submitMessage).toBeTruthy();
    expect(wrapper.emitted().submitMessage[0]).toEqual([{ message: 'New Message', isValid: true }]);
  });

});
