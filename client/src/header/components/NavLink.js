import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'



const NavLink = ({ children, to, path, linkColor }) => {
  const color = linkColor ? linkColor : null
  const styles = {
    active: {
      color,
    },
    inActive: {
      color: 'black',
    },
    both: {
      fontSize: 14,
      fontWeight: 400,
      padding: '10px 15px',
      textTransform: 'uppercase',
      textDecoration: 'none'
    }
  }
  const props = { children, to }
  const style = to === path ? styles.active : styles.inActive
  return (
    <Link {...props} style={Object.assign({}, style, styles.both)} className="appbar-nav"/>
  )
}

const mapStateToProps = (state) => {
  return {
    path: state.routing.locationBeforeTransitions.pathname,
    linkColor: state.theme.values ? state.theme.values.palette.primary1Color : null
  }
}

export default connect(mapStateToProps)(NavLink)
