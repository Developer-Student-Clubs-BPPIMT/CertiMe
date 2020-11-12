import React from 'react';
import { Stage, Layer, Image, Rect, Transformer, Text } from 'react-konva';
import useImage from 'use-image';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);


  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const LoadedImage = ({url}) => {
  const [image] = useImage(url);
  return <Image image={image} width={600} height={400}/>;
};

function App() {
  const [ saved, addSaved ] = React.useState([])
  const [ fieldValue, fieldChange ] = React.useState('')
  const [rectangle, setRectangle] = React.useState(null);
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
    <div className="App" style={{display: 'grid', placeItems: 'center', minHeight: '100vh'}}>
    <Stage
      width={600}
      height={400}
    >
      <Layer>
        <LoadedImage url="assets/template.jpg" />

        { selected &&  
              <Rectangle
                shapeProps={rectangle}
                isSelected={selected}
                onSelect={() => setSelected(true) }
                onChange={(newAttrs) => setRectangle(newAttrs) }
              />
        }
        </Layer>
        <Layer>
          {saved.map(field => <Text 
              x={field.x}
              y={field.y}
              height={field.height}
              width={field.width}
              fontSize="16"
              text="This is an Example Text"
              align="center"
              verticalAlign="middle"
            />)
          }
        </Layer>
      </Stage>
      <input type="text" onChange={(e) => fieldChange(e.target.value) } placeholder={fieldValue} />
      { selected ? <button onClick={saveFieldHandler}>Save Field</button> : <button onClick={addFieldHandler}>New Field</button> }
    </div>
  );
}

export default App;
