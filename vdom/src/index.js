/**
 * Created by ximing on 2019-03-07.
 */
let domEl;

function init(){
    var snabbdom = require('snabbdom');
    var patch = snabbdom.init([ // Init patch function with chosen modules
        require('snabbdom/modules/class').default, // makes it easy to toggle classes
        require('snabbdom/modules/props').default, // for setting properties on DOM elements
        require('snabbdom/modules/style').default, // handles styling on elements with support for animations
        require('snabbdom/modules/eventlisteners').default, // attaches event listeners
    ]);
    var h = require('snabbdom/h').default; // helper function for creating vnodes

    var container = domEl;

    var vnode = h('div#container.two.classes', {on: {click: ()=>{}}}, [
        h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
        ' and this is just normal text',
        h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
    ]);
// Patch into empty DOM element – this modifies the DOM as a side effect
    patch(container, vnode);

    var newVnode = h('div#container.two.classes', {on: {click: ()=>{}}}, [
        h('span', {style: {fontWeight: 'normal', fontStyle: 'italic'}}, 'This is now italic type'),
        ' and this is still just normal text',
        h('a', {props: {href: '/bar'}}, 'I\'ll take you places!')
    ]);
// Second `patch` invocation
    setTimeout(()=>{
        patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
    },2000)
}

export function bootstrap(props) {
    return Promise
        .resolve()
        .then(() => {
            domEl = document.createElement('div');
            domEl.id = 'vdom-container';
            domEl.classList.add('application-wrappers');
            document.body.appendChild(domEl);
        });
}

export function mount(props) {
    return Promise
        .resolve()
        .then(() => {
        console.log('ssss')
            init()
        })
}

export function unmount(props) {
    return Promise
        .resolve()
        .then(() => {
            domEl.classList.remove('application-mounting')
            domEl.innerHTML = '';
        })
}
