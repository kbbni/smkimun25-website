document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('language');
    const elementsToTranslate = document.querySelectorAll('[data-translate]');

    // Load translations file
    fetch('translations.json')
        .then(response => response.json())
        .then(translations => {
            languageSelector.addEventListener('change', () => {
                const selectedLanguage = languageSelector.value;

                elementsToTranslate.forEach(element => {
                    const translationKey = element.getAttribute('data-translate');
                    if (translations[selectedLanguage][translationKey]) {
                        element.textContent = translations[selectedLanguage][translationKey];
                    }
                });

                // Handle Arabic RTL
                if (selectedLanguage === 'ar') {
                    document.body.setAttribute('dir', 'rtl');
                    document.body.classList.add('arabic');
                } else {
                    document.body.setAttribute('dir', 'ltr');
                    document.body.classList.remove('arabic');
                }
            });
        })
        .catch(error => console.error('Error loading translations:', error));
});