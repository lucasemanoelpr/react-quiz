import React, {Component} from 'react'
import { Container, Header, Segment, Card, Button} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
import {auth, providers} from './../config.js'
import Navegacao from './Navegacao'

class Inicio extends Component {

	constructor(props){
		super(props)
		
		this.state = {
			usuario: {},
			estaLogado: false
		}

		auth.onAuthStateChanged((usuario)=> {
			if(usuario){
				this.setState({
					usuario,
					estaLogado: true
				})			
			}
			else{
				console.log('Não logou')
				this.setState({
					estaLogado: false
				})
			}
		})
	}

	autentica(provider){
		console.log(provider)
		auth.signInWithPopup(providers[provider])
	}

	render() {
		
		if(this.state.estaLogado){
			return <Redirect to='/categorias' />
		}

		return (
			<div>
				<Navegacao></Navegacao>
				<Container>
					<Segment piled>
						Quiz
					</Segment>
					<Header as="h2">
							Jogo de perguntas e respostas
					</Header>
					<p>
						Desafie seus amigos neste incrível jogo de perguntas e respostas.
					</p>
					{
						!this.state.estaLogado &&
							<Card fluid>
								<Card.Content>
									Acesse agora mesmo 
								</Card.Content>
								<Card.Content>
									<Button color="facebook" onClick={() => this.autentica('facebook')}>Login com Facebook</Button>
									<Button color="twitter" onClick={() => this.autentica('twitter')}>Login com Twitter</Button>
									<Button basic color="blue">Usuário Administrativo</Button>
								</Card.Content>
							</Card>
					}
					{
						this.state.estaLogado &&
						<div>
							<h3>{this.state.usuario.displayName}</h3>
							<img src={this.state.usuario.photoURL}></img>
						</div>
					}

					
				</Container>		
			</div>
		)
	}	
} 

export default Inicio