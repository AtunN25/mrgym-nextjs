
export interface ClientRegister {
    
    nombre_cliente: string;
    apellido_cliente: string;
    telefono_cliente: string;
    dni_cliente: string;
    email: string;
    miembro: boolean;
    habilitado:boolean
  }


export interface ClientUpdate {
  id_cliente: number;
  nombre_cliente: string;
  apellido_cliente: string;
  telefono_cliente: string;
  dni_cliente: string;
  email: string;
  miembro: boolean;
  habilitado:boolean
}