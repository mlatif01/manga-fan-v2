import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import postManga from '../api/postManga';
import deleteManga from '../api/deleteManga';
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

  Modal.setAppElement('#root');

  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await postManga(newManga, authState);
    // update Manga parent view
    closeModal();
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

  function handleChange(e) {
    setNewManga(e.target.value);
  }

  function handleRead(mangaObj) {
    toggleIsReading(mangaObj);
  }

  return (
    <React.Fragment>
      <table className='table'>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Release Year</th>
            <th>Latest Chapter</th>
            <th>Last Read</th>
            <th className='add-manga-th'>
              <button
                onClick={openModal}
                className='btn btn-md btn-success add-manga'
                data-open='manga-modal'
              >
                <i className='fas fa-plus'></i>
              </button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Add Manga Modal'
              >
                <div className='add-modal-content'>
                  <button
                    onClick={closeModal}
                    className='btn btn-md btn-danger'
                  >
                    <i className='fas fa-window-close'></i>
                  </button>
                  <h1>Add Manga</h1>
                  <form onSubmit={handleSubmit}>
                    <input type='text' onChange={handleChange} />
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
              <td>{manga.author}</td>
              <td
                className='manga-title'
                onClick={() => handleRead(mangas[index])}
              >
                {manga.title}
              </td>
              <td>{manga.releaseYear}</td>
              <td>{manga.latestChapter}</td>
              <td onClick={() => console.log('EDIT')} className='last-read'>
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
