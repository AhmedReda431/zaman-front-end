<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, onMounted } from 'vue';
const emit = defineEmits(['valid', 'notValid']);
const { showAlert } = useAlert();
const { space } = useSpaceStore();
const { t } = useI18n();
const error = ref(null)
defineProps({
  serverErrors: {
    required: false
  }
})
const daysOfWeek = ref([
  {
    name: t('days.saturday'),
    day: 'saturday',
    from: {
      hours: 8,
      minutes: 0
    },
    to: {
      hours: 4,
      minutes: 0
    },
    all_day: true,
    is_open: false
  },
  {
    name: t('days.sunday'),
    day: 'sunday',
    from: {
      hours: 8,
      minutes: 0
    },
    to: {
      hours: 4,
      minutes: 0
    },
    all_day: true,
    is_open: false
  },
  {
    name: t('days.monday'),
    day: 'monday',
    from: {
      hours: 8,
      minutes: 0
    },
    to: {
      hours: 4,
      minutes: 0
    },
    all_day: true,
    is_open: false
  },
  {
    name: t('days.tuesday'),
    day: 'tuesday',
    from: {
      hours: 8,
      minutes: 0
    },
    to: {
      hours: 4,
      minutes: 0
    },
    all_day: true,
    is_open: false
  },
  {
    name: t('days.wednesday'),
    day: 'wednesday',
    from: {
      hours: 8,
      minutes: 0
    },
    to: {
      hours: 4,
      minutes: 0
    },
    all_day: true,
    is_open: false
  },
  {
    name: t('days.thursday'),
    day: 'thursday',
    from: {
      hours: 8,
      minutes: 0
    },
    to: {
      hours: 4,
      minutes: 0
    },
    all_day: true,
    is_open: false
  },
  {
    name: t('days.friday'),
    day: 'friday',
    from: {
      hours: 8,
      minutes: 0
    },
    to: {
      hours: 4,
      minutes: 0
    },
    all_day: true,
    is_open: false
  }
]);


const isValid = computed(() => {
  const arrayIsOpen = daysOfWeek.value.map(obj => obj.is_open).filter(is_open => is_open == true);;
  return arrayIsOpen.length > 0;
});

const formatTime = (timeObject) => {
  if (typeof timeObject == 'object') {
    const formattedHours = timeObject.hours.toString().padStart(2, '0');
    const formattedMinutes = timeObject.minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }
  return;
};
const convertTimeToObject = (timeString) => {
  if (typeof timeString == 'string') {
    const [hoursString, minutesString] = timeString.split(':');
    return {
      hours: parseInt(hoursString),
      minutes: parseInt(minutesString)
    };
  }
  return;
};
const validate = () => {
  if (isValid.value) {
    daysOfWeek.value.forEach(day => {
      if (day.from && day.to) {
        day.from = formatTime(day.from);
        day.to = formatTime(day.to);
      }
    });
    emit('valid',
      {
        step: 4,
        working_hours: {
          data: toRaw(daysOfWeek.value)
        }
      }
    );
    return;
  }
  emit('notValid', 4);
  error.value = t('validation.workingHours.required');
};
defineExpose({
  validate
});

onMounted(() => {
  if (space?.working_hours?.length > 0) {
    toRaw(space?.working_hours[0]?.data).forEach((backendObj, index) => {
      const staticObj = daysOfWeek.value[index];
      Object.keys(backendObj).forEach(key => {
        if (key !== 'name' && staticObj.hasOwnProperty(key)) {
          if (key === 'from' || key === 'to') {
            staticObj[key] = convertTimeToObject(backendObj[key]);
          } else {
            staticObj[key] = backendObj[key];
          }
        }
      });
    });
  }
})


</script>
<template>
  <div class="border-b border-gray-900/10 pb-8">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900">{{$t('operatingHours')}}</h3>
      <p class="mt-1 text-sm text-gray-500">{{$t('operatingHoursDescription')}}</p>
      <span class="text-[red]" v-if="error">{{ error }}</span>
      <span class="text-[red]" v-if="serverErrors['working_hours']">{{ serverErrors['working_hours'][0] }}</span>
    </div>
    <div class="p-4 sm:px-6" v-for="(day, i) in daysOfWeek" :key="i">
      <div class="grid grid-cols-6 gap-x-4 items-center justify-between">
        <div class="col-span-1 text-gray-500">
          {{ day.name }}
        </div>

        <div class="relative flex gap-x-2">
          <div class="flex h-6 items-center">
            <input :id="`customHours-${day.day}`" v-model="day.all_day" :value="false" :name="`customHours-${day.day}`"
              type="radio" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
          </div>
          <div class="text-sm leading-6">
            <label :for="`customHours-${day.day}`" class="font-medium text-gray-500">
              {{ $t('specialHours') }}
            </label>
          </div>
        </div>

        <div class="relative flex gap-x-2">
          <div class="flex h-6 items-center">
            <input :id="`24Hours-${day.day}`" v-model="day.all_day" :value="true" :name="`24Hours-${day.day}`"
              type="radio" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
          </div>
          <div class="text-sm leading-6">
            <label :for="`24Hours-${day.day}`" class="font-medium text-gray-500">
              {{ $t('wholeDay') }}
            </label>
          </div>
        </div>


        <div style="transition: 0.3s all ease-in-out;"
          :style="{ visibility: !day.all_day ? 'visible' : 'hidden', opacity: !day.all_day ? '1' : '0' }"
          class="flex gap-x-2  text-zaman">
          <VueDatePicker :select-text="$t('select')" :cancel-text="$t('cancel')" dir="ltr" v-model="day.from" time-picker>
            <template #input-icon>
              <div class="w-full h-full flex justify-center items-center mx-0.5">
                <Icon size="20" name="ic:round-access-time" />
              </div>
            </template>
          </VueDatePicker>
        </div>

        <div style="transition: 0.3s all ease-in-out;"
          :style="{ visibility: !day.all_day ? 'visible' : 'hidden', opacity: !day.all_day ? '1' : '0' }"
          class="flex gap-x-2  text-gray-500">

          <VueDatePicker :select-text="$t('select')" :cancel-text="$t('cancel')" dir="ltr" v-model="day.to" time-picker>
            <template #input-icon>
              <div class="w-full h-full flex justify-center items-center mx-0.5">
                <Icon size="20" name="ic:round-access-time" />
              </div>
            </template>
          </VueDatePicker>
        </div>


        <div class="col-start-6">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="day.is_open" class="sr-only peer">
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-zaman-100 dark:peer-focus:ring-zaman rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-zaman">
            </div>
            <span class="ms-3 text-sm font-medium text-gray-500 dark:text-gray-300">
              {{ $t('available') }}
            </span>
          </label>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>
/* Customize radio button appearance */
input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #4A5568;
  border-radius: 50%;
  outline: none;
  transition: background-color 0.3s, border-color 0.3s;
  cursor: pointer;
}

input[type="radio"]:checked {
  background-color: #6B7280;
  border-color: #6B7280;
}

input[type="radio"]:focus {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
</style>