// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBdcy_TVO6V7aU64rpTtsgJ3pNUfA3AxOA',
    authDomain: 'drawing-dc4d1.firebaseapp.com',
    databaseURL: 'https://drawing-dc4d1.firebaseio.com',
    projectId: 'drawing-dc4d1',
    storageBucket: 'drawing-dc4d1.appspot.com',
    messagingSenderId: '414693908582'
  }
};
