import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

export default class Inicio extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('productos');
        this.state = {
            productos: []
        };
    }

    componentDidMount() {
        this.ref.onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (query) => {
        const productos = [];
        query.forEach((doc) => {
            const { nombre, descripcion, precio } = doc.data();
            productos.push({
                key: doc.id,
                doc,
                nombre,
                descripcion,
                precio
            });
        });
        this.setState({
            productos
        });
    }


    delete(id) {
        firebase.firestore().collection('productos').doc(id).delete().then(() => {
            console.log("Eliminado");
            this.props.history.push("/")
        }).catch((error) => {
            console.error("Error al eliminar: ", error);
        });
    }

    render() {
        return (
            <div>

                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Lista de Productos</h3>
                        </div>
                        <div className="panel-body">
                            <Link to="/create" className="btn btn-success">Agregar</Link>
                            <br /><br />
                            <table className="table table-stripe">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripcion</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.productos.map(producto =>
                                        <tr>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.descripcion}</td>
                                            <td>$ {producto.precio}</td>
                                            <td><Link to={`/edit/${producto.key}`} className="btn btn-primary">Editar</Link>
                                                <span>  </span>
                                                <button onClick={this.delete.bind(this, producto.key)} class="btn btn-danger">
                                                    Eliminar</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}