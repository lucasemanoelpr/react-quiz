import React, {Component} from 'react'
import {Grid, Radio, Button, Message, Icon, Progress} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import Navegacao from './Navegacao'

class Perguntas extends Component {

    constructor(props){
        super(props)

        this.state = {
            perguntas: {},
            estaCarregando: false,
            perguntaAtual: 0,
            totalPerguntas: 0,
            resposta: {},
            pontos: 0,
            resultado: [],
            terminei: false,
            respostaAtual: {},
            acertou: false
        }

        this.proximaPergunta = this.proximaPergunta.bind(this)
        this.onRadioChange = this.onRadioChange.bind(this)
    }

    componentDidMount(){
        this.carregaPerguntas(this.props.match.params.nomeCat)
    }

    carregaPerguntas(nomeCat){
       
        this.setState({
            estaCarregando: true,
            perguntas: {}
        })
        const url = `https://react-quiz-learning.firebaseio.com/categorias.json?orderBy="nome"&equalTo="${nomeCat}"`
        axios
            .get(url)
            .then(dados => {
                const chave = Object.keys(dados.data)[0]
                const listaDePerguntas = dados.data[chave];
                
                this.setState({
                    perguntas: listaDePerguntas,
                    estaCarregando: false,
                    totalPerguntas: _.size(listaDePerguntas)
                })
                console.log(listaDePerguntas)
            })
            .catch(err => {
                console.log(err)
            })

    }

    proximaPergunta(){
        const {perguntaAtual, totalPerguntas} = this.state   
        
        this.setState({
            resultado : [ ... this.state.resultado, this.state.respostaAtual]
        }) 

        if (this.state.acertou) {
            this.setState({pontos: this.state.pontos + 1})
            this.setState({acertou: false})
        }
        
        this.setState({respostaAtual: {}})

        if(perguntaAtual < totalPerguntas-1){
            this.setState({
                perguntaAtual: this.state.perguntaAtual+1
            })
        }
        else {
            console.log("Não há mais perguntas")
            console.log("Pontuação: ", this.state.pontos)
            this.setState({
                terminei: true
            })
        }
    }

    onRadioChange = (event, {resposta, name}) => {
        this.setState({resposta:resposta})
        const respostaCorreta = _.filter(this.state.perguntas.perguntas[name].alternativas, {'correta': true})[0].resposta
        const respostaJogador = resposta
        const acertou = respostaJogador === respostaCorreta

        console.log("a resposta do jogador", respostaJogador)
        console.log("pergunta atual", this.state.perguntas.perguntas[name].titulo)
        console.log("a alternativa correta ",respostaCorreta)
        console.log("Acertou? ", acertou)

        if (acertou) {
            this.setState({acertou: true})
        }

        const res = {
            pergunta: this.state.perguntas.perguntas[name].titulo,
            resposta: respostaJogador,
            acertou,
            pontos: this.state.pontos
        }

        this.setState({respostaAtual : res});
    }

    renderPergunta(pergunta, id) {
        return (
            <span>
                <h3>PERGUNTA: {pergunta.titulo}?</h3>
                <Grid columns={2} >
                    {
                        Object.keys(pergunta.alternativas)
                            .map(key=>{
                                return (
                                    <Grid.Column>
                                        <Message color="yellow">
                                            <p>{pergunta.alternativas[key].resposta}</p>
                                            <Radio 
                                                toggle
                                                name={id}
                                                resposta={pergunta.alternativas[key].resposta}
                                                checked={this.state.resposta === pergunta.alternativas[key].resposta}
                                                onChange={this.onRadioChange}
                                            />
                                        </Message>
                                    </Grid.Column>
                                )
                            })
                    }                    
                </Grid>
            </span>            
        )
    }

    render () {
        
        const {icone, nome, perguntas} = this.state.perguntas
        if (this.state.estaCarregando){
            return <p>Carregando...</p>
        }

        if (this.state.terminei){

            return (
                <Redirect to={{
                    pathname : '/resultado',
                    state: {
                        resultado: this.state.resultado,
                        pontos: this.state.pontos
                    }
                }}/>
            )
        }


        let item = []

        return (
           
            <div>
                <Navegacao/>
                
                <h2>{nome} <Icon name={icone}/> </h2>
                <p>Mostre que você conhece tudo sobre este assunto</p>
                {
                    perguntas && Object.keys(perguntas)
                        .map(key =>{
                            item.push(key)
                        })
                }
                {
                    perguntas && this.renderPergunta(perguntas[item[this.state.perguntaAtual]],item[this.state.perguntaAtual])
                }
                <br></br>
                <Progress value={this.state.perguntaAtual + 1} total={item.length} progress='ratio' />
                <Button onClick={this.proximaPergunta}>Próxima</Button>
            </div>        
        )
    }    
}

export default Perguntas