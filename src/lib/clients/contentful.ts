import contentful from 'contentful'

const preview = true
export const content = contentful.createClient({
  space: '2g43ft9kwm8s',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'bzeyoF0MTUOOHjBfa_SWxbWXJtQGcSHtLuxY8U9WHAI' : '7-3Uo3dqE-tm2XJOO3t_JJl9-06ZkJi3vRqqQHGNBeI',
}).withoutUnresolvableLinks