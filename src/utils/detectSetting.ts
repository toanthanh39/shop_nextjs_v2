import { SettingJson } from "@/types/Setting.type";

export default function detectSetting<R>(
	key: string,
	data:
		| SettingJson<unknown>
		| SettingJson<unknown>[]
		| SettingJson<R>[]
		| SettingJson<R>
		| undefined
) {
	if (!data) return;

	try {
		if (Array.isArray(data)) {
			return data.find((item) => item.key === key) as SettingJson<R>;
		}

		if (data.key === key) {
			return data as SettingJson<R>;
		}
	} catch (error) {
		return;
	}
}
export function detectKeyFromSetting<D, K extends readonly string[]>(
	arrKey: K,
	arrDataToDetect: SettingJson<D> | SettingJson<D>[]
): Record<K[number], D | string> {
	// K[number] sẽ là type của từng phần tử trong arrKey
	const result: Partial<Record<K[number], D | string>> = {};

	const processKey = (key: string, entry: SettingJson<D> | undefined) => {
		result[key as K[number]] = entry ? entry.value : key;
	};

	for (const key of arrKey) {
		if (Array.isArray(arrDataToDetect)) {
			const found = arrDataToDetect.find((item) => item.key === key);
			processKey(key, found);
		} else {
			const match = arrDataToDetect.key === key ? arrDataToDetect : undefined;
			processKey(key, match);
		}
	}

	return result as Record<K[number], D | string>;
}
