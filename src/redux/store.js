import  {createStore,combineReducers,compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { imageListReducer } from './reducers/imageReducer';

const images=[];
const loading=true;
const initialState={imageList:{images,loading}
};

const reducer=combineReducers({
    imageList : imageListReducer,
})
const store=createStore(reducer,initialState,compose(applyMiddleware(thunk)))

export default store;