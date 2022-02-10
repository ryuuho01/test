import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import App from "@/pages/detail/_id.vue";

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
const { required } = require('vee-validate/dist/rules.umd')
extend('required', required)
const customRule = {
  params: ['string'],
  message: '必須項目です',
  validate(value:any, {string}:any) {
    return value !== string;
  }
};
extend('custom_rule', customRule);

describe("detail.vue test", () => {
  it("Back button", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $auth: {
          loggedIn: false,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id:999
          }
        },
        $router: {
          push:jest.fn()
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      }
    })
    await wrapper.get('[data-test="back"]').trigger("click")
    // expect(wrapper.vm.$router.push).toBeCalledWith("/login")
  });
  it("Navigation guard", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $auth: {
          loggedIn: false,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id:999
          }
        },
        $router: {
          push:jest.fn()
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      }
    })
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/login")
  });
  it("Reservation_date input check", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id:999
          }
        },
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
    })
    window.alert = jest.fn()
    const elm = document.createElement('div')
    elm.id = 'reservation_date'
    elm.innerHTML = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test = "date"]').setValue("")
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("日付を選択して下さい")
  });
  it("Reservation_date input check(server)", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  reservation_date: '予約日は必須項目です',
                  reservation_time: '予約時間は必須項目です',
                  num_members: '予約人数は必須項目です'
                }
              }
            }
          }))
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id:999
          }
        },
        $router: {
          push:jest.fn()
        },
        $config: {
          baseURL: 'http://localhost:8000'
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
    })
    window.alert = jest.fn()
    const elm = document.createElement('div')
    elm.id = 'reservation_date'
    elm.innerHTML = '2022-00-10 00:00:00'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith('予約日は必須項目です')
  });
  it("Reservation_time input check(server)", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  reservation_date: undefined,
                  reservation_time: '予約時間は必須項目です',
                  num_members: '予約人数は必須項目です'
                }
              }
            }
          }))
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id:999
          }
        },
        $router: {
          push:jest.fn()
        },
        $config: {
          baseURL: 'http://localhost:8000'
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
    })
    window.alert = jest.fn()
    const elm = document.createElement('div')
    elm.id = 'reservation_date'
    elm.innerHTML = '2022-00-10 00:00:00'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith('予約時間は必須項目です')
  });
  it("Num_members input check(server)", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  reservation_date: undefined,
                  reservation_time: undefined,
                  num_members: '予約人数は必須項目です'
                }
              }
            }
          }))
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id:999
          }
        },
        $router: {
          push:jest.fn()
        },
        $config: {
          baseURL: 'http://localhost:8000'
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
    })
    window.alert = jest.fn()
    const elm = document.createElement('div')
    elm.id = 'reservation_date'
    elm.innerHTML = '2022-00-10 00:00:00'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith('予約人数は必須項目です')
  });
  it("Reservation success", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              statusText: "OK"
            }
          }))
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id:999
          }
        },
        $router: {
          push:jest.fn()
        },
        $config: {
          baseURL: 'http://localhost:8000'
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
    })
    window.alert = jest.fn()
    const elm = document.createElement('div')
    elm.id = 'reservation_date'
    elm.innerHTML = '2022-00-10 00:00:00'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/done")
  });

});