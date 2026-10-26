# Eidos 插件模板

通用的 Eidos Lite 插件起点：一个页面、一个打开命令、宿主主题样式、测试，以及检查、
打包和发布工作流。[English](README.md)

点击 [Use this template](https://github.com/eidos-space/eidos-plugin-template/generate)
创建自己的仓库，再按[第一个插件教程](https://docs.eidos.space/zh-cn/plugins/guide/)
在 Eidos Lite 中加载和修改。

## 开始

需要 **Node.js 22.12 及以上**、npm，以及支持插件 API **3.0.0 或更高版本**的
Eidos Lite。模板固定使用已发布的 SDK 和工具 **0.8.0**。

1. 在 GitHub 点击 **Use this template → Create a new repository**。
2. 克隆新仓库并安装依赖：

   ```sh
   git clone https://github.com/YOUR-NAME/my-eidos-plugin.git
   cd my-eidos-plugin
   npm ci
   ```

3. 修改 `plugin.json` 的 `id`、`name`、`description`、`views[0].title` 和
   `actions[0].title`。ID 使用自己的稳定命名空间，例如 `yourname.my-plugin`，
   每段均为小写。分发后保留 ID，避免变成另一个插件。
4. 将 `package.json` 的 `name` 改为自己的项目名，运行
   `npm install --package-lock-only` 更新锁文件。其版本与 `plugin.json` 保持一致。
5. 运行检查：

   ```sh
   npm run typecheck
   npm test
   npm run check
   ```

## 在 Eidos Lite 中加载

打开测试 Space，进入插件管理器，选择 **Load development source…**，打开项目的
`plugin.json`。查看声明并为当前 Space 启用插件。随后从导航打开 **My Eidos Plugin**，
或在 Cmd/Ctrl+K 中执行 **My Eidos Plugin: Open**；已改名时使用自己的标题。

点击 **Add one**，计数会增加。修改 `src/main.ts` 并保存，Lite 会重新编译和加载。
计数只用于演示内存状态，关闭或重载页面后会重置。编译失败时会保留上一次可用界面，
请查看编译错误，不要将旧界面当作新代码已经生效的依据。

模板未申请文件、网络、存储或后台权限。按实际功能添加声明。它面向 Lite；CLI Serve
不支持此模板的独立页面和命令。

## 文件结构

```text
plugin.json                   插件身份、页面、命令和挂载位置
src/main.ts                   mount(ctx, root)：页面界面与清理
src/extension.ts              activate(ctx)：注册打开命令
src/style.css                 宿主主题变量与焦点样式
test/plugin.test.ts           页面和命令的生命周期测试
.github/workflows/plugin.yml  检查、构建产物和 tag 发布
```

SDK 只以 `import type` 导入。宿主操作使用 `ctx.capabilities`，ID 和路径不代表
访问授权。将监听器和命令注册放入 `ctx.subscriptions`，关闭时自动清理。
不需要额外配置打包器或开发服务器，plugin-tools 会打包源码和 CSS。

## 打包与发布

```sh
npm run pack:plugin
```

产物为 `dist/<plugin-id>-<version>.eidos-plugin` 和相邻的 `.sha256` 文件。
通过插件管理器安装此包后才能持久使用；开发加载不会在重启后保留源码修订。

向 `main` 推送、创建 PR 或手动运行工作流都会执行检查和打包。可在 Actions 中下载
`plugin-package` 检查产物。发布 GitHub Release 时，更新两个版本字段和
`RELEASE_NOTES.md`，提交后推送匹配的 `v<version>` tag。发布任务仅在检查通过后
上传同一份构建产物。创建 Release 不会自动加入[插件市场目录](https://github.com/eidos-space/registry)。

## 扩展功能

- [视图与数据访问](https://docs.eidos.space/zh-cn/plugins/views/)
- [后台任务](https://docs.eidos.space/zh-cn/plugins/background/)
- [多语言](https://docs.eidos.space/zh-cn/plugins/i18n/)：使用较新 API 前先匹配 SDK、
  工具与宿主版本。
- [开发与分发](https://docs.eidos.space/zh-cn/plugins/workflow/)

采用 MIT 许可证。正式分发前，将示例界面、README 和发布说明改为自己的功能与用法。
