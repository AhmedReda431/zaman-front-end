<template>
    <div class="relative min-h-screen bg-gray-100 m-12">
      <!-- Image with Overlay Text -->
      <div class="relative h-64 md:h-96 w-full rounded-lg">
        <img
          src="https://picsum.photos/800/400"
          alt="House Image"
          class="object-cover w-full h-full rounded-lg"
        />
        <!-- Overlay Text -->
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-left p-8">
          <div class="text-center">
            <h2 class="text-white text-4xl font-bold">تواصل معنا</h2>
            <p class="text-white text-lg mt-2">املأ بياناتك الآن</p>
          </div>
        </div>
      </div>
  
      <!-- Conditional rendering based on form submission -->
      <div class="absolute inset-0 top-48 md:top-60 flex justify-end md:ml-16"> <!-- النموذج أقرب إلى اليسار -->
        <div v-if="!isSubmitted" class="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3"> <!-- تصغير العرض هنا -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="flex flex-col">
              <label for="name" class="text-right mb-2">الاسم ثلاثي</label>
              <input
                type="text"
                id="name"
                class="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                placeholder="أدخل الاسم"
              />
            </div>
            <div class="flex flex-col">
              <label for="phone" class="text-right mb-2">رقم الجوال</label>
              <input
                type="text"
                id="phone"
                class="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                placeholder="أدخل رقم الجوال"
              />
            </div>
            <div class="flex flex-col">
              <label for="email" class="text-right mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                class="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>
            <div class="flex flex-col">
              <label for="message" class="text-right mb-2">نص الرسالة</label>
              <textarea
                id="message"
                class="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                placeholder="أدخل رسالتك"
                rows="4"
              ></textarea>
            </div>
            <div class="text-right">
              <button
                type="submit"
                class="px-6 py-2 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
                style="background-color: #264642; color: white;"
              >
                إرسال الطلب
              </button>
            </div>
          </form>
        </div>
  
        <!-- Success message after form submission -->
        <div v-else class="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 border-2 text-center"> <!-- نفس التعديل هنا -->
          <img src="https://picsum.photos/800/400" alt="Success Image" class="mx-auto mb-4" />
          <h3 class="text-green-600 text-2xl font-bold">تم إرسال الطلب بنجاح!</h3>
          <p class="text-gray-600 mt-2">يسعدنا تواصلك مع شركة زمن وسوف نقوم بالرد فى اسرع وقت</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isSubmitted: false, // حالة تتبع إذا تم إرسال النموذج
      };
    },
    methods: {
      handleSubmit() {
        // عند إرسال النموذج، نغير حالة isSubmitted إلى true
        this.isSubmitted = true;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  