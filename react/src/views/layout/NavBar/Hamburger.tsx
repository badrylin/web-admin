import React from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { AllState } from '../../../store/index';
import { Dispatch } from 'redux';
import { ToggleSideBar } from '../../../store/app/actions';

interface IProps {
  opened: boolean;
  toggleSideBar: (withoutAnimation: boolean) => void;
}

class Hamburger extends React.Component<IProps> {
  render() {
    const { opened, toggleSideBar } = this.props;
    return (
      <span className='hamburger' onClick={() => toggleSideBar(false)}>
        <Icon type={opened ? 'menu-fold' : 'menu-unfold' } />
      </span>
    );
  }
}

export default connect(({app}: AllState) => ({
  opened: app.sidebar.opened,
}), (dispatch: Dispatch) => ({
  toggleSideBar: (withoutAnimation: boolean) => dispatch(ToggleSideBar(withoutAnimation)),
}))(Hamburger);
