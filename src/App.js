import { render } from '@testing-library/react';
import React, {Component} from 'react';
import './App.css';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component  {
  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }
  
  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth','start');
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;

    //leer si la pagina es 1 no ir hacia atras
    if(pagina === 1) return null;
    // Restar 1 a la pagina Siguiente
    pagina--;

    // agregar el cambio al state
    
    this.setState({pagina}, () => {
      this.consultarApi(); 
      this.scroll();
    });
    //console.log(pagina)

  }

  paginaSiguiente = () => {
    //leer el satate de la pagina actual 
    let pagina = this.state.pagina;
    // Sumar 1 a la pagina Siguiente
    pagina++;
    // agregar el cambio al state
    this.setState({pagina}, () => {
      this.consultarApi(); 
      this.scroll();
    })
    //console.log(pagina)

  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url =`https://pixabay.com/api/?key=21532034-3bf7914503936978274bc4f6b&q=${termino}&per_page=30&page=${pagina}`
    //console.log(url)

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits}))

  }

  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina:1
    }, () => {
      this.consultarApi();
     })
  }
  render(){
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador
            datosBusqueda = {this.datosBusqueda}
          />
        </div>   
        <div className="row justify-content-center" >
        <Resultado
          imagenes = {this.state.imagenes}
          paginaAnterior = {this.paginaAnterior}
          paginaSiguiente = {this.paginaSiguiente}
        />    
        </div>   
      </div>
    );
  }
}

export default App;
