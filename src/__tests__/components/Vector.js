import React from 'react'
import renderer from 'react-test-renderer'
import Vector from '../../components/Vector'

it('Vector - renders', () => {
  const tree = renderer.create(
    <Vector />
  )
  expect(tree).toMatchSnapshot()
})

it('Vector - positive rotation', () => {
  var tree = renderer.create(
    <Vector
      direction={45}
    />
  )
  expect(tree).toMatchSnapshot()

  tree = renderer.create(
    <Vector
      direction={540}
    />
  )
  expect(tree).toMatchSnapshot()
})

it('Vector - negative rotation', () => {
  var tree = renderer.create(
    <Vector
      direction={-45}
    />
  )
  expect(tree).toMatchSnapshot()

  tree = renderer.create(
    <Vector
      direction={-540}
    />
  )
  expect(tree).toMatchSnapshot()
})

it('Vector - distance', () => {
  var tree = renderer.create(
    <Vector
      distance={20}
    />
  )
  expect(tree).toMatchSnapshot()

  tree = renderer.create(
    <Vector
      distance={-20}
    />
  )
  expect(tree).toMatchSnapshot()
})

it('Vector - direction + distance', () => {
  const tree = renderer.create(
    <Vector
      direction={90}
      distance={20}
    />
  )
  expect(tree).toMatchSnapshot()
})
