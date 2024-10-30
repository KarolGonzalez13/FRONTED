import BorrarProducto from "@/components/borrarProducto";
import axios from "axios";
import Link from "next/link";

async function getProductos() {
    const url = "http://localhost:3000/productos";
    const productos = await axios.get(url);
    return productos.data;
}

export default async function Productos() {
    const productos = await getProductos();

    return (
        <>
            <h1>Productos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre del Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Editar / Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{producto.nombreP}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.precio}</td>
                                <td>
                                    <BorrarProducto id={producto.id} />
                                    <Link href={`/productos/editar/${producto.id}`}>
                                        / Editar
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center mt-4">
                <Link href={`/productos/nuevo/`}>
                    <button className="btn btn-outline-secondary">
                        <i className="bi bi-plus-lg"></i> Agregar Producto
                    </button>
                </Link>
            </div>
        </>
    );
}
