import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  Container, 
  Card,
  Typography,
  CardContent
} from '@material-ui/core'


import CerificateCreator from '../components/Certificate/CertificateEditor';
import CertificateGenerator from '../components/Certificate/CertificateGenerator'
import FloatingBar from '../components/common/FloatingBar/FloatingBar';


//Icons
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SaveIcon from '@material-ui/icons/Save';
import SaveFieldDiaglog from '../components/Certificate/SaveFieldDialog';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

const CertificateCreator = () => {
    const stageRef = React.useRef(null)
    const [ fieldData, setFieldData ] = React.useState({ })
    const dispatch = useDispatch()
    const certificateFields = useSelector(state => state.certificate.fields)
    const [ editor, setView ] = React.useState(true)
    const [ error, setError ] = React.useState('')
    const [ rectangle, setRectangle] = React.useState(null);
    const [ activeDialog, setDialog ] = React.useState(false)



    const openDialogHandler = () => setDialog(true)
    const closeDialogHandler = () => setDialog(false)

    const addFieldHandler = () => {
      setRectangle({
        x: 100,
        y: 200,
        width: 200,
        height: 30,
        fill: 'red',
      })
    }

    const saveFieldHandler = (fieldValue) => {
      if(fieldValue === ''){
        setError('Enter a Field Name')
        return;
      }
      const fields = { ...certificateFields }
      fields[fieldValue] = {
        x: rectangle.x,
        y: rectangle.y,
        width: rectangle.width,
        height: rectangle.height,
        id: fieldValue
      }
      dispatch({
        type:'UPDATE_CERTIFICATE', 
        data:{ 
          name: 'not-sample', 
          image: 'assets/template.jpg',
          fields: fields
        }
      })
      setRectangle(null)
      
      let temp = fieldData;
      setFieldData(temp)
      setDialog(false)
    }

    const updateFieldHandler = (field) => {
      const fields = { ...certificateFields }
      delete fields[field.id]
      dispatch({
        type:'UPDATE_CERTIFICATE', 
        data:{ 
          name: 'not-sample', 
          image: 'assets/template.jpg',
          fields: fields
        }
      })
      setRectangle({ ...field, fill: "red"})
      console.log(rectangle)
    }

    const deleteFieldHandler = () => {
      console.log(rectangle.id)
      const fields = certificateFields
      if(rectangle.id){
        delete fields[rectangle.id]
        dispatch({
          type:'UPDATE_CERTIFICATE', 
          data:{ 
            name: 'not-sample', 
            image: 'assets/template.jpg',
            fields: fields
          }
        })
      }
      setRectangle(null)
    }

    const primary_options = [
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

    const secondary_options = [
      {
        title: 'Delete',
        action: deleteFieldHandler,
        icon: <DeleteIcon />
      },
    ]

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
    }

    return(
      <Container disableGutters style={{display: 'flex', justifyContent: 'center'}}>
        <div>
            { editor ? <CerificateCreator templateURL="assets/template.jpg" rectangleProps={rectangle} rectanglePropsHandler={setRectangle} isSelected={rectangle !== null} certificateFields={certificateFields} updateFieldHandler={updateFieldHandler}/> : <CertificateGenerator stageRef={stageRef} fieldData={fieldData}/> }
              { Object.keys(certificateFields).map(field_id => {
                const field = certificateFields[field_id] 
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
          <FloatingBar options={ rectangle !== null ? secondary_options : primary_options} mainOption={{
              title: 'Add Field',
              icon: rectangle !== null ? <DoneIcon style={{ color: 'green'}}/> : <AddIcon />,
              action: rectangle !== null ? openDialogHandler : addFieldHandler,
              disabled: rectangle !== null
            }}/>
          <SaveFieldDiaglog saveFieldHandler={saveFieldHandler} activeDialog={activeDialog} closeDialogHandler={closeDialogHandler} placeholder={rectangle?.id}/>
      </Container>
    )
}

export default CertificateCreator
