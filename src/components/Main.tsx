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
  const [items, setItems] = useState(data);

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newFormData = { ...formData};
    newFormData[fieldName] = fieldValue
    updateFormData(newFormData);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: nanoid(),
      name: formData.name,
      description: formData.description,
      comment: formData.comment
    }
    // Check if there are empty fields. Required attrribute won't work on the fields
    if(!!(newItem.name && newItem.description && newItem.comment)){
      const newItems = [...items, newItem];
      setItems(newItems);
    } else {
      alert("Please fill out all the fields");
    }
  }

  const handleClear = () => {
    //TODO implement a way to delete the object from state
  }

  const handleDelete = (itemId: string) => {
    const newItems = [...items];
    const index = items.findIndex((item) => item.id === itemId);
    newItems.splice(index, 1);
    setItems(newItems);
  }

  const showDetails = (itemId: string) => {
    const index = items.findIndex((item) => item.id === itemId)
    alert(items[index].comment);

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
          <Button type="reset" 
            variant="outlined"
            onClick={handleClear}
            >Clear
          </Button>
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
          {items.map((item) => (<TableRow>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell align="right">
              <Button type="button" variant="outlined" onClick={() => handleDelete(item.id)}>Delete</Button>
              <Button type="reset" variant="outlined" style={{marginLeft: "10px"}} onClick={() => showDetails(item.id)}>Details</Button>
              
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

function reset(name: void): React.MouseEventHandler<HTMLButtonElement> | undefined {
  throw new Error('Function not implemented.');
}
