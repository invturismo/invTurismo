import Componentes from "../../DataJson/DataComponentes.json";
import Elementos from "../../DataJson/DataElementos.json";

//Funcion para reiniciar valores anteriores del codigo
export const helpSwitchCodigo = (values, e) => {
  let optionalChange = {};
  let idPatrimonio = values.CARACTERISTICAS.CODIGOS.ID_TIPO_PATRIMONIO;
  switch (e.target.name) {
    case "ID_TIPO_PATRIMONIO":
      optionalChange.ID_GRUPO = "";
      optionalChange.ID_COMPONENTE = "";
      optionalChange.ID_ELEMENTO = "";
      break;
    case "ID_GRUPO":
      let Componente = Componentes[idPatrimonio][e.target.value];
      let valueField = !Componente ? "1" : "";
      optionalChange.ID_ELEMENTO = valueField;
      optionalChange.ID_COMPONENTE = valueField;
      break;
    case "ID_COMPONENTE":
      let idGrupo = values.CARACTERISTICAS.CODIGOS.ID_GRUPO;
      let Grupo = Elementos[idPatrimonio][idGrupo];
      if (!Grupo) optionalChange.ID_ELEMENTO = "1";
      else {
        let Elemento = Elementos[idPatrimonio][idGrupo][e.target.value];
        optionalChange.ID_ELEMENTO = !Elemento ? "1" : "";
      }
      break;
    default:
      break;
  }
  return optionalChange;
};
