import {Card, Metric, Text} from "@tremor/react";

function Home() {
  return (
    <div className="home">
      <div className="homeContainer">
        homeee
          <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
              <Text>Sales</Text>
              <Metric>$ 34,743</Metric>
          </Card>
      </div>
    </div>
  )
}

export default Home
