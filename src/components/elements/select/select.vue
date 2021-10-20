<style src="./select.scss" lang="scss" scoped></style>

<template>
    <div class="select" ref="select" tabindex="0" @blur="closeHandler">
        <div class="select__header" @click="toggleHandler">
            <div class="select__item m-header" :title="modelValue.name">
                {{ modelValue.name }}
            </div>
            <v-icon class="select__arrow" :class="{'m-open': dropdown.open}" name="arrow-down" />
        </div>
        <Collapse>
            <div v-if="dropdown.open" class="select__dropdown" :class="{'m-top': dropdown.top}">
                <div v-for="option in options" :key="option.value" class="select__item" @click="selectHandler(option)" :title="option.name">
                    {{ option.name }}
                </div>
            </div>
        </Collapse>
    </div>
</template>

<script>
    import { ref, reactive, onMounted } from 'vue'
	import Collapse from "@layouts/collapse";

	export default {
		name: "v-select",
		components: { Collapse },
        emits: ['update:modelValue', 'change'],
		props: {
			modelValue: Object,
			options: {type: Array, required: true}
		},
        setup(props, { emit }) {
			const select = ref(null)
            const dropdown = reactive({open: false, top: false})

	        const closeHandler = () => dropdown.open = false

	        const selectHandler = (option) => {
		        emit('update:modelValue', option)
		        emit('change', option)
		        closeHandler()
	        }

	        const toggleHandler = () => {
		        const selectRect = select.value.getBoundingClientRect()

		        dropdown.open = !dropdown.open
		        dropdown.top = window.innerHeight < selectRect.bottom + 2 + select.value.offsetHeight * props.options.length
	        }

	        onMounted(() => selectHandler(props.options[0]))

            return {
                select, dropdown,
                selectHandler, toggleHandler, closeHandler
            }
        },
	}
</script>