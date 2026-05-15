import React from 'react';

function BookCard({ book, onUpdate, onDelete }) {
  // Yüzde hesaplama
  const percentage = book.totalPages > 0 
    ? Math.round((book.currentPage / book.totalPages) * 100) 
    : 0;

  // Hızlı butonlar için sayfa güncelleme mantığı
  const handlePageChange = (amount) => {
    const newPage = book.currentPage + amount;
    if (newPage >= 0 && newPage <= book.totalPages) {
      onUpdate(book.id, { currentPage: newPage });
    } else if (newPage > book.totalPages) {
      // Sınırı aşarsa son sayfaya sabitle
      onUpdate(book.id, { currentPage: book.totalPages });
    } else if (newPage < 0) {
      // 0'ın altına düşmesini engelle
      onUpdate(book.id, { currentPage: 0 });
    }
  };

  return (
    <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out group flex flex-col justify-between">
      
      {/* Üst Kısım: Başlık, Durum ve Yıldızlar */}
      <div>
        <div className="flex justify-between items-start gap-3 mb-1.5">
          <h3 className="font-extrabold text-xl text-slate-950 line-clamp-1 leading-tight">{book.title}</h3>
          <span className={`text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap ${
            book.status === 'Okundu' ? 'bg-green-100 text-green-800' :
            book.status === 'Okunuyor' ? 'bg-amber-100 text-amber-900' : 
            'bg-slate-100 text-slate-700'
          }`}>
            {book.status}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-500 mb-4">-{book.author}</p>

        {/* Etkileşimli Yıldızlar */}
        <div className="flex space-x-1.5 my-3 bg-slate-50 p-2 rounded-xl border border-slate-100/50 w-fit">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-2xl transition-all hover:scale-125 ${
                star <= book.rating ? "text-amber-500" : "text-slate-200"
              }`}
              onClick={() => onUpdate(book.id, { rating: star })}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* İlerleme Paneli (Butonlar + Slider) */}
      <div className="mt-5 pt-5 border-t border-slate-100">
        <div className="flex flex-col gap-3">
          
          {/* Hızlı Güncelleme Butonları (5, 20, 50) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider w-full mb-1">Hızlı Güncelle:</span>
            
            {[5, 20, 50].map((val) => (
              <div key={val} className="flex items-center bg-slate-50 rounded-lg border border-slate-100 overflow-hidden">
                <button 
                  onClick={() => handlePageChange(-val)}
                  className="px-2 py-1 text-xs font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors border-r border-slate-100"
                >
                  -{val}
                </button>
                <button 
                  onClick={() => handlePageChange(val)}
                  className="px-2 py-1 text-xs font-bold text-slate-500 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  +{val}
                </button>
              </div>
            ))}
          </div>

          {/* Sayısal Değerler ve Yüzde */}
          <div className="flex justify-between items-end mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mevcut Durum</span>
              <span className="font-extrabold text-slate-800 text-sm">{book.currentPage} / {book.totalPages} sf.</span>
            </div>
            <span className="font-black text-blue-700 text-lg">%{percentage}</span>
          </div>
          
          {/* Sürüklenebilir İlerleme Çubuğu (Range Slider) */}
          <div className="w-full relative mt-1">
            <input 
              type="range" 
              min="0" 
              max={book.totalPages || 100} 
              value={book.currentPage}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                onUpdate(book.id, { currentPage: newValue });
              }}
              className="w-full h-2.5 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all shadow-inner focus:outline-none"
              style={{
                background: `linear-gradient(to right, ${percentage === 100 ? '#22c55e' : '#2563eb'} ${percentage}%, #e2e8f0 ${percentage}%)`
              }}
            />
          </div>
          
        </div>
      </div>

      {/* Silme Butonu */}
      <button 
        onClick={() => onDelete(book.id)} 
        className="text-xs text-red-400 hover:text-red-700 font-bold transition-colors mt-5 flex items-center space-x-1 self-end bg-red-50 px-3 py-1 rounded-full border border-red-100/50"
      >
        <span>🗑️</span> <span>Kitaplıktan Kaldır</span>
      </button>
      
    </div>
  );
}

export default BookCard;