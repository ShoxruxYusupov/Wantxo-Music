import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { Link } from 'react-router-dom';
import PlayPause from './PlayPause';
import { Discover } from '../pages';
import { DisplayOption } from './DisplayOption/DisplayOption';
import SongCard from './SongCard';
import { useMatchMedia } from '../hooks/use-match-media';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

export const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick
}) => (
  <div
    className={`w-full flex flex-row items-center hoverCard ${
      isPlaying && activeSong?.name === song.name && 'hsl'
    } sm:py-2 py-1 p-4 sm:rounded-lg rounded-none cursor-pointer mb-2`}
    onClick={(event) => {
      if (event.target.tagName === 'P') {
        return; // прекратить выполнение обработчика onClick
      }

      // остальная логика обработчика onClick
      if (isPlaying && activeSong?.name === song.name) {
        handlePauseClick();
      } else {
        handlePlayClick();
      }
    }}
  >
    <h3 className="text-sm text-gray font-normal mr-3 ">{i + 1}</h3>
    <img
      src={song.image}
      alt="name"
      className="h-14 w-14 rounded-lg object-cover"
    />
    <div className="flex-1 flex flex-col juctify-center mx-3">
      <Link
        to={`/songs/${song.id - 2}`}
        className="w-fit"
      >
        <p className="text-base font-medium text-white">{song.name}</p>
      </Link>
      <p className="text-sm font-normal text-gray mt-1 w-fit">{song.author}</p>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePauseClick={handlePauseClick}
      handlePlayClick={handlePlayClick}
      song={song}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();

  const { activeSong, isPlaying, display } = useSelector(
    (state) => state.player
  );

  const { data } = useGetTopChartsQuery();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, baza: data, i }));
    dispatch(playPause(true));
  };

  const [isMobile] = useMatchMedia();

  return (
    <>
      <div className="relative sm:pt-10 top-0 h-fit flex-1 flex justify-center">
        <Discover tracks={data} />
      </div>
      <div className="flex flex-col sm:flex-[4] flex-1">
        <div className="w-full flex flex-col">
          <div className="w-full pt-10 pb-4 px-4 sm:pl-0 flex justify-between">
            <h2 className="text-white font-bold text-2xl">Дискография</h2>
            <DisplayOption />
          </div>

          <div
            className={
              display === 1
                ? `mt-4 flex flex-col gap-1 flex-wrap`
                : `grid gap-y-4 gap-x-4 px-2 ${
                    isMobile ? 'grid-cols-2' : 'grid-cols-4'
                  }`
            }
          >
            {data?.map((item, i) => {
              if (display === 1) {
                return (
                  <TopChartCard
                    key={item.id}
                    song={item}
                    i={i}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    handlePauseClick={handlePauseClick}
                    handlePlayClick={() => handlePlayClick(item, i)}
                  />
                );
              } else {
                return (
                  <SongCard
                    key={item.id}
                    song={item}
                    i={i}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    baza={data}
                    last={false}
                    type={true}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopPlay;
