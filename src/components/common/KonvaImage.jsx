import { Image } from 'react-konva'
import useImage from 'use-image'

const KonvaImage = ({url, setImage}) => {
    const [image] = useImage(url);
    setImage && setImage(image)
    console.log(image)
    return <Image image={image} width={800} height={600}/>;
};

export default KonvaImage;