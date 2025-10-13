export default {
  routes: [
    {
      method: 'POST',
      path: '/seed/run',
      handler: 'seed.run',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
