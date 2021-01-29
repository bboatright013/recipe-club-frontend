import {useState} from 'react';

const useFields = (initialState) => {
    const[ formData, setFormData ] = useState(initialState);

    const handleChange = event => {
        setFormData(formData => ({
            ...formData,
            [event.target.name] : event.target.value
        }));
    }
    return ([formData, handleChange])
}

export default useFields;