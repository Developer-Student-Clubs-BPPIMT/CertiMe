import {
    Stage,
    Layer,
    Text
} from 'react-konva'

const CertificateGenerator = ({ data }) => {
    return(
        <Stage>
            <Layer>
                {data.map(field => <Text 
                    x={field.x}
                    y={field.y}
                    height={field.height}
                    width={field.width}
                    id={field.id}
                    fontSize={16}
                    text={field.id === field.value}
                    align="center"
                    verticalAlign="middle"
                />)}
            </Layer>
        </Stage>
    )
}

export default CertificateGenerator;