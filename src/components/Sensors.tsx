import { useState } from 'react';
import { Gauge, MapPin, Calendar, TrendingUp, Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sensorsData = [
  {
    id: 1,
    name: 'Датчик CO₂ #1',
    type: 'CO₂',
    location: 'Цех А, зона 1',
    status: 'active',
    value: 348,
    unit: 'мг/м³',
    limit: 400,
    lastCalibration: '15.01.2026',
    nextCalibration: '15.04.2026',
  },
  {
    id: 2,
    name: 'Датчик SO₂ #2',
    type: 'SO₂',
    location: 'Цех Б, зона 3',
    status: 'active',
    value: 52,
    unit: 'мкг/м³',
    limit: 70,
    lastCalibration: '20.01.2026',
    nextCalibration: '20.04.2026',
  },
  {
    id: 3,
    name: 'Датчик NOₓ #3',
    type: 'NOₓ',
    location: 'Выхлопная труба #1',
    status: 'warning',
    value: 65,
    unit: 'мкг/м³',
    limit: 50,
    lastCalibration: '10.01.2026',
    nextCalibration: '10.04.2026',
  },
  {
    id: 4,
    name: 'Датчик PM2.5 #4',
    type: 'PM2.5',
    location: 'Склад материалов',
    status: 'active',
    value: 31,
    unit: 'мкг/м³',
    limit: 45,
    lastCalibration: '25.01.2026',
    nextCalibration: '25.04.2026',
  },
  {
    id: 5,
    name: 'Датчик температуры #5',
    type: 'Температура',
    location: 'Цех А, зона 2',
    status: 'error',
    value: 0,
    unit: '°C',
    limit: 50,
    lastCalibration: '05.01.2026',
    nextCalibration: '05.04.2026',
  },
  {
    id: 6,
    name: 'Датчик CO₂ #6',
    type: 'CO₂',
    location: 'Цех В, зона 5',
    status: 'active',
    value: 312,
    unit: 'мг/м³',
    limit: 400,
    lastCalibration: '18.01.2026',
    nextCalibration: '18.04.2026',
  },
];

const generateHistoryData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `${20 - i}m`,
    value: 30 + Math.random() * 40,
  }));
};

export function Sensors() {
  const [selectedSensor, setSelectedSensor] = useState(sensorsData[0]);
  const [historyData] = useState(generateHistoryData());

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          icon: CheckCircle,
          text: 'Активен',
          color: 'emerald',
          bg: 'bg-emerald-50',
          text_color: 'text-emerald-700',
          border: 'border-emerald-200',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          text: 'Предупреждение',
          color: 'amber',
          bg: 'bg-amber-50',
          text_color: 'text-amber-700',
          border: 'border-amber-200',
        };
      case 'error':
        return {
          icon: XCircle,
          text: 'Ошибка',
          color: 'red',
          bg: 'bg-red-50',
          text_color: 'text-red-700',
          border: 'border-red-200',
        };
      default:
        return {
          icon: Activity,
          text: 'Неизвестно',
          color: 'slate',
          bg: 'bg-slate-50',
          text_color: 'text-slate-700',
          border: 'border-slate-200',
        };
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Заголовок */}
      <div className="glass-effect rounded-2xl p-6 md:p-8 shadow-md border border-emerald-100">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-800">Мониторинг датчиков</h2>
        <p className="text-emerald-600 mt-2 text-base md:text-lg">Управление и контроль измерительных приборов</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Gauge className="text-white" size={20} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-emerald-600 font-medium mb-1">Всего датчиков</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-800">{sensorsData.length}</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <CheckCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-emerald-600 font-medium mb-1">Активные</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-800">
                {sensorsData.filter((s) => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
              <AlertTriangle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-emerald-600 font-medium mb-1">Предупреждения</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-800">
                {sensorsData.filter((s) => s.status === 'warning').length}
              </p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <XCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-emerald-600 font-medium mb-1">Ошибки</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-800">
                {sensorsData.filter((s) => s.status === 'error').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        {/* Список датчиков */}
        <div className="lg:col-span-1 glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md">
          <h3 className="font-bold text-emerald-800 mb-5 text-lg md:text-xl">Список датчиков</h3>
          <div className="space-y-3">
            {sensorsData.map((sensor) => {
              const statusConfig = getStatusConfig(sensor.status);
              const StatusIcon = statusConfig.icon;
              const isSelected = selectedSensor.id === sensor.id;

              return (
                <button
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor)}
                  className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-emerald-400 bg-gradient-to-r from-emerald-50 to-green-50 shadow-md transform scale-105'
                      : 'border-emerald-100 hover:bg-emerald-50 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-emerald-800 text-base md:text-lg truncate">{sensor.name}</p>
                      <p className="text-sm md:text-base text-emerald-600 mt-1.5 truncate">{sensor.location}</p>
                    </div>
                    <StatusIcon className={statusConfig.text_color} size={18} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-emerald-600 font-medium">{sensor.type}</span>
                    {sensor.status !== 'error' && (
                      <span className="font-mono text-sm md:text-base text-emerald-700 font-semibold">
                        {sensor.value} {sensor.unit}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Детали датчика */}
        <div className="lg:col-span-2 space-y-5 md:space-y-6">
          {/* Информация о датчике */}
          <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-5 md:mb-6 gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-emerald-800 text-xl md:text-2xl truncate">{selectedSensor.name}</h3>
                <p className="text-emerald-600 mt-2 text-base md:text-lg">{selectedSensor.type}</p>
              </div>
              {(() => {
                const statusConfig = getStatusConfig(selectedSensor.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <div
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl ${statusConfig.bg} ${statusConfig.border} border shadow-sm flex-shrink-0`}
                  >
                    <StatusIcon className={statusConfig.text_color} size={18} />
                    <span className={`text-sm md:text-base font-semibold ${statusConfig.text_color}`}>
                      {statusConfig.text}
                    </span>
                  </div>
                );
              })()}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-4 md:space-y-5">
                <div className="flex items-start gap-3 md:gap-4">
                  <MapPin className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm md:text-base text-emerald-600 font-medium mb-1">Расположение</p>
                    <p className="text-emerald-800 text-base md:text-lg font-semibold">{selectedSensor.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <TrendingUp className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm md:text-base text-emerald-600 font-medium mb-1">Текущее значение</p>
                    {selectedSensor.status !== 'error' ? (
                      <p className="text-emerald-800 font-mono text-base md:text-lg font-semibold">
                        {selectedSensor.value} {selectedSensor.unit}
                      </p>
                    ) : (
                      <p className="text-red-600 font-semibold text-base md:text-lg">Нет данных</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-5">
                <div className="flex items-start gap-3 md:gap-4">
                  <Activity className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm md:text-base text-emerald-600 font-medium mb-1">Предельное значение (ПДК)</p>
                    <p className="text-emerald-800 font-mono text-base md:text-lg font-semibold">
                      {selectedSensor.limit} {selectedSensor.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <Calendar className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm md:text-base text-emerald-600 font-medium mb-1">Последняя калибровка</p>
                    <p className="text-emerald-800 text-base md:text-lg font-semibold">{selectedSensor.lastCalibration}</p>
                  </div>
                </div>
              </div>
            </div>

            {selectedSensor.status !== 'error' && (
              <div className="mt-5 md:mt-6">
                <div className="flex justify-between text-sm md:text-base text-emerald-600 mb-2.5 font-medium">
                  <span>Загрузка</span>
                  <span>
                    {((selectedSensor.value / selectedSensor.limit) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-3 shadow-inner">
                  <div
                    className={`h-3 rounded-full transition-all shadow-md ${
                      selectedSensor.status === 'warning'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                        : 'bg-gradient-to-r from-emerald-500 to-green-600'
                    }`}
                    style={{
                      width: `${Math.min(
                        (selectedSensor.value / selectedSensor.limit) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* График истории */}
          <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md">
            <h3 className="font-bold text-emerald-800 mb-5 text-lg md:text-xl">
              История показаний (последние 20 минут)
            </h3>
            {selectedSensor.status !== 'error' ? (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={historyData}>
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
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    fill="url(#areaGradient)"
                    strokeWidth={2.5}
                  />
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[280px] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <div className="text-center p-6">
                  <XCircle className="text-red-400 mx-auto mb-3" size={48} />
                  <p className="text-emerald-800 font-semibold text-lg">Нет данных с датчика</p>
                  <p className="text-base text-emerald-600 mt-2">Проверьте подключение</p>
                </div>
              </div>
            )}
          </div>

          {/* Калибровка */}
          <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md">
            <h3 className="font-bold text-emerald-800 mb-5 text-lg md:text-xl">Информация о калибровке</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <p className="text-sm md:text-base text-emerald-600 mb-2 font-medium">Последняя калибровка</p>
                <p className="text-emerald-800 font-semibold text-base md:text-lg">{selectedSensor.lastCalibration}</p>
              </div>
              <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <p className="text-sm md:text-base text-emerald-600 mb-2 font-medium">Следующая калибровка</p>
                <p className="text-emerald-800 font-semibold text-base md:text-lg">{selectedSensor.nextCalibration}</p>
              </div>
            </div>
            <button className="mt-5 w-full px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-semibold text-base md:text-lg">
              Запланировать калибровку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}