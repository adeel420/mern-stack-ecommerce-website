import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleSuccess = (msg) => {
    return toast.success(msg, {position: 'top-right'})
}

export const handleError = (msg) => {
    return toast.error(msg, {position: 'top-right'})
}