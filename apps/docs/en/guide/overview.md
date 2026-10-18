# Meet BlogGPT

BlogGPT is an Astro blog theme inspired by ChatGPT’s layout. Write in Markdown or MDX, manage content as files, and find articles through the sidebar, search and reading outline.

## Start here

| What you want to do                      | Read                                                                                                       |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Run the site                             | [Install and preview](./getting-started.md)                                                                |
| Set the site name, author and appearance | [Site and appearance](../config/site.md)                                                                   |
| Write articles                           | [Frontmatter](../content/frontmatter.md), [writing templates](../content/archetypes.md)                    |
| Manage languages and attachments         | [Languages and translations](../content/languages.md), [bundles](../content/bundles.md)                    |
| Adjust navigation and pages              | [Navigation](../config/navigation.md), [categories, tags and pages](../content/taxonomy.md)                |
| Customize reading features               | [Article enhancements](../config/enhancements.md), [reading, sharing and statistics](../config/reading.md) |
| Add styles and scripts                   | [Global extensions](../customization/hooks.md)                                                             |
| Publish existing content                 | [Build and deploy](./deployment.md), [migration](./migration.md)                                           |

See the [complete configuration reference](../config/reference.md) for every public field’s type, default and input format.

## Files you will use

| Location            | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| `blog.config.ts`    | Site, appearance, navigation, reading and interaction settings |
| `friends.config.ts` | Grouped friend links                                           |
| `content/`          | Articles, standalone pages, categories and tags                |
| `public/`           | Avatars, covers and other shared assets                        |
| `custom/`           | Custom HTML, CSS, client scripts and reusable components       |
| `archetypes/`       | Templates for new content                                      |

## Demo site

The [demo](https://demo.bloggpt.reincarnatey.net) introduces features through getting started and publishing, writing and typography, and interface customization. Explore the interface or follow the reading order in the pinned “Meet BlogGPT” article.

Shared images live in `public/images/`: `avatar.webp` for the avatar, `covers/` for covers, `illustrations/` for illustrations and `friends/` for friend avatars. Bodies can also use relative images within bundles.

To create your own site, replace the demo content, images and `example.com` placeholder links.
