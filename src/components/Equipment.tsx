import { useState } from 'react';
import { Settings, Power, Clock, TrendingUp, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Equipment {
  id: number;
  name: string;
  category: string;
  location: string;
  status: 'active' | 'idle' | 'maintenance' | 'error';
  power: number;
  efficiency: number;
  emissions: {
    co2: number;
    so2: number;
    nox: number;
  };
  workingHours: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

const equipmentData: Equipment[] = [
  {
    id: 1,
    name: 'Котельная установка №1',
    category: 'Котельное оборудование',
    location: 'Цех А',
    status: 'active',
    power: 85,
    efficiency: 92,
    emissions: {
      co2: 145,
      so2: 28,
      nox: 35,
    },
    workingHours: 8240,
    lastMaintenance: '10.12.2025',
    nextMaintenance: '10.03.2026',
  },
  {
    id: 2,
    name: 'Промышленная печь №2',
    category: 'Термическое оборудование',
    location: 'Цех Б',
    status: 'active',
    power: 92,
    efficiency: 88,
    emissions: {
      co2: 210,
      so2: 42,
      nox: 58,
    },
    workingHours: 6850,
    lastMaintenance: '15.01.2026',
    nextMaintenance: '15.04.2026',
  },
  {
    id: 3,
    name: 'Вентиляционная система №3',
    category: 'Вентиляционное оборудование',
    location: 'Цех А',
    status: 'idle',
    power: 0,
    efficiency: 95,
    emissions: {
      co2: 0,
      so2: 0,
      nox: 0,
    },
    workingHours: 12450,
    lastMaintenance: '20.01.2026',
    nextMaintenance: '20.04.2026',
  },
  {
    id: 4,
    name: 'Компрессорная станция №4',
    category: 'Компрессорное оборудование',
    location: 'Цех В',
    status: 'active',
    power: 78,
    efficiency: 85,
    emissions: {
      co2: 98,
      so2: 15,
      nox: 22,
    },
    workingHours: 9560,
    lastMaintenance: '05.01.2026',
    nextMaintenance: '05.04.2026',
  },
  {
    id: 5,
    name: 'Дизель-генератор №5',
    category: 'Энергетическое оборудование',
    location: 'Энергоблок',
    status: 'maintenance',
    power: 0,
    efficiency: 82,
    emissions: {
      co2: 0,
      so2: 0,
      nox: 0,
    },
    workingHours: 3240,
    lastMaintenance: '12.02.2026',
    nextMaintenance: '12.05.2026',
  },
  {
    id: 6,
    name: 'Очистная установка №6',
    category: 'Очистное оборудование',
    location: 'Очистные сооружения',
    status: 'error',
    power: 45,
    efficiency: 65,
    emissions: {
      co2: 75,
      so2: 32,
      nox: 48,
    },
    workingHours: 15200,
    lastMaintenance: '01.12.2025',
    nextMaintenance: '01.03.2026',
  },
];

export function Equipment() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>(equipmentData[0]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          icon: CheckCircle,
          text: 'Работает',
          color: 'emerald',
          bg: 'bg-emerald-50',
          text_color: 'text-emerald-700',
          dot: 'bg-emerald-500',
        };
      case 'idle':
        return {
          icon: Power,
          text: 'Простой',
          color: 'slate',
          bg: 'bg-slate-50',
          text_color: 'text-slate-700',
          dot: 'bg-slate-400',
        };
      case 'maintenance':
        return {
          icon: Settings,
          text: 'Обслуживание',
          color: 'blue',
          bg: 'bg-blue-50',
          text_color: 'text-blue-700',
          dot: 'bg-blue-500',
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'Ошибка',
          color: 'red',
          bg: 'bg-red-50',
          text_color: 'text-red-700',
          dot: 'bg-red-500',
        };
      default:
        return {
          icon: Power,
          text: 'Неизвестно',
          color: 'slate',
          bg: 'bg-slate-50',
          text_color: 'text-slate-700',
          dot: 'bg-slate-400',
        };
    }
  };

  const emissionsChartData = [
    { name: 'CO₂', value: selectedEquipment.emissions.co2, color: '#10b981' },
    { name: 'SO₂', value: selectedEquipment.emissions.so2, color: '#3b82f6' },
    { name: 'NOₓ', value: selectedEquipment.emissions.nox, color: '#f59e0b' },
  ];

  const totalEmissions = equipmentData.reduce(
    (acc, eq) => acc + eq.emissions.co2 + eq.emissions.so2 + eq.emissions.nox,
    0
  );

  const activeCount = equipmentData.filter((e) => e.status === 'active').length;
  const avgEfficiency =
    equipmentData.reduce((acc, eq) => acc + eq.efficiency, 0) / equipmentData.length;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Заголовок */}
      <div className="glass-effect rounded-2xl p-6 md:p-8 shadow-md border border-emerald-100">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-800">Управление оборудованием</h2>
        <p className="text-emerald-600 mt-2 text-base md:text-lg">Мониторинг и контроль производственного оборудования</p>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Settings className="text-white" size={20} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-emerald-600 font-medium mb-1">Всего единиц</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-800">{equipmentData.length}</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Power className="text-white" size={20} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-emerald-600 font-medium mb-1">В работе</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-800">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-emerald-600 font-medium mb-1">Средний КПД</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-800">{avgEfficiency.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
              <BarChart3 className="text-white" size={20} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-emerald-600 font-medium mb-1">Выбросы (сутки)</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-800">{totalEmissions.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        {/* Список оборудования */}
        <div className="lg:col-span-1 glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md">
          <h3 className="font-bold text-emerald-800 mb-5 text-lg md:text-xl">Список оборудования</h3>
          <div className="space-y-3">
            {equipmentData.map((equipment) => {
              const statusConfig = getStatusConfig(equipment.status);
              const isSelected = selectedEquipment.id === equipment.id;

              return (
                <button
                  key={equipment.id}
                  onClick={() => setSelectedEquipment(equipment)}
                  className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-emerald-400 bg-gradient-to-r from-emerald-50 to-green-50 shadow-md transform scale-105'
                      : 'border-emerald-100 hover:bg-emerald-50 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-emerald-800 text-base md:text-lg truncate">{equipment.name}</p>
                      <p className="text-sm md:text-base text-emerald-600 mt-1.5 truncate">{equipment.location}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${statusConfig.dot} mt-2 flex-shrink-0 shadow-md`} />
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="text-emerald-600 font-medium truncate">{equipment.category}</span>
                    {equipment.status === 'active' && (
                      <span className="text-emerald-600 font-bold ml-2 flex-shrink-0 text-base">{equipment.power}%</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Детали оборудования */}
        <div className="lg:col-span-2 space-y-5 md:space-y-6">
          {/* Основная информация */}
          <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-5 md:mb-6 gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-emerald-800 text-xl md:text-2xl truncate">{selectedEquipment.name}</h3>
                <p className="text-emerald-600 mt-2 text-base md:text-lg">{selectedEquipment.category}</p>
              </div>
              {(() => {
                const statusConfig = getStatusConfig(selectedEquipment.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl ${statusConfig.bg} shadow-sm flex-shrink-0`}>
                    <StatusIcon className={statusConfig.text_color} size={18} />
                    <span className={`text-sm md:text-base font-semibold ${statusConfig.text_color}`}>
                      {statusConfig.text}
                    </span>
                  </div>
                );
              })()}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              <div className="p-4 md:p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <p className="text-xs md:text-sm text-emerald-600 mb-2 font-medium">Мощность</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-800">{selectedEquipment.power}%</p>
              </div>
              <div className="p-4 md:p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <p className="text-xs md:text-sm text-emerald-600 mb-2 font-medium">КПД</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-800">{selectedEquipment.efficiency}%</p>
              </div>
              <div className="p-4 md:p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <p className="text-xs md:text-sm text-emerald-600 mb-2 font-medium">Наработка</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-800">{selectedEquipment.workingHours}</p>
                <p className="text-xs md:text-sm text-emerald-600 mt-1.5">часов</p>
              </div>
              <div className="p-4 md:p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <p className="text-xs md:text-sm text-emerald-600 mb-2 font-medium">Расположение</p>
                <p className="text-sm md:text-base font-semibold text-emerald-800 mt-2 truncate">{selectedEquipment.location}</p>
              </div>
            </div>
          </div>

          {/* Расчет выбросов */}
          <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md">
            <h3 className="font-bold text-emerald-800 mb-5 text-lg md:text-xl">Расчет выбросов от оборудования</h3>
            
            <div className="grid grid-cols-3 gap-4 md:gap-5 mb-5 md:mb-6">
              <div className="p-4 md:p-5 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 shadow-sm">
                <p className="text-xs md:text-sm text-emerald-700 mb-1.5 font-semibold">CO₂</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-900">
                  {selectedEquipment.emissions.co2}
                </p>
                <p className="text-xs md:text-sm text-emerald-600 mt-1.5">мг/м³</p>
              </div>
              <div className="p-4 md:p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
                <p className="text-xs md:text-sm text-blue-700 mb-1.5 font-semibold">SO₂</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-900">
                  {selectedEquipment.emissions.so2}
                </p>
                <p className="text-xs md:text-sm text-blue-600 mt-1.5">мкг/м³</p>
              </div>
              <div className="p-4 md:p-5 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 shadow-sm">
                <p className="text-xs md:text-sm text-amber-700 mb-1.5 font-semibold">NOₓ</p>
                <p className="text-2xl md:text-3xl font-bold text-amber-900">
                  {selectedEquipment.emissions.nox}
                </p>
                <p className="text-xs md:text-sm text-amber-600 mt-1.5">мкг/м³</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={emissionsChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="name" stroke="#059669" style={{ fontSize: '12px' }} />
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
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {emissionsChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-5 p-4 md:p-5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
              <p className="text-sm md:text-base text-emerald-800">
                <span className="font-bold">Суммарные выбросы:</span>{' '}
                {(
                  selectedEquipment.emissions.co2 +
                  selectedEquipment.emissions.so2 +
                  selectedEquipment.emissions.nox
                ).toFixed(1)}{' '}
                мг/м³
              </p>
            </div>
          </div>

          {/* Обслуживание */}
          <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md">
            <div className="flex items-center gap-3 mb-5">
              <Clock className="text-emerald-600" size={22} />
              <h3 className="font-bold text-emerald-800 text-lg md:text-xl">График обслуживания</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <p className="text-xs md:text-sm text-emerald-600 mb-2 font-medium">Последнее обслуживание</p>
                <p className="text-emerald-800 font-semibold text-base md:text-lg">{selectedEquipment.lastMaintenance}</p>
              </div>
              <div className="p-5 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                <p className="text-xs md:text-sm text-amber-700 mb-2 font-medium">Следующее обслуживание</p>
                <p className="text-amber-900 font-semibold text-base md:text-lg">{selectedEquipment.nextMaintenance}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 md:gap-4">
              <button className="flex-1 px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-semibold text-base md:text-lg">
                Запланировать ТО
              </button>
              <button className="flex-1 px-5 py-3.5 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-all font-semibold text-base md:text-lg">
                История обслуживания
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}