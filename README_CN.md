# OGS 链接预览 Bookmarklet

无需修改 [Online Go (OGS)](https://online-go.com/) 源代码，即可为 OGS 聊天中的链接添加丰富的链接预览卡片。

该 Bookmarklet 会自动检测 OGS 聊天消息中的 URL，并在原始 URL 后面直接插入预览卡片。

## 功能特性

* 自动检测 OGS 聊天消息中的 URL
* 显示网页标题
* 显示网页描述
* 在有可用图片时显示缩略图
* 显示网站域名
* 点击预览卡片即可打开原始 URL
* 再次点击 Bookmarklet 可以移除所有生成的预览卡片

## 效果演示

打开一个包含 URL 的 OGS 聊天页面，然后点击 **OGS Link Preview** Bookmarklet。

预览卡片会直接显示在原始 URL 后面。

## 安装

### Chrome / Edge / Firefox

1. 创建一个新的浏览器书签。

2. 将书签名称设置为：

   ```text
   OGS Link Preview
   ```

3. 打开仓库中的 [`bookmarklet.min.js`](./bookmarklet.min.js) 文件。

4. 复制 `bookmarklet.min.js` 的全部内容。

5. 编辑刚才创建的书签，将复制的代码粘贴到 **网址 / URL / 地址** 字段中。

   代码必须以以下内容开头：

   ```text
   javascript:
   ```

   例如：

   ```text
   javascript:(function(){...})()
   ```

6. 保存书签。

7. 打开 OGS 聊天页面，点击 **OGS Link Preview** 书签。

预览卡片应该会显示在聊天消息中的 URL 后面。

> [!IMPORTANT]
> 从 `bookmarklet.min.js` 复制代码时，请确保 `javascript:` 前缀没有被浏览器删除。
>
> 如果浏览器在粘贴到书签网址字段时自动删除了 `javascript:`，请手动在代码最前面添加 `javascript:`。

## 使用方法

Bookmarklet 采用切换模式：

1. **第一次点击** — 生成链接预览。
2. **第二次点击** — 移除所有已生成的预览。
3. **第三次点击** — 再次生成链接预览。

同一个 URL 在当前页面中只会生成一次预览。

## 开发

可读性较好的源代码位于：

```text
bookmarklet.js
```

压缩后的 Bookmarklet 会自动生成：

```text
bookmarklet.min.js
```

在本地构建：

```bash
npm install
npm run build
```

项目使用 [Terser](https://terser.org/) 对 Bookmarklet 进行压缩。

## 隐私

Bookmarklet 不会收集或存储 OGS 聊天消息。

为了获取网页元数据，目标 URL 会被发送至 Microlink API。

## 限制

* 部分网站可能会阻止元数据爬虫。
* 部分网页可能没有提供 Open Graph 或其他网页元数据。
* 部分网页可能没有可用的缩略图。
* 预览功能依赖 Microlink API 的可用性。

## 许可证

许可证信息请参阅仓库中的 License 文件。
