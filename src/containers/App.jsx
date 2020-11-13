import React from 'react';
import CerificateCreator from '../components/Certificate/CertificateCreator';
import Navbar from '../components/Navbar/Navbar'

function App() {
  const [ saved, addSaved ] = React.useState([])
  const [ fieldValue, fieldChange ] = React.useState('')
  const [ rectangle, setRectangle] = React.useState(null);
  const [ selected, setSelected ] = React.useState(null);

  React.useEffect(() => {
    console.log(saved)
  }, [saved])

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
    addSaved([...saved, {
      x: rectangle.x,
      y: rectangle.y,
      width: rectangle.width,
      height: rectangle.height,
      id: fieldValue
    }])
    setSelected(null)
    setRectangle(null)
  }

  return (
    <div className="App" style={{minHeight: '100vh'}}>
      <div style={{display: 'grid', placeItems: 'center'}}>
      <Navbar />
      <CerificateCreator templateURL="assets/template.jpg" rectangleProps={rectangle} rectanglePropsHandler={setRectangle} isSelected={selected} setSelected={setSelected}/>

      <input type="text" onChange={(e) => fieldChange(e.target.value) } placeholder={fieldValue} />
      { selected ? <button onClick={saveFieldHandler}>Save Field</button> : <button onClick={addFieldHandler}>New Field</button> }
      </div>
    </div>
  );
}

export default App;
