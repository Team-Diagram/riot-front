import './SelectInput.scss'
import { Select, SelectItem } from '@tremor/react'
import { useState } from 'react'

function SelectInput({ placeholder, data }) {
  const [value, setValue] = useState('')

  const handleValueChange = (selectedValue) => {
    setValue(selectedValue)
  }

  return (
    <Select value={value} onValueChange={handleValueChange} placeholder={placeholder}>
      {
          data.map((item, index) => (
            <SelectItem key={index} value={item} selected={value === item}>
              {item}
            </SelectItem>
          ))
        }
    </Select>
  )
}

export default SelectInput