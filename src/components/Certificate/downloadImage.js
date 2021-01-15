import Konva from 'konva'
import useImage from 'use-image'

const downloadImage =  (image, fields, data) => {
    console.log(image, fields, data)
    const containerDiv = document.createElement('div')
    containerDiv.id = 'downloadContainer'
    containerDiv.style = "display: none;"
    document.body.append(containerDiv)


    const stage = new Konva.Stage({
        container: 'downloadContainer',
        width: 1600,
        height: 1200
    })
    var layer = new Konva.Layer();

        const template = new Konva.Image({
            image: image,
            x: 0,
            y: 0,
            width: 1600,
            height: 1200
        })
        layer.add(template)
        layer.draw();

        Object.keys(fields).forEach(key => {
            const text = new Konva.Text({
                text: data[key],
                x: fields[key].x * 2,
                y: fields[key].y * 2,
                height: fields[key].height * 2,
                width: fields[key].width * 2,
                align: "center",
                verticalAlign: "middle",
                fontSize: 32
            })
            layer.add(text)
        })
        stage.add(layer)
        return stage.toDataURL();

}


export default downloadImage