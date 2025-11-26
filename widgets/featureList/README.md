# Listen selection change of a data source

Data sources are a key concept of the ArcGIS Experience Builder architecture. You may want to utilize a data source within your custom widget. This sample demonstrates how to listen to the selection change of a data source.

## How it works
Use this widget in an experience together with the filterSelect widget of this repo and a map widget. Configure a FeatureLayer of a map as data source in this widget and the same data source in the featureList widget.

1. In setting, select the data source using `DataSourceSelector`. The selected data source will be saved in `props.useDataSources`.

  ```tsx
  <DataSourceSelector onChange={onDataSourceChange} widgetId={props.id}
    types={Immutable([AllDataSourceTypes.FeatureLayer])} useDataSources={props.useDataSources}
    useDataSourcesEnabled={props.useDataSourcesEnabled} onToggleUseDataEnabled={onToggleUseDataEnabled}
  />
  ```

2. In the widget, load records using `DataSourceComponent`. The sample uses the render function of `DataSourceComponent`. The render function will be called whenever the data source info changes (e.g. selection change) or when the loaded records change (e.g. other widgets apply a filter to the data source).

  ```tsx
  <DataSourceComponent useDataSource={props.useDataSources[0]} query={{ where: '1=1' } as FeatureLayerQueryParams} widgetId={props.id}>
    {dataRender}
  </DataSourceComponent>
  ```

3. In the render function add a border if the record is selected (by other widgets).

  ```tsx
  const dataRender = (ds: DataSource, info: IMDataSourceInfo) => {
    return <div className='record-list'>
        {
          // Render all records from the data source. Highlight the selected ones with a border by className 'primary-border'.
          ds && ds.getStatus() === DataSourceStatus.Loaded
            ? ds.getRecords().map((r) => {
              return <Typography variant="h3" className={classNames({ 'primary-border': ds.getSelectedRecordIds()?.includes(r.getId()) })}>
                {r.getFieldValue(displayField)}
              </Typography>
            })
            : null
        }
      </div>
  }
  ```
