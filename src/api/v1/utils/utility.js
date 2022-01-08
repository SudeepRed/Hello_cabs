const cost = 2;
const time = 1;
const distance =
  "sqrt(power((x_source-x_destination),2)+power((y_source-y_destination),2))";
function distCalc(x_source, y_source, x_destination, y_destination) {
  let x = x_source - x_destination;
  let y = y_source - y_destination;
  return Math.sqrt(x * x + y * y);
}
const distanceQuery = `
DROP FUNCTION  IF EXISTS DISTANCE;
CREATE FUNCTION DISTANCE (float,float,float,float) RETURNS float AS $$
    select sqrt(power(($1-$3),2)+power(($2-$4),2));
$$ LANGUAGE SQL;
`;
export default { cost, time, distance, distCalc, distanceQuery };
