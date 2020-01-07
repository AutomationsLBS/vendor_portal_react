import React,{Component,Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../index.scss"
import GoogleDocsViewer from 'react-google-docs-viewer';
import CommonService from './../../service/commonServices';






const file = 'https://accushield-community-assets.s3.amazonaws.com/Screenshot%20from%202019-10-29%2017-24-53.png'
const type = 'png'

export default class  AlertDialog extends  Component {
  constructor(props){
      super(props);
      this.popUp = React.createRef();

      this.state = {
        open:"",
        setOpen: false,
        numPages: null,
    pageNumber: 1,
    loading: true,
    docTypes: {doc:"doc","docx":"docx",pdf:"pdf","jpg":"jpg","png":"png",gif:"gif",jpeg:"jpeg"},

   }

  }
   
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

   componentDidMount(){
     this.setState({loading:false})
     console.log(this.popUp,"popup")
   }
 
   handleClose = () => {
    this.setState({open:false});
    console.log(this.state.open,"kranthi...........")
  };

  


  

render(){ 

    var succesBtn = {
        color: "#fff",
      backgroundColor: "#5cb85c",
      borderColor: "#4cae4c",
      display: "inline-block",
      padding: "6px 12px",
      margin: "10px",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.42857143",
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
     
      touchAction: "manipulation",
      cursor: "pointer",
      
      userSelect: "none",
      backgroundImage: "none",
      border: "1px solid transparent",
      borderRadius: "4px",
      }
      
      let  doctype  = this.props.url.split(".").pop();
       console.log(doctype,"opps.............");
        let docTypeValue  =this.state.docTypes[doctype];
       let urlShowDisplay = "";

        switch(docTypeValue){
           case "doc":
           case "docx":
           urlShowDisplay =  "doc";
           break;

           case "pdf":
              urlShowDisplay = "pdf"
           break;

    
          case "pdf":
          case "PDF":
          case "jpg":
          case "gif":
          case "jpeg":
          case "png":


           urlShowDisplay =  "image"
           break;
        

        }

         




    
    
    return (
        <Fragment>
            <Button style={{display:"none"}} color="success" onClick={this.props.handleClickOpen}>
            
          </Button>

          <Dialog 
           // onEscapeKeyDown ="fasle"
           // disableBackdropClick ="false"
          
            open={ this.props.open  }
            
            maxWidth = "xl"
          >
           
          <div>
                  <div style={{"float":"right"}}> <i className="far fa-times-circle" onClick = {this.props.onClose}></i>  </div>
          </div>  
          
          
            { ((urlShowDisplay == "doc" ) ||  (urlShowDisplay == "docx")  )?  <GoogleDocsViewer  ref = {(e) => this.popUp}  width="1000px" height="780px" fileUrl={this.props.url}/> : "" }

            { ((urlShowDisplay == "pdf" )  )?  <GoogleDocsViewer  ref = {(e) => this.popUp}  width="1000px" height="780px" fileUrl={this.props.url}/> : "" }

            { ((urlShowDisplay == "image" ) )?  <img src={this.props.url}  style ={{
              "max-width":"1000px",
              "max-height": "780px"
            }}
             ></img> : "" }
            
          </Dialog>
        </Fragment>      
      );
 }
  
 }
