import { useState, useEffect } from "react";
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
}));

function ShowAlbumImages({albumId}){
    const classes = useStyles();
    const [albumImages, setAlbumImages] = useState(null);

    
    useEffect(() => {
        const fetchAlbumImages = async () => {
            console.log(albumId)
            axios.get(`http://localhost:4000/album/get-album-images/${albumId}`)
                .then(response => setAlbumImages(response.data)
                )
                .catch(err =>console.log(err))       
        }
        
        fetchAlbumImages()
    }, [])

    return (
        <div>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">List Images of this Album</ListSubheader>
            </GridListTile>
             <GridList cellHeight={180} className={classes.gridList}>
                    {albumImages && albumImages.images.map((tile, id) => (
                    <GridListTile key={id}>
                        <img src={`http://localhost:4000/${tile.imageName}`} alt={tile.imageName} />
                        <GridListTileBar
                        title={"ImageName: " + tile.actualName}
                        />
                    </GridListTile>
                    ))}
                </GridList>
              {/* {
                  albumImages && albumImages.images.map(item => {
                     return  ( 
                        <div>
                            <img style = {{height: "14rem"}} src = {`http://localhost:4000/${item.imageName}`} alt = "image file"/>
                            <p>{item.actualName}</p>
                        </div>
                      )
                  })
              } */}
        </div>
    )
}

export default ShowAlbumImages;