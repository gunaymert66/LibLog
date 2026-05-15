// src/Interfaces/Book.js

// LibLog projesinde bir kitap nesnesinin sahip olacağı standart yapı:
export const BookSchema = {
  id: "string (benzersiz kimlik - benzersiz olması için Date.now() kullanacağız)",
  title: "string (Kitap Adı)",
  author: "string (Yazar Adı)",
  totalPages: "number (Toplam Sayfa Sayısı)",
  currentPage: "number (Okunan Güncel Sayfa Sayısı)",
  rating: "number (1-5 arası yıldız puanı)",
  status: "string ('Okunuyor', 'Okundu' veya 'Okunacak')"
};