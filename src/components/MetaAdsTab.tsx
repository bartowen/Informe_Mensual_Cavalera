import React from 'react';
import { Facebook, Instagram, Download, FileText, Users, Target, Image } from 'lucide-react';

const MetaAdsTab: React.FC = () => {
  return (
    <div className="text-center py-16 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Facebook className="w-12 h-12 text-blue-600" />
        <Instagram className="w-12 h-12 text-pink-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-700 mb-2">Meta Ads (Facebook & Instagram)</h3>
      <p className="text-gray-600 mb-8">Próximamente: Rendimiento de campañas en redes sociales</p>

      <div className="max-w-3xl mx-auto text-left bg-white p-8 rounded-lg shadow-lg">
        <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-pink-600" />
          📱 Informes necesarios de Meta Ads
        </h4>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-blue-900 mb-1">Resumen de campañas</div>
              <div className="text-sm text-blue-800">Inversión, alcance, impresiones, clics (Nov 1-30, 2025)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-lg border border-pink-200">
            <FileText className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-pink-900 mb-1">Conversiones</div>
              <div className="text-sm text-pink-800">Formularios enviados, mensajes, llamadas (por tipo de conversión)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <Instagram className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-purple-900 mb-1">Por plataforma</div>
              <div className="text-sm text-purple-800">Facebook vs Instagram (métricas separadas por red social)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <Image className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-indigo-900 mb-1">Por ubicación</div>
              <div className="text-sm text-indigo-800">Feed, Stories, Reels, Explore (rendimiento por placement)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <Users className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-cyan-900 mb-1">Audiencias</div>
              <div className="text-sm text-cyan-800">Edad, género, ubicación geográfica (con rendimiento por segmento)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <Image className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-emerald-900 mb-1">Creatividades</div>
              <div className="text-sm text-emerald-800">Top 5 anuncios con mejor rendimiento (CTR, conversiones, CPA)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <Target className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-amber-900 mb-1">Horarios</div>
              <div className="text-sm text-amber-800">Rendimiento por día de la semana y hora del día</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-pink-100 rounded-lg border-l-4 border-pink-500">
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 text-pink-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-pink-900">
              <strong className="block mb-1">Cómo exportar desde Meta Business Suite:</strong>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Ir a Meta Business Suite → Anuncios → Informes</li>
                <li>Crear informe personalizado</li>
                <li>Seleccionar período: Noviembre 2025</li>
                <li>Agregar todas las métricas necesarias</li>
                <li>Descargar como Excel o CSV</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaAdsTab;
