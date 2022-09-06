import React, { useEffect, useState } from "react";
import { toastMs } from "../../../../helpers/helpToastMessage";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { closeFilter, setDataFilter } from "../../../../features/filterSlice";
import { StyleFilter } from "./StyleFilter";
import ButtonHeader from "../../../common/ButtonHeader";
import { useSearchParams } from "react-router-dom";
import SelectDepartamentos from "../Selects/SelectDepartamentos";
import SelectMunicipio from "../Selects/SelectMunicipio";
import { AnimatePresence,motion } from "framer-motion";
const cookies = new Cookies();

const initialValues = {
  ID_DEPARTAMENTOS: "",
  ID_MUNICIPIOS: "",
};

const dataFilter = () => {
  const ID_DEPARTAMENTOS = cookies.get("id_departamentos");
  const ID_MUNICIPIOS = cookies.get("id_municipios");
  if (ID_DEPARTAMENTOS || ID_MUNICIPIOS)
    return {
      ID_DEPARTAMENTOS: ID_DEPARTAMENTOS || "",
      ID_MUNICIPIOS: ID_MUNICIPIOS || "",
    };
  return null;
};

const Filter = () => {
  const filter = dataFilter();
  const [values, setValues] = useState(filter || initialValues);
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const stateFilter = useSelector((state) => state.filterSlice.stateFilter);

  useEffect(() => {
    return () => {
      dispatch(closeFilter());
    }
  }, []);
  

  const handleChange = (e) => {
    if (e.target.name === "ID_DEPARTAMENTOS") {
      const valueMunicipio = { ID_MUNICIPIOS: "" };
      if (e.target.value === "11") valueMunicipio.ID_MUNICIPIOS = "001";
      setValues({
        ...values,
        [e.target.name]: e.target.value,
        ...valueMunicipio,
      });
    } else setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.ID_DEPARTAMENTOS && !values.ID_MUNICIPIOS)
      return toastMs().error("No selecciono ningun filtro");
    cookies.set("id_departamentos", values.ID_DEPARTAMENTOS, { path: "/" });
    cookies.set("id_municipios", values.ID_MUNICIPIOS, { path: "/" });
    if (params.has("page")) params.delete("page");
    setParams(params);
    dispatch(setDataFilter(values));
  };

  return (
    <AnimatePresence>
      {stateFilter && (
        <StyleFilter
          variants={{
            initial: {
              height: 0,
            },
            animate: {
              height: "auto",
              transition: {
                when: "beforeChildren",
              },
            },
            exit: {
              height: 0,
              transition: {
                when: "afterChildren",
              },
            },
          }}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.form
            variants={{
              initial: {
                opacity: 0,
              },
              animate: {
                opacity: 1,
              },
              exit: {
                opacity: 0,
              },
            }}
            onSubmit={handleSubmit}
          >
            <div className="Options">
              <SelectDepartamentos
                handleChange={handleChange}
                values={values}
              />
              <SelectMunicipio handleChange={handleChange} values={values} />
            </div>
            <ButtonHeader
              type="Submit"
              imgSrc="svgAccept.svg"
              className="filterButton"
            >
              Aceptar
            </ButtonHeader>
          </motion.form>
        </StyleFilter>
      )}
    </AnimatePresence>
  );
};

export default Filter;
