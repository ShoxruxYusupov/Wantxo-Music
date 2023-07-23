import { SongCard } from '../components';
import { useSelector } from 'react-redux';

const Discover = ({ id, tracks }) => {
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  let last = tracks?.[tracks.length - 1];

  return (
    <>
      {id ? (
        <SongCard
          key={tracks?.[id - 1].id}
          song={tracks?.[id - 1]}
          i={0}
          isPlaying={isPlaying}
          activeSong={activeSong}
          baza={tracks}
          last={false}
        />
      ) : (
        <SongCard
          key={last?.id}
          song={last}
          i={0}
          isPlaying={isPlaying}
          activeSong={activeSong}
          baza={tracks}
          last={true}
        />
      )}
    </>
  );
};

export default Discover;
