import React, { useState } from 'react';

function BookForm({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [status, setStatus] = useState('Okunacak');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !totalPages) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }
    onAddBook({ title, author, totalPages: parseInt(totalPages, 10), currentPage: status === 'Okundu' ? parseInt(totalPages, 10) : 0, rating: 0, status });
    setTitle(''); setAuthor(''); setTotalPages(''); setStatus('Okunacak');
  };

  const inputStyle = "w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-8 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-3xl shadow-xl">
      <h3 className="text-xl font-extrabold text-slate-950 mb-3 flex items-center gap-2">
        <span className="text-blue-600">⚡</span> Yeni Kitap Ekle
      </h3>
      
      {[ {label: 'Kitap Adı', value: title, setter: setTitle, placeholder: 'Örn: Clean Code'},
         {label: 'Yazar', value: author, setter: setAuthor, placeholder: 'Örn: Robert C. Martin'},
         {label: 'Toplam Sayfa', value: totalPages, setter: setTotalPages, placeholder: 'Örn: 464', type: 'number'}
      ].map(field => (
        <div key={field.label}>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 ml-1">{field.label}</label>
          <input {...field} onChange={e => field.setter(e.target.value)} className={inputStyle} />
        </div>
      ))}

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 ml-1">Okuma Durumu</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className={`${inputStyle} cursor-pointer`}>
          <option value="Okunacak">Okunacak</option>
          <option value="Okunuyor">Okunuyor</option>
          <option value="Okundu">Okundu</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-amber-900 hover:bg-amber-950 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-amber-900 mt-2">
        Kitaplığıma Ekle
      </button>
    </form>
  );
}

export default BookForm;