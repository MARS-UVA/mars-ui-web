import { useEffect, useState } from 'react';
import '../App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import ActionButton from './ActionButton'

export default function TextEdit(){

  //state containing content fetched from a file
  const [content, setContent] = useState("Fetch a File to Update this Text");
  //state containing content edited by a user
  const [newcontent, setNewContent] = useState("default value");
  //directory that user has granted access to
  const [globaldir, setGlobalDir] = useState("");
  //file name to be edited
  const [fileName, setFileName] = useState("");

  //ask the user for permission to access a directory once so it doesn't have to keep on asking
  let directory;
  async function handlePerms(){
    try {
        directory = await window.showDirectoryPicker({
            startIn: 'desktop'
        });
        setGlobalDir(directory);
    } catch(e) {
        console.log(e);
    }
  }

  //grab a specified file contents to be displayed
  async function handleFetch(){
    let saveFile;
    try {
      for await (const entry of globaldir.values()) {
        if (entry.kind === "file" && entry.name==fileName){
          const file = await entry.getFile();
          const text = await file.text();
          console.log(text);
          setContent(text);
          
        }
      } 
    } catch(e) {
        console.log(e);
    }
  }

  //delete the previous file and create a new one with the same name with updated contents
  async function handleWrite(){
    // Deletes a file
    globaldir.removeEntry(fileName);
    //create new file
    const pickerOpts = {
      suggestedName: fileName
    };
    const fileHandle = await window.showSaveFilePicker(pickerOpts);
     // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(newcontent);
    // Close the file and write the contents to disk.
    await writable.close();
  }


        return (
          <div>
            <Grid container rowSpacing={2}>
              <ActionButton label={"Raise Bucket Ladder"}/>
              <ActionButton label={"Lower Bucket Ladder"}/>
              <ActionButton label={"Raise Deposit Bin"}/>
              <ActionButton label={"Lower Deposit Bin"}/>
              <ActionButton label={"Dig"}/>
            </Grid>
            <br/>
            <Grid container item columnSpacing={1} columns={4}>
              <Grid item xs={8}>
                <TextareaAutosize
                      aria-label="empty textarea"
                      placeholder='Edit me with File Name.json'
                      onChange={event => {
                        const newfilec = event.target;
                        setFileName(newfilec.value);
                      }}
                />
              </Grid>
              <Grid item xs={8}>
                <Button sx={{ mr: 4 }} variant="contained" className="buttonStyle" onClick={()=>handlePerms()}>
                  Grant Access
                </Button>
                <Button sx={{ mr: 4 }} variant="contained" className="buttonStyle" onClick={()=>handleFetch()}>
                  Fetch File
                </Button>
              </Grid>
              <Grid item xs={8}>
                <br/>
                <strong>File Contents</strong>
                <p>{content}</p>
                  <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder='Edit me with text to write to file'
                        onChange={event => {
                          const newvalue = event.target;
                          setNewContent(newvalue.value);
                        }}
                        style={{ width: 300, height: 150 }}
                  />
              </Grid>
              <Grid item xs={8}>
                <Button sx={{ mr: 4 }} variant="contained" className="buttonStyle" onClick={()=>handleWrite()}>
                    Update File
                </Button>
              </Grid>
            </Grid>
          </div>
        );
}


