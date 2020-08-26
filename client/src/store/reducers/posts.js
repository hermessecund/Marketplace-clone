import { ADD_POST, REMOVE_POST, GET_ALL_POSTS, CHANGING_POSTS_FORM } from '../actionTypes';

const DEFAULT_STATE = {
  postsList: { vehicles: [], realEstate: [], freeStuff: [], electronics: [], musicalInstruments: [], gamesAndToys: [], householdSupplies: [], family: [], pets: [], homeDecorationSupplies: [], sports: [], fun: [] },
  categories: ['Vehicles', 'Real estate', 'Free stuff', 'Electronics', 'Musical instruments', 'Games and toys', 'Household supplies', 'Family', 'Pets', 'Home decoration supplies', 'Sports', 'Fun'],
  postForm: {
    imageUrl: [],
    title: '',
    price: '',
    category: 'Vehicle',
    description: '',
    location: ''
  }
}

const filteringCategories = (posts) => {
  const filteredData = { vehicles: [], realEstate: [], freeStuff: [], electronics: [], musicalInstruments: [], gamesAndToys: [], householdSupplies: [], family: [], pets: [], homeDecorationSupplies: [], sports: [], fun: [] }
  console.log(posts, 'sadasdafasdkngasjvnsčajnvsdačjnč')
  posts.forEach(val => {
    switch (val.category[0]) {
      case 'Vehicles':
        filteredData.vehicles.push(val);
        break
      case 'Real estate':
        filteredData.realEstate.push(val);
        break
      case 'Free stuff':
        filteredData.freeStuff.push(val);
        break
      case 'Electronics' || 'electronics':
        filteredData.electronics.push(val);
        break
      case 'Musical instruments':
        filteredData.musicalInstruments.push(val);
        break
      case 'Games and toys':
        filteredData.gamesAndToys.push(val);
        break
      case 'Household supplies':
        filteredData.householdSupplies.push(val);
        break
      case 'Family':
        filteredData.family.push(val);
        break
      case 'Home decoration supplies':
        filteredData.homeDecorationSupplies.push(val);
        break
      case 'Sports':
        filteredData.sports.push(val);
        break
      case 'Fun':
        filteredData.fun.push(val);
        break
      case 'Pets':
        filteredData.pets.push(val);
        break
      default:
        console.log(val.category[0], 'didnt go in category', val.category[0] === 'electronics')
    }
  })
  console.log(filteredData, 'filtered data')
  return filteredData;
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      const posts = filteringCategories(action.posts)
      console.log(posts, 'lalalalal')
      return {
        ...state,
        postsList: posts
      }
    case ADD_POST:
      return {
        ...state,
        postsList: action.post
      }
    case CHANGING_POSTS_FORM:
      console.log(action.formData, 'action')
      return {
        ...state,
        postForm: action.formData
      }
    default:
      return state;
  }
}