import {useContext} from 'react'
import { LanguageContext } from '../App'

const LanguageSelector = () => {
    const {languages, selectedLanguage, setSelectedLanguage} = useContext(LanguageContext);
    return ( 
        <div>
            <select className='form-select' value={selectedLanguage} name="" id="" onChange= {(e)=>{
                            setSelectedLanguage(e.target.value)}
                        }>
                {
                    languages.map((language,index) =>(
                        <option key={index}
                        value={language} >{language}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default LanguageSelector ;