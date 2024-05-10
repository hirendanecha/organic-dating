// const url = 'https://api.organic.dating';
// const webUrl = 'https://organic.dating/';
const tubeUrl = 'https://tube.organic.dating/';

const url = 'http://localhost:8080';
const webUrl = 'http://localhost:4200/';

export const environment = {
  production: false,
  hmr: false,
  serverUrl: `${url}/api/v1/`,
  socketUrl: `${url}/`,
  webUrl: webUrl,
  tubeUrl: tubeUrl,
  domain: '.organic.dating',
  siteKey: '0x4AAAAAAATU1CBk_lvwGxIy',
  secretKey: '0x4AAAAAAATU1GanFiWSflL_7a_cnZt_SKM',
  qrLink: `${webUrl}settings/edit-profile/`,
  EncryptIV: 8625401029409790,
  EncryptKey: 8625401029409790,
};
