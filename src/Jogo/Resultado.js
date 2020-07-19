import React, {Component} from 'react'
import {List, Container} from 'semantic-ui-react'

import Resposta from "./Resposta"
import Navegacao from './Navegacao'


class Resultado extends Component {
    render(){

        const {resultado, pontos} = this.props.history.location.state
        
        
        return (
            <div>
                <Navegacao/>
                <h2>Seus Resultados</h2>
                <p>Confira o seu desempenho nesta categoria!</p>
                
                <Container>
                    <List divided verticalAlign="left"> 
                {
                    Object.keys(resultado)
                        .map(key => {
                            let pergunta = resultado[key].pergunta
                            let resposta = resultado[key].resposta
                            let acertou = resultado[key].acertou
                            console.log(pergunta);
                            console.log(resposta);
                            console.log(acertou);
                            return <Resposta resposta={resposta} pergunta={pergunta} acertou={acertou} key={key}/>
                            
                        })
                }                   

                    </List>
                </Container>
                <h3>Total: {pontos} ponto(s)</h3>
            </div>
        )
    }
}

export default Resultado