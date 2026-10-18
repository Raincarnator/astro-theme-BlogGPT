# 全站 HTML / CSS / JS

## 扩展文件

| 文件                     | 用途                                     |
| ------------------------ | ---------------------------------------- |
| `custom/head.html`       | 添加到每页 head，如字体、meta 与统计脚本 |
| `custom/body-start.html` | 添加到 body 开头                         |
| `custom/body-end.html`   | 添加到 body 末尾                         |
| `custom/styles.css`      | 在主题样式之后加载自定义样式             |
| `custom/client.ts`       | 初次打开与每次客户端切页时执行           |
| `custom/components/`     | 保存供多篇 MDX 内容导入的复用组件        |

HTML、样式与脚本入口应用于博客的文章、页面、列表与 404；`custom/components/` 中的组件由内容按需导入。一次性组件放在文章内容包内，简单结构也可以直接写在 MDX 中。组件写法见 [MDX 交互组件](../config/enhancements.md#mdx-交互组件)。

## HTML 与脚本

例如，在 `head.html` 中添加统计服务提供的脚本：

```html
<script
  defer
  src="https://analytics.example.com/script.js"
  data-website-id="YOUR_ID"
></script>
```

替换实际服务地址和 ID。引用 public 资源时，可以使用 `%BASE_URL%my-script.js`，占位符会替换为部署路径。

## 客户端导航

在 `custom/client.ts` 的 `onPageLoad` 中处理页面行为，并保留文件已有的 `CustomPageContext` 接口：

```ts
export function onPageLoad(context: CustomPageContext): void | (() => void) {
  const button = context.document.querySelector('#my-button');
  button?.addEventListener('click', () => console.log(context.path), {
    signal: context.signal,
  });
  return () => {
    // 清理自己创建的观察器等
  };
}
```

| context 字段 | 含义                     |
| ------------ | ------------------------ |
| `document`   | 当前 Document            |
| `path`       | 当前路径                 |
| `locale`     | 当前语言                 |
| `signal`     | 切页前中止的 AbortSignal |

返回的函数在切页前清理。事件监听可使用 `signal` 自动移除，观察器等资源放入清理函数。原生内联脚本也可通过 `data-astro-rerun` 在客户端导航后再次执行。

## 样式

```css
:root {
  --accent: #6366f1;
}
.article-content {
  font-family: system-ui, sans-serif;
}
```

将自己的样式放在 `custom/styles.css`。日常写作和定制主要使用 `blog.config.ts`、`content/`、`public/`、`custom/` 与 `archetypes/`，友链使用 `friends.config.ts`。更新主题时，保留这些配置、内容、资源、扩展与模板。
