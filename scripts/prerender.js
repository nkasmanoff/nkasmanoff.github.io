#!/usr/bin/env node
/**
 * Prerender every route in src/routes.js into build/ as static HTML.
 *
 * Runs as npm's `postbuild` hook, after `react-scripts build` has produced
 * build/index.html (an empty <div id="root"></div> shell). For each route we
 * render <App/> with react-dom/server inside a StaticRouter and write the
 * result into a copy of that shell, so non-JS fetchers get real content and
 * the client bundle hydrates onto it (see src/index.js).
 *
 * Nothing here is a new dependency: react-dom/server and react-router ship
 * StaticRouter; @babel/core, @babel/preset-env, @babel/preset-react and
 * @svgr/core all come with react-scripts and are what CRA itself uses.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const Module = require('module');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const BUILD = path.join(ROOT, 'build');

process.env.NODE_ENV = 'production';

// ---------------------------------------------------------------------------
// Make `require()` understand the app's source: JSX/ESM via Babel, CSS as a
// no-op, and SVG through the same svgr transform CRA's webpack config uses so
// the server markup matches what the client renders.
// ---------------------------------------------------------------------------
const babel = require('@babel/core');

const BABEL_OPTIONS = {
    babelrc: false,
    configFile: false,
    presets: [
        [require.resolve('@babel/preset-env'), { targets: { node: 'current' }, modules: 'commonjs' }],
        [require.resolve('@babel/preset-react'), { runtime: 'automatic', development: false }],
    ],
};

function compileJs(module, filename, code) {
    const out = babel.transformSync(code, { ...BABEL_OPTIONS, filename });
    module._compile(out.code, filename);
}

const originalJsLoader = Module._extensions['.js'];
Module._extensions['.js'] = function (module, filename) {
    if (!filename.startsWith(SRC + path.sep)) return originalJsLoader(module, filename);
    compileJs(module, filename, fs.readFileSync(filename, 'utf8'));
};
// Registering '.jsx' also lets extensionless imports like './ui/button' resolve
// to button.jsx, the same way webpack's resolve.extensions does.
Module._extensions['.jsx'] = function (module, filename) {
    compileJs(module, filename, fs.readFileSync(filename, 'utf8'));
};

Module._extensions['.css'] = function (module) {
    module.exports = {};
};

// Mirrors the @svgr/webpack options in react-scripts/config/webpack.config.js.
const SVGR_OPTIONS = {
    plugins: [require.resolve('@svgr/plugin-jsx')],
    prettier: false,
    svgo: false,
    titleProp: true,
    ref: true,
};
Module._extensions['.svg'] = function (module, filename) {
    const svgr = require('@svgr/core').default;
    const source = svgr.sync(fs.readFileSync(filename, 'utf8'), SVGR_OPTIONS, {
        componentName: 'SvgComponent',
        filePath: filename,
    });
    const componentModule = new Module(filename, module);
    componentModule.filename = filename;
    componentModule.paths = module.paths;
    compileJs(componentModule, filename, source);
    module.exports = {
        __esModule: true,
        default: '/static/media/' + path.basename(filename),
        ReactComponent: componentModule.exports.default,
    };
};

for (const ext of ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.webm']) {
    Module._extensions[ext] = function (module, filename) {
        module.exports = '/static/media/' + path.basename(filename);
    };
}

// ---------------------------------------------------------------------------
// Render.
// ---------------------------------------------------------------------------
const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router');
const App = require(path.join(SRC, 'App.js')).default;
const { routes } = require(path.join(SRC, 'routes.js'));

const ROOT_PLACEHOLDER = '<div id="root"></div>';

function renderRoute(routePath) {
    return renderToString(
        React.createElement(StaticRouter, { location: routePath }, React.createElement(App))
    );
}

function outputFilesFor(routePath) {
    if (routePath === '/') return [path.join(BUILD, 'index.html')];
    const rel = routePath.replace(/^\/+/, '');
    // GitHub Pages serves `blog/foo.html` at /blog/foo and `blog/foo/index.html`
    // at /blog/foo/, so emit both and neither form needs a redirect.
    return [path.join(BUILD, rel + '.html'), path.join(BUILD, rel, 'index.html')];
}

function main() {
    // The empty shell from react-scripts. After a run, index.html holds the
    // prerendered home page, so also accept the pristine copy kept in 404.html;
    // that makes `node scripts/prerender.js` safe to re-run on its own.
    const template = ['index.html', '404.html']
        .map((name) => path.join(BUILD, name))
        .filter((file) => fs.existsSync(file))
        .map((file) => fs.readFileSync(file, 'utf8'))
        .find((html) => html.includes(ROOT_PLACEHOLDER));
    if (!template) {
        throw new Error(
            `No build/index.html (or build/404.html) containing ${ROOT_PLACEHOLDER}; run \`react-scripts build\` first.`
        );
    }

    // The untouched shell doubles as the SPA fallback for any path we didn't
    // prerender (GitHub Pages serves 404.html for unknown paths).
    fs.writeFileSync(path.join(BUILD, '404.html'), template);

    for (const { path: routePath } of routes) {
        const markup = renderRoute(routePath);
        const html = template.replace(ROOT_PLACEHOLDER, `<div id="root">${markup}</div>`);
        for (const file of outputFilesFor(routePath)) {
            fs.mkdirSync(path.dirname(file), { recursive: true });
            fs.writeFileSync(file, html);
        }
        console.log(`prerendered ${routePath.padEnd(44)} ${(markup.length / 1024).toFixed(1)} kB`);
    }
    console.log(`prerendered ${routes.length} routes into ${path.relative(ROOT, BUILD)}/`);
}

main();
