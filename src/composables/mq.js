import { reactive } from "vue";
import { useMediaQuery } from "@vueuse/core";

export default function useMQ() {
	return reactive({
		xs: useMediaQuery(('(min-width: 360px) and (max-width: 767px)')),
		sm: useMediaQuery(('(min-width: 768px) and (max-width: 979px)')),
		md: useMediaQuery(('(min-width: 980px) and (max-width: 1279px)')),
		lg: useMediaQuery(('(min-width: 1280px) and (max-width: 1599px)')),
		xl: useMediaQuery(('(min-width: 1600px)')),

		mobile: useMediaQuery(('(min-width: 360px) and (max-width: 979px)')),
	})
}