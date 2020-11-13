import React from 'react'
import { Layer, Stage } from 'react-konva'

import LoadedImage from './LoadedImage'
import TransformerRectangle from './TransformerRectangle'


const CerificateCreator = ({ templateURL, rectangleProps, rectanglePropsHandler, isSelected, setSelected }) => {
    return (
        <Stage
        width={800}
        height={600}
      >
        <Layer>
          <LoadedImage url="assets/template.jpg" />
  
          { isSelected &&  
                <TransformerRectangle
                  shapeProps={rectangleProps}
                  isSelected={isSelected}
                  onSelect={() => setSelected(true) }
                  onChange={(newAttrs) => rectanglePropsHandler(newAttrs) }
                />
          }
          </Layer>
        </Stage>
    )
}

export default CerificateCreator;