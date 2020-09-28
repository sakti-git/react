import React from 'react'
import ChatForm from './ChatForm'
import ChatList from './ChatList'
import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'token': 'token' }
});

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
        this.addChat = this.addChat.bind(this)
        this.removeChat = this.removeChat.bind(this)
        this.resendChat = this.resendChat.bind(this)
    }

    componentDidMount() {
        request.get('chats').then(data => {
            const completeData = data.data.map(item => {
                item.sent = true;
                return item
            })
            console.log(completeData)
            this.setState({ data: completeData })
        }).catch(err => {
            console.log(err)
        })
    }

    addChat(name, message) {
        const id = Date.now()
        this.setState((state, props) => ({
            data: [...state.data, { id, name, message, sent: true }]
        }));
        request.post('chats', {
            id,
            name,
            message
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err)
            this.setState((state, props) => ({
                data: state.data.map(item => {
                    if (item.id === id) {
                        item.sent = false;
                    }
                    return item;
                })
            }));
        })
    }

    removeChat(id) {
        this.setState((state, props) => ({
            data: state.data.filter(item => item.id !== id)
        }));
        request.delete(`chats/${id}`).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }

    resendChat(id, name, message) {
        request.post('chats', {
            id,
            name,
            message
        }).then(data => {
            this.setState((state, props) => ({
                data: state.data.map(item => {
                    if (item.id === id) {
                        item.sent = true;
                    }
                    return item;
                })
            }));
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="container col-7 mt-3">
                <form className="card mb-2" style={{backgroundColor:"saddlebrown"}}>
                    <h1 className="mt-2" style={{alignSelf:"center"}}>React Chat</h1>
                </form>
                <form className="card mb-2" style={{backgroundColor:"burlywood"}}>
                    <ChatList data={this.state.data} remove={this.removeChat} resend={this.resendChat} />
                </form>
                <form className="card mb-2" style={{backgroundColor:"burlywood"}}>
                    <div>
                        <ChatForm add={this.addChat} />
                    </div>
                </form>
            </div>
        )
    }
}