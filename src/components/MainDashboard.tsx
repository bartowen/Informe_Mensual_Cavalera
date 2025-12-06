import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import Dashboard from './Dashboard';
import GA4Tab from './GA4Tab';
import MetaAdsTab from './MetaAdsTab';
import OtrosAvancesTab from './OtrosAvancesTab';
import { BarChart3, Facebook, Wrench } from 'lucide-react';

const MainDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="google-ads" className="w-full">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-white mb-2">
                Reporte Mensual - Cavalera Tattoo & Piercing Studio
              </h1>
              <p className="text-indigo-100">
                Dashboard multi-canal de marketing digital · Noviembre 2025
              </p>
            </div>

            <TabsList className="border-none mb-0">
              <TabsTrigger value="google-ads" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Google Ads
              </TabsTrigger>
              <TabsTrigger value="ga4" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Google Analytics 4
              </TabsTrigger>
              <TabsTrigger value="meta-ads" className="flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Meta Ads
              </TabsTrigger>
              <TabsTrigger value="otros-avances" className="flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Otros Avances
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <TabsContent value="google-ads">
            <Dashboard />
          </TabsContent>

          <TabsContent value="ga4">
            <GA4Tab />
          </TabsContent>

          <TabsContent value="meta-ads">
            <MetaAdsTab />
          </TabsContent>

          <TabsContent value="otros-avances">
            <OtrosAvancesTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MainDashboard;
