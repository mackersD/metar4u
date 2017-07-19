import React from 'react'
import renderer from 'react-test-renderer'
import Spinner from '../Spinner'

it('Spinner - renders', () => {
  const tree = renderer.create(
    <Spinner />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('Spinner - fetching', () => {
  const tree = renderer.create(
    <Spinner
      isFetching={true}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('Spinner - isFailed', () => {
  const tree = renderer.create(
    <Spinner
      isFailed={true}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('Spinner - isFetching + isFailed', () => {
  const tree = renderer.create(
    <Spinner
      isFetching={true}
      isFailed={true}
    />
  )
  expect(tree).toMatchSnapshot()
})
