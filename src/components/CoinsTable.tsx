import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../utils/functions';
import Chart from './Chart';
import { Coin } from '../types';

interface Data {
    id: string;
    image: string,
    name: any;
    current_price: number;
    symbol: string;
    market_cap: number;
    low_24h: number;
    atl: number;
}

interface TableProps {
  trendingCoins: any;
}

function createData(
    id: string,
  image: string,
  name: any,
  symbol: string,
  current_price: number,
  market_cap: number,
  low_24h: number,
  atl: number,
): Coin {
  return {
    id,
    image,
    name,
    symbol,
    current_price,
    market_cap,
    low_24h,
    atl,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells: any = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Coin',
  },
  {
    id: 'symbol',
    numeric: true,
    disablePadding: false,
    label: '',
  },
  {
    id: 'current_price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'volume',
    numeric: true,
    disablePadding: false,
    label: '24h Volume',
  },
  {
    id: 'market_cap',
    numeric: true,
    disablePadding: false,
    label: 'Mkt Cap',
  },
  {
    id: 'low_24h',
    numeric: true,
    disablePadding: false,
    label: 'Last 7 days',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => () => {
      onRequestSort(property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells?.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const CoinsTable: React.FC<TableProps> = ({ trendingCoins }) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const navigate = useNavigate();

  const rows = trendingCoins?.map((record: Coin) => {
    const {
        id,
        image,
        name,
        symbol,
        current_price,
        market_cap,
        low_24h,
        atl,
    } = record;

    return createData(
        id,
        image,
        name,
        symbol,
        current_price,
        market_cap,
        low_24h,
        atl,
    )
  });

  const handleRequestSort = (
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => navigate(`/coin/${row.id}`)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <CardHeader
                            avatar={
                                <Avatar sx={{ width: 24, height: 24 }} alt={row.name.toString()} src={row.image.toString()} variant="square" />
                            }
                            title={row.name.toString()}
                        />
                      </TableCell>
                      <TableCell align="right"><p className='uppercase'>{row.symbol}</p></TableCell>
                      <TableCell align="right">${numberWithCommas(row.current_price)}</TableCell>
                      <TableCell align="right">${numberWithCommas(row.market_cap)}</TableCell>
                      <TableCell align="right">${numberWithCommas(row.low_24h)}</TableCell>
                      <TableCell align="right">
                        <Chart type='sm' currency={'USD'} days={365} id={row.id} width={100} height={2} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}

export default CoinsTable;