import { Formik } from "formik";
import React from "react";
import { helpCapitalize } from "../../../../helpers/helpCapitalize";
import { schemaErrorsFormCAT } from "./schemaErrorsFormCAT";
import { StyleFormClasificacionAtractivosTuristicos } from "./StyleFormClasificacionAtractivosTuristicos";
import TipoDeBien from "./DataJson/DataTipoDeBien.json";
import ButtonPage from "../../../common/ButtonPage";
import { useDispatch } from "react-redux";
import {
  closeLoaderForm,
  openLoaderForm,
} from "../../../../features/modalsSlice";
import { fetchFormClasificacion } from "./logicFormClasificacion";
import { useNavigate } from "react-router-dom";
import { toastMs } from "../../../../helpers/helpToastMessage";

const FormClasificacionAtractivosTuristicos = ({
  initialValues,
  actualizando,
  ID_LISTADO,
  DEPARTAMENTO,
  MUNICIPIO,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schemaErrorsFormCAT}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        dispatch(openLoaderForm());
        const data = await fetchFormClasificacion(values);
        console.log(data);
        dispatch(closeLoaderForm());
        if (!data.state) {
          toastMs().error(data.messsage);
          return setErrors(data.errors);
        }
        setSubmitting(false);
        if (actualizando) {
          toastMs().success("Se actualizo correctamente");
          navigate(
            `/clasificacion-recursos-atractivos/clasificado/${ID_LISTADO}`,
            {
              replace: true,
            }
          );
        } else {
          toastMs().success("Se clasifico correctamente");
          navigate(`/clasificacion-recursos-atractivos/sin-clasificar`, {
            replace: true,
          });
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => (
        <StyleFormClasificacionAtractivosTuristicos onSubmit={handleSubmit}>
          <div className="MainInformation">
            <p>
              <span className="titleInformation">Departamento: </span>
              <span className="information">
                {helpCapitalize(DEPARTAMENTO)}
              </span>
            </p>
            <p>
              <span className="titleInformation">Municipio: </span>
              <span className="information">{helpCapitalize(MUNICIPIO)}</span>
            </p>
            <label htmlFor="ID_TIPO_BIEN">
              <span className="titleInformation">Tipo de bien</span>
              <select
                name="ID_TIPO_BIEN"
                id="ID_TIPO_BIEN"
                value={values.ID_TIPO_BIEN}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" disabled>
                  Seleccione un tipo de bien
                </option>
                {TipoDeBien.map((val) => {
                  return (
                    <option
                      value={val["id_tipos_bien"]}
                      key={val["id_tipos_bien"] + val["tipo_bien"]}
                    >
                      {helpCapitalize(val["tipo_bien"])}
                    </option>
                  );
                })}
              </select>
              {touched.ID_TIPO_BIEN && errors.ID_TIPO_BIEN && (
                <small className="errorMessage">{errors.ID_TIPO_BIEN}</small>
              )}
            </label>
          </div>
          <div className="ContainerButtons">
            {actualizando ? (
              <ButtonPage type="submit" colorButton="green">
                Actualizar
              </ButtonPage>
            ) : (
              <>
                <ButtonPage type="submit" colorButton="blue">
                  Clasificar
                </ButtonPage>
                <ButtonPage type="submit" colorButton="green">
                  Siguiente
                </ButtonPage>
              </>
            )}
          </div>
        </StyleFormClasificacionAtractivosTuristicos>
      )}
    </Formik>
  );
};

export default FormClasificacionAtractivosTuristicos;
