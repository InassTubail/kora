import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../store/actions';

import './Tables.css';

class Tables extends Component {
    render() {
        let tables = ['https://user-images.githubusercontent.com/30325727/68527514-428a7c00-02f0-11ea-979e-620bc2c93a77.png',
            'https://user-images.githubusercontent.com/30325727/68527513-428a7c00-02f0-11ea-8c06-6347f819b32c.png',
            'https://user-images.githubusercontent.com/30325727/68527512-41f1e580-02f0-11ea-908c-eae4835b5dd7.png',
            'https://user-images.githubusercontent.com/30325727/68527511-41f1e580-02f0-11ea-9830-6ccb0275f6a6.png',
            'https://user-images.githubusercontent.com/30325727/68527510-41f1e580-02f0-11ea-9cc2-89b6fa1631e8.png',
            'https://user-images.githubusercontent.com/30325727/68527509-41f1e580-02f0-11ea-8623-644b01badc23.png',
            'https://user-images.githubusercontent.com/30325727/68527508-41594f00-02f0-11ea-86fc-aab1d68d162b.png',
            'https://user-images.githubusercontent.com/30325727/68527507-41594f00-02f0-11ea-8792-249c3087698d.png',
            'https://user-images.githubusercontent.com/30325727/68527506-41594f00-02f0-11ea-80b4-d5d0b15b555b.png']
        return (
            <React.Fragment>
                <div class="multiplication-tables">
                    <div class="tables-title">
                        <img src={'https://user-images.githubusercontent.com/30325727/68527635-c5600680-02f1-11ea-99f6-b91e7e4ef9c6.png'} alt="" />
                    </div>
                    <div class="tables-loo">
                        {tables.map((el, index) =>
                            <Link to={`tables/${index + 2}`} class="table-link">
                                <img src={el} alt="" />
                            </Link>
                        )}
                    </div>
                    <div class="footer">
                        <img src={'https://user-images.githubusercontent.com/30325727/68527637-c5f89d00-02f1-11ea-8329-495bff217397.png'} alt="" />
                        <Link to="/tables/short" class="short-table">
                            <img src={'https://user-images.githubusercontent.com/30325727/68527636-c5600680-02f1-11ea-8b5b-d8282b605c22.png'} alt="" />
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = { updateUser };
const mapStateToProps = state => ({
    user_info: state.user.info,
    // users: state.user.users,
    // isLoggedIn: state.user.isLoggedIn,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tables);
