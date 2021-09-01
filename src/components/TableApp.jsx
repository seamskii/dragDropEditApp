import React from 'react'
import { Table } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
import data from './datadrag.json';
import 'antd/dist/antd.css';


const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'ID',
    dataIndex: 'id',
    className: 'drag-visible',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
  },

  {
    title: 'Extra Hours',
    dataIndex: 'extra_hours',
    className: 'drag-visible',
  },
  {
    title: 'Manual Hours',
    dataIndex: 'manual_hours',
    className: 'drag-visible',
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    className: 'drag-visible',
  },
  {
    title: 'Total Hours',
    dataIndex: 'total_hours',
    className: 'drag-visible',
  },
];

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

class SortableTable extends React.Component {
  state = {
    dataSource: data,
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      this.setState({ dataSource: newData });
    }
  };

  DraggableContainer = props => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = this.state;
    const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    const { dataSource } = this.state;

    return (
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="index"
        components={{
          body: {
            wrapper: this.DraggableContainer,
            row: this.DraggableBodyRow,
          },
        }}
      />
    );
  }
}


export default SortableTable;