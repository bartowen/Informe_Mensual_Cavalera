import React from 'react';
import { BarChart3, Download, FileText, Users, MousePointer, TrendingUp } from 'lucide-react';
import QuickNavigation from './QuickNavigation';

interface GA4TabProps {
  onNavigate: (tab: string) => void;
}

const GA4Tab: React.FC<GA4TabProps> = ({ onNavigate }) => {
  return (
    <div className="text-center py-16 bg-gray-50 rounded-lg">
      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-700 mb-2">Google Analytics 4</h3>
      <p className="text-gray-600 mb-8">Próximamente: Análisis detallado del comportamiento en el sitio web</p>

      <div className="max-w-3xl mx-auto text-left bg-white p-8 rounded-lg shadow-lg">
        <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          📊 Informes necesarios de GA4
        </h4>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <Users className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-indigo-900 mb-1">Tráfico general</div>
              <div className="text-sm text-indigo-800">Usuarios, sesiones, páginas vistas del período Nov 1-30, 2025</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-purple-900 mb-1">Fuentes de tráfico</div>
              <div className="text-sm text-purple-800">Orgánico, directo, social, paid (con conversiones por fuente)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-lg border border-pink-200">
            <MousePointer className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-pink-900 mb-1">Eventos principales</div>
              <div className="text-sm text-pink-800">form_submit, page_view, scroll, click (con totales y tasas de conversión)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <FileText className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-cyan-900 mb-1">Páginas más visitadas</div>
              <div className="text-sm text-cyan-800">Top 10 páginas con tasa de rebote y tiempo en página</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-emerald-900 mb-1">Embudo de conversión</div>
              <div className="text-sm text-emerald-800">Landing → Formulario → Envío (con tasas de abandono)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <Users className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-amber-900 mb-1">Datos demográficos</div>
              <div className="text-sm text-amber-800">Edad, género, ubicación (si está disponible en GA4)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <BarChart3 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-blue-900 mb-1">Dispositivos</div>
              <div className="text-sm text-blue-800">Desktop, mobile, tablet (sesiones y conversiones por dispositivo)</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-100 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <strong className="block mb-1">Cómo exportar desde GA4:</strong>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Ir a GA4 → Informes → Explorar</li>
                <li>Crear informe personalizado con las métricas necesarias</li>
                <li>Seleccionar período: Nov 1-30, 2025</li>
                <li>Exportar como CSV o Google Sheets</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación Rápida */}
      <div className="mt-8">
        <QuickNavigation currentTab="ga4" onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default GA4Tab;
