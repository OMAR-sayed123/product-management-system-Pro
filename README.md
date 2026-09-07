# StockFlow - نظام إدارة المخزون 📦

## نظرة عامة
تطبيق ويب متقدم لإدارة المخزون والمنتجات والفئات مع واجهة مستخدم احترافية وسهلة الاستخدام.

---

## 🚀 البدء السريع

### 1. التثبيت
```bash
npm install
```

### 2. تشغيل المشروع
```bash
npm start
```

### 3. الوصول إلى التطبيق
افتح [http://localhost:3000](http://localhost:3000) في المتصفح

---

## 📋 الميزات الرئيسية

### ✅ نظام المصادقة
- تسجيل دخول آمن
- إنشاء حسابات جديدة
- حماية الصفحات (Protected Routes)
- تسجيل الخروج الآمن

### ✅ إدارة المنتجات
- إضافة منتج جديد
- تحرير المنتجات الموجودة
- حذف المنتجات
- عرض تفاصيل المنتج
- البحث والفلترة

### ✅ إدارة الفئات
- إضافة فئة جديدة
- تحرير الفئات
- حذف الفئات
- عرض إحصائيات الفئات
- البحث والفلترة حسب الحالة

### ✅ لوحة التحكم (Dashboard)
- عرض الإحصائيات الحية
- رسم بياني لنظرة عامة المخزون
- قائمة المنتجات ذات المخزون المنخفض
- جدول المنتجات الحديثة

### ✅ الإعدادات
- تحديث معلومات المستخدم
- تغيير كلمة المرور
- إدارة التفضيلات
- تسجيل الخروج

---

## 🗂️ هيكل المجلدات

```
src/
├── components/          # مكونات React
├── pages/              # الصفحات الرئيسية
├── context/            # React Context
├── services/           # خدمات LocalStorage
├── App.js
├── App.css
└── index.js
```

---

## 🔐 نظام المصادقة

### تسجيل حساب جديد
1. انقر على "Sign Up"
2. أدخل البيانات المطلوبة
3. انقر على "Sign Up"

### تسجيل الدخول
1. أدخل بريدك الإلكتروني وكلمة المرور
2. انقر على "Sign In"

---

## 📦 إدارة المنتجات
- إضافة وتحرير وحذف المنتجات
- البحث والفلترة حسب الفئة
- عرض حالة المخزون

---

## 🏷️ إدارة الفئات
- إضافة وتحرير وحذف الفئات
- البحث والفلترة حسب الحالة
- عرض إحصائيات الفئات

---

## 📊 لوحة التحكم
- إحصائيات حقيقية من البيانات
- رسم بياني للمخزون
- قائمة المنتجات المهمة

---

## 💾 تخزين البيانات
يستخدم التطبيق LocalStorage لحفظ البيانات محلياً.

---

## 🔧 التكنولوجيات المستخدمة
- React.js
- React Router
- React Context
- CSS3
- LocalStorage

---

**استمتع باستخدام StockFlow! 🎉**

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
