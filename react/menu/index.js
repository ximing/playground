import React, { Component } from 'react';
import singleSpaReact from 'single-spa-react';
import ReactDOM from 'react-dom';

export default class Demo extends Component {
    render() {
        return (
            <div>
                <p>this is react demo</p>
            </div>
        );
    }
}

function domElementGetter() {
    let el = document.getElementById('p-r-menu');
    if (!el) {
        el = document.createElement('div');
        el.id = 'p-r-menu';
        document.getElementById('micro-boot').appendChild(el);
    }

    return el;
}

const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: Demo,
    domElementGetter
});

export const bootstrap = [reactLifecycles.bootstrap];

export const mount = [reactLifecycles.mount];

export const unmount = [reactLifecycles.unmount];

export const unload = [reactLifecycles.unload];
