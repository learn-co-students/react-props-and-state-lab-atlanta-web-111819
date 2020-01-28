import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      displayedPets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateType = event => {
    console.log('updating pets to', event.target.value)
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onAdoptPet = (petId) => {
    console.log('adopting a pet.')
    let index = 0
    // console.log(petId)
    const pet = this.state.pets.find((el, idx) => {
      index = idx
      // if (el.id === petId) {
      //   console.log('found match', el)
      //   return true
      // }
      return el.id === petId
    })
    pet.isAdopted = true
    this.setState(previousState => {
      const newPets = previousState.pets.slice()
      newPets[index] = pet
      return {
        pets: newPets
      }
    })
  }

  getPets = () => {
    if (this.state.pets.length === 0) {
      const type = this.state.filters.type === 'all' ? '' : `?type=${this.state.filters.type}`
      fetch('/api/pets' + type)
        .then(res => res.json())
        .then(pets => {
          // console.log(pets)
          this.setState({
            pets: pets,
            displayedPets: pets
          })
        })
    } else {
      if (this.state.filters.type === 'all') {
        this.setState({
          displayedPets: this.state.pets
        })
      } else {
        const newPets = this.state.pets.filter(pet => {
          return pet.type === this.state.filters.type
        })
        this.setState({
          displayedPets: newPets
        })
      }
    }
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
              <Filters 
                onChangeType={this.updateType}
                onFindPetsClick={this.getPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.displayedPets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
