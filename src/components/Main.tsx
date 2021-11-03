import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Box, Typography, TextField, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import { nanoid } from 'nanoid';
import './styles.css';
import data from "./data.json";
import { ApplicationState } from '../reducer'

const initialFormData:{[name:string]: string } = Object.freeze({
  name: '',
  description: '',
  comment: ''
})


const Main = () => {
  const [items, setItems] = useState(data);
  const [formData, setFormData] = useState(initialFormData);
  const [open, setOpen] = React.useState(false);
  const [modalName, setModalName] = useState(String);
  const [modalDescription, setModalDescription] = useState(String);
  const [modalComment, setModalComment] = useState(String);

  const handleChange = (event: any) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newFormData = { ...formData};
    newFormData[fieldName] = fieldValue
    setFormData(newFormData);
  }

  const handleSubmit = (event: any) => {
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
    //TODO implement a way to delete the object from state,
    //     Or prevent the addition of an item when the form is empty
  }

  const handleDelete = (itemId: string) => {
    const newItems = [...items];
    const index = items.findIndex((item) => item.id === itemId);
    newItems.splice(index, 1);
    setItems(newItems);
  }

  const handleOpen = (itemId: string) => {
    const index = items.findIndex((item) => item.id === itemId)
    const newModalName = items[index].name;
    setModalName(newModalName);
    const newModalDescription = items[index].description;
    setModalDescription(newModalDescription);
    const newModalComment = items[index].comment;
    setModalComment(newModalComment);

    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  return (
    <>
    <div className="topContainer">
      <form onSubmit={handleSubmit}>
        <TextField className="textFieldName"
          name="name"
          variant="outlined"
          label="Name"
          onChange={handleChange}/>
        
        <TextField className="textFieldDescription"
          name="description"
          variant="outlined"
          label="Description"
          onChange={handleChange}/>

        <TextField className="textFieldComment"
          name="comment"
          variant="outlined"
          label="Comment"
          onChange={handleChange}/>

        <div className="buttonContainer">
          <Button type="reset" 
            variant="outlined"
            onClick={handleClear}> Clear 
          </Button>
          <Button type="submit" 
            variant="outlined" 
            style={{marginLeft: "10px"}}
            onClick={handleSubmit}> Add
          </Button>
        </div>
      </form>
    </div>
    <br/>
    <div className="marginTop20">
      <Table>
        <TableHead className="tableHead">
          <TableRow>
            <TableCell className="tableHeadCellLeft"><b>Name</b></TableCell>
            <TableCell className="tableHeadCellMid"><b>Description</b></TableCell>
            <TableCell className="tableHeadCellRight"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (<TableRow>
            <TableCell className="breakWord">{item.name}</TableCell>
            <TableCell className="breakWord">{item.description}</TableCell>
            <TableCell align="right">
              <Button type="button" variant="outlined" onClick={() => handleDelete(item.id)}>Delete</Button>
              <Button type="button" variant="outlined" style={{marginLeft: "10px"}} onClick={() => handleOpen(item.id)}>Details</Button>
              
            </TableCell>
          </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </div>

    <Modal
      open={open}
      onClose={handleClose}
    >
    <Box className="modalBox">
      <Typography variant="h4" component="h2" className="modalHeader">
        {modalName}
      </Typography>
      <Typography variant="h6" className="modalHeader2">
        Description
      </Typography>
      <Typography className="modalParagraph">
        {modalDescription}
      </Typography>
      <Typography variant="h6" className="modalHeader2">
        Comment
      </Typography>
      <Typography className="modalParagraph">
        {modalComment}
      </Typography>
    </Box>
  </Modal>

    </>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  text: state.text
})

export default connect(mapStateToProps)(Main)