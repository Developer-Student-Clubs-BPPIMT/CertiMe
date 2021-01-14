import React from 'react'
import { makeStyles } from '@material-ui/core' 
import {useDropzone} from 'react-dropzone';

const useStyles = makeStyles(theme => ({
    dropzone: {
        margin: '1em',
        background: 'rgba(200,200,200,0.46)',
        height: '600px',
        width: '800px',
        border: 'none',
        outline: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    }
}))


const Dropzone = ({ setImage }) => {
    const classes = useStyles()
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    React.useEffect(() => {
        setImage(acceptedFiles[0])
    }, [acceptedFiles])
    return(
        <div {...getRootProps({ className: classes.dropzone})} >
            <input {...getInputProps()} />
            <p >Drag 'n' drop some files here, or click to select files</p>
        </div>
    )
}

export default Dropzone;