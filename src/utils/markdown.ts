import Helper from "./helper";

export const convertValue = (value: any, pipe: string): any => {
	switch (pipe) {
		case "currency":
			return Helper.moneyFormat(value) + "đ";
		case "uppercase":
			return String(value).toUpperCase();
		case "lowercase":
			return String(value).toLowerCase();
		default:
			return value;
	}
};

export const replaceSingleKey = (template: string, data: any) => {
	return template.replace(
		/{{\s*([^}\s|]+)\s*(\|\s*([^}\s]+)\s*)?}}/g,
		(_, key, __, pipe) => {
			const keys = key.split(".");
			let value = data;

			keys.forEach((k: string) => {
				if (value && typeof value === "object" && k in value) {
					value = value[k];
				} else {
					value = "";
				}
			});

			if (pipe) {
				value = convertValue(value, pipe.trim());
			}

			return value || "";
		}
	);
};

export const ifReplace = (template: string, data: any) => {
	return template.replace(
		/{%\s*if\s+([^}\s]+)\s*%}([\s\S]*?)({%\s*endif\s*%})/g,
		(_, condition, content, end) => {
			const conditionValue = getValueFromPath(data, condition);
			return conditionValue ? content.trim() : "";
		}
	);
};

export const forReplace = (template: string, data: any) => {
	return template.replace(
		/{%\s*for\s+([^}\s]+)\s+in\s+([^}\s]+)\s*%}([\s\S]*?)({%\s*endfor\s*%})/g,
		(_, item, collection, content, end) => {
			const dataNew = getValueFromPath(data, collection);
			if (!Array.isArray(dataNew)) return "";
			return dataNew
				.map((obj: any) => {
					const newData = { [item]: obj };
					return replaceSingleKey(content.trim(), newData);
				})
				.join("");
		}
	);
};

const getValueFromPath = (obj: Record<string, any>, path: string): any => {
	return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};
