import React, { ComponentType, FormEvent } from 'react';
import './index.scss';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Link, withRouter, Router, RouteComponentProps } from 'react-router-dom';
import SvgIcon from '../../components/SvgIcon';
import { FormComponentProps } from 'antd/lib/form';
import { isValidUsername } from '../../utils/validate';
import { userLogin } from '../../store/user/actions';
import { GetUrlParam } from '../../utils/pathTools';

type AllProps = FormComponentProps & RouteComponentProps;
interface IState {
  pwdType: string;
  loginLodding: boolean;
}

class Login extends React.Component<AllProps, IState> {
  state: Readonly<IState> = {
    pwdType: 'password',
    loginLodding: false,
  };
  handleSubmit = (e: React.FormEvent<any>) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {username, password} = values;
        const {location} = this.props;
        const redirect = GetUrlParam(location.search, 'redirect');

        this.setState({
          loginLodding: true,
        });
        userLogin(username, password).then(() => {
          this.props.history.push(redirect || '/home');
        }).catch((error) => {
          this.setState({
            loginLodding: true,
          });
          console.log(error);
        });
      } else {
        message.error('用户名或密码错误');
      }
    });
    e.preventDefault();
  }
  handleTogglePwd = () => {
    this.setState({
      pwdType: this.state.pwdType === 'text' ? 'password' : 'text',
    });
  }
  validateUsername = (rule: any, value: string, callback: any) => {
    if (!isValidUsername(value)) {
      callback(new Error('请输入正确的用户名'));
    } else {
      callback();
    }
  }
  validatePass = (rule: any, value: string, callback: any) => {
    if (value.length < 5) {
      callback(new Error('密码不能小于5位'));
    } else {
      callback();
    }
  }
  render() {
    const {pwdType, loginLodding} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div className='login-container'>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <h3 className='title'>react-admin</h3>
          <Form.Item>
            {
              getFieldDecorator('username', {
                initialValue: 'admin',
                rules: [{
                  validator: this.validateUsername,
                }],
              })(<Input
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Username' />)
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                initialValue: 'admin',
                rules: [{
                  validator: this.validatePass,
                }],
              })(<Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type={pwdType}
                placeholder='Password'/>)
            }
              <span className='show-pwd' onClick={this.handleTogglePwd}>
                <SvgIcon name='eye' />
              </span>
          </Form.Item>
          <Form.Item>
              <Checkbox
                checked={true}
                style={{color: '#fff'}}
              >Remember me</Checkbox>
            <Link
              className='login-form-forgot'
              to='/login'
            >Forgot password</Link>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              loading={loginLodding}
            >
              Log in
            </Button>
            <div className='tips'>
              <span>username: admin</span>
              <span>password: admin</span>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create({})(Login));
