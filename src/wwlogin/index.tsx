import { Spin } from 'antd';
import React, { useEffect, useState, type FC } from 'react';
import './index.css';

declare const window: any;

type WWLoginProps = {
  /**
   * @config 企微登录配置
   */
  config?: WwOption | null;
  /**
   * @Function onScan 扫码跳转回调函数
   * @param values
   */
  onScan?: ((params: any) => Promise<boolean | void>) | undefined;
};

export type WwOption = {
  /**
   * @appid 登录类型为企业自建应用/服务商代开发应用时填企业 CorpID，第三方登录时填登录授权 SuiteID
   */
  appid: string;
  /**
   * @agentid 企业自建应用/服务商代开发应用 AgentID，当login_type=CorpApp时填写
   */
  agentid?: string;
  /**
   * @redirect_uri 登录成功重定向 url，需进行 URLEncode
   */
  redirect_uri: string;
  /**
   * @state 登录 state用于保持请求和回调的状态，授权请求后原样带回给企业。该参数可用于防止CSRF 攻击（跨站请求伪造攻击），建议带上该参数，可设置为简单的随机数加 session 进行校验需进行 URLEncode
   */
  state: string;
  href: string;
  /**
   * @lang 语言类型。zh：中文；en：英文。
   */
  lang: string;
};

const WWLogin: FC<WWLoginProps> = (props) => {
  const { config, onScan } = props;
  const [isCreating, setIsCreating] = useState(false);
  const { search } = window.location;

  // 企微登录sdk地址
  const wwloginSDK =
    'http://wwcdn.weixin.qq.com/node/wework/wwopen/js/wwLogin-1.2.4.js';

  // 动态创建脚本，引入企微登录sdk
  const createWWLoginQRCode = async (config: any) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = wwloginSDK;
    setIsCreating(true);
    document.body.appendChild(script);
    script.onload = () => {
      if (!window?.WwLogin) return;
      new window.WwLogin({
        id: 'ww_qrcode',
        ...config,
      });
      setIsCreating(false);
    };
  };

  // 处理二维码跳转链接参数
  const handleUrlParams = async () => {
    const params = {};
    if (search.indexOf('?') !== -1) {
      const str = search
        .substr(1)
        .split('&')
        ?.map((item) => item.split('='));
      str.forEach((item) => (params[item[0]] = item[1]));
    }
    const { redirect, auto, ...restParams } = params;
    if (onScan) {
      onScan(restParams);
    }
  };

  useEffect(() => {
    createWWLoginQRCode(config);
  }, []);

  // 监听扫码跳转链接
  useEffect(() => {
    handleUrlParams();
  }, [search]);

  return (
    <div className="wwloginContainer">
      <Spin spinning={isCreating} tip="二维码生成中，请稍后...">
        <div id="ww_qrcode" />
      </Spin>
    </div>
  );
};

export default WWLogin;
