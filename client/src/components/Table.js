import React from 'react';

export default function Table({ manga }) {
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
            <th>
              <button
                className='btn btn-sm btn-success open-modal'
                data-open='manga-modal'
              >
                <i className='fas fa-plus'></i>
              </button>
            </th>
          </tr>
          {manga.map((manga, index) => (
            <tr key={manga.mangaId}>
              <td onClick={() => console.log('READ')}>{manga.author}</td>
              <td onClick={() => console.log('READ')}>{manga.title}</td>
              <td onClick={() => console.log('READ')}>{manga.releaseYear}</td>
              <td onClick={() => console.log('READ')}>{manga.latestChapter}</td>
              <td onClick={() => console.log('EDIT')} className='last-read'>
                {manga.lastRead}
              </td>
              <td>
                <button
                  onClick={() => console.log('DELETE')}
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
