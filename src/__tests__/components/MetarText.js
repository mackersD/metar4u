import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import MetarText from '../../components/MetarText'

it('MetarText - renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MetarText />, div)
});

it('MetarText - expected rendering', () => {
  var comp = renderer.create(<MetarText text={"KGTU"} />).toJSON()
  expect(comp).toMatchSnapshot()
})
