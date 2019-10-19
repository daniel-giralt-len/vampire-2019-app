import React, { useContext } from 'react'
import ca from './translations/ca.json'
import en from './translations/en.json'
import es from './translations/es.json'

const languages = {
    ca,
    en,
    es,
}

const getTranslation = (language) => {
    return id => {
        if(!languages[language]){
            console.warn(`no language ${language}`)
            return id
        }
        if(!languages[language][id]){
            console.warn(`no translation for ${id} in language ${language}`)
            window.l = window.l || []
            window.l.push(id)
            return id
        }
        return languages[language][id]
    }
}

const Language = React.createContext('en')

const translateComponent = (Component) => {
    return (props) => {
        const selectedLanguage = useContext(Language)
        return (
            <Component
                {...props}
                t={getTranslation(selectedLanguage)}
            />
        )
    }
}

export default translateComponent
export { Language }