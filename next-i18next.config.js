/** @type {import('next-i18next').UserConfig} */
module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'ar'],
    },
    fallbackLng: {
        default: ['en'],
    },
    ns: [
        "auth",
        "common",
        "footer",
        "header",
    ],
}