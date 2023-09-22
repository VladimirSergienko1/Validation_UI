import {Card, List, message} from "antd";
import VirtualList from 'rc-virtual-list';
import {useEffect, useState} from "react";
const TaskItems = () =>{

    const ContainerHeight = 400;

        const [data, setData] = useState([]);
      /*  const appendData = () => {
            const fetchTaskItemsByTaskId = async (taskId) => {
                try {
                    const response = await fetch(`http://localhost:3001/tasks/1`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch task items: ${response.statusText}`);
                    }
                    const task = await response.json();
                    console.log('BLA',task)

                    setData(task.task_items);
                } catch (error) {
                    console.error(error);
                    message.error('Failed to load task items.');
                }
            }

        };*/
  /*      useEffect(() => {

        }, []);*/
      /*  const onScroll = (e) => {
            if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
                appendData();
            }
        };*/

        return(
        <>
            <Card>
                <List>
                    <VirtualList
                        data={data}
                        height={ContainerHeight}
                        itemHeight={47}
                        itemKey="email"
                        /*onScroll={onScroll}*/
                    >
                        {(item) => (
                            <List.Item key={item.email}>
                                <List.Item.Meta
                                    description={item.email}
                                />
                                <div>Content</div>
                            </List.Item>
                        )}
                    </VirtualList>
                </List>
            </Card>
        </>
    )
}

export default TaskItems