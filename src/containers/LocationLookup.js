import React from 'react'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'
import Spinner from '../components/Spinner'
import * as actions from '../actions/actions'

class LocationLookup extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleSubmit(lookup) {
    const { dispatch } = this.props
    dispatch(actions.fetchLocation(lookup))
  }

  render() {
    return (
      <Spinner
      >
        <Form
          model="deep.lookup"
          onSubmit={(lookup) => this.handleSubmit(lookup)}
        >
          <Control.text
            model=".text"
          />
          <button type="submit">Search</button>
        </Form>
      </Spinner>
    )
  }
}

export default connect()(LocationLookup)
