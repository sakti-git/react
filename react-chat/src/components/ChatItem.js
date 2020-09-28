import React from 'react'

export default function ChatItem(props) {
    return (
        <ul className="p-0">
            <ul className="p-0">
                <li>
                    <div className="card mt-2 mr-2 mb-2" style={{ backgroundColor: "gainsboro" }}>
                        <h2 className="ml-2 mb-1">{props.name}</h2>
                        <p className="ml-2 mt-0 mb-0">{props.message}</p>
                    </div>
                    {!props.sent && <p style={{ color: 'red', 'font-size': '8pt' }}>network failed</p>}
                    <button className="btn btn-danger mb-4" onClick={props.sent ? props.hapus : props.resend}>{props.sent ? 'hapus' : 'kirim ulang'}</button>
                </li>
            </ul>
        </ul>
    )
}