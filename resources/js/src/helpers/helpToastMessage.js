import toast from "react-hot-toast";

//Funcion base para hacer uso de la libreria toast
export const toastMs = () => {
  const settings = {
    position: "bottom-right",
    reverseOrder: false,
    style: {
      borderRadius: "5px",
      background: "#333",
      color: "#fff",
      textAlign: "center",
    },
  };

  const success = message => toast.success(message, settings);
  const error = message => toast.error(message, settings);

  return {
    success,
    error,
  };
};
