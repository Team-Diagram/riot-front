import { Tab, TabGroup, TabList } from '@tremor/react';

function Toggle({ selectedTab, onTabChange }) {
  return (
    <TabGroup defaultIndex={selectedTab} onIndexChange={() => onTabChange()}>
      <TabList variant="solid">
        <Tab>On</Tab>
        <Tab>Off</Tab>
      </TabList>
    </TabGroup>
  )
}

export default Toggle
