import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductoForm = ({ producto, fetchProductos, setEditingProducto }) => {
    const [formData, setFormData] = useState({
        nombreProducto: '',
        precioProducto: 0,
        stockProducto: 0,
    });

    // Si se está editando, llenar el formulario con los datos del producto
    useEffect(() => {
        if (producto) {
            setFormData({
                nombreProducto: producto.nombreProducto,
                precioProducto: producto.precioProducto,
                stockProducto: producto.stockProducto,
            });
        }
    }, [producto]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (producto) {
            // Actualizar producto existente
            await axios.put(`http://127.0.0.1:8080/api/productos/${producto.id}`, formData);
        } else {
            // Crear nuevo producto
            await axios.post('http://127.0.0.1:8080/api/productos', formData);
        }

        // Limpiar el formulario y actualizar la lista
        setFormData({
            nombreProducto: '',
            precioProducto: 0,
            stockProducto: 0,
        });
        fetchProductos();
        setEditingProducto(null); // Salir del modo edición
    };

    return (
        <div className="mt-4">
            <h3>{producto ? 'Editar Producto' : 'Agregar Producto'}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombreProducto"
                        value={formData.nombreProducto}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precioProducto"
                        value={formData.precioProducto}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        name="stockProducto"
                        value={formData.stockProducto}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {producto ? 'Actualizar' : 'Agregar'}
                </button>
            </form>
        </div>
    );
};

export default ProductoForm;