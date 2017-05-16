import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'

import AdminHeroAdd from '../components/AdminHeroAdd'
import AdminHeroItem from '../components/AdminHeroItem'

class AdminHero extends Component {
  state = {
    expanded: false
  }
  componentDidMount() {
    const hasHero = this.props.item.image ? true : false
    this.setState({ expanded: hasHero })
  }
  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    const { isFetching, page, item } = this.props
    return (
      isFetching ? null :
      <section>
        <Card
          expanded={this.state.expanded}
          onExpandChange={this.handleExpandChange}
          style={{ margin: 20 }}
        >
          <AdminHeroAdd page={page} item={item} handleExpand={this.handleExpand} expanded={this.state.expanded}/>
          {!this.state.expanded ? null :
            <AdminHeroItem
              item={item}
              page={page}
              initialValues={item.values}
            />
          }
        </Card>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state.heros.isFetching
  const item = state.heros.items.find(item => item.pageId === ownProps.page._id) || {}
  console.log(item)
  return {
    isFetching,
    item
  }
}

export default connect(mapStateToProps)(AdminHero)
