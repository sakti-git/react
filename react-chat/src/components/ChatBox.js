import React from 'react'
import ChatForm from './ChatForm'
import ChatList from './ChatList'
import axios from 'axios'
import io from 'socket.io-client'
import moment from 'moment'

var socket = io.connect('http://localhost:3001/')

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
        this.loadChat()

        const time = moment().format('h:mm a')
        socket.on('chat', function (data) {
            this.setState((state, props) => (
                {
                    data: [...state.data, { ...data, time, sent: true }]
                }))
        }.bind(this))

        socket.on('delete-chat-frontend', function (id) {
            this.setState((state, props) =>
                ({
                    data: state.data.filter(item => {
                        return item.id !== id.id
                    })
                }))
        }.bind(this))
    }

    loadChat() {
        request.get('chats').then(data => {
            const completeData = data.data.map(item => {
                item.sent = true;
                return item
            })
            console.log('Data Complete', completeData);
            this.setState({ data: data.data })
        }).catch(err => {
            console.log('Component Error', err);
        })
    }

    addChat(name, message) {
        const id = Date.now()
        const time = moment().format('h:mm a')

        this.setState((state, props) => ({
            data: [...state.data, { id, name, message, time, sent: true }]
        }));

        socket.emit('chat', {
            id,
            name,
            message
        })

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

        socket.emit('delete chat backend', {
            id
        })

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
        const mystyle = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Garamond"
        };
        return (
            <div className="container col-7 mt-3">
                <form className="card" style={mystyle}>
                    <h1 className="mt-2" color="" style={{ alignSelf: "center" }}>--- React Chat ---</h1>
                </form>
                <form className="card" style={{ borderColor: "powderblue", borderStyle: "double", backgroundColor: "cadetblue" }}>
                    <ChatList data={this.state.data} remove={this.removeChat} resend={this.resendChat} />
                </form>
                <form className="card" style={{ borderColor: "powderblue", borderStyle: "double", backgroundColor: "currentcolor" }}>
                    <div>
                        <ChatForm add={this.addChat} />
                    </div>
                </form>
            </div>
        )
    }
}