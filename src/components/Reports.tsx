import { FileText, Download, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const reportsData = [
  {
    id: 1,
    title: 'Отчет по выбросам за январь 2026',
    type: 'Ежемесячный',
    date: '31.01.2026',
    status: 'completed',
    size: '2.4 МБ',
  },
  {
    id: 2,
    title: 'Отчет по качеству воздуха',
    type: 'Еженедельный',
    date: '10.02.2026',
    status: 'completed',
    size: '1.8 МБ',
  },
  {
    id: 3,
    title: 'Отчет об оборудовании',
    type: 'Квартальный',
    date: '31.12.2025',
    status: 'completed',
    size: '5.2 МБ',
  },
  {
    id: 4,
    title: 'Отчет по калибровке датчиков',
    type: 'Ежемесячный',
    date: '31.01.2026',
    status: 'completed',
    size: '1.2 МБ',
  },
  {
    id: 5,
    title: 'Отчет о превышениях ПДК',
    type: 'Внеплановый',
    date: '12.02.2026',
    status: 'warning',
    size: '856 КБ',
  },
  {
    id: 6,
    title: 'Годовой экологический отчет 2025',
    type: 'Годовой',
    date: '15.01.2026',
    status: 'completed',
    size: '12.8 МБ',
  },
];

const complianceData = [
  {
    parameter: 'CO₂',
    current: 352,
    limit: 400,
    unit: 'мг/м³',
    status: 'good',
  },
  {
    parameter: 'SO₂',
    current: 58,
    limit: 70,
    unit: 'мкг/м³',
    status: 'good',
  },
  {
    parameter: 'NOₓ',
    current: 65,
    limit: 50,
    unit: 'мкг/м³',
    status: 'exceeded',
  },
  {
    parameter: 'PM2.5',
    current: 35,
    limit: 45,
    unit: 'мкг/м³',
    status: 'good',
  },
  {
    parameter: 'PM10',
    current: 68,
    limit: 80,
    unit: 'мкг/м³',
    status: 'warning',
  },
];

export function Reports() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center gap-1 text-emerald-700">
            <CheckCircle size={16} />
            <span className="text-sm">Готов</span>
          </div>
        );
      case 'warning':
        return (
          <div className="flex items-center gap-1 text-amber-700">
            <AlertTriangle size={16} />
            <span className="text-sm">Требует внимания</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getComplianceStatus = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-emerald-500';
      case 'warning':
        return 'bg-amber-500';
      case 'exceeded':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Заголовок */}
      <div className="glass-effect rounded-2xl p-6 md:p-8 shadow-md border border-emerald-100">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-800">Отчеты и аналитика</h2>
        <p className="text-emerald-600 mt-2 text-base md:text-lg">Формирование и экспорт отчетов по экологическому мониторингу</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <FileText className="text-white" size={22} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-emerald-600 font-medium mb-1">Всего отчетов</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-800">{reportsData.length}</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <CheckCircle className="text-white" size={22} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-emerald-600 font-medium mb-1">Готовы к экспорту</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-800">
                {reportsData.filter((r) => r.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg transition-all card-hover">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
              <AlertTriangle className="text-white" size={22} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-emerald-600 font-medium mb-1">Требуют внимания</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-800">
                {reportsData.filter((r) => r.status === 'warning').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        {/* Список отчетов */}
        <div className="lg:col-span-2 glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 md:mb-6 gap-4">
            <h3 className="font-bold text-emerald-800 text-lg md:text-xl">Сформированные отчеты</h3>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-semibold text-base">
              <FileText size={20} />
              Создать отчет
            </button>
          </div>

          <div className="space-y-3 md:space-y-4">
            {reportsData.map((report) => (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 border border-emerald-100 rounded-xl hover:bg-emerald-50 transition-all gap-4"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0 w-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <FileText className="text-white" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-emerald-800 text-base md:text-lg truncate">{report.title}</p>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2 text-xs md:text-sm text-emerald-600">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {report.date}
                      </span>
                      <span>{report.type}</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  {getStatusBadge(report.status)}
                  <button className="p-2.5 hover:bg-emerald-100 rounded-xl transition-colors">
                    <Download className="text-emerald-600" size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Создание отчета */}
        <div className="space-y-5 md:space-y-6">
          <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md">
            <h3 className="font-bold text-emerald-800 mb-5 text-lg md:text-xl">Быстрое создание</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-4 md:p-5 border border-emerald-100 rounded-xl hover:bg-emerald-50 transition-all hover:shadow-md">
                <p className="font-semibold text-emerald-800 text-base md:text-lg">Ежедневный отчет</p>
                <p className="text-sm md:text-base text-emerald-600 mt-1.5">Выбросы за текущие сутки</p>
              </button>
              <button className="w-full text-left p-4 md:p-5 border border-emerald-100 rounded-xl hover:bg-emerald-50 transition-all hover:shadow-md">
                <p className="font-semibold text-emerald-800 text-base md:text-lg">Еженедельный отчет</p>
                <p className="text-sm md:text-base text-emerald-600 mt-1.5">Сводка за неделю</p>
              </button>
              <button className="w-full text-left p-4 md:p-5 border border-emerald-100 rounded-xl hover:bg-emerald-50 transition-all hover:shadow-md">
                <p className="font-semibold text-emerald-800 text-base md:text-lg">Ежемесячный отчет</p>
                <p className="text-sm md:text-base text-emerald-600 mt-1.5">Детальная статистика</p>
              </button>
              <button className="w-full text-left p-4 md:p-5 border border-emerald-100 rounded-xl hover:bg-emerald-50 transition-all hover:shadow-md">
                <p className="font-semibold text-emerald-800 text-base md:text-lg">Произвольный период</p>
                <p className="text-sm md:text-base text-emerald-600 mt-1.5">Настраиваемый отчет</p>
              </button>
            </div>
          </div>

          <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-6 shadow-md">
            <h3 className="font-bold text-emerald-800 mb-5 text-lg md:text-xl">Форматы экспорта</h3>
            <div className="space-y-3">
              {['PDF документ', 'Excel таблица', 'CSV файл', 'JSON данные'].map((format) => (
                <div key={format} className="flex items-center gap-3.5 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 focus:ring-2"
                  />
                  <span className="text-emerald-700 font-medium text-base">{format}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Соответствие нормам */}
      <div className="glass-effect rounded-2xl border border-emerald-100 p-5 md:p-7 shadow-md">
        <div className="flex items-center gap-3 mb-5 md:mb-6">
          <TrendingUp className="text-emerald-600" size={22} />
          <h3 className="font-bold text-emerald-800 text-lg md:text-xl">Соответствие предельно допустимым концентрациям (ПДК)</h3>
        </div>

        <div className="space-y-4 md:space-y-5">
          {complianceData.map((item) => {
            const percentage = (item.current / item.limit) * 100;
            const statusColor = getComplianceStatus(item.status);

            return (
              <div key={item.parameter} className="space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`w-3 h-3 rounded-full ${statusColor} shadow-md flex-shrink-0`} />
                    <span className="font-semibold text-emerald-800 text-base md:text-lg">{item.parameter}</span>
                  </div>
                  <div className="flex items-center gap-4 md:gap-5 ml-7 sm:ml-0">
                    <span className="text-emerald-700 text-sm md:text-base">
                      {item.current} / {item.limit} {item.unit}
                    </span>
                    <span
                      className={`font-bold text-base md:text-lg ${
                        item.status === 'exceeded'
                          ? 'text-red-600'
                          : item.status === 'warning'
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-3 shadow-inner">
                  <div
                    className={`h-3 rounded-full transition-all shadow-md ${statusColor}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 md:mt-6 p-4 md:p-5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
          <p className="text-sm md:text-base text-emerald-800 leading-relaxed">
            <span className="font-bold">Общий статус соответствия:</span> Обнаружено{' '}
            {complianceData.filter((i) => i.status === 'exceeded').length} превышение нормативов.
            Требуется принятие мер по снижению выбросов NOₓ.
          </p>
        </div>
      </div>
    </div>
  );
}