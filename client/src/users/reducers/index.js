import { type } from '../actions/index'

const user = (state = {
  values: {},
  addresses: [],
  roles: [],
  error: {}
}, action) => {
  switch(action.type) {
    case `ADD_${type}`:
      return {
        ...state,
        isFetching: false,
        ...action.item
      }
    case 'ADD_ADDRESS':
      return {
        ...state,
        addresses: [
          ...state.addresses,
          action.address
        ]
      }
    case `REQUEST_${type}`:
      return {
        ...state,
        isFetching: true
      }
    case `RECEIVE_${type}`:
      return {
        ...state,
        isFetching: false,
        ...action.item
      }
    case `UPDATE_${type}`:
      return {
        ...state,
        ...action.item
      }
    case `DELETE_${type}`:
      return {
        roles: [],
        values: [],
        error: null
      }
    case 'REDIRECT_USER':
      return {
        ...state,
        redirect: action.path
      }

    case 'ERROR_USER':
      return { ...state, error: action.error }

    case 'RECOVER_USER':
      return {
        ...state,
        ...action.recovery
      }
      case 'RESET_USER':
        return {
          ...state,
          ...action.user
        }
    case 'CONTACT_USER':
      return {
        ...state,
        message: action.values
      }
    default:
      return state
  }
}

export default user
