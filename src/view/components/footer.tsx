
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsFillTelephoneForwardFill } from "react-icons/bs";


const Footer = () => {
    
    return(

       
        <footer className="text-center text-lg-start text-muted ">
        
          <section className=" main-footer pt-4 bg-success">
            <div className="container text-center text-md-start mt-2 text-white">
              <div className="row">

                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 ">
                  <h6 className="text-uppercase fw-bold mb-4">Drink up !</h6>
                  <p> Vos plantes nous diront merci ! Notre inteface intuitive vous permettra d'assurer l'arrosage de vos plantes en toute facilité. </p>
                </div>
 
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4"> Accès rapides</h6>
                  <p>
                    <a href="#!" className="link-light">Nos plantes</a>
                  </p>
                  <p>
                    <a href="#!" className="link-light">Nous contacter</a>
                  </p>
                  <p>
                    <a href="#!" className="link-light">Politique de confidentialité</a>
                  </p>
                </div>
               
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    Informations de contact
                  </h6>
                  <div className="d-flex justify-content-start">
                     <BsFillHouseDoorFill size={22} /> 
                     <p className="mx-2">69 Route de la verdure</p>
                  </div>
                  <div className="d-flex justify-content-start">
                     <BsFillEnvelopeFill size={22} /> 
                     <p className="mx-2">drink-up@gmail.com</p>
                  </div>
                  <div className="d-flex justify-content-start">
                     <BsFillTelephoneForwardFill size={22} /> 
                     <p className="mx-2">06 30 93 62 65</p>
                  </div>
                </div>

              </div>
            </div>
          
         
        
          {/* <!-- Copyright --> */}
          <div className="text-center p-4 bg-dark">
            © 2021 Copyright:
            <a className="text-reset fw-bold" >Drink up!</a>
          </div>
          {/* <!-- Copyright --> */}
          </section>
        </footer>
        
    )
}

export default Footer;