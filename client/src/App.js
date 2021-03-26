import { Switch,
  Route
} from "react-router-dom";
import Album from "./components/Album/Album"
import AddAlbumImage from "./components/Album/AddAlbumImage"


function App() {
  return (
    <section>
      <Switch>
        <Route exact path = "/" render = {() => <Album />} />
        <Route exact path = "/add-album-image" render = {props => <AddAlbumImage {...props} />} />
        
      </Switch>
    </section>
  );
}

export default App;
