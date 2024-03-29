import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { visuallyHidden } from "@mui/utils";

import SearchInput from "./SearchInput";

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
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

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  headers
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "selecione todos os registros"
            }}
          />
        </TableCell>
        {headers.map(
          (header) =>(
              <TableCell
                key={header.id}
                sortDirection={orderBy === header.id ? order : false}
                align="left"
              >
                <TableSortLabel
                  active={orderBy === header.id}
                  direction={orderBy === header.id ? order : "asc"}
                  onClick={createSortHandler(header.id)}
                >
                  {header.label}
                  {orderBy === header.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "em ordem descendente"
                        : "em ordem ascendente"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
        )}
        <TableCell align="center">Opções</TableCell>
      </TableRow>
    </TableHead>
  );
}


function EnhancedTableToolbar({
  numSelected,
  onToggleFilterDialog,
  onToggleDeleteDialog,
  onToggleSubmitDialog
}) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onToggleDeleteDialog}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Box sx={{ flex: "1 1 100%" }}>
            <SearchInput label="Pesquisar" id="txbSearchUsers" />
            <Tooltip>
              <IconButton onClick={onToggleFilterDialog}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Tooltip>
            <Button variant="contained" onClick={onToggleSubmitDialog}>
				Cadastrar
            </Button>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}

const RowOptionsMenu = ({ options, registryId }) => {
  const [anchorElRowOptions, setAnchorElRowOptions] = React.useState(null);

  const handleToggleRowOptionsMenu = (event) => {
    setAnchorElRowOptions(
      anchorElRowOptions === null ? event.currentTarget : null
    );
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Abrir opções">
        <IconButton onClick={handleToggleRowOptionsMenu}>
          <MoreHorizIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElRowOptions}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        open={Boolean(anchorElRowOptions)}
        onClose={handleToggleRowOptionsMenu}
      >
        {options.map((option) => (
          <MenuItem key={option.id} onClick={() => option.onClick(registryId)}>
            <Typography textAlign="left">{option.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default function TesteTable({
  isLoadingData,
  selectRow,
  organizedData,
  headers,
  numberOfPages,
  numberOfRows,
  onToggleFilterDialog,
  onToggleSubmitDialog,
  onToggleDeleteDialog,
  rowOptions
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(headers[0].id);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - organizedData.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(organizedData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, organizedData]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ p: 3, width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onToggleFilterDialog={onToggleFilterDialog}
          onToggleSubmitDialog={onToggleSubmitDialog}
          onToggleDeleteDialog={onToggleDeleteDialog}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={visibleRows.length}
              headers={headers}
            />
            <TableBody>
              {isLoadingData 
				? (
					<TableRow>
					  <TableCell colSpan={headers.length + 2} align="center">
						Carregando informações...
					  </TableCell>
					</TableRow>
				  )
				: visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkboxa-${index}`;
				const rowCells = Object.values(row).map((value, index) => {
					if(index === 0)
						return (
							<TableCell
							  component="th"
							  id={labelId}
							  scope="row"
							>
								{value}
							</TableCell>
						);
					else
						return (<TableCell>{value}</TableCell>);
				})
				

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId
                        }}
                      />
                    </TableCell>
                    {rowCells}
                    <TableCell align="center">
                      <RowOptionsMenu options={rowOptions} registryId={row.id} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={headers.length + 2} />
                </TableRow>
              )}
			  {(organizedData.length === 0 && !isLoadingData) && (
				<TableRow>
                  <TableCell colSpan={headers.length + 2} align="center" >
					Nenhum registro encontrado. <a href="#">Cadastrar novos dados</a>
				  </TableCell>
                </TableRow>
			  )}
			</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={numberOfRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
