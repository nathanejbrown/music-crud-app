(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const songRoutes = require('../routes/songs');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/songs', songRoutes);

  };

})(module.exports);
