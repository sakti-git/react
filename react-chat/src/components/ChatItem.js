import React from 'react'
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import ReactMarkdown from 'react-markdown';
import moment from 'moment'
import { BsTrash } from "react-icons/bs";

function dateConvert(date) {
    if (date === moment().format('YYYY-MM-DD')) {
        return date = 'today'
    } else if (date === moment().subtract(1, 'days').format('YYYY-MM-DD')) {
        return date = 'yesterday'
    } else {
        return date = moment(date).format('MMM Do, YYYY')
    }
}

export default function ChatItem(props) {
    return (
        <ul className="p-0">
            <li>
                <div>
                    <h3 className="mb-1 mt-2" style={{ color: "yellow" }}>{props.name}</h3>
                    <span>{dateConvert(props.message.date)}</span>
                    <div className="card mt-2 mr-4 mb-2" style={{ backgroundColor: "darkblue", borderRadius: "30px" }}>
                        <p className="ml-2 mt-0 mb-0"></p>
                        <ReactMarkdown className="text-white ml-4 mt-3" source={props.message} />
                    </div>
                </div>
                <div>
                    {!props.sent && <p style={{ color: 'red', 'font-size': '8pt' }}>Network Failed</p>}
                    <AwesomeButton type="secondary" onPress={props.sent ? props.hapus : props.resend}><BsTrash />{props.sent ? 'Delete' : 'Resend'}</AwesomeButton>
                </div>
            </li>
        </ul>
    )
}