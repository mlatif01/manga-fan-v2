import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import postManga from '../api/postManga';
import editLastRead from '../api/editLastRead';
import deleteManga from '../api/deleteManga';
import Autocomplete from '../components/Autocomplete';

import { AuthContext } from '../App';

const INITIAL_STATE = {
  newManga: ''
};

export default function Table({
  mangas,
  triggerParentDispatch,
  toggleIsReading
}) {
  const { state: authState } = React.useContext(AuthContext);

  const customStyles = {
    content: {
      opacity: '0.9',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '50%',
      backgroundColor: '#ff8f00',
      borderRadius: '10px',
      transform: 'translate(-50%, -50%)'
    }
  };

  const [newManga, setNewManga] = useState('');
  const [lastRead, setLastRead] = useState(0);
  const [mangaId, setMangaId] = useState('');
  const [mangaList, setMangaList] = useState('');
  const [mangaListFetched, setMangaListFetched] = useState(false);

  const fetchMangaNames = () => {
    fetch('/api/manga-eden/names', {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    })
      .then(res => {
        return res.json();
      })
      .then(resJson => {
        console.log(resJson);
        setMangaList(resJson);
        setMangaListFetched(true);
      });
  };

  // Fetch all manga names for adding mangas to the table
  useEffect(() => {
    fetchMangaNames();
  }, []);

  Modal.setAppElement('#root');

  var subtitle;
  const [mangaModalIsOpen, setMangaIsOpen] = React.useState(false);
  const [lastReadModalIsOpen, setLastReadIsOpen] = React.useState(false);
  function openMangaModal() {
    setMangaIsOpen(true);
  }

  function openLastReadModal(mangaId) {
    setMangaId(mangaId);
    setLastReadIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed
    // subtitle.style.color = '#f00';
  }

  function closeMangaModal() {
    setMangaIsOpen(false);
  }

  function closeLastReadModal() {
    setLastReadIsOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    closeMangaModal();
    await postManga(newManga, authState);
    // update Manga parent view
    triggerParentDispatch();
  }

  async function handleDelete(mangaId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this entry?'
    );
    if (confirmed) {
      await deleteManga(mangaId, authState);
      triggerParentDispatch();
    }
  }

  function handleMangaChange(e) {
    setNewManga(e.target.value);
  }

  function handleLastReadChange(e) {
    setLastRead(e.target.value);
  }

  async function handleLastReadSubmit(e) {
    e.preventDefault();
    await editLastRead(lastRead, mangaId, authState);
    // // update parent view (Manga)
    closeLastReadModal();
    triggerParentDispatch();
  }
  function handleRead(mangaObj) {
    toggleIsReading(mangaObj);
  }

  function triggerNewMangaUpdate(mangaTitle) {
    setNewManga(mangaTitle);
  }

  return (
    <React.Fragment>
      <table className='table'>
        <thead>
          <tr>
            <th className='hide-sm'>Author</th>
            <th>Title</th>
            <th className='hide-sm'>Release Year</th>
            <th>Latest Chapter</th>
            <th>Last Read</th>
            <th className='add-manga-th'>
              <button
                onClick={openMangaModal}
                className='btn btn-md btn-success add-manga'
                data-open='manga-modal'
              >
                <i className='fas fa-plus'></i>
              </button>
              <Modal
                isOpen={mangaModalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeMangaModal}
                style={customStyles}
                contentLabel='Add Manga Modal'
              >
                <div className='modal-content'>
                  <button
                    onClick={closeMangaModal}
                    className='btn btn-md btn-danger'
                  >
                    <i className='fas fa-window-close'></i>
                  </button>
                  <h1>Add Manga Title</h1>
                  <form onSubmit={handleSubmit}>
                    {/* <input
                      placeholder='Add a manga to your list'
                      type='text'
                      onChange={handleMangaChange}
                      onChange={filterManga}
                    /> */}

                    {mangaListFetched ? (
                      <Autocomplete
                        suggestions={mangaList}
                        triggerNewMangaUpdate={triggerNewMangaUpdate}
                      />
                    ) : (
                      <h2 style={{ marginBottom: '1rem' }}>
                        {' '}
                        Please wait... Fetching Manga List
                      </h2>
                    )}

                    <button className='btn btn-md btn-success'>
                      <i className='fas fa-plus-square'></i>
                    </button>
                  </form>
                </div>
              </Modal>
              <Modal
                isOpen={lastReadModalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeLastReadModal}
                style={customStyles}
                contentLabel='Edit Last Read Modal'
              >
                <div className='modal-content'>
                  <button
                    onClick={closeLastReadModal}
                    className='btn btn-md btn-danger'
                  >
                    <i className='fas fa-window-close'></i>
                  </button>
                  <h1>Edit Last Read</h1>
                  <form onSubmit={handleLastReadSubmit}>
                    <input type='number' onChange={handleLastReadChange} />
                    <button className='btn btn-md btn-success'>
                      <i className='fas fa-plus-square'></i>
                    </button>
                  </form>
                </div>
              </Modal>
            </th>
          </tr>
          {mangas.map((manga, index) => (
            <tr key={index} id={manga._id}>
              <td className='hide-sm'>{manga.author}</td>
              <td
                className='manga-title'
                onClick={() => handleRead(mangas[index])}
              >
                {manga.title}
              </td>
              <td className='hide-sm'>{manga.releaseYear}</td>
              <td>{manga.latestChapter}</td>
              <td
                onClick={() => openLastReadModal(manga._id)}
                className='last-read'
              >
                {manga.lastRead}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(manga._id)}
                  className='btn delete-manga'
                  data-open='manga-modal'
                >
                  <i className='fas fa-minus'></i>
                </button>
              </td>
            </tr>
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </React.Fragment>
  );
}
