import { useState } from "react";
import AlbumList from "./AlbumList";
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormHelperText } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '20ch',
    },
    },
    alert: {
        width: '100%',  
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },  
    textField: {
        width: 200,
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    submitBtn: {
        width: "5rem",
        height: "2rem",
        marginTop: "-1.5rem"
    },
    fileInput: {
        marginTop: "0.6em"
    }
  }));

function Album(){
    const classes = useStyles();

    const [imageFile, setImageFile] = useState(null);
    const [albumName, setAlbumName] = useState("")
    const [errMessage, setErrMessage] = useState(false);
    const [albumAlreadyExistErr, setAlbumAlreadyExistErr] = useState(false)
    const [emptyAlbumNameErr, setEmptyAlbumNameErr] = useState(false);


    const handleSubmit = e => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("albumImage", imageFile);
        formData.append("albumName", albumName)
        setErrMessage(false)
        setAlbumAlreadyExistErr(false)
        setEmptyAlbumNameErr(false)
        axios({
            method:"post",
            url: "http://localhost:4000/album/add-album",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(response => {
            // if(response.data.message = "Please give a album name"){
            //     console.log("hello")
            //     setEmptyAlbumNameErr(true)
            // }
            if(response.data.message === "Try to upload appropriate image"){
                setErrMessage(true)
            }
            if(response.data.message === "album name already exist"){
                setAlbumAlreadyExistErr(true)
            }
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
        window.location.reload();
    }       


    return (
        <div className="App">
            <div className="container" style={{display: 'flex',  justifyContent:'center'}}>
                <form className = {classes.form} onSubmit = {handleSubmit}>
                    <h2>Add an Album</h2>
                    <label  htmlFor = "albumName">Album Name</label>
                    <br />
                    <TextField className = {classes.textField} id="outlined-basic" value = {albumName}onChange = {e => setAlbumName(e.target.value)} size = "small" label= "Album Name" variant="outlined" />
                    <br />
                    <label for="files">Album Image</label>
                    <input className = {classes.fileInput} type="file" id="files" name="files" onChange = {e => setImageFile(e.target.files[0])}multiple /><br/><br/>
                    <input className = {classes.submitBtn} type="submit" />
                    {  errMessage && 
                        <div className={classes.alert}>
                          <Alert severity="error">Try to upload an Image file(Allowed formats: JPG/PNG/JPEG)</Alert>
                        </div>
                    }
                      {  albumAlreadyExistErr && 
                        <div className={classes.alert}>
                           <Alert severity="error">Album name already exist, Try with different Album name</Alert>
                        </div>
                    }
                    {
                        emptyAlbumNameErr && 
                            <div className={classes.alert}>
                               <Alert severity="error">Album should not be empty</Alert>
                             </div>
                    }
                </form>
            </div>
                
                <AlbumList />
        </div>
    )
}

export default Album;