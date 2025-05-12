
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Hopink-Studio/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Hopink-Studio"
  },
  {
    "renderMode": 2,
    "route": "/Hopink-Studio/artists"
  },
  {
    "renderMode": 2,
    "route": "/Hopink-Studio/contact"
  },
  {
    "renderMode": 2,
    "route": "/Hopink-Studio/budget"
  },
  {
    "renderMode": 2,
    "route": "/Hopink-Studio/account"
  },
  {
    "renderMode": 2,
    "route": "/Hopink-Studio/cart"
  },
  {
    "renderMode": 2,
    "route": "/Hopink-Studio/shopPage"
  },
  {
    "renderMode": 2,
    "route": "/Hopink-Studio/cookies"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1025, hash: 'c06135ffcaa256734fa13f8aa4c48a8066839aaa97b6bf2a356717213d9b75bd', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1023, hash: '5dc5b9507f8b5f96955c92bf9e66420225fe64d18f9d60067e2f23a32ba38428', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'artists/index.html': {size: 18351, hash: 'd7a341406f79fb8355df088d2a1f40ad7387ecb20ea95a1a82ed62b8d11220cd', text: () => import('./assets-chunks/artists_index_html.mjs').then(m => m.default)},
    'index.html': {size: 19356, hash: '968875d3d746b77476c25803db7a2395fabf4ac2edbefb55816554f8fd27e66a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 27860, hash: '01ab46a953b98861ee65104716c068c1405bfa79cd66ac9c99a018299ce05baa', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 17228, hash: 'a5d6fdd7ded7517e12acecc04fd169c625b45ea9b94f20cbdd3b3860d86e88e0', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'account/index.html': {size: 17591, hash: '127ee6288eb9d706e1ef7effea7e07400a968b748592a154a2b8af825571fc1f', text: () => import('./assets-chunks/account_index_html.mjs').then(m => m.default)},
    'shopPage/index.html': {size: 85060, hash: 'd34aaf285230a9529fe346b56e08f5959078c02d3bc662f9b593c8ba8526269e', text: () => import('./assets-chunks/shopPage_index_html.mjs').then(m => m.default)},
    'cookies/index.html': {size: 14942, hash: '762a36707258859c81235b7ec8d5e13243cc3d50093611e055d0dbda7afff898', text: () => import('./assets-chunks/cookies_index_html.mjs').then(m => m.default)},
    'budget/index.html': {size: 19447, hash: '37596161a9cde6fc30dcbc0310c08714a47237bacd0a3002f58d3a1055a338f3', text: () => import('./assets-chunks/budget_index_html.mjs').then(m => m.default)},
    'styles-LXOH7UJZ.css': {size: 406, hash: 'tLrwfb267ic', text: () => import('./assets-chunks/styles-LXOH7UJZ_css.mjs').then(m => m.default)}
  },
};
