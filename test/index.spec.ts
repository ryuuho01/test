import { mount } from "@vue/test-utils";
import App from "@/pages/index.vue";

describe("index.vue test", () => {
  it("Filter check 'All area' 'All genre' ''", async () => {
    const wrapper = mount(App)
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 1
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    expect(wrapper.get('[data-test="shop_name"]').text()).toBe("test")
  })
  it("Filter check '東京test' 'All genre' ''", async () => {
    const wrapper = mount(App)
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 1
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    await wrapper.get('[data-test = "area"]').findAll('option').at(1).setSelected()
    expect(wrapper.get('[data-test="shop_name"]').text()).toBe("test")
  })
  it("Filter check 'All area' 'ラーメンtest' ''", async () => {
    const wrapper = mount(App)
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 1
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    await wrapper.get('[data-test = "genre"]').findAll('option').at(1).setSelected()
    expect(wrapper.get('[data-test="shop_name"]').text()).toBe("test")
  })
  it("Filter check 'All area' 'All genre' 'test'", async () => {
    const wrapper = mount(App)
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 1
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    await wrapper.get('[data-test = "keyword"]').setValue("test")
    expect(wrapper.get('[data-test="shop_name"]').text()).toBe("test")
  })
  it("Filter check '東京test' 'ラーメンtest' ''", async () => {
    const wrapper = mount(App)
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 1
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    await wrapper.get('[data-test = "area"]').findAll('option').at(1).setSelected()
    await wrapper.get('[data-test = "genre"]').findAll('option').at(1).setSelected()
    expect(wrapper.get('[data-test="shop_name"]').text()).toBe("test")
  })
  it("Filter check '東京test' 'All genre' 'test'", async () => {
    const wrapper = mount(App)
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 1
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    await wrapper.get('[data-test = "area"]').findAll('option').at(1).setSelected()
    await wrapper.get('[data-test = "keyword"]').setValue("test")
    expect(wrapper.get('[data-test="shop_name"]').text()).toBe("test")
  })
  it("Filter check 'All area' 'ラーメンtest' 'test'", async () => {
    const wrapper = mount(App)
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 1
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    await wrapper.get('[data-test = "genre"]').findAll('option').at(1).setSelected()
    await wrapper.get('[data-test = "keyword"]').setValue("test")
    expect(wrapper.get('[data-test="shop_name"]').text()).toBe("test")
  })
  it("Filter check '東京test' 'ラーメンtest' 'test'", async () => {
    const wrapper = mount(App)
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 1
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    await wrapper.get('[data-test = "area"]').findAll('option').at(1).setSelected()
    await wrapper.get('[data-test = "genre"]').findAll('option').at(1).setSelected()
    await wrapper.get('[data-test = "keyword"]').setValue("test")
    expect(wrapper.get('[data-test="shop_name"]').text()).toBe("test")
  })
  it("Moving to detail page", async () => {
    const wrapper = mount(App, {
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                favorites: [{
                  user_id: 999,
                  favorite: 1
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          }))
        },
        $router: {
          push:jest.fn()
          },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 1
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    await wrapper.get('[data-test="detail"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/detail/999")
  })
  it("Adding favorite (logout)", async () => {
    const wrapper = mount(App, {
      mocks: {
        // $axios: {
        //   get: jest.fn(() => Promise.resolve({
        //     data: {
        //       data: [{
        //         id: 999,
        //         user_id: 999,
        //         shop_id: 999,
        //         area_name: "東京",
        //         genre_name: "ラーメン",
        //         shop_name: "test",
        //         favorites: [{
        //           user_id: 999,
        //           favorite: 1
        //         }]
        //       }],
        //     },
        //   })),
        //   delete: jest.fn(() => Promise.resolve({
        //     data: {
        //       statusText: "Deleted successfully"
        //     }
        //   }))
        // },
        $auth: {
          loggedIn: false,
        },
        $router: {
          push:jest.fn()
          },
        // $config: {
        //   baseURL: 'http://localhost:8000'
        // },
      },
    })
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 0
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    await wrapper.get('[data-test="addfavorite"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/login")
  })
  it("Adding favorite (login)", async () => {
    const wrapper = mount(App, {
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              status: 201
            }
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                favorites: [{
                  user_id: 999,
                  favorite: 1
                }]
              }],
            },
          })),
          // delete: jest.fn(() => Promise.resolve({
          //   data: {
          //     statusText: "Deleted successfully"
          //   }
          // }))
        },
        $auth: {
          loggedIn: true,
        },
        // $router: {
        //   push:jest.fn()
        //   },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 0
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    await wrapper.get('[data-test="addfavorite"]').trigger("click")
  })
  it("Deleting favorite", async () => {
    const wrapper = mount(App, {
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              status: 201
            }
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          }))
        },
        $auth: {
          loggedIn: true,
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      shopCurrent: [{
        id: 999,
        area_name: "東京test",
        genre_name: "ラーメンtest",
        shop_name: "test",
        favorites: 1
      }],
      areaCurrent: [{
        id: 999,
        area_name: "東京test",
      }],
      genreCurrent: [{
        id: 999,
        genre_name: "ラーメンtest",
      }],
      vModelarea: "All area",
      vModelgenre: "All genre",
      vModelkeyword: ""
    })
    await wrapper.get('[data-test="delete"]').trigger("click")
  })
});