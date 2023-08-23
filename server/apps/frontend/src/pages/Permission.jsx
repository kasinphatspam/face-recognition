import React from "react";
import { AnalyticsNavigation } from "@/components/Navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from "@nextui-org/react";
import Vertical from "@/components/Vertical";
import {columns, statusOptions , role} from "@/data/column";
import {capitalize} from "@/utils/capitalize";
import { Search , ChevronDown, Plus , MoreVertical, CornerLeftDown } from "react-feather";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

export default function PermissionPage() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  /** head column content */
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  /** Set filtered Item by roles input (dependent on data pool) */
  const filteredItems = React.useMemo(() => {
    let filteredroles = [...role];
    if (hasSearchFilter) {
      filteredroles = filteredroles.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredroles = filteredroles.filter((item) =>
        Array.from(statusFilter).includes(item.status),
      );
    }

    return filteredroles;
  }, [role, filterValue, statusFilter]);

  /** function pages location */
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  /** function change page to Next page */
  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  /** function change page to Previous page */
  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  /** function set Row per pages */
  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  /** function collect values on search changed */
  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  /** function call when clear value on search */
  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])
  
  /* Cell table content */
  const renderCell = React.useCallback((roles, columnKey) => {
    const cellValue = roles[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <p>{cellValue}</p>
        );
      case "roles":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{roles.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[roles.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MoreVertical className="text-default-300" /> 
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  /** function set item in pages  */
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  /** Set item sort descriptor */
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  /** Top content function */
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDown className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDown className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<Plus />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {role.length} roles</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    role.length,
    onSearchChange,
    hasSearchFilter,
  ]);


  /** bottom content function */
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);


  return (
    <>
      {/* Pages offset setup */}
      <div className="min-h-screen w-screen bg-gray-50">
        <AnalyticsNavigation
          Active="Permission"
          />
      <div className="flex flex-row">
        <Vertical/>

        <div className="flex flex-row mt-12 ml-[80px] mb-6">
          <div className="flex flex-col">
            <p className="text-inherit font-bold text-4xl align-bottom">Dashboard</p>

            {/* Head text display forum */}
            <div className="flex flex-row mt-6 ml-1">
              <p className="text-inherit font-light text-md align-bottom hover:underline">Analytics</p>
              <p className="text-inherit font-light text-md align-bottom ml-2">/</p>
              <p className="text-blue-500 font-medium text-md align-bottom ml-2 hover:underline">Permission</p>
            </div>
          
          {/* Employee list */}
          <div className="w-[75vw] min-h-[300px] -ml-4 mt-8 bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row">
                <CornerLeftDown className="h-6 w-6 mt-3 mr-1 ml-2"/>
                <p className="font-semibold text-2xl text-inherit ml-2">Permission roles </p>
            </div>
            <div className="mt-4 ml-4">
            <Table 
              aria-label="Example static collection table"
              color={"primary"}
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
              closeOnSelect={false}
              isHeaderSticky
              sortDescriptor={sortDescriptor}
              topContent={topContent}
              topContentPlacement="outside"
              bottomContent={bottomContent}
              bottomContentPlacement="outside"
              onSortChange={setSortDescriptor}
              classNames={{
                wrapper: "max-h-[284px]",
              }}
              >
                <TableHeader columns={headerColumns}>
                  {(column) => (
                    <TableColumn
                      key={column.uid}
                      align={column.uid === "actions" ? "center" : "start"}
                      allowsSorting={column.sortable}
                    >
                      {column.name}
                    </TableColumn>
                  )}
                  </TableHeader>
                  <TableBody emptyContent={"No roles found"} items={sortedItems}>
                    {(item) => (
                      <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}