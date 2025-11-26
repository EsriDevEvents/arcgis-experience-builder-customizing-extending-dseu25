# Update store props

This sample shows one possibility for a direct communication between 2 widgets by using the widget state.

## How it works

Use this widget in an experience together with the listenStoreProps widget of this repo.

1. Within `widget.tsx` we serach for listenStoreProps widget on startup.
  ```tsx
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
  ```
2. By Clicking the  `Send Data Button` we update the sampleText state value of the listeStoreProps widget in the store.
  ```tsx
  const sendData = () => {
    // send parameter sampleText with the value of message to the listenStoreProps widget
    MutableStoreManager.getInstance().updateStateValue(
      listenWidget.id,
      'sampleText',
      message.current
    )
  }