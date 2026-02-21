import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="glass-effect rounded-2xl border border-emerald-100 p-8 md:p-12 shadow-lg text-center max-w-md">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <AlertCircle className="text-white" size={40} />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-emerald-800 mb-2">Страница не найдена</h2>
        <p className="text-emerald-600 mb-6 text-sm md:text-base">Запрашиваемая страница не существует</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-semibold text-sm md:text-base"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}