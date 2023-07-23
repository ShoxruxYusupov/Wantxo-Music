import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { tracks } from "../assets/constants";

const DetailsHeader = ({ song }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, baza: tracks, i: 0 }));
    dispatch(playPause(true));
  };

  return (
    <div className={`relative w-full flex items-center p-4 bg-red-600 mb-4 rounded-full megaGradient ${isPlaying && 'activeGradient'}`}>
      <div>
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          song={song}
        />
      </div>
    </div>
  );
};

export default DetailsHeader;
