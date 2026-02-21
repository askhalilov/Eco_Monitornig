import { useEffect, useState } from 'react';
import { Leaf, Wind, Droplets } from 'lucide-react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Инициализация системы');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const textMessages = [
      'Инициализация системы',
      'Подключение датчиков',
      'Загрузка данных мониторинга',
      'Синхронизация оборудования',
      'Проверка соединения',
      'Готово к работе',
    ];

    let messageIndex = 0;
    const textInterval = setInterval(() => {
      if (messageIndex < textMessages.length - 1) {
        messageIndex++;
        setLoadingText(textMessages[messageIndex]);
      }
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-300 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-40 w-40 h-40 bg-green-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-teal-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Logo and icons */}
        <div className="relative mb-8">
          {/* Main icon container */}
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            {/* Pulsing background circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full animate-pulse-green opacity-20" />
            
            {/* Main circle */}
            <div className="absolute inset-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
              <Leaf className="text-white w-12 h-12 md:w-16 md:h-16 animate-float" />
            </div>

            {/* Orbiting icons */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Wind className="text-white w-5 h-5" />
              </div>
            </div>

            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Droplets className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
            ЭкоМониторинг
          </h1>
          <p className="text-emerald-700 text-sm md:text-base font-medium">
            Система контроля качества окружающей среды
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs md:max-w-md mb-6">
          <div className="relative h-2 bg-emerald-100 rounded-full overflow-hidden shadow-inner">
            {/* Animated shimmer effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              style={{
                animation: 'shimmer 2s infinite',
                backgroundSize: '1000px 100%',
              }}
            />
            
            {/* Progress fill */}
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 blur-sm opacity-50" />
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs md:text-sm text-emerald-600 font-medium animate-pulse-green">
              {loadingText}
            </span>
            <span className="text-xs md:text-sm font-semibold text-emerald-700">
              {progress}%
            </span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Bottom nature elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-100/30 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
