<style src="./radio.scss" lang="scss" scoped></style>

<template>
    <label :for="radioID" class="radio" :class="[{'m-selected': selected }, {'m-disabled': disabled}]" >
        <span class="radio__input">
            <span class="radio__dot"></span>
            <input
                    v-model="radioModel"
                    :value="value"
                    type="radio"
                    :id="radioID"
                    class="radio__input-native"
            />
        </span>
        <span class="radio__label">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    import { computed } from 'vue';
    import useVModel from "@composables/vmodel";
	import useGenerateID from "@composables/generateID";

	export default {
		name: "v-radio",
		emits: ['update:modelValue'],
        props: {
	        modelValue: [String, Number],
	        value: [String, Number],
			disabled: Boolean,
        },
        setup(props, { emit }) {
			const radioModel = useVModel(props, emit)
            const radioID = useGenerateID('radio')
            const selected = computed(() => props.modelValue === props.value)

            return { radioModel, radioID, selected }
        }
	}
</script>