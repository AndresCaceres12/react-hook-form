import React from "react";
import "../styles/Forms.css";
import { useForm, Controller } from "react-hook-form";
import { UserOutlined } from "@ant-design/icons";
import { useModal } from "@nextui-org/react";
import ModalNext from "./ModalNext";

import {
  Input,
  Button,
  Form,
  Select,
  Radio,
  InputNumber,
  Switch,
  Checkbox,
  Col,
  Row,
} from "antd";

const Form1 = () => {
  const {
    control,
    handleSubmit,
    formState: { errors,touchedFields },
    getValues,
    reset,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      Genero: "",
      firstName: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setVisible(true);
    reset();
  };

  const { setVisible, bindings } = useModal();
  return (
    <div className="BoxForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: "Requerido !",
            maxLength: {
              value: 10,
              message: "Ingresa un nombre corto!",
            },
          }}
          render={({ field }) => (
            <>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Nombre"
                hasFeedback={touchedFields.firstName}
                validateStatus={errors.firstName ? "error" : "success"}
                help={errors.firstName && errors.firstName.message}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Nombre"
                  {...field}
                />
              </Form.Item>
            </>
          )}
        />
        <Controller
          name="Genero"
          control={control}
          rules={{
            required: "Requerido !",
          }}
          render={({ field: { value, onChange } }) => (
            <>
              <Form.Item
                labelCol={{ span: 24 }}
                hasFeedback={touchedFields.Genero}
                label="Género"
                validateStatus={errors.Genero ? "error" : "success"}
                help={errors.Genero && errors.Genero.message}
              >
                <Select
                  placeholder="Seleccione una opción"
                  allowClear={true}
                  value={value}
                  onChange={onChange}
                >
                  <Option value="masculino">Masculino</Option>
                  <Option value="femenino">Femenino</Option>
                  <Option value="otro">Otro</Option>
                </Select>
              </Form.Item>
            </>
          )}
        />
        <Controller
          name="Email"
          control={control}
          rules={{
            minLength: {
              value: 7,
              message: " Un email válido por favor!",
            },
            required: {
              value: true,
              message: "Email requerido!",
            },
            pattern: {
              value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
              message: " Esto no es un gmail",
            },
          }}
          render={({ field }) => (
            <Form.Item
              labelCol={{ span: 24 }}
              hasFeedback={touchedFields.Email}
              label="Email"
              validateStatus={errors.Email ? "error" : "success"}
              help={errors.Email && errors.Email.message}
            >
              <Input
                placeholder="ejemplo@mail.com"
                prefix={<UserOutlined />}
                {...field}
              />
            </Form.Item>
          )}
        />
        <Controller
          name="Personas"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Requerido !",
            },
          }}
          render={({ field }) => (
            <Form.Item
              labelCol={{ span: 24 }}
              label="Personas"
              validateStatus={errors.Personas ? "error" : "success"}
              help={errors.Personas && errors.Personas.message}
            >
              <Radio.Group {...field}>
                <Radio value="1"> 1 </Radio>
                <Radio value="2"> 2 </Radio>
                <Radio value="más"> Más </Radio>
              </Radio.Group>
            </Form.Item>
          )}
        />

        <Controller
          name="age"
          control={control}
          rules={{
            required: {
              value: true,
              message: "No olvides tu edad !",
            },
            min: {
              value: 18,
              message: " ups ! debes ser mayor de edad ",
            },
            max: {
              value: 98,
              message: " Tu edad real por favor ! ",
            },
            validate: (value) => {
              return value % 1 === 0 || " Número entero por favor";
            },
            pattern: {
              value: /^\d{10}$/,
              message: " Esto no es un número de teléfono",
            },
          }}
          render={({ field }) => (
            <Form.Item
              labelCol={{ span: 24 }}
              label="Edad"
              hasFeedback={touchedFields.age}
              validateStatus={errors.age ? "error" : "success"}
              help={errors.age && errors.age.message}
            >
              <InputNumber {...field} style={{ margin: "0 16px" }} />{" "}
            </Form.Item>
          )}
        />
        <Controller
          name="switch"
          control={control}
          rules={{
            required: {
              value: true,
              message: "No? ",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              labelCol={{ span: 24 }}
              name="switch"
              label="Ejemplo"
              validateStatus={errors.switch ? "error" : "success"}
              help={errors.switch && errors.switch.message}
            >
              <Switch checked={value} onChange={onChange} />
            </Form.Item>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              value: true,
              message: "La contraseña es requerida",
            },
            minLength: {
              value: 7,
              message: " La contraseña debe tener al menos 7 caracteres",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/i,
              message:
                "una letra mayúscula, una letra minúscula, un número y un carácter (@$!%*?&) ",
            },
          }}
          render={({ field }) => (
            <Form.Item
              labelCol={{ span: 24 }}
              validateStatus={errors.password ? "error" : "success"}
              help={errors.password && errors.password.message}
              hasFeedback={touchedFields.password}
              label="Contraseña"
            >
              <Input.Password deps={"confirmacion"} {...field} />
            </Form.Item>
          )}
        />
        <Controller
          name="confirmacion"
          control={control}
          rules={{
            validate: (value) =>
              value == getValues("password") || "No coinciden !",
          }}
          render={({ field }) => (
            <Form.Item
              labelCol={{ span: 24 }}
              label="Confirmar Contraseña"
              hasFeedback
              validateStatus={errors.confirmacion ? "error" : ""}
              help={errors.confirmacion && errors.confirmacion.message}
            >
              <Input.Password {...field} />
            </Form.Item>
          )}
        />
        <Controller
          name="check"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Tienes que aceptar !  ",
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Form.Item
              labelCol={{ span: 14 }}
              label="Terminos y condiciones "
              hasFeedback
              validateStatus={errors.check ? "error" : ""}
              help={errors.check && errors.check.message}
            >
              <Checkbox checked={value} onChange={onChange} />
            </Form.Item>
          )}
        />

          <Button type="primary" htmlType="submit">
            Registrarse
          </Button>
       
      </form>
      <ModalNext bindings={bindings} setVisible={setVisible} />
    </div>
  );
};

export default Form1;
