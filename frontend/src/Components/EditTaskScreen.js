import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import EditTask from './EditTask'

export default function EditTaskScreen(props) {
    const id = props.match.params.id;
    const [loading, setLoading] = useState(false);

    return (
        <div>
            {!loading && (
                <EditTask id={id}/>
            )}
            {loading && (
                <h1> Loading </h1>
            )}
        </div>
    )
}