import { useSelector } from 'react-redux';

import { MusicPlayer } from './components';
import { dollar } from './assets';
import { useState } from 'react';
import { Outlet } from 'react-router-dom/dist';
import { useGetTopChartsQuery } from './redux/services/shazamCore';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const [time, setTime] = useState(true);
  const [loader, setLoader] = useState(true);

  const { isLoading } = useGetTopChartsQuery();

  setTimeout(() => setLoader(false), 2000);

  if (!(isLoading || loader)) {
    setTimeout(() => setTime(false), 1000);
  }

  return (
    <>
      {isLoading || loader ? (
        <div className="body">
          <div className="wrapper">
            <span>W</span>
            <span>A</span>
            <span>N</span>
            <span>T</span>
            <span>X</span>
            <span>O</span>
          </div>
        </div>
      ) : (
        <div className="bg-main_bg relative">
          {time && (
            <span className="absolute sm:top-[-100%] sm:left-[-100%] w-[3000px] h-[1687px] lazer" />
          )}
          <header className="fixed z-[10000] w-screen left-0 right-0 top-0">
            <img
              src={dollar}
              className="w-full h-7 object-cover object-center"
              alt=""
            />
          </header>
          <div className="container h-screen overflow-y-scroll hide-scrollbar flex sm:flex-row flex-col">
            <div className="relative sm:top-10 top-[34px] h-fit sm:flex block w-full pb-20 gap-4">
              <Outlet />
            </div>
          </div>

          <div
            className={`fixed h-18 py-2 z-[10000] ${
              activeSong?.name ? 'bottom-0' : 'bottom-[-100%]'
            } left-0 right-0 flex bg-main_bg container`}
            style={{ transition: '0.5s' }}
          >
            <MusicPlayer />
          </div>
          <footer
            className={`fixed z-[10000] ${
              activeSong?.name ? 'bottom-[-100%]' : 'bottom-0'
            } w-screen left-0 right-0`}
            style={{ transition: '0.5s' }}
          >
            <img
              src={dollar}
              className="w-full h-[40px] object-cover object-center"
              alt=""
            />
          </footer>
        </div>
      )}
    </>
  );
};

export default App;
