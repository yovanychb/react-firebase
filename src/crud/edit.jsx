import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      nombre: '',
      descripcion: '',
      precio: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('productos').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const producto = doc.data();
        this.setState({
          key: doc.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio
        });
      } else {
        console.log("Fallo al obtener el registro");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({producto:state});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { nombre, descripcion, precio } = this.state;
    const updateRef = firebase.firestore().collection('productos').doc(this.state.key);
    updateRef.set({
      nombre,
      descripcion,
      precio
    }).then((docRef) => {
      this.setState({
        key: '',
        nombre: '',
        descripcion: '',
        precio: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error al actualizar: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-nombre">
              Editar Pelicula
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" className="form-control" name="nombre" value={this.state.nombre} onChange={this.onChange} placeholder="Nombre" />
              </div>
              <div className="form-group">
                <label for="descripcion">Descripcion:</label>
                <textArea type="text" className="form-control" name="Descripcion" value={this.state.descripcion} onChange={this.onChange} placeholder="Descripcion" />
              </div>
              <div className="form-group">
                <label for="precio">Precio:</label>
                <input type="number" className="form-control" name="precio" value={this.state.precio} onChange={this.onChange} placeholder="Precio" />
              </div>
              <button type="submit" className="btn btn-success">Guardar</button>
              <span>  </span>
              <Link to={`/`} className="btn btn-danger">Cancelar</Link>&nbsp;
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;