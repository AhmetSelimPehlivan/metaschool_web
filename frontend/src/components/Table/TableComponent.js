import  React, {useEffect, useState} from "react";
import {prototype, String, array} from 'prop-types';
import {
    Card,
    CardHeader,
    CardBody,
    Table
  } from "reactstrap";
  
const TableComponent = ({tasks}) => {
    return (
        <>
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Tasks</h6>
                <p className="card-category d-inline"> today</p>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                    {
                      tasks.map((task,index) =>
                      <tr>
                        <td>
                          <p className="title">{task.title} Game</p>
                          <p className="text-muted">
                            Result: {task.result}
                          </p>
                        </td>
                      </tr>
                      )
                    }
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
        </>
    );
}
TableComponent.propTypes = {
  tasks: array
  };
  
TableComponent.defaultProps = {
  tasks: []
};
export default TableComponent;