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
