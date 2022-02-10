import { mount } from "@vue/test-utils";
import App from "@/pages/mypage.vue";

describe("mypage.vue test", () => {
  it("Reservation trigger 'destroy'(when favorites = 0)", async () => {
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
                reservations: [{
                  user_id:999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
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
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 1
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    await wrapper.get('[data-test="delete"]').trigger("click")
  })
  it("Reservation trigger 'destroy'(when favorites = 1)", async () => {
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
                reservations: [{
                  user_id:999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
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
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    await wrapper.get('[data-test="delete"]').trigger("click")
  })
  it("Moving to detail", async () => {
    const wrapper = mount(App, {
      mocks: {
        $router: {
          push:jest.fn()
        },
      },

    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 1
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    await wrapper.get('[data-test="detail"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/detail/999")
  })
  it("Adding favorite(login)", async () => {
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
                reservations: [{
                  user_id:999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 1
                }]
              }],
            },
          })),
          post: jest.fn(() => Promise.resolve({
            data: {
              statusText: "OK"
            }
          })),
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
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 1
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    await wrapper.get('[data-test="addfavorite"]').trigger("click")
  })
  it("Adding favorite(logout)", async () => {
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
                reservations: [{
                  user_id:999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 1
                }]
              }],
            },
          })),
          post: jest.fn(() => Promise.resolve({
            data: {
              statusText: "OK"
            }
          })),
        },
        $auth: {
          loggedIn: false,
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
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 1
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    await wrapper.get('[data-test="addfavorite"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/login")
  })
  it("deleting favorite", async () => {
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
                reservations: [{
                  user_id:999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
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
        $auth: {
          loggedIn: false,
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 1
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        favorites: 1
      }],
    })
    await wrapper.get('[data-test="deletefavorite"]').trigger("click")
  })

})