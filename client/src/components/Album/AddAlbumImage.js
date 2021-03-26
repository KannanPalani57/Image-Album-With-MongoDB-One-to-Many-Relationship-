import { useState } from "react";
import axios from "axios"
import ShowAlbumImages from "./ShowAlbumImages"

function AddAlbumImage(props){ 
    const [imageFile, setImageFile] = useState();
    const [albumId, setAlbumId] = useState();
    const [albumImageName, setAlbumImageName] = useState("");
    const [imageFileFormatErr, setImageFileFormatErr] = useState(false)
    const [imageNameEmptyErr, setImageNameEmptyErr] = useState("")


    const handleValidation = () => {
        let errors = {}
        let validForm = true;
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if(albumImageName === "" || albumImageName === null || albumImageName === undefined){
            validForm = false;
            setImageNameEmptyErr(true)
        }  
        if (imageFile && !allowedExtensions.exec(imageFile.name)) {
            validForm = false;
            setImageFileFormatErr(true)
            console.log(imageFileFormatErr)
            return false;
        }      

        return validForm;
    }

    const handleSubmit = e => {   
        e.preventDefault();   
        //   // Allowing file type
       
            var formData = new FormData();
            formData.append("imageName", imageFile);
            formData.append("actualName", albumImageName)
            axios({
                method:"post",
                url: `http://localhost:4000/album/add-image/${props.location.state.id}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(response => {            
                console.log(response,"gfhjgfh")
            }).catch(err => {
                console.log(err)
            })         
            
            window.location.reload();
    }       

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                    <label htmlFor = "imageName">Image Name</label>
                    <input type = "text" name = "albumImageName" value = {albumImageName} onChange = {e => setAlbumImageName(e.target.value)} />
                   <br />
                    <small style = {{color: "red"}}>{imageNameEmptyErr === true?"Image name should not be empty": ""}</small>
                    <br />
                    <label htmlFor = "imageName">Upload Image</label>
                    <input type="file" name="imageFile" onChange = {e => setImageFile(e.target.files[0])}multiple /><br/><br/>
                    <br />
                    <small style = {{color:"red"}}>{ imageFileFormatErr !== false? "\nImage file format should be JPG/PNG, Try to upload an Image": null }</small>
                    <input type = "submit" />
            </form>
            <ShowAlbumImages albumId = {props.location.state.id}/>
        </div>
    )
}

export default AddAlbumImage;


