import React from 'react'
import {
    Stage,
    Layer,
    Text,
} from 'react-konva'
import LoadedImage from './LoadedImage'
import { useSelector } from 'react-redux'

const CertificateGenerator = ({ stageRef, fieldData }) => {
    console.log(fieldData)
    // const [ fieldData, setFieldData ] = React.useState({ })
    const [ textLayer, renderTextLayer ] = React.useState(<Layer></Layer>)
    const certificate = useSelector(state => state.certificate)
    const data = certificate.fields;

    React.useEffect(() => {
        console.log('Hello')
        renderTextLayer(<Layer>
            {data.map(field => <Text 
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
                />)}
        </Layer>)
    }, [fieldData])

    return(
        <div>
            <Stage width={800} height={600} ref={stageRef} >
                <Layer>
                    <LoadedImage url={certificate.image}/>
                </Layer>
                { textLayer }
            </Stage>
            {/* {data.map(field => {
                return(
                    <div key={field.id}>
                        <label>{field.id}</label>
                        <input name={field.id} onChange={inputHandler}/>
                    </div>
                )
            })} */}
        </div>
    )
}

export default CertificateGenerator;