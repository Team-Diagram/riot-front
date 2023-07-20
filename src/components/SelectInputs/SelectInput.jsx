import { useState } from 'react'
import { Select, SelectItem } from '@tremor/react'

function SelectInput({
  placeholder, data, onChange, firstValue, uuid,
}) {
  const [value, setValue] = useState(firstValue || '')

  const handleValueChange = (selectedValue) => {
    setValue(selectedValue)
    if (onChange) {
      onChange(selectedValue, uuid)
    }
  }

  return (
    <div className="select-input-container">
      <Select value={value} onValueChange={handleValueChange} placeholder={placeholder}>
        {data.map((item) => (
          <SelectItem value={item}>
            {item}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

export default SelectInput
