import {createRoot} from "react-dom/client";
import {App} from "./app/App";
import "./index.css";

// YaGames.init().then(ysdk => {
//     console.log('Yandex SDK initialized');
//     window.ysdk = ysdk
//     ysdk.features.LoadingAPI.ready()

//     const rootNode = document.getElementById('root')!
//     const app = createRoot(rootNode)
//     app.render(<App/>)
// })

const rootNode = document.getElementById("root")!;
const app = createRoot(rootNode);
app.render(<App />);
