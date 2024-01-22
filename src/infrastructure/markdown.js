import { marked } from 'marked'

const renderer = new marked.Renderer()

const linkRenderer = renderer.link

renderer.link = (href, title, text) => {
  let localLink
  try {
    localLink = new URL(href).origin === location.origin
  } catch (ex) {
    localLink = false
  }

  const html = linkRenderer.call(renderer, href, title, text)

  return localLink ? html : html.replace(/^<a /, '<a target="_blank" rel="noreferrer noopener nofollow" ')
}

marked.setOptions({ renderer })

export { marked }
