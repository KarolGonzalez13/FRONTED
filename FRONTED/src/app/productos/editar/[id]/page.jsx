"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Función para obtener los datos del producto
async function getProducto(id) {
    try {
        const url = `http://localhost:3000/buscarProductoPorId/${id}`;
        const producto = await axios.get(url);
        console.log("Datos obtenidos del producto:", producto.data);
        return producto.data;
    } catch (error) {
        console.error("Error al obtener los datos del producto:", error);
        return null;
    }
}

// Función para actualizar el producto
async function actualizarProducto(e, id, datosProducto) {
    e.preventDefault();
    try {
        console.log("Actualizando producto...");
        const url = `http://localhost:3000/actualizarProducto/${id}`;
        const datos = {
            nombreP: datosProducto.nombreP,
            cantidad: datosProducto.cantidad,
            precio: datosProducto.precio,
        };
        await axios.patch(url, datos);
        window.location.replace("http://localhost:3001/productos/mostrar");
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
    }
}

export default function ProductoPage({ params }) {
    const [datosProducto, setDatosProducto] = useState({
        nombreP: "",
        cantidad: "",
        precio: "",
    });

    const router = useRouter();
    const { id } = params;

    // Obtener los datos del producto cuando el componente se monta
    useEffect(() => {
        if (id) {
            getProducto(id).then((data) => {
                setDatosProducto({
                    nombreP: data.nombreP || "", 
                    cantidad: data.cantidad || "",
                    precio: data.precio || "", 
                });
            });
        }
    }, [id]);

    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setDatosProducto((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    return (
        <>
            <div className="m-0 row justify-content-center">
                <form
                    className="col-6 mt-5 mb-5 centrar"
                    onSubmit={(e) => actualizarProducto(e, id, datosProducto)}
                    method="patch"
                >
                    <div className="card">
                        <div className="card-header">
                            <h1>Editar Producto</h1>
                        </div>
                        <div className="card-body">
                            <input
                                id="nombreP"
                                placeholder="Nombre del Producto"
                                type="text"
                                className="form-control"
                                value={datosProducto.nombreP}
                                onChange={handleInputChange}
                                autoFocus
                            />
                            <input
                                id="cantidad"
                                placeholder="Cantidad"
                                type="text"
                                className="form-control"
                                value={datosProducto.cantidad}
                                onChange={handleInputChange}
                            />
                            <input
                                id="precio"
                                placeholder="Precio"
                                type="text"
                                className="form-control mb-4"
                                value={datosProducto.precio}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="card-footer">
                            <button
                                className="btn btn-outline-secondary col-12 mt-3 mb-3"
                                type="submit">Editar producto</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Vista previa de los datos del producto */}
            <div>
                <h1>Datos de {datosProducto.nombreP}</h1>
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Cantidad:</strong> {datosProducto.cantidad}</p>
                <p><strong>Precio:</strong> {datosProducto.precio}</p>
            </div>
        </>
    );
}
