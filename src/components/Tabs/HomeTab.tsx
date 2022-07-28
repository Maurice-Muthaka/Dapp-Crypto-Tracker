import { Table } from "antd";
import { FC } from "react";

const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a:any, b:any) => a.name - b.name,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a:any, b:any) => a.address - b.address,
    },
  ];

const HomeTab: FC = () => {
    return (
        <div className="mt-20">
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}

export default HomeTab;