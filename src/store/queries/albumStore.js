import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/api/api.js"

export const useAlbumsStore = defineStore('albums', () => {

    const albums = ref([])
    const columns = ref({})
    const actions = ref([
        {
            label: 'Delete',
            action: 'deleteItem'
        },
        {
            label: 'Edit',
            action: 'editItem'
        }
    ])

    function getAlbums() {

        return api.get('/api/albums')
            .then(response => {
                console.log(response)
                albums.value = response.data.data
                columns.value = response.data.columns
            })
            .catch(error => {
                console.log(error)
            })
            .then(()=>{

            })
    }

    function addAlbum(){
        console.log('Add Album')
    }
    function deleteAlbum(id){
        console.log('Delete: ' + id)
    }

    function editAlbum(id){
        console.log('Edit: ' + id)
    }

    return { albums, columns, actions, getAlbums, addAlbum, deleteAlbum, editAlbum }
})