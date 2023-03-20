import { toast } from "react-toastify";

export function SuccessToast(message: string) {
	toast(message, {
		type: "success",
	});
}
