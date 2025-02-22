export interface Wallet {
  portfolio: Asset[];
  plotBase64: string;
}

export interface CashValue {
  invested: number;
  inCash: number;
}

export interface Asset {
  name: string;
  allocation: number;
  historicalAnnualReturn: number;
  historicalAnnualVolatility: number;
  forecastAnnualReturn: number;
  forecastAnnualVolatility: number;
}

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567"];

export interface TimeSeriesData {
  dates: string[];
  values: number[];
}

export interface ForecastRequest {
  ticker: string;
  n_steps: number;
  order?: [number, number, number];
  seasonal_order?: [number, number, number, number];
  days?: number;
}

export interface ForecastResponse {
  forecast_dates: string[];
  forecast_values: number[];
  plot_base64?: string;
  metrics?: {
    [key: string]: number;
  };
}

export interface RiskNotebookResponse {
  notebook_html: string;
}

export interface RiskReport {
  html: string;
}
