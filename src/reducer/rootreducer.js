const initState = {
    squares: Array(9).fill(null),
    scoreX:0,
    scoreO:0
   
}
const rootReducer = (state = initState, action) =>{
    switch (action.type)  {
        case 'RESET GAME' : {
           return{
               ...state,
               squares: Array(9).fill(null)
           }
        }
        case 'MOVE UPDATE' : {
            return{
                ...state,
                squares: action.payload
            }
         }
         case 'UPDATE SCORE OF X' : {
            return{
                ...state,
                scoreX:state.scoreX+1
            }
         }
         case 'UPDATE SCORE OF 0' : {
            return{
                ...state,
                scoreO:state.scoreO+1
            }
         }
         case 'RESTART' : {
            return{
                ...state,
                squares: Array(9).fill(null),
            }
         }
        default : {
            return state
        }
    }
}
export default rootReducer;
    