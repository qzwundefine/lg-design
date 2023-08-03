import {
  DesktopOutlined,
  LockOutlined,
  MobileOutlined,
  QrcodeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs, Tooltip } from 'antd';
//@ts-ignore
import loginBg from 'lg-design-pro/assets/login_bg.png';
import WWLogin, { WwOption } from 'lg-design-pro/wwlogin';
import React, { useState, type FC } from 'react';
import './index.css';

type LoginOption = {
  /**
   * @backgrooundImageUrl 背景图片地址
   */
  backgrooundImageUrl: string | null;
  /**
   * @logo logo地址
   */
  logo: string | null;
  /**
   * @logo 主标题描述
   */
  title: string | null;
  /**
   * @logo 次标题描述
   */
  subTitle: string | null;
};

type LoginPageProps = {
  /**
   * @isLoginging 是否登录中
   */
  isLoginging: boolean;
  /**
   * @Function onSubmit 登录请求函数
   * @param values
   */
  onSubmit?: ((formData: any) => Promise<boolean | void>) | undefined;
  /**
   * @option 登录页其他配置
   */
  option: LoginOption;
  /**
   * @option 企微登录配置项
   */
  wwConfig?: WwOption | null;
};

const LoginPage: FC<LoginPageProps> = (props) => {
  const {
    isLoginging,
    onSubmit,
    option = {
      title: '菱歌科技',
      subTitle: '菱歌科技登录页组件',
      logo: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png',
      backgrooundImageUrl: loginBg,
    },
    wwConfig,
  } = props;
  const { title, subTitle, logo, backgrooundImageUrl } = option;
  const [loginType, setLoginType] = useState('account');
  const [isValidPhone, setIsValidPhone] = useState(false);

  // 切换扫码登录
  const changeQRCodeSubmit = (type: string) => {
    if (type === 'qrcode') {
      return {
        render: () => <WWLogin config={wwConfig} onScan={onSubmit} />,
      };
    }
    return {
      submitButtonProps: {
        loading: isLoginging,
      },
    };
  };
  return (
    <div className="loginContainer">
      <LoginFormPage
        backgroundImageUrl={backgrooundImageUrl || ''}
        logo={logo || ''}
        title={title || ''}
        subTitle={subTitle || ''}
        activityConfig={undefined}
        submitter={changeQRCodeSubmit(loginType)}
        onFinish={onSubmit}
      >
        {loginType !== 'qrcode' && (
          <>
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey)}
            >
              <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
              <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
            </Tabs>
            {loginType === 'account' && (
              <>
                <ProFormText
                  name="account"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'账号: admin'}
                  rules={[
                    {
                      required: true,
                      message: '请输入账号!',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'密码: 123'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
              </>
            )}
            {loginType === 'phone' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={'prefixIcon'} />,
                  }}
                  name="phoneNumber"
                  placeholder={'手机号'}
                  rules={[
                    {
                      required: true,
                      message: '请输入手机号！',
                    },
                    {
                      pattern: /^1[3456789]\d{9}$/,
                      message: '请输入正确的手机号！',
                    },
                  ]}
                />
                {/* TODO 手机号校验后再获取验证码 */}
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  captchaProps={{
                    size: 'large',
                    disabled: true,
                  }}
                  placeholder={'请输入验证码'}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${'获取验证码'}`;
                    }
                    return '获取验证码';
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                  onGetCaptcha={async (phone) => {
                    message.success('获取验证码成功！验证码为：1234');
                  }}
                />
              </>
            )}
          </>
        )}
      </LoginFormPage>
      <div className="switchContainer">
        <div className="switchIconsContainer">
          <div className="switchIcons">
            {loginType !== 'qrcode' ? <QrcodeOutlined /> : <DesktopOutlined />}
          </div>
        </div>
        <Tooltip
          placement="left"
          title={loginType !== 'qrcode' ? '扫码登录' : '账号密码登录'}
        >
          <div
            className="triangle"
            onClick={() =>
              setLoginType(loginType !== 'qrcode' ? 'qrcode' : 'account')
            }
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default LoginPage;
