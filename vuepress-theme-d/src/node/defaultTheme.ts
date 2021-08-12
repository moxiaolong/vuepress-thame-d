import type {Theme, ThemeConfig} from '@vuepress/core'
import {path} from '@vuepress/utils'
import type {
    DefaultThemeLocaleOptions,
    DefaultThemePluginsOptions,
} from '../shared'
import {
    assignDefaultLocaleOptions,
    resolveActiveHeaderLinksPluginOptions,
    resolveContainerPluginOptions,
    resolveContainerPluginOptionsForDetails,
    resolveContainerPluginOptionsForCodeGroup,
    resolveContainerPluginOptionsForCodeGroupItem,
    resolveGitPluginOptions,
    resolveMediumZoomPluginOptions,
} from './utils'
import {Post} from "../shared/post";

export interface DefaultThemeOptions
    extends ThemeConfig,
        DefaultThemeLocaleOptions {
    /**
     * To avoid confusion with the root `plugins` option,
     * we use `themePlugins`
     */
    themePlugins?: DefaultThemePluginsOptions
}

export const defaultTheme: Theme<DefaultThemeOptions> = ({
                                                             themePlugins = {},
                                                             ...localeOptions
                                                         }) => {
    assignDefaultLocaleOptions(localeOptions)

    //存放文章列表
    let posts: Post[] = []

    //生成文章标签

    return {
        //页面信息回调 获取文章列表
        extendsPageData: (page, app) => {
            if (page.filePathRelative != null && page.filePathRelative.endsWith(".md") && page.date !== "0000-00-00") {
                posts.push({
                    index: 0,
                    date: new Date(page.date),
                    title: page.title,
                    excerpt: page.excerpt,
                    path: page.path
                })
            }
        },


        //定义常量 可以在客户端使用
        define: {
            __POSTS__: posts
        },

        name: '@vuepress/theme-default',

        layouts: path.resolve(__dirname, '../client/layouts'),

        clientAppEnhanceFiles: path.resolve(
            __dirname,
            '../client/clientAppEnhance.js'
        ),

        clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),

        onPrepared: () => {
            //按照日期排序
            posts = posts.sort(((a, b) => b.date.getTime() - a.date.getTime()))


            //保存index到post 为了连接上下篇
            for (let i = 0; i < posts.length; i++) {
                posts[i].index = i
            }

        },
        // // use the relative file path to generate edit link
        // extendsPageData: ({filePathRelative}) => ({filePathRelative}),

        plugins: [
            [
                '@vuepress/active-header-links',
                resolveActiveHeaderLinksPluginOptions(themePlugins),
            ],
            ['@vuepress/back-to-top', themePlugins.backToTop !== false],
            [
                '@vuepress/container',
                resolveContainerPluginOptions(themePlugins, localeOptions, 'tip'),
            ],
            [
                '@vuepress/container',
                resolveContainerPluginOptions(themePlugins, localeOptions, 'warning'),
            ],
            [
                '@vuepress/container',
                resolveContainerPluginOptions(themePlugins, localeOptions, 'danger'),
            ],
            [
                '@vuepress/container',
                resolveContainerPluginOptionsForDetails(themePlugins),
            ],
            [
                '@vuepress/container',
                resolveContainerPluginOptionsForCodeGroup(themePlugins),
            ],
            [
                '@vuepress/container',
                resolveContainerPluginOptionsForCodeGroupItem(themePlugins),
            ],
            // ['@vuepress/git', resolveGitPluginOptions(themePlugins, localeOptions)],
            ['@vuepress/medium-zoom', resolveMediumZoomPluginOptions(themePlugins)],
            ['@vuepress/nprogress', themePlugins.nprogress !== false],
            ['@vuepress/palette', {preset: 'sass'}],
            ['@vuepress/prismjs', themePlugins.prismjs !== false],
            ['@vuepress/theme-data', {themeData: localeOptions}],
        ],
    }
}
