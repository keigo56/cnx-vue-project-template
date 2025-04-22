import { defineStore } from "pinia";
import { computed, ref } from "vue";

const LOCAL_STORAGE_KEY = "theme";
const DEFAULT_THEME = "light";

export const useThemeStore = defineStore("theme", () => {
    const theme = ref(DEFAULT_THEME);
    const isDarkMode = computed(() => theme.value === "dark");

    function setTheme(th) {
        const themeSelected = th === "dark" ? "dark" : DEFAULT_THEME;
        localStorage.setItem(LOCAL_STORAGE_KEY, themeSelected);

        if(themeSelected === 'dark'){
            document.body.classList.add('dark')
        }else{
            document.body.classList.remove('dark')
        }

        theme.value = themeSelected;
    }

    function getThemeFromLocalStorage() {
        const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);

        if(storedTheme === 'dark'){
            document.body.classList.add('dark')
        }else{
            document.body.classList.remove('dark')
        }

        theme.value = storedTheme || DEFAULT_THEME;
    }

    return { theme, isDarkMode, setTheme, getThemeFromLocalStorage };
});