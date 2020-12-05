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

const SaveFieldDiaglog = ({ saveFieldHandler, activeDialog, closeDialogHandler, placeholder }) => {
    const [ fieldValue, fieldChange ] = React.useState()
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    React.useEffect(() => {
        fieldChange(placeholder ? placeholder : '')
    }, [placeholder])
    return(
        <Dialog fullScreen={fullScreen}
        open={activeDialog}
        onClose={closeDialogHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Enter the Field Name"}</DialogTitle>
        <DialogContent>
          <Input type="text" onChange={(e) => fieldChange(e.target.value) } placeholder={"Enter Field Name"} value={fieldValue}/>
        </DialogContent>
        <DialogActions>
              <Button autoFocus onClick={closeDialogHandler} color="primary">
                Back
              </Button>
              <Button onClick={() => saveFieldHandler(fieldValue)} disabled={fieldValue === ''} color="primary" autoFocus>
                Save Field
              </Button>
        </DialogActions>
      </Dialog>
    )
}

export default SaveFieldDiaglog