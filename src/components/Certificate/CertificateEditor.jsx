import React from 'react'
import { Layer, Stage, Rect} from 'react-konva'

import KonvaImage from '../common/KonvaImage'
import TransformerRectangle from './TransformerRectangle'


const CertificateEditor = ({ templateURL, rectangleProps, rectanglePropsHandler, isSelected, updateFieldHandler, certificateFields,  }) => {
  const [ rectangleLayer, renderRectangleLayer ] = React.useState(<Layer></Layer>)
  React.useEffect(() => {
    renderRectangleLayer(<Layer>
        { Object.keys(certificateFields).map(field_id => {
            const field = certificateFields[field_id]
            return (<Rect 
                key={field.id}
                x={field.x}
                y={field.y}
                height={field.height}
                width={field.width}
                id={field.id}
                fill="red"
                onClick={() => { !isSelected && updateFieldHandler(field)}}
            />)})}
    </Layer>)
    console.log(certificateFields)
}, [certificateFields, isSelected, updateFieldHandler])
    return (
        <Stage
        width={800}
        height={600}
      >
        <Layer>
          <KonvaImage url={templateURL} />
          { isSelected &&  
                <TransformerRectangle
                  shapeProps={rectangleProps}
                  isSelected={isSelected}
                  // onSelect={() => setSelected(true) }
                  onChange={(newAttrs) => rectanglePropsHandler(newAttrs) }
                />
          }
          </Layer>
          { rectangleLayer }
        </Stage>
    )
}

export default CertificateEditor;