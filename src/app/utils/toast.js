import { toast } from "react-hot-toast";

// Function to show error toast notification
export const errorToast = (message) => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
    style: {
      border: "1px solid #ff4d4f",
      padding: "10px",
      color: "#ff4d4f",
    },
  });
};

// Function to show success toast notification
export const successToast = (message) => {
  toast.success(message, {
    duration: 4000,
    position: "top-right",
    style: {
      border: "1px solid #52c41a",
      padding: "10px",
      color: "#52c41a",
    },
  });
};
