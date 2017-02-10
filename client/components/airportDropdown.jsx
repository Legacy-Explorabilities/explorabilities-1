var React = require("react");
var ReactSelectize = require("react-selectize");
var SimpleSelect = ReactSelectize.SimpleSelect;
var MultiSelect = ReactSelectize.MultiSelect;

export default class Form extends React.Component {
    
  render(){
    var options = ["apple", "mango", "grapes", "melon", "strawberry"]
    .map(function(fruit){
        return {label: fruit, value: fruit}
    });

    return (
      <div>
          <MultiSelect options = {options} placeholder = "Select fru">Hello</MultiSelect>
      </div>
    )
  }  
}

/*

<SimpleSelect
              placeholder = "Select a fruit"
              onValueChange = {function(value){
                  alert(value);        
              }}>
              <option value = "apple">apple</option>
              <option value = "mango">mango</option>
              <option value = "orange">orange</option>
              <option value = "banana">banana</option>
          </SimpleSelect>

*/