interface FilterParams {
	[key: string]: string | number | undefined | boolean;
}

class Helper {
	static convertedTimestampToDate = (timestamp: number, showtime?: boolean) => {
		const showTime = typeof showtime !== "undefined" ? showtime : true;
		const time = `${new Date(timestamp * 1000).toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		})} ,`;
		const date = new Date(timestamp * 1000).toLocaleDateString("en-GB");
		if (showTime) {
			return time + date;
		}
		return date;
	};

	static isMobile = () => {
		if (typeof window !== "undefined") {
			// Client-side-only code

			let widthDevice = window.innerWidth;
			const setWidthDevice = () => {
				widthDevice = window.innerWidth;
			};
			window.addEventListener("resize", setWidthDevice);
			if (Number(widthDevice) <= 768) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	};

	static validatePhoneNumber(phone: string) {
		const regexPhoneNumber = /^[0]{1}[0-9]{9}$/;

		return phone.match(regexPhoneNumber) ? true : false;
	}
	static validateEmail(email: string) {
		const regex = /^[\w.-]+@([\w.-]+\.)+[a-z]{1,32}$/i;
		return email.match(regex) ? true : false;
	}
	static fileExtension(filename: string) {
		if (!filename) return "";
		const ext = (/[^./\\]*$/.exec(filename) || [""])[0];
		return ext.toLowerCase();
	}

	static moneyFormat(value: number): string {
		let output = "";

		//languagecode-countrycode:
		//languagecode: full list @ https://www.w3schools.com/tags/ref_language_codes.asp
		//countrycode: full list @ https://www.w3schools.com/tags/ref_country_codes.asp
		const locale = "vi-VN";

		//full currencylist at https://www.currency-iso.org/en/home/tables/table-a1.html
		const currency = "VND";

		const formatter = new Intl.NumberFormat(locale, {
			currency,
		});

		//formating data
		output = formatter.format(value).replace(/\./g, ",");

		return output;
	}

	static convertFilterToParams(
		filter: FilterParams,
		presix: string = "?"
	): string {
		if (Object.keys(filter).length <= 0) {
			return "";
		}
		const params = new URLSearchParams();
		for (const key in filter) {
			const value = filter[key];
			if (
				typeof value === "number" ||
				(typeof value === "string" && value.length > 0)
			) {
				params.append(key, value.toString());
			}
		}
		return presix + params.toString();
	}

	static convertParams(
		params: any,
		useZeroValue?: boolean,
		keyUseZeroValues?: string[]
	): object {
		const newParam = { ...params };
		for (const prop in newParam) {
			const conditionNumber = useZeroValue
				? typeof newParam[prop] === "number" && newParam[prop] < 0
				: typeof newParam[prop] === "number" &&
					!(keyUseZeroValues || []).includes(prop) &&
					newParam[prop] <= 0;

			const conditionString = useZeroValue
				? typeof newParam[prop] === "string" && newParam[prop].length <= 0
				: typeof newParam[prop] === "string" && newParam[prop].length <= 0;

			if (
				newParam[prop] === null ||
				newParam[prop] === undefined ||
				conditionNumber ||
				conditionString
			) {
				delete newParam[prop];
			}
		}
		return newParam;
	}

	static getDomainComment() {
		let domain = "https://cross.namefragrance.vn";
		try {
			const hostname = window.location.hostname;
			if (hostname) {
				if (hostname.includes("uat")) {
					domain = "https://uatcross.namefragrance.vn";
				} else if (hostname.includes("namperfume.net")) {
					domain = "https://cross.namefragrance.vn";
				}
			}
		} catch (error) {
		} finally {
			return domain;
		}
	}

	static getHostName(host?: string) {
		const markAsEmptyHostnameItems = [
			"localhost",
			"betaapp.cropany.com",
			"localhost:3001",
		];
		const hostname = host ?? window.location.hostname;
		if (hostname === "" || markAsEmptyHostnameItems.includes(hostname)) {
			return process.env.AUTH_HOSTNAME_FALLBACK!;
		} else {
			// return hostname;
			return process.env.AUTH_HOSTNAME_FALLBACK!;
		}
	}

	static isDebug() {
		return process.env.NEXT_PUBLIC_IS_DEBUG === "debug" || false;
	}

	static changeTheme = (theme: "theme1" | "theme2" | "") => {
		document.querySelector("html")?.setAttribute("data-theme", theme);
	};

	static isServer() {
		return typeof window === "undefined";
	}

	static isDev() {
		return ["development", "test"].includes(process.env.NODE_ENV);
	}

	static maskLastNChars(inputString: string, n: number) {
		if (inputString.length < n) {
			return inputString;
		}

		const maskedString = inputString.slice(0, -n) + "*".repeat(n);
		return maskedString;
	}

	static removeDuplicatesArrObject = <T>(objects: T[], key: keyof T): T[] => {
		const uniqueObjects: T[] = [];
		const encounteredIds: Set<T[keyof T]> = new Set();

		for (const obj of objects) {
			const valueCompare = obj[key];
			if (!encounteredIds.has(valueCompare)) {
				encounteredIds.add(valueCompare);
				uniqueObjects.push(obj);
			}
		}
		return uniqueObjects;
	};

	static getValueFromArrayNumber(arr: number[], type: "min" | "max") {
		if (type === "min") {
			return Math.min(...arr);
		} else {
			return Math.max(...arr);
		}
	}

	static checkRenderArray<T>(
		data: Array<T>,
		current: number,
		keydata: keyof T
	) {
		if (data.length > current) {
			if (current === 0) {
				return data[0][keydata];
			}
			return data[current][keydata];
		} else {
			return null;
		}
	}

	static readMoney(amount: number) {
		const numberWords = [
			"",
			"một",
			"hai",
			"ba",
			"bốn",
			"năm",
			"sáu",
			"bảy",
			"tám",
			"chín",
		];
		const unitWords = ["", "nghìn", "triệu", "tỷ"];

		function readThreeDigits(num: number) {
			let result = "";
			const hundred = Math.floor(num / 100);
			const ten = Math.floor((num % 100) / 10);
			const one = num % 10;

			if (hundred > 0) {
				result += numberWords[hundred] + " trăm ";
			}

			if (ten === 0 && one === 0 && hundred > 0) {
				// Không thêm 'linh' vào result nếu hundred > 0
			} else if (ten === 1 && one > 0) {
				result += "mười ";
			} else if (ten > 1) {
				result += numberWords[ten] + " mươi ";
			}

			if (ten !== 1) {
				result += numberWords[one];
			}

			return result.trim();
		}

		if (amount === 0) {
			return "không đồng";
		}

		let words = "";
		let unitIndex = 0;

		while (amount > 0) {
			const threeDigits = amount % 1000;
			if (threeDigits > 0) {
				words =
					readThreeDigits(threeDigits) +
					" " +
					unitWords[unitIndex] +
					" " +
					words;
			}
			amount = Math.floor(amount / 1000);
			unitIndex++;
		}

		return words.trim();
	}

	static parserStringToNumberInt(value: string | undefined) {
		let res;
		if (value) {
			res = Number.parseInt(value);
		}
		return res;
	}

	static removeCharAtString(str: string) {
		while (str.charAt(0) === ",") {
			str = str.substring(1);
		}

		// Loại bỏ ký tự "," ở cuối chuỗi
		while (str.charAt(str.length - 1) === ",") {
			str = str.substring(0, str.length - 1);
		}

		return str.trim();
	}

	static addDomainToSrc(htmlString: string, domain: string) {
		// Sử dụng regex để tìm và thêm domain vào các src
		const updatedHtmlString = htmlString.replace(
			/(<img\s+[^>]*src=")([^"]*)"/g,
			(match, p1, p2) => {
				// Thêm domain vào giá trị của src nếu nó không bắt đầu bằng "http" và chưa có domain
				if (!p2.startsWith("http") && !p2.startsWith(domain)) {
					const newSrc = `${domain + "/uploads/filecloud/"}${p2}`;
					return `${p1}${newSrc}"`;
				}
				return match; // Giữ nguyên nếu src đã bắt đầu bằng "http" hoặc đã có domain
			}
		);

		return updatedHtmlString;
	}

	static checkEven(number: number) {
		return number % 2 === 0;
	}

	static convertCurencyToNumber(value: string | number) {
		// if (typeof value === "number") return value;
		// const valueReplace = value.replace(/[^0-9]/g, "");
		// return Number(valueReplace.length ? valueReplace : "0");
		// if (typeof value === undefined) return 0;
		if (typeof value === "number") return value;
		const valueReplace = value.toString().replace(/[^0-9]/g, "");
		return valueReplace.length ? Number(valueReplace) : 0;
	}

	static removeJWTLocal() {
		if (!Helper.isServer()) {
			localStorage.removeItem("JWT");
		}
	}
}

export default Helper;
