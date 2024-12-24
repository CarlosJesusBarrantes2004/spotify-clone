import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { AddAlbum, AddSong, ListAlbum, ListSong } from './pages';
import NavBar from './components/NavBar';

export const url = 'http://localhost:3000/api';

const App = () => {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer></ToastContainer>
      <Sidebar></Sidebar>
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <NavBar></NavBar>
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/add-song" element={<AddSong></AddSong>}></Route>
            <Route path="/add-album" element={<AddAlbum></AddAlbum>}></Route>
            <Route path="/list-song" element={<ListSong></ListSong>}></Route>
            <Route path="/list-album" element={<ListAlbum></ListAlbum>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
