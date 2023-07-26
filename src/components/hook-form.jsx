import React from "react";
import { useForm } from "react-hook-form";
import { useModal, Button } from "@nextui-org/react";
import "../styles/Forms.css";
import ModalNext from "./ModalNext";

const Form1 = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    mode: "onBlur",
    // mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("DatosM", JSON.stringify(data));
    setVisible(true);
    reset();
  };

  const { setVisible, bindings } = useModal();

  return (
    <div>
      <div className="BoxForm">
        <form className="GrupoForm" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor=""> Registro </label>
          <input
            placeholder="Nombre de usuario"
            {...register("Nombre", {
              required: {
                value: true,
                message: "❌ Nombre es requerido!",
              },
              minLength: {
                value: 3,
                message: "❌ Ingresa un mejor nombre!",
              },
              maxLength: {
                value: 10,
                message: "❌ Ingresa un nombre corto!",
              },
            })}
          />
          {errors.Nombre && <p>{errors.Nombre.message}</p>}

          <input
            {...register("email", {
              minLength: {
                value: 7,
                message: "❌ Un email válido por favor!",
              },
              required: {
                value: true,
                message: "❌ Email requerido!",
              },
              pattern: {
                value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                message: "❌ Esto no es un gmail",
              },
            })}
            placeholder="tuemail@email.com"
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}

          <input
            {...register("tel", {
              minLength: {
                value: 10,
                message: "❌ Un Número de teléfono válido por favor!",
              },
              required: {
                value: true,
                message: "❌ Número de teléfono requerido!",
              },
              pattern: {
                value: /^\d{10}$/,
                message: "❌ Esto no es un número de teléfono",
              },
            })}
            placeholder="teléfono"
          />
          {errors.tel && <p role="alert">{errors.tel.message}</p>}

          <input
            placeholder="edad"
            {...register("age", {
              required: {
                value: true,
                message: "❌ Campo necesario",
              },
              min: {
                value: 18,
                message: "❌ Tienes que ser mayor de edad!",
              },
              max: {
                value: 98,
                message: "❌ sé serio!",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "❌ Solo números por favor",
              },
              validate: (value) => {
                return value % 1 === 0 || "❌ Número entero por favor";
              },
            })}
          />
          {errors.age && <p role="alert">{errors.age.message}</p>}

          <label>Frecuencia de ejercicios físicos:</label>
          <select
            {...register("frecuenciaEjercicios", {
              required: {
                value: true,
                message: "❌ Escoge una opción",
              },
            })}
          >
            <option value=""></option>
            <option value="nunca">Nunca</option>
            <option value="ocasionalmente">Ocasionalmente</option>
            <option value="regularmente">Regularmente</option>
            <option value="todosLosDias">Todos los días</option>
          </select>

          {errors.frecuenciaEjercicios && (
            <p>{errors.frecuenciaEjercicios.message}</p>
          )}

          <input
            type="password"
            {...register("contraseña", {
              required: "❌ La contraseña es requerida",
              minLength: {
                value: 7,
                message: "❌ La contraseña debe tener al menos 7 caracteres",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/i,
                message:
                  " ❌ La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
              },
            })}
            placeholder="contraseña"
          />
          {errors.contraseña && <p role="alert">{errors.contraseña.message}</p>}

          <input
            type="password"
            {...register("confirmarContraseña", {
              validate: (value) =>
                value === getValues("contraseña") ||
                " ❌ Las contraseñas no coinciden",
            })}
            placeholder="confirmar contraseña"
          />
          {errors.confirmarContraseña && (
            <p role="alert">{errors.confirmarContraseña.message}</p>
          )}

          <Button type="submit" disabled={!isValid}>
            Regístrate
          </Button>
        </form>

        <ModalNext bindings={bindings} setVisible={setVisible} />
      </div>
    </div>
  );
};

export default Form1;
