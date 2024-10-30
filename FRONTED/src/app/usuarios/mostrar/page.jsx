import BorrarUsuario from "@/components/borrar";
import axios from "axios";
import Link from "next/link";

async function getUsuarios(){
    
    const url="http://localhost:3000";
    const usuarios=await axios.get(url);
    return usuarios.data;
}

export default async function Usuarios (){
    const usuarios= await getUsuarios();
    return(
        <>

        <h1>Usuarios</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Editar/Borrar</th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios.map((usuarios,i)=>(
                        <tr key={i}>
                        <td>{i+1}</td>
                        <td>{usuarios.nombre}</td>
                        <td>{usuarios.usuario}</td>
                        <td>
                            <BorrarUsuario id={usuarios.id}/>
                            </td>
                        </tr>
                    ))

                } 

            </tbody>
        </table>
        </>
    );
}