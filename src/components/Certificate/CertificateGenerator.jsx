import React from 'react'
import {
    Stage,
    Layer,
    Text,
} from 'react-konva'
import KonvaImage from '../common/KonvaImage'
import { useSelector } from 'react-redux'

const CertificateGenerator = ({ stageRef, fieldData }) => {
    const [ textLayer, renderTextLayer ] = React.useState(<Layer></Layer>)
    const certificate = useSelector(state => state.certificate)
    const data = certificate.fields;

    React.useEffect(() => {
        renderTextLayer(<Layer>
            {Object.keys(data).map(field_id => {
                const field = data[field_id]
                return (<Text 
                    key={field.id}
                    x={field.x}
                    y={field.y}
                    height={field.height}
                    width={field.width}
                    id={field.id}
                    fontSize={16}
                    text={fieldData[field.id]}
                    align="center"
                    verticalAlign="middle"
                />)})}
        </Layer>)
    }, [data, fieldData])

    return(
        <div>
            <Stage width={800} height={600} ref={stageRef} >
                <Layer>
                    <KonvaImage url={certificate.image}/>
                </Layer>
                { textLayer }
            </Stage>
        </div>
    )
}

export default CertificateGenerator;