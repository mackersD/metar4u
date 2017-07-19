import React from 'react'
import renderer from 'react-test-renderer'
import MetarText from '../MetarText'

it('MetarText - renders', () => {
  const tree = renderer.create(
    <MetarText />
  ).toJSON()
  expect(tree).toMatchSnapshot()
});

it('MetarText - expected rendering', () => {
  var text = "KAUS 091853Z 16008KT 10SM FEW065 FEW250 36/20 A3004 RMK AO2 SLP158 T03560200"
  var comp = renderer.create(
    <MetarText text={text} />
  ).toJSON()
  expect(comp).toMatchSnapshot()
})
