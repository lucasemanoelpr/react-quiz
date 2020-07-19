import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'

import Categoria from './Categoria'
import Navegacao from './Navegacao'
import config,  {auth, providers} from './../config.js'

class Categorias extends Component {
    constructor(props){
        super(props)

        this.state = {
            categorias: {}
        }

        config.syncState('categorias', {
                context: this,
                state: 'categorias',
                asArray: false
        })
    }
    render() {
        return (
            <div>
                <Navegacao/>
                <h2>Lista de Categorias</h2>
                <p>Selecione a categoria que você quer responder perguntas</p>
               
                <Grid columns={5} divided>
                    {
                        Object.keys(this.state.categorias)
                            .map(key => {
                                return <Categoria key={key} titulo={this.state.categorias[key].nome} icone={this.state.categorias[key].icone} id={key} />
                            })
                    }
                   
                </Grid>
            </div>
        )
    }
}

export default Categorias