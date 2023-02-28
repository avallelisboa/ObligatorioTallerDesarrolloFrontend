import React, {useState, useEffect} from 'react'
import store from '../../../../store/store';
import movementsSlice from '../../../../features/movementsSlice';
import { useSelector } from 'react-redux';
import Heading from '../../../../models/entities/Heading';
import HeadingComparison from './headingComparison/headingComparisonComponent';
import Expense from '../../../../models/entities/Expense';
import moment from 'moment';

const GraphicsComparison = () => {
  let headings = useSelector((state:any)=>state.headings.headingsWithExpenses)
  let headingsWithExpenses:Array<Heading>;
  try{
    headingsWithExpenses = JSON.parse(headings);
  }
  catch(ex){
    headingsWithExpenses = new Array<Heading>();
  }
  
  const [selectedHeading, setSelectedHeading] = useState(new Heading(0,"","",""));
  const [selectedHeadingExpenses, setSelectedHeadingExpenses] = useState(new Array<Expense>());
  const [expensesDifference, setExpensesDifference] = useState(0);
  useEffect(()=>{
    if(headingsWithExpenses.length > 0){
      let aHeading = headingsWithExpenses[0]
      setSelectedHeading(aHeading);
      setSelectedHeadingExpenses(aHeading.expenses);
    }
  },[]);
  useEffect(()=>{
    if(selectedHeadingExpenses.length > 0){
      let lastExpense = selectedHeadingExpenses[selectedHeadingExpenses.length -1];
      let beforeLastExpense = selectedHeadingExpenses[selectedHeadingExpenses.length -2];
      let difference = lastExpense.total - beforeLastExpense.total;
      setExpensesDifference(difference);
    }
  },[selectedHeading]);

const changeSelectedHeading = (headingName:string)=>{
  let foundedHeading = headingsWithExpenses.find((head:any) => head.name == headingName);
  let selectedHeading:Heading = foundedHeading != null ? foundedHeading : new Heading(0,"","","");
  setSelectedHeadingExpenses(selectedHeading.expenses);
}
  if(selectedHeadingExpenses.length > 0)
    return( 
    <>
      <select onChange={(element:any)=>changeSelectedHeading(element.target.value)}>
      {
          headingsWithExpenses.length > 0 ? headingsWithExpenses.map((head:Heading)=><HeadingComparison key={head.headingId} headingId={head.headingId} name={head.name}/>) : null
      }
      </select>
      <p>
      {
        expensesDifference > 0 ? `Para el rubro ${selectedHeading.name} has gastado $${expensesDifference} más que en la penúltima compra.` :
                                `Para el rubro ${selectedHeading.name} has gastado $${expensesDifference * -1} menos que en la penúltima compra.`
      }
      </p>
    </>
    );
  else return (
    <>
      <select onChange={(element:any)=>changeSelectedHeading(element.target.value)}>
        {
            headingsWithExpenses.length > 0 ? headingsWithExpenses.map((head:Heading)=><HeadingComparison key={head.headingId} headingId={head.headingId} name={head.name}/>) : null
        }
      </select>
      <p>No hay gastos ingresados!!!</p>
    </>
  );
}

export default GraphicsComparison;