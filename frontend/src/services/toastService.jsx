import { toast } from "react-hot-toast";

export const notify = (status, message) => {
  switch (status) {
    case 200:
      toast.success(message);
      break;
    default:
      toast.error(message);
      break;
  }
};