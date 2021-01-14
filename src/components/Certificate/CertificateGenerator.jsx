import React from 'react'
import {
    Stage,
    Layer,
    Text,
} from 'react-konva'
import KonvaImage from '../common/KonvaImage'
import { useSelector } from 'react-redux'
import { Card, CardContent, Typography } from '@material-ui/core'

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
            { Object.keys(data).map(field_id => {
                const field = data[field_id] 
                return (
                  <Card>
                    <CardContent>
                    <Typography variant="h6">{field.id}</Typography>
                    <Typography variant="body2">Height: {field.height.toFixed(2)} Width: {field.width.toFixed(2)}</Typography>
                    {/* <input name={field.id} onChange={inputHandler}/> */}
                    </CardContent>
                  </Card>)
              })}
        </div>
    )
}

export default CertificateGenerator;