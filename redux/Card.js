export const additem=(item)=>(
    {
type:"additem",
payload:item
    }
)


export const removeitem=(item)=>(
{
type:"removeitem",
payload:item

}
)



/**  utils*/



  
 


/* ınıtal_state */

const INITIAL_STATE = {
   
    cartItems: []
  };
  



  /* reducers */
  const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
     
      case "additem":
        return {
          ...state,
          cartItems: action.payload
        };
      case "removeitem":
        return {
          ...state,
          cartItems: action.payload
        };
     
      default:
        return state;
    }
  };
  
  export default cartReducer;