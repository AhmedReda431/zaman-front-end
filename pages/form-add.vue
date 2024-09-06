<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <!-- Image Section -->
    <div class="bg-cover bg-center bg-gray-800 lg:w-2/3 flex items-center justify-center text-white relative" 
         style="background-image: url('/path-to-your-image.jpg');">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative text-center">
        <h1 class="text-4xl font-bold mb-4">اطلب او اعرض عقارك</h1>
        <p class="text-lg">املاً بياناتك الان</p>
      </div>
    </div>

    <!-- Form Section -->
    <div class="bg-white p-8 lg:w-1/3 flex flex-col justify-center">
      <form class="space-y-4">
        <!-- Full Name -->
        <div>
          <label class="block text-right text-gray-700 mb-2" for="full-name">الاسم الثلاثى</label>
          <input id="full-name" type="text" class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" v-model="form.fullName"/>
        </div>
        <!-- Request Type -->
        <div>
          <label class="block text-right text-gray-700 mb-2" for="request-type">نوع الطلب</label>
          <select id="request-type" class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" v-model="form.requestType">
            <option value="عرض عقار">عرض عقار</option>
            <option value="طلب آخر">طلب آخر</option>
          </select>
        </div>
        <!-- Register Type -->
        <div>
          <label class="block text-right text-gray-700 mb-2" for="register-type">نوع المسجل</label>
          <select id="register-type" class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" v-model="form.registerType">
            <option value="">اختر نوع المسجل</option>
            <option value="شخصي">شخصي</option>
            <option value="منشأة">منشأة</option>
          </select>
        </div>
        <!-- Conditional Fields -->
        <div v-if="form.registerType === 'منشأة'">
          <div>
            <label class="block text-right text-gray-700 mb-2" for="company-license">رقم الترخيص العقارى للاعلان</label>
            <input id="company-license" type="text" class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" v-model="form.companyLicense"/>
          </div>
          <div>
            <label class="block text-right text-gray-700 mb-2" for="company-id">رقم الموحد للمنشأة</label>
            <input id="company-id" type="text" class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" v-model="form.companyId"/>
          </div>
        </div>
        <div v-else-if="form.registerType === 'شخصي'">
          <div>
            <label class="block text-right text-gray-700 mb-2" for="personal-license">رقم الترخيص العقارى للاعلان</label>
            <input id="personal-license" type="text" class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" v-model="form.personalLicense"/>
          </div>
          <div>
            <label class="block text-right text-gray-700 mb-2" for="id-number">رقم الهوية</label>
            <input id="id-number" type="text" class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" v-model="form.idNumber"/>
          </div>
        </div>
        <!-- Submit Button -->
        <div class="flex justify-end">
          <button type="submit" class="bg-green-700 text-white py-2 px-4 rounded-md flex items-center">
            <span class="ml-2">التالى</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'PropertyForm',
  data() {
    return {
      form: {
        fullName: '',
        requestType: '',
        registerType: '',
        companyLicense: '',
        companyId: '',
        personalLicense: '',
        idNumber: ''
      }
    };
  }
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
