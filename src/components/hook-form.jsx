import "../styles/Forms.css";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Input, Button, Form, Select, Drawer, Tooltip } from "antd";
import { paises } from "./Data/Pais";
import TableCell from "./Tablecell";

const Form1 = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "all",
  });
  const [formData, setFormData] = useState({});
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
    const datosFiltrados = Object.fromEntries(
      Object.entries(data).filter(
        ([nombre, data]) => data !== "" && data !== undefined
      )
    );

    const usersWithData = data.users.map((user) => ({
      ...user,
      pais: data.pais,
      ciudad: data.ciudad,
      genero: data.genero,
    }));
    console.log(formData);
    setFormData({ ...datosFiltrados, users: usersWithData });
  };

  return (
    <div className={"ContainerTodo"}>
      <p className="DatosUser">
        Datos de usuarios
      </p>
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
            <Controller
              name="pais"
              control={control}
              rules={{
                required: "Requerido !",
              }}
              render={({ field }) => (
                <>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="País"
                    validateStatus={errors.pais ? "error" : "success"}
                    help={errors.pais && errors.pais.message}
                  >
                    <Select
                      {...field}
                      placeholder="Seleccione su país"
                      allowClear={true}
                    >
                      {paises.map((pais) => (
                        <Select.Option key={pais.value} value={pais.value}>
                          {pais.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </>
              )}
            />
            {watch("pais") && (
              <Controller
                name="ciudad"
                control={control}
                rules={{
                  required: "Requerido !",
                }}
                render={({ field }) => (
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="Ciudad"
                    validateStatus={errors.ciudad ? "error" : "success"}
                    help={errors.ciudad && errors.ciudad.message}
                  >
                    <Select
                      {...field}
                      placeholder="Seleccione su ciudad"
                      allowClear={true}
                    >
                      {paises
                        .find((pais) => pais?.value === watch("pais"))
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

            <ul>
              {fields.map((item, index) => (
                <li key={item.id}>
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
                  <Controller
                    render={({ field }) => (
                      <Form.Item labelCol={{ span: 24 }} label="Email">
                        <Input {...field} />
                      </Form.Item>
                    )}
                    name={`users.${index}.infoUser.email`}
                    control={control}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            {fields.length < 2 && (
              <Button type="primary" onClick={() => append()}>
                Info adicional
              </Button>
            )}
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

            <Button type="primary" danger htmlType="submit">
              Enviar
            </Button>
          </form>
        </Drawer>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th className="nombre">Nombre</th>
            <th className="nombre">Apellido</th>
            <th className="nombre">Teléfono</th>
            <th className="nombre">Email</th>
            <th className="nombre">pais </th>
            <th className="nombre">ciudad </th>
            <th className="nombre">Genero</th>
          </tr>
        </thead>
        <tbody>
          {formData.users &&
            formData.users.map((user, index) => (
              <tr key={index}>
                <TableCell
                  value={user.dataUser.nombre}
                  setValue={setValue}
                  setFormData={setFormData}
                  fieldPath={`users.${index}.dataUser.nombre`}
                />
                <TableCell
                  value={user.dataUser.apellido}
                  setValue={setValue}
                  setFormData={setFormData}
                  fieldPath={`users.${index}.dataUser.apellido`}
                />
                <TableCell
                  value={user.infoUser.telefono}
                  setValue={setValue}
                  setFormData={setFormData}
                  fieldPath={`users.${index}.infoUser.telefono`}
                />
                <TableCell
                  value={user.infoUser.email}
                  setValue={setValue}
                  setFormData={setFormData}
                  fieldPath={`users.${index}.infoUser.email`}
                />
                <TableCell
                  value={user.pais}
                  setValue={setValue}
                  setFormData={setFormData}
                  fieldPath={"pais"}
                />
                <TableCell
                  value={user.ciudad}
                  setValue={setValue}
                  setFormData={setFormData}
                  fieldPath={"ciudad"}
                />
                <TableCell
                  value={user.genero}
                  setValue={setValue}
                  setFormData={setFormData}
                  fieldPath={"genero"}
                />
              </tr>
            ))}
        </tbody>
      </table>
      <Tooltip title="Form">
        <Button size="small" type="primary" onClick={showDrawer}>
          ➤
        </Button>
      </Tooltip>
    </div>
  );
};

export default Form1;
