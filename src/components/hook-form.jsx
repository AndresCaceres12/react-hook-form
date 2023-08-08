import "../styles/Forms.css";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Input, Button, Form, Select, Drawer, Tooltip } from "antd";
import { paises, genero } from "./Data/DataForm";
import TableCell from "./Tablecell";
const Form1 = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    mode: "all",
  });
  const [formData, setFormData] = useState({ users: [] });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    setFormData({
      users: data.users,
    });
  };
  const allUsers = [...formData.users];
  console.log(allUsers);
  return (
    <div className="ContainerTodo">
      <p className="DatosUser">Datos de usuarios</p>
      <div className="BoxForm">
        <Drawer
          title="Form"
          placement={placement}
          closable={false}
          onClose={onClose}
          open={open}
          key={placement}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((item, index) => (
              <div key={item.id}>
                <Controller
                  name={`users.${index}.data.pais`}
                  control={control}
                  render={({ field }) => (
                    <Form.Item labelCol={{ span: 24 }} label="Pais">
                      <Select
                        placeholder="Seleccione una opción"
                        {...field}
                        allowClear={true}
                        value={watch(`users.${index}.data.pais`)}
                        onChange={(selectedValue) => {
                          field.onChange(selectedValue);
                          setValue(`users.${index}.data.ciudad`, null);
                        }}
                      >
                        {paises.map((pais) => (
                          <Select.Option key={pais.value} value={pais.value}>
                            {pais.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                />
                {watch(`users.${index}.data.pais`) && (
                  <Controller
                    name={`users.${index}.data.ciudad`}
                    control={control}
                   
                    render={({ field }) => (
                      <Form.Item labelCol={{ span: 24 }} label="Ciudad">
                        <Select
                          {...field}
                          placeholder="Seleccione su ciudad"
                          allowClear={true}
                        >
                          {paises
                            .find(
                              (pais) =>
                                pais?.value ===
                                getValues(`users.${index}.data.pais`)
                            )
                            ?.ciudades?.map((ciudad) => (
                              <Select.Option
                                key={ciudad.value}
                                value={ciudad.value}
                              >
                                {ciudad.label}
                              </Select.Option>
                            ))}
                        </Select>
                      </Form.Item>
                    )}
                  />
                )}
                {paises.map((pais) => (
                  <Select.Option key={pais.value} value={pais.value}>
                    {pais.label}
                  </Select.Option>
                ))}
                <Controller
                  name={`users.${index}.data.genero`}
                  control={control}
                  rules={{
                    required: "Requerido !",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Form.Item labelCol={{ span: 24 }} label="Genero">
                        <Select
                          placeholder="Seleccione una opción"
                          allowClear={true}
                          value={value}
                          onChange={onChange}
                        >
                          <Select.Option value="masculino">
                            Masculino
                          </Select.Option>
                          <Select.Option value="femenino">
                            Femenino
                          </Select.Option>
                          <Select.Option value="otro">Otro</Select.Option>
                        </Select>
                      </Form.Item>
                    </>
                  )}
                />
                {watch(`users.${index}.data.genero`) && (
                  <Controller
                    name={`users.${index}.data.preguntaGenero`}
                    control={control}
                    render={({ field }) => (
                      <>
                        {genero
                          .find(
                            (genero) =>
                              genero?.value ===
                              getValues(`users.${index}.data.genero`)
                          )
                          ?.actividad?.map((actividad) => (
                            <Form.Item
                              labelCol={{ span: 24 }}
                              label={actividad.label}
                            >
                              <Input {...field} />
                            </Form.Item>
                          ))}
                      </>
                    )}
                  />
                )}
                <Controller
                  name={`users.${index}.data.pasatiempos`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <Form.Item labelCol={{ span: 24 }} label="Pasa tiempos :">
                        <Input {...field} />
                      </Form.Item>
                    </>
                  )}
                />

                <Controller
                  render={({ field }) => (
                    <Form.Item labelCol={{ span: 24 }} label="Nombre">
                      <Input {...field} />
                    </Form.Item>
                  )}
                  name={`users.${index}.dataUser.nombre`}
                  control={control}
                />
                <Controller
                  render={({ field }) => (
                    <Form.Item labelCol={{ span: 24 }} label="Apellido">
                      <Input {...field} />
                    </Form.Item>
                  )}
                  name={`users.${index}.dataUser.apellido`}
                  control={control}
                />
                <Controller
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="Número Telefonico"
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                  name={`users.${index}.infoUser.telefono`}
                  control={control}
                />
                    {watch(`users.${index}.data.ciudad`) && (
                  <Controller
                    name={`users.${index}.data.hacerEn`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <Form.Item label={ `Cosas para hacer en ${getValues(`users.${index}.data.ciudad`)}`}>
                         <Input {...field} /> 
                        </Form.Item>
                      </>
                    )}
                  />
                )}
                <Controller
                  render={({ field }) => (
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="Email"
                      validateStatus={
                        errors.users?.[index]?.infoUser?.email
                          ? "error"
                          : "success"
                      }
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                  name={`users.${index}.infoUser.email`}
                  control={control}
                />
               
                {fields.length > 1 && (
                  <Tooltip title="Eliminar">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => remove(index)}
                    >
                      🗑️
                    </span>
                  </Tooltip>
                )}
              </div>
            ))}

            {fields.length < 2 && (
              <Button type="primary" onClick={() => append()}>
                Otro perfil
              </Button>
            )}

            <Button type="primary" danger htmlType="submit">
              Enviar
            </Button>
          </form>
        </Drawer>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Pais</th>
            <th>Ciudad</th>
            <th>Genero</th>
            <th> Pasatiempos</th>
            <th>Cosas para hacer </th>

            {/* <th className="nombre">
      Dato adicional
      </th> */}
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={index}>
              {/* Render celdas de la tabla */}
              <TableCell
                value={user.dataUser?.nombre}
                setValue={setValue}
                setFormData={setFormData}
                fieldPath={`users.${index}.dataUser.nombre`}
              />
              <TableCell
                value={user.dataUser?.apellido}
                setValue={setValue}
                setFormData={setFormData}
                fieldPath={`users.${index}.dataUser.apellido`}
              />
              <TableCell
                value={user.infoUser?.telefono}
                setValue={setValue}
                setFormData={setFormData}
                fieldPath={`users.${index}.infoUser.telefono`}
              />
              <TableCell
                value={user.infoUser?.email}
                setValue={setValue}
                setFormData={setFormData}
                fieldPath={`users.${index}.infoUser.email`}
              />
              <TableCell
                value={user.data?.pais || ""}
                setValue={setValue}
                setFormData={setFormData}
                fieldPath={`users.${index}.data.pais`}
              />
              <TableCell
                value={user.data?.ciudad || ""}
                setValue={setValue}
                setFormData={setFormData}
                fieldPath={`users.${index}.data.ciudad`}
              />
              <TableCell
                value={user.data?.genero || ""}
                setValue={setValue}
                setFormData={setFormData}
                fieldPath={`users.${index}.data.genero`}
              />
              <TableCell
                value={user.data?.pasatiempos || ""}
                setValue={setValue}
                setFormData={setFormData}
                fieldPath={`users.${index}.data.pasatiempos`}
              />
               <TableCell
                value={user.data?.hacerEn || ""}
                setValue={setValue}
                setFormData={setFormData}
                fieldPath={`users.${index}.data.hacerEn`}
              />
            </tr>
          ))}
        </tbody>
      </table>
      <Tooltip title="Form">
        <Button
          size="small"
          type="primary"
          onClick={() => {
            showDrawer();
            {
              fields.length < 1 && append();
            }
          }}
        >
          ➤
        </Button>
      </Tooltip>
    </div>
  );
};
export default Form1;
