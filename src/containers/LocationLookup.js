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

  componentDidMount() {
  }

  handleChange(values) {

  }

  handleUpdate(form) {

  }

  handleSubmit(values) {
    const { dispatch } = this.props
    var geoname = processGeonameText(values.text)
    dispatch(actions.fetchGeoname(geoname))
  }

  render() {
    var geoLoc = this.props.geolocation
    return (
      <Spinner>
        <Form
          model="deep.lookup"
          onUpdate={(form) => this.handleUpdate(form)}
          onChange={(values) => this.handleChange(values)}
          onSubmit={(values) => this.handleSubmit(values)}
        >
          <Control.text
            model=".text"
            placeholder={geoLoc.lat + ' ' + geoLoc.long}
          />
          <button type="submit">Search</button>
        </Form>
      </Spinner>
    )
  }
}

const processGeonameText = text => {
  var result = {
    lat: undefined,
    long: undefined,
    text
  }
  var latLongRegex = /^(?:lat\D*?)*?(-?[\d]+\.?[\d]*)[\s]+(?:long\D*?)*?(-?[\d]+\.?[\d]*)$/
  var matches = text.match(latLongRegex)
  if(matches) {
    result.lat = matches[1], //capture groups start on index 1
    result.long = matches[2]
  }
  return result
}

const mapStateToProps = state => {
  return {
    geolocation: state.geolocation
  }
}

export default connect(
  mapStateToProps
)(LocationLookup)
