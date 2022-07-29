import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins'
  });

export const useGetTrendingCoins = (currency: string) => {
  const result = useQuery('getTrendings', () =>
    api
      .get(`markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(res => res.data)
  );

  return {
    ...result.data,
    trendingCoins: result.data,
  };
};

export const useGetHistoricalChart = (id: string, days = 365, currency: string) => {
  const result = useQuery('getHistory', () =>
    api
      .get(`${id}/market_chart?vs_currency=${currency}&days=${days}`)
      .then(res => res.data)
  );

  return {
    ...result.data,
    chartHistory: result.data,
  };
};