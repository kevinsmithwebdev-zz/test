import React, { Component } from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);

    // some dummy recipes to start out
    const initRecipes = [];
    // put them in state
    this.state = {
      recipes: initRecipes,
      foodName: "",
      ingredientNames: "",
      numRemove: 0,
      numChange: 0
    };

    // bind *this* to our class method
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleFoodChange = this.handleFoodChange.bind(this);
    this.handleIngredChange = this.handleIngredChange.bind(this);
    this.handleNumRemove = this.handleNumRemove.bind(this);
    this.handleNumChange = this.handleNumChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.showIngred = this.showIngred.bind(this);
  }

  showIngred(x) {
    var index = x;



    if (
      document
        .getElementsByClassName("recipe-name")
        [index].innerHTML.indexOf(this.state.recipes[index].ingredients) == -1
    )
      document.getElementsByClassName("recipe-name")[
        index
      ].innerHTML += this.state.recipes[index].ingredients;
    else {
      document.getElementsByClassName("recipe-name")[
        index
      ].innerHTML = (index+1+" ")+ this.state.recipes[index].name + ":";
    }
  }

  handleAdd(event) {
    var newArray = this.state.recipes.slice();
    newArray.push({
      name:  this.state.foodName,
      ingredients: this.state.ingredientNames
    });



    this.setState({ recipes: newArray });

    localStorage.setItem("_gphalen_array", JSON.stringify(newArray));

    event.preventDefault();
  }

  handleFoodChange(event) {
    this.setState({ foodName: event.target.value });

    event.preventDefault();
  }

  handleIngredChange(event) {
    this.setState({ ingredientNames: event.target.value });

    event.preventDefault();
  }

  handleNumRemove(event) {
    this.setState({ numRemove: event.target.value });

    event.preventDefault();
  }

  handleNumChange(event) {
    this.setState({ numChange: event.target.value });

    event.preventDefault();
  }

  handleRemove() {


    let newRecipes = this.state.recipes.slice();


    console.log('recipes before', newRecipes)
    newRecipes.splice(this.state.numRemove - 1, 1);
    console.log('recipes after', newRecipes)
  console.log("after"+this.state.recipes.name)

    // put it into state
    this.setState({ recipes: newRecipes });
    console.log("setState")

    localStorage.setItem("_gphalen_array", JSON.stringify(newRecipes));

    console.log("setItem")
  }

  handleEdit() {
    var editArray = this.state.recipes;

    editArray[this.state.numChange - 1].ingredients = document.getElementById(
      "area"
    ).value;

    localStorage.setItem("_gphalen_array", JSON.stringify(editArray));
  }
  componentDidMount() {
    let lsData = JSON.parse(localStorage.getItem("_gphalen_array"));
    if (lsData != null) this.setState({ recipes: lsData });
  }
  render() {
    // just a simple way of changing out array of data into an array of JSX
    // I could have put it directly in the JSX, but this is cleaner

    const renderRecipes = this.state.recipes.map((recipe, i) => (

      <div className="recipe">
        <span className="recipe-name">{i+1}{" "+recipe.name}:</span> &nbsp;
      </div>


    ));

    return (
      <div>
        <div onClick={() => this.showIngred(event.target.innerText[0]-1 )}>
          {renderRecipes}
        </div>
        <br />
        <div>
          <button
            onClick={this.handleRemove}
            disabled={this.state.recipes.length === 0}
          >
            Remove recipe:
          </button>

          <label>
            <input
              type="text"
              value={this.state.numRemove}
              onChange={this.handleNumRemove}
            />
          </label>
        </div>
        <br />
        <div>
          <button
            onClick={this.handleEdit}
            disabled={this.state.recipes.length === 0}
          >
            Edit recipe:
          </button>

          <label>
            <input
              type="text"
              value={this.state.numChange}
              onChange={this.handleNumChange}
            />
          </label>
        </div>
        <textarea id="area">Place new ingredients here. </textarea>
        <br />
        <form onSubmit={this.handleAdd}>
          <label>
            Food:
            <input
              type="text"
              value={this.state.foodName}
              name="food"
              onChange={this.handleFoodChange}
            />
          </label>
          <label>
            Ingredients
            <input
              type="text"
              name="ingredients"
              value={this.state.ingredientNames}
              onChange={this.handleIngredChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
