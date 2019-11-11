import defaultSettings from '@/settings'

const title = '宝哥的博客'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
