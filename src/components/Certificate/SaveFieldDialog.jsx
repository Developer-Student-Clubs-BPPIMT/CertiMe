import React from 'react'
import { useTheme } from '@material-ui/core/styles';
import {
    useMediaQuery,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
  } from '@material-ui/core'

const SaveFieldDiaglog = ({ saveFieldHandler, activeDialog, closeDialogHandler }) => {
    const [ fieldValue, fieldChange ] = React.useState('')
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Dialog fullScreen={fullScreen}
        open={activeDialog}
        onClose={closeDialogHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Enter the Field Name"}</DialogTitle>
        <DialogContent>
          <input type="text" onChange={(e) => fieldChange(e.target.value) } placeholder={fieldValue} />
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