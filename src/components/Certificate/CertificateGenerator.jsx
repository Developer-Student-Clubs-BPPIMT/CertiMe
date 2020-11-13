import React from 'react'
import {
    Stage,
    Layer,
    Text,
} from 'react-konva'
import LoadedImage from './LoadedImage'
import { useSelector } from 'react-redux'

const CertificateGenerator = () => {
    const stageRef = React.useRef(null)
    const downloadRef = React.useRef(null)
    const [ fieldData, setFieldData ] = React.useState({ })
    const [ textLayer, renderTextLayer ] = React.useState(<Layer></Layer>)
    const certificate = useSelector(state => state.certificate)
    const data = certificate.fields;
    const inputHandler = (event) => {
        console.log(event.target)
        const temp = fieldData;
        temp[event.target.name] = event.target.value;
        setFieldData(temp)
        console.log(fieldData)
    }
    const downloadHandler = () => {
        let a = document.createElement('A');
        a.href = stageRef.current.toDataURL()
        a.download = 'certificate.png'
        a.click();
    }
    const renderHandler = () => {
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
    }

    React.useEffect(() => {
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
    }, [data, fieldData, renderTextLayer])

    return(
        <div>
            <Stage width={800} height={600} ref={stageRef} >
                <Layer>
                    <LoadedImage url={certificate.image}/>
                </Layer>
                { textLayer }
            </Stage>
            {data.map(field => {
                return(
                    <div key={field.id}>
                        <label>{field.id}</label>
                        <input name={field.id} onChange={inputHandler}/>
                    </div>
                )
            })}
            <button onClick={renderHandler}>Preview</button>
            <button onClick={downloadHandler}>Download</button>

        </div>
    )
}

export default CertificateGenerator;