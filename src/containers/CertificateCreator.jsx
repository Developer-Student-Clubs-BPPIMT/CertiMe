import React from 'react';
import Dropzone from '../components/common/Dropzone'
import downloadKonva from '../components/Certificate/downloadImage'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container, 
} from '@material-ui/core'
import CertificateGenerator from '../components/Certificate/CertificateGenerator'
import FloatingBar from '../components/common/FloatingBar/FloatingBar';


//Icons
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SaveIcon from '@material-ui/icons/Save';
import SaveFieldDiaglog from '../components/Certificate/SaveFieldDialog';
import PreviewFieldDialog from '../components/Certificate/PreviewFieldDialog'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CertificateEditor from '../components/Certificate/CertificateEditor';

const CertificateCreator = () => {
    const stageRef = React.useRef(null)
    const [ fieldData, setFieldData ] = React.useState({ })
    const dispatch = useDispatch()
    const certificateFields = useSelector(state => state.certificate.fields)
    const [ editor, setView ] = React.useState(true)
    const [ error, setError ] = React.useState('')
    const [ rectangle, setRectangle] = React.useState(null);
    const [ activeDialog, setDialog ] = React.useState(false)
    const [imgFile,setImgFile] = React.useState(null);
    const [ image, setImage ] = React.useState(null)
    React.useEffect(() => {
      console.log(image)
    }, [image])
    const editorView = () => setView(true)
    const previewView = () => setView(false)
    
    const openSaveDialogHandler = () => setDialog('save')
    const openPreviewDialogHandler = () => setDialog('preview')

    const closeDialogHandler = () => setDialog(false)

    const addFieldHandler = () => {
      setRectangle({
        x: 100,
        y: 200,
        width: 200,
        height: 30,
        fill: 'red',
        id: null
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
          image: URL.createObjectURL(imgFile),
          fields: fields
        }
      })

      setRectangle(null)
      setDialog(false)
    }

    const updateFieldHandler = (field) => {
      const fields = { ...certificateFields }
      delete fields[field.id]
      dispatch({
        type:'UPDATE_CERTIFICATE', 
        data:{ 
          name: 'not-sample', 
          image: URL.createObjectURL(imgFile),
          fields: fields
        }
      })
      setRectangle({ ...field, fill: "red"})
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
            image: URL.createObjectURL(imgFile),
            fields: fields
          }
        })
      }
      setRectangle(null)
    }

    const primary_options = [
      {
        title: editor ? 'Preview' : 'Edit',
        action: () => editor ? openPreviewDialogHandler() : editorView(),
        icon: editor ? <VisibilityIcon /> : <CreateIcon />
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
      a.href = downloadKonva(image, certificateFields, fieldData)
      a.download = 'certificate.png'
      a.click();
      a.remove()
    }

    return(
      <>
      <Container disableGutters style={{display: 'flex', justifyContent: 'center', margin: '1em auto'}}>
        <div>
            { editor && imgFile && 
              (<CertificateEditor 
                  templateURL={URL.createObjectURL(imgFile)} 
                  rectangleProps={rectangle} 
                  rectanglePropsHandler={setRectangle} 
                  isSelected={rectangle !== null} 
                  certificateFields={certificateFields} 
                  updateFieldHandler={updateFieldHandler}/> 
            )}
            { !editor && imgFile && (
              <CertificateGenerator 
              stageRef={stageRef} 
              fieldData={fieldData}
              setImage={setImage}/> 
            )}

            { !imgFile && (
              <Dropzone setImage={setImgFile}/>
            )} 
                 

            </div>
          <FloatingBar 
              options={ rectangle !== null ? secondary_options : primary_options} 
              mainOption={editor ? 
                {
                  title: 'Add Field',
                  icon: rectangle !== null ? <DoneIcon style={{ color: 'green'}}/> : <AddIcon />,
                  action: rectangle !== null ? openSaveDialogHandler : addFieldHandler,
                  disabled: rectangle !== null
                } : {
                  title: 'Download',
                  icon: <SaveIcon />,
                  action: () => downloadHandler(),
                  disabled: null
                }
            }/>


          <SaveFieldDiaglog saveFieldHandler={saveFieldHandler} activeDialog={activeDialog === 'save'} closeDialogHandler={closeDialogHandler} placeholder={rectangle?.id}/>
          <PreviewFieldDialog setFieldData={setFieldData} activeDialog={activeDialog === 'preview'} viewHandler={previewView} closeDialogHandler={closeDialogHandler} fields={certificateFields}/>
      </Container>
      </>
    )
}

export default CertificateCreator
