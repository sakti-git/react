import React from 'react'
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { HiChatAlt } from "react-icons/hi"

export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', message: '' };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeMessage(event) {
        this.setState({ message: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.add(this.state.name, this.state.message);
        this.setState({ name: '', message: '' })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="col-12 mt-2">
                        <input type="text" className="form-control mb-2" placeholder="Your Name" value={this.state.name} onChange={this.handleChangeName} required />
                    </div>
                    <div className="col-12 mt-2">
                        <textarea type="text" className="form-control mb-2" placeholder="Write your chat here..." value={this.state.message} onChange={this.handleChangeMessage} required />
                        <div className="mb-2">
                            <AwesomeButton type="primary"><HiChatAlt/>Post</AwesomeButton>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}