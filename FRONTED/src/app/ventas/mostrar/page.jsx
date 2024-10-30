import EstatusVenta from "@/components/estatusVenta";
import axios from "axios";
import Link from "next/link";

async function getVentas() {
    const url = "http://localhost:3000/ventas";
    const ventas = await axios.get(url);
    return ventas.data;
}

export default async function Ventas() {
    const ventas = await getVentas();
    return (
        <>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Usuario</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estatus</th>
                        <th>Actualizar estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, i) => (
                        <tr key={i}>
                            <td>{venta.id}</td>
                            <td>{venta.id_usu}</td> {/* Ajustado para `id_usu` en lugar de `nombreUsuario` */}
                            <td>{venta.id_prod}</td> {/* Ajustado para `id_prod` en lugar de `nombreProducto` */}
                            <td>{venta.cantidad}</td>
                            <td>{venta.fecha}</td>
                            <td>{venta.hrs}</td> {/* Ajustado para `hrs` en lugar de `hora` */}
                            <td>{venta.estado}</td> {/* Ajustado para `estado` en lugar de `estatus` */}
                            <td>
                                <EstatusVenta id={venta.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center mt-4">
                <Link href={`/ventas/nuevo/`}>
                    <button className="btn btn-outline-secondary">
                        <i className="bi bi-plus-lg"></i> Nueva Venta
                    </button>
                </Link>
            </div>
        </>
    );
}
