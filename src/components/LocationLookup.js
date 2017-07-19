import React from 'react'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'
import Spinner from './Spinner'
import * as actions from '../actions/actions'

class LocationLookup extends React.Component {

  render() {
    return (
      <Spinner
      >
        <Form
          model="deep.lookup"
          onSubmit={(lookup) => this.props.handleSubmit(lookup)}
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

const mapDispatchToProps = dispatch => ({
  handleSubmit: lookup => dispatch(actions.fetchLocation(lookup))
})

export default connect(
  null,
  mapDispatchToProps
)(LocationLookup)
