import type { extensionSpec, AppConfig } from 'jimu-core'

export default class ChangeMap implements extensionSpec.AppConfigProcessorExtension {
  id = 'setWebMap'
  widgetId: string

  async process (appConfig: AppConfig): Promise<AppConfig> {
    // Do not replace when run in builder.
    if (window.jimuConfig.isInBuilder) {
      return Promise.resolve(appConfig)
    }
    const searchParams = new URLSearchParams(window.location.search)
    if (appConfig.dataSources?.dataSource_1 && searchParams) {
      const lowerCaseParams = new URLSearchParams()
      for (const [name, value] of searchParams) {
        lowerCaseParams.append(name.toLowerCase(), value)
      }
      if (lowerCaseParams.get('dseumap') && appConfig.attributes) {
        appConfig.dataSources.dataSource_1.itemId = lowerCaseParams.get('dseumap')
        // TODO: Further replacements if needed, for example for layers.
      }
    }

    return Promise.resolve(appConfig)
  }
}
