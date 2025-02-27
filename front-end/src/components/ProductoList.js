import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductoForm from './ProductoForm';

const ProductoList = () => {
    const [productos, setProductos] = useState([]);
    const [editingProducto, setEditingProducto] = useState(null);

    // Obtener todos los productos
    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        const response = await axios.get('http://127.0.0.1:8080/api/productos');
        setProductos(response.data);
    };

    // Eliminar un producto
    const deleteProducto = async (id) => {
        await axios.delete(`http://127.0.0.1:8080/api/productos/${id}`);
        fetchProductos(); // Actualizar la lista
    };

    // Editar un producto
    const editProducto = (producto) => {
        setEditingProducto(producto);
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Productos</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombreProducto}</td>
                            <td>${producto.precioProducto}</td>
                            <td>{producto.stockProducto}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editProducto(producto)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteProducto(producto.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulario para agregar/editar */}
            <ProductoForm
                producto={editingProducto}
                fetchProductos={fetchProductos}
                setEditingProducto={setEditingProducto}
            />
        </div>
    );
};

export default ProductoList;
