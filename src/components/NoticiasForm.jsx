import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import "../styles/NoticiasForm.css";

const NoticiasForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="form-container">
      <Container>
        <h3>Datos personales para publicar</h3>
        <p>La información a publicar será verificada</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gap={1} xs={4}>
            <Col>
              <Controller
                name="empresa"
                control={control}
                defaultValue=""
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre Empresa"
                    error={Boolean(errors.empresa)}
                    helperText={errors.empresa?.message}
                  />
                )}
              />
            </Col>
            <Col>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Persona responsable de la publicación"
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Col>
          </Row>
          <Row gap={1}>
            <Col>
              <Controller
                name="cargo"
                control={control}
                defaultValue=""
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Cargo"
                    error={Boolean(errors.cargo)}
                    helperText={errors.cargo?.message}
                  />
                )}
              />
            </Col>
            <Col>
              <Controller
                name="telefono"
                control={control}
                defaultValue=""
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Teléfono del contacto"
                    error={Boolean(errors.telefono)}
                    helperText={errors.telefono?.message}
                  />
                )}
              />
            </Col>
            <Col>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Correo electrónico inválido",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Col>
          </Row>
          <Row gap={1}>
            <Col>
              <Controller
                name="select"
                control={control}
                defaultValue=""
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <FormControl className="select-container">
                    <InputLabel id="Tipo de publicación ">
                      Tipo de publicación
                    </InputLabel>
                    <Select
                      {...field}
                      label="Tipo de publicacion"
                      error={Boolean(errors.select)}
                      helperText={errors.select?.message}
                    >
                      <MenuItem value="opcion1">Noticias de socios</MenuItem>
                      <MenuItem value="opcion2">
                        Productos de los socios
                      </MenuItem>
                      <MenuItem value="opcion3">Caso de éxito</MenuItem>
                      <MenuItem value="opcion4">Eventos</MenuItem>
                      <MenuItem value="opcion5">Análisis</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Col>
          </Row>
          <h2>Informacion de la publicacion</h2>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default NoticiasForm;
