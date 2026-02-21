import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Wind, Droplets, Thermometer, AlertCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';

// Mock данные для графиков
const generateEmissionData = () => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const hour = new Date(now.getTime() - (23 - i) * 3600000);
    return {
      time: `${hour.getHours()}:00`,
      co2: 320 + Math.random() * 80,
      so2: 45 + Math.random() * 25,
      nox: 38 + Math.random() * 20,
      pm25: 28 + Math.random() * 15,
    };
  });
};

const dailyEmissions = Array.from({ length: 7 }, (_, i) => ({
  day: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i],
  value: 2500 + Math.random() * 1000,
  limit: 3500,
}));

export function Dashboard() {
  const [emissionData, setEmissionData] = useState(generateEmissionData());
  const [currentValues, setCurrentValues] = useState({
    co2: 352,
    so2: 58,
    nox: 42,
    pm25: 35,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setEmissionData(generateEmissionData());
      setCurrentValues({
        co2: 320 + Math.random() * 80,
        so2: 45 + Math.random() * 25,
        nox: 38 + Math.random() * 20,
        pm25: 28 + Math.random() * 15,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: 'CO₂',
      value: currentValues.co2.toFixed(1),
      unit: 'мг/м³',
      limit: 400,
      icon: Wind,
      color: 'emerald',
    },
    {
      label: 'SO₂',
      value: currentValues.so2.toFixed(1),
      unit: 'мкг/м³',
      limit: 70,
      icon: Droplets,
      color: 'blue',
    },
    {
      label: 'NOₓ',
      value: currentValues.nox.toFixed(1),
      unit: 'мкг/м³',
      limit: 50,
      icon: Thermometer,
      color: 'amber',
    },
    {
      label: 'PM2.5',
      value: currentValues.pm25.toFixed(1),
      unit: 'мкг/м³',
      limit: 45,
      icon: AlertCircle,
      color: 'rose',
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Заголовок */}
      <div className="glass-effect rounded-2xl p-6 md:p-8 shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-800">Панель мониторинга</h2>
        <p className="text-emerald-600 mt-2 text-base md:text-lg">Контроль выбросов в реальном времени</p>
      </div>

      {/* Метрики в реальном времени */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const percentage = (parseFloat(metric.value) / metric.limit) * 100;
          const isWarning = percentage > 80;
          const isSuccess = percentage < 60;

          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover"
            >
              <div className="flex items-start justify-between mb-4 md:mb-5">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-${metric.color}-400 to-${metric.color}-600 flex items-center justify-center shadow-md`}>
                  <Icon className="text-white" size={24} />
                </div>
                {isWarning ? (
                  <span className="flex items-center gap-1.5 text-sm md:text-base text-red-600 font-semibold">
                    <TrendingUp size={16} />
                    {percentage.toFixed(0)}%
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm md:text-base text-emerald-600 font-semibold">
                    <TrendingDown size={16} />
                    {percentage.toFixed(0)}%
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm md:text-base text-emerald-600 font-medium mb-2">{metric.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-800">
                  {metric.value} <span className="text-base md:text-lg text-emerald-600">{metric.unit}</span>
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs md:text-sm text-emerald-600 mb-2">
                    <span>ПДК: {metric.limit} {metric.unit}</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all ${
                        isWarning ? 'bg-gradient-to-r from-red-500 to-red-600' : isSuccess ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-gradient-to-r from-amber-500 to-amber-600'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {/* График выбросов в реальном времени */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md"
        >
          <h3 className="font-bold text-emerald-800 mb-5 text-lg md:text-xl">Динамика выбросов (24 часа)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={emissionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="time" stroke="#059669" style={{ fontSize: '12px' }} />
              <YAxis stroke="#059669" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #6ee7b7',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  padding: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '16px' }} />
              <Line type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={2.5} name="CO₂" dot={false} />
              <Line type="monotone" dataKey="so2" stroke="#3b82f6" strokeWidth={2.5} name="SO₂" dot={false} />
              <Line type="monotone" dataKey="nox" stroke="#f59e0b" strokeWidth={2.5} name="NOₓ" dot={false} />
              <Line type="monotone" dataKey="pm25" stroke="#f43f5e" strokeWidth={2.5} name="PM2.5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* График недельных выбросов */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md"
        >
          <h3 className="font-bold text-emerald-800 mb-5 text-lg md:text-xl">Недельные выбросы (кг)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyEmissions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="day" stroke="#059669" style={{ fontSize: '12px' }} />
              <YAxis stroke="#059669" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #6ee7b7',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  padding: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '16px' }} />
              <Bar dataKey="value" fill="url(#colorGradient)" name="Фактические" radius={[8, 8, 0, 0]} />
              <Bar dataKey="limit" fill="#d1fae5" name="Лимит" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Статус системы и алерты */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md"
        >
          <h3 className="font-bold text-emerald-800 mb-5 text-lg md:text-xl">Статус датчиков</h3>
          <div className="space-y-3 md:space-y-4">
            {[
              { name: 'Датчик CO₂ #1', location: 'Цех А, зона 1', status: 'active', value: '348 мг/м³' },
              { name: 'Датчик SO₂ #2', location: 'Цех Б, зона 3', status: 'active', value: '52 мкг/м³' },
              { name: 'Датчик NOₓ #3', location: 'Выхлопная труба #1', status: 'warning', value: '65 мкг/м³' },
              { name: 'Датчик PM2.5 #4', location: 'Склад материалов', status: 'active', value: '31 мкг/м³' },
              { name: 'Датчик температуры #5', location: 'Цех А, зона 2', status: 'error', value: 'Нет связи' },
            ].map((sensor, i) => (
              <div key={i} className="flex items-center justify-between p-4 md:p-5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 shadow-lg ${
                      sensor.status === 'active'
                        ? 'bg-emerald-500 animate-pulse-green'
                        : sensor.status === 'warning'
                        ? 'bg-amber-500 animate-pulse'
                        : 'bg-red-500'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-emerald-800 text-base md:text-lg truncate">{sensor.name}</p>
                    <p className="text-sm md:text-base text-emerald-600 truncate mt-1">{sensor.location}</p>
                  </div>
                </div>
                <span className="text-emerald-700 font-mono text-sm md:text-base font-semibold ml-3 flex-shrink-0">{sensor.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md"
        >
          <h3 className="font-bold text-emerald-800 mb-5 text-lg md:text-xl">Последние события</h3>
          <div className="space-y-4">
            {[
              { type: 'warning', text: 'Превышение NOₓ на 30%', time: '14:23' },
              { type: 'error', text: 'Потеря связи с датчиком #5', time: '13:45' },
              { type: 'success', text: 'Система вернулась в норму', time: '12:18' },
              { type: 'info', text: 'Плановое обслуживание завершено', time: '10:30' },
            ].map((event, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
                    event.type === 'warning'
                      ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                      : event.type === 'error'
                      ? 'bg-gradient-to-br from-red-400 to-red-600'
                      : event.type === 'success'
                      ? 'bg-gradient-to-br from-emerald-400 to-green-600'
                      : 'bg-gradient-to-br from-blue-400 to-blue-600'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base text-emerald-800 font-medium">{event.text}</p>
                  <p className="text-xs md:text-sm text-emerald-600 mt-1.5">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}