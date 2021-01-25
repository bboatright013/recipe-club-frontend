import React, {useState} from 'react';

const useToggle = (initialValue = false) =>{
const [value, setValue] = useState(initialValue);

const toggle = () => {
    setValue(oldValue = !oldValue)
};

return ([value, toggle])
}

export default useToggle;