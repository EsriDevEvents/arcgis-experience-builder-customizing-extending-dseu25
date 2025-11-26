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
import { jsx, css, type IMDataSourceInfo, DataSourceStatus, type FeatureLayerDataSource, type FeatureLayerQueryParams, type AllWidgetProps, DataSourceComponent, classNames } from 'jimu-core'
import { Typography } from 'jimu-ui'

/**
 * This widget shows how to listen to the selection change of a data source.
 */
export default function Widget (props: AllWidgetProps<unknown>) {
  const displayField = 'Stadt'

  const isDsConfigured = () => {
    console.log('props.useDataSources', props.useDataSources)
    if (props.useDataSources && props.useDataSources.length === 1) {
      return true
    }
    return false
  }

  const dataRender = (ds: FeatureLayerDataSource, info: IMDataSourceInfo) => {
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

  if (!isDsConfigured()) {
    return <h3>
      This widget shows how to listen to the selection change of a data source.
      <br />
      Please configure the data source.
    </h3>
  }
  return <div className='widget-listen-selection-change' css={style}>
    <h3>
      This widget shows how to listen to the selection change of a data source.
    </h3>

    {/* Render all features from the configured data source. Re-render is automacally called, when change on DataSource.  */}
    <DataSourceComponent useDataSource={props.useDataSources[0]} query={{ where: '1=1' } as FeatureLayerQueryParams} widgetId={props.id}>
      {dataRender}
    </DataSourceComponent>
  </div>
}

const style = css`
  width: 100%;
  height: 100%;
  max-height: 800px;
  overflow: auto;
  .primary-border {
    border: 1px solid var(--sys-color-primary-main);
  }
  .featureButton {
    display: block;
  }
  .record-list {
    width: calc(100%);
    margin-top: 20px;
    height: calc(100% - 80px);
    overflow: auto;
  }
`
