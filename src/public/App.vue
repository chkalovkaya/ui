
<template>
    <div class="ui">
        <h1 class="h1">Heading h1</h1>
        <h2 class="h2">Heading h2</h2>
        <h3 class="h3">Heading h3</h3>
        <h4 class="h4">Heading h4</h4>
        <p class="text">Test normal text</p>
        <p class="text-bold">Test bold text</p>
        <article class="text-article">Some needed test article text</article>
        <p class="text-description">Short description</p>

        <v-button icon="cross-close" @click="setErr('Error test')" color="blue-dark">TEST</v-button>
        <v-button icon="cross-close" @click="clearError" color="yellow" circle />
        <v-button icon="cross-close" color="blue" loading />

        <v-input
                v-model="input"
                label="Label"
                placeholder="placeholder"
                suffix-icon="cross-close"
                prefix-text="ot"
                :error="error"
                @change="inputChangeTest"
        />
        <p>Input: {{ input }}</p>

        <v-input v-model="password" label="Password" placeholder="***" password />
        <p>password: {{ password }}</p>

        <v-select v-model="select" :options="selectOptions" />
        <p>Select: {{ select.name }}</p>

        <v-radio v-model="radio" value="1">Test 1</v-radio>
        <v-radio v-model="radio" value="2">Test 2</v-radio>
        <v-radio v-model="radio" value="3" disabled>Test 3</v-radio>
        <v-radio v-model="radio" value="4">Test 4</v-radio>
        <v-radio v-model="radio" value="5">Test 5</v-radio>
        <p>Radio: {{ radio }} </p>

        <v-checkbox v-model="checkbox">Pay</v-checkbox>
        <v-checkbox v-model="checkbox2" @change="checkboxChange">Pay2</v-checkbox>
        <p>Checkbox: {{ checkbox }} || Checkbox2: {{ checkbox2 }}</p>

        <v-checkbox v-model:array="checkboxArray" value="gift" @change="checkboxChange">Gift</v-checkbox>
        <v-checkbox v-model:array="checkboxArray" value="present">Present</v-checkbox>
        <v-checkbox v-model:array="checkboxArray" disabled>Gift</v-checkbox>
        <p>Multiple checkbox: {{ checkboxArray }} </p>

        <Tags :tags="tagsLinks"  />
    </div>
</template>

<script>
    import { ref } from 'vue'
	import Tags from "@layouts/tags";

    export default {
		name: "App",
        components: { Tags },
        setup() {
            const radio = ref('')
            const checkbox = ref(false)
            const checkbox2 = ref(false)
            const checkboxArray = ref([])
            const input = ref('')
            const password = ref('')
            const error = ref('')
            const select = ref({})
            const selectOptions = [{name: 'First Popular', value: 'popular'}, {name: 'From cheap to expensive', value: 'pricetohigh'}]
            const tagsLinks = ['sm-r8', 'sm-g99', 'час', 'наушники', 's20', 's10', 'a51', 'планшет', 'a52', 'sm-g99 ultra']

            return {radio, checkbox, checkbox2, checkboxArray, input, password, error, select, selectOptions, tagsLinks}
        }
	}
</script>

<style lang="scss">
    .ui {
        padding: 50px;

        & .select {
            width: 100px;
        }
    }
</style>