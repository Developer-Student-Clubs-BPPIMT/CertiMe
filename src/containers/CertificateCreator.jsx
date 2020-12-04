import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  useMediaQuery,
  Container, 
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Card,
  Typography,
  CardContent
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles';

import CerificateCreator from '../components/Certificate/CertificateEditor';
import CertificateGenerator from '../components/Certificate/CertificateGenerator'
import FloatingBar from '../components/common/FloatingBar/FloatingBar';


//Icons
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SaveIcon from '@material-ui/icons/Save';

const CertificateCreator = () => {
    const theme = useTheme()
    const stageRef = React.useRef(null)
    const [ fieldData, setFieldData ] = React.useState({ })
    const dispatch = useDispatch()
    const certificateFields = useSelector(state => state.certificate.fields)
    const [ editor, setView ] = React.useState(true)
    const [ error, setError ] = React.useState('')
    const [ fieldValue, fieldChange ] = React.useState('')
    const [ rectangle, setRectangle] = React.useState(null);
    const [ selected, setSelected ] = React.useState(null);
    const [ activeDialog, setDialog ] = React.useState(false)
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const addFieldHandler = () => {
      setRectangle({
        x: 100,
        y: 200,
        width: 200,
        height: 30,
        fill: 'red',
      })
      setSelected(true)
    }

    const openDialogHandler = () => setDialog(true)
    const closeDialogHandler = () => setDialog(false)

    const saveFieldHandler = () => {
      if(fieldValue === ''){
        setError('Enter a Field Name')
        return;
      }
      dispatch({
        type:'UPDATE_CERTIFICATE', 
        data:{ 
          name: 'not-sample', 
          image: 'assets/WhiteSur.jpg',
          fields: [...certificateFields, {
            x: rectangle.x,
            y: rectangle.y,
            width: rectangle.width,
            height: rectangle.height,
            id: fieldValue
          }]
        }
      })
      setSelected(null)
      setRectangle(null)
      fieldChange('')
      
      let temp = fieldData;
      setFieldData(temp)
      setDialog(false)
    }

    const options = [
      {
        title: 'Preview',
        action: () => setView(!editor),
        icon: <VisibilityIcon />
      },
      {
        title: 'Save',
        action: () => {console.log("save")},
        icon: <SaveIcon />
      },
    ]

    React.useEffect(() => fieldChange(''), [])
    


    const downloadHandler = () => {
      console.log("Downloading..")
      let a = document.createElement('A');
      a.href = stageRef.current.toDataURL()
      a.download = 'certificate.png'
      a.click();
    }

  const inputHandler = (event) => {
      console.log(event.target) 
      const temp = fieldData;
      temp[event.target.name] = event.target.value;
      setFieldData(temp)
      // renderHandler()
    }

    return(
      <Container disableGutters style={{display: 'flex', justifyContent: 'center'}}>
        <div>
            { editor ? <CerificateCreator templateURL="assets/template.jpg" rectangleProps={rectangle} rectanglePropsHandler={setRectangle} isSelected={selected} setSelected={setSelected}/> : <CertificateGenerator stageRef={stageRef} fieldData={fieldData}/> }
              { certificateFields.map(field => {
                return (
                  <Card>
                    <CardContent>
                    <Typography variant="h6">{field.id}</Typography>
                    <Typography variant="body2">Height: {field.height.toFixed(2)} Width: {field.width.toFixed(2)}</Typography>
                    <input name={field.id} onChange={inputHandler}/>
                    </CardContent>
                  </Card>)
              })}
            </div>
          <FloatingBar options={options} mainOption={{
              title: 'Add Field',
              icon: selected ? <DoneIcon style={{ color: 'green'}}/> : <AddIcon />,
              action: selected ? openDialogHandler : addFieldHandler,
              disabled: selected && fieldValue === "",
            }}/>
            <Dialog fullScreen={fullScreen}
              open={activeDialog}
              onClose={() => setDialog(false)}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">{"Enter the Field Name"}</DialogTitle>
              <DialogContent>
                <input type="text" onChange={(e) => fieldChange(e.target.value) } placeholder={fieldValue} />
              </DialogContent>
              <DialogActions>
                    <Button autoFocus onClick={() => setDialog(false)} color="primary">
                      Back
                    </Button>
                    <Button onClick={saveFieldHandler} disabled={fieldValue === ''} color="primary" autoFocus>
                      Save Field
                    </Button>
              </DialogActions>
            </Dialog>

      </Container>
    )
}

export default CertificateCreator
