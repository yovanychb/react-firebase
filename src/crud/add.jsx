import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

export default class Add extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('productos');
    this.state = {
      nombre: '',
      descripcion: '',
      precio: ''
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { nombre, descripcion, precio } = this.state;
    this.ref.add({
      nombre,
      descripcion,
      precio
    }).then((docRef) => {
      this.setState({
        nombre: '',
        descripcion: '',
        precio: ''
      });
      this.props.history.push("/")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { nombre, descripcion, precio } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-nombre">
              Agregar Producto
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" className="form-control" name="nombre" value={nombre}
                  onChange={this.onChange} placeholder="Nombre" required />
              </div>
              <div className="form-group">
                <label for="descripcion">Descripcion:</label>
                <textArea className="form-control" name="descripcion" onChange={this.onChange}
                  placeholder="Descripcion" cols="80" rows="3" required>{descripcion}</textArea>
              </div>
              <div className="form-group">
                <label for="precio">Precio:</label>
                <input type="number" className="form-control" name="precio" value={precio}
                  onChange={this.onChange} placeholder="0.0" required />
              </div>
              <button type="submit" className="btn btn-success">Agregar</button>
              <span>  </span>
              <Link to={`/`} className="btn btn-danger">Cancelar</Link>&nbsp;
            </form>
          </div>
        </div>
      </div>
    );
  }
}