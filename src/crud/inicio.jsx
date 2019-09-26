import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

class Inicio extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('boards');
        this.state = {
            boards: []
        };
    }

    onCollectionUpdate = (query) => {
        const boards = [];
        query.forEach((doc) => {
            const { title, description, author } = doc.data();
            boards.push({
                key: doc.id,
                doc,
                title,
                description,
                author,
            });
        });
        this.setState({
            boards
        });
    }

    componentDidMount() {
        this.ref.onSnapshot(this.onCollectionUpdate);
    }

    delete(id) {
        firebase.firestore().collection('boards').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.history.push("/")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    render() {
        return (
            <div>

                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Lista de Peliculas</h3>
                        </div>
                        <div className="panel-body">
                            <Link to="/create" className="btn btn-success">Agregar</Link>
                            <br />
                            <br />
                            <table className="table table-stripe">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Author</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.boards.map(board =>
                                        <tr>
                                            <td>{board.title}</td>
                                            <td>{board.description}</td>
                                            <td>{board.author}</td>
                                            <td><Link to={`/edit/${board.key}`} className="btn btn-primary">Editar</Link>
                                            <span>  </span>
                                                <button onClick={this.delete.bind(this, board.key)} class="btn btn-danger">Delete
                                                </button></td>
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

export default Inicio;