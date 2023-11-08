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
    id, title, tags, body, createdAt, updatedAt,
  };

  // memasukan newNote ke dalam array module notes
  notes.push(newNote);

  // untuk mengecek apakah newNote sudah masuk pada arraay Notes
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  // jika isSuccess maka akan menampilkan response sukses
  // jika false maka akan menambahkan catatan baru
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditemukan',
      data: {
        nodeId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Fungsi ini untuk menampilkan semua catatan
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// fungsi ini untuk menampilkan secara detail note berdasarkan id
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  // melakukan filter dari object data id dan mengambil id index pertama
  const note = notes.filter((n) => n.id === id)[0];

  // untuk memastikan objek tidak bernilai undefined,
  // jika bernila undefined maka akan mengembalikan respon gagal
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  // ini jika gagal
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

// fungsi ini untuk mengedit catatan berdasarkan id
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  // mencari id menggunakan method dari array findIndex()
  // dan mengambil nomor indexnya
  const index = notes.findIndex((note) => note.id === id);

  // Jika note dengan id yang dicari ditemukan, maka index akan bernilai array index
  // dari objek catatan yang dicari. Tapi jika tidak ditemukan, maka index bernilai -1
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
} 

// fungsi ini untuk menghapus note berdasarkan id
const deleteNoteByIdHandler = (request, h) => {

  const { id } = request.params;

  // mencari imdex id menggunakan findIndex()
  const index = notes.findIndex((note) => note.id === id);

  // menghapus data pada array berdasarkan index, menggunakan method array splice()
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;

}

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };