/** @jsx jsx */
/**
  Licensing

  Copyright 2022 Esri

  Licensed under the Apache License, Version 2.0 (the "License"); You
  may not use this file except in compliance with the License. You may
  obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied. See the License for the specific language governing
  permissions and limitations under the License.

  A copy of the license is available in the repository's
  LICENSE file.
*/
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { jsx, css, type FeatureLayerDataSource, type AllWidgetProps, DataSourceManager, type SqlQueryParams, type FeatureDataRecord } from 'jimu-core'
import { Button } from 'jimu-ui'
import { useState } from 'react'

/**
 * This widget shows how to listen to the selection change of a data source.
 */
export default function Widget (props: AllWidgetProps<unknown>) {
  const [jimuMapView, setJimuMapView] = useState<JimuMapView>()
  const whereClause = "Unternehmen = 'Esri Schweiz AG'"
  
  // Save the MapView, used in the configured map widget, to the state
  const onActiveViewChange = (jmv: JimuMapView) => {
    if (jmv !== undefined) {
      setJimuMapView(jmv)
    }
  }

  const isDsConfigured = () => {
    console.log('props.useDataSources', props.useDataSources)
    if (props.useDataSources && props.useDataSources.length === 1 && 
      props.useMapWidgetIds && props.useMapWidgetIds.length === 1) {
      return true
    }
    return false
  }

  // Apply filter (definitionExpression) to the layer
  // Filter is visible in the map, but not in widgets using the data source
  const filterLayer = () => {
    // Get JimuLayerView by configured data source ID
    const layerView = jimuMapView.getJimuLayerViewByDataSourceId(props.useDataSources[0].dataSourceId)
    // Get ArcGIS Maps SDK for JavaScript layer from JimuLayerView
    const layer = layerView.layer as __esri.FeatureLayer
    layer.definitionExpression = whereClause
  }

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

  // Select records in the DataSource.
  // Selected records are highlighted in the map and in widgets using the data source.
  const selectDataSource = async () => {
    const dsManager = DataSourceManager.getInstance()
    const useDataSource = props.useDataSources[0]
    // Get FeatureLayerDataSource by configured data source ID
    const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource
    const dsResult = await ds.query({
      where: whereClause
    })
    const records = dsResult?.records as FeatureDataRecord[]

    // Select the queried records in the data source
    if (records.length > 0) {
      ds.selectRecordsByIds(records.map((r: any) => r.getId()), records)
    } else {
      ds.clearSelection()
    }
  }

  // Clear all filters and selections
  const clearAll = () => {
    const dsManager = DataSourceManager.getInstance()
    const useDataSource = props.useDataSources[0]
    const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource
    ds.clearSelection()
    ds.updateQueryParams({ where: '1=1' } as SqlQueryParams, props.id)
    const layerView = jimuMapView.getJimuLayerViewByDataSourceId(props.useDataSources[0].dataSourceId)
    const layer = layerView.layer as __esri.FeatureLayer
    layer.definitionExpression = ''
  }

  if (!isDsConfigured()) {
    return <h3>
      This widget shows how to filter and select a data source.
      <br />
      Please configure the data source.
    </h3>
  }
  return <div className='widget-filter-select' css={style}>
    <h3>
      This widget shows how to filter and select a data source.
    </h3>
    <Button onClick={filterLayer} type='tertiary' size='lg' className='fs-button'>
      Filter Layer
    </Button>
    <Button onClick={filterDataSource} type='tertiary' size='lg' className='fs-button'>
      Filter DataSource
    </Button>
    <Button onClick={selectDataSource} type='tertiary' size='lg' className='fs-button'>
      Select DataSource
    </Button>
    <Button onClick={clearAll} type='tertiary' size='lg' className='fs-button'>
      Clear
    </Button>

    {{}.hasOwnProperty.call(props, 'useMapWidgetIds') &&
      props.useMapWidgetIds &&
      props.useMapWidgetIds.length === 1 && (
        <JimuMapViewComponent
          useMapWidgetId={props.useMapWidgetIds?.[0]}
          onActiveViewChange={onActiveViewChange}
        />
    )}
  </div>
}

const style = css`
  width: 100%;
  height: 100%;
  max-height: 800px;
  overflow: auto;
  .fs-button {
    display: block;
    margin: 5px;
  }
`
