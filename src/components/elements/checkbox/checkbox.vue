<style src="./checkbox.scss" lang="scss" scoped></style>

<template>
    <label :for="checkboxID" class="checkbox" :class="[{'m-checked': checked }, {'m-disabled': disabled}]">
        <span class="checkbox__input">
            <span class="checkbox__arrow"></span>
            <input
                    v-model="checkboxModel"
                    :value="value"
                    type="checkbox"
                    :id="checkboxID"
                    class="checkbox__input-native"
            />
        </span>
        <span class="checkbox__label">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    import { computed } from 'vue'
    import useVModel from "@composables/vmodel"
    import useGenerateID from "@composables/generateID";

	export default {
		name: "v-checkbox",
        emits: ['update:modelValue', 'update:array', 'change'],
		props: {
			modelValue: Boolean,
			array: Array,
			value: [String, Number],
			disabled: Boolean
		},
        setup(props, { emit }) {
			const modelName = computed(() => props.array ? 'array' : 'modelValue')
			const checkboxModel = useVModel(props, emit, modelName.value)
            const checkboxID = useGenerateID('checkbox')
	        const checked = computed(() => props.array ? props.array.includes(props.value) : props.modelValue)

	        return { checkboxModel, checkboxID, checked }
        }
	}
</script>