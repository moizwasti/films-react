import React from 'react'
import Modal, { closeStyle } from 'simple-react-modal'
import { withRouter } from 'react-router-dom'

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            failMessage: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userToken !== '') {
            this.props.history.push('/');
        } else if (nextProps.error === 'Authentication failed. Wrong password.') {
            this.setState({ failMessage: 'Password does not match!' });
        } else if (nextProps.error === 'Authentication failed.User not found.') {
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const userData = {
            email: e.target.email.value,
            password: e.target.password.value,
        }

        this.props.logIn(userData);
    }

    render() {
        const { showModal, closeModal } = this.props;
        return (
            <div align='center'>
                <Modal
                    show={showModal}
                    onClose={closeModal}
                    transitionSpeed={1}
                >
                    <a style={closeStyle} onClick={closeModal}>X</a>
                    <h2>Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="email">email:</label>
                        <input id="email" name="email" type="text" required />
                        <br />

                        <label htmlFor="password">password:</label>
                        <input id="password" name="password" type="password" required />
                        <br />                        
                        <p className='failmsg'>{this.state.failMessage}</p>
                        <button type='submit'>Submit</button>                        
                    </form>
                </Modal>
            </div>
        );

    }
}

export default withRouter(LoginModal);