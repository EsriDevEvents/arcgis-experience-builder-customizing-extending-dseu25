import { React, type AllWidgetProps } from 'jimu-core'
import { useEffect, useState } from 'react'

const Widget = (props: AllWidgetProps<unknown>) => {

  const [textFromOtherWidget, setTextFromOtherWidget] = useState<string>()

  // Use mutableStateProps to listen to changes of parameter 'sampleText' in the store.
  useEffect(() => {
    if (props?.mutableStateProps?.sampleText) {
      console.log(props?.mutableStateProps?.sampleText)
      setTextFromOtherWidget(props?.mutableStateProps?.sampleText)
    }
  }, [props?.mutableStateProps?.sampleText])
  
  if (!textFromOtherWidget) {
      return <h3 className='m-2'>
        This widget shows how to use mutableStateProps to communicate with another widget.
        <br />
        <br />
        Please send data.
      </h3>
  }
    return <div className='widget-listen-store-props'>
      <h3 className='m-2'>
        This widget shows how to use mutableStateProps to communicate with another widget.
      </h3>
      <h2 className='m-4'>
        {textFromOtherWidget}
      </h2>
    </div>

}

export default Widget
