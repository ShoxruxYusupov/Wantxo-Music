import { useState } from 'react';
import { BsDownload, BsShare, BsShareFill } from 'react-icons/bs';
import { HiOutlineHeart } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { newSong } from '../assets';
import { useMatchMedia } from '../hooks/use-match-media';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import PlayPause from './PlayPause';

const Last = ({
  isPlaying,
  activeSong,
  song,
  handlePauseClick,
  handlePlayClick
}) => (
  <>
    {isPlaying && activeSong?.name === song?.name ? (
      <div
        className={`absolute inset-0 justify-center items-center flex bg-black bg-opacity-70 cursor-pointer`}
        onClick={handlePauseClick}
      >
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
        />
      </div>
    ) : (
      <div
        className={`absolute inset-0 justify-center hidden items-center bg-black bg-opacity-50 group-hover:flex cursor-pointer`}
        onClick={handlePlayClick}
      >
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
        />
      </div>
    )}
  </>
);

const SongCard = ({ song, i, isPlaying, activeSong, baza, last, type }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(playPause(true));
    dispatch(setActiveSong({ song, baza, i }));
  };

  const [isMobile] = useMatchMedia();

  const [copied, setCopied] = useState(false);

  const handleCopy = (copy) => {
    navigator.clipboard.writeText(copy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1700);
  };

  const { songid } = useParams();

  return (
    <div
      className={`relative flex flex-col sm:w-[250px] w-full sm:p-4 p-0 ${
        songid ? 'pb-24' : 'pb-9'
      } ${type && 'pb-3'} bg-main_item_bg rounded-lg`}
    >
      {last && (
        <img
          src={newSong}
          className="sm:w-24 sm:h-24 w-32 h-32 absolute z-20 top-0 right-0"
        />
      )}
      {isMobile && !type && (
        <div
          className={`absolute inset-0 z-[49] bg-gradient-to-t from-main_bg ${
            songid && 'via-[#0a0a09aa]'
          } to-transparent`}
        />
      )}
      <div className="relative w-full sm:h-56 h-auto group">
        {(last || type) && (
          <Last
            isMobile={isMobile}
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        )}
        {isMobile && (
          <div
            className={`absolute z-50 ${
              !type
                ? 'bottom-[10%] left-[6%]'
                : 'bottom-[50%] left-[50%] transform translate-x-[-50%] translate-y-[50%]'
            }`}
          >
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
              size={!type ? 50 : 35}
              color="gold"
            />
          </div>
        )}
        <img
          src={song?.image}
          className={`w-full sm:h-full object-cover ${
            type ? 'h-[171px]' : 'h-[390px]'
          }`}
          alt="song_img"
        />
      </div>

      {last ? (
        <div
          className={`mt-4 flex sm:static absolute left-[6%] bottom-0 z-50 sm:text-center text-start flex-col`}
        >
          <Link to={`/songs/${song?.id - 2}`}>
            <p className={`font-semibold text-white text-2xl truncate`}>
              {song?.name}
            </p>
            <p className={`text-lg truncate text-gray mt-1`}>{song?.author}</p>
          </Link>
        </div>
      ) : (
        <div
          className={`mt-4 flex sm:static ${
            !type ? 'absolute' : 'static'
          } pl-[6%] sm:pl-0 w-full sm:w-auto bottom-0 z-50 text-start flex-col`}
        >
          <Link to={`/songs/${song?.id - 2}`}>
            <p
              className={`font-semibold text-white sm:text-lg text-2xl truncate`}
            >
              {song?.name}
            </p>
            <p className={`sm:text-sm text-lg truncate text-gray mt-1`}>
              {song?.author}
            </p>
          </Link>
          <div
            className={`py-4 items-center ${
              !type ? 'flex' : 'hidden'
            } justify-around`}
          >
            <a
              href={song?.song}
              download
            >
              <BsDownload
                size={25}
                color="white"
              />
            </a>
            <span
              onClick={() => handleCopy(`${window.location.href}`)}
              className="flex items-center relative cursor-pointer"
            >
              {copied ? (
                <>
                  <BsShareFill
                    size={25}
                    color="gold"
                  />
                  <span className="absolute left-[110%] animate-slideleft bg-slate-800 text-gray px-2 py-[2px] text-sm rounded-2xl">
                    Copied
                  </span>
                </>
              ) : (
                <BsShare
                  size={25}
                  color="white"
                />
              )}
            </span>
            <HiOutlineHeart
              size={30}
              color="white"
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SongCard;
