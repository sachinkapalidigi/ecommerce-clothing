import React from 'react';
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';
import Button from '../button/button.component';

import {signInWithGoogle, auth} from '../../firebase/firebase.utils'


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : ''
        }
    }


    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({
            [name] : value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {email,password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({
                email:'',
                password:''
            })    
        } catch (error) {
            console.log('there was an error',error)
        }

        
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput label='Email' handleChange={this.handleChange} name='email' value={this.state.email} required />
                    {/* <label>Email</label> */}
                    <FormInput 
                    name='password'
                    type='password'
                    label='Password'
                    value={this.state.password}
                    handleChange={this.handleChange}
                    required />
                    {/* <label>Password</label> */}
                    <div className="buttons">
                        <Button type='submit'> Sign In </Button>
                        <Button onClick={signInWithGoogle} isGoogleSignIn> Sign In with Google </Button>

                    </div>
                    
                </form>
            </div>
        )
    }
}

export default SignIn;