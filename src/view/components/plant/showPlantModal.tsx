import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Button from 'react-bootstrap/Button'
import { BsFillSunFill, BsFillHeartFill, BsFillHandThumbsUpFill, BsInfoCircleFill} from "react-icons/bs";


function MyVerticallyCenteredModal(props) {
    // console.log(props)
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby={"modal-" + props.plant.name}
        centered
        className=""
      >
        <Modal.Header closeButton className="bg-success">
          <Modal.Title id={"modal-" + props.plant.name}>
          <h4 className="text-light fs-2">{props.plant.name}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col-6">
                    <img src={props.plant.image} className="img-fluid h-100" alt="..." />        
                </div>
                <div className="col-6 d-flex flex-column justify-content-start  fs-6">

                    <div className="d-flex justify-content-start gap-3">
                        <span className="text-success"><BsFillHandThumbsUpFill size={20}/></span>
                        <div>
                            <span className="fw-bold text-dark">Description</span>
                            <p >{props.plant.description}</p>  
                        </div>
                    </div>
                    <div className="d-flex justify-content-start gap-3">
                        <span className="text-success"><BsFillSunFill size={20}/></span>
                        <div>
                            <span className="fw-bold text-dark">Exposition</span>
                            <p >{props.plant.exposition}</p>  
                        </div>
                    </div>
                    <div className="d-flex justify-content-start gap-3">
                        <span className="text-success"><BsFillHeartFill size={20}/></span>
                        <div>
                            <span className="fw-bold text-dark">Entretien</span>
                            <p >{props.plant.care}</p>  
                        </div>
                    </div>
                    <div className="d-flex justify-content-start gap-3">
                        <span className="text-success"><BsInfoCircleFill size={20}/></span>
                        <div>
                            <span className="fw-bold text-dark">Toxicité</span>
                            <p >{props.plant.toxicity}</p>  
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal
  
//   function App() {
//     const [modalShow, setModalShow] = React.useState(false);
  
//     return (
//       <>
//         <Button variant="primary" onClick={() => setModalShow(true)}>
//           Launch vertically centered modal
//         </Button>
  
//         <MyVerticallyCenteredModal
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//         />
//       </>
//     );
//   }
  
//   render(<App />);