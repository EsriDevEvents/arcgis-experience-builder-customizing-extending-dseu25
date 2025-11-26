# Select and filter a data source and layer

Data sources are a key concept of the ArcGIS Experience Builder architecture. You may want to utilize a data source within your custom widget. This sample demonstrates how to filter data source and apply a selection to the data source.

## How it works

Use this widget in an experience together with the featureList widget of this repo and a map widget. Configure the map widget and one FeatureLayer of the map as data source in this widget and the same data source in the featureList widget.

1. In setting, select the map widget using `MapWidgetSelector`. The selected map widget will be saved in `props.useMapWidgetIds`.

  ```tsx
  <MapWidgetSelector onSelect={onMapSelected} useMapWidgetIds={props.useMapWidgetIds} />
  ```

   In setting, select the data source using `DataSourceSelector`. The selected data source will be saved in `props.useDataSources`.

  ```tsx
  <DataSourceSelector onChange={onDataSourceChange} widgetId={props.id}
    types={Immutable([AllDataSourceTypes.FeatureLayer])} useDataSources={props.useDataSources}
    useDataSourcesEnabled={props.useDataSourcesEnabled} onToggleUseDataEnabled={onToggleUseDataEnabled}
  />
  ```

2. Within `widget.tsx`, a reference to the Map object is acquired using the `JimuMapViewComponent` module. That reference is used in the `activeViewChangeHandler`

  By Clicking the  `Filter Layer Button` a filter is applied to the layer by adding a definition expression.
  ```tsx
  // Apply filter (definitionExpression) to the layer
  // Filter is visible in the map, but not in widgets using the data source
  const filterLayer = () => {
    // Get JimuLayerView by configured data source ID
    const layerView = jimuMapView.getJimuLayerViewByDataSourceId(props.useDataSources[0].dataSourceId)
    // Get ArcGIS Maps SDK for JavaScript layer from JimuLayerView
    const layer = layerView.layer as __esri.FeatureLayer
    layer.definitionExpression = whereClause
  }
  ```
By Clicking the  `Filter DataSource Button` a filter is applied to the layer by adding a definition expression.
  ```tsx
  // Apply filter (queryParams) to the DataSource
  // Filter is visible in the map and in widgets using the data source
  const filterDataSource = () => {
    const dsManager = DataSourceManager.getInstance()
    const useDataSource = props.useDataSources[0]
    // Get FeatureLayerDataSource by configured data source ID
    const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource
    const sqlQuery = { where: whereClause } as SqlQueryParams
    ds.updateQueryParams(sqlQuery, props.id)
  }
  ```
By Clicking the  `Select DataSource Button` a selection is applied to the DataSource.
  ```tsx
  // Select records in the DataSource.
  // Selected records are highlighted in the map and in widgets using the data source.
  ds.selectRecordsByIds(records.map((r: any) => r.getId()), records)
  ```