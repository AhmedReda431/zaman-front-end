<script setup>
import { ref, onMounted } from 'vue'
const { fetchBanks, newBank, loading, error, errors, banks } = useBanks()
const { showAlert } = useAlert()

const showPopup = ref(false)
const formData = ref({
  bank_name: '',
  beneficiary_name: '',
  bank_address: '',
  iban: ''
})

const addPaymentMethod = async () => {
  await newBank(formData.value)
  if (error.value) {
    return
  }
  showPopup.value = false
  banks.value = []
  await fetchBanks()
  formData.value = {}
}
onMounted(async () => {
  await fetchBanks()
})
</script>

<template>
  <div>
    <button @click="showPopup = true"
      class="block max-w-sm border border-transparent bg-zaman hover:bg-zaman-800 focus:bg-zaman-400 text-white rounded-md px-3 py-2 font-semibold">اضافة
      طريقة دفع</button>

    <!-- Popup -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div class="bg-white p-6 rounded-xl shadow-md w-full sm:w-1/2 max-w-sm">
        <!-- Popup Content -->
        <h2 class="text-lg font-medium text-gray-700 mb-4">{{ $t('common.addPaymentMethod') }}</h2>
        <form @submit.prevent="addPaymentMethod">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label for="bankName" class="block text-sm font-medium text-gray-700">{{ $t('common.bankName') }}</label>
              <input type="text" id="bankName" v-model="formData.bank_name"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-400 focus:ring-opacity-50">
            </div>
            <span class="text-red-500" v-if="errors && errors['bank_name']">{{ errors['bank_name'][0] }}</span>
            <div>
              <label for="branchAddress" class="block text-sm font-medium text-gray-700">{{ $t('common.branchAddress') }}</label>
              <input type="text" id="branchAddress" v-model="formData.bank_address"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-400 focus:ring-opacity-50">
            </div>
            <span class="text-red-500" v-if="errors && errors['bank_address']">{{ errors['bank_address'][0] }}</span>
            <div>
              <label for="cardOwnerName" class="block text-sm font-medium text-gray-700">{{ $t('common.cardOwnerName') }}</label>
              <input type="text" id="cardOwnerName" v-model="formData.beneficiary_name"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-400 focus:ring-opacity-50">
            </div>
            <span class="text-red-500" v-if="errors && errors['beneficiary_name']">{{ errors['beneficiary_name'][0] }}</span>
            <div>
              <label for="iban" class="block text-sm font-medium text-gray-700">{{ $t('common.iban') }}</label>
              <input type="text" id="iban" v-model="formData.iban"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-400 focus:ring-opacity-50">
            </div>
            <span class="text-red-500" v-if="errors && errors['iban']">{{ errors['iban'][0] }}</span>
          </div>
          <div class="flex justify-end mt-6">
            <button type="submit" v-if="!loading"
              class="bg-zaman hover:bg-zaman-700 text-white px-4 py-2 mx-2 rounded-md text-lg font-medium">{{ $t('common.add') }}</button>
            <button @click="showPopup = false" v-if="!loading"
              class="bg-red-500 text-white ml-4 px-4 py-2 mx-2 rounded-md text-lg font-medium">{{ $t('common.cancel') }}</button>
            <button v-if="loading" :disabled="loading" class="hover:shadow-form rounded-md mt-5 
              bg-zaman-700 
              focus:bg-zaman-700 text-white px-4 py-2 mx-2 rounded-md text-lg font-medium">
              {{ $t('loading') }}
              <IconsLoadingWhite />
            </button>
          </div>
        </form>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="banks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <HostProfileBankCard v-for="bank in banks" :key="bank.id" :bank="bank" />
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="grid gap-4 content-evenly md:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton :many="6" />
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="!loading && banks.length == 0" class="mx-auto text-center mt-16 text-gray-500">
        <p>{{ $t('noElements') }}</p>
      </div>
    </transition>
  </div>
</template>
