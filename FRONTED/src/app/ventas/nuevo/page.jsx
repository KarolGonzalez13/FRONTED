"use client"
import axios from "axios";

async function nuevaVenta(e) {
    e.preventDefault();
    console.log("Estas en nuevaVenta");
    const url = "http://localhost:3000/nuevaVenta";
    const datos = {
        id_usu: document.getElementById("idUsuario").value, // Ajustado a `id_usu`
        id_prod: document.getElementById("idProducto").value, // Ajustado a `id_prod`
        cantidad: document.getElementById("cantidad").value
    };
    
    const respuesta = await axios.post(url, datos);
    location.replace("http://localhost:3001/ventas/mostrar");
}

export default function Nuevo() {
    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 mb-5 centrar" onSubmit={nuevaVenta} action="" method="post">
                    <div className="card">
                        <div className="card-header">
                            <h1>Nueva Venta</h1>
                        </div>
                        <div className="card-body">
                            <input id="idUsuario" placeholder="ID del Usuario" autoFocus type="text" className="form-control" />
                            <input id="idProducto" placeholder="ID del Producto" autoFocus type="text" className="form-control" />
                            <input id="cantidad" placeholder="Cantidad a Comprar" autoFocus type="text" className="form-control mb-4" />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-outline-success col-12 mt-3 mb-3" type="submit">Vender</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
