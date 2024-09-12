module.exports = {
    // Otra configuración
    devServer: {
      setupMiddlewares: (middlewares, devServer) => {
        // Aquí puedes agregar tus middlewares personalizados
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
  
        // Middlewares que usaban onBeforeSetupMiddleware o onAfterSetupMiddleware
        middlewares.push(/* tu middleware aquí */);
  
        return middlewares;
      },
    },
  };
  