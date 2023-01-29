import * as React from 'react';
import '../App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function TextEdit(){

  const [content, setContent] = "TBD";
  const event = new Event('openfile');

  async function getFile(){
    const pickerOpts = {
      startIn: 'documents',
      multiple: false
    };
    // create a reference for our file handle
    let fileHandle;
    // open file picker, destructure the one element returned array
    [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    // Do something with the file handle.
    const file = await [fileHandle].getFile();
    // const contents = await file.text();
    // console.log(contents);
    // // setContent(contents);
  }

  // // fileHandle is an instance of FileSystemFileHandle..
  // async function writeFile(contents) {
  //   const fileHandle = await window.showOpenFilePicker({
  //     startIn: 'pictures'
  //   });
  //   // Create a FileSystemWritableFileStream to write to.
  //   const writable = await fileHandle.createWritable();
  //   // Write the contents of the file to the stream.
  //   await writable.write(contents);
  //   // Close the file and write the contents to disk.
  //   await writable.close();
  // }

        return (
          <Grid container item columnSpacing={2}>
            <Grid item xs={3}><Button fullWidth variant="contained" color="secondary" onClick={() => {getFile()}}>Edit a Config</Button></Grid>
          </Grid>
        );
}


