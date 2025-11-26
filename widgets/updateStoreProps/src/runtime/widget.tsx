import { getAppStore, MutableStoreManager, React, type AllWidgetProps } from 'jimu-core'
import { Button, TextInput } from 'jimu-ui'
import { useEffect, useRef, useState } from 'react'

const Widget = (props: AllWidgetProps<unknown>) => {

  const [listenWidget, setListenWidget] = useState({} as any)
  const message = useRef<string>('This is my demo text for the listenStoreProps widget.')

  // Search for the listenStoreProps widget in the app configuration.
  // Use the first one for communication.
  useEffect(() => {
    const widgets = getAppStore().getState().appConfig.widgets
    const listenWidgets = Object.values(widgets).filter(
      (w: any) => w.uri === 'widgets/listenStoreProps/'
    )
    if (listenWidgets.length > 0) {
      setListenWidget(listenWidgets[0])
    }
  }, [])

  const sendData = () => {
    // send parameter sampleText with the value of message to the listenStoreProps widget
    MutableStoreManager.getInstance().updateStateValue(
      listenWidget.id,
      'sampleText',
      message.current
    )
  }
  
  if (!listenWidget) {
      return <h3 className='m-2'>
        This widget shows how to use mutableStateProps to communicate with another widget.
        <br />
        Please add a listenStoreProps widget to the experience.
      </h3>
  }
    return <div className='widget-listen-store-props'>
      <h3 className='m-2'>
        This widget shows how to use mutableStateProps to communicate with another widget.
      </h3>
      <TextInput
        className="m-4"
        placeholder="This is my demo text for the listenStoreProps widget."
        onAcceptValue={(value) => {message.current = value}}
      />
      <Button className="m-4" onClick={sendData}>Send Data</Button>
    </div>

}

export default Widget
