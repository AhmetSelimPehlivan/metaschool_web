import {String, array} from 'prop-types';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle
  } from "reactstrap";
import { Bar } from "react-chartjs-2";
import {
    chartExample3
} from "../../variables/charts.js";

const BarGraph = ({title, data}) => {
  
    return (
        <>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" />{title}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={(canvas) => chartExample3.data(canvas, data)}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
        </>
    );
}
BarGraph.propTypes = {
  title: String,
  data: array,
};
  
BarGraph.defaultProps = {
  title: "",
  data: [],
};
export default BarGraph;