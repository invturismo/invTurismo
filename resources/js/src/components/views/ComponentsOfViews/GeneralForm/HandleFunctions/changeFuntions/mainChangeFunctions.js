import { unitValidateGeneralForm } from "../../validationsGeneralForm";
import { helpSetValues } from "../helpers/helpSetValues";
import { helpSwitchCodigo } from "../helpers/helpSwitchCodigo";
import { handleChangeCalidad } from "./handleChangeCalidad";
import { handleChangeCheckBox } from "./handleChangeCheckbox";
import { handleChangeFiles } from "./handleChangeFile";
import { handleChangesGeneralidades } from "./handleChangeGeneralidades";
import Significado from "../../DataJson/DataSignificado.json"
import { helpChangeInt } from "../helpers/helpChangeInt";

export const mainChangeFunctions = ({
  values,
  setValues,
  errors,
  setErrors,
  who,
  dispatch,
  valueWho,
}) => {
  const {
    firstLevelErrors,
    normalChange,
    secondLevelChange,
    secondLevelErrors,
  } = helpSetValues({ errors, setErrors, setValues, values, valueWho, who });

  const handleChangeGeneralidades = handleChangesGeneralidades({
    normalChange,
    secondLevelChange,
  });

  const handleChangeAdminPropietario = (e) => {
    secondLevelChange(
      e.target.name,
      e.target.value,
      "GENERALIDADES",
      "ADMIN/PROPIETARIOS"
    );
  };

  const handleChangeCaracteristicas = (e) => {
    normalChange(e.target.name, e.target.value, "CARACTERISTICAS");
  };

  const handleChangeCodigo = (e) => {
    let optionalChange = helpSwitchCodigo(values, e);
    secondLevelChange(
      e.target.name,
      e.target.value,
      "CARACTERISTICAS",
      "CODIGOS",
      optionalChange
    );
  };

  const handleChangeFile = handleChangeFiles({
    dispatch,
    firstLevelErrors,
    normalChange,
  });

  const handleDeleteImage = (e) => {
    const { className } = e.target;
    normalChange(className, null, "CARACTERISTICAS");
    dispatch(deleteUrlImage(className));
  };

  const handleChangePuntajes = (e) => {
    let Subtotal = values.PUNTAJES_VALORACION.CALIDAD.SUBTOTAL;
    let SignificadoPuntaje = Significado[e.target.value - 1]["PUNTAJE"];
    Subtotal = helpChangeInt(Subtotal);
    SignificadoPuntaje = helpChangeInt(SignificadoPuntaje);
    let optionalChange = {
      TOTAL: SignificadoPuntaje + Subtotal,
    };
    normalChange(
      e.target.name,
      e.target.value,
      "PUNTAJES_VALORACION",
      optionalChange
    );
  };

  const {
    handleChangeCalidadFestividades,
    handleChangeCalidadGrupos,
    handleChangeCalidadInmaterial,
    handleChangeCalidadMaterial,
    handleChangeCalidadSitios,
  } = handleChangeCalidad({ secondLevelChange, values });

  const handleChangeCaracteristicasRelevantes = (e) => {
    normalChange(e.target.name, e.target.value, "CARACTERISTICAS_RELEVANTES");
  };

  const handleChangeCheckbox = handleChangeCheckBox({
    secondLevelChange,
    setValues,
    values,
  });

  const handleChangeTarifas = (e) => {
    secondLevelChange(
      e.target.name,
      e.target.value,
      "CARACTERISTICAS_RELEVANTES",
      "TARIFAS"
    );
  };

  const handleChangeActividades = (e) => {
    secondLevelChange(
      e.target.name,
      e.target.value,
      "ACTIVIDADES_SERVICIOS",
      "ACTIVIDADES"
    );
  };

  const handleChangeServicios = (e) => {
    secondLevelChange(
      e.target.name,
      e.target.value,
      "ACTIVIDADES_SERVICIOS",
      "SERVICIOS"
    );
  };

  const handleChangePromocion = (e) => {
    normalChange(e.target.name, e.target.value, "PROMOCION");
  };

  const handleChangeServiciosEspeciales = (e) => {
    normalChange(e.target.name, e.target.value, "SERVICIOS_ESPECIALES");
  };

  const handleChangeRedes = (e) => {
    secondLevelChange(e.target.name, e.target.value, "OTROS", "REDES");
  };

  const handleChangeOtros = (e) => {
    normalChange(e.target.name, e.target.value, "OTROS");
  };

  const handleBlur = async (e, firstParent, secondParent) => {
    const response = await unitValidateGeneralForm(
      e,
      valueWho[who],
      firstParent,
      secondParent
    );
    if (!response.state) {
      if (!secondParent) firstLevelErrors(firstParent, response);
      else secondLevelErrors(firstParent, secondParent, response);
    }
  };

  return {
    handleChangeCheckbox,
    handleBlur,
    handleChangeGeneralidades,
    handleChangeAdminPropietario,
    handleChangeCaracteristicas,
    handleChangeCodigo,
    handleChangeFile,
    handleChangePuntajes,
    handleChangeCalidadMaterial,
    handleChangeCaracteristicasRelevantes,
    handleChangeTarifas,
    handleChangeActividades,
    handleChangeServicios,
    handleChangePromocion,
    handleChangeServiciosEspeciales,
    handleChangeRedes,
    handleChangeOtros,
    handleDeleteImage,
    handleChangeCalidadInmaterial,
    handleChangeCalidadGrupos,
    handleChangeCalidadSitios,
    handleChangeCalidadFestividades,
  };
};
