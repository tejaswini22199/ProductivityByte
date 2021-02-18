import React, {useState} from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import '../CSS/formStyles.css'
import Axios from 'axios';
import useStyles from './styles';
export default function TodoForm() {
    const [formData,setformData]=useState({
        name:'',
        desc:'',
        type:'',
        date:'',
        priority:'25',
        isComplete:'false'

    });
    const classes = useStyles();
    // const [name, setName] = useState('');
    // const [desc, setDesc] = useState('');
    // const [type, setType] = useState('');
    // const [date, setDate] = useState();
    // const [priority, setPriority] = useState(25);
    // const isComplete = false;

    const parseDate = (e) => {
        const tmpDate = new Date(e);
        //setDate(tmpDate);
        setformData({ ...formData, date: tmpDate })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
      //  console.log(res);
        Axios.post('/api/tasks', {...formData})
            .then(res => {
                console.log(res);
                console.log(res.data);
        })
    }

    return (
        <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Create your brand new Todo Task</Typography>
        <TextField name="Name" variant="outlined" label="Name" fullWidth value={formData.name} onChange={(e) => setformData({ ...formData, name: e.target.value })} required={true} />
        <TextField name="Description" variant="outlined" label="Description" fullWidth value={formData.desc} onChange={(e) => setformData({ ...formData, desc: e.target.value })}required={true} />
        <TextField name="Type" variant="outlined" label="Type" fullWidth multiline rows={4} value={formData.type} onChange={(e) => setformData({ ...formData, type: e.target.value })} required={true} />
        <TextField
                    id="datetime-local"
                    label="Date"
                    type="datetime-local"
                    defaultValue="2021-02-13T12:00"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => parseDate(e.target.value)} required={true}/>
         <TextField id="standard-basic" type="number" label="Importance" variant="outlined"
                    fullWidth onChange={(e) => setformData({ ...formData, priority: e.target.value })} required={true}/>
        {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        {/* <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> */}
      </form>
    </Paper>
        // <div>
        //     <h3>Create a New Task!</h3>
        //     <form className="form-container" onSubmit={(e) => submitHandler(e)}>
        //         <TextField id="standard-basic" label="Name" onChange={(e) => setName(e.target.value)} required={true}/>
        //         <TextField id="standard-basic" label="Description" onChange={(e) => setDesc(e.target.value)} required={true}/>
        //         <TextField id="standard-basic" label="Type of Task" onChange={(e) => setType(e.target.value)} required={true}/>
        //         <TextField id="standard-basic" type="number" label="Importance" onChange={(e) => setPriority(e.target.value)} required={true}/>
        //         <TextField
        //             id="datetime-local"
        //             label="Date"
        //             type="datetime-local"
        //             defaultValue="2021-02-13T12:00"
        //             className="standard-basic"
        //             InputLabelProps={{
        //                 shrink: true,
        //             }}
        //             onChange={e => parseDate(e.target.value)} required={true}/>
        //         <Button variant="contained" color="primary" type="submit"> Submit </Button>
        //     </form>
        // </div>
    )
}