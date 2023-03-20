import { toast } from "react-toastify";

export function ErrorToast(message: string) {
	toast(message, {
		type: "error",
	});
}
