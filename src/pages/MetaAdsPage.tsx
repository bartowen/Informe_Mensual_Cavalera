import React from 'react';
import {
  Instagram,
  Facebook,
  FileSpreadsheet,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

const MetaAdsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-lg p-3">
              <Instagram className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meta Ads</h1>
              <p className="text-gray-500">Facebook & Instagram Ads</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-lg">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Próximamente</span>
          </div>
        </div>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <Facebook className="w-10 h-10 text-blue-600" />
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <Instagram className="w-10 h-10 text-pink-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Datos de Meta Ads
          </h2>
          <p className="text-gray-600 mb-6">
            La integración con Meta Ads estará disponible próximamente.
            Por ahora, puedes subir manualmente los datos al Google Sheet.
          </p>

          <div className="bg-white rounded-lg p-6 border border-gray-200 text-left mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-green-600" />
              Subir datos manualmente
            </h3>
            <ol className="text-sm text-gray-600 space-y-2">
              <li className="flex gap-2">
                <span className="text-[#3bc6dc] font-bold">1.</span>
                Exporta las métricas desde Meta Business Suite
              </li>
              <li className="flex gap-2">
                <span className="text-[#3bc6dc] font-bold">2.</span>
                Abre el Google Sheet de Cavalera
              </li>
              <li className="flex gap-2">
                <span className="text-[#3bc6dc] font-bold">3.</span>
                Pega los datos en la pestaña "Meta Ads"
              </li>
              <li className="flex gap-2">
                <span className="text-[#3bc6dc] font-bold">4.</span>
                El dashboard se actualizará automáticamente
              </li>
            </ol>
          </div>

          <a
            href="https://docs.google.com/spreadsheets"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3bc6dc] to-[#21a9c2] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
          >
            Abrir Google Sheet
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Placeholder Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 opacity-50">
          <p className="text-gray-400 text-sm">Inversión</p>
          <p className="text-3xl font-bold text-gray-300 mt-1">-</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 opacity-50">
          <p className="text-gray-400 text-sm">Alcance</p>
          <p className="text-3xl font-bold text-gray-300 mt-1">-</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 opacity-50">
          <p className="text-gray-400 text-sm">Conversiones</p>
          <p className="text-3xl font-bold text-gray-300 mt-1">-</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">
          ¿Por qué no están los datos automáticos?
        </h3>
        <p className="text-blue-800 text-sm">
          La API de Meta requiere una integración más compleja que Google Ads.
          Estamos trabajando en automatizar la conexión para que los datos de
          Facebook e Instagram se carguen automáticamente, igual que Google Ads.
        </p>
      </div>
    </div>
  );
};

export default MetaAdsPage;
