import React, {Component} from 'react'
import {Container, List} from 'semantic-ui-react'

import Usuario from './Usuario'
import Navegacao from './Navegacao'

class Ranking extends Component {
    render() {
        return (
            <div>
                <Navegacao/>
                <h2>RANKING</h2>
                <p>Quem é o mestre??</p>
                <Container>
                    <List divided verticalAlign="left"> 
                        <Usuario 
                            foto='' 
                            nome='Lucas Emanoel' 
                            pontos='100'/>
                        <Usuario 
                            foto='' 
                            nome='Gidiane Ramos' 
                            pontos='100'/>
                        <Usuario 
                            foto='' 
                            nome='Gerundio' 
                            pontos='50'/>
                    </List>
                </Container>
            </div>
        )
    }
}

export default Ranking