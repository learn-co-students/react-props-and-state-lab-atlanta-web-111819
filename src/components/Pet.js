import React from 'react'

class Pet extends React.Component {

  adoptButton = () => {
    if (this.props.pet.isAdopted) {
      return (
        <button className="ui disabled button">Already Adopted</button>
      )
    } else {
      return(
        <button 
          onClick={this.adoptPet} 
          className="ui primary button"
        >
          Adopt Pet
        </button>
      )
    }
  }

  adoptPet = () => {
    this.props.onAdoptPet(this.props.pet.id)
  }

  render() {
    // console.log(this.props)
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {/*'♀' OR '♂' */}
            {this.props.pet.name} {this.props.pet.gender === 'female' ? '♀' : '♂'}
          </a>
          <div className="meta">
            <span className="date">{this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
          {this.adoptButton()}
        </div>
      </div>
    )
  }
}

export default Pet
