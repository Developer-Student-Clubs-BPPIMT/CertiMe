import React from 'react'
import { Layer, Stage } from 'react-konva'

import LoadedImage from './LoadedImage'
import TransformerRectangle from './TransformerRectangle'


const CertificateEditor = ({ templateURL, rectangleProps, rectanglePropsHandler, isSelected, setSelected }) => {
    return (
        <Stage
        width={800}
        height={600}
      >
        <Layer>
          <LoadedImage url={templateURL} />
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

export default CertificateEditor;