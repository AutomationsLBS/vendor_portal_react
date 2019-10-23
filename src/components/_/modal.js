import React,{Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import {    Button, 
            DialogTitle, 
            DialogContent,
            DialogActions,
            Dialog} from '@material-ui/core';

export default class ModalDialog extends Component{
    constructor(props) {
        alert(1);
        super(props);
        this.state = {};  
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleEntering = this.handleEntering.bind(this);
        console.log("AT Modal Window", props);        
    };
    handleCancel = event => {};
    handleOk = event => {};
    handleEntering = event => {};

    render(){
        const {} = this.state;
        const {} = this.props;
        return(
            <Fragment>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="xs"
                    onEntering={this.handleEntering}
                    aria-labelledby="confirmation-dialog-title">
                        <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
                        <DialogContent>
                            Modal Content
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCancel} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleOk} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}