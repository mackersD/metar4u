import React from 'react'
import renderer from 'react-test-renderer'
import Metar from '../../components/Metar'

it('Metar - renders', () => {
  const tree = renderer.create(
    <Metar />
  )
  expect(tree).toMatchSnapshot()
})

it('Metar - fetching', () => {
  var tree = renderer.create(
    <Metar
      isFetching={true}
    />
  )
  expect(tree).toMatchSnapshot()

  tree = renderer.create(
    <Metar
      isFetching={true}
      distance={20}
      direction={135}
    />
  )
  expect(tree).toMatchSnapshot()

  var text = "KAUS 091853Z 16008KT 10SM FEW065 FEW250 36/20 A3004 RMK AO2 SLP158 T03560200"
  tree = renderer.create(
    <Metar
      isFetching={true}
      rawReport={text}
    />
  )
  expect(tree).toMatchSnapshot()

  tree = renderer.create(
    <Metar
      isFetching={true}
      distance={20}
      direction={135}
      rawReport={text}
    />
  )
  expect(tree).toMatchSnapshot()
})

it('Metar - failed', () => {
  var tree = renderer.create(
    <Metar
      isFailed={true}
    />
  )
  expect(tree).toMatchSnapshot()

  tree = renderer.create(
    <Metar
      isFailed={true}
      distance={20}
      direction={135}
    />
  )
  expect(tree).toMatchSnapshot()

  var text = "KAUS 091853Z 16008KT 10SM FEW065 FEW250 36/20 A3004 RMK AO2 SLP158 T03560200"
  tree = renderer.create(
    <Metar
      isFailed={true}
      rawReport={text}
    />
  )
  expect(tree).toMatchSnapshot()

  tree = renderer.create(
    <Metar
      isFailed={true}
      distance={20}
      direction={135}
      rawReport={text}
    />
  )
  expect(tree).toMatchSnapshot()
})

it('Metar - vector + report', () => {
  var text = "KAUS 091853Z 16008KT 10SM FEW065 FEW250 36/20 A3004 RMK AO2 SLP158 T03560200"
  var tree = renderer.create(
    <Metar
      distance={20}
      direction={135}
      rawReport={text}
    />
  )
  expect(tree).toMatchSnapshot()

  tree = renderer.create(
    <Metar
      distance={20}
      direction={135}
    />
  )
  expect(tree).toMatchSnapshot()

  tree = renderer.create(
    <Metar
      rawReport={text}
    />
  )
  expect(tree).toMatchSnapshot()
})
