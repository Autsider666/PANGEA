// vue.config.js file to be place in the root of your repository
// make sure you update `yourProjectName` with the name of your GitLab project

// module.exports = {
//     baseUrl: process.env.NODE_ENV === 'production'
//         ? '/PANGEA/'
//         : '/'
// }
module.exports = {
    css: {
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                data: `@import "@/styles/variables.scss";`
            }
        }
    }
}