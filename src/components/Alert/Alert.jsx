import { Callout } from '@tremor/react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

function Alert({ Title, Text }) {
  return (
    <div className="alert-item">
      <Callout
        title={Title}
        icon={ExclamationCircleIcon}
        color="rose"
      >
        {Text}
      </Callout>
    </div>
  )
}

export default Alert
