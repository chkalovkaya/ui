<style src="./input.scss" lang="scss" scoped></style>

<template>
    <div class="input">
        <label v-if="label" :for="inputID" class="input__label">
            {{ label }}
        </label>

        <div class="input__field-wrapper">
            <input
                    v-model="inputModel"
                    :type="inputType"
                    :id="inputID"
                    :placeholder="placeholder"
                    class="input__field"
                    :class="{
                        'm-error': error,
                        'm-prefix': prefixIcon || prefixText,
                        'm-suffix': suffixIcon || password
                    }"
                    @change="inputChange"
            />

            <div v-if="prefixText" class="input__prefix">
                <span class="input__prefix__text">{{ prefixText }}</span>
            </div>

            <div v-if="prefixIcon" class="input__prefix">
                <v-icon :name="prefixIcon"/>
            </div>

            <div v-if="suffixIcon && !password" class="input__suffix">
                <v-icon :name="suffixIcon"/>
            </div>

            <div v-if="password" class="input__suffix">
                <v-icon :name="passwordIcon" @click="togglePassword" />
            </div>

            <span v-if="error" class="input__error">{{ error }}</span>
        </div>
    </div>
</template>

<script>
    import { ref, computed } from 'vue'
    import useVModel from "@composables/vmodel";
    import useGenerateID from "@composables/generateID";

	export default {
		name: "v-input",
		emits: ['update:modelValue', 'change'],
		props: {
			modelValue: String,
			label: String,
			placeholder: String,
			password: Boolean,
			error: String,
			prefixIcon: String,
			prefixText: String,
			suffixIcon:  String,
		},
        setup(props, { emit }) {
	        const inputModel = useVModel(props, emit)
	        const inputType = computed(() => {
            	return props.password ? (passwordVisible.value ? 'text': 'password') : 'text'
            })
            const inputID = useGenerateID('input')
            const inputChange = (e) => emit('change', e.target.value)

	        const passwordVisible = ref(false)
            const passwordIcon = computed(() => passwordVisible.value ? 'password-hide' : 'password-show')

            const togglePassword = () => passwordVisible.value = !passwordVisible.value

            return {
	            inputModel, inputType, inputID, inputChange,
				passwordVisible, passwordIcon, togglePassword
            }
        }
	}
</script>