/**
 * Servicio para extraer datos de Google Ads API
 * Compatible con el dashboard de Cavalera Tattoo & Piercing
 */

import { GoogleAdsApi, Customer } from 'google-ads-api';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import {
  GoogleAdsConfig,
  GoogleAdsMonthlyData,
  CampaignData,
  TimeSeriesData,
  KeywordData,
  SearchTermData,
  LocationData,
  DeviceData,
  DayOfWeekData,
  HourOfDayData,
  DemographicBySex,
  DemographicByAge,
  ScheduleData,
} from '../types/google-ads.types';

export class GoogleAdsFetcher {
  private client: GoogleAdsApi;
  private customer: Customer;

  constructor(config: GoogleAdsConfig) {
    this.client = new GoogleAdsApi({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      developer_token: config.developerToken,
    });

    this.customer = this.client.Customer({
      customer_id: config.customerId,
      refresh_token: config.refreshToken,
      login_customer_id: config.loginCustomerId,
    });
  }

  /**
   * Obtiene todos los datos de un mes específico
   */
  async fetchMonthlyData(year: number, month: number): Promise<GoogleAdsMonthlyData> {
    const startDate = format(startOfMonth(new Date(year, month - 1)), 'yyyy-MM-dd');
    const endDate = format(endOfMonth(new Date(year, month - 1)), 'yyyy-MM-dd');

    console.log(`📊 Extrayendo datos de Google Ads: ${startDate} - ${endDate}`);

    const [
      campaigns,
      timeSeries,
      keywords,
      searchTerms,
      locations,
      devices,
      dayOfWeek,
      hourOfDay,
      schedule,
      demographics,
    ] = await Promise.all([
      this.fetchCampaigns(startDate, endDate),
      this.fetchTimeSeries(startDate, endDate),
      this.fetchKeywords(startDate, endDate),
      this.fetchSearchTerms(startDate, endDate),
      this.fetchLocations(startDate, endDate),
      this.fetchDevices(startDate, endDate),
      this.fetchDayOfWeek(startDate, endDate),
      this.fetchHourOfDay(startDate, endDate),
      this.fetchSchedule(startDate, endDate),
      this.fetchDemographics(startDate, endDate),
    ]);

    const summary = this.calculateSummary(campaigns);

    return {
      period: {
        startDate,
        endDate,
        month,
        year,
      },
      campaigns,
      timeSeries,
      keywords,
      searchTerms,
      locations,
      devices,
      dayOfWeek,
      hourOfDay,
      schedule,
      demographics,
      summary,
    };
  }

  /**
   * Extrae datos de campañas
   */
  private async fetchCampaigns(startDate: string, endDate: string): Promise<CampaignData[]> {
    const query = `
      SELECT
        campaign.name,
        campaign.status,
        campaign_budget.amount_micros,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.cost_micros,
        metrics.ctr,
        metrics.average_cpc,
        metrics.cost_per_conversion,
        metrics.conversions_from_interactions_rate
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
        AND campaign.status != 'REMOVED'
      ORDER BY metrics.conversions DESC
    `;

    const results = await this.customer.query(query);

    return results.map((row: any) => ({
      campaignName: row.campaign.name,
      status: this.mapCampaignStatus(row.campaign.status),
      budget: row.campaign_budget?.amount_micros ? row.campaign_budget.amount_micros / 1_000_000 : 0,
      impressions: row.metrics.impressions || 0,
      clicks: row.metrics.clicks || 0,
      conversions: row.metrics.conversions || 0,
      cost: row.metrics.cost_micros ? row.metrics.cost_micros / 1_000_000 : 0,
      ctr: row.metrics.ctr ? row.metrics.ctr * 100 : 0,
      cpc: row.metrics.average_cpc ? row.metrics.average_cpc / 1_000_000 : 0,
      cpa: row.metrics.cost_per_conversion ? row.metrics.cost_per_conversion / 1_000_000 : 0,
      conversionRate: row.metrics.conversions_from_interactions_rate
        ? row.metrics.conversions_from_interactions_rate * 100
        : 0,
    }));
  }

  /**
   * Extrae serie temporal diaria
   */
  private async fetchTimeSeries(startDate: string, endDate: string): Promise<TimeSeriesData[]> {
    const query = `
      SELECT
        segments.date,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.cost_micros,
        metrics.ctr
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
      ORDER BY segments.date ASC
    `;

    const results = await this.customer.query(query);

    // Agrupar por fecha
    const dataByDate = new Map<string, TimeSeriesData>();

    results.forEach((row: any) => {
      const date = row.segments.date;

      if (!dataByDate.has(date)) {
        dataByDate.set(date, {
          date,
          impressions: 0,
          clicks: 0,
          conversions: 0,
          cost: 0,
          ctr: 0,
        });
      }

      const data = dataByDate.get(date)!;
      data.impressions += row.metrics.impressions || 0;
      data.clicks += row.metrics.clicks || 0;
      data.conversions += row.metrics.conversions || 0;
      data.cost += row.metrics.cost_micros ? row.metrics.cost_micros / 1_000_000 : 0;
    });

    // Calcular CTR
    const timeSeriesArray = Array.from(dataByDate.values());
    timeSeriesArray.forEach((data) => {
      data.ctr = data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0;
    });

    return timeSeriesArray;
  }

  /**
   * Extrae palabras clave (keywords)
   */
  private async fetchKeywords(startDate: string, endDate: string): Promise<KeywordData[]> {
    const query = `
      SELECT
        ad_group_criterion.keyword.text,
        ad_group_criterion.keyword.match_type,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.cost_micros,
        metrics.ctr,
        metrics.cost_per_conversion,
        ad_group_criterion.quality_info.quality_score
      FROM keyword_view
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
        AND ad_group_criterion.status != 'REMOVED'
      ORDER BY metrics.conversions DESC
      LIMIT 20
    `;

    const results = await this.customer.query(query);

    return results.map((row: any) => ({
      keyword: row.ad_group_criterion.keyword.text,
      matchType: this.mapMatchType(row.ad_group_criterion.keyword.match_type),
      impressions: row.metrics.impressions || 0,
      clicks: row.metrics.clicks || 0,
      conversions: row.metrics.conversions || 0,
      cost: row.metrics.cost_micros ? row.metrics.cost_micros / 1_000_000 : 0,
      ctr: row.metrics.ctr ? row.metrics.ctr * 100 : 0,
      cpa: row.metrics.cost_per_conversion ? row.metrics.cost_per_conversion / 1_000_000 : 0,
      qualityScore: row.ad_group_criterion.quality_info?.quality_score || 0,
    }));
  }

  /**
   * Extrae términos de búsqueda reales
   */
  private async fetchSearchTerms(startDate: string, endDate: string): Promise<SearchTermData[]> {
    const query = `
      SELECT
        search_term_view.search_term,
        ad_group.name,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.cost_micros,
        metrics.ctr,
        metrics.conversions_from_interactions_rate
      FROM search_term_view
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
      ORDER BY metrics.conversions DESC
      LIMIT 20
    `;

    const results = await this.customer.query(query);

    return results.map((row: any) => {
      const searchTerm = row.search_term_view.search_term.toLowerCase();
      const isBrand = searchTerm.includes('cavalera') || searchTerm.includes('naty');

      return {
        searchTerm: row.search_term_view.search_term,
        triggeredKeyword: row.ad_group.name || 'Unknown',
        impressions: row.metrics.impressions || 0,
        clicks: row.metrics.clicks || 0,
        conversions: row.metrics.conversions || 0,
        cost: row.metrics.cost_micros ? row.metrics.cost_micros / 1_000_000 : 0,
        ctr: row.metrics.ctr ? row.metrics.ctr * 100 : 0,
        conversionRate: row.metrics.conversions_from_interactions_rate
          ? row.metrics.conversions_from_interactions_rate * 100
          : 0,
        isBrand,
      };
    });
  }

  /**
   * Extrae datos por ubicación (comunas)
   */
  private async fetchLocations(startDate: string, endDate: string): Promise<LocationData[]> {
    const query = `
      SELECT
        geographic_view.location_type,
        campaign_criterion.location.geo_target_constant,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.cost_micros,
        metrics.ctr,
        metrics.cost_per_conversion
      FROM geographic_view
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
      ORDER BY metrics.conversions DESC
      LIMIT 15
    `;

    const results = await this.customer.query(query);

    return results.map((row: any) => ({
      location: this.getLocationName(row.campaign_criterion?.location?.geo_target_constant),
      impressions: row.metrics.impressions || 0,
      clicks: row.metrics.clicks || 0,
      conversions: row.metrics.conversions || 0,
      cost: row.metrics.cost_micros ? row.metrics.cost_micros / 1_000_000 : 0,
      ctr: row.metrics.ctr ? row.metrics.ctr * 100 : 0,
      cpa: row.metrics.cost_per_conversion ? row.metrics.cost_per_conversion / 1_000_000 : 0,
    }));
  }

  /**
   * Extrae datos por dispositivo
   */
  private async fetchDevices(startDate: string, endDate: string): Promise<DeviceData[]> {
    const query = `
      SELECT
        segments.device,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.cost_micros,
        metrics.ctr,
        metrics.conversions_from_interactions_rate
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
    `;

    const results = await this.customer.query(query);

    const deviceMap = new Map<string, DeviceData>();

    results.forEach((row: any) => {
      const device = this.mapDeviceType(row.segments.device);

      if (!deviceMap.has(device)) {
        deviceMap.set(device, {
          device: device as 'Mobile' | 'Desktop' | 'Tablet',
          impressions: 0,
          clicks: 0,
          conversions: 0,
          cost: 0,
          ctr: 0,
          conversionRate: 0,
        });
      }

      const data = deviceMap.get(device)!;
      data.impressions += row.metrics.impressions || 0;
      data.clicks += row.metrics.clicks || 0;
      data.conversions += row.metrics.conversions || 0;
      data.cost += row.metrics.cost_micros ? row.metrics.cost_micros / 1_000_000 : 0;
    });

    const devices = Array.from(deviceMap.values());
    devices.forEach((device) => {
      device.ctr = device.impressions > 0 ? (device.clicks / device.impressions) * 100 : 0;
      device.conversionRate = device.clicks > 0 ? (device.conversions / device.clicks) * 100 : 0;
    });

    return devices;
  }

  /**
   * Extrae datos por día de la semana
   */
  private async fetchDayOfWeek(startDate: string, endDate: string): Promise<DayOfWeekData[]> {
    const query = `
      SELECT
        segments.day_of_week,
        metrics.conversions,
        metrics.clicks,
        metrics.cost_micros
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
    `;

    const results = await this.customer.query(query);

    const dayMap = new Map<string, DayOfWeekData>();

    results.forEach((row: any) => {
      const dayName = this.mapDayOfWeek(row.segments.day_of_week);

      if (!dayMap.has(dayName)) {
        dayMap.set(dayName, {
          day: dayName,
          dayShort: this.getDayShort(dayName),
          conversions: 0,
          clicks: 0,
          cost: 0,
        });
      }

      const data = dayMap.get(dayName)!;
      data.conversions += row.metrics.conversions || 0;
      data.clicks += row.metrics.clicks || 0;
      data.cost += row.metrics.cost_micros ? row.metrics.cost_micros / 1_000_000 : 0;
    });

    // Ordenar por día de la semana
    const daysOrder = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return daysOrder.map((day) => dayMap.get(day)!).filter(Boolean);
  }

  /**
   * Extrae datos por hora del día
   */
  private async fetchHourOfDay(startDate: string, endDate: string): Promise<HourOfDayData[]> {
    const query = `
      SELECT
        segments.hour,
        metrics.conversions,
        metrics.clicks,
        metrics.cost_micros
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
    `;

    const results = await this.customer.query(query);

    const hourMap = new Map<number, HourOfDayData>();

    results.forEach((row: any) => {
      const hour = row.segments.hour;

      if (!hourMap.has(hour)) {
        hourMap.set(hour, {
          hour: `${hour.toString().padStart(2, '0')}:00`,
          conversions: 0,
          clicks: 0,
          cost: 0,
        });
      }

      const data = hourMap.get(hour)!;
      data.conversions += row.metrics.conversions || 0;
      data.clicks += row.metrics.clicks || 0;
      data.cost += row.metrics.cost_micros ? row.metrics.cost_micros / 1_000_000 : 0;
    });

    return Array.from(hourMap.values()).sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
  }

  /**
   * Extrae datos de programación (día + hora)
   */
  private async fetchSchedule(startDate: string, endDate: string): Promise<ScheduleData[]> {
    const query = `
      SELECT
        segments.day_of_week,
        segments.hour,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.cost_micros
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
    `;

    const results = await this.customer.query(query);

    return results.map((row: any) => ({
      dayOfWeek: this.mapDayOfWeekEn(row.segments.day_of_week),
      hour: row.segments.hour,
      impressions: row.metrics.impressions || 0,
      clicks: row.metrics.clicks || 0,
      conversions: row.metrics.conversions || 0,
      cost: row.metrics.cost_micros ? row.metrics.cost_micros / 1_000_000 : 0,
    }));
  }

  /**
   * Extrae datos demográficos
   */
  private async fetchDemographics(startDate: string, endDate: string) {
    // Datos por sexo
    const sexQuery = `
      SELECT
        ad_group_criterion.gender.type,
        metrics.conversions,
        metrics.cost_per_conversion,
        metrics.ctr
      FROM gender_view
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
    `;

    const sexResults = await this.customer.query(sexQuery);

    const bySex: DemographicBySex[] = sexResults.map((row: any) => ({
      sexo: this.mapGender(row.ad_group_criterion.gender.type),
      conversiones: row.metrics.conversions || 0,
      cpa: row.metrics.cost_per_conversion ? row.metrics.cost_per_conversion / 1_000_000 : 0,
      ctr: row.metrics.ctr ? row.metrics.ctr * 100 : 0,
    }));

    // Datos por edad
    const ageQuery = `
      SELECT
        ad_group_criterion.age_range.type,
        metrics.conversions,
        metrics.cost_per_conversion,
        metrics.ctr
      FROM age_range_view
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
    `;

    const ageResults = await this.customer.query(ageQuery);

    const byAge: DemographicByAge[] = ageResults.map((row: any) => ({
      edad: this.mapAgeRange(row.ad_group_criterion.age_range.type),
      conversiones: row.metrics.conversions || 0,
      cpa: row.metrics.cost_per_conversion ? row.metrics.cost_per_conversion / 1_000_000 : 0,
      ctr: row.metrics.ctr ? row.metrics.ctr * 100 : 0,
    }));

    return { bySex, byAge };
  }

  /**
   * Calcula resumen general
   */
  private calculateSummary(campaigns: CampaignData[]) {
    const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const totalCost = campaigns.reduce((sum, c) => sum + c.cost, 0);
    const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);

    return {
      totalImpressions,
      totalClicks,
      totalConversions,
      totalCost,
      totalBudget,
      averageCTR: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      averageCPC: totalClicks > 0 ? totalCost / totalClicks : 0,
      averageCPA: totalConversions > 0 ? totalCost / totalConversions : 0,
    };
  }

  // Mappers
  private mapCampaignStatus(status: string): 'Active' | 'Paused' | 'Removed' {
    if (status === 'ENABLED') return 'Active';
    if (status === 'PAUSED') return 'Paused';
    return 'Removed';
  }

  private mapMatchType(type: string): 'Broad' | 'Phrase' | 'Exact' {
    if (type === 'BROAD') return 'Broad';
    if (type === 'PHRASE') return 'Phrase';
    return 'Exact';
  }

  private mapDeviceType(device: string): string {
    if (device === 'MOBILE') return 'Mobile';
    if (device === 'DESKTOP') return 'Desktop';
    if (device === 'TABLET') return 'Tablet';
    return 'Unknown';
  }

  private mapDayOfWeek(day: string): string {
    const days: { [key: string]: string } = {
      MONDAY: 'Lunes',
      TUESDAY: 'Martes',
      WEDNESDAY: 'Miércoles',
      THURSDAY: 'Jueves',
      FRIDAY: 'Viernes',
      SATURDAY: 'Sábado',
      SUNDAY: 'Domingo',
    };
    return days[day] || day;
  }

  private mapDayOfWeekEn(day: string): string {
    const days: { [key: string]: string } = {
      MONDAY: 'Monday',
      TUESDAY: 'Tuesday',
      WEDNESDAY: 'Wednesday',
      THURSDAY: 'Thursday',
      FRIDAY: 'Friday',
      SATURDAY: 'Saturday',
      SUNDAY: 'Sunday',
    };
    return days[day] || day;
  }

  private getDayShort(day: string): string {
    const shorts: { [key: string]: string } = {
      Lunes: 'Lun',
      Martes: 'Mar',
      Miércoles: 'Mié',
      Jueves: 'Jue',
      Viernes: 'Vie',
      Sábado: 'Sáb',
      Domingo: 'Dom',
    };
    return shorts[day] || day;
  }

  private mapGender(gender: string): 'Hombre' | 'Mujer' | 'Desconocido' {
    if (gender === 'MALE') return 'Hombre';
    if (gender === 'FEMALE') return 'Mujer';
    return 'Desconocido';
  }

  private mapAgeRange(range: string): string {
    const ranges: { [key: string]: string } = {
      AGE_RANGE_18_24: '18-24',
      AGE_RANGE_25_34: '25-34',
      AGE_RANGE_35_44: '35-44',
      AGE_RANGE_45_54: '45-54',
      AGE_RANGE_55_64: '55-64',
      AGE_RANGE_65_UP: '+65',
      AGE_RANGE_UNDETERMINED: 'Desconocida',
    };
    return ranges[range] || range;
  }

  private getLocationName(geoTargetConstant: string): string {
    // Aquí podrías hacer una lookup table o una llamada a la API
    // Por ahora retornamos el valor tal cual
    return geoTargetConstant || 'Unknown';
  }
}
