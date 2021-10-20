import { computed } from 'vue'

export default function useGenerateID(name = '') {
    return computed(() => `${name}id-${Math.floor(Math.random() * 10000)}`)
}