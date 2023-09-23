import {Button, Card, List, message} from "antd";
import VirtualList from 'rc-virtual-list';
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {$taskItems, fetchTaskItemsFx, TaskItemsGate} from "../../models/taskItems_model.js";
import {useStore} from "effector-react";
const TaskItems = () =>{

    const ContainerHeight = 400;
    const { taskId } = useParams();
    const taskItems = useStore($taskItems)
    const loading = useStore(fetchTaskItemsFx.pending)

    console.log('TaskID', taskId)
    console.log('TaskItems', taskItems)


    console.log('TaskItems2', taskItems)

      /*  const onScroll = (e) => {
            if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
                appendData();
            }
        };*/

        return(
        <>
            <TaskItemsGate taskId={taskId} />
            <Card>
                <List
                    loading = {loading}

                >
                    <VirtualList
                        style={{width: '500px'}}
                        data={taskItems}
                        height={ContainerHeight}
                        itemHeight={47}
                        itemKey="id"
                        /*onScroll={onScroll}*/
                    >
                        {item => (
                            <List.Item key={item.id}>
                                <div>{'ID ' + item.id} {'Task ID: '+ item.task_id}</div>
                                <List.Item.Meta
                                    description={item.description}
                                />

                                {item.answers.map(answer => (
                                    <Button key={answer} onClick={() => console.log("Button clicked!", answer)}>
                                        {answer}
                                    </Button>
                                    )
                                )}

                            </List.Item>

                        )}
                    </VirtualList>
                </List>
            </Card>
        </>
    )
}

export default TaskItems