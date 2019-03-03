import * as singleSpa from 'single-spa';
import SystemJS from 'systemjs';
import pathToRegexp from 'path-to-regexp';

import meta from './meta';

const env = process.env.NODE_ENV || 'development';

function registerDep(name, requirer) {
    SystemJS.registerDynamic(name, [], false, function(_r, _e, _m) {
        _m.exports = requirer();
    });
}

function registerDeps() {
    // register sofe
    registerDep('sofe', () => require('sofe'));

    registerDep('lodash', () => require('lodash'));
    registerDep('jquery', () => require('jquery'));
    registerDep('axios', () => require('axios'));

    // See https://rxjs-dev.firebaseapp.com/guide/v6/migration for Import Paths explanation
    registerDep('rxjs', () => require('rxjs'));
    registerDep('rxjs/operators', () => require('rxjs/operators'));

    registerDep('single-spa', () => require('single-spa'));
    registerDep('react', () => require('react'));
    registerDep('react-dom', () => require('react-dom'));
    registerDep('react-dom/server', () => require('react-dom/server'));
}

meta(env).then((config) => {
    console.log('boot config', config);
    let manifest = {};
    Object.keys(config.apps).forEach((app) => {
        manifest[app] = config.apps[app].manifest;
    });
    SystemJS.config({
        sofe: {
            manifest
        }
    });
    registerDeps();
    Object.keys(config.apps).forEach((appName) => {
        const app = config.apps[appName];
        if (app.activeRoute) {
            const pathRegexp = pathToRegexp(app.activeRoute);
            app.__pathRegexp = pathRegexp;
            singleSpa.registerApplication(
                appName,
                SystemJS.import(`${appName}!sofe`),
                (location) => {
                    console.log(
                        'isActive',
                        appName,
                        app.__pathRegexp.test(location.pathname),
                        location.pathname,
                        app.__pathRegexp
                    );
                    return app.__pathRegexp.test(location.pathname);
                }
            );
        }
    });

    singleSpa.start();
});
