import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { fetchReset } from '../actions/index'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'password', 'passwordConfirm' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match'
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)


const styles = {
  item: {
    maxWidth: 840,
    margin: '0 auto'
  }
}

class Reset extends Component {
  state = { open: false }
  handleClose = () => this.setState({open: false})
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) return this.setState({ open: true })
  }
  render() {
    const { error, dispatch, handleSubmit, submitting, params, user } = this.props
    return (
      <main>
        <section>
          <Card style={styles.item}>
            <CardTitle title="Reset" subtitle="Enter your email to recover your account" />
            <form onSubmit={handleSubmit(values => dispatch(fetchReset(values, params.token)))} className="">
              <CardText>
                <Field name="password" component={renderTextField} label="Password" type="password" fullWidth={true}/>
                <Field name="passwordConfirm" component={renderTextField} label="Password Confirm" type="password" fullWidth={true}/>
                {error && <strong>{error}</strong>}
              </CardText>
              {!this.state.open ? null :
                <Dialog
                  actions={
                    <FlatButton
                      label="Close"
                      primary={true}
                      onTouchTap={this.handleClose}
                    />
                  }
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                  Welcome back {user.values ? user.values.firstname : null}
                </Dialog>
              }
              <CardActions>
                <RaisedButton
                  label="Recover"
                  fullWidth={true}
                  disabled={submitting}
                  type="submit"
                  primary={true}
                />
              </CardActions>
            </form>
          </Card>
        </section>
      </main>
    )
  }
}

Reset = reduxForm({
  form: 'recovery',
  validate
})(Reset)

const mapStateToProps = (state) => {
  return {
    user: state.user
  }

}

Reset = connect(mapStateToProps)(Reset)

export default Reset
