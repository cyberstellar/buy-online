import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const dummyApi = createApi({
  reducerPath: 'dummyApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com'
  }),
  endpoints: builder => ({
    getAllProducts: builder.query({
      query: ({
                selectedCategory = '',
                limit = 100
              } = {}) => `products${selectedCategory && `/category/${selectedCategory}`}?limit=${limit}`,
      transformResponse: (response, _, {
        isDesc = 'false',
        sortField = '',
        selectedBrands = [],
      } = {}) => {

        const sortFn = isDesc === 'true'
          ? (a, b) => b[sortField] - a[sortField]
          : (a, b) => a[sortField] - b[sortField]

        const result = response['products'].map(i => {
          const price = i['price']
          const discount = i['discountPercentage']
          const basePrice = Math.round(price / (100 - discount) * 100)

          return { ...i, basePrice }
        })

        if (selectedBrands.length === 0) {
          return result.sort(sortFn)
        }
        return result.filter(i => selectedBrands.includes(i['brand'])).sort(sortFn)
      },
      // TODO: Посмотреть в документации. Нужно для автоматического обновления при добавлении
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#providing-cache-data
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products']
          : ['Products'],
    }),
    getBrands: builder.query({
      query: (category = '') => `products${category && `/category/${category}`}?limit=100&select=brand`,
      transformResponse: response => Array.from(new Set(response['products'].map(el => el['brand'])))
    }),
    getCategories: builder.query({
      query: () => `products/categories`
    }),
    getProduct: builder.query({
      query: (id = '') => `products/${id}`,
      transformResponse: response => ({
        ...response,
        basePrice: Math.round(response.price / (100 - response.discountPercentage) * 100)
      })
    })
  })
})

export const {
  useGetProductQuery,
  useGetAllProductsQuery,
  useGetCategoriesQuery,
  useGetBrandsQuery
} = dummyApi
