# Change WebMap Data Source

This is a widget without UI. This widget demonstrates how to use Extension points to change a WebMap data source by a url parameter.

## How it works

Use this widget in an experience together with a map widget.

1. The `manifest.json` configuration indicates that the widget makes use of an extension point.
  ```json
  "extensions": [
    {
      "point": "APP_CONFIG_PROCESSOR",
      "uri": "extensions/setWebMap"
    }
  ]
  ```
2. In  `setWebMap.ts` we implement extensionSpec.AppConfigProcessorExtension.
  ```ts
  export default class ChangeMap implements extensionSpec.AppConfigProcessorExtension {
  ```

  Within the process function, the application's configured data source is overridden with the WebMap ID provided through URL parameters.
   ```ts
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
  ```

  ### How to use it
  An example application is provided in the repository

1. Copy folder apps/changeDS to folder server/public/apps of your experience builder dev edition
2. Start experience builder and open app in browser 
   https://localhost:3001/experience/changeDS
   You see a map and a list with all offices of Esri Germany and Esri Switzerland.
3. Change the data source of the WebMap by url Parameter
   
   https://localhost:3001/experience/changeDS?dseumap=7a636ca1d10544ecbafeb8714379de50

   https://localhost:3001/experience/changeDS?dseumap=ed0608515597472180b369b5847e76b7
  
    The URL parameter modifies the data source, switching to a different WebMap so that only Esri Germany or Esri Switzerland offices are displayed.

    Experience Builder includes a WebMap URL parameter by default, but it is applied exclusively to the Map widget and any widgets referencing it. Widgets that consume a FeatureLayer directly (e.g., the List widget) remain unaffected since the update is limited to the Map widget and does not propagate to the app configuration's data source section

    https://localhost:3001/experience/changeDS?webmap=7a636ca1d10544ecbafeb8714379de50

    https://localhost:3001/experience/changeDS?webmap=ed0608515597472180b369b5847e76b7