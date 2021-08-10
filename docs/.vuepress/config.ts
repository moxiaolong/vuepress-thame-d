import {defineUserConfig} from '@vuepress/cli'
import type {DefaultThemeOptions, ManiFest} from '@vuepress/vuepress-theme-d'
import {path} from '@vuepress/utils'
import {navbar, sidebar} from './configs'
import * as manifest from "./public/manifest.json"

const isProd = process.env.NODE_ENV === 'production'
const maniFestData = manifest as unknown as ManiFest
const name = maniFestData.name
const themeColor = maniFestData.theme_color
const des = maniFestData.description

export default defineUserConfig<DefaultThemeOptions>({


    //本地主题
    theme: "../../../vuepress-theme-d/lib/node",
    base: '/',


    //head标签
    head: [
        [
            //标签名
            'link',
            //属性键值对
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: `/images/icons/favicon-16x16.png`,
            },
        ],
        [
            'link',
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: `/images/icons/favicon-32x32.png`,
            },
        ],
        //Web App Manifest
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'application-name', content: name}],
        ['meta', {name: 'apple-mobile-web-app-title', content: name}],
        //作为APP时控制苹果状态栏颜色
        // [
        //     'meta',
        //     {name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
        // ],
        [
            'link',
            {rel: 'apple-touch-icon', href: `/images/icons/apple-touch-icon.png`},
        ],
        //主题色，在可能改变安卓浏览器标题栏和系统状态栏颜色
        ['meta', {name: 'theme-color', content: themeColor}],
    ],

    // site-level locales config
    locales: {
        '/': {
            lang: 'zh-CN',
            title: name,
            description: des,
        }
    },

    bundler:
    // specify bundler via environment variable
        process.env.DOCS_BUNDLER ??
        // use vite in dev, use webpack in prod
        // (isProd ? '@vuepress/webpack' : '@vuepress/vite'),
        //vite 将编译成使用es module的方式 不支持老的浏览器
        (isProd ? '@vuepress/vite' : '@vuepress/vite'),

    themeConfig: {
        logo: '/images/hero.png',

        repo: 'moxiaolong',

        docsDir: 'docs',

        // theme-level locales config
        locales: {

            /**
             *  locale config
             */
            '/': {
                // navbar
                navbar: navbar.zh,

                // sidebar
                sidebar: "auto",

                editLinkText: '在 GitHub 上编辑此页',
                lastUpdatedText: '上次更新',
                // contributorsText: '贡献者',

                // custom containers
                tip: '提示',
                warning: '注意',
                danger: '警告',

                // 404 page
                notFound: [
                    '存在者存在，无却不存在'
                ],
                backToHome: '返回首页',

                // a11y
                openInNewWindow: '在新窗口打开',
                toggleDarkMode: '切换夜间模式',
            },
        },

        themePlugins: {
            backToTop: true
            // only enable git plugin in production mode
            // git: isProd
        },
    },

    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(
                    /^@vuepress/,
                    path.resolve(__dirname, '../../packages/@vuepress')
                ),
        },
    },
    plugins: [
        //搜索插件
        [
            '@vuepress/plugin-docsearch',
            {
                apiKey: '3a539aab83105f01761a137c61004d85',
                indexName: 'vuepress',
                searchParameters: {
                    facetFilters: ['tags:v2'],
                },
                locales: {
                    '/zh/': {
                        placeholder: '搜索文档',
                    },
                },
            },
        ],
        //谷歌分析插件
        // [
        //     '@vuepress/plugin-google-analytics',
        //     {
        //         // we have multiple deployments, which would use different id
        //         id: process.env.DOCS_GA_ID,
        //     },
        // ],

        //pwa插件
        ['@vuepress/plugin-pwa'],
        //提示pwa更新
        [
            '@vuepress/plugin-pwa-popup',
            {
                locales: {
                    '/': {
                        message: '发现新内容可用',
                        buttonText: '刷新',
                    },
                },
            },
        ],
        //注册自定义组件 引入的组件可以直接在MD里通过组件名标签使用
        [
            '@vuepress/plugin-register-components',
            {
                componentsDir: path.resolve(__dirname, './components'),
            },
        ],
        // only enable shiki plugin in production mode
        //代码块高亮
        [
            '@vuepress/plugin-shiki',
            isProd
                ? {
                    theme: 'dark-plus',
                }
                : false,
        ],
    ]
})
