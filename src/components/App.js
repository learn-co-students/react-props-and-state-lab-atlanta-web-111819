import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (filter)=>{
    this.setState({
      filters: {
        type: filter
      }
    })
  }

  onFindPetsClick =()=>{
    let url
    if(this.state.filters.type === 'all'){
      url = '/api/pets'
    }else{
      url = `/api/pets?type=${this.state.filters.type}`
    }

    fetch(url)
    .then(res => res.json())
    .then(pets => {
      this.setState({pets: pets})
    })
  }

  onAdoptPet=(id)=>{
    let temp = this.state.pets.find(el => el.id === id)
    console.log(temp)
    temp.isAdopted = true
    let newArray = this.state.pets.filter(pet => pet.id !== id)
    newArray.push(temp)

    this.setState({
      pets: newArray
    })
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.onFindPetsClick}
              onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet}
              pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
