This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Next.js Project

Đây là dự án được xây dựng bằng Next.js (v15) - app router , react (v19)
Dự án xây dụng website bán hàng + POS
Dự án này được xây dựng bằng các công nghệ bao gồm:

- **Next.js (v15)**: Framework React hỗ trợ SSR, SSG, và ISR.
- **Tailwind CSS**: Utility-first CSS framework.
- **Recoil**: Quản lý state cho ứng dụng React.
- **Axios & Fetch**: Thư viện và API để thực hiện HTTP requests.
- **TanStack Query (React Query)**: Quản lý data fetching và caching.
- **shadcn/ui**: Thư viện UI components được xây dựng trên Tailwind CSS.

---

## Cài đặt và chạy dự án

### 1. **Yêu cầu hệ thống**

- Node.js (v18 trở lên)
- npm hoặc yarn

### 2. **Chạy dự án**

Chạy lệnh sau để khởi chạy dự án (development):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Chạy docker để khởi chạy dự án (development):

```bash
docker build -t your-image-name --build-arg NODE_ENV=development .
docker run -p 3000:3000 -e NODE_ENV=development your-image-name
```

### 2. **Cài đặt dependencies**

Chạy lệnh sau để cài đặt các dependencies cần thiết:

```bash
npm install
# hoặc
yarn install
```

## Cấu trúc dự án và qui định source code

Đảm bảo nhất quá và dễ bảo trì , tất cả cách tổ chức folders, files phải tuân thủ các qui định:

```
src/
├── app/ # App Router (Next.js)
├── common/ # Reusable constant,..
├── components/ # Reusable components
├── config/ # Reusable config (middlware, debug, etc.)
├── featues/ #  (Task modules)
├── lib/ # Utility functions, Axios config, etc.
    └── hooks/ # Custom hooks (React Query, Recoil, etc.)
    └── recoil/ # Recoil state management
├── services/ # Global function (api, axios, etc.)
├── styles/ # Global styles, Tailwind config , variants config ui,...
├── types/ #  Global Type, Interface
└── utils/ #  Global function (helper ,...)


```

## Quy định cách code về style bằng Tailwind CSS (7)

Để đảm bảo tính nhất quán và dễ bảo trì, tất cả các component trong dự án phải tuân thủ các quy định sau khi sử dụng Tailwind CSS:

### 1. **Sử dụng Utility Classes của Tailwind CSS**

- **Container**: Sử dụng các lớp như `container`, v.v. để căn chỉnh theo layout đã qui định.
- **Spacing**: Sử dụng các lớp như `mt-4`, `mb-2`, `p-6`, v.v. để điều chỉnh margin và padding.
- **Typography**: Sử dụng các lớp như `text-xl`, `font-bold`, `text-center`, v.v. để điều chỉnh kích thước, độ đậm, và căn chỉnh văn bản.
- **Colors**: Sử dụng các lớp màu theo đúng quy định trong bảng màu dưới đây.
- **Flexbox và Grid**: Sử dụng các lớp như `flex`, `justify-between`, `items-center`, `grid`, `grid-cols-2`, v.v. để tạo layout.

### 2. **Quy định về màu sắc (Color Palette)**

Tất cả các class liên quan đến màu sắc **bắt buộc phải sử dụng palette màu sau**:

```javascript
colors: {
  gray: {
    1: "#f6e9e9",
    2: "#f7f7f7",
    3: "#d8d7d8",
    4: "#898889",
    5: "#3a393a",
  },
  red: {
    5: "#d72229",
  },
  blue: {
    5: "#004b8f",
  },
}
```

### 3. **Quy tắc đặt tên class**

- Sắp xếp các lớp theo thứ tự: **Layout > Spacing > Typography > Colors > Others**.
- Ví dụ:
  ```html
  <div
  	class="flex justify-between items-center mt-4 p-6 text-sm bg-white rounded-lg shadow-md">
  	<p class="text-lg font-semibold text-gray-800">Hello, World!</p>
  </div>
  ```

### 4. **Tách biệt logic và style**

- Tránh viết inline style. Thay vào đó, sử dụng các utility classes của Tailwind CSS.
- Nếu cần custom style phức tạp, tạo file CSS riêng và sử dụng `@apply` để kết hợp với Tailwind.

### 5. **Responsive Design**

- Sử dụng các prefix responsive của Tailwind như `sm:`, `md:`, `lg:`, `xl:` để đảm bảo giao diện hiển thị tốt trên mọi thiết bị.
- Ví dụ:
  ```html
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  	<!-- Content -->
  </div>
  ```

### 6. **Dark Mode**

- Sử dụng lớp `dark:` để áp dụng style cho chế độ tối.
- Ví dụ:
  ```html
  <div
  	class="bg-white dark:bg-colors-gray-5 text-colors-gray-5 dark:text-whitesmoke">
  	<!-- Content -->
  </div>
  ```

### 7. **Customizing Tailwind**

- Nếu cần thay đổi hoặc thêm các utility classes, chỉnh sửa file `tailwind.config.js`.
- Ví dụ:
  ```javascript
  module.exports = {
  	theme: {
  		extend: {
  			colors: {
  				primary: "#1DA1F2",
  			},
  		},
  	},
  };
  ```

## Quy định cách code về xây dựng component UI

Để đảm bảo tính nhất quán và dễ bảo trì, tất cả các component trong dự án phải tuân thủ các quy định sau khi được xây dựng và các hành động chỉnh sửa (maintain, optimization, ...)
