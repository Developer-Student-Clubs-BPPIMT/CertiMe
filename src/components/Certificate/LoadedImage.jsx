import { Image } from 'react-konva'
import useImage from 'use-image'

const LoadedImage = ({url}) => {
    const [image] = useImage(url);
    return <Image image={image} width={800} height={600}/>;
};

export default LoadedImage;