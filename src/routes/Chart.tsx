import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { isDarkAtom } from '../atoms';
import { useRecoilValue } from 'recoil';

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    },
  );
  console.log(data);
  if (isLoading) return <div>Loading...</div>;

  if (!Array.isArray(data)) {
    console.log('데이터가 배열이 아닙니다:', data);
    return <div>Invalid data format</div>;
  }

  const candlestickData = data.map((price) => ({
    x: new Date(price.time_close),
    y: [
      Number(price.open), // open
      Number(price.high), // high
      Number(price.low), // low
      Number(price.close), // close
    ],
  }));

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type='candlestick'
          series={[
            {
              data: candlestickData,
            },
          ]}
          options={{
            chart: {
              type: 'candlestick',
              height: 350,
              toolbar: {
                show: false,
              },
            },
            title: {
              align: 'left',
            },
            xaxis: {
              type: 'datetime',
              labels: {
                style: {
                  colors: isDark ? '#ffffff' : 'black',
                },
                formatter: (value) => {
                  const date = new Date(value);
                  const hours = date.getUTCHours().toString().padStart(2, '0');
                  const minutes = date
                    .getUTCMinutes()
                    .toString()
                    .padStart(2, '0');
                  return `${hours}:${minutes}`;
                },
                offsetX: 0, // 레이블의 x축 오프셋 조정
                offsetY: 1, // 레이블의 y축 오프셋 조정
              },
              tickAmount: 5, // tick의 개수 조정
              axisBorder: {
                show: true, // 축의 테두리 숨기기
              },
              axisTicks: {
                show: true, // 축의 ticks 숨기기
              },
            },
            yaxis: {
              tooltip: {
                enabled: false,
              },
              labels: {
                style: {
                  colors: isDark ? '#ffffff' : 'black',
                },
                formatter: (value) => Math.floor(value).toString(), // 소수점을 제거하고 정수로 표시
              },
            },
            tooltip: {
              shared: true,
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            theme: {
              mode: isDark ? 'dark' : 'light', // 다크 모드 활성화
            },
            colors: ['#ffffff', '#f00', '#0f0', '#00f'],
          }}
        />
      )}
    </div>
  );
}

export default Chart;
