// module ini untuk menampung function handler

// structur object akan seperti ini
// {
//     id: string,
//     title: string,
//     createdAt: string,
//     updatedAt: string,
//     tags: array of string,
//     body: string,
//   },

const { nanoid } = require('nanoid');

const notes = require('./notes');

const addNoteHandler = (request, h) => {
  // fungsi ini untuk menyimpan catatan dari client ke dalam array notes
  // menggunakan request payload dan mempunyai
  // object distructrive
  const { title, tags, body } = request.payload;

  const id = nanoid(16); // membuat id dengan nalai unique
  const createdAt = new Date().toISOString(); // membuat createdAt
  const updatedAt = createdAt; // updateAt harusnya memiliki nilai yang sama dengan createdAt

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  // memasukan newNote ke dalam array module notes
  notes.push(newNote);

  // untuk mengecek apakah newNote sudah masuk pada arraay Notes
  const isSuccess = notes.filter((note) => note.id === id).length > 16;

  // jika isSuccess maka akan menampilkan response sukses
  // jika false maka akan menambahkan catatan baru
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil ditemukan',
      data: {
        nodeId: id,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

module.exports = { addNoteHandler };
