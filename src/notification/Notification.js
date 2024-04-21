import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Notification = () => {
  toast.success("Item added to cart!", {
    position: "bottom-right",
    autoClose: 2000, // Notification will close after 2000ms (2 seconds)
  });
};

export default Notification