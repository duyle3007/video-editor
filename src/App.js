import { useEffect, useRef, useState } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import "./App.css";
import VideoEditor from "./VideoEditor/VideoEditor";

function App() {
  const [ready, setReady] = useState(false);

  //Ref to handle the current instance of ffmpeg when loaded
  const ffmpeg = useRef(null);

  //Function handling loading in ffmpeg
  const load = async () => {
    try {
      await ffmpeg.current.load();

      setReady(true);
    } catch (error) {
      console.log(error);
    }
  };

  //Loading in ffmpeg when this component renders
  useEffect(() => {
    ffmpeg.current = createFFmpeg({
      log: true,
      corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    });
    load();
    console.log("hereee");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <VideoEditor ready={ready} ffmpeg={ffmpeg} />
    </div>
  );
}

export default App;
