import Loader from './Loader'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Jumbotron,
  Table,
} from 'reactstrap'

import React, { Component } from 'react'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      population: [],
      categories: [],
      dropdownOpen: false,
      loading: false,
      selectedCategory: 'Select a categories to filter database by:',
      nbOfRows: 0,
      hiddenRows: 0,
    }

    this.toggle = this.toggle.bind(this)
    this.retreiveFigures = this.retreiveFigures.bind(this)
    this.retreiveCategories = this.retreiveCategories.bind(this)
    this.dropdownBtnHandler = this.dropdownBtnHandler.bind(this)
    this.buttonHandler = this.buttonHandler.bind(this)
  }

  componentDidMount() {
    this.retreiveCategories()
  }

  async retreiveFigures(category, min, limit) {
    this.setState({ loading: true })
    await fetch(`/uscensus/${category}/${min}/${limit}`)
      .then(res => res.json())
      .then(population => this.setState({ population, loading: false, nbOfRows: population.length }))

    await fetch(`/uscensus/${category}/count`)
      .then(res => res.json())
      .then(population => this.setState({
        hiddenRows: population.length - this.state.nbOfRows,
      }))
  }

  async retreiveCategories() {
    this.setState({ loading: true })
    await fetch('/uscensus/categories/')
      .then(res => res.json())
      .then(categories => this.setState({ categories, loading: false }))
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }
  buttonHandler() {
    this.retreiveFigures(this.state.selectedCategory, 0, document.getElementById('limit').value)
  }

  dropdownBtnHandler(category) {
    this.retreiveFigures(category, 0, 100)
    this.setState({ selectedCategory: category })
  }

  render() {

    const showHiddenValues = this.state.nbOfRows + this.state.hiddenRows >= 100 ? (
      <div>
        <i>{this.state.hiddenRows} values currently not displayed</i>
        <p>0 to <input placeholder="101..." id="limit"></input>(max: {this.state.nbOfRows + this.state.hiddenRows})</p>
        <Button onClick={this.buttonHandler}>show additional values</Button> <br/>
      </div>
    ) : null

    return (
      <div className="App">
        <div className="header">
          <Jumbotron>
            <h1>US Census</h1>
            <h4>{this.state.selectedCategory}</h4>
            <h5>{this.state.nbOfRows > 0 ? <p>{this.state.nbOfRows} rows returned (100 limit)</p> : null}</h5>
            {showHiddenValues}

            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret color="primary">
                Categories
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Categories to filter database by:</DropdownItem>
                <DropdownItem divider />
                {this.state.categories.map((category, i) => {
                  return (
                    <DropdownItem key={i} onClick={() => this.dropdownBtnHandler(category.category)}>{category.category}</DropdownItem>
                  )
                })}
              </DropdownMenu>
            </Dropdown>
          </Jumbotron>
        </div>
        <Jumbotron>
          { this.state.loading ? <Loader/>
            : <Table>
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Count</th>
                  <th>Average Age</th>
                </tr>
              </thead>
              <tbody>
                {this.state.population.map((agent, i) => {
                  if (agent.value !== null) { return (
                    <tr key={i}>
                      <td>{agent.value}</td>
                      <td>{agent.count}</td>
                      <td>{agent.averageage.toFixed(1)}</td>
                    </tr>
                  ) } else { return null }
                })}
              </tbody>
            </Table>
          }
        </Jumbotron>
      </div>
    )
  }

}

export default App
