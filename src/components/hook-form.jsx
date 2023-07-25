import { useForm } from "react-hook-form";
import "../styles/hook-form.css";
import MasculinoForm from "./MasculinoForm";
import FemeninoForm from "./FemeninoForm";
const Form1 = () => {
  const {
    register,
    watch
  } = useForm();

const selecGenero = watch("genero")
  return (
    <div className="formcontainer">
    <span  className="title">
      Bienvenido, por favor selecciona tu género para el registro:
    </span>
    <div className="SelectContainer">
      <select {...register("genero")}>
        <option value=""></option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
      </select>
    </div>
    {selecGenero === "masculino" && <MasculinoForm />}
    {selecGenero === "femenino" && <FemeninoForm />}
  </div>
   
  );
};
export default Form1;
