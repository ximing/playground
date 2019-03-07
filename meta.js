import axios from 'axios';

export default function(env) {
    if (env === 'development') {
        return Promise.resolve({
            boot: {
                'mall-fe-header': {}
            },
            apps: {
                'react-meun': {
                    manifest: 'http://localhost:7905/menu.js',
                    activeRoute: '*'
                },
                'react-demo': {
                    manifest: 'http://localhost:7905/demo.js',
                    activeRoute: '/react/demo*'
                },
                'vdom': {
                    manifest: 'http://localhost:7801/vdom.js',
                    activeRoute: '/vdom*'
                }
            }
        });
    }
    return axios.get('/react/manifest.json').then(function(response) {
        console.log(response.data);
        return {
            boot: {
                'mall-fe-header': {}
            },
            apps: {
                'react-menu': {
                    manifest: response.data['menu.js'],
                    activeRoute: '*'
                },
                'react-demo': {
                    manifest: response.data['demo.js'],
                    activeRoute: '/react/demo*'
                }
            }
        };
    });
}
