import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  song,
  size,
  color,
}) =>
  isPlaying && activeSong?.name === song.name ? (
    <FaPauseCircle
      size={!size ? 35 : size}
      color={!color ? "white" : color}
      className="text-gray-300 cursor-pointer"
      onClick={handlePauseClick}
    />
  ) : (
    <FaPlayCircle
      size={!size ? 35 : size}
      color={!color ? "white" : color}
      className="text-gray-300 cursor-pointer"
      onClick={handlePlayClick}
    />
  );

export default PlayPause;
