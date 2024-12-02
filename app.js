const Hapi = require('@hapi/hapi');
const apiRoutes = require('../recomendasi/src/routes/server');
const Inert = require('@hapi/inert');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: '0.0.0.0',
    });

    await server.register([Inert]);

    // Register routes
    server.route(apiRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
