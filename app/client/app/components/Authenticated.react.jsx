var React = require('react')

function getLoginState() {
    return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.getUser()
        // jwt: LoginStore.getJwt();
    }
}


var Authenticated = function(ComposedComponent) {
    return class extends React.Component {
        static willTransitionTo(transition) {
            if (!LoginStore.isLoggedIn()) {
                transition.redirect('/login');
            }
        }

        state = getLoginState();

        componentDidMount() {
            LoginStore.addChangeListener(this._onChange);
        }

        componentWillUnmount() {
            LoginStore.removeChangeListener(this._onChange);
        }

        render() {
            return (
            <ComposedComponent
                {...this.props}
                user={this.state.user}
                userLoggedIn={this.state.userLoggedIn} />
            )
        }

        _onChange = () => {
            console.log(getLoginState());
            this.setState(getLoginState());
        };
    };
} 

module.exports = Authenticated
