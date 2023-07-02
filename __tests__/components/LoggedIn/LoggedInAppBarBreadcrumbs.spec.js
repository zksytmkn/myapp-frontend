import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import LoggedInAppBarBreadcrumbs from '@/components/LoggedIn/LoggedInAppBarBreadcrumbs.vue';

describe('LoggedInAppBarBreadcrumbs.vue', () => {
  let vuetify;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  const createComponent = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    return mount(LoggedInAppBarBreadcrumbs, {
      localVue,
      vuetify,
      router,
      mocks: {
        $route: {
          name: 'someRoute'
        },
        $my: {
          pageTitle: () => 'Page Title'
        },
        $vuetify: {
          breakpoint: {
            xs: false
          }
        }
      },
      ...options
    });
  };

  test('displays breadcrumbs based on the route name', () => {
    const wrapper = createComponent({
      mocks: {
        $route: {
          name: 'products'
        },
        $my: {
          pageTitle: (routeName) => '農産物'
        },
        $vuetify: {
          breakpoint: {
            xs: false
          }
        }
      }
    });
  
    const breadcrumbs = wrapper.findAll('.text-truncate');
    const breadcrumbTexts = breadcrumbs.wrappers.map(breadcrumb => breadcrumb.text());
    expect(breadcrumbTexts).toContain('農産物');
  });
  
  test('does not display certain breadcrumbs if breakpoint is xs', () => {
    const wrapper = createComponent({
      mocks: {
        $route: {
          name: 'products'
        },
        $my: {
          pageTitle: (routeName) => 'Some Other Page'
        },
        $vuetify: {
          breakpoint: {
            xs: true
          }
        }
      }
    });
  
    const breadcrumbItems = wrapper.findAll('.text-truncate');
    const breadcrumbTexts = breadcrumbItems.wrappers.map(breadcrumb => breadcrumb.text());
  
    // xs ブレークポイントが真である場合、特定のパンくずリスト項目（ここでは '農産物'）は表示されない
    expect(breadcrumbTexts).not.toContain('農産物');
  });
});
