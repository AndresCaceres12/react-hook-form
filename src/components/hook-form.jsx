import "../styles/Forms.css";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Input,
  Button,
  Form,
  Select,
  Radio,
  Cascader,
  InputNumber,
  Checkbox,
  message,
} from "antd";

const Form1 = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
    setValue,
    clearErrors,
  } = useForm({
    mode: "all",
  });
  const options = [
    {
      value: "morning",
      label: "Mañana",
      children: [
        {
          value: "1h",
          label: "1 hora",
        },

        {
          value: "2-3H",
          label: "2 a 3 horas",
        },
        {
          value: "4-5H",
          label: "4 a 5 horas",
        },
      ],
    },
    {
      value: "tarde",
      label: "En la tarde",
      children: [
        {
          value: "1h",
          label: "1 hora",
        },

        {
          value: "2-3H",
          label: "2 a 3 horas",
        },
        {
          value: "4-5H",
          label: "4 a 5 horas",
        },
      ],
    },
    {
      value: "noche",
      label: "En la noche",
      children: [
        {
          value: "1h",
          label: "1 hora",
        },

        {
          value: "2-3H",
          label: "2 a 3 horas",
        },
        {
          value: "4-5H",
          label: "4 a 5 horas",
        },
      ],
    },
  ];
  const validateEstatura = (value) => {
    if (!value) {
      return "Requerido";
    }
    const regex = /^\d+(\.\d{1,2})?cm?$/;

    if (!value.match(regex)) {
      return "Altura inválida. Debe ser un número seguido de 'cm' (ejemplo: 175cm)";
    }

    return true;
  };
  const validatePeso = (value) => {
    if (!value) {
      return "Requerido";
    }
    const regex = /^\d+(\.\d{1,2})?kg?$/;
    if (!value.match(regex)) {
      return "Altura inválida. Debe ser un número seguido de 'kg' (ejemplo: 50kg)";
    }
    return true;
  };
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  const genero = watch("genero");
  useEffect(() => {
    setValue("estatura", "");
    setValue("peso", "");
    setValue("profesionf", "");
    setValue("intereses", "");
    setValue("pronombres", "");
    setValue("trabaja", "");
    setValue("identidadGenero", "");
    setValue("frecuencia", "");
    clearErrors();
  }, [genero, setValue]);
  
  const frecuencia = watch("frecuencia");
  const profesionf = watch("profesionf");
  const fiestaF = watch("fiestaF");
  const identidadGenero = watch("identidadGenero");
  const refererirse = watch("refererirse");
  return (
    <div className="BoxForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="genero"
          control={control}
          rules={{
            required: "Requerido !",
          }}
          render={({ field: { value, onChange } }) => (
            <>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Genero"
                // hasFeedback={touchedFields.genero}
                validateStatus={errors.genero ? "error" : "success"}
                help={errors.genero && errors.genero.message}
              >
                <Select
                  placeholder="Seleccione una opción"
                  allowClear={true}
                  value={value}
                  onChange={onChange}
                >
                  <Select.Option value="masculino">Masculino</Select.Option>
                  <Select.Option value="femenino">Femenino</Select.Option>
                  <Select.Option value="otro">Otro</Select.Option>
                </Select>
              </Form.Item>
            </>
          )}
        />
        {/* Mostrar input para estatura cuando se selecciona "Masculino" */}
        {genero === "masculino" && (
          <div>
            <Controller
              name="estatura"
              control={control}
              rules={{
                validate: validateEstatura,
                minLength: {
                  value: 4,
                  message: "Esta no es tu altura... !",
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Estatura"
                  // hasFeedback={touchedFields.estatura}
                  validateStatus={errors.estatura ? "error" : "success"}
                  help={errors.estatura && errors.estatura.message}
                >
                  <Input
                    placeholder="Ingrese estatura (ejemplo: 175cm)"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="peso"
              control={control}
              rules={{
                validate: validatePeso,
                minLength: {
                  value: 4,
                  message: "Este no es tu peso... !",
                },
              }}
              render={({ field }) => (
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="peso"
                  // hasFeedback={touchedFields.peso}
                  validateStatus={errors.peso ? "error" : "success"}
                  help={errors.peso && errors.peso.message}
                >
                  <Input
                    placeholder="Ingrese su peso (ejemplo: 50kg)"
                    {...field}
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="frecuencia"
              control={control}
              rules={{
                required: "Requerido !",
              }}
              render={({ field: { value, onChange } }) => (
                <>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="frecuencia de ejercicios fisicos :"
                    hasFeedback={touchedFields.frecuencia}
                    validateStatus={errors.frecuencia ? "error" : "success"}
                    help={errors.frecuencia && errors.frecuencia.message}
                  >
                    <Select
                      placeholder="Seleccione una opción"
                      allowClear={true}
                      value={value}
                      onChange={onChange}
                    >
                      <Select.Option value="nunca">Nunca</Select.Option>
                      <Select.Option value="casi">
                        Casi todos los dias
                      </Select.Option>
                      <Select.Option value="todos">
                        Todos los dias
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </>
              )}
            />
            {frecuencia === "nunca" && (
              <div>
                <Controller
                  name="razon"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label=" ¿ Por qué no hace ejercicio ? "
                      hasFeedback={touchedFields.razon}
                      validateStatus={errors.razon ? "error" : "success"}
                      help={errors.razon && errors.razon.message}
                    >
                      <Input.TextArea placeholder="Ingrese razon" {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="actividad"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿ Que haces en tu tiempo libre ?"
                      hasFeedback={touchedFields.actividad}
                      validateStatus={errors.actividad ? "error" : "success"}
                      help={errors.actividad && errors.actividad.message}
                    >
                      <Input placeholder="Ingrese actividad" {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="check2"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label=" ¿ Que tal te ha parecido la encusta ? "
                      hasFeedback={touchedFields.check2}
                      validateStatus={errors.check2 ? "error" : "success"}
                      help={errors.check2 && errors.check2.message}
                    >
                      <Radio.Group {...field}>
                        <Radio value={"Bien"}>Bien</Radio>
                        <Radio value={"Malo"}>Mala</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
              </div>
            )}
            {frecuencia === "casi" && (
              <div>
                <Controller
                  name="diasPorSemana"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label=" ¿ Cuantos dias por semana? "
                      hasFeedback={touchedFields.diasPorSemana}
                      validateStatus={
                        errors.diasPorSemana ? "error" : "success"
                      }
                      help={
                        errors.diasPorSemana && errors.diasPorSemana.message
                      }
                    >
                      <Radio.Group {...field}>
                        <Radio value={"1_2"}>1 a 2 Dias</Radio>
                        <Radio value={"3_4"}>3 a 4 Dias</Radio>
                        <Radio value={"5_6"}>5 a 6 Dias</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
                <Controller
                  name="ejercicioFavorito"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿ Cual es tu ejercicio favorito ?"
                      hasFeedback={touchedFields.ejercicioFavorito}
                      validateStatus={
                        errors.ejercicioFavorito ? "error" : "success"
                      }
                      help={
                        errors.ejercicioFavorito &&
                        errors.ejercicioFavorito.message
                      }
                    >
                      <Input
                        placeholder="Ingrese ejercicioFavorito"
                        {...field}
                      />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="check"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label=" ¿ Que tal te ha parecido la encusta ? "
                      hasFeedback={touchedFields.check}
                      validateStatus={errors.check ? "error" : "success"}
                      help={errors.check && errors.check.message}
                    >
                      <Radio.Group {...field}>
                        <Radio value={"Bien"}>Bien</Radio>
                        <Radio value={"Malo"}>Malo</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
              </div>
            )}

            {frecuencia === "todos" && (
              <div>
                <Controller
                  name="horarioPreferido"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label=" ¿ Cual es tu horario preferido ? "
                      hasFeedback={touchedFields.horarioPreferido}
                      validateStatus={
                        errors.horarioPreferido ? "error" : "success"
                      }
                      help={
                        errors.horarioPreferido &&
                        errors.horarioPreferido.message
                      }
                    >
                      <Cascader
                        options={options}
                        {...field}
                        placeholder="Please select"
                      />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="ejercicioTodos"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿ Cual es tu ejercicio favorito ?"
                      hasFeedback={touchedFields.ejercicioTodos}
                      validateStatus={
                        errors.ejercicioTodos ? "error" : "success"
                      }
                      help={
                        errors.ejercicioTodos && errors.ejercicioTodos.message
                      }
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="dieta"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿ tu dieta se basa en ?"
                      hasFeedback={touchedFields.dieta}
                      validateStatus={errors.dieta ? "error" : "success"}
                      help={errors.dieta && errors.dieta.message}
                    >
                      <Input.TextArea {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="check"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label=" ¿ Que tal te ha parecido la encusta ? "
                      hasFeedback={touchedFields.check}
                      validateStatus={errors.check ? "error" : "success"}
                      help={errors.check && errors.check.message}
                    >
                      <Radio.Group {...field}>
                        <Radio value={"Bien"}>Bien</Radio>
                        <Radio value={"Malo"}>Malo</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
              </div>
            )}
          </div>
        )}

        {/* Mostrar input para talla de ropa cuando se selecciona "Femenino" */}
        {genero === "femenino" && (
          <div>
            <Controller
              name="profesionf"
              control={control}
              rules={{
                required: "Requerido !",
              }}
              render={({ field: { value, onChange } }) => (
                <>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="¿a que te dedicas ?"
                    // hasFeedback={touchedFields.profesionf}
                    validateStatus={errors.profesionf ? "error" : "success"}
                    help={errors.profesionf && errors.profesionf.message}
                  >
                    <Select
                      placeholder="Seleccione una opción"
                      allowClear={true}
                      value={value}
                      onChange={onChange}
                    >
                      <Select.Option value="Estudiar">Estudiar</Select.Option>
                      <Select.Option value="trabajar">trabajar</Select.Option>
                    </Select>
                  </Form.Item>
                </>
              )}
            />
            {profesionf === "Estudiar" && (
              <div>
                <Controller
                  name="estudia"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿ Que estudias ? "
                      hasFeedback={touchedFields.estudia}
                      validateStatus={errors.estudia ? "error" : "success"}
                      help={errors.estudia && errors.estudia.message}
                    >
                      <Input placeholder="" {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="tiempoLibref"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿ que haces en tu tiempo libre ? "
                      hasFeedback={touchedFields.tiempoLibref}
                      validateStatus={errors.tiempoLibref ? "error" : "success"}
                      help={errors.tiempoLibref && errors.tiempoLibref.message}
                    >
                      <Input placeholder="" {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="temperatura"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label=" ¿ Que prefieres ? "
                      hasFeedback={touchedFields.temperatura}
                      validateStatus={errors.temperatura ? "error" : "success"}
                      help={errors.temperatura && errors.temperatura.message}
                    >
                      <Radio.Group {...field}>
                        <Radio value={"frio"}>frio</Radio>
                        <Radio value={"calor"}>calor</Radio>
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
                      message: "Requerido !",
                    },
                    min: {
                      value: 15,
                      message: "Minimo debes ser mayor de 15 años !",
                    },
                    max: {
                      value: 98,
                      message: "No creo que tengas esa edad !",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿ Que edad tienes ? "
                      hasFeedback={touchedFields.age}
                      validateStatus={errors.age ? "error" : "success"}
                      help={errors.age && errors.age.message}
                    >
                      <InputNumber placeholder="" {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="trabajoSueños"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿ Cual es el trabajo de tus sueños ? "
                      hasFeedback={touchedFields.trabajoSueños}
                      validateStatus={
                        errors.trabajoSueños ? "error" : "success"
                      }
                      help={
                        errors.trabajoSueños && errors.trabajoSueños.message
                      }
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="check"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label=" ¿ Que tal te ha parecido la encusta ? "
                      hasFeedback={touchedFields.check}
                      validateStatus={errors.check ? "error" : "success"}
                      help={errors.check && errors.check.message}
                    >
                      <Radio.Group {...field}>
                        <Radio value={"Bien"}>Bien</Radio>
                        <Radio value={"Malo"}>Mala</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
              </div>
            )}
            {profesionf === "trabajar" && (
              <div>
                <Controller
                  name="trabaja"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿ En que trabajas ? "
                      hasFeedback={touchedFields.trabaja}
                      validateStatus={errors.trabaja ? "error" : "success"}
                      help={errors.trabaja && errors.trabaja.message}
                    >
                      <Input placeholder="" {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="fiestaF"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿ sales de fiesta ? "
                      hasFeedback
                      validateStatus={errors.fiestaF ? "error" : "success"}
                      help={errors.fiestaF && errors.fiestaF.message}
                    >
                      <Radio.Group {...field}>
                        <Radio value={"si"}>Si</Radio>
                        <Radio value={"no"}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
                {fiestaF === "si" && (
                  <div>
                    <Controller
                      name="saleAfiesta"
                      control={control}
                      rules={{
                        required: "Requerido !",
                      }}
                      render={({ field }) => (
                        <Form.Item
                          labelCol={{ span: 24 }}
                          hasFeedback={touchedFields.saleAfiesta}
                          validateStatus={
                            errors.saleAfiesta ? "error" : "success"
                          }
                          help={
                            errors.saleAfiesta && errors.saleAfiesta.message
                          }
                        >
                          <Checkbox.Group style={{ width: "100%" }} {...field}>
                            <Checkbox value="sola"> sola </Checkbox>

                            <Checkbox value="acompañada"> Acompañada</Checkbox>
                          </Checkbox.Group>
                        </Form.Item>
                      )}
                    />
                    <Controller
                      name="frecuenciaF"
                      control={control}
                      defaultValue={""}
                      rules={{
                        required: "Requerido !",
                      }}
                      render={({ field }) => (
                        <Form.Item
                          labelCol={{ span: 24 }}
                          hasFeedback={touchedFields.frecuenciaF}
                          label={" ¿ Con que frecuencia ?"}
                          validateStatus={
                            errors.frecuenciaF ? "error" : "success"
                          }
                          help={
                            errors.frecuenciaF && errors.frecuenciaF.message
                          }
                        >
                          <Select {...field}>
                            <Select.Option value="cadaSemana ">
                              cada semana
                            </Select.Option>
                            <Select.Option value="poco">
                              Pocas veces por mes
                            </Select.Option>
                            <Select.Option value="muchoMas">
                              Mucho más
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      )}
                    />
                  </div>
                )}
                {fiestaF === "no" && (
                  <Controller
                    name="tiempoLibref"
                    control={control}
                    rules={{
                      required: "Requerido !",
                    }}
                    render={({ field }) => (
                      <Form.Item
                        labelCol={{ span: 24 }}
                        label="¿ que haces en tu tiempo libre ? "
                        hasFeedback={touchedFields.tiempoLibref}
                        validateStatus={
                          errors.tiempoLibref ? "error" : "success"
                        }
                        help={
                          errors.tiempoLibref && errors.tiempoLibref.message
                        }
                      >
                        <Input placeholder="" {...field} />
                      </Form.Item>
                    )}
                  />
                )}
                <Controller
                  name="age"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Requerido !",
                    },
                    min: {
                      value: 15,
                      message: "Minimo debes ser mayor de 15 años !",
                    },
                    max: {
                      value: 98,
                      message: "No creo que tengas esa edad !",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿ Que edad tienes ? "
                      hasFeedback={touchedFields.age}
                      validateStatus={errors.age ? "error" : "success"}
                      help={errors.age && errors.age.message}
                    >
                      <InputNumber placeholder="" {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="metasf"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿  Que metas tienes a corto plazo  ? "
                      hasFeedback={touchedFields.metasf}
                      validateStatus={errors.metasf ? "error" : "success"}
                      help={errors.metasf && errors.metasf.message}
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="check"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label=" ¿ Que tal te ha parecido la encusta ? "
                      hasFeedback={touchedFields.check}
                      validateStatus={errors.check ? "error" : "success"}
                      help={errors.check && errors.check.message}
                    >
                      <Radio.Group {...field}>
                        <Radio value={"Bien"}>Bien</Radio>
                        <Radio value={"Malo"}>Mala</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
              </div>
            )}
          </div>
        )}

        {/* Mostrar input para intereses cuando se selecciona "Otro" */}
        {genero === "otro" && (
          <div>
            <Controller
              name="intereses"
              control={control}
              rules={{
                required: "Requerido !",
              }}
              render={({ field }) => (
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Intereses"
                  hasFeedback={touchedFields.intereses}
                  validateStatus={errors.intereses ? "error" : "success"}
                  help={errors.intereses && errors.intereses.message}
                >
                  <Input placeholder="Ingrese intereses" {...field} />
                </Form.Item>
              )}
            />
            <Controller
              name="pronombres"
              control={control}
              rules={{
                required: "Requerido !",
              }}
              render={({ field }) => (
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="¿Cuáles son tus pronombres preferidos?"
                  hasFeedback={touchedFields.pronombres}
                  validateStatus={errors.pronombres ? "error" : "success"}
                  help={errors.pronombres && errors.pronombres.message}
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
            <Controller
              name="identidadGenero"
              control={control}
              rules={{
                required: "Requerido !",
              }}
              render={({ field }) => (
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="¿Podrías compartir más detalles sobre tu identidad de género?"
                  hasFeedback={touchedFields.identidadGenero}
                  validateStatus={errors.identidadGenero ? "error" : "success"}
                  help={
                    errors.identidadGenero && errors.identidadGenero.message
                  }
                >
                  <Radio.Group {...field}>
                    <Radio value={"si"}>si</Radio>
                    <Radio value={"no"}>no</Radio>
                  </Radio.Group>
                </Form.Item>
              )}
            />
            {identidadGenero === "si" && (
              <div>
                <Controller
                  name="masInfogenero"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="Más información "
                      hasFeedback={touchedFields.masInfogenero}
                      validateStatus={
                        errors.masInfogenero ? "error" : "success"
                      }
                      help={
                        errors.masInfogenero && errors.masInfogenero.message
                      }
                    >
                      <Input.TextArea {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="pasatiempos"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="¿Cuáles son tus intereses o pasatiempos favoritos?"
                      hasFeedback={touchedFields.pasatiempos}
                      validateStatus={errors.pasatiempos ? "error" : "success"}
                      help={errors.pasatiempos && errors.pasatiempos.message}
                    >
                      <Input placeholder="" {...field} />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="refererirse"
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      defaultValue=""
                      label="¿Hay alguna forma particular en que te gustaría que te tratemos o te refiramos?"
                      hasFeedback={touchedFields.refererirse}
                      validateStatus={errors.refererirse ? "error" : "success"}
                      help={errors.refererirse && errors.refererirse.message}
                    >
                      <Select {...field}>
                        <Select.Option value={"si"}>si</Select.Option>
                        <Select.Option value={"no"}>no</Select.Option>
                      </Select>
                    </Form.Item>
                  )}
                />
                {refererirse === "si" && (
                  <Controller
                    name="describeForma"
                    control={control}
                    rules={{
                      required: "Requerido !",
                    }}
                    render={({ field }) => (
                      <Form.Item
                        labelCol={{ span: 24 }}
                        label="¿Describirias esa forma ?"
                        hasFeedback={touchedFields.describeForma}
                        validateStatus={
                          errors.describeForma ? "error" : "success"
                        }
                        help={
                          errors.describeForma && errors.describeForma.message
                        }
                      >
                        <Input.TextArea placeholder="" {...field} />
                      </Form.Item>
                    )}
                  />
                )}
              </div>
            )}
            {identidadGenero === "no" && (
              <>
                <Controller
                  name="estaturaOtro"
                  control={control}
                  rules={{
                    validate: validateEstatura,
                    minLength: {
                      value: 4,
                      message: "Esta no es tu altura... !",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="Estatura"
                      hasFeedback={touchedFields.estaturaOtro}
                      validateStatus={errors.estaturaOtro ? "error" : "success"}
                      help={errors.estaturaOtro && errors.estaturaOtro.message}
                    >
                      <Input
                        placeholder="Ingrese Estatura (ejemplo: 175cm)"
                        {...field}
                      />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="pesoOtro"
                  control={control}
                  rules={{
                    validate: validatePeso,
                    minLength: {
                      value: 4,
                      message: "Este no es tu peso... !",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="peso"
                      hasFeedback={touchedFields.pesoOtro}
                      validateStatus={errors.pesoOtro ? "error" : "success"}
                      help={errors.pesoOtro && errors.pesoOtro.message}
                    >
                      <Input
                        placeholder="Ingrese su peso (ejemplo: 50kg)"
                        {...field}
                      />
                    </Form.Item>
                  )}
                />
              </>
            )}
          </div>
        )}
        <Button type="primary" danger htmlType="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default Form1;
