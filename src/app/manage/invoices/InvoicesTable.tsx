import { Box, Chip } from "@mui/material";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { IInvoice } from "@/types/invoice";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";

interface InvoicesTableProps {
  data: IInvoice[];
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  totalRows: number;
  onRefresh: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "#4caf50";
    case "Awaiting Approval":
      return "#ff9800";
    case "Rejected":
      return "#f44336";
    case "Processing":
      return "#2196f3";
    default:
      return "#757575";
  }
};

const apiUrl = "/api/invoices"; // Adjust this URL to your API route
const updateInvoice = async (id: string, data: any) => axios.put(`${apiUrl}/${id}`, data);
const deleteInvoice = async (id: string) => axios.delete(`${apiUrl}/${id}`);

export default function InvoicesTable({
  data,
  loading,
  page,
  onPageChange,
  totalRows,
  onRefresh,
}: InvoicesTableProps) {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  // ✅ Handles when the user stops editing a row
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true; // Prevents losing focus if not saved
    }
  };

  // ✅ Handles updating a row when saving
  const processRowUpdate = async (newRow: IInvoice) => {
    try {
      await updateInvoice(newRow._id.toString(), newRow);
      onRefresh(); // Refresh data after successful update
      return newRow;
    } catch (error) {
      console.error("Error updating invoice:", error);
      return newRow;
    }
  };

  //  When clicking "Edit"
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  // ✅ When clicking "Save"
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View },
    }));
  };

  // ✅ When clicking "Cancel"
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  };

  // ✅ When clicking "Delete"
  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      await deleteInvoice(id.toString());
      onRefresh(); // Refresh data after successful deletion
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "vendorName", headerName: "Vendor Name", editable: true, width: 200 },
    { field: "invoiceNumber", headerName: "Invoice", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          sx={{
            bgcolor: getStatusColor(params.value),
            color: "white",
            width: "200px",
          }}
        />
      ),
    },
    { field: "netAmount", headerName: "Net Amount", editable: true, width: 200 },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      width: 200,
      valueGetter: (params) => dayjs(params).format("YYYY-MM-DD"),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      editable: true,
      width: 200,
      valueGetter: (params) => dayjs(params).format("YYYY-MM-DD"),
    },
    { field: "department", headerName: "Department", editable: true, width: 200 },
    { field: "poNumber", headerName: "Cost Center", editable: true, width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelClick(id)} />,
          ];
        }

        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "calc(100vh - 200px)",
        width: "100%",
        mt: 2,
        overflowX: "auto",
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        rowCount={totalRows}
        paginationMode="server"
        paginationModel={{ page: page - 1, pageSize: 10 }}
        onPaginationModelChange={(model) => onPageChange(model.page + 1)}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
