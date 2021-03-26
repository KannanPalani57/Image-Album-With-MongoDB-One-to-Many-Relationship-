import { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
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

const AlbumList = () => {
    const classes = useStyles();
    const [albumList, setAlbumList] = useState([])
    
    useEffect(() => {
        const fetchAlbums = async () => {
            axios.get("http://localhost:4000/album/get-albums")
                .then(response => setAlbumList(response.data))
                .catch(err =>console.log(err))
        }
        fetchAlbums()
    }, [])
 
    return (
        <>
           <div className={classes.root}>
              <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Albums</ListSubheader>
                    </GridListTile>
                    {albumList && albumList.map((tile, id) => (
                    <GridListTile key={id}>
                        <img src={`http://localhost:4000/${tile.albumImage}`} alt={tile.imageName} />
                        <Link to= {
                            {
                                pathname: "/add-album-image",
                                state: {
                                    id: tile._id
                                }
                            }}>  
                        <GridListTileBar
                        title={"Album Name: " + tile.albumName}
                        />
                        </Link>
                    </GridListTile>
                    ))}
                </GridList>
            </div>
            </>
    )
}

export default AlbumList;


