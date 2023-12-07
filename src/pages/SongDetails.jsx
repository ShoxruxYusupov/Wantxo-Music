import { useParams } from 'react-router-dom';
import DetailsHeader from '../components/DetailsHeader';
import { useRef } from 'react';
import Discover from './Discover';
import { useMatchMedia } from '../hooks/use-match-media';
import { tracks } from '../constants/constants';

const SongDetails = () => {
  const divRef = useRef(null);
  const { songid } = useParams();

  let data = tracks;

  const song = data?.[songid - 1];

  const [isMobile] = useMatchMedia();

  return (
    <>
      <div className="relative sm:pt-10 top-0 h-fit flex-1 flex justify-center">
        <Discover
          id={songid}
          tracks={data}
        />
      </div>
      <div
        className="flex flex-col sm:pt-10 pt-3 pl-4 sm:pl-0 flex-[4]"
        ref={divRef}
      >
        {!isMobile && (
          <DetailsHeader
            song={song}
            tracks={data}
          />
        )}

        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div
          className="mt-5 text-white sm:text-base text-lg my-1"
          dangerouslySetInnerHTML={{
            __html: `${song?.lyrics}`
          }}
        />
      </div>
    </>
  );
};

export default SongDetails;
