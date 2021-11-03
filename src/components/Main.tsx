import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Button, Icon, Typography, TextField, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import { nanoid } from 'nanoid';

import data from "./data.json";
import { ApplicationState } from '../reducer'

interface Props {
  text: string,
  dispatch: Dispatch
  
}

const initialFormData:{[name:string]: string } = Object.freeze({
  name: '',
  description: '',
  comment: ''
})

const Main = () => {
  const [comments, setComments] = useState(data);

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...formData};
    newFormData[fieldName] = fieldValue;

    updateFormData(newFormData);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      id: nanoid(),
      name: formData.name,
      description: formData.description,
      comment: formData.comment
    }

    const newComments = [...comments, newComment];
    setComments(newComments);

  }

  const handleDelete = (commentId: string) => {
    const newComments = [...comments];

    const index = comments.findIndex((comment) => comment.id === commentId);

    newComments.splice(index, 1);

    setComments(newComments);
  }

  return (
    <>
    <div style={{
      height: "180px", 
      backgroundColor: "#f6f6f6",
      padding: "15px",
      borderRadius: "10px"
      }}>

      <form onSubmit={handleSubmit}>
        <TextField style={{marginRight: "20px", width: "23%", backgroundColor:"#ffffff"}}
        name="name"
        variant="outlined"
        id="name"
        label="Name"
        onChange={handleChange}
        />
        
        <TextField style={{width: "75%", backgroundColor:"#ffffff"}}
          name="description"
          variant="outlined"
          id="description"
          label="Description"
          onChange={handleChange}
          />

        <TextField style={{backgroundColor:"#ffffff"}}
          name="comment"
          fullWidth
          variant="outlined"
          id="comment"
          label="Comment"
          margin="normal"
          onChange={handleChange}
          />

        <div style={{
          float: "right",
          marginTop: "10px"
        }}>
          <Button type="reset" variant="outlined">Clear</Button>
          <Button type="submit" 
            variant="outlined" 
            style={{marginLeft: "10px"}}
            onClick={handleSubmit}
            >Add
          </Button>
        </div>
      </form>
    </div>
    <br/>
    <div style={{marginTop: "20px"}}>
      <Table>
        <TableHead style={{backgroundColor: "#f6f6f6"}}>
          <TableRow>
            <TableCell style={{borderRadius: "10px 0 0 0", fontSize: "15px"}}><b>Name</b></TableCell>
            <TableCell style={{width: "50%", fontSize: "15px"}}><b>Description</b></TableCell>
            <TableCell style={{borderRadius: "0 10px 0 0"}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((comment) => (<TableRow>
            <TableCell>{comment.name}</TableCell>
            <TableCell>{comment.description}</TableCell>
            <TableCell align="right">
              <Button type="reset" variant="outlined" onClick={() => handleDelete(comment.id)}>Delete</Button>
              <Button type="reset" variant="outlined" style={{marginLeft: "10px"}} onClick={() => alert("halloo")}>Details</Button>
              
            </TableCell>
          </TableRow>
          ))}
          
        </TableBody>
      </Table>
      
    </div>
    </>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  text: state.text
})

export default connect(mapStateToProps)(Main)