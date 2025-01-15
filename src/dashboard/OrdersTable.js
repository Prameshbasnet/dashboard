import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import { NumericFormat } from 'react-number-format';

// project import

function LoanDetail(Applicant, Address, Duration, protein) {
  return { Applicant, Address, Duration, protein };
}

const rows = [
  LoanDetail('Raju Singh', 'Kathmandu ', 40, 40570),
  LoanDetail('Shredhar Bhandari', '456 Maple St, Brooklyn', 120, 50000),
  LoanDetail('Amit Verma', '789 Oak Ave, Denver', 90, 15000),
  LoanDetail('Vikram Chauhan', '321 Pine Rd, Houston', 60, 70000),
  LoanDetail('Pooja Sharma', '654 Cedar St, Seattle', 30, 25000),
  LoanDetail('Rajesh Kumar', '987 Birch Ln, Boston', 180, 98000),
  LoanDetail('Neha Patel', '432 Spruce Blvd, Miami', 365, 123500),
  LoanDetail('Karan Singh', '159 Redwood Dr, Austin', 45, 38000),
  LoanDetail('Anita Yadav', '753 Cherry St, Chicago', 75, 62000),
  LoanDetail('Ravi Mehta', '951 Oakmont Ave, Dallas', 150, 89000)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'Applicant',
    align: 'left',
    disablePadding: false,
    label: 'Applicant'
  },
  {
    id: 'Address',
    align: 'left',
    disablePadding: true,
    label: 'Address'
  },
  {
    id: 'Duration',
    align: 'right',
    disablePadding: false,
    label: 'Duration'
  },
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'Total Amount'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

// const OrderStatus = ({ status }) => {
//   let color;
//   let title;

//   switch (status) {
//     case 0:
//       color = "warning";
//       title = "Pending";
//       break;
//     case 1:
//       color = "success";
//       title = "Approved";
//       break;
//     case 2:
//       color = "error";
//       title = "Rejected";
//       break;
//     default:
//       color = "primary";
//       title = "None";
//   }

//   return (
//     <Stack direction="row" spacing={1} alignItems="center">
//       <Dot color={color} />
//       <Typography>{title}</Typography>
//     </Stack>
//   );
// };

// OrderStatus.propTypes = {
//   status: PropTypes.number
// };

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('Applicant');
  const [selected] = useState([]);

  const isSelected = (Applicant) => selected.indexOf(Applicant) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.Applicant);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.Applicant}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.Applicant}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.Address}</TableCell>
                  <TableCell align="right">{row.Duration}</TableCell>
                  {/* <TableCell align="left">
                    <OrderStatus status={row.carbs} />
                  </TableCell> */}
                  <TableCell align="right">
                    <NumericFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
