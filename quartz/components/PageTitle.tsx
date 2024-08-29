import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h1 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}><img src="https://javiaib.gitlab.io/wikijavi/static/icon.png" style="height: 2em;  vertical-align: middle;" />{title}</a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
