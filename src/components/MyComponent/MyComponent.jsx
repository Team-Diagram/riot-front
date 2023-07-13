import {
  Card, Metric, Text, Flex, ProgressBar, Button, Icon, MarkerBar,
} from '@tremor/react'
import { MailIcon } from '@heroicons/react/solid'

function MyComponent() {
  return (
    <>
      <Button variant="secondary"> Mon bouton lol</Button>
      <Icon size="xl" icon={MailIcon} />
      <Card className="max-w-xs mx-auto">
        <Text>Sales</Text>
        <Metric>$ 71,465</Metric>
        <MarkerBar> </MarkerBar>
        <Flex className="mt-4">
          <Text>32% of annual target</Text>
          <Text>$ 225,000</Text>
        </Flex>
        <ProgressBar value={32} className="mt-2" />
      </Card>
    </>
  )
}

export default MyComponent
