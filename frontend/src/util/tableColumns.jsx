import { Button, Tooltip } from '@mui/material';

export const userColumns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'name',
    headerName: 'Nombre',
    width: 120,
    editable: true,
  },
  {
    field: 'lastname',
    headerName: 'Apellidos',
    width: 120,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Correo',
    width: 250,
    editable: true,
  },
  {
    field: 'roles',
    headerName: 'Rol',
    width: 100,
    editable: false,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 180,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          <Tooltip title='Ver usuario' arrow>
            <Button
              onClick={(e) => {
                console.log(e, params.row);
              }}
            >
              <ion-icon name='eye'></ion-icon>
            </Button>
          </Tooltip>
          <Tooltip title='Editar' arrow>
            <Button
              onClick={(e) => {
                console.log(e, params.row);
              }}
            >
              <ion-icon name='create'></ion-icon>
            </Button>
          </Tooltip>
          <Tooltip title='Eliminar' arrow>
            <Button
              onClick={(e) => {
                console.log(e, params.row);
              }}
            >
              <ion-icon name='trash'></ion-icon>
            </Button>
          </Tooltip>
        </>
      );
    },
  },
];
