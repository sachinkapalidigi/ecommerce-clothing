import React from 'react';
import './App.css';
import Homepage from './pages/homepage.component'
import Shop from './pages/shop/shop.component'
import {Route,Switch,Redirect} from 'react-router-dom'
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import CheckoutPage from "./pages/checkout/checkout.component";
class App extends React.Component {
  // constructor () {
  //   super();

  //   this.state = {

  //     currentUser : null
    
  //   }
  // } 

  componentDidMount () {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      // this.setState({currentUser:user})

      // createUserProfileDocument(user)
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{
          setCurrentUser({
            
              id : snapshot.id, 
              ...snapshot.data()
            
          })
        })
      } else {
        setCurrentUser(userAuth)
      }

      // console.log(user)
    })
  }

  unsubscribeFromAuth = null;


  componentWillUnmount () {

    this.unsubscribeFromAuth()
  
  }

  render () {
    return (    
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route path='/signin' 
          render = {()=>this.props.currentUser?(<Redirect to='/' />):(<SignInAndSignUp />)} 
          />
        </Switch>

      </div> 
  );
  }
}

// const mapStateToProps = state => ({
//   currentUser : state.user.currentUser
// })
const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
