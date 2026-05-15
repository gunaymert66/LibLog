import React, { useState } from 'react';
import BookForm from '../Components/BookForm';
import BookCard from '../Components/BookCard';

function Dashboard() {
  const [books, setBooks] = useState([
    { id: "1", title: "Clean Code", author: "Robert C. Martin", totalPages: 464, currentPage: 120, rating: 4, status: "Okunuyor" },
    { id: "2", title: "Nutuk", author: "Mustafa Kemal Atatürk", totalPages: 600, currentPage: 600, rating: 5, status: "Okundu" },
    { id: "3", title: "Dune", author: "Frank Herbert", totalPages: 700, currentPage: 0, rating: 0, status: "Okunacak" },
    { id: "4", title: "Simyacı", author: "Paulo Coelho", totalPages: 184, currentPage: 50, rating: 3, status: "Okunuyor" }
  ]);

  const handleAddBook = (newBook) => {
    setBooks([...books, { ...newBook, id: Date.now().toString() }]);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm("Bu kitabı kütüphanenizden kaldırmak istediğinize emin misiniz?")) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  const handleUpdateBook = (id, fields) => {
    setBooks(books.map(b => {
      if (b.id === id) {
        const updatedBook = { ...b, ...fields };
        if (updatedBook.currentPage >= updatedBook.totalPages) updatedBook.status = 'Okundu';
        else if (updatedBook.currentPage > 0 && updatedBook.currentPage < updatedBook.totalPages) updatedBook.status = 'Okunuyor';
        else if (updatedBook.currentPage === 0) updatedBook.status = 'Okunacak';
        return updatedBook;
      }
      return b;
    }));
  };

  const scrollToBook = (id) => {
    const cardElement = document.getElementById(`book-card-${id}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      cardElement.classList.add('scale-105', 'ring-4', 'ring-amber-500', 'shadow-2xl', 'z-10');
      setTimeout(() => {
        cardElement.classList.remove('scale-105', 'ring-4', 'ring-amber-500', 'shadow-2xl', 'z-10');
      }, 1200);
    }
  };

  const bookColors = [
    'from-red-700 to-red-900', 'from-blue-700 to-blue-900', 
    'from-green-700 to-green-900', 'from-orange-600 to-orange-800',
    'from-purple-700 to-purple-900', 'from-teal-700 to-teal-900',
    'from-slate-700 to-slate-900'
  ];

  const shelves = [
    { title: "📖 Okuduklarım", status: "Okunuyor" },
    { title: "⏳ Okunacaklar", status: "Okunacak" },
    { title: "✅ Bitirdiklerim", status: "Okundu" }
  ];

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-slate-900 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl border border-orange-100 shadow-sm font-sans">
          <h1 className="text-4xl font-black text-[#3e2723]">LibLog</h1>
          <div className="bg-[#3e2723] text-white px-8 py-3 rounded-2xl shadow-xl font-bold">
            {books.length} Kitap
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[380px,1fr] gap-12 font-sans">
          <div className="lg:col-span-1">
            <BookForm onAddBook={handleAddBook} />
          </div>

          <div className="lg:col-span-1 space-y-0">
            {/* 🪵 KİTAPLIK GÖVDESİ 🪵 */}
            <div className="flex flex-col bg-[#3e2723] p-4 rounded-xl shadow-2xl border-[12px] border-[#2d1b18]">
              {shelves.map((shelf) => {
                const shelfBooks = books.filter(b => b.status === shelf.status);
                
                return (
                  <div key={shelf.status} className="relative">
                    <div className="bg-[#2d1b18] min-h-[240px] relative flex items-end gap-2 px-4 pb-0 overflow-x-auto shadow-inner border-b-[20px] border-[#3e2723]">
                      
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                        <span className="text-white font-black text-4xl uppercase tracking-tighter">{shelf.title}</span>
                      </div>

                      {shelfBooks.map((book, index) => (
                        <div 
                          key={book.id}
                          onClick={() => scrollToBook(book.id)}
                          className={`relative z-10 w-16 h-52 bg-gradient-to-b ${bookColors[index % bookColors.length]} border-x border-white/10 rounded-t shadow-[5px_0_15px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer hover:-translate-y-4 transition-all duration-300`}
                        >
                          {/* 🎯 TAMAMI GÖZÜKEN YAZI 🎯 */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                            <span className="text-white font-[900] text-[13px] leading-none tracking-[1px] whitespace-nowrap -rotate-90 uppercase drop-shadow-[2px_2px_2px_rgba(0,0,0,1)] min-w-[200px] text-center">
                              {book.title}
                            </span>
                          </div>

                          <div className="absolute top-6 w-full h-[2px] bg-white/20"></div>
                          <div className="absolute bottom-6 w-full h-[2px] bg-white/20"></div>

                          {book.status === 'Okunuyor' && (
                            <div className="absolute -top-1 right-2 w-3 h-8 bg-amber-400 shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-12 grid grid-cols-1 xl:grid-cols-2 gap-6">
               {books.map((book) => (
                 <div key={book.id} id={`book-card-${book.id}`} className="transition-all duration-500 rounded-3xl">
                   <BookCard book={book} onUpdate={handleUpdateBook} onDelete={handleDeleteBook} />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;