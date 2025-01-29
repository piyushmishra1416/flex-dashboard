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
      return "success";
    case "Awaiting Approval":
      return "info";
    case "Rejected":
      return "error";
    case "Processing":
      return "secondary";
    case "Paid":
        return "success";
    case "Vendor Not Found":
      return "warning";
    case "Duplicate":
      return "warning";
    case "Void":  
      return "error";
    default:
      return "primary";
  }
};

const apiUrl = "/api/invoices";
const updateInvoice = async (id: string, data: any) =>
  axios.put(`${apiUrl}/${id}`, data);
const deleteInvoice = async (id: string) => axios.delete(`${apiUrl}/${id}`);

const getCityFromPostalCode = async (postalCode: string) => {
  try {
    const response = await axios.get(
      `https://api.zippopotam.us/us/${postalCode}`
    );
    return response.data.places?.[0]?.["place name"] || "Unknown City";
  } catch (error) {
    return "Unknown City";
  }
};

export default function InvoicesTable({
  data,
  loading,
  page,
  onPageChange,
  totalRows,
  onRefresh,
}: InvoicesTableProps) {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true; // Prevents losing focus if not saved
    }
  };

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

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      await deleteInvoice(id.toString());
      onRefresh(); // Refresh data after successful deletion
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "vendorName",
      headerName: "Vendor Name",
      width: 200,
      renderHeader: (params) => (
        <Box sx={{ fontWeight: 'bold' , fontSize: '0.9rem'}}>{params.colDef.headerName}</Box>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.5",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "invoiceNumber",
      headerName: "Invoice",
      width: 200,
      renderHeader: (params) => (
        <Box sx={{ fontWeight: 'bold' , fontSize: '0.9rem'}}>{params.colDef.headerName}</Box>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.5",
            height: "100%",
          }}
        >
          No: {params.value}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderHeader: (params) => (
        <Box sx={{ fontWeight: 'bold' , fontSize: '0.9rem'}}>{params.colDef.headerName}</Box>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          variant="outlined"
          color={getStatusColor(params.value)}
          sx={{ 
            width: "200px",
          }}
        />
      ),
    },
    {
      field: "netAmount",
      headerName: "Net Amount",
      editable: true,
      renderHeader: (params) => (
        <Box sx={{ fontWeight: 'bold' , fontSize: '0.9rem'}}>{params.colDef.headerName}</Box>
      ),
      width: 200,
    },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      width: 200,
      renderHeader: (params) => (
        <Box sx={{ fontWeight: 'bold' , fontSize: '0.9rem'}}>{params.colDef.headerName}</Box>
      ),
      valueGetter: (params) => dayjs(params).format("YYYY-MM-DD"),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      editable: true,
      width: 200,
      renderHeader: (params) => (
        <Box sx={{ fontWeight: 'bold' , fontSize: '0.9rem'}}>{params.colDef.headerName}</Box>
      ),
      valueGetter: (params) => dayjs(params).format("YYYY-MM-DD"),
    },
    {
      field: "department",
      headerName: "Department",
      headerClassName: 'bold-header',
      editable: true,
      renderHeader: (params) => (
        <Box sx={{ fontWeight: 'bold' , fontSize: '0.9rem'}}>{params.colDef.headerName}</Box>
      ),
      width: 200,
    },
    {
      field: "poNumber",
      headerName: "Cost Center",
      editable: true,
      width: 200,
      renderHeader: (params) => (
        <Box sx={{ fontWeight: 'bold' , fontSize: '0.9rem'}}>{params.colDef.headerName}</Box>
      ),
      renderCell: (params: any) => {
        const [city, setCity] = useState("Loading...");

        useEffect(() => {
          getCityFromPostalCode(params.value).then(setCity);
        }, [params.value]);

        return <span>{city}</span>;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      renderHeader: (params) => (
        <Box sx={{ fontWeight: 'bold' , fontSize: '0.9rem'}}>{params.colDef.headerName}</Box>
      ),
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
          />,
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
