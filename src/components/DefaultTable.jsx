import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const data = [
  ["Nome", "E-mail", "Telefone", "Tipo"],
  ["João", "joaoa@email.com", "(11)98651-2354", "Gestor"],
  ["Antônia", "joaoa@email.com", "(11)98651-2354", "Funcionário"],
  ["Paulo", "joaoa@email.com", "(11)98651-2354", "Funcionário"]
];

const rowOptions = [{ name: "Editar", action: () => true }];

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  )
];

function preventDefault(event) {
  event.preventDefault();
}

export default function DefaultTable({
  selectColumn,
  data,
  headers,
  rowOptions
}) {
  return (
    <React.Fragment>
      <Title>Usuários</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{headers[1]}</TableCell>
            <TableCell>{headers[2]}</TableCell>
            <TableCell>{headers[3]}</TableCell>
            <TableCell>{headers[4]}</TableCell>
            <TableCell align="center">Opções</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row[0]}>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[3]}</TableCell>
              <TableCell>{row[4]}</TableCell>
              <TableCell align="center">...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
