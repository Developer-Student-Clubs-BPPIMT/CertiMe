import React from 'react';
import CerificateCreator from '../../components/Certificate/CertificateEditor';
import CertificateGenerator from '../../components/Certificate/CertificateGenerator'
import { useDispatch, useSelector } from 'react-redux'

const CertificateCreator = () => {
    const dispatch = useDispatch()
    const certificateFields = useSelector(state => state.certificate.fields)
    const [ editor, setView ] = React.useState(true)
    const [ fieldValue, fieldChange ] = React.useState('')
    const [ rectangle, setRectangle] = React.useState(null);
    const [ selected, setSelected ] = React.useState(null);
  
    console.log(certificateFields)
    const addFieldHandler = () => {
      setRectangle({
        x: 100,
        y: 200,
        width: 200,
        height: 30,
        fill: 'red',
        id: 'rect1',
      })
      setSelected(true)
    }
  
    const saveFieldHandler = () => {
      console.log(fieldValue)
      dispatch({
        type:'UPDATE_CERTIFICATE', 
        data:{ 
          name: 'not-sample', 
          image: 'assets/template.jpg',
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
    }
    return(
        
        <div>
          <button onClick={() => setView(!editor)}>Change to { editor ? "Editor" : "Preview" } Mode</button>
          { editor ? (
            <div>
              <CerificateCreator templateURL="assets/template.jpg" rectangleProps={rectangle} rectanglePropsHandler={setRectangle} isSelected={selected} setSelected={setSelected}/>
              <input type="text" onChange={(e) => fieldChange(e.target.value) } placeholder={fieldValue} />
              { selected ? <button onClick={saveFieldHandler}>Save Field</button> : <button onClick={addFieldHandler}>New Field</button> }
            </div>
          ) : 
          <div>
            <CertificateGenerator />
          </div>}
        </div>
    )
}

export default CertificateCreator