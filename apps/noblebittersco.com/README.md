# noblebittersco.com

Note Rush commands do not work on this folder. so it is not registered in
rush.json. Vue projects don't work well with pnpm; I get an immediate error,
cannot resolve module `vue`. I can't switch the entirety of this Rush monorepo
to NPM, because Rush only supports exactly npm@4.5.0. Current stable version of
npm is 6.14.11. Install fails on the older version.

* https://gitter.im/rushstack/rushstack?at=5db769b3b86c9f37f9e27cc4
* https://cli.vuejs.org/guide/troubleshooting.html#symbolic-links-in-node-modules

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
