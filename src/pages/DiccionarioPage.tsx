import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  DollarSign,
  MousePointerClick,
  Eye,
  Target,
  TrendingUp,
  FileText,
  Percent,
} from 'lucide-react';

interface TerminoProps {
  titulo: string;
  siglas?: string;
  definicion: string;
  ejemplo?: string;
  icono: React.ElementType;
  color: string;
}

const terminos: TerminoProps[] = [
  {
    titulo: 'Impresiones',
    siglas: 'Impr.',
    definicion: 'Número de veces que tu anuncio fue mostrado en la pantalla de alguien. No significa que lo vieron o leyeron, solo que apareció.',
    ejemplo: 'Si tu anuncio apareció 1.000 veces, tienes 1.000 impresiones.',
    icono: Eye,
    color: 'blue',
  },
  {
    titulo: 'Clics',
    definicion: 'Número de veces que alguien hizo clic en tu anuncio. Indica interés real en lo que ofreces.',
    ejemplo: 'De 1.000 impresiones, si 100 personas hacen clic, tienes 100 clics.',
    icono: MousePointerClick,
    color: 'indigo',
  },
  {
    titulo: 'CTR (Click-Through Rate)',
    siglas: 'CTR',
    definicion: 'Porcentaje de personas que ven tu anuncio y hacen clic. Mide qué tan atractivo es tu anuncio.',
    ejemplo: '100 clics ÷ 1.000 impresiones × 100 = 10% CTR. Un buen CTR en búsqueda es 5-10%.',
    icono: Percent,
    color: 'green',
  },
  {
    titulo: 'Conversiones',
    siglas: 'Conv.',
    definicion: 'Acciones valiosas que queremos que el usuario haga: enviar un formulario, llamar, escribir por WhatsApp, etc.',
    ejemplo: 'Si 10 de los 100 clics enviaron un formulario, tienes 10 conversiones.',
    icono: FileText,
    color: 'cyan',
  },
  {
    titulo: 'Tasa de Conversión',
    siglas: 'Conv. Rate',
    definicion: 'Porcentaje de clics que se convierten en conversiones. Mide qué tan efectiva es tu página.',
    ejemplo: '10 conversiones ÷ 100 clics × 100 = 10% tasa de conversión. Un buen ratio es 5-10%.',
    icono: TrendingUp,
    color: 'emerald',
  },
  {
    titulo: 'CPA (Costo por Adquisición)',
    siglas: 'CPA',
    definicion: 'Cuánto te cuesta conseguir una conversión. Es tu inversión dividida por el número de formularios.',
    ejemplo: 'Si gastaste $100.000 y obtuviste 10 formularios, tu CPA es $10.000 por formulario.',
    icono: Target,
    color: 'purple',
  },
  {
    titulo: 'CPC (Costo por Clic)',
    siglas: 'CPC',
    definicion: 'Cuánto pagas en promedio cada vez que alguien hace clic en tu anuncio.',
    ejemplo: 'Si gastaste $100.000 y tuviste 100 clics, tu CPC es $1.000 por clic.',
    icono: DollarSign,
    color: 'amber',
  },
  {
    titulo: 'ROI (Retorno sobre Inversión)',
    siglas: 'ROI',
    definicion: 'Cuánto ganas por cada peso que inviertes en publicidad. Si es positivo, estás ganando dinero.',
    ejemplo: 'Invertiste $100.000 y generaste $400.000 en ventas. ROI = (400-100)÷100 = 300%',
    icono: TrendingUp,
    color: 'green',
  },
];

const TerminoCard: React.FC<TerminoProps> = ({
  titulo,
  siglas,
  definicion,
  ejemplo,
  icono: Icon,
  color,
}) => {
  const [expanded, setExpanded] = useState(false);

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-200' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${colors.border} overflow-hidden`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors"
      >
        <div className={`${colors.bg} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{titulo}</h3>
            {siglas && (
              <span className={`text-xs px-2 py-0.5 rounded ${colors.bg} ${colors.text} font-medium`}>
                {siglas}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{definicion}</p>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 pt-0 border-t border-gray-100">
          <p className="text-gray-700 mb-4">{definicion}</p>
          {ejemplo && (
            <div className={`${colors.bg} rounded-lg p-4`}>
              <p className="text-sm font-medium text-gray-700 mb-1">Ejemplo:</p>
              <p className={`text-sm ${colors.text}`}>{ejemplo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DiccionarioPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerminos = terminos.filter(
    (t) =>
      t.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.siglas?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.definicion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 rounded-lg p-3">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Diccionario</h1>
              <p className="text-gray-500">
                Aprende las métricas de marketing digital
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar términos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3bc6dc] focus:border-transparent"
        />
      </div>

      {/* Intro */}
      <div className="bg-gradient-to-r from-[#3bc6dc]/10 to-[#21a9c2]/10 rounded-xl p-6 border border-[#3bc6dc]/20">
        <h2 className="font-semibold text-gray-900 mb-2">
          Ads en Fácil
        </h2>
        <p className="text-gray-600 text-sm">
          Aquí encontrarás explicaciones simples de todas las métricas que ves en el dashboard.
          No necesitas ser experto en marketing para entender cómo está funcionando tu publicidad.
        </p>
      </div>

      {/* Terms Grid */}
      <div className="space-y-3">
        {filteredTerminos.length > 0 ? (
          filteredTerminos.map((termino, index) => (
            <TerminoCard key={index} {...termino} />
          ))
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">
              No se encontraron términos que coincidan con "{searchTerm}"
            </p>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-medium text-gray-900 mb-2">
              ¿Qué es un buen CTR?
            </h3>
            <p className="text-sm text-gray-600">
              Para anuncios de búsqueda en Google, un CTR entre 5% y 10% es considerado bueno.
              Más del 10% es excelente. Para display o redes sociales, 1-2% es normal.
            </p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-medium text-gray-900 mb-2">
              ¿Cómo sé si mi CPA es bueno?
            </h3>
            <p className="text-sm text-gray-600">
              Depende de tu negocio. Si el ticket promedio de Cavalera es $50.000 y tu CPA es $10.000,
              estás pagando 20% del valor del servicio para conseguir un cliente. Eso es excelente.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">
              ¿Por qué mis conversiones tienen decimales?
            </h3>
            <p className="text-sm text-gray-600">
              Google usa un modelo de atribución que distribuye el crédito de una conversión
              entre varios touchpoints. Si alguien hizo clic en 2 anuncios antes de convertir,
              cada anuncio recibe 0.5 conversiones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiccionarioPage;
