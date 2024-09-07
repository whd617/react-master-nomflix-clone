import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import styled from 'styled-components';

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string /* 하루의 시작 가격 */;
  high: string /* 하루의 가장 높은 가격 */;
  low: string /* 하루의 가장 낮은 가격 */;
  close: string /* 하루의 종가 */;
  volume: string;
  market_cap: number;
}

const Table = styled.table`
  margin-bottom: 50px;
`;

const Th = styled.th`
  margin-left: 100px;
  text-align: center;
  border-top: 1px solid #ccc; /* 테이블 헤더 구분선 */
  border-bottom: 1px solid #ccc; /* 테이블 헤더 구분선 */
  border-left: 1px solid #ccc; /* 테이블 헤더 구분선 */
`;

const LastTh = styled(Th)`
  border-right: 1px solid #ccc; /* 마지막 셀에만 오른쪽 경계선 추가 */
`;

const Td = styled.td`
  margin-left: 100px;
  text-align: center;
  border-bottom: 1px solid #ccc; /* 테이블 헤더 구분선 */
  border-left: 1px solid #ccc; /* 테이블 헤더 구분선 */
`;

const LastTd = styled(Td)`
  border-right: 1px solid #ccc; /* 마지막 셀에만 오른쪽 경계선 추가 */
`;

const formatDateTime = (dateTimeString: number) => {
  const date = new Date(dateTimeString);
  // 년-월-일 시:분:초 형식으로 변환
  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  console.log(formattedDate);
  return formattedDate;
};
function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 1000000,
    },
  );

  if (isLoading) return <div>Loading...</div>;

  if (!Array.isArray(data)) {
    console.log('데이터가 배열이 아닙니다:', data);
    return <div>Invalid data format</div>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>마감날짜</Th>
          <Th>시작가격</Th>
          <Th>가장 높은 가격</Th>
          <Th>가장 낮은 가격</Th>
          <LastTh>종가</LastTh>
        </tr>
      </thead>
      <tbody>
        {data?.map((price, index) => (
          <tr key={index}>
            <Td>{formatDateTime(price.time_close)}</Td>
            <Td>{price.close}</Td>
            <Td>{price.open}</Td>
            <Td>{price.high}</Td>
            <LastTd>{price.low}</LastTd>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Price;
