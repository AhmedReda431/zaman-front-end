<template>
    <div>
        <input type="tel" ref="phoneInput" v-model="test" @input="onPhoneInput" />
        <button @click="getPhoneNumber">Get Phone Number</button>
    </div>
</template>

<script setup>
import intlTelInput from "intl-tel-input";
import { ar } from "intl-tel-input/i18n"; // Arabic

const input = document.querySelector("#phone");

intlTelInput(input, {
    i18n: ar,
    initialCountry: "sa",
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
    // Optionally, add these options
    placeholderNumberType: "MOBILE", // Ensure placeholder for mobile numbers
});
function getPhoneNumber() {
    console.log(input)
}
</script>