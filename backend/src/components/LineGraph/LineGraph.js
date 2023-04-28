import {array, String} from 'prop-types';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col
  } from "reactstrap";
  
import { Line } from "react-chartjs-2";
import {
    chartExample1
  } from "../../variables/charts.js";
const LineGraph = ({title, data, labelData, labels}) => {
    
    return (
        <>
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">{title}</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={(canvas) => chartExample1.data(canvas, data, labelData, labels)}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
        </>
    );
}
LineGraph.propTypes = {
  title: String,
  labelData: String,
  data: array,
};
  
LineGraph.defaultProps = {
  title: "",
  labelData: "",
  data: [],
};
export default LineGraph;