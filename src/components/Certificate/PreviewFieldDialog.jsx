import React from 'react'
import { useTheme } from '@material-ui/core/styles';
import {
    useMediaQuery,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Input
  } from '@material-ui/core'

const PreviewFieldDialog = ({ setFieldData, activeDialog, closeDialogHandler, fields, viewHandler }) => {
    
    const [ fieldValue, fieldChange ] = React.useState(null)
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    React.useEffect(() => {
      let temp = {}
      Object.keys(fields).forEach((key, _) => {
        temp[key] = ''
      })
      fieldChange(temp)
    }, [])
    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      let temp = {...fieldValue}
      temp[name] = value;
      fieldChange(temp)
      console.log(fieldValue)
    }


    return(
        <Dialog fullScreen={fullScreen}
        open={activeDialog}
        onClose={closeDialogHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Enter Test Values</DialogTitle>
        <DialogContent>
          { Object.keys(fields).map((key, _) => <div style={{margin: '1em 0'}}><label>{key}</label><div><Input type="text" key={key} name={key} onChange={onChangeHandler} placeholder={`Enter ${key}`} value={fieldValue[key]}/></div></div>)}
        </DialogContent>
        <DialogActions>
              <Button autoFocus onClick={closeDialogHandler} color="primary">
                Back
              </Button>
              <Button onClick={() => {setFieldData(fieldValue); viewHandler(); closeDialogHandler()}} disabled={fieldValue === ''} color="primary" autoFocus>
                Preview
              </Button>
        </DialogActions>
      </Dialog>
    )
}

export default PreviewFieldDialog