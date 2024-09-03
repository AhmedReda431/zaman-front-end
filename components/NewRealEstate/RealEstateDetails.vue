
<script>
import { ClockIcon } from 'lucide-vue-next'

export default {
  components: {
    ClockIcon
  },
  data() {
    return {
      date: '23-8-2024',
      time: '7:00',
      propertyCode: 'C10304',
      propertyType: 'فيلا للبيع في جدة',
      neighborhood: 'حي النزهة'
    }
  },
  computed: {
    formattedDate() {
      return `${this.time} ${this.date}`
    }
  }
}
</script>

<template>
  <header class="bg-white p-4 shadow-sm">
    <div class="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
      <!-- Left side -->
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <clock-icon class="text-gray-500" :size="18" />
        <span class="text-sm text-gray-500">{{ formattedDate }}</span>
        <span class="text-sm text-gray-500 ml-2">{{ propertyCode }}</span>
      </div>
      
      <!-- Right side -->
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <span class="text-sm font-semibold">{{ propertyType }}</span>
        <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {{ neighborhood }}
        </span>
      </div>
    </div>
  </header>
</template>


