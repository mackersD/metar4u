import React from 'react'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'
import Spinner from '../components/Spinner'
import * as actions from '../actions/actions'

class RouteLookup extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    const { dispatch } = this.props
    var result = processFormText(values.text)
    dispatch(actions.fetchGeoname(result))
  }

  render() {
    var geoLoc = this.props.location.geoLocation
    var placeholder = geoLoc.isFailed ? "Enter location" : geoLoc.lat + ' ' + geoLoc.long
    return (
      <Spinner
      >
        <Form
          model="deep.lookup"
          onSubmit={(values) => this.handleSubmit(values)}
        >
          <Control.text
            model=".text"
            placeholder={placeholder}
          />
          <button type="submit">Get METARs</button>
        </Form>
      </Spinner>
    )
  }
}

const processFormText = text => {
  var result = {
    lat: undefined,
    long: undefined,
    text
  }
  var latLongRegex = /^(?:lat\D*?)*?(-?[\d]+\.?[\d]*)[\s]+(?:long\D*?)*?(-?[\d]+\.?[\d]*)$/
  if(text) {
    var matches = text.match(latLongRegex)
    if(matches) {
      result.lat = matches[1] //capture groups start on index 1
      result.long = matches[2]
    }
  }
  return result
}

const mapStateToProps = state => {
  return {
    location: state.location
  }
}

export default connect(
  mapStateToProps
)(RouteLookup)
