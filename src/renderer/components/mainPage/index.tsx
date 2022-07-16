/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FolderOpenOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Space, Divider, List } from 'antd';
import style from './MainPage.module.scss';
import localStorageWork, { DataFale } from '../../helpers/localStorageWork';

const { GetlocalStorageData, SetLocalStorageData } = localStorageWork;

const MainPage = () => {
  const [stateLoading, setStateLoading] = useState(false);
  const [data, setData] = useState([] as DataFale[]);
  const [form] = Form.useForm();

  useEffect(() => {
    setData(GetlocalStorageData());
  }, []);

  const onFinish = async (v: any) => {
    setStateLoading(true);
    console.log(v.url);
    window.buttonElectron.download(v.url);
    await window.buttonElectron.stateDownload(
      (_: any, value: boolean, path: string, fileName: string) => {
        if (value) {
          message.success(`Файл ${fileName} загружен в ${path}`);
          SetLocalStorageData({
            fileName,
            folderPath: path,
          });
          setData(GetlocalStorageData());
        }
        if (!value) message.error('беда');
        console.log(value, '\n', path);
        setStateLoading(false);
      }
    );
  };

  const onFinishFailed = () => {
    message.error('Не удалось скачать файл');
    setStateLoading(false);
  };

  const validateMessage = {
    required: "'${name}' введен не правильно",
    enum: "'${name}' должен быть из [${enum}]",
    whitespace: "'${name}' не должен быть пустой",
    types: {
      url: 'Введен некорректный ${type}',
    },
    string: {
      min: "'${name}' должен содержать не меньше ${min} символов",
    },
  };

  const fakeData = [{ fileName: 'file name', folderPath: 'path' }];

  const openFolder = (folderPath: string) => () => {
    window.buttonElectron.openFolder(`${folderPath}\\`);
  };

  return (
    <>
      <h2 className={style.title}>Введи URL для загрузки</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateMessages={validateMessage}
      >
        <Form.Item
          name="url"
          label="URL"
          rules={[
            { required: true },
            { type: 'url', warningOnly: true },
            { type: 'string', min: 6 },
            { whitespace: true },
          ]}
        >
          <Input placeholder="URL загружаемого файла" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={stateLoading}>
              Скачать
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className={style.list}>
        <Divider orientation="center">Последние 5 загрузок</Divider>
        <List
          size="large"
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item className={style.itemlist}>
              <div className={style.item}>
                <h3>{item.fileName}</h3>
                <FolderOpenOutlined
                  role="button"
                  onClick={openFolder(item.folderPath)}
                />
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default MainPage;
