import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Button, Icon, Typography, TextField, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'

import { setText } from '../actions'
import { ApplicationState } from '../reducer'

interface Props {
  text: string,
  dispatch: Dispatch
}

const HelloWorld = ({ text, dispatch }: Props) => {
  const toggleText = () => {
    const newText = text.length === 0 ? 'World' : ''

    dispatch(setText(newText))
  }

  return (
    <>
    <div style={{
      height: "180px", 
      backgroundColor: "#f6f6f6",
      padding: "15px",
      borderRadius: "10px"
      }}>

      <form>
        <TextField style={{width: "23%"}}
        variant="outlined"
        id="name"
        label="Name"
        color="primary"
        />
        
        <TextField style={{marginLeft: "20px", width: "75%"}}
          variant="outlined"
          id="description"
          label="Description"
          />

        <TextField
          fullWidth
          variant="outlined"
          id="comment"
          label="Comment"
          margin="normal"
          />

        <div style={{
          float: "right",
          marginTop: "10px"
        }}>
          <Button type="reset" variant="outlined">Clear</Button>
          <Button type="submit" variant="outlined" style={{marginLeft: "10px"}}>Add</Button>
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
          <TableRow>
            <TableCell>Dummy</TableCell>
            <TableCell>lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet</TableCell>
            <TableCell align="right">
              <Button type="reset" variant="outlined">Delete</Button>
              <Button type="reset" variant="outlined" style={{marginLeft: "10px"}}>Details</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
    </div>
    </>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  text: state.text
})

export default connect(mapStateToProps)(HelloWorld)


/*
<Typography variant='h1'>Hello {text}</Typography>
      <Button onClick={toggleText}>
        Click Me!
        <Icon>fingerprint</Icon>
      </Button>

*/