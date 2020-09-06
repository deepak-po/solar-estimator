import React, {useState, useEffect} from 'react';
import { ResponsiveBar } from '@nivo/bar'
import styled from 'styled-components'

const data = [
  {"month": "jan", "radiation": 40, },
  {"month": "feb", "radiation": 35, },
  {"month": "mar", "radiation": 118 },
  {"month": "apr", "radiation": 142, },
  {"month": "may", "radiation": 82, },
  {"month": "jun", "radiation": 42, },
  {"month": "jul", "radiation": 69, },
  {"month": "aug", "radiation": 142,},
  { "month": "sep", "radiation": 82,},
  { "month": "oct", "radiation": 42,},
  { "month": "nov", "radiation": 69,},
  { "month": "dec", "radiation": 69,},
]

const ResponsiveBar1 = styled(ResponsiveBar)`
  color: tomato;
  border-color: tomato;
  background-color: green;`

export default function App() {

  const [radiation, setRadiation] = useState(data)
  useEffect(() => {
    //TODO get radiation Data
    return () => null
  }, [])

  return (

      <ResponsiveBar1
          data={radiation}
          keys={['radiation']}
          indexBy="month"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.2}
          colors={{ scheme: 'yellow_orange_red' }}
          theme={{
            fontFamily: 'BioRhyme'
          }}
          // theme = {{
          //   axis: {
          //     fontFamily: 'Tangerine',
          //     textColor: '#eeaaee',
          //     fontSize: '34px',
          //     tickColor: '#eee',
          //   },
          //   grid: {
          //     stroke: '#888',
          //     strokeWidth: 1
          //   },
          // }}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          fill={[
              {
                  match: {
                      id: 'fries'
                  },
                  id: 'dots'
              },
              // {
              //     match: {
              //         id: 'sandwich'
              //     },
              //     id: 'lines'
              // }
          ]}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'month',
              legendPosition: 'middle',
              legendOffset: 32
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'radiation',
              legendPosition: 'middle',
              legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
          legends={[
              {
                  dataFrom: 'keys',
                  anchor: 'top-right',
                  direction: 'column',
                  justify: false,
                  translateX: 0,
                  translateY: 10,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  // effects: [
                  //     {
                  //         on: 'hover',
                  //         style: {
                  //             itemOpacity: 1
                  //         }
                  //     }
                  // ]
              }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
      />
  )
}
