import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/api/api.js"

export const useUsersStore = defineStore('users', () => {

    const users = ref({})
    function getUsers() {
        api.get('/api/user')
            .then(response => {
                console.log(response)
            })
            .catch(error => {

            })
    }
    return { users, getUsers }
})