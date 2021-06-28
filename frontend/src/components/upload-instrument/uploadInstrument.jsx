import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import './uploadInstrument.styles.scss';

const useStyles = makeStyles((theme) => ({
    inputLabel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '40px',
        fontWeight: '300',
        color: 'white',
        cursor: 'pointer'
    },
    previewImage: {
        width: '50px', 
        height: '50px'
    }
}))

const Input = ({ accept, onFiles, files }) => {
    const text = files.length > 0 ? 'Add more files' : 'Choose files'
    const getFilesFromEvent = (e) => {
        return new Promise(resolve => {
          getDroppedOrSelectedFiles(e).then(chosenFiles => {
            resolve(chosenFiles.map(f => f.fileObject))
          })
        })
    }

    return (
      <label style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
        {text}
        <input
          style={{ display: 'none' }}
          type="file"
          accept={accept}
          multiple
          onChange={e => {
            getFilesFromEvent(e).then(chosenFiles => {
              onFiles(chosenFiles)
            })
          }}
        />
      </label>
    )
}

const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {

    return (
      <div>
        {previews}
  ​
        <div {...dropzoneProps}>
          {files.length < maxFiles && input}
        </div>
  ​
        {files.length > 0 && submitButton}
      </div>
    )
  }

const UploadInstrument = (props) => {
    const {userId} = props;
    const classes = useStyles();

    const getUploadParams = () => ({ url: 'https://httpbin.org/post' })

    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        //add files to db
        allFiles.forEach(f => f.remove())
    }

  return (
    <Dropzone
        getUploadParams={getUploadParams}
        LayoutComponent={Layout}
        onSubmit={handleSubmit}
        InputComponent={Input}
        classNames={{ inputLabelWithFiles: classes.inputLabel, previewImage: classes.previewImage }}
        inputContent="Drop Your Photos Here"
        accept="image/*,video/*"
        disabled={userId ? false : true}
    />
  )
}

export default UploadInstrument;