import Swal from 'sweetalert';
import { isEmail } from "validator";

const required = (value) => {
    if (!value) {
      return (        
        Swal({
          title: 'Data Required',
          text: "This field is required!",
          icon: 'warning',
        })
      )
    }
  };

  const vname = (value) => {
    if (value.length < 4 || value.length > 64) {
      return (
        Swal({
          title: 'Data Format',
          text: "El Nombre debe tener un tamaño entre 4 a 64 caracteres.",
          icon: 'warning',
        })
      );
    }
  };

  const videntification = (value) => {
    if (value.length < 7 || value.length > 15) {
      return (
        Swal({
          title: 'Data Format',
          text: "Identificacion debe tener un tamaño entre 7 a 15 caracteres.",
          icon: 'warning',
        })
      );
    }
  };

  const vphone = (value) => {
    if (value.length < 8 || value.length > 20) {
      return (
        Swal({
          title: 'Data Format',
          text: "Teléfono debe tener un tamaño entre 8 a 20 caracteres.",
          icon: 'warning',
        })
      );
    }
  };
  
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        Swal({
          title: 'Data Format',
          text: "Email invalido",
          icon: 'danger',
        })
      );
    }
  };
  
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        Swal({
          title: 'Data Format',
          text: "The password must be between 6 and 40 characters.",
          icon: 'warning',
        })
      );
    }
  };

  const vwebSite = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        Swal({
          title: 'Data Format',
          text: "The webSite must be between 6 and 40 characters.",
          icon: 'warning',
        })
      );
    }
  };

  export default{
    required,
    vname,
    videntification,
    vphone,
    validEmail,
    vpassword,
    vwebSite,
  };