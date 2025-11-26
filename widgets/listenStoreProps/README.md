# Listen store props

This sample shows one possibility for a direct communication between 2 widgets by using the widget state.

## How it works

Use this widget in an experience together with the updateStoreProps widget of this repo.

  Within `widget.tsx` props?.mutableStateProps is used to listen to changes of the sampleText state in the store.
  ```tsx
  // Use mutableStateProps to listen to changes of parameter 'sampleText' in the store.
  useEffect(() => {
    if (props?.mutableStateProps?.sampleText) {
      console.log(props?.mutableStateProps?.sampleText)
      setTextFromOtherWidget(props?.mutableStateProps?.sampleText)
    }
  }, [props?.mutableStateProps?.sampleText])
  ```